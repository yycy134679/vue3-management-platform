<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8" style="margin-top: 20px">
      <!-- 用户信息卡片 -->
      <el-card class="user-card">
        <div class="user">
          <img :src="getImageUrl('user')" class="user-avatar" />
          <div class="user-info">
            <p class="user-name">admin</p>
            <p class="user-role">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p class="login-info__item">
            <span class="login-info__label">上次登录时间:</span>
            <span class="login-info__value">2024-06-30</span>
          </p>
          <p class="login-info__item">
            <span class="login-info__label">上次登录地点:</span>
            <span class="login-info__value">北京</span>
          </p>
        </div>
      </el-card>

      <!-- 表格 -->
      <el-card shadow="hover" class="user-table">
        <div class="table-header">
          <h3 class="table-title">课程购买统计</h3>
        </div>
        <div class="table-wrapper">
          <el-table
            :data="tableData"
            stripe
            :header-cell-style="headerCellStyle"
            style="width: 100%"
          >
            <el-table-column
              v-for="(val, key) in tableLabel"
              :key="key"
              :label="val"
              :prop="key"
              align="center"
            ></el-table-column>
          </el-table>
        </div>
      </el-card>
    </el-col>

    <!-- 右侧统计卡片区域 -->
    <el-col :span="16" style="margin-top: 20px">
      <div class="count-data">
        <el-card
          v-for="item in countData"
          :key="item.name"
          :body-style="{ display: 'flex', padding: 0 }"
          class="count-card"
        >
          <component :is="item.icon" class="count-icon" :style="{ backgroundColor: item.color }" />
          <div class="count-detail">
            <div class="count-value">¥ {{ item.value }}</div>
            <div class="count-name">{{ item.name }}</div>
          </div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 数据

const { proxy } = getCurrentInstance()

// 表格数据
const tableData = ref([])
const countData = ref([])

// 表格列标签
const tableLabel = ref({
  name: '课程',
  todayBuy: '今日购买',
  monthBuy: '本月购买',
  totalBuy: '总购买',
})

// 表头样式
const headerCellStyle = {
  backgroundColor: '#f5f7fa',
  color: '#303133',
  fontWeight: '600',
  fontSize: '14px',
}

// 方法

// 获取图片路径
const getImageUrl = (user) => {
  return new URL(`../assets/images/${user}.png`, import.meta.url).href
}

const getTableData = async () => {
  const data = await proxy.$api.home.getTableData()
  console.log('获取到的表格数据:', data) // 调试日志
  tableData.value = data.tableData || data
}

const getCountData = async () => {
  const data = await proxy.$api.home.getCountData()
  console.log('获取到的统计数据:', data) // 调试日志
  countData.value = data
}

onMounted(() => {
  getTableData()
  getCountData()
})
</script>

<style scoped lang="less">
/* 首页容器样式 */
.home {
  height: 100%;
  overflow: hidden;

  /* 用户信息卡片 */
  .user-card {
    transition: all 0.3s ease; // 平滑过渡效果

    &:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); // 悬停时增强阴影
    }
  }

  /* 用户信息区域 */
  .user {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #e8e8e8; // 底部分隔线
    margin-bottom: 20px;
    padding-bottom: 20px;

    /* 用户头像 */
    &-avatar {
      width: 150px;
      height: 150px;
      border-radius: 50%; // 圆形头像
      margin-right: 40px;
      border: 3px solid #f0f0f0; // 头像边框
      transition: transform 0.3s ease;

      &:hover {
        transform: scale(1.05); // 悬停时放大效果
      }
    }

    /* 用户信息文字区域 */
    &-info {
      flex: 1;
    }

    /* 用户名称 */
    &-name {
      font-size: 24px;
      font-weight: 600;
      color: #303133;
      margin: 0 0 12px 0;
    }

    /* 用户角色标签 */
    &-role {
      font-size: 14px;
      color: #909399;
      margin: 0;
      padding: 4px 12px;
      background-color: #f4f4f5; // 浅灰背景
      border-radius: 4px; // 圆角标签
      display: inline-block;
    }
  }

  /* 登录信息区域 */
  .login-info {
    /* 每一项登录信息 */
    &__item {
      margin: 0 0 12px 0;
      font-size: 14px;
      line-height: 1.8;

      &:last-child {
        margin-bottom: 0; // 最后一项无底部边距
      }
    }

    /* 信息标签（如"上次登录时间:"） */
    &__label {
      color: #606266;
      margin-right: 8px;
    }

    /* 信息值（如"2024-06-30"） */
    &__value {
      color: #409eff; // Element Plus 主题蓝色
      font-weight: 500;
    }
  }

  /* 课程购买统计表格 */
  .user-table {
    margin-top: 20px;

    /* 表格标题区域 */
    .table-header {
      margin-bottom: 16px;
      padding-bottom: 12px;
      border-bottom: 2px solid #e4e7ed; // 标题下方分隔线
    }

    /* 表格标题文字 */
    .table-title {
      margin: 0;
      font-size: 16px;
      font-weight: 600;
      color: #303133;
    }

    /* 表格滚动容器 */
    .table-wrapper {
      max-height: 300px;
      overflow-y: auto;
      overflow-x: hidden;

      /* 滚动条样式优化 */
      &::-webkit-scrollbar {
        width: 6px;
      }

      &::-webkit-scrollbar-thumb {
        background-color: #dcdfe6;
        border-radius: 3px;

        &:hover {
          background-color: #c0c4cc;
        }
      }

      &::-webkit-scrollbar-track {
        background-color: #f5f7fa;
      }
    }

    /* 深度选择器：修改 Element Plus 表格内部样式 */
    :deep(.el-table) {
      font-size: 14px;

      /* 表头单元格 */
      .el-table__header th {
        padding: 12px 0;
      }

      /* 表格数据行 */
      .el-table__row {
        transition: all 0.3s ease; // 平滑过渡

        &:hover {
          background-color: #f5f7fa !important; // 悬停时背景色
        }

        /* 数据单元格 */
        td {
          padding: 16px 0; // 增加单元格内边距
        }
      }

      /* 斑马纹：奇偶行交替背景色 */
      .el-table__body tr.el-table__row--striped td {
        background-color: #fafafa;
      }
    }
  }

  /* 右侧统计卡片区域 */
  .count-data {
    display: flex;
    flex-wrap: wrap;
    gap: 20px; // 卡片之间的间距

    /* 单个统计卡片 */
    .count-card {
      width: calc(33.33% - 14px); // 每行3个卡片，减去间距
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }

      /* 卡片内容区域 */
      :deep(.el-card__body) {
        display: flex;
        align-items: center;
        padding: 0;
      }

      /* 统计图标 */
      .count-icon {
        width: 80px;
        height: 80px;
        font-size: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
      }

      /* 统计详情 */
      .count-detail {
        flex: 1;
        padding: 0 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;

        /* 数值 */
        .count-value {
          font-size: 24px;
          font-weight: 600;
          color: #303133;
          margin-bottom: 8px;
        }

        /* 名称 */
        .count-name {
          font-size: 13px;
          color: #909399;
        }
      }
    }
  }
}
</style>
