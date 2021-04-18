<template>
  <div>
    <Header></Header>

    <div class="mblog">
      <el-container>
        <el-header>{{blog.pname}}</el-header>
        <el-container>
          <el-aside width="30px" @click="closeAside()">
            <el-a @click="closeAside()" style="text-align: center;height: 100%">{{asidePrompt}}</el-a>
          </el-aside>
          <el-aside width="300px" v-show="hasAside">
            Aside
          </el-aside>

          <el-main>Main</el-main>
        </el-container>
        <el-footer>
          <el-button type="primary" @click="onPreveiw()">{{online_preview_msg}}<i class="el-icon-view"></i></el-button>
          <el-button type="primary" @click="">点击收藏<i class="el-icon-star-off" ></i></el-button>
          <el-button type="primary" @click="">文档下载<i class="el-icon-download"></i></el-button>
          <el-button type="primary" @click="">联系作者<i class="el-icon-phone-outline"></i></el-button>
          Footer</el-footer>
      </el-container>
    </div>

    <transition name="el-zoom-in-top">
      <div v-show="online_preview" class="transition-box">
        <h2> {{ blog.title }}</h2>
        <el-link icon="el-icon-edit" v-if="ownBlog">
          <router-link :to="{name: 'BlogEdit', params: {blogId: blog.id}}" >
            编辑
          </router-link>
        </el-link>
        <el-divider></el-divider>
        <div class="markdown-body" v-html="blog.content"></div>
      </div>
    </transition>

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
        blog: {
          id: "11",
          pname: "航空相机的振动隔离及角振动主动补偿方法研究",
          pkey:"航空相机减振系统设计方法;振动耦合特性;角振动主动补偿;快速反射镜;角振动发生装置;",
          category:"航空航天科学与工程; 计算机软件及计算机应用",
          public_id:"10.27522/d.cnki.gkcgs.2021.000004",
          biname:"",
          pabstract:"航空相机作为航空遥感的重要载荷之一,可以通过可见光、红外以及多光谱等多种成像手段获取地面信息,又由于其机动性好、时效性高、目的性强以及投入较低等优点,被世界各国广泛用于资源普查、地形测绘和军事侦察等领域。成像质量作为航空相机最重要的性能指标之一,除了受光学系统自身以及电子学系统的制约,还受载机运动、载机振动和环境条件等多种复杂因素的影响。其中,航空相机的角振动对成像质量影响较为严重,会导致航空相机的视轴出现抖动,从而在其曝光过程中引如像移,造成成像模糊。因此,如何降低角振动对航空相机的影响是研制高性能航空相机必须要解决的关键技术之一。降低角振动对航空相机的影响主要有两种手段:一种是利用减振系统尽可能对角振动的幅值进行衰减;另一种是通过补偿机构对角振动所造成的影响进行主动补偿。减振系统对高频振动的抑制能力较强,而主动补偿的手段对低频角振动的补偿效果明显。只有将这两种手段结合使用才能够在全频段上将角振动的影响降至最低。本文从航空相机减振系统的设计方法和角振动主动补偿方法两个方面开展研究工作:分析了角振动的来源和成因,确认了航空相机的角振动来源不只是外界环境及相机内部运动部件的角振动激励,也有线振动经过减振系统后由于耦合产生的角振动。通过建立航空相机的动力学模型,对航空相机的耦合特性进行了分析,并引入了刚度中心、阻尼中心、刚度矩中心及阻尼矩中心的概念。通过分析刚度中心、阻尼中心、刚度矩中心及阻尼矩中心与质心的重合情况,对减振器的布局和参数选择可能造成的不同耦合形式进行了讨论。通过对减振系统振动传递率的分析,得到了航空相机减振器的布局和参数选择与振动传递率之间的关系。根据对减振系统耦合特性和振动传递率的分析和讨论,提出了一种基于耦合约束、布局约束和性能约束的航空相机被动减振系统的设计方法。利用该方法,针对某型号航空相机设计了减振系统,并利用有限元仿真的方法对其有效性进行了验证。根据对角振动主动补偿方法的研究,建立了主动补偿仿真模型对主动补偿能力进行了仿真分析。利用快速反射镜和光纤陀螺分别作为补偿机构和角振动测量装置搭建了一套航空相机角振动主动补偿验证系统。为了给角振动主动补偿验证系统的测试实验提供稳定可控的角振动激励,本文还设计并搭建了一个基于柔性导向机构的音圈电机驱动角振动发生装置,并进行了验证测试。通过利用安装在角振动发生装置上的高速相机对固定靶标上的十字靶心连续快速采样的方法,对角振动主动补偿验证系统在不同振幅和频率的角振动激励下的补偿实验进行了记录。利用图像处理的手段对采样图片进行处理,得到了十字靶心的中心坐标,并根据中心坐标的变化情况获得了由角振动所引入的视轴抖动程度。通过对比角振动主动补偿机构介入前后靶标中心振幅的变化情况,实现了对角振动主动补偿验证系统的性能评估。经过对角振动幅值分别为0.045°、0.09°、0.135°、0.18°、0.225°和0.27°,频率在5Hz-50Hz的区间、间隔为5Hz的60个不同外界角激励下的主动补偿实验结果进行对比发现:激励幅值相同的情况下,随着激励频率的增加,主动补偿效果不断下降;在频率相同的情况下,随着激励幅值的增加,主动补偿效果不断下降。全部60个不同激励幅值和激励频率的实验中,角振动主动补偿验证系统的振动抑制率均在70%以上,角振动抑制效果良好。为航空相机角振动主动补偿系统的应用打下了技术基础。",
          auther_one:"齐克奇",
          auther_two:"林蕴奇",
          auther_three:"阎之泓",
          auther_one_institute:"中国科学院大学(中国科学院长春光学精密机械与物理研究所)"
        },
        ownBlog: false,
        hasAside: true,
        asidePrompt: "<<",
        online_preview: false,
        online_preview_msg:"在线预览"
      }
    },
    methods: {
      closeAside() {
        this.asidePrompt = this.hasAside === true? "<<":">>";
        this.hasAside = !this.hasAside;
      },
      onPreveiw() {
        this.online_preview_msg = this.online_preview === true? "在线预览":"关闭预览";
        this.online_preview = !this.online_preview;
      }
    },
    created() {
      const blogId = this.$route.params.blogId
      console.log(blogId)
      const _this = this
      this.$axios.get('/blog/' + blogId).then(res => {
        const blog = res.data.data
        _this.blog.id = blog.id
        _this.blog.title = blog.title

        var MardownIt = require("markdown-it")
        var md = new MardownIt()

        var result = md.render(blog.content)
        _this.blog.content = result
        _this.ownBlog = (blog.userId === _this.$store.getters.getUser.id)

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

</style>
