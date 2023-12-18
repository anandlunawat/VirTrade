export const marketData = async () => {

    var axios = require('axios');
    var tokens = (JSON.parse(localStorage.getItem("watchList")).map((stak) => stak.token))
    console.log("tokens",tokens)
    var data = JSON.stringify({
        "mode": "LTP",
        "exchangeTokens": {
            "NSE": tokens
        }
    });

    var config = {
        method: 'post',
        url: 'https://apiconnect.angelbroking.com/rest/secure/angelbroking/market/v1/quote/',
        headers: {
            'X-PrivateKey': 'nEH9iQOS',
            'Accept': 'application/json',
            'X-SourceID': 'WEB',
            'X-ClientLocalIP': '192.168.1.12',
            'X-ClientPublicIP': '192.168.43.134',
            'X-MACAddress': '14-18-C3-33-66-CA',
            'X-UserType': 'USER',
            'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJ1c2VybmFtZSI6IlAzMzQ0NjAiLCJyb2xlcyI6MCwidXNlcnR5cGUiOiJVU0VSIiwidG9rZW4iOiJleUpoYkdjaU9pSklVelV4TWlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKemRXSWlPaUpRTXpNME5EWXdJaXdpWlhod0lqb3hOekF5T1Rnek1qUXdMQ0pwWVhRaU9qRTNNREk0T0RnNU9USXNJbXAwYVNJNkltTXdZV0ZoWmpjNUxUa3paamN0TkdNMk9DMWhNMkUxTFRNMVptRm1OVGN5Wm1KallTSXNJbTl0Ym1WdFlXNWhaMlZ5YVdRaU9qTXNJbk52ZFhKalpXbGtJam9pTXlJc0luVnpaWEpmZEhsd1pTSTZJbU5zYVdWdWRDSXNJblJ2YTJWdVgzUjVjR1VpT2lKMGNtRmtaVjloWTJObGMzTmZkRzlyWlc0aUxDSm5iVjlwWkNJNk15d2ljMjkxY21ObElqb2lNeUo5LlRWTDBJVjUxOUZQWm9wV01QU3dmV3hDRmNzOFNhbDFMdEoyTWNyc1pmSHJYM0t4TVJSdEJUcXpjMGxnRHV4ZXJfUl9kVS1MOGRoZFJpWFBvZnNoSnJBIiwiQVBJLUtFWSI6Im5FSDlpUU9TIiwiaWF0IjoxNzAyODg5MDUyLCJleHAiOjE3MDI5ODMyNDB9.aIlLc00FWO_TRyvoAEVSDXEXegIjnUB2CWfxYJ0ISMpxE6kEiEKV0atyrvCfcCRnoetUfQTKj_YlBgenmnV88Q',
            'Content-Type': 'application/json'
        },
        data: data
    };
    try {
        const { data } = await axios(config)    
        return data.data.fetched
        // localStorage.setItem("payload Ltp",JSON.stringify(data.data.fetched))
    }
    catch (e) {
        console.log("Error", e)
    }
}
