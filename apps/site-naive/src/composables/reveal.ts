import type { Directive } from 'vue';

/**
 * v-reveal：滚动入场动画
 *
 * 用法：
 * - `v-reveal`              默认淡入上移
 * - `v-reveal-left` / `-right` / `-zoom` / `-fade`  变体
 * - `:value` 传入延迟毫秒数，用于网格卡片错峰：`v-reveal="index * 80"`
 *
 * 样式类（.reveal / .is-visible）定义在 @fast-vue3/styles/site。
 */
export const vReveal: Directive<HTMLElement, number | undefined> = {
  mounted(el, binding) {
    const variant = binding.arg ? `reveal-${binding.arg}` : '';
    el.classList.add('reveal', ...(variant ? [variant] : []));

    if (typeof binding.value === 'number' && binding.value > 0) {
      el.style.setProperty('--reveal-delay', `${binding.value}ms`);
    }

    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-visible');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add('is-visible');
            observer.disconnect();
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    );

    observer.observe(el);
  },
};
