<style scoped lang="less">
  @import "cartOrder-null.less";
</style>

<template>
  <div class="cartOrder-null">
    <ul class="orderNav">
      <li v-for="(navItem, index) in navList"  @click="toggle(index)" :class="index == checkindex ? 'active': ''" :key="index">{{navItem.name}}</li>
    </ul>
    <ul class="cartList">
      <li v-for="(item, index) in list" :key="index">
          <div class="cartOrder-null_title">
            <p class="cartOrder-null_title_left">订单编号：{{item.orderNumber}}</p>
            <p class="cartOrder-null_title_right">{{item.stateName}}</p>
          </div>
        <div class="details">
          <div class="details_image">
            <img :src="item.img"/>
          </div>
            <div class="details_right">
              <h3>{{item.title}}</h3>
            <div class="details_right_prict">
              <div class="details_right_prict_list">
                <p>¥{{item.prict}}／盒</p>
                <span>运费：包邮</span>
              </div>
              <div class="details_right_prict_num">
              <a href="#" class="tuikuan" v-if="index == 1 ? show:true">{{item.refund}}</a>
              </div>
            </div>
          </div>
          <p class="details_miaoshu">
          </p>
          <!--<div class="company">
            <p class="company-name">快递公司:{{item.expressCompany}}</p>
            <p class="express-id">快递单号：{{item.courierNumber}}</p>
          </div>
          <div class="delete">
            <yd-button size="large" type="primary" @click.native="show1 = true" class="delete-older tuikuan">{{item.deleteOrder}}</yd-button>
            <a class="refund tuikuan">{{item.refunds}}</a>
          </div>-->
        </div>
      </li>
    </ul>
    <yd-popup v-model="show1" position="center" width="90%" >
            <div class=popup>
                <p class="prompt">
                                            提示
                </p>
                <p class="delContent">
                    订单删除生将无法恢复，是否删除订单？
                </p>
                <div class="centerDel">
                  <p class="delNo">
                    <yd-button @click.native="show1 = false">否</yd-button>
                  </p>
                  <p class="delYes delNo">
                    <yd-button @click.native="show1 = false">是</yd-button>
                  </p>
                </div>
            </div>
       </yd-popup>
  </div>
</template>

<script>
export default {
  name: 'cartOrder-null',
  data () {
    return {
      show1: false,
      show: false,
      checkindex: 0,
      navList: [
        {name: '全部'},
        {name: '待发货'},
        {name: '待收货'},
        {name: '已收货'},
        {name: '退款'}
      ],
      list: [
        {
          id: '1',
          state: 'stay',
          stateName: '待发货',
          orderNumber: '351554478954',
          img: require('@/assets/images/ptimg.png'),
          title: '红茶大红袍 红茶系列罐装 60g*1',
          prict: '38',
          refund: '退款'
        },
        {
          id: '2',
          state: 'refunds',
          stateName: '退款中',
          orderNumber: '351554478954',
          img: require('@/assets/images/ptimg.png'),
          title: '红茶大红袍 红茶系列罐装 60g*1',
          prict: '48',
          wait: ' 请耐心等待，资金将在1-7个工作日退回原路'
        },
        {
          id: '3',
          state: 'refunded',
          stateName: '已退款',
          orderNumber: '351554478954',
          img: require('@/assets/images/ptimg.png'),
          title: '红茶大红袍 红茶系列罐装 60g*1',
          prict: '58',
          refund: '删除订单'
        },
        {
          id: '4',
          state: 'complete',
          stateName: '交易完成',
          orderNumber: '351554478954',
          img: require('@/assets/images/ptimg.png'),
          title: '红茶大红袍 红茶系列罐装 60g*1',
          prict: '68',
          refund: '删除订单'
        },
        {
          id: '5',
          state: 'pending',
          stateName: '待付款',
          orderNumber: '351554478954',
          img: require('@/assets/images/ptimg.png'),
          title: '红茶大红袍 红茶系列罐装 60g*1',
          prict: '78',
          refund: '立即支付'
        },
        {
          id: '6',
          state: 'already',
          stateName: '已发货',
          orderNumber: '351554478954',
          img: require('@/assets/images/ptimg.png'),
          title: '红茶大红袍 红茶系列罐装 60g*1',
          prict: '88',
          deleteOrder: '删除订单',
          refunds: '退款',
          expressCompany: '顺丰快递',
          courierNumber: '5221488756'
        }
      ]
    };
  },
  methods: {
    toggle (index) {
      this.checkindex = index;
    }
  }
};
</script>
