<script setup lang="ts">
const plans = [
  {
    name: '开源版',
    price: '免费',
    unit: '',
    desc: '面向个人与开源项目，完整的脚手架能力。',
    features: [
      '7 大 UI 框架模板',
      'Monorepo 工程结构',
      '后台 + 门户双模式',
      'CLI 快速创建',
      '社区支持',
    ],
    cta: '立即使用',
    highlight: false,
  },
  {
    name: 'Pro 版',
    price: '¥199',
    unit: '/ 项目',
    desc: '面向团队，提供更多企业级模板与组件。',
    features: [
      '包含开源版全部能力',
      'Polyrepo 独立工程模板',
      '权限 / 内容管理模块',
      '暗色模式与主题定制',
      '邮件 + 文档支持',
    ],
    cta: '升级 Pro',
    highlight: true,
  },
  {
    name: '企业版',
    price: '定制',
    unit: '',
    desc: '面向企业，提供私有部署与专属服务。',
    features: [
      '包含 Pro 版全部能力',
      '私有化部署方案',
      '专属架构咨询',
      '定制 UI 框架接入',
      'SLA 保障支持',
    ],
    cta: '联系我们',
    highlight: false,
  },
];
</script>

<template>
  <div>
    <section class="site-hero">
      <h1 class="site-hero-title">价格方案</h1>
      <p class="site-hero-desc">选择适合你的方案，从开源起步，随业务平滑升级</p>
    </section>

    <section class="site-section">
      <div class="site-container">
        <div class="site-grid">
          <div
            v-for="(plan, i) in plans"
            :key="plan.name"
            v-reveal="i * 120"
            class="site-card plan-card"
            :class="{ 'plan-card--highlight': plan.highlight }"
          >
            <div v-if="plan.highlight" class="plan-badge">推荐</div>
            <h3 class="plan-name">{{ plan.name }}</h3>
            <div class="plan-price">
              <span class="price-value">{{ plan.price }}</span>
              <span class="price-unit">{{ plan.unit }}</span>
            </div>
            <p class="plan-desc">{{ plan.desc }}</p>
            <t-button
              :theme="plan.highlight ? 'primary' : 'default'"
              size="large"
              block
              class="plan-cta"
            >
              {{ plan.cta }}
            </t-button>
            <ul class="plan-features">
              <li v-for="f in plan.features" :key="f">
                <span class="plan-check">✓</span>{{ f }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.plan-card {
  position: relative;
  height: 100%;
}

.plan-card--highlight {
  border: 2px solid var(--site-brand);
  box-shadow: 0 8px 28px color-mix(in srgb, var(--site-brand) 18%, transparent);
}

.plan-badge {
  position: absolute;
  top: 16px;
  right: 16px;
  padding: 2px 10px;
  font-size: 0.75rem;
  color: #fff;
  background: var(--site-brand);
  border-radius: 999px;
}

.plan-name {
  margin: 0 0 12px;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--site-text-1);
}

.plan-price {
  margin-bottom: 8px;
}

.price-value {
  font-size: 2.4rem;
  font-weight: 800;
  color: var(--site-brand);
}

.price-unit {
  margin-left: 4px;
  font-size: 0.95rem;
  color: var(--site-text-4);
}

.plan-desc {
  min-height: 44px;
  margin: 0 0 20px;
  font-size: 0.92rem;
  color: var(--site-text-3);
}

.plan-cta {
  margin-bottom: 24px;
  border-radius: var(--site-radius-sm);
}

.plan-features {
  padding: 0;
  margin: 0;
  list-style: none;
}

.plan-features li {
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 8px 0;
  font-size: 0.92rem;
  color: var(--site-text-2);
  border-top: 1px solid var(--site-border);
}

.plan-check {
  font-weight: 700;
  color: #52c41a;
}
</style>
