import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async ({productId, authToken}, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:8001/api/product/${productId}`,{
          method: "DELETE",
          headers: {
            'Authorization': `Bearer ${authToken}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete product");
      }
      const data = await response.json();
      return data; // Return the deleted product to update the state
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
  deletedProductDetails: [],
  loading: false,
  error: "",
};

const deleteProductSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.deletedProductDetails =action.payload.result
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.deletedProductDetails = initialState.deletedProductDetails;
        state.error = action.payload;
      });
  },
});

export default deleteProductSlice.reducer;
