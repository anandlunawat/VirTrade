import { useDispatch } from "react-redux";
import { FiExternalLink } from "react-icons/fi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { useCallback } from "react";
import { fetchChartData } from "../redux/reducers/chartReducer";


export default function CompCardModal(props) {

    const dispatch = useDispatch()

      const displayChart = useCallback((symbolData) => {
        dispatch(fetchChartData(symbolData));
      }, [dispatch]);

    function deleteStock() {
        console.log(props.stock)
        dispatch({
            type: "DELETE_STOCK",
            payload: props.stock.token
        })
    }

    return (
        <div className="absolute right-0 w-[50%] items-start z-30 flex flex-col bg-[#262424] p-3 gap-4 rounded-lg shadow-green-500 shadow-sm">
            <div className="flex items-center w-full gap-2">
                <button className="flex items-center gap-2 basis-1/2" onClick={()=> displayChart({ symboltoken: props.stock.token, exchange: props.stock.exch_seg })}>View <FiExternalLink /></button>
                <button className="p-1 ml-auto border-2 border-green-500 rounded-full shadow-sm shadow-green-500" onClick={props.removeModal}><RxCross2 /></button>
            </div>
            <button className="flex items-center gap-2" onClick={() => deleteStock()}>Delete <MdOutlineDeleteOutline /></button>
        </div>
    )
}