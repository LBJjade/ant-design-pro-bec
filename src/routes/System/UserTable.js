/* eslint-disable quotes,object-shorthand,react/jsx-boolean-value,no-unused-vars,react/no-unused-state,max-len,object-curly-spacing,prefer-const,no-param-reassign,no-empty,indent,key-spacing,no-undef,keyword-spacing */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Row, Col, Card, Form, Upload, a, Input, InputNumber, Popconfirm, Select, Icon, Button, Dropdown, Menu, DatePicker, Modal, message, Table } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import CreateForm from './creatForm';

import styles from '../../static/js/table.less';

const FormItem = Form.Item;
const SelectOption = Select.Option;
const { Option } = Select;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

@connect(({ actionManage, loading }) => ({
  actionManage,
  loading: loading.models.actionManage,
  actions: actionManage.actions,
  actionNames: actionManage.actionNames,
  requestError: actionManage.requestError,
}))
@Form.create()
export default class TableList extends PureComponent {
  state = {
    pagination: {
      pageSize: 5,
      current: 1,
      total: 0,
    },
    data: {},
    modalVisible: false,
    modalEditVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
    editId: {},
    action: '',
    name: '',
    imgUrl: {},
    source: {},
    title: '',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'actionManage/fetchAction',
      payload: {
        skip: 0,
        limit: 5,
        count: true,
      },
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      refrush: true,
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
      skip: ((pagination.current - 1) * pagination.pageSize),
      limit: pagination.pageSize,
      count: true,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'actionManage/fetchAction',
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
      type: 'actionManage/fetchAction',
      payload: {
        skip: 0,
        limit: 5,
        count: true,
      },
    });
    this.setState({
      pagination: {
        current: 1,
        pageSize: 5,
      },
    });
  };

  handleMenuClick = (e) => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;

    if (!selectedRows) return;

    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'actionManage/remove',
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

  handelDelete = (row) => {
    const {actionManage: { data }, dispatch } = this.props;
    dispatch({
      type: 'actionManage/removeAction',
      payload: row,
    }).then(() => {
      dispatch({
        type: 'actionManage/fetchAction',
        payload: {
          skip: 0,
          limit: 5,
          count: true,
        },
      });
    });
    this.setState({
      pagination: {
        current: 1,
        pageSize: 5,
      },
    });
  };

  handleSearch = (e) => {
    e.preventDefault();

    const {actionManage: { data }, dispatch, form } = this.props;

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
        type: 'actionManage/requireQuery',
        payload: { where: values },
      }).then(message.success('查询成功'));

      this.setState({
        pagination: {
          pageSize: data.results.length,
        },
      });
    });
  };
  // handelDelete = (row) => {
  //   console.log(row);
  // };
  handelbatchDelete = (row) => {
    this.props.dispatch({
      type: 'actionManage/batchRemoveDelete',
      payload: row,
    }).then(message.success('删除成功'));
    this.setState({
      pagination: {
        current: 1,
        pageSize: 5,
      },
    });
  };

  handleAddModalVisible = (flag) => {
    this.setState({
      modalVisible: !!flag,
      action: "",
      name: "",
      editId: "",
      title: "新增",
    });
  };

  handleEditModalVisible = (flag, id, actionName, actionBrief) => {
    this.setState({
      modalVisible: flag,
      action: actionName,
      name: actionBrief,
      editId: id,
      title: "编辑",
    });
  };

  handleAdd = (fields) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'actionManage/storeAction',
      payload: fields,
    }).then(() => {
        dispatch({
          type: 'actionManage/fetchAction',
          payload: {
            skip: 0,
            limit: 5,
            count: true,
          },
        });
        this.setState({
          pagination: {
            current: 1,
            pageSize: 5,
          },
          modalVisible: false,
        });
      }
    );
  };

  handleEdit = (fields) => {
    const { dispatch } = this.props;
    const ojId = this.state.editId;
    dispatch({
      type: 'actionManage/coverAction',
      payload: { fields, ojId },
    }).then(() => {
      dispatch({
        type: 'actionManage/fetchAction',
        payload: {
          skip: 0,
          limit: 5,
          count: true,
        },
      });
      this.setState({
        pagination: {
          current: 1,
          pageSize: 5,
        },
        modalVisible: false,
      });
    });
  };

  // validateAction = (rule, value, callback) => {
  //   if (value === undefined || value === "") {
  //       callback();
  //   } else {
  //     this.props.dispatch({
  //       type: 'actionManage/exisActions',
  //       payload: { where: {actionBrief: value} },
  //     }).then(() => {
  //       if (this.props.actions.results === undefined) {
  //         callback();
  //         return;
  //       }
  //       if (this.props.actions.results.length > 0) {
  //         callback([new Error(rule.message)]);
  //       } else {
  //         callback();
  //       }
  //     });
  //   }
  // }

  validateActionNo = (rule, value, callback) => {
    const {actionManage: { actionNames } } = this.props;
    if (value === undefined || value === "") {
      callback();
    } else {
      this.props.dispatch({
        type: 'actionManage/exisActionNos',
        payload: { where: {actionName: value} },
      }).then(() => {
        if (this.props.actionNames.results === undefined) {
          callback();
          return;
        }
        if (this.props.actionNames.results.length > 0) {
          callback([new Error(rule.message)]);
        } else {
          callback();
        }
      });
    }
  }


  render() {
    const { actionManage: { data }, list, loading } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { selectedRows, modalVisible, title, action, name } = this.state;

    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">删除</Menu.Item>
        <Menu.Item key="approval">批量审批</Menu.Item>
      </Menu>
    );

    const columns = [
      {
        title: '角色ID',
        dataIndex: 'groupId',
      },
      {
        title: '权限Id',
        dataIndex: 'actionId',
      },
      {
        title: '权限',
        dataIndex: 'action',
      },
      {
        title: '权限说明',
        dataIndex: 'name',
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
        render: (val, record) => (
          <span>
            <Popconfirm title="确定删除?" onConfirm={() => this.handelDelete(`${val}`)}><a href="#">删除</a></Popconfirm>
            <a onClick={() => this.handleEditModalVisible(true, `${val}`, record.action, record.name)}>编辑</a>
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

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSize: this.state.pagination.pageSize,
      total: data.count,
      showTotal: (total, range) => `${range[0]}-${range[1]} / ${total} 总`,
      current: this.state.pagination.current,
      // onChange: this.handlePageChange,
    };

    return (
      <PageHeaderLayout title="用户权限管理">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              <Form onSubmit={this.handleSearch} layout="inline">
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                  <Col md={8} sm={24}>
                    <FormItem label="编号">
                      {getFieldDecorator('actionName')(
                        <Input placeholder="请输入" />
                      )}
                    </FormItem>
                  </Col>
                  <Col md={8} sm={24}>
                    <FormItem label="用户权限名称">
                      {getFieldDecorator('actionBrief')(
                        <Select
                          placeholder="请选择"
                          style={{ width: '100%' }}
                        >
                          { data.results.length > 0 ? data.results.map(d => <SelectOption key={d.objectId} value={d.actionBrief}>{d.actionBrief}</SelectOption>) :
                          <SelectOption key="1" > 暂无</SelectOption> }
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
                    // rowSelection={rowSelection}
                    onSelectRow={this.handleSelectRows}
                  />
                </div>
              </Card>
            </div>
          </div>
        </Card>
        <CreateForm
          handleAdd={this.handleAdd}
          handleEdit={this.handleEdit}
          handleModalVisible={this.handleAddModalVisible}
          title={title}
          modalVisible={modalVisible}
          actionName={action}
          actionBrief={name}
        />
      </PageHeaderLayout>
    );
  }
}
