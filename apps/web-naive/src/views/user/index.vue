<script setup lang="ts">
import { h, ref } from 'vue';

import { NButton, NTag, useMessage } from 'naive-ui';

const message = useMessage();
const searchText = ref('');

const data = ref([
  {
    id: 1,
    name: 'Alice',
    email: 'alice@example.com',
    role: 'admin',
    status: 'active',
  },
  {
    id: 2,
    name: 'Bob',
    email: 'bob@example.com',
    role: 'editor',
    status: 'active',
  },
  {
    id: 3,
    name: 'Carol',
    email: 'carol@example.com',
    role: 'viewer',
    status: 'active',
  },
  {
    id: 4,
    name: 'David',
    email: 'david@example.com',
    role: 'editor',
    status: 'inactive',
  },
  {
    id: 5,
    name: 'Eve',
    email: 'eve@example.com',
    role: 'viewer',
    status: 'active',
  },
  {
    id: 6,
    name: 'Frank',
    email: 'frank@example.com',
    role: 'admin',
    status: 'active',
  },
  {
    id: 7,
    name: 'Grace',
    email: 'grace@example.com',
    role: 'viewer',
    status: 'inactive',
  },
]);

const roleLabel: Record<string, string> = {
  admin: '管理员',
  editor: '编辑者',
  viewer: '访客',
};
const roleType: Record<string, 'default' | 'primary' | 'success'> = {
  admin: 'primary',
  editor: 'success',
  viewer: 'default',
};

const columns = [
  { title: 'ID', key: 'id', width: 80, render: (row: any) => row.id },
  { title: '用户名', key: 'name', render: (row: any) => h('strong', row.name) },
  { title: '邮箱', key: 'email', render: (row: any) => row.email },
  {
    title: '角色',
    key: 'role',
    width: 120,
    render: (row: any) =>
      h(
        NTag,
        { type: roleType[row.role], size: 'small' },
        () => roleLabel[row.role],
      ),
  },
  {
    title: '状态',
    key: 'status',
    width: 100,
    render: (row: any) =>
      h(
        NTag,
        {
          type: row.status === 'active' ? 'success' : 'default',
          size: 'small',
        },
        () => (row.status === 'active' ? '启用' : '禁用'),
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
          onClick: () => message.info(`编辑 ${row.name}`),
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
          style: { marginLeft: '8px' },
        },
        () => '删除',
      ),
    ],
  },
];

function handleDelete(id: number) {
  data.value = data.value.filter((u) => u.id !== id);
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
      <h2 style="margin: 0; font-size: 1.25rem; font-weight: 600">用户管理</h2>
      <NButton type="primary">+ 新增用户</NButton>
    </div>
    <NCard>
      <NInput
        v-model:value="searchText"
        placeholder="搜索用户名或邮箱…"
        style="width: 320px; margin-bottom: 16px"
        clearable
      />
      <NDataTable
        :columns="columns"
        :data="data"
        :pagination="{ pageSize: 5 }"
        size="small"
        striped
      />
    </NCard>
  </div>
</template>
