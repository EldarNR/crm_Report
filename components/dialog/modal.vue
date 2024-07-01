<template>
    <Dialog>
        <DialogTrigger as-child>
            <slot name="trigger"></slot>

        </DialogTrigger>
        <DialogContent class="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>{{ props.title }}</DialogTitle>
                <DialogDescription>
                    {{ props.description }}
                </DialogDescription>
            </DialogHeader>
            <div class="grid gap-4 py-4">
                <slot name="body"></slot>

            </div>
            <DialogFooter>
                <slot name="footer"></slot>

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
import { useStorage } from '~/state'


interface props {
    title: string,
    description: string
}

const props = defineProps<props>();
const state = useStorage();




</script>

<style scoped></style>
