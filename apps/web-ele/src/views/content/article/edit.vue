<script setup lang="ts">
import type { FormInstance } from 'element-plus';

import { computed, onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { ArrowLeft } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';

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
  if (!formRef.value) return;
  try {
    await formRef.value.validate();
  } catch {
    ElMessage.warning('请完善必填项');
    return;
  }
  submitting.value = true;
  setTimeout(() => {
    submitting.value = false;
    ElMessage.success(isEdit.value ? '文章已更新' : '文章已创建');
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
    <div
      style="display: flex; gap: 12px; align-items: center; margin-bottom: 16px"
    >
      <el-button text :icon="ArrowLeft" @click="goBack">返回</el-button>
      <h4 style="margin: 0; font-size: 18px; font-weight: 600">
        {{ isEdit ? '编辑文章' : '新建文章' }}
      </h4>
    </div>

    <el-card shadow="never">
      <el-form ref="formRef" :model="form" label-width="80px">
        <el-form-item
          label="标题"
          prop="title"
          :rules="[{ required: true, message: '请输入文章标题' }]"
        >
          <el-input v-model="form.title" placeholder="请输入文章标题" />
        </el-form-item>
        <el-form-item
          label="分类"
          prop="category"
          :rules="[{ required: true, message: '请选择分类' }]"
        >
          <el-select
            v-model="form.category"
            placeholder="请选择分类"
            style="width: 100%"
          >
            <el-option
              v-for="c in categoryOptions"
              :key="c"
              :label="c"
              :value="c"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="作者" prop="author">
          <el-input v-model="form.author" placeholder="请输入作者" />
        </el-form-item>
        <el-form-item label="标签" prop="tags">
          <el-select
            v-model="form.tags"
            multiple
            placeholder="请选择标签"
            style="width: 100%"
          >
            <el-option v-for="t in tagOptions" :key="t" :label="t" :value="t" />
          </el-select>
        </el-form-item>
        <el-form-item label="封面图" prop="cover">
          <el-input v-model="form.cover" placeholder="封面图 URL（选填）" />
        </el-form-item>
        <el-form-item label="摘要" prop="summary">
          <el-input
            v-model="form.summary"
            type="textarea"
            :rows="3"
            maxlength="120"
            show-word-limit
            placeholder="请输入文章摘要"
          />
        </el-form-item>
        <el-form-item label="正文" prop="content">
          <el-input
            v-model="form.content"
            type="textarea"
            :rows="8"
            placeholder="请输入文章正文"
          />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio value="draft">草稿</el-radio>
            <el-radio value="published">发布</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-space>
            <el-button
              type="primary"
              :loading="submitting"
              @click="handleSubmit"
            >
              保存
            </el-button>
            <el-button @click="goBack">取消</el-button>
          </el-space>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
