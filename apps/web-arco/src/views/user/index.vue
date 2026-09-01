<script setup lang="ts">
import { ref } from 'vue';

import { Message } from '@arco-design/web-vue';

const searchText = ref('');
const columns = [
  { title: 'ID', dataIndex: 'id', width: 80 },
  { title: '用户名', dataIndex: 'name' },
  { title: '邮箱', dataIndex: 'email' },
  { title: '角色', dataIndex: 'role', width: 120 },
  { title: '状态', dataIndex: 'status', width: 100 },
  { title: '操作', slotName: 'action', width: 160 },
];

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

const roleColor: Record<string, string> = {
  admin: 'arcoblue',
  editor: 'green',
  viewer: 'gray',
};
const roleLabel: Record<string, string> = {
  admin: '管理员',
  editor: '编辑者',
  viewer: '访客',
};

function handleDelete(id: number) {
  data.value = data.value.filter((u) => u.id !== id);
  Message.success('已删除');
}
</script>

<template>
  <div class="p-6">
    <div class="flex-between mb-4">
      <a-typography-title :heading="4" style="margin: 0">
        用户管理
      </a-typography-title>
      <a-button type="primary">+ 新增用户</a-button>
    </div>
    <a-card :bordered="false" class="shadow-sm">
      <div class="mb-4">
        <a-input-search
          v-model="searchText"
          placeholder="搜索用户名或邮箱…"
          style="width: 320px"
          allow-clear
        />
      </div>
      <a-table
        :data="data"
        :columns="columns"
        :pagination="{ pageSize: 5 }"
        size="medium"
      >
        <template #role="{ record }">
          <a-tag :color="roleColor[record.role]">
            {{ roleLabel[record.role] }}
          </a-tag>
        </template>
        <template #status="{ record }">
          <a-badge
            :status="record.status === 'active' ? 'success' : 'normal'"
          />
          <span>{{ record.status === 'active' ? '启用' : '禁用' }}</span>
        </template>
        <template #action="{ record }">
          <a-button
            type="text"
            size="small"
            @click="Message.info(`编辑 ${record.name}`)"
          >
            编辑
          </a-button>
          <a-button
            type="text"
            size="small"
            status="danger"
            @click="handleDelete(record.id)"
          >
            删除
          </a-button>
        </template>
      </a-table>
    </a-card>
  </div>
</template>
