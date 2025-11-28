"use client";

// src/store/store.js

import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './filtersSlice';

export const store = configureStore({
  reducer: {
    filters: filterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // For hero icons
    }),
});

export default store;