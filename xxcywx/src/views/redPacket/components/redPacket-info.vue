<style scoped lang="less">
  @import "./redPacket-info.less";
</style>

<template>
  <div class="redPacket_info">
     <div class="redPacket_info_redimg">
      <img src="@/assets/images/success.png" />
     </div>
     <p>红包领取成功!</p>
     <p class="thank">感谢您对西秀茶业公司的支持!</p>
     <div class="botton">
       <router-link class="returnIndex" to="/home">返回首页</router-link>
       <router-link class="returnIndex core" to="/user">个人中心</router-link>
     </div>
  </div>
</template>

<script>
import { productInfo } from '../../../ifucloud/sdk';
import defaultImg from '@/assets/images/default_img.jpeg';
export default {
  name: 'coffee-info',
  data () {
    return {
      coffee: {
        title: '',
        about: '',
        price: 0.0,
        sale: 0,
        desc: '',
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
      this.coffeeInfo();
    },
    coffeeInfo () {
      let id = this.$route.params.id;
      productInfo(id).then(res => {
        let { data } = res;
        this.coffee.id = data.id;
        this.coffee.title = data.name;
        this.coffee.price = data.price;
        this.coffee.sale = data.sell_num;
        this.coffee.desc = data.desc;
        this.coffee.images = data.images;
        this.coffee.prices = data.prices;
        this.coffee.attributes = [];
        data.attributes.forEach(attribute => {
          if (attribute.attr_type === 'about') {
            this.coffee.about = attribute.attr_value;
          } else {
            this.coffee.attributes.push(attribute);
          }
        });
        this.$refs.pullCoffeeInfo.$emit('ydui.pullrefresh.finishLoad');
      }).catch(error => {
        this.$dialog.toast({
          mes: error,
          timeout: 1500,
          icon: 'error'
        });
      });
    },
    coffeeBuySubmit (sn) {
      if (sn) {
        let id = this.$route.params.id;
        let argu = { id: id };
        this.$router.push({
          name: 'coffee-buy',
          params: argu
        });
      } else {
        this.$dialog.toast({
          mes: '商品信息错误',
          timeout: 1500,
          icon: 'error'
        });
      }
    }
  }
};
</script>
