<template>
<!-- 
Author: Lin Yunqi
This component refers to Review management page of the website.
It provides a table of papers to be reviewed by the reviewer.
The aside body contains a search box and checkbox which provides more accurate classification
 -->
  <div>
    <Header :showLogin="true"></Header>

    <el-container>
      <el-aside width="200px">
        <div style="margin-top: 15px" class="searchbox">
          <el-input
            placeholder="keywords"
            v-model="keywords"
            class="input-with-select"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="update"
            ></el-button>
          </el-input>
        </div>

        <el-checkbox-group v-model="checkList" class="checkbox" >
          <el-checkbox label="showPassed" @change="update" style="margin-left: 10px"
            >show unreviewed</el-checkbox
          >
          <hr style="margin: 5px 0px;color: #E9EEF3">
          <el-checkbox label="timeOrder" @change="update" style="margin-left: 10px"
            >order by time</el-checkbox
          >
        </el-checkbox-group>
      </el-aside>
      <el-main>
         <h3> Review Management </h3>
        <hr/>
        <div>
          <el-table :data="paperList" stripe style="margin:10px">
            <el-table-column prop="pname" label="paper title" width="200px">
            </el-table-column>
            <el-table-column prop="authorName" label="author" width="150px">
            </el-table-column>
            <el-table-column prop="keyword" label="keyword" width="200px">
            </el-table-column>
            <el-table-column prop="pcreateTime" label="create time" width="70px">
            </el-table-column>
            <el-table-column prop="category" label="category" width="150px">
          </el-table-column>
            <el-table-column prop="publicId" label="state" width="100px">
            </el-table-column>
            <!-- <el-table-column prop="operation" label="operation">
            </el-table-column> -->
            <el-table-column label="operations" width="100px">
              <template slot-scope="scope">
                <el-button
                  @click="handleReview(scope.row)"
                  type="text"
                  size="small"
                  >review<i class="el-icon-view el-icon--right"></i></el-button>

              </template>
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
      checkList: [],
      keywords: "",
        rev_id: 0,
      hasLogin: false, //这个咋用？
      currentPage: 1,
      total: 0,
      pageSize: 5,
      paperList: [
        {
          pap_id:0,
          pname: "placeholder",
          category: "placeholder",
          authorName: "placeholder",
          publicID: 123123,
        },

      ],
    };
  },
  methods: {
    // page(currentPage) {
    //   const _this = this;
    //   _this.$axios.get("/reviewer?currentPage=" + currentPage).then((res) => {
    //     console.log(res);
    //     _this.paperList = res.data.data.records;
    //     _this.currentPage = res.data.data.current;
    //     _this.total = res.data.data.total;
    //     _this.pageSize = res.data.data.size;
    //   });
    // },
    update() {
      // console.log(this.checkList)
      // console.log(this.checkList.includes('timeOrder'))
      // console.log('=====')

      // let params = {
      //   rev_id: this.user.rev_id,
      //   currentPage: this.currentPage,
      //   numEachPage: this.pageSize,
      //   keywords: this.keywords,
      //   timeOrder: this.checkList.includes("timeOrder"),
      //   showPassed: this.checkList.includes("showPassed"),
      // };
      const _this = this;
      _this.$axios.get("/reviewer", {params:{
        rev_id: this.rev_id,
        currentPage: this.currentPage,
        numEachPage: this.pageSize,
        keywords: this.keywords,
        timeOrder: this.checkList.includes("timeOrder"),
        showPassed: this.checkList.includes("showPassed"),
      }}).then((res) => {
        console.log('res.data')
        console.log(res.data)

        _this.paperList = res.data.data.records;
        console.log('paperlist:')
        console.log(_this.paperList)
        _this.currentPage = res.data.data.current;
        _this.total = res.data.data.total;
        _this.pageSize = res.data.data.size;
      });
    },
    handleReview(row) {
        // console.log(row);
        // console.log(this.user.rev_id)

        this.$router.push({name:'PaperReview',
        query:{rev_id: this.rev_id, pap_id:row.papId}});
      },
  },

  created() {
    // this.page(1);
    // if (this.$store.getters.getUser.uname) {
    //   this.user.username = this.$store.getters.getUser.uname;

    //   console.log("123123123");
    //   console.log(this.$store.getters.getUser.uname);
    //   console.log("123123123");

    //   this.hasLogin = true; //此变量不需要全局。
    // } else {
    //   console.log("没登上");
    // }
    if (this.$store.getters.getUser.rev_id) {
      this.rev_id = this.$store.getters.getUser.rev_id;
    }
    this.update();
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
  height: auto;
  /* text-align: center; */
  /* line-height: 300px; */
}

.el-main {
  /* background-color: #989ea3; */
  color: #333;
  text-align: center;
  height: auto;
  /* line-height: 160px; */
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

.checkbox {
  margin: 15px 20px;
}


</style>
