import Taro from '@tarojs/taro';
import { isFunction } from '@utils';

const Toast = {
  show: (title, config = {}) => {
    const {
      duration = 1500,
      icon = 'none',
      mask = false,
    } = config;

    Taro.showToast({
      title,
      duration,
      icon,
      mask,
    });

    return {
      then: callback => {
        const cleaner = () => {
          clearTimeout(timeout);

          isFunction(callback) && callback();
        };

        const timeout = setTimeout(cleaner, duration);
      },
    };
  },
};

export default Toast;
