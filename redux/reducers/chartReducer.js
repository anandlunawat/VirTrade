import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { historicalData } from "../../actions/historicalData"; 

// Async action to fetch chart data
export const fetchChartData = createAsyncThunk(
  "chart/fetchChartData",
  async (symbolData, { rejectWithValue }) => {
    try {
      const response = await historicalData(symbolData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const chartSlice = createSlice({
  name: "chart",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChartData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChartData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchChartData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default chartSlice.reducer;
    