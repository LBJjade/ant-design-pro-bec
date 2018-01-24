import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Row, Col, Radio, Input } from 'antd';
import StandardTable from '../../components/StandardTable';
import styles from './UserTable.less';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Search } = Input;

@connect(({ usermodel, loading }) => ({
  usermodel,
  loading: loading.models.usermodel,
}))
export default class UserTable extends PureComponent {
  state = {
    selectedRows: [],
    pagination: {
      _page: 1,
      _limit: 4,
    },
  };

  componentWillMount() {
    // Todo 组件装载前
  }
  componentDidMount() {
    // Todo 组件装载后、渲染后
    const { dispatch } = this.props;
    const pager = this.state.pagination;
    dispatch({
      type: 'usermodel/fetch',
      payload: pager,
    });
  }

  handleTrans = () => {
    // Todo 事务处理
  }

  handleSelectRows = (rows) => {
    this.setState({
      selectedRows: rows,
    });
  }

  render() {
    // Todo define const
    const { usermodel: { data }, loading } = this.props;
    const { selectedRows } = this.state;

    // Todo: Info HTML
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
          <RadioButton value="all">全部登录</RadioButton>
          <RadioButton value="lastmonth">最近1个月</RadioButton>
          <RadioButton value="last3month">最近3个月</RadioButton>
        </RadioGroup>
        <Search
          className={styles.extraContentSearch}
          placeholder="请输入"
          onSearch={() => ({})}
        />
      </div>
    );

    // Todo: return
    return (
      <PageHeaderLayout>
        <div className={styles.standardTable}>
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
            className={styles.standardTable}
            bordered={false}
            title="用户管理"
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '0 32px 40px 32px' }}
            extra={extraContent}
          >
            <StandardTable
              selectedRows={selectedRows}
              borded={false}
              loading={loading}
              data={data}
              onSelectRow={this.handleSelectRows}
              // onChange={this.handleStandardTableChange}
            />
          </Card>
        </div>
      </PageHeaderLayout>
    );
  }
}
