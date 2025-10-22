import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, thunkAPI) => {
    const persistedAuthState = localStorage.getItem("persist:root");

    if (!persistedAuthState) {
      return thunkAPI.rejectWithValue("No persisted state found");
    }

    try {
      const parsedRoot = JSON.parse(persistedAuthState);

      const authSliceString = parsedRoot.auth;

      const authData = JSON.parse(authSliceString);

      const storedToken = authData.token;

      if (!storedToken) {
        return thunkAPI.rejectWithValue("Token is missing in state");
      }

      return storedToken;
    } catch (error) {
      console.error("Error parsing persisted state:", error);
      return thunkAPI.rejectWithValue("Failed to parse auth state");
    }
  }
);
