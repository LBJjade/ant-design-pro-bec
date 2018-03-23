/* eslint-disable react/jsx-indent,no-trailing-spaces */
import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Table, Form, Select, Row, Col, List } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import RuleTableForm from './RuleTableForm';
// import StandardTable from '../../components/StandardTable';

const requiredRule = [{
  objectId: 'sJwIOpkQ',
  isRequired: 1,
  isOptional: 0,
  fieldKey: 'purchaseDate',
  logic: '$gte',
  value: '2018-08-08',
}];

@connect(({ intention, loading }) => ({
  intention,
  loading: loading.effects['intention/fetch'],
}))
@Form.create()
export default class IntentionSetting extends Component {
  state = {
    PageActiveKey: 'detail',
    CardActiveKey: 'intention',
  }

  onPageTabChange = (key) => {
    this.setState({ PageActiveKey: key });
  }

  onCardTabChange = (key) => {
    this.setState({ CardActiveKey: key });
  }

  contentIntention = () => {
    return (
      <Table
        dataSource={[
          {
            objectId: 'vnQUY8hCUD',
            intentionNo: '0',
            intentionName: '无',
          }, {
            objectId: 'mqMb52dJaH',
            intentionNo: '1',
            intentionName: '低',
            countRequired: 1,
            countOptional: 2,
            remark: '|||| ||||',
          }, {
            objectId: 'OKGn8J00KY',
            intentionNo: '2',
            intentionName: '中',
            countRequired: 2,
            countOptional: 4,
            remark: '|||| |||| |||| ||||',
          }, {
            objectId: '9QHp1qpWwp',
            intentionNo: '3',
            intentionName: '高',
            countRequired: 3,
            countOptional: 6,
            remark: '|||| |||| |||| |||| |||| ||||',
          },
        ]}
        columns={[{
          title: '序号',
          dataIndex: 'intentionNo',
          key: 'intentionNo',
        }, {
          title: '意向级别',
          dataIndex: 'intentionName',
          key: 'intentionName',
        }, {
          title: '必要条件',
          dataIndex: 'countRequired',
          key: 'countRequired',
        }, {
          title: '充分条件',
          dataIndex: 'countOptional',
          key: 'countOptional',
        }, {
          title: '备注',
          dataIndex: 'remark',
          key: 'remark',
        }]}
        pagination={false}
        rowKey="objectId"
      />
    );
  }

  render() {
    // const { submitting } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 6 },
        sm: { span: 3 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const contentList = {
      intention: <Table
        dataSource={[
          {
            objectId: 'vnQUY8hCUD',
            intentionNo: '0',
            intentionName: '无',
          }, {
            objectId: 'mqMb52dJaH',
            intentionNo: '1',
            intentionName: '低',
            countRequired: 1,
            countOptional: 2,
            remark: '|||| ||||',
          }, {
            objectId: 'OKGn8J00KY',
            intentionNo: '2',
            intentionName: '中',
            countRequired: 2,
            countOptional: 4,
            remark: '|||| |||| |||| ||||',
          }, {
            objectId: '9QHp1qpWwp',
            intentionNo: '3',
            intentionName: '高',
            countRequired: 3,
            countOptional: 6,
            remark: '|||| |||| |||| |||| |||| ||||',
          },
        ]}
        columns={[{
          title: '序号',
          dataIndex: 'intentionNo',
          key: 'intentionNo',
        }, {
          title: '意向级别',
          dataIndex: 'intentionName',
          key: 'intentionName',
        }, {
          title: '必要条件',
          dataIndex: 'countRequired',
          key: 'countRequired',
        }, {
          title: '充分条件',
          dataIndex: 'countOptional',
          key: 'countOptional',
        }, {
          title: '备注',
          dataIndex: 'remark',
          key: 'remark',
        }]}
        pagination={false}
        rowKey="objectId"
      />,
      rule:
        <Form onSubmit={this.handleSubmit} style={{ marginTop: 8 }} hideRequiredMark>
          <Row>
            <Form.Item
              {...formItemLayout}
              label="意向级别"
            >
              {getFieldDecorator('intention', {
                rules: [{ required: true, message: 'Please select intention!' }],
              })(
                <Select initialValue="1">
                  <Select.Option value="0" disabled>无</Select.Option>
                  <Select.Option value="1">低</Select.Option>
                  <Select.Option value="2">中</Select.Option>
                  <Select.Option value="3">高</Select.Option>
                </Select>
              )}
            </Form.Item>
          </Row>
          <Form.Item>
            <Card title="必要条件" bordered={false}>
              {getFieldDecorator('requirerule', {
                initialValue: requiredRule,
              })(
                <RuleTableForm />
              )}
            </Card>
          </Form.Item>

        </Form>,
      item:
        <Card> { 'Todo Item' } </Card>,
    };

    return (
      <PageHeaderLayout
        title="意向规则管理"
        logo={<img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />}
        tabList={[{ key: 'detail', tab: '详情' }, { key: 'rule', tab: '规则' }]}
        tabActiveKey={this.state.PageActiveKey}
        onTabChange={(key) => { this.setState({ PageActiveKey: key }); }}
      >
        <Card
          title="意向规则设置"
          tabList={[{ key: 'intention', tab: '意向级别' }, { key: 'rule', tab: '级别规则' }, { key: 'item', tab: '规则条件' }]}
          activetabkey={this.state.CardActiveKey}
          onTabChange={(key) => { this.setState({ CardActiveKey: key }); }}
        >
          {contentList[this.state.CardActiveKey]}
        </Card>
      </PageHeaderLayout>
    );
  }
}
