<template>
  <el-card
    :body-style="{ padding: '10px' }"
    style="margin-bottom: 10px"
  >
    <template #header>
      数据筛选
    </template>
    <el-form
      :inline="true"
      ref="form"
      :model="listParams"
      @submit.prevent="handleQuery"
    >
      <el-form-item label="状态">
        <el-select
          v-model="listParams.status"
          placeholder="请选择"
          clearable
        >
          <el-option
            label="全部"
            value=""
          />
          <el-option
            label="显示"
            :value="1"
          />
          <el-option
            label="不显示"
            :value="0"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="管理员名称">
        <el-input
          v-model="listParams.name"
          clearable
          placeholder="请输入身份昵称"
        />
      </el-form-item>
      <el-form-item>
        <el-button native-type="submit">
          查询
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card :body-style="{ padding: '10px' }">
    <!-- <template #header>
        <el-button
          type="primary"
        >
          添加管理员
        </el-button>
      </template> -->
    <el-table
      :data="list"
      stripe
      style="width: 100%"
    >
      <el-table-column
        prop="id"
        label="ID"
      />
      <el-table-column
        prop="real_name"
        label="姓名"
      />
      <el-table-column
        prop="account"
        label="账号"
      />
      <el-table-column
        prop="roles"
        label="身份"
        min-width="180"
      >
        <template #default="scope">
          <el-space wrap>
            <el-tag
              class="role-tag"
              v-for="(item) in scope.row.roles.split(',')"
              :key="item"
            >
              {{ item }}
            </el-tag>
          </el-space>
        </template>
      </el-table-column>
      <el-table-column
        label="最后一次登录时间"
        prop="last_time"
      />
      <el-table-column
        label="最后一次登录IP"
        prop="last_ip"
      />
      <el-table-column label="状态">
        <template #default="scope">
          <el-switch
            v-model="scope.row.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0"
            :loading="scope.row.statusLoading"
            @change="handleStatusChange(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        fixed="right"
        min-width="100"
        align="center"
      >
        <template #default="scope">
          <el-button @click="handleUpdate(scope.row.id)">
            编辑
          </el-button>
          <el-popconfirm
            title="确认删除吗？"
            @confirm="handleDelete(scope.row.id)"
          >
            <template #reference>
              <el-button>
                删除
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
  <app-pagination
    v-model:limit="listParams.limit"
    v-model:page="listParams.page"
    :list-count="listCount"
    :load-list="loadList"
  />
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import type { TListParams, Admin } from '@/api/types/admin'
import { getAdmins } from '@/api/admin'
import AppPagination from '@/components/Pagination/index.vue'

onMounted(() => {
  loadList()
})

const listCount = ref(8)

const list = ref<Admin[]>([]) // 列表数据
const listParams = reactive({ // 列表数据查询参数
  page: 1,
  limit: 10,
  name: '',
  roles: '',
  status: '' as TListParams['status']
})

// 初始化管理员列表
const loadList = async () => {
  getAdmins(listParams).then(res => {
    list.value = res.list
  })
}

// 查询
const handleQuery = async () => {
  console.log('handleQuery')
}

// 状态切换
const handleStatusChange = (row: any) => {
  console.log(row)
}

// 编辑
const handleUpdate = (id: any) => {
  console.log(id)
}

// 删除
const handleDelete = (id: any) => {
  console.log(id)
}
</script>
