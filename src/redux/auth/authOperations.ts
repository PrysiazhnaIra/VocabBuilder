import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, thunkAPI) => {
    // 1. Використовуйте правильний ключ (наприклад, "persist:root")
    const persistedAuthState = localStorage.getItem("persist:root");

    if (!persistedAuthState) {
      return thunkAPI.rejectWithValue("No persisted state found");
    }

    try {
      // 2. Парсинг зовнішнього JSON-рядка
      const parsedRoot = JSON.parse(persistedAuthState);

      // 3. Доступ до внутрішнього JSON-рядка (самого auth-слайсу)
      // Ключ "auth" має відповідати вашому reducerPath для authSlice
      const authSliceString = parsedRoot.auth;

      // 4. Парсинг внутрішнього JSON-рядка auth-слайсу
      const authData = JSON.parse(authSliceString);

      // 5. Фінальне отримання токена
      const storedToken = authData.token;

      if (!storedToken) {
        return thunkAPI.rejectWithValue("Token is missing in state");
      }

      return storedToken;
    } catch (error) {
      // Якщо дані у localStorage пошкоджені або неправильно відформатовані
      console.error("Error parsing persisted state:", error);
      return thunkAPI.rejectWithValue("Failed to parse auth state");
    }
  }
);
