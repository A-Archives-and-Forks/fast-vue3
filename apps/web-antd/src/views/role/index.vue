<script setup lang="ts">
import { reactive, ref } from 'vue';

import { message } from 'ant-design-vue';

const searchText = ref('');
const modalVisible = ref(false);
const editingRecord = ref<any>(null);

const form = reactive({ name: '', code: '', description: '', status: true });

const columns = [
  { title: 'ID', dataIndex: 'id', key: 'id', width: 80 },
  { title: '角色名称', dataIndex: 'name', key: 'name' },
  { title: '角色编码', dataIndex: 'code', key: 'code' },
  { title: '描述', dataIndex: 'description', key: 'description' },
  { title: '状态', dataIndex: 'status', key: 'status', width: 100 },
  { title: '操作', key: 'action', width: 160 },
];

const dataSource = ref([
  {
    key: 1,
    id: 1,
    name: '超级管理员',
    code: 'R_SUPER',
    description: '拥有所有权限',
    status: 'active',
  },
  {
    key: 2,
    id: 2,
    name: '管理员',
    code: 'R_ADMIN',
    description: '拥有管理权限',
    status: 'active',
  },
  {
    key: 3,
    id: 3,
    name: '编辑者',
    code: 'R_EDITOR',
    description: '可编辑内容',
    status: 'active',
  },
  {
    key: 4,
    id: 4,
    name: '访客',
    code: 'R_VIEWER',
    description: '只读权限',
    status: 'active',
  },
  {
    key: 5,
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
      key: id,
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

function handleDelete(key: number) {
  dataSource.value = dataSource.value.filter((r) => r.key !== key);
  message.success('已删除');
}
</script>

<template>
  <div class="p-6">
    <div class="flex-between mb-4">
      <ATypographyTitle :level="4" style="margin: 0">角色管理</ATypographyTitle>
      <AButton type="primary" @click="openModal()">+ 新增角色</AButton>
    </div>
    <ACard :bordered="false" class="shadow-sm">
      <div class="mb-4">
        <AInputSearch
          v-model:value="searchText"
          placeholder="搜索角色名称或编码…"
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
          <template v-if="column.key === 'status'">
            <ABadge
              :status="record.status === 'active' ? 'success' : 'default'"
            />
            <span>{{ record.status === 'active' ? '启用' : '禁用' }}</span>
          </template>
          <template v-if="column.key === 'action'">
            <AButton type="link" size="small" @click="openModal(record)">
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

    <AModal
      v-model:open="modalVisible"
      :title="editingRecord ? '编辑角色' : '新增角色'"
      @ok="handleSave"
    >
      <AForm :model="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
        <AFormItem label="角色名称">
          <AInput v-model:value="form.name" />
        </AFormItem>
        <AFormItem label="角色编码">
          <AInput v-model:value="form.code" />
        </AFormItem>
        <AFormItem label="描述">
          <AInput v-model:value="form.description" />
        </AFormItem>
        <AFormItem label="状态">
          <ASwitch v-model:checked="form.status" />
        </AFormItem>
      </AForm>
    </AModal>
  </div>
</template>
