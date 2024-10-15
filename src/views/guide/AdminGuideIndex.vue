<template>
  <div class="content_wrap">
    <div class="grid_content">
      <div class="page_toparea">
        <h2 class="page_title">Admin UI 가이드</h2>
      </div>
    </div>
    <AdminGuide />
  </div>
</template>

<script lang="ts">
import AdminGuide from "@/components/guide/AdminGuide.vue";
export default {
  components: {
    AdminGuide,
  },
};
</script>
