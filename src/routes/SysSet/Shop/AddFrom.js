/* eslint-disable indent,no-unused-vars,no-undef,no-trailing-spaces,react/no-multi-comp,react/jsx-boolean-value,max-len,prefer-destructuring,padded-blocks,react/no-unused-state */
import React, { PureComponent } from 'react';
import { Input, Modal, Form, Upload, Icon, Select } from 'antd';

const FormItem = Form.Item;
const { Option } = Select;
const SelectOption = Select.Option;

@Form.create()
export default class CreateAddForm extends PureComponent {
  constructor(props) {
    super(props);
    const { pro } = props;
    this.state = {
      modalVisible: props.modalVisible,
      handleAdd: props.handleAdd,
      handleModalVisible: props.handleModalVisible,
      form: props.form,
    };
  }

  render() {
    const okHandle = () => {
      this.state.form.validateFields((err, fieldsValue) => {
        if (err) return;
        this.state.handleAdd(fieldsValue);
      });
    };
    const { getFieldDecorator } = this.props.form;
    const modalVisible = this.props.modalVisible;

  return (

    <Modal
      title="新增"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => this.state.handleModalVisible()}
    >
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="小区名称"
      >
        {getFieldDecorator('shopName', {
          rules: [{ required: true, message: '请输入小区名称...' }],
        })(
          <Input placeholder="请输入" />
        )}
      </FormItem>
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="关联品牌"
      >
        {getFieldDecorator('shopName', {
          rules: [{ required: true, message: '请选择关联品牌...' }],
        })(
          <Select defaultValue="lucy" style={{ width: 120 }} >
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="disabled" disabled>Disabled</Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
        )}
      </FormItem>
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="关联大区"
      >
        {getFieldDecorator('shopName', {
          rules: [{ required: true, message: '请选择关联大区...' }],
        })(
          <Select defaultValue="lucy" style={{ width: 120 }} >
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="disabled" disabled>Disabled</Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
        )}
      </FormItem>
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="关联小区"
      >
        {getFieldDecorator('shopName', {
          rules: [{ required: true, message: '请选择关联小区...' }],
        })(
          <Select defaultValue="lucy" style={{ width: 120 }} >
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="disabled" disabled>Disabled</Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
        )}
      </FormItem>
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="联系电话"
      >
        {getFieldDecorator('contactTel', {
          rules: [{ required: true, message: '请输入联系电话...' }],
        })(
          <Input placeholder="请输入" />
        )}
      </FormItem>
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="门店地址"
      >
        {getFieldDecorator('address', {
          rules: [{ required: true, message: '请输入门店地址...' }],
        })(
          <Input placeholder="请输入" />
        )}
      </FormItem>
    </Modal>
  );
 }
}
