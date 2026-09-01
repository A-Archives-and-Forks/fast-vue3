<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { http } from '@/api/http';
import { ChevronLeftIcon } from 'tdesign-icons-vue-next';
import { MessagePlugin } from 'tdesign-vue-next';

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

interface PermissionNode {
  key: string;
  title: string;
  children?: PermissionNode[];
}
const permissionTree: PermissionNode[] = [
  {
    title: '仪表盘',
    key: 'dashboard',
    children: [{ title: '查看', key: 'dashboard:view' }],
  },
  {
    title: '用户管理',
    key: 'user',
    children: [
      { title: '查看', key: 'user:view' },
      { title: '新增', key: 'user:create' },
      { title: '编辑', key: 'user:edit' },
      { title: '删除', key: 'user:delete' },
    ],
  },
  {
    title: '角色管理',
    key: 'role',
    children: [
      { title: '查看', key: 'role:view' },
      { title: '配置权限', key: 'role:permission' },
    ],
  },
  {
    title: '菜单管理',
    key: 'menu',
    children: [{ title: '查看', key: 'menu:view' }],
  },
  {
    title: '内容管理',
    key: 'content',
    children: [
      { title: '查看', key: 'content:view' },
      { title: '编辑', key: 'content:edit' },
    ],
  },
  {
    title: '日志中心',
    key: 'log',
    children: [{ title: '查看', key: 'log:view' }],
  },
  {
    title: '系统设置',
    key: 'settings',
    children: [{ title: '查看', key: 'settings:view' }],
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
    MessagePlugin.error('加载角色信息失败');
  } finally {
    loading.value = false;
  }
}

const selectedCount = computed(() => checkedKeys.value.length);

function handleSave() {
  saving.value = true;
  setTimeout(() => {
    saving.value = false;
    MessagePlugin.success(
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
  <div>
    <div
      style="
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 16px;
      "
    >
      <div style="display: flex; gap: 12px; align-items: center">
        <t-button theme="default" variant="text" shape="square" @click="goBack">
          <ChevronLeftIcon />
        </t-button>
        <h4 style="margin: 0; font-size: 18px; font-weight: 600">
          角色权限配置
        </h4>
      </div>
      <t-button theme="primary" :loading="saving" @click="handleSave">
        保存配置
      </t-button>
    </div>

    <t-loading :loading="loading" size="large" show-overlay>
      <t-row :gutter="16">
        <t-col :span="8">
          <t-card title="角色信息" :bordered="false">
            <t-descriptions :column="1" bordered v-if="role">
              <t-descriptions-item label="角色名称">
                {{ role.name }}
              </t-descriptions-item>
              <t-descriptions-item label="角色标识">
                {{ role.code }}
              </t-descriptions-item>
              <t-descriptions-item label="状态">
                <t-tag
                  :theme="role.status === 'active' ? 'success' : 'default'"
                  size="small"
                >
                  {{ role.status === 'active' ? '启用' : '禁用' }}
                </t-tag>
              </t-descriptions-item>
              <t-descriptions-item label="描述">
                {{ role.description }}
              </t-descriptions-item>
            </t-descriptions>
          </t-card>
        </t-col>
        <t-col :span="16">
          <t-card :bordered="false">
            <template #title>
              <div
                style="
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                "
              >
                <span>权限分配</span>
                <t-tag theme="primary">已选 {{ selectedCount }} 项</t-tag>
              </div>
            </template>
            <t-tree
              v-model="checkedKeys"
              :data="permissionTree"
              checkable
              :keys="{ value: 'key', label: 'title', children: 'children' }"
              :default-expand-all="true"
              :activable="false"
            />
          </t-card>
        </t-col>
      </t-row>
    </t-loading>
  </div>
</template>
