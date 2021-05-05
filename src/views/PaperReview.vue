<template>
  <!--
  Author: Shi Zhancheng, Lin Yunqi
  Shi's part: The appearance of the website
  Lin's part: The data transfer part, including receive paper info and submit comments to backend

  This component refers to paper review page.
 -->
  <div>
    <Header></Header>
    <!--    body part-->
    <div class="mblog">
      <el-container>
        <!--        头部-->
        <el-header>
          <h1 style="margin: auto">{{ paperDetail.pname }}</h1>
        </el-header>
        <el-container>
          <el-main>
            <!--            paper main body-->
            <!-- <p>
              Author:{{ authorList[0].aname }}&nbsp;&nbsp;{{
                authorList[1].aname
              }}&nbsp;&nbsp;{{ authorList[2].aname }}
            </p> -->
            <p>{{ paperDetail.iname }}</p>
            <p
              class="mainText"
              style="line-height: 24px; font-family: 'Times New Roman'"
            >
              {{ paperDetail.pabstract }}
            </p>

            <p class="mainText">
              <strong>keyword:&nbsp;{{ paperDetail.keyword }}</strong>
            </p>
            <p class="mainText">Category:&nbsp;{{ paperDetail.category }}</p>
            <p class="mainText">Public ID:&nbsp;{{ paperDetail.publicID }}</p>
            <hr style="color: gainsboro; border: 1px dashed #000" />
          </el-main>
        </el-container>

        <div></div>

        <!--          add comments-->
        <div>
          <h1 style="text-align: center">COMMENTS</h1>
          <el-input
            style="margin-bottom: 20px"
            type="textarea"
            :rows="2"
            placeholder="Please input your comment here."
            v-model="common"
          >
          </el-input>
        </div>
<!--        reviewer action-->
        <el-footer style="margin-bottom: 50px;text-align: right">
<!--          download PDF-->
          <el-button type="primary" @click="handleDownload">
            <a v-bind:href="paperDetail.download" target="_blank" style="text-decoration: none" >
              Download PDF
            </a>
            <i class="el-icon-download"></i
          ></el-button>
          <el-button type="success" @click="pass">PASS</el-button>
          <el-button type="danger" @click="reject">REJECT</el-button>
        </el-footer>
      </el-container>
    </div>
  </div>
</template>

<script>
import "github-markdown-css";
import Header from "../components/Header_new";

export default {
  name: "PaperReview.vue",
  components: { Header },
  data() {
    return {
      rev_id: undefined,
      pap_id: undefined,
      // data used to debug
      authorList: [
        {
          aname: "Lin Yunqi",
          uname: "Beijing Jiaotong University",
          introduction: "This people is lazy and do not say anything.",
          image:
            "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
        },
        {
          aname: "Yan Zhihong",
          uname: "Beijing Jiaotong University",
          introduction: "This people is lazy and do not say anything.",
          image:
            "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
        },
        {
          aname: "Shi Zhancheng",
          uname: "Beijing Jiaotong University",
          introduction: "This people is lazy and do not say anything.",
          image:
            "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
        },
      ],
      paperDetail: {
        pname: "",
        iname: "",
        pabstract: "",
        keyword: "",
        category: "",
        publicID: "",
        // download URL !!!!!!!!!attention when debug!!!!!!!!!!!!
        download:"",
        email:""
      },
      common: "",
    };
  },
  methods: {
    // Author: Lin Yunqi
    pass() {
      const isPass = true;
      const form = {
        rev_id: this.rev_id,
        pap_id: this.pap_id,
        // common: this.common,
        isPass: isPass,
      };
      console.log(form);
      console.log("=====");
      const _this = this;
      this.$axios.post("/reviewer/paperReview", form).then(
        (res) => {
          console.log(res.data.code);
          _this.$router.push("/reviewer");
        },
        () => {
          _this.$router.push("/reviewer");
        }
      );
    },

    // Author: Lin Yunqi
    reject() {
      const isPass = false;
      const form = {
        rev_id: this.rev_id,
        pap_id: this.pap_id,
        common: this.common,
        isPass: isPass,
      };
      console.log(form);
      console.log("=====");
      const _this = this;
      this.$axios.post("/reviewer/paperReview", form).then(
        (res) => {
          console.log(res.data.code);
          _this.$router.push("/reviewer");
        },
        () => {
          _this.$router.push("/reviewer");
        }
      );
    },

    // Author: Shi Zhancheng
    closeAside() {
      this.asidePrompt = this.hasAside === true ? ">>" : "<<";
      this.hasAside = !this.hasAside;
    },
    onPreveiw() {
      this.online_preview_msg =
        this.online_preview === true ? "Preview on" : "Preview off";
      this.online_preview = !this.online_preview;
    },
    // this function handle download URL from backend to use in frontend.
    handleDownload() {
      var remoteFileSrc = this.paperDetail.download.replace(/\\/g,"/");
      console.log("handle get url", this.paperDetail.download);
      var remoteIP = "http://10.129.158.217:9000/";
      this.paperDetail.download = remoteIP + remoteFileSrc.slice(remoteFileSrc.indexOf("static"));
      console.log("return download url", this.paperDetail.download);
    }
  },
  // Author: Lin Yunqi
  // This method obtain two parameters in the url and send a GET request to the backend to obtain information
  // to be exhibited
  created() {
    this.pap_id = this.$route.query.pap_id;
    this.rev_id = this.$route.query.rev_id;
    console.log(this.pap_id, this.rev_id);
    const _this = this;
    this.$axios.get("/paperDetail", { params: { paperId: _this.pap_id } }).then(
      (res) => {
        console.log("=====");
        console.log(res.data.data);
        console.log("=====");

        _this.paperDetail.pname = res.data.data.paperDetail.pname;
        _this.paperDetail.iname = res.data.data.paperDetail.iname;
        _this.paperDetail.email = res.data.data.paperDetail.email;
        _this.paperDetail.download = res.data.data.paperDetail.fileUrl;
        _this.paperDetail.pabstract = res.data.data.paperDetail.pabstract;
        _this.paperDetail.keyword = res.data.data.paperDetail.keyword;
        _this.paperDetail.category = res.data.data.paperDetail.category;
        console.log("_this.authorList");

        console.log(_this.authorList);
      },
      (res) => {
        console.log("get失败");
      }
    );
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
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 60px;
}


.el-main {
  /* height: 700px; */
  background-color: white;
  color: #333;
  text-align: center;
  /*line-height: 160px;*/
}

.mainText {
  text-align: left;
}


.el-carousel__item:nth-child(n) {
  background-color: #ffffff;
}
</style>
