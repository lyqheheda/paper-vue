<template>
<!-- 
  Author: Lin Yunqi, Shi Zhancheng
  This component is used to exhibit the detail info of a paper
 -->
  <div>
    <Header></Header>
    <div class="mblog">
      <el-container>
<!--        header-->
        <el-header>
          {{ paper.university }}
        </el-header>
        <el-container>
          <el-main>
<!--            main part-->
            <p>{{ paper.pname }}</p>
            <p>Author:{{paper.author_one}}&nbsp;&nbsp;{{paper.author_two}}&nbsp;&nbsp;{{paper.author_three}}</p>
            <p>{{paper.author_one_institute}}</p>
            <p class="mainText">{{ paper.pabstract }}</p>

            <p class="mainText"><strong>Abstract:&nbsp;{{ paper.keyword }}</strong></p>
            <p class="mainText">Category:&nbsp;{{ paper.category }}</p>
            <!-- <p class="mainText">Public ID:&nbsp;{{ paper.public_id }}</p> -->


          </el-main>
        </el-container>

        <el-footer>
          <el-button type="primary" @click="">Collection&nbsp;<i class="el-icon-star-off" ></i></el-button>
          <el-button type="primary" @click="handleDownload">Download&nbsp;<i class="el-icon-download"></i></el-button>
          <el-button type="primary" @click="">Contact&nbsp;<i class="el-icon-phone-outline"></i></el-button>
        </el-footer>
 
      </el-container>
    </div>
  </div>
</template>

<script>
  import 'github-markdown-css'
  import Header from "../components/Header_new";

  export default {
    name: "BlogDetail.vue",
    components: {Header},
    data() {
      return {
        paper: {
          paperId: "",
          pname: "",
          keyword:"",
          category:"",
          pabstract:"",
          author_one:"",
          author_two:"",
          author_three:"",
          author_one_institute:"",
          university:""
        },
        squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
        ownBlog: false,
        // asider open and close
        hasAside: true,
        asidePrompt: "<<",
        // online Preview
        online_preview: false,
        online_preview_msg:"Open Preview",
      }
    },
    methods: {
      closeAside() {
        this.asidePrompt = this.hasAside === true? ">>":"<<";
        this.hasAside = !this.hasAside;
      },
      handleDownload() {
      var remoteFileSrc = this.paper.download.replace(/\\/g,"/");
      console.log("handle get url", this.paper.download);
      var remoteIP = "http://10.129.158.217:9000/";
      this.paper.download = remoteIP + remoteFileSrc.slice(remoteFileSrc.indexOf("static"));
      window.open(this.paper.download);
      console.log("return download url", this.paper.download);
      }
    },


    // Author: Lin Yunqi
    // This method obtain a parameter in the url and send a GET request to the backend to obtain information 
    // to be exhibited
    created() {
      const paperId = this.$route.params.blogId
      console.log(paperId)
      const _this = this
      this.$axios.get('/paperDetail?paperId=' + paperId).then(res => {
        console.log('获取论文详情成功')
        console.log(res)
        const paper = res.data.data
        _this.paper.paperId = paperId
        _this.paper.pname = paper.paperDetail.pname
        _this.paper.keyword = paper.paperDetail.keyword
        _this.paper.category = paper.paperDetail.category
        _this.paper.author_one_institute = paper.paperDetail.iname
        _this.paper.pabstract = paper.paperDetail.pabstract
        _this.paper.download = paper.paperDetail.fileUrl
        _this.paper.author_one = paper.authorDetails[0].aname
        _this.paper.author_two = paper.authorDetails[1].aname
        _this.paper.author_three = paper.authorDetails[2].aname




        var MardownIt = require("markdown-it")
        var md = new MardownIt()

        var result = md.render(blog.content)
        _this.blog.content = result
        _this.ownBlog = (blog.userId === _this.$store.getters.getUser.id)

      },
      res=>{
        console.log('获取论文详情失败')
      })
    }
  }
</script>

<style scoped>

  .pveiw {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    min-height: 700px;
    margin: 20px 10px;
    /*padding: 20px 15px;*/
  }

  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    height: 700px;
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    /*line-height: 200px;*/
  }

  .el-main {
    height: 700px;
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    /*line-height: 160px;*/
  }

  .transition-box {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    min-height: 700px;
    border-radius: 4px;
    background-color: #D3DCE6;
    text-align: center;
    color: #fff;
    padding: 40px 20px;
    box-sizing: border-box;
  }
  .mainText {
    text-align: left;
  }

</style>
