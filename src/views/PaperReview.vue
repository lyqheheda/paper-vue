<template>
    <div>
        123
    </div>
</template>

<script>
export default {
    data(){
        return {
           authorList:[],
           paperDetail:{},


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