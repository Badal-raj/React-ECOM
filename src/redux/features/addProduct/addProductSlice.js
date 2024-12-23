import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"

const initialState = {
    loading: false,
    addProductData: null,
    error: ""
}

export const handleaddProduct = createAsyncThunk(
    'addproduct', 
    async ({authToken, productData}, { rejectWithValue }) => {
      try {
        const response = await fetch('http://localhost:8001/api/add-product', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
          body: JSON.stringify(productData),
        });
  
        if (response && !response.ok) {
          const errorData = await response.json();
          throw new Error( errorData.message  || 'Failed to create product');
        }
        const data = await response.json();
        return data;
      } catch (error) {
        if (error.message === 'Network Error') {
          return rejectWithValue('Network error, please check your server connection.');
        }else if(error.message === 'Failed to fetch'){
          return rejectWithValue('Server error, please check your server connection.');
        }
        return rejectWithValue(error.message);
      }
    }
  );

  const addProductSlice = createSlice({
    name: "signin",
    initialState,
    reducers: {
      resetError: (state) => {
        state.error = null; // Reset error state
      },
    },
      extraReducers: (builder) => {
        builder
        .addCase(handleaddProduct.pending, (state) => {
          state.loading = true
        })
        .addCase(handleaddProduct.fulfilled, (state, action) => {
          state.loading = false
          state.addProductData = action.payload.result
          state.error = ''
        })
        .addCase(handleaddProduct.rejected, (state, action) => {
          state.loading = false
          state.addProductData = initialState.addProductData
          state.error = action.payload
        })
      },
  });
  
  export const { resetError } = addProductSlice.actions;
  export default addProductSlice.reducer;