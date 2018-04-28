<style scoped lang="less">
  @import "./goods-buy.less";
</style>

<template>
  <div class="goods_buy">
    <!-- 顶部导航 -->
    <yd-navbar class="goods_buy_title" title="订单确认">
      <div @click="$router.push({name: 'goods-info', params: {id: goods.id}})" slot="left">
        <yd-navbar-back-icon>返回</yd-navbar-back-icon>
      </div>
    </yd-navbar>
    <!-- 订单内容 -->
    <yd-flexbox class="goods_buy_content" direction="vertical">
      <yd-cell-group class="goods_buy_content_address">
        <yd-cell-item>
          <span slot="left">
            <yd-icon size="0.35rem" color="#36CB9A" name="ucenter-outline"></yd-icon>
            <span>收货人：</span>
          </span>
          <yd-input slot="right" required v-model="buyer.name" max="20" placeholder="请输入收货人"></yd-input>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">
            <yd-icon size="0.35rem" color="#36CB9A" name="phone2"></yd-icon>
            <span>联系电话：</span>
          </span>
          <yd-input slot="right" required v-model="buyer.tell" placeholder="请输入电话"></yd-input>
        </yd-cell-item>
        <yd-cell-item arrow>
          <span slot="left">
            <yd-icon size="0.35rem" color="#36CB9A" name="location"></yd-icon>
            <span>所在地区：</span>
          </span>
          <input slot="right" type="text" @click.stop="addressShow = true" v-model="address.select" readonly placeholder="请选择收货地址">
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">
            <yd-icon size="0.35rem" color="#36CB9A" name="compose"></yd-icon>
            <span>详细地址：</span>
          </span>
          <yd-input slot="right" required v-model="address.input" max="20" placeholder="请输入详细地址"></yd-input>
        </yd-cell-item>
      </yd-cell-group>
      <yd-flexbox-item class="goods_buy_content_goods">
        <div class="goods_buy_content_goods_heard">商品清单</div>
        <div class="goods_buy_content_goods_info">
          <img class="goods_buy_content_goods_info_img" :src="goods.image" :alt="goods.name">
          <div class="goods_buy_content_goods_info_right">
            <div class="goods_buy_content_goods_info_right_price"><em>¥</em>{{goods.price}}x{{quantity}}</div>
            <div class="goods_buy_content_goods_info_right_title">{{goods.name}}</div>
          </div>
        </div>
        <div class="goods_buy_content_goods_price">
          <span class="total_price">合计：<span class="number">{{pay_price}}</span></span>
          <span class="total_freight">运费：<span class="number">{{goods.freight}}</span></span>
        </div>
      </yd-flexbox-item>
      <yd-flexbox-item class="goods_buy_content_remark">
        <div class="goods_buy_content_remark_heard">备注信息</div>
        <textarea class="goods_buy_content_remark_value" v-model="remark" placeholder="请输入备注信息" maxlength="200"></textarea>
      </yd-flexbox-item>
    </yd-flexbox>
    <yd-cell-group class="goods_buy_submit">
      <yd-cell-item>
        <span class="price" slot="left">实付款：<em>¥</em>{{pay_price}}元</span>
        <span class="button" slot="right" @click="goodsBuySubmit">立即支付</span>
      </yd-cell-item>
    </yd-cell-group>
    <yd-cityselect v-model="addressShow" :callback="selectAddress" :items="district"></yd-cityselect>
  </div>
</template>

<script>
import {
  orderCreate,
  productInfo
} from '../../../ifucloud/sdk';
import District from 'ydui-district/dist/gov_province_city_area_id';
export default {
  name: 'goods-buy',
  data () {
    return {
      pay_price: 0,
      remark: '',
      quantity: 0,
      addressShow: false,
      address: {
        select: '',
        input: ''
      },
      district: District,
      buyer: {
        name: '',
        tell: ''
      },
      goods: {
        id: 1,
        sn: 1,
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
      this.quantity = this.$route.params.num;
      this.goodsInfo();
    },
    goodsInfo () {
      let id = this.$route.params.id;
      productInfo(id).then(res => {
        let { data } = res;
        let goods = data;
        let attributes = goods.attributes;
        let prices = goods.prices;
        attributes.forEach(attr => {
          if (attr.attr_type === 'explain' && attr.attr_code === 'freight') {
            goods['freight'] = attr.attr_value;
          }
        });
        goods['sn'] = prices[0] ? prices[0].sn : '01';
        this.goods = goods;
        let pay_price = parseFloat(this.goods.price * this.quantity);
        pay_price = parseFloat(this.goods.freight) + parseFloat(pay_price);
        this.pay_price = pay_price.toFixed(2);
      }).catch(error => {
        this.$dialog.toast({
          mes: error,
          timeout: 1500,
          icon: 'error'
        });
      });
    },
    selectAddress (ret) {
      this.address.select = ret.itemName1 + ' ' + ret.itemName2 + ' ' + ret.itemName3;
    },
    goodsBuySubmit () {
      if (!this.buyer.name || !this.buyer.tell) {
        this.$dialog.toast({
          mes: '收货人及电话不可为空',
          timeout: 1500,
          icon: 'error'
        });
      } else if (!this.address.select || !this.address.input) {
        this.$dialog.toast({
          mes: '收货地址不可为空',
          timeout: 1500,
          icon: 'error'
        });
      } else {
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
            user_name: this.buyer.name,
            user_address: this.address.input,
            user_mobile: this.buyer.tell
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
            product_sku: this.goods.sku,
            product_image: this.goods.image,
            product_sn: this.goods.sn,
            product_name: this.goods.name,
            product_price: this.goods.price,
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
            attr_type: 'address',
            attr_code: 'address',
            attr_name: '收货地址',
            attr_value: this.address.select + ',' + this.address.input
          }
        ];
        let remarks = [];
        if (this.remarks) {
          remarks.push({
            remark_type: 'customer',
            remark_desc: this.remarks
          });
        }
        orderCreate({
          'type': 'goods',
          'source': 'wechat',
          'pay_type': 'wechat',
          'state': 'unpaid',
          'image': this.goods.image,
          'buyer_username': user.username,
          'seller_username': 'dsly',
          'title': this.goods.name,
          'total_amount': this.pay_price,
          'pay_amount': this.pay_price,
          'discount_amount': 0,
          'products': products,
          'attributes': attributes,
          'users': users,
          'remarks': remarks,
          'amounts': [],
          'discounts': [],
          'refunds': [],
          'invoices': []
        }).then(res => {
          let { order_sn } = res.data;
          let argu = {sn: order_sn};
          that.$router.push({
            name: 'goods-order',
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
  mounted () {
    this.init();
  },
  activated () {
    this.init();
  }
};
</script>
