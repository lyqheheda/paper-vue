<template>
<div>
    test
<!--  <el-button type="primary" size="mini" @click="centerDialogVisible = true">添加歌曲</el-button>-->

<!--  &lt;!&ndash;添加歌曲&ndash;&gt;-->
<!--  <el-dialog title="添加歌曲" :visible.sync="centerDialogVisible" width="400px" center>-->
<!--    <el-form action="" :model="registerForm" id="tf">-->

<!--      <div>-->
<!--        <label>歌曲上传</label>-->
<!--        <br>-->
<!--        <input type="file" name="file" id="upadte-file-input" accept="application/pdf">-->
<!--      </div>-->
<!--    </el-form>-->
<!--    <span slot="footer" class="dialog-footer">-->
<!--        <el-button @click="centerDialogVisible = false">取 消</el-button>-->
<!--        <el-button type="primary" @click="addSong">确 定</el-button>-->
<!--      </span>-->
<!--  </el-dialog>-->


  <input id="inputElement" name="file" type="file" accept="application/pdf"  />
  <button @click="upload">上传</button>


</div>

</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      file: null
    };
  },
  methods: {
    upload() {

      let inputElement = document.getElementById("inputElement")
      let file = inputElement.files[0];

      let param = new FormData(); // 创建form对象
      param.append("file", file); // 通过append向form对象添加数据

      param.append("chunk", "别的数据"); // 添加form表单中其他数据
      console.log(param.get("file")); // FormData私有类对象，访问不到，可以通过get判断值是否传进去

      let config = {
        headers: { "Content-Type": "multipart/form-data" }
      };

      axios.post("http://192.168.31.253:8080/upload", param, config);
    }
  }
};
</script>
