/* eslint-disable quotes,object-shorthand,react/jsx-boolean-value,no-unused-vars,react/no-unused-state,max-len,object-curly-spacing,prefer-const,no-param-reassign,no-empty,indent,key-spacing,no-undef */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Upload, a, Input, InputNumber, Popconfirm, Select, Icon, Button, Dropdown, Menu, DatePicker, Modal, message, Table } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import CreateForm from './PraiseCreatForm';

import styles from './TableList.less';

const FormItem = Form.Item;
const SelectOption = Select.Option;
const { Option } = Select;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

@connect(({ praiseManage, loading }) => ({
  praiseManage,
  loading: loading.models.praiseManage,
  praises: praiseManage.praises,
  resourceIds: praiseManage.resourceIds,
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
    resourceId: {},
    commentId: {},
    imgUrl: {},
    source: {},
    title: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'praiseManage/fetchPraise',
      payload: {
        skip: 0,
        limit: 5,
        count: true,
      },
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
      type: 'praiseManage/fetchPraise',
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
      type: 'praiseManage/fetchPraise',
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
          type: 'praiseManage/remove',
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

    const {praiseManage: { data }, dispatch, form } = this.props;

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
        type: 'praiseManage/requireQuery',
        payload: { where: values },
      }).then(message.success('查询成功'));

      this.setState({
        pagination: {
          pageSize: data.results.length,
        },
      });
    });
  };

  handelDelete = (row) => {
    this.props.dispatch({
      type: 'praiseManage/removePraise',
      payload: row,
    }).then(message.success('删除成功'));
    this.setState({
      pagination: {
        current: 1,
        pageSize: 5,
      },
    });
  };
  // handelDelete = (row) => {
  //   console.log(row);
  // };
  handelbatchDelete = (row) => {
    this.props.dispatch({
      type: 'praiseManage/batchRemoveDelete',
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
      title: "新增",
    });
  };

  handleEditModalVisible = (flag, id, resourceId, commentId) => {
    this.setState({
      modalVisible: flag,
      resourceId: resourceId,
      commentId: commentId,
      editId: id,
      title: "编辑",
    });
  };

  handleAdd = (fields) => {
    this.props.dispatch({
      type: 'praiseManage/storePraise',
      payload: fields,
    });

    message.success('添加成功');
    this.setState({
      pagination: {
        current: 1,
        pageSize: 5,
      },
      modalVisible: false,
    });
  };

  handleEdit = (fields) => {
    let eidtId = this.state.editId;
    this.props.dispatch({
      type: 'praiseManage/coverPraise',
      payload: { fields, eidtId },
    });

    message.success('编辑成功');
    this.setState({
      pagination: {
        current: 1,
        pageSize: 5,
      },
      modalVisible: false,
    });
  };

  validatePraise = (rule, value, callback) => {
    if (value === undefined || value === "") {
        callback();
    } else {
      this.props.dispatch({
        type: 'praiseManage/exisPraises',
        payload: { where: {commentId: value} },
      }).then(() => {
        if (this.props.praises.results === undefined) {
          callback();
          return;
        }
        if (this.props.praises.results.length > 0) {
          callback([new Error(rule.message)]);
        } else {
          callback();
        }
      });
    }
  }

  validatePraiseNo = (rule, value, callback) => {
    if (value === undefined || value === "") {
      callback();
    } else {
      this.props.dispatch({
        type: 'praiseManage/exisPraiseNos',
        payload: { where: {resourceId: value} },
      }).then(() => {
        if (this.props.resourceIds.results === undefined) {
          callback();
          return;
        }
        if (this.props.resourceIds.results.length > 0) {
          callback([new Error(rule.message)]);
        } else {
          callback();
        }
      });
    }
  }


  render() {
    const { praiseManage: { data }, list, loading } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { selectedRows, modalVisible, resourceId, commentId } = this.state;

    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">删除</Menu.Item>
        <Menu.Item key="approval">批量审批</Menu.Item>
      </Menu>
    );

    const columns = [
      {
        title: '资源ID',
        dataIndex: 'resourceId',
      },
      {
        title: '评论ID',
        dataIndex: 'commentId',
      },
      {
        title: '操作',
        dataIndex: 'objectId',
        render: (val, record) => (
          <span>
            <Popconfirm title="确定删除?" onConfirm={() => this.handelDelete(`${val}`)}><a href="#">删除</a></Popconfirm>
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
      handleEdit: this.handleEdit,
      resourceId: resourceId,
      commentId: commentId,
      handleModalVisible: this.handleAddModalVisible,
      title: this.state.title,
      validatePraise: this.validatePraise,
      validatePraiseNo: this.validatePraiseNo,
    };

    const parentEditMethods = {
      handleEdit: this.handleEdit,
      handleModalVisible: this.handleEditModalVisible,
      resourceId: resourceId,
      commentId: commentId,
    };

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSize: this.state.pagination.pageSize,
      total: data.count ? data.count : 1,
      showTotal: (total, range) => `${range[0]}-${range[1]} / ${total} 总`,
      // onChange: this.handlePageChange,
    };

    return (
      <PageHeaderLayout title="点赞管理">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              <Form onSubmit={this.handleSearch} layout="inline">
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                  <Col md={4} sm={10}>
                    <FormItem label="资源ID">
                      {getFieldDecorator('resourceId')(
                        <InputNumber placeholder="请输入" />
                      )}
                    </FormItem>
                  </Col>
                  <Col md={8} sm={24}>
                    <FormItem label="点赞">
                      {getFieldDecorator('commentId')(
                        <Select
                          placeholder="请选择"
                          style={{ width: '100%' }}
                        >
                          { data.results.length > 0 ? data.results.map(d => <SelectOption key={d.objectId} value={d.commentId}>{d.commentId}</SelectOption>) :
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
        <CreateForm
          {...parentAddMethods}
          modalVisible={modalVisible}
        />
      </PageHeaderLayout>
    );
  }
}
