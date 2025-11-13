import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../api/authApi";
import { forceLogout } from "./authActions";

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
};

interface RehydratePayload {
  token: string | null;
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isLoggedIn = true;
    },
    clearAuthState: (state) => {
      state.user = { name: null, email: null };
      state.token = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase("persist/REHYDRATE", (state, action) => {
        const rehydrateAction = action as unknown as {
          payload: RehydratePayload;
        };

        const persistedToken = rehydrateAction.payload?.token;
        if (persistedToken) {
          state.isLoggedIn = true;
        }
      })
      .addCase(forceLogout, (state) => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
      })
      .addMatcher(
        authApi.endpoints.register.matchFulfilled,
        (state, { payload }) => {
          state.user = { name: payload.name, email: payload.email };
          state.token = payload.token;
          state.isLoggedIn = true;
        }
      )
      .addMatcher(
        authApi.endpoints.login.matchFulfilled,
        (state, { payload }) => {
          state.user = { name: payload.name, email: payload.email };
          state.token = payload.token;
          state.isLoggedIn = true;
        }
      )
      .addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
      });
  },
});

export const { setToken, clearAuthState } = authSlice.actions;
export default authSlice.reducer;
