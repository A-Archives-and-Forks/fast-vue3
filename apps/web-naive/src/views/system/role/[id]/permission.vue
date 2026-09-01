<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { http } from '@/api/http';
import {
  NButton,
  NCard,
  NDescriptions,
  NDescriptionsItem,
  NSpin,
  NTree,
  useMessage,
} from 'naive-ui';

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
const message = useMessage();

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
    message.error('加载角色信息失败');
  } finally {
    loading.value = false;
  }
}

const selectedCount = computed(() => checkedKeys.value.length);

function handleSave() {
  saving.value = true;
  setTimeout(() => {
    saving.value = false;
    message.success(
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
  <div style="padding: 24px">
    <div
      style="
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 16px;
      "
    >
      <div style="display: flex; gap: 12px; align-items: center">
        <NButton text @click="goBack">← 返回</NButton>
        <h3 style="margin: 0; font-size: 18px; font-weight: 600">
          角色权限配置
        </h3>
      </div>
      <NButton type="primary" :loading="saving" @click="handleSave">
        保存配置
      </NButton>
    </div>

    <NSpin :show="loading">
      <div style="display: flex; flex-wrap: wrap; gap: 16px">
        <div style="flex: 1 1 30%; min-width: 260px">
          <NCard v-if="role">
            <NDescriptions :column="1" label-placement="left" bordered>
              <NDescriptionsItem label="角色名称">
                {{ role.name }}
              </NDescriptionsItem>
              <NDescriptionsItem label="角色标识">
                {{ role.code }}
              </NDescriptionsItem>
              <NDescriptionsItem label="状态">
                <NTag
                  :type="role.status === 'active' ? 'success' : 'default'"
                  size="small"
                >
                  {{ role.status === 'active' ? '启用' : '禁用' }}
                </NTag>
              </NDescriptionsItem>
              <NDescriptionsItem label="描述">
                {{ role.description }}
              </NDescriptionsItem>
            </NDescriptions>
          </NCard>
        </div>
        <div style="flex: 1 1 60%; min-width: 320px">
          <NCard title="权限分配">
            <template #header-extra>
              <NTag type="primary">已选 {{ selectedCount }} 项</NTag>
            </template>
            <NTree
              :data="permissionTree"
              checkable
              :default-expand-all="true"
              v-model:checked-keys="checkedKeys"
            />
          </NCard>
        </div>
      </div>
    </NSpin>
  </div>
</template>
