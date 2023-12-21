import { toast } from 'react-toastify';

export const historicalData = async () =>{
    var axios = require ('axios')
    var authorization = (localStorage.getItem("jwtToken"))
    const currentDate = new Date();      
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');

    var data = JSON.stringify({"exchange":"NSE","symboltoken":"3045",
    "interval":"FIFTEEN_MINUTE","fromdate":`${year}-${day-1 == 0 ? month-1 : month}-${hours > 0 && hours < 9 ? day-1 : day} 09:15`,
    "todate":`${year}-${month}-${day} ${hours > 15 && minutes > 30 ? "15:30" : `${hours}:${minutes}`}`});

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
        toast.error("Error fetching historical data")
    }
    catch (e) {
        console.log("Error", e)
    }
}