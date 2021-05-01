<template>
<!-- 
  Author: Lin Yunqi
  This component refers to the login page of the website.
  It collects the username and password, send them to backend and store information obtained from backend
  It also support form validation to prevent blank submit
 -->
  <div>
    <!-- <Header :showLogin='false' ></Header> -->

    <el-container>
      <el-header>
        <img class="mlogo" src="../assets/myLogo.gif" alt="">
      </el-header>
      <el-main>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="username" prop="username">
            <el-input v-model="ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item label="password" prop="password">
            <el-input type="password" v-model="ruleForm.password"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">Login</el-button>
            <el-button @click="resetForm('ruleForm')">Reset</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>

  </div>
</template>

<script>
  import Header from "../components/Header_new";

  export default {
    name: "Login",
    components: {Header},
    data() {
      return {
        ruleForm: {
          username: 'user10001',
          password: 'user10001'
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请选择密码', trigger: 'change' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const _this = this
            this.$axios.post('/login', this.ruleForm).then(res => {

              console.log('登录成功======')
              console.log(res.data)
              console.log('res.headers: ')
              console.log(res.headers)
              console.log('======')
              const jwt = res.headers['authorization']
              const userInfo = res.data.data   

              // share the data retrived from backend
              _this.$store.commit("SET_TOKEN", jwt)
              _this.$store.commit("SET_USERINFO", userInfo)

              
              console.log('已存储的用户信息：')
              console.log(_this.$store.getters.getUser)

              _this.$router.push("/papers")
            },
            res=>{
              console.log('登陆失败')
              console.log(res)
            })

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    /*background-color: #E9EEF3;*/
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

  .mlogo {
    height: 60%;
    margin-top: 10px;
  }

  .demo-ruleForm {
    max-width: 500px;
    margin: 0 auto;
  }

</style>
