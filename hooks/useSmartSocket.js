import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

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
            console.log("Emitting data with watchlist as",watchList)
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
            console.log('Connected to WebSocket');
            setConnectionStatus(true);
        });

        socket.on('liveFeed', (data) => {
            const buffer = Buffer.from(data);
            const parser = parsers[buffer[0]];
            if (parser) {
                const parsed = parser(buffer);
                console.log("Latest LTP",parsed)
                setLatestFeed(parsed);
            }
        });

        socket.on('error', (error) => {
            console.error('WebSocket error:', error);
            setConnectionStatus(false);
        });

        socket.on('disconnect', (reason) => {
            console.warn('Disconnected:', reason);
            setConnectionStatus(false);
        });

        return () => {
            socket.disconnect();
            socketRef.current = null;
        };
    }, [tokens.feedToken, tokens.apiKey, tokens.clientCode]);

    return {
        connectionStatus,
        latestFeed,
        emitData,
    };
}