import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Avatar } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './Setting.less';

@connect(({ account, loading }) => ({
  account,
  loading: account.loading,
}))
@Form.create()
export default class Setting extends PureComponent {
  state = {};

  render() {
    const { currentUser } = this.props.account;
    const pageHeaderContent = (
      <div className={styles.pageHeaderContent}>
        <div className={styles.avatar}>
          <Avatar size="large" src={currentUser.avatar} />
        </div>
        <div className={styles.content}>
          <div className={styles.contentTitle}>早安，何群民，祝你开心每一天！</div>
          <div>交互专家 | 蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED</div>
        </div>
      </div>
    );

    return (
      <PageHeaderLayout
        content={pageHeaderContent}
      >

      </PageHeaderLayout>
    );
  }
}
