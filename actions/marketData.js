import { logout } from './logout';
import { printLogs } from './logs';

export const marketData = async (stocks) => {
    var axios = require('axios');
    var existingTokens = localStorage.getItem("watchList") 
        ? JSON.parse(localStorage.getItem("watchList")) 
        : [];
    
    var updatedTokens = [...existingTokens, ...stocks];
    
    var exchangeSegments = ["NSE", "NFO", "BSE", "BFO", "CDS", "MCX"];
    var exchangeTokens = exchangeSegments.reduce((acc, segment) => {
        acc[segment] = updatedTokens
            .filter(item => item.exch_seg === segment)
            .map(item => item.token);
        return acc;
    }, {});
    
    var authorization = localStorage.getItem("jwtToken");

    var data = JSON.stringify({
        "mode": "LTP",
        "exchangeTokens": exchangeTokens
    });

    var config = {
        method: 'post',
        url: 'https://apiconnect.angelbroking.com/rest/secure/angelbroking/market/v1/quote/',
        headers: {
            'X-PrivateKey': process.env.NEXT_PUBLIC_API_KEY,
            'Accept': 'application/json',
            'X-SourceID': 'WEB',
            'X-ClientLocalIP': '192.168.1.12',
            'X-ClientPublicIP': '192.168.43.134',
            'X-MACAddress': '14-18-C3-33-66-CA',
            'X-UserType': 'USER',
            'Authorization': `Bearer ${authorization}`,
            'Content-Type': 'application/json'
        },
        data: data
    };
    
    try {
        const { data } = await axios(config);
        printLogs("market data", data);
        
        if (!data.status) {
            if (data.errorCode === "AG8001") {
                await logout();
            }
            return data;
        } else {
            return data.data.fetched;
        }
    } catch (e) {
        printLogs("Error", e);
    }
};
