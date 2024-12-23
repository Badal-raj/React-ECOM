import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"

const initialState = {
    loading: false,
    profileUrl: null,
    error: ""
}

export const handleUploadProfilePic = createAsyncThunk(
    'user/uploadProfilePic', 
    async (profileData, { rejectWithValue }) => {
      try {
        const response = await fetch('http://localhost:8001/api/upload', {
            method: 'POST',
            body: profileData,    
        });
  
        if (response && !response.ok) {
          const errorData = await response.json();
          throw new Error( errorData.message  || 'Failed to upload profile pic');
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

  const uploadProfileSlice = createSlice({
    name: "uploadProfilePic",
    initialState,
    reducers: {
      resetError: (state) => {
        state.error = null; // Reset error state
      },
    },
      extraReducers: (builder) => {
        builder
        .addCase(handleUploadProfilePic.pending, (state) => {
          state.loading = true
        })
        .addCase(handleUploadProfilePic.fulfilled, (state, action) => {
          state.loading = false
          state.profileUrl = action.payload.result
          state.error = ''
        })
        .addCase(handleUploadProfilePic.rejected, (state, action) => {
          state.loading = false
          state.profileUrl = initialState.profileUrl
          state.error = action.payload
        })
      },
  });
  
  export const { resetError } = uploadProfileSlice.actions;
  export default uploadProfileSlice.reducer;