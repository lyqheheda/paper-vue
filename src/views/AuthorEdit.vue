<template>
  <div>
    <Header :showLogin="true"></Header>
    <div>
      <el-container>
        <!-- <el-avatar
          :size="50"
          :src="squareUrl"
          style="margin: 10px 20px 10px 10px"
        ></el-avatar> -->
        <h2 style="font-family: 'Times New Roman'">
          WELCOME {{ authorList[0].aname }} 
        </h2>
      </el-container>
      <el-container>
        <el-main> 
          <el-form :model="paperDetail" :rules="rules" ref="paperDetail" label-width="100px" class="demo-ruleForm">
        <el-form-item label="title" prop="pname">
          <el-input v-model="paperDetail.pname"></el-input>
        </el-form-item>
        <el-form-item label="abstract" prop="pabstract">
          <el-input type="textarea" v-model="paperDetail.pabstract"></el-input>
        </el-form-item>
          
         <el-form-item label="keyword" prop="keyword">
          <el-input type="textarea" v-model="paperDetail.keyword"></el-input>
        </el-form-item> 
          
          <el-form-item label='category' prop='category'>
            <el-select v-model="paperDetail.category" filterable placeholder="select" style='margin-left: -830px;'>
    <el-option
      v-for="item in paperDetail.options"
      :key="item.value"
      :label="item.label" 
      :value="item.value">
    </el-option>
  </el-select>
          </el-form-item>
          <el-form-item label="#second author" prop="autid_two">
          <el-input v-model="paperDetail.autid_two"></el-input>
        </el-form-item>
        <el-form-item label="#third author" prop="autid_three">
          <el-input v-model="paperDetail.autid_three"></el-input>
        </el-form-item>
        </el-form>
<el-upload
  class="upload-demo"
  action="/author/paperAdd"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :before-remove="beforeRemove"
  multiple
  :limit="3"
  :on-exceed="handleExceed"
  :file-list="paperDetail.fileList">
  <el-button size="small" type="primary">Upload paper</el-button>
  <div slot="tip" class="el-upload__tip">Choose a pdf file</div>
</el-upload>

           </el-main>
        <el-footer>
          <!-- <el-button type="primary" @click="onPreveiw()"
            >{{ online_preview_msg }}<i class="el-icon-view"></i
          ></el-button> -->
          <el-button type="success" @click="submitForm('paperDetail')"
            >Submit&nbsp;<i class="el-icon-star-off"></i
          ></el-button>
          <el-button type="danger" @click="resetForm('paperDetail')"
            >Reset&nbsp;<i class="el-icon-star-off"></i
          ></el-button>
        </el-footer>
      </el-container>

      <!--      preview part:-->
      <!-- <transition name="el-zoom-in-top">
        <div v-show="online_preview" class="transition-box">
          <el-container>
           
            <el-header>
              {{ paperDetail.university }}
            </el-header>
            <el-container>
              <el-aside
                width="30px"
                @click="closeAside()"
                style="padding-top: 10px"
              >
                <el-a
                  @click="closeAside()"
                  style="text-align: center; height: 100%"
                  >{{ asidePrompt }}</el-a
                >
              </el-aside>
              <el-aside
                width="300px"
                style="padding-right: 30px; padding-top: 10px"
                v-show="hasAside"
              >
                <div>点击隐藏</div>

                <div>
                  <div>
                    <hr />
                    <div class="block">
                      <el-avatar
                        shape="square"
                        :size="80"
                        :src="squareUrl"
                      ></el-avatar>
                    </div>
                    <p>作者名称1</p>
                    <p>北京交通大学</p>
                    <hr />
                    <p style="text-align: left">
                      作者介绍：作者一是本篇论文的作者
                    </p>
                  </div>
                </div>

                <div>
                  <div>
                    <hr />
                    <div class="block">
                      <el-avatar
                        shape="square"
                        :size="80"
                        :src="squareUrl"
                      ></el-avatar>
                    </div>
                    <p>作者名称2</p>
                    <p>北京交通大学</p>
                    <hr />
                    <p style="text-align: left">
                      作者介绍：作者2是本篇论文的作者
                    </p>
                  </div>
                </div>

                <div>
                  <div>
                    <hr />
                    <div class="block">
                      <el-avatar
                        shape="square"
                        :size="80"
                        :src="squareUrl"
                      ></el-avatar>
                    </div>
                    <p>作者名称3</p>
                    <p>北京交通大学</p>
                    <hr />
                    <p style="text-align: left">
                      作者介绍：作者3是本篇论文的作者
                    </p>
                  </div>
                </div>
              </el-aside>

              <el-main> -->
                <!--            论文主体部分-->
                <!-- <p>{{ paperDetail.pname }}</p>
                <p>
                  Author:{{ paperDetail.author_one }}&nbsp;&nbsp;{{
                    paperDetail.author_two
                  }}&nbsp;&nbsp;{{ paperDetail.author_three }}
                </p>
                <p>{{ paperDetail.author_one_institute }}</p>
                <p class="mainText">{{ paperDetail.pabstract }}</p>

                <p class="mainText">
                  <strong>Abstract:&nbsp;{{ paperDetail.pkey }}</strong>
                </p>
                <p class="mainText">
                  Category:&nbsp;{{ paperDetail.category }}
                </p>
                <p class="mainText">
                  Public ID:&nbsp;{{ paperDetail.public_id }}
                </p>
              </el-main>
            </el-container>
          </el-container>
        </div>
      </transition> -->
    </div>
  </div>
</template>

<script>
import Header from "../components/Header_new";

export default {
  components: { Header },

  data() {
    return {
      aut_id:undefined,  //default: -1
    paperDetail: {
      pname:'',
      pabstract:'',
      keyword:'',
      options:[{//
          value: 'A',
          label: 'data mining'
        }, {
          value: 'B',
          label: 'computer graphics'
        },
        ],
        category: '',
      file_url:'',
      
      autid_two:undefined,
      autid_three:undefined,
      fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, 
      {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
        },
         rules: {
          pname: [
            { required: true, message: 'Please select', trigger: 'blur' },
          ],
          pabstract:[
            { required: true, message: 'Please enter', trigger: 'blur' },
          ],
           keyword: [
           { required: true, message: 'Please enter', trigger: 'blur' },
          ],
          category: [
            { required: true, message: 'Please enter', trigger: 'blur' },
          ],
          autid_two:[
            { required: false, message: 'Please enter', trigger: 'blur' },
          ],
          autid_three:[
            { required: false, message: 'Please enter', trigger: 'blur' },
          ],
          
        },
      
      authorList: [
        {
          lastname: "Yunqi",
          firstname: "Lin",
        },
        {
          lastname: "Zhancheng",
          firstname: "Shi",
        },
      ],
      // paperDetail: {
      //   id: "11",
      //   pname: "航空相机的振动隔离及角振动主动补偿方法研究",
      //   pkey:
      //     "航空相机减振系统设计方法;振动耦合特性;角振动主动补偿;快速反射镜;角振动发生装置;",
      //   category: "航空航天科学与工程; 计算机软件及计算机应用",
      //   public_id: "10.27522/d.cnki.gkcgs.2021.000004",
      //   biname: "",
      //   pabstract:
      //     "航空相机作为航空遥感的重要载荷之一,可以通过可见光、红外以及多光谱等多种成像手段获取地面信息,又由于其机动性好、时效性高、目的性强以及投入较低等优点,被世界各国广泛用于资源普查、地形测绘和军事侦察等领域。成像质量作为航空相机最重要的性能指标之一,除了受光学系统自身以及电子学系统的制约,还受载机运动、载机振动和环境条件等多种复杂因素的影响。其中,航空相机的角振动对成像质量影响较为严重,会导致航空相机的视轴出现抖动,从而在其曝光过程中引如像移,造成成像模糊。因此,如何降低角振动对航空相机的影响是研制高性能航空相机必须要解决的关键技术之一。降低角振动对航空相机的影响主要有两种手段:一种是利用减振系统尽可能对角振动的幅值进行衰减;另一种是通过补偿机构对角振动所造成的影响进行主动补偿。减振系统对高频振动的抑制能力较强,而主动补偿的手段对低频角振动的补偿效果明显。只有将这两种手段结合使用才能够在全频段上将角振动的影响降至最低。本文从航空相机减振系统的设计方法和角振动主动补偿方法两个方面开展研究工作:分析了角振动的来源和成因,确认了航空相机的角振动来源不只是外界环境及相机内部运动部件的角振动激励,也有线振动经过减振系统后由于耦合产生的角振动。通过建立航空相机的动力学模型,对航空相机的耦合特性进行了分析,并引入了刚度中心、阻尼中心、刚度矩中心及阻尼矩中心的概念。通过分析刚度中心、阻尼中心、刚度矩中心及阻尼矩中心与质心的重合情况,对减振器的布局和参数选择可能造成的不同耦合形式进行了讨论。通过对减振系统振动传递率的分析,得到了航空相机减振器的布局和参数选择与振动传递率之间的关系。根据对减振系统耦合特性和振动传递率的分析和讨论,提出了一种基于耦合约束、布局约束和性能约束的航空相机被动减振系统的设计方法。利用该方法,针对某型号航空相机设计了减振系统,并利用有限元仿真的方法对其有效性进行了验证。根据对角振动主动补偿方法的研究,建立了主动补偿仿真模型对主动补偿能力进行了仿真分析。利用快速反射镜和光纤陀螺分别作为补偿机构和角振动测量装置搭建了一套航空相机角振动主动补偿验证系统。为了给角振动主动补偿验证系统的测试实验提供稳定可控的角振动激励,本文还设计并搭建了一个基于柔性导向机构的音圈电机驱动角振动发生装置,并进行了验证测试。通过利用安装在角振动发生装置上的高速相机对固定靶标上的十字靶心连续快速采样的方法,对角振动主动补偿验证系统在不同振幅和频率的角振动激励下的补偿实验进行了记录。利用图像处理的手段对采样图片进行处理,得到了十字靶心的中心坐标,并根据中心坐标的变化情况获得了由角振动所引入的视轴抖动程度。通过对比角振动主动补偿机构介入前后靶标中心振幅的变化情况,实现了对角振动主动补偿验证系统的性能评估。经过对角振动幅值分别为0.045°、0.09°、0.135°、0.18°、0.225°和0.27°,频率在5Hz-50Hz的区间、间隔为5Hz的60个不同外界角激励下的主动补偿实验结果进行对比发现:激励幅值相同的情况下,随着激励频率的增加,主动补偿效果不断下降;在频率相同的情况下,随着激励幅值的增加,主动补偿效果不断下降。全部60个不同激励幅值和激励频率的实验中,角振动主动补偿验证系统的振动抑制率均在70%以上,角振动抑制效果良好。为航空相机角振动主动补偿系统的应用打下了技术基础。",
      //   author_one: "齐克奇",
      //   author_two: "林蕴奇",
      //   author_three: "阎之泓",
      //   author_one_institute:
      //     "中国科学院大学(中国科学院长春光学精密机械与物理研究所)",
      //   university: "Beijing Jiaotong University",
      //   // 头像
      // },
      squareUrl:
        "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
      ownBlog: false,
      // 侧边栏显示与隐藏
      hasAside: true,
      asidePrompt: "<<",
      // 在线预览
      online_preview: false,
      online_preview_msg: "Preview ON ",
      // 左侧侧边栏目录显示
    };
  },
  methods: {
    closeAside() {
      this.asidePrompt = this.hasAside === true ? ">>" : "<<";
      this.hasAside = !this.hasAside;
    },
    onPreveiw() {
      this.online_preview_msg =
        this.online_preview === true ? "Preview ON " : "Preview OFF ";
      this.online_preview = !this.online_preview;
    },
    submitForm(formName) {
      console.log('=====')
      console.log(this.paperDetail)
      const form={
        aut_id:this.aut_id,
        paperDetail:this.paperDetail
      }
      console.log(form)
      console.log('=====')
      this.$refs[formName].validate((valid) => {
        if (valid) {

          const _this = this
          this.$axios.post('/author/paperAdd', form).then(res => {//这个接口对吗

            console.log(res.data.code)
            //试一下 这个行不？
            _this.$router.push("/author")
        
          })

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
        this.$refs[formName].resetFields();
      },
       handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      }
  },
  created() {
    
    
    this.aut_id = this.$store.getters.getUser.aut_id
     
    const pap_id=this.$route.query.pap_id;
        // 编辑现有的论文
      if(pap_id){
  const _this = this;
    this.$axios
      .get("/paperDetail", {params:{ paperId: pap_id }})
      .then(
        (res) => {
          console.log("=====");
          console.log(res.data.data);
          console.log("=====");
          
          _this.paperDetail.pname=res.data.data.paperDetail.pname
          _this.paperDetail.pabstract=res.data.data.paperDetail.pabstract
          _this.paperDetail.keyword=res.data.data.paperDetail.keyword
          _this.paperDetail.category=res.data.data.paperDetail.category
          console.log('_this.authorList')         
          // _this.paperDetail.autid_two=res.data.data.authorDetails[1].autId
          // _this.paperDetail.autid_three=res.data.data.authorDetails[2].autId
          // _this.authorList=res.data.data.authorDetails

          console.log(_this.authorList)         
// _this.paperDetail.file_url=res.data.data.


        },
        (res) => {
          console.log("get失败");
        }
      );
      }
      
    
    
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
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-footer {
  background-color: gainsboro;
}
.el-aside {
  height: 900px;
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  /*line-height: 200px;*/
}

.el-main {
  /* height: 900px; */
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  /*line-height: 160px;*/
}

.transition-box {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  min-height: 900px;
  border-radius: 4px;
  text-align: center;
  color: #fff;
  padding: 40px 20px;
  margin-bottom: 50px;
  box-sizing: border-box;
}
.mainText {
  text-align: left;
}

 .m-content {
    text-align: center;
  }
</style>

