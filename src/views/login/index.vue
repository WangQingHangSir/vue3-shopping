<template>
  <div class="login">
    <div class="left">欢迎光临</div>
    <div class="right">
      <div class="main-right">
        <h1>欢迎回来</h1>
        <div class="login">
          <span class="line"></span>
          <span>账号密码登录</span>
          <span class="line"></span>
        </div>
        <!-- form表单 -->
        <div class="form">
          <el-form
            ref="LoginForm"
            :model="loginForm"
            :rules="loginFormRules"
            class="demo-ruleForm"
          >
            <el-form-item prop="username">
              <el-input
                v-model="loginForm.username"
                autocomplete="off"
                placeholder="请输入用户名"
                :prefix-icon="User"
              />
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="loginForm.password"
                 show-password
                type="password"
                autocomplete="off"
                :prefix-icon="Lock"
                placeholder="请输入密码"
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleLoginSubmit"
                >登录</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { ElNotification } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const store = useStore()
const LoginForm = ref('')
const loginForm = reactive({
  username: 'admin',
  password: 'admin'
})

const loginFormRules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}

const handleLoginSubmit = () => {
  LoginForm.value.validate(async (valid) => {
    if (!valid) return
    const token = await store.dispatch('user/login', loginForm)
    if (!token) return
    ElNotification({
      message: '登陆成功',
      type: 'success'
    })
    router.push('/')
  })
}
</script>

<style scoped lang="scss">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  .left {
    height: 100vh;
    width: 70vw;
    background-color: #6366f1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 50px;
    font-weight: 700;
    color: #fff;
  }
  .right {
    width: 30vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    .main-right {
      height: 540px;
      width: 400px;
      text-align: center;
      span {
        color: #d1d5db;
      }
      .line {
        display: inline-block;
        width: 100px;
        height: 1px;
        background-color: #d1d5db;
        margin: 5px;
      }
    }
  }
}
.el-button {
  width: 100%;
  border-radius: 20px;
  background-color: #626aef;
}
.login {
  margin-bottom: 30px;
}
</style>
