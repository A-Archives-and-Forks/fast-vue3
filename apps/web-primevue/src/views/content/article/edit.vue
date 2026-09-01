<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import Button from 'primevue/button';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import RadioButton from 'primevue/radiobutton';
import Select from 'primevue/select';
import Textarea from 'primevue/textarea';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';

const route = useRoute();
const router = useRouter();
const toast = useToast();

const editId = computed(() => Number(route.query.id) || 0);
const isEdit = computed(() => editId.value > 0);

const submitting = ref(false);

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
const tagOptions = [
  { label: 'Vue', value: 'Vue' },
  { label: 'TypeScript', value: 'TypeScript' },
  { label: 'Vite', value: 'Vite' },
  { label: '架构', value: '架构' },
  { label: '教程', value: '教程' },
  { label: '公告', value: '公告' },
];

function loadForEdit() {
  if (!isEdit.value) return;
  const cats = categoryOptions;
  const authors = ['张三', '李四', '王五'];
  form.title = `${cats[editId.value % cats.length]}示例文章标题 ${String(editId.value).padStart(2, '0')}`;
  form.category = cats[editId.value % cats.length];
  form.author = authors[editId.value % authors.length];
  form.summary = '这是一篇用于演示内容管理模块的示例文章。';
  form.cover = '';
  form.content = '在此撰写文章正文内容……';
  form.status = editId.value % 3 === 0 ? 'draft' : 'published';
  form.tags = ['Vue', '教程'].slice(0, (editId.value % 2) + 1);
}

async function handleSubmit() {
  if (!form.title) {
    toast.add({ severity: 'warn', summary: '提示', detail: '请输入文章标题' });
    return;
  }
  if (!form.category) {
    toast.add({ severity: 'warn', summary: '提示', detail: '请选择分类' });
    return;
  }
  submitting.value = true;
  setTimeout(() => {
    submitting.value = false;
    toast.add({
      severity: 'success',
      summary: '成功',
      detail: isEdit.value ? '文章已更新' : '文章已创建',
    });
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
    <Toast />

    <div
      style="display: flex; gap: 12px; align-items: center; margin-bottom: 16px"
    >
      <Button
        icon="pi pi-arrow-left"
        text
        rounded
        aria-label="返回"
        @click="goBack"
      />
      <h4 style="margin: 0; font-size: 18px; font-weight: 600">
        {{ isEdit ? '编辑文章' : '新建文章' }}
      </h4>
    </div>

    <Card>
      <template #content>
        <div style="display: flex; flex-direction: column; gap: 16px">
          <div>
            <label style="display: block; margin-bottom: 4px; font-weight: 500"
              >标题 <span style="color: #ef4444">*</span></label
            >
            <InputText
              v-model="form.title"
              placeholder="请输入文章标题"
              style="width: 100%"
            />
          </div>
          <div>
            <label style="display: block; margin-bottom: 4px; font-weight: 500"
              >分类 <span style="color: #ef4444">*</span></label
            >
            <Select
              v-model="form.category"
              :options="categoryOptions"
              placeholder="请选择分类"
              style="width: 100%"
            />
          </div>
          <div>
            <label style="display: block; margin-bottom: 4px; font-weight: 500"
              >作者</label
            >
            <InputText
              v-model="form.author"
              placeholder="请输入作者"
              style="width: 100%"
            />
          </div>
          <div>
            <label style="display: block; margin-bottom: 4px; font-weight: 500"
              >标签</label
            >
            <Select
              v-model="form.tags"
              :options="tagOptions"
              option-label="label"
              option-value="value"
              multiple
              placeholder="请选择标签"
              style="width: 100%"
            />
          </div>
          <div>
            <label style="display: block; margin-bottom: 4px; font-weight: 500"
              >封面图</label
            >
            <InputText
              v-model="form.cover"
              placeholder="封面图 URL（选填）"
              style="width: 100%"
            />
          </div>
          <div>
            <label style="display: block; margin-bottom: 4px; font-weight: 500"
              >摘要</label
            >
            <Textarea
              v-model="form.summary"
              :rows="3"
              placeholder="请输入文章摘要"
              style="width: 100%"
              :maxlength="120"
              show-count
            />
          </div>
          <div>
            <label style="display: block; margin-bottom: 4px; font-weight: 500"
              >正文</label
            >
            <Textarea
              v-model="form.content"
              :rows="8"
              placeholder="请输入文章正文"
              style="width: 100%"
            />
          </div>
          <div>
            <label style="display: block; margin-bottom: 4px; font-weight: 500"
              >状态</label
            >
            <div style="display: flex; gap: 16px">
              <div style="display: flex; gap: 4px; align-items: center">
                <RadioButton
                  v-model="form.status"
                  input-id="article-draft"
                  value="draft"
                />
                <label for="article-draft">草稿</label>
              </div>
              <div style="display: flex; gap: 4px; align-items: center">
                <RadioButton
                  v-model="form.status"
                  input-id="article-published"
                  value="published"
                />
                <label for="article-published">发布</label>
              </div>
            </div>
          </div>
          <div style="display: flex; gap: 8px">
            <Button
              label="保存"
              icon="pi pi-check"
              :loading="submitting"
              @click="handleSubmit"
            />
            <Button label="取消" severity="secondary" @click="goBack" />
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>
