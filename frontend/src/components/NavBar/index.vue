<script  lang="js">
import { RouterLink } from 'vue-router';
import { mapState } from 'vuex';

export default {
  name: "NavBar",
  data() {
    return {

    }
  },
  methods: {
    logout(e) {
      e.preventDefault();

      // Emit event to logout user
      this.$store.commit("logout");
      // redirect
      this.$router.push("/");
    }
  },
  computed: {
    ...mapState([
      'authenticated',
    ])
  }
}
</script>

<template>
  <nav id="nav">
    <router-link to="/profile" id="logo-container">
      <img src="/img/partytimelogo.png" alt="Party Time" />
    </router-link>
    <h2 id="nav-title">Party Time</h2>
    <div id="nav-links">
      <!-- <router-link :to="{ name: 'home' }">Home</router-link> -->
      <router-link to="/">Festas</router-link>
      <router-link to="/login" v-show="!authenticated">Entrar</router-link>
      <router-link to="/register" v-show="!authenticated">Cadastrar</router-link>
      <router-link to="/dashboard" v-show="authenticated">Dashboard</router-link>
      <router-link to="/profile" v-show="authenticated">Configurações</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/register">Cadastrar</router-link>
      <button @click="logout($event)" v-show="authenticated">Logout</button>
    </div>
  </nav>
</template>

<style scoped>
#nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  padding: 1.2rem;
  background-color: rgb(226 232 240);
  border-bottom: 1px solid #a3a3a3;
}

#nav img {
  width: 2.25rem;
}

#nav-title {
  font-size: 3rem;
  font-weight: 300;
}

#logo-container,
#nav-links {
  width: 25rem;
}

#nav-links {
  display: flex;
  justify-content: flex-end;
}

#nav-links a {
  display: block;
  position: relative;
  padding: 1.2rem;
}

#nav-links a::after {
  content: '';
  position: absolute;
  bottom: 0.8rem;
  left: 50%;
  width: 0;
  height: 0.2rem;
  background-color: #c1b696;
  transition: all 300ms ease-in-out;
}

#nav-links a:hover::after {
  left: 25%;
  width: 50%;
}

/* button {
  border-color: #fff;
  border: none;
  font-size: 1rem;
  cursor: pointer;
} */

button {
  width: fit-content;
  text-transform: uppercase;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  cursor: pointer;
  border-radius: 0.8rem;
  color: black;
  background-color: transparent;
  border: 0;
  transition: 200ms;
}

button:hover {
  color: #c1b696;
}
</style>


