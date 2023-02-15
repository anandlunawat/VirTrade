import axios from "axios";

export const Logout = async () => {
    var data = JSON.stringify({
        "clientcode": process.env.REACT_APP_CLIENT_CODE
    });
    
    var config = {
      method: 'post',
      url: 'https://apiconnect.angelbroking.com/rest/secure/angelbroking/user/v1/logout',
      headers : {
        'Authorization': "Bearer eyJhbGciOiJIUzUxMiJ9.eyJ1c2VybmFtZSI6IlAzMzQ0NjAiLCJyb2xlcyI6MCwidXNlcnR5cGUiOiJVU0VSIiwiaWF0IjoxNjcxOTkyNDUzLCJleHAiOjE3NTgzOTI0NTN9.3fmbaXG4Enfctj_pTtcxPWXRRWCMDV4uT4IlvRVRyJyhLXWZkv6JbVFRirXEATf1bSg1WIfdW4a3FWf1qHupBA",
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-UserType': 'USER',
        'X-SourceID': 'WEB',
        'X-ClientLocalIP': "192.168.1.10",
        'X-ClientPublicIP': "192.168.43.134",
        'X-MACAddress': "14-18-C3-33-66-CA",
        'X-PrivateKey': "nEH9iQOS"
      },
      data : data
    };
    try {
        const {data} = await axios(config);
        console.log("Line 26",data)
        return data;
    } 
    catch (e) {
        console.log(e);
    }
}
