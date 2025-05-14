import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { printLogs } from '../actions/logs';

export function useSmartSocket(tokens, parsers) {
    const [connectionStatus, setConnectionStatus] = useState(false);
    const [latestFeed, setLatestFeed] = useState(null);
    const socketRef = useRef(null);

    const emitData = (watchList) => {
        if (
            socketRef.current &&
            socketRef.current.connected &&
            Array.isArray(watchList) &&
            watchList.length > 0
        ) {
            printLogs("Emitting data with watchlist as",watchList)
            const tokenList = watchList.map((item) => item.token);
            socketRef.current.emit('sendData', JSON.stringify(tokenList));
        }
    };

    useEffect(() => {
        const socket = io('http://localhost:5000', {
            auth: {
                feedToken: tokens.feedToken,
                apiKey: tokens.apiKey,
                clientCode: tokens.clientCode,
            },
        });

        socketRef.current = socket;
        socket.on('connect', () => {
            printLogs('Connected to WebSocket');
            setConnectionStatus(true);
        });

        socket.on('liveFeed', (data) => {
            printLogs("Received liveFeed",data)
            const buffer = Buffer.from(data);
            const parser = parsers[buffer[0]];
            if (parser) {
                const parsed = parser(buffer);
                printLogs("Latest LTP",parsed)
                setLatestFeed(parsed);
            }
        });

        socket.on('error', (error) => {
            console.error('WebSocket error:', error);
            setConnectionStatus(false);
        });

// {exchangeTimestamp: 1746724282000n,exchangeType: 5,lastTradedPrice: 515800,sequenceNumber: 31632924n,subscriptionMode: 1,token: "443449"

        socket.on('disconnect', (reason) => {
            console.warn('Disconnected:', reason);
            setConnectionStatus(false);
        });

        return () => {
            socket.disconnect();
            socketRef.current = null;
        };

    }, []);

    return {
        connectionStatus,
        latestFeed,
        emitData,
    };
}