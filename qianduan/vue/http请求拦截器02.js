import axios from 'axios';
import { Loading, Message } from 'element-ui'

//在main.js设置全局的请求次数，请求的间隙
axios.defaults.retry = 4;
axios.defaults.retryDelay = 1000;

axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
  var config = err.config;
  // If config does not exist or the retry option is not set, reject
  if (!config || !config.retry) return Promise.reject(err);

  // Set the variable for keeping track of the retry count
  config.__retryCount = config.__retryCount || 0;

  // Check if we've maxed out the total number of retries
  if (config.__retryCount >= config.retry) {
    // Reject with the error
    return Promise.reject(err);
  }

  // Increase the retry count
  config.__retryCount += 1;

  // Create new promise to handle exponential backoff
  var backoff = new Promise(function (resolve) {
    setTimeout(function () {
      resolve();
    }, config.retryDelay || 1);
  });

  // Return the promise in which recalls axios to retry the request
  return backoff.then(function () {
    return axios(config);
  });
});

// http request 请求拦截（配置发送请求的信息）  每次请求都加token
axios.interceptors.request.use(
  config => {
    // 从本地存储获取token
    // var token = window.localStorage.token
    // if (token) {
    //   config.headers.Authorization = `token ${token}`;
    // }
    return config;
  },
  err => {
    return Promise.reject(err);
  });

// http response 响应拦截（配置请求回来的信息） 错误处理
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    // 处理响应失败
    Message.error({
      message: '加载失败'
    })
    return Promise.reject(error);
  });

