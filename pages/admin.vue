<template>
    <div class="h-screen flex justify-center items-center">
        <login />
    </div>
</template>

<script setup lang="ts">
import login from '~/components/loginComponents/login.vue';
import { supabase } from '~/state/supabase/supabase';
const session = ref(useSupabaseSession())


onMounted(async () => {
    supabase.auth.onAuthStateChange((_event, newSession) => {
        session.value = newSession
    })
})
</script>

<style scoped></style>