import {CiSearch} from 'react-icons/ci'

export default function SearchBar() {
    return (
        <div className="flex text-white flex-row w-screen m-4 gap-2 xl:ml-[22%] mt-[70px] items-center border border-solid border-[#D0D5DD] rounded-lg shadow-b p-2">
            <CiSearch />
            <input type={"search"} className="w-full bg-transparent peer/cc focus:outline-none" placeholder="Search"/>
        </div>
    )
}