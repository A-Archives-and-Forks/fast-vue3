<template>
  <div class="flex-center wh-full flex-col gap-6 bg-gray-50">
    <div class="text-2xl font-bold text-gray-800">Fast Vue3 · Arco Design</div>
    <a-card class="w-96 shadow-md">
      <a-form :model="formState" layout="horizontal" @submit="onSubmit">
        <a-form-item
          field="username"
          label="用户名"
          :rules="[{ required: true, message: '请输入用户名' }]"
        >
          <a-input v-model="formState.username" placeholder="admin" />
        </a-form-item>
        <a-form-item
          field="password"
          label="密码"
          :rules="[{ required: true, message: '请输入密码' }]"
        >
          <a-input-password v-model="formState.password" placeholder="123456" />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" :loading="loading" html-type="submit" long>
            登录
          </a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script setup lang="ts">
  import { Message } from '@arco-design/web-vue';
  import { useUserStore } from '@fast-vue3/stores';
  import { reactive, ref } from 'vue';
  import { useRouter } from 'vue-router';

  import { userApi } from '@/api/user';

  const router = useRouter();
  const userStore = useUserStore();
  const loading = ref(false);

  const formState = reactive({ username: 'admin', password: '123456' });

  async function onSubmit() {
    loading.value = true;
    try {
      const res = await userApi.login(formState);
      userStore.setToken(res.token);
      const profile = await userApi.getProfile();
      userStore.setUserInfo(profile);
      Message.success('登录成功');
      await router.push('/');
    } catch {
      Message.error('用户名或密码错误');
    } finally {
      loading.value = false;
    }
  }
</script>
