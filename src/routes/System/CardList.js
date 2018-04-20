/* eslint-disable eol-last,no-unused-vars,no-undef,react/no-unused-state,prefer-destructuring,react/no-multi-comp,max-len */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Button, Icon, List, Form, Modal, Input, Tree, Popconfirm } from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import Ellipsis from '../../components/Ellipsis';

import styles from './CardList.less';

const TreeNode = Tree.TreeNode;

const treeData = [{
  title: '系统管理',
  key: 'systerm',
  children: [{
    title: '用户管理',
    key: 'user',
  }, {
    title: '角色管理',
    key: 'group',
  }, {
    title: '角色权限',
    key: 'groupAction',
  }],
}, {
  title: '分类管理',
  key: 'classify',
  children: [
    { title: '板块管理', key: 'modelManage' },
    { title: '数字资源管理', key: 'moduleGroup' },
  ],
}, {
  title: '评论点赞管理',
  key: 'commentPraise',
  children: [
    { title: '评论管理', key: 'comment' },
    { title: '点赞管理', key: 'praise' },
  ],
}];

class Demo extends React.Component {
  state = {
    expandedKeys: ['0-0-0', '0-0-1'],
    autoExpandParent: true,
    checkedKeys: ['0-0-0'],
    selectedKeys: [],
  }
  onExpand = (expandedKeys) => {
    console.log('onExpand', arguments);
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  }
  onCheck = (checkedKeys) => {
    console.log('onCheck', checkedKeys);
    this.setState({ checkedKeys });
  }
  onSelect = (selectedKeys, info) => {
    console.log('onSelect', info);
    this.setState({ selectedKeys });
  }
  renderTreeNodes = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} />;
    });
  }
  render() {
    return (
      <Tree
        checkable
        onExpand={this.onExpand}
        expandedKeys={this.state.expandedKeys}
        autoExpandParent={this.state.autoExpandParent}
        onCheck={this.onCheck}
        checkedKeys={this.state.checkedKeys}
        onSelect={this.onSelect}
        selectedKeys={this.state.selectedKeys}
      >
        {this.renderTreeNodes(treeData)}
      </Tree>
    );
  }
}


const CreateForm = Form.create()((props) => {
  const { modalVisible, form, handleAdd, handleModalVisible, groupName, groupInfo } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      handleAdd(fieldsValue);
    });
  };

  onclose = () => {
    handleModalVisible(false);
    form.resetFields();
  };
  return (
    <Modal
      title="新建角色"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => onclose()}
    >
      <Form.Item
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="角色名称"
      >
        {form.getFieldDecorator('groupName', {
          rules: [{ required: true, message: '角色名称不能为空...' }],
          initialValue: groupName,
        })(
          <Input placeholder="请输入" />
        )}
      </Form.Item>

      <Form.Item
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="角色简介"
      >
        {form.getFieldDecorator('groupInfo', {
          rules: [{ required: true, message: '角色简介不能为空...' }],
          initialValue: groupInfo,
        })(
          <Input placeholder="请输入" />
        )}
      </Form.Item>

      <Form.Item
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="角色权限"
      >
        {form.getFieldDecorator('groupInfo', {
          rules: [{ required: true, message: '角色简介不能为空...' }],
        })(
          <Demo />
        )}
      </Form.Item>
    </Modal>
  );
});

@connect(({ group, loading }) => ({
  group,
  loading: loading.models.group,
}))
export default class CardList extends PureComponent {
  state = {
    modalVisible: false,
    groupName: '',
    groupInfo: '',
  };
  componentDidMount() {
    this.props.dispatch({
      type: 'group/fetch',
      payload: {
        count: 8,
      },
    });
  }

  handleModalVisible = (flag) => {
    this.setState({
      groupName: '',
      groupInfo: '',
      modalVisible: !!flag,
    });
  };
  handleEditModalVisible = (flag, Name, Info) => {
    this.setState({
      groupName: Name,
      groupInfo: Info,
      modalVisible: !!flag,
    });
  };

  handleAdd = (fields) => {
    this.props.dispatch({
      type: 'group/storeGroup',
      payload: {
        description: fields.desc,
      },
    });
  }

  handelDelete = (row) => {
    const { group: { data }, dispatch } = this.props;
    dispatch({
      type: 'group/removeGroup',
      payload: row,
    }).then(() => {
      dispatch({
        type: 'group/fetch',
      });
    });
  };

  render() {
    const { group: { data }, loading } = this.props;
    const { modalVisible, groupName, groupInfo } = this.state;

    const content = (
      <div className={styles.pageHeaderContent}>
        <p>
          段落示意：蚂蚁金服务设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，
          提供跨越设计与开发的体验解决方案。
        </p>
        <div className={styles.contentLink}>
          <a>
            <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg" /> 快速开始
          </a>
          <a>
            <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg" /> 角色简介
          </a>
          <a>
            <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg" /> 角色文档
          </a>
        </div>
      </div>
    );

    const extraContent = (
      <div className={styles.extraImg}>
        <img alt="这是一个标题" src="https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png" />
      </div>
    );

    return (
      <PageHeaderLayout
        title="卡片列表"
        content={content}
        extraContent={extraContent}
      >
        <div className={styles.cardList}>
          <List
            rowKey="objectId"
            loading={loading}
            grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
            dataSource={['', ...data.results]}
            renderItem={item => (item ? (
// eslint-disable-next-line react/jsx-indent
                <List.Item key={item.groupId}>
                  <Card hoverable className={styles.card} actions={[<a onClick={() => this.handleEditModalVisible(true, item.groupName, item.groupInfo)}>编辑</a>, <Popconfirm title="确定删除?" onConfirm={() => this.handelDelete(item.objectId)}><a href="#">删除</a></Popconfirm>]}>
                    <Card.Meta
                      avatar={<img alt="" className={styles.cardAvatar} src={item.avatar} />}
                      title={<a href="#">{item.groupName}</a>}
                      description={(
                        <Ellipsis className={styles.item} lines={3}>{item.moduleName}</Ellipsis>
                      )}
                    />
                  </Card>
                </List.Item>
              ) : (
                <List.Item onClick={() => this.handleModalVisible(true)}>
                  <Button type="dashed" className={styles.newButton}>
                    <Icon type="plus" /> 新增角色
                  </Button>
                </List.Item>
              )
            )}
          />
        </div>
        <CreateForm
          handleAdd={this.handleAdd}
          handleModalVisible={this.handleModalVisible}
          modalVisible={modalVisible}
          groupName={groupName}
          groupInfo={groupInfo}
        />
      </PageHeaderLayout>
    );
  }
}
