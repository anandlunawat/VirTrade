import axios from "axios";
export const liveData = async() => {
    var data = JSON.stringify({
        "exchange": "NSE",
        "tradingsymbol": "PVR-EQ",
        "symboltoken": "13147"
    
    });
    
    var config = {
      method: 'post',
      url: 'https://apiconnect.angelbroking.com/order-service/rest/secure/angelbroking/order/v1/getLtpData',
      headers: { 
        'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJ1c2VybmFtZSI6IlAzMzQ0NjAiLCJyb2xlcyI6MCwidXNlcnR5cGUiOiJVU0VSIiwiaWF0IjoxNjcwODQyODMwLCJleHAiOjE3NTcyNDI4MzB9.pWOmcdf8Iowu_q-eoMOWLKKw1J89nQzK5xzErMcc5oClMJXIauMVeODutPvZu7EmHLSZ6H02DTLq-K4amFOhmg', 
        'Content-Type': 'application/json', 
        'Accept': 'application/json', 
        'X-UserType': 'USER', 
        'X-SourceID': 'WEB', 
        'X-ClientLocalIP': process.env.REACT_APP_LOCAL_IP, 
        'X-ClientPublicIP': process.env.REACT_APP_PUBLIC_IP, 
        'X-MACAddress': process.env.REACT_APP_MAC_ADD, 
        'X-PrivateKey': process.env.REACT_APP_API_KEY
      },
      data : data,
    };
    try {
        const {data} = await axios(config)
        console.log("Line 27 ",data)
        return data
    }
    catch(e) {
        console.log(e)
    }
}



// export function liveData() {
//     let { WebSocket } = require("smartapi-javascript");
//     let web_socket = new WebSocket({
//         client_code: process.env.REACT_APP_CLIENT_CODE,   
//         feed_token: process.env.REACT_APP_FEED,
//     })
//     web_socket.connect()
//     .then(() => {
//         //  web_socket.runScript("nse_cm|2885", "cn") // SCRIPT: nse_cm|2885, mcx_fo|222900  TASK: mw|sfi|dp
//         web_socket.runScript("nse_cm|2885,nse_cm|12549", "cn")
//         // web_socket.runScript("nse_cm|12549", "sfi")
//         web_socket.runScript("nse_cm|2885,nse_cm|12549", "mw")
//             setTimeout(function() {
//                 web_socket.close()
//             },1000)
//     })

// web_socket.on('tick', receiveTick)


// function receiveTick(data) {
//     console.log("receiveTick:::::", data)
// }
// return {
//     connection : 'done' ,
// }
// }
// import { WebSocketTwo } from "smartapi-javascript-next"

// export const liveData = () => {
//     // let {WebSocketTwo} = require("smartapi-javascript-next")
//     let web_socket = new WebSocketTwo({
//         api_key: process.env.REACT_APP_LIVE_API,
//         client_code: process.env.REACT_APP_CLIENT_CODE,   
//         feed_token: process.env.REACT_APP_FEED,
//         jwt_token: process.env.REACT_APP_JWT
//     })
//     web_socket.connect()
//     .then(()=> {
//         var script = '{"action" : 1, "params" :{"mode":1, "tokenList":[{"exchangeType":1,"tokens":["13147"]]}}'
//         web_socket.runScript(script)
//     })
//     web_socket.on('tick', receiveTick)
    
//     function receiveTick(data) {
//         console.log("receiveTick:::::", data)
//     }
//     return {
//         connection : 'done' ,
//     }
// }

// export const liveData = () => {
//     let {WebSocketClient} = require("smartapi-javascript")
//     let web_socket = new WebSocketClient({
//         clientcode: process.env.REACT_APP_CLIENT_CODE,    
//         jwttoken: process.env.REACT_APP_JWT,
//         apikey: process.env.REACT_APP_API_KEY,
//         feedtype: "order_feed",
//     });
//     web_socket.connect()
//     .then(()=> {
//         web_socket.fetchData("subscribe", "order_feed")
//     })

//     web_socket.on('tick', receiveTick);

//     function receiveTick(data) {
//         console.log("receiveTick:::::", data);
//     }

//     return {
//         connection : 'done' ,
//     }
// }

// export const liveData = () => {
//     let ws = require("ws")
//     let url = "ws://smartapisocket.angelone.in/smart-stream"
//     ws.on
// }