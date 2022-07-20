vue3
<template>
  <div class="header">
    <div class="left">
      <el-icon class="logo"><ElemeFilled /></el-icon>
      <span>积云编程</span>
      <i class="icon" @click="setisCollapse">
        <el-icon class="collapse" v-if="isCollapse"><Expand /></el-icon>
        <el-icon class="collapse" v-else><Fold /></el-icon>
      </i>
      <i class="icon" @click="refresh">
        <el-tooltip content="刷新">
          <el-icon><Refresh /></el-icon>
        </el-tooltip>
      </i>
    </div>
    <div class="right">
      <i class="right-icon" @click="fullScreen">
        <el-tooltip content="全屏">
          <el-icon class="collapse fullscreen"><FullScreen /></el-icon>
        </el-tooltip>
      </i>
      <el-avatar class="img" />
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          {{ userInfo.username }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="handleChange">修改密码</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'
import { ArrowDown } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { ElNotification, ElMessageBox } from 'element-plus'
import screenfull from 'screenfull'
const router = useRouter()
const store = useStore()
const userInfo = computed(() => {
  return store.getters.userInfo
})
const isCollapse = computed(() => {
  return store.getters.isCollapse
})
const handleCommand = (command) => {
  switch (command) {
    case 'home':
      handleChange()
      break
    case 'logout':
      handleLogout()
      break
  }
}
const handleChange = () => {
  console.log(22)
}

// 退出
const handleLogout = () => {
  ElMessageBox.confirm('是否要退出登录？', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    try {
      await store.dispatch('user/logout')
      router.push('/login')
      ElNotification({
        message: '退出登录成功',
        type: 'success'
      })
    } catch (error) {
      console.log(error)
    }
  })
}
// 菜单栏收缩
const setisCollapse = () => {
  store.commit('user/setCollapse')
}
// 刷新
const refresh = () => {
  location.reload()
}
// 全屏
const fullScreen = () => {
  if (screenfull.isEnabled) {
    screenfull.toggle()
  }
  <el-icon class="collapse fullscreen"><FullScreen /></el-icon>
}
</script>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  .left {
    color: #fff;
    display: inline-block;
    justify-items: center;
    width: 350px;
    height: 64px;
    line-height: 64px;
    span {
      font-size: 20px;
      font-weight: 100;
      margin: 0 60px 0 5px;
    }
    .logo {
      margin-left: 60px;
    }
    .icon {
      display: inline-block;
      height: 100%;
      width: 40px;
      text-align: center;
    }
    .icon:hover {
      background-color: rgba($color: #ffffff, $alpha: 0.1);
    }
  }
  .right {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 64px;
    color: #fff;
    .el-dropdown-link {
      color: #fff;
    }
    .img {
      margin: 0 10px;
    }
  }
  .right-icon {
    display: inline-block;
    height: 100%;
    width: 40px;
    line-height: 64px;
    text-align: center;
    &:hover {
      background-color: rgba($color: #ffffff, $alpha: 0.1);
    }
  }
}
</style>
