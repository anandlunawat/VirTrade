import { logout } from './logout';

export const marketData = async (stock) => {
    var axios = require('axios');
    var existingTokens = localStorage.getItem("watchList") ? (JSON.parse(localStorage.getItem("watchList")).map((stak) => stak)) : undefined
    var updatedTokens
    if (existingTokens) {
        updatedTokens = [...existingTokens, stock]
    } else {
        updatedTokens = [stock]
    }

    var updatedNseTokens = updatedTokens.reduce((acc, item) => {
        if (item.exch_seg === 'NSE') {
            acc.push(item.token);
        }
        return acc;
    }, []);
    var updatedNfoTokens = updatedTokens.reduce((acc, item) => {
        if (item.exch_seg === 'NFO') {
            acc.push(item.token);
        }
        return acc;
    }, []);
    var updatedBseTokens = updatedTokens.reduce((acc, item) => {
        if (item.exch_seg === 'BSE') {
            acc.push(item.token);
        }
        return acc;
    }, []);
    var updatedBfoTokens = updatedTokens.reduce((acc, item) => {
        if (item.exch_seg === 'BFO') {
            acc.push(item.token);
        }
        return acc;
    }, []);
    var updatedCdsTokens = updatedTokens.reduce((acc, item) => {
        if (item.exch_seg === 'CDS') {
            acc.push(item.token);
        }
        return acc;
    }, []);
    var updatedMcxTokens = updatedTokens.reduce((acc, item) => {
        if (item.exch_seg === 'MCX') {
            acc.push(item.token);
        }
        return acc;
    }, []);

    var authorization = (localStorage.getItem("jwtToken"))

    var data = JSON.stringify({
        "mode": "LTP",
        "exchangeTokens": {
            "NSE": updatedNseTokens,
            "NFO": updatedNfoTokens,
            "BSE": updatedBseTokens,
            "BFO": updatedBfoTokens,
            "CDS": updatedCdsTokens,
            "MCX": updatedMcxTokens
        }
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
        const { data } = await axios(config)
        console.log("market data", data)
        if(!data.status) {
            if (data.errorCode === "AG8001") {
                await logout()
            }
            return data
        } else {
            return data.data.fetched
        }
    }
    catch (e) {
        console.log("Error", e)
    }
}
