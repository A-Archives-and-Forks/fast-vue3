<template>
  <div class="flex-center wh-full flex-col gap-6 bg-gray-50">
    <div class="text-2xl font-bold text-gray-800">Fast Vue3 · Ant Design</div>
    <ACard class="w-96 shadow-md">
      <AForm
        :model="formState"
        name="login"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 18 }"
        @finish="onFinish"
      >
        <AFormItem
          label="用户名"
          name="username"
          :rules="[{ required: true, message: '请输入用户名' }]"
        >
          <AInput v-model:value="formState.username" placeholder="admin" />
        </AFormItem>

        <AFormItem
          label="密码"
          name="password"
          :rules="[{ required: true, message: '请输入密码' }]"
        >
          <AInputPassword v-model:value="formState.password" placeholder="123456" />
        </AFormItem>

        <AFormItem :wrapper-col="{ offset: 6, span: 18 }">
          <AButton type="primary" html-type="submit" :loading="loading" class="w-full">
            登录
          </AButton>
        </AFormItem>
      </AForm>
    </ACard>
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { message } from 'ant-design-vue';
  import { useUserStore } from '@fast-vue3/stores';
  import { userApi } from '@/api/user';

  const router = useRouter();
  const userStore = useUserStore();
  const loading = ref(false);

  const formState = reactive({
    username: 'admin',
    password: '123456',
  });

  async function onFinish(values: typeof formState) {
    loading.value = true;
    try {
      const result = await userApi.login(values);
      userStore.setToken(result.token);
      message.success('登录成功');
      const redirect = (router.currentRoute.value.query.redirect as string) || '/';
      await router.push(redirect);
    } catch (e) {
      message.error('登录失败，请检查用户名或密码');
    } finally {
      loading.value = false;
    }
  }
</script>
