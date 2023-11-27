<script lang="js">
import { RouterLink } from 'vue-router';
export default {
  data() {
    return {
      parties: []
    }
  },
  created() {
    // load public parties
    this.getParties();
  },
  methods: {
    async getParties() {

      await fetch(`http://localhost:3002/api/party/all`, {
        method: "GET",
        headers: {
          "Content-type": "application/json"
        }
      })
        .then((resp) => resp.json())
        .then((data) => {

          data.parties.forEach((party, index) => {

            if (party.partyDate) {
              party.partyDate = new Date(party.partyDate).toLocaleDateString();
            }

            party.photos.forEach((photo, index) => {
              party.photos[index] = photo.replace("public", "http://localhost:3002").replaceAll("\\", "/");
            });

          });

          this.parties = data.parties;

        })
        .catch((err) => {
          console.log(err);
        })

    }
  }
}
</script>

<template>
  <div class="home">
    <h1>Veja as últimas festas</h1>
    <div class="parties-container">
      <div v-for="(party, index) in parties" :key="index" class="party-container">
        <div class="party-img" :style="{ 'background-image': 'url(' + party.photos[0] + ')' }"></div>
        <router-link :to="`/party/${party._id}`" class="party-title">{{ party.title }}</router-link>
        <p class="party-date">Data: {{ party.partyDate }}</p>
        <router-link :to="`/party/${party._id}`" class="party-details-btn">Ver Mais</router-link>
      </div>
    </div>
    <p v-if="parties.length == 0">Não há festas ainda...</p>
  </div>
</template>

<style scoped>
.home {
  text-align: center;
  padding-top: 40px;
  padding-bottom: 100px;
}

.home h1 {
  margin-bottom: 40px;
}

.parties-container {
  display: flex;
  flex-wrap: wrap;
  max-width: 1000px;
  margin: 0 auto;
}

.party-container {
  width: 30.3%;
  margin: 1.5%;
  display: flex;
  flex-direction: column;
}

.party-img {
  width: 100%;
  height: 20rem;
  margin-bottom: 0.75rem;
  background-position: center;
  background-size: cover;
  border-radius: 1rem;
}

.party-title {
  color: #25282e;
  text-decoration: none;
  margin-bottom: 0.75rem;
}

.party-date {
  color: #777;
  margin-bottom: 0.75rem;
}

.party-details-btn {
  padding: 0.6rem 1rem;
  text-transform: uppercase;
  cursor: pointer;
  border-radius: 0.8rem;
  color: #fff;
  background-color: #25282e;
  border: 0;
  transition: 0.6s;
}

.party-details-btn:hover {
  background-color: #141619;
}
</style>
