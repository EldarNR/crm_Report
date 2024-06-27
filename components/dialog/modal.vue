<template>
    <Dialog>
        <DialogTrigger as-child>
            <Button variant="outline">Новая организацию</Button>
        </DialogTrigger>
        <DialogContent class="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Создание новой организации</DialogTitle>
                <DialogDescription>
                    Заполните форму
                </DialogDescription>
            </DialogHeader>
            <div class="grid gap-4 py-4">
                <div class="grid grid-cols-4 items-center gap-4" v-for="(item, i) in text" :key="i">
                    <Label for="name" class="text-right text-xs">
                        {{ item.title }}
                    </Label>
                    <Input v-model="data[item.modal]" :placeholder="'пример: ' + item.title" class="col-span-3" />
                </div>
            </div>
            <DialogFooter>
                <Button type="submit" @click="postUser()">
                    Save changes
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { reactive } from 'vue'
import { useStorage } from '~/state'

interface Data {
    [key: string]: string
}
const state = useStorage();

const data: Data = reactive({
    organization: '',
    supervisor: ''
})


const postUser = async () => {
    if (data.organization.trim() === '' || data.supervisor.trim() === '') {
        console.log('Error')
    } else {
        state.createOrganization(data.organization, data.supervisor);
    }
};

const text = [
    { title: 'Название организации', example: 'Национальный банк РК', modal: 'organization' },
    { title: 'Руководитель', example: 'Иванов Иван Иванович', modal: 'supervisor' }
]
</script>

<style scoped></style>
