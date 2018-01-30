import React from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Alert, Divider } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './Style.less';

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

@connect(({ forgetpassword, loading }) => ({
  submitting: loading.effects['forgetpassword/submitStepForm'],
  data: forgetpassword.step,
}))
@Form.create()
export default class Step2 extends React.PureComponent {
  state = {};
  render() {
    const { form, data, dispatch, submitting } = this.props;
    const { getFieldDecorator, validateFields } = form;
    const onPrev = () => {
      dispatch(routerRedux.push('/account/forgetpassword'));
    };
    const onValidateForm = (e) => {
      e.preventDefault();
      validateFields((err, values) => {
        if (!err) {
          dispatch({
            type: 'forgetpassword/submitStepForm',
            payload: {
              ...data,
              ...values,
            },
          });
        }
      });
    };
    return (
      <Form layout="horizontal" className={styles.stepForm}>
        <Alert
          closable
          showIcon
          message="已发送验证码到邮箱/手机，请输入验收码和密码进行改密。"
          style={{ marginBottom: 24 }}
        />
        <Form.Item
          {...formItemLayout}
          className={styles.stepFormText}
          label="接收邮箱"
        >
          {data.email}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          className={styles.stepFormText}
          label="接收手机号码"
        >
          {data.mobile}
        </Form.Item>
        <Divider style={{ margin: '24px 0' }} />
        <Form.Item
          {...formItemLayout}
          label="验证码"
          required={false}
        >
          {getFieldDecorator('verifycode', {
            initialValue: '1234',
            rules: [{
              required: true, message: '请输入邮件或短信接收到的验证码',
            }],
          })(
            <Input autoComplete="off" style={{ width: '80%' }} />
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="新密码"
          required={false}
        >
          {getFieldDecorator('password', {
            initialValue: '123456',
            rules: [{
              required: true, message: '请输入新密码',
            }],
          })(
            <Input type="password" autoComplete="off" style={{ width: '80%' }} />
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="确认新密码"
          required={false}
        >
          {getFieldDecorator('confirm', {
            initialValue: '123456',
            rules: [{
              required: true, message: '请输入新密码',
            }],
          })(
            <Input type="password" autoComplete="off" style={{ width: '80%' }} />
          )}
        </Form.Item>
        <Form.Item
          style={{ marginBottom: 8 }}
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: { span: formItemLayout.wrapperCol.span, offset: formItemLayout.labelCol.span },
          }}
          label=""
        >
          <Button onClick={onPrev}>
            上一步
          </Button>
          <Button type="primary" onClick={onValidateForm} loading={submitting} style={{ marginLeft: 20 }}>
            提交
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
