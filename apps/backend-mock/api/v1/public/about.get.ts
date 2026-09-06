import { useResponseSuccess } from '~/utils/response';

export default defineEventHandler(() => {
  return useResponseSuccess({
    intro: 'Fast Vue3 是一套面向企业级中后台的 Vue3 工程化脚手架，以「功能对齐、设计统一」为核心约束，帮助团队在最短路径内交付可投产品。',
    stats: [
      { label: 'GitHub Stars', value: '12.8k' },
      { label: '累计下载', value: '320k+' },
      { label: 'UI 框架变体', value: '7' },
      { label: '贡献者', value: '180+' },
    ],
    team: [
      { name: '张明', role: '创始人 / 架构', avatar: '' },
      { name: '李雪', role: '产品负责人', avatar: '' },
      { name: '王浩', role: '核心开发', avatar: '' },
      { name: '陈思', role: '设计系统', avatar: '' },
    ],
    milestones: [
      { date: '2023-09', title: '项目启动', description: '第一版 Monorepo 脚手架内部孵化。' },
      { date: '2024-03', title: 'v2.0 发布', description: '引入文件路由与暗色模式。' },
      { date: '2025-01', title: 'v3.0 发布', description: '协议切换至 Apache-2.0，上线组件市场。' },
      { date: '2026-08', title: 'v3.2 发布', description: '支持 Polyrepo 独立工程模板。' },
    ],
  });
});
