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

                    <span class="p-[4px] border-1 font-normal text-xs boder-[#EAEAEA] border-[1px] rounded-md">
                        ID:{{ obj?.id }}
                    </span>
                </div>
                <div class="w-full max-h-[280px] overflow-auto">
                    <p class="text-sm font-normal">{{ obj?.description }}</p>
                </div>

                <div class=" grid grid-flow-col grid-cols-8 w-full mt-4 border-b-2 border-[#E5E5E5] pb-4">
                    <Modal>
                        <template v-slot:trigger>
                            <img :src="`https://ustowvbylqottnlzxouw.supabase.co/storage/v1/object/public/reports_file/${obj?.fileUid}`"
                                class="w-[72px] h-[72px] rounded-md" />
                        </template>
                        <template v-slot:body>
                            <div>
                                <img :src="`https://ustowvbylqottnlzxouw.supabase.co/storage/v1/object/public/reports_file/${obj?.fileUid}`"
                                    class="w-full h-[500px] object-cover" />
                            </div>
                        </template>
                    </Modal>
                </div>

                <div>
                    <div class="flex flex-row justify-between item-center my-auto pt-2">
                        <span class="font-semibold text-sm mt-[1px]">Ответ</span>
                        <div
                            class="flex flex-row items-center  p-[5px] font-normal text-xs boder-[#EAEAEA] border-[1px] rounded-lg">
                            <span>ID:{{ obj?.id }}</span>
                            <div class="ml-2 border-l-[1px] border-[#EAEAEA]">
                                <select v-model="selectedStatus" id="selectStatus"
                                    class="w-full ml-[2px] border-gray-300 sm:text-sm "
                                    :class="response.selectValue[0] === 'На рассмотрении' || response.selectValue[1] === 'Тексерісте' ? 'text-[#1BA261]' : response.selectValue[0] === 'Завершен' || response.selectValue[1] === 'Аяқталды' ? 'text-[#DD4F43]' : 'text-[#646464]'">
                                    <option disabled>
                                        {{ response.selectValue[0] === '' ? (state.$state.language === 'ru' ?
                                            'Выберитестатус' :
                                            'Статусты таңдаңыз') : (state.$state.language === 'ru' ? response.selectValue[0]
                                                :
                                                response.selectValue[1]) }}
                                    </option>
                                    <option v-for="(item, i) in status" :key="i" :value="item.title">
                                        {{ state.$state.language === 'ru' ? item.title[0] : item.title[1] }}
                                    </option>
                                </select>


                            </div>
                        </div>
                    </div>
                    <div>
                        <p class=" font-normal text-sm mx-2 mt-[1px] max-h-[420px] overflow-auto">{{ obj?.respons }} {{
                            obj?.respons }}
                        </p>
                        <div class="flex flex-row justify-end ">
                            <div class="grid gap-1 grid-cols-2  text-white text-[12px] font-normal mt-2" justify="end">
                                <button class="w-[80px] h-[24px]  bg-green-500 rounded-sm ">Сохранить</button>
                                <button class="w-[80px] h-[24px] bg-red-500 rounded-sm">Отклонить</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <span v-else>Loading</span>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, watch } from 'vue';
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
    title: '' as string,
    show: false as boolean,
});

const response = reactive({
    message: '' as string,
    selectValue: [''] as string[]
});

const selectedStatus = ref<string[]>(['']);

const status = [
    { title: ['Завершен', 'Аяқталды'], class: 'text-[#DD4F43]' },
    { title: ['На рассмотрении', 'Тексерісте'], class: 'text-[#1BA261]' },
    { title: ['В обработке', 'Өңдеуде'], class: 'text-[#646464]' }
];

const setSelect = (status: string[]): string[] => {
    return status;
};

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
                response.selectValue = obj.value?.status ? setSelect(obj.value.status) : [''];
                selectedStatus.value = response.selectValue;
                console.log(obj.value);
            }
        } catch (e) {
            errorMsg.title = (e as Error).message;
            errorMsg.show = true;
        } finally {
            loading.value = false;
        }
    } else {
        response.selectValue = obj.value?.status ? setSelect(obj.value.status) : [''];
        selectedStatus.value = response.selectValue;
        loading.value = false;
    }
});

watch(obj, () => {
    if (obj.value && obj.value.status !== null) {
        response.selectValue = setSelect(obj.value.status);
        selectedStatus.value = response.selectValue;
        console.log(response.selectValue);
    }
}, { immediate: true });

watch(() => state.$state.language, (newLang) => {
    if (obj.value && obj.value.status !== null) {
        response.selectValue = setSelect(obj.value.status);
        selectedStatus.value = response.selectValue;
    }
});

watch(selectedStatus, (newStatus) => {
    response.selectValue = newStatus;
});
</script>
