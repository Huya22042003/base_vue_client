<template>
    <div class="box dp_block">
        <div class="box_section">
            <div class="box_title_xs">
                Sự Kiện Tham Gia (5)
            </div>

            <!-- <div class="box_section ta_c wd_p100">
                <div class="no_cnt" id="section14">
                    <p>Không có dữ liệu</p>
                </div>
            </div> -->
            <div>
                <div class="dp_grid grid_col_4 gap_20">
                    <div class="card-v1" @click="onOpen()" v-for="item in 7">
                        <div class="card-v1-image" :style="{
                            backgroundImage: `url(https://via.placeholder.com/320x180.png?text=Event+1)`,
                        }"></div>
                        <div class="category">Đang diễn ra</div>
                        <div class="heading">
                            A heading that must span over two lines
                            <div class="author">
                                <span class="name">Thời gian:</span> 12/12/2024 - 13/12/2024
                                <br />
                                <span class="name">Người tạo:</span> Nguyễn Quốc Huy
                            </div>
                        </div>
                    </div>
                </div>
                <div class="ta_c">
                    <PaginationComponent :totalPages="10" v-model="currentPage" />
                </div>
            </div>
        </div>
    </div>
    <PopupEventDetail :is-open="isOpen" :onClose="onClose" />
</template>
<script lang="ts" setup>
import PopupEventDetail from '@/views/profileUser/PopupEventDetail.vue';
import { ref } from 'vue';

const isOpen = ref(false);

const onOpen = () => {
    isOpen.value = true;
}

const onClose = () => {
    isOpen.value = false;
}

const currentPage = ref(5);
</script>