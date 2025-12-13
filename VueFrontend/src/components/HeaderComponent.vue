<script setup>
import { useCredentialsStore } from '@/stores/credentials';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const credentialsStore = useCredentialsStore();
const { username, password } = storeToRefs(credentialsStore);
const router = useRouter();

function goToLogin() {
  if (!username.value) {
    router.push('/login');
  }
}
function logout() {
  credentialsStore.clear();
  goToLogin();
}

function loginAsUser() {
  username.value = 'user';
  password.value = 'user';
  goToLogin();
}
function loginAsAdmin() {
  username.value = 'admin';
  password.value = 'admin';
  goToLogin();
}
</script>

<template>
  <v-container fluid class="header">
    <v-row align="center" style="height: 100%">
      <v-col cols="2" />
      <v-col cols="4"><h2 @click="goToLogin">TripTease</h2></v-col>
      <v-col cols="2" />
      <v-col cols="2">
        <h4 v-if="username">Welcome, {{ username }}</h4>
        <span v-else
          ><h6 @click="loginAsUser">login as user</h6>
          <h6 @click="loginAsAdmin">login as admin</h6></span
        >
      </v-col>
      <v-col cols="2">
        <h6 v-if="username" @click="logout" style="text-decoration: underline">logout</h6>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.header {
  background-color: skyblue;
}
.header * {
  max-height: 100%;
}
h2:hover,
h6:hover {
  cursor: pointer;
}
h4:hover {
  cursor: default;
}
</style>
