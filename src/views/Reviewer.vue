<template>
  <div>
    <Header :showLogin="true"></Header>

    <el-container>
      <el-aside width="200px">
        <div style="margin-top: 15px" class="searchbox">
          <el-input
            placeholder="关键词"
            v-model="skeywords"
            class="input-with-select"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="update"
            ></el-button>
          </el-input>
        </div>

        <el-checkbox-group v-model="checkList">
          <el-checkbox label="showPassed" @change="update"
            >show reviewed</el-checkbox
          >
          <el-checkbox label="timeOrder" @change="update"
            >order by time</el-checkbox
          >
        </el-checkbox-group>
      </el-aside>
      <el-main>
        <div>
          <el-table
    :data="tableData"
    stripe
    style="width: 80%">
    <el-table-column
      prop="pname"
      label="paper title"
      width="150">
    </el-table-column>
    <el-table-column
      prop="category"
      label="category"
      width="150">
    </el-table-column>
     <el-table-column
      prop="authorName"
      label="author"
      width="150">
    </el-table-column>
     <el-table-column
      prop="publicID"
      label="state"
      width="150">
    </el-table-column>
    <el-table-column
      prop="operation"
      label="operation">
    </el-table-column>
  </el-table>
        </div>


        <div class="block">
          <el-pagination
            class="mpage"
            background
            layout="prev, pager, next"
            :current-page="currentPage"
            :page-size="pageSize"
            :total="total"
            @current-change="page"
          >
          </el-pagination></div
      ></el-main>
    </el-container>
  </div>
</template>

<script>
import Header from "../components/Header_new";

export default {
  name: "Reviewer",
  components: { Header },
  data() {
    return {
      checkList: ["showPassed"],
      skeywords: "",
      user: {
        username: "",
      },
      hasLogin: false,

      // blogs: {},
      // blogs: [
      //   {
      //     paper_id: 11,
      //     userId: 1,
      //     pname: "1111",
      //     paperAbstract: "111",
      //     content: "111",
      //     aname: "11",
      //     keyword: "11",
      //     created: "2020-4-3T10:23:23",
      //     status: 0,
      //   },
      // ],
      currentPage: 1,
      total: 0,
      pageSize: 5,
      paperList:[],
      rev_id:0,
      tableData: [{
          pname: 'placeholder',
          category:'placeholder',
          authorName:'placeholder',
          publicID:123123,
          operation:'placeholder'
        }]

    };
  },
  methods: {
    page(currentPage) {
      const _this = this;
      _this.$axios.get("/reviewer?currentPage=" + currentPage).then((res) => {
        console.log(res);
        _this.paperList = res.data.data.records;
        _this.currentPage = res.data.data.current;
        _this.total = res.data.data.total;
        _this.pageSize = res.data.data.size;
      });
    },
    update() {
      // console.log(this.checkList)
      // console.log(this.checkList.includes('timeOrder'))
      // console.log('=====')

      let params = {
        rev_id:this.rev_id,
        currentPage: this.currentPage,
        numEachPage: this.pageSize,
        skeywords: this.skeywords,
        timeOrder: this.checkList.includes("timeOrder"),
        showPassed: this.checkList.includes("showPassed"),
      };
      const _this = this;
      _this.$axios.get("/reviewer", params).then((res) => {

      });
    },
  },

  created() {
    this.page(1);
    if (this.$store.getters.getUser.uname) {//需要初始化rev_id（从userinfo读取）
      this.user.username = this.$store.getters.getUser.uname;

      console.log("123123123");
      console.log(this.$store.getters.getUser.uname);
      console.log("123123123");

      this.hasLogin = true; //此变量不需要全局。
    } else {
      console.log("没登上");
    }
  },
};
</script>


<style>
.mpage {
  margin: 0 auto;
  text-align: center;
}

.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  /* line-height: 300px; */
}

.el-main {
  /* background-color: #989ea3; */
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

.searchbox {
  width: 80%;
  margin: 0 auto;
}

el-checkbox {
  margin-top: 100px;
  margin-bottom: 100px;
}
</style>