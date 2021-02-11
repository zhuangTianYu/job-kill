import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import { View, Image, Button } from '@tarojs/components';
import { Modal } from '@components';
import { navigateTo } from '@utils';
import './index.less';

const roles = [
  {
    roleId: 1001,
    roleName: '三澄',
    sex: 0,
    description: '女，三澄班的主刀医生。作为法医学者，有解剖过1500具尸体的成绩。四个月前，身为医大法医学准教授的她为了积累研究经验来到UDI。',
  },
  {
    roleId: 1002,
    roleName: '中堂系',
    sex: 1,
    description: '男，中堂班的主刀医生。作为法医，有解剖过3000具尸体的成绩。原在日彰医大的法医学系，传说是因为纠纷而被放逐到UDI。',
  },
  {
    roleId: 1003,
    roleName: '六郎',
    sex: 1,
    description: '男，三澄班的记录员，医大学生。负责整理解剖时的照片拍摄和整理解剖记录。',
  },
  {
    roleId: 1004,
    roleName: '东海林',
    sex: 0,
    description: '女，三澄班的监床检查技师，药学部出身。UDI刚成立时她就加入了，之前在监察医院工作。比起工作更重视私人生活。',
  },
];

const users = [
  {
    userId: 2001,
    userName: '周杰伦',
    userAvatar: 'https://tse3-mm.cn.bing.net/th/id/OIP.3t-Xs896vEZEb-xDyvhXqQHaHa',
  },
  {
    userId: 2002,
    userName: '王力宏的名字特别长',
    userAvatar: 'https://tse1-mm.cn.bing.net/th/id/OIP.cP7NYl808r15j01i5mzI7AHaHa',
  },
  {
    userId: 2004,
    userName: '陈冠希',
    userAvatar: 'https://tse2-mm.cn.bing.net/th/id/OIP.WJsUVR0c-0mPN_qi3Uz9HwAAAA',
  },
];

const Choose = () => {
  const [myUserId] = useState(2002);
  const [roleUserMap, setRoleUserMap] = useState({});
  const [exchangeUserId, setExchangeUserId] = useState(null);
  const [exchangeUserName, setExchangeUserName] = useState('');

  const getRoleIdByUserId = userId => {
    const roleId = Object.keys(roleUserMap).find(item => roleUserMap[item] === userId);

    return roleId ? +roleId : null;
  };

  const handleRoleClick = roleId => {
    const targetUserId = roleUserMap[roleId];
    const previousRoleId = getRoleIdByUserId(myUserId);

    if (!targetUserId) {
      /**
       * TODO: do ajax action
       *   .then(根据返回体，更新 roleUserMap)
       *   .catch(根据错误状态，展示交换角色弹窗)
       *
       * ATTENTION:
       *   以下为非最终逻辑，仅模拟前端交互用
       */
      const updateRoles = { [roleId]: myUserId };

      if (previousRoleId) {
        updateRoles[previousRoleId] = null;
      }

      setRoleUserMap({
        ...roleUserMap,
        ...updateRoles,
      });
    }

    if (targetUserId !== myUserId) {
      setExchangeUserId(targetUserId);
    }
  };

  // TODO: update the map with websocket.
  useEffect(() => {
    setRoleUserMap({
      1001: 2001,
      1002: null,
      1003: null,
      1004: null,
    })
  }, []);

  useEffect(() => {
    if (exchangeUserId) {
      const exchangeUser = users.find(item => item.userId === exchangeUserId);

      setExchangeUserName(exchangeUser.userName);
    }
  }, [exchangeUserId]);

  return (
    <View className="choose">
      <View className="choose__roles">
        {roles.map(role => {
          const userId = roleUserMap[role.roleId];
          const user = userId && users.find(item => item.userId === userId);

          return (
            <View
              className={classnames('choose__role-item', {
                'choose__role-item--active': !!user,
              })}
              key={role.roleId}
              onClick={() => handleRoleClick(role.roleId)}
            >
              <View className="choose__role-detail">
                <View className="choose__role-name">
                  {role.roleName}
                </View>
                <View className="choose__role-description">
                  {role.description}
                </View>
              </View>
              <View className="choose__role-user">
                <View className="choose__user-name-label">
                  扮演者
                </View>
                <View className="choose__user-name ellipsis">
                  {user ? user.userName : '未选中'}
                </View>
                {user
                  ? <Image className="choose__user-avatar" src={user.userAvatar} />
                  : <View className="choose__user-avatar choose__user-avatar--empty" />
                }
              </View>
            </View>
          )
        })}
      </View>
      <View className="choose__button-group">
        <Button
          className="choose__ready"
          type="primary"
          onClick={() => navigateTo('login')}
        >
          准备
        </Button>
      </View>
      <Modal
        visible={!!exchangeUserId}
        onCancel={() => setExchangeUserId(null)}
        onConfirm={() => setExchangeUserId(null)}
      >
        向「{exchangeUserName}」申请交换角色？
      </Modal>
    </View>
  );
};

export default Choose;
