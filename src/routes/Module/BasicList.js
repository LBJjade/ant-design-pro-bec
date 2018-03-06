import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { List, Card, Row, Col, Radio, Input, Progress, Button, Icon, Dropdown, Menu, Avatar } from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './BasicList.less';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Search } = Input;

@connect(({ moduleManage, loading }) => ({
  moduleManage,
  loading: loading.models.moduleManage,
}))
export default class BasicList extends PureComponent {
  state = {
    pagination: {
      pageSize: 3,
      current: 1,
      total: 0,
    },
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const parsedata = {
      limit: this.state.pagination.pageSize,
      skip: (this.state.pagination.current - 1) * this.state.pagination.pageSize,
      count: true,
    };
    dispatch({
      type: 'moduleManage/fetch',
      payload: parsedata,
    });
  }

  handlePageChange = (page, pagesize) => {
    const { dispatch } = this.props;
    const parsedata = {
      limit: pagesize,
      skip: (page - 1) * pagesize,
      count: true,
    };
    dispatch({
      type: 'moduleManage/fetch',
      payload: parsedata,
    });
    this.setState({
      pagination: {
        current: page,
        pageSize: pagesize,
      },
    });
  }

  render() {
    const { moduleManage: { data }, loading } = this.props;

    const Info = ({ title, value, bordered }) => (
      <div className={styles.headerInfo}>
        <span>{title}</span>
        <p>{value}</p>
        {bordered && <em />}
      </div>
    );

    const extraContent = (
      <div className={styles.extraContent}>
        <RadioGroup defaultValue="all">
          <RadioButton value="all">全部</RadioButton>
          <RadioButton value="progress">进行中</RadioButton>
          <RadioButton value="waiting">等待中</RadioButton>
        </RadioGroup>
        <Search
          className={styles.extraContentSearch}
          placeholder="请输入"
          onSearch={() => ({})}
        />
      </div>
    );

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSize: this.state.pagination.pageSize,
      total: data.count,
      onChange: this.handlePageChange,
    };

    const ListContent = ({ data: { owner, createdAt, percent, status } }) => (
      <div className={styles.listContent}>
        <div className={styles.listContentItem}>
          <span>Owner</span>
          <p>{owner}</p>
        </div>
        <div className={styles.listContentItem}>
          <span>开始时间</span>
          <p>{moment(createdAt).format('YYYY-MM-DD HH:mm')}</p>
        </div>
        <div className={styles.listContentItem}>
          <Progress percent={percent} status={status} strokeWidth={6} style={{ width: 180 }} />
        </div>
      </div>
    );

    const menu = (
      <Menu>
        <Menu.Item>
          <a>编辑</a>
        </Menu.Item>
        <Menu.Item>
          <a>删除</a>
        </Menu.Item>
      </Menu>
    );

    const MoreBtn = () => (
      <Dropdown overlay={menu}>
        <a>
          更多 <Icon type="down" />
        </a>
      </Dropdown>
    );

    return (
      <PageHeaderLayout>
        <div className={styles.standardList}>
          <Card bordered={false}>
            <Row>
              <Col sm={8} xs={24}>
                <Info title="我的待办" value="8个任务" bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="本周任务平均处理时间" value="32分钟" bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="本周完成任务数" value="24个任务" />
              </Col>
            </Row>
          </Card>

          <Card
            className={styles.listCard}
            bordered={false}
            title="标准列表"
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '0 32px 40px 32px' }}
            extra={extraContent}
          >
            <Button type="dashed" style={{ width: '100%', marginBottom: 8 }} icon="plus">
              添加
            </Button>
            <List
              size="large"
              rowKey="objectId"
              loading={loading}
              pagination={paginationProps}
              dataSource={data.results}
              renderItem={item => (
                <List.Item
                  actions={[<a>编辑</a>, <MoreBtn />]}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item.avatar} shape="square" size="large" />}
                    title={<a href={item.id}>{item.username}</a>}
                    description={<span><Icon type="mobile" /> {item.mobile} </span>}
                  />
                  <ListContent data={item} />
                </List.Item>
              )}
            />
          </Card>
        </div>
      </PageHeaderLayout>
    );
  }
}
