import { toast } from 'react-toastify';

export const historicalData = async () =>{
    var axios = require ('axios')
    var authorization = (localStorage.getItem("jwtToken"))
    const now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1; // JS months are 0-based
    let day = now.getDate();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    
    // Helper function to add leading zero for single-digit numbers
    const pad = (num) => (num < 10 ? `0${num}` : num);
    
    // Adjust for yesterday if before market open
    let fromYear = year, fromMonth = month, fromDay = day;
    let toYear = year, toMonth = month, toDay = day;
    
    if (hours < 9 || (hours === 9 && minutes < 15)) {
      // Before market hours, show yesterday's data
      let yesterday = new Date(now);
      yesterday.setDate(now.getDate() - 1);
      fromYear = toYear = yesterday.getFullYear();
      fromMonth = toMonth = yesterday.getMonth() + 1;
      fromDay = toDay = yesterday.getDate();
    }
    
    // Format final timestamps with zero-padding
    const fromdate = `${fromYear}-${pad(fromMonth)}-${pad(fromDay)} 09:15`;
    const todate = `${toYear}-${pad(toMonth)}-${pad(toDay)} 15:30`;
    
    const data = JSON.stringify({
      exchange: "NSE",
      symboltoken: "3045",
      interval: "FIFTEEN_MINUTE",
      fromdate: fromdate,
      todate: todate
    });
    
    console.log(data);
    

    var config = {
        method: 'post',
        url: 'https://apiconnect.angelbroking.com/rest/secure/angelbroking/historical/v1/getCandleData',
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
        if(data.message==='SUCCESS') {
            return data.data
        }        
        toast.error("Error fetching Chart")
    }
    catch (e) {
        console.log("Error", e)
    }
}