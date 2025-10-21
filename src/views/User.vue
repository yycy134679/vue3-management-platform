<template>
  <div class="user-header">
    <el-button type="primary">新增</el-button>
    <el-form :inline="true">
      <el-form-item label="请输入">
        <el-input placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">搜索</el-button>
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
  </div>
</template>

<script setup>
import { ref, getCurrentInstance, onMounted, reactive } from 'vue'

const handleClick = () => {
  console.log('click')
}

const tableData = ref([])

const { proxy } = getCurrentInstance()
const getUserData = async () => {
  const res = await proxy.$api.user.getUserList()
  console.log(res)
  if (res.code === 200) {
    // 处理性别字段：0-女，1-男
    tableData.value = res.data.list.map((item) => ({
      ...item,
      sexLabel: item.sex === 0 ? '女' : '男',
    }))
  }
}

onMounted(() => {
  getUserData()
})

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
</style>
