<style scoped lang="less">
    @import "./branch-info.less";
</style>

<template>
<div class="branch-info">
    <yd-slider autoplay="3000">
        <yd-slider-item>
            <a href="#">
                <img src="../../../assets/images/selLunbo.png">
            </a>
        </yd-slider-item>
        <yd-slider-item>
            <a href="#">
                <img src="../../../assets/images/selLunbo.png">
            </a>
        </yd-slider-item>
        <yd-slider-item>
            <a href="#">
                <img src="../../../assets/images/selLunbo.png">
            </a>
        </yd-slider-item>
    </yd-slider>
    <div class="branch-info_title">
      <p class="branch-info_title_list">红茶大红袍</p>
      <p class="branch-info_title_introduce">初春新蕊，匠心烘培</p>
      <p class="branch-info_title_product">拼团价：¥39<span>¥199</span></p>
    </div>
    <div class="branch-info_sales">
      <p class="branch-info_sales_salesNumber">
        <span>销量:<i>9999</i>件</span>
        <span>库存:<i>999</i></span>
        <span>运费:<i>¥200</i></span>
      </p>
    </div>
    <div class="branch-info_evaluate">
       <p>商品评价(<span>10</span>)</p>
    </div>
    <ul class="userHead">
        <li>
            <div class="user">
                <div class="userImg">
                    <img src="../../../assets/images/head_portrait.png"/>
                </div>
                <p>胡曦格</p>
            </div>
            <div class="score">
                <div class="wjximg">
                    <img src="../../../assets/images/redwjx.png" />
                    <img src="../../../assets/images/redwjx.png" />
                    <img src="../../../assets/images/redwjx.png" />
                    <img src="../../../assets/images/redwjx.png" />
                    <img src="../../../assets/images/wjx.png" />
                </div>
                <p>红茶大红袍礼盒系列&nbsp;&nbsp;&nbsp;300g</p>
            </div>
            <div class="time">
                2018-05-01
            </div>
        </li>
        <li>
            <div class="user">
                <div class="userImg">
                    <img src="../../../assets/images/head_portrait.png"/>
                </div>
                <p>胡曦格</p>
            </div>
            <div class="score">
                <div class="wjximg">
                    <img src="../../../assets/images/redwjx.png" />
                    <img src="../../../assets/images/redwjx.png" />
                    <img src="../../../assets/images/redwjx.png" />
                    <img src="../../../assets/images/redwjx.png" />
                    <img src="../../../assets/images/wjx.png" />
                </div>
                <p>红茶大红袍礼盒系列&nbsp;&nbsp;&nbsp;300g</p>
            </div>
            <div class="time">
                2018-05-01
            </div>
        </li>
    </ul>
    <div class="more">
        <p>查看更多</p>
        <img src="../../../assets/images/xjt.png" />
    </div>
    <div class="branch-info_hint">
        <div class="branch-info_hint_bor">
            <h3>商品详情</h3>
        </div>
    </div>
    <div class="branch-info_image">
      <img src="../../../assets/images/ptxqimg.png" />
    </div>
    <div class="branch-info_time">
      <p class="branch-info_time_join"><router-link to="/SelectedTea">加入购物车</router-link></p>
      <p class="branch-info_time_immediately"><router-link to="/SelectedTea">立即购买</router-link></p>
      <p class="branch-info_time_cart"><router-link to="/SelectedTea">
        <img src="../../../assets/images/cart.png"/>
      </router-link></p>
    </div>
</div>
</template>

<script>
export default {
  data () {
    return {
    };
  }
};
</script>

<style>
</style>
