import React from 'react';
import { routerRedux, Switch } from 'dva/router';
import { LocaleProvider, Spin } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import dynamic from 'dva/dynamic';
import { getRouterData } from './common/bec_router';
import Authorized from './utils/Authorized';
import styles from './index.less';

const { ConnectedRouter } = routerRedux;
const { AuthorizedRoute } = Authorized;
dynamic.setDefaultLoadingComponent(() => {
  return <Spin size="large" className={styles.globalSpin} />;
});

function RouterConfig({ history, app }) {
  const routerData = getRouterData(app);

  const UserLayout = routerData['/account'].component;
  const BecLayout = routerData['/'].component;

  return (
    <LocaleProvider locale={zhCN}>
      <ConnectedRouter history={history}>
        <Switch>
          <AuthorizedRoute
            path="/account"
            render={props => <UserLayout {...props} />}
            authority="guest"
            redirectPath="/"
          />
          <AuthorizedRoute
            path="/"
            authority={['admin', 'user']}
            render={props => <BecLayout {...props} />}
            redirectPath="/account/login"
          />
        </Switch>
      </ConnectedRouter>
    </LocaleProvider>
  );
}

export default RouterConfig;
