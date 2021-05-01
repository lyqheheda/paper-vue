<template>
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
            <p>Author:{{authorList[0].aname}}&nbsp;&nbsp;{{authorList[1].aname}}&nbsp;&nbsp;{{authorList[2].aname}}</p>
            <p>{{paperDetail.iname}}</p>
            <p class="mainText" style="line-height: 24px; font-family: 'Times New Roman'">{{ paperDetail.pabstract }}</p>

            <p class="mainText"><strong>Abstract:&nbsp;{{ paperDetail.keyword }}</strong></p>
            <p class="mainText">Category:&nbsp;{{ paperDetail.category }}</p>
            <p class="mainText">Public ID:&nbsp;{{ paperDetail.publicID }}</p>
            <hr style="color: gainsboro;border:1px dashed #000">
          </el-main>
        </el-container>

          <!--            author introduction-->
        <div class="authorShow" style="width: 900px;margin: auto">
          <el-carousel :interval="4000" type="card" height="300px" width="900px">
            <el-carousel-item v-for="item in 3" :key="item">
              <div style="margin: auto;text-align:center;padding: 10px;border: solid;border-color: gainsboro;">
                <hr>
                <div class="block"><el-avatar shape="square" :size="80" :src="authorList[item-1].image"></el-avatar></div>
                <p>{{ authorList[item-1].aname }}</p>
                <p>{{ authorList[item-1].uname }}</p>
                <hr>
                <p style="text-align: left">{{ authorList[item-1].introduction }}</p>
              </div>
            </el-carousel-item>
          </el-carousel>

        </div>
        <div>
          <hr style="color: gainsboro;border:1px dashed #000">
        </div>

        <!--          add comments-->

        <div>
          <h1 style="text-align: center">COMMENTS</h1>
          <el-input
              style="margin-bottom: 20px"
              type="textarea"
              :rows="2"
              placeholder="Please input your comment here."
              v-model="common">
          </el-input>
        </div>
<!--        reviewer action-->
<!--        reviewer action-->
        <el-footer style="margin-bottom: 50px;text-align: right">

          <el-button type="primary" @click="handleDownload">
<!--            download tab a-->
<!--            <a v-bind:href="paperDetail.download" download="paper.pdf" style="text-decoration: none" >-->
<!--            open window tab a-->
            <a v-bind:href="paperDetail.download" target="_blank" style="text-decoration: none" >
              Download PDF
            </a>
            <i class="el-icon-download"></i></el-button>
          <el-button type="success" @click="">PASS</el-button>
          <el-button type="danger" @click="">REJECT</el-button>
        </el-footer>
      </el-container>
    </div>

  </div>
</template>

<script>
import 'github-markdown-css'
import Header from "../components/Header_new";

export default {
  name: "PaperReview.vue",
  components: {Header},
  data() {
    return {
      authorList:[{
        aname:"Lin Yunqi",
        uname:"Beijing Jiaotong University",
        introduction:"This people is lazy and do not say anything.",
        image:"https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
      },{
        aname:"Yan Zhihong",
        uname:"Beijing Jiaotong University",
        introduction:"This people is lazy and do not say anything.",
        image:"https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
      },{
        aname:"Shi Zhancheng",
        uname:"Beijing Jiaotong University",
        introduction:"This people is lazy and do not say anything.",
        image:"https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
      }],
      paperDetail:{
        pname: "航空相机的振动隔离及角振动主动补偿方法研究",
        iname:"Computer Science and Technology",
        pabstract:"航空相机作为航空遥感的重要载荷之一,可以通过可见光、红外以及多光谱等多种成像手段获取地面信息,又由于其机动性好、时效性高、目的性强以及投入较低等优点,被世界各国广泛用于资源普查、地形测绘和军事侦察等领域。成像质量作为航空相机最重要的性能指标之一,除了受光学系统自身以及电子学系统的制约,还受载机运动、载机振动和环境条件等多种复杂因素的影响。其中,航空相机的角振动对成像质量影响较为严重,会导致航空相机的视轴出现抖动,从而在其曝光过程中引如像移,造成成像模糊。因此,如何降低角振动对航空相机的影响是研制高性能航空相机必须要解决的关键技术之一。降低角振动对航空相机的影响主要有两种手段:一种是利用减振系统尽可能对角振动的幅值进行衰减;另一种是通过补偿机构对角振动所造成的影响进行主动补偿。减振系统对高频振动的抑制能力较强,而主动补偿的手段对低频角振动的补偿效果明显。只有将这两种手段结合使用才能够在全频段上将角振动的影响降至最低。本文从航空相机减振系统的设计方法和角振动主动补偿方法两个方面开展研究工作:分析了角振动的来源和成因,确认了航空相机的角振动来源不只是外界环境及相机内部运动部件的角振动激励,也有线振动经过减振系统后由于耦合产生的角振动。通过建立航空相机的动力学模型,对航空相机的耦合特性进行了分析,并引入了刚度中心、阻尼中心、刚度矩中心及阻尼矩中心的概念。通过分析刚度中心、阻尼中心、刚度矩中心及阻尼矩中心与质心的重合情况,对减振器的布局和参数选择可能造成的不同耦合形式进行了讨论。通过对减振系统振动传递率的分析,得到了航空相机减振器的布局和参数选择与振动传递率之间的关系。根据对减振系统耦合特性和振动传递率的分析和讨论,提出了一种基于耦合约束、布局约束和性能约束的航空相机被动减振系统的设计方法。利用该方法,针对某型号航空相机设计了减振系统,并利用有限元仿真的方法对其有效性进行了验证。根据对角振动主动补偿方法的研究,建立了主动补偿仿真模型对主动补偿能力进行了仿真分析。利用快速反射镜和光纤陀螺分别作为补偿机构和角振动测量装置搭建了一套航空相机角振动主动补偿验证系统。为了给角振动主动补偿验证系统的测试实验提供稳定可控的角振动激励,本文还设计并搭建了一个基于柔性导向机构的音圈电机驱动角振动发生装置,并进行了验证测试。通过利用安装在角振动发生装置上的高速相机对固定靶标上的十字靶心连续快速采样的方法,对角振动主动补偿验证系统在不同振幅和频率的角振动激励下的补偿实验进行了记录。利用图像处理的手段对采样图片进行处理,得到了十字靶心的中心坐标,并根据中心坐标的变化情况获得了由角振动所引入的视轴抖动程度。通过对比角振动主动补偿机构介入前后靶标中心振幅的变化情况,实现了对角振动主动补偿验证系统的性能评估。经过对角振动幅值分别为0.045°、0.09°、0.135°、0.18°、0.225°和0.27°,频率在5Hz-50Hz的区间、间隔为5Hz的60个不同外界角激励下的主动补偿实验结果进行对比发现:激励幅值相同的情况下,随着激励频率的增加,主动补偿效果不断下降;在频率相同的情况下,随着激励幅值的增加,主动补偿效果不断下降。全部60个不同激励幅值和激励频率的实验中,角振动主动补偿验证系统的振动抑制率均在70%以上,角振动抑制效果良好。为航空相机角振动主动补偿系统的应用打下了技术基础。",
        keyword:"航空相机减振系统设计方法;振动耦合特性;角振动主动补偿;快速反射镜;角振动发生装置;",
        category:"航空航天科学与工程; 计算机软件及计算机应用",
        publicID:"10.27522/d.cnki.gkcgs.2021.000004",
        // download URL !!!!!!!!!attention !!!!!!!!!!!!
        download:"D:\\da san xia\\212\\demo10-1\\untitled\\src\\main\\resources\\static\\16198002362092 Privacy_【彩云小译】.pdf",
        email:"18983882089@163.com"
      },
      common: "",
    }
  },
  methods: {
    closeAside() {
      this.asidePrompt = this.hasAside === true? ">>":"<<";
      this.hasAside = !this.hasAside;
    },
    onPreveiw() {
      this.online_preview_msg = this.online_preview === true? "在线预览":"关闭预览";
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
  created(){
    const pap_id = this.$route.query.pap_id //注意这里和原来的代码区别: 用的是query 而不是params
    const rev_id = this.$route.query.rev_id
    console.log(pap_id,rev_id)
    const _this = this
    this.$axios.get("/reviewer/paperReview", {pap_id:pap_id,rev_id:rev_id}).then((res) => {
          console.log("=====")
          console.log(res)
          console.log("=====")
          _this.authorList=res.data.data.authorList
          _this.paperDetail=res.data.data.paperDetail
        },
        (res)=>{
          console.log("get失败")
        });
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
  background-color: #E9EEF3;
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
  background-color: white;
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

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(n) {
  background-color: #ffffff;
}

</style>
