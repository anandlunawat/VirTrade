import { useEffect, useState } from "react"
import Market from "../Components/Market"
import CompanyCards from "../Components/CompanyCards"
import LineChart from "../Components/LineChart";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { historicalData } from "../actions/historicalData";

const { Parser } = require('binary-parser');
const currentDate = new Date()

export default function Staking() {

    const [ltp, setLtp] = useState({})
    const [NiftyBank, setNiftyBank] = useState(0)
    const [Nifty, setNifty] = useState(0)
    const [authentication,setAuthentication] = useState({jwtToken:"",feedToken:""})
    const [chartN, setChartN] = useState([{}])
    const [arrayData, setArrayData] = useState([])

    const watchList = useSelector(state => state.watchList)

    const parsers = {
        1: parseLTP,
        2: parseQuote,
        3: parseSnapQuote,
    }    

    useEffect(()=>{
        async function data () {
            const data = await historicalData()            
        }
        data()
    },[])

    useEffect(()=>{
        const jwtToken = localStorage.getItem("jwtToken")
        const feedToken = localStorage.getItem("feedToken")
        setAuthentication({
            jwtToken : jwtToken,
            feedToken : feedToken
        })
    },[])

    useEffect(() => {        
        console.log("Watchlist", watchList)  
        console.log("headers",authentication)
        try {                    
            let headers = {
                "Authorization": "eyJhbGciOiJIUzUxMiJ9.eyJ1c2VybmFtZSI6IlAzMzQ0NjAiLCJyb2xlcyI6MCwidXNlcnR5cGUiOiJVU0VSIiwidG9rZW4iOiJleUpoYkdjaU9pSklVelV4TWlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKemRXSWlPaUpRTXpNME5EWXdJaXdpWlhod0lqb3hOamsxTXpnd09EQXdMQ0pwWVhRaU9qRTJPVFV5T0Rrd056Z3NJbXAwYVNJNklqSm1aalEwTXpZMkxUUXhaakV0TkRCa1ppMWlNRGt4TFdWbU1ERXhOR0ptTW1VeE1DSXNJbTl0Ym1WdFlXNWhaMlZ5YVdRaU9qTXNJbk52ZFhKalpXbGtJam9pTXlJc0luVnpaWEpmZEhsd1pTSTZJbU5zYVdWdWRDSXNJblJ2YTJWdVgzUjVjR1VpT2lKMGNtRmtaVjloWTJObGMzTmZkRzlyWlc0aUxDSm5iVjlwWkNJNk15d2ljMjkxY21ObElqb2lNeUo5LmltY0xZd2l5UmN4WHdURkZmT0p2XzF2eDVTbHRNd3hxYjZ6TTZYQmhWVmlPSnRaSWlWWXl1Wm85ZGNqcFJMMXBJOElZLWlqMDZQSnUxd01SUXZQSWdBIiwiaWF0IjoxNjk1Mjg5MTM4LCJleHAiOjE2OTUzNzU1Mzh9.ez31GY1M0KCHEe9WSPbUvU6btKbXrmRuoWFyXehVJgtaTqfbh7YD84-FfbbdFhGbITDNUVubbCT3szi5PqUiRQ",
                "APIKey": 'FOJ1QasU', 
                "FeedToken": "eyJhbGciOiJIUzUxMiJ9.eyJ1c2VybmFtZSI6IlAzMzQ0NjAiLCJpYXQiOjE2OTUyODkxMzgsImV4cCI6MTY5NTM3NTUzOH0.ZIGP-o3QzgKA33TNSUpxdUMJLJ61NjJmKNFVcBxz8T09yeCYxMUpIdVbbw23zmOG3jfctoQE84kjS5IMeK9wbQ",
                "ClientCode": "P334460"
            };
            const socket = io("ws://localhost:5000",{
                extraHeaders : headers,
                // closeOnBeforeunload : false
            })
            
            socket.on('connect', () => {
                console.log('Connected to the server');
                let arrayData = []
                if(watchList[0]) {
                    watchList.forEach(element => {
                        arrayData.push(element.token)
                    });                                                
                }                                
                socket.emit("sendData",JSON.stringify(arrayData))
                console.log("arraydata",arrayData)
              });
                
              socket.on('userId', (userId) => {                
                document.cookie = `userId=${userId}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
              });
              
              socket.on('liveFeed', (data) => {
                console.log('Received message:');    
                const buffer = Buffer.from(data);
                const subscriptionMode = buffer[0];
                const parser = parsers[subscriptionMode];
                if (parser) {
                    const parsedData = parser(buffer);                    
                    // console.log("parsedData",parsedData)
                    setLtp(parsedData)
                }
              });
              
              socket.on('error',(error)=>{
                console.log("Connection failed to server",error)
              })
              
              socket.on("disconnect",(reason)=>{
                console.log("reason",reason)
              })
        }
        catch (e) {
            console.log("Error",e)
        }                          
    }, [watchList])    

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
                    {/* <div className="md:basis-3/4 rounded-lg bg-opacity-40 bg-[#262424] w-full"> */}
                        {/* <LineChart
                            chartN={chartN}
                        /> */}
                        <img src="/chart.png" className="p-2 rounded-lg h-52 md:basis-3/4" />
                    {/* </div> */}
                </div>
                <CompanyCards
                    ltp={ltp}
                    watchLists={watchList}
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