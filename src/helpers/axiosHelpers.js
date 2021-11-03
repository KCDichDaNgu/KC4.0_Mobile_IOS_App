import axios from "axios";

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
    // const acc_token = localStorage.getItem(ACCESS_TOKEN);
    // if (acc_token) {
    //   config.headers.Authorization = `${acc_token}`;
    // }
    return config;
  },
  (error) => Promise.reject(error)
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
