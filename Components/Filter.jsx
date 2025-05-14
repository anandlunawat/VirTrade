import { AiOutlineArrowRight } from "react-icons/ai"
import { printLogs } from "../actions/logs";

export default function Filter({ tags, menu, types }) {
    printLogs("tags", tags)
    return (
        <div>
            <div className="flex flex-row max-md:flex-col max-md:items-center max-md:justify-center gap-4 text-black w-[100%]">
                {
                    tags.map((tag,key) => (
                        tag === "dropdown" ? menu.map((items,key) => (
                            <select key={key} name={items.name} className="text-white w-full md:basis-1/3 bg-black border-[1px] px-3 py-2 rounded-lg">
                                <option value="" className="">{items.name}</option>
                                {
                                    items.value.map((option,key) => (
                                        <option key={key} value={option}>{option}</option>
                                    ))
                                }
                            </select>
                        )) : types.map((items,key) => (
                            // <div className="w-full basis-1/3">                                
                                <input key={key} type={items.type} id={items.for} name={items.for} className="text-white w-full bg-black border-[1px] md:basis-1/3 px-3 py-2 rounded-lg" />
                            // </div>
                        ))
                    ))
                }
                <button className="flex items-center justify-center px-3 py-2 text-white bg-green-500 rounded-lg max-md:w-full"><AiOutlineArrowRight style={{textAlign : "center"}}/></button>
            </div>
        </div>
    )
}


// {/* <label htmlFor={items.for} className="w-0"></label> */}


