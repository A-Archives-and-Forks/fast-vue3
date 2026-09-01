<script setup lang="ts">
import { ref } from 'vue';

import { message } from 'ant-design-vue';

const searchText = ref('');
const columns = [
  { title: 'ID', dataIndex: 'id', key: 'id', width: 80 },
  { title: '用户名', dataIndex: 'name', key: 'name' },
  { title: '邮箱', dataIndex: 'email', key: 'email' },
  { title: '角色', dataIndex: 'role', key: 'role', width: 120 },
  { title: '状态', dataIndex: 'status', key: 'status', width: 100 },
  { title: '操作', key: 'action', width: 160 },
];

const dataSource = ref([
  {
    key: 1,
    id: 1,
    name: 'Alice',
    email: 'alice@example.com',
    role: 'admin',
    status: 'active',
  },
  {
    key: 2,
    id: 2,
    name: 'Bob',
    email: 'bob@example.com',
    role: 'editor',
    status: 'active',
  },
  {
    key: 3,
    id: 3,
    name: 'Carol',
    email: 'carol@example.com',
    role: 'viewer',
    status: 'active',
  },
  {
    key: 4,
    id: 4,
    name: 'David',
    email: 'david@example.com',
    role: 'editor',
    status: 'inactive',
  },
  {
    key: 5,
    id: 5,
    name: 'Eve',
    email: 'eve@example.com',
    role: 'viewer',
    status: 'active',
  },
  {
    key: 6,
    id: 6,
    name: 'Frank',
    email: 'frank@example.com',
    role: 'admin',
    status: 'active',
  },
  {
    key: 7,
    id: 7,
    name: 'Grace',
    email: 'grace@example.com',
    role: 'viewer',
    status: 'inactive',
  },
]);

const roleColor: Record<string, string> = {
  admin: 'blue',
  editor: 'green',
  viewer: 'default',
};
const roleLabel: Record<string, string> = {
  admin: '管理员',
  editor: '编辑者',
  viewer: '访客',
};

function handleDelete(key: number) {
  dataSource.value = dataSource.value.filter((u) => u.key !== key);
  message.success('已删除');
}
</script>

<template>
  <div class="p-6">
    <div class="flex-between mb-4">
      <ATypographyTitle :level="4" style="margin: 0">用户管理</ATypographyTitle>
      <AButton type="primary">+ 新增用户</AButton>
    </div>
    <ACard :bordered="false" class="shadow-sm">
      <div class="mb-4">
        <AInputSearch
          v-model:value="searchText"
          placeholder="搜索用户名或邮箱…"
          style="width: 320px"
          allow-clear
        />
      </div>
      <ATable
        :data-source="dataSource"
        :columns="columns"
        :pagination="{ pageSize: 5 }"
        size="middle"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'role'">
            <ATag :color="roleColor[record.role]">
              {{ roleLabel[record.role] }}
            </ATag>
          </template>
          <template v-if="column.key === 'status'">
            <ABadge
              :status="record.status === 'active' ? 'success' : 'default'"
            />
            <span>{{ record.status === 'active' ? '启用' : '禁用' }}</span>
          </template>
          <template v-if="column.key === 'action'">
            <AButton
              type="link"
              size="small"
              @click="message.info(`编辑 ${record.name}`)"
            >
              编辑
            </AButton>
            <AButton
              type="link"
              size="small"
              danger
              @click="handleDelete(record.key)"
            >
              删除
            </AButton>
          </template>
        </template>
      </ATable>
    </ACard>
  </div>
</template>
