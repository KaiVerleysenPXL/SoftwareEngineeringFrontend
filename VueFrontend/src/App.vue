<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// when entering an url directly in the browser (such as .../login) github pages 404s
// serves 404.html, not index, that file redirects to / correctly
// instead, sets a cookie with the requested route, this actually uses that route
function checkRedirect() {
  const redirectPath = document.cookie
    .split('; ')
    .find((row) => row.startsWith('redirect_path='))
    ?.split('=')[1];
  if (redirectPath) {
    router.push(decodeURIComponent(redirectPath).replace('%2', ''));
  }
}

onMounted(() => {
  checkRedirect();
});
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
