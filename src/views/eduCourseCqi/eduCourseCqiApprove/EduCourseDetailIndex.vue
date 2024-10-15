<template>
    <CqiMajorIndex v-if="data == 'major'" :dataDetail="dataDetail" />
    <CqiUniversityIndex v-if="data == 'university'" :dataDetail="dataDetail" />
  </template>
  
  <script setup lang="ts">
import CqiMajorIndex from './cqiMajor/CqiMajorIndex.vue';
import CqiUniversityIndex from './cqiUniversity/CqiUniversityIndex.vue';

//   data = major||university
    const data = ref("university");
    const dataDetail = {
        code: "aaaa",
        name: "bbbb"
    }
  </script>
  
  <style scoped>
  
  </style>