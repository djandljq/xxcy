<style scoped lang="less">
  @import "./hotel-info.less";
</style>

<template>
  <yd-pullrefresh class="hotel_info" :callback="init" ref="pullHotelInfo">
    <!-- 顶部导航 -->
    <yd-navbar class="hotel_info_title" title="酒店预订">
      <div @click="$router.push({name: 'hotel', params: {id: hotel.id}})" slot="left">
        <yd-navbar-back-icon>返回</yd-navbar-back-icon>
      </div>
    </yd-navbar>
    <!-- 轮播图片 -->
    <yd-slider class="hotel_info_banners" autoplay="3000">
      <yd-slider-item v-for="(image, key) in hotel.images" :key="key">
        <img :src="image.img_src">
      </yd-slider-item>
    </yd-slider>
    <!-- 简介内容 -->
    <yd-flexbox class="hotel_info_msg" direction="vertical">
      <yd-flexbox-item class="hotel_info_msg_title">
        <span>{{hotel.title}}</span>
      </yd-flexbox-item>
      <yd-flexbox-item >
        <div class="hotel_info_msg_price_target" v-for="(tag, key) in hotel.tags" :key="key">{{tag}}</div>
      </yd-flexbox-item>
      <yd-flexbox-item class="hotel_info_msg_address" >
        <yd-icon name="location" size="0.2rem"></yd-icon>
        <span v-for="(attr1_item, key) in hotel.attributes" :key="key">
          <span
            v-for="(attr2_item, k) in attr1_item"
            v-if="k=='attr_code' && attr2_item == 'address'"
            :key="k"
          >
            {{attr1_item.attr_value}}
          </span>
        </span>
        <div class="hotel_info_msg_price_num">￥{{hotel.price}}<span>起</span></div>
      </yd-flexbox-item>
    </yd-flexbox>
    <!-- 酒店详情 -->
    <yd-flexbox class="hotel_info_item" direction="vertical">
      <div class="hotel_info_item_title">酒店详情</div>
      <yd-flexbox-item v-for="(attr,  key) in hotel.attributes" :key="key" class="hotel_info_item_content">
        <div class="content">
          <span class="name">{{attr.attr_name}}：</span>
          <span class="value">{{attr.attr_value}}</span>
        </div>
      </yd-flexbox-item>
      <yd-flexbox-item class="hotel_info_item_content">
        <div class="content">
          <span class="name">基本介绍：</span>
          <span class="value" v-html="hotel.desc"></span>
        </div>
      </yd-flexbox-item>
    </yd-flexbox>
    <!-- 房间预订 -->
    <yd-flexbox class="hotel_info_item" direction="vertical">
      <div class="hotel_info_item_title">房间预订</div>
      <table class="hotel_info_item_date">
        <tr>
          <th class="hotel_info_item_date_status">入住</th>
          <th>
            <yd-datetime v-model="enter" :start-date="today" :yearFormat="yearFormat" :month-format="monthFormat" :day-format="dayFormat" type="date" slot="right"></yd-datetime>
          </th>
          <th class="hotel_info_item_date_today">{{enter_week}}</th>
          <th class="hotel_info_item_date_status">离店</th>
          <th>
            <yd-datetime v-model="leave" :start-date="tomorrow" :yearFormat="yearFormat" :month-format="monthFormat" :day-format="dayFormat" type="date" slot="right"></yd-datetime>
          </th>
          <th>{{leave_week}}</th>
          <th class="hotel_info_item_date_total">
              <span slot="left">共{{num}}晚</span>
          </th>
        </tr>
      </table>
      <yd-flexbox-item class="hotel_info_item_content">
        <yd-flexbox class="content prices" v-for="(price, key) in hotel.prices" :key="key">
          <div class="price_info" @click="hotelRoom(price.sn)">
            <div class="price_info_title">{{price.name}}</div>
            <div class="price_info_desc">{{price.desc}}</div>
            <div class="price_info_tags">
              <div class="hotel_info_msg_price_target" v-for="(k) in price.tags.length > 2 ? 2 : price.tags.length" :key="k">{{price.tags[k-1]}}</div>
            </div>
          </div>
          <yd-flexbox-item class="price_active">
            <div class="price_active_num"><em>¥</em>{{price.number}}</div>
            <div class="price_active_button" @click="hotelBuy(price.sn)">立即购买</div>
          </yd-flexbox-item>
        </yd-flexbox>
      </yd-flexbox-item>
    </yd-flexbox>
  </yd-pullrefresh>
</template>

<script>
import { productInfo } from '../../../ifucloud/sdk';
import defaultImg from '@/assets/images/default_img.jpeg';
const dateFormat = require('dateformat');
export default {
  name: 'hotel-info',
  data () {
    return {
      hotel: {
        id: 1,
        title: '',
        about: '',
        price: 0.0,
        sale: 0,
        desc: '',
        tags: '',
        images: [
          {
            img_src: defaultImg
          }
        ],
        attributes: [],
        prices: []
      },
      room_tag_key: 3,
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
        this.hotel.attributes = data.attributes;
        this.$refs.pullHotelInfo.$emit('ydui.pullrefresh.finishLoad');
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
    hotelRoom (sn) {
      if (sn) {
        let id = this.$route.params.id;
        let argu = {id: id, sn: sn, enter: this.enter, leave: this.leave, time_span: this.num};
        this.$router.push({
          name: 'hotel-room',
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
