/* eslint-disable indent,no-unused-vars,no-undef,no-trailing-spaces,react/no-multi-comp,react/jsx-boolean-value,max-len,prefer-destructuring,padded-blocks,react/no-unused-state,quotes,react/no-unescaped-entities,no-extra-semi */
import React, { PureComponent } from 'react';
import { Input, Modal, Form, Upload, Icon } from 'antd';
import { stringify } from 'qs';

const FormItem = Form.Item;
const { TextArea } = Input;

@Form.create()
export default class CreateForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: this.props.modalVisible,
      handleAdd: this.props.handleAdd,
      handleEdit: this.props.handleEdit,
      handleModalVisible: this.props.handleModalVisible,
      title: this.props.title,
      form: this.props.form,
      actionName: this.props.actionName,
      actionBrief: this.props.actionBrief,
    };
  };

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps);
    this.setState({
      actionName: nextProps.actionName,
      actionBrief: nextProps.actionBrief,
      modalVisible: nextProps.modalVisible,
      title: nextProps.title,
    });
  };

  onclose = () => {
    const { handleModalVisible } = this.state;
    handleModalVisible(false);
    this.props.form.resetFields();
  };

  okHandle = () => {
    const { form, title, handleEdit, actionName, handleAdd } = this.state;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      if (actionName !== "") {
        handleEdit(fieldsValue);
        this.props.form.resetFields();
      } else {
        handleAdd(fieldsValue);
        this.props.form.resetFields();
      }
    });
  };


  render() {
    const { getFieldDecorator } = this.props.form;
    const { actionName, actionBrief, title, modalVisible } = this.state;


    return (
      <Modal
        title={title}
        visible={modalVisible}
        onOk={this.okHandle}
        onCancel={() => this.onclose()}
      >
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="权限名称"
        >
          {getFieldDecorator('action', {
            rules: [{ required: true, message: '请输入权限名称...' }],
            initialValue: actionName,
          })(
            <Input placeholder="请输入" />
          )}
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="权限说明"
        >
          {getFieldDecorator('name', {
            rules: [{ required: true, message: '请输入权限说明...' }],
            initialValue: actionBrief,
          })(
            <TextArea rows={4} placeholder="请输入" />
          )}
        </FormItem>
      </Modal>
    );
 }
}
