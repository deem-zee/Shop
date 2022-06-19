<template>
  <div id="app">
    <div class="banner">Welcome to our shop!</div>
    <products-list></products-list>
  </div>
</template>

<script>
import ProductsList from './components/ProductsList.vue'

export default {
  name: 'App',
  components: {
    'products-list': ProductsList,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.banner {
  font-size: 70px;
  background: rgb(21, 181, 114);
  height: 200px;
}
</style>
