import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { View } from '@tarojs/components';
import './index.less';

const Preview = props => {
  const { id, list, onChange } = props;

  const [listMap, setListMap] = useState({});

  useEffect(() => {
    const nextListMap =
      list.reduce((accumulator, item) => (
        { ...accumulator, [item.id]: item }
      ), {});

    setListMap(nextListMap);
  }, [list]);

  return (
    <View className="preview">
      <View className="preview__posters">
        {list.map(item => (
          <View
            className={classnames('preview__poster-item', {
              'preview__poster-item--active': item.id === id,
            })}
            key={item.id}
            style={{ backgroundImage: `url(${item.poster})` }}
            onClick={() => onChange(item.id)}
          />
        ))}
      </View>
      <View className="preview__name">
        {listMap[id] && listMap[id].name}
      </View>
      <View className="preview__descriptions">
        {listMap[id] && listMap[id].description.map((item, index) => (
          <View
            className="preview__description-item"
            key={index}
          >
            {item}
          </View>
        ))}
      </View>
    </View>
  );
};

Preview.propTypes = {
  id: PropTypes.number,
  list: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    poster: PropTypes.string,
    description: PropTypes.arrayOf(PropTypes.string),
  })),
  onChange: PropTypes.func,
};

Preview.defaultProps = {
  id: null,
  list: [],
  onChange: () => {},
};

export default Preview;