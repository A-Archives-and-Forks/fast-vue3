<script setup lang="ts">
import { reactive, ref } from 'vue';

import Button from 'primevue/button';
import Card from 'primevue/card';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';
import Tag from 'primevue/tag';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const dialogVisible = ref(false);
const editingIndex = ref<number>(-1);

const form = reactive({ name: '', code: '', description: '', status: true });

const statusOptions = [
  { label: '启用', value: true },
  { label: '禁用', value: false },
];

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

function openDialog(index?: number) {
  editingIndex.value = index ?? -1;
  if (index !== undefined && index >= 0) {
    const r = data.value[index];
    if (!r) return;
    form.name = r.name;
    form.code = r.code;
    form.description = r.description;
    form.status = r.status;
  } else {
    form.name = '';
    form.code = '';
    form.description = '';
    form.status = true;
  }
  dialogVisible.value = true;
}

function handleSave() {
  if (editingIndex.value >= 0) {
    const record = data.value[editingIndex.value];
    if (!record) return;
    Object.assign(record, { ...form });
    toast.add({ severity: 'success', summary: '角色已更新', life: 3000 });
  } else {
    const id = Math.max(...data.value.map((r) => r.id)) + 1;
    data.value.push({ id, ...form });
    toast.add({ severity: 'success', summary: '角色已创建', life: 3000 });
  }
  dialogVisible.value = false;
}

function handleDelete(index: number) {
  data.value.splice(index, 1);
  toast.add({ severity: 'success', summary: '已删除', life: 3000 });
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
      <Button label="+ 新增角色" severity="primary" @click="openDialog()" />
    </div>
    <Card>
      <template #content>
        <DataTable :value="data" paginator :rows="5" striped-rows size="small">
          <Column field="id" header="ID" style="width: 80px" />
          <Column field="name" header="角色名称" />
          <Column field="code" header="角色编码" />
          <Column field="description" header="描述" />
          <Column header="状态" style="width: 100px">
            <template #body="{ data: row }">
              <Tag
                :severity="row.status ? 'success' : 'secondary'"
                :value="row.status ? '启用' : '禁用'"
              />
            </template>
          </Column>
          <Column header="操作" style="width: 160px">
            <template #body="{ index }">
              <Button
                label="编辑"
                size="small"
                text
                @click="openDialog(index)"
              />
              <Button
                label="删除"
                size="small"
                text
                severity="danger"
                @click="handleDelete(index)"
              />
            </template>
          </Column>
        </DataTable>
      </template>
    </Card>

    <Dialog
      v-model:visible="dialogVisible"
      :header="editingIndex >= 0 ? '编辑角色' : '新增角色'"
      modal
      style="width: 480px"
    >
      <div style="display: flex; flex-direction: column; gap: 16px">
        <div>
          <label style="display: block; margin-bottom: 4px; font-weight: 500"
            >角色名称</label
          >
          <InputText v-model="form.name" style="width: 100%" />
        </div>
        <div>
          <label style="display: block; margin-bottom: 4px; font-weight: 500"
            >角色编码</label
          >
          <InputText v-model="form.code" style="width: 100%" />
        </div>
        <div>
          <label style="display: block; margin-bottom: 4px; font-weight: 500"
            >描述</label
          >
          <InputText v-model="form.description" style="width: 100%" />
        </div>
        <div>
          <label style="display: block; margin-bottom: 4px; font-weight: 500"
            >状态</label
          >
          <Select
            v-model="form.status"
            :options="statusOptions"
            option-label="label"
            option-value="value"
            style="width: 100%"
          />
        </div>
      </div>
      <template #footer>
        <Button
          label="取消"
          severity="secondary"
          text
          @click="dialogVisible = false"
        />
        <Button label="确定" severity="primary" @click="handleSave" />
      </template>
    </Dialog>
  </div>
</template>
