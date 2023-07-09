import Market from "./api/Components/Market";

export default function Portfolio() {
    return (
        <Market>
            <div className="py-16 h-fit xl:ml-[22%] flex flex-col m-4 gap-4">
                <div className="border-b-2 border-b-[#434242] pb-2">My Portfolio</div>
                <div className="flex flex-row w-full gap-2">
                    <img src="/chart.png" className="h-48 p-2 rounded-lg basis-3/4" />
                    <div className="basis-1/4 text-center mt-2 h-48 rounded-lg p-2 border-b-2 border-b-orange-500 bg-[#2a2929]">
                        <span>Daily Gain</span>
                    </div>
                </div>
                <table className="border-2 border-[#434242] rounded bg-[#2a2929]">
                    <thead>
                        <tr className="border-2 border-[#434242]">
                            <th className="p-2">Sr. No.</th>
                            <th>Stock</th>
                            <th>Investment Value</th>
                            <th>LTP</th>
                            <th>% Gain/Loss</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        <tr className="border-b-2 border-b-[#434242] rounded-lg p-10">
                            <td className="p-2">1</td>
                            <td>Reliance</td>
                            <td>50000</td>
                            <td>2600</td>
                            <td className="text-green-500">+5%</td>
                            <td className="flex justify-center gap-3"><button className="p-1 bg-orange-500">ADD</button><button className="p-1 bg-orange-500">EXIT</button></td>
                        </tr>                        
                        <tr className="border-b-2 border-b-[#434242] rounded-lg">
                        <td className="p-2">1</td>
                            <td>Reliance</td>
                            <td>50000</td>
                            <td>2600</td>
                            <td className="text-green-500">+5%</td>
                            <td className="flex justify-center gap-3"><button className="p-1 bg-orange-500">ADD</button><button className="p-1 bg-orange-500">EXIT</button></td>
                        </tr>                        
                        <tr className="border-b-2 border-b-[#434242] rounded-lg">
                            <td className="p-2">1</td>
                            <td>Reliance</td>
                            <td>50000</td>
                            <td>2600</td>
                            <td className="text-red-500">-5%</td>
                            <td className="flex justify-center gap-3"><button className="p-1 bg-orange-500">ADD</button><button className="p-1 bg-orange-500">EXIT</button></td>
                        </tr>                        
                        <tr className="border-b-2 border-b-[#434242] rounded-lg">
                            <td className="p-2">1</td>
                            <td>Reliance</td>
                            <td>50000</td>
                            <td>2600</td>
                            <td className="text-green-500">+5%</td>
                            <td className="flex justify-center gap-3"><button className="p-1 bg-orange-500">ADD</button><button className="p-1 bg-orange-500">EXIT</button></td>
                        </tr>                        
                        <tr className="border-b-2 border-b-[#434242] rounded-lg">
                            <td className="p-2">1</td>
                            <td>Reliance</td>
                            <td>50000</td>
                            <td>2600</td>
                            <td className="text-red-500">-5%</td>
                            <td className="flex justify-center gap-3"><button className="p-1 bg-orange-500">ADD</button><button className="p-1 bg-orange-500">EXIT</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Market>
    )
}