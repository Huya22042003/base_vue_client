<template>
    <PortfolioOrderList @changeCheck="changeCheck" v-if="check"/>
    <PortfolioOrderDetail @changeCheck="changeCheck" v-if="!check"/>
</template>
<script lang="ts" setup>
import PortfolioOrderDetail from './PortfolioOrderDetail.vue';
import PortfolioOrderList from './PortfolioOrderList.vue';

const check = ref(true);

const changeCheck = (value: boolean) => {
    check.value = value;
}
</script>