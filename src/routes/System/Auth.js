import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Card } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const FormItem = Form.Item;
const { TextArea } = Input;

@connect(({ loading }) => ({
  submitting: loading.effects['form/submitRegularForm'],
}))
@Form.create()
export default class BasicForms extends PureComponent {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'form/submitRegularForm',
          payload: values,
        });
      }
    });
  }
  render() {
    const { submitting } = this.props;
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    return (
      <PageHeaderLayout title="实名认证" content="">
        <Card title="账号信息">
          <Form
            onSubmit={this.handleSubmit}
            hideRequiredMark
            style={{ marginTop: 8 }}
          >
            <FormItem
              {...formItemLayout}
              label="用户名"
            >
              {getFieldDecorator('title', {
                rules: [{
                  required: true, message: '姓名不能为空',
                }],
              })(
                <Input placeholder="请输入认证姓名" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="会员类型"
            >
              {getFieldDecorator('date', {
                rules: [{
                  required: true, message: '身份证号不能为空',
                }],
              })(
                <Input placeholder="请输入身份证号" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="注册时间"
            >
              {getFieldDecorator('goal', {
                rules: [{
                  required: true, message: '身份证不能为空',
                }],
              })(
                <TextArea style={{ minHeight: 32 }} placeholder="请输入你的阶段性工作目标" rows={4} />
              )}
            </FormItem>
          </Form>
        </Card>
        <Card title="实名认证" >
          <Form
            onSubmit={this.handleSubmit}
            hideRequiredMark
            style={{ marginTop: 8 }}
          >
            <FormItem
              {...formItemLayout}
              label="认证姓名"
            >
              {getFieldDecorator('title', {
                rules: [{
                  required: true, message: '姓名不能为空',
                }],
              })(
                <Input placeholder="请输入认证姓名" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="身份证号"
            >
              {getFieldDecorator('date', {
                rules: [{
                  required: true, message: '身份证号不能为空',
                }],
              })(
                <Input placeholder="请输入身份证号" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="身份证"
            >
              {getFieldDecorator('goal', {
                rules: [{
                  required: true, message: '身份证不能为空',
                }],
              })(
                <TextArea style={{ minHeight: 32 }} placeholder="请输入你的阶段性工作目标" rows={4} />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="手机号码"
            >
              {getFieldDecorator('standard', {
                rules: [{
                  required: true, message: '手机号码不能为空',
                }],
              })(
                <Input placeholder="请输入手机号码" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="备注"
            >
              {getFieldDecorator('invites')(
                <TextArea style={{ minHeight: 32 }} placeholder="请输入备注" rows={4} />
              )}
            </FormItem>
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                提交
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
