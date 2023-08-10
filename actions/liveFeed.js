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
        let headers
        if(window) {
            console.log(localStorage.getItem("jwtToken"),)
            headers = {
                "Authorization": "eyJhbGciOiJIUzUxMiJ9.eyJ1c2VybmFtZSI6IlAzMzQ0NjAiLCJyb2xlcyI6MCwidXNlcnR5cGUiOiJVU0VSIiwiaWF0IjoxNjkxNTg4OTUyLCJleHAiOjE2OTE2NzUzNTJ9.7yKS4-0IS1o9BCTZcdsLf6xwA0mMoYcrZ2lVz-XurH_F14bbTjzbYBlj7zMU1ykHjryn9oO5Gdtr9iyFAIeEvA",
                "APIKey": 'AGRYNg5p', 
                "FeedToken": 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VybmFtZSI6IlAzMzQ0NjAiLCJpYXQiOjE2OTE1ODg5NTIsImV4cCI6MTY5MTY3NTM1Mn0.u5PW8YMFwt13XJj2k6nv8kgK_Pb98zdU-co-t3_twYS-3065zx7FJVdYhPH8Py5VUA2ym91IPo5PsbSjngO7Cg',
                "ClientCode": "P334460"
              };
        } 
        
        const socket = io("ws://localhost:5000",{
            extraHeaders : headers
        })
        
        socket.on('connect', () => {
            console.log('Connected to the server');
            let arrayData = []
            if(watchList[0]) {
                watchList.forEach(element => {
                    arrayData.push(element.token)
                });                                                
            }                                
            socket.emit("sendData",JSON.stringify(arrayData))
            console.log("arraydata",arrayData)
          });
            
          socket.on('liveFeed', (data) => {
            console.log('Received message:', data);    
            const buffer = Buffer.from(data);
            const subscriptionMode = buffer[0];
            const parser = parsers[subscriptionMode];
            if (parser) {
                const parsedData = parser(buffer);                    
                console.log("parsedData",parsedData)
                setLtp(parsedData)
            }
          });
          
          socket.on('error',(error)=>{
            console.log("Connection failed to server",error)
          })
          
          socket.on("disconnect",(reason)=>{
            console.log("reason",reason)
          })
    }
    catch (e) {
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