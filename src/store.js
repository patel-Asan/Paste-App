import { configureStore } from "@reduxjs/toolkit";
import pasteReducer from './redux/paste'

export const store = configureStore({
  reducer: {
    paste: pasteReducer,
  },
});
