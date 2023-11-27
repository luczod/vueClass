<script >
import InputSubmit from '../InputSubmit/index.vue';
import Message from '../MsgFlash/index.vue';
import CloseIcon from '../../icons/CloseIcon.vue';
import SlashEyeIcon from '../../icons/SlashEyeIcon.vue';
import EyeIcon from '../../icons/EyeIcon.vue';


export default {
  name: 'LoginForm',
  components: {
    InputSubmit,
    Message,
    CloseIcon,
    SlashEyeIcon,
    EyeIcon
  },
  data() {
    return {
      email: null,
      password: null,
      msg: null,
      msgClass: '',
      typeInput: 'password'
    }
  },
  props: ['user', 'page', 'btnText'],
  methods: {
    async login(e) {
      e.preventDefault();

      const data = {
        email: this.email,
        password: this.password
      }

      const jsonData = JSON.stringify(data);

      await fetch("http://localhost:3002/api/auth/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: jsonData
      })
        .then((res) => {
          return res.json()
        }
        ).then((data) => {

          let auth = false;

          if (data.error) {
            this.msg = data.error;
            this.msgClass = "error";
          } else {
            auth = true;
            this.msg = data.msg;
            this.msgClass = "success";

            // Emit event for auth an user
            this.$store.commit("authenticate", { token: data.token, userId: data.userId });
          }

          setTimeout(() => {
            if (!auth) {
              this.msg = null;
            } else {
              // redirect
              this.$router.push('dashboard')
            }
          }, 2000);

        })
        .catch((err) => {
          console.log(err);
        })

    }
  }
}
</script>

<template>
  <div>
    <Message :msg="msg" :msg-class="msgClass" />
    <form id="login-form" @submit="login($event)">
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

      <InputSubmit :blocked="Boolean(msg) ? true : false" :msg="btnText" />
    </form>
  </div>
</template>

<style scoped>
#login-form {
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
