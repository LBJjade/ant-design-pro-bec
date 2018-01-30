import React from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Divider, Radio, Icon } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './Style.less';

const RadioGroup = Radio.Group;

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

@connect(({ forgetpassword }) => ({
  data: forgetpassword.step,
  validating: forgetpassword.userValidating,
}))
@Form.create()
export default class Step1 extends React.PureComponent {
  state = {
    // verify: 'email',
  };

  handleValidate = (rule, value, callback) => {
    if (rule.fieldname !== undefined) {
      if (!value) {
        callback([new Error(rule.message)]);
      } else {
        if (rule.fieldname === 'email') {
          this.props.dispatch({
            type: 'forgetpassword/validate',
            payload: { email: value },
          });
        }
        if (rule.fieldname === 'mobile') {
          this.props.dispatch({
            type: 'forgetpassword/validate',
            payload: { mobile: value },
          });
        }
        setTimeout(() => {
          if (this.props.validating.results.length <= 0) {
            callback([new Error(rule.message)]);
          } else {
            callback();
          }
        }, 800);
      }
    }
  }
  // handleSubmit = (e) => {
  //   e.preventDefault();
  //   this.props.form.validateFields({ force: true }, (err, values) => {
  //     if (!err) {
  //       this.props.dispatch({
  //         type: 'forgetpassword/submitVerifyCode',
  //         payload: values,
  //       });
  //       // this.props.dispatch({
  //       //   type: 'forgetpassword/saveStepFormData',
  //       //   payload: values,
  //       // });
  //       // this.props.dispatch(routerRedux.push('/account/forgetpassword/confirm'));
  //     }
  //   });
  // };
  render() {
    const { form, dispatch, data } = this.props;
    const { getFieldDecorator, validateFields } = form;
    const onValidateForm = () => {
      validateFields({ force: true }, (err, values) => {
        if (!err) {
          dispatch({
            type: 'forgetpassword/saveStepFormData',
            payload: values,
          });
          dispatch(routerRedux.push('/account/forgetpassword/confirm'));
        }
      });
    };
    return (
      <div>
        <Form layout="horizontal" className={styles.stepForm} hideRequiredMark>
          <Form.Item
            {...formItemLayout}
            label="发送验证码"
          >
            <RadioGroup defaultValue="email">
              <Radio value="email">邮件验证码</Radio>
              <Radio value="mobile">短信验证码</Radio>
            </RadioGroup>
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="注册邮箱"
          >
            {getFieldDecorator('email', {
              initialValue: data.email,
              rules: [
                { fieldname: 'email', required: true, message: '请输入邮箱地址！' },
                { fieldname: 'email', required: true, type: 'email', message: '邮箱地址格式错误！' },
                { fieldname: 'email', required: true, message: '该邮箱未注册。', validator: this.handleValidate },
              ],
              validateFirst: true,
              validateTrigger: 'onBlur',
            })(
              <Input placeholder="请输入您的注册邮箱" prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} />
            )}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="注册手机号码"
          >
            {getFieldDecorator('mobile', {
              initialValue: data.mobile,
              rules: [
                { fieldname: 'mobile', required: true, message: '请输入手机号！' },
                { fieldname: 'mobile', required: true, pattern: /^1\d{10}$/, message: '手机号格式错误！' },
                { fieldname: 'mobile', required: true, message: '该手机号码未注册', validator: this.handleValidate },
              ],
              validateFirst: true,
              validateTrigger: 'onBlur',
            })(
              <Input placeholder="请输入您的注册手机号码" prefix={<Icon type="mobile" style={{ color: 'rgba(0,0,0,.25)' }} />} />
            )}
          </Form.Item>
          <Form.Item
            wrapperCol={{
              xs: { span: 24, offset: 0 },
              sm: { span: formItemLayout.wrapperCol.span, offset: formItemLayout.labelCol.span },
            }}
            label=""
          >
            <Button type="primary" onClick={onValidateForm}>
              下一步
            </Button>
          </Form.Item>
        </Form>
        <Divider style={{ margin: '40px 0 24px' }} />
      </div>
    );
  }
}

