import Taro from '@tarojs/taro';
import { Toast, Loading } from '@components';

let fetchingCount = 0;

/**
 * @request
 * @param {string} url 请求接口路径
 * @param {object} data 请求接口参数
 * @param {boolean} loading 默认开启 loading
 * @param {boolean} catchError 默认捕获业务异常，并 toast 提示错误；否则返回完整 httpData，调用者自行捕获
 * @other 其它入参请参考：https://developers.weixin.qq.com/miniprogram/dev/api/network/request/wx.request.html
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

    loading && ++fetchingCount && Loading.show();

    Taro.request({
      url,
      data,
      ...rest,
      success: response => {
        const { statusCode: httpCode, data: httpData } = response;

        // 非 http 2XX 时，wx 将错误信息置于 httpData.
        // 属于网络请求异常，直接抛出错误，无需后续 catchError 操作
        if (!/^2/.test(httpCode)) {
          return Toast.show(httpData);
        }

        const { status, data, message } = httpData;

        // http 2XX 时，业务逻辑异常
        if (!status) {
          return catchError ? Toast.show(message) : reject(httpData);
        }

        resolve(data);
      },
      fail: error => {
        reject(error);
      },
      complete: () => {
        loading && !--fetchingCount && Loading.hide();
      },
    })
  });
