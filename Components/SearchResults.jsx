export default function SearchResults(props) {
    return (
        <div className="h-screen overflow-y-auto xl:ml-[22%] mt-[30px]">
            {
                props.searchedStock.map((stock)=>(
                    <div className="flex flex-row gap-12" key={stock.token}>
                        <span className={`text-lg font-semibold ${stock.exch_seg === "NSE" ? "text-green-500" : stock.exch_seg === "BSE" ? "text-red-500" : "text-gray-600"} uppercase`}>{stock.exch_seg}</span>
                        <span className="text-lg font-semibold text-white uppercase">{stock.symbol}</span>
                    </div>
                ))
            }
        </div>                
    )
}