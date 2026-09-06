import { useResponseSuccess } from '~/utils/response';

export default defineEventHandler(() => {
  return useResponseSuccess({
    name: 'Fast Vue3',
    slogan: '让企业后台的交付成本降到一天以内',
    highlights: [
      { title: '工程化脚手架', description: 'Monorepo / Polyrepo 双形态，统一的状态管理、请求层与偏好设置。' },
      { title: '设计系统', description: '跨 7 套 UI 框架一致的设计 Token 与暗色能力。' },
      { title: '生产验证', description: '组件市场区块与真实中文内容模板，开箱即跑。' },
    ],
  });
});
