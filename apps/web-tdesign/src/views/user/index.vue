<script setup lang="ts">
import { ref } from 'vue';

import { MessagePlugin } from 'tdesign-vue-next';

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

const columns = [
  { colKey: 'id', title: 'ID', width: 80 },
  { colKey: 'name', title: '用户名' },
  { colKey: 'email', title: '邮箱' },
  { colKey: 'role', title: '角色', width: 120 },
  { colKey: 'status', title: '状态', width: 100 },
  { colKey: 'action', title: '操作', width: 160 },
];

const roleLabel: Record<string, string> = {
  admin: '管理员',
  editor: '编辑者',
  viewer: '访客',
};
const roleTheme: Record<
  string,
  'danger' | 'default' | 'primary' | 'success' | 'warning'
> = { admin: 'primary', editor: 'success', viewer: 'default' };

function handleDelete(id: number) {
  data.value = data.value.filter((u) => u.id !== id);
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
      <h2 style="margin: 0; font-size: 1.25rem; font-weight: 600">用户管理</h2>
      <t-button theme="primary">+ 新增用户</t-button>
    </div>
    <t-card :bordered="false">
      <t-input
        v-model="searchText"
        placeholder="搜索用户名或邮箱…"
        style="width: 320px; margin-bottom: 16px"
        clearable
      />
      <t-table
        :data="data"
        :columns="columns"
        :pagination="{ pageSize: 5 }"
        size="small"
        stripe
      >
        <template #role="{ row }">
          <t-tag :theme="roleTheme[row.role]" variant="light">
            {{ roleLabel[row.role] }}
          </t-tag>
        </template>
        <template #status="{ row }">
          <t-tag
            :theme="row.status === 'active' ? 'success' : 'default'"
            variant="light"
          >
            {{ row.status === 'active' ? '启用' : '禁用' }}
          </t-tag>
        </template>
        <template #action="{ row }">
          <t-button
            theme="primary"
            variant="text"
            size="small"
            @click="MessagePlugin.info(`编辑 ${row.name}`)"
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
  </div>
</template>
