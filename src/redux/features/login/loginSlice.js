import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"

const initialState = {
    loading: false,
    loginData: null,
    error: "",
    token: null,
}

// Define an async thunk for handling the signup API
export const loginFormData = createAsyncThunk(
    'user/signin', 
    async (userData, { rejectWithValue }) => {
      try {
        const response = await fetch('http://localhost:8001/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
  
        if (response && !response.ok) {
          const errorData = await response.json();
          throw new Error( errorData.message  || 'Failed to login');
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

  const loginSlice = createSlice({
    name: "signin",
    initialState,
    reducers: {
      resetError: (state) => {
        state.error = null; // Reset error state
      },
      manageLogout: (state) => {
        state.token = null;
        state.loginData = null;
        localStorage.removeItem("access-token");
        sessionStorage.removeItem("user-id");
      },
    },
      extraReducers: (builder) => {
        builder
        .addCase(loginFormData.pending, (state) => {
          state.loading = true
        })
        .addCase(loginFormData.fulfilled, (state, action) => {
          state.loading = false
          state.loginData = action.payload
          state.error = ''
          state.token = action.payload?.token
          localStorage.setItem("access-token", action.payload?.token)
        })
        .addCase(loginFormData.rejected, (state, action) => {
          state.loading = false
          state.loginData = initialState.loginData
          state.error = action.payload
          state.token = initialState.token
        })
      },
  });
  
  export const { resetError, manageLogout } = loginSlice.actions;
  export default loginSlice.reducer;