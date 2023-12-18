import { useState, useEffect } from "react";
import { RiDeleteBin6Line } from "react-icons/ri"
import { useDispatch } from "react-redux";
import OrderModal from "./OrderModal";

export default function CompanyCards(props) {

    const [hydrated, isHydrated] = useState(false)
    const [stockPrices, setStockPrices] = useState([{ token: Number, price: Number }])
    const [hover, setHover] = useState(null)
    const [modal, setModal] = useState(false)
    const [orderType, setOrderType] = useState("")
    const dispatch = useDispatch()

    useEffect(() => {
        isHydrated(true)
    }, [])

    useEffect(() => {
        const existingToken = stockPrices.findIndex((item) => item.token === props.ltp.token)
        if (existingToken === -1) {
            setStockPrices((preValue) => [
                ...preValue,
                { token: props.ltp.token, price: props.ltp.lastTradedPrice / 100 }
            ])
        } else {
            const arr = stockPrices.map((stockPrice) => {
                if (stockPrice.token === props.ltp.token) {
                    return { ...stockPrice, price: props.ltp.lastTradedPrice / 100 }
                }
                return stockPrice
            })
            setStockPrices(arr)
        }
        // }
    }, [props])

    function deleteStock(watchList) {
        dispatch({
            type: "DELETE_STOCK",
            payload: watchList.token
        })
    }

    function removeModal() {
        setModal(false)
        document.querySelector("body").style.overflowY = "auto"
    }

    function handleDragStart(e, key) {
        e.dataTransfer.setData("text/plain", key);
        console.log("handleDragStart", e, key)
    }

    function handleDragOver(e) {
        e.preventDefault()
        console.log("handleDragOver", e)
    }

    function handleDrop(e, key) {
        e.preventDefault()
        dispatch({
            type: "DROP_STOCK",
            sourceIndex: e.dataTransfer.getData("text/plain"),
            targetIndex: key
        })
        console.log("handleDrop", e, key)
    }

    return (
        !hydrated ? null :
            <div className="flex flex-row gap-10 pt-4 md:flex-wrap max-md:flex-col">
                {
                    props.watchLists.map((watchList, key) => (
                        <div key={key} draggable={!modal} onDragStart={(e) => handleDragStart(e, key)} onDragOver={(e) => handleDragOver(e)} onDrop={(e) => handleDrop(e, key)}>
                            <div onMouseOver={() => setHover(key)} onMouseOut={() => setHover(null)} className="flex relative flex-col bg-opacity-40 gap-2 bg-[#262424] items-center md:w-72 h-fit rounded-lg justify-center px-4 py-2 text-center">
                                {hover === key && <button onClick={() => deleteStock(watchList)} className="absolute text-red-500 right-2 top-2"><RiDeleteBin6Line /></button>}
                                <span>{(stockPrices.find((item) => item.token === watchList.token)?.price)}</span>
                                { watchList.ltp && watchList.ltp.map((instrumentValue, key) => (
                                    <span key={key}>{instrumentValue?.symbolToken === watchList.token ? instrumentValue.ltp : ""}</span>
                                ))}
                                <span className="text-green-500">{watchList.exch_seg} {watchList.symbol}</span>
                                <div className="flex flex-row gap-8 font-bold text-white">
                                    <button onClick={() => { setModal(true); document.querySelector("body").style.overflowY = "hidden"; setOrderType("BUY") }} className="px-3 py-1 border-2 border-green-500 rounded-lg shadow-sm hover:bg-green-500 hover:text-black 2xl:py-3 shadow-green-500 2xl:px-7">BUY</button>
                                    <button onClick={() => { setModal(true); setOrderType("SELL"); document.querySelector("body").style.overflowY = "hidden" }} className="px-3 py-1 ml-auto border-2 border-red-500 rounded-lg shadow-sm hover:bg-red-500 hover:text-black 2xl:py-3 shadow-red-500 2xl:px-7">SELL</button>
                                </div>
                            </div>
                            {modal && <OrderModal type={orderType} removeModal={removeModal} />}
                        </div>
                    ))
                }
            </div>
    )
}