<style scoped lang="less">
  @import "pending.less";
</style>

<template>
  <div class="pending">
    <div class="pending_title" >
      <p class="pending_title_titleName">待发货</p>
      <div class="pending_title_ordNumber" v-for="(ord, key) in list" :key="key">
        <p>订单编号:{{ord.oddNumbers}}</p>
      </div>
    </div>
    <div class="consignee" v-for="(consignee, key) in address" :key="key">
        <div class="consignee_name">收货人：{{consignee.name}}
             <span>{{consignee.telephone}}</span>
        </div>
        <div class="consignee_address">收货地址:<span>{{consignee.addres}}</span></div>
    </div>
    <ul class="pendingList">
      <li v-for="(item, key) in list" :key="key">
        <div class="details">
          <div class="details_image">
            <img :src="item.img" />
          </div>
          <div class="details_right">
            <h3>{{item.title}}</h3>
            <div class="details_right_prict">
                  <div class="details_right_prict_list">
                    <span>¥{{item.price}}</span>
                 </div>
              <div class="details_right_prict_freight">
                                             运费:<span>{{"¥"+item.freight}}</span>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div class="productList">
      <div class="productList_commodity">
        <div class="productList_commodity_amount">
          <p>商品金额</p>
        </div>
        <div class="productList_commodity_priceList">
          <p>¥98x1</p>
        </div>
      </div>
      <p>运费<span>¥12</span></p>
      <p>合计<span>¥98</span></p>
    </div>
    <div class="logistics" v-for="(log, key) in address" :key="key">
      <p>物流公司:{{log.logistic}}</p>
      <p>快递单号:{{log.courierNumber}}</p>
    </div>
    <div class="refund">
      <router-link to="/refund">退款</router-link>
    </div>
  </div>
</template>

<script>
import { orderList } from '@/ifucloud/sdk';
export default {
  name: 'order',
  data () {
    return {
      key: 'all',
      count_page: 1,
      total_pages: 1,
      ticketOrder: [],
      total: [],
      freights: [],
      amount: [],
      list: [{
        id: '1',
        state: 'stay',
        oddNumbers: '36954552687',
        img: require('@/assets/images/ptimg.png'),
        title: '红茶大红袍 红茶系列罐装 60g*1',
        send: '待派送',
        price: '98',
        freight: '12'
      },
      {
        id: '2',
        state: 'stay2',
        oddNumbers: '36954552687',
        img: require('@/assets/images/ptimg.png'),
        title: '红茶大红袍 红茶系列罐装 60g*1',
        send: '已派送',
        price: '68',
        freight: '12'
      }
      ],
      address: [
        {
          name: 'xxxxx',
          telephone: '13984842424',
          addres: '贵州省贵阳市花果园购物中心斜对面金融街一号楼35楼2501',
          logistic: '圆通快递',
          courierNumber: '728860086994'
        }
      ]
    };
  },
  methods: {
    init () {
      this.getOrderTicketData(1);
    },
    loadList () {
      this.count_page++;
      this.loadOrderTicketData(this.count_page);
    },
    ticketOrderList (label, key) {
      this.key = key;
      this.getOrderTicketData(1);
    },
    loadOrderTicketData (page) {
      let filter = {type: 'ticket'};
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
        this.ticketOrder = [...this.ticketOrder, ...data];
        if (this.count_page >= this.total_pages) {
          this.$refs.crollMyTicketList.$emit('ydui.infinitescroll.loadedDone');
          return;
        }
        this.$refs.crollMyTicketList.$emit('ydui.infinitescroll.finishLoad');
      }).catch(error => {
        this.$dialog.toast({
          mes: error,
          timeout: 1500,
          icon: 'error'
        });
      });
    },
    getOrderTicketData (page) {
      let filter = {type: 'ticket'};
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
        this.ticketOrder = data;
        this.$refs.pullMyTicketList.$emit('ydui.infinitescroll.reInit');
        this.$refs.pullMyTicketList.$emit('ydui.pullrefresh.finishLoad');
        if (this.count_page >= this.total_pages) {
          this.$refs.crollMyTicketList.$emit('ydui.infinitescroll.loadedDone');
        }
      }).catch(error => {
        this.$dialog.toast({
          mes: error,
          timeout: 1500,
          icon: 'error'
        });
      });
    }
  }
};
</script>
