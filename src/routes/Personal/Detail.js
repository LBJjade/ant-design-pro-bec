import React, { Component } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Card, Avatar, Form, Tag, Spin, Table } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

@connect(({ information, loading }) => ({
  information,
  loading: loading.models.information,
}))
export default class BasicProfile extends Component {
  state = {
    loading: true,
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'information/fetch',
      payload: {
        where: {
          objectId: this.props.match.params.id,
        },
      },
    }).then(() => {
      this.setState({
        loading: false,
      });
      dispatch({
        type: 'information/coverInformation',
        payload: {
          ojId: this.props.match.params.id,
          fields: {
            read: true,
          },
        },
      });
    });
  }

  render() {
    const { information: { data: { results } } } = this.props;
    const vaule = results[0];
    const columns = [
      {
        title: '头像',
        dataIndex: 'avatar',
        render: val => <Avatar src={val === undefined ? '' : (val === undefined ? 'https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png' : vaule.avatar)} shape="square" size="large" />,
      },
      {
        title: '信息标题',
        dataIndex: 'title',
        render: val => (val === undefined ? '暂无' : (val === undefined ? '暂无' : val)),
      },
      {
        title: '信息详情',
        dataIndex: 'description',
        render: val => (val === undefined ? '暂无' : (val === undefined ? '暂无' : val)),
      },
      {
        title: '特别说明',
        dataIndex: 'extra',
        render: (val, record) => <Tag color={val === undefined ? '' : color[`${record.status}`]} style={{ marginRight: 0 }}>{val === undefined ? '暂无' : (val === undefined ? '暂无' : val)}</Tag>,
      },
      {
        title: '时间',
        dataIndex: 'createdAt',
        sorter: true,
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
    ];
    const color = {
      todo: '',
      processing: 'blue',
      urgent: 'red',
      doing: 'gold',
    };
    return (
      <div>
        {
          this.state.loading ? <div style={{ width: '100%', height: '100%' }}><Spin /></div> : (
            <PageHeaderLayout title="信息详情页">
              <Table
                style={{ marginBottom: 24 }}
                pagination={false}
                dataSource={results}
                columns={columns}
                rowKey="id"
              />
              <Card bordered={false}>
                <Form
                  hideRequiredMark
                  style={{ marginTop: 8 }}
                >
                  <Form.Item
                    label="头像"
                  >
                    <Avatar src={vaule === undefined ? '' : (vaule.avatar === undefined ? 'https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png' : vaule.avatar)} shape="square" size="large" />
                  </Form.Item>
                  <Form.Item
                    label="信息标题"
                  >
                    {vaule === undefined ? '' : (vaule.title === undefined ? '暂无' : vaule.title)}
                  </Form.Item>
                  <Form.Item
                    label="信息详情"
                  >
                    {vaule === undefined ? '' : (vaule.description === undefined ? '暂无' : vaule.description)}
                  </Form.Item>
                  <Form.Item
                    label="特别说明"
                  >
                    <Tag color={vaule === undefined ? '' : color[`${vaule.status}`]} style={{ marginRight: 0 }}>{vaule === undefined ? '' : (vaule.extra === undefined ? '暂无' : vaule.extra)}</Tag>
                  </Form.Item>
                  <Form.Item
                    label="时间"
                  >
                    {vaule === undefined ? '' : vaule.createdAt}
                  </Form.Item>
                </Form>
              </Card>
            </PageHeaderLayout>
)}
      </div>
    );
  }
}
