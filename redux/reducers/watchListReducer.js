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
      return [
        ...state,
        action.payload
      ]
    case "DELETE_STOCK":
      return state.filter((token) => token !== action.payload);
    default:
      return state
  }
}