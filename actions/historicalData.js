import { toast } from 'react-toastify';

export const historicalData = async (symbol) => {
    var axios = require('axios');
    var authorization = localStorage.getItem("jwtToken");
    const now = new Date();
    
    let year = now.getFullYear();
    let month = now.getMonth() + 1; // JS months are 0-based
    let day = now.getDate();
    let hours = now.getHours();
    let minutes = now.getMinutes();

    // Helper function to add leading zero for single-digit numbers
    const pad = (num) => (num < 10 ? `0${num}` : num);

    let fromYear = year, fromMonth = month, fromDay = day;
    let toYear = year, toMonth = month, toDay = day;

    // Check if today is Saturday or Sunday
    if (now.getDay() === 6) { // Saturday
        now.setDate(now.getDate() - 1); // Move to Friday
    } else if (now.getDay() === 0) { // Sunday
        now.setDate(now.getDate() - 2); // Move to Friday
    }

    // Update year, month, day after adjustment
    fromYear = toYear = now.getFullYear();
    fromMonth = toMonth = now.getMonth() + 1;
    fromDay = toDay = now.getDate();

    // Adjust for market open timing (before 9:15 AM)
    if (hours < 9 || (hours === 9 && minutes < 15)) {
        now.setDate(now.getDate() - 1); // Get yesterday’s data
        fromYear = toYear = now.getFullYear();
        fromMonth = toMonth = now.getMonth() + 1;
        fromDay = toDay = now.getDate();
    }

    // Format final timestamps with zero-padding
    const fromdate = `${fromYear}-${pad(fromMonth)}-${pad(fromDay)} 09:15`;
    const todate = `${toYear}-${pad(toMonth)}-${pad(toDay)} 15:45`;

    const data = JSON.stringify({
        exchange: symbol.exchange,
        symboltoken: symbol.symboltoken,
        interval: "FIFTEEN_MINUTE",
        fromdate: fromdate,
        todate: todate
    });

    console.log("Fetching data for:", data);

    var config = {
        method: 'post',
        url: 'https://apiconnect.angelone.in/rest/secure/angelbroking/historical/v1/getCandleData',
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
        if (data.message === 'SUCCESS') {
            return data.data;
        }
        toast.error("Error fetching Chart");
    } catch (e) {
        console.log("Error", e);
    }
};
