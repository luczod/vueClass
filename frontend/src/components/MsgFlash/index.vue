<script setup lang="js"></script>

<script lang="js">
export default {
  name: 'MsgFlash',
  props: ['msg', 'msgClass'],
};
</script>

<template>
  <p class="msg" :class="msgClass" v-if="msg">{{ msg }}</p>
</template>

<style scoped>
.msg {
  max-width: 31rem;
  position: fixed;
  margin: 1.5rem auto;
  padding: 1.5rem;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  transition: all 300ms ease-in;
}

.success {
  bottom: 1rem;
  right: 1rem;
  color: #155724;
  background-color: #d4edda;
  border-color: #c3e6cb;
}

.error {
  top: 1rem;
  left: 50%;
  transform: translate(-50%);
  color: #721c24;
  background-color: #f8d7da;
  border-color: #f5c6cb;
}
</style>
