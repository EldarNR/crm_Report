<template>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24">
        <title>{{ icon.title || props.title }}</title>
        <path :d="icon.d || props.d" :fill="icon.color || props.color || '#000'" />
    </svg>
</template>

<script setup lang="ts">
import { defineProps, withDefaults, reactive, watch } from 'vue';

type Props = {
    d?: string,
    color?: string,
    title?: string,
    text?: string,
}

const props = withDefaults(defineProps<Props>(), {
    title: 'Icon', // Default title
})

let icon = reactive({
    title: '',
    color: '',
    d: ''
})

const svg = (text: string) => {
    if (text === 'Info') {
        icon.title = 'Info';
        icon.color = 'blue';
        icon.d = 'M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z';
    } else if (text === 'Warning') {
        icon.title = 'Warning';
        icon.color = 'orange';
        icon.d = 'M13 14H11V9H13M13 18H11V16H13M1 21H23L12 2L1 21Z';
    } else if (text === 'Error') {
        icon.title = 'Error';
        icon.color = 'red';
        icon.d = 'm23.341,9.48l-3.501-6c-.893-1.53-2.547-2.48-4.318-2.48h-7.071c-1.771,0-3.426.951-4.319,2.48L.631,9.48c-.906,1.554-.906,3.485,0,5.039l3.501,6c.893,1.53,2.547,2.48,4.318,2.48h7.071c1.771,0,3.426-.951,4.319-2.48l3.5-6c.906-1.554.906-3.485,0-5.039Zm-7.634,4.812c.391.391.391,1.023,0,1.414-.195.195-.451.293-.707.293s-.512-.098-.707-.293l-2.293-2.293-2.293,2.293c-.195.195-.451.293-.707.293s-.512-.098-.707-.293c-.391-.391-.391-1.023,0-1.414l2.293-2.293-2.293-2.293c-.391-.391-.391-1.023,0-1.414s1.023-.391,1.414,0l2.293,2.293,2.293-2.293c.391-.391,1.023-.391,1.414,0s.391,1.023,0,1.414l-2.293,2.293,2.293,2.293Z';
    } else if (text === 'Success') {
        icon.title = 'Success';
        icon.color = 'green';
        icon.d = 'M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M12 20C7.59 20 4 16.41 4 12S7.59 4 12 4 20 7.59 20 12 16.41 20 12 20M16.59 7.58L10 14.17L7.41 11.59L6 13L10 17L18 9L16.59 7.58Z'
    }

    else {
        // Если текст не соответствует ни одному из известных значений, установим значения по умолчанию или оставим иконку пустой.
        icon.title = '';
        icon.color = '';
        icon.d = '';
    }
}

// Вызываем функцию svg, когда пропс text изменяется
watch(() => props.text, (newText) => {
    if (newText) {
        svg(newText);
        console.log(newText)
    }
}, { immediate: true });
</script>
