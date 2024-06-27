<template>
    <div class="my-auto">
        <index />
    </div>
</template>

<script setup lang="ts">
import index from '~/components/formReports/index.vue';
import { useStorage } from '~/state';
const router = useRoute();
const state = useStorage();

onMounted(() => {
    state.getAllOrganization();
})

</script>