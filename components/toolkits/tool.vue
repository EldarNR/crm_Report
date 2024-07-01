<template>
    <div class="flex justify-center items-center bg-neutral-600 p-2 w-[500px] rounded-lg">
        <div class="flex w-full max-w-sm items-center gap-1.5">
            <Input type="text" id="search" placeholder="Search" v-model="word" />
        </div>
        <div class="space-y-2 w-[150px] p-2">

            <select v-if="!loading" v-model="selectedValue" name="Выберите организацию" id="организация"
                class="w-full rounded-lg sm:text-sm p-2.5" @change="postFilter">
                <option disabled class="text-gray-400">Выберите организацию</option>
                <option value="All">Все</option>
                <option v-for="item in listOrg" :key="item.id" :value="item.name">{{ item.name }}</option>
            </select>
            <select v-else-if="loading" name="Выберите организацию" v-model="selectedValue" id="loading"
                placeholder="loading" class="w-full rounded-lg sm:text-sm p-2.5">
                <option value="Loading"></option>
            </select>
        </div>
        <Button type="submit" @click="postSearch">Searc</Button>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useStorage } from '~/state';
import { Input } from '@/components/ui/input';
import type { Organization } from '../formReports/index.vue';

const state = useStorage();

const listOrg = ref<Organization[]>([]);
const loading = ref<boolean>(true);
const selectedValue = ref<string>('');
const word = ref<string>('');

const postFilter = () => {
    console.log('Selected value:', selectedValue.value);
    if (selectedValue.value !== '') {
        state.filterReport(selectedValue.value);
    }
};

const postSearch = () => {
    if (word.value !== '') {
        state.search(word.value);
    }
};

// Watch for changes in state.AllOrganization and update listOrg and loading accordingly
watch(
    () => state.AllOrganization,
    (newVal) => {
        if (newVal) {
            console.log('New value received:', newVal);
            listOrg.value = newVal.List;
            loading.value = newVal.loading;
        }
    },
    { immediate: true }
);

// Fetch all organizations when the component is mounted
onMounted(() => {
    state.getAllOrganization();
});
</script>