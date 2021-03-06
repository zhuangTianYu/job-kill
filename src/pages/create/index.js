import React, { useState, useEffect } from 'react';
import { View, Button } from '@tarojs/components';
import { Modal } from '@components';
import Filter from './components/filter';
import Preview from './components/preview';
import { MEMBER_COUNTS, SCENES } from '@constant';
import { navigateTo } from '@utils';
import './index.less';

const list = [
  {
    id: 1001,
    name: '剧本杀1001',
    createTime: '2020-01-01',
    memberCount: 4,
    poster: 'https://img.zcool.cn/community/01eaf95bcdec2ca801213dea11f225.jpg',
    description: [
      '到南京时，有朋友约去游逛，勾留7了一日；第二日上午便须渡江到浦口，下午上车北去。父亲因为事忙，本已说定不送我，叫旅馆里一个熟识的茶房8陪我同去。',
      '他再三嘱咐茶房，甚是仔细。但他终于不放心，怕茶房不妥帖9；颇踌躇10了一会。其实我那年已二十岁，北京已来往过两三次，是没有什么要紧的了。他踌躇了一会，终于决定还是自己送我去。',
      '我说道：“爸爸，你走吧。”他往车外看了看，说：“我买几个橘子去。你就在此地，不要走动。”我看那边月台的栅栏外有几个卖东西的等着顾客。走到那边月台，须穿过铁道，须跳下去又爬上去。',
      '近几年来，父亲和我都是东奔西走，家中光景是一日不如一日。他少年出外谋生，独力支持，做了许多大事。哪知老境却如此颓唐！他触目伤怀，自然情不能自已。情郁于中，自然要发之于外；家庭琐屑便往往触他之怒。',
    ],
  },
  {
    id: 1002,
    name: '剧本杀1002',
    createTime: '2020-01-03',
    memberCount: 6,
    poster: 'https://img.zcool.cn/community/01eaf95bcdec2ca801213dea11f225.jpg',
    description: [
      '我们过了江，进了车站。我买票，他忙着照看行李。',
      '行李太多，得向脚夫11行些小费才可过去。他便又忙着和他们讲价钱。我那时真是聪明过分，总觉他说话不大漂亮，非自己插嘴不可，但他终于讲定了价钱；',
    ],
  },
];

const filters = [
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

const Create = () => {
  const [id, setId] = useState(1001);

  const [visible, setVisible] = useState(false);

  const [params, setParams] = useState({
    memberCount: MEMBER_COUNTS[0].value,
    scene: SCENES[0].value,
  });

  const handleCreate = () => {
    setVisible(true);
  };

  useEffect(() => {
    console.log(params);
  }, [params])

  return (
    <View className="create">
      <Filter
        params={params}
        filters={filters}
        onChange={nextParams => setParams(nextParams)}
      />
      <Preview
        id={id}
        list={list}
        onChange={nextId => setId(nextId)}
      />
      <View className="fixed-group">
        <Button
          className="create__button"
          type="primary"
          onClick={handleCreate}
        >
          创建游戏
        </Button>
      </View>
      <Modal
        visible={visible}
        onConfirm={() => {
          setVisible(false);
          navigateTo('choose');
        }}
        onCancel={() => setVisible(false)}
      >
        为保证游戏体验，请「当面」或在「群语音通话」的前提下进行。
      </Modal>
    </View>
  );
};

export default Create;
