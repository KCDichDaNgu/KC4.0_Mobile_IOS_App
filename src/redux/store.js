import { configureStore } from "@reduxjs/toolkit";
import a from "./features/translationSlice";

export default configureStore({
  reducer: {
    translation: a,
  },
  middleware: (getDefaultMiddleware) => {
    // eslint-disable-next-line no-undef
    if (__DEV__) {
      // eslint-disable-next-line no-undef
      const createDebugger = require("redux-flipper").default;
      return getDefaultMiddleware().concat(createDebugger());
    }
    return getDefaultMiddleware();
  },
});
