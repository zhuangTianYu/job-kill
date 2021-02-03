import React from 'react';
import PropTypes from 'prop-types';
import { View } from '@tarojs/components';
import './index.less';

const Modal = props => {
  const {
    visible,
    title,
    children,
    confirmText,
    cancelText,
    cancelVisible,
    onConfirm,
    onCancel,
  } = props;

  if (!visible) return null;

  return (
    <View className="modal">
      <View className="modal__content">
        <View className="modal__header">{title}</View>
        <View className="modal__body">{children}</View>
        <View className="modal__footer">
          {cancelVisible && (
            <View className="modal__button" onClick={onCancel}>
              {cancelText}
            </View>
          )}
          <View className="modal__button" onClick={onConfirm}>
            {confirmText}
          </View>
        </View>
      </View>
    </View>
  );
};

Modal.propTypes = {
  visible: PropTypes.bool,
  title: PropTypes.string,
  children: PropTypes.node,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  cancelVisible: PropTypes.bool,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
};

Modal.defaultProps = {
  visible: false,
  title: '提示',
  children: null,
  confirmText: '确定',
  cancelText: '取消',
  cancelVisible: true,
  onConfirm: () => {},
  onCancel: () => {},
};

export default Modal;
