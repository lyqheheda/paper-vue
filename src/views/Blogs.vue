<template>
<!-- 
Author: Lin Yunqi
This component refers to the homepage of the website.
It contains a searchbox, a pagination button and blocks to show overview information of papers.

 -->
  <div class="mcontaner" style="width: 1200px;">
    <Header :showLogin='true'></Header>

    <div class="search" style="margin-top: 15px;">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules">
        <el-form-item prop='input'>
          <el-input v-model="ruleForm.input" class="input-with-select" placeholder="Please input content">
            <el-select slot="prepend" v-model="ruleForm.select" placeholder="请选择" style='width:150px;'>
              <el-option label="paper title" value="pname"></el-option>
              <el-option label="author" value="author"></el-option>
              <el-option label="keyword" value="keyword"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="submitForm('ruleForm')"></el-button>
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="block">
      <el-timeline>

        <!-- <el-timeline-item v-for="blog in blogs" :timestamp="blog.pcreateTime" placement="top" v-show="blog.publicId=='Passed'"> -->
     <el-timeline-item v-for="blog in blogs" :timestamp="blog.pcreateTime" placement="top" >
          <el-card>
            <h4>
              <router-link :to="{name: 'BlogDetail', params: {blogId: blog.paperId}}">
                {{ blog.pname }}
              </router-link>
            </h4>
            <p>author: {{ blog.autOne }}</p>
            <p>keywords: {{ blog.keyWord }}</p>
            <p>abstract:{{blog.pabstract}}</p>
            <!-- <p>publicID:{{blog.publicId}}</p>
            {{blog.publicId=="Passed"}} -->
          </el-card>
        </el-timeline-item>

      </el-timeline>

      <el-pagination :current-page="currentPage"
                     :page-size="pageSize"
                     :total="total"
                     background
                     class="mpage"
                     layout="prev, pager, next"
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
      blogs: [{
        paperId: 11,
        userId: 1,
        pname: "1111",
        paperAbstract: "111",
        content: "111",
        aname: "11",
        keyword: "11",
        created: '2020-4-3T10:23:23',
        status: 0,
        publicID:""
      }],
      currentPage: 1,
      total: 0,
      pageSize: 5,

      ruleForm: {
        input: '',
        select: 'pname'
      },
      rules: {
        input: [
          {required: true, message: 'Nothing is entered', trigger: 'blur'},

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
          
          this.$axios.get('/papersSearch', {params:{input:this.ruleForm.input,select:this.ruleForm.select}}).then(res => {
            
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
      _this.$axios.get("/papers",{params:{currentPage:currentPage, numEachPage:_this.pageSize}}).then(res => {
        console.log('=====Blogs.vue page()')
        console.log(res)
        console.log('=====')

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

.input-with-select {
  background-color: #fff;
}

</style>
