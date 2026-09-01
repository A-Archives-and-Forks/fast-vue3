<script setup lang="ts">
import { ref } from 'vue';

import {
  IxButton,
  IxCard,
  IxInput,
  IxTable,
  IxTag,
  useMessage,
} from '@idux/components';

const message = useMessage();
const searchText = ref('');

const columns = [
  { title: 'ID', dataKey: 'id', width: 80 },
  { title: '用户名', dataKey: 'name' },
  { title: '邮箱', dataKey: 'email' },
  {
    title: '角色',
    dataKey: 'role',
    width: 120,
    customCell: ({ value }: any) => {
      const label =
        { admin: '管理员', editor: '编辑者', viewer: '访客' }[
          value as string
        ] ?? value;
      return label;
    },
  },
  {
    title: '状态',
    dataKey: 'status',
    width: 100,
    customCell: ({ value }: any) => (value === 'active' ? '启用' : '禁用'),
  },
  {
    title: '操作',
    dataKey: 'action',
    width: 160,
    customCell: ({ record }: any) => record.id,
  },
];

const dataSource = ref([
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

function handleDelete(id: number) {
  dataSource.value = dataSource.value.filter((u) => u.id !== id);
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
      <IxButton mode="primary">+ 新增用户</IxButton>
    </div>
    <IxCard>
      <IxInput
        v-model:value="searchText"
        placeholder="搜索用户名或邮箱…"
        style="width: 320px; margin-bottom: 16px"
        clearable
      />
      <IxTable
        :columns="columns"
        :data-source="dataSource"
        :pagination="{ pageSize: 5 }"
      >
        <template #bodyCell="{ record, column }">
          <template v-if="column.dataKey === 'role'">
            <IxTag>{{ roleLabel[record.role] }}</IxTag>
          </template>
          <template v-if="column.dataKey === 'action'">
            <IxButton
              mode="link"
              size="sm"
              @click="message.info(`编辑 ${record.name}`)"
            >
              编辑
            </IxButton>
            <IxButton
              mode="link"
              size="sm"
              danger
              @click="handleDelete(record.id)"
            >
              删除
            </IxButton>
          </template>
        </template>
      </IxTable>
    </IxCard>
  </div>
</template>
