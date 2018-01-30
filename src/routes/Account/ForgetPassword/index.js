import React, { PureComponent } from 'react';
import { Route, Redirect, Switch } from 'dva/router';
import { Steps } from 'antd';
// import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import NotFound from '../../Exception/404';
import { getRoutes } from '../../../utils/utils';
import styles from './index.less';

const { Step } = Steps;

export default class ForgetPassword extends PureComponent {
  getCurrentStep() {
    const { location } = this.props;
    const { pathname } = location;
    const pathList = pathname.split('/');
    switch (pathList[pathList.length - 1]) {
      case 'info': return 0;
      case 'confirm': return 1;
      case 'result': return 2;
      default: return 0;
    }
  }
  render() {
    const { match, routerData } = this.props;
    return (
      <div className={styles.main}>
        <h2>重置密码</h2>
        <div>
          <Steps current={this.getCurrentStep()} className={styles.steps}>
            <Step title="发送验证码" />
            <Step title="重置密码" />
            <Step title="完成" />
          </Steps>
          <Switch>
            {
              getRoutes(match.path, routerData).map(item => (
                <Route
                  key={item.key}
                  path={item.path}
                  component={item.component}
                  exact={item.exact}
                />
              ))
            }
            <Redirect exact from="/account/forgetpassword" to="/account/forgetpassword/info" />
            <Route render={NotFound} />
          </Switch>
        </div>
      </div>
    );
  }
}
