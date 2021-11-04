import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { translate, translateAndDetect } from "../../helpers/translationHelper";

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

export const translateAsync = createAsyncThunk(
  "translation/translate",
  async (body) => {
    try {
      const response = await translate(body);
      return response;
    } catch (e) {
      throw new Error(e);
    }
  }
);

export const translateAndDetectAsync = createAsyncThunk(
  "translation/translateAndDetect",
  async (body) => {
    try {
      const response = await translateAndDetect(body);
      return response;
    } catch (e) {
      throw new Error(e);
    }
  }
);

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
    reset: (state) => {
      state.translateText.sourceText = "";
      state.translateText.targetText = "";
    },
  },
  extraReducers: {
    [translateAsync.rejected]: (state, action) => {
      state.currentState = STATE.FAILED;
      state.err = action.error;
    },
    [translateAsync.fulfilled]: (state, action) => {
      state.currentState = STATE.SUCCEEDED;
      state.translateText.targetText = action.payload.target_text;
      state.translateText.editTargetText = action.payload.target_text;
      state.err = null;
    },
    [translateAsync.pending]: (state) => {
      state.currentState = STATE.LOADING;
    },
    [translateAndDetectAsync.rejected]: (state, action) => {
      state.currentState = STATE.FAILED;
      state.err = action.error;
    },
    [translateAndDetectAsync.fulfilled]: (state, action) => {
      state.currentState = STATE.SUCCEEDED;
      state.translateCode.sourceLang = action.payload.source_lang;
      state.translateText.targetText = action.payload.target_text;
      state.translateText.editTargetText = action.payload.target_text;
      state.err = null;
    },
    [translateAndDetectAsync.pending]: (state) => {
      state.currentState = STATE.LOADING;
    },
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
