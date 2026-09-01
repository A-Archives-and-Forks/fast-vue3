<script setup lang="ts">
import type { Category } from '@/mock/content';
import type { FormInstance } from 'ant-design-vue';

import { onMounted, reactive, ref } from 'vue';

import { articles, categories } from '@/mock/content';
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';

const loading = ref(false);
const keyword = ref('');

const list = ref<Category[]>([]);

function refresh() {
  loading.value = true;
  setTimeout(() => {
    list.value = categories
      .filter((c) => !keyword.value || c.name.includes(keyword.value))
      .map((c) => ({ ...c }));
    loading.value = false;
  }, 200);
}

function articleCount(name: string): number {
  return articles.filter((a) => a.category === name).length;
}

const columns = [
  { title: '名称', dataIndex: 'name', width: 160 },
  { title: 'Slug', dataIndex: 'slug', width: 160 },
  { title: '描述', dataIndex: 'description' },
  { title: '文章数', key: 'count', width: 100 },
  { title: '状态', dataIndex: 'status', width: 100 },
  { title: '操作', key: 'action', width: 160, fixed: 'right' as const },
];

const modalVisible = ref(false);
const modalTitle = ref('新增分类');
const editingId = ref<null | number>(null);
const formRef = ref<FormInstance>();

const form = reactive({
  name: '',
  slug: '',
  description: '',
  status: 'active' as 'active' | 'inactive',
});

function openCreate() {
  editingId.value = null;
  modalTitle.value = '新增分类';
  form.name = '';
  form.slug = '';
  form.description = '';
  form.status = 'active';
  modalVisible.value = true;
}

function openEdit(record: Category) {
  editingId.value = record.id;
  modalTitle.value = '编辑分类';
  form.name = record.name;
  form.slug = record.slug;
  form.description = record.description;
  form.status = record.status;
  modalVisible.value = true;
}

async function handleModalOk() {
  try {
    await formRef.value?.validate();
  } catch {
    message.warning('请完善必填项');
    return;
  }
  if (editingId.value) {
    const target = categories.find((c) => c.id === editingId.value);
    if (target) {
      target.name = form.name;
      target.slug = form.slug;
      target.description = form.description;
      target.status = form.status;
    }
    message.success('分类已更新');
  } else {
    categories.push({
      id: Math.max(0, ...categories.map((c) => c.id)) + 1,
      name: form.name,
      slug: form.slug || form.name.toLowerCase(),
      description: form.description,
      status: form.status,
    });
    message.success('分类已新增');
  }
  modalVisible.value = false;
  refresh();
}

function handleDelete(record: Category) {
  const idx = categories.findIndex((c) => c.id === record.id);
  if (idx !== -1) categories.splice(idx, 1);
  message.success('分类已删除');
  refresh();
}

const statusColorMap: Record<string, string> = {
  active: 'green',
  inactive: 'default',
};

onMounted(refresh);
</script>

<template>
  <div class="p-6">
    <ATypographyTitle :level="4" style="margin: 0 0 16px">
      分类管理
    </ATypographyTitle>

    <!-- Search -->
    <ACard :bordered="false" class="mb-4 shadow-sm">
      <ARow :gutter="16" align="middle">
        <ACol :span="8">
          <AInput
            v-model:value="keyword"
            placeholder="按名称搜索"
            allow-clear
            @press-enter="refresh"
          />
        </ACol>
        <ACol :span="4">
          <ASpace>
            <AButton type="primary" @click="refresh">搜索</AButton>
          </ASpace>
        </ACol>
        <ACol :span="12" style="text-align: right">
          <AButton type="primary" @click="openCreate">
            <PlusOutlined />新增分类
          </AButton>
        </ACol>
      </ARow>
    </ACard>

    <!-- Table -->
    <ACard :bordered="false" class="shadow-sm">
      <ASpin :spinning="loading">
        <ATable
          :data-source="list"
          :columns="columns"
          :pagination="{ pageSize: 10, showTotal: (t: number) => `共 ${t} 条` }"
          size="middle"
          row-key="id"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'count'">
              {{ articleCount((record as Category).name) }}
            </template>
            <template v-if="column.dataIndex === 'status'">
              <ATag :color="statusColorMap[(record as Category).status]">
                {{ (record as Category).status === 'active' ? '启用' : '停用' }}
              </ATag>
            </template>
            <template v-if="column.key === 'action'">
              <AButton
                type="link"
                size="small"
                @click="openEdit(record as Category)"
              >
                <EditOutlined />编辑
              </AButton>
              <APopconfirm
                title="确定删除该分类？"
                @confirm="handleDelete(record as Category)"
              >
                <AButton type="link" size="small" danger>
                  <DeleteOutlined />删除
                </AButton>
              </APopconfirm>
            </template>
          </template>
        </ATable>
      </ASpin>
    </ACard>

    <!-- Modal -->
    <AModal v-model:open="modalVisible" :title="modalTitle" @ok="handleModalOk">
      <AForm ref="formRef" :model="form" layout="vertical">
        <AFormItem
          label="名称"
          name="name"
          :rules="[{ required: true, message: '请输入分类名称' }]"
        >
          <AInput v-model:value="form.name" placeholder="请输入分类名称" />
        </AFormItem>
        <AFormItem label="Slug" name="slug">
          <AInput
            v-model:value="form.slug"
            placeholder="留空将根据名称自动生成"
          />
        </AFormItem>
        <AFormItem label="描述" name="description">
          <ATextarea
            v-model:value="form.description"
            :rows="3"
            placeholder="请输入分类描述"
          />
        </AFormItem>
        <AFormItem label="状态" name="status">
          <ASelect v-model:value="form.status" style="max-width: 240px">
            <ASelectOption value="active">启用</ASelectOption>
            <ASelectOption value="inactive">停用</ASelectOption>
          </ASelect>
        </AFormItem>
      </AForm>
    </AModal>
  </div>
</template>
