<style scoped lang="less">
  @import "hotel-refund.less";
</style>

<template>
  <div class="hotel_refund">
    <!-- 顶部导航 -->
    <yd-navbar class="hotel_refund_title" title="退款详情">
      <div @click="$router.push({name: 'hotel-order', params: {sn: sn}})" slot="left">
        <yd-navbar-back-icon>返回</yd-navbar-back-icon>
      </div>
    </yd-navbar>
    <yd-flexbox class="hotel_refund_content" direction="vertical">
      <yd-flexbox-item class="hotel_refund_content_title">
        <div class="hotel_title">{{title}}</div>
        <div class="hotel_desc">{{about}}</div>
      </yd-flexbox-item>
      <yd-flexbox-item class="hotel_refund_content_quantity">
        <div class="left">退款数量</div>
        <div class="right">
          <yd-spinner :max="max" unit="1" v-model="quantity"></yd-spinner>
        </div>
      </yd-flexbox-item>
      <yd-flexbox-item class="hotel_refund_content_price">
        <div class="left">可退金额</div>
        <div class="right"><em>¥</em>{{refund_price}}</div>
      </yd-flexbox-item>
      <yd-flexbox-item class="hotel_refund_content_method">
        <div class="left">退款方式</div>
        <div class="right">
          <div>
            原路退回
            <yd-icon name="shield" size="20px" color="#16AA6B"></yd-icon>
          </div>
          <div class="tip">
            (1-7个工作日退款到原路)
          </div>
        </div>
      </yd-flexbox-item>
    </yd-flexbox>
    <div class="hotel_refund_desc">
      <div class="desc_title">退款原因</div>
      <textarea class="desc_content" v-model="desc" placeholder="请输入退款原因" maxlength="200"></textarea>
    </div>
    <yd-button @click.native="handleRefundClick" class="hotel_refund_button" size="large" bgcolor="#36CB9A" color="#FFF">申请提交</yd-button>
  </div>
</template>

<script>
import { orderInfoBySn, orderUpdate } from '../../../ifucloud/sdk';
export default {
  name: 'hotel-refund',
  data () {
    return {
      sn: '',
      id: '',
      max: 1,
      quantity: 1,
      unit_price: 0.00,
      refund_price: 0.00,
      title: '',
      about: '',
      desc: ''
    };
  },
  methods: {
    init () {
      this.getOrderInfo();
    },
    getOrderInfo () {
      let that = this;
      let sn = this.$route.params.sn;
      this.sn = sn;
      orderInfoBySn(sn).then(data => {
        let {
          id,
          title,
          products,
          attributes
        } = data;
        this.id = id;
        this.title = title;
        this.unit_price = products[0].product_price;
        this.max = products[0].product_quantity;
        this.refund_price = this.unit_price;
        attributes.forEach(attribute => {
          if (attribute.attr_type === 'other') {
            that.about = attribute.attr_value;
          }
        });
      }).catch(err => {
        this.$dialog.toast({
          mes: err,
          timeout: 1500,
          icon: 'error'
        });
      });
    },
    handleRefundClick () {
      if (!this.refund_price || !this.desc) {
        this.$dialog.toast({
          mes: '退款原因和金额不可为空',
          timeout: 1500,
          icon: 'error'
        });
      } else {
        orderUpdate(this.id, {
          state: 'refunding',
          refunds: [
            {
              refund_type: 'only_money',
              refund_amount: this.refund_price,
              refund_state: false,
              refund_remark: this.desc
            }
          ]
        }).then(res => {
          let { data } = res;
          let argu = {sn: data.order_sn};
          this.$router.push({
            name: 'coffee-order',
            params: argu
          });
        }).catch(err => {
          this.$dialog.toast({
            mes: err,
            timeout: 1500,
            icon: 'error'
          });
        });
      }
    }
  },
  watch: {
    'quantity': function (num) {
      this.refund_price = (this.unit_price * num).toFixed(2);
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
