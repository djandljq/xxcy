<template>
  <div>
    <div v-if="display" @click="closeCart" class="cart_background"></div>
    <div v-if="display" class="goods_cart">
      <div class="goods_cart_sku">
        <img class="goods_cart_sku_img" :src="image" :alt="title">
        <div class="goods_cart_sku_info">
          <div class="goods_cart_sku_info_price"><em>¥</em>{{price}}</div>
          <div class="goods_cart_sku_info_title">{{title}}</div>
        </div>
        <div class="goods_cart_sku_close" @click="closeCart">
          <span>x</span>
        </div>
      </div>
      <div class="goods_cart_num">
        <div class="goods_cart_num_title">购买数量</div>
        <div class="goods_cart_num_stock">(库存{{stock}})</div>
        <div class="goods_cart_num_quantity">
          <yd-spinner max="100" unit="1" v-model="quantity"></yd-spinner>
        </div>
      </div>
    </div>
    <div v-if="display" class="cart_button">
      <div class="cart_button_cart" @click="cartClick(quantity)">加入购物车</div>
      <div class="cart_button_buy" @click="buyClick(quantity)">立即购买</div>
    </div>
    <div v-if="!display" class="cart_button">
      <div class="cart_button_cart" @click="showCart">加入购物车</div>
      <div class="cart_button_buy" @click="showCart">立即购买</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'goods-cart',
  props: {
    image: {
      type: String,
      default: '../../assets/images/group_31.png',
      required: false
    },
    sku: {
      type: String,
      default: '',
      required: true
    },
    title: {
      type: String,
      default: '',
      required: true
    },
    price: {
      type: Number,
      default: 0,
      required: true
    },
    stock: {
      type: Number,
      default: 0,
      required: true
    },
    cartClick: {
      type: Function,
      required: true
    },
    buyClick: {
      type: Function,
      required: true
    }
  },
  data () {
    return {
      quantity: 0,
      display: false
    };
  },
  methods: {
    closeCart () {
      this.display = false;
    },
    showCart () {
      this.display = true;
    }
  }
};
</script>

<style scoped lang="less">
  @keyframes cart {
    from {
      bottom: -5rem;
    }
    to {
      bottom: 1rem;
    }
  }
  .cart_background {
    top:0;
    width: 100%;
    height: 100%;
    z-index: 1;
    position: fixed;
    opacity: 0.50;
    background-color: #333333;
  }
  .goods_cart {
    bottom: 1rem;
    z-index: 2;
    width: 100%;
    position: fixed;
    background-color: #ffffff;
    animation: cart 0.2s;
    border-top: 0.01rem solid #efefef;
    &_sku {
      padding: 0.25rem;
      height: 2rem;
      border-bottom: 0.01rem solid #efefef;
      &_img {
        float: left;
        height: 1.5rem;
        width: 2rem;
        border: 0.01rem solid #efefef;
      }
      &_info {
        float: left;
        padding: 0.2rem;
        font-size: 0.3rem;
        line-height: 0.5rem;
        &_price {
          color: #F67777;
        }
        &_title {
          color: #333333;
        }
      }
      &_close {
        width: 1rem;
        height: 1rem;
        float: right;
        color: #888888;
        text-align: center;
        line-height: 0.5rem;
        border-radius: 0.5rem;
        margin-top: -0.7rem;
        background-color: #ffffff;
      }
    }
    &_num {
      padding: 0.2rem;
      height: 1rem;
      line-height: 0.6rem;
      &_title {
        color: #272727;
        font-size: 0.3rem;
        display: inline-block;
      }
      &_stock {
        color: #565656;
        font-size: 0.25rem;
        display: inline-block;
      }
      &_quantity {
        float: right;
        display: inline-block;
      }
    }
  }
  .cart_button {
    height: 1rem;
    bottom: 0;
    width: 100%;
    z-index: 3;
    color: #ffffff;
    font-weight: bold;
    line-height: 1rem;
    text-align: center;
    position: fixed;
    &_cart {
      float: left;
      width: 50%;
      display: inline-block;
      background-color: #FFD044;
    }
    &_buy {
      float: right;
      width: 50%;
      display: inline-block;
      background-color: #FF7D00;
    }
  }
</style>
