import { useEffect, useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import { stocks } from '../actions/stocks'
import SearchResults from './SearchResults'

export default function SearchBar() {

    const [instruments, setInstruments] = useState([{}])
    const [searchedStock, setSearchedStock] = useState([{}])
    const [input,setInput] = useState(false)

    useEffect(() => {
        const data = async () => {
            const responses = await stocks();
            setInstruments(responses.filter((response) => !(response.symbol.endsWith('-BL'))))
        }
        data()
    }, [])

    const filters = (e) => {
        console.log(e.target.value)
        if(e.target.value != '') {
            setInput(true)
            setSearchedStock(instruments.filter((instrument) => instrument.symbol.startsWith(e.target.value.toUpperCase())))
        } else {            
            setSearchedStock([{}])
        }     
    }

    return (
        <div>
            <div className="flex text-white flex-row w-screen m-4 gap-2 xl:ml-[22%] mt-[70px] items-center border border-solid border-[#D0D5DD] rounded-lg shadow-b p-2">
                <CiSearch />
                <input type={"search"} className="w-full bg-transparent peer/cc focus:outline-none" placeholder="Search" onChange={filters} />
            </div>
            {
                searchedStock.length !=0 && input && <SearchResults searchedStock={searchedStock} />
            }            
        </div>
    )
}