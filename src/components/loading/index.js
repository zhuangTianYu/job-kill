import Taro from '@tarojs/taro';

const Loading = {
  show: options => Taro.showLoading(options),
  hide: options => Taro.hideLoading(options),
};

export default Loading;
