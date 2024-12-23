import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk for updating user
export const handleProductUpdate = createAsyncThunk(
  "user/updateProduct",
  async ({ id, productData, authToken }, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:8001/api/update/${id}`,{
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${authToken}`,
          },
          body: JSON.stringify(productData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update product");
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
  updatedProduct: null,
  loading: false,
  error: null,
};

const updateProductSlice = createSlice({
  name: "updated-data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handleProductUpdate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleProductUpdate.fulfilled, (state, action) => {
        state.loading = false;
        state.updatedProduct = action.payload.result
      })
      .addCase(handleProductUpdate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.updatedProduct = initialState.updatedProduct
      });
  },
});

export default updateProductSlice.reducer;
