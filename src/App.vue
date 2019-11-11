<template>
  <el-container id="indexPage">
    <el-header style="height: 30vh;padding: 25vh 0 0 0;">
      <h1>
        Element ui test
      </h1>
    </el-header>
    <el-main>
      <el-row type="flex" justify="center">
        <el-col :span="10">
          <el-form @submit.native.prevent="submitForm" :model="userForm" status-icon ref="userForm">
            <el-form-item prop="username">
              <el-input v-model="userForm.username" auto-complete="on" placeholder="用户名/手机/邮箱" clearable></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" v-model="userForm.password" auto-complete="off" placeholder="密码" clearable></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" native-type="submit">提交</el-button>
              <el-button @click="resetForm('userForm')">重置</el-button>
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
      this.$router.push('/home')
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
  .el-form {
    border: 1px solid #DCDFE6;
    border-radius: 5px;
    padding: 2vh;
  }
</style>
