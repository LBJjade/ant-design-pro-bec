/* eslint-disable react/jsx-indent,no-trailing-spaces,max-len,react/jsx-wrap-multilines */

import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Card, Table, Tabs, Icon, Select, Row, Col, Button, Message, Input, InputNumber, Divider } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import RuleTableForm from './RuleTableForm';


const { TabPane } = Tabs;
const SelectOption = Select.Option;

@connect(({ analysis, loading }) => ({
  analysis,
  loading: loading.effects['analysis/fetch'],
}))
@Form.create()
export default class AnalysisSetting extends Component {
  state = {
    selectedIntention: '',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'analysis/fetchIntention',
      payload: {},
    });
    dispatch({
      type: 'analysis/fetchAnalysisField',
      payload: {},
    });
  }

  handleSaveRow(e) {
    const { dispatch } = this.props;

    if (e.isNew) {
      dispatch({
        type: 'analysis/storeAnalysisRule',
        payload: {
          fieldKey: e.fieldKey,
          logic: e.logic,
          value: e.value,
          isRequired: e.isRequired,
          isOptional: 0,
          pointerIntention: {
            __type: 'Pointer',
            className: 'Intention',
            objectId: this.state.selectedIntention,
          },
          key: e.key,
        },
      }).then(() => {
        e.isNew = false;
      }).catch(() => {
        Message.error('保存失败！', 5);
      });
    } else {

      // 通过key查找ObjectId
      const { analysisRule } = this.props.analysis;
      const target = analysisRule.results.filter(item => item.key === e.key);

      if (target.length > 0) {
        const objectId = target[0].objectId;

        dispatch({
          type: 'analysis/coverAnalysisRule',
          payload: {
            objectId: objectId,
            fieldKey: e.fieldKey,
            logic: e.logic,
            value: e.value,
            isRequired: e.isRequired,
            isOptional: 0,
            key: e.key,
          },
        }).then(() => {
          e.isNew = false;
        }).catch(() => {
          Message.error('保存失败！', 5);
        });
      }
    }
  }

  handleRemoveRow(e, r) {
    // 通过key查找ObjectId
    const { analysisRule } = this.props.analysis;
    const target = analysisRule.results.filter(item => item.key === r.key);

    if (target.length > 0) {
      const objectId = target[0].objectId;

      this.props.dispatch({
        type: 'analysis/removeAnalysisRule',
        payload: {
          objectId: objectId,
        },
      }).then().catch(() => {
        Message.error('删除数据失败！', 5);
      });
    }
  }

  handleIntentionChange(e) {
    if (e !== undefined) {
      this.props.dispatch({
        type: 'analysis/fetchAnalysisRule',
        payload: {
          where: {
            pointerIntention: {
              __type: 'Pointer',
              className: 'Intention',
              objectId: e,
            },
          },
        },
      }).then(() => {
        this.setState({
          selectedIntention: e,
          reload: true,
        });
      }).catch(() => {
        Message.error('获取数据失败！', 5);
      });
    }
  }

  render() {
    // const { submitting } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { analysis: { intention, analysisField, analysisRule }, loading } = this.props;

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 6 },
    };

    // const columnsSource = [{
    //   title: '条件类型',
    //   dataIndex: 'isRequired',
    //   key: 'isRequired',
    //   width: '20%',
    //   render: (text, record) => {
    //     const ruletype = [
    //       { objectId: 'XDE9jnTaq8', key: 1, label: '必要条件' },
    //     ];
    //
    //     if (record.editable) {
    //       return (
    //         <Select
    //           defaultValue={text}
    //           onChange={e => this.handleFieldChange(e, 'isRequired', record.key)}
    //           onKeyPress={e => this.handleKeyPress(e, record)}
    //         >
    //           {
    //             ruletype.map(owner =>
    //               <SelectOption key={owner.objectId} value={owner.key}>{owner.label}</SelectOption>
    //             )
    //           }
    //         </Select>
    //       );
    //     }
    //     return ruletype.find((item) => { return item.key === text; }).label;
    //   },
    // }, {
    //   title: '条件名称',
    //   dataIndex: 'fieldKey',
    //   key: 'fieldKey',
    //   width: '20%',
    //   render: (text, record) => {
    //     if (record.editable) {
    //       return (
    //         <Select
    //           defaultValue={text}
    //           onChange={e => this.handleFieldChange(e, 'fieldKey', record.key)}
    //           onKeyPress={e => this.handleKeyPress(e, record)}
    //         >
    //           {
    //             analysisField.results.map(owner =>
    //               <SelectOption key={owner.objectId} value={owner.fieldKey}>{owner.fieldName}</SelectOption>
    //             )
    //           }
    //         </Select>
    //       );
    //     }
    //     return analysisField.results.find((item) => { return item.fieldKey === text; }).fieldName;
    //   },
    // }, {
    //   title: '判断逻辑',
    //   dataIndex: 'logic',
    //   key: 'logic',
    //   width: '20%',
    //   render: (text, record) => {
    //     const logic = [
    //       { objectId: 0, key: '$lt', label: '小于' },
    //       { objectId: 1, key: '$lte', label: '小于或等于' },
    //       { objectId: 2, key: '$gt', label: '大于' },
    //       { objectId: 3, key: '$gte', label: '大于或等于' },
    //       { objectId: 4, key: '$ne', label: '不等于' },
    //       { objectId: 5, key: '$et', label: '等于' },
    //       { objectId: 6, key: '$in', label: '在内(逗号分隔)' },
    //       { objectId: 7, key: '$lk', label: '模糊包含' },
    //     ];
    //
    //     if (record.editable) {
    //       return (
    //         <Select
    //           defaultValue={text}
    //           onChange={e => this.handleFieldChange(e, 'logic', record.key)}
    //           onKeyPress={e => this.handleKeyPress(e, record)}
    //         >
    //           {
    //             logic.map(owner =>
    //               <SelectOption key={owner.objectId} value={owner.key}>{owner.label}</SelectOption>
    //             )
    //           }
    //         </Select>
    //       );
    //     }
    //     return logic.find((item) => { return item.key === text; }).label;
    //   },
    // }, {
    //   title: '阀值',
    //   dataIndex: 'value',
    //   key: 'value',
    //   width: '20%',
    //   render: (text, record) => {
    //     if (record.editable) {
    //       return (
    //         <Input
    //           value={text}
    //           onChange={e => this.handleFieldChange(e, 'value', record.key)}
    //           onKeyPress={e => this.handleKeyPress(e, record)}
    //           placeholder="阀值"
    //         />
    //       );
    //     }
    //     return text;
    //   },
    // }, {
    //   title: '操作',
    //   key: 'action',
    //   render: (text, record) => {
    //     if (!!record.editable && this.state.loading) {
    //       return null;
    //     }
    //     if (record.editable) {
    //       if (record.isNew) {
    //         return (
    //           <span>
    //             <a onClick={e => this.saveRow(e, record)}>添加</a>
    //             <Divider type="vertical" />
    //             <Popconfirm title="是否要删除此行？" onConfirm={() => this.remove(record)}>
    //               <a>删除</a>
    //             </Popconfirm>
    //           </span>
    //         );
    //       }
    //       return (
    //         <span>
    //           <a onClick={e => this.saveRow(e, record)}>保存</a>
    //           <Divider type="vertical" />
    //           <a onClick={e => this.cancel(e, record.key)}>取消</a>
    //         </span>
    //       );
    //     }
    //     return (
    //       <span>
    //         <a onClick={e => this.toggleEditable(e, record.key)}>编辑</a>
    //         <Divider type="vertical" />
    //         <Popconfirm title="是否要删除此行？" onConfirm={() => this.remove(record)}>
    //           <a>删除</a>
    //         </Popconfirm>
    //       </span>
    //     );
    //   },
    // }];

    return (
      <PageHeaderLayout
        title="分析规则管理"
        logo={<img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />}
        content="客户意向级别根据设定的分析规则进行判断；而分析规则可以由多个逻辑条件构成。"
      >
        <Card>
          <Tabs defaultActiveKey="1">
            <TabPane tab={<span><Icon type="info-circle-o" />规则详情</span>} key="1">
              <Table
                loading={loading}
                dataSource={intention.results}
                columns={[{
                  title: '序号',
                  dataIndex: 'intentionLevel',
                  key: 'intentionLevel',
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
            </TabPane>
            <TabPane tab={<span><Icon type="setting" />规则设置</span>} key="2">
              <Form onSubmit={this.handleSubmit} style={{ marginTop: 8 }} hideRequiredMark>
                <Row>
                  <Form.Item label="意向级别" { ...formItemLayout }>
                    {getFieldDecorator('intention', {
                      rules: [{ required: true, message: '请选择意向级别!' }],
                    })(
                      <Select initialValue="1" onChange={e => this.handleIntentionChange(e)}>
                        { intention.results.map(owner => <SelectOption key={owner.intentionLevel} value={owner.objectId} disabled={owner.disabled}>
                              {owner.intentionName}
                            </SelectOption>)}
                      </Select>
                    )}
                  </Form.Item>
                </Row>
                <Row>
                  <Form.Item label="必要条件" { ...formItemLayout }>
                    <InputNumber
                      value={analysisRule.results.length}
                      min={analysisRule.results.length}
                      max={analysisRule.results.length}
                      disabled
                    />
                  </Form.Item>
                  <Form.Item label="充分条件" { ...formItemLayout }>
                    <InputNumber addonBefore="充分条件" />
                  </Form.Item>
                </Row>
                <Tabs defaultActiveKey="required">
                  <TabPane tab={<span><Icon type="check" />必要条件</span>} key="required">
                    <Form.Item>
                      {getFieldDecorator('requirerule')(
                        <RuleTableForm
                          //columnsSource={columnsSource}
                          dataSource={analysisRule.results}
                          pointerIntention={this.state.selectedIntention}
                          dataAnalysisField={analysisField}
                          onSaveRow={e => this.handleSaveRow(e)}
                          onRemoveRow={(e, r) => this.handleRemoveRow(e, r)}
                        />
                      )}
                    </Form.Item>
                  </TabPane>
                  <TabPane tab={<span><Icon type="ellipsis" />充分条件</span>} key="optional">
                    <Form.Item>
                      {getFieldDecorator('optional')(
                        <RuleTableForm
                          // dataSource={analysisRule.results}
                          pointerIntention={this.state.selectedIntention}
                          dataAnalysisField={analysisField}
                          // onSaveRow={e => this.handleSaveRow(e)}
                          // onRemoveRow={(e, r) => this.handleRemoveRow(e, r)}
                        />
                      )}
                    </Form.Item>
                  </TabPane>
                </Tabs>
              </Form>
            </TabPane>
          </Tabs>
        </Card>
      </PageHeaderLayout>
    );
  }
}
