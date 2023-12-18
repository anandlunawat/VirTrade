export const marketData = async (stock) => {

    var axios = require('axios');
    var existingTokens = localStorage.getItem("watchList") ? (JSON.parse(localStorage.getItem("watchList")).map((stak) => stak.token)) : undefined    
    var updatedTokens    
    if(existingTokens) {        
        updatedTokens = [...existingTokens,stock.token]
    } else {        
        updatedTokens = [stock.token]
    }    

    var data = JSON.stringify({
        "mode": "LTP",
        "exchangeTokens": {
            "NSE": updatedTokens
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
            'Authorization': process.env.NEXT_PUBLIC_JWT_TOKEN,
            'Content-Type': 'application/json'
        },
        data: data
    };
    try {
        const { data } = await axios(config)  
        console.log("market data",data)  
        return data.data.fetched        
    }
    catch (e) {
        console.log("Error", e)
    }
}
