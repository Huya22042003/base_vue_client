<template>
    <div class="box dp_block">
        <div class="box_section">
            <div class="box_title_xs">
                Cửa Hàng
            </div>
            <!-- <div class="box_section ta_c wd_p100">
                <div class="no_cnt" id="section14">
                    <p>Không có dữ liệu</p>
                </div>
            </div> -->
            <div>
                <div class="card-v1-hori mg_b5" v-for="item in 5">
                    <div class="card-image" :style="{
                        backgroundImage: `url(https://recipe1.ezmember.co.kr/cache/data/goods/24/10/41/1000047271/1000047271_list_036.jpg)`,
                    }"></div>
                    <div class="card-content wd_p100 pd_10">
                        <div class="heading">
                            Cửa Hàng Bán Hàng Abc Dxez - Chuyên Cung Cấp Thực Phẩm Sạch
                            <div class="author">
                                60 Hoàng Quốc Việt, Nam Từ Liêm, Cầu Giấy, Hà Đông, Hà Nội.<br />

                                <p class="font_gray lh_22 dp_flex al_center">Lượt Thích: 1.000<svg class="mg_l5"
                                        fill="#898D9C" height="16px" width="16px" version="1.1" id="Capa_1"
                                        xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                        viewBox="0 0 471.701 471.701" xml:space="preserve">
                                        <g>
                                            <path d="M433.601,67.001c-24.7-24.7-57.4-38.2-92.3-38.2s-67.7,13.6-92.4,38.3l-12.9,12.9l-13.1-13.1
                                    c-24.7-24.7-57.6-38.4-92.5-38.4c-34.8,0-67.6,13.6-92.2,38.2c-24.7,24.7-38.3,57.5-38.2,92.4c0,34.9,13.7,67.6,38.4,92.3
                                    l187.8,187.8c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-3.9l188.2-187.5c24.7-24.7,38.3-57.5,38.3-92.4
                                    C471.801,124.501,458.301,91.701,433.601,67.001z M414.401,232.701l-178.7,178l-178.3-178.3c-19.6-19.6-30.4-45.6-30.4-73.3
                                    s10.7-53.7,30.3-73.2c19.5-19.5,45.5-30.3,73.1-30.3c27.7,0,53.8,10.8,73.4,30.4l22.6,22.6c5.3,5.3,13.8,5.3,19.1,0l22.4-22.4
                                    c19.6-19.6,45.7-30.4,73.3-30.4c27.6,0,53.6,10.8,73.2,30.3c19.6,19.6,30.3,45.6,30.3,73.3
                                    C444.801,187.101,434.001,213.101,414.401,232.701z" />
                                        </g>
                                    </svg></p>
                                <p class="font_gray lh_22 dp_flex al_center">Lượt Đánh Giá: 4.5
                                    <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M11.2691 4.41115C11.5006 3.89177 11.6164 3.63208 11.7776 3.55211C11.9176 3.48263 12.082 3.48263 12.222 3.55211C12.3832 3.63208 12.499 3.89177 12.7305 4.41115L14.5745 8.54808C14.643 8.70162 14.6772 8.77839 14.7302 8.83718C14.777 8.8892 14.8343 8.93081 14.8982 8.95929C14.9705 8.99149 15.0541 9.00031 15.2213 9.01795L19.7256 9.49336C20.2911 9.55304 20.5738 9.58288 20.6997 9.71147C20.809 9.82316 20.8598 9.97956 20.837 10.1342C20.8108 10.3122 20.5996 10.5025 20.1772 10.8832L16.8125 13.9154C16.6877 14.0279 16.6252 14.0842 16.5857 14.1527C16.5507 14.2134 16.5288 14.2807 16.5215 14.3503C16.5132 14.429 16.5306 14.5112 16.5655 14.6757L17.5053 19.1064C17.6233 19.6627 17.6823 19.9408 17.5989 20.1002C17.5264 20.2388 17.3934 20.3354 17.2393 20.3615C17.0619 20.3915 16.8156 20.2495 16.323 19.9654L12.3995 17.7024C12.2539 17.6184 12.1811 17.5765 12.1037 17.56C12.0352 17.5455 11.9644 17.5455 11.8959 17.56C11.8185 17.5765 11.7457 17.6184 11.6001 17.7024L7.67662 19.9654C7.18404 20.2495 6.93775 20.3915 6.76034 20.3615C6.60623 20.3354 6.47319 20.2388 6.40075 20.1002C6.31736 19.9408 6.37635 19.6627 6.49434 19.1064L7.4341 14.6757C7.46898 14.5112 7.48642 14.429 7.47814 14.3503C7.47081 14.2807 7.44894 14.2134 7.41394 14.1527C7.37439 14.0842 7.31195 14.0279 7.18708 13.9154L3.82246 10.8832C3.40005 10.5025 3.18884 10.3122 3.16258 10.1342C3.13978 9.97956 3.19059 9.82316 3.29993 9.71147C3.42581 9.58288 3.70856 9.55304 4.27406 9.49336L8.77835 9.01795C8.94553 9.00031 9.02911 8.99149 9.10139 8.95929C9.16534 8.93081 9.2226 8.8892 9.26946 8.83718C9.32241 8.77839 9.35663 8.70162 9.42508 8.54808L11.2691 4.41115Z"
                                            stroke="#898D9C" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                    </svg>/5
                                </p>
                                <div class="font_gray lh_22 dp_flex al_center">Số lượt đánh giá: 100.000
                                    <div style="position: relative" class="box_title_funtion mg_l5 position_r">
                                        <a href="javascript:void(0);" class="font_primary">Xem thêm</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="dropdown">
                        <button class="btn_icon ellipsis"></button>
                        <div class="dropdown-content">
                            <a class="dropdown-item" href="#">Option 1</a>
                            <a class="dropdown-item" href="#">Option 2</a>
                            <a class="dropdown-item" href="#">Option 3</a>
                        </div>
                    </div>
                </div>
                <div class="ta_c">
                    <PaginationComponent
                    :totalPages="10" 
                    v-model="currentPage"
                    />
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
    width: 150px;
    height: 150px;
}
.card-v1-hori {
    align-items: start;
}
</style>