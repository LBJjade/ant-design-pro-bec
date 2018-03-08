import { isUrl } from '../utils/utils';

const menuData = [{
  name: '控制台',
  icon: 'dashboard',
  path: 'dashboard',
  children: [{
    name: '工作台',
    path: 'workspace',
  }, {
    name: '分析页',
    path: 'analysis',
  }, {
    name: '监控页',
    path: 'monitor',
  }, {
    name: '工作台',
    path: 'workplace',
    // hideInMenu: true,
  }],
}, {
  name: '表单页',
  icon: 'form',
  path: 'form',
  children: [{
    name: '基础表单',
    path: 'basic-form',
  }, {
    name: '分步表单',
    path: 'step-form',
  }, {
    name: '高级表单',
    authority: 'admin',
    path: 'advanced-form',
  }],
}, {
  name: '列表页',
  icon: 'table',
  path: 'list',
  children: [{
    name: '查询表格',
    path: 'table-list',
  }, {
    name: '标准列表',
    path: 'basic-list',
  }, {
    name: '卡片列表',
    path: 'card-list',
  }, {
    name: '搜索列表',
    path: 'search',
    children: [{
      name: '搜索列表（文章）',
      path: 'articles',
    }, {
      name: '搜索列表（项目）',
      path: 'projects',
    }, {
      name: '搜索列表（应用）',
      path: 'applications',
    }],
  }],
}, {
  name: '详情页',
  icon: 'profile',
  path: 'profile',
  children: [{
    name: '基础详情页',
    path: 'basic',
  }, {
    name: '高级详情页',
    path: 'advanced',
    authority: 'admin',
  }],
}, {
  name: '结果页',
  icon: 'check-circle-o',
  path: 'result',
  children: [{
    name: '成功',
    path: 'success',
  }, {
    name: '失败',
    path: 'fail',
  }],
}, {
  name: '异常页',
  icon: 'warning',
  path: 'exception',
  children: [{
    name: '403',
    path: '403',
  }, {
    name: '404',
    path: '404',
  }, {
    name: '500',
    path: '500',
  }, {
    name: '触发异常',
    path: 'trigger',
    hideInMenu: true,
  }],
}, {
  name: '账户',
  icon: 'user',
  path: 'user',
  authority: 'guest',
  children: [{
    name: '登录',
    path: 'login',
  }, {
    name: '注册',
    path: 'register',
  }, {
    name: '注册结果',
    path: 'register-result',
  }],
}, {
  name: '使用文档',
  icon: 'book',
  path: 'http://pro.ant.design/docs/getting-started',
  target: '_blank',
}, {
  name: '人力资源',
  icon: 'team',
  path: 'humanresources',
  authority: ['admin'],
  children: [{
    name: '人事档案',
    icon: 'user',
    path: 'employee',
  }],
}, {
  name: '系统管理',
  icon: 'setting',
  path: 'system',
  authority: ['admin'],
  children: [{
    name: '菜单管理',
    icon: 'bars',
    path: 'menu',
  }, {
    name: '用户管理',
    icon: 'user',
    path: 'userlist',
    // path: 'usertable',
  }, {
    name: '角色管理',
    icon: 'usergroup-add',
    path: 'role',
  }, {
    name: '角色权限',
    icon: 'team',
    path: 'roleuser',
  }],
}, {
  name: ' 平台设置',
  icon: 'car',
  path: 'set',
  authority: ['admin'],
  children: [{
    name: '品牌管理基础表格',
    icon: 'star',
    path: 'brand',
  }, {
    name: '品牌管理标准表格',
    icon: 'star',
    path: 'table',
  }, {
    name: '品牌管理卡片表格',
    icon: 'star',
    path: 'card',
  }, {
    name: '大区管理标准表格',
    icon: 'layout',
    path: 'bigArea',
  }, {
    name: '小区管理标准表格',
    icon: 'scan',
    path: 'city',
  }, {
    name: '门店管理标准表格',
    icon: 'scan',
    path: 'shop',
  }],
}];

function formatter(data, parentPath = '', parentAuthority) {
  return data.map((item) => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
