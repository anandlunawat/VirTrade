import {useEffect, useState} from "react"
import Market from "./api/Components/Market"
import CompanyCards from "./api/Components/CompanyCards"
import WebSocketV2 from "smartapi-javascript/lib/websocket2.0"


export default function Staking() {
    useEffect(()=>{
        let web_socket = new WebSocketV2({
            jwttoken: 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VybmFtZSI6IlAzMzQ0NjAiLCJyb2xlcyI6MCwidXNlcnR5cGUiOiJVU0VSIiwiaWF0IjoxNjg4OTMzMTgyLCJleHAiOjE2ODkwMTk1ODJ9.Z8K566E7gsMMmOoJogEbWSO7bLrqoQ39WqVpwmroRzqXYpucy1F-T42zglqFz0PK4BRfOQVSptEhirfiYc67dA',
            apikey: 'AGRYNg5p',
            clientcode: 'P334460',
            feedtype: 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VybmFtZSI6IlAzMzQ0NjAiLCJpYXQiOjE2ODg5MzMxODIsImV4cCI6MTY4OTAxOTU4Mn0.4ye9Gc8CPOimK15ECOc-TmHgvXFlsMgix0DMkKve8kKAa3k7A3XXzLfFvSE3WhAxzHtvgS1FkGgxfIMBrQCOvQ',
          });
          web_socket.connect().then((res) => {
            let json_req = {          
              action: 1,
              params: {
                mode: 4,
                tokenList: [
                  {
                    exchangeType: 1,
                    tokens: ['1232'],
                  },
                ],
              },
            };
          
            web_socket.fetchData(json_req);
            web_socket.on('tick', receiveTick);
              
            function receiveTick(data) {
              console.log('receiveTick:::::', data);
            }    
          });
    })
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
