import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Form, List, Card, Row, Col, Input, Button, Icon, Menu, Table } from 'antd';
import CityModal from './CityModal';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './City.less';

@connect(({ city, loading }) => ({
  city,
  loading: loading.models.city,
}))
@Form.create()
export default class City extends PureComponent {
  state = {
    cityModal: {
      visible: false,
      cityNo: '',
      cityName: '',
    },
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'city/fetchCity',
      payload: {
      },
    });
  }

  handleAdd = () => {

  };

  showModal = (record) => {
    if (record === undefined) {
      this.setState({
        cityModal: {
          visible: true,
          cityNo: '',
          cityName: '',
          objectId: '',
        },
      });
    } else {
      this.setState({
        cityModal: {
          visible: true,
          cityNo: record.cityNo,
          cityName: record.cityName,
          objectId: record.objectId,
        },
      });
    }
  };

  closeModal = () => {
    this.setState({
      visible: false,
      cityModal: {
        visible: false,
        cityNo: '',
        cityName: '',
        objectId: '',
      },
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { city: { data }, loading } = this.props;

    const { cityModal } = this.state;

    const columns = [{
      title: '城市编号',
      dataIndex: 'cityNo',
      key: 'cityNo',
    }, {
      title: '城市名称',
      dataIndex: 'cityName',
      key: 'cityName',
    }, {
      title: '操作',
      key: 'action',
      render: (val, record) => {
        return (
          <span>
            {/*<Popconfirm title="确定删除?" onConfirm={() => this.handelDelete(`${val}`)}><a href="#">删除</a></Popconfirm>*/}
            <a onClick={() => this.showModal(record)}>编辑</a>
          </span>
        );
      }
    }];

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

    return (
      <PageHeaderLayout>
        <Form>
          <Form.Item>
            <Card>
              <Table
                loading={loading}
                dataSource={data.results}
                columns={columns}
                rowKey='objectId'
                pagination={false}
              />
            </Card>
            <Card>
              <Button type="primary" loading={loading} onClick={this.showModal} >新增</Button>
            </Card>
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('cityDetail', {
              initialValue: cityModal,
            })(
              <CityModal
                visible={cityModal.visible}
                cityModal={cityModal}
                onClose={() => this.closeModal()}
              />
            )}
          </Form.Item>
        </Form>
      </PageHeaderLayout>
    );
  }
}
