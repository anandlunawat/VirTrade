import axios from "axios";

export default async function LoginAPI () {
    var data = JSON.stringify({
        "clientcode": process.env.REACT_APP_CLIENT_CODE,
        "password": process.env.REACT_APP_PASSWORD,
        "totp": process.env.REACT_APP_TOTP
    });
    
    var config = {
      method: 'post',
      url: 'https://apiconnect.angelbroking.com//rest/auth/angelbroking/user/v1/loginByPassword',
    
      headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-UserType': 'USER',
        'X-SourceID': 'WEB',
        'X-ClientLocalIP': process.env.REACT_APP_LOCAL_IP,
        'X-ClientPublicIP': process.env.REACT_APP_PUBLIC_IP,
        'X-MACAddress': process.env.REACT_APP_MAC_ADD,
        'X-PrivateKey': process.env.REACT_APP_API_KEY
      },
      data : data
    };
    try {
        const {data} = await axios(config)
        console.log("Line 31",data)
        return data;
    }
    catch (e) {
        console.log(e)
    }
}