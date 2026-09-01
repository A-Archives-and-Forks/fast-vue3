<script setup lang="ts">
import { h, reactive, ref } from 'vue';

import {
  NButton,
  NCard,
  NDataTable,
  NForm,
  NFormItem,
  NInput,
  NModal,
  NSwitch,
  NTag,
  useMessage,
} from 'naive-ui';

const message = useMessage();
const showModal = ref(false);
const editingRecord = ref<any>(null);

const form = reactive({ name: '', code: '', description: '', status: true });

const data = ref([
  {
    id: 1,
    name: '超级管理员',
    code: 'R_SUPER',
    description: '拥有所有权限',
    status: true,
  },
  {
    id: 2,
    name: '管理员',
    code: 'R_ADMIN',
    description: '拥有管理权限',
    status: true,
  },
  {
    id: 3,
    name: '编辑者',
    code: 'R_EDITOR',
    description: '可编辑内容',
    status: true,
  },
  {
    id: 4,
    name: '访客',
    code: 'R_VIEWER',
    description: '只读权限',
    status: true,
  },
  {
    id: 5,
    name: '测试角色',
    code: 'R_TEST',
    description: '测试用途',
    status: false,
  },
]);

const columns = [
  { title: 'ID', key: 'id', width: 80 },
  { title: '角色名称', key: 'name' },
  { title: '角色编码', key: 'code' },
  { title: '描述', key: 'description' },
  {
    title: '状态',
    key: 'status',
    width: 100,
    render: (row: any) =>
      h(NTag, { type: row.status ? 'success' : 'default', size: 'small' }, () =>
        row.status ? '启用' : '禁用',
      ),
  },
  {
    title: '操作',
    key: 'action',
    width: 160,
    render: (row: any) => [
      h(
        NButton,
        {
          text: true,
          type: 'primary',
          size: 'small',
          onClick: () => openModal(row),
          style: 'margin-right: 8px',
        },
        () => '编辑',
      ),
      h(
        NButton,
        {
          text: true,
          type: 'error',
          size: 'small',
          onClick: () => handleDelete(row.id),
        },
        () => '删除',
      ),
    ],
  },
];

function openModal(record?: any) {
  editingRecord.value = record ?? null;
  if (record) {
    form.name = record.name;
    form.code = record.code;
    form.description = record.description;
    form.status = record.status;
  } else {
    form.name = '';
    form.code = '';
    form.description = '';
    form.status = true;
  }
  showModal.value = true;
}

function handleSave() {
  if (editingRecord.value) {
    Object.assign(editingRecord.value, { ...form });
    message.success('角色已更新');
  } else {
    const id = Math.max(...data.value.map((r) => r.id)) + 1;
    data.value.push({ id, ...form });
    message.success('角色已创建');
  }
  showModal.value = false;
}

function handleDelete(id: number) {
  data.value = data.value.filter((r) => r.id !== id);
  message.success('已删除');
}
</script>

<template>
  <div style="padding: 24px">
    <div
      style="
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
      "
    >
      <h2 style="margin: 0; font-size: 1.25rem; font-weight: 600">角色管理</h2>
      <NButton type="primary" @click="openModal()">+ 新增角色</NButton>
    </div>
    <NCard>
      <NDataTable
        :columns="columns"
        :data="data"
        :pagination="{ pageSize: 5 }"
        striped
      />
    </NCard>

    <NModal
      v-model:show="showModal"
      preset="dialog"
      :title="editingRecord ? '编辑角色' : '新增角色'"
      style="width: 480px"
      positive-text="确定"
      @positive-click="handleSave"
    >
      <NForm
        :model="form"
        label-placement="left"
        label-width="80"
        style="margin-top: 20px"
      >
        <NFormItem label="角色名称">
          <NInput v-model:value="form.name" />
        </NFormItem>
        <NFormItem label="角色编码">
          <NInput v-model:value="form.code" />
        </NFormItem>
        <NFormItem label="描述">
          <NInput v-model:value="form.description" />
        </NFormItem>
        <NFormItem label="状态">
          <NSwitch v-model:value="form.status" />
        </NFormItem>
      </NForm>
    </NModal>
  </div>
</template>
