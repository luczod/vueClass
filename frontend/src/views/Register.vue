<script lang="js">
import UserForm from '../components/UserForm/index.vue';
export default {
  name: 'Register',
  components: {
    UserForm
  }
};
</script>

<template>
  <div class="register">
    <h1>Criar uma conta</h1>
    <br />
    <UserForm :user={} page="register" btnText="Registrar" />
  </div>
</template>

<style scoped>
.register {
  text-align: center;
  padding-top: 2.5rem;
  padding-bottom: 6rem;
}
</style>

