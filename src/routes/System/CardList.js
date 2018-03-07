/* eslint-disable no-undef */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Button, Icon, List } from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import Ellipsis from '../../components/Ellipsis';

import styles from './CardList.less';

@connect(({ brandManage, loading }) => ({
  brandManage,
  loading: loading.models.brandManage,
}))
export default class CardList extends PureComponent {
  state = {
    pagination: {
      pageSize: 6,
      current: 1,
      total: 0,
    },
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'brandManage/fetch',
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      skip: ((pagination.current - 1) * pagination.pageSize) + 1,
      limit: pagination.pageSize,
      count: true,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'brandManage/fetch',
      payload: params,
    });
    this.setState({
      pagination: {
        current: pagination.current,
        pageSize: pagination.pageSize,
      },
    });
  }

  handlePageChange = (page, pagesize) => {
    const { dispatch } = this.props;
    const parsedata = {
      limit: pagesize,
      skip: ((page - 1) * pagesize) + 1,
      count: true,
    };
    dispatch({
      type: 'usermodel/fetch',
      payload: parsedata,
    });
    this.setState({
      pagination: {
        current: page,
        pageSize: pagesize,
      },
    });
  }

  render() {
    const { brandManage: { data }, loading } = this.props;

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSize: this.state.pagination.pageSize,
      total: data.count,
      onChange: this.handlePageChange,
    };

    const content = (
      <div className={styles.pageHeaderContent}>
        <p>
          段落示意：蚂蚁金服务设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，
          提供跨越设计与开发的体验解决方案。
        </p>
        <div className={styles.contentLink}>
          <a>
            <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg" /> 快速开始
          </a>
          <a>
            <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg" /> 产品简介
          </a>
          <a>
            <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg" /> 产品文档
          </a>
        </div>
      </div>
    );

    const extraContent = (
      <div className={styles.extraImg}>
        <img alt="这是一个标题" src="https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png" />
      </div>
    );

    return (
      <PageHeaderLayout
        title="品牌卡片"
        content={content}
        extraContent={extraContent}
      >
        <div className={styles.cardList}>
          <List
            rowKey="objectId"
            loading={loading}
            // pagination={paginationProps}
            grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
            dataSource={data.results}
            renderItem={item => (item ? (
              <List.Item key={item.ObjectId}>
                <Card hoverable className={styles.orderNumber} actions={[<a>编辑</a>, <a>删除</a>]}>
                  <Card.Meta
                    avatar={<img alt="" className={styles.cardAvatar} src="src/static/img/timg.jpeg" />}
                    title={<a href="#">{item.brandName}</a>}
                    description={(
                      <Ellipsis className={styles.item} lines={3}>{item.brandName}</Ellipsis>
                    )}
                  />
                </Card>
              </List.Item>
              ) : (
                <List.Item>
                  <Button type="dashed" className={styles.newButton}>
                    <Icon type="plus" /> 新增产品
                  </Button>
                </List.Item>
              )
            )}
          />
        </div>
      </PageHeaderLayout>
    );
  }
}
