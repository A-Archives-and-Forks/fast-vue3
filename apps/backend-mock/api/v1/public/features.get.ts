import { useResponseSuccess } from '~/utils/response';

const features = [
  { id: 1, title: '文件路由', icon: 'RouteOutlined', description: '目录即路由，新增页面只需新建文件，无需维护冗长路由表。' },
  { id: 2, title: '多框架对齐', icon: 'AppstoreOutlined', description: '7 套 UI 框架变体，页面能力与信息架构完全一致。' },
  { id: 3, title: '暗色模式', icon: 'BgColorsOutlined', description: '基于设计 Token 的明暗主题，组件无需改动业务代码即可切换。' },
  { id: 4, title: '组件市场', icon: 'AppstoreAddOutlined', description: '30+ 生产验证的业务区块，一行命令安装并适配框架。' },
  { id: 5, title: '类型安全', icon: 'SafetyOutlined', description: '前后端共享接口契约，请求层泛型约束，杜绝 any 泄漏。' },
  { id: 6, title: '极速构建', icon: 'ThunderboltOutlined', description: 'Turborepo 任务编排与远程缓存，CI 构建从分钟级降到秒级。' },
];

export default defineEventHandler(() => {
  return useResponseSuccess(features);
});
