import { useState } from 'react';
const { Parser } = require('binary-parser');

export async function liveFeed () { 

    const [price,setPrice] = useState({})

    const parsers = {
        1: parseLTP,
        2: parseQuote,
        3: parseSnapQuote,
    };

    try {
        const websocket = new WebSocket("ws://localhost:5000")
        console
        websocket.binaryType = "arraybuffer"
        websocket.onopen = (e) =>{
            // console.log(e);
            const arrayData = ["1333", "2885", "1594"];
            // const arrayData = ["1594"];
            websocket.send(JSON.stringify(arrayData));            
            // websocket.send("1333")
        }
        websocket.onmessage = (e) =>{            
            let data = e.data
            // console.log(e.data);
            const buffer = Buffer.from(data);
            const subscriptionMode = buffer[0];
            const parser = parsers[subscriptionMode]; 
            if (parser) {
                const parsedData = parser(buffer);              
                console.log('Parsed data:', parsedData.lastTradedPrice/100);                            
                setPrice(parsedData)
                // console.log("ltp",ltp)
            }
            // console.log(JSON.parse(e.data))
        }
        websocket.onclose = (e) =>{
            console.log("Close",e)
        }
        websocket.onerror = (e) => {
            console.log("Error",e)
        }
        return price
    }
    catch(e) {
        console.log("Error",e)
    }
}

function parseLTP(buffer) {
    console.log("buffer",buffer)
    const ltpParser = new Parser()
        // .endianess('little')
        .int8('subscriptionMode')
        .int8('exchangeType')
        .string('token', { length: 25, encoding: 'utf8', stripNull: true })
        .int64le('sequenceNumber')
        .int64le('exchangeTimestamp')
        .int32le('lastTradedPrice');

    return ltpParser.parse(buffer);
}

// Function to parse Quote data
function parseQuote(buffer) {
    const quoteParser = new Parser()
        .endianess('little')
        .int8('subscriptionMode')
        .int8('exchangeType')
        .string('token', { length: 25, encoding: 'utf8', stripNull: true })
        .int64le('sequenceNumber')
        .int64le('exchangeTimestamp')
        .int64le('lastTradedPrice')
        .int64le('lastTradedQuantity')
        .int64le('averageTradedPrice')
        .int64le('volumeTraded')
        .doublele('totalBuyQuantity')
        .doublele('totalSellQuantity')
        .int64le('openPriceOfDay')
        .int64le('highPriceOfDay')
        .int64le('lowPriceOfDay')
        .int64le('closePrice');

    return quoteParser.parse(buffer);
}

// Function to parse Snap Quote data
function parseSnapQuote(buffer) {
    const snapQuoteParser = new Parser()
        .endianess('little')
        .int8('subscriptionMode')
        .int8('exchangeType')
        .string('token', { length: 25, encoding: 'utf8', stripNull: true })
        .int64le('sequenceNumber')
        .int64le('exchangeTimestamp')
        .int64le('lastTradedPrice')
        .int64le('lastTradedQuantity')
        .int64le('averageTradedPrice')
        .int64le('volumeTraded')
        .doublele('totalBuyQuantity')
        .doublele('totalSellQuantity')
        .int64le('openPriceOfDay')
        .int64le('highPriceOfDay')
        .int64le('lowPriceOfDay')
        .int64le('closePrice')
        .int64le('lastTradedTimestamp')
        .int64le('openInterest')
        .doublele('openInterestChange')
        .array('bestFiveData', {
            length: 10,
            type: new Parser()
                .endianess('little')
                .int16le('buySellFlag')
                .int64le('quantity')
                .int64le('price')
                .int16le('numberOfOrders'),
        })
        .int64le('upperCircuitLimit')
        .int64le('lowerCircuitLimit')
        .int64le('52WeekHighPrice')
        .int64le('52WeekLowPrice');

    return snapQuoteParser.parse(buffer);
}