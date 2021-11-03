import { createSlice } from "@reduxjs/toolkit";

export const STATE = {
  INIT: "init",
  LOADING: "loading",
  SUCCEEDED: "succeeded",
  FAILED: "failed",
};

const initialState = {
  currentState: STATE.INIT,
  translateCode: {
    detectLang: null,
    sourceLang: "en",
    targetLang: "vi",
  },
  translateText: {
    sourceText: "",
    targetText: "",
    editTargetText: "",
  },
  isSwap: true, // True: en, zh, lo, km => vn , False: vn => en, zh, lo, km
  err: null,
};

export const translationSlice = createSlice({
  name: "translation",
  initialState,
  reducers: {
    changeSourceLang: (state, action) => {
      state.translateCode.sourceLang = action.payload;
    },
    changeTargetLang: (state, action) => {
      state.translateCode.targetLang = action.payload;
    },
    swapLang: (state, action) => {
      state.isSwap = !state.isSwap;
      state.translateCode.sourceLang = action.payload.targetLang;
      state.translateCode.targetLang = action.payload.sourceLang;
    },
    changeSourceText: (state, action) => {
      state.translateText.sourceText = action.payload;
    },
    changeTargetText: (state, action) => {
      state.translateText.targetText = action.payload;
      state.translateText.editTargetText = action.payload;
    },
    reset: () => initialState,
  },
});

export const {
  changeSourceLang,
  changeTargetLang,
  swapLang,
  changeSourceText,
  changeTargetText,
  reset,
} = translationSlice.actions;

export const selectState = (state) => state.translation;

export default translationSlice.reducer;
