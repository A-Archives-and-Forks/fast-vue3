<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { http } from '@/api/http';
import { useMessage } from '@idux/components/message';

const { success: messageSuccess, error: messageError } = useMessage();

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

const defaultChecked = [
  'dashboard:view',
  'user:view',
  'user:create',
  'user:edit',
  'role:view',
  'content:view',
  'log:view',
  'settings:view',
];

function getCheckedKeys(found: RoleRecord) {
  if (found.permissions.includes('*')) {
    return permissionTree.flatMap((p) => p.children.map((c) => c.key));
  }
  if (found.permissions.length > 0) {
    return [...found.permissions];
  }
  return [...defaultChecked];
}

async function fetchRole() {
  loading.value = true;
  try {
    const id = Number(route.params.id);
    const res = await http.get<{ items: RoleRecord[] }>({ url: '/role/list' });
    const found = (res?.items ?? []).find((r) => r.id === id) ?? null;
    role.value = found;
    if (found) {
      checkedKeys.value = getCheckedKeys(found);
    }
  } catch {
    messageError('加载角色信息失败');
  } finally {
    loading.value = false;
  }
}

const selectedCount = computed(() => checkedKeys.value.length);

function handleSave() {
  saving.value = true;
  setTimeout(() => {
    saving.value = false;
    messageSuccess(
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
        <IxButton mode="text" @click="goBack">← 返回</IxButton>
        <h4 style="margin: 0; font-size: 18px; font-weight: 600">
          角色权限配置
        </h4>
      </div>
      <IxButton mode="primary" :loading="saving" @click="handleSave">
        保存配置
      </IxButton>
    </div>

    <IxSpin :spinning="loading">
      <IxRow :gutter="16">
        <IxCol :span="8">
          <IxCard title="角色信息" shadow="never">
            <IxDesc v-if="role">
              <IxDescItem label="角色名称">{{ role.name }}</IxDescItem>
              <IxDescItem label="角色标识">{{ role.code }}</IxDescItem>
              <IxDescItem label="状态">
                <IxTag
                  :color="role.status === 'active' ? 'success' : 'default'"
                >
                  {{ role.status === 'active' ? '启用' : '禁用' }}
                </IxTag>
              </IxDescItem>
              <IxDescItem label="描述">{{ role.description }}</IxDescItem>
            </IxDesc>
          </IxCard>
        </IxCol>
        <IxCol :span="16">
          <IxCard shadow="never">
            <div
              style="
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 12px;
              "
            >
              <span style="font-weight: 600">权限分配</span>
              <IxTag color="blue">已选 {{ selectedCount }} 项</IxTag>
            </div>
            <IxTree
              v-model:checked-keys="checkedKeys"
              :data-source="permissionTree"
              checkable
              cascader-strategy="all"
              default-expanded-all
              label-key="title"
            />
          </IxCard>
        </IxCol>
      </IxRow>
    </IxSpin>
  </div>
</template>
