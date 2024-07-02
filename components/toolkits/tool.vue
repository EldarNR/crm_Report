<template>
    <div class="flex justify-center items-center bg-neutral-400 p-2 w-[500px] rounded-lg">
        <div class="flex w-full max-w-sm items-center gap-1.5">
            <Input type="text" id="search" placeholder="Search" v-model="word" />
        </div>
        <div class="space-y-2 w-[150px] p-2">
            <select v-if="!loading" v-model="selectedValue" name="Выберите организацию" id="организация"
                class="w-full rounded-lg sm:text-sm p-2.5" @change="postFilter()">
                <option disabled class="text-gray-400">Выберите организацию</option>
                <option value="All">Все</option>
                <option v-for="item in listOrg" :key="item.id" :value="item.name">{{ item.name }}</option>
            </select>
            <div v-else>Loading</div>
        </div>
        <Button type="submit" @click="postSeatch()">
            Search
        </Button>
    </div>
</template>

<script setup lang="ts">
import { ref, watchEffect, onMounted } from 'vue';
import { Input } from '@/components/ui/input';
import { useStorage } from '~/state';
import { type Organization } from '../formReports/index.vue';

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

const postSeatch = () => {
    if (word.value !== '') {
        state.search(word.value);
    }
};

const search = (text: string) => {
    if (text.trim() === '') {
        console.log('Input empty!')
    }
    else {
        state.searchDescription(text);
    }
}

watchEffect(() => {
    const allOrganization = state.$state.AllOrganization;
    if (allOrganization) {
        listOrg.value = allOrganization.List;
        loading.value = allOrganization.loading;
    }
});

onMounted(() => {
    state.getAllOrganization();
});
</script>
