<template>
    <ClientOnly>
        <div class="bg-white border-2 rounded-md divide-slate-200">
            <div>
                <header-main />
                <div class="mt-8">
                    <div class="w-full bg-neutral-50 rounded-lg shadow border">
                        <tables />
                    </div>
                </div>
            </div>
        </div>
    </ClientOnly>
</template>

<script setup lang="ts">
import headerMain from '~/components/headerMain/headerMain.vue';
import tables from '~/components/tableReports/table.vue';
import navbar from '~/components/navbar/navbar.vue';
</script>
