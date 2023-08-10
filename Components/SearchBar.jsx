import { useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import SearchResults from './SearchResults'


export default function SearchBar(props) {
    
    const [searchedStock, setSearchedStock] = useState([{}])
    const [input,setInput] = useState(false)

    const filters = (e) => {
        console.log(e.target.value)
        if(e.target.value != '') {
            setInput(true)
            let stock = props.instruments.filter((instrument) => instrument.symbol?.startsWith(e.target.value.toUpperCase()))
            setSearchedStock(stock)
        } else {            
            setSearchedStock(()=>[])
            setInput(false)
        }     
    }

    return (
        <div className='w-screen m-4 xl:ml-[22%] mt-[70px]'>
            <div className="flex text-white flex-row gap-2 items-center border border-solid border-[#D0D5DD] rounded-lg shadow-b p-2">
                <CiSearch />
                <input id='searchInput' type={"search"} className="w-full bg-transparent peer/cc focus:outline-none" placeholder="Search" onChange={filters} />
            </div>
            {
                input && <SearchResults searchedStock={searchedStock} />
            }            
        </div>
    )
}