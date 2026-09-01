<script setup lang="ts">
import type { FormInstance } from '@arco-design/web-vue';

import { computed, onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { Message } from '@arco-design/web-vue';
import { IconArrowLeft } from '@arco-design/web-vue/es/icon';

const route = useRoute();
const router = useRouter();

const editId = computed(() => Number(route.query.id) || 0);
const isEdit = computed(() => editId.value > 0);

const submitting = ref(false);
const formRef = ref<FormInstance>();

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

const categoryOptions = ['产品动态', '技术分享', '团队博客', '公告'];
const tagOptions = ['Vue', 'TypeScript', 'Vite', '架构', '教程', '公告'];

function loadForEdit() {
  if (!isEdit.value) return;
  // 演示数据：按 id 还原一条，真实项目应调用接口
  const cats = categoryOptions;
  form.title = `${cats[editId.value % cats.length]}示例文章标题 ${String(editId.value).padStart(2, '0')}`;
  form.category = cats[editId.value % cats.length];
  form.author = ['张三', '李四', '王五'][editId.value % 3];
  form.summary = '这是一篇用于演示内容管理模块的示例文章。';
  form.cover = '';
  form.content = '在此撰写文章正文内容……';
  form.status = editId.value % 3 === 0 ? 'draft' : 'published';
  form.tags = ['Vue', '教程'].slice(0, (editId.value % 2) + 1);
}

async function handleSubmit() {
  try {
    await formRef.value?.validate();
  } catch {
    Message.warning('请完善必填项');
    return;
  }
  submitting.value = true;
  setTimeout(() => {
    submitting.value = false;
    Message.success(isEdit.value ? '文章已更新' : '文章已创建');
    router.push('/content/article');
  }, 600);
}

function goBack() {
  router.push('/content/article');
}

onMounted(loadForEdit);
</script>

<template>
  <div class="p-6" style="max-width: 880px">
    <!-- Page Header -->
    <div class="mb-4 flex items-center gap-3">
      <a-button type="text" class="!p-1" @click="goBack">
        <template #icon><IconArrowLeft /></template>
      </a-button>
      <h4 style="margin: 0; font-size: 18px; font-weight: 600">
        {{ isEdit ? '编辑文章' : '新建文章' }}
      </h4>
    </div>

    <a-card :bordered="false">
      <a-form ref="formRef" :model="form" auto-label-width>
        <a-form-item
          label="标题"
          field="title"
          :rules="[{ required: true, message: '请输入文章标题' }]"
        >
          <a-input v-model="form.title" placeholder="请输入文章标题" />
        </a-form-item>
        <a-form-item
          label="分类"
          field="category"
          :rules="[{ required: true, message: '请选择分类' }]"
        >
          <a-select
            v-model="form.category"
            placeholder="请选择分类"
            style="width: 100%"
          >
            <a-option
              v-for="c in categoryOptions"
              :key="c"
              :value="c"
              :label="c"
            />
          </a-select>
        </a-form-item>
        <a-form-item label="作者" field="author">
          <a-input v-model="form.author" placeholder="请输入作者" />
        </a-form-item>
        <a-form-item label="标签" field="tags">
          <a-select
            v-model="form.tags"
            multiple
            placeholder="请选择标签"
            style="width: 100%"
          >
            <a-option v-for="t in tagOptions" :key="t" :value="t" :label="t" />
          </a-select>
        </a-form-item>
        <a-form-item label="封面图" field="cover">
          <a-input v-model="form.cover" placeholder="封面图 URL（选填）" />
        </a-form-item>
        <a-form-item label="摘要" field="summary">
          <a-textarea
            v-model="form.summary"
            :rows="3"
            placeholder="请输入文章摘要"
            show-word-limit
            :max-length="120"
          />
        </a-form-item>
        <a-form-item label="正文" field="content">
          <a-textarea
            v-model="form.content"
            :rows="8"
            placeholder="请输入文章正文"
          />
        </a-form-item>
        <a-form-item label="状态" field="status">
          <a-radio-group v-model="form.status">
            <a-radio value="draft">草稿</a-radio>
            <a-radio value="published">发布</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item>
          <a-space>
            <a-button
              type="primary"
              :loading="submitting"
              @click="handleSubmit"
            >
              保存
            </a-button>
            <a-button @click="goBack">取消</a-button>
          </a-space>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>
