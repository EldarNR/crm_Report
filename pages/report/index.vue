<template>
    <div>
        <index />
    </div>
</template>

<script setup lang="ts">
import { supabase } from '~/state/supabase/supabase';
import index from '~/components/formReports/index.vue';
const countries = ref([]) as any

async function getCountries() {
    const { data } = await supabase.from('countries').select()
    countries.value = data
}

onMounted(() => {
    getCountries()
})
</script>
