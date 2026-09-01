<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

import { http } from '@/api/http';
import { message } from 'ant-design-vue';

interface RoleRecord {
  id: number;
  name: string;
  code: string;
  description: string;
  status: string;
  permissions: string[];
  createdAt: string;
}

const loading = ref(false);
const dataSource = ref<RoleRecord[]>([]);
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);
const keyword = ref('');

const modalVisible = ref(false);
const editingRecord = ref<null | RoleRecord>(null);

const router = useRouter();

const form = reactive({
  name: '',
  code: '',
  description: '',
  status: 'active',
});

const columns = [
  { title: 'ID', dataIndex: 'id', width: 60 },
  { title: '角色名称', dataIndex: 'name', width: 140 },
  { title: '角色编码', dataIndex: 'code', width: 140 },
  { title: '描述', dataIndex: 'description' },
  { title: '状态', dataIndex: 'status', width: 90 },
  { title: '创建时间', dataIndex: 'createdAt', width: 170 },
  { title: '操作', key: 'action', width: 200 },
];

async function fetchData() {
  loading.value = true;
  try {
    const res = await http.get<{ items: RoleRecord[]; total: number }>({
      url: '/role/list',
      params: {
        page: currentPage.value,
        pageSize: pageSize.value,
        keyword: keyword.value,
      },
    });
    dataSource.value = res?.items ?? [];
    total.value = res?.total ?? 0;
  } catch {
    message.error('加载角色列表失败');
  } finally {
    loading.value = false;
  }
}

function handleSearch() {
  currentPage.value = 1;
  fetchData();
}

function handlePageChange(page: number, size: number) {
  currentPage.value = page;
  pageSize.value = size;
  fetchData();
}

function openModal(record?: RoleRecord) {
  editingRecord.value = record ?? null;
  if (record) {
    Object.assign(form, {
      name: record.name,
      code: record.code,
      description: record.description,
      status: record.status,
    });
  } else {
    Object.assign(form, {
      name: '',
      code: '',
      description: '',
      status: 'active',
    });
  }
  modalVisible.value = true;
}

function handleSave() {
  if (!form.name || !form.code) {
    message.warning('请填写必要信息');
    return;
  }
  if (editingRecord.value) {
    const currentId = editingRecord.value.id;
    const idx = dataSource.value.findIndex((r) => r.id === currentId);
    if (idx !== -1) {
      dataSource.value[idx] = { ...dataSource.value[idx], ...form };
    }
    message.success('角色已更新');
  } else {
    const maxId = Math.max(...dataSource.value.map((r) => r.id), 0);
    dataSource.value.unshift({
      id: maxId + 1,
      ...form,
      permissions: [],
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 19),
    });
    total.value += 1;
    message.success('角色已创建');
  }
  modalVisible.value = false;
}

function handleDelete(record: RoleRecord) {
  dataSource.value = dataSource.value.filter((r) => r.id !== record.id);
  total.value -= 1;
  message.success('已删除');
}

const paginationConfig = computed(() => ({
  current: currentPage.value,
  pageSize: pageSize.value,
  total: total.value,
  showSizeChanger: true,
  showTotal: (t: number) => `共 ${t} 条`,
  onChange: handlePageChange,
}));

onMounted(fetchData);
</script>

<template>
  <div class="p-6">
    <ATypographyTitle :level="4" style="margin: 0 0 16px">
      角色管理
    </ATypographyTitle>

    <ACard :bordered="false" class="mb-4 shadow-sm">
      <ARow :gutter="16">
        <ACol :span="8">
          <AInputSearch
            v-model:value="keyword"
            placeholder="角色名称 / 编码"
            allow-clear
            @search="handleSearch"
          />
        </ACol>
        <ACol :span="16" style="text-align: right">
          <AButton type="primary" @click="openModal()">+ 新增角色</AButton>
        </ACol>
      </ARow>
    </ACard>

    <ACard :bordered="false" class="shadow-sm">
      <ASpin :spinning="loading">
        <ATable
          :data-source="dataSource"
          :columns="columns"
          :pagination="paginationConfig"
          size="middle"
          row-key="id"
        >
          <template #bodyCell="{ column, record }">
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
                @click="openModal(record as RoleRecord)"
              >
                编辑
              </AButton>
              <AButton
                type="link"
                size="small"
                @click="router.push(`/system/role/${record.id}/permission`)"
              >
                权限
              </AButton>
              <APopconfirm
                title="确定删除该角色？"
                @confirm="handleDelete(record as RoleRecord)"
              >
                <AButton type="link" size="small" danger>删除</AButton>
              </APopconfirm>
            </template>
          </template>
        </ATable>
      </ASpin>
    </ACard>

    <!-- 新增/编辑 Modal -->
    <AModal
      v-model:open="modalVisible"
      :title="editingRecord ? '编辑角色' : '新增角色'"
      @ok="handleSave"
      :width="500"
    >
      <AForm :model="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 17 }">
        <AFormItem label="角色名称">
          <AInput v-model:value="form.name" placeholder="请输入角色名称" />
        </AFormItem>
        <AFormItem label="角色编码">
          <AInput
            v-model:value="form.code"
            :disabled="!!editingRecord"
            placeholder="如: admin"
          />
        </AFormItem>
        <AFormItem label="描述">
          <ATextarea
            v-model:value="form.description"
            :rows="3"
            placeholder="请输入描述"
          />
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
