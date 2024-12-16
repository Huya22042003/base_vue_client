<template>
    <div class="content_wrapper grid_content">
        <div class="box dp_block position_r">
            <div class="box_section">
                <div class="box_inner">
                    <h3 class="box_title_sm">
                        <text class="font_primary">Đơn Hàng MHA-23467891</text><span>Đang Vận Chuyển</span>
                    </h3>
                </div>
                <div class="majorDerive_step mg_t45">
                    <ul>
                        <li class="on">
                            <a href="#">
                                <strong>✅</strong>
                                <p>Đặt Hàng Thành Công <br/>14-12-2024 14:00</p>
                            </a>
                        </li>
                        <li class="on">
                            <a href="#">
                                <strong>🔄</strong>
                                <p>Cửa Hàng Xác Nhận <br/>14-12-2024 14:00</p>
                            </a>
                        </li>
                        <li class="">
                            <a href="#"><strong>🚚</strong>
                                <p>Đang Vận Chuyển <br/>14-12-2024 14:00</p>
                            </a>
                        </li>
                        <li class="">
                            <a href="#"><strong>📦</strong>
                                <p>Đánh Giá <br/>14-12-2024 14:00</p>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="position_a cancel_order">
                <img class="wd_p100" :src="cancelPng" alt="">
            </div>
        </div>
        <div class="box dp_block">
            <div class="box_section">
                <div class="box_inner">
                    <h3 class="box_title_sm">
                        <text class="font_primary">Thông Tin Đơn Hàng</text>
                    </h3>
                </div>
                <div class="search_box col_3 wd_p100">
                    <ul>
                        <li>
                            <p>Mã Hóa Đơn</p>
                            <span>MHA-23467891</span>
                        </li>
                        <li>
                            <p>Trạng Thái</p>
                            <span>Đang Vận Chuyển</span>
                        </li>
                        <li>
                            <p>Lý Do Hủy</p>
                            <span>Tao Thích Hủy</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import cancelPng from '@/assets/images/cancel.png';
</script>
<style scoped>
.cancel_order {
    width: 174px;
    top: -50px;
    right: -30px;
    transform: rotate(10deg);
}
</style>