import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../api/authApi";
import { forceLogout } from "./authActions";

const initialState = {
  user: { name: null as string | null, email: null as string | null },
  token: null as string | null,
  isLoggedIn: false,
};

interface RehydratePayload {
  auth?: {
    token: string | null;
    user: { name: string | null; email: string | null };
  };
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

        const persistedAuth = rehydrateAction.payload?.auth;
        if (persistedAuth?.token) {
          state.token = persistedAuth.token;
          state.user = persistedAuth.user || { name: null, email: null };
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
