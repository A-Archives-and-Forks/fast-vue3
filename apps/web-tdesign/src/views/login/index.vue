<template>
  <div class="flex-center wh-full flex-col gap-6 bg-gray-50">
    <div class="text-2xl font-bold text-gray-800">Fast Vue3 · TDesign</div>
    <t-card class="w-96 shadow-md">
      <t-form :data="formState" :rules="rules" @submit="onSubmit">
        <t-form-item label="用户名" name="username">
          <t-input v-model="formState.username" placeholder="admin" />
        </t-form-item>
        <t-form-item label="密码" name="password">
          <t-input
            v-model="formState.password"
            type="password"
            placeholder="123456"
          />
        </t-form-item>
        <t-form-item>
          <t-button type="submit" :loading="loading" theme="primary" block>
            登录
          </t-button>
        </t-form-item>
      </t-form>
    </t-card>
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { MessagePlugin } from 'tdesign-vue-next';
  import { useUserStore } from '@fast-vue3/stores';
  import { userApi } from '@/api/user';

  const router = useRouter();
  const userStore = useUserStore();
  const loading = ref(false);

  const formState = reactive({ username: 'admin', password: '123456' });

  const rules = {
    username: [{ required: true, message: '请输入用户名', type: 'error' }],
    password: [{ required: true, message: '请输入密码', type: 'error' }],
  };

  async function onSubmit({ validateResult }: { validateResult: boolean | object }) {
    if (validateResult !== true) return;
    loading.value = true;
    try {
      const res = await userApi.login(formState);
      userStore.setToken(res.token);
      const profile = await userApi.getProfile();
      userStore.setUserInfo(profile);
      await MessagePlugin.success('登录成功');
      await router.push('/');
    } catch {
      await MessagePlugin.error('用户名或密码错误');
    } finally {
      loading.value = false;
    }
  }
</script>
