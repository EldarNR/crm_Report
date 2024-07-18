<template>
    <div class="flex items-start h-screen">

        <slot />
    </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter();

</script>