import {toast} from "react-toastify"

const getLocalWatchList = () => {
  if (typeof window !== "undefined") {
    let watchList = JSON.parse(localStorage.getItem("watchList"));

    if (watchList === null || watchList === undefined || watchList === []) {
      return [];
    } else {
      return watchList;
    }
  }
};

export function watchListReducer(watchListState = getLocalWatchList(),action) {
  if (watchListState === undefined) {
    return []
  }
  switch (action.type) {
    case "ADD_STOCK":
      if(watchListState.findIndex(item => item.token===action.payload.token) === -1) {
        const existingWatchList = JSON.parse(localStorage.getItem("watchList")) || [];  
        const index = action.ltp?.findIndex((item)=>item.symbolToken === action.payload.token)
        action.payload.ltp = action.ltp[index]?.ltp
        const updatedWatchList = [...existingWatchList, action.payload];
        localStorage.setItem("watchList", JSON.stringify(updatedWatchList));
        toast.success("Stock Added Successfully")
        return [
          ...watchListState,
          action.payload
        ]
      }
      toast.error("Stock Added Already")
      return watchListState
    case "DELETE_STOCK":            
      const updatedWatchList = watchListState.filter(item => item.token !== action.payload)
      localStorage.setItem("watchList",JSON.stringify(updatedWatchList))
      toast.success("Stock Deleted Successfully")
      return updatedWatchList
    case "DROP_STOCK":
      const watchList = [...watchListState]
      const [movedStock] = watchList.splice(action.sourceIndex,1)
      watchList.splice(action.targetIndex,0,movedStock);
      localStorage.setItem("watchList",JSON.stringify(watchList))
      return watchList
    default:
      return watchListState
  }
}
