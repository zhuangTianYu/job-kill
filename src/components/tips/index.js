import React from 'react';
import PropTypes from 'prop-types';
import { View } from '@tarojs/components';
import './index.less';

const Tips = props => {
  const { title, list } = props;

  return (
    <View className="tips">
      <View className="tips__title">{title}</View>
      <View className="tips__content">
        {list.map((item, index) => (
          <View className="tips__item" key={index}>{item}</View>
        ))}
      </View>
    </View>
  );
};

Tips.propTypes = {
  title: PropTypes.string,
  list: PropTypes.arrayOf(PropTypes.string),
};

Tips.defaultProps = {
  title: '提示：',
  list: [],
};

export default Tips;
