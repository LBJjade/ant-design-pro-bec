/* eslint-disable new-cap */
import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Card, Row, Col, Input, Radio, List, Avatar, Menu, Dropdown, Icon, message } from 'antd';
import styles from './User.less';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Search } = Input;
// const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

@connect(({ user, loading }) => ({
  user,
  loading: loading.models.user,
}))
export default class User extends PureComponent {
  state = {
    pagination: {
      pageSize: 3,
      current: 1,
      total: 0,
      count: {},
    },
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const parsedata = {
      limit: this.state.pagination.pageSize,
      skip: (this.state.pagination.current - 1) * this.state.pagination.pageSize,
      count: true,
    };
    const now = new Date();
    now.setMonth(now.getMonth() - 1);
    const thisMount = now.toISOString();
    const now1 = new Date();
    now1.setDate(now.getDate() - 7);
    const thisweek = now1.toISOString();
    dispatch({
      type: 'user/fetchUser',
      payload: parsedata,
    });
    dispatch({
      type: 'user/fetchUserThisMount',
      payload: {
        where: {
          createdAt: {
            $gt: {
              __type: 'Date',
              iso: thisMount,
            },
          },
        },
        count: true,
      },
    });
    dispatch({
      type: 'user/fetchUserThisWeek',
      payload: {
        where: {
          login: {
            $gt: {
              __type: 'Date',
              iso: thisweek,
            },
          },
        },
        count: true,
      },
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
      type: 'user/fetchUser',
      payload: parsedata,
    });
    this.setState({
      pagination: {
        current: page,
        pageSize: pagesize,
      },
    });
  }

  // handleListChange = (pagination, filtersArg, sorter) => {
  //   const { dispatch } = this.props;
  //   const { formValues } = this.state;
  //
  //   const filters = Object.keys(filtersArg).reduce((obj, key) => {
  //     const newObj = { ...obj };
  //     newObj[key] = getValue(filtersArg[key]);
  //     return newObj;
  //   }, {});
  //
  //   const params = {
  //     skip: ((pagination.current - 1) * pagination.pageSize),
  //     limit: pagination.pageSize,
  //     count: true,
  //     ...formValues,
  //     ...filters,
  //   };
  //   if (sorter.field) {
  //     params.sorter = `${sorter.field}_${sorter.order}`;
  //   }
  //
  //   dispatch({
  //     type: 'user/fetchUser',
  //     payload: params,
  //   });
  //   this.setState({
  //     pagination: {
  //       current: pagination.current,
  //       pageSize: pagination.pageSize,
  //     },
  //   });
  // };
  monthUser = (val) => {
    const { dispatch } = this.props;
    if (val === 0) {
      const parsedata = {
        limit: 3,
        skip: 0,
        count: true,
      };
      dispatch({
        type: 'user/fetchUser',
        payload: parsedata,
      }).then(() => {
        const { user: { data } } = this.props;
        this.setState({
          pagination: {
            count: data === undefined ? 0 : data.results.length,
            pageSize: data === undefined ? 0 : data.results.length,
            current: 1,
          },
        });
      });
    } else {
      const now = new Date();
      now.setMonth(now.getMonth() - val);
      const date = now.toISOString();
      dispatch({
        type: 'user/fetchUserLastMount',
        payload: {
          where: {
            createdAt: {
              $gt: {
                __type: 'Date',
                iso: date,
              },
            },
          },
          count: true,
        },
      }).then(() => {
        const { user: { data } } = this.props;
        this.setState({
          pagination: {
            count: data === undefined ? 0 : data.results.length,
            pageSize: data === undefined ? 0 : data.results.length,
            current: 1,
          },
        });
      });
    }
  }


  handleSearch = (value) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/requireQuery',
      payload: {
        where: {
          $or: [{ username: { $regex: `(?i)${value}` } }, { mobile: { $regex: `(?i)${value}` } }],
        },
      },
    }).then(() => {
      message.success('查询成功');
      const { user: { data } } = this.props;
      this.setState({
        pagination: {
          count: data === undefined ? 0 : data.results.length,
          pageSize: data === undefined ? 0 : data.results.length,
          current: 1,
        },
      });
    });
  };

  render() {
    const { user: { data, mountlist, weeklist }, loading } = this.props;

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
          <RadioButton value="all" onClick={() => this.monthUser(0)}>全部</RadioButton>
          <RadioButton value="lastmonth" onClick={() => this.monthUser(1)}>最近1个月注册</RadioButton>
          <RadioButton value="last3month" onClick={() => this.monthUser(3)}>最近3个月注册</RadioButton>
        </RadioGroup>
        <Search
          className={styles.extraContentSearch}
          placeholder="请输入用户名或者手机的提示"
          enterButton
          onSearch={value => this.handleSearch(value)}
        />
      </div>
    );

    const paginationProps = {
      // showSizeChanger: true,
      showQuickJumper: true,
      pageSize: this.state.pagination.pageSize,
      total: data === undefined ? 0 : data.count,
      showTotal: (total, range) => `${range[0]}-${range[1]} / ${total} 总`,
      current: this.state.pagination.current,
      onChange: this.handlePageChange,
      hideOnSinglePage: true,
    };


    const ListContent = ({ data: { createdAt, loginTime, loginIp } }) => (
      <div className={styles.listContent}>
        {loginTime === undefined ? '' : (
          <div className={styles.listContentItem} style={{ marginRight: -30, width: 140 }}>
            <span>登陆时间</span>
            <p><Icon type="clock-circle-o" /> { loginTime === undefined ? '' : moment(loginTime).format('YYYY-MM-DD hh:mm') }</p>
          </div>
        )}
        {loginIp === undefined ? '' : (
          <div className={styles.listContentItem} style={{ marginRight: -30, width: 140 }}>
            <span>最后登录IP</span>
            <p><Icon type="environment-o" /> {loginIp} </p>
          </div>
        )}
        {createdAt === undefined ? '' : (
          <div className={styles.listContentItem} style={{ marginRight: -30, width: 140 }}>
            <span>注册时间</span>
            <p><Icon type="clock-circle-o" /> {moment(createdAt).format('YYYY-MM-DD hh:mm')}</p>
          </div>
        )}
      </div>
    );

    const menu = (
      <Menu>
        <Menu.Item>
          <a>编辑</a>
        </Menu.Item>
        <Menu.Item>
          <a>禁用</a>
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
                <Info title="所有用户" value={`${data.count === undefined ? (data.results === undefined ? 0 : data.results.length) : data.count}个用户`} bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="活跃用户（本周登录的用户）" value={`${weeklist.results === undefined ? 0 : weeklist.results.length}个用户`} bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="本月新增用户" value={`${mountlist.results === undefined ? 0 : mountlist.results.length}个用户`} />
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
              rowKey="objectId"
              loading={loading}
              pagination={paginationProps}
              dataSource={data.results}
              // onChange={this.handleListChange}
              // onChange={this.handleListChange}
              renderItem={item => (
                <List.Item
                  actions={[<a>认证</a>, <MoreBtn />]}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item.avatar} shape="square" size="large" />}
                    title={<a href={item.id}>{item.username}</a>}
                    description={<span><Icon type="mobile" /> {item.mobile} </span>}
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
