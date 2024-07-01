<template>
    <div class="rounded-md">
        <div>
            <headerReport :name="report?.list.full_name
                ?? ''" :date="report?.list.created_at ?? ''" :email="report?.list.email ?? ''"
                :phone="report?.list.phone ?? ''" :organization="report?.list.departament ?? 'не указан'"
                class="border-2" />
            <bodyReport :description="report?.list.description ?? ''" :fileUid="report?.list.fileUid"
                class="border-2" />
        </div>
        <div>
            <button>Click</button>
        </div>
    </div>

</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import headerReport from './components/header.vue';
import bodyReport from './components/body.vue';

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

const props = defineProps<Report>();
const list = ref<Report[]>([]);
const report = ref<Report | null>(null);

watchEffect(() => {
    list.value.push(props);
    console.log(list);
    report.value = list.value[0];
});
</script>
