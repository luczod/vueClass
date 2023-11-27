<script>

import LoginForm from '../components/LoginForm/index.vue'
export default {
  name: 'Login',
  components: {
    LoginForm
  }
};
</script>

<template>
  <div class="login">
    <h1>Entrar no Party Time</h1>
    <LoginForm :user="{}" page="login" btnText="Entrar" />
  </div>
</template>

<style scoped>
.login {
  text-align: center;
  padding-top: 40px;
  padding-bottom: 100px;
}

.login h1 {
  margin-bottom: 40px;
}
</style>
