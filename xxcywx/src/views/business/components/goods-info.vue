<style scoped lang="less">
  @import "./goods-info.less";
</style>

<template>
  <yd-pullrefresh class="goods_info" :callback="init" ref="pullGoodsInfo">
    <!-- 顶部导航 -->
    <yd-navbar class="goods_info_title" title="商品详情">
      <div @click="$router.push({name: 'goods'})" slot="left">
        <yd-navbar-back-icon>返回</yd-navbar-back-icon>
      </div>
    </yd-navbar>
    <!-- 轮播图片 -->
    <yd-slider class="goods_info_banners" autoplay="3000">
      <yd-slider-item v-for="(image, key) in goods.images" :key="key">
        <img :src="image.img_src">
      </yd-slider-item>
    </yd-slider>
    <!-- 商品标题 -->
    <yd-flexbox class="goods_info_msg" direction="vertical">
      <yd-flexbox-item class="goods_info_msg_title">
        <span>{{goods.title}}</span>
      </yd-flexbox-item>
      <yd-flexbox-item class="goods_info_msg_price">
        <div class="goods_info_msg_price_number"><em>¥</em>{{goods.price}}</div>
        <div class="goods_info_msg_price_sale"><span>销量{{goods.sale}}</span></div>
        <div class="goods_info_msg_price_freight"><span>运费：{{goods.freight}}</span></div>
      </yd-flexbox-item>
    </yd-flexbox>
    <!-- 商品规格 -->
    <yd-flexbox class="goods_info_attr" direction="vertical">
      <div class="goods_info_attr_title">商品规格</div>
      <yd-flexbox-item class="goods_info_attr_content">
        <div class="goods_info_attr_content_spec" v-for="(spec, key) in goods.specs" :key="key">
          {{spec.attr_name}}：{{spec.attr_value}}
        </div>
      </yd-flexbox-item>
    </yd-flexbox>
    <!-- 图文详情 -->
    <yd-flexbox class="goods_info_desc" direction="vertical">
      <div class="goods_info_desc_title">图文详情</div>
      <yd-flexbox-item class="goods_info_desc_content">
        <div class="content" v-html="goods.desc"></div>
      </yd-flexbox-item>
    </yd-flexbox>
    <div class="goods_info_helper"></div>
    <goods-cart
      class="goods_info_cart"
      :sku="goods.sku"
      :image="goods.image"
      :title="goods.title"
      :price="goods.price"
      :stock="goods.sale"
      :cartClick="goodsAddCart"
      :buyClick="goodsBuy"
    />
  </yd-pullrefresh>
</template>

<script>
import goodsCart from '../../components/goods-cart';
import defaultImg from '@/assets/images/default_img.jpeg';
import {
  productInfo,
  customerUpdateUser
} from '../../../ifucloud/sdk';
export default {
  name: 'goods-info',
  components: {
    goodsCart
  },
  data () {
    return {
      quantity: 1,
      goods: {
        id: '',
        sku: '',
        title: '',
        specs: [],
        price: 0.0,
        sale: 0,
        desc: '',
        freight: '',
        images: [
          {
            img_src: defaultImg
          }
        ],
        attributes: [],
        prices: []
      }
    };
  },
  methods: {
    init () {
      this.goodsInfo();
    },
    goodsInfo () {
      let id = this.$route.params.id;
      productInfo(id).then(res => {
        let { data } = res;
        this.goods = {
          id: data.id,
          sku: data.sku,
          title: data.name,
          price: parseFloat(data.price),
          sale: parseInt(data.sell_num),
          desc: data.desc,
          image: data.image,
          images: data.images,
          prices: data.prices
        };
        let specs = [];
        let freight = '';
        let sn = data.prices[0] ? data.prices[0].sn : '01';
        data.attributes.forEach(attribute => {
          if (attribute.attr_type === 'explain') {
            if (attribute.attr_code === 'freight') {
              freight = attribute.attr_value;
            } else {
              specs.push(attribute);
            }
          }
        });
        this.goods.sn = sn;
        this.goods.specs = specs;
        if (!freight) {
          freight = '包邮';
        }
        this.goods.freight = freight;
        this.$refs.pullGoodsInfo.$emit('ydui.pullrefresh.finishLoad');
      }).catch(error => {
        this.$dialog.toast({
          mes: error,
          timeout: 1500,
          icon: 'error'
        });
      });
    },
    goodsAddCart (quantity) {
      if (quantity) {
        let amount = this.goods.price * quantity;
        let user = JSON.parse(localStorage.user);
        let carts = user.carts ? user.carts : [];
        carts.push({
          title: this.goods.title,
          product_sku: this.goods.sku,
          product_sn: this.goods.sn,
          product_price: this.goods.price,
          image: this.goods.image,
          amount: amount,
          quantity: quantity
        });
        customerUpdateUser(user.id, {
          carts: carts
        }).then(res => {
          let { data } = res;
          localStorage.user = JSON.stringify(data);
          this.$dialog.alert({
            mes: '加入购物车成功！'
          });
        }).catch(err => {
          this.$dialog.toast({
            mes: err,
            timeout: 1500,
            icon: 'error'
          });
        });
      } else {
        this.$dialog.toast({
          mes: '购买数量不可为空',
          timeout: 1500,
          icon: 'error'
        });
      }
    },
    goodsBuy (quantity) {
      if (quantity) {
        let id = this.$route.params.id;
        let argu = { id: id, num: quantity };
        this.$router.push({
          name: 'goods-buy',
          params: argu
        });
      } else {
        this.$dialog.toast({
          mes: '购买数量不可为空',
          timeout: 1500,
          icon: 'error'
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
