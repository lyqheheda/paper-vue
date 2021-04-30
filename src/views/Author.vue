<template>
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
                <!-- <el-button
                    @click="deleteReview(scope.row)"
                    type="text"
                    size="big"
                >delete</el-button> -->

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
      author:{  //author类
        lastname:'',
        firstname:'',
        authorInstitute:'',
        image:'',
        rtype:'',
      },
      hasLogin: false, //hasn't used yet. this is used to classify user priviledge
      currentPage: 1,
      total: 0,
      pageSize: 5,
      paperList: [
        // {
        //   pap_id:0,

        //   pname: "placeholder",
        //   category: "placeholder",
        //   authorName: "placeholder",
        //   publicID: "default",
        // },

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
    update() {  //called when checkbox is checked
      // console.log(this.checkList)
      // console.log(this.checkList.includes('timeOrder'))
      // console.log('=====')

      // let params = {  //the form to be sent
      //   aut_id: this.user.aut_id,
      //   currentPage: this.currentPage,
      //   numEachPage: this.pageSize,
      //   skeywords: this.skeywords,
      //   timeOrder: this.checkList.includes("timeOrder"),
      // };
      // console.log('params:')  
      // console.log(params)
      const _this = this;
      this.$axios.get("/author", {params :{  //the form to be sent
        aut_id: this.aut_id,
        currentPage: this.currentPage,
        numEachPage: this.pageSize,
        keywords: this.keywords,
        timeOrder: this.checkList.includes("timeOrder"),
      }}).then((res) => {// send form and get the paper list
        // console.log('========')
        // console.log(res.data.data)
        // console.log('========')
        _this.paperList = res.data.data.ipage.records;
        console.log('paperlist:')
        console.log(_this.paperList)
        _this.currentPage = res.data.data.ipage.current;
        _this.total = res.data.data.ipage.total;
        _this.pageSize = res.data.data.ipage.size;
        _this.author=res.data.data.authorInformation;// 此处接是否接收到了？需要确认一下
      });
    },
    handleReview(row) {// get the unique aut_id and paper id of each item and route to detail page
        // console.log(row);
        // console.log(this.user.aut_id)

        this.$router.push({name:'AuthorEdit',
        query:{aut_id: this.aut_id, pap_id:row.pap_id}});
      },
      deleteReview(row){
        const _this = this;
      this.$axios.get("/authorDelete", {params :{  //the form to be sent
        pap_id: row.pap_id,
      }}).then((res)=>{
        console.log('okkkkkk')
        console.log(res)
        location.reload()
        
      },
      res=>{
        console.log("失败")
      })

      },
      open(row) {
        this.$confirm('Are you sure to delete this paper?', 'warning', {
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
          type: 'warning'
        }).then(() => {
          console.log('row')
          console.log(row)
          this.deleteReview(row)
            this.$message({
            type: 'success',
            message: '删除成功!'
          });
          
          

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
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
    if (this.$store.getters.getUser.aut_id) {    // get author id and store it
      this.aut_id = this.$store.getters.getUser.aut_id;  
      console.log('aut_id:')  
      console.log(this.aut_id)
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
