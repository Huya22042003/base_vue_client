<template>
  <div class="rating">
    <!-- Hiển thị số ngôi sao -->
    <span
      v-for="star in stars"
      :key="star"
      :class="['star', { active: star <= (hoveredRating || selectedRating) }]"
      @click="selectRating(star)"
      @mouseover="hoverRating(star)"
      @mouseleave="hoverRating(0)"
    >
      ★
    </span>
  </div>
</template>

<script>
export default {
  name: "Rating",
  props: {
    maxStars: {
      type: Number,
      default: 5, // Số lượng ngôi sao tối đa
    },
    value: {
      type: Number,
      default: 0, // Giá trị mặc định
    },
  },
  data() {
    return {
      selectedRating: this.value, // Số sao được chọn
      hoveredRating: 0, // Hiệu ứng hover
    };
  },
  computed: {
    stars() {
      return Array.from({ length: this.maxStars }, (_, i) => i + 1); // Tạo danh sách sao
    },
  },
  methods: {
    selectRating(star) {
      this.selectedRating = star; // Cập nhật rating
      console.log(this.selectedRating);
      
      this.$emit("update:value", star); // Phát event khi giá trị thay đổi
    },
    hoverRating(star) {
      this.hoveredRating = star; // Hiệu ứng hover
    },
  },
};
</script>

<style scoped>
.rating {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.star {
  color: gray;
}

.star.active,
.star:hover {
  color: gold;
}
</style>
