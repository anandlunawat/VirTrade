// const getLocalWatchList = () => {
//     if (typeof window !== "undefined") {
//       let watchList = localStorage.getItem("watchList");
  
//       if (watchList === null || watchList === undefined || watchList === []) {
//         return [];
//       } else {
//         return watchList;
//       }
//     }
//   };

export function watchListReducer(state = [],action) {
    switch(action.type) {
        case "ADD_STOCK" :
            console.log("action,",action)
            return [
                ...state,
                action.payload
            ]            
        case "DELETE_STOCK" :            
            return state.filter((token) => token !== action.payload);
        default :
            return state
    }
}