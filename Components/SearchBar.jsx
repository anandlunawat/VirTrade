import React,{ useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import SearchResults from './SearchResults'
import { useEffect } from 'react'
import { printLogs } from "../actions/logs";


const SearchBar = (props) => {

    const [searchedStock, setSearchedStock] = useState([{}])    
    const [filter, setFilter] = useState("ALL")
    const [keyword,setKeyword] = useState("")

    const filters = (e) => {
        printLogs(e.target.value)
        if (e.target.value != '') {
            setKeyword(e.target.value)
        } else {
            setSearchedStock(() => [])
            setKeyword("")
        }
    }

    useEffect(()=>{
        if(filter === "STOCKS"){                 
            setSearchedStock(props.instruments.filter((instrument) => instrument.symbol?.startsWith(keyword.toUpperCase()) && (instrument.exch_seg==="BSE" || instrument.exch_seg==="NSE")))
        } else if(filter === "F&O") {            
            setSearchedStock(props.instruments.filter((instrument) => instrument.symbol?.startsWith(keyword.toUpperCase()) && instrument.exch_seg==="NFO"))
        } else if(filter === "INDICES") {
            setSearchedStock(props.instruments.filter((instrument) => instrument.symbol?.startsWith(keyword.toUpperCase()) && (instrument.exch_seg==="BSE" || instrument.exch_seg==="NSE") && instrument.instrumenttype === "AMXIDX"))
        } else {
            if(keyword!==""){
                setSearchedStock(props.instruments.filter((instrument) => instrument.symbol?.startsWith(keyword.toUpperCase())))
            }        
        }
    },[filter, keyword,props])

    return (
        <div className='w-full p-4'>
            <div className="flex text-white w-full flex-row gap-2 items-center border border-solid border-[#D0D5DD] rounded-lg shadow-b p-2">
                <CiSearch />
                <input id='searchInput' type={"search"} className="w-full bg-transparent peer/cc focus:outline-none" placeholder="Start Searching" onChange={filters} />
            </div>
            {
                keyword!== "" && 
                <SearchResults searchedStock={searchedStock}>            
                    <div className="flex flex-row gap-2 m-5 justify-evenly">
                        <button onClick={() => setFilter("ALL")} className={`${filter === "ALL" ? "bg-[#262424] text-green-500" : "bg-black border-[1px] border-[262424] text-white"} sm:px-8 sm:py-1 px-4 py-1 font-semibold text-lg rounded-full`}>All</button>
                        <button onClick={() => { setFilter("STOCKS") }} className={`${filter === "STOCKS" ? "bg-[#262424] text-green-500" : "bg-black border-[1px] border-[262424] text-white"} sm:px-8 sm:py-1 px-4 py-1 font-semibold text-lg rounded-full`}>Stocks</button>
                        <button onClick={() => { setFilter("INDICES") }} className={`${filter === "INDICES" ? "bg-[#262424] text-green-500" : "bg-black border-[1px] border-[262424] text-white"} sm:px-8 sm:py-1 px-4 py-1 font-semibold text-lg rounded-full`}>Indices</button>
                        <button onClick={() => { setFilter("F&O") }} className={`${filter === "F&O" ? "bg-[#262424] text-green-500" : "bg-black border-[1px] border-[262424] text-white"} sm:px-8 sm:py-1 px-4 py-1 font-semibold text-lg rounded-full`}>F&O</button>
                    </div>
                </SearchResults>
            }
        </div>
    )
}

export default React.memo(SearchBar)