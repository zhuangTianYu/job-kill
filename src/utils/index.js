import Taro from '@tarojs/taro';

export const getAssembledUrl = (pathname, query = {}) => {
  const pageUrl = `/pages/${pathname}/index`;
  const queries = Object.keys(query).map(key => `${key}=${value}`).join('&');

  return queries ? `${pageUrl}?${queries}` : pageUrl;
};

export const navigateTo = (pathname, query = {}, options = {}) => {
  const url = getAssembledUrl(pathname, query);

  Taro.navigateTo({ url, ...options});
};

export const redirectTo = (pathname, query = {}) => {
  const url = getAssembledUrl(pathname, query);

  Taro.redirectTo({ url });
};

export const isFunction = value => typeof value === 'function';
