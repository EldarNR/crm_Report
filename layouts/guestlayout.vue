<template>
    <div class="flex items-center justify-center h-screen">

        <slot />
    </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
definePageMeta({
    middleware: 'set-layout'
})

const router = useRouter();

</script>