<template>
  <div id="calendar" class="iframe_box">
    <el-calendar v-model="value">
    </el-calendar>
  </div>
</template>

<script>
export default {
  name: 'Calendar',
  data () {
    return {
      value: new Date()
    }
  }
}
</script>
