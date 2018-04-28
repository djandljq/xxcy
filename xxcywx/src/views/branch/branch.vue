<style scoped lang="less">
  @import "./branch.less";
</style>

<template>
    <div class="branch">
      <div class="branch_title">
        <p>全部分类</p>
      </div>
      <yd-cell-group class="branch_twoTitle">
          <yd-cell-item  href="#" type="link">
              <img src="../../assets/images/branch/redtea.png" slot="icon" />
              <span slot="left">红茶</span>
          </yd-cell-item>
      </yd-cell-group>
    <!--商品展示-->
      <yd-flexbox class="branch_links">
        <yd-flexbox-item v-for="(link, key) in links" :key="key">
          <router-link :to="'/' + link.url" :key="key">
            <img :src="link.img" :alt="link.name"/>
            <p>{{link.name}}</p>
          </router-link>
        </yd-flexbox-item>
      </yd-flexbox>
      <!--绿茶-->
      <yd-cell-group class="branch_twoTitle">
          <yd-cell-item  href="#" type="link">
              <img src="../../assets/images/branch/copy@2x.png" slot="icon" />
              <span slot="left">绿茶</span>
          </yd-cell-item>
      </yd-cell-group>
    <!--商品展示-->
      <yd-flexbox class="branch_links">
        <yd-flexbox-item v-for="(linker, key) in linksTwo" :key="key">
          <router-link :to="'/' + linker.url" :key="key">
            <img :src="linker.img" :alt="linker.name"/>
            <p>{{linker.name}}</p>
          </router-link>
        </yd-flexbox-item>
      </yd-flexbox>
  <!--底部导航-->
    <yd-tabbar fixed class="home_tab">
      <yd-tabbar-item title="首页" link="home">
        <yd-icon name="home" slot="icon" size="0.5rem"></yd-icon>
      </yd-tabbar-item>
      <yd-tabbar-item title="分类" :active="tabActive === 'branch'" link="branch" style="color:#000" active-color="#000">
       <img src="../../assets/images/branch/Group8@2x.png" alt=""  slot="icon" size="0.5rem"/>
      </yd-tabbar-item>
      <yd-tabbar-item title="购物车" link="cart">
       <img src="../../assets/images/ShoppingCart.png" alt="" slot="icon" size="0.6rem"/>
      </yd-tabbar-item>
      <yd-tabbar-item title="个人中心" link="user">
        <img src="../../assets/images/PersonalCenter.png" slot="icon" size="0.6rem"/>
      </yd-tabbar-item>
    </yd-tabbar>
  </div>
</template>

<script>
export default {
  name: 'branch',
  data () {
    return {
      tabActive: 'branch',
      links: [
        {name: '罐装系列', img: require('../../assets/images/branch/guanzhuang.png'), url: 'branch-order'},
        {name: '袋装系列', img: require('../../assets/images/branch/Bitmap@2x.png'), url: 'branch-order'},
        {name: '礼盒系列', img: require('../../assets/images/branch/Bitmap1@2x.png'), url: 'branch-order'},
        {name: '三角包系列', img: require('../../assets/images/branch/Bitmap2@2x.png'), url: 'branch-order'}
      ],
      linksTwo: [
        {name: '罐装系列', img: require('../../assets/images/branch/guanzhuang.png'), url: 'branch-order'},
        {name: '袋装系列', img: require('../../assets/images/branch/Bitmap@2x.png'), url: 'branch-order'},
        {name: '礼盒系列', img: require('../../assets/images/branch/Bitmap1@2x.png'), url: 'branch-order'},
        {name: '三角包系列', img: require('../../assets/images/branch/Bitmap2@2x.png'), url: 'branch-order'}
      ]
    };
  }
};
</script>
