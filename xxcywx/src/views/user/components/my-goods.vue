<style scoped lang="less">
  @import "my-goods.less";
</style>

<template>
  <yd-pullrefresh class="my_goods" :callback="init" ref="pullMyGoodsList">
    <yd-navbar class="my_goods_title" title="我的特产">
      <div @click="$router.push({name: 'user'})" slot="left">
        <yd-navbar-back-icon>返回</yd-navbar-back-icon>
      </div>
    </yd-navbar>
    <yd-tab class="my_goods_tab" :callback="hotelGoodsList" active-color="#36CB9A">
      <yd-tab-panel label="全部" tabkey="all" active>
      </yd-tab-panel>
      <yd-tab-panel label="待付款" tabkey="unpaid">
      </yd-tab-panel>
      <yd-tab-panel label="待消费" tabkey="paid">
      </yd-tab-panel>
      <yd-tab-panel label="退款中" tabkey="refunding">
      </yd-tab-panel>
      <yd-tab-panel label="已退款" tabkey="refund">
      </yd-tab-panel>
    </yd-tab>
    <yd-infinitescroll :callback="loadList" ref="crollMyGoodsList">
      <yd-list slot="list" class="my_goods_content" theme="4">
        <yd-list-item class="my_goods_content_item" v-for="(order, key) in goodsOrder" :key="key" :href="'/goods/order/' + order.order_sn">
          <img slot="img" :src="order.image">
          <span slot="title">订单号：{{order.order_sn}}</span>
          <yd-list-other class="other" slot="other">
            <div class="other_left">
              <div class="other_left_title">
                <span>{{order.title}}</span>
              </div>
              <div class="other_left_quantity">
                <span>数量：</span>
                <span>{{order.quantity}}张</span>
              </div>
              <div class="other_left_price">
                <span>总价：</span>
                <span><em>¥</em>{{order.pay_amount}}</span>
              </div>
            </div>
            <div class="other_right">
              <span>{{order.state_display}}</span>
            </div>
          </yd-list-other>
        </yd-list-item>
      </yd-list>
      <span slot="doneTip">啦啦啦，啦啦啦，没有数据啦~~</span>
    </yd-infinitescroll>
    <content-empty v-if="goodsOrder.length <= 0"></content-empty>
  </yd-pullrefresh>
</template>

<script>
import { orderList } from '../../../ifucloud/sdk';
import contentEmpty from '../../components/content-empty';
export default {
  name: 'order',
  components: {
    contentEmpty
  },
  data () {
    return {
      key: 'all',
      count_page: 1,
      total_pages: 1,
      goodsOrder: []
    };
  },
  methods: {
    init () {
      this.getGoodsOrderData(1);
    },
    loadList () {
      this.count_page++;
      this.loadGoodsOrderData(this.count_page);
    },
    hotelGoodsList (label, key) {
      this.key = key;
      this.getGoodsOrderData(1);
    },
    loadGoodsOrderData (page) {
      let filter = {type: 'goods'};
      if (this.key && this.key !== 'all') {
        filter.state = this.key;
      }
      orderList(page, filter).then(res => {
        let { meta, data } = res;
        data.forEach((ticket, key) => {
          if (ticket.products[0]) {
            data[key]['quantity'] = ticket.products[0]['product_quantity'];
          }
          switch (ticket.state) {
            case 'unpaid': data[key]['state_display'] = '待付款'; break;
            case 'paid': data[key]['state_display'] = '待消费'; break;
            case 'refunding': data[key]['state_display'] = '退款中'; break;
            case 'refund': data[key]['state_display'] = '已退款'; break;
            case 'complete': data[key]['state_display'] = '已完成'; break;
            default: data[key]['state_display'] = '未知状态'; break;
          }
        });
        this.count_page = meta.pagination.count;
        this.total_pages = meta.pagination.total_pages;
        this.goodsOrder = [...this.goodsOrder, data];
        if (this.count_page >= this.total_pages) {
          this.$refs.crollMyGoodsList.$emit('ydui.infinitescroll.loadedDone');
          return;
        }
        this.$refs.crollMyGoodsList.$emit('ydui.infinitescroll.finishLoad');
      }).catch(error => {
        this.$dialog.toast({
          mes: error,
          timeout: 1500,
          icon: 'error'
        });
      });
    },
    getGoodsOrderData (page) {
      let filter = {type: 'goods'};
      if (this.key && this.key !== 'all') {
        filter.state = this.key;
      }
      orderList(page, filter).then(res => {
        let { meta, data } = res;
        data.forEach((ticket, key) => {
          if (ticket.products[0]) {
            data[key]['quantity'] = ticket.products[0]['product_quantity'];
          }
          switch (ticket.state) {
            case 'unpaid': data[key]['state_display'] = '待付款'; break;
            case 'paid': data[key]['state_display'] = '待消费'; break;
            case 'refunding': data[key]['state_display'] = '退款中'; break;
            case 'refund': data[key]['state_display'] = '已退款'; break;
            case 'complete': data[key]['state_display'] = '已完成'; break;
            default: data[key]['state_display'] = '未知状态'; break;
          }
        });
        this.count_page = meta.pagination.count;
        this.total_pages = meta.pagination.total_pages;
        this.goodsOrder = data;
        this.$refs.crollMyGoodsList.$emit('ydui.infinitescroll.reInit');
        this.$refs.pullMyGoodsList.$emit('ydui.pullrefresh.finishLoad');
        if (this.count_page >= this.total_pages) {
          this.$refs.crollMyGoodsList.$emit('ydui.infinitescroll.loadedDone');
        }
      }).catch(error => {
        this.$dialog.toast({
          mes: error,
          timeout: 1500,
          icon: 'error'
        });
      });
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
