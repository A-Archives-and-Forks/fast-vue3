import { useResponseSuccess } from '~/utils/response';

const plans = [
  { id: 1, name: '开源版', description: '面向个人与开源项目，完整工程能力免费使用。', price: '免费', period: '永久', highlighted: false, features: ['Monorepo / Polyrepo 脚手架', '7 套 UI 框架变体', '文件路由与暗色模式', '社区支持'] },
  { id: 2, name: '团队版', description: '面向中小团队，提供组件市场与协作能力。', price: '¥199', period: '每人/年', highlighted: true, features: ['包含开源版全部能力', '组件市场全部区块', '角色权限矩阵', '邮件支持'] },
  { id: 3, name: '企业版', description: '面向大型组织，提供私有部署与定制。', price: '定制', period: '联系销售', highlighted: false, features: ['包含团队版全部能力', '私有化部署', '专属设计 Token 定制', '一对一技术顾问'] },
];

export default defineEventHandler(() => {
  return useResponseSuccess(plans);
});
