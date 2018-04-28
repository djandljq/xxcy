<style scoped lang="less">
  @import "my-address.less";
</style>

<template>
  <div class="my_address">
    <yd-navbar class="my_address_title" title="我的地址">
      <div @click="$router.push({name: 'user'})" slot="left">
        <yd-navbar-back-icon>返回</yd-navbar-back-icon>
      </div>
    </yd-navbar>
    <content-empty v-if="cartList.length <= 0"></content-empty>
  </div>
</template>

<script>
import contentEmpty from '../../components/content-empty';
export default {
  name: "my-address",
  components: {
    contentEmpty
  },
  data () {
    return {
      cartList: []
    };
  }
}
</script>
