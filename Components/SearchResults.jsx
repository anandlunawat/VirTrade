import { useDispatch } from "react-redux"

export default function SearchResults(props) {

    const dispatch = useDispatch()    

    function addStock(stock) {        
        dispatch({
            type : "ADD_STOCK",
            payload : stock
        })               
        const existingWatchList = JSON.parse(localStorage.getItem("watchList")) || [];       
        const updatedWatchList = [...existingWatchList, stock];
        localStorage.setItem("watchList", JSON.stringify(updatedWatchList));
    
        console.log("localstorage", localStorage.getItem("watchList"));
    }    

    return (
        <div className="h-screen m-4 overflow-y-auto">
            {
                props.searchedStock.map((stock)=>(
                    <div className="flex flex-row gap-12 border-[1px] p-2 rounded-lg border-gray-800 m-2" key={stock.token}>
                        <span className={`text-lg font-semibold ${stock.exch_seg === "NSE" ? "text-green-500" : stock.exch_seg === "BSE" ? "text-red-500" : "text-gray-600"} uppercase`}>{stock.exch_seg}</span>                        
                        <span className="text-lg font-semibold text-white uppercase basis-1/2">{stock.symbol?.match(/[a-zA-Z]+|[0-9]+/g)?.join(' ')}</span>                        
                        <button onClick={()=>{addStock(stock)}} className="w-10 h-10 ml-auto text-2xl text-green-500 border-2 border-green-500">+</button>
                    </div>
                ))
            }
        </div>                
    )
}