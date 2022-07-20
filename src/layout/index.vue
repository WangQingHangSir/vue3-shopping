<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-container>
        <el-aside :width="isCollapse ? '64px' : '250px'">
          <Aside></Aside>
        </el-aside>
        <el-main :style="{ marginLeft: isCollapse ? '64px' : '250px' }">
          <Main></Main>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import Aside from './Aside'
import Header from './Header'
import Main from './Main'
import { computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const isCollapse = computed(() => {
  return store.getters.isCollapse
})
// console.log(isCollapse)
</script>

<style scoped lang="scss">
.common-layout {
  width: 100vw;
  height: 100vh;
}
.el-header {
  width: 100%;
  height: 64px;
  background-color: #4338ca;
  padding: 0;
  position: fixed;
  top: 0;
  left: 0;
}
.el-aside {
  background-color: #fdfdfd;
  margin-top: 64px;
  position: fixed;
  left: 0;
  top: 0;
  height: calc(100vh - 64px);
}
.el-main {
  background-color: #f3f4f6;
   width: calc(100vh - 250px);
  height: calc(100vh - 64px);
  margin-top: 64px;
  padding-top: 0;
}
</style>
