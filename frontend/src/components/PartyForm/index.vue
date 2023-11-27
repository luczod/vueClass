<script>
import InputSubmit from '../InputSubmit/index.vue';
import Message from '../MsgFlash/index.vue';
import UploadIcon from '../../icons/UploadIcon.vue';

export default {
  name: "PartyForm",
  components: {
    InputSubmit,
    Message,
    UploadIcon
  },
  data() {
    return {
      id: this.party._id || null,
      title: this.party.title || null,
      description: this.party.description || null,
      party_date: this.party.partyDate || null,
      photos: this.party.photos || [],
      privacy: this.party.privacy || false,
      user_id: this.party.userId || null,
      msg: null,
      msgClass: null,
      showMiniImages: true,
    }
  },
  props: ["party", "page", "btnText"],
  methods: {
    async createParty(e) {

      e.preventDefault();

      const formData = new FormData();

      formData.append('title', this.title);
      formData.append('description', this.description);
      formData.append('party_date', this.party_date);
      formData.append('privacy', this.privacy);

      if (this.photos.length > 0) {
        for (const i of Object.keys(this.photos)) {
          formData.append('photos', this.photos[i])
        }
      }

      // get token from state
      const token = this.$store.getters.token;

      await fetch("http://localhost:3002/api/party", {
        method: "POST",
        headers: {
          "auth-token": token
        },
        body: formData
      })
        .then((resp) => resp.json())
        .then((data) => {

          if (data.error) {
            this.msg = data.error;
            this.msgClass = "error";
          } else {
            this.msg = data.msg;
            this.msgClass = "success";
            setTimeout(() => {
              this.$router.push('dashboard');
            }, 1000);

          }
          setTimeout(() => {

            this.msg = null;

          }, 2000);

        })
        .catch((err) => {
          console.log(err);
        })


    },
    onChange(e) {
      const picText = document.querySelector('.pic_image')
      this.photos = e.target.files;
      this.showMiniImages = true;
      console.log(e.target.files);
      const file = e.target.files
      if (file) {
        picText.previousSibling.style.display = 'none';
        // console.log(file);
        for (let image of file) {
          picText.innerHTML += '\n' + image.name + '\n'
        }

      } else {
        picText.previousSibling.style.display = 'block';
        picText.innerHTML = 'Escolha suas imagens'
      }

    },
    async update(e) {

      e.preventDefault();

      const formData = new FormData();

      formData.append('id', this.id);
      formData.append('title', this.title);
      formData.append('description', this.description);
      formData.append('partyDate', this.party_date);
      formData.append('privacy', this.privacy);
      formData.append('user_id', this.user_id);

      if (this.photos.length > 0) {
        for (const i of Object.keys(this.photos)) {
          formData.append('photos', this.photos[i])
        }
      }

      // get token from state
      const token = this.$store.getters.token;

      await fetch("http://localhost:3002/api/party", {
        method: "PUT",
        headers: {
          "auth-token": token
        },
        body: formData
      })
        .then((resp) => resp.json())
        .then((data) => {

          if (data.error) {
            this.msg = data.error;
            this.msgClass = "error";
          } else {
            this.msg = data.msg;
            this.msgClass = "success";
          }

        })
        .catch((err) => {
          console.log(err);
        })

      setTimeout(() => {

        this.msg = null;

      }, 2000);

    }
  }
}
</script>

<template>
  <div>
    <Message :msg="msg" :msgClass="msgClass" />
    <form id="register-form" enctype="multipart/form-data"
      @submit="page === 'newparty' ? createParty($event) : update($event)">
      <input type="hidden" id="id" name="id" v-model="id">
      <input type="hidden" id="user_id" name="user_id" v-model="user_id">
      <div class="input-container">
        <label for="title">Título do Evento:</label>
        <input type="text" id="title" name="title" v-model="title" placeholder="Digite o título">
      </div>
      <div class="input-container">
        <label for="description">Descrição:</label>
        <textarea id="description" name="description" v-model="description" rows="3" maxlength="250"
          placeholder="O que vai acontecer ou o que já aconteceu?"></textarea>
      </div>
      <div class="input-container">
        <label for="party_date">Data da Festa:</label>
        <input type="date" id="party_date" name="party_date" v-model="party_date">
      </div>
      <div class="input-container">
        <span class="label-span">Imagens:</span>
        <div class="img-container">
          <label for="photos">
            <div class="dropezone">
              <UploadIcon />
              <span class="pic_image">Escolha suas imagens</span>
            </div>
          </label>
          <input type="file" accept="image/*" multiple id="photos" name="photos" ref="file" @change="onChange">
        </div>
      </div>
      <div v-if="page === 'editparty' && showMiniImages" class="mini-images">
        <p>Imagens atuais:</p>
        <img id='pic_id' v-for="(photo, index) in photos" :src="`${photo}`" :key="index">
      </div>
      <div class="input-container checkbox-container">
        <label for="privacy">Evento privado</label>
        <input type="checkbox" multiple id="privacy" name="privacy" v-model="privacy">
      </div>
      <InputSubmit :blocked="Boolean(msg) ? true : false" :msg="btnText" />
    </form>
  </div>
</template>



<style scoped>
@keyframes bounce {

  0%,
  100% {
    transform: translateY(-25%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }

  50% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}

#register-form {
  max-width: 400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}

.input-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  position: relative;
  text-align: left;
}

.input-container label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #555;
}

.label-span {
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #555;
}

.input-container input,
.input-container textarea {
  outline: none;
  padding: 0.7rem;
  border-radius: 0.8rem;
  border: 2px solid #e8e8e8;
}

.input-container input:focus,
.input-container textarea:focus {
  border: 2px solid #93c5fd;
}

.checkbox-container {
  flex-direction: row;
}

.checkbox-container input[type='checkbox'] {
  margin-left: 12px;
  margin-bottom: 8px;
}

.mini-images {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 0px;
}

.mini-images p {
  width: 100%;
  font-weight: bold;
  margin-bottom: 15px;
  text-align: left;
}

.mini-images img {
  max-height: 7.5rem;
  margin-right: 15px;
  margin-bottom: 15px;
}

.img-container {
  background-color: white;
  border-width: 2px;
  border-style: dashed;
  border-color: #9ca3af;
  border-radius: 0.8rem;
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
  height: 7rem;
}

.img-container label {
  display: block;
  cursor: pointer;
  height: 100%;
  width: 100%;
}

.img-container:hover {
  background-color: #f4f4f5;
}

.img-container:hover svg {
  animation: bounce 1s infinite;
}

.img-container:focus {
  color: blue;
  box-shadow: 0 0 10px rgba(0, 0, 0, .4);
}

.img-container input {
  display: none;
}

.dropezone {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  padding-top: 1.25rem;
  padding-bottom: 1.5rem;
}

.dropezone svg {
  width: 3rem;
  height: 3rem;
  padding-bottom: 0.5rem;
}

.dropezone_img {
  max-width: 2rem;
}
</style>
