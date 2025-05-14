const initialState = {
    stocks: [], // Each item will be: { token: string, ...data }
  };
  
  export const livePriceReducer = (state = initialState, action) => {
    switch (action.type) {
      case "SET_VALUE": {
        const newData = action.payload; // assume this is your response object
  
        // Check if token already exists
        const existingIndex = state.stocks.findIndex(
          (stock) => stock?.token === newData?.token
        );
  
        if (existingIndex !== -1) {
          // Update existing entry
          const updatedStocks = [...state.stocks];
          updatedStocks[existingIndex] = {
            ...updatedStocks[existingIndex],
            ...newData,
          };
  
          return {
            ...state,
            stocks: updatedStocks,
          };
        } else {
          // Add new stock entry
          return {
            ...state,
            stocks: [...state.stocks, newData],
          };
        }
      }
  
      default:
        return state;
    }
  };
  