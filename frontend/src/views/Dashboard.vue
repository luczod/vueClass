<script>
import { RouterLink } from 'vue-router';
import DataTable from '../components/DataTable/index.vue'
export default {
  name: 'Dashboard',
  components: {
    DataTable
  },
  data() {
    return {
      parties: []
    }
  },
  methods: {
    async getParties() {

      // get token from state
      const token = this.$store.getters.token;

      await fetch("http://localhost:3002/api/party/userparties", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "auth-token": token
        }
      })
        .then((resp) => resp.json())
        .then((data) => {

          this.parties = data.parties;

        })
        .catch((err) => {
          console.log(err);
        })

    }
  },
  created() {
    // load user parties
    this.getParties();
  },
}
</script>

<template>
  <div class="dashboard">
    <div class="title-container">
      <h1>Gerencie seus eventos</h1>
      <router-link to="/newparty" class="btn">Cadastrar Festa</router-link>
    </div>
    <div v-if="parties.length > 0">
      <DataTable :parties="parties" />
    </div>
    <div v-else>
      <p>Você ainda não tem festas cadastradas, <router-link to="/newparty">clique aqui para criar a sua
          festa!</router-link></p>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  padding: 50px;
  padding-bottom: 100px;
}

.title-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
}

.btn {
  padding: 0.6rem 1rem;
  text-transform: uppercase;
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
</style>
