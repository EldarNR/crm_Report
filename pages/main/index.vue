<template>
    <div class="flex">
        <navbar class="w-[220px]" />
        <section class="bg-white border-2 rounded-md divide-slate-200">
            <div>
                <header-main />

                <div class="mt-8">
                    <div class="lg:grid  grid-cols-12">
                        <tables />


                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import headerMain from '~/components/headerMain/headerMain.vue';
import tables from '~/components/tableReports/table.vue';
import navbar from '~/components/navbar/navbar.vue';
</script>
