<style scoped lang="less">
  @import "./redPacket.less";
</style>

<template>
  <div class="redPacket">
    <div class="redPacket_hand">
      <span class="redPacket_hand_left">直领红包</span>
      <span class="redPacket_hand_right">开抢时间:<i>2018-05-01</i></span>
    </div>
    <div class="redPacket_back">
      <img src="../../assets/images/redPacketbj.png" class="redPacket_back_bjimg"/>
      <router-link to="/redPacket-order">
      <img src="../../assets/images/red-envelopes.png" class="redPacket_back_pos" />
      </router-link >
    </div>
    <div class="redPacket_hand bottom">
      <span class="redPacket_hand_left">间领红包</span>
      <span class="redPacket_hand_right">开抢时间:<i>2018-05-01</i></span>
    </div>
    <div class="redPacket_back">
      <img src="../../assets/images/redPacketbj.png" class="redPacket_back_bjimg"/>
      <router-link to="/redPacket-order">
      <img src="../../assets/images/red-envelopes.png" class="redPacket_back_pos"/>
      </router-link >
    </div>
    <div class="reminder">
           温馨提示：实物红包为官方发起的实体商品红包，红包分为直接领 取型和间接领取型，直领型红包抢到后即可收到官方赠送的茶叶， 间领红包抢到后用户需在商城任意购买一款茶叶才可收到红包奖励 的商品。
    </div>
  </div>
</template>

<script>
import {
  productList,
  articleList
} from '../../ifucloud/sdk';
import defaultImg from '@/assets/images/default_img.jpeg';
export default {
  name: 'coffee',
  data () {
    return {
      count_page: 1,
      about: {
        title: '',
        telephone: '',
        address: '',
        images: [defaultImg]
      },
      coffees: []
    };
  },
  methods: {
    init () {
      this.coffeeList(1);
      this.coffeeAbout();
    },
    loadList () {
      this.count_page++;
      this.loadCoffeeList(this.count_page);
    },
    coffeeAbout () {
      articleList({type: 'coffeehouse'}).then(res => {
        let that = this;
        let { data } = res;
        let coffeehouse = data[0];
        let { title, image, attributes } = coffeehouse;
        this.about.title = title;
        this.about.images = [image];
        attributes.forEach(attr => {
          if (attr.attr_type === 'explain') {
            switch (attr.attr_code) {
              case 'telephone': that.about.telephone = attr.attr_value; break;
              case 'address': that.about.address = attr.attr_value; break;
            }
          }
        });
      }).catch(error => {
        this.$dialog.toast({
          mes: error,
          timeout: 1500,
          icon: 'error'
        });
      });
    },
    loadCoffeeList (page) {
      productList(page, {type: 'coffee'}).then(res => {
        let { data, meta } = res;
        let coffees = data;
        coffees.forEach((coffee, key) => {
          let attributes = coffee.attributes;
          attributes.forEach(attr => {
            if (attr.attr_type === 'explain' && attr.attr_code === 'work_hours') {
              coffees[key]['time'] = attr.attr_value;
            }
          });
        });
        this.count_page = meta.pagination.count;
        this.total_pages = meta.pagination.total_pages;
        this.coffees = [...this.coffees, ...data];
        if (this.count_page >= this.total_pages) {
          this.$refs.crollCoffeeList.$emit('ydui.infinitescroll.loadedDone');
          return;
        }
        this.$refs.crollCoffeeList.$emit('ydui.infinitescroll.finishLoad');
      }).catch(error => {
        this.$dialog.toast({
          mes: error,
          timeout: 1500,
          icon: 'error'
        });
      });
    },
    coffeeList (page) {
      productList(page, {type: 'coffee'}).then(res => {
        let { data, meta } = res;
        let coffees = data;
        coffees.forEach((coffee, key) => {
          let attributes = coffee.attributes;
          attributes.forEach(attr => {
            if (attr.attr_type === 'explain' && attr.attr_code === 'work_hours') {
              coffees[key]['time'] = attr.attr_value;
            }
          });
        });
        this.count_page = meta.pagination.count;
        this.total_pages = meta.pagination.total_pages;
        this.coffees = coffees;
        this.$refs.crollCoffeeList.$emit('ydui.infinitescroll.reInit');
        this.$refs.pullCoffeeList.$emit('ydui.pullrefresh.finishLoad');
        if (this.count_page >= this.total_pages) {
          this.$refs.crollCoffeeList.$emit('ydui.infinitescroll.loadedDone');
        }
      }).catch(error => {
        this.$dialog.toast({
          mes: error,
          timeout: 1500,
          icon: 'error'
        });
      });
    },
    coffeeBuy (id) {
      let argu = {id: id};
      this.$router.push({
        name: 'coffee-info',
        params: argu
      });
    }
  }
};
</script>
