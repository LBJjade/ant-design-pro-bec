/* eslint-disable indent,no-unused-vars,no-undef,no-trailing-spaces,react/no-multi-comp,react/jsx-boolean-value,max-len,prefer-destructuring,padded-blocks,react/no-unused-state,quotes,react/no-unescaped-entities,no-extra-semi */
import React, { PureComponent } from 'react';
import { Input, Modal, Form, Upload, Icon, Select } from 'antd';
import { stringify } from 'qs';

const FormItem = Form.Item;
const { Option } = Select;
const SelectOption = Select.Option;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJPG && isLt2M;
}

class Avatar extends React.Component {
  state = {
    loading: false,
  };
  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => this.setState({
        imageUrl,
        loading: false,
      }));
    }
  }
  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const imageUrl = this.state.imageUrl;
    return (
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={true}
        action="http://localhost:80/upload/webUploader/img"
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="" /> : uploadButton}
      </Upload>
    );
  }
}

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
      validateDistrictNo: this.props.validateDistrictNo,
      districtNo: this.props.districtNo,
      districtName: this.props.districtName,
    };
  };

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps);
    this.setState({
      districtNo: nextProps.districtNo,
      districtName: nextProps.districtName,
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
    const { form, title, handleEdit, districtNo, handleAdd } = this.state;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      if (districtNo !== "") {
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
    const { option, option2 } = this.props;
    const { districtNo, districtName, title, modalVisible, validateDistrictNo } = this.state;


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
          label="编号"
        >
          {
          getFieldDecorator('districtNo', {
            rules: [{ required: true, message: '请输入编号...' }, { fieldname: 'districtNo', required: true, message: '该编号已存在', validator: validateDistrictNo }],
            validateFirst: true,
            validateTrigger: 'onBlur',
            initialValue: districtNo,
          })(
            <Input placeholder="请输入" />
            )
          }
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="小区名称"
        >
          {
              getFieldDecorator('districtName', {
                rules: [{ required: true, message: '请输入小区名称...' }],
                initialValue: districtName,
              })(
                <Input placeholder="请输入" />
              )
          }
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="关联品牌"
        >
          {getFieldDecorator('brandName', {
            rules: [{ required: true, message: '请选择关联品牌...' }],
          })(
            <Select
              placeholder="请选择"
              style={{ width: '100%' }}
            >
              {option.map(d => <SelectOption key={d.objectId} value={d.brandName} >{d.brandName}</SelectOption>)}
            </Select>
          )}
        </FormItem>
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="关联大区"
        >
          {getFieldDecorator('regionName', {
            rules: [{ required: true, message: '请选择关联大区...' }],
          })(
            <Select
              placeholder="请选择"
              style={{ width: '100%' }}
            >
              {option2.map(d => <SelectOption key={d.objectId} value={d.regionName} >{d.regionName}</SelectOption>)}
            </Select>
          )}
        </FormItem>
      </Modal>
    );
 }
}
