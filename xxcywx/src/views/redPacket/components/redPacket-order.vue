<style scoped lang="less">
  @import "./redPacket-order.less";
</style>

<template>
  <div class="redPacket_order">
    <div class="redPacket_order_redpackead">
      <img src="../../../assets/images/receive.png"/>
      <p class="redPacket_order_redpackead_good">恭喜您抢到红包！</p>
      <p class="redPacket_order_redpackead_redcold">红包:<span>5</span></p>
      <p class="redPacket_order_redpackead_surplus">剩余:<span>1</span></p>
    </div>
    <p>直领红包：大红袍礼盒系列 一份</p>
    <p class="title">填写收货地址</p>
    <yd-cell-group >
        <yd-cell-item>
            <span slot="left">姓名&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <input slot="right" type="text" >
        </yd-cell-item>
        <yd-cell-item>
            <span slot="left">电话&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <input slot="right" type="number" >
        </yd-cell-item>
        <yd-cell-item>
            <span slot="left">收货地址&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <input slot="right" type="text" >
        </yd-cell-item>
        </yd-cell-group>
      <div class="collar">
        <router-link to="/redPacket-info">
          <input type="submit"  value="领取红包" />
        </router-link>
      </div>
  </div>
</template>

<script>
import { orderInfoBySn } from '../../../ifucloud/sdk';
export default {
  name: 'coffee-order',
  data () {
    return {
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
      product: {
        product_price: 0.00,
        product_name: '电子码',
        product_quantity: 1
      },
      information: [
        {
          attr_type: 'explain',
          attr_name: '说明信息',
          attr_value: '说明信息详细描述'
        }
      ],
      explain: [
        {
          attr_type: 'other',
          attr_name: '其他提醒',
          attr_value: '其他特殊信息提醒描述'
        }
      ],
      cert: {
        code: '',
        state: ''
      },
      user: {
        user_type: 'buyer',
        user_name: '用户名',
        user_mobile: '18888888888'
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
          order_cert,
          pay_amount,
          attributes,
          users,
          products
        } = data;
        this.cert.code = order_cert;
        this.order.id = id;
        this.order.title = title;
        this.order.type = type;
        this.order.order_sn = order_sn;
        this.order.price = pay_amount;
        this.information = [];
        this.explain = [];
        this.order.state = state;
        switch (state) {
          case 'unpaid':
            this.cert.state = '待支付';
            this.order.state_display = '待支付...';
            break;
          case 'paid':
            this.cert.state = '未消费';
            this.order.state_display = '待消费...';
            break;
          case 'refunding':
            this.cert.state = '退款中';
            this.order.state_display = '退款中...';
            break;
          case 'refund':
            this.cert.state = '已退款';
            this.order.state_display = '已退款';
            break;
          case 'complete':
            this.cert.state = '已消费';
            this.order.state_display = '已消费';
            break;
          default:
            this.cert.state = '未知状态';
            this.order.state_display = '未知状态';
            break;
        }
        attributes.forEach(attribute => {
          switch (attribute.attr_type) {
            case 'explain': that.information.push(attribute); break;
            case 'other': that.explain.push(attribute); break;
            case 'wx_order_no': that.order.wx_order_no = attribute.attr_value; break;
          }
        });
        users.forEach(user => {
          if (user.user_type === 'buyer') {
            that.user = user;
          }
        });
        this.product = products[0];
        sessionStorage.tmp = JSON.stringify(this.order);
      }).catch(err => {
        this.$dialog.toast({
          mes: err,
          timeout: 1500,
          icon: 'error'
        });
      });
    },
    coffeeRefund () {
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
          name: 'coffee-refund',
          params: argu
        });
      }
    }
  }
};
</script>
