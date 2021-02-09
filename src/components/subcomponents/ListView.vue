<template>

        <div class="table2">
            <table class="table table-dark table-hover">
                <thead>
                <tr>
                    <th scope="col"  v-for="item in attributes" :key="item">{{item}}</th>
                </tr>
                </thead>

                <tbody>

                <tr v-for="item in array" :key="item">
                    <td v-for="single in item.option" :key="single">{{single}}</td>
                </tr>

                </tbody>
            </table>
        </div>

</template>

<script>
  export default {
    name: 'ListView',
    props: {
        options: Object
    },
      data: function () {
      return {
          attributes: this.options.option_attributes,
          array: this.options.array
      }
    },
    methods:{


    }
  }
</script>


<style>
    .table2{
        width: 70%;
        border-radius: 5px;
        padding: 10px;
        display: block;
        color: black;
        background-color: #F2F3F5;
        margin-left: 3%;
        float: left;
        margin-top: 3%;
    }

    .table{
        margin-bottom: 0px;
    }
</style>
