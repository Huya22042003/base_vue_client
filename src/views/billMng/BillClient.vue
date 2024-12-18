<template>
    <div class="content_wrapper grid_content">
        <div class="box dp_block position_r">
            <div class="box_section">
                <div class="box_inner">
                    <h3 class="box_title_sm">
                        Đơn Hàng MHA-23467891<span class="font_primary">Đang Vận Chuyển</span>
                    </h3>
                </div>
                <div class="majorDerive_step mg_t45">
                    <ul>
                        <li class="on">
                            <a href="#">
                                <strong>✅</strong>
                                <p>Đặt Hàng Thành Công <br />14-12-2024 14:00</p>
                            </a>
                        </li>
                        <li class="on">
                            <a href="#">
                                <strong>🔄</strong>
                                <p>Cửa Hàng Xác Nhận <br />14-12-2024 14:00</p>
                            </a>
                        </li>
                        <li class="">
                            <a href="#"><strong>🚚</strong>
                                <p>Đã Giao Cho ĐVVC <br />14-12-2024 14:00</p>
                            </a>
                        </li>
                        <li class="">
                            <a href="#"><strong>📦</strong>
                                <p>Đang Vận Chuyển <br />14-12-2024 14:00</p>
                            </a>
                        </li>
                        <li class="">
                            <a href="#"><strong>📦</strong>
                                <p>Giao Hàng Thành Công <br />14-12-2024 14:00</p>
                            </a>
                        </li>
                        <li class="">
                            <a href="#"><strong>📦</strong>
                                <p>Đánh Giá <br />14-12-2024 14:00</p>
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="box_section btn_secondary pd_20 mg_t40">
                    Đơn Hàng Đang Được Vận Chuyển. Shipper sẽ sớm gọi tới, bạn hãy chú ý điện thoại để không bỏ vỡ chuyến hàng nhé :33
                </div>
                <div class="box_section dp_flex jc_center mg_t40">
                    <div>
                        <button type="button" class="button btn_xs btn_blue mg_l10">
                            Hủy Đơn
                        </button>
                        <button type="button" class="button btn_xs btn_blue mg_l10">
                            Xác Nhận Giao Hàng Thành Công
                        </button>
                        <button type="button" class="button btn_xs btn_white mg_l10">
                            Liên Hệ Người Bán
                        </button>
                    </div>
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
                <div class="search_box col_2 wd_p100">
                    <ul>
                        <li class="mg_t10">
                            <p>Mã Hóa Đơn</p>
                            <span>MHA-23467891</span>
                        </li>
                        <li class="mg_t10">
                            <p>Trạng Thái</p>
                            <span>Đang Vận Chuyển</span>
                        </li>
                        <li class="mg_t10">
                            <p>Lý Do Hủy</p>
                            <span>Tao Thích Hủy</span>
                        </li>
                        <li class="mg_t10">
                            <p>Người Tạo</p>
                            <span>Nguyễn Quốc Huy</span>
                        </li>
                        <li class="mg_t10">
                            <p>Người Nhận</p>
                            <span>Nguyễn Quốc Huy</span>
                        </li>
                        <li class="mg_t10">
                            <p>SĐT</p>
                            <span>0328843156</span>
                        </li>
                        <li class="mg_t10">
                            <p>Địa Chỉ</p>
                            <span>Số 60, Hoàng Quốc Việt Hoàng Quốc Việt, Phường Nghĩa Đô, Quận Cầu Giấy, Hà Nội</span>
                        </li>
                        <li class="mg_t10">
                            <p>Loại Thanh Toán</p>
                            <span>
                                Thanh Toán Online
                            </span>
                        </li>
                        <li class="mg_t10">
                            <p>Cửa Hàng</p>
                            <span v-tooltip="'Xem Cửa Hàng'">
                                <a href="javascript:void(0);" class="font_primary">Cửa Hàng Bán Bún</a>
                            </span>
                        </li>
                        <li class="mg_t10">
                            <p>Địa Chỉ</p>
                            <span>
                                Số 60, Hoàng Quốc Việt Hoàng Quốc Việt, Phường Nghĩa Đô, Quận Cầu Giấy, Hà Nội
                            </span>
                        </li>
                        <li class="mg_t10">
                            <p>Ghi Chú</p>
                            <span>
                                Đang Đói Nha
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="box dp_block">
            <div class="box_section">
                <div class="box_inner">
                    <h3 class="box_title_sm">
                        <text class="font_primary">Cửa Hàng Bán Bún</text>
                    </h3>
                    <div class="box_title_funtion">
                        <a href="javascript:void(0);" class="font_primary">Xem Cửa Hàng</a>
                    </div>
                </div>
            </div>
            <div class="box_section">
                <div class="product" v-for="item in 3">
                    <div class="product-card">
                        <div class="product-image">
                            <img src="https://recipe1.ezmember.co.kr/cache/recipe/2018/07/29/52046ea43391de69233f594b0b52bb311.JPG"
                                alt="Product Image" />
                        </div>
                        <div class="product-info">
                            <h3 class="product-name">Sản phẩm {{ item }}</h3>
                            <p class="product-description">
                                Mô tả ngắn gọn của sản phẩm, bao gồm hương vị hoặc đặc điểm nổi
                                bật.
                            </p>
                        </div>
                        <div class="dp_flex al_center">
                            <span class="bold mg_r5">3</span> 
                            <span class="bold">x</span>
                            <span class="product-price mg_l5"> 50.000₫</span>
                        </div>
                    </div>
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

/* Card container */
.product-card {
    display: flex;
    background-color: #fff;
    overflow: hidden;
    margin: 15px auto;
}

/* Image section */
.product-image {
    flex: 0 0 120px;
    overflow: hidden;
}

.product-image img {
    width: 100%;
    object-fit: cover;
}

/* Info section */
.product-info {
    flex: 1;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

/* Product name */
.product-name {
    font-size: 15px;
    font-weight: bold;
    margin: 0;
    color: #333;
    cursor: pointer;
}

/* Product description */
.product-description {
    font-size: 14px;
    color: #666;
    margin: 5px 0 10px;
    line-height: 1.4;
}

/* Footer with price and button */
.product-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
/* Giá giảm */
.product-price {
  font-size: 16px;
  font-weight: bold;
  color: var(--primary);
}
</style>