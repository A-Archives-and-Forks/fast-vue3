<script setup lang="ts">
import { reactive, ref } from 'vue';

import { Message } from '@arco-design/web-vue';

const searchText = ref('');
const modalVisible = ref(false);
const editingRecord = ref<any>(null);

const form = reactive({ name: '', code: '', description: '', status: true });

const columns = [
  { title: 'ID', dataIndex: 'id', width: 80 },
  { title: '角色名称', dataIndex: 'name' },
  { title: '角色编码', dataIndex: 'code' },
  { title: '描述', dataIndex: 'description' },
  { title: '状态', dataIndex: 'status', width: 100 },
  { title: '操作', slotName: 'action', width: 160 },
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
    Message.success('角色已更新');
  } else {
    const id = Math.max(...dataSource.value.map((r) => r.id)) + 1;
    dataSource.value.push({
      id,
      name: form.name,
      code: form.code,
      description: form.description,
      status: form.status ? 'active' : 'inactive',
    });
    Message.success('角色已创建');
  }
  modalVisible.value = false;
}

function handleDelete(id: number) {
  dataSource.value = dataSource.value.filter((r) => r.id !== id);
  Message.success('已删除');
}
</script>

<template>
  <div class="p-6">
    <div class="flex-between mb-4">
      <a-typography-title :heading="4" :style="{ margin: 0 }">
        角色管理
      </a-typography-title>
      <a-button type="primary" @click="openModal()">+ 新增角色</a-button>
    </div>
    <a-card :bordered="false" class="shadow-sm">
      <div class="mb-4">
        <a-input-search
          v-model="searchText"
          placeholder="搜索角色名称或编码…"
          style="width: 320px"
          allow-clear
        />
      </div>
      <a-table
        :data="dataSource"
        :columns="columns"
        :pagination="{ pageSize: 5 }"
        size="medium"
      >
        <template #status="{ record }">
          <a-tag :color="record.status === 'active' ? 'green' : 'gray'">
            {{ record.status === 'active' ? '启用' : '禁用' }}
          </a-tag>
        </template>
        <template #action="{ record }">
          <a-button type="text" size="small" @click="openModal(record)">
            编辑
          </a-button>
          <a-popconfirm
            content="确定删除该角色？"
            @ok="handleDelete(record.id)"
          >
            <a-button type="text" status="danger" size="small">删除</a-button>
          </a-popconfirm>
        </template>
      </a-table>
    </a-card>

    <a-modal
      v-model:visible="modalVisible"
      :title="editingRecord ? '编辑角色' : '新增角色'"
      @ok="handleSave"
    >
      <a-form
        :model="form"
        :label-col-props="{ span: 5 }"
        :wrapper-col-props="{ span: 16 }"
      >
        <a-form-item label="角色名称">
          <a-input v-model="form.name" />
        </a-form-item>
        <a-form-item label="角色编码">
          <a-input v-model="form.code" />
        </a-form-item>
        <a-form-item label="描述">
          <a-input v-model="form.description" />
        </a-form-item>
        <a-form-item label="状态">
          <a-switch v-model="form.status" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
