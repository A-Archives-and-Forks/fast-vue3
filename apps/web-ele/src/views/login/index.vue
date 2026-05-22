<template>
  <div class="flex-center wh-full flex-col gap-6 bg-gray-50">
    <div class="text-2xl font-bold text-gray-800">Fast Vue3 · Element Plus</div>
    <el-card class="w-96 shadow-md">
      <el-form
        ref="formRef"
        :model="formState"
        :rules="rules"
        label-width="80px"
        @keyup.enter="onSubmit"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="formState.username" placeholder="admin" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="formState.password"
            type="password"
            show-password
            placeholder="123456"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loading" class="w-full" @click="onSubmit">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { ElMessage, type FormInstance, type FormRules } from 'element-plus';
  import { useUserStore } from '@fast-vue3/stores';
  import { userApi } from '@/api/user';

  const router = useRouter();
  const userStore = useUserStore();
  const formRef = ref<FormInstance>();
  const loading = ref(false);

  const formState = reactive({ username: 'admin', password: '123456' });

  const rules: FormRules = {
    username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  };

  async function onSubmit() {
    await formRef.value?.validate();
    loading.value = true;
    try {
      const res = await userApi.login(formState);
      userStore.setToken(res.token);
      const profile = await userApi.getProfile();
      userStore.setUserInfo(profile);
      ElMessage.success('登录成功');
      await router.push('/');
    } catch {
      ElMessage.error('用户名或密码错误');
    } finally {
      loading.value = false;
    }
  }
</script>
