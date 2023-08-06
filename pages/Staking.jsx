import { useEffect, useState } from "react"
import Market from "../Components/Market"
import CompanyCards from "../Components/CompanyCards"
import LineChart from "../Components/LineChart";
import { useSelector } from "react-redux";

const { Parser } = require('binary-parser');
const currentDate = new Date()

export default function Staking() {

    const [ltp, setLtp] = useState({})
    const [NiftyBank, setNiftyBank] = useState(0)
    const [Nifty, setNifty] = useState(0)
    const [chartN, setChartN] = useState([{}])

    const watchList = useSelector(state => state.watchList)
    console.log("Watchlist",watchList)

    const parsers = {
        1: parseLTP,
        2: parseQuote,
        3: parseSnapQuote,
    };
    useEffect(() => {
        try {
            const websocket = new WebSocket("ws://localhost:5000")
            websocket.binaryType = "arraybuffer"
            websocket.onopen = (e) => {
                // console.log(e);
                // const arrayData = ["1333", "2885", "1594","99926009","99926000"];
                const arrayData = watchList;
                console.log("arrayData",arrayData)
                websocket.send(JSON.stringify(arrayData));
                // websocket.send("1333")
            }
            websocket.onmessage = (e) => {
                let data = e.data
                // console.log(e.data);
                const buffer = Buffer.from(data);
                const subscriptionMode = buffer[0];
                const parser = parsers[subscriptionMode];
                if (parser) {
                    const parsedData = parser(buffer);                    
                    setLtp(parsedData)
                }                
            }
            websocket.onclose = (e) => {
                console.log("Close", e)
            }
            websocket.onerror = (e) => {
                console.log("Error", e)
            }
        }
        catch (e) {
            console.log("Error")
        }     
        
        setTimeout(() => {        
            if (ltp.token == 253942) {            
                setChartN((preValue) => [
                    ...preValue,
                    { time: currentDate.getHours() - 12, price: ltp.lastTradedPrice / 100 }
                ])            
            }            
        }, 60000)
    
    }, [watchList])

    useEffect(() => {
        if (ltp.token == 253942) {
            setNiftyBank(ltp.lastTradedPrice / 100)
        }
        else if (ltp.token == 99926000) {            
            setNifty(ltp.lastTradedPrice / 100)
        }
    })

    return (
        <Market>
            <div className="mt-[20px] max-lg:mb-[25%] h-fit xl:ml-[22%] flex flex-col m-4 gap-2">
                <span>STAKING</span>
                <div className="flex max-md:flex-col md:h-[206px] flex-row gap-2">
                    <div className="flex flex-col gap-2">
                        <button className="flex flex-col p-2 bg-opacity-40 rounded-lg bg-[#262424] md:w-60">
                            <span>NIFTY</span>
                            <span className="text-green-500">{Nifty}</span>
                        </button>
                        <button className="flex flex-col p-2 bg-opacity-40 rounded-lg bg-[#262424] md:w-60">
                            <span>SENSEX</span>
                            <span className="text-green-500">65900</span>
                        </button>
                        <button className="flex flex-col p-2 bg-opacity-40 rounded-lg bg-[#262424] md:w-60">
                            <span>Crude Oil</span>
                            <span className="text-red-500">{NiftyBank}</span>
                        </button>
                    </div>
                    <div className="md:basis-3/4 rounded-lg bg-opacity-40 bg-[#262424] w-full">
                        <LineChart 
                        chartN={chartN}
                        />
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