import React from 'react';
import { Button } from 'antd';
// import { Link } from 'dva/router';
import Result from '../../components/Result';
import styles from './VerifyResult.less';

const actions = (
  <div className={styles.actions}>
    <a href=""><Button size="large" type="primary">返回登录</Button></a>
  </div>
);

export default () => (
  <Result
    className={styles.verifyResult}
    type="success"
    title={
      <div className={styles.title}>
        您的帐户已经激活成功
      </div>
    }
    description=""
    actions={actions}
    style={{ marginTop: 56 }}
  />
);
