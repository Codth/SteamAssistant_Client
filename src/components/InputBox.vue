<template>

  <div class="underbar">

    <div class="inputBox">


      <input-holder class="form-control" id="exampleFormControlInput1">
         <input type="text" class="inner-input"  v-bind:class="{shorter_input: this.msg[this.msg.length-1].prompt.prompt_index === 1 }"
                :placeholder= "computedList"
                v-model="form_msg" v-on:keyup.enter="onEnter" v-on:keyup.188="onComma">
      </input-holder>

    </div>


  </div>

</template>

<script>
  global.jQuery = require('jquery');
  var $ = global.jQuery;
  window.$ = $;



  export default {
    name: 'InputBox',
    data: function () {
        return {
            form_msg: "",
            Tags_set: this.$store.getters.getTagsSet,
            msg: this.$store.getters.getList,
        }
    },
    methods:{
      onComma:function(){
        if(this.msg[this.msg.length-1].prompt.prompt_index === 1){
            $('.shorter_input').before('<span class="tag">' + this.form_msg.slice(0, -1)  + '</span>');
            // this.copy_tagList.push(this.form_msg.slice(0, -1))
            this.form_msg = ""
        }
      },
      onEnter: function(){
        if(this.msg[this.msg.length-1].prompt.prompt_index == 1){
            this.$store.dispatch('setSuggestion', false)


            var preTagList = $('.tag')
            var TagList = []

            for(var i=0; i<preTagList.length; i++){
              TagList.push(preTagList[i].innerText)
            }

          console.log(TagList)


            //Remove all the tags in input box
            $('.tag').remove()




            //Send tags to server
            const joinedString = TagList.join(", ")
            this.$store.dispatch('appendToList_ClientMsg', joinedString)
            this.$socket.emit('WordReply', this.jsonGenerator(joinedString));
        }else{

            this.$store.dispatch('appendToList_ClientMsg', this.form_msg);

            if(localStorage.getItem('state') ==  1){

              localStorage.setItem('waiting', 1)
              // this.$store.dispatch('appendToList_ClientMsg_SeverMsg', "............");
            }
            this.$socket.emit('WordReply', this.jsonGenerator(this.form_msg));
        }
        this.form_msg = ""
      },
      jsonGenerator: function(param){
        let obj = {
          replyType: this.msg[this.msg.length-1].prompt.promptType,
          reply_index: this.msg[this.msg.length-1].prompt.prompt_index,
          msg:param,
          options_index: null
        }
        return obj
      }

  },
    computed:{
      computedList: function(){
        var vm = this
        var target;
        let arr = vm.form_msg.split(',')
        if(arr.length!=0){
            target = arr[arr.length-1]
        }else{
          target = vm.form_msg
        }

        this.$store.dispatch('addToCommentList', this.Tags_set.filter(function (item) {
          return item.toLowerCase().indexOf(target.toLowerCase()) !== -1
        }))


        return "Type your message here ..."
      }
    },
    mounted() {
      // Delete the tag name by index (When user remove tag by clicking the tag )
        $(document).on('click', '.tag', function(){
          // var element =$(this)[0].innerText
          $(this).remove();

          // this.deleteElement(element)
          // console.log(this.copy_tagList)
          // var i = 0
          // while(i<this.copy_tagList.length-1){
          //   if(this.copy_tagList[i] == element){
          //     this.copy_tagList.splice(i, 1);
          //     break;
          //   }
          //   i = i + 1
          // }
          //
        });

    }


  }


</script>





<style>
  .inner-input{
    border:0;
    display:inline-block;
    background-color: #F2F3F5;
    width: 100%;
  }

  .shorter_input{
    width: 50%;
  }

  input:focus
  {
    outline-width:0;
  }


  .tag{
    padding-top: 5px;
    margin-right:4px;
    background: SteelBlue;
    border-radius: 7px;
    padding: 4px;
    color: #F2F3F5;
  }

  .inputBox{
    margin-left: 3%;
    height: 4%;
    width: 80%;
    padding-top: 5px;
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
