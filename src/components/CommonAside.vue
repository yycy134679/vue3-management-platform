<template>
  <el-aside width="200px" class="common-aside">
    <h3 class="aside-title">通用后台管理系统</h3>
    <el-menu
      default-active="1"
      class="el-menu-vertical"
      background-color="#545c64"
      text-color="#ffffff"
      active-text-color="#ffd04b"
      :collapse="false"
    >
      <!-- 无子菜单项 -->
      <el-menu-item v-for="item in noChildren" :key="item.name" :index="item.name">
        <el-icon>
          <component :is="item.icon" />
        </el-icon>
        <span>{{ item.label }}</span>
      </el-menu-item>

      <!-- 有子菜单项 -->
      <el-sub-menu v-for="item in hasChildren" :key="item.name" :index="item.name">
        <template #title>
          <el-icon>
            <component :is="item.icon" />
          </el-icon>
          <span>{{ item.label }}</span>
        </template>
        <el-menu-item v-for="subItem in item.children" :key="subItem.name" :index="subItem.name">
          {{ subItem.label }}
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>

<script setup>
import { ref, computed } from 'vue'
import { HomeFilled, ShoppingBag, User, Location } from '@element-plus/icons-vue'

// 菜单列表数据
const list = ref([
  {
    path: '/home',
    name: 'home',
    label: '首页',
    icon: 'HomeFilled',
    url: 'Home',
  },
  {
    path: '/mall',
    name: 'mall',
    label: '商品管理',
    icon: 'ShoppingBag',
    url: 'Mall',
  },
  {
    path: '/user',
    name: 'user',
    label: '用户管理',
    icon: 'User',
    url: 'User',
  },
  {
    path: '/other',
    name: 'other',
    label: '其他',
    icon: 'Location',
    children: [
      {
        path: '/page1',
        name: 'page1',
        label: '页面1',
        icon: 'Setting',
      },
      {
        path: '/page2',
        name: 'page2',
        label: '页面2',
        icon: 'Setting',
      },
    ],
  },
])

// 计算属性：过滤出没有子菜单的项
const noChildren = computed(() => {
  return list.value.filter((item) => !item.children)
})

// 计算属性：过滤出有子菜单的项
const hasChildren = computed(() => {
  return list.value.filter((item) => item.children)
})
</script>

<style scoped>
.common-aside {
  background-color: #545c64;
  height: 100vh;
}

.aside-title {
  color: #ffffff;
  text-align: center;
  line-height: 48px;
  font-size: 16px;
  font-weight: 400;
  margin: 0;
  padding: 20px 0;
}

.el-menu-vertical {
  border-right: none;
}

.el-menu-item,
:deep(.el-sub-menu__title) {
  height: 56px;
  line-height: 56px;
}

.el-menu-item .el-icon,
:deep(.el-sub-menu__title .el-icon) {
  font-size: 18px;
  margin-right: 8px;
}
</style>
