<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { useMessage } from '@idux/components/message';

const { success: messageSuccess, warning: messageWarning } = useMessage();

const route = useRoute();
const router = useRouter();

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

function handleSubmit() {
  if (!form.title) {
    messageWarning('请输入文章标题');
    return;
  }
  if (!form.category) {
    messageWarning('请选择分类');
    return;
  }
  submitting.value = true;
  setTimeout(() => {
    submitting.value = false;
    messageSuccess(isEdit.value ? '文章已更新' : '文章已创建');
    router.push('/content/article');
  }, 600);
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
      <IxButton mode="text" @click="goBack">← 返回</IxButton>
      <h4 style="margin: 0; font-size: 18px; font-weight: 600">
        {{ isEdit ? '编辑文章' : '新建文章' }}
      </h4>
    </div>

    <IxCard shadow="never">
      <IxForm :label-col="{ span: 4 }" :control-col="{ span: 18 }">
        <IxFormItem label="标题">
          <IxInput v-model:value="form.title" placeholder="请输入文章标题" />
        </IxFormItem>
        <IxFormItem label="分类">
          <IxSelect
            v-model:value="form.category"
            placeholder="请选择分类"
            style="width: 100%"
          >
            <IxSelectOption
              v-for="c in categoryOptions"
              :key="c"
              :label="c"
              :value="c"
            />
          </IxSelect>
        </IxFormItem>
        <IxFormItem label="作者">
          <IxInput v-model:value="form.author" placeholder="请输入作者" />
        </IxFormItem>
        <IxFormItem label="标签">
          <IxSelect
            v-model:value="form.tags"
            multiple
            placeholder="请选择标签"
            style="width: 100%"
          >
            <IxSelectOption
              v-for="t in tagOptions"
              :key="t"
              :label="t"
              :value="t"
            />
          </IxSelect>
        </IxFormItem>
        <IxFormItem label="封面图">
          <IxInput
            v-model:value="form.cover"
            placeholder="封面图 URL（选填）"
          />
        </IxFormItem>
        <IxFormItem label="摘要">
          <IxTextarea
            v-model:value="form.summary"
            :rows="3"
            placeholder="请输入文章摘要"
            show-count
            :maxlength="120"
          />
        </IxFormItem>
        <IxFormItem label="正文">
          <IxTextarea
            v-model:value="form.content"
            :rows="8"
            placeholder="请输入文章正文"
          />
        </IxFormItem>
        <IxFormItem label="状态">
          <IxRadioGroup v-model:value="form.status">
            <IxRadio value="draft">草稿</IxRadio>
            <IxRadio value="published">发布</IxRadio>
          </IxRadioGroup>
        </IxFormItem>
        <IxFormItem :label-col="{ span: 4 }" :control-col="{ span: 18 }">
          <IxButton mode="primary" :loading="submitting" @click="handleSubmit">
            保存
          </IxButton>
          <IxButton style="margin-left: 8px" @click="goBack">取消</IxButton>
        </IxFormItem>
      </IxForm>
    </IxCard>
  </div>
</template>
