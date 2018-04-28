<style scoped lang="less">
  @import "./hotel-room.less";
</style>

<template>
  <div class="hotel_room">
    <!-- 顶部导航 -->
    <yd-navbar class="hotel_room_title" title="酒店预订">
      <div @click="$router.push({name: 'hotel', params: {id: hotel.id}})" slot="left">
        <yd-navbar-back-icon>返回</yd-navbar-back-icon>
      </div>
    </yd-navbar>
    <!-- 轮播图片 -->
    <yd-slider class="hotel_room_banners" autoplay="3000">
      <yd-slider-item v-for="(image, key) in hotel.images" :key="key">
        <img :src="image.img_src">
      </yd-slider-item>
    </yd-slider>
    <!-- 简介内容 -->
    <yd-flexbox class="hotel_room_msg" direction="vertical">
      <yd-flexbox-item class="hotel_room_msg_title">
        <span>{{hotel.title}}</span>
      </yd-flexbox-item>
      <yd-flexbox-item class="hotel_room_msg_address" >
        <yd-icon name="warn" size=".2rem" color="#FF685D"></yd-icon>
        <span>入住需要支付押金, 离开时退回</span>
        <div class="hotel_room_msg_price_num">￥{{hotel.price}}</div>
      </yd-flexbox-item>
      <table class="hotel_room_item_date">
        <tr>
          <th class="hotel_room_item_date_status">入住</th>
          <th>
            <yd-datetime v-model="enter" :yearFormat="yearFormat" :month-format="monthFormat" :day-format="dayFormat" type="date" slot="right"></yd-datetime>
          </th>
          <th class="hotel_room_item_date_today">{{enter_week}}</th>
          <th class="hotel_room_item_date_status">离店</th>
          <th>
            <yd-datetime v-model="leave" :start-date="enter" :yearFormat="yearFormat" :month-format="monthFormat" :day-format="dayFormat" type="date" slot="right"></yd-datetime>
          </th>
          <th>{{leave_week}}</th>
          <th class="hotel_room_item_date_total">
            <span slot="left">共{{num}}晚</span>
          </th>
        </tr>
      </table>
    </yd-flexbox>
    <!-- 房间详情 -->
    <yd-flexbox class="hotel_room_item" direction="vertical">
      <div class="hotel_room_item_title">房间详情</div>
        <yd-flexbox-item class="hotel_room_item_msg">
          <div class="hotel_room_item_msg_info" v-for="(tag, key) in hotel.tags" :key="key">
            <span class="tags">{{tag}}</span>
          </div>
        </yd-flexbox-item>
    </yd-flexbox>
    <yd-cell-group class="hotel_room_submit">
      <yd-cell-item>
        <span class="price" slot="left">总价：<em>¥</em>{{pay_price}}</span>
        <span class="button" slot="right" @click="hotelBuy(sn)">立即预订</span>
      </yd-cell-item>
    </yd-cell-group>
  </div>
</template>

<script>
import { productInfo } from '../../../ifucloud/sdk';
const dateFormat = require('dateformat');
export default {
  name: 'hotel-room',
  data () {
    return {
      hotel: {
        title: '',
        about: '',
        price: 0.0,
        sale: 0,
        desc: '',
        tags: '',
        images: [],
        attributes: [],
        prices: []
      },
      sn: '',
      pay_price: 0,
      num: '',
      today: '',
      tomorrow: '',
      enter: '',
      enter_week: '',
      leave: '',
      leave_week: '',
      yearFormat: '<span style="color:#F00;">{value}<i style="font-size: 12px;margin-left: 1px;">年</i></span>',
      monthFormat: '<span style="color:#0BB20C;">{value}<i style="font-size: 12px;margin-left: 1px;">月</i></span>',
      dayFormat: '<span style="color:#FFB400;">{value}<i style="font-size: 12px;margin-left: 1px;">日</i></span>'
    };
  },
  methods: {
    init () {
      this.hotelInfo();
      this.todayFormat();
    },
    hotelInfo () {
      let id = this.$route.params.id;
      let sn = this.$route.params.sn;
      this.sn = sn;
      productInfo(id).then(res => {
        let { data } = res;
        this.hotel.id = data.id;
        this.hotel.title = data.name;
        this.hotel.price = data.price;
        this.hotel.sale = data.sell_num;
        this.hotel.desc = data.desc;
        this.hotel.images = data.images;
        this.hotel.prices = data.prices;
        this.hotel.tags = data.tags;
        data.attributes.forEach(attribute => {
          if (attribute.attr_type === 'about') {
            this.hotel.about = attribute.attr_value;
          } else {
            this.hotel.attributes.push(attribute);
          }
        });
        this.hotel.prices.forEach(price => {
          if (price.sn === sn) {
            this.hotel.title = price.name;
            this.hotel.price = price.number;
            this.hotel.tags = price.tags;
          }
        });
        this.pay_price = this.hotel.price;
      }).catch(error => {
        this.$dialog.toast({
          mes: error,
          timeout: 1500,
          icon: 'error'
        });
      });
    },
    hotelBuy (sn) {
      if (sn) {
        let id = this.$route.params.id;
        let argu = {id: id};
        localStorage.hotelBuy = JSON.stringify({
          sn: sn,
          enter: this.enter,
          leave: this.leave,
          time_span: this.num
        });
        this.$router.push({
          name: 'hotel-buy',
          params: argu
        });
      } else {
        this.$dialog.toast({
          mes: '商品信息错误',
          timeout: 1500,
          icon: 'error'
        });
      }
    },
    todayFormat () {
      let today = new Date();
      let tomorrow = new Date();
      tomorrow.setDate(today.getDate() + 1);
      this.today = dateFormat(today, 'yyyy-mm-dd');
      this.enter = dateFormat(today, 'yyyy-mm-dd');
      this.leave = dateFormat(tomorrow, 'yyyy-mm-dd');
      this.tomorrow = dateFormat(tomorrow, 'yyyy-mm-dd');
      let enter_week = dateFormat(today, 'ddd');
      let leave_week = dateFormat(tomorrow, 'ddd');
      this.enter_week = this.formatWeek(enter_week);
      this.leave_week = this.formatWeek(leave_week);
    },
    formatWeek (week) {
      switch (week) {
        case 'Sun': week = '周日'; break;
        case 'Mon': week = '周一'; break;
        case 'Tue': week = '周二'; break;
        case 'Wed': week = '周三'; break;
        case 'Thu': week = '周四'; break;
        case 'Fri': week = '周五'; break;
        case 'Sat': week = '周六'; break;
      }
      return week;
    },
    getNum () {
      let enter = Date.parse(new Date(this.enter));
      let leave = Date.parse(new Date(this.leave));
      this.num = (leave - enter) / 1000 / 3600 / 24;
      this.pay_price = (parseFloat(this.hotel.price) * this.num).toFixed(2);
    }
  },
  watch: {
    'enter': function (enter) {
      this.getNum();
      let time = new Date(enter);
      let tomorrow = new Date(enter);
      tomorrow.setDate(tomorrow.getDate() + 1);
      let enter_week = dateFormat(time, 'ddd');
      this.enter_week = this.formatWeek(enter_week);
      this.tomorrow = dateFormat(tomorrow, 'yyyy-mm-dd');
    },
    'leave': function (leave) {
      this.getNum();
      let time = new Date(leave);
      let leave_week = dateFormat(time, 'ddd');
      this.leave_week = this.formatWeek(leave_week);
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
