import { useResponseSuccess } from '~/utils/response';

const faqs = [
  { id: 1, category: '入门', question: 'Fast Vue3 适合什么规模的团队？', answer: '从个人项目到数十人的中大型团队都适用，脚手架提供一致的工程能力与多套 UI 框架变体。' },
  { id: 2, category: '授权', question: '开源协议是哪一种？商业使用收费吗？', answer: '核心共享包自 v3.0 起采用 Apache-2.0，个人与商业项目均可免费使用。' },
  { id: 3, category: '功能', question: '是否支持暗色模式与文件路由？', answer: '支持。暗色模式通过设计 Token 统一接入，文件路由自动注册页面无需手写路由表。' },
  { id: 4, category: '部署', question: '如何部署到生产环境？', answer: '构建产物为标准静态资源或 Nitro 服务，可直接托管到任意支持 Node 或静态托管的平台。' },
  { id: 5, category: '生态', question: '有组件市场吗？', answer: '有。组件市场已上线 30+ 生产验证的业务区块，一行命令即可安装并适配所选框架。' },
  { id: 6, category: '协作', question: '支持 Monorepo 与 Polyrepo 吗？', answer: '支持。生成项目时可选择 Monorepo 或 Polyrepo，二者功能能力与信息架构完全对齐。' },
];

export default defineEventHandler(() => {
  return useResponseSuccess(faqs);
});
