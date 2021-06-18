<template>
  <div class="container">
    <canvas id="lines" width="526" height="625"></canvas>
    <div class="form-container">
      <div class="title">Lists Management System</div>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-position="left"
        label-width="50px"
        class="ruleForm"
        size="medium"
      >
        <el-form-item label="账号" prop="username">
          <el-input
            type="text"
            v-model="ruleForm.username"
            autocomplete="off"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="ruleForm.password"
            show-password
            autocomplete="off"
            @keydown.native.enter="enter"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input
            type="text"
            v-model="ruleForm.nickname"
            autocomplete="off"
            @keydown.native.enter="enter"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
          <el-button @click="$router.push('/')">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import startAnimation from 'assets/js/login'
import { registerRequest } from 'api/request'

export default {
  name: 'Register',
  mounted() {
    startAnimation() // 开启动画
  },
  data() {
    // 校验账号
    const validateAccount = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账号'));
      } else {
        callback();
      }
    };
    // 检验密码
    const validatePwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    // 检验昵称
    const validateNick = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入昵称'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: { // 表单信息
        username: '',
        password: '',
        nickname: '',
      },
      rules: { // 校验规则
        username: [
          { validator: validateAccount, trigger: 'blur' }, // 失去焦点触发校验函数
        ],
        password: [
          { validator: validatePwd, trigger: 'blur' },
        ],
        nickname: [
          { validator: validateNick, trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) { // 提交表单时触发
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          // 发送post请求
          const temp = JSON.parse(JSON.stringify(this.ruleForm)) // 深拷贝，防止地址共用
          const res = await registerRequest(temp) // 使用封装的api请求
          console.log(res);
          if (!res.errno) { // 如果状态码为0，表示获取成功
            this.$msgSuccess('注册成功！')
            this.$router.push('/login')
          } else {
            this.$msgError('用户名已存在！')
          }
        } else {
          return false;
        }
        return null
      });
    },
    register() {
      console.log(111)
    },
    enter() { // 密码框回车登录
      this.submitForm('ruleForm')
    },
  },
}
</script>

<style lang="scss" scoped>
// canvas 样式
body {
  font-size: 18px;
  color: hsla(210deg, 100%, 100%, 1);
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
h1 {
  text-transform: uppercase;
  letter-spacing: 1.5em;
  font-size: clamp(1em, 5vw, 4em);
  animation: breath 10000ms ease-in-out infinite alternate;
}
h1 > .last {
  letter-spacing: 0;
}
@keyframes breath {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.1);
  }
}
canvas {
  position: absolute;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  background-color: hsla(240deg, 20%, 20%, 1);
}

// 表单样式
$border: 1px solid white;
.form-container {
  width: 30%;
  height: 250px;
  padding: 20px;
  border: $border;
  border-radius: 10px;
  position: absolute; // 使登录表单垂直水平居中
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  .title {
    color: #fff;
    font-size: 20px;
    text-align: center;
    padding-bottom: 20px;
    font-family: 'xindi';
  }
}
</style>
