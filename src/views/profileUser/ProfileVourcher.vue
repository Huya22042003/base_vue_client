<template>
  <div class="box_section">
    <h3 class="box_title_custom">Chương Trình Giảm Giá</h3>
  </div>
  <div class="box dp_block">
    <div class="box_section">
      <div class="search-container mg_b25">
        <span class="search-icon">&#128269;</span>
        <input type="text" class="search-input" placeholder="Tìm kiếm..." />
      </div>
      <!-- Start Code Discount -->
      <div class="box_section mg_b20">
        <div class="box_inner">
          <span class="box_title_xs font_gray">
            <text>Mã Giảm Giá</text>
          </span>
        </div>
      </div>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;">
        <div
          class="voucher-card code-discount"
          v-for="(item, index) in 4"
          :key="index"
        >
          <div class="left transition_light">
            <h3>{{ "50%" }}</h3>
            <span>{{ "Giảm giá" }}</span>
          </div>
          <div class="right">
            <div class="details">{{ "Áp dụng cho đơn hàng trên 200K" }}</div>
            <div class="quantity">Số lượng còn lại: {{ 50 }}</div>
            <div class="expiry">HSD: {{ "31/12/2024" }}</div>
            <div class="button_vourcher">
              <button>{{ "Lưu" }}</button>
            </div>
          </div>
        </div>
      </div>
      <!-- End Code Discount -->
       
      <!-- Start Vourcher Discount -->
      <div class="box_section mg_b20 mg_t40">
        <div class="box_inner">
          <span class="box_title_xs font_gray">
            <text>Vourcher Giảm Giá</text>
          </span>
        </div>
      </div>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;">
        <div
          class="voucher-card voucher-discount"
          v-for="(item, index) in 5"
          :key="index"
        >
          <div class="left transition_light">
            <h3>{{ "50%" }}</h3>
            <span>{{ "Giảm giá" }}</span>
          </div>
          <div class="right">
            <div class="details">{{ "Áp dụng cho đơn hàng trên 200K" }}</div>
            <div class="quantity">Số lượng còn lại: {{ 50 }}</div>
            <div class="expiry">HSD: {{ "31/12/2024" }}</div>
            <div class="button_vourcher">
              <button>{{ "Nhận" }}</button>
            </div>
          </div>
        </div>
      </div>
      <!-- End Vourcher Discount -->
       
    </div>
  </div>
</template>
<style scoped>
/* Container */
.search-container {
  width: 100%;
  margin: 0 auto;
  position: relative;
}

/* Icon tìm kiếm */
.search-icon {
  position: absolute;
  top: 50%;
  left: 15px;
  transform: translateY(-50%);
  font-size: 18px;
  color: #aaa;
  pointer-events: none;
}

/* Input */
.search-input {
  width: 100%;
  padding: 10px 15px 10px 40px;
  border: 1px solid #ccc;
  border-radius: 20px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.3s ease;
}

/* Focus effect */
.search-input:focus {
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}
</style>
