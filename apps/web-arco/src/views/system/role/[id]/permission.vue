<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { http } from '@/api/http';
import { Message } from '@arco-design/web-vue';
import { IconArrowLeft, IconSave } from '@arco-design/web-vue/es/icon';

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
    Message.error('加载角色信息失败');
  } finally {
    loading.value = false;
  }
}

const selectedCount = computed(() => checkedKeys.value.length);

function handleSave() {
  saving.value = true;
  setTimeout(() => {
    saving.value = false;
    Message.success(
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
    <div class="mb-4 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <a-button type="text" class="!p-1" @click="goBack">
          <template #icon><IconArrowLeft /></template>
        </a-button>
        <h4 style="margin: 0; font-size: 18px; font-weight: 600">
          角色权限配置
        </h4>
      </div>
      <a-button type="primary" :loading="saving" @click="handleSave">
        <template #icon><IconSave /></template>保存配置
      </a-button>
    </div>

    <a-spin :loading="loading">
      <a-row :gutter="16">
        <a-col :span="8">
          <a-card title="角色信息" :bordered="false">
            <a-descriptions :column="1" bordered size="small" v-if="role">
              <a-descriptions-item label="角色名称">
                {{ role.name }}
              </a-descriptions-item>
              <a-descriptions-item label="角色标识">
                {{ role.code }}
              </a-descriptions-item>
              <a-descriptions-item label="状态">
                <a-tag
                  :color="role.status === 'active' ? 'green' : 'gray'"
                  size="small"
                >
                  {{ role.status === 'active' ? '启用' : '禁用' }}
                </a-tag>
              </a-descriptions-item>
              <a-descriptions-item label="描述">
                {{ role.description }}
              </a-descriptions-item>
            </a-descriptions>
          </a-card>
        </a-col>
        <a-col :span="16">
          <a-card :bordered="false">
            <template #title>
              <div class="flex items-center justify-between">
                <span>权限分配</span>
                <a-tag color="arcoblue">已选 {{ selectedCount }} 项</a-tag>
              </div>
            </template>
            <a-tree
              v-model:checked-keys="checkedKeys"
              :data="permissionTree"
              checkable
              default-expand-all
              :selectable="false"
            />
          </a-card>
        </a-col>
      </a-row>
    </a-spin>
  </div>
</template>
