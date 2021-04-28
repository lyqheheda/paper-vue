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
  <!-- list of university -->
   <el-form-item label="university" prop="searchWords">
    <el-select v-model="registerForm.searchWords" placeholder="please select" @change='getUniversityID'>
  
      <el-option label="LUC" value="LUC"></el-option> 
      <el-option label="BJTU" value="BJTU"></el-option>
      <el-option label="RIT" value="RIT"></el-option>
      <el-option label="PKU" value="PKU"></el-option>
      <el-option label="NKU" value="NKU"></el-option>
      <el-option label="BIT" value="BIT"></el-option>


    </el-select>
  </el-form-item> 
  <!-- {{this.registerForm.universityID}} -->
<!-- list of institute -->
  <el-form-item label="institute" prop="institute" >
    <el-select v-model="registerForm.institute" placeholder="please select" @change='getInstituteID' :disabled='disabled'>
      <el-option label="Computer" value="Computer"></el-option> 
      <el-option label="Communication" value="Communication"></el-option>
      <el-option label="Environment" value="Environment"></el-option>   
    </el-select>
  </el-form-item>
   <!-- {{this.registerForm.instituteID}} -->
  <!-- <el-form-item label="Author id"  prop="aut_id" v-if="registerForm.rname==='A'">
    <el-input v-model="registerForm.aut_id"></el-input>
  </el-form-item> -->
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
  <el-form-item label="email" prop="email">
    <el-input v-model="registerForm.email"></el-input>
  </el-form-item>
  <el-form-item label="tel" prop="tel">
    <el-input v-model="registerForm.tel"></el-input>
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
          searchWords:'',//name of university
          institute:'',//name of institude
          email:'',
          tel:'',
          universityID:undefined,
          instituteID:undefined,

          
        },
        disabled:true,
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
           searchWords:[
            { required: true, message: 'Please enter', trigger: 'blur' },
          ],
          institute:[
            { required: true, message: 'Please enter', trigger: 'blur' },
          ],
           email:[
            { required: true, message: 'Please enter', trigger: 'blur' },
          ],
          tel:[
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
            this.$axios.post('/register', this.registerForm).then(res => { //这里是发送表单到后端
            
            if(res.data.code===400){//这里接受的对不对？
            alert('submit successfully!')
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
      getUniversityID() {
        const _this = this
        this.$axios.get("/register/uni", {
          params:{
            searchWords:_this.registerForm.searchWords
          }
          }
        ).then(res => {
          console.log('====getUniversityID()res ')
          console.log(res.data)
          console.log('===')
          _this.registerForm.universityID=res.data.data
          // console.log(_this.registerForm.universityID)
          _this.disabled=false
        })
      },
      getInstituteID() {
        const _this = this
        this.$axios.get("/register/ins", {
          params:{
            institute:_this.registerForm.institute,
            universityID:_this.registerForm.universityID
          }
          }
        ).then(res => {
          _this.registerForm.instituteID=res.data.data
          console.log(_this.registerForm.instituteID)

        })
      },

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