import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Avatar, Tag, Spin, Row, Col, Button } from 'antd';
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
              <div style={{ height: 'auto', marginLeft: '250px', marginTop: '70px' }}>
                <div style={{ margin: 8 }}>
                  <Row>
                    <Col span={4}>头像:</Col>
                    <Col span={12}><Avatar src={vaule === undefined ? '' : (vaule.avatar === undefined ? 'https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png' : vaule.avatar)} shape="square" size="large" /></Col>
                  </Row>
                </div>
                <br />
                <div style={{ margin: 8 }}>
                  <Row>
                    <Col span={4}>信息标题:</Col>
                    <Col span={12}>{vaule === undefined ? '' : (vaule.title === undefined ? '暂无' : vaule.title)}</Col>
                  </Row>
                </div>
                <br />
                <div style={{ margin: 8 }}>
                  <Row>
                    <Col span={4}>信息详情:</Col>
                    <Col span={12}>{vaule === undefined ? '' : (vaule.description === undefined ? '暂无' : vaule.description)}</Col>
                  </Row>
                </div>
                <br />
                <div style={{ margin: 8 }}>
                  <Row>
                    <Col span={4}>特别说明:</Col>
                    <Col span={12}><Tag color={vaule === undefined ? '' : color[`${vaule.status}`]} style={{ marginRight: 0 }}>{vaule === undefined ? '' : (vaule.extra === undefined ? '暂无' : vaule.extra)}</Tag></Col>
                  </Row>
                </div>
                <br />
                <div style={{ margin: 8 }}>
                  <Row>
                    <Col span={4}>时间:</Col>
                    <Col span={12}>{vaule === undefined ? '' : vaule.createdAt}</Col>
                  </Row>
                </div>
                <div style={{ marginTop: 30 }}>
                  <Row>
                    <Col span={12} offset={4}><Button type="primary" style={{ marginLeft: 8 }}><Link to="/personal/information">返回</Link></Button></Col>
                  </Row>
                </div>
              </div>
              <div style={{ height: 100 }} />
            </PageHeaderLayout>
)}
      </div>
    );
  }
}
