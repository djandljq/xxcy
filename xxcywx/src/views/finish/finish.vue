<style scoped lang="less">
  @import "./finish.less";
</style>
<template>
  <div class="finish">
    <yd-list theme="1">
      <router-link to="/SelectedTea-info">
        <yd-list-item v-for="(item, key) in list" :key="key" >
            <img slot="img" :src="item.img">
            <p slot="title">{{item.title}}
              <span class="introduce">甜香馥郁悠长、滋味鲜爽醇厚</span>
            </p>
            <yd-list-other slot="other">
                <div>
                    <span class="demo-list-price"><em>¥</em>{{item.price}}</span>
                </div>
                <div class="sold">已售800</div>
            </yd-list-other>
        </yd-list-item>
      </router-link>
    </yd-list>
  </div>
</template>

<script>
import { productList } from '../../ifucloud/sdk';
export default {
  name: 'hotel',
  data () {
    return {
      count_page: 1,
      total_pages: 1,
      hotel: [],
      list: [
        {img: require('../../assets/images/copy2@2x.png'), title: '大红袍礼盒系列38g包邮限量大红袍礼盒系列38g包邮限量', price: 156.23},
        {img: require('../../assets/images/copy2@2x.png'), title: '大红袍礼盒系列38g包邮限量', price: 256.23},
        {img: require('../../assets/images/copy2@2x.png'), title: '大红袍礼盒系列38g包邮限量', price: 356.23},
        {img: require('../../assets/images/copy2@2x.png'), title: '大红袍礼盒系列38g包邮限量', price: 456.23}
      ]
    };
  },
  methods: {
    init () {
      this.hotelList(1);
    },
    loadList () {
      this.count_page++;
      this.loadHotelList(this.count_page);
    },
    loadHotelList (page) {
      productList(page, {type: 'hotel'}).then(res => {
        let { data, meta } = res;
        this.count_page = meta.pagination.count;
        this.total_pages = meta.pagination.total_pages;
        this.hotel = [...this.hotel, ...data];
        if (this.count_page >= this.total_pages) {
          this.$refs.crollHotelList.$emit('ydui.infinitescroll.loadedDone');
          return;
        }
        this.$refs.crollHotelList.$emit('ydui.infinitescroll.finishLoad');
      }).catch(error => {
        this.$dialog.toast({
          mes: error,
          timeout: 1500,
          icon: 'error'
        });
      });
    },
    hotelList (page) {
      productList(page, {type: 'hotel'}).then(res => {
        let { data, meta } = res;
        this.count_page = meta.pagination.count;
        this.total_pages = meta.pagination.total_pages;
        this.hotel = data;
        this.$refs.crollHotelList.$emit('ydui.infinitescroll.reInit');
        this.$refs.pullHotelList.$emit('ydui.pullrefresh.finishLoad');
        if (this.count_page >= this.total_pages) {
          this.$refs.crollHotelList.$emit('ydui.infinitescroll.loadedDone');
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

<style scoped>

</style>
