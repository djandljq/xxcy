<template>
<div>
  <div class="content_empty">
    <img class="empty_img" src="@/assets/images/full-order.png">
  </div>
  <p class="null">您的购物车还是空的哦 ～</p>
  <p class="stroll">
    <a href="home">去逛逛</a>
  </p>
</div>
</template>

<script>
export default {
  name: 'content-empty'
};
</script>

<style scoped>
  .content_empty {
    height: 5rem;
    line-height: 5rem;
    text-align: center;
  }
  .content_empty > .empty_img {
    height: 3.5rem;
    display: inline-block;
    vertical-align: middle;
  }
  .null{
    font-size: 0.36rem;
    color: #aaaaaa;
    text-align: center;
  }
  .stroll{
    width: 3.9rem;
    text-align: center;
    font-size:0.36rem;
    color: #fff;
    background: #ff3638;
    border-radius: 0.08rem;
    padding:0.23rem 0;
    margin: 0.64rem auto 0;
  }
</style>
