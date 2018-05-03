import React, { Component } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Avatar, Tag, Spin, Table, Row, Col } from 'antd';
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
              <div style={{ height: 'auto', marginLeft: '400px', marginTop: '20px' }}>
                <div style={{ margin: 8 }}>
                  <Row>
                    <Col span={4}>头像:</Col>
                    <Col span={8}><Avatar src={vaule === undefined ? '' : (vaule.avatar === undefined ? 'https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png' : vaule.avatar)} shape="square" size="large" /></Col>
                  </Row>
                </div>
                <br />
                <div style={{ margin: 8 }}>
                  <Row>
                    <Col span={4}>信息标题:</Col>
                    <Col span={8}>{vaule === undefined ? '' : (vaule.title === undefined ? '暂无' : vaule.title)}</Col>
                  </Row>
                </div>
                <br />
                <div style={{ margin: 8 }}>
                  <Row>
                    <Col span={4}>信息详情:</Col>
                    <Col span={8}><Tag color={vaule === undefined ? '' : color[`${vaule.status}`]} style={{ marginRight: 0 }}>{vaule === undefined ? '' : (vaule.extra === undefined ? '暂无' : vaule.extra)}</Tag></Col>
                  </Row>
                </div>
                <br />
                <div style={{ margin: 8 }}>
                  <Row>
                    <Col span={4}>时间:</Col>
                    <Col span={8}>{vaule === undefined ? '' : vaule.createdAt}</Col>
                  </Row>
                </div>
              </div>
              <div style={{ height: 100 }} />
              <Table
                style={{ marginBottom: 24 }}
                pagination={false}
                dataSource={results}
                columns={columns}
                rowKey="id"
              />
            </PageHeaderLayout>
)}
      </div>
    );
  }
}
