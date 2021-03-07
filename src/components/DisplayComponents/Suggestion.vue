<template>


        <div v-show="(commentList.length!= 0) && showSuggestions">

            <div v-for="item in commentList" :key="item" class="single-suggestion">
                {{ item }}
            </div>
        </div>



</template>

<script>
  export default {
    name: 'Suggestion',
    data: function () {
          return {
              commentList: this.$store.getters.getCommentList,
          }
      },
      computed: {
          showSuggestions() {
              return this.$store.getters.getShowSuggestions
          }
      }
  }



</script>


<style>
    .single-suggestion{
        float: left;
        margin-right: 5%;
        text-align: center;
    }
</style>
