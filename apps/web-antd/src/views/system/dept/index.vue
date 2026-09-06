<script setup lang="ts">
import type { DeptItem } from '@/api';

import { onMounted, reactive, ref } from 'vue';

import { api } from '@/api';
import { message } from 'ant-design-vue';

const loading = ref(false);
const dataSource = ref<DeptItem[]>([]);

const modalVisible = ref(false);
const editingRecord = ref<DeptItem | null>(null);
const parentId = ref<null | number>(null);

const form = reactive({
  name: '',
  leader: '',
  order: 0,
  status: 'active' as DeptItem['status'],
});

const columns = [
  { title: '部门名称', dataIndex: 'name', width: 260 },
  { title: '负责人', dataIndex: 'leader', width: 120 },
  { title: '排序', dataIndex: 'order', width: 80 },
  { title: '状态', dataIndex: 'status', width: 100 },
  { title: '创建时间', dataIndex: 'createdAt', width: 180 },
  { title: '操作', key: 'action', width: 200 },
];

async function fetchData() {
  loading.value = true;
  try {
    const res = await api.system.deptList();
    dataSource.value = res ?? [];
  } catch {
    message.error('加载部门列表失败');
  } finally {
    loading.value = false;
  }
}

function openModal(record?: DeptItem, parent?: DeptItem) {
  editingRecord.value = record ?? null;
  parentId.value = parent?.id ?? null;
  if (record) {
    Object.assign(form, {
      name: record.name,
      leader: record.leader,
      order: record.order,
      status: record.status,
    });
  } else {
    Object.assign(form, { name: '', leader: '', order: 0, status: 'active' });
  }
  modalVisible.value = true;
}

function handleSave() {
  if (!form.name) {
    message.warning('请填写部门名称');
    return;
  }
  message.success(editingRecord.value ? '部门已更新' : '部门已创建');
  modalVisible.value = false;
}

function handleDelete(record: DeptItem) {
  if (record.children?.length) {
    message.warning('请先删除子部门');
    return;
  }
  message.success('已删除');
}

onMounted(fetchData);
</script>

<template>
  <div class="p-6">
    <ATypographyTitle :level="4" style="margin: 0 0 16px">
      部门管理
    </ATypographyTitle>

    <ACard :bordered="false" class="mb-4 shadow-sm">
      <div
        style="
          display: flex;
          align-items: center;
          justify-content: space-between;
        "
      >
        <span style="font-size: 0.9rem; color: #6b7280">
          组织架构树形结构，支持多级部门
        </span>
        <AButton type="primary" @click="openModal()">+ 新增部门</AButton>
      </div>
    </ACard>

    <ACard :bordered="false" class="shadow-sm">
      <ASpin :spinning="loading">
        <ATable
          :data-source="dataSource"
          :columns="columns"
          :pagination="false"
          size="middle"
          row-key="id"
          :default-expand-all-rows="true"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'status'">
              <ABadge
                :status="record.status === 'active' ? 'success' : 'default'"
              />
              <span>{{ record.status === 'active' ? '启用' : '停用' }}</span>
            </template>
            <template v-if="column.key === 'action'">
              <AButton
                type="link"
                size="small"
                @click="openModal(undefined, record as DeptItem)"
              >
                新增
              </AButton>
              <AButton
                type="link"
                size="small"
                @click="openModal(record as DeptItem)"
              >
                编辑
              </AButton>
              <APopconfirm
                title="确定删除该部门？"
                @confirm="handleDelete(record as DeptItem)"
              >
                <AButton type="link" size="small" danger>删除</AButton>
              </APopconfirm>
            </template>
          </template>
        </ATable>
      </ASpin>
    </ACard>

    <AModal
      v-model:open="modalVisible"
      :title="editingRecord ? '编辑部门' : '新增部门'"
      :width="480"
      @ok="handleSave"
    >
      <AForm :model="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 17 }">
        <AFormItem
          label="部门名称"
          :rules="[{ required: true, message: '请输入部门名称' }]"
        >
          <AInput v-model:value="form.name" placeholder="请输入部门名称" />
        </AFormItem>
        <AFormItem label="负责人">
          <AInput v-model:value="form.leader" placeholder="请输入负责人" />
        </AFormItem>
        <AFormItem label="排序">
          <AInputNumber
            v-model:value="form.order"
            :min="0"
            style="width: 100%"
          />
        </AFormItem>
        <AFormItem label="状态">
          <ARadioGroup v-model:value="form.status">
            <ARadio value="active">启用</ARadio>
            <ARadio value="inactive">停用</ARadio>
          </ARadioGroup>
        </AFormItem>
      </AForm>
    </AModal>
  </div>
</template>
