import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"

const initialState = {
    loading: false,
    resetData: null,
    error: "",
}

// Define an async thunk for handling the signup API
export const resetPasswordData = createAsyncThunk(
    'user/reset-password', 
    async ({id, token, password }, { rejectWithValue }) => {
      try {
        const response = await fetch(`http://localhost:8001/api/reset-password/${id}/${token}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({password: password}),
        });
  
        if (response && !response.ok) {
          const errorData = await response.json();
          throw new Error( errorData.message  || 'Failed to send link');
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

  const resetPasswordSlice = createSlice({
    name: "reset-password",
    initialState,
    reducers: {
      resetError: (state) => {
        state.error = null; // Reset error state
      },
    },
      extraReducers: (builder) => {
        builder
        .addCase(resetPasswordData.pending, (state) => {
          state.loading = true
        })
        .addCase(resetPasswordData.fulfilled, (state, action) => {
          state.loading = false
          state.resetData = action.payload
          state.error = ''
        })
        .addCase(resetPasswordData.rejected, (state, action) => {
          state.loading = false
          state.resetData = initialState.resetData
          state.error = action.payload
        })
      },
  });
  
  export const { resetError } = resetPasswordSlice.actions;
  export default resetPasswordSlice.reducer;