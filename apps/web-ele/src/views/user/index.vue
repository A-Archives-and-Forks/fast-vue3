<script setup lang="ts">
import { ref } from 'vue';

import { ElMessage } from 'element-plus';

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

const roleType: Record<string, 'info' | 'primary' | 'success'> = {
  admin: 'primary',
  editor: 'success',
  viewer: 'info',
};
const roleLabel: Record<string, string> = {
  admin: '管理员',
  editor: '编辑者',
  viewer: '访客',
};

function handleDelete(id: number) {
  data.value = data.value.filter((u) => u.id !== id);
  ElMessage.success('已删除');
}
</script>

<template>
  <div class="p-6">
    <div class="flex-between mb-4">
      <h2 style="margin: 0; font-size: 1.25rem; font-weight: 600">用户管理</h2>
      <el-button type="primary">+ 新增用户</el-button>
    </div>
    <el-card shadow="never">
      <div class="mb-4">
        <el-input
          v-model="searchText"
          placeholder="搜索用户名或邮箱…"
          style="width: 320px"
          clearable
        />
      </div>
      <el-table :data="data" stripe size="default" style="width: 100%">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="用户名" />
        <el-table-column prop="email" label="邮箱" />
        <el-table-column prop="role" label="角色" width="120">
          <template #default="{ row }">
            <el-tag :type="roleType[row.role]">
              {{ roleLabel[row.role] }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag
              :type="row.status === 'active' ? 'success' : 'info'"
              size="small"
            >
              {{ row.status === 'active' ? '启用' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160">
          <template #default="{ row }">
            <el-button
              type="primary"
              link
              size="small"
              @click="ElMessage.info(`编辑 ${row.name}`)"
            >
              编辑
            </el-button>
            <el-button
              type="danger"
              link
              size="small"
              @click="handleDelete(row.id)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
