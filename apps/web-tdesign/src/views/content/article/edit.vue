<script setup lang="ts">
import type { FormInstanceFunctions, FormRules } from 'tdesign-vue-next';

import { computed, onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { ChevronLeftIcon } from 'tdesign-icons-vue-next';
import { MessagePlugin } from 'tdesign-vue-next';

const route = useRoute();
const router = useRouter();

const editId = computed(() => Number(route.query.id) || 0);
const isEdit = computed(() => editId.value > 0);

const submitting = ref(false);
const formRef = ref<FormInstanceFunctions>();

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

const rules: FormRules = {
  title: [{ required: true, message: '请输入文章标题', type: 'error' }],
  category: [{ required: true, message: '请选择分类', type: 'error' }],
};

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
  const result = await formRef.value?.validate();
  if (result !== true) {
    MessagePlugin.warning('请完善必填项');
    return;
  }
  submitting.value = true;
  setTimeout(() => {
    submitting.value = false;
    MessagePlugin.success(isEdit.value ? '文章已更新' : '文章已创建');
    router.push('/content/article');
  }, 600);
}

function goBack() {
  router.push('/content/article');
}

onMounted(loadForEdit);
</script>

<template>
  <div style="max-width: 880px">
    <!-- Page Header -->
    <div
      style="display: flex; gap: 12px; align-items: center; margin-bottom: 16px"
    >
      <t-button theme="default" variant="text" shape="square" @click="goBack">
        <ChevronLeftIcon />
      </t-button>
      <h4 style="margin: 0; font-size: 18px; font-weight: 600">
        {{ isEdit ? '编辑文章' : '新建文章' }}
      </h4>
    </div>

    <t-card :bordered="false">
      <t-form ref="formRef" :data="form" :rules="rules" label-width="80px">
        <t-form-item label="标题" name="title">
          <t-input v-model="form.title" placeholder="请输入文章标题" />
        </t-form-item>
        <t-form-item label="分类" name="category">
          <t-select
            v-model="form.category"
            placeholder="请选择分类"
            style="width: 100%"
          >
            <t-option
              v-for="c in categoryOptions"
              :key="c"
              :label="c"
              :value="c"
            />
          </t-select>
        </t-form-item>
        <t-form-item label="作者" name="author">
          <t-input v-model="form.author" placeholder="请输入作者" />
        </t-form-item>
        <t-form-item label="标签" name="tags">
          <t-select
            v-model="form.tags"
            multiple
            placeholder="请选择标签"
            style="width: 100%"
          >
            <t-option v-for="t in tagOptions" :key="t" :label="t" :value="t" />
          </t-select>
        </t-form-item>
        <t-form-item label="封面图" name="cover">
          <t-input v-model="form.cover" placeholder="封面图 URL（选填）" />
        </t-form-item>
        <t-form-item label="摘要" name="summary">
          <t-textarea
            v-model="form.summary"
            :rows="3"
            placeholder="请输入文章摘要"
            :maxlength="120"
            :show-limit="true"
          />
        </t-form-item>
        <t-form-item label="正文" name="content">
          <t-textarea
            v-model="form.content"
            :rows="8"
            placeholder="请输入文章正文"
          />
        </t-form-item>
        <t-form-item label="状态" name="status">
          <t-radio-group v-model="form.status">
            <t-radio value="draft">草稿</t-radio>
            <t-radio value="published">发布</t-radio>
          </t-radio-group>
        </t-form-item>
        <t-form-item>
          <t-space>
            <t-button
              theme="primary"
              :loading="submitting"
              @click="handleSubmit"
            >
              保存
            </t-button>
            <t-button theme="default" @click="goBack">取消</t-button>
          </t-space>
        </t-form-item>
      </t-form>
    </t-card>
  </div>
</template>
