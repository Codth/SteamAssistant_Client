<template>
  <simplebar data-simplebar-auto-hide="true" class="inner-window column area">

<!--    <div  class="inner-window column area" id="messageBody">-->
      <Bubble
              v-for="post in msgs"
              v-bind:key="post.serial"
              v-bind:serials="post.serial"
              v-bind:post="post"

      ></Bubble>

      <Suggestion class="toolbar"></Suggestion>

<!--    </div>-->

  </simplebar>


</template>

<script>
  import Bubble from "./Bubble"
  import Suggestion from "./Suggestion"

  import simplebar from 'simplebar-vue';
  import 'simplebar/dist/simplebar.min.css';

  global.jQuery = require('jquery');
  var $ = global.jQuery;
  window.$ = $;


  export default {
    name: 'Display',
    components: {Bubble, Suggestion, simplebar},
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
    position: relative;
  }

  .area{
    background-color: white;
    /*overflow-y: scroll;*/
  }

  .toolbar{
    text-align: center;
    background-color: #F2F3F5;
    color: cornflowerblue;
    font-size: large;
    font-weight: bolder;
    width: 70%;
    padding: 5px;
    border-radius: 10px;
    bottom: 5%;
    position: absolute;
    margin-left: 13%;
    max-height: 37px;
  }
</style>

