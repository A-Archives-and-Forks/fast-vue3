<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

import { http } from '@/api/http';
import { useMessage } from '@idux/components/message';

const {
  success: messageSuccess,
  warning: messageWarning,
  error: messageError,
} = useMessage();

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

const router = useRouter();

const dialogVisible = ref(false);
const editingRecord = ref<null | RoleRecord>(null);

const form = reactive({
  name: '',
  code: '',
  description: '',
  status: 'active',
});

const columns = [
  { title: 'ID', dataKey: 'id', width: 60 },
  { title: '角色名称', dataKey: 'name', width: 140 },
  { title: '角色编码', dataKey: 'code', width: 140 },
  { title: '描述', dataKey: 'description' },
  { title: '状态', key: 'status', width: 90, customCell: true },
  { title: '创建时间', dataKey: 'createdAt', width: 170 },
  { title: '操作', key: 'actions', width: 200, customCell: true },
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
    messageError('加载角色列表失败');
  } finally {
    loading.value = false;
  }
}

function handleSearch() {
  currentPage.value = 1;
  fetchData();
}

function handlePageChange(page: number) {
  currentPage.value = page;
  fetchData();
}

function openDialog(record?: RoleRecord) {
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
  dialogVisible.value = true;
}

function handleSave() {
  if (!form.name || !form.code) {
    messageWarning('请填写必要信息');
    return;
  }
  if (editingRecord.value) {
    const currentId = editingRecord.value.id;
    const idx = dataSource.value.findIndex((r) => r.id === currentId);
    if (idx !== -1) {
      const target = dataSource.value[idx];
      dataSource.value[idx] = { ...target, ...form };
    }
    messageSuccess('角色已更新');
  } else {
    const maxId = Math.max(...dataSource.value.map((r) => r.id), 0);
    dataSource.value.unshift({
      id: maxId + 1,
      ...form,
      permissions: [],
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 19),
    });
    total.value += 1;
    messageSuccess('角色已创建');
  }
  dialogVisible.value = false;
}

function handleDelete(record: RoleRecord) {
  dataSource.value = dataSource.value.filter((r) => r.id !== record.id);
  total.value -= 1;
  messageSuccess('已删除');
}

function goPerm(record: RoleRecord) {
  router.push(`/system/role/${record.id}/permission`);
}

onMounted(fetchData);
</script>

<template>
  <div style="padding: 24px">
    <h4 style="margin: 0 0 16px; font-size: 18px; font-weight: 600">
      角色管理
    </h4>

    <IxCard shadow="never" style="margin-bottom: 16px">
      <div style="display: flex; gap: 12px; align-items: center">
        <IxInput
          v-model:value="keyword"
          placeholder="角色名称 / 编码"
          style="width: 280px"
          @keyup.enter="handleSearch"
        />
        <IxButton mode="primary" @click="handleSearch">搜索</IxButton>
        <div style="flex: 1"></div>
        <IxButton mode="primary" @click="openDialog()">+ 新增角色</IxButton>
      </div>
    </IxCard>

    <IxCard shadow="never">
      <IxTable
        :columns="columns"
        :data-source="dataSource"
        :loading="loading"
        :pagination="false"
        :borderless="false"
        stripe
      >
        <template #cell="{ record, column }">
          <template v-if="column.key === 'status'">
            <IxTag :color="record.status === 'active' ? 'success' : 'info'">
              {{ record.status === 'active' ? '启用' : '禁用' }}
            </IxTag>
          </template>
          <template v-else-if="column.key === 'actions'">
            <IxButton mode="link" size="sm" @click="openDialog(record)">
              编辑
            </IxButton>
            <IxButton mode="link" size="sm" @click="goPerm(record)">
              权限
            </IxButton>
            <IxPopconfirm
              title="确定删除该角色？"
              @confirm="handleDelete(record)"
            >
              <IxButton mode="link" size="sm" danger>删除</IxButton>
            </IxPopconfirm>
          </template>
        </template>
      </IxTable>
      <div style="display: flex; justify-content: flex-end; margin-top: 16px">
        <IxPagination
          v-model:page-index="currentPage"
          :total="total"
          @change="handlePageChange"
        />
      </div>
    </IxCard>

    <!-- 新增/编辑 Modal -->
    <IxModal
      v-model:visible="dialogVisible"
      :title="editingRecord ? '编辑角色' : '新增角色'"
      width="500px"
    >
      <IxForm :label-col="{ span: 6 }" :control-col="{ span: 18 }">
        <IxFormItem label="角色名称">
          <IxInput v-model:value="form.name" placeholder="请输入角色名称" />
        </IxFormItem>
        <IxFormItem label="角色编码">
          <IxInput
            v-model:value="form.code"
            :disabled="!!editingRecord"
            placeholder="如: admin"
          />
        </IxFormItem>
        <IxFormItem label="描述">
          <IxInput
            v-model:value="form.description"
            type="textarea"
            placeholder="请输入描述"
          />
        </IxFormItem>
        <IxFormItem label="状态">
          <IxRadioGroup v-model:value="form.status">
            <IxRadio value="active">启用</IxRadio>
            <IxRadio value="inactive">禁用</IxRadio>
          </IxRadioGroup>
        </IxFormItem>
      </IxForm>
      <template #footer>
        <IxButton @click="dialogVisible = false">取消</IxButton>
        <IxButton mode="primary" @click="handleSave">确定</IxButton>
      </template>
    </IxModal>
  </div>
</template>
