<style scoped lang="less">
  @import "./home.less";
</style>

<template>
  <yd-pullrefresh class="home" :callback="init" ref="pullHomeList">
    <!-- 轮播广告 -->
    <yd-slider class="home_banners" autoplay="3000">
      <yd-slider-item v-for="(bulletin, key) in bulletins" :key="key">
        <a :href="bulletin.href">
          <img :src="bulletin.image">
        </a>
      </yd-slider-item>
    </yd-slider>
    <!--产品名称-->
     <!--eslint-disable--> 
    <div class="product_name">
    	<h3>大红袍</h3>
    	<p>甜香馥郁悠长、滋味鲜爽醇厚</p>
    </div>
    <!-- 快速链接 -->
    <yd-flexbox class="home_links">
      <yd-flexbox-item v-for="(link, key) in links" :key="key">
        <router-link :to="'/' + link.url" :key="key">
          <img :src="link.img" :alt="link.name"/>
          <p>{{link.name}}</p>
        </router-link>
      </yd-flexbox-item>
    </yd-flexbox>
     
    <!--礼盒展示-->
    	<div class="gift_box">
    		<div class="gift_box_left">
    			<img src="../../assets/images/dahp.png" />
    			<p>大红袍礼盒饭系列一</p>
    		</div>
    		<div class="gift_box_left gif_box_right">
    			<div class="right_top">
    				<img src="../../assets/images/indexto.png"/>
    				<p>大红袍礼盒饭系列二</p>
    			</div>
    			<div class="right_top">
    				<img src="../../assets/images/dhpbz.png"/>
    				<p>大红袍礼盒饭系列三</p>
    			</div>
    		</div>
    	</div>
    	
    	<!--热销商品-->
    	<div class="selling">
    		<span>热销商品</span>
    	</div>
   	<yd-list theme="1">
   		<router-link to="/SelectedTea-info">
        <yd-list-item v-for="item, key in list" :key="key">
            <img slot="img" :src="item.img">
            <p slot="title">{{item.title}}
            </p>
            <yd-list-other slot="other">
                <div>
                    <span class="demo-list-price"><em>¥</em>{{item.price}}</span>
                </div>
                <div class="sold">已售800</div>
            </yd-list-other>
        </yd-list-item>
      </router-link>  
    </yd-list>
    <!--底部导航-->
    <div class="home_helper"></div>
    <yd-tabbar fixed class="home_tab">
      <yd-tabbar-item title="首页" :active="tabActive === 'home'" link="home" style="color:#000" active-color="#000">
        <yd-icon name="home" slot="icon" size="0.5rem"></yd-icon>
      </yd-tabbar-item>
      <yd-tabbar-item title="分类"  link="branch">
        <img src="../../assets/images/branch/branch.png" slot="icon" size="0.6rem"/>
      </yd-tabbar-item>
      <yd-tabbar-item title="购物车" link="cart">
      	<img src="../../assets/images/ShoppingCart.png" alt="" slot="icon" size="0.6rem"/>
      </yd-tabbar-item>
      <yd-tabbar-item title="个人中心" :active="tabActive === 'user'" link="user">
        <img src="../../assets/images/PersonalCenter.png" slot="icon" size="0.6rem"/>
      </yd-tabbar-item>
    </yd-tabbar>
  </yd-pullrefresh>
</template>

<script>
import {bulletinList} from '../../ifucloud/sdk';
export default {
  name: 'home',
  data () {
    return {
      tabActive: 'home',
      links: [
        {name: '精选茶叶', img: require('../../assets/images/Group17@2x.png'), url: 'finish'},
        {name: '折扣拼团', img: require('../../assets/images/Group16@2x.png'), url: 'SelectedTea'},
        {name: '实物红包', img: require('../../assets/images/Group15@2x.png'), url: 'redPacket'}
      ],
      bulletins: [],
      list: [
        {img: require('../../assets/images/copy2@2x.png'), title: '大红袍礼盒系列38g包邮限量', price: 156.23},
        {img: require('../../assets/images/copy2@2x.png'), title: '今晚吃鸡', price: 256.23},
        {img: require('../../assets/images/copy2@2x.png'), title: '大红袍礼盒系列38g包邮限量', price: 356.23},
        {img: require('../../assets/images/copy2@2x.png'), title: '大红袍礼盒系列38g包邮限量', price: 456.23}
      ]
    };
  },
  methods: {
    init () {
      if (localStorage.oauthToken) {
        this.bulletinList();
        this.$refs.pullHomeList.$emit('ydui.pullrefresh.finishLoad');
      }
    },
    bulletinList () {
      bulletinList().then(res => {
        let { data } = res;
        this.bulletins = data;
      });
    }
  },
  mounted () {
    this.init();
  },
  activated () {
    this.init();
  }
};
</script>
