/* eslint-disable quotes,object-shorthand,react/jsx-boolean-value,no-unused-vars,react/no-unused-state,max-len,object-curly-spacing,prefer-const,no-param-reassign,no-empty,indent,key-spacing,no-undef,keyword-spacing */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Upload, a, Input, InputNumber, Popconfirm, Select, Icon, Button, Dropdown, Menu, DatePicker, Modal, message, Table } from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import CreateForm from './creatForm';

import styles from '../../../static/js/table.less';

const FormItem = Form.Item;
const SelectOption = Select.Option;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

@connect(({ shop, loading }) => ({
  shop,
  loading: loading.models.shop,
  shops: shop.shops,
  shopNos: shop.shopNos,
  requestError: shop.requestError,
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
    shopNo: '',
    shopName: '',
    contactTel: '',
    address: '',
    imgUrl: {},
    source: {},
    title: '',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'shop/fetchShop',
      payload: {
        skip: 0,
        limit: 5,
        count: true,
      },
    });
    dispatch({
      type: 'shop/getBrands',
    });
    dispatch({
      type: 'shop/getRegions',
    });
    dispatch({
      type: 'shop/getDistricts',
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
      type: 'shop/fetchShop',
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
      type: 'shop/fetchShop',
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
          type: 'shop/remove',
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
    const {shop: { data }, dispatch } = this.props;
    const { pagination: {current} } = this.state;
    dispatch({
      type: 'shop/removeShop',
      payload: row,
    }).then(() => {
      if(data.results.length > 1) {
        const params = {
          skip: ((this.state.pagination.current - 1) * this.state.pagination.pageSize),
          limit: this.state.pagination.pageSize,
          count: true,
        };
        dispatch({
          type: 'shop/fetchShop',
          payload: params,
        });
      }else{
        const params = {
          skip: ((this.state.pagination.current - 2) * this.state.pagination.pageSize),
          limit: this.state.pagination.pageSize,
          count: true,
        };
        dispatch({
          type: 'shop/fetchShop',
          payload: params,
        });
        this.setState({
          pagination: {
            current: current - 1,
            pageSize: 5,
          },
        });
      }
    });
  };

  handleSearch = (e) => {
    e.preventDefault();

    const {shop: { data }, dispatch, form } = this.props;

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
        type: 'shop/requireQuery',
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
      type: 'shop/batchRemoveDelete',
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
      shopNo: "",
      shopName: "",
      contactTel: "",
      address: "",
      editId: "",
      title: "新增",
    });
  };

  handleEditModalVisible = (flag, id, shopNo, shopName, contactTel, address) => {
    this.setState({
      modalVisible: flag,
      shopNo: shopNo,
      shopName: shopName,
      contactTel: contactTel,
      address: address,
      editId: id,
      title: "编辑",
    });
  };

  handleAdd = (fields) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'shop/storeShop',
      payload: fields,
    }).then(() => {
        const params = {
          skip: ((this.state.pagination.current - 1) * this.state.pagination.pageSize),
          limit: this.state.pagination.pageSize,
          count: true,
        };
        dispatch({
          type: 'shop/fetchShop',
          payload: params,
        });
        this.setState({
          modalVisible: false,
        });
      }
    );
  };

  handleEdit = (fields) => {
    const { dispatch } = this.props;
    const ojId = this.state.editId;
    dispatch({
      type: 'shop/coverShop',
      payload: { fields, ojId },
    }).then(() => {
      const params = {
        skip: ((this.state.pagination.current - 1) * this.state.pagination.pageSize),
        limit: this.state.pagination.pageSize,
        count: true,
      };
      dispatch({
        type: 'shop/fetchShop',
        payload: params,
      });
      this.setState({
        modalVisible: false,
      });
    });
  };

  validateShopNo = (rule, value, callback) => {
    const { shopNo } = this.state;
    if(value === shopNo) {
      callback();
    }
    if (value === undefined || value === "") {
      callback();
    } else {
      this.props.dispatch({
        type: 'shop/exisShopNos',
        payload: { where: {shopNo: value} },
      }).then(() => {
        if (this.props.shopNos.results === undefined) {
          callback();
          return;
        }
        if (this.props.shopNos.results.length > 0) {
          callback([new Error(rule.message)]);
        } else {
          callback();
        }
      });
    }
  }


  render() {
    const { shop: { data, brands, regions, districts }, loading } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { selectedRows, modalVisible, title, shopNo, shopName, address, contactTel } = this.state;

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
        dataIndex: 'shopName',
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
        render: (val, record) => (
          <span>
            <a onClick={() => this.handleEditModalVisible(true, `${val}`, record.shopNo, record.shopName, record.contactTel, record.address)}>编辑  </a>
            <Popconfirm title="确定删除?" onConfirm={() => this.handelDelete(`${val}`)}><a href="#">删除</a></Popconfirm>
          </span>),
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
      // current: this.state.pagination.current,
      // onChange: this.handlePageChange,
    };

    return (
      <PageHeaderLayout title="门店管理">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              <Form onSubmit={this.handleSearch} layout="inline">
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                  <Col md={8} sm={24}>
                    <FormItem label="编号">
                      {getFieldDecorator('shopNo')(
                        <Input placeholder="请输入" />
                      )}
                    </FormItem>
                  </Col>
                  <Col md={8} sm={24}>
                    <FormItem label="门店名称">
                      {getFieldDecorator('shopName')(
                        <Select
                          placeholder="请选择"
                          style={{ width: '100%' }}
                        >
                          { data.results.length > 0 ? data.results.map(d => <SelectOption key={d.objectId} value={d.shopName}>{d.shopName}</SelectOption>) :
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
          validateShopNo={this.validateShopNo}
          modalVisible={modalVisible}
          shopNo={shopNo}
          shopName={shopName}
          contactTel={contactTel}
          address={address}
          brands={brands.results}
          regions={regions.results}
          districts={districts.results}
        />
      </PageHeaderLayout>
    );
  }
}
