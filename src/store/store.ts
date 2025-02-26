// store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { habitActions } from "./habits/module";
import { usersActions } from "./users/module";

export const store = configureStore({
  reducer: {
    habits: habitActions, // Use your slice reducer here
    users: usersActions,
  },
});

// TypeScript: Infer the `RootState` and `AppDispatch` types from the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
