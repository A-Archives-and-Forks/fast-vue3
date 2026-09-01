<script setup lang="ts">
import { reactive, ref } from 'vue';

const form = reactive({ name: '', email: '', message: '' });
const sent = ref(false);

function handleSubmit() {
  if (!form.name || !form.email || !form.message) return;
  sent.value = true;
}
</script>

<template>
  <div class="contact-page">
    <div class="page-header">
      <h1>联系我们</h1>
      <p>有任何问题或建议？欢迎随时联系我们</p>
    </div>
    <div class="content-row">
      <div class="info-side">
        <div class="info-item">
          <span class="info-icon">&#128231;</span>
          <div>
            <h3>邮箱</h3>
            <p>contact@fast-vue3.com</p>
          </div>
        </div>
        <div class="info-item">
          <span class="info-icon">&#128187;</span>
          <div>
            <h3>GitHub</h3>
            <p>github.com/fast-vue3</p>
          </div>
        </div>
        <div class="info-item">
          <span class="info-icon">&#128172;</span>
          <div>
            <h3>社区</h3>
            <p>加入 Discord 交流群</p>
          </div>
        </div>
      </div>
      <div class="form-side">
        <div v-if="sent" class="success-msg">
          <span>&#10003;</span>
          <h2>发送成功</h2>
          <p>感谢您的留言，我们会尽快回复！</p>
        </div>
        <form v-else @submit.prevent="handleSubmit">
          <div class="field">
            <label>姓名</label
            ><input v-model="form.name" placeholder="您的姓名" />
          </div>
          <div class="field">
            <label>邮箱</label
            ><input
              v-model="form.email"
              type="email"
              placeholder="your@email.com"
            />
          </div>
          <div class="field">
            <label>留言</label
            ><textarea
              v-model="form.message"
              rows="5"
              placeholder="请输入您的留言…"
            ></textarea>
          </div>
          <button type="submit" class="btn-submit">发送留言</button>
        </form>
      </div>
    </div>
    <div class="bottom-nav">
      <RouterLink to="/blog">&#8592; 博客动态</RouterLink>
      <RouterLink to="/">返回首页</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.contact-page {
  max-width: 960px;
  padding: 80px 20px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 48px;
  text-align: center;
}

.page-header h1 {
  margin: 0 0 16px;
  font-size: 2.5rem;
  color: #111827;
}

.page-header p {
  margin: 0;
  font-size: 1.1rem;
  color: #6b7280;
}

.content-row {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 48px;
  margin-bottom: 48px;
}

.info-item {
  display: flex;
  gap: 16px;
  margin-bottom: 28px;
}

.info-icon {
  font-size: 1.5rem;
}

.info-item h3 {
  margin: 0 0 4px;
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
}

.info-item p {
  margin: 0;
  font-size: 0.9rem;
  color: #6b7280;
}

.field {
  margin-bottom: 20px;
}

.field label {
  display: block;
  margin-bottom: 6px;
  font-size: 0.85rem;
  font-weight: 500;
  color: #374151;
}

.field input,
.field textarea {
  box-sizing: border-box;
  width: 100%;
  padding: 10px 12px;
  font-family: inherit;
  font-size: 0.9rem;
  resize: vertical;
  outline: none;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  transition: border-color 0.2s;
}

.field input:focus,
.field textarea:focus {
  border-color: #1677ff;
  box-shadow: 0 0 0 3px rgb(22 119 255 / 10%);
}

.btn-submit {
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  background: #1677ff;
  border: none;
  border-radius: 8px;
  transition: background 0.2s;
}

.btn-submit:hover {
  background: #4096ff;
}

.success-msg {
  padding: 48px 0;
  text-align: center;
}

.success-msg span {
  font-size: 3rem;
  color: #52c41a;
}

.success-msg h2 {
  margin: 16px 0 8px;
  color: #111827;
}

.success-msg p {
  color: #6b7280;
}

.bottom-nav {
  display: flex;
  justify-content: space-between;
}

.bottom-nav a {
  font-weight: 500;
  color: #1677ff;
  text-decoration: none;
}

.bottom-nav a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .content-row {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}
</style>
