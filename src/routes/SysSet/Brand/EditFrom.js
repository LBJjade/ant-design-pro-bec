/* eslint-disable indent,no-unused-vars,no-undef,no-trailing-spaces,react/no-multi-comp,react/jsx-boolean-value,max-len,prefer-destructuring,padded-blocks,react/no-unused-state */
import React, { PureComponent } from 'react';
import { Input, Modal, Form, Upload, Icon } from 'antd';
import styles from './TableList.less';

const FormItem = Form.Item;

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
export default class CreateEditForm extends PureComponent {
  constructor(props) {
    super(props);
    const { pro } = props;
    this.state = {
      modalEditVisible: props.modalEditVisible,
      handleEdit: props.handleEdit,
      handleModalVisible: props.handleModalVisible,
      orderNumber: props.orderNumber,
      brandName: props.brandName,
      form: props.form,
    };
  }

  render() {
    const okHandle = () => {
      this.state.form.validateFields((err, fieldsValue) => {
        if (err) return;
        this.state.handleEdit(fieldsValue);
      });
    };
    const { getFieldDecorator } = this.props.form;
    const modalEditVisible = this.props.modalEditVisible;
    const brandName = this.props.brandName;

  return (

    <Modal
      title="编辑"
      visible={modalEditVisible}
      onOk={okHandle}
      onCancel={() => this.state.handleModalVisible(false)}
    >
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="品牌名称"
      >
        { getFieldDecorator('brandName', {
          rules: [{ required: true, message: '请输入品牌名称...' }],
          initialValue: { brandName },
        })(
          <Input placeholder="请输入" />
        )}
      </FormItem>
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="品牌LOGO"
      >
        { getFieldDecorator('brandLogo', {
          rules: [{ required: true, message: '请上传品牌LOGO...' }],
        })(
          <Avatar />
        )}
      </FormItem>
    </Modal>
  );
 }
}
