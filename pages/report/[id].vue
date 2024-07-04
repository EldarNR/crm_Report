<template>
    <div class="my-auto flex flex-col items-center">
        <div class="mx-auto w-[60px]">
            <label class="inline-flex items-center relative">
                <input class="peer hidden" id="toggle" type="checkbox" v-model="checkBox" />

                <div class="flex bg-neutral-800 p-2 rounded-lg">
                    <SVG :color="'white'"
                        :d="'M11 15H17V17H11V15M9 7H7V9H9V7M11 13H17V11H11V13M11 9H17V7H11V9M9 11H7V13H9V11M21 5V19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V5C3 3.9 3 3 5 3H19C20.1 3 21 3.9 21 5M19 5H5V19H19V5M9 15H7V17H9V15Z'"
                        :class="checkBox ? 'bg-gray-500 fill-red-500' : ''" class="rounded-md"></SVG>

                    <SVG :color="'white'"
                        :d="'M17 9H16.5 17M7 15H10C10.08 14.32 10.23 13.64 10.5 13H7V15M11.9 10.9C13.17 9.64 14.84 9 16.5 9H7V11H11.82C11.85 10.97 11.87 10.94 11.9 10.9M11.9 20.1C12.26 20.45 12.65 20.74 13.06 21H5C3.9 21 3 20.11 3 19V5C3 3.9 3.9 3 5 3H9.18C9.5 2.16 10.14 1.5 11 1.2C12.53 .64 14.25 1.44 14.82 3H19C20.11 3 21 3.9 21 5V10.82C20.4 10.24 19.72 9.8 19 9.5V5H17V7H7V5H5V19H11.03C11.27 19.39 11.57 19.76 11.9 20.1M11 4C11 4.55 11.45 5 12 5S13 4.55 13 4 12.55 3 12 3 11 3.45 11 4M23.39 21L22 22.39L18.88 19.32C18.19 19.75 17.37 20 16.5 20C14 20 12 18 12 15.5S14 11 16.5 11 21 13 21 15.5C21 16.38 20.75 17.21 20.31 17.9L23.39 21M19 15.5C19 14.12 17.88 13 16.5 13S14 14.12 14 15.5 15.12 18 16.5 18 19 16.88 19 15.5Z'"
                        :class="!checkBox ? 'bg-gray-500 fill-red-500' : ''" class="rounded-md"></SVG>
                </div>
            </label>
        </div>
        <index v-if="checkBox" />
        <div v-else class="p-2 w-[300px] h-[250px]">
            <div class="grid w-full max-w-sm items-center gap-1.5 p-6 bg-neutral-500 rounded-lg text-center">
                <Label for="search" class="text-xl text-white">Введите id жалобы</Label>
                <Input id="search" type="search" v-model="id" placeholder="Поиск по ID" />
                <Button @click="searchbyId(id)">Поиск</Button>
            </div>

            <div v-if="!state.$state.FindReport.Loading">
                test
                <!-- Результаты поиска -->
            </div>
            <span v-else>
                Loading
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import index from '~/components/formReports/index.vue';
import SVG from '~/components/ui/svg/SVG.vue';
import { useStorage } from '~/state';
import { onMounted, ref } from 'vue';

const state = useStorage();
const checkBox = ref<boolean>(true);
const id = ref<string>('');
const report = ref({});

watch(report, () => {
    console.log(report.value)
})

const toggleContainer = ref<boolean>(false);

const searchbyId = (id: string) => {
    console.log(id)
    if (id.trim() === '') {
        console.log('Error, empty ID')
    } else {
        const found = state.searchById(Number(id)); // Предполагается, что эта функция возвращает найденный объект или null
        if (found) {
            console.log('Found:', found);
            toggleContainer.value = true;
        } else {
            console.log('Not found');
            toggleContainer.value = false;
        }
    }
}


watchEffect(() => {
    if (state.$state.FindReport.Data) {
        report.value = state.$state.FindReport.Data
    }
})



onMounted(() => {
    state.getAllOrganization();
});
</script>
