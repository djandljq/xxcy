<style scoped lang="less">
  @import "./user.less";
</style>

<template>
  <div class="user">
    <yd-flexbox direction="vertical">
      <div class="user_info">
      <img src="../../assets/images/user/user-index.png"/>
        <div class="user_info_avatar">
          <img :src="user.avatar"/>
        </div>
        <div class="user_info_name">
          <span>{{user.nickname}}</span>
        </div>
      </div>
    </yd-flexbox>
    <yd-flexbox class="user_navbar" align='center'>
      <yd-flexbox-item >
        <router-link to="/pending">待发货</router-link>
      </yd-flexbox-item>
      <yd-flexbox-item >
        <router-link to="/pending">待收货</router-link>
      </yd-flexbox-item>
      <yd-flexbox-item >
        <router-link to="/pending">已收货</router-link>
      </yd-flexbox-item>
      <yd-flexbox-item >
        <router-link to="/pending">退款</router-link>
      </yd-flexbox-item>
      <yd-flexbox-item >
        <router-link to="/cartOrder-null" >全部订单</router-link>
      </yd-flexbox-item>
    </yd-flexbox>
    <!--拼团导航-->
    <yd-flexbox class="user_links">
      <yd-flexbox-item v-for="(link, key) in links" :key="key">
        <router-link :to="'/' + link.url" :key="key">
          <img :src="link.img" :alt="link.name"/>
          <p>{{link.name}}</p>
        </router-link>
      </yd-flexbox-item>
    </yd-flexbox>
    <!--底部导航-->
    <yd-tabbar fixed class="home_tab">
      <yd-tabbar-item title="首页" :active="tabActive === 'home'" link="home">
        <yd-icon name="home" slot="icon" size="0.5rem"></yd-icon>
      </yd-tabbar-item>
      <yd-tabbar-item title="分类"  link="branch">
       <img src="../../assets/images/branch/branch.png" slot="icon" size="0.6rem"/>
      </yd-tabbar-item>
      <yd-tabbar-item title="购物车" link="cart">
       <img src="../../assets/images/ShoppingCart.png"  slot="icon" size="0.6rem"/>
      </yd-tabbar-item>
      <yd-tabbar-item title="个人中心" :active="tabActive === 'user'" link="user" active-color="#000" style="color: #000;">
        <img src="../../assets/images/user/user.png" slot="icon" size="0.6rem"/>
      </yd-tabbar-item>
    </yd-tabbar>
  </div>
</template>

<script>
import { wxUserLogin, customerUserInfo } from '../../ifucloud/sdk';
export default {
  name: 'user',
  data () {
    return {
      tabActive: 'user',
      active: false,
      user: {
        id: '',
        sex: '',
        type: '',
        email: '',
        avatar: '',
        username: '',
        nickname: '',
        telephone: '',
        attributes: ''
      },
      links: [
        {name: '我的拼团', img: require('../../assets/images/user/Group4@2x.png'), url: 'SelectedTea'},
        {name: '我的红包', img: require('../../assets/images/user/Group3@2x.png'), url: 'myRedBag'},
        {name: '关于商家', img: require('../../assets/images/user/Group10@2x.png'), url: 'business'}
      ]
    };
  },
  methods: {
    init () {
      this.loadUserInfo();
    },
    loadUserInfo () {
      if (!localStorage.user && !this.$route.query.token) {
        wxUserLogin();
      } else if (!localStorage.user && this.$route.query.token) {
        localStorage.oauthToken = this.$route.query.token;
        customerUserInfo().then(res => {
          let { data } = res;
          localStorage.user = JSON.stringify(data);
          this.user = JSON.parse(localStorage.user);
        }).catch(error => {
          this.$dialog.toast({
            mes: error,
            timeout: 1500,
            icon: 'error'
          });
        });
      } else {
        this.user = JSON.parse(localStorage.user);
      }
    },
    cacheClear () {
      this.$dialog.confirm({
        title: '清空全部缓存',
        mes: '缓存清除后需要从新授权登录！',
        opts: () => {
          let that = this;
          localStorage.clear();
          setTimeout(function () {
            that.$router.push({
              name: 'home'
            });
          }, 2000);
        }
      });
    }
  }
};
</script>
