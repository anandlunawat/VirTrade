import { printLogs } from './logs';

export const refreshToken = async () => {

    var axios = require('axios');
    const refreshToken = localStorage.getItem('refreshToken')
    const jwtToken = localStorage.getItem('jwtToken')
    var data = JSON.stringify({
        "refreshToken": refreshToken
    });

    var config = {
        method: 'post',
        url: 'https://apiconnect.angelone.in/rest/auth/angelbroking/jwt/v1/generateTokens',
      
        headers: {
          'Authorization': `Bearer ${jwtToken}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-UserType': 'USER',
          'X-SourceID': 'WEB',
          'X-ClientLocalIP': 'CLIENT_LOCAL_IP',
          'X-ClientPublicIP': 'CLIENT_PUBLIC_IP',
          'X-MACAddress': 'MAC_ADDRESS',
          'X-PrivateKey': process.env.NEXT_PUBLIC_API_KEY
        },
        data : data
      };

      try {
        const { data } = await axios(config)
        printLogs("Refreshed Token", data)
        if (data.status) {
            localStorage.setItem("feedToken",data.data.feedToken)
            localStorage.setItem("jwtToken",data.data.jwtToken)
            localStorage.setItem("refreshToken",data.data.refreshToken)
        } else {
            printLogs("Invalid Refresh Token Data")
        }
      } catch(e) {
        printLogs("Error refreshing Token",e)
      }
}