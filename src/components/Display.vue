<template>
  <div class="inner-window column area">
    <Bubble
            v-for="post in msgs"
              v-bind:key="post.serial"
              v-bind:post="post"></Bubble>
  </div>
</template>

<script>
  import Bubble from "./Bubble"

  export default {
    name: 'Display',
    components: {Bubble},
    data: function () {
    return {
        msgs : this.$store.getters.getList
      }
    }

  }
</script>

<style scoped>
  .inner-window{
    height: 94%;
    width: 100%;
    /*border: solid blue;*/
  }

  .area{
    background-color: white;
    overflow-y: scroll;
  }
</style>

