import Market from "../Components/Market";
import privateRoute from '../routes/privateRoute';

const Portfolio = () => {
    console.log("In Portfolio.jsx")
    return (
        <Market>
            <div className="mt-[20px] max-lg:mb-[25%] overflow-hidden h-fit xl:ml-[22%] flex flex-col m-4 gap-4">
                <div className="border-b-2 border-b-[#262424] pb-2">My Portfolio</div>
                <div className="flex flex-col w-full gap-2 md:flex-row">
                    <img src="/chart.png" className="h-48 p-2 rounded-lg md:basis-3/4" />
                    <div className="md:basis-1/4 max-md:hidden bg-opacity-40 text-center mt-2 h-48 rounded-lg p-2 border-b-2 border-b-green-500 bg-[#262424]">
                        <span>Daily Gain</span>
                    </div>
                </div>
                <table className="max-md:text-xs bg-opacity-40 border-[#434242] rounded bg-[#262424]">
                    <thead>
                        <tr className="border-b-2 border-[#434242]">
                            <th className="p-2">Sr. No.</th>
                            <th>Stock</th>
                            <th>Investment Value</th>
                            <th>LTP</th>
                            <th>% Gain/Loss</th>
                            <th className="max-md:hidden">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        <tr className="border-b-2 border-b-[#434242] rounded-lg p-10">
                            <td className="p-2">1</td>
                            <td>Reliance</td>
                            <td>50000</td>
                            <td>2600</td>
                            <td className="text-green-500">+5%</td>
                            <td className="flex justify-center gap-3 p-2 font-semibold text-white max-md:hidden"><button className="border-green-500 border-[2px] rounded-lg px-2">ADD</button><button className="border-red-500 border-[2px] rounded-lg px-2">EXIT</button></td>
                        </tr>                        
                        <tr className="border-b-2 border-b-[#434242] rounded-lg">
                        <td className="p-2">1</td>
                            <td>Reliance</td>
                            <td>50000</td>
                            <td>2600</td>
                            <td className="text-green-500">+5%</td>
                            <td className="flex justify-center gap-3 p-2 font-semibold text-white max-md:hidden"><button className="border-green-500 border-[2px] rounded-lg px-2">ADD</button><button className="border-red-500 border-[2px] rounded-lg px-2">EXIT</button></td>
                        </tr>                        
                        <tr className="border-b-2 border-b-[#434242] rounded-lg">
                            <td className="p-2">1</td>
                            <td>Reliance</td>
                            <td>50000</td>
                            <td>2600</td>
                            <td className="text-red-500">-5%</td>
                            <td className="flex justify-center gap-3 p-2 font-semibold text-white max-md:hidden"><button className="border-green-500 border-[2px] rounded-lg px-2">ADD</button><button className="border-red-500 border-[2px] rounded-lg px-2">EXIT</button></td>
                        </tr>                        
                    </tbody>
                </table>
            </div>
        </Market>
    )
}

export default privateRoute(Portfolio)