<script setup lang="ts">
import type { FormInst } from 'naive-ui';

import { computed, onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import {
  NButton,
  NForm,
  NFormItem,
  NInput,
  NRadio,
  NRadioGroup,
  NSelect,
  useMessage,
} from 'naive-ui';

const route = useRoute();
const router = useRouter();
const message = useMessage();

const editId = computed(() => Number(route.query.id) || 0);
const isEdit = computed(() => editId.value > 0);

const submitting = ref(false);
const formRef = ref<FormInst | null>(null);

interface ArticleForm {
  title: string;
  category: string;
  author: string;
  summary: string;
  cover: string;
  content: string;
  status: string;
  tags: string[];
}

const form = reactive<ArticleForm>({
  title: '',
  category: '',
  author: '',
  summary: '',
  cover: '',
  content: '',
  status: 'draft',
  tags: [],
});

const categoryOptions = ['产品动态', '技术分享', '团队博客', '公告'].map(
  (c) => ({ label: c, value: c }),
);
const tagOptions = ['Vue', 'TypeScript', 'Vite', '架构', '教程', '公告'].map(
  (t) => ({ label: t, value: t }),
);

function loadForEdit() {
  if (!isEdit.value) return;
  const cats = ['产品动态', '技术分享', '团队博客', '公告'];
  form.title = `${cats[editId.value % cats.length]}示例文章标题 ${String(editId.value).padStart(2, '0')}`;
  form.category = cats[editId.value % cats.length];
  form.author = ['张三', '李四', '王五'][editId.value % 3];
  form.summary = '这是一篇用于演示内容管理模块的示例文章。';
  form.cover = '';
  form.content = '在此撰写文章正文内容……';
  form.status = editId.value % 3 === 0 ? 'draft' : 'published';
  form.tags = ['Vue', '教程'].slice(0, (editId.value % 2) + 1);
}

function handleSubmit() {
  if (!formRef.value) return;
  formRef.value.validate((errors) => {
    if (errors) {
      message.warning('请完善必填项');
      return;
    }
    submitting.value = true;
    setTimeout(() => {
      submitting.value = false;
      message.success(isEdit.value ? '文章已更新' : '文章已创建');
      router.push('/content/article');
    }, 600);
  });
}

function goBack() {
  router.push('/content/article');
}

onMounted(loadForEdit);
</script>

<template>
  <div style="max-width: 880px; padding: 24px">
    <!-- Page Header -->
    <div
      style="display: flex; gap: 12px; align-items: center; margin-bottom: 16px"
    >
      <NButton text @click="goBack">← 返回</NButton>
      <h3 style="margin: 0; font-size: 18px; font-weight: 600">
        {{ isEdit ? '编辑文章' : '新建文章' }}
      </h3>
    </div>

    <NCard>
      <NForm
        ref="formRef"
        :model="form"
        label-placement="left"
        :label-width="80"
      >
        <NFormItem
          label="标题"
          path="title"
          :rule="{
            required: true,
            message: '请输入文章标题',
            trigger: ['input', 'blur'],
          }"
        >
          <NInput v-model:value="form.title" placeholder="请输入文章标题" />
        </NFormItem>
        <NFormItem
          label="分类"
          path="category"
          :rule="{
            required: true,
            message: '请选择分类',
            trigger: ['change', 'blur'],
          }"
        >
          <NSelect
            v-model:value="form.category"
            placeholder="请选择分类"
            :options="categoryOptions"
          />
        </NFormItem>
        <NFormItem label="作者" path="author">
          <NInput v-model:value="form.author" placeholder="请输入作者" />
        </NFormItem>
        <NFormItem label="标签" path="tags">
          <NSelect
            v-model:value="form.tags"
            multiple
            placeholder="请选择标签"
            :options="tagOptions"
          />
        </NFormItem>
        <NFormItem label="封面图" path="cover">
          <NInput v-model:value="form.cover" placeholder="封面图 URL（选填）" />
        </NFormItem>
        <NFormItem label="摘要" path="summary">
          <NInput
            v-model:value="form.summary"
            type="textarea"
            :rows="3"
            placeholder="请输入文章摘要"
            show-count
            :maxlength="120"
          />
        </NFormItem>
        <NFormItem label="正文" path="content">
          <NInput
            v-model:value="form.content"
            type="textarea"
            :rows="8"
            placeholder="请输入文章正文"
          />
        </NFormItem>
        <NFormItem label="状态" path="status">
          <NRadioGroup v-model:value="form.status">
            <NRadio value="draft">草稿</NRadio>
            <NRadio value="published">发布</NRadio>
          </NRadioGroup>
        </NFormItem>
        <NFormItem>
          <NButton type="primary" :loading="submitting" @click="handleSubmit">
            保存
          </NButton>
          <NButton style="margin-left: 12px" @click="goBack">取消</NButton>
        </NFormItem>
      </NForm>
    </NCard>
  </div>
</template>
