<script setup>
const getImageUrl = (user) => {
  return new URL(`../assets/images/${user}.png`, import.meta.url).href
}
</script>

<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8" style="margin-top: 20px">
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
    </el-col>
  </el-row>
</template>

<style scoped lang="less">
.home {
  height: 100%;
  overflow: hidden;

  .user-card {
    transition: all 0.3s ease;

    &:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
  }

  .user {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #e8e8e8;
    margin-bottom: 20px;
    padding-bottom: 20px;

    &-avatar {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      margin-right: 40px;
      border: 3px solid #f0f0f0;
      transition: transform 0.3s ease;

      &:hover {
        transform: scale(1.05);
      }
    }

    &-info {
      flex: 1;
    }

    &-name {
      font-size: 24px;
      font-weight: 600;
      color: #303133;
      margin: 0 0 12px 0;
    }

    &-role {
      font-size: 14px;
      color: #909399;
      margin: 0;
      padding: 4px 12px;
      background-color: #f4f4f5;
      border-radius: 4px;
      display: inline-block;
    }
  }

  .login-info {
    &__item {
      margin: 0 0 12px 0;
      font-size: 14px;
      line-height: 1.8;

      &:last-child {
        margin-bottom: 0;
      }
    }

    &__label {
      color: #606266;
      margin-right: 8px;
    }

    &__value {
      color: #409eff;
      font-weight: 500;
    }
  }
}
</style>
