<template>
    <div class="box">
        <div class="box_section">
            <div class="box_title_xs">
                Mã Giảm Giá
            </div>

            <div class="box_section">
                <InputSearch />
                <!-- Start Code Discount -->
                <div class="box_section mg_b20">
                    <div class="box_inner">
                        <span class="box_title_xs font_gray">
                            <text>Mã Giảm Giá</text>
                        </span>
                    </div>
                </div>
                <div class="dp_grid gap_20 grid_col_3">
                    <div class="voucher-card code-discount" v-for="(item, index) in 4" :key="index">
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
                <div class="ta_c">
                    <PaginationComponent :totalPages="10" v-model="currentPage" />
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
                <div class="dp_grid gap_20 grid_col_3">
                    <div class="voucher-card voucher-discount" v-for="(item, index) in 5" :key="index">
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
                <div class="ta_c">
                    <PaginationComponent :totalPages="10" v-model="currentPage" />
                </div>
                <!-- End Vourcher Discount -->

            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const currentPage = ref(5);
</script>