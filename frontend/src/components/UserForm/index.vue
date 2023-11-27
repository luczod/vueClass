<script >
import CloseIcon from '../../icons/CloseIcon.vue';
import EyeIcon from '../../icons/EyeIcon.vue';
import SlashEyeIcon from '../../icons/SlashEyeIcon.vue';
import Inputsubmit from '../InputSubmit/index.vue';
import Message from '../MsgFlash/index.vue';
import store from '../../store'

export default {
  name: 'UserForm',
  data() {
    return {
      id: this.user._id || null,
      name: this.user.name || null,
      email: this.user.email || null,
      password: null,
      confirmPassword: '',
      msg: null,
      msgClass: '',
      typeInput: 'password'
    };
  },
  props: ['user', 'page', 'btnText'],
  components: { Inputsubmit, Message, CloseIcon, EyeIcon, SlashEyeIcon },
  methods: {
    async register(e) {
      e.preventDefault();

      const data = {
        name: this.name,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword,
      };

      const jsonData = JSON.stringify(data);

      // console.log(jsonData);

      await fetch('http://localhost:3002/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: jsonData,
      })
        .then((res) => {
          console.log(res);
          return res.json();
        })
        .then((data) => {
          let auth = false;
          console.log(data);

          if (data?.error) {
            this.msg = data.error;
            this.msgClass = 'error';

          } else {
            auth = true;
            this.msg = data.msg;
            this.msgClass = 'success'
            // Emit event for auth an user
            this.$store.commit("authenticate", { token: data.token, userId: data.userId });
          }
          setTimeout(() => {
            if (!auth) {
              this.msg = ''
            } else {
              // redirect
              this.$router.push('Dashboard')
            }
          }, 2000)

        })
        .catch((err) => {
          console.log('Error:', err);
        });
    },

    async update(e) {
      e.preventDefault();

      const data = {
        id: this.id,
        name: this.name,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword
      }

      const jsonData = JSON.stringify(data);

      // get token from state
      const token = store.getters.token;

      await fetch("http://localhost:3002/api/user", {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          "auth-token": token
        },
        body: jsonData
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

    },

  },
};
</script>

<template>
  <div>
    <Message :msg="msg" :msg-class="msgClass" />
    <form id="user-form" @submit="page == 'register' ? register($event) : update($event)">
      <input type="hidden" id="id" name="id" v-model="id">
      <div class="input-container">
        <label for="name">Nome:</label>
        <input type="text" id="name" name="name" v-model="name" placeholder="Digite seu nome" />
        <button type="button" @click="() => name = ''" v-if="name">
          <CloseIcon />
        </button>
      </div>
      <div class="input-container">
        <label for="email">Email:</label>
        <input type="text" id="email" name="email" v-model="email" placeholder="Digite seu email" />
        <button type="button" @click="() => email = ''" v-if="email">
          <CloseIcon />
        </button>
      </div>
      <div class="input-container">
        <label for="password">Senha:</label>
        <input :type="typeInput" id="password" name="password" v-model="password" placeholder="Digite sua senha" />
        <button type="button" @click="() => typeInput = 'text'" v-if="typeInput === 'password'">
          <SlashEyeIcon />
        </button>
        <button type="button" @click="() => typeInput = 'password'" v-if="typeInput === 'text'">
          <EyeIcon />
        </button>
      </div>
      <div class="input-container">
        <label for="confirmPassword">Confirmar Senha:</label>
        <input type="password" id="confirmPassword" name="confirmPassword" v-model="confirmPassword"
          placeholder="Confirme sua senha" />

      </div>

      <Inputsubmit :blocked="Boolean(msg) ? true : false" :msg="btnText" />
    </form>
  </div>
</template>

<style scoped>
#user-form {
  max-width: 25rem;
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

.input-container input {
  outline: none;
  padding: 0.7rem;
  border-radius: 0.8rem;
  border: 2px solid #e8e8e8;
}

.input-container input:focus {
  border: 2px solid #93c5fd;
}



button {
  position: absolute;
  bottom: 10px;
  right: 10px;
  cursor: pointer;
  text-align: center;
  width: fit-content;
  background: transparent;
  border: none;
  padding-left: 2px;

}
</style>

