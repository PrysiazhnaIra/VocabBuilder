import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";

const selectAuth = (state: RootState) => state.auth;

export const selectAuthStatus = createSelector([selectAuth], (auth) => ({
  isLoggedIn: auth.isLoggedIn,
  isAuthLoaded: auth.isAuthLoaded,
}));
