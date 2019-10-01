<template>
  <div id="app">
    <Nav></Nav>
    <router-view></router-view>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import Nav from './components/nav/Nav'

export default {
  name: 'App',
  components: {
    HelloWorld,Nav
  }
}
</script>

<style>

</style>
