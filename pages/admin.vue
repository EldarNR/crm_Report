<template>
    <client-only>
        <div class="h-screen flex flex-col justify-center items-center w-full">
            <login />
        </div>
    </client-only>
</template>

<script setup lang="ts">
import login from '~/components/loginComponents/login.vue';
import { supabase } from '~/state/supabase/supabase';
const session = ref(useSupabaseSession())

onBeforeMount(async () => {
    supabase.auth.onAuthStateChange((_event, newSession) => {
        session.value = newSession
    })
})
</script>

<style scoped></style>