<template>
    <div class="home">
        <div class="title">这是一个{{msg}}页面</div>
    </div>
</template>
<script>
export default {
  name: 'Home',
  data () {
    return {
      msg: 'data-home'
    }
  }
}
</script>
<style lang="less">
    .home{
        background-color: aqua;
        .title{
            font-size: 40px;
            letter-spacing: 2px;
        }
    }
</style>
