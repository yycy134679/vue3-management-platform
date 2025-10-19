<template>
  <el-aside :width="width" class="common-aside">
    <el-menu
      default-active="1"
      class="el-menu-vertical"
      background-color="#545c64"
      text-color="#ffffff"
      active-text-color="#ffd04b"
      :collapse="isCollapse"
    >
      <h3 class="aside-title" v-show="!isCollapse">通用后台管理系统</h3>
      <h3 class="aside-title" v-show="isCollapse">后台</h3>

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
import { useAllDataStore } from '@/stores'

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

const store = useAllDataStore()
const isCollapse = computed(() => store.state.isCollapse)
// 计算属性:过滤出没有子菜单的项
const noChildren = computed(() => {
  return list.value.filter((item) => !item.children)
})

// 计算属性：过滤出有子菜单的项
const hasChildren = computed(() => {
  return list.value.filter((item) => item.children)
})

const width = computed(() => (isCollapse.value ? '64px' : '180px'))
</script>

<style scoped>
/* 侧边栏容器样式 - 整个左侧菜单栏 */
.common-aside {
  /* 设置背景颜色为深灰色 */
  background-color: #545c64;
  /* height: 100vh 表示高度为视口高度的100%，即整个屏幕的高度，使侧边栏占满整个屏幕 */
  height: 100vh;
  /* 当侧边栏宽度变化时，平滑过渡，过渡时间为0.3秒 */
  transition: width 0.3s ease;
}

/* 侧边栏标题样式 - "通用后台管理系统"或"后台"的文字 */
.aside-title {
  /* 文字颜色设为白色 */
  color: #ffffff;
  /* 文字水平居中 */
  text-align: center;
  /* line-height 用来设置行高，这里设为48px，可以使文字在48px高度内垂直居中 */
  line-height: 48px;
  /* 设置字体大小为16px */
  font-size: 16px;
  /* font-weight: 400 表示字体粗细为正常（400 = normal） */
  font-weight: 400;
  /* 外边距设为0，消除默认的 h3 标签边距 */
  margin: 0;
  /* 设置上下内边距为20px，左右为0，使标题有适当的垂直间距 */
  padding: 20px 0;
  /* 当标题的透明度改变时，平滑过渡，过渡时间为0.2秒 */
  transition: opacity 0.2s ease;
}

/* 菜单列表样式 - 整个菜单的垂直排列容器 */
.el-menu-vertical {
  /* 移除右边框线（Element Plus 默认可能有边框） */
  border-right: none;
  /* 当菜单宽度变化时，平滑过渡，过渡时间为0.3秒 */
  transition: width 0.3s ease;
}

/* 菜单项和子菜单标题的共同样式 */
.el-menu-item,
:deep(.el-sub-menu__title) {
  /* 设置菜单项的高度为56px */
  height: 56px;
  /* 设置行高也为56px，使菜单项内的文字垂直居中在56px的高度内 */
  line-height: 56px;
  /* 当菜单项的任何属性改变时，平滑过渡，过渡时间为0.3秒 */
  transition: all 0.3s ease;
}

/* 菜单项和子菜单标题内的图标样式 */
.el-menu-item .el-icon,
:deep(.el-sub-menu__title .el-icon) {
  /* 设置图标的大小为18px */
  font-size: 18px;
  /* 设置图标右侧的外边距为8px，使图标与文字之间有适当间距 */
  margin-right: 8px;
  /* 当图标的外边距改变时，平滑过渡，过渡时间为0.3秒 */
  transition: margin 0.3s ease;
}

/* 菜单项和子菜单标题内的文字样式 */
.el-menu-item span,
:deep(.el-sub-menu__title span) {
  /* 当文字的透明度改变时，平滑过渡，过渡时间为0.2秒（例如侧边栏折叠时文字可能淡出） */
  transition: opacity 0.2s ease;
}
</style>
