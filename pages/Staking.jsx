import {useEffect, useState} from "react"
import dynamic from "next/dynamic";
import WebSocket from "isomorphic-ws";
const Market = dynamic(() => import("./api/Components/Market"));
const CompanyCards = dynamic(() => import("./api/Components/CompanyCards"));


export default function Staking() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
      }, []);
  
    useEffect(() => {
      if (isClient) {
        const connectWebSocket = () => {
            // Create a WebSocket connection
            const socket = new WebSocket("ws://smartapisocket.angelone.in/smart-stream");
        
            // Handle connection open event
            socket.onopen = () => {
              console.log("WebSocket connection established");
              // Send authentication headers
              const headers = {
                "Authorization": "eyJhbGciOiJIUzUxMiJ9.eyJ1c2VybmFtZSI6IlAzMzQ0NjAiLCJyb2xlcyI6MCwidXNlcnR5cGUiOiJVU0VSIiwiaWF0IjoxNjg4OTA3MzE1LCJleHAiOjE2ODg5OTM3MTV9.iBBxY0TBdfIJBKy5wH1Idhq-EGe9qFAkQEXSYPlTH0Ilg2NMbBzEqXm9SMRGudXg7-KV6ORWUaSUY1D58buIRQ",
                "x-api-key": "AGRYNg5p",
                "x-client-code": "P334460",
                "x-feed-token": "eyJhbGciOiJIUzUxMiJ9.eyJ1c2VybmFtZSI6IlAzMzQ0NjAiLCJpYXQiOjE2ODg5MDczMTUsImV4cCI6MTY4ODk5MzcxNX0.2WDoovh5gAZWqYdAQUkp6IvDS8bUn_-Tnv5TU49qso5TKT-IlMTMIv179u8UYIUO1RVaFFHQxr9J9B1GqktDuQ",
              };
              socket.send(headers);
        
              // Send subscription request
              const subscriptionRequest = {
                action: 1, // Subscribe
                params: {
                  mode: 1, // LTP mode
                  tokenList: [
                    {
                      exchangeType: 1, // nse_cm
                      tokens: ["10626", "5290"], // Example tokens
                    },
                    {
                      exchangeType: 5, // mcx_fo
                      tokens: ["234230", "234235", "234219"], // Example tokens
                    },
                  ],
                },
              };
              socket.send(subscriptionRequest);
            };
        
            // Handle received messages
            socket.onmessage = (message) => {
              const data = message.data;
              // Process and handle the received market feed data
              console.log("Received market feed data:", data);
              heartbeatInterval()
            };
        
            // Handle connection close event
            socket.onclose = () => {
              console.log("WebSocket connection closed");
            };
        
            // Handle connection error event
            socket.onerror = (error) => {
              console.error("WebSocket connection error:", error);
            };
        
            // Send heartbeat message every 30 seconds to keep the connection alive
            const heartbeatInterval = setInterval(() => {
              socket.send("ping");
            }, 30000);
        
            // Clean up the WebSocket connection and heartbeat interval on component unmount
            // return () => {
            //   clearInterval(heartbeatInterval);
            // //   socket.close();
            // };
          };
          if(localStorage.getItem("jwtToken") && isClient){
            console.log("Login Successfull")
            connectWebSocket()
          }          
      }
    }, [isClient]);
  
    return (
        <Market>
            <div className="py-16 h-fit xl:ml-[22%] flex flex-col m-4 gap-2">
                <span>STAKING</span>
                <div className="flex max-md:flex-col md:h-[200px] flex-row gap-2">
                    <div className="flex flex-col gap-2">
                        <button className="flex flex-col p-2 bg-opacity-40 rounded-lg bg-[#262424] md:w-60">
                            <span>NIFTY</span>
                            <span className="text-green-500">19590</span>
                        </button>
                        <button className="flex flex-col p-2 bg-opacity-40 rounded-lg bg-[#262424] md:w-60">
                            <span>SENSEX</span>
                            <span className="text-green-500">65900</span>
                        </button>
                        <button className="flex flex-col p-2 bg-opacity-40 rounded-lg bg-[#262424] md:w-60">
                            <span>NIFTY BANK</span>
                            <span className="text-red-500">50000</span>
                        </button>
                    </div>
                    <div className="md:basis-3/4 rounded-lg bg-opacity-40 bg-[#262424] w-full">                        
                        <img src="/chart.png" alt="Nifty" className="p-2 h-[199px] w-full"/>
                    </div>
                </div>
                <CompanyCards />
            </div>        
        </Market>
    )
}