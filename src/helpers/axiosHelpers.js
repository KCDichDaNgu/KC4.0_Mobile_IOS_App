import axios from "axios";
import { ACCESS_TOKEN } from "../constant/envVar";
import AsyncStorage from "@react-native-async-storage/async-storage";

let CancelSource = axios.CancelToken.source();

export const cancelRequest = () => {
  CancelSource.cancel("cancel");
};

const axiosDefault = axios.create({
  // baseURL: 'http://nmtuet.ddns.net:1710/',
  baseURL: "http://nmtuet.ddns.net:8000/",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

axiosDefault.interceptors.request.use(
  async (config) => {
    try {
      const accToken = await AsyncStorage.getItem(ACCESS_TOKEN);
      if (accToken) {
        config.headers.Authorization = `${accToken}`;
      }
      config.cancelToken = CancelSource.token;
      return config;
    } catch (e) {
      Promise.reject(e);
    }
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor
axiosDefault.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    if (axios.isCancel(error)) {
      CancelSource = axios.CancelToken.source();
    }
    return Promise.reject(error);
  }
);

// sample data
// { "sourceText": "string", "sourceLang": "zh", "targetLang": "zh"
export const postTranslate = (body) => {
  return new Promise((resolve, reject) => {
    axiosDefault
      .post("translate", body)
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// sample data
// { "translationHistoryId": "string", "taskId": "string",
export const getTranslateHistoryGetSingle = (params) => {
  return new Promise((resolve, reject) => {
    axiosDefault({
      method: "GET",
      url: "translation-history/get-single",
      params,
    })
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// sample data
export const getTranslateResult = (resultUrl) => {
  return new Promise((resolve, reject) => {
    axiosDefault({
      url: resultUrl,
      method: "GET",
    })
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getTranslateHistory = (params) => {
  return new Promise((resolve, reject) => {
    axiosDefault({
      url: "translation-history",
      method: "GET",
      params,
    })
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// sample data
// { "sourceTexr": "string",
export const detectLangInstant = (body) => {
  return new Promise((resolve, reject) => {
    axiosDefault
      .post("detect-lang", body)
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// sample data
// { "translationHistoryId": "string", "taskId": "string",
export const getDetectionHistoryGetSingle = (params) => {
  return new Promise((resolve, reject) => {
    axiosDefault
      .get("lang-detection-history/get-single", {
        params,
      })
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const translateFile = (body) => {
  return new Promise((resolve, reject) => {
    axiosDefault({
      headers: {
        "Content-Type": "multipart/form-data",
      },
      method: "POST",
      url: "translate_f",
      data: body,
      // body: body,
    })
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const signIn = (body) => {
  return new Promise((resolve, reject) => {
    axiosDefault
      .post("user/auth", body)
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getMe = () => {
  return new Promise((resolve, reject) => {
    axiosDefault
      .get("user/me")
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const signOut = () => {
  return new Promise((resolve, reject) => {
    axiosDefault
      .post("user/logout")
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
