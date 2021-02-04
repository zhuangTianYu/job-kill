import React from 'react';
import PropTypes from 'prop-types';
import { View, Radio, RadioGroup } from '@tarojs/components';
import './index.less';

const Filter = props => {
  const { params, filters, onChange } = props;

  return (
    <View className="filter">
      {filters.map(({ label, field, values }) => (
        <View className="filter__item" key={field}>
          <View className="filter__label">
            {label}：
          </View>
          <RadioGroup
            className="filter__values"
            onChange={event => onChange({
              ...params,
              [field]: +event.detail.value,
            })}
          >
            {values.map(({ value, text }) => (
              <Radio
                key={value}
                value={value}
                checked={value === params[field]}
              >
                {text}
              </Radio>
            ))}
          </RadioGroup>
        </View>
      ))}
    </View>
  );
};

Filter.propTypes = {
  params: PropTypes.shape({}),
  filters: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    field: PropTypes.string,
    values: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ])),
  })),
  onChange: PropTypes.func,
};

Filter.defaultProps = {
  params: {},
  filters: [],
  onChange: () => {},
};

export default Filter;
