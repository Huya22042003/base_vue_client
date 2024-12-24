<template>
    <div class="pagination_wrap">
        <a href="javascript:void(0);" class="func first" @click="goToPage('first')">
            First page
        </a>
        <a href="javascript:void(0);" class="func back" :class="{ disabled: currentPage === 1 }"
            @click="goToPage('prev')">
            Back page
        </a>
        <a v-for="page in totalPagesArray" :key="page" href="javascript:void(0);"
            :class="{ active: currentPage === page }" @click="goToPage(page)">
            <p>{{ page }}</p>
        </a>
        <a href="javascript:void(0);" class="func next" :class="{ disabled: currentPage === totalPages }"
            @click="goToPage('next')">
            Next page
        </a>
        <a href="javascript:void(0);" class="func last" :class="{ disabled: currentPage === totalPages }"
            @click="goToPage('last')">
            Last page
        </a>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';

// Props
const props = defineProps({
    totalPages: {
        type: Number,
        required: true,
    },
    modelValue: {
        type: Number,
        default: 1,
    },
});

// Emits
const emit = defineEmits(['update:modelValue']);

// Data
const currentPage = ref<number>(1);

// Watch for prop changes
currentPage.value = props.modelValue;

// Computed
const totalPagesArray = computed(() => {
    return Array.from({ length: props.totalPages }, (_, i) => i + 1);
});

// Methods
const goToPage = (page: 'first' | 'prev' | 'next' | 'last' | number) => {
    if (typeof page === 'number') {
        currentPage.value = page;
    } else {
        if (page === 'first') currentPage.value = 1;
        if (page === 'prev' && currentPage.value > 1) currentPage.value--;
        if (page === 'next' && currentPage.value < props.totalPages) currentPage.value++;
        if (page === 'last') currentPage.value = props.totalPages;
    }

    emit('update:modelValue', currentPage.value);
};
</script>

<style scoped>
.func {
    color: blue;
    cursor: pointer;
}

.func.disabled {
    color: gray;
    pointer-events: none;
}

.active p {
    font-weight: bold;
    color: red;
}
</style>