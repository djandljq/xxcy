<style scoped lang="less">
  @import "hotel-order.less";
</style>

<template>
  <div class="hotel_order">
    <!-- 顶部导航 -->
    <yd-navbar class="hotel_order_title" title="订单详情">
      <div @click="$router.push({name: 'my-hotel'})" slot="left">
        <yd-navbar-back-icon>返回</yd-navbar-back-icon>
      </div>
    </yd-navbar>
    <yd-flexbox direction="vertical" class="hotel_order_content">
      <yd-flexbox-item class="hotel_order_content_harder">
        <div class="payment">
          <span class="payment_left" slot="left">{{order.state_display}}</span>
          <span class="payment_right" slot="right">订单编号：{{order.order_sn}}</span>
        </div>
      </yd-flexbox-item>
      <yd-flexbox-item class="hotel_order_content_about">
        <div class="title">
          <div class="title_name">
            {{order.title}}
          </div>
          <div class="title_desc">
            可随时购买使用
          </div>
        </div>
        <div class="price">
          <div class="price_total">
            <div class="left">订单总价</div>
            <div class="right"><em>¥</em>{{order.price}}</div>
          </div>
          <div class="price_unit">
            <div class="left">门票单价</div>
            <div class="right"><em>¥</em>{{product.product_price}}x{{product.product_quantity}}</div>
          </div>
          <div class="price_deposit">
            <div class="left">押金</div>
            <div class="right"><em>¥</em>{{order.deposit}}</div>
          </div>
        </div>
      </yd-flexbox-item>
      <yd-flexbox-item class="hotel_order_content_info">
        <div class="card">
          <div class="card_main">
            <div class="card_main_item" v-for="(info, key) in explain" :key="key">
              <span class="left">{{info.attr_name}}</span>
              <span class="right">{{info.attr_value}}</span>
            </div>
          </div>
          <hr class="card_hr"/>
          <div class="card_foot">
            <div v-if="order.state !== 'unpaid'" class="card_foot_cert">
              <div class="card_foot_cert_name">电子凭证</div>
              <div class="card_foot_cert_value">{{cert.code}}</div>
              <div class="card_foot_cert_action">
                <div class="cert_state">{{cert.state}}</div>
                <div v-if="order.state === 'paid'" class="cert_button" @click="hotelRefund">申请退款</div>
              </div>
            </div>
            <div class="card_foot_item" v-for="(item, key) in other" :key="key">
              <div class="left">{{item.attr_name}}</div>
              <div class="right explain">{{item.attr_value}}</div>
            </div>
            <div class="card_foot_item">
              <div class="left">费用包含</div>
              <div class="right">{{product.product_name}}</div>
            </div>
          </div>
        </div>
      </yd-flexbox-item>
      <yd-flexbox-item class="hotel_order_content_user">
        <div class="item">
          <div class="left">
            <span class="key">联系人</span>
            <span>{{user.user_name}}</span>
          </div>
          <div class="right">
            <span>{{user.user_mobile}}</span>
          </div>
        </div>
      </yd-flexbox-item>
    </yd-flexbox>
    <a v-if="order.state === 'unpaid'" class="hotel_order_button" :href="'/order/pay/'+order.order_sn">
      确认支付
    </a>
  </div>
</template>

<script>
import { orderInfoBySn } from '../../../ifucloud/sdk';
export default {
  name: 'hotel-order',
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
      explain: [
        {
          attr_type: 'explain',
          attr_code: 'explain',
          attr_name: '说明信息',
          attr_value: '说明信息详细描述'
        }
      ],
      other: [
        {
          attr_type: 'other',
          attr_code: 'other',
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
          // console.log(attribute)
          switch (attribute.attr_type) {
            case 'explain': that.explain.push(attribute); break;
            case 'other': that.other.push(attribute); break;
            case 'wx_order_no': that.order.wx_order_no = attribute.attr_value; break;
            case 'deposit': that.order.deposit = attribute.attr_value; break;
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
    hotelRefund () {
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
          name: 'hotel-refund',
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
