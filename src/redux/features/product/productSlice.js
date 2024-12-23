import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"

export const handlefetchAllProduct = createAsyncThunk(
    'product/fetchAll', 
    async (authToken, { rejectWithValue }) => {
      try {
       const response = await fetch('http://localhost:8001/api/all-product', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch product');
        }
  
        const data = await response.json();
        return data; // Returning the array of users
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

  const initialState = {
    allProducts: [],
    loading: false,
    error: "",
  };
  
  const allProductSlice = createSlice({
    name: 'products',
    initialState,
    extraReducers: (builder) => {
      builder
        .addCase(handlefetchAllProduct.pending, (state) => {
          state.loading = true;
          state.error = "";
        })
        .addCase(handlefetchAllProduct.fulfilled, (state, action) => {
          state.loading = false;
          state.allProducts = action.payload.result;
        })
        .addCase(handlefetchAllProduct.rejected, (state, action) => {
          state.loading = false;
          state.allProducts = initialState.allProducts;
          state.error = action.payload;
        });
    },
  });

  export default allProductSlice.reducer;