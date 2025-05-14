import axios from "axios";
import { printLogs } from './logs';
// import { toast } from 'react-toastify';

// export const logout = async () => {
export const logout = async () => {
    const clientCode = localStorage.getItem('clientCode')
    const jwtToken = localStorage.getItem('jwtToken')
    var axios = require('axios');
    var data = JSON.stringify({
        "clientcode":clientCode
    });
    
    var config = {
      method: 'post',
      url: 'https://apiconnect.angelone.in/rest/secure/angelbroking/user/v1/logout',
      headers : {
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
        const {data} = await axios(config)
        if (data.status) {
            toast.error("PLease Login to access.")
            router.push('/');
            localStorage.clear()            
    
        }
    } catch (e) {
        printLogs("Error while logging out")
    }
}