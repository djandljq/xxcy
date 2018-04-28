<style scoped lang="less">
  @import "./business.less";
</style>

<template>
  <div class="business">
    <yd-slider autoplay="3000">
        <yd-slider-item>
            <a href="#">
              <img src="../../../assets/images/banner.png">
            </a>
        </yd-slider-item>
        <yd-slider-item>
            <a href="#">
              <img src="../../../assets/images/banner.png">
            </a>
        </yd-slider-item>
    </yd-slider>
    <div class="business_platform">平台介绍</div>
    <div class="business_introduction">{{introduction}}</div>
    <yd-cell-group title="公司信息">
        <yd-cell-item>
            <span slot="left">公司名称&nbsp;&nbsp;</span>
            <input slot="right" type="text" >
        </yd-cell-item>
        <yd-cell-item>
            <span slot="left">联系方式&nbsp;&nbsp;</span>
            <input slot="right" type="number" >
        </yd-cell-item>
        <yd-cell-item>
            <span slot="left">公司地址&nbsp;&nbsp;</span>
            <input slot="right" type="text">
        </yd-cell-item>
    </yd-cell-group>
  </div>
</template>

<script>
import { productList } from '../../../ifucloud/sdk';
export default {
  name: 'business',
  data () {
    return {
      count_page: 1,
      goods: [],
      introduction: '茶叶销售、定制茶叶销售、定制茶叶销售、定制 茶叶销售、茶叶销售、定制茶叶销售、定制茶叶 销售、定制茶叶销售、茶叶销售、定制茶叶销售 、定制茶叶销售、定制茶叶销售、茶叶销售、定 制茶叶销售、定制茶叶销售、定制茶叶销售、'
    };
  },
  methods: {
    init () {
      this.goodsList(1);
    },
    loadList () {
      this.count_page++;
      this.loadGoodsList(this.count_page);
    },
    loadGoodsList (page) {
      productList(page, {type: 'goods'}).then(res => {
        let { data, meta } = res;
        this.count_page = meta.pagination.count;
        this.total_pages = meta.pagination.total_pages;
        this.goods = [...this.goods, ...data];
        if (this.count_page >= this.total_pages) {
          this.$refs.crollGoodsList.$emit('ydui.infinitescroll.loadedDone');
          return;
        }
        this.$refs.crollGoodsList.$emit('ydui.infinitescroll.finishLoad');
      }).catch(error => {
        this.$dialog.toast({
          mes: error,
          timeout: 1500,
          icon: 'error'
        });
      });
    },
    goodsList (page) {
      productList(page, {type: 'goods'}).then(res => {
        let { data, meta } = res;
        this.count_page = meta.pagination.count;
        this.total_pages = meta.pagination.total_pages;
        this.goods = data;
        this.$refs.crollGoodsList.$emit('ydui.infinitescroll.reInit');
        this.$refs.pullGoodsList.$emit('ydui.pullrefresh.finishLoad');
        if (this.count_page >= this.total_pages) {
          this.$refs.crollGoodsList.$emit('ydui.infinitescroll.loadedDone');
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
