<template>
  <div class="flex-center wh-full flex-col gap-6 bg-gray-50">
    <div class="text-2xl font-bold text-gray-800">Fast Vue3 · Naive UI</div>
    <n-card class="w-96 shadow-md">
      <n-form ref="formRef" :model="formState" :rules="rules" label-placement="left" label-width="80">
        <n-form-item label="用户名" path="username">
          <n-input v-model:value="formState.username" placeholder="admin" />
        </n-form-item>
        <n-form-item label="密码" path="password">
          <n-input
            v-model:value="formState.password"
            type="password"
            show-password-on="click"
            placeholder="123456"
          />
        </n-form-item>
        <n-button type="primary" :loading="loading" class="w-full" @click="onSubmit">
          登录
        </n-button>
      </n-form>
    </n-card>
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useMessage, type FormInst, type FormRules } from 'naive-ui';
  import { useUserStore } from '@fast-vue3/stores';
  import { userApi } from '@/api/user';

  const router = useRouter();
  const userStore = useUserStore();
  const message = useMessage();
  const formRef = ref<FormInst>();
  const loading = ref(false);

  const formState = reactive({ username: 'admin', password: '123456' });

  const rules: FormRules = {
    username: { required: true, message: '请输入用户名', trigger: 'blur' },
    password: { required: true, message: '请输入密码', trigger: 'blur' },
  };

  async function onSubmit() {
    await formRef.value?.validate();
    loading.value = true;
    try {
      const res = await userApi.login(formState);
      userStore.setToken(res.token);
      const profile = await userApi.getProfile();
      userStore.setUserInfo(profile);
      message.success('登录成功');
      await router.push('/');
    } catch {
      message.error('用户名或密码错误');
    } finally {
      loading.value = false;
    }
  }
</script>
