import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Avatar, Row, Col, Card, Input, Icon, Select, Upload, message, Button, Divider } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './Setting.less';


@connect(({account}) => ({
  account,
  loading: account.loading,
  currentUser: account.currentUser,
  existEmail: account.existEmail,
  existMobile: account.existMobile,
}))
@Form.create()
export default class Setting extends Component {
  state = {
    prefix: '86',
    imageUrl: '',
    isDirty: false,
  };

  onChange = (e) => {
    const { target } = e;
    if (target !== undefined) {
      if (target.id === 'nickname') {
        this.setState({ isDirty: !(this.props.currentUser.nickname === target.value) });
      }
      if (target.id === 'mobile') {
        this.setState({ isDirty: !(this.props.currentUser.mobile === target.value) });
      }
    }
    // this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    // console.log(e);
  };

  greeting = () => {
    const hour = new Date().getHours();
    const greets = [
      {greeting: '夜深了', dayPart: 6},
      {greeting: '早安', dayPart: 10},
      {greeting: '上午好', dayPart: 12},
      {greeting: '中午好', dayPart: 14},
      {greeting: '下午好', dayPart: 18},
      {greeting: '晚安', dayPart: 24}];
    const greet = greets.filter(item => item.dayPart >= hour);
    return greet[0].greeting;
  };

  changePrefix = (value) => {
    this.setState({
      prefix: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields({ force: true }, (err, values) => {
      if (err === null || !err) {
        this.props.dispatch({
          type: 'account/coverUser',
          payload: {
            ...values,
            prefix: this.state.prefix,
            objectId: this.props.currentUser.objectId,
          },
        });
      }
    });
  };

  handleValidate = (rule, value, callback) => {
    if (rule.fieldname !== undefined) {
      if (!value) {
        callback([new Error(rule.message)]);
      } else {
        if (rule.fieldname === 'email') {
          this.props.dispatch({
            type: 'account/existEmail',
            // payload: { email: value },
            payload: {
              where: {
                objectId: { $ne: this.props.currentUser.objectId },
                email: { $regex: `^${value}$`, $options: 'i', },
              },
            },
          }).then(() => {
            if (this.props.existEmail.results.length > 0) {
              callback([new Error(rule.message)]);
            } else {
              callback();
            }
          });
        }
        if (rule.fieldname === 'mobile') {
          this.props.dispatch({
            type: 'account/existMobile',
            // payload: { mobile: value },
            payload: {
              where: {
                objectId: { $ne: this.props.currentUser.objectId },
                mobile: value,
              },
            },
          }).then(() => {
            if (this.props.existMobile.results.length > 0) {
              callback([new Error(rule.message)]);
            } else {
              callback();
            }
          });
        }
      }
    }
  };

  changeAvatar = (info) => {
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
  };

  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  beforeUpload = (file) => {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
      message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
  };

  render() {
    const { form, loading, currentUser } = this.props;
    const { getFieldDecorator } = form;

    const { prefix, isDirty } = this.state;

    let greetingWord = '';
    let subTitle = '';


    // const greetingWord = this.greeting();
    if (currentUser.username) {
      greetingWord = `${ this.greeting() }，${currentUser.nickname || currentUser.username || ''}，祝你开心每一天！`;
      subTitle = '交互专家 | 广州品清科技有限公司';
    }

    const pageHeaderContent = (
      <div className={styles.pageHeaderContent}>
        <div className={styles.avatar}>
          <Avatar size="large" src={currentUser.avatar} />
        </div>
        <div className={styles.content}>
          <div className={styles.contentTitle}>{ greetingWord }</div>
          <div>{ subTitle }</div>
        </div>
      </div>
    );

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    };

    const submitFormLayout = {
      wrapperCol: { span: 24, offset: 6 },
    };

    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const imageUrl = this.state.imageUrl;

    const props = {
      name: 'file',
      action: 'https://parse-server-instances.herokuapp.com/parse/files/doodle.png',
      headers: {
        'Content-Type': 'image/jpeg',
        'X-Parse-Application-Id': 'bec',
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };

    return (
      <PageHeaderLayout
        content={pageHeaderContent}
      >
          <Row gutter={24}>
            <Col xl={8} lg={24} md={24} sm={24} xs={24}>
              <Card>
                <Upload {...props}>
                  <Button>
                    <Icon type="upload" /> Click to Upload
                  </Button>
                </Upload>
              </Card>
            </Col>
            <Col xl={16} lg={24} md={24} sm={24} xs={24}>
            <Card title='基础设置'>
              <Form onSubmit={this.handleSubmit}>
                <Form.Item { ...formItemLayout } label='注册邮箱：'>
                  <Icon type="mail" style={{ margin:10 }} />{ currentUser.email || '' }
                </Form.Item>
                <Divider />
                <Form.Item { ...formItemLayout } label='昵称：'>
                  { getFieldDecorator('nickname', {
                    initialValue: currentUser.nickname || '',
                    rules: [
                      { fieldname: 'nickname', required: false, min: 3, message: '昵称长度不能小于 3 ' },
                    ],
                  })(<Input
                    placeholder={currentUser.nickname || '请输入您的昵称.'}
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    onChange={e => this.onChange(e)} />)}
                </Form.Item>
                <Form.Item { ...formItemLayout } label='手机号码'>
                  <Input.Group compact>
                    <Select
                      value={prefix}
                      onChange={this.changePrefix}
                      style={{ width: '20%' }}
                    >
                      <Select.Option value="86">+86</Select.Option>
                      <Select.Option value="87">+87</Select.Option>
                    </Select>
                    {getFieldDecorator('mobile', {
                      initialValue: currentUser.mobile || '',
                      rules: [
                        { fieldname: 'mobile', required: true, message: '请输入手机号！' },
                        { fieldname: 'mobile', required: true, pattern: /^1\d{10}$/, message: '手机号格式错误！' },
                        { fieldname: 'mobile', required: true, message: '该手机号码已被注册', validator: this.handleValidate },
                      ],
                      validateFirst: true,
                      validateTrigger: 'onBlur',
                    })(
                      <Input
                        style={{ width: '80%' }}
                        placeholder={currentUser.mobile || '请输入您的手机号码.'}
                        onChange={e => this.onChange(e)}
                      />
                    )}
                  </Input.Group>
                </Form.Item>
                <Form.Item {...submitFormLayout} style={{ marginTop: 32 }}>
                  <Button type="primary" htmlType="submit" loading={loading} disabled={!isDirty}>保存</Button>
                </Form.Item>
              </Form>
            </Card>
            </Col>
          </Row>
      </PageHeaderLayout>
    );
  }
}
