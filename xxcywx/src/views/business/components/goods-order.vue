<style scoped lang="less">
  @import "./goods-order.less";
</style>

<template>
  <div class="goods_order">
    <!-- 顶部导航 -->
    <yd-navbar class="goods_order_title" title="订单详情">
      <div @click="$router.push({name: 'my-goods'})" slot="left">
        <yd-navbar-back-icon>返回</yd-navbar-back-icon>
      </div>
    </yd-navbar>
    <!-- 订单内容 -->
    <yd-flexbox class="goods_order_content" direction="vertical">
      <yd-cell-group class="goods_order_content_info">
        <yd-cell-item>
          <span slot="left" class="goods_order_content_info_state">{{order.state_display}}...</span>
          <span slot="right" class="goods_order_content_info_sn">订单编号：{{order.order_sn}}</span>
        </yd-cell-item>
      </yd-cell-group>
      <yd-flexbox-item class="goods_order_content_goods">
        <div class="goods_order_content_goods_heard">商品清单</div>
        <div class="goods_order_content_goods_info" v-for="(product, key) in products" :key="key">
          <img class="goods_order_content_goods_info_img" :src="product.product_image" :alt="product.product_name">
          <div class="goods_order_content_goods_info_left">
            <div class="goods_order_content_goods_info_left_price"><em>¥</em>{{product.product_price}}x{{product.product_quantity}}</div>
            <div class="goods_order_content_goods_info_left_title">{{product.product_name}}</div>
          </div>
        </div>
        <div class="goods_order_content_goods_price">
          <span class="total_price">合计：<span class="number">{{order.price}}</span></span>
          <span class="total_freight">运费：<span class="number">0</span></span>
          <span v-if="canRefund" class="refund" @click="goodsRefund">申请退款</span>
        </div>
      </yd-flexbox-item>
      <yd-flexbox-item class="goods_order_content_user">
        <div class="goods_order_content_user_info">
          <span class="goods_order_content_user_info_name">收货人：{{user.user_name}}</span>
          <span class="goods_order_content_user_info_tell">联系电话：{{user.user_mobile}}</span>
        </div>
        <div class="goods_order_content_user_address">收货地址：{{order.address}}</div>
      </yd-flexbox-item>
      <yd-flexbox-item v-if="showLogistics" class="goods_order_content_logistics">
        <div class="goods_order_content_logistics_title">物流信息</div>
        <div class="goods_order_content_logistics_info">
          <div class="goods_order_content_logistics_info_name">物流公司：{{logistics.attr_name}}</div>
          <div class="goods_order_content_logistics_info_number">物流单号：{{logistics.attr_value}}</div>
        </div>
      </yd-flexbox-item>
    </yd-flexbox>
    <a v-if="order.state === 'unpaid'" class="goods_order_button" :href="'/order/pay/'+order.order_sn">
      继续支付
    </a>
  </div>
</template>

<script>
import { orderInfoBySn } from '../../../ifucloud/sdk';
export default {
  name: 'goods-order',
  data () {
    return {
      canRefund: false,
      showLogistics: true,
      logistics: {},
      order: {
        id: '',
        type: '',
        wx_order_no: '',
        state: 'unpaid',
        state_display: '待支付...',
        title: '独山旅游订单',
        order_sn: '20170101010',
        price: 0.00
      },
      products: [{
        product_price: 0.00,
        product_image: '',
        product_name: '电子码',
        product_quantity: 1
      }],
      user: {
        user_name: '',
        user_mobile: ''
      }
    };
  },
  methods: {
    init () {
      this.getOrderInfo();
    },
    getOrderInfo () {
      let sn = this.$route.params.sn;
      orderInfoBySn(sn).then(data => {
        let that = this;
        let {
          id,
          state,
          title,
          type,
          order_sn,
          pay_amount,
          attributes,
          users,
          products
        } = data;
        this.order.id = id;
        this.order.type = type;
        this.order.title = title;
        this.order.order_sn = order_sn;
        this.order.price = pay_amount;
        this.information = [];
        this.explain = [];
        this.order.state = state;
        this.products = products;
        switch (state) {
          case 'unpaid':
            this.order.state_display = '待支付...';
            break;
          case 'paid':
            this.canRefund = true;
            this.order.state_display = '已支付...';
            break;
          case 'undelivered':
            this.canRefund = true;
            this.order.state_display = '待发货...';
            break;
          case 'delivered':
            this.canRefund = false;
            this.order.state_display = '已发货...';
            break;
          case 'received':
            this.canRefund = true;
            this.order.state_display = '已收货...';
            break;
          case 'refunding':
            this.canRefund = false;
            this.order.state_display = '退款中...';
            break;
          case 'refund':
            this.canRefund = false;
            this.order.state_display = '已退款';
            break;
          case 'complete':
            this.canRefund = false;
            this.order.state_display = '已消费';
            break;
          default:
            this.order.state_display = '未知状态';
            break;
        }
        attributes.forEach(attribute => {
          switch (attribute.attr_type) {
            case 'address': that.order.address = attribute.attr_value; break;
            case 'wx_order_no': that.order.wx_order_no = attribute.attr_value; break;
            case 'logistics':
              that.logistics = attribute;
              that.showLogistics = true;
              break;
          }
        });
        users.forEach(user => {
          if (user.user_type === 'buyer') {
            that.user = user;
          }
        });
        sessionStorage.tmp = JSON.stringify(this.order);
      }).catch(err => {
        this.$dialog.toast({
          mes: err,
          timeout: 1500,
          icon: 'error'
        });
      });
    },
    goodsRefund () {
      if (this.order.state === 'unpaid' ||
        this.order.state === 'refunding' ||
        this.order.state === 'refund' ||
        this.order.state === 'complete') {
        this.$dialog.toast({
          mes: '当前状态不可退款',
          timeout: 1500,
          icon: 'error'
        });
      } else {
        let argu = { sn: this.order.order_sn };
        this.$router.push({
          name: 'goods-refund',
          params: argu
        });
      }
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
