import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as axiosHelper from "../../helpers/axiosHelpers";

const STATUS = {
  TRANSLATING: "translating",
  TRANSLATED: "translated",
  CANCELLED: "cancelled",
  DETECTING: "detecting",
};

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

/**
 * @description Nhập từ input => đợi 1 khoảng thời gian đẻ nhận text
 * ! Tránh việc gọi API ko cần thiêt và liên tục
 */
const translate = async (body) => {
  try {
    const postTranslationResult = await axiosHelper.postTranslate(body);
    const getTranslationHistoryResult = await recursiveCheckStatus(
      postTranslationResult.data.translationHitoryId,
      postTranslationResult.data.taskId
    );
    if (getTranslationHistoryResult.message === "Time Out") {
      throw new Error(getTranslationHistoryResult.message);
    } else {
      const getTranslationResult = await axiosHelper.getTranslateResult(
        getTranslationHistoryResult.data.resultUrl
      );
      if (getTranslationResult.status === "closed") {
        throw new Error(getTranslationHistoryResult.message);
      } else {
        return getTranslationResult;
      }
    }
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * @description Do BE bắt fai kiểm tra status
 * nên sẽ gọi lại API khi nào status được dịch.
 * Đặt thời gian mỗi lần gọi lại API
 * ! => tránh việc gọi liên tục và ko cần thiết
 */
const recursiveCheckStatus = async (translationHistoryId, taskId) => {
  const getTranslationHistoryResult =
    await axiosHelper.getTranslateHistoryGetSingle({
      translationHistoryId,
      taskId,
    });
  if (getTranslationHistoryResult.data.status === STATUS.TRANSLATING) {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          const getTranslationHistoryResult = await recursiveCheckStatus(
            translationHistoryId,
            taskId
          );
          resolve(getTranslationHistoryResult);
        } catch (e) {
          reject(e);
        }
      }, 1000);
    });
  } else {
    return getTranslationHistoryResult;
  }
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
