<script setup lang="js">
import { RouterView } from 'vue-router';
import Navbar from './components/NavBar/index.vue';
import FooterFn from './components/FooterFn/index.vue';
</script>

<template>
  <Navbar />
  <div id="wrap-box">
    <router-view class="container" />
  </div>
  <FooterFn />
</template>

<style scoped>
#wrap-box {
  min-height: calc(100vh - 27.5vh);
  clear: both;
}
</style>

<script lang="js">
export default {
  name: 'App',
  components: {
    Navbar,
    FooterFn,
  },
};
</script>
