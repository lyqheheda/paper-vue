<template>
    <div>
      <el-container>
      <el-header>
        <img class="mlogo" src="../assets/myLogo.gif" alt="">
      </el-header>
      <el-main>
<el-form :model="registerForm" :rules="rules" ref="registerForm" label-width="100px" class="demo-ruleForm">
  
  <el-form-item label="user type" prop="rname">
    <el-select v-model="registerForm.rname" placeholder="please select">
      <!-- A代表作者 -->
      <el-option label="author" value="A"></el-option> 
<!-- B代表审稿人 -->
      <el-option label="reviewer" value="B"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="Author id"  prop="aut_id" v-if="registerForm.rname==='A'">
    <el-input v-model="registerForm.aut_id"></el-input>
  </el-form-item>
  <el-form-item label="user name" prop="uname">
    <el-input v-model="registerForm.uname"></el-input>
  </el-form-item>
  <el-form-item label="password" prop="password">
    <el-input v-model="registerForm.password"></el-input>
  </el-form-item>
  <el-form-item label="firstname" prop="firstname">
    <el-input v-model="registerForm.firstname"></el-input>
  </el-form-item>
  <el-form-item label="lastname" prop="lastname">
    <el-input v-model="registerForm.lastname"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('registerForm')">立即创建</el-button>
    <el-button @click="resetForm('registerForm')">重置</el-button>
  </el-form-item>
</el-form>
</el-main>
    </el-container>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        registerForm: {
          // aut_id: '',
          uname:'',
          password:'',
          rname: '', //权限名称，A代表作者,B审稿人
          firstname:'',
          lastname:'',
          
        },
        rules: {
          rname: [
            { required: true, message: 'Please select', trigger: 'blur' },
          ],
          aut_id:[
            { required: true, message: 'Please enter', trigger: 'blur' },
          ],
           uname: [
           { required: true, message: 'Please enter', trigger: 'blur' },
          ],
          password: [
            { required: true, message: 'Please enter', trigger: 'blur' },
          ],
          firstname:[
            { required: true, message: 'Please enter', trigger: 'blur' },
          ],
          lastname:[
            { required: true, message: 'Please enter', trigger: 'blur' },
          ],
          
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
            const _this = this
            this.$axios.post('/register', this.registerForm).then(res => {
            
            if(res.data.code===100){//这里接受的对不对？
              _this.$router.push("/blogs")

            }
            else {
              //注册失败显示原因
              alert(res.data.data)
            }





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

    .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .demo-ruleForm {
    max-width: 500px;
    margin: 0 auto;
  }
</style>