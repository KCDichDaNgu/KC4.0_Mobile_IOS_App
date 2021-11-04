import * as axiosHelper from "./axiosHelpers";

const STATUS = {
  TRANSLATING: "translating",
  TRANSLATED: "translated",
  CANCELLED: "cancelled",
  DETECTING: "detecting",
};

/**
 * @description Nhập từ input => đợi 1 khoảng thời gian đẻ nhận text
 * ! Tránh việc gọi API ko cần thiêt và liên tục
 */
export const translate = async (body) => {
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

/**
 * @description
 * ! Tránh việc gọi API ko cần thiêt và liên tục
 */
export const translateAndDetect = async (body) => {
  try {
    // Phát hiện ngôn ngữ
    const getDetectLangInstant = await axiosHelper.detectLangInstant({
      sourceText: body.sourceText,
    });
    const getSourceLang = await recursiveDetectionCheckStatus(
      getDetectLangInstant.data.translationHitoryId,
      getDetectLangInstant.data.taskId
    );
    if (getSourceLang.message === "Time Out") {
      throw new Error(getSourceLang.message);
    } else {
      const getDetectResult = await axiosHelper.getTranslateResult(
        getSourceLang.data.resultUrl
      );
      if (getDetectResult.status === "closed") {
        throw new Error(getDetectResult.message);
      } else {
        // Sử dụng ngôn ngữ phát hiện được và dịch
        const postTranslationResult = await axiosHelper.postTranslate({
          ...body,
          sourceLang: getDetectResult.source_lang,
        });
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
            throw new Error(getTranslationResult.message);
          } else {
            return getTranslationResult;
          }
        }
      }
    }
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * @description Do BE bắt fai kiểm tra status
 * nên sẽ gọi lại API khi nào status được dịch.
 * Đặt thời gian mỗi lần gọi lại API
 * ! => tránh việc gọi liên tục và ko cần thiết
 */
const recursiveDetectionCheckStatus = async (translationHistoryId, taskId) => {
  const getDetectionHistoryResult =
    await axiosHelper.getDetectionHistoryGetSingle({
      translationHistoryId,
      taskId,
    });
  if (getDetectionHistoryResult.data.status === STATUS.DETECTING) {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          const getDetectionHistoryResult = await recursiveDetectionCheckStatus(
            translationHistoryId,
            taskId
          );
          resolve(getDetectionHistoryResult);
        } catch (e) {
          reject(e);
        }
      }, 1000);
    });
  } else {
    return getDetectionHistoryResult;
  }
};

/**
 * @description Nhập từ input => đợi 1 khoảng thời gian đẻ nhận text
 * ! Tránh việc gọi API ko cần thiêt và liên tục
 */
export const translateFile = async (body) => {
  try {
    const postTranslationResult = await axiosHelper.translateFile(body);
    const getTranslationFileResult = await recursiveCheckStatus(
      postTranslationResult.data.translationHitoryId,
      postTranslationResult.data.taskId
    );
    if (getTranslationFileResult.message === "Time Out") {
      throw new Error(getTranslationFileResult.message);
    } else {
      const getTranslationResult = await axiosHelper.getTranslateResult(
        getTranslationFileResult.data.resultUrl
      );
      if (getTranslationResult.status === "closed") {
        throw new Error(getTranslationResult.message);
      } else {
        return getTranslationResult;
      }
    }
  } catch (error) {
    throw new Error(error);
  }
};
