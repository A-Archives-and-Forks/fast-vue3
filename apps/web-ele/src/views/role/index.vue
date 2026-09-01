<script setup lang="ts">
import { reactive, ref } from 'vue';

import { ElMessage } from 'element-plus';

const searchText = ref('');
const dialogVisible = ref(false);
const editingIndex = ref<number>(-1);

const form = reactive({ name: '', code: '', description: '', status: true });

const data = ref([
  {
    id: 1,
    name: '超级管理员',
    code: 'R_SUPER',
    description: '拥有所有权限',
    status: true,
  },
  {
    id: 2,
    name: '管理员',
    code: 'R_ADMIN',
    description: '拥有管理权限',
    status: true,
  },
  {
    id: 3,
    name: '编辑者',
    code: 'R_EDITOR',
    description: '可编辑内容',
    status: true,
  },
  {
    id: 4,
    name: '访客',
    code: 'R_VIEWER',
    description: '只读权限',
    status: true,
  },
  {
    id: 5,
    name: '测试角色',
    code: 'R_TEST',
    description: '测试用途',
    status: false,
  },
]);

function openDialog(index?: number) {
  editingIndex.value = index ?? -1;
  if (index !== undefined && index >= 0) {
    const r = data.value[index];
    form.name = r.name;
    form.code = r.code;
    form.description = r.description;
    form.status = r.status;
  } else {
    form.name = '';
    form.code = '';
    form.description = '';
    form.status = true;
  }
  dialogVisible.value = true;
}

function handleSave() {
  if (editingIndex.value >= 0) {
    Object.assign(data.value[editingIndex.value], { ...form });
    ElMessage.success('角色已更新');
  } else {
    const id = Math.max(...data.value.map((r) => r.id)) + 1;
    data.value.push({ id, ...form });
    ElMessage.success('角色已创建');
  }
  dialogVisible.value = false;
}

function handleDelete(index: number) {
  data.value.splice(index, 1);
  ElMessage.success('已删除');
}
</script>

<template>
  <div class="p-6">
    <div class="flex-between mb-4">
      <h2 style="margin: 0; font-size: 1.25rem; font-weight: 600">角色管理</h2>
      <el-button type="primary" @click="openDialog()">+ 新增角色</el-button>
    </div>
    <el-card shadow="never">
      <div class="mb-4">
        <el-input
          v-model="searchText"
          placeholder="搜索角色名称或编码…"
          style="width: 320px"
          clearable
        />
      </div>
      <el-table :data="data" stripe size="default" style="width: 100%">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="角色名称" />
        <el-table-column prop="code" label="角色编码" />
        <el-table-column prop="description" label="描述" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status ? 'success' : 'info'" size="small">
              {{ row.status ? '启用' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160">
          <template #default="{ $index }">
            <el-button
              type="primary"
              link
              size="small"
              @click="openDialog($index)"
            >
              编辑
            </el-button>
            <el-button
              type="danger"
              link
              size="small"
              @click="handleDelete($index)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog
      v-model="dialogVisible"
      :title="editingIndex >= 0 ? '编辑角色' : '新增角色'"
      width="480px"
    >
      <el-form :model="form" label-width="80px">
        <el-form-item label="角色名称">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="角色编码">
          <el-input v-model="form.code" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.description" />
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="form.status" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSave">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>
