<template>
  <div id="app">
    <header-component></header-component>
    <router-view></router-view>
  </div>
</template>

<script>
/* eslint-disable vue/no-unused-components */
import HeaderComponent from './components/HeaderComponent.vue'

export default {
  name: 'App',
  components: {
    'header-component': HeaderComponent,
  }
}
</script>

<style>
body {
  margin: 0;
}
</style>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}


.banner {
  font-size: 70px;
  background: rgb(21, 181, 114);
  height: 200px;
}


</style>
