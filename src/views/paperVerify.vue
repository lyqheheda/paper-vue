<template>
<div>
    <Header :showLogin="true"></Header>
    <h1>
        Verify your paper
    </h1>
    <el-divider></el-divider>
    <div class='upload-demo'>
    <el-upload  
                action="/paperVerify"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :on-success="handle_success"
                accept=".pdf"
                drag
                :limit="1">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">Drag file here or <em>Click to upload</em></div>
              <div slot="tip" class="el-upload__tip">Only one PDF file is acceptable, the maximum size is 10MB </div>
            </el-upload>
    </div>

    <el-divider></el-divider>
    <h2>{{msg}}</h2>
</div>


</template>
<script>
import Header from "../components/Header_new";

export default {
  components: { Header },
    data(){
        return{
             msg:''
        }
    },
    methods:{
             
   
    handleRemove(file) {
      return this.$confirm(`Remove success`);
    },
    handlePreview(file) {
      console.log(file);
      // preview after uploading


      // window.open(file.paper)
    },
    handle_success(res) {
      console.log(res)
       this.msg=res.msg
      

      return this.$confirm(`upload success`);
    }
  },
    
}
</script>
<style>
.upload-demo{
    margin:  auto ;
}
</style>