import { request } from '@utils/request';

export const login = () =>
  request({
    url: 'https://zhuangtianyu.com/api/article/list',
  });
