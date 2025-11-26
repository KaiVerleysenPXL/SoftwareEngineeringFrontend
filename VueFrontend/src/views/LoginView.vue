<script setup>
import { useCredentialsStore } from '@/stores/credentials';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const credentialsStore = useCredentialsStore();
const { username, password } = storeToRefs(credentialsStore);

const loginFailed = ref(false);

async function handleLogin() {
  let isLoggedIn = await credentialsStore.verify();
  if (isLoggedIn == false) {
    loginFailed.value = true;
  } else {
    loginFailed.value = false; // TODO redirect to home page

    router.push("/homepage" );
  }
}
</script>

<template>
  <v-container fluid>
    <v-card elevation="12" class="formcard">
      <v-form @submit.prevent="handleLogin">
        <v-col cols="12" class="mt-5">
          <v-row justify="center">
            <h2>Login:</h2>
          </v-row>
          <v-row justify="center">
            <v-text-field
              label="Username"
              v-model="username"
              placeholder="Enter your username:"
              class="inputfield"
            />
          </v-row>
          <v-row justify="center">
            <v-text-field
              label="Password"
              v-model="password"
              placeholder="Enter your password:"
              type="password"
              class="inputfield"
            />
          </v-row>
          <v-row justify="center" class="mb-5" v-if="loginFailed">
            <small>invalid username or password</small>
          </v-row>
          <v-row justify="center" class="mb-5">
            <v-btn type="submit"> Login </v-btn>
          </v-row>
        </v-col>
      </v-form>
    </v-card>
  </v-container>
</template>

<style scoped>
.formcard {
  width: 600px;
  max-width: 80vw;
  margin: auto;
  border: 4px solid skyblue;
  border-radius: 15px;
  margin-top: 50px;
}
.inputfield {
  margin: 20px 10% 5px 10%;
  max-width: 400px;
}
small {
  color: red;
  font-weight: bold;
}
</style>
