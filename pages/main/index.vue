<template>
    <ClientOnly>
        <div class="flex w-full h-screen flex-col bg-[#FAFAFA]">

            <header-main />

            <div class="w-full rounded-lg">
                <tables />
            </div>


        </div>
    </ClientOnly>
</template>

<script setup lang="ts">
import headerMain from '~/components/headerMain/headerMain.vue';
import tables from '~/components/tableReports/table.vue';
import navbar from '~/components/navbar/navbar.vue';
</script>
