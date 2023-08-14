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

export function watchListReducer(state = getLocalWatchList(), action) {
  if (state === undefined) {
    return []
  }
  switch (action.type) {
    case "ADD_STOCK":
      console.log("action,", action)      
      if(state.findIndex(item => item.token===action.payload.token) === -1) {
        const existingWatchList = JSON.parse(localStorage.getItem("watchList")) || [];       
        const updatedWatchList = [...existingWatchList, action.payload];
        localStorage.setItem("watchList", JSON.stringify(updatedWatchList));
        toast.success("Stock Added Successfully")
        return [
          ...state,
          action.payload
        ]
      }
      toast.error("Stock Added Already")
      return state
    case "DELETE_STOCK":
      // console.log("state.filter((item) => item !== action.payload)",state.filter((item) => item !== action.payload))
      console.log("state",state.filter(item => item.token != action.payload))
      const updatedWatchList = state.filter(item => item.token !== action.payload)
      localStorage.setItem("watchList",JSON.stringify(updatedWatchList))
      toast.success("Stock Deleted Successfully")
      return updatedWatchList
    default:
      return state
  }
}
