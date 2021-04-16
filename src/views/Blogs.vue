<template>
  <div class="mcontaner">
    <Header></Header>

    <div style="margin-top: 15px;">
  <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
    <el-select style='width:150px;' v-model="select" slot="prepend" placeholder="请选择">
      <el-option label="论文标题" value="1"></el-option>
      <el-option label="作者" value="2"></el-option>
      <el-option label="关键词" value="3"></el-option>
    </el-select>
    <el-button slot="append" icon="el-icon-search"></el-button>
  </el-input>
</div>
    <div class="block">
      <el-timeline>

        <el-timeline-item :timestamp="blog.created" placement="top" v-for="blog in blogs">
          <el-card>
            <h4>
              <router-link :to="{name: 'BlogDetail', params: {blogId: blog.id}}">
                {{blog.title}}
              </router-link>
            </h4>
            <p>{{blog.description}}</p>
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
  import Header from "../components/Header";

  export default {
    name: "Blogs.vue",
    components: {Header},
    data() {
      return {
        blogs: {},
        currentPage: 1,
        total: 0,
        pageSize: 5,
        input3: '',
        select: ''
      }
    },
    methods: {
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