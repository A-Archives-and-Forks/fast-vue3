// 内容管理种子数据（复制自 apps/web-antd/src/mock/content.ts，独立包不可跨包引用）。

export interface CategoryRecord {
  id: number;
  name: string;
  slug: string;
  description: string;
  status: 'active' | 'inactive';
}

export const categories: CategoryRecord[] = [
  {
    id: 1,
    name: '产品动态',
    slug: 'product',
    description: '新功能发布、版本迭代与产品演进方向。',
    status: 'active',
  },
  {
    id: 2,
    name: '技术博客',
    slug: 'tech',
    description: '架构实践、源码解析与一线工程经验总结。',
    status: 'active',
  },
  {
    id: 3,
    name: '团队生活',
    slug: 'team',
    description: '团队活动、成长故事与工程师文化建设。',
    status: 'active',
  },
  {
    id: 4,
    name: '公告',
    slug: 'announcement',
    description: '官方公告、系统维护通知与重要提醒。',
    status: 'active',
  },
];

export interface ArticleRecord {
  id: number;
  title: string;
  author: string;
  category: string;
  categoryId: number;
  tags: string[];
  cover: string;
  summary: string;
  content: string[];
  status: 'draft' | 'published';
  date: string;
}

const categoryIdMap: Record<string, number> = {
  产品动态: 1,
  技术博客: 2,
  团队生活: 3,
  公告: 4,
};

const rawArticles: Omit<ArticleRecord, 'categoryId'>[] = [
  {
    id: 1,
    title: 'Fast Vue3 v3.2 发布：引入 Polyrepo 独立工程模板',
    author: '张明',
    category: '产品动态',
    tags: ['发布', 'Polyrepo', 'CLI'],
    cover: '',
    summary:
      'v3.2 正式支持将 Monorepo 应用拆分为独立仓库，同时保持一致的工程能力与 Design System。',
    content: [
      '经过三个月的打磨，Fast Vue3 v3.2 正式发布。本次版本最大的变化是引入了对 Polyrepo 独立工程模板的支持，你可以在生成项目时选择 Monorepo 或 Polyrepo 两种组织方式，二者在功能能力与信息架构上完全对齐。',
      '对于已经使用 Monorepo 的团队，升级过程平滑：脚手架会自动识别现有的共享包结构，并将应用重新映射为可独立部署的工程。共享包（stores、preferences、request）依旧以工作区依赖的形式被引用，无需改动业务代码。',
      '我们建议在团队规模扩大、需要独立发版节奏时再考虑拆分 Polyrepo；中小团队继续使用 Monorepo 能获得更低的协作成本与更快的增量构建体验。',
    ],
    status: 'published',
    date: '2026-08-12 10:24:00',
  },
  {
    id: 2,
    title: '组件市场上线：一键安装业务区块',
    author: '李雪',
    category: '产品动态',
    tags: ['组件市场', '效率'],
    cover: '',
    summary:
      '官方组件市场首批上线 30+ 业务区块，覆盖表单、看板与权限配置等高频场景。',
    content: [
      '组件市场首批上线了 30 多个经过生产验证的业务区块，涵盖高级搜索表单、可拖拽看板、角色权限矩阵等高频场景。你只需一行命令即可将区块安装到当前项目，并自动适配所选 UI 框架的设计语言。',
      '每个区块都附带真实中文示例数据，安装后可直接运行查看效果，再替换为你自己的业务字段。我们也会持续根据社区反馈扩充区块范围。',
    ],
    status: 'published',
    date: '2026-08-05 14:10:00',
  },
  {
    id: 3,
    title: '从零理解 unplugin-vue-router 的文件路由',
    author: '王浩',
    category: '技术博客',
    tags: ['Vue', '路由', '工程化'],
    cover: '',
    summary:
      '用文件目录结构替代手写路由表，[id].vue 与嵌套子菜单如何映射为动态路由。',
    content: [
      '文件路由的核心思想是：把页面的物理目录当作路由配置的声明。views 下的每一个 .vue 文件都会自动生成对应的路由记录，目录层级天然对应路由层级，无需再维护一份冗长的路由表。',
      '动态参数通过方括号文件名表达，例如 content/article/[id].vue 会注册为 /content/article/:id。后台的权限、分类等页面正是利用这一机制，让新增页面只需新建文件即可生效。',
      '配合子菜单时，约定以目录作为分组（如 content 目录下的 article 与 category），在侧边栏中对应一个 a-sub-menu，这样路由与导航始终保持一致。',
    ],
    status: 'published',
    date: '2026-07-28 09:36:00',
  },
  {
    id: 4,
    title: 'Vue 3.5 响应式系统深度解析',
    author: '陈思',
    category: '技术博客',
    tags: ['Vue', '响应式', '源码'],
    cover: '',
    summary:
      'ref、reactive 与 effect 的底层追踪链路，以及 3.5 在内存与性能上的改进。',
    content: [
      'Vue 的响应式建立在依赖收集与派发更新两个环节上。组件渲染时会触发 getter，把当前 effect 收集进依赖集合；当 setter 被调用，相关 effect 被重新执行，完成视图更新。',
      'Vue 3.5 对响应式调度做了进一步优化，引入了更精确的内存回收策略，长列表场景下内存占用明显下降。对于后台动辄上千行的表格，这一改进能带来可观的体验提升。',
      '理解这些底层机制，有助于你在编写复杂表单与联动逻辑时，预判更新范围、避免不必要的重渲染。',
    ],
    status: 'published',
    date: '2026-07-20 16:42:00',
  },
  {
    id: 5,
    title: '用 Turborepo 优化 Monorepo 构建缓存',
    author: '刘洋',
    category: '技术博客',
    tags: ['Turborepo', '构建', 'Monorepo'],
    cover: '',
    summary:
      '任务编排、远程缓存与 affected 检测，让 7 套框架变体的构建不再重复。',
    content: [
      '在拥有 7 套 UI 框架变体的 Monorepo 中，全量构建的代价很高。Turborepo 通过任务依赖图谱，只重建受变更影响的包，其余直接命中本地缓存。',
      '配合远程缓存，团队内任何人构建过的结果都能被复用，CI 上的平均构建时间从分钟级降到秒级。我们建议把所有可并行的任务（类型检查、测试、打包）都纳入 turbo 编排。',
    ],
    status: 'draft',
    date: '2026-07-15 11:08:00',
  },
  {
    id: 6,
    title: 'TypeScript 严格模式下的类型安全实践',
    author: '赵敏',
    category: '技术博客',
    tags: ['TypeScript', '类型安全'],
    cover: '',
    summary:
      'noUncheckedIndexedAccess 下数组下标访问的防御式写法与服务端数据建模。',
    content: [
      '开启 strict 与 noUncheckedIndexedAccess 后，数组下标访问会得到 T | undefined，逼迫你正视「越界」这一真实存在的风险。对此我们统一采用 ! 断言或 ?? 兜底。',
      '与服务端交互时，建议为返回结构建立明确的接口类型，并在请求层用泛型约束解析结果，避免把 any 泄漏到业务组件里。',
      '类型不是负担，而是文档。清晰的类型让协作成员无需阅读实现即可理解数据结构。',
    ],
    status: 'published',
    date: '2026-07-09 13:55:00',
  },
  {
    id: 7,
    title: '我们在深圳举办了首届开发者开放日',
    author: '周凯',
    category: '团队生活',
    tags: ['活动', '社区'],
    cover: '',
    summary: '120 位开发者齐聚深圳，围绕工程效率与开源协作展开了全天交流。',
    content: [
      '首届开发者开放日在深圳湾科技生态园举行，吸引了 120 位来自不同公司的前端工程师参与。我们准备了四场主题分享，覆盖工程体系、组件设计与团队协作。',
      '下午的工作坊最受欢迎：参与者分组使用 Fast Vue3 从零搭建一个后台，并现场体验文件路由与暗色主题。很多朋友反馈「第一次觉得脚手架是真的能用」。',
      '后续我们会把开放日做成季度活动，并在更多城市落地。',
    ],
    status: 'published',
    date: '2026-06-30 18:20:00',
  },
  {
    id: 8,
    title: '远程协作一年，我们沉淀的 5 条经验',
    author: '孙琳',
    category: '团队生活',
    tags: ['远程', '协作'],
    cover: '',
    summary: '异步沟通、文档优先与信任机制，让分布式团队保持高效。',
    content: [
      '远程协作最大的挑战不是工具，而是节奏。我们坚持「文档优先」：任何决策先写下来，再开会讨论，避免会议淹没信息。',
      '其次是信任机制。我们用公开的任务看板替代 micromanagement，每个人对自己的交付负责，管理者只关注阻塞点。',
      '最后是边界感。明确的工作时间与「免打扰时段」，让团队既能深度投入，也有充分的休息。',
    ],
    status: 'published',
    date: '2026-06-22 15:30:00',
  },
  {
    id: 9,
    title: '实习生成长记：从 PR 到独立负责模块',
    author: '张明',
    category: '团队生活',
    tags: ['成长', '招聘'],
    cover: '',
    summary: '一位实习生的三个月，从修复文案错别字到独立交付内容管理模块。',
    content: [
      '小宇刚来时提交了一个修复文案错别字的 PR，我们从这里开始，引导他阅读路由与布局代码。第二周他接手了一个列表筛选的小需求。',
      '到第三个月，他已经能独立交付「分类管理」模块，包括表格、弹窗与删除确认。变化的不是天赋，而是持续的小步反馈与可信任的脚手架。',
    ],
    status: 'draft',
    date: '2026-06-18 10:05:00',
  },
  {
    id: 10,
    title: '关于 10 月系统维护升级的通知',
    author: '李雪',
    category: '公告',
    tags: ['维护', '通知'],
    cover: '',
    summary:
      '为提升稳定性，平台将于 10 月 12 日 02:00-04:00 进行升级，期间服务短暂不可用。',
    content: [
      '为进一步提升系统稳定性与访问速度，平台计划于 2026 年 10 月 12 日 02:00 至 04:00 进行数据库与网关升级，期间管理后台与门户站点将短暂不可用。',
      '请提前安排相关运营操作。升级完成后无需手动操作，登录状态与数据均不受影响。给您带来不便，敬请谅解。',
    ],
    status: 'published',
    date: '2026-06-10 09:00:00',
  },
  {
    id: 11,
    title: '开源协议变更说明与 FAQ',
    author: '王浩',
    category: '公告',
    tags: ['开源', '协议'],
    cover: '',
    summary:
      '核心包由 MIT 调整为 Apache-2.0，使用方式与商业友好度不变，澄清常见疑问。',
    content: [
      '自 v3.0 起，Fast Vue3 的核心共享包协议由 MIT 调整为 Apache-2.0。这一调整不会增加你的使用负担，反而提供了更明确的专利授权与商业使用保障。',
      '我们整理了常见问题：个人与商业项目均可免费使用；修改后的源码无需公开；仅涉及专利条款的细化。如需更详细的法务解读，请参阅官方文档。',
    ],
    status: 'published',
    date: '2026-05-30 14:48:00',
  },
  {
    id: 12,
    title: '暗色模式的设计 Token 落地方案',
    author: '陈思',
    category: '技术博客',
    tags: ['主题', 'CSS', 'Design Token'],
    cover: '',
    summary:
      '用 CSS Variables 表达品牌色与语义色，组件级暗色如何在不改业务代码下切换。',
    content: [
      '暗色模式的关键，是把所有颜色抽象为设计 Token：品牌色、背景色、文本色、边框色等，统一映射到 CSS Variables。组件只消费 Token，不直接写死十六进制值。',
      '切换主题时，只需在根节点切换 data-theme 属性，所有组件随之响应。这套机制让我们在不改动任何业务页面的情况下，为 7 套 UI 框架统一接入暗色能力。',
      '我们还支持「跟随系统」：监听 prefers-color-scheme，让界面随操作系统自动切换，体验更自然。',
    ],
    status: 'published',
    date: '2026-05-22 11:36:00',
  },
];

export const articles: ArticleRecord[] = rawArticles.map((a) => ({
  ...a,
  categoryId: categoryIdMap[a.category] ?? 0,
}));
