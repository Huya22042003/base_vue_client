<template lang="">
  <div v-if="value" class="flex items-center">
    <span class="mr-2"> {{ params.data.regisNumb }} 명</span>
    <button class="button btn_xs btn_gray border_gray bo_rd4 !p-1" @click="addEvent">신청자 조회</button>
  </div>
</template>
<script>
export default {
  name: "UserRegistGridComponet",
  props: {
    params: {},
    onCustomEvent: null,
  },
  data() {
    return {
      value: ""
    }
  },
  mounted() {
    if (this.params) {
      this.value = this.params.data.regisNumb;
      if (this.params.className) {
        this.className = this.params.className;
      }
      this.id = this.params.data.id;
    }
  },
  methods: {
    addEvent() {
      if (typeof this.params.onCustomEvent === 'function') {
        this.params.onCustomEvent(this.params.data)
      }
    }
  }
};
</script>
<style lang=""></style>
