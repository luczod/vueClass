<script>
import UserForm from '../components/UserForm/index.vue';
import store from '../store'
export default {
  name: 'Profile',
  components: {
    UserForm
  },
  data() {
    return {
      user: {},
      componentKey: 0
    }
  },
  created() {
    // load user
    this.getUser();
  },
  methods: {
    async getUser() {
      // get id from token
      const id = store.getters.userId
      const token = store.getters.token

      await fetch(`http://localhost:3002/api/user/${id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "auth-token": token
        }
      })
        .then((res) => {
          return res.json()
        })
        .then((data) => {

          console.log(data.user);

          this.user = data.user;

          this.componentKey += 1;

        })
        .catch((err) => {
          console.log(err);
        })

    }
  }
};
</script>

<template>
  <div class="profile">
    <h1>Editar Perfil</h1>
    <br />
    <UserForm :user="user" page="profile" btnText="Editar" :key="componentKey" />
  </div>
</template>

<style scoped>
.profile {
  text-align: center;
  padding-top: 2.5rem;
  padding-bottom: 6rem;
}
</style>
