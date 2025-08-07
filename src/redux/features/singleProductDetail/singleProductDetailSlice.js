import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const handleSingleProductDetail = createAsyncThunk(
  "product/single-product-detail",
  async ({productId, authToken}, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/single-product/${productId}`,{
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to get product details");
      }
      const data = await response.json();
      return data; // Return the singlr product details
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
  singleProductDetail: [],
  loading: false,
  error: "",
};

const singleProductSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(handleSingleProductDetail.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(handleSingleProductDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.singleProductDetail = action.payload.result;
      })
      .addCase(handleSingleProductDetail.rejected, (state, action) => {
        state.loading = false;
        state.singleProductDetail = initialState.singleProductDetail;
        state.error = action.payload;
      });
  },
});

export default singleProductSlice.reducer;
