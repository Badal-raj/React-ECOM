import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    registerData:[],
    error: ''
};
// Define an async thunk for handling the signup API
export const registrationFormData = createAsyncThunk(
    'user/signup', 
    async (userData, { rejectWithValue }) => {
      try {
        const response = await fetch('http://localhost:8001/api/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
  
        if (response && !response.ok) {
          const errorData = await response.json();
          throw new Error( errorData.message  || 'Failed to signup');
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

const registrationSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null; // Reset error state
    },
  },
    extraReducers: (builder) => {
      builder
      .addCase(registrationFormData.pending, (state) => {
        state.loading = true
      })
      .addCase(registrationFormData.fulfilled, (state, action) => {
        state.loading = false
        state.registerData = action.payload.result
        state.error = ''
      })
      .addCase(registrationFormData.rejected, (state, action) => {
        state.loading = false
        state.registerData = initialState.registerData
        state.error = action.payload
      })
    },
});

export const { resetError } = registrationSlice.actions;
export default registrationSlice.reducer;
