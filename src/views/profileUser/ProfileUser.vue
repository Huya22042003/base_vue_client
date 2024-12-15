<template>
    <div class="content_wrapper grid_content">
        <!-- Start Header Profile -->
        <div class="box dp_block pd_0">
            <div style="padding: 32px 24px" class="box_section position_r">
                <div class="view2_qr ribbon">
                    <img id="img_qrcode" src="https://recipe1.ezmember.co.kr/cache/recipe/2024/05/08/qr_6893285.png"
                        class="wd_p100" />
                </div>
                <div class="dp_flex jc_center flex_column position_r container_menu_detail pd_b50">
                    <img src="https://recipe1.ezmember.co.kr/cache/recipe/2018/07/29/52046ea43391de69233f594b0b52bb311.JPG"
                        style="width: 700px; height: 300px" />
                    <div class="dp_flex jc_between position_a wd_p100" style="top: 230px;">
                        <div class="wd_p30 dp_flex jc_start"></div>
                        <div class="dp_flex flex_column al_center">
                            <AvatarCommon :width="100"
                                imageUrl="https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/076956f7-2972-485e-b6ce-2dff9d0e0410/8727b7ec-a53c-4f23-9832-ef445981e0b4.png" />
                            <div class="mg_t5">
                                <span class="font_gray bold" style="font-size: 1.8rem">Cửa Hàng Đồ Ăn Ahihi
                                    <button class="btn_icon icon_only tick_good" v-tooltip="'Huy Hiệu'"></button>
                                </span>
                                <div class="search_box col_1 mg_t5">
                                    <ul>
                                        <li class="jc_center">
                                            <span class="font_green bold">8:00 - 23:00</span>
                                            <p class="font_gray normal dp_flex" v-tooltip="'Thời Gian Hoạt Động'"><svg
                                                    fill="#898D9C" width="20px" height="20px" viewBox="0 0 24 24"
                                                    id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M23.707,16.325a1,1,0,0,0-1.414,0l-5.627,5.628L13.978,19.3A1,1,0,0,0,12.543,20.7L15.287,23.4a1.876,1.876,0,0,0,1.345.6h.033A1.873,1.873,0,0,0,18,23.447l5.707-5.708a1,1,0,0,0,0-1.414Z
M11.09,21.959A10,10,0,1,1,22,12c0,.307-.015.611-.041.911A1,1,0,0,0,22.866,14a.989.989,0,0,0,1.085-.907C23.983,12.73,24,12.367,24,12A12,12,0,1,0,10.91,23.951c.031,0,.061,0,.091,0a1,1,0,0,0,.089-2Z
M11,7v4.586L8.293,14.293a1,1,0,1,0,1.414,1.414l3-3A1,1,0,0,0,13,12V7a1,1,0,0,0-2,0Z" />
                                                </svg></p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="wd_p30 dp_flex jc_end">
                        </div>
                    </div>
                </div>
                <div class="dp_flex jc_center mg_t45">
                    <div class="navigation-card">
                        <a href="#" class="tab heart on transition_light" v-tooltip="'Yêu Thích'">
                            <svg fill="#000000" height="800px" width="800px" version="1.1" id="Capa_1"
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
                            </svg>
                        </a>

                        <a href="#" class="tab star on transition_light" v-tooltip="'Đánh Giá'">
                            <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M11.2691 4.41115C11.5006 3.89177 11.6164 3.63208 11.7776 3.55211C11.9176 3.48263 12.082 3.48263 12.222 3.55211C12.3832 3.63208 12.499 3.89177 12.7305 4.41115L14.5745 8.54808C14.643 8.70162 14.6772 8.77839 14.7302 8.83718C14.777 8.8892 14.8343 8.93081 14.8982 8.95929C14.9705 8.99149 15.0541 9.00031 15.2213 9.01795L19.7256 9.49336C20.2911 9.55304 20.5738 9.58288 20.6997 9.71147C20.809 9.82316 20.8598 9.97956 20.837 10.1342C20.8108 10.3122 20.5996 10.5025 20.1772 10.8832L16.8125 13.9154C16.6877 14.0279 16.6252 14.0842 16.5857 14.1527C16.5507 14.2134 16.5288 14.2807 16.5215 14.3503C16.5132 14.429 16.5306 14.5112 16.5655 14.6757L17.5053 19.1064C17.6233 19.6627 17.6823 19.9408 17.5989 20.1002C17.5264 20.2388 17.3934 20.3354 17.2393 20.3615C17.0619 20.3915 16.8156 20.2495 16.323 19.9654L12.3995 17.7024C12.2539 17.6184 12.1811 17.5765 12.1037 17.56C12.0352 17.5455 11.9644 17.5455 11.8959 17.56C11.8185 17.5765 11.7457 17.6184 11.6001 17.7024L7.67662 19.9654C7.18404 20.2495 6.93775 20.3915 6.76034 20.3615C6.60623 20.3354 6.47319 20.2388 6.40075 20.1002C6.31736 19.9408 6.37635 19.6627 6.49434 19.1064L7.4341 14.6757C7.46898 14.5112 7.48642 14.429 7.47814 14.3503C7.47081 14.2807 7.44894 14.2134 7.41394 14.1527C7.37439 14.0842 7.31195 14.0279 7.18708 13.9154L3.82246 10.8832C3.40005 10.5025 3.18884 10.3122 3.16258 10.1342C3.13978 9.97956 3.19059 9.82316 3.29993 9.71147C3.42581 9.58288 3.70856 9.55304 4.27406 9.49336L8.77835 9.01795C8.94553 9.00031 9.02911 8.99149 9.10139 8.95929C9.16534 8.93081 9.2226 8.8892 9.26946 8.83718C9.32241 8.77839 9.35663 8.70162 9.42508 8.54808L11.2691 4.41115Z"
                                    stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </a>

                        <a href="#" class="tab save on transition_light" v-tooltip="'Lưu Cửa Hàng'">
                            <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M18.1716 1C18.702 1 19.2107 1.21071 19.5858 1.58579L22.4142 4.41421C22.7893 4.78929 23 5.29799 23 5.82843V20C23 21.6569 21.6569 23 20 23H4C2.34315 23 1 21.6569 1 20V4C1 2.34315 2.34315 1 4 1H18.1716ZM4 3C3.44772 3 3 3.44772 3 4V20C3 20.5523 3.44772 21 4 21L5 21L5 15C5 13.3431 6.34315 12 8 12L16 12C17.6569 12 19 13.3431 19 15V21H20C20.5523 21 21 20.5523 21 20V6.82843C21 6.29799 20.7893 5.78929 20.4142 5.41421L18.5858 3.58579C18.2107 3.21071 17.702 3 17.1716 3H17V5C17 6.65685 15.6569 8 14 8H10C8.34315 8 7 6.65685 7 5V3H4ZM17 21V15C17 14.4477 16.5523 14 16 14L8 14C7.44772 14 7 14.4477 7 15L7 21L17 21ZM9 3H15V5C15 5.55228 14.5523 6 14 6H10C9.44772 6 9 5.55228 9 5V3Z"
                                    fill="#0F0F0F" />
                            </svg>
                        </a>
                    </div>
                </div>

                <div class="container_menu_detail col_3 mg_t20">
                    <ul>
                        <li>
                            <p>Lượt Thích</p>
                            <div class="dp_flex al_center">100.000 <svg fill="#000000" height="16px" width="16px"
                                    version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                                    xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 471.701 471.701"
                                    xml:space="preserve">
                                    <g>
                                        <path d="M433.601,67.001c-24.7-24.7-57.4-38.2-92.3-38.2s-67.7,13.6-92.4,38.3l-12.9,12.9l-13.1-13.1
                                    c-24.7-24.7-57.6-38.4-92.5-38.4c-34.8,0-67.6,13.6-92.2,38.2c-24.7,24.7-38.3,57.5-38.2,92.4c0,34.9,13.7,67.6,38.4,92.3
                                    l187.8,187.8c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-3.9l188.2-187.5c24.7-24.7,38.3-57.5,38.3-92.4
                                    C471.801,124.501,458.301,91.701,433.601,67.001z M414.401,232.701l-178.7,178l-178.3-178.3c-19.6-19.6-30.4-45.6-30.4-73.3
                                    s10.7-53.7,30.3-73.2c19.5-19.5,45.5-30.3,73.1-30.3c27.7,0,53.8,10.8,73.4,30.4l22.6,22.6c5.3,5.3,13.8,5.3,19.1,0l22.4-22.4
                                    c19.6-19.6,45.7-30.4,73.3-30.4c27.6,0,53.6,10.8,73.2,30.3c19.6,19.6,30.3,45.6,30.3,73.3
                                    C444.801,187.101,434.001,213.101,414.401,232.701z" />
                                    </g>
                                </svg></div>
                        </li>
                        <li>
                            <p>Đánh Giá</p>
                            <div class="dp_flex al_center">4.5
                                <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M11.2691 4.41115C11.5006 3.89177 11.6164 3.63208 11.7776 3.55211C11.9176 3.48263 12.082 3.48263 12.222 3.55211C12.3832 3.63208 12.499 3.89177 12.7305 4.41115L14.5745 8.54808C14.643 8.70162 14.6772 8.77839 14.7302 8.83718C14.777 8.8892 14.8343 8.93081 14.8982 8.95929C14.9705 8.99149 15.0541 9.00031 15.2213 9.01795L19.7256 9.49336C20.2911 9.55304 20.5738 9.58288 20.6997 9.71147C20.809 9.82316 20.8598 9.97956 20.837 10.1342C20.8108 10.3122 20.5996 10.5025 20.1772 10.8832L16.8125 13.9154C16.6877 14.0279 16.6252 14.0842 16.5857 14.1527C16.5507 14.2134 16.5288 14.2807 16.5215 14.3503C16.5132 14.429 16.5306 14.5112 16.5655 14.6757L17.5053 19.1064C17.6233 19.6627 17.6823 19.9408 17.5989 20.1002C17.5264 20.2388 17.3934 20.3354 17.2393 20.3615C17.0619 20.3915 16.8156 20.2495 16.323 19.9654L12.3995 17.7024C12.2539 17.6184 12.1811 17.5765 12.1037 17.56C12.0352 17.5455 11.9644 17.5455 11.8959 17.56C11.8185 17.5765 11.7457 17.6184 11.6001 17.7024L7.67662 19.9654C7.18404 20.2495 6.93775 20.3915 6.76034 20.3615C6.60623 20.3354 6.47319 20.2388 6.40075 20.1002C6.31736 19.9408 6.37635 19.6627 6.49434 19.1064L7.4341 14.6757C7.46898 14.5112 7.48642 14.429 7.47814 14.3503C7.47081 14.2807 7.44894 14.2134 7.41394 14.1527C7.37439 14.0842 7.31195 14.0279 7.18708 13.9154L3.82246 10.8832C3.40005 10.5025 3.18884 10.3122 3.16258 10.1342C3.13978 9.97956 3.19059 9.82316 3.29993 9.71147C3.42581 9.58288 3.70856 9.55304 4.27406 9.49336L8.77835 9.01795C8.94553 9.00031 9.02911 8.99149 9.10139 8.95929C9.16534 8.93081 9.2226 8.8892 9.26946 8.83718C9.32241 8.77839 9.35663 8.70162 9.42508 8.54808L11.2691 4.41115Z"
                                        stroke="#000000" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                </svg>/5
                            </div>
                        </li>
                        <li>
                            <p>Lượt Đánh Giá</p>
                            <div class="dp_flex al_center">100.000 <div style="position: relative"
                                    class="box_title_funtion mg_l5">
                                    <a href="javascript:void(0);" class="font_primary">Xem thêm</a>
                                </div>
                            </div>
                        </li>
                        <li>
                            <p>Chủ Quán</p>
                            <div>Nguyễn Quốc Huy</div>
                        </li>
                        <li>
                            <p>Liên Hệ</p>
                            <div>0328843156</div>
                        </li>
                        <li>
                            <p>Địa Chỉ</p>
                            <div>60 Hoàng Quốc Việt, Cầu Giấy, Hà Nội</div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="box_section">
                <hr />
                <div class="radio_tab_lg_wrap">
                    <p class="radio_tab_lg">
                        <input type="radio" id="radio_1" name="radio" v-model="tabCheck" :value="0" checked />
                        <label for="radio_1">
                            <Badge :count="9999"> Thực Đơn Hôm Nay </Badge>
                        </label>
                    </p>
                    <p class="radio_tab_lg">
                        <input type="radio" id="radio_2" name="radio" v-model="tabCheck" :value="1" />
                        <label for="radio_2">
                            <Badge :count="9"> Chương Trình Giảm Giá </Badge>
                        </label>
                    </p>
                    <p class="radio_tab_lg">
                        <input type="radio" id="radio_3" name="radio" v-model="tabCheck" :value="2" />
                        <label for="radio_3">
                            <Badge :count="9999"> Sự Kiện </Badge>
                        </label>
                    </p>
                    <p class="radio_tab_lg">
                        <input type="radio" id="radio_4" name="radio" v-model="tabCheck" :value="3" />
                        <label for="radio_4">
                            <Badge :count="9999"> Đánh Giá </Badge>
                        </label>
                    </p>
                    <p class="radio_tab_lg">
                        <input type="radio" id="radio_5" name="radio" v-model="tabCheck" :value="4" />
                        <label for="radio_5">
                            <span class="badge-container"> Khác + </span>
                        </label>
                    </p>
                </div>
            </div>
        </div>
        <!-- End Header Profile -->
        <ProfileOrder v-if="tabCheck == 0" />
        <ProfileVourcher v-if="tabCheck == 1" />
        <ProfileEvent v-if="tabCheck == 2" />
        <ProfileOther v-if="tabCheck == 4" />
    </div>
</template>
<script setup lang="ts">
import ProfileEvent from "./ProfileEvent.vue";
import ProfileOrder from "./ProfileOrder.vue";
import ProfileOther from "./ProfileOther.vue";
import ProfileVourcher from "./ProfileVourcher.vue";

onMounted(() => {
    window.scrollTo({
        top: 670,
        behavior: "smooth",
    });
    console.log("Fdsafsd");
});

const tabCheck = ref(0);
</script>
<style scoped>
.view2_qr {
    position: absolute;
    right: 24px;
    top: 26.19px;
    text-align: center;
    width: 150px;
}

.view2_qr img {
    transform: rotate(-90deg);
}

.share_link_url {
    width: 80px;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
    border: 1px solid rgba(221, 221, 221, 0.8);
}

.container_menu_detail {
    width: 700px;
    margin: auto;
}

.radio_tab_lg {
    margin-right: 0;
    flex: 1;
}

.radio_tab_lg label {
    max-width: 100%;
    display: flex;
    align-items: center;
    padding-bottom: 1em;
}

/* From Uiverse.io by vinodjangid07 */
.navigation-card {
    width: fit-content;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 30px;
    background-color: rgb(255, 255, 255);
    padding: 15px 20px;
    border-radius: 50px;
}

.tab {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    overflow: hidden;
    background-color: rgb(252, 252, 252);
    padding: 15px;
    border-radius: 50%;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.3s;
}

.heart:hover {
    background-color: rgb(255 121 121);
}

.heart.on {
    background-color: rgb(255 121 121);
}

.star:hover {
    background-color: rgb(255, 235, 121);
}

.star.on {
    background-color: rgb(255, 235, 121);
}

.save:hover {
    background-color: rgb(121, 195, 255);
}

.save.on {
    background-color: rgb(121, 195, 255);
}

.col_3>ul>li>p:first-child,
.col_3>ul>li>span:first-child {
    font-size: 13px;
}

.col_3>ul {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin-bottom: 16px;
    width: 100%;
    align-items: center;
}

.col_3>ul>li {
    max-width: 100%;
}

.col_3>ul>li {
    display: flex;
    width: 100%;
    align-items: center;
}

.col_3>ul>li>p[data-v-1baed130]:first-child,
.col_3>ul>li>span[data-v-1baed130]:first-child {
    font-size: 13px;
}

.col_3>ul>li>p:first-child {
    width: 100px;
}

.col_3>ul>li>p:first-child,
.col_3>ul>li>span:first-child {
    flex-shrink: 0;
    padding-right: 10px;
    font-size: 16px;
    font-weight: 600;
    line-height: 1.2em;
    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: pre-wrap;
    text-align: right;
}
</style>
