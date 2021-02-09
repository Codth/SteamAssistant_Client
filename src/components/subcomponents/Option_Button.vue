<template>
    <div>

        <button id="raise" :disabled="disable_indicator" v-on:click="clickButton(index, option)"> {{option_c}} </button>

    </div>

</template>

<script>
  export default {
    name: 'Option_Button',
    props: {
        option: String,
        index: Number
    },

    data: function () {
      return {
          option_c: this.option,
          active: false,
          counter: this.$store.state.Maintain_msg.length
      }
    },
    methods:{
        mouseOver: function(){
            this.active = !this.active;
        },
        clickButton: function (att, option) {
            let obj = {
                option_name: option,
                attribute: att
            }
            this.$emit('buttons', obj)
        }

    },
      computed:{
          disable_indicator:  function () {
              if(this.$store.getters.getCounter != this.counter ) return true
              return false
          }
      }
  }
</script>

<style>
    #raise{
        float: left;
        background-color: #F2F3F5;
        border-radius: 20px;
        margin-left: 10px;
        margin-bottom: 10px;
        outline:none;
    }

    #raise:hover,
    #raise:focus {
        box-shadow: 0 0.5em 0.5em -0.4em var(--hover);
        transform: translateY(-0.25em);
        cursor: pointer;
    }








</style>
