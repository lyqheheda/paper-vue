<template>
  <div class="mcontaner" style="width: 1200px;">
    <Header></Header>

    <div style="margin-top: 15px;">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item  prop='input'>
  <el-input placeholder="请输入内容" v-model="ruleForm.input" class="input-with-select">
    <el-select style='width:150px;' v-model="ruleForm.select" slot="prepend" placeholder="请选择">
      <el-option label="paper title" value="paper_title" ></el-option>
      <el-option label="author" value="author"></el-option>
      <el-option label="keyword" value="keyword"></el-option>
    </el-select>
    <el-button  @click="submitForm('ruleForm')" slot="append" icon="el-icon-search"></el-button>
  </el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="block">
      <el-timeline>

        <el-timeline-item :timestamp="blog.created" placement="top" v-for="blog in blogs">
          <el-card>
            <h4>
              <router-link :to="{name: 'BlogDetail', params: {blogId: blog.paper_id}}">
                {{blog.pname}}
              </router-link>
            </h4>
            <p>author: {{blog.aname}}</p>
            <p>keywords: {{blog.keyword}}</p>
          </el-card>
        </el-timeline-item>

      </el-timeline>

      <el-pagination class="mpage"
                     background
                     layout="prev, pager, next"
                     :current-page="currentPage"
                     :page-size="pageSize"
                     :total="total"
                     @current-change=page>
      </el-pagination>

    </div>

  </div>
</template>

<script>
  import Header from "../components/Header_new";

  export default {
    name: "Blogs.vue",
    components: {Header},
    data() {
      return {
       // blogs: {},
       blogs:[{
         paper_id:11,
      userId:1,
      pname:"1111",
      paperAbstract:"111",
      content:"111",
      aname:"11",
      keyword:"11",
      created:'2020-4-3T10:23:23',
      status:0
      }],
        currentPage: 1,
        total: 0,
        pageSize: 5,

        ruleForm: {
          input: '',
          select: 'paper_title'
        },
        rules: {
          input: [
            { required: true, message:'Nothing is entered',trigger: 'blur' },

          ],

      }
    }
    },
    methods: {
      submitForm(formName) {
        console.log(this.ruleForm)
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const _this = this
            this.$axios.post('/search', this.ruleForm).then(res => {//这个接口对吗
              
              console.log(res.data)
              //试一下 这个行不？
              _this.blogs = res.data.data.records
          _this.currentPage = res.data.data.current
          _this.total = res.data.data.total
          _this.pageSize = res.data.data.size

            })

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      page(currentPage) {
        const _this = this
        _this.$axios.get("/blogs?currentPage=" + currentPage).then(res => {
          console.log(res)
          _this.blogs = res.data.data.records
          _this.currentPage = res.data.data.current
          _this.total = res.data.data.total
          _this.pageSize = res.data.data.size

        })
      }
    },
    created() {
      this.page(1)
    }
  }
</script>

<style scoped>

  .mpage {
    margin: 0 auto;
    text-align: center;
  }

  .input-with-select  {
    background-color: #fff;
  }

</style>
