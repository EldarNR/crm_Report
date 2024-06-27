<template>
    <Alert class="flex" v-if="props.open">
        <SVG :width="24" :text="props.svg" class="mt-2 mr-2"></SVG>
        <span class="ml-2">
            <AlertTitle>{{ props.title }}</AlertTitle>
            <AlertDescription>
                {{ props.description }}
            </AlertDescription>
        </span>
        <button @click="closeAlert" class="ml-auto">Close</button>
    </Alert>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from 'vue';
import SVG from '~/components/ui/svg/SVG.vue';
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert';

type Props = {
    title: string,
    description: string,
    svg: string,
    open: boolean
}

const props = withDefaults(defineProps<Props>(), {
    title: 'Alert',
    description: 'Ошибка!',
    svg: '',
    open: false
});

const emit = defineEmits(['update:open']);

const closeAlert = () => {
    emit('update:open', false);
};
</script>