import axios from "axios";

export const logout = async () => {
    var data = JSON.stringify({
        "clientcode" : "P334460",
    })

    var config = {
        method: 'post',
        url: 'https://apiconnect.angelbroking.com/rest/secure/angelbroking/user/v1/logout',
        headers : {
          'Authorization': localStorage.getItem("jwtToken"),
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-UserType': 'USER',
          'X-SourceID': 'WEB',
          'X-ClientLocalIP': "192.168.1.10",
          'X-ClientPublicIP': "192.168.43.134",
          'X-MACAddress': "14-18-C3-33-66-CA",
          'X-PrivateKey': "AGRYNg5p"
        },
        data : data
    };

    try {
        const {data} = await axios(config)
        console.log("Logout Data",data)
        if(data.success) {
            localStorage.clear()            
        } 
        return data
    }
    catch(e) {
        console.log(e)
    }
}