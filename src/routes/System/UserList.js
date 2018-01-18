import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Card, Row, Col, Input, Radio, List, Avatar, Menu, Dropdown, Icon } from 'antd';
import styles from './UserList.less';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Search } = Input;

@connect(({ userlist, loading }) => ({
  userlist,
  loading: loading.models.userlist,
}))
export default class UserList extends PureComponent {
  state = {
    pagination: {
      _page: 1,
      _limit: 4,
    },
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const pager = this.state.pagination;
    dispatch({
      type: 'userlist/fetch',
      payload: pager,
    });
  }

  handlePageChange = (page, pageSize) => {
    const pager = {
      _page: page,
      _limit: pageSize,
    };
    this.props.dispatch({
      type: 'userlist/fetch',
      payload: pager,
    });

    this.setState({
      pagination: pager,
    });
  }

  // handleListChange(pagination, filters, sorter) {
  //   const pager = this.state.pagination;
  //   pager.current = pagination.current;
  //   pager.total = pagination.total;
  //   pager.showTotal = ((total) => {
  //     return `共 ${total} 条`;
  //   });
  //   this.setState({
  //     pagination: pager,
  //   });
  //   this.fetch({
  //     size: pagination.pageSize,
  //     page: pagination.current,
  //     sortField: sorter.field,
  //     sortOrder: sorter.order,
  //     ...filters,
  //   });
  // }

  render() {
    const { userlist: { list }, loading } = this.props;

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
          <RadioButton value="lastmonth">最近1个月注册</RadioButton>
          <RadioButton value="last3month">最近3个月注册</RadioButton>
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
      pageSize: 4,
      total: 10,
      onChange: this.handlePageChange,
    };

    const ListContent = ({ data: { userName, createdAt } }) => (
      <div className={styles.listContent}>
        <div className={styles.listContentItem}>
          <span>用户名</span>
          <p>{userName}</p>
        </div>
        <div className={styles.listContentItem}>
          <span>注册时间</span>
          <p>{moment(createdAt).format('YYYY-MM-DD hh:mm')}</p>
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
                <Info title="所有用户" value="128个用户" bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="活跃用户" value="32个用户" bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="本月新增用户" value="24个用户" />
              </Col>
            </Row>
          </Card>
          <Card
            className={styles.listCard}
            bordered={false}
            title="用户管理"
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '0 32px 40px 32px' }}
            extra={extraContent}
          >
            <List
              size="large"
              rowKey="id"
              loading={loading}
              pagination={paginationProps}
              dataSource={list}
              renderItem={item => (
                <List.Item
                  actions={[<a>认证</a>, <MoreBtn />]}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item.avatar} shape="square" size="large" />}
                    title={<a href={item.userNo}>{item.userName}</a>}
                    description={item.email}
                  />
                  <ListContent data={item} />
                </List.Item>
              )}
              // onChange={this.handleListChange}
            />
          </Card>
        </div>
      </PageHeaderLayout>
    );
  }
}
