import { toast } from 'react-toastify';

export const historicalData = async () =>{
    var axios = require ('axios')
    var authorization = (localStorage.getItem("jwtToken"))

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
      
        return `${year}-${month}-${day}`;
      };
      
      // Generate a date and format it
      const currentDate = new Date();
      const formattedDate = formatDate(currentDate);
    //   console.log("formattedDate",formattedDate)

    var data = JSON.stringify({"exchange":"NSE","symboltoken":"3045",
    "interval":"FIFTEEN_MINUTE","fromdate":`2023-${String(currentDate.getMonth()+1).padStart(2,'0')}-18 09:15`,
    "todate":`${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-18 15:30`});

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
        console.log("historical data",data.data)  
        if(data.message==='SUCCESS') {
            return data.data
        }        
        toast.error("Error fetching historical data")
    }
    catch (e) {
        console.log("Error", e)
    }
}