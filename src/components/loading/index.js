import Taro from '@tarojs/taro';

const show = (title = 'loading', options = {}) => {
  Taro.showLoading({ title, ...options });
};

const hide = Taro.hideLoading;

const Loading = { show, hide };

export default Loading;
