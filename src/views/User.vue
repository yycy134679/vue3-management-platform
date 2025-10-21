<template>
  <div class="user-header">
    <el-button type="primary">新增</el-button>
    <el-form :inline="true">
      <el-form-item label="请输入">
        <el-input
          v-model="searchName"
          placeholder="请输入用户名"
          clearable
          @keyup.enter.native="handleSearch"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">搜索</el-button>
      </el-form-item>
    </el-form>
  </div>
  <!-- 用户信息表格 -->
  <div class="user-tabale">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column
        v-for="item in tableLable"
        :key="item.prop"
        :prop="item.prop"
        :label="item.label"
        :width="item.width || 150"
      />
      <el-table-column fixed="right" label="操作" min-width="120">
        <template #default>
          <el-button type="primary" size="small" @click="handleClick"> 编辑 </el-button>
          <el-button type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-wrap">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="totalCount"
        :page-size="pageSize"
        :current-page="currentPage"
        @current-change="handlePageChange"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance, onMounted, reactive } from 'vue'

const handleClick = () => {
  console.log('click')
}

const tableData = ref([])
const searchName = ref('')
// 分页相关
const currentPage = ref(1)
const pageSize = ref(10)
const totalCount = ref(0)

const { proxy } = getCurrentInstance()
const getUserData = async (params = {}) => {
  const res = await proxy.$api.user.getUserList({
    page: currentPage.value,
    limit: pageSize.value,
    ...params,
  })
  console.log(res)
  // 此处的 res 已是响应拦截器返回的 data，本身包含 { list, count }
  // 处理性别字段：0-女，1-男
  tableData.value = (res?.list || []).map((item) => ({
    ...item,
    sexLabel: item.sex === 0 ? '女' : '男',
  }))
  totalCount.value = res?.count ?? 0
}

onMounted(() => {
  getUserData()
})

// 搜索事件
const handleSearch = () => {
  const name = searchName.value?.trim()
  // 搜索重置为第一页
  currentPage.value = 1
  // 传参给接口，mock 将按 name 过滤
  getUserData(name ? { name } : {})
}

// 分页切换
const handlePageChange = (page) => {
  currentPage.value = page
  const name = searchName.value?.trim()
  getUserData(name ? { name } : {})
}

const tableLable = reactive([
  {
    prop: 'name',
    label: '姓名',
  },
  {
    prop: 'age',
    label: '年龄',
  },
  {
    prop: 'addr',
    label: '地址',
    width: '200',
  },
  {
    prop: 'birth',
    label: '出生日期',
    width: '200',
  },
  {
    prop: 'sexLabel',
    label: '性别',
  },
])
</script>

<style scoped lang="less">
.user-header {
  display: flex;
  justify-content: space-between;
}
.pagination-wrap {
  padding: 16px 0;
  display: flex;
  justify-content: flex-end;
}
</style>
