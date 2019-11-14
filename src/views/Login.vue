<template>
  <el-container id="indexPage">
    <el-header style="height: 30vh;line-height: 17vh;background-color: rgba(255,255,255,0);padding: 13vh 0 0 0;">
      <h1>
        Element ui login
      </h1>
    </el-header>
    <el-main style="padding: 0;">
      <el-row type="flex" justify="center">
        <el-col :span="10">
          <el-form @submit.native.prevent="submitForm" :model="userForm" status-icon ref="userForm">
            <el-form-item prop="username">
              <el-input v-model="userForm.username" auto-complete="on" placeholder="用户名/手机/邮箱" clearable></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" v-model="userForm.password" auto-complete="off" placeholder="密码" clearable></el-input>
            </el-form-item>
            <el-form-item style="text-align: right;margin-bottom: 0;">
              <el-button type="text" size="mini">忘记密码</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" native-type="submit">登录</el-button>
              <el-button @click="resetForm('userForm')">重置</el-button>
            </el-form-item>
            <el-form-item style="text-align: left;margin-bottom: 0;">
              <el-button type="text" size="mini" @click="goRegister">注册账号</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      userForm: {}
    };
  },
  methods: {
    submitForm() {
      // 校验用户信息
      this.$http.post('/login', this.userForm).then(res => {
        console.log(res.data)
        this.$message({
            message: res.data.user.username + '用户登录成功',
            type: 'success'
          });
          // 成功、失败及提交时验证 TODO
          // this.$router.push('/login')
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    goRegister() {
      this.$router.push('/Register')
    }
  }
}
</script>

<style>
  .el-container {
    padding: 0;
    margin: 0;
  }
  #indexPage {
    text-align: center;
  }
  h1 {
    margin: 0;
  }
  .el-form {
    border: 1px solid #DCDFE6;
    border-radius: 5px;
    padding: 2vh;
  }
</style>
