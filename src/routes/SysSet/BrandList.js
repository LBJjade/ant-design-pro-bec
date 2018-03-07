/* eslint-disable no-undef */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Table } from 'antd';
import styles from './BrandList.less';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const columns = [{
  title: '序号',
  dataIndex: 'orderNumber',
}, {
  title: '品牌名称',
  dataIndex: 'brandName',
}, {
  title: '操作',
  dataIndex: 'operate',
}];

@connect(({ brandManage, loading }) => ({
  brandManage,
  loading: loading.models.brandManage,
}))
export default class UserList extends PureComponent {
  state = {
    pagination: {
      pageSize: 5,
      current: 1,
      total: 0,
    },
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const parsedata = {
      limit: this.state.pagination.pageSize,
      skip: ((this.state.pagination.current - 1) * this.state.pagination.pageSize) + 1,
      count: true,
    };
    dispatch({
      type: 'brandManage/fetch',
      payload: parsedata,
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      skip: ((pagination.current - 1) * pagination.pageSize) + 1,
      limit: pagination.pageSize,
      count: true,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'brandManage/fetch',
      payload: params,
    });
    this.setState({
      pagination: {
        current: pagination.current,
        pageSize: pagination.pageSize,
      },
    });
  }

  handlePageChange = (page, pagesize) => {
    const { dispatch } = this.props;
    const parsedata = {
      limit: pagesize,
      skip: ((page - 1) * pagesize) + 1,
      count: true,
    };
    dispatch({
      type: 'brandManage/fetch',
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
    const { brandManage: { data }, loading } = this.props;

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSize: this.state.pagination.pageSize,
      total: data.count,
      // onChange: this.handlePageChange,
    };

    return (
      <PageHeaderLayout>
        <div className={styles.standardList}>
          <Card>
            <div>
              <Table
                columns={columns}
                loading={loading}
                pagination={paginationProps}
                dataSource={data.results}
                onChange={this.handleStandardTableChange}
              />
            </div>
          </Card>
        </div>
      </PageHeaderLayout>
    );
  }
}
