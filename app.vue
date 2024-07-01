<template>
  <NuxtLayout :name="$route.meta.layout">
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const setLayout = () => {
  if (/^\/report\/\d+$/.test(route.path)) {
    route.meta.layout = "guestlayout";
  }
  else if (route.path.startsWith('/main')) {
    route.meta.layout = "adminlayout";
  }
  else {
    route.meta.layout = "adminlayout";
  }
}

onMounted(() => {
  setLayout();
});

watch(
  () => route.path,
  () => {
    setLayout();
  }
);

</script>
