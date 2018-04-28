<style scoped lang="less">
  @import "./hotel-buy.less";
</style>

<template>
  <div class="hotel_buy">
    <!-- 顶部导航 -->
    <yd-navbar class="hotel_buy_title" title="确认订单">
      <div @click="$router.push({name: 'hotel', params: {id: this.$route.params.id}})" slot="left">
        <yd-navbar-back-icon>返回</yd-navbar-back-icon>
      </div>
    </yd-navbar>
    <yd-cell-group title="房间信息" class="hotel_buy_content">
      <yd-cell-item class="hotel_buy_content_title">
        <span slot="left">
          <div class="name">{{product.name}}</div>
          <div class="desc">
            <yd-icon name="warn" size=".2rem" color="#FF685D"></yd-icon>
            <span>入住需要支付押金, 离开时退回</span>
          </div>
          <div class="time">
            <span>入住: {{product.enter}} 离店: {{product.leave}} 共{{product.time_span}}晚</span>
          </div>
        </span>
      </yd-cell-item>
      <yd-cell-item class="hotel_buy_content_num">
        <span slot="left">预订数量</span>
        <span slot="right">
          <yd-spinner max="10" unit="1" v-model="product.quantity"></yd-spinner>
        </span>
      </yd-cell-item>
      <yd-cell-item class="hotel_buy_content_other">
          <span slot="left">
            <div class="room">房间</div>
            <div class="room">押金</div>
          </span>
          <span slot="right">
            <div>
              <em>¥</em><span>{{product.price}}x{{product.quantity}}</span>
            </div>
            <div>
              <em>¥</em><span>{{product.deposit}}x1</span>
            </div>
          </span>
      </yd-cell-item>
      <yd-cell-item class="hotel_buy_content_tip">
        <span slot="left" class="desc">
          <p>购买后立即可用， 使用日期当日有效</p>
          <p>此产品在使用截止日期前可退款</p>
        </span>
      </yd-cell-item>
    </yd-cell-group>
    <yd-cell-group title="顾客信息" class="hotel_buy_user">
      <yd-cell-item>
        <span slot="left">用户名：</span>
        <yd-input slot="right" required v-model="user.name" max="20" placeholder="请输入用户名"></yd-input>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">手机号：</span>
        <yd-input slot="right" required v-model="user.mobile" max="20" placeholder="请输入手机号"></yd-input>
      </yd-cell-item>
    </yd-cell-group>
    <yd-cell-group class="hotel_buy_submit">
      <yd-cell-item>
        <span class="price" slot="left">总价：<em>¥</em>{{pay_price}}</span>
        <span class="button" slot="right" @click="hotelSubmit">确认下单</span>
      </yd-cell-item>
    </yd-cell-group>
  </div>
</template>

<script>
import {
  orderCreate,
  productInfo
} from '../../../ifucloud/sdk';
export default {
  name: 'hotel-buy',
  data () {
    return {
      image: '',
      product: {
        sn: '',
        sku: '',
        name: '',
        desc: '',
        price: '',
        deposit: '',
        app_id: null,
        quantity: 1,
        attributes: [
          {
            attr_type: '',
            attr_name: '',
            attr_value: ''
          }
        ]
      },
      create_order: false,
      pay_price: 0,
      openid: 0,
      user: {
        name: '',
        mobile: ''
      }
    };
  },
  methods: {
    init () {
      this.hotelInfo();
    },
    hotelInfo () {
      let id = this.$route.params.id;
      let hotelBuy = JSON.parse(localStorage.hotelBuy);
      let sn = hotelBuy.sn;
      let enter = hotelBuy.enter;
      let leave = hotelBuy.leave;
      let time_span = hotelBuy.time_span;
      productInfo(id).then(res => {
        let that = this;
        let {
          sku,
          name,
          price,
          prices,
          image,
          attributes,
          app_id
        } = res.data;
        this.image = image;
        this.product = {
          time_span: time_span,
          enter: enter,
          leave: leave,
          sn: sku,
          sku: sn,
          name: name,
          desc: '',
          price: price,
          app_id: app_id,
          attributes: attributes,
          quantity: 1
        };
        prices.forEach(price => {
          if (price.sn === sn) {
            that.product['name'] = price.name;
            that.product['desc'] = price.desc;
            that.product['price'] = price.number;
            that.pay_price = (parseFloat(this.product.price) * this.product.quantity).toFixed(2);
          }
        });
        attributes.forEach(attributes => {
          if (attributes.attr_code === 'deposit') {
            that.product['deposit'] = attributes.attr_value;
          }
        });
        this.pay_price = parseFloat(this.product.price) * parseFloat(this.product.time_span) + parseFloat(this.product.deposit);
      }).catch(error => {
        this.$dialog.toast({
          mes: error,
          timeout: 1500,
          icon: 'error'
        });
      });
    },
    hotelSubmit () {
      let that = this;
      let user = JSON.parse(localStorage.user);
      let hotelBuy = JSON.parse(localStorage.hotelBuy);
      user.attributes.forEach(attribute => {
        if (attribute.attr_type === 'openid') {
          that.openid = attribute.attr_value;
        }
      });
      if (!this.user.name || !this.user.mobile) {
        this.$dialog.toast({
          mes: '请输入姓名与手机号',
          timeout: 1500,
          icon: 'error'
        });
      } else {
        let users = [
          {
            user_type: 'buyer',
            user_form: 'customer',
            user_name: this.user.name,
            user_address: 'no',
            user_mobile: this.user.mobile
          },
          {
            user_type: 'seller',
            user_form: 'business',
            user_name: '独山旅游官方微信',
            user_address: '独山旅游',
            user_mobile: '1234567'
          }
        ];
        let products = [
          {
            product_type: 'normal',
            product_image: this.image,
            product_sn: this.product.sn,
            product_sku: this.product.sku,
            product_name: this.product.name,
            product_price: this.product.price,
            product_quantity: this.product.quantity
          }
        ];
        let attributes = [
          {
            attr_type: 'openid',
            attr_code: 'openid',
            attr_name: '微信openid',
            attr_value: this.openid
          },
          {
            attr_type: 'explain',
            attr_code: 'date',
            attr_name: '入住时间',
            attr_value: hotelBuy.enter
          },
          {
            attr_type: 'explain',
            attr_code: 'pattern',
            attr_name: '入住方式',
            attr_value: '电子码快速入住'
          }
        ];
        this.product.attributes.forEach(attr => {
          switch (attr.attr_type) {
            case 'address':
              attributes.push({
                attr_type: 'explain',
                attr_code: 'address',
                attr_name: '入住地址',
                attr_value: attr.attr_value
              });
              break;
            case 'refund_rule':
              attributes.push({
                attr_type: 'explain',
                attr_code: 'refund_rule',
                attr_name: '退改规则',
                attr_value: attr.attr_value
              });
              break;
          }
        });
        attributes.push({
          attr_type: 'explain',
          attr_code: 'quantity',
          attr_name: '购买数量',
          attr_value: this.product.quantity
        });
        attributes.push({
          attr_type: 'deposit',
          attr_code: 'deposit',
          attr_name: '押金',
          attr_value: this.product.deposit
        });
        orderCreate({
          'type': 'hotel',
          'source': 'wechat',
          'pay_type': 'wechat',
          'state': 'unpaid',
          'image': this.image,
          'buyer_username': user.username,
          'seller_username': 'dsly',
          'title': this.product.name,
          'total_amount': this.pay_price,
          'pay_amount': this.pay_price,
          'discount_amount': 0,
          'products': products,
          'attributes': attributes,
          'users': users,
          'amounts': [],
          'discounts': [],
          'refunds': [],
          'remarks': [],
          'invoices': []
        }).then(res => {
          let { order_sn } = res.data;
          let argu = {sn: order_sn};
          localStorage.hotelBuy = '';
          that.$router.push({
            name: 'hotel-order',
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
    'product.quantity': function (num) {
      this.pay_price = (parseFloat(this.product.price) * num * parseFloat(this.product.time_span) + parseFloat(this.product.deposit)).toFixed(2);
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
