/* eslint-disable no-unused-vars,max-len,object-shorthand,no-const-assign,no-trailing-spaces,react/no-unused-state,prefer-const,react/no-multi-comp,prefer-destructuring,react/jsx-boolean-value,comma-spacing */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Upload, a, Input, InputNumber, Popconfirm, Select, Icon, Button, Dropdown, Menu, DatePicker, Modal, message, Table } from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';

import CreateAddForm from './AddFrom';
import CreateEditForm from './EditFrom';

import styles from '../../../static/js/table.less';

const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

@connect(({ shopManage, loading }) => ({
  shopManage,
  loading: loading.models.shopManage,
}))
@Form.create()
export default class TableList extends PureComponent {
  state = {
    pagination: {
      pageSize: 5,
      current: 1,
      total: 0,
    },
    modalVisible: false,
    modalEditVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
    editId: {},
    imgUrl: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'shopManage/fetch',
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
      type: 'shopManage/fetch',
      payload: params,
    });
    this.setState({
      pagination: {
        current: pagination.current,
        pageSize: pagination.pageSize,
      },
    });
  };

  handleFormAdd = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'shopManage/fetch',
      payload: {},
    });
  };

  toggleForm = () => {
    this.setState({
      expandForm: !this.state.expandForm,
    });
  };

  handleMenuClick = (e) => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;

    if (!selectedRows) return;

    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'shopManage/remove',
          payload: {
            no: selectedRows.map(row => row.no).join(','),
          },
          callback: () => {
            this.setState({
              selectedRows: [],
            });
          },
        });
        break;
      default:
        break;
    }
  };

  handleSelectRows = (rows) => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleSearch = (e) => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'shopManage/requireQuery',
        payload: values,
      });
    });
  };

  handelDelete = (row) => {
    this.props.dispatch({
      type: 'shopManage/delete',
      payload: row,
    });
  };
  // handelDelete = (row) => {
  //   console.log(row);
  // };
  handelbatchDelete = (row) => {
    this.props.dispatch({
      type: 'shopManage/batchDelete',
      payload: row,
    });
  };

  handelEdit = (rows, data) => {
    this.props.dispatch({
      type: 'shopManage/edit',
      payload: {
        row: rows,
        data: data,
      },
    });
  };

  handleAddModalVisible = (flag) => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleEditModalVisible = (flag, data) => {
    this.setState({
      modalEditVisible: !!flag,
      editId: data,
    });
  };

  handleAdd = (fields) => {
    this.props.dispatch({
      type: 'shopManage/add',
      payload: fields,
    });

    message.success('添加成功');
    this.setState({
      modalVisible: false,
    });
  };

  handleEdit = (fields) => {
    let eidtId = this.state.editId;
    this.props.dispatch({
      type: 'shopManage/edit',
      payload: { fields, eidtId },
    });

    message.success('编辑成功');
    this.setState({
      modalEditVisible: false,
    });
  };

  renderSimpleForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="编号">
              {getFieldDecorator('orderNumber')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="门店名称">
              {getFieldDecorator('shopName')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">查询</Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormAdd}>刷新</Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }


  renderForm() {
    return this.state.expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

  render() {
    const { shopManage: { data }, loading } = this.props;
    const { selectedRows, modalVisible, modalEditVisible } = this.state;

    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">删除</Menu.Item>
        <Menu.Item key="approval">批量审批</Menu.Item>
      </Menu>
    );

    const columns = [
      {
        title: '编号',
        dataIndex: 'shopNo',
      },
      {
        title: '门店名称',
        dataIndex: 'cityName',
      },
      {
        title: '关联品牌',
        dataIndex: 'descript',
      },
      {
        title: '关联大区',
        dataIndex: 'descript',
      },
      {
        title: '关联小区',
        dataIndex: 'descript',
      },
      {
        title: '所在城市',
        dataIndex: 'descript',
      },
      {
        title: '联系人',
        dataIndex: 'descript',
      },
      {
        title: '联系电话',
        dataIndex: 'contactTel',
      },
      {
        title: '门店地址',
        dataIndex: 'address',
      },
      {
        title: '操作',
        dataIndex: 'objectId',
        width: '10%' ,
        render: val => (
          <span>
            <Popconfirm title="确定删除?" onConfirm={() => this.handelDelete(`${val}`)}><a href="#">删除</a></Popconfirm>
            <a onClick={() => this.handleEditModalVisible(true, `${val}`)}>编辑</a>
          </span>),
        // render: val => <span><Popconfirm title="确定删除?" onConfirm={() => this.handelDelete(val)}><a href="#">删除</a></Popconfirm>     <a onClick={() => this.handleEditModalVisible(true)}>编辑</a></span>,
      },
    ];

    const rowSelection = {
      onChange: (selectedRowKeys, Rows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', Rows);
        this.setState({
          selectedRows: selectedRowKeys,
        });
        // noinspection JSAnnotator
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
    };

    const parentAddMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleAddModalVisible,
    };

    const parentEditMethods = {
      handleEdit: this.handleEdit,
      handleModalVisible: this.handleEditModalVisible,
    };

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSize: this.state.pagination.pageSize,
      total: data.count,
      showTotal: (total, range) => `${range[0]}-${range[1]} / ${total} 总`,
      // onChange: this.handlePageChange,
    };

    return (
      <PageHeaderLayout title="门店管理">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              {this.renderForm()}
            </div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleAddModalVisible(true)}>
                新增
              </Button>
              {
                selectedRows.length > 0 && (
                  <span>
                    <Button icon="delete" type="primary" onClick={() => this.handelbatchDelete(selectedRows)}>删除</Button>
                  </span>
                )
              }
            </div>
            <div className={styles.standardList}>
              <Card>
                <div>
                  <Table
                    rowKey="objectId"
                    columns={columns}
                    loading={loading}
                    pagination={paginationProps}
                    dataSource={data.results}
                    onChange={this.handleStandardTableChange}
                    rowSelection={rowSelection}
                    onSelectRow={this.handleSelectRows}
                  />
                </div>
              </Card>
            </div>
          </div>
        </Card>
        <CreateAddForm
          {...parentAddMethods}
          modalVisible={modalVisible}
        />
        <CreateEditForm
          {...parentEditMethods}
          modalEditVisible={modalEditVisible}
        />
      </PageHeaderLayout>
    );
  }
}
