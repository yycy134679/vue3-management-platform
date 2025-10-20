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

      <!-- 折线图 -->
      <el-card shadow="hover" class="chart-card">
        <div class="chart-header">
          <h3 class="chart-title">品牌订单统计</h3>
        </div>
        <div ref="orderChartRef" class="chart-container"></div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance, nextTick } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import * as echarts from 'echarts'

// 数据

const { proxy } = getCurrentInstance()

// 表格数据
const tableData = ref([])
const countData = ref([])
const orderChartRef = ref(null)
let orderChart = null

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

// 初始化折线图
const initOrderChart = async () => {
  const chartData = await proxy.$api.home.getChartData()
  console.log('获取到的图表数据:', chartData) // 调试日志

  await nextTick()

  if (!orderChartRef.value) return

  // 销毁旧的图表实例
  if (orderChart) {
    orderChart.dispose()
  }

  // 创建新的图表实例
  orderChart = echarts.init(orderChartRef.value)

  const { date, data } = chartData.orderData

  // 获取所有品牌名称
  const brands = Object.keys(data[0])

  // 生成系列数据
  const series = brands.map((brand) => ({
    name: brand,
    type: 'line',
    smooth: false, // 使用折线而不是平滑曲线
    data: data.map((item) => item[brand]),
  }))

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985',
        },
      },
      // 自定义 tooltip 显示内容
      formatter: (params) => {
        const dateIndex = params[0].dataIndex
        let html = `<div style="font-weight: 600; margin-bottom: 8px;">${date[dateIndex]}</div>`
        params.forEach((param) => {
          html += `
            <div style="display: flex; align-items: center; margin: 4px 0;">
              <span style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background-color: ${param.color}; margin-right: 8px;"></span>
              <span style="flex: 1;">${param.seriesName}:</span>
              <span style="font-weight: 600; margin-left: 20px;">${param.value}</span>
            </div>
          `
        })
        return html
      },
    },
    legend: {
      data: brands,
      top: 0, // 品牌标签放在头部
      textStyle: {
        fontSize: 13,
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '50px', // 为头部标签留出空间
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: date,
      axisLabel: {
        fontSize: 12,
        color: '#606266',
      },
      axisLine: {
        lineStyle: {
          color: '#e4e7ed',
        },
      },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        fontSize: 12,
        color: '#606266',
      },
      splitLine: {
        lineStyle: {
          color: '#e4e7ed',
          type: 'dashed',
        },
      },
    },
    series: series,
  }

  orderChart.setOption(option)

  // 响应式调整
  window.addEventListener('resize', () => {
    orderChart?.resize()
  })
}

onMounted(() => {
  getTableData()
  getCountData()
  initOrderChart()
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
      width: calc(33.33% - 14px); // 每行3个卡片,减去间距
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

  /* 折线图卡片 */
  .chart-card {
    margin-top: 20px;
    transition: all 0.3s ease;
    height: 280px; // 整个卡片高度280px

    &:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    /* 卡片内容区域 */
    :deep(.el-card__body) {
      height: 100%;
      display: flex;
      flex-direction: column;
      padding: 20px;
    }

    /* 图表标题区域 */
    .chart-header {
      margin-bottom: 12px;
      padding-bottom: 10px;
      border-bottom: 2px solid #e4e7ed;
      flex-shrink: 0; // 防止标题区域被压缩
    }

    /* 图表标题文字 */
    .chart-title {
      margin: 0;
      font-size: 16px;
      font-weight: 600;
      color: #303133;
    }

    /* 图表容器 */
    .chart-container {
      width: 100%;
      flex: 1; // 自动填充剩余空间
      min-height: 0; // 确保能够正确缩小
    }
  }
}
</style>
