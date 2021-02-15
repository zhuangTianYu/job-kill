import Taro from '@tarojs/taro';
import { Toast, Loading } from '@components';

let loadingCount = 0;

/**
 * @request
 * @param {boolean} loading 默认开启 loading
 * @param {boolean} catchError 默认捕获业务异常，并 toast 提示错误；否则返回完整 httpData，调用者自行捕获
 */
export const request = options =>
  new Promise((resolve, reject) => {
    const {
      url,
      data,
      loading = true,
      catchError = true,
      ...rest
    } = options;

    loading && ++loadingCount && Loading.show();

    Taro.request({
      url,
      data,
      ...rest,
      success: response => {
        const { statusCode: httpCode, data: httpData } = response;

        console.log(response);

        if (!/^2/.test(httpCode)) {
          Toast.show(httpData);

          return reject(new Error(httpData));
        }

        const { status, data, message } = httpData;

        if (!status && catchError) {
          Toast.show(message);

          return reject(new Error(message));
        }

        resolve(data);
      },
      fail: error => {
        reject(error);
      },
      complete: () => {
        loading && !--loadingCount && Loading.hide();
      },
    })
  });
