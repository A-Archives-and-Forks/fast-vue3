<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { http } from '@/api/http';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Tag from 'primevue/tag';
import Toast from 'primevue/toast';
import Tree from 'primevue/tree';
import { useToast } from 'primevue/usetoast';

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
const toast = useToast();

const loading = ref(true);
const saving = ref(false);
const role = ref<null | RoleRecord>(null);
const selectedKeys = ref<Record<string, boolean>>({});

// Permission tree content (mirrors the canonical permission model)
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

const treeNodes = permissionTree.map((group) => ({
  key: group.key,
  label: group.title,
  children: group.children.map((child) => ({
    key: child.key,
    label: child.title,
  })),
}));

const defaultCheckedKeys = [
  'dashboard:view',
  'user:view',
  'user:create',
  'user:edit',
  'role:view',
  'content:view',
  'log:view',
  'settings:view',
];

async function fetchRole() {
  loading.value = true;
  try {
    const id = Number(route.params.id);
    const res = await http.get<{ items: RoleRecord[] }>({ url: '/role/list' });
    const found = (res?.items ?? []).find((r) => r.id === id) ?? null;
    role.value = found;
    if (found) {
      const perms = found.permissions?.length
        ? found.permissions
        : defaultCheckedKeys;
      selectedKeys.value = {};
      perms.forEach((key) => {
        selectedKeys.value[key] = true;
      });
    }
  } catch {
    toast.add({
      severity: 'error',
      summary: '错误',
      detail: '加载角色信息失败',
    });
  } finally {
    loading.value = false;
  }
}

const selectedCount = computed(
  () =>
    Object.keys(selectedKeys.value).filter((k) => selectedKeys.value[k]).length,
);

function handleSave() {
  saving.value = true;
  setTimeout(() => {
    saving.value = false;
    toast.add({
      severity: 'success',
      summary: '成功',
      detail: `已保存「${role.value?.name ?? ''}」的权限配置（${selectedCount.value} 项）`,
    });
  }, 500);
}

function goBack() {
  router.push('/system/role');
}

onMounted(fetchRole);
</script>

<template>
  <div class="p-6">
    <Toast />

    <div
      style="
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 16px;
      "
    >
      <div style="display: flex; gap: 12px; align-items: center">
        <Button
          icon="pi pi-arrow-left"
          text
          rounded
          aria-label="返回"
          @click="goBack"
        />
        <h4 style="margin: 0; font-size: 18px; font-weight: 600">
          角色权限配置
        </h4>
      </div>
      <Button
        label="保存配置"
        icon="pi pi-check"
        :loading="saving"
        @click="handleSave"
      />
    </div>

    <div
      style="display: flex; flex-wrap: wrap; gap: 16px; align-items: flex-start"
    >
      <div style="flex: 1 1 30%; min-width: 260px">
        <Card>
          <template #title>角色信息</template>
          <template #content>
            <div v-if="role" class="info-grid">
              <div class="info-row">
                <span class="info-label">角色名称</span
                ><span class="info-value">{{ role.name }}</span>
              </div>
              <div class="info-row">
                <span class="info-label">角色标识</span
                ><span class="info-value">{{ role.code }}</span>
              </div>
              <div class="info-row">
                <span class="info-label">状态</span>
                <span class="info-value">
                  <Tag
                    :value="role.status === 'active' ? '启用' : '禁用'"
                    :severity="
                      role.status === 'active' ? 'success' : 'secondary'
                    "
                  />
                </span>
              </div>
              <div class="info-row" style="border-bottom: none">
                <span class="info-label">描述</span
                ><span class="info-value">{{ role.description }}</span>
              </div>
            </div>
          </template>
        </Card>
      </div>

      <div style="flex: 1 1 60%; min-width: 320px">
        <Card>
          <template #title>
            <div
              style="
                display: flex;
                align-items: center;
                justify-content: space-between;
              "
            >
              <span>权限分配</span>
              <Tag :value="`已选 ${selectedCount} 项`" severity="info" />
            </div>
          </template>
          <template #content>
            <Tree
              v-if="!loading"
              :value="treeNodes"
              selection-mode="checkbox"
              v-model:selection-keys="selectedKeys"
              :meta-key-selection="false"
            />
            <div
              v-else
              style="
                padding: 40px 0;
                font-size: 14px;
                color: #9ca3af;
                text-align: center;
              "
            >
              加载中…
            </div>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>

<style scoped>
.info-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0;
}

.info-row {
  display: flex;
  padding: 10px 12px;
  border-bottom: 1px solid #f0f0f0;
}

.info-label {
  flex-shrink: 0;
  width: 92px;
  font-size: 14px;
  color: #9ca3af;
}

.info-value {
  flex: 1;
  font-size: 14px;
  color: #111827;
}
</style>
