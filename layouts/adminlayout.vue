<template>
    <div class="flex container items-start h-screen w-full">
        <navbar v-if="!isLoginPage" class="w-[220px] p-2 " />
        <slot />

    </div>
</template>

<script setup lang="ts">
import navbar from '~/components/navbar/navbar.vue';
import login from '~/components/loginComponents/login.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const isLoginPage = computed(() => route.path === '/admin');
</script>