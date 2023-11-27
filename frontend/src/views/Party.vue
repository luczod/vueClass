<script lang="js">
export default {
  name: 'Party',
  components: {
  },
  data() {
    return {
      party: {},
      showImg: 0,
    }
  },
  created() {
    // load party
    this.getParty();
  },
  methods: {
    async getParty() {

      // get id from url and token from state
      const id = this.$route.params.id;
      const token = this.$store.getters.token;

      await fetch(`http://localhost:3002/api/party/${id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "auth-token": token
        }
      })
        .then((resp) => resp.json())
        .then((data) => {

          this.party = data.party;

          this.party.partyDate = new Date(this.party.partyDate).toLocaleDateString();

          this.party.photos.forEach((photo, index) => {
            this.party.photos[index] = photo.replace("public", "http://localhost:3002").replaceAll("\\", "/");
          });

          console.log(this.party);
          console.log(this.party.photos);

        })
        .catch((err) => {
          console.log(err);
        })

    },

    async newImg(index) {
      console.log(index);
      this.showImg === index
    }
  }
}
</script>

<template>
  <div class="party">
    <h1>{{ party.title }}</h1>
    <div class="party-container">
      <div class="party-images" v-if="party.photos">
        <div class="main-image" :style="{ 'background-image': 'url(' + party.photos[`${showImg}`] + ')' }"></div>
        <div class="party-mini-images" v-if="party.photos[1]">
          <div class="mini-image" @click="newImg(index)" v-for="(photo, index) in party.photos" :key="index"
            :style="{ 'background-image': 'url(' + party.photos[index] + ')' }"></div>
        </div>
      </div>
      <div class="party-details">
        <p class="bold">Descrição da festa:</p>
        <p class="party-description">{{ party.description }}</p>
        <p class="bold">Data da festa:</p>
        <p class="party-date">{{ party.partyDate }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.party {
  text-align: center;
  padding-top: 2.5rem;
  padding-bottom: 6rem;
  width: 62.5rem;
  margin: 0 auto;
}

.party h1 {
  margin-bottom: 2.5rem;
}

.party-container {
  display: flex;
}

.party-images {
  width: 26rem;
  margin-right: 1rem;
}

.main-image {
  width: 100%;
  height: 25rem;
  background-color: #CCC;
  margin-bottom: 1rem;
  background-position: center;
  background-size: cover;
  border-radius: 1rem;
}

.party-mini-images {
  display: flex;
  flex-wrap: wrap;
  cursor: pointer;

}

.mini-image {
  width: 120px;
  height: 120px;
  margin-right: 15px;
  background-color: #CCC;
  margin-bottom: 15px;
  background-position: center;
  background-size: cover;
  border-radius: 1rem;
}

.party-details {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.bold {
  font-weight: bold;
  margin-bottom: 12px;
}

.party-description,
.party-date {
  margin-bottom: 20px;
}
</style>
