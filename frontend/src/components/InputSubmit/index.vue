<script lang="js">
export default {
  name: 'InputSubmit',
  props: ['msg', 'blocked'],
};
</script>

<template>
  <input type="submit" class="btn" :value="msg" :disabled="blocked" />
</template>

<style scoped>
.btn {
  width: 25rem;
  margin: 0 auto;
  text-transform: uppercase;
  padding: 0.8rem;
  cursor: pointer;
  border-radius: 0.8rem;
  color: #fff;
  background-color: #25282e;
  border: 0;
  transition: 0.6s;
}

.btn:hover {
  background-color: #141619;
}

.btn:disabled {
  cursor: not-allowed;

}
</style>
