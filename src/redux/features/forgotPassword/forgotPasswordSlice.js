import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const initialState = {
    loading: false,
    emailData: null,
    error: "",
}

// Define an async thunk for handling the signup API
export const forgotPasswordFormData = createAsyncThunk(
    'user/forgot-password', 
    async (formData, { rejectWithValue }) => {
      try {
        const response = await fetch(`${API_BASE_URL}/forget-password`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
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

  const forgotPasswordSlice = createSlice({
    name: "forgot-password",
    initialState,
    reducers: {
      resetError: (state) => {
        state.error = null; // Reset error state
      },
    },
      extraReducers: (builder) => {
        builder
        .addCase(forgotPasswordFormData.pending, (state) => {
          state.loading = true
        })
        .addCase(forgotPasswordFormData.fulfilled, (state, action) => {
          state.loading = false
          state.emailData = action.payload
          state.error = ''
        })
        .addCase(forgotPasswordFormData.rejected, (state, action) => {
          state.loading = false
          state.emailData = initialState.emailData
          state.error = action.payload
        })
      },
  });
  
  export const { resetError } = forgotPasswordSlice.actions;
  export default forgotPasswordSlice.reducer;