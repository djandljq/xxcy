<style scoped lang="less">
  @import "./SelectedTea-info.less";
</style>

<template>
  <yd-pullrefresh class="SelectedTea_info" :callback="init" ref="pullTicketInfo">
    <yd-slider autoplay="3000">
        <yd-slider-item>
            <a href="#">
                <img src="../../../assets/images/selLunbo.png">
            </a>
        </yd-slider-item>
        <yd-slider-item>
            <a href="#">
                <img src="../../../assets/images/selLunbo.png">
            </a>
        </yd-slider-item>
        <yd-slider-item>
            <a href="#">
                <img src="../../../assets/images/selLunbo.png">
            </a>
        </yd-slider-item>
    </yd-slider>
    <div class="SelectedTea_info_title">
      <p class="SelectedTea_info_title_list">红茶大红袍</p>
      <p class="SelectedTea_info_title_introduce">初春新蕊，匠心烘培</p>
      <p class="SelectedTea_info_title_product">¥39<span>¥199</span></p>
    </div>
    <div class="SelectedTea_info_group">
      <p class="SelectedTea_info_group_openGroup">开团人数：20<span>已拼团：14</span></p>
      <div class="SelectedTea_info_group_headPortrait" >
        <img src="../../../assets/images/selName.png"/>
        <img src="../../../assets/images/selName.png"/>
        <img src="../../../assets/images/selName.png"/>
        <img src="../../../assets/images/selName.png"/>
       ...
      </div>
    </div>
    <div class="SelectedTea_info_hint">
      <div class="SelectedTea_info_hint_full">
        <img src="../../../assets/images/ptxqg.png" />
        <span>全场包邮</span>
      </div>
      <div class="SelectedTea_info_hint_full">
        <img src="../../../assets/images/ptxqg.png" />
        <span>极速发货</span>
      </div>
      <div class="SelectedTea_info_hint_full">
        <img src="../../../assets/images/ptxqg.png" />
        <span>支持退款</span>
      </div>
      <p>温馨提示：拼团商品在您开始拼团成功后，开始发货，拼团商品除 质量问题以外，其他理由不接受退款申请。</p>
      <h3>商品详情</h3>
    </div>
    <div class="SelectedTea_info_image">
      <img src="../../../assets/images/ptxqimg.png" />
    </div>
    <div class="SelectedTea_info_time">
      <router-link to="/cart">加入购物车</router-link>
      <router-link to="/SelectedTea-buy" class="SelectedTea_info_time_immediately">立即购买</router-link>
    </div>
  </yd-pullrefresh>
</template>

<script>
import { productInfo } from '../../../ifucloud/sdk';
import defaultImg from '@/assets/images/default_img.jpeg';
export default {
  name: 'SelectedTea-info',
  data () {
    return {
      ticket: {
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
      this.ticketInfo();
    },
    ticketInfo () {
      let id = this.$route.params.id;
      productInfo(id).then(res => {
        let { data } = res;
        this.ticket.id = data.id;
        this.ticket.title = data.name;
        this.ticket.price = data.price;
        this.ticket.sale = data.sell_num;
        this.ticket.desc = data.desc;
        this.ticket.images = data.images;
        this.ticket.prices = data.prices;
        this.ticket.attributes = [];
        data.attributes.forEach(attribute => {
          if (attribute.attr_type === 'about') {
            this.ticket.about = attribute.attr_value;
          } else {
            this.ticket.attributes.push(attribute);
          }
        });
        this.$refs.pullTicketInfo.$emit('ydui.pullrefresh.finishLoad');
      }).catch(error => {
        this.$dialog.toast({
          mes: error,
          timeout: 1500,
          icon: 'error'
        });
      });
    },
    ticketBuy (sn) {
      if (sn) {
        let id = this.$route.params.id;
        let argu = { id: id, sn: sn };
        this.$router.push({
          name: 'ticket-buy',
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
