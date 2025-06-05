<template>
  <div class="login_body">
    <div class="bg" />
    <div class="box">
      <div class="title">智慧园区-登录</div>
      <el-form ref="ruleForm" :model="LoginForm" :rules="rules">
        <el-form-item label="账号" prop="username">
          <el-input v-model="LoginForm.username" />
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input v-model="LoginForm.password" show-password />
        </el-form-item>

        <el-form-item prop="remember">
          <el-checkbox v-model="rememberMe">记住我</el-checkbox>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            class="login_btn"
            @click="submitForm('ruleForm')"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { FORM_KEY } from "@/constants/KEY";
export default {
  name: "Login",
  data() {
    return {
      rememberMe: true,
      LoginForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    const loginData = localStorage.getItem(FORM_KEY);
    if (loginData) {
      const { username, password } = JSON.parse(loginData);
      (this.LoginForm.username = username),
        (this.LoginForm.password = password);
    }
  },
  methods: {
    submitForm() {
      this.$refs.ruleForm.validate(async (flag) => {
        if (!flag) return;
        // const res = await loginAPI(this.LoginForm);
        // this.$store.commit("user/setToken", res.data.token);
        await this.$store.dispatch("user/loginAction", this.LoginForm);
        if (this.rememberMe) {
          localStorage.setItem(FORM_KEY, JSON.stringify(this.LoginForm));
        } else {
          localStorage.removeItem(FORM_KEY);
        }
        //实现哪个页面退出的，登陆时自动到哪个页面。

        if (this.$route.query.redirect) {
          this.$router.push(this.$route.query.redirect);
        } else {
          this.$router.push("/");
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
.login_body {
  display: flex;
}
.bg {
  width: 60vw;
  height: 100vh;
  background: url("~@/assets/login-bg.svg") no-repeat;
  background-position: right top;
  background-size: cover;
}
.box {
  margin: 200px 10% 0;
  flex: 1;
  .title {
    padding-bottom: 76px;
    font-size: 26px;
    font-weight: 500;
    color: #1e2023;
  }
  ::v-deep() {
    .ant-form-item {
      display: flex;
      margin-bottom: 62px;
      flex-direction: column;
    }
    .ant-form-item-label label {
      font-size: 16px;
      color: #8b929d;
    }
    .ant-input,
    .ant-input-password {
      border-radius: 8px;
    }
  }
}
.login_btn {
  width: 100%;
}
</style>
