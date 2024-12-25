<template>
    <div class="box dp_block">
        <div class="box_section">
            <div class="box_title_xs">
                Thông Báo
            </div>
            <!-- <div class="box_section ta_c wd_p100">
                <div class="no_cnt" id="section14">
                    <p>Không có dữ liệu</p>
                </div>
            </div> -->
            <div>
                <div class="card-v1-hori pd_10 mg_b5" :class="(item == 2 || item == 3) && 'on'" v-for="item in 5">
                    <div class="card-image" :style="{
                        backgroundImage: `url(https://recipe1.ezmember.co.kr/cache/data/goods/24/10/41/1000047271/1000047271_list_036.jpg)`,
                    }"></div>
                    <div class="card-content wd_p100 pd_10">
                        <div class="heading">
                            Cửa Hàng Bán Hàng Abc Dxez - Chuyên Cung Cấp Thực Phẩm Sạch
                            <div class="author">
                                60 Hoàng Quốc Việt, Nam Từ Liêm, Cầu Giấy, Hà Đông, Hà Nội.
                            </div>
                        </div>
                    </div>
                    <div class="dropdown">
                        <button class="btn_icon ellipsis"></button>
                        <div class="dropdown-content">
                            <a class="dropdown-item" href="#">Đánh Dấu Đã Đọc</a>
                            <a class="dropdown-item" href="#">Đánh Dấu Chưa Đọc</a>
                        </div>
                    </div>
                </div>
                <div class="ta_c">
                    <PaginationComponent :totalPages="10" v-model="currentPage" />
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const currentPage = ref(5);
</script>
<style scoped>
.card-image {
    min-width: 80px;
    min-height: 80px;
}

.card-v1-hori {
    align-items: start;
}

.card-v1-hori.on {
    background-color: #ffb29069;
    border-radius: 8px;
}
</style>