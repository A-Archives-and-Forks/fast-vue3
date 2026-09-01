<script setup lang="ts">
import { ref } from 'vue';

import Button from 'primevue/button';
import Card from 'primevue/card';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import InputText from 'primevue/inputtext';
import Tag from 'primevue/tag';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
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
const roleSeverity: Record<string, string> = {
  admin: 'info',
  editor: 'success',
  viewer: 'secondary',
};

function handleDelete(id: number) {
  data.value = data.value.filter((u) => u.id !== id);
  toast.add({ severity: 'success', summary: '已删除', life: 2000 });
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
      <Button label="+ 新增用户" />
    </div>
    <Card>
      <template #content>
        <InputText
          v-model="searchText"
          placeholder="搜索用户名或邮箱…"
          style="width: 320px; margin-bottom: 16px"
        />
        <DataTable
          :value="data"
          :paginator="true"
          :rows="5"
          striped-rows
          size="small"
        >
          <Column field="id" header="ID" style="width: 80px" />
          <Column field="name" header="用户名" />
          <Column field="email" header="邮箱" />
          <Column field="role" header="角色" style="width: 120px">
            <template #body="{ data: row }">
              <Tag
                :value="roleLabel[row.role]"
                :severity="roleSeverity[row.role]"
              />
            </template>
          </Column>
          <Column field="status" header="状态" style="width: 100px">
            <template #body="{ data: row }">
              <Tag
                :value="row.status === 'active' ? '启用' : '禁用'"
                :severity="row.status === 'active' ? 'success' : 'secondary'"
              />
            </template>
          </Column>
          <Column header="操作" style="width: 160px">
            <template #body="{ data: row }">
              <Button label="编辑" link size="small" />
              <Button
                label="删除"
                link
                size="small"
                severity="danger"
                @click="handleDelete(row.id)"
              />
            </template>
          </Column>
        </DataTable>
      </template>
    </Card>
  </div>
</template>
