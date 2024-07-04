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

            <Modal :title="'Заполните поле'" :description="'Напишите причину '">
                <template v-slot:trigger>

                    <Button>Статус</Button>

                </template>
                <template v-slot:body>
                    <div class="grid grid-cols-4 items-center gap-4">
                        <Label for="name" class="text-right text-xs">Причина:</Label>
                        <Input v-model="reason" class="col-span-3" />
                    </div>
                </template>
                <template v-slot:footer>
                    <div class="grid grid-cols-4 items-center gap-4">
                        <Button type="submit" class="bg-green-400 "
                            @click.stop="postRespon(report?.list.id, 'viewed', reason)"> Рассмотрено</Button>
                        <Button type="submit" class="bg-red-400"
                            @click.stop="postRespon(report?.list.id, 'reject', reason)">Отклонить</Button>
                    </div>

                    <!-- <Button type="submit" >
                        Save changes
                    </Button> -->
                </template>
            </Modal>


        </div>
    </div>

</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import headerReport from './components/header.vue';
import bodyReport from './components/body.vue';
import { useStorage } from '~/state';
import Modal from '../dialog/modal.vue';

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

const reason = ref<string>('');

const postRespon = (id: number | undefined, status: string, reason: string) => {
    if (reason.trim() === '' || id === undefined || status.trim() === '') {
        console.log('Error, wrong post');
    } else {
        state.changeStatusReport(id, status, reason)
    }
}

watchEffect(() => {
    list.value.push(props);
    report.value = list.value[0];
});


</script>
