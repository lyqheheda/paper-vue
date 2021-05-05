<template>
<!--
  Author: Lin Yunqi, Shi ZhanCheng
  Lin's part: The form of the paper info
  Shi's part: upload pdf file
  This component provides code that can be used in both paper-add page and paper-edit page, in the latter one a GET request
  is automatically sent to backend to obtain pre-filled form when the paper is added
  Note that the code of AuthorAdd.vue is basically the same as AuthorEdit.vue, the only difference is that
  they have a different api to invoke when uploading the form to backend.
 -->
  <div>
    <Header :showLogin="true"></Header>
    <div>
      <el-container>
        <h2 style="font-family: 'Times New Roman'">
          Add Paper
        </h2>
      </el-container>
      <el-container>
        <el-main>
          <el-form :model="paperDetail" :rules="rules" ref="paperDetail" label-width="100px" class="demo-ruleForm">
        <el-form-item label="title" prop="pname">
          <el-input v-model="paperDetail.pname"></el-input>
        </el-form-item>
        <el-form-item label="abstract" prop="pabstract">
          <el-input type="textarea" v-model="paperDetail.pabstract"></el-input>
        </el-form-item>

         <el-form-item label="keyword" prop="keyword">
          <el-input type="textarea" v-model="paperDetail.keyword"></el-input>
        </el-form-item>

          <el-form-item label='category' prop='category'>
            <el-select v-model="paperDetail.category" filterable placeholder="select" style='margin-left: -830px;'>
    <el-option
      v-for="item in paperDetail.options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
          </el-form-item>
          <el-form-item label="#second author" prop="autid_two">
          <el-input v-model="paperDetail.autid_two"></el-input>
        </el-form-item>
        <el-form-item label="#third author" prop="autid_three">
          <el-input v-model="paperDetail.autid_three"></el-input>
        </el-form-item>

<!--            upload pdf paper file here-->
            <el-upload
                action="paperAdd"
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


        </el-form>


           </el-main>
        <el-footer>

          <el-button type="success" @click="submitForm('paperDetail')" :disabled='disabled'
            >Submit&nbsp;<i class="el-icon-star-off"></i
          ></el-button>
          <el-button type="danger" @click="resetForm('paperDetail')"
            >Reset&nbsp;<i class="el-icon-star-off"></i
          ></el-button>
        </el-footer>
      </el-container>

    </div>
  </div>
</template>

<script>
import Header from "../components/Header_new";

export default {
  components: { Header },

  data() {
    return {
      autid:undefined,
      disabled:true,
    paperDetail: {
      pname:'',
      pabstract:'',
      keyword:'',
      options:[{
          value: 'Deep leaning',
          label: 'Deep learning'
        }, {
          value: 'Artificial intelligence',
          label: 'Artificial intelligence'
        },{
          value:'Internet of things',
          label:'Internet of things'
        }
        ],
        category: '',
      file_url:'',

      autid_two:'',
      autid_three:'',
        },
         rules: {
          pname: [
            { required: true, message: 'Please select', trigger: 'blur' },
          ],
          pabstract:[
            { required: true, message: 'Please enter', trigger: 'blur' },
          ],
           keyword: [
           { required: true, message: 'Please enter', trigger: 'blur' },
          ],
          category: [
            { required: true, message: 'Please enter', trigger: 'blur' },
          ],
          autid_two:[
            { required: false, message: 'Please enter', trigger: 'blur' },
          ],
          autid_three:[
            { required: false, message: 'Please enter', trigger: 'blur' },
          ],

        },

      authorList: [
        {
          lastname: "Yunqi",
          firstname: "Lin",
        },
        {
          lastname: "Zhancheng",
          firstname: "Shi",
        },
      ],
      squareUrl:
        "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
      ownBlog: false,
      // open and close asider
      hasAside: true,
      asidePrompt: "<<",
      // preview online
      online_preview: false,
      online_preview_msg: "Preview ON ",
    };
  },
  methods: {
    closeAside() {
      this.asidePrompt = this.hasAside === true ? ">>" : "<<";
      this.hasAside = !this.hasAside;
    },
    onPreveiw() {
      this.online_preview_msg =
        this.online_preview === true ? "Preview ON " : "Preview OFF ";
      this.online_preview = !this.online_preview;
    },
    submitForm(formName) {
      console.log('=====')
      console.log(this.paperDetail)
      const form={
        autid:this.autid,
        pname:this.paperDetail.pname,
        pabstract:this.paperDetail.pabstract,
        keyword:this.paperDetail.keyword,
        file_url:this.paperDetail.file_url,
        autid_two:this.paperDetail.autid_two,
        autid_three:this.paperDetail.autid_three,
        category:this.paperDetail.category


      }
      // console.log(form)
      this.$refs[formName].validate((valid) => {
        if (valid) {

          const _this = this
          this.$axios.post('/author/paperAddDB', form).then(res => {

          // console.log('=====res.data.code')
            // console.log(res.data.code)
            alert('submit successfully!')

            _this.$router.push("/author")

          },
          res=>{
            console.log('???')
            alert('submit successfully!')
            _this.$router.push("/author")

          })

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
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
      console.log(res.paper)
      this.paperDetail.file_url=res.paper
      console.log('===')
      console.log(this.paperDetail.file_url)
      this.disabled=false

      return this.$confirm(`upload success`);
    }
  },


  // Author: Lin Yunqi
  // This method is used to obtain several parameters in the url and load pre-filled info of the form
  created() {


    this.autid = this.$store.getters.getUser.aut_id

    const pap_id=this.$route.query.pap_id;

      if(pap_id){
  const _this = this;
    this.$axios
      .get("/paperDetail", {params:{ paperId: pap_id }})
      .then(
        (res) => {
          console.log("=====");
          console.log(res.data.data);
          console.log("=====");

          _this.paperDetail.pname=res.data.data.paperDetail.pname
          _this.paperDetail.pabstract=res.data.data.paperDetail.pabstract
          _this.paperDetail.keyword=res.data.data.paperDetail.keyword
          _this.paperDetail.category=res.data.data.paperDetail.category
          console.log('_this.authorList')


          console.log(_this.authorList)


        },
        (res) => {
          console.log("get失败");
        }
      );
      }



  },
};
</script>


<style scoped>
.pveiw {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  min-height: 700px;
  margin: 20px 10px;
  /*padding: 20px 15px;*/
}

.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-footer {
  background-color: gainsboro;
}
.el-aside {
  height: 900px;
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  /*line-height: 200px;*/
}

.el-main {
  /* height: 900px; */
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  /*line-height: 160px;*/
}

.transition-box {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  min-height: 900px;
  border-radius: 4px;
  text-align: center;
  color: #fff;
  padding: 40px 20px;
  margin-bottom: 50px;
  box-sizing: border-box;
}
.mainText {
  text-align: left;
}

 .m-content {
    text-align: center;
  }
</style>

