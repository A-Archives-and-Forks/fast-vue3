<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { http } from '@/api/http';
import { ArrowLeftOutlined, SaveOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';

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
  <div class="p-6">
    <div class="mb-4 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <AButton type="text" class="!p-1" @click="goBack">
          <ArrowLeftOutlined class="text-lg" />
        </AButton>
        <ATypographyTitle :level="4" style="margin: 0">
          角色权限配置
        </ATypographyTitle>
      </div>
      <AButton type="primary" :loading="saving" @click="handleSave">
        <SaveOutlined />保存配置
      </AButton>
    </div>

    <ASpin :spinning="loading">
      <ARow :gutter="16">
        <ACol :span="8">
          <ACard title="角色信息" :bordered="false" class="shadow-sm">
            <ADescriptions :column="1" bordered size="small" v-if="role">
              <ADescriptionsItem label="角色名称">
                {{ role.name }}
              </ADescriptionsItem>
              <ADescriptionsItem label="角色标识">
                {{ role.code }}
              </ADescriptionsItem>
              <ADescriptionsItem label="状态">
                <ABadge
                  :status="role.status === 'active' ? 'success' : 'default'"
                  :text="role.status === 'active' ? '启用' : '禁用'"
                />
              </ADescriptionsItem>
              <ADescriptionsItem label="描述">
                {{ role.description }}
              </ADescriptionsItem>
            </ADescriptions>
          </ACard>
        </ACol>
        <ACol :span="16">
          <ACard :bordered="false" class="shadow-sm">
            <template #title>
              <div class="flex items-center justify-between">
                <span>权限分配</span>
                <ATag color="blue">已选 {{ selectedCount }} 项</ATag>
              </div>
            </template>
            <ATree
              v-model:checked-keys="checkedKeys"
              :tree-data="permissionTree"
              checkable
              default-expand-all
              :selectable="false"
            />
          </ACard>
        </ACol>
      </ARow>
    </ASpin>
  </div>
</template>
