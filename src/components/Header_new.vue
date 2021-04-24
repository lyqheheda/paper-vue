<template>
  <div>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <div >
        <img class="mylogo" src="https://www.markerhub.com/dist/images/logo/markerhub-logo.png" alt="">
      </div>
      <el-menu-item index="1" >
        <router-link :to="{name: 'Blogs'}">论文首页</router-link>
      </el-menu-item>
      <el-menu-item index="2" ><a href='/author'> 发表管理</a></el-menu-item>
      <el-menu-item index="3" ><a href="/reviewer">审阅管理</a></el-menu-item>
      <el-menu-item index="5" v-if="!hasLogin" v-show='showLogin'>
       <a href="/login">登录</a>
        <!-- <a @click="testLogin">登录</a> -->
      </el-menu-item>
      <el-menu-item index="6" v-if="!hasLogin">
       <a href="/register">注册</a>
        <!-- <a @click="testLogin">登录|注册</a> -->
      </el-menu-item>

      <el-submenu index="5" v-else>
        <template slot="title">
          <el-avatar :size="40" :src="user.avatar"></el-avatar>
        </template>
        <el-menu-item index="5-1">我的资料</el-menu-item>
        <el-submenu index="5-2">
          <template slot="title">我的消息</template>
          <el-menu-item index="5-2-1">公告</el-menu-item>
          <el-menu-item index="5-2-2">评论</el-menu-item>
          <el-menu-item index="5-2-3">关注</el-menu-item>
          <el-menu-item index="5-2-4">点赞</el-menu-item>
          <el-menu-item index="5-2-5">私信</el-menu-item>
          <el-menu-item index="5-2-6">系统消息</el-menu-item>
        </el-submenu>
        <el-menu-item index="5-3">我的收藏</el-menu-item>
        <el-menu-item index="5-4">权限管理</el-menu-item>
        <el-menu-item index="5-5">系统设置</el-menu-item>
        <el-menu-item index="5-5" @click="logout">退出登录</el-menu-item>

        <el-menu-item index="5-6" v-if="admin">系统管理</el-menu-item>
      </el-submenu>
    </el-menu>
    <div class="line"></div>

  </div>
</template>

<script>
export default {
  name: "Header_new",
  props:['showLogin'],
  data() {
    return {
      activeIndex: '',
      user: {
        username: 'unknown',
        avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
      },
      isAuther: true,
      isRevier: false,
      hasLogin: false,
      admin: true
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },

    logout() {
      this.hasLogin = false;
      // const _this = this
      // _this.$axios.get("/logout", {
      //   headers: {
      //     "Authorization": localStorage.getItem("token")
      //   }
      // }).then(res => {
      //   _this.$store.commit("REMOVE_INFO")
      //   _this.$router.push("/login")
      // })
    },
    testLogin() {
      this.hasLogin = true;
    }
  },
  created() {
    if(this.$store.getters.getUser.username) {
      this.user.username = this.$store.getters.getUser.username
      this.user.avatar = this.$store.getters.getUser.avatar

      this.hasLogin = true
    }

  }
}
</script>

<style scoped>
.mylogo {
  width: 15%;
  float: left;
  margin-left: 5px;
  margin-top: 10px;
  margin-right: 530px;
}

</style>
