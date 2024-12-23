import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const hangleUserDetal = createAsyncThunk(
  "profile/user-details",
  async (user_id, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:8001/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user_id),
      });

      if (response && !response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to get user details");
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
    loading: false,
    userDetails: null,
    error: ""
}

const getUserDetailsSlice = createSlice({
    name: "user-details",
    initialState,
      extraReducers: (builder) => {
        builder
        .addCase(hangleUserDetal.pending, (state) => {
          state.loading = true
        })
        .addCase(hangleUserDetal.fulfilled, (state, action) => {
          state.loading = false
          state.userDetails = action.payload.result
          state.error = ''
        })
        .addCase(hangleUserDetal.rejected, (state, action) => {
          state.loading = false
          state.userDetails = initialState.userDetails
          state.error = action.payload
        })
      },
  });

  export default getUserDetailsSlice.reducer;