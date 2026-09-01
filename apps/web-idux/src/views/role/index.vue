<script setup lang="ts">
import { reactive, ref } from 'vue';

import {
  IxButton,
  IxCard,
  IxInput,
  IxModal,
  IxTable,
  IxTag,
  useMessage,
} from '@idux/components';

const message = useMessage();
const searchText = ref('');
const modalVisible = ref(false);
const editingRecord = ref<any>(null);

const form = reactive({ name: '', code: '', description: '', status: true });

const columns = [
  { title: 'ID', dataKey: 'id', width: 80 },
  { title: '角色名称', dataKey: 'name' },
  { title: '角色编码', dataKey: 'code' },
  { title: '描述', dataKey: 'description' },
  { title: '状态', dataKey: 'status', width: 100 },
  { title: '操作', dataKey: 'action', width: 160 },
];

const dataSource = ref([
  {
    id: 1,
    name: '超级管理员',
    code: 'R_SUPER',
    description: '拥有所有权限',
    status: 'active',
  },
  {
    id: 2,
    name: '管理员',
    code: 'R_ADMIN',
    description: '拥有管理权限',
    status: 'active',
  },
  {
    id: 3,
    name: '编辑者',
    code: 'R_EDITOR',
    description: '可编辑内容',
    status: 'active',
  },
  {
    id: 4,
    name: '访客',
    code: 'R_VIEWER',
    description: '只读权限',
    status: 'active',
  },
  {
    id: 5,
    name: '测试角色',
    code: 'R_TEST',
    description: '测试用途',
    status: 'inactive',
  },
]);

function openModal(record?: any) {
  editingRecord.value = record ?? null;
  if (record) {
    form.name = record.name;
    form.code = record.code;
    form.description = record.description;
    form.status = record.status === 'active';
  } else {
    form.name = '';
    form.code = '';
    form.description = '';
    form.status = true;
  }
  modalVisible.value = true;
}

function handleSave() {
  if (editingRecord.value) {
    Object.assign(editingRecord.value, {
      name: form.name,
      code: form.code,
      description: form.description,
      status: form.status ? 'active' : 'inactive',
    });
    message.success('角色已更新');
  } else {
    const id = Math.max(...dataSource.value.map((r) => r.id)) + 1;
    dataSource.value.push({
      id,
      name: form.name,
      code: form.code,
      description: form.description,
      status: form.status ? 'active' : 'inactive',
    });
    message.success('角色已创建');
  }
  modalVisible.value = false;
}

function handleDelete(id: number) {
  dataSource.value = dataSource.value.filter((r) => r.id !== id);
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
      <IxButton mode="primary" @click="openModal()">+ 新增角色</IxButton>
    </div>
    <IxCard>
      <IxInput
        v-model:value="searchText"
        placeholder="搜索角色名称或编码…"
        style="width: 320px; margin-bottom: 16px"
        clearable
      />
      <IxTable
        :columns="columns"
        :data-source="dataSource"
        :pagination="{ pageSize: 5 }"
      >
        <template #bodyCell="{ record, column }">
          <template v-if="column.dataKey === 'status'">
            <IxTag :color="record.status === 'active' ? 'success' : 'info'">
              {{ record.status === 'active' ? '启用' : '禁用' }}
            </IxTag>
          </template>
          <template v-if="column.dataKey === 'action'">
            <IxButton mode="link" size="sm" @click="openModal(record)">
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

    <IxModal
      v-model:visible="modalVisible"
      :title="editingRecord ? '编辑角色' : '新增角色'"
      @ok="handleSave"
    >
      <div style="padding: 16px 0">
        <div style="margin-bottom: 16px">
          <label style="display: block; margin-bottom: 4px; font-weight: 500"
            >角色名称</label
          >
          <IxInput v-model:value="form.name" style="width: 100%" />
        </div>
        <div style="margin-bottom: 16px">
          <label style="display: block; margin-bottom: 4px; font-weight: 500"
            >角色编码</label
          >
          <IxInput v-model:value="form.code" style="width: 100%" />
        </div>
        <div style="margin-bottom: 16px">
          <label style="display: block; margin-bottom: 4px; font-weight: 500"
            >描述</label
          >
          <IxInput v-model:value="form.description" style="width: 100%" />
        </div>
        <div>
          <label style="margin-right: 8px; font-weight: 500">状态</label>
          <IxSwitch v-model:checked="form.status" />
        </div>
      </div>
    </IxModal>
  </div>
</template>
