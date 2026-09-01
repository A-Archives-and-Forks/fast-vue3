<script setup lang="ts">
import { reactive, ref } from 'vue';

import { MessagePlugin } from 'tdesign-vue-next';

const searchText = ref('');
const dialogVisible = ref(false);
const editingRecord = ref<any>(null);

const form = reactive({ name: '', code: '', description: '', status: true });

const columns = [
  { colKey: 'id', title: 'ID', width: 80 },
  { colKey: 'name', title: '角色名称' },
  { colKey: 'code', title: '角色编码' },
  { colKey: 'description', title: '描述' },
  { colKey: 'status', title: '状态', width: 100 },
  { colKey: 'action', title: '操作', width: 160 },
];

const dataSource = ref([
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

function openDialog(record?: any) {
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
  dialogVisible.value = true;
}

function handleSave() {
  if (editingRecord.value) {
    Object.assign(editingRecord.value, { ...form });
    MessagePlugin.success('角色已更新');
  } else {
    const id = Math.max(...dataSource.value.map((r) => r.id)) + 1;
    dataSource.value.push({ id, ...form });
    MessagePlugin.success('角色已创建');
  }
  dialogVisible.value = false;
}

function handleDelete(id: number) {
  dataSource.value = dataSource.value.filter((r) => r.id !== id);
  MessagePlugin.success('已删除');
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
      <t-button theme="primary" @click="openDialog()">+ 新增角色</t-button>
    </div>
    <t-card :bordered="false">
      <t-input
        v-model="searchText"
        placeholder="搜索角色名称或编码…"
        style="width: 320px; margin-bottom: 16px"
        clearable
      />
      <t-table
        :data="dataSource"
        :columns="columns"
        :pagination="{ pageSize: 5 }"
        size="small"
        stripe
      >
        <template #status="{ row }">
          <t-tag :theme="row.status ? 'success' : 'default'" variant="light">
            {{ row.status ? '启用' : '禁用' }}
          </t-tag>
        </template>
        <template #action="{ row }">
          <t-button
            theme="primary"
            variant="text"
            size="small"
            @click="openDialog(row)"
          >
            编辑
          </t-button>
          <t-button
            theme="danger"
            variant="text"
            size="small"
            @click="handleDelete(row.id)"
          >
            删除
          </t-button>
        </template>
      </t-table>
    </t-card>

    <t-dialog
      v-model:visible="dialogVisible"
      :header="editingRecord ? '编辑角色' : '新增角色'"
      width="480px"
      @confirm="handleSave"
    >
      <t-form :model="form" label-width="80px">
        <t-form-item label="角色名称">
          <t-input v-model="form.name" />
        </t-form-item>
        <t-form-item label="角色编码">
          <t-input v-model="form.code" />
        </t-form-item>
        <t-form-item label="描述">
          <t-input v-model="form.description" />
        </t-form-item>
        <t-form-item label="状态">
          <t-switch v-model="form.status" />
        </t-form-item>
      </t-form>
    </t-dialog>
  </div>
</template>
