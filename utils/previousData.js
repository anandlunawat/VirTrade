import axios from "axios";

export const previousData = async() => {
    var data = JSON.stringify({
        "exchange":"NSE",
        "symboltoken":"13147",
        "interval":"FIFTEEN_MINUTE",
        "fromdate":"2022-12-08 09:15",
        "todate":"2022-12-08 15:45"
    });

var config = {
  method: 'post',
  url: 'https://apiconnect.angelbroking.com/rest/secure/angelbroking/historical/v1/getCandleData',
  headers: { 
    'X-PrivateKey': process.env.REACT_APP_API_KEY, 
    'Accept': 'application/json', 
    'X-SourceID': 'WEB', 
    'X-ClientLocalIP': process.env.REACT_APP_LOCAL_IP, 
    'X-ClientPublicIP': process.env.REACT_APP_PUBLIC_IP, 
    'X-MACAddress': process.env.REACT_APP_MAC_ADD, 
    'X-UserType': 'USER', 
    'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJ1c2VybmFtZSI6IlAzMzQ0NjAiLCJyb2xlcyI6MCwidXNlcnR5cGUiOiJVU0VSIiwiaWF0IjoxNjcwNDkwODMwLCJleHAiOjE3NTY4OTA4MzB9.AeK-CRIbuAribGRy3dl4Z8n91ANHqZNO7m0otpeOshxA7SL1jggxv1qKW9EaURG1G5UsT8-2dbl5xb_pus1t7g', 
    'Content-Type': 'application/json'
  },
  data : data,
};
    try {
        const {data} = await axios(config)
        console.log("Line 30 ",data)
        return data
    }
    catch(e) {
        console.log(e)
    }
}