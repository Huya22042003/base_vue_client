<template>
    <div class="box dp_block">
        <div class="box_section">
            <div class="box_title_xs">
                Bài Viết Đã Lưu (20)
            </div>

            <!-- <div class="box_section ta_c wd_p100">
                <div class="no_cnt" id="section14">
                    <p>Không có dữ liệu</p>
                </div>
            </div> -->
            <div>
                <div class="dp_grid grid_col_4 gap_20">
                    <div class="card-v1" v-for="item in 6">
                        <div class="card-v1-image" :style="{
                            backgroundImage: `url(https://recipe1.ezmember.co.kr/cache/data/goods/24/10/41/1000047271/1000047271_list_036.jpg)`,
                        }">
                            <div class="dropdown">
                                <button class="btn_icon ellipsis"></button>
                                <div class="dropdown-content">
                                    <a class="dropdown-item" href="#">Option 1</a>
                                    <a class="dropdown-item" href="#">Option 2</a>
                                    <a class="dropdown-item" href="#">Option 3</a>
                                </div>
                            </div>
                        </div>
                        <div class="category">Bài Viết/ Thực Đơn</div>
                        <div class="heading">
                            A heading that must span over two lines
                            <div class="description">A heading that must span over two lines</div>
                            <div class="author">
                                Người viết <span class="name">Nguyễn Quốc Huy</span>
                            </div>
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