<template>
  <div :style="{ width: `${width}px`, position: 'relative' }" class="transition_light avatar" href="javascript:void(0)">
    <img v-if="mode == MODE_DETAIL" class="wd_p100" :src="imageUrl" alt="Avatar" />
  </div>
</template>

<script lang="ts" setup>
import { MODE_DETAIL } from '@/constants/screen.const';

const props = defineProps({
  imageUrl: {
    type: String,
    required: true,
    default:
      "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/076956f7-2972-485e-b6ce-2dff9d0e0410/8727b7ec-a53c-4f23-9832-ef445981e0b4.png",
  },
  width: {
    type: Number,
    default: 60,
  },
  mode: {
    type: String,
    default: MODE_DETAIL
  }
});
</script>

<style scoped></style>
