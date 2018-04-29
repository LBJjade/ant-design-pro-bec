import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { List, Card, Avatar, Tabs, Tag, Spin, message } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './Information.less';

@connect(({ information, loading }) => ({
  information,
  loading: loading.models.information,
}))
export default class BasicList extends PureComponent {
  state = {
    loading: false,
    hasMore: true,
    pagination: {
      pageSize: 3,
      current: 1,
      total: 0,
      count: {},
    },
    noticeCount: 0,
    newCount: 0,
    needCount: 0,
  }
  componentDidMount() {
    const { dispatch } = this.props;
    const parsedata = {
      limit: this.state.pagination.pageSize,
      skip: (this.state.pagination.current - 1) * this.state.pagination.pageSize,
      count: true,
    };
    dispatch({
      type: 'information/fetchNotice',
      payload: {
        where: {
          type: '通知',
        },
        ...parsedata,
      },
    }).then(() => {
      this.setState({
        noticeCount: this.state.noticeCount + 3,
      });
    });
    dispatch({
      type: 'information/fetchNew',
      payload: {
        where: {
          type: '消息',
        },
        ...parsedata,
      },
    }).then(() => {
      this.setState({
        newCount: this.state.newCount + 3,
      });
    });
    dispatch({
      type: 'information/fetchNeed',
      payload: {
        where: {
          type: '待办',
        },
        ...parsedata,
      },
    }).then(() => {
      this.setState({
        needCount: this.state.needCount + 3,
      });
    });
  }

  changeRead = (id) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'information/coverInformation',
      payload: {
        ojId: id,
        fields: {
          read: true,
        },
      },
    });
  }

  handleInfiniteOnLoad = () => {
    const { information: { notice } } = this.props;
    this.setState({
      loading: true,
    });
    const parsedata = {
      limit: this.state.pagination.pageSize,
      skip: this.state.noticeCount + 1,
      count: true,
    };
    if (this.state.noticeCount === notice.count) {
      message.warning('已经没有数据了');
      this.setState({
        hasMore: false,
        loading: false,
      });
      return;
    }
    this.props.dispatch({
      type: 'information/fetchNewNotice',
      payload: {
        where: {
          type: '通知',
        },
        ...parsedata,
      },
    }).then(() => {
      this.setState({
        loading: false,
        noticeCount: this.state.noticeCount + 3,
      });
    });
  }

  render() {
    const { information: { notice, news, need }, loading } = this.props;
    const ListContent = ({ data: { createdAt } }) => (
      <div className={styles.listContent}>
        <div className={styles.listContentItem}>
          <span>收到时间</span>
          <p>{moment(createdAt).format('YYYY-MM-DD HH:mm')}</p>
        </div>
      </div>
    );
    const color = {
      todo: '',
      processing: 'blue',
      urgent: 'red',
      doing: 'gold',
    };

    return (
      <PageHeaderLayout title="个人信息">
        <div className={styles.standardList}>
          <Card>
            <Tabs defaultActiveKey="1">
              <Tabs.TabPane tab="通知" key="1">
                <List
                  size="large"
                  rowKey="objectId"
                  loading={loading}
                  dataSource={notice.results}
                  renderItem={item => (
                    <div style={{ opacity: item.read === true ? '0.6' : '', borderBottom: 'thin solid #e8e8e8' }}>
                      <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar src={item.avatar} shape="square" size="large" />}
                          title={<Link to={`/personal/detail/${item.objectId}`}>{item.title}</Link>}
                          description={<span> {item.description} </span>}
                        />
                        <ListContent data={item} />
                      </List.Item>
                    </div>
                    )}
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab="消息" key="2">
                <List
                  size="large"
                  rowKey="objectId"
                  loading={loading}
                  dataSource={news.results}
                  renderItem={item => (
                    <div style={{ opacity: item.read === true ? '0.6' : '', borderBottom: 'thin solid #e8e8e8' }}>
                      <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar src={item.avatar} shape="square" size="large" />}
                          title={<Link to={`/personal/detail/${item.objectId}`}>{item.title}</Link>}
                          description={<span> {item.description} </span>}
                        />
                        <ListContent data={item} />
                      </List.Item>
                    </div>
                    )}
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab="待办" key="3">
                <List
                  size="large"
                  rowKey="objectId"
                  loading={loading}
                  dataSource={need.results}
                  renderItem={item => (
                    <div classID={`${item.objectId}`} style={{ opacity: item.read === true ? '0.6' : '', borderBottom: 'thin solid #e8e8e8' }}>
                      <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar src={item.avatar} shape="square" size="large" />}
                          title={<Link to={`/personal/detail/${item.objectId}`}>{item.title}</Link>}
                          description={<span>{item.description}</span>}
                        />
                        <Tag color={item.status === undefined ? '' : color[`${item.status}`]}>{item.extra}</Tag>
                        <ListContent data={item} />
                      </List.Item>
                    </div>
                    )}
                />
              </Tabs.TabPane>
            </Tabs>
          </Card>
        </div>
        <div className="demo-infinite-container" style={{ height: '200px', overflow: 'auto', border: '1px solid #e8e8e8' }}>
          <InfiniteScroll
            initialLoad={false}
            pageStart={0}
            loadMore={this.handleInfiniteOnLoad}
            hasMore={!this.state.loading && this.state.hasMore}
            useWindow={false}
          >
            <List
              dataSource={notice.results}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src={item.avatar} style={{ color: item.read === true ? '' : 'red' }} shape="square" size="large" />}
                    title={<a href={item.objectId}>{item.title}</a>}
                    description={<span style={{ color: item.read === true ? '' : 'red' }}> {item.title}<br />{item.description} </span>}
                  />
                  <Tag color={item.status === undefined ? '' : color[`${item.status}`]} style={{ marginRight: 0 }}>{item.extra}</Tag>
                  <ListContent data={item} />
                </List.Item>
                )}
            >
              {this.state.loading && this.state.hasMore && (
              <div className="demo-loading-container">
                <Spin />
              </div>
                )}
            </List>
          </InfiniteScroll>
        </div>
      </PageHeaderLayout>
    );
  }
}
