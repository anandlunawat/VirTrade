import { useDispatch } from "react-redux"
import {BsSearch} from "react-icons/bs"
import { marketData } from "../actions/marketData"

export function addStock(stock) {         
    return{
        type : "ADD_STOCK",
        payload : stock,
        // ltp : ltp
    }
}   

export default function SearchResults({searchedStock,children}) {

    const dispatch = useDispatch()          
    
    const thunkFunc = (stock) => {
        return async (dispatch,getState)=>{
            try {
                const res = await marketData(stock)
                dispatch(addStock(stock,res))                
            }catch(e) {
                console.log("Error while fetching",e)
            }
        }
    }

    return (
        <div className="h-screen overflow-y-auto">
            {children}
            {
                searchedStock.length ==0 ? 
                <div className="sm:ml-[30%] max-sm:ml-[20%] mt-[25%] flex gap-4 items-center text-xl font-normal">
                    <BsSearch style={{color: "#22c55e"}}/>
                    No stocks filtered
                </div> :
                searchedStock.map((stock,key)=>(
                    <div className="flex flex-row gap-12 border-[1px] p-2 rounded-lg border-gray-800 m-2" key={key}>
                        <span className={`text-lg font-semibold ${stock.exch_seg === "NSE" ? "text-green-500" : stock.exch_seg === "BSE" ? "text-red-500" : "text-gray-600"} uppercase`}>{stock.exch_seg}</span>                        
                        <span className="text-lg font-semibold text-white uppercase basis-1/2">{stock.symbol?.match(/[a-zA-Z]+|[0-9]+/g)?.join(' ')}</span>                        
                        {/* <button onClick={()=>{dispatch(thunkFunc(stock))}} className="w-10 h-10 ml-auto text-2xl text-green-500 border-2 border-green-500">+</button> */}
                        <button onClick={()=>{addStock(stock)}} className="w-10 h-10 ml-auto text-2xl text-green-500 border-2 border-green-500">+</button>
                    </div>
                ))
            }
        </div>                
    )
}