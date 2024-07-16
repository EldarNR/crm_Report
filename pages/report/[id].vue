<template>
    <div class="my-auto mx-auto flex flex-col items-center">
        <index v-if="checkBox" />
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
