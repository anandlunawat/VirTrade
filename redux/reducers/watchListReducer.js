const initState =[]

export function watchListReducer(state = initState,action) {
    switch(action.type) {
        case "ADD_STOCK" :
            initState.push(action.payload)
            return state
        case "DELETE_STOCK" :
            initState = initState.filter((tokens)=>tokens !== action.payload)
            return state
        default :
            return state
    }
}