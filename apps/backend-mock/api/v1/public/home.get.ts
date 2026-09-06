import { useResponseSuccess } from '~/utils/response';

export default defineEventHandler(() => {
  return useResponseSuccess({
    stats: [
      { label: 'GitHub Stars', value: '12.8k' },
      { label: '累计下载', value: '320k+' },
      { label: 'UI 框架变体', value: '7' },
      { label: '贡献者', value: '180+' },
    ],
    highlights: [
      { title: '文件路由', description: '目录即路由，新增页面只需新建文件。' },
      { title: '多框架对齐', description: '7 套 UI 框架变体，能力完全一致。' },
      { title: '暗色模式', description: '基于设计 Token 的明暗主题切换。' },
      { title: '极速构建', description: 'Turborepo 远程缓存，构建快到飞起。' },
    ],
    testimonials: [
      { content: '第一次觉得脚手架是真的能用，半天就跑通了后台。', name: '周凯', role: '前端工程师' },
      { content: '文件路由让我们告别了路由表腐化，维护成本明显下降。', name: '王浩', role: '架构师' },
      { content: '设计 Token 让暗色模式接入成本几乎为零。', name: '陈思', role: '设计师' },
    ],
  });
});
