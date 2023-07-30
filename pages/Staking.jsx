import {useEffect, useState} from "react"
import Market from "../Components/Market"
import CompanyCards from "../Components/CompanyCards"
import Chart from "chart.js/auto"

const { Parser } = require('binary-parser');

export default function Staking() {

    const [ltp,setLtp] = useState({})
    const parsers = {
        1: parseLTP,
        2: parseQuote,
        3: parseSnapQuote,
    };
    useEffect(()=>{
        try {
            const websocket = new WebSocket("ws://localhost:5000")
            websocket.binaryType = "arraybuffer"
            websocket.onopen = (e) =>{
                // console.log(e);
                const arrayData = ["1333", "2885", "1594"];
                // const arrayData = ["1594"];
                websocket.send(JSON.stringify(arrayData));            
                // websocket.send("1333")
            }
            websocket.onmessage = (e) =>{            
                let data = e.data
                // console.log(e.data);
                const buffer = Buffer.from(data);
                const subscriptionMode = buffer[0];
                const parser = parsers[subscriptionMode]; 
                if (parser) {
                    const parsedData = parser(buffer);              
                    // console.log('Parsed data:', parsedData.lastTradedPrice/100);                            
                    setLtp(parsedData)
                    // console.log("ltp",ltp)
                }
                // console.log(JSON.parse(e.data))
            }
            websocket.onclose = (e) =>{
                console.log("Close",e)
            }
            websocket.onerror = (e) => {
                console.log("Error",e)
            }
        }
        catch(e) {
            console.log("Error")
        }

        const data = [
            { year: 2010, count: 10 },
            { year: 2011, count: 20 },
            { year: 2012, count: 15 },
            { year: 2013, count: -1 },
            { year: 2014, count: 22 },
            { year: 2015, count: 30 },
            { year: 2016, count: -5 },
            { year: 2016, count: 25 },
            { year: 2017, count: 5 },
            { year: 2018, count: 115 },
            { year: 2019, count: 15 },
            { year: 2020, count: 25 },
            { year: 2021, count: 5 },
          ];
        
          let line_Chart = new Chart(
            document.getElementById('chart_js'),
            {
              type: 'line',
              data: {                
                labels: data.map(row => row.year),
                datasets: [
                  {
                    label: 'Acquisitions by year',
                    data: data.map(row => row.count)
                  }
                ]
              },
              options: {
                responsive: true,
                maintainAspectRatio: true
              }
            }
          );
          return () => line_Chart.destroy()
    },[])
    return (      
        <Market>
            <div className="mt-[20px] max-lg:mb-[25%] h-fit xl:ml-[22%] flex flex-col m-4 gap-2">
                <span>STAKING</span>
                <div className="flex max-md:flex-col md:h-[206px] flex-row gap-2">
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
                        <canvas id="chart_js"></canvas>
                    </div>
                </div>
                <CompanyCards 
                ltp={ltp}
                />
            </div>        
        </Market>
    )
}

function parseLTP(buffer) {
    console.log("buffer",buffer)
    const ltpParser = new Parser()
        // .endianess('little')
        .int8('subscriptionMode')
        .int8('exchangeType')
        .string('token', { length: 25, encoding: 'utf8', stripNull: true })
        .int64le('sequenceNumber')
        .int64le('exchangeTimestamp')
        .int32le('lastTradedPrice');

    return ltpParser.parse(buffer);
}

// Function to parse Quote data
function parseQuote(buffer) {
    const quoteParser = new Parser()
        .endianess('little')
        .int8('subscriptionMode')
        .int8('exchangeType')
        .string('token', { length: 25, encoding: 'utf8', stripNull: true })
        .int64le('sequenceNumber')
        .int64le('exchangeTimestamp')
        .int64le('lastTradedPrice')
        .int64le('lastTradedQuantity')
        .int64le('averageTradedPrice')
        .int64le('volumeTraded')
        .doublele('totalBuyQuantity')
        .doublele('totalSellQuantity')
        .int64le('openPriceOfDay')
        .int64le('highPriceOfDay')
        .int64le('lowPriceOfDay')
        .int64le('closePrice');

    return quoteParser.parse(buffer);
}

// Function to parse Snap Quote data
function parseSnapQuote(buffer) {
    const snapQuoteParser = new Parser()
        .endianess('little')
        .int8('subscriptionMode')
        .int8('exchangeType')
        .string('token', { length: 25, encoding: 'utf8', stripNull: true })
        .int64le('sequenceNumber')
        .int64le('exchangeTimestamp')
        .int64le('lastTradedPrice')
        .int64le('lastTradedQuantity')
        .int64le('averageTradedPrice')
        .int64le('volumeTraded')
        .doublele('totalBuyQuantity')
        .doublele('totalSellQuantity')
        .int64le('openPriceOfDay')
        .int64le('highPriceOfDay')
        .int64le('lowPriceOfDay')
        .int64le('closePrice')
        .int64le('lastTradedTimestamp')
        .int64le('openInterest')
        .doublele('openInterestChange')
        .array('bestFiveData', {
            length: 10,
            type: new Parser()
                .endianess('little')
                .int16le('buySellFlag')
                .int64le('quantity')
                .int64le('price')
                .int16le('numberOfOrders'),
        })
        .int64le('upperCircuitLimit')
        .int64le('lowerCircuitLimit')
        .int64le('52WeekHighPrice')
        .int64le('52WeekLowPrice');

    return snapQuoteParser.parse(buffer);
}