<template>
<!--
Author: Lin Yunqi
This component refers to Paper management page of the website.
It provides a table of papers submitted by the author.
The aside body contains a search box and checkbox which provides more accurate classification

Contributor: Shi Zhancheng
Detail: Layout and CSS.
 -->


  <div>
    <Header :showLogin="true"></Header>

    <el-container>
      <!-- the side body -->
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


          <el-checkbox label="timeOrder" @change="update" style="margin-left: 10px">
            order by time
          </el-checkbox>
        </el-checkbox-group>
      </el-aside>
      <!-- the main body -->
      <el-main>
        <h3> Paper Management </h3>
        <hr/>
        <div>
          <el-table :data="paperList" stripe style="margin:10px">
            <el-table-column prop="pname" label="paper title" width="200px">
            </el-table-column>
            <el-table-column prop="authorName" label="author" width="150px">
            </el-table-column>
            </el-table-column>
            <el-table-column prop="keyword" label="keyword" width="130px">
            </el-table-column>
            <el-table-column prop="pcreateTime" label="create time" width="70px">
            </el-table-column>
            <el-table-column prop="category" label="category" width="150px">
            </el-table-column>
            <el-table-column prop="publicId" label="state" width="100px">
            </el-table-column>
            <el-table-column label="operations" width="100px">
              <template slot-scope="scope">
                <el-button
                    @click="handleReview(scope.row)"
                    type="text"
                    size="big"
                >edit</el-button>
                <el-button type="text" @click="open(scope.row)">delete</el-button>


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
  name: "Author",
  components: { Header },
  data() {
    return {
      checkList: [],
      keywords: "",
      aut_id: undefined,
      author: {
        lastname: "",
        firstname: "",
        authorInstitute: "",
        image: "",
        rtype: "",
      },
      hasLogin: false, //this is used to classify user priviledge
      currentPage: 1,
      total: 0,
      pageSize: 5,
      paperList: [],
    };
  },
  methods: {
    update() {
      //called when checkbox is checked

      const _this = this;
      this.$axios
        .get("/author", {
          params: {
            //the form to be sent
            aut_id: this.aut_id,
            currentPage: this.currentPage,
            numEachPage: this.pageSize,
            keywords: this.keywords,
            timeOrder: this.checkList.includes("timeOrder"),
          },
        })
        .then((res) => {
          // send form and get the paper list

          _this.paperList = res.data.data.ipage.records;
          console.log("paperlist:");
          console.log(_this.paperList);
          _this.currentPage = res.data.data.ipage.current;
          _this.total = res.data.data.ipage.total;
          _this.pageSize = res.data.data.ipage.size;
          _this.author = res.data.data.authorInformation;
        });
    },
    handleReview(row) {
      // get the unique aut_id and paper id of each item and route to detail page
      // console.log(row);
      // console.log(this.user.aut_id)

      this.$router.push({
        name: "AuthorEdit",
        query: { aut_id: this.aut_id, pap_id: row.pap_id },
      });
    },
    deleteReview(row) {
      const _this = this;
      this.$axios
        .get("/authorDelete", {
          params: {
            //the form to be sent
            pap_id: row.pap_id,
          },
        })
        .then(
          (res) => {
            console.log("okkkkkk");
            console.log(res);
            location.reload();
          },
          (res) => {
            console.log("失败");
          }
        );
    },
    open(row) {
      this.$confirm("Are you sure to delete this paper?", "warning", {
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        type: "warning",
      })
        .then(() => {
          console.log("row");
          console.log(row);
          this.deleteReview(row);
          this.$message({
            type: "success",
            message: "Delete successfully!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Delete cancel",
          });
        });
    },
  },

  created() {
    if (this.$store.getters.getUser.aut_id) {
      // get author id and store it
      this.aut_id = this.$store.getters.getUser.aut_id;
      console.log("aut_id:");
      console.log(this.aut_id);
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
  width: 300px;
  /* text-align: center; */
  /* line-height: 300px; */
}

.el-main {
  /* background-color: #989ea3; */
  color: #333;
  text-align: center;
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
