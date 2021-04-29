<template>
  <div>

    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <div>
        <img alt="Website Logo" class="mylogo" src="../assets/myLogo.gif">
      </div>
      <el-menu-item v-if='hasLogin' >
         Welcome, {{user.username}}
      </el-menu-item>
      <el-menu-item index="1">
        <router-link :to="{name: 'Blogs'}" class="Page_title">论文首页</router-link>
      </el-menu-item>
      <el-submenu index="2" v-show='user.rtype==="A"'>
    <template slot="title" >发表管理</template>
    <el-menu-item index="2-1"><router-link :to="{name:'AddPaper', query:{aut_id:user.aut_id}}"> add paper</router-link></el-menu-item>
    <el-menu-item index="2-2"><a class="Page_title" href="/author" >manage paper</a></el-menu-item>


  </el-submenu>
      <el-menu-item index="3" v-show='user.rtype==="B"'>
        <a class="Page_title" href="/reviewer" >审阅管理</a></el-menu-item>
      <el-menu-item v-if="!hasLogin" v-show='showLogin' index="5">
        <a class="Page_title" href="/login">登录</a>
        <!-- <a @click="testLogin">登录</a> -->
      </el-menu-item>
      

      <el-submenu v-else index="5">
        <template slot="title">
          <el-avatar :size="40" :src="user.avatar"></el-avatar>
        
       </template>
        <el-menu-item index="5-5" @click="logout">退出登录</el-menu-item>

      </el-submenu>
      <el-menu-item v-if="!hasLogin" index="6">
        <a class="Page_title" href="/register">注册</a>
      </el-menu-item>
    </el-menu>
    <div class="line"></div>

  </div>
</template>

<script>
export default {
  name: "Header_new",
  props: ['showLogin'],
  data() {
    return {
      activeIndex: '',
      user: {
        username: 'unknown',
        avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
        lastname:'',
        firstname:'',
        rtype:'',
        // session:'',
        aut_id:undefined,
        rev_id:undefined,
      },
      
      hasLogin: false,
      
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },

    logout() {
     
     
        this.$store.commit("REMOVE_INFO")
        this.user.rtype = undefined
        this.$router.push("/login")
        this.hasLogin = false;
    },
    testLogin() {
      this.hasLogin = true;
    }
  },
  created() {
    if (this.$store.getters.getUser) {
      this.user.username = this.$store.getters.getUser.username
      
      this.user.lastname = this.$store.getters.getUser.lastname
      this.user.firstname = this.$store.getters.getUser.firstname
      this.user.rtype = this.$store.getters.getUser.rtype
      // this.user.session = this.$store.getters.getUser.session
      this.user.aut_id = this.$store.getters.getUser.aut_id
      this.user.rev_id = this.$store.getters.getUser.rev_id
       this.hasLogin = true
    }

  }
  
}
</script>

<style scoped>
.mylogo {
  width: 20%;
  float: left;
  margin-left: 5px;
  /*margin-top: 10px;*/
  margin-right: 400px;
}

.Page_title {
  text-decoration: none;
}

a {
  text-decoration: none;
}

.router-link-active {
  text-decoration: none;
}

</style>
