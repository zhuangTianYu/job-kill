import React, { useState, useEffect } from 'react';
import Taro from '@tarojs/taro';
import { View, Image, Button } from '@tarojs/components';
import { Tips, Toast } from '@components';
import Logo from '@assets/job-kill-logo.png';
import { navigateTo } from '@utils';
import './index.less';

const Login = () => {
  const [code, setCode] = useState('');

  const handleSubmitUserInfo = ({ detail }) => {
    const { userInfo } = detail;

    // TODO: set a logical field to validate
    if (!userInfo) return;

    // TODO: do login action with params
    console.log({ ...detail, code });

    navigateTo('create');
  };

  useEffect(() => {
    Taro.login({
      success: res =>
        !res.code
          ? Toast.show(res.errMsg)
          : setCode(res.code),
      fail: () => Toast.show('获取登录信息失败'),
    });
  }, []);

  return (
    <View className="login">
      <View className="login__content">
        <Image className="login__logo" src={Logo} />
        <Tips
          list={[
            '您的信息需授权以登录「工作杀」小程序。',
            '您的信息仅用于登录「工作杀」小程序。',
          ]}
        />
        <Button
          className="login__button"
          type="primary"
          openType="getUserInfo"
          onGetUserInfo={handleSubmitUserInfo}
        >
          授权登录
        </Button>
      </View>
    </View>
  );
};

export default Login;
