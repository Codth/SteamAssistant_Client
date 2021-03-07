<template>
    <div>
        <div class="container">
            <div class="row row1">

                <div class="col"></div>

                <div class="col-6 outer-window container">
                    <Display />

                    <div class="input">
                        <InputBox @inputs="onInput"/>
                    </div>


                </div>

                <div class="col"></div>

            </div>
        </div>
    </div>

</template>

<script>

import Display from './Display.vue'
import InputBox from './InputBox.vue'
// import Data from './api.js'


//
const Localhost = "http://127.0.0.1:5000/"


export default {
    name: 'Index',
    components: {
        Display,
        InputBox
    },
    sockets: {
        connect: function () {
            console.log('socket connected')
            localStorage.setItem('id', this.$socket.id)
        },
        server_MSG: function (data) {
            data = JSON.parse(data)
            // this.gateway()
            this.setSuggestion(data)
            this.$store.dispatch('appendToList_ServerMsg', data)
        },

        req:function (data) {
            console.log(data)
        },

        state_Receiver: function(data){
            localStorage.setItem('state', data)
        }
    },
    data: function () {
        return {
            From: null,
            Socket_msg:String,
            serial: 0
        }
    },

    created () {
        // this.Maintain_msg = [...Data.data]

        fetch(Localhost +"/")
            .then(res => res.json())
            .then(data => {
                console.log("Fetch: ", data)
                }
            )

        this.$socket.emit('newUser', "YOOO");

    },
    methods:{
        onInput: function(param){
            var obj = {
                "sender": true,
                "content": param
            }
            this.$socket.emit('client_MSG', param);
            this.Maintain_msg.push(obj)
        },
        setSuggestion: function(data){
            if(data.prompt.prompt_index == 1){
                this.$store.dispatch('setSuggestion', true)
            }
        },
        gateway: function(){
            // if((localStorage.getItem('state') ==  1) && (localStorage.getItem('waiting')==1)){
            //
            //     console.log("Remove the last element )))))))))))))))")
            //     this.$store.dispatch('RemoveLastElement_List')
            //
            // }
        }


    }
}


</script>

<style scoped>
    .row1{
        height: 100vh;
    }

    .outer-window{
        border-style: solid;
        border-color: black;
        height: 80%;
        padding: 0px;
        margin-top: 40px;
        position: relative;

    }

    .input{
        width: 100%;
        height: 6%;
        bottom: 0px;
        position: absolute;
        float: bottom;
    }
</style>
