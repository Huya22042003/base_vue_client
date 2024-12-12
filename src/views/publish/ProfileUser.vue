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
                    <div class="dp_flex jc_between position_a wd_p100" style="bottom: -5px">
                        <div class="wd_p30 dp_flex jc_start"></div>
                        <div class="dp_flex flex_column al_center">
                            <AvatarCommon :width="100"
                                imageUrl="https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/076956f7-2972-485e-b6ce-2dff9d0e0410/8727b7ec-a53c-4f23-9832-ef445981e0b4.png" />
                            <div class="mg_t5">
                                <span class="font_gray" style="font-size: 1.8rem">Nguyễn Quốc Huy <button class="btn_icon icon_only tick_good"></button></span>
                            </div>
                        </div>
                        <div class="wd_p30 dp_flex jc_end">
                            <button class="btn_table bg_black font_white" v-tooltip="'Theo dõi'">
                                100.000.000
                                <span class="font_white mg_l5" style="margin-bottom: 2px">★</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="dp_flex jc_center flex_column container_menu_detail mg_t35 pd_b30">
                    <p class="box_title_sm mg_b10">
                        무생채 만드는 법, 절이지 않고 10분 만에 휘리릭 ~
                    </p>
                    <p class="font_gray">
                        소금에 절이지 않고 10분 만에 휘리릭 만들어 먹는 간단 반찬 무생채를
                        만들어 보았어요.
                    </p>
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
                            <Badge :count="9"> Mã Giảm Giá </Badge>
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
                            <span class="badge-container"> Khác + </span>
                        </label>
                    </p>
                </div>
            </div>
        </div>
        <!-- End Header Profile -->
         <ProfileOrder v-if="tabCheck == 0"/>
         <ProfileVourcher v-if="tabCheck == 1"/>
         <ProfileEvent v-if="tabCheck == 2" />
         <ProfileOther v-if="tabCheck == 3" />
    </div>
</template>
<script setup lang="ts">
import ProfileEvent from './ProfileEvent.vue';
import ProfileOrder from './ProfileOrder.vue';
import ProfileOther from './ProfileOther.vue';
import ProfileVourcher from './ProfileVourcher.vue';

const tabCheck = ref(0)
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
</style>
