<template>
    <div class="box">box_list <button @click="changeCheck">detail</button></div>
</template>
<script lang="ts" setup>
const emit = defineEmits();

const changeCheck = () => {
    emit("changeCheck", false);
}
</script>