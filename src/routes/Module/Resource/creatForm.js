/* eslint-disable indent,no-unused-vars,no-undef,no-trailing-spaces,react/no-multi-comp,react/jsx-boolean-value,max-len,prefer-destructuring,padded-blocks,react/no-unused-state,quotes,react/no-unescaped-entities,no-extra-semi */
import React, { PureComponent } from 'react';
import { Input, Modal, Form, Select } from 'antd';

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
      moduleId: this.props.moduleId,
      module: this.props.module,
      qrCodeUrl: this.props.qrCodeUrl,
    };
  };

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps);
    this.setState({
      resourceName: nextProps.resourceName,
      resourceBrief: nextProps.resourceBrief,
      module: nextProps.module,
      modalVisible: nextProps.modalVisible,
      qrCodeUrl: nextProps.qrCodeUrl,
      moduleId: nextProps.moduleId,
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
    const { resourceName, resourceBrief, qrCodeUrl, moduleId, title, modalVisible, module } = this.state;


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
          label="板块名称"
        >
          {getFieldDecorator('moduleId', {
            rules: [{ required: true, message: '请输入板块名称...' }],
            initialValue: moduleId,
          })(
            <Select
              placeholder="请选择"
              style={{ width: '100%' }}
            >
              { module.results.length > 0 ? module.results.map(d => <Select.Option key={d.objectId} value={d.objectId}>{d.moduleName}</Select.Option>) :
              <Select.Option key="1" > 暂无</Select.Option> }
            </Select>
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
