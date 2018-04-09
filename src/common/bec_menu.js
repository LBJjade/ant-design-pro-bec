import { isUrl } from '../utils/utils';

const menuData = [{
  name: '控制台',
  icon: 'dashboard',
  path: 'dashboard',
  authority: ['admin'],
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
  authority: ['admin'],
  children: [{
    name: '基础表单',
    path: 'basic-form',
  }, {
    name: '分步表单',
    path: 'step-form',
  }, {
    name: '高级表单',
    authority: 'guest',
    path: 'advanced-form',
  }],
}, {
  name: '列表页',
  icon: 'table',
  path: 'list',
  authority: ['a'],
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
  authority: ['a'],
  children: [{
    name: '基础详情页',
    path: 'basic',
  }, {
    name: '高级详情页',
    path: 'advanced',
    authority: 'guest',
  }],
}, {
  name: '结果页',
  icon: 'check-circle-o',
  path: 'result',
  authority: ['a'],
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
  authority: ['a'],
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
  authority: ['a'],
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
  authority: ['a'],
  target: '_blank',
}, {
  name: '人力资源',
  icon: 'team',
  path: 'humanresources',
  authority: ['a'],
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
    // name: '菜单管理',
    // icon: 'bars',
    // path: 'menu',
  }, {
    name: '用户管理',
    icon: 'user',
    path: 'userlist',
    // path: 'usertable',
  }, {
    name: '角色管理',
    icon: 'usergroup-add',
    path: 'userCartlist',
  }, {
    name: '角色权限',
    icon: 'team',
    path: 'roleuser',
  }],
}, {
  name: '分类管理',
  icon: 'api',
  path: 'module',
  authority: ['admin'],
  children: [{
    name: '板块管理',
    icon: 'bars',
    path: 'list',
  }, {
    name: '数字资源管理',
    icon: 'folder-open',
    path: 'resource',
  }],
}, {
  name: '评论点赞管理',
  icon: 'api',
  path: 'comment',
  authority: ['admin'],
  children: [{
    name: '评论管理',
    icon: 'folder-open',
    path: 'base',
  }, {
    name: '点赞管理',
    icon: 'folder-open',
    path: 'resource',
  }],
}, {
  name: '板块监控',
  icon: 'dashboard',
  path: 'moduleDashboard',
  authority: ['admin'],
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
