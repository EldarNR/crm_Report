<template>
    <div class="flex justify-center items-center bg-neutral-600 p-2 w-[500px] rounded-lg">
        <div class="flex w-full max-w-sm items-center gap-1.5">
            <Input type="text" id="search" placeholder="Search" v-model="word" />

        </div>
        <div class="space-y-2 w-[150px] p-2">
            <div v-if="loading">Loading</div>
            <select v-if="!loading" v-model="selectedValue" name="Выберите организацию" id="организация"
                class="w-full rounded-lg sm:text-sm p-2.5" @change="postFilter()">
                <option disabled class="text-gray-400 ">Выберите организацию</option>
                <option value="All">Все</option>
                <option v-for="item in listOrg" :key="item.id" :value="item.name">{{
                    item.name }}</option>
            </select>

        </div>
        <Button type="submit" @click="postSeatch()">
            Subscribe
        </Button>
        <!-- <SVG :d="'M18 21L14 17H17V7H14L18 3L22 7H19V17H22M2 19V17H12V19M2 13V11H9V13M2 7V5H6V7H2Z'" :title="'sortbyname'"></SVG> -->
    </div>
</template>

<script setup lang="ts">
import SVG from '../ui/svg/SVG.vue';
import { Input } from '@/components/ui/input'
import { useStorage } from '~/state';
import { type Organization } from '../formReports/index.vue';

const state = useStorage();

const listOrg = ref<Organization[]>([]);
const loading = ref<boolean>(true);
const selectedValue = ref<string>('Выберите')
const word = ref<string>('')

const postFilter = () => {
    console.log('Selected value:', selectedValue.value);
    if (selectedValue.value !== '') {
        state.filterReport(selectedValue.value);
    }
}

const postSeatch = () => {
    if (word.value !== '') {
        state.search(word.value)
    }
}

watchEffect(() => {
    if (state.AllOrganization) {
        listOrg.value = state.AllOrganization.List;
        loading.value = state.AllOrganization.loading
    }
})

onMounted(() => {
    state.getAllOrganization();
})
</script>

<style scoped></style>