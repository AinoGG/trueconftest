<template>
  <div id="app">
    <HouseComponent />
  </div>
</template>

<script>
import HouseComponent from '@/components/HouseComponent.vue';
export default {
  name: 'App',
  components: {
    HouseComponent
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
</style>
