<style scoped lang="less">
 @import "./branch-order.less";
</style>

<template>
    <div class="finish">
        <yd-list theme="1">
           <router-link to="/branch-info">
            <yd-list-item v-for="(item, key) in list" :key="key" >
                <img slot="img" :src="item.img">
                <p slot="title">{{item.title}}
                <span class="introduce">甜香馥郁悠长、滋味鲜爽醇厚</span>
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
    </div>
</template>

<script>
export default {
  name: 'branch-order',
  data () {
    return {
      list: [
        {img: require('../../../assets/images/copy2@2x.png'), title: '大红袍礼盒系列38g包邮限量', price: 156.23},
        {img: require('../../../assets/images/copy2@2x.png'), title: '大红袍礼盒系列38g包邮限量', price: 256.23},
        {img: require('../../../assets/images/copy2@2x.png'), title: '大红袍礼盒系列38g包邮限量', price: 356.23},
        {img: require('../../../assets/images/copy2@2x.png'), title: '大红袍礼盒系列38g包邮限量', price: 456.23}
      ]
    };
  }
};
</script>
