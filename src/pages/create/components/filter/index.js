import React from 'react';
import { View, Radio, RadioGroup } from '@tarojs/components';
import { MEMBER_COUNTS, SCENES } from '@constant';
import './index.less';

const items = [
  {
    label: '人数',
    field: 'memberCount',
    values: MEMBER_COUNTS,
  },
  {
    label: '场景',
    field: 'scene',
    values: SCENES,
  },
];

const Filter = () => {
  return (
    <View className="filter">
      {items.map(({ label, field, values }) => (
        <View className="filter__item" key={field}>
          <View className="filter__label">
            {label}：
          </View>
          <RadioGroup className="filter__values">
            {values.map(({ value, text }) => (
              <Radio key={value} value={value}>
                {text}
              </Radio>
            ))}
          </RadioGroup>
        </View>
      ))}
    </View>
  );
};

export default Filter;
