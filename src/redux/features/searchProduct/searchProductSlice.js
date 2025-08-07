import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const searchProduct = createAsyncThunk(
  "product/searchProduct",
  async ({searchCriteria, authToken}, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams();

      if (searchCriteria) query.append("search", searchCriteria);
      const response = await fetch(`${API_BASE_URL}/search-product?${query.toString()}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      if (error.message === "Network Error") {
        return rejectWithValue(
          "Network error, please check your server connection."
        );
      } else if (error.message === "Failed to fetch") {
        return rejectWithValue(
          "Server error, please check your server connection."
        );
      }
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
    searchProduct: [],
    loading: false,
    error: null,
}

const productSearchSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.searchProduct = action.payload.result;
      })
      .addCase(searchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.searchProduct = initialState.searchProduct
      });
  },
});

export default productSearchSlice.reducer;
