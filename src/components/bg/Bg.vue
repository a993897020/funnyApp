<template>
  <div class="bg">
    
  </div>
</template>

<script>
export default {
  name: 'bg',
  data () {
    return {

    }
  },
  created(){
      setTimeout(()=>{
          this.goHome();
      },2000)
  },
  methods:{
      goHome(){
          this.$router.push("/home")
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
 .bg{
     position:fixed;
     top: 0px;
     left: 0;
     width: 100%;
     height: 100%;
     background-repeat: no-repeat;
     background-size:100% 100%;
     background-image:url("./image/bg.jpg");

 }
</style>
