<template>
    <div class="search-container mg_b25">
        <span class="search-icon">&#128269;</span>
        <input type="text" class="search-input" placeholder="Tìm kiếm..." v-model="searchValue" @input="handleInput" />
    </div>
</template>

<script lang="ts" setup>
import { ref, defineEmits } from 'vue';

// Emits
const emit = defineEmits(['update:modelValue']);

// Props
const props = defineProps({
    modelValue: {
        type: String,
        default: '',
    },
});

// Data
const searchValue = ref(props.modelValue);

// Methods
const handleInput = () => {
    emit('update:modelValue', searchValue.value);
};
</script>

<style scoped>
.search-container {
    width: 100%;
    margin: 0 auto;
    position: relative;
}

.search-icon {
    position: absolute;
    top: 50%;
    left: 15px;
    transform: translateY(-50%);
    font-size: 18px;
    color: #aaa;
    pointer-events: none;
}

.search-input {
    width: 100%;
    padding: 10px 15px 10px 40px;
    border: 1px solid #ccc;
    border-radius: 20px;
    font-size: 14px;
    outline: none;
    transition: border-color 0.3s ease;
}

.search-input:focus {
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}
</style>