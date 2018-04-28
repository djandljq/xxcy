<style scoped lang="less">
  @import "./redPacket-buy.less";
</style>

<template>
  <div class="redPacket_buy">
     <div class="redPacket_buy_redimg">
      <img src="../../../assets/images/fail.png" />
     </div>
     <p>很遗憾，红包已被领完!</p>
     <p class="thank">请持续关注平台，下一期红包即将开始</p>
     <div class="botton">
       <a class="returnIndex" href="home">返回首页</a>
     </div>
  </div>
</template>

<script>
import {
  orderCreate,
  productInfo
} from '../../../ifucloud/sdk';
export default {
  name: 'coffee-buy',
  data () {
    return {
      quantity: 0,
      pay_price: 0.00,
      coffee: {
        name: '',
        about: '',
        price: 0.0,
        sale: 0,
        desc: '',
        image: '',
        attributes: [],
        prices: []
      }
    };
  },
  methods: {
    init () {
      this.coffeeInfo();
    },
    coffeeInfo () {
      let id = this.$route.params.id;
      productInfo(id).then(res => {
        let { data } = res;
        let coffee = data;
        let attributes = coffee.attributes;
        let prices = coffee.prices;
        attributes.forEach(attr => {
          if (attr.attr_type === 'shop_hours') {
            coffee['time'] = attr.attr_value;
          }
        });
        coffee['sn'] = prices[0] ? prices[0].sn : '01';
        this.coffee = coffee;
        this.pay_price = parseFloat(this.coffee.price * this.quantity).toFixed(2);
      }).catch(error => {
        this.$dialog.toast({
          mes: error,
          timeout: 1500,
          icon: 'error'
        });
      });
    },
    coffeeBuySubmit () {
      let that = this;
      let user = JSON.parse(localStorage.user);
      user.attributes.forEach(attribute => {
        if (attribute.attr_type === 'openid') {
          that.openid = attribute.attr_value;
        }
      });
      let users = [
        {
          user_type: 'buyer',
          user_form: 'customer',
          user_name: user.username,
          user_address: 'no',
          user_mobile: 'no'
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
          product_sku: this.coffee.sku,
          product_image: this.coffee.image,
          product_sn: this.coffee.sn,
          product_name: this.coffee.name,
          product_price: this.coffee.price,
          product_quantity: this.quantity
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
          attr_name: '使用时间',
          attr_value: '随时用'
        },
        {
          attr_type: 'explain',
          attr_code: 'pattern',
          attr_name: '使用方式',
          attr_value: '电子码快速消费'
        }
      ];
      this.coffee.attributes.forEach(attr => {
        if (attr.attr_type === 'explain') {
          switch (attr.attr_code) {
            case 'address':
              attributes.push({
                attr_type: 'explain',
                attr_code: 'address',
                attr_name: '入园地址',
                attr_value: attr.attr_value});
              break;
            case 'refund_rule':
              attributes.push({
                attr_type: 'explain',
                attr_code: 'refund_rule',
                attr_name: '退改规则',
                attr_value: attr.attr_value});
              break;
          }
        }
      });
      attributes.push({
        attr_type: 'explain',
        attr_code: 'pattern',
        attr_name: '购买数量',
        attr_value: this.quantity
      });
      orderCreate({
        'type': 'coffee',
        'source': 'wechat',
        'pay_type': 'wechat',
        'state': 'unpaid',
        'image': this.coffee.image,
        'buyer_username': user.username,
        'seller_username': 'dsly',
        'title': this.coffee.name,
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
        that.$router.push({
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
  },
  watch: {
    'quantity': function (num) {
      this.pay_price = parseFloat(this.coffee.price * num).toFixed(2);
    }
  }
};
</script>
