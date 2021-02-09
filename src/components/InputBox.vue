<template>

  <div class="underbar">

    <div class="inputBox">
      <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Type Your Message ... " v-model="form_msg" v-on:keyup.enter="onEnter" >
    </div>
<!--    <button type="button" class="btn btn-primary but1" >Enter</button>-->

  </div>

</template>

<script>
  export default {

    name: 'InputBox',
    data: function () {
        return {
            form_msg: ""
        }
    },
    methods:{
      onEnter: function(){
        this.$store.dispatch('appendToList_ClientMsg', this.form_msg)
        this.form_msg = ""
      }
  }
}




</script>





<style>

  .inputBox{
      margin-left: 3%;
    height: 4%;
    width: 80%;
    padding-top: 5px;

  }

    .but1{
        height: 4%;
        width: 13%;
    }

    #exampleFormControlInput1{
        border-radius: 20px;
        background-color: #F2F3F5;
    }

  .form-control:focus{
    border-color: #cccccc;
    -webkit-box-shadow: none;
    box-shadow: none;
  }

  .underbar{
    background-color: lightblue;
    height: 100%;
  }
</style>
