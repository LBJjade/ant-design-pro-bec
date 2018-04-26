import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { List, Card, Avatar, Tabs, Tag, Spin } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './Information.less';

@connect(({ information, loading }) => ({
  information,
  loading: loading.models.information,
}))
export default class BasicList extends PureComponent {
  state = {
    data: [],
    loading: false,
    hasMore: true,
    pagination: {
      pageSize: 5,
      current: 1,
      total: 0,
      count: {},
    },
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
    });
    dispatch({
      type: 'information/fetchNew',
      payload: {
        where: {
          type: '消息',
        },
        ...parsedata,
      },
    });
    dispatch({
      type: 'information/fetchNeed',
      payload: {
        where: {
          type: '待办',
        },
        ...parsedata,
      },
    });
  }

  mover = (id) => {
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
    let values = this.state.data;
    this.setState({
      loading: true,
    });
    if (values.length > 14) {
      // information.warning('Infinite List loaded all');
      this.setState({
        hasMore: false,
        loading: false,
      });
      return;
    }
    this.props.dispatch({
      type: 'information/fetchMessage',
      payload: {},
    }).then(() => {
      values = values.concat(values.results);
      this.setState({
        loading: false,
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
                    <div style={{ opacity: item.read === true ? '' : '0.6' }}>
                      <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar src={item.avatar} shape="square" size="large" />}
                          title={<a href={item.id}>{item.username}</a>}
                          description={<span> {item.title} </span>}
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
                    <div style={{ opacity: item.read === true ? '' : '0.6' }}>
                      <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar src={item.avatar} shape="square" size="large" />}
                          title={<a href={item.id}>{item.username}</a>}
                          description={<span> {item.title}<br />{item.description} </span>}
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
                    <div classID={`${item.objectId}`} style={{ opacity: item.read === true ? '' : '0.6' }} >
                      <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar src={item.avatar} shape="square" size="large" />}
                          description={<span> {item.title}<br />{item.description} </span>}
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
        <card>
          <div className="demo-infinite-container">
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
        </card>
      </PageHeaderLayout>
    );
  }
}
