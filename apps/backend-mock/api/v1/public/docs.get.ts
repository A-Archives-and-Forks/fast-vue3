import { useResponseSuccess } from '~/utils/response';

const docs = [
  { id: 1, title: '快速开始', description: '从安装脚手架到跑通第一个页面。', items: [{ path: '/docs/guide/install', title: '安装' }, { path: '/docs/guide/quick-start', title: '快速上手' }] },
  { id: 2, title: '核心概念', description: '文件路由、状态管理与请求层。', items: [{ path: '/docs/core/routing', title: '文件路由' }, { path: '/docs/core/request', title: '请求层' }, { path: '/docs/core/store', title: '状态管理' }] },
  { id: 3, title: '设计系统', description: '设计 Token 与暗色模式接入。', items: [{ path: '/docs/design/token', title: '设计 Token' }, { path: '/docs/design/dark', title: '暗色模式' }] },
  { id: 4, title: '部署', description: '构建与托管到生产环境。', items: [{ path: '/docs/deploy/build', title: '构建' }, { path: '/docs/deploy/host', title: '托管' }] },
];

export default defineEventHandler(() => {
  return useResponseSuccess(docs);
});
