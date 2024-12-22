<template>
    <div class="box">OrderDetail<button @click="changeCheck">detail</button></div>
</template>
<script lang="ts" setup>
const emit = defineEmits();

const changeCheck = () => {
    emit("changeCheck", true);
}
</script>