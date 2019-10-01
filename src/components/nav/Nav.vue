<template>
  <div class="nav">
    <router-link to="/home" class="item">推荐</router-link>
    <router-link to="/word" class="item">文字</router-link>
    <router-link to="/picture" class="item">图片</router-link>
    <router-link to="/video" class="item">视频</router-link>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
 .nav{
   display:flex;
   justify-content: space-around;
   padding-top: 30px;
   padding-bottom:10px;
   .item{
     font-size: 18px;
     color: #000;
     text-decoration: none;
     padding: 10px;
   }
   .active{
     color: blue;
     position:relative;
   }
   .active:before{
     position:absolute;
     content:"";
     width: 20px;
     height: 2px;
     background-color:blue;
     left: 50%;
     bottom: 0;
     margin-left:-12px;
   }
 }
</style>
