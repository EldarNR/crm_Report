<template>
    <div class="w-full h-screen bg-[#FAFAFA]">
        <div v-if="errorMsg.show" class="absolute text-xl">{{ errorMsg.title }}</div>
        <div v-if="!loading" class="py-4 mx-auto w-[983px]">

            <div class="flex flex-col  border-b-2 w-full border-[#E5E5E5] ">
                <span class="mx-auto font-semibold text-2xl  mb-4">{{ obj?.departament }}</span>
            </div>

            <div class="p-2">
                <div class="flex flex-row items-center justify-between rounded-md py-4">
                    <p>{{ !obj?.anonymous ? obj?.full_name : 'Аноним' }}</p>

                    <span class="p-[4px] border-1 font-normal text-xs boder-[#EAEAEA] border-[1px]">
                        ID:{{ obj?.id }}
                    </span>
                </div>
                <div class="w-full max-h-[280px] overflow-auto">
                    <p class="text-sm font-normal">{{ obj?.description }}</p>
                </div>

                <div class="w-full mt-4 border-b-2 border-[#E5E5E5]">
                    <Modal>
                        <template v-slot:trigger>

                            <img :src="`https://ustowvbylqottnlzxouw.supabase.co/storage/v1/object/public/reports_file/${obj?.fileUid}`"
                                class="w-[72px] h-[72px]" />

                        </template>
                        <template v-slot:body>
                            <div class="">
                                <img :src="`https://ustowvbylqottnlzxouw.supabase.co/storage/v1/object/public/reports_file/${obj?.fileUid}`"
                                    class="w-full h-[500px] object-cover" />
                            </div>
                        </template>
                    </Modal>
                </div>


            </div>

        </div>
        <span v-else>Loading</span>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import { useStorage } from '~/state/index';
import { useRoute } from 'vue-router';
import type { reports } from '~/state/index';
import { supabase } from '~/state/supabase/supabase';
import Modal from '~/components/dialog/modal.vue';

const state = useStorage();
const route = useRoute();
const obj = ref<reports | null>(null);
const loading = ref<boolean>(true);
const errorMsg = reactive({
    title: '' as string | unknown,
    show: false as boolean,
});

onMounted(async () => {
    const id = Number(route.params.id);

    const getInState = (): reports | null => {
        return state.$state.AllReports.List.find(item => item.id === id) as reports || null;
    };

    obj.value = getInState();

    if (obj.value === null) {
        try {
            let { data: reports, error } = await supabase
                .from('reports')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                throw error;
            }

            if (reports) {
                obj.value = reports as unknown as reports;
                console.log(obj.value);
            }
        } catch (e) {
            errorMsg.title = (e as Error).message;
            errorMsg.show = true;
        } finally {
            loading.value = false;
        }
    } else {
        loading.value = false;
    }
});
</script>
