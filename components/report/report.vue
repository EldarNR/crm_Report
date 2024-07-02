<template>
    <div class="flex flex-col justify-between rounded-md h-[500px]">
        <div>
            <headerReport :name="report?.list.full_name
                ?? ''" :date="report?.list.created_at ?? ''" :email="report?.list.email ?? ''"
                :phone="report?.list.phone ?? ''" :organization="report?.list.departament ?? 'не указан'"
                class="border-2" />
            <bodyReport :description="report?.list.description ?? ''" :fileUid="report?.list.fileUid"
                class="border-2 h-[200px] p-2" />
        </div>
        <div class="grid grid-flow-col gap-2 border-2 p-6">
            <Button class="bg-green-400"
                @click="state.changeStatusReport(report?.list.id, 'viewed')">Рассмотрено</Button>
            <Button class="bg-red-400" @click="state.changeStatusReport(report?.list.id, 'reject')">Отклонить</Button>

        </div>
    </div>

</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import headerReport from './components/header.vue';
import bodyReport from './components/body.vue';
import { useStorage } from '~/state';

interface Report {
    list: {
        id: number,
        full_name: string;
        email: string;
        phone: string;
        file: File | null;
        description: string;
        created_at: string;
        departament: string;
        anonymouseMode: boolean;
        fileUid: string
    }
}
const state = useStorage();
const props = defineProps<Report>();
const list = ref<Report[]>([]);
const report = ref<Report | null>(null);

watchEffect(() => {
    list.value.push(props);
    report.value = list.value[0];
});


</script>
