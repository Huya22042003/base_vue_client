<template>
    <input  v-model="checkedValue" type="radio"  @change="handleChange" :name="name" :id="id"/>
</template>
<script setup lang="ts">
import {defineProps, defineEmits, onMounted, onBeforeUnmount, onUpdated, useAttrs} from 'vue'
import {commonStore} from '@/stores/common'
const props = defineProps({
    params: {}
})
const checkedValue = ref(false)
const name = ref('')
const id=ref("")
onMounted(() => {
    checkedValue.value = props.params?.value
    name.value = props.params?.name
    id.value = props.params?.data?.id
})
const handleChange = ()=>{
    console.log('change')
    if (typeof props.params.onCustomEvent === 'function') {
        props.params?.onCustomEvent(props.params?.value, props.params?.data)
          
}
}
</script>