import React from 'react';
import { Router, Switch } from 'dva/router';
import { LocaleProvider, Spin } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import dynamic from 'dva/dynamic';
// Min 2018-01-08
// import { getRouterData } from './common/router';
import { getRouterData } from './common/bec_router';
import Authorized from './utils/Authorized';
import styles from './index.less';

const { AuthorizedRoute } = Authorized;
dynamic.setDefaultLoadingComponent(() => {
  return <Spin size="large" className={styles.globalSpin} />;
});

function RouterConfig({ history, app }) {
  const routerData = getRouterData(app);

  // Min 2018-01-08
  // const UserLayout = routerData['/user'].component;
  // const BasicLayout = routerData['/'].component;
  const UserLayout = routerData['/account'].component;
  const BecLayout = routerData['/'].component;

  return (
    <LocaleProvider locale={zhCN}>
      <Router history={history}>
        <Switch>
          <AuthorizedRoute
            // Min 2018-01-08
            // path="/user"
            path="/account"
            render={props => <UserLayout {...props} />}
            authority="guest"
            redirectPath="/"
          />
          <AuthorizedRoute
            path="/"
            // Min 2018-01-08
            // render={props => <BasicLayout {...props} />}
            // authority={['admin', 'user']}
            // redirectPath="/user/login"
            render={props => <BecLayout {...props} />}
            authority={['admin', 'account']}
            redirectPath="/account/login"
          />
        </Switch>
      </Router>
    </LocaleProvider>
  );
}

export default RouterConfig;
