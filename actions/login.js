// import {useRouter} from 'next/router'
import axios from "axios";
import { printLogs } from './logs';

export const Login = async (client,pass,totp) => {
    // const router = useRouter()
    var data = JSON.stringify({
        "clientcode": client,
        "password": pass,
        "totp": totp
    });

    var config = {
        method: 'post',
        url: 'https://apiconnect.angelbroking.com/rest/auth/angelbroking/user/v1/loginByPassword',
        headers : {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-UserType': 'USER',
            'X-SourceID': 'WEB',
            'X-ClientLocalIP': "192.168.1.10",
            'X-ClientPublicIP': "192.168.43.134",
            'X-MACAddress': "14-18-C3-33-66-CA",
            'X-PrivateKey': process.env.NEXT_PUBLIC_API_KEY
        },
        data : data
    };
    try {
        const {data} = await axios(config)        
        printLogs("Line 31",data)
        if(data.status) {
            localStorage.setItem("feedToken",data.data.feedToken)
            localStorage.setItem("jwtToken",data.data.jwtToken)
            localStorage.setItem("refreshToken",data.data.refreshToken)
            return data.status
            // router.push("/Dashboard")
        }
    }
    catch (e) {
        printLogs(e)
    }
}