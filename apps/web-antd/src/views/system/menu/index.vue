<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { http } from '@/api/http';
import { message } from 'ant-design-vue';

interface MenuRecord {
  id: number;
  parentId: number;
  name: string;
  path: string;
  icon: string;
  sort: number;
  status: string;
  type: string;
  permission?: string;
}

const loading = ref(false);
const dataSource = ref<MenuRecord[]>([]);
const modalVisible = ref(false);
const editingRecord = ref<MenuRecord | null>(null);

const form = ref({
  parentId: 0,
  name: '',
  path: '',
  icon: '',
  sort: 0,
  status: 'active',
  type: 'menu',
  permission: '',
});

const columns = [
  { title: 'ID', dataIndex: 'id', width: 60 },
  { title: '菜单名称', dataIndex: 'name' },
  { title: '路径', dataIndex: 'path' },
  { title: '图标', dataIndex: 'icon', width: 140 },
  { title: '类型', dataIndex: 'type', width: 100 },
  { title: '排序', dataIndex: 'sort', width: 80 },
  { title: '状态', dataIndex: 'status', width: 100 },
  { title: '操作', key: 'action', width: 180 },
];

const typeMap: Record<string, { color: string; label: string }> = {
  directory: { label: '目录', color: 'blue' },
  menu: { label: '菜单', color: 'green' },
  button: { label: '按钮', color: 'orange' },
};

async function fetchData() {
  loading.value = true;
  try {
    const res = await http.get<MenuRecord[]>({ url: '/menu/list' });
    dataSource.value = res ?? [];
  } catch {
    message.error('加载菜单数据失败');
  } finally {
    loading.value = false;
  }
}

function buildTree(list: MenuRecord[]) {
  const map = new Map<number, MenuRecord & { children?: MenuRecord[] }>();
  const tree: (MenuRecord & { children?: MenuRecord[] })[] = [];
  list.forEach((item) => map.set(item.id, { ...item }));
  list.forEach((item) => {
    const node = map.get(item.id);
    if (!node) {
      return;
    }
    if (item.parentId === 0) {
      tree.push(node);
    } else {
      const parent = map.get(item.parentId);
      if (parent) {
        if (!parent.children) parent.children = [];
        parent.children.push(node);
      }
    }
  });
  return tree;
}

function openModal(record?: MenuRecord) {
  editingRecord.value = record ?? null;
  form.value = record
    ? { ...record, permission: record.permission ?? '' }
    : {
        parentId: 0,
        name: '',
        path: '',
        icon: '',
        sort: 0,
        status: 'active',
        type: 'menu',
        permission: '',
      };
  modalVisible.value = true;
}

function handleSave() {
  if (editingRecord.value) {
    const currentId = editingRecord.value.id;
    const idx = dataSource.value.findIndex((r) => r.id === currentId);
    if (idx !== -1) {
      dataSource.value[idx] = { ...dataSource.value[idx], ...form.value };
    }
    message.success('菜单已更新');
  } else {
    const maxId = Math.max(...dataSource.value.map((r) => r.id), 0);
    dataSource.value.push({ id: maxId + 1, ...form.value });
    message.success('菜单已创建');
  }
  modalVisible.value = false;
}

function handleDelete(id: number) {
  dataSource.value = dataSource.value.filter(
    (r) => r.id !== id && r.parentId !== id,
  );
  message.success('已删除');
}

onMounted(fetchData);
</script>

<template>
  <div class="p-6">
    <div class="flex-between mb-4">
      <ATypographyTitle :level="4" style="margin: 0">菜单管理</ATypographyTitle>
      <AButton type="primary" @click="openModal()">+ 新增菜单</AButton>
    </div>
    <ACard :bordered="false" class="shadow-sm">
      <ASpin :spinning="loading">
        <ATable
          :data-source="buildTree(dataSource)"
          :columns="columns"
          :pagination="false"
          size="middle"
          row-key="id"
          :default-expand-all-rows="true"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'type'">
              <ATag :color="typeMap[record.type]?.color">
                {{ typeMap[record.type]?.label }}
              </ATag>
            </template>
            <template v-if="column.dataIndex === 'status'">
              <ABadge
                :status="record.status === 'active' ? 'success' : 'default'"
              />
              <span>{{ record.status === 'active' ? '启用' : '禁用' }}</span>
            </template>
            <template v-if="column.key === 'action'">
              <AButton
                type="link"
                size="small"
                @click="openModal(record as MenuRecord)"
              >
                编辑
              </AButton>
              <AButton
                type="link"
                size="small"
                @click="
                  openModal({ ...record, parentId: record.id, id: 0 } as any)
                "
              >
                添加子项
              </AButton>
              <AButton
                type="link"
                size="small"
                danger
                @click="handleDelete(record.id)"
              >
                删除
              </AButton>
            </template>
          </template>
        </ATable>
      </ASpin>
    </ACard>

    <AModal
      v-model:open="modalVisible"
      :title="editingRecord ? '编辑菜单' : '新增菜单'"
      @ok="handleSave"
      :width="520"
    >
      <AForm :model="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 17 }">
        <AFormItem label="上级菜单">
          <ASelect v-model:value="form.parentId">
            <ASelectOption :value="0">根目录</ASelectOption>
            <ASelectOption
              v-for="m in dataSource.filter((d) => d.type !== 'button')"
              :key="m.id"
              :value="m.id"
            >
              {{ m.name }}
            </ASelectOption>
          </ASelect>
        </AFormItem>
        <AFormItem label="类型">
          <ARadioGroup v-model:value="form.type">
            <ARadio value="directory">目录</ARadio>
            <ARadio value="menu">菜单</ARadio>
            <ARadio value="button">按钮</ARadio>
          </ARadioGroup>
        </AFormItem>
        <AFormItem label="名称">
          <AInput v-model:value="form.name" placeholder="请输入菜单名称" />
        </AFormItem>
        <AFormItem v-if="form.type !== 'button'" label="路径">
          <AInput v-model:value="form.path" placeholder="/system/user" />
        </AFormItem>
        <AFormItem v-if="form.type !== 'button'" label="图标">
          <AInput v-model:value="form.icon" placeholder="HomeOutlined" />
        </AFormItem>
        <AFormItem v-if="form.type === 'button'" label="权限标识">
          <AInput v-model:value="form.permission" placeholder="user:create" />
        </AFormItem>
        <AFormItem label="排序">
          <AInputNumber v-model:value="form.sort" :min="0" />
        </AFormItem>
        <AFormItem label="状态">
          <ARadioGroup v-model:value="form.status">
            <ARadio value="active">启用</ARadio>
            <ARadio value="inactive">禁用</ARadio>
          </ARadioGroup>
        </AFormItem>
      </AForm>
    </AModal>
  </div>
</template>
