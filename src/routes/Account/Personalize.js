import React, { Component } from 'react';
import { connect } from 'dva';
import { Form } from 'antd';

import styles from './Personalize.less';

@connect(({ account, loading }) => ({
  account,

}))
@Form.create()
export default class Personalize extends Component {
  state = {};

  render() {
    const pageHeaderContent = (
      <div className={styles.pageHeaderContent}>
        <div className={styles.avatar}>
          <Avatar size="large" src="https://gitlab.becheer.com/uploads/system/user/avatar/2/avatar.png" />
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
