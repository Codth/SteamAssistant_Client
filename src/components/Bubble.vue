<template>
    <div style="display: block;" @mouseover="mouseOver" @mouseout="active = false">


        <!--        Bot MSG          -->
        <div  v-if="sender == false">
            <img id="avatar" src="../assets/steam.png">

            <div v-if="optionType == 3">

                <ListView  v-bind:options="options"></ListView>

                <div class="rightside" style="float: left" v-show="active">
                    <i class="fas fa-reply small-icon"></i>
                    <i class="fas fa-ellipsis-h small-icon"></i>
                </div>
            </div>

            <div v-else>
                <div>
                    <div class="leftside">
                        <p  class="bubble-inside isBot" @mouseover="trigger">
                            {{prompt_content}}
                        </p>
                    </div>

                    <div class="rightside" style="float: left" v-show="active">
                        <i class="fas fa-reply small-icon"></i>
                        <i class="fas fa-ellipsis-h small-icon"></i>
                    </div>
                </div>


                <div id="Option-area" v-show="this.hasOptions == true">
                    <br style="clear: both">
                    <Option_Button
                            v-for="post in options.array"
                            v-bind:key="post.index"
                            v-bind:option="post.option"
                            v-bind:index="post.index"
                            @buttons = "onButton"
                    ></Option_Button>
                </div>
            </div>

        </div>



        <!--        Sender MSG          -->
        <div v-if="sender == true">
            <div class="leftside">
                <p  class="bubble-inside isMe" >
                 {{prompt_content}}
                </p>
            </div>

            <div class="rightside" style="float: right" v-show="active">
                <i class="fas fa-ellipsis-h small-icon"></i>
                <i class="fas fa-reply small-icon"></i>
            </div>
        </div>




        <br style="clear: both">
    </div>

</template>

<script>
    import Option_Button from "./subcomponents/Option_Button"
    import ListView from "./subcomponents/ListView"

  export default {
      name: 'Bubble',
      components: {Option_Button, ListView},
        props: {
            post: Object
        },

    data: function () {
      return {
          sender: this.post.sender,

          dialogType: this.post.setting.dialogType,

          hasPrompt: this.post.hasPrompt,
          promptType: this.post.prompt.promptType,
          prompt_index: this.post.prompt.prompt_index,
          prompt_content: this.post.prompt.prompt_content,

          hasOptions: this.post.hasOptions,
          optionType: this.post.options.optionType,
          options: this.post.options,

          active: false
      }
    },
    methods:{
        mouseOver: function(){
            this.active = !this.active;
        },
        trigger: function(){
            setTimeout(function(){  }, 1000)
        },
        onButton: function(param){
            let temp_obj = this.jsonGenerator(param.attribute)
            console.log("Sending button signal")
            this.$socket.emit('ButtonClick', temp_obj);
            this.$store.dispatch('appendToList_ClientMsg', param.option_name)
        },
        jsonGenerator: function(param){
            let obj = {
                replyType: this.promptType,
                reply_index: this.prompt_index,
                msg:null,
                options_index: param
            }
            return obj
        }


    }
  }
</script>

<style>

    .bubble-inside{
        width: fit-content;
        border-radius: 20px;
        padding: 10px;
        margin: 10px;
        border-bottom: grey 1px solid;
        display: block;
        color: black;
        background-color: #F2F3F5;
    }


    .isMe{
        margin-right: 27px;
        float: right;
        background-color: rgb(0, 153, 255);
        color: white;
    }


    .isBot{
        float: left;
    }

    .rightside{
        margin-top: 4%;
        color: #CCCCCC;
    }

    .small-icon{
        margin: 2px;
    }

    .small-icon:hover {
        color: rgb(0, 153, 255);
        cursor: pointer;
    }

    #avatar{
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-top: 23px;
        margin-left: 5px;
        float: left;
    }

    p{
        font-family: "Motiva Sans", Sans-serif;
    }

    #Option-area{
        margin-left: 7%;
    }
</style>

