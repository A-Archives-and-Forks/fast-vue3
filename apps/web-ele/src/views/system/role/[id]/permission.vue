<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { http } from '@/api/http';
import { ArrowLeft, Select } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';

interface RoleRecord {
  id: number;
  name: string;
  code: string;
  description: string;
  status: string;
  permissions: string[];
}

const route = useRoute();
const router = useRouter();

const loading = ref(true);
const saving = ref(false);
const role = ref<null | RoleRecord>(null);
const checkedKeys = ref<string[]>([]);

const permissionTree = [
  {
    label: '仪表盘',
    key: 'dashboard',
    children: [{ label: '查看', key: 'dashboard:view' }],
  },
  {
    label: '用户管理',
    key: 'user',
    children: [
      { label: '查看', key: 'user:view' },
      { label: '新增', key: 'user:create' },
      { label: '编辑', key: 'user:edit' },
      { label: '删除', key: 'user:delete' },
    ],
  },
  {
    label: '角色管理',
    key: 'role',
    children: [
      { label: '查看', key: 'role:view' },
      { label: '配置权限', key: 'role:permission' },
    ],
  },
  {
    label: '菜单管理',
    key: 'menu',
    children: [{ label: '查看', key: 'menu:view' }],
  },
  {
    label: '内容管理',
    key: 'content',
    children: [
      { label: '查看', key: 'content:view' },
      { label: '编辑', key: 'content:edit' },
    ],
  },
  {
    label: '日志中心',
    key: 'log',
    children: [{ label: '查看', key: 'log:view' }],
  },
  {
    label: '系统设置',
    key: 'settings',
    children: [{ label: '查看', key: 'settings:view' }],
  },
];

async function fetchRole() {
  loading.value = true;
  try {
    const id = Number(route.params.id);
    const res = await http.get<{ items: RoleRecord[] }>({ url: '/role/list' });
    const found = (res?.items ?? []).find((r) => r.id === id) ?? null;
    role.value = found;
    if (found) {
      checkedKeys.value = [
        'dashboard:view',
        'user:view',
        'user:create',
        'user:edit',
        'role:view',
        'content:view',
        'log:view',
        'settings:view',
      ];
    }
  } catch {
    ElMessage.error('加载角色信息失败');
  } finally {
    loading.value = false;
  }
}

const selectedCount = computed(() => checkedKeys.value.length);

function onCheck(_node: unknown, info: { checkedKeys: (number | string)[] }) {
  checkedKeys.value = info.checkedKeys as string[];
}

function handleSave() {
  saving.value = true;
  setTimeout(() => {
    saving.value = false;
    ElMessage.success(
      `已保存「${role.value?.name ?? ''}」的权限配置（${selectedCount.value} 项）`,
    );
  }, 500);
}

function goBack() {
  router.push('/system/role');
}

onMounted(fetchRole);
</script>

<template>
  <div class="p-6">
    <div
      style="
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 16px;
      "
    >
      <div style="display: flex; gap: 12px; align-items: center">
        <el-button text :icon="ArrowLeft" @click="goBack">返回</el-button>
        <h4 style="margin: 0; font-size: 18px; font-weight: 600">
          角色权限配置
        </h4>
      </div>
      <el-button
        type="primary"
        :icon="Select"
        :loading="saving"
        @click="handleSave"
      >
        保存配置
      </el-button>
    </div>

    <div v-loading="loading">
      <el-row :gutter="16">
        <el-col :span="8">
          <el-card shadow="never">
            <el-descriptions title="角色信息" :column="1" border v-if="role">
              <el-descriptions-item label="角色名称">
                {{ role.name }}
              </el-descriptions-item>
              <el-descriptions-item label="角色标识">
                {{ role.code }}
              </el-descriptions-item>
              <el-descriptions-item label="状态">
                <el-tag
                  :type="role.status === 'active' ? 'success' : 'info'"
                  size="small"
                >
                  {{ role.status === 'active' ? '启用' : '禁用' }}
                </el-tag>
              </el-descriptions-item>
              <el-descriptions-item label="描述">
                {{ role.description }}
              </el-descriptions-item>
            </el-descriptions>
          </el-card>
        </el-col>
        <el-col :span="16">
          <el-card shadow="never">
            <template #header>
              <div
                style="
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                "
              >
                <span>权限分配</span>
                <el-tag type="primary">已选 {{ selectedCount }} 项</el-tag>
              </div>
            </template>
            <el-tree
              :data="permissionTree"
              show-checkbox
              node-key="key"
              :default-checked-keys="checkedKeys"
              default-expand-all
              @check="onCheck"
            />
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
