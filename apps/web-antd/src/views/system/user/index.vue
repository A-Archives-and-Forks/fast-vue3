<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

import { http } from '@/api/http';
import { message } from 'ant-design-vue';

interface UserRecord {
  id: number;
  username: string;
  realName: string;
  email: string;
  phone: string;
  roles: string[];
  status: string;
  department: string;
  createdAt: string;
}

const loading = ref(false);
const dataSource = ref<UserRecord[]>([]);
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);
const keyword = ref('');
const statusFilter = ref('');
const roleFilter = ref('');

const modalVisible = ref(false);
const editingRecord = ref<null | UserRecord>(null);

const router = useRouter();

const form = reactive({
  username: '',
  realName: '',
  email: '',
  phone: '',
  roles: [] as string[],
  status: 'active',
  department: '',
});

const columns = [
  { title: 'ID', dataIndex: 'id', width: 60 },
  { title: '用户名', dataIndex: 'username', width: 110 },
  { title: '姓名', dataIndex: 'realName', width: 100 },
  { title: '邮箱', dataIndex: 'email' },
  { title: '部门', dataIndex: 'department', width: 100 },
  { title: '角色', dataIndex: 'roles', width: 120 },
  { title: '状态', dataIndex: 'status', width: 90 },
  { title: '创建时间', dataIndex: 'createdAt', width: 170 },
  { title: '操作', key: 'action', width: 200, fixed: 'right' as const },
];

const roleColorMap: Record<string, string> = {
  admin: 'blue',
  editor: 'green',
  user: 'default',
  guest: 'gray',
};

const roleOptions = [
  { label: '管理员', value: 'admin' },
  { label: '编辑者', value: 'editor' },
  { label: '普通用户', value: 'user' },
  { label: '访客', value: 'guest' },
];

const departments = ['技术部', '产品部', '运营部', '设计部', '市场部'];

async function fetchData() {
  loading.value = true;
  try {
    const res = await http.get<{ items: UserRecord[]; total: number }>({
      url: '/user/list',
      params: {
        page: currentPage.value,
        pageSize: pageSize.value,
        keyword: keyword.value,
        status: statusFilter.value,
        role: roleFilter.value,
      },
    });
    dataSource.value = res?.items ?? [];
    total.value = res?.total ?? 0;
  } catch {
    message.error('加载用户列表失败');
  } finally {
    loading.value = false;
  }
}

function handleSearch() {
  currentPage.value = 1;
  fetchData();
}

function handleReset() {
  keyword.value = '';
  statusFilter.value = '';
  roleFilter.value = '';
  currentPage.value = 1;
  fetchData();
}

function handlePageChange(page: number, size: number) {
  currentPage.value = page;
  pageSize.value = size;
  fetchData();
}

function openModal(record?: UserRecord) {
  editingRecord.value = record ?? null;
  if (record) {
    Object.assign(form, {
      username: record.username,
      realName: record.realName,
      email: record.email,
      phone: record.phone,
      roles: [...record.roles],
      status: record.status,
      department: record.department,
    });
  } else {
    Object.assign(form, {
      username: '',
      realName: '',
      email: '',
      phone: '',
      roles: [],
      status: 'active',
      department: '',
    });
  }
  modalVisible.value = true;
}

function handleSave() {
  if (!form.username || !form.realName) {
    message.warning('请填写必要信息');
    return;
  }
  if (editingRecord.value) {
    const currentId = editingRecord.value.id;
    const idx = dataSource.value.findIndex((r) => r.id === currentId);
    if (idx !== -1) {
      dataSource.value[idx] = { ...dataSource.value[idx], ...form };
    }
    message.success('用户已更新');
  } else {
    const maxId = Math.max(...dataSource.value.map((r) => r.id), 0);
    dataSource.value.unshift({
      id: maxId + 1,
      ...form,
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 19),
    });
    total.value += 1;
    message.success('用户已创建');
  }
  modalVisible.value = false;
}

function handleDelete(record: UserRecord) {
  dataSource.value = dataSource.value.filter((r) => r.id !== record.id);
  total.value -= 1;
  message.success('已删除');
}

function handleToggleStatus(record: UserRecord) {
  record.status = record.status === 'active' ? 'inactive' : 'active';
  message.success(`已${record.status === 'active' ? '启用' : '禁用'}`);
}

const paginationConfig = computed(() => ({
  current: currentPage.value,
  pageSize: pageSize.value,
  total: total.value,
  showSizeChanger: true,
  showQuickJumper: true,
  showTotal: (t: number) => `共 ${t} 条`,
  onChange: handlePageChange,
}));

onMounted(fetchData);
</script>

<template>
  <div class="p-6">
    <ATypographyTitle :level="4" style="margin: 0 0 16px">
      用户管理
    </ATypographyTitle>

    <!-- 搜索区域 -->
    <ACard :bordered="false" class="mb-4 shadow-sm">
      <ARow :gutter="16">
        <ACol :span="6">
          <AInput
            v-model:value="keyword"
            placeholder="用户名 / 姓名 / 邮箱"
            allow-clear
            @press-enter="handleSearch"
          />
        </ACol>
        <ACol :span="4">
          <ASelect
            v-model:value="statusFilter"
            placeholder="状态"
            allow-clear
            style="width: 100%"
          >
            <ASelectOption value="active">启用</ASelectOption>
            <ASelectOption value="inactive">禁用</ASelectOption>
          </ASelect>
        </ACol>
        <ACol :span="4">
          <ASelect
            v-model:value="roleFilter"
            placeholder="角色"
            allow-clear
            style="width: 100%"
          >
            <ASelectOption
              v-for="r in roleOptions"
              :key="r.value"
              :value="r.value"
            >
              {{ r.label }}
            </ASelectOption>
          </ASelect>
        </ACol>
        <ACol :span="6">
          <ASpace>
            <AButton type="primary" @click="handleSearch">搜索</AButton>
            <AButton @click="handleReset">重置</AButton>
          </ASpace>
        </ACol>
        <ACol :span="4" style="text-align: right">
          <AButton type="primary" @click="openModal()">+ 新增用户</AButton>
        </ACol>
      </ARow>
    </ACard>

    <!-- 表格 -->
    <ACard :bordered="false" class="shadow-sm">
      <ASpin :spinning="loading">
        <ATable
          :data-source="dataSource"
          :columns="columns"
          :pagination="paginationConfig"
          size="middle"
          row-key="id"
          :scroll="{ x: 1100 }"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'roles'">
              <ATag
                v-for="role in record.roles"
                :key="role"
                :color="roleColorMap[role] || 'default'"
              >
                {{ roleOptions.find((r) => r.value === role)?.label || role }}
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
                @click="router.push(`/system/user/${record.id}`)"
              >
                详情
              </AButton>
              <AButton
                type="link"
                size="small"
                @click="openModal(record as UserRecord)"
              >
                编辑
              </AButton>
              <AButton
                type="link"
                size="small"
                @click="handleToggleStatus(record as UserRecord)"
              >
                {{ record.status === 'active' ? '禁用' : '启用' }}
              </AButton>
              <APopconfirm
                title="确定删除该用户？"
                @confirm="handleDelete(record as UserRecord)"
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
      :title="editingRecord ? '编辑用户' : '新增用户'"
      @ok="handleSave"
      :width="560"
    >
      <AForm :model="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 17 }">
        <AFormItem
          label="用户名"
          :rules="[{ required: true, message: '请输入用户名' }]"
        >
          <AInput
            v-model:value="form.username"
            :disabled="!!editingRecord"
            placeholder="请输入用户名"
          />
        </AFormItem>
        <AFormItem
          label="姓名"
          :rules="[{ required: true, message: '请输入姓名' }]"
        >
          <AInput v-model:value="form.realName" placeholder="请输入真实姓名" />
        </AFormItem>
        <AFormItem label="邮箱">
          <AInput v-model:value="form.email" placeholder="请输入邮箱" />
        </AFormItem>
        <AFormItem label="手机号">
          <AInput v-model:value="form.phone" placeholder="请输入手机号" />
        </AFormItem>
        <AFormItem label="部门">
          <ASelect v-model:value="form.department" placeholder="请选择部门">
            <ASelectOption v-for="d in departments" :key="d" :value="d">
              {{ d }}
            </ASelectOption>
          </ASelect>
        </AFormItem>
        <AFormItem label="角色">
          <ASelect
            v-model:value="form.roles"
            mode="multiple"
            placeholder="请选择角色"
          >
            <ASelectOption
              v-for="r in roleOptions"
              :key="r.value"
              :value="r.value"
            >
              {{ r.label }}
            </ASelectOption>
          </ASelect>
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
