<template>
  <div class="header">
    <div class="l-content">
      <el-button @click="handleCollapse" size="small">
        <component class="icons" is="menu"></component>
      </el-button>
      <el-breadcrumb separator="/" class="bread">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img class="avatar" :src="getImageUrl('user')" alt="User Avatar" />
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAllDataStore } from '@/stores'

const store = useAllDataStore()
const getImageUrl = (imageName) => {
  // 特殊处理用户头像
  if (imageName === 'user') {
    return new URL(`../assets/images/avatar.jpg`, import.meta.url).href
  }
  // 其他图片按原逻辑处理
  return new URL(`../assets/${imageName}.png`, import.meta.url).href
}

const handleCollapse = () => {
  store.state.isCollapse = !store.state.isCollapse
}
</script>

<style lang="less" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #333;
}
.icons {
  width: 20px;
  height: 20px;
}
.l-content {
  display: flex;
  align-items: center;
  .el-button {
    margin-right: 20px;
  }
}

.r-content {
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}

:deep(.bread span) {
  color: #fff !important;
  cursor: pointer !important;
}
</style>
