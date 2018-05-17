/* eslint-disable no-unused-vars,max-len,object-shorthand,no-const-assign,no-trailing-spaces,react/no-unused-state,prefer-const,no-undef */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Row, Col, Card, Form, a, Input, Popconfirm, Select, Icon, Button, Dropdown, Menu, DatePicker, Modal, message, Table } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './TableList.less';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

const CreateAddForm = Form.create()((props) => {
  const { modalVisible, form, handleAdd, handleModalVisible } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      handleAdd(fieldsValue);
    });
  };
  return (
    <Modal
      title="编辑"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="资源名称"
      >
        {form.getFieldDecorator('resourceName', {
          rules: [{ required: true, message: '请输入资源名称...' }],
        })(
          <Input placeholder="请输入" />
        )}
      </FormItem>
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="资源简介"
      >
        {form.getFieldDecorator('resourceBrief', {
          rules: [{ required: true, message: '请输入资源简介...' }],
        })(
          <TextArea rows={4} placeholder="请输入" />
        )}
      </FormItem>
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="资源路径"
      >
        {form.getFieldDecorator('qrCodeUrl', {
          rules: [{ required: true, message: '请输入资源路径...' }],
        })(
          <Input placeholder="请输入" />
        )}
      </FormItem>
    </Modal>
  );
});

const CreateEditForm = Form.create()((props) => {
  const { modalEditVisible, form, handleEdit, handleModalVisible } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      handleEdit(fieldsValue);
    });
  };
  return (
    <Modal
      title="编辑"
      visible={modalEditVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="资源名称"
      >
        {form.getFieldDecorator('resourceName', {
          rules: [{ required: true, message: '请输入资源名称...' }],
        })(
          <Input placeholder="请输入" />
        )}
      </FormItem>
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="资源简介"
      >
        {form.getFieldDecorator('resourceBrief', {
          rules: [{ required: true, message: '请输入资源简介...' }],
        })(
          <TextArea rows={4} placeholder="请输入" />
        )}
      </FormItem>
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="资源路径"
      >
        {form.getFieldDecorator('qrCodeUrl', {
          rules: [{ required: true, message: '请输入资源路径...' }],
        })(
          <Input placeholder="请输入" />
        )}
      </FormItem>
    </Modal>
  );
});

@connect(({ resourceManage, loading }) => ({
  resourceManage,
  loading: loading.models.resourceManage,
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
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'resourceManage/fetch',
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
      type: 'resourceManage/fetch',
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
      type: 'resourceManage/fetch',
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
          type: 'resourceManage/remove',
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
        type: 'resourceManage/requireQuery',
        payload: values,
      });
    });
  };

  handelDelete = (row) => {
    this.props.dispatch({
      type: 'resourceManage/delete',
      payload: row,
    });
  };
  // handelDelete = (row) => {
  //   console.log(row);
  // };
  handelbatchDelete = (row) => {
    this.props.dispatch({
      type: 'resourceManage/batchDelete',
      payload: row,
    });
  };

  handelEdit = (rows, data) => {
    this.props.dispatch({
      type: 'resourceManage/edit',
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
      type: 'resourceManage/add',
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
      type: 'resourceManage/edit',
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
            <FormItem label="资源名称">
              {getFieldDecorator('no')(
                <Input placeholder="请输入" />
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

  renderAdvancedForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="资源名称">
              {getFieldDecorator('no')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="更新日期">
              {getFieldDecorator('updatedAt')(
                <DatePicker style={{ width: '100%' }} placeholder="请输入更新日期" />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="创建时间">
              {getFieldDecorator('createdAt')(
                <DatePicker style={{ width: '100%' }} placeholder="请输入创建时间" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">查询</Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormAdd}>刷新</Button>
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
              收起 <Icon type="up" />
              </a>
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
    const { resourceManage: { data }, loading } = this.props;
    const { selectedRows, modalVisible, modalEditVisible } = this.state;

    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">删除</Menu.Item>
        <Menu.Item key="approval">批量审批</Menu.Item>
      </Menu>
    );

    const columns = [
      {
        title: '浏览次数',
        dataIndex: 'viewTimes',
      },
      {
        title: '资源简介',
        dataIndex: 'resourceName',
      },
      {
        title: '资源简介',
        dataIndex: 'resourceBrief',
        width: '30%',
      },
      {
        title: '状态',
        dataIndex: 'status',
      },
      {
        title: '更新时间',
        dataIndex: 'updatedAt',
        sorter: true,
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      }, {
        title: '创建时间',
        dataIndex: 'createdAt',
        sorter: true,
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      {
        title: '操作',
        dataIndex: 'objectId',
        width: '10%',
        render: val => <span><a onClick={() => this.handelDelete(val)}>删除</a>    <a onClick={() => this.handleEditModalVisible(true, val)}>编辑</a></span>,
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
      <PageHeaderLayout title="数字资源管理">
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