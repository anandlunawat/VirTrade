import { useState, useEffect } from "react";
import { RiDeleteBin6Line } from "react-icons/ri"
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import OrderModal from "./OrderModal";
import CompCardModal from "./CompCardModal";
import { printLogs } from "../actions/logs";

export default function CompanyCards(props) {

    const [hydrated, isHydrated] = useState(false)
    // const [stockPrices, setStockPrices] = useState([{ token: Number, price: Number }])
    const [hover, setHover] = useState(null)
    const [modal, setModal] = useState({ modalStatus: false, stock: {} })
    const [compCardModal, setCompCardModal] = useState({ modalStatus: false, stock: {} })
    const [orderType, setOrderType] = useState("")
    const dispatch = useDispatch()
    const watchList = useSelector((state) => state.watchList);
    const livePrices = useSelector((state) => state.livePrice)

    useEffect(() => {
        isHydrated(true)
    }, [])

    // useEffect(() => {
    //     printLogs("props in companyCards",props)
    //     if (props.ltp && props.ltp.token) {
    //         const existingToken = stockPrices.findIndex((item) => item.token === props.ltp.token)
    //         if (existingToken === -1) {
    //             setStockPrices((preValue) => [
    //                 ...preValue,
    //                 { token: props.ltp.token, price: props.ltp.lastTradedPrice / 100 }
    //             ])
    //         } else {
    //             const arr = stockPrices.map((stockPrice) => {
    //                 if (stockPrice.token === props.ltp.token) {
    //                     return { ...stockPrice, price: props.ltp.lastTradedPrice / 100 }
    //                 }
    //                 return stockPrice
    //             })
    //             setStockPrices(arr)
    //         }
    //     }
    //     // }
    // }, [props])

    function removeModal() {
        setModal(false)
        document.querySelector("body").style.overflowY = "auto"
    }

    function handleDragStart(e, key) {
        e.dataTransfer.setData("text/plain", key);
        printLogs("handleDragStart", e, key)
    }

    function handleDragOver(e) {
        e.preventDefault()
        printLogs("handleDragOver", e)
    }

    function handleDrop(e, key) {
        e.preventDefault()
        dispatch({
            type: "DROP_STOCK",
            sourceIndex: e.dataTransfer.getData("text/plain"),
            targetIndex: key
        })
        printLogs("handleDrop", e, key)
    }

    function openCompCardModal(watchList) {
        setCompCardModal({ modalStatus: true, stock: watchList })
    }

    function closeCompCardModal() {
        setCompCardModal({ modalStatus: false, stock: {} })
    }

    function isAfterMarketCloseIST() {
        const now = new Date();
        const istOffset = 330; // IST offset in minutes
        const localOffset = now.getTimezoneOffset();
        const istTime = new Date(now.getTime() + (istOffset + localOffset) * 60000);
    
        const day = istTime.getDay(); // Sunday = 0, Saturday = 6
        const isWeekend = day === 0 || day === 6;
    
        const isAfterMarketClose = istTime.getHours() > 15 || 
            (istTime.getHours() === 15 && istTime.getMinutes() >= 30);
    
        // return isWeekend || isAfterMarketClose;
        return true;
    }
    

    return (
        !hydrated && livePrices && livePrices.stocks && livePrices.stocks.length > 0  ? null :
            <div className="relative flex flex-row gap-10 pt-4 md:flex-wrap max-md:flex-col">
                {
                    watchList.map((watchList, key) => (
                        <div key={key} draggable={!modal} onDragStart={(e) => handleDragStart(e, key)} onDragOver={(e) => handleDragOver(e)} onDrop={(e) => handleDrop(e, key)}>
                            <div onMouseOver={() => setHover(key)} onMouseOut={() => setHover(null)} className="flex relative flex-col bg-opacity-40 gap-2 bg-[#262424] items-center md:w-72 h-fit rounded-lg justify-center px-4 py-2 text-center">
                                {hover === key && <button onClick={() => openCompCardModal(watchList)} className="absolute text-red-500 right-2 top-2"><BsThreeDotsVertical /></button>}
                                {isAfterMarketCloseIST() ? <span>{watchList.ltp}</span> :<span>{(livePrices.stocks.find((item) => item.token === watchList.token)?.lastTradedPrice)/100}</span> }
                                <span className="text-green-500">{watchList.exch_seg} {watchList.symbol}</span>
                                <div className="flex flex-row gap-8 font-bold text-white">
                                    <button onClick={() => { setModal({ modalStatus: true, stock: watchList }); document.querySelector("body").style.overflowY = "hidden"; setOrderType("BUY") }} className="px-3 py-1 border-2 border-green-500 rounded-lg shadow-sm hover:bg-green-500 hover:text-black 2xl:py-3 shadow-green-500 2xl:px-7">BUY</button>
                                    <button onClick={() => { setModal({ modalStatus: true, stock: watchList }); setOrderType("SELL"); document.querySelector("body").style.overflowY = "hidden" }} className="px-3 py-1 ml-auto border-2 border-red-500 rounded-lg shadow-sm hover:bg-red-500 hover:text-black 2xl:py-3 shadow-red-500 2xl:px-7">SELL</button>
                                </div>
                                {compCardModal.modalStatus && compCardModal.stock.token == watchList.token && <CompCardModal stock={compCardModal.stock} removeModal={closeCompCardModal} />}
                            </div>
                            {modal.modalStatus && <OrderModal stock={modal.stock} type={orderType} removeModal={removeModal} />}
                        </div>
                    ))
                }
            </div>
    )
}