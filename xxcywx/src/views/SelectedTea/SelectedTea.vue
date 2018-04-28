<style scoped lang="less">
  @import "./SelectedTea.less";
</style>

<template>
  <div class="SelectedTea">
    <yd-slider autoplay="3000" class="SelectedTea_slider">
        <yd-slider-item>
            <router-link to="/SelectedTea-buy">
                <img src="../../assets/images/selLunbo.png">
            </router-link>
        </yd-slider-item>
        <yd-slider-item>
            <router-link to="/SelectedTea-buy">
                <img src="../../assets/images/selLunbo.png">
            </router-link>
        </yd-slider-item>
        <yd-slider-item>
            <router-link to="/SelectedTea-buy">
                <img src="../../assets/images/selLunbo.png">
            </router-link>
        </yd-slider-item>
    </yd-slider>
    <div class="SelectedTea_title">
      <p class="SelectedTea_title_list">红茶大红袍</p>
      <p class="SelectedTea_title_introduce">初春新蕊，匠心烘培</p>
      <p class="SelectedTea_title_product">¥39<span>¥199</span></p>
    </div>
    <div class="SelectedTea_group">
      <p class="SelectedTea_group_openGroup">开团人数：20<span>已拼团：14</span></p>
      <div class="headPortrait">
        <img src="../../assets/images/selName.png"/>
        <img src="../../assets/images/selName.png"/>
        <img src="../../assets/images/selName.png"/>
        <img src="../../assets/images/selName.png"/>
        ...
      </div>
    </div>
    <div class="SelectedTea_time">
        <p>活动截止时间：2018-10-03</p>
        <div class="SelectedTea_time_collage">
          <p><router-link to="/SelectedTea-buy">立即拼团</router-link></p>
        </div>
    </div>
  </div>
</template>

<script>
import { productList } from '../../ifucloud/sdk';
export default {
  name: 'SelectedTea',
  data () {
    return {
      count_page: 1,
      total_pages: 1,
      ticket: []
    };
  },
  methods: {
    init () {
      this.getTicketListData(1);
    },
    loadList () {
      this.count_page++;
      this.loadTicketListData(this.count_page);
    },
    loadTicketListData (page) {
      productList(page, {type: 'ticket'}).then(res => {
        let { data, meta } = res;
        let tickets = [];
        data.forEach((ticket) => {
          let attributes = ticket.attributes;
          let address = '';
          attributes.forEach(attr => {
            if (attr.attr_type === 'explain' &&
              attr.attr_code === 'address') {
              address = attr.attr_value;
            }
          });
          tickets.push({
            id: ticket.id,
            name: ticket.name,
            price: ticket.price,
            images: ticket.images,
            address: address
          });
        });
        this.count_page = meta.pagination.count;
        this.total_pages = meta.pagination.total_pages;
        this.ticket = tickets;
        if (this.count_page >= this.total_pages) {
          this.$refs.crollTicketList.$emit('ydui.infinitescroll.loadedDone');
          return;
        }
        this.$refs.crollTicketList.$emit('ydui.infinitescroll.finishLoad');
      }).catch(error => {
        this.$dialog.toast({
          mes: error,
          timeout: 1500,
          icon: 'error'
        });
      });
    },
    getTicketListData (page) {
      productList(page, {type: 'ticket'}).then(res => {
        let { data, meta } = res;
        let tickets = [];
        data.forEach((ticket) => {
          let attributes = ticket.attributes;
          let address = '';
          attributes.forEach(attr => {
            if (attr.attr_type === 'explain' &&
              attr.attr_code === 'address') {
              address = attr.attr_value;
            }
          });
          tickets.push({
            id: ticket.id,
            name: ticket.name,
            price: ticket.price,
            images: ticket.images,
            address: address
          });
        });
        this.count_page = meta.pagination.count;
        this.total_pages = meta.pagination.total_pages;
        this.ticket = tickets;
        this.$refs.crollTicketList.$emit('ydui.infinitescroll.reInit');
        this.$refs.pullTicketList.$emit('ydui.pullrefresh.finishLoad');
        if (this.count_page >= this.total_pages) {
          this.$refs.crollTicketList.$emit('ydui.infinitescroll.loadedDone');
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
