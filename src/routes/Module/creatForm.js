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
      resourceName: this.props.resourceName,
      resourceBrief: this.props.resourceBrief,
      qrCodeUrl: this.props.qrCodeUrl,
    };
  };

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps);
    this.setState({
      resourceName: nextProps.resourceName,
      resourceBrief: nextProps.resourceBrief,
      modalVisible: nextProps.modalVisible,
      qrCodeUrl: nextProps.qrCodeUrl,
      title: nextProps.title,
    });
  };

  onclose = () => {
    const { handleModalVisible } = this.state;
    handleModalVisible(false);
    this.props.form.resetFields();
  };

  okHandle = () => {
    const { form, title, handleEdit, resourceName, handleAdd } = this.state;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      if (resourceName !== "") {
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
    const { resourceName, resourceBrief, qrCodeUrl, title, modalVisible } = this.state;


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
          label="资源名称"
        >
          {getFieldDecorator('resourceName', {
            rules: [{ required: true, message: '请输入资源名称...' }],
            initialValue: resourceName,
          })(
            <Input placeholder="请输入" />
          )}
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="资源简介"
        >
          {getFieldDecorator('resourceBrief', {
            rules: [{ required: true, message: '请输入资源简介...' }],
            initialValue: resourceBrief,
          })(
            <TextArea rows={4} placeholder="请输入" />
          )}
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="资源路径"
        >
          {getFieldDecorator('qrCodeUrl', {
            rules: [{ required: true, message: '请输入资源路径...' }],
            initialValue: qrCodeUrl,
          })(
            <Input placeholder="请输入" />
          )}
        </FormItem>
      </Modal>
    );
 }
}
