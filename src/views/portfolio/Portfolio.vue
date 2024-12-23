<template>
    <div class="content_wrapper grid_content">
        <div class="dp_flex gap_15">
            <div class="flex_1">
                <div class="box dp_block">
                    <div class="header_portfolio dp_flex gap_10">
                        <div class="flex_1">
                            <AvatarCommon />
                        </div>
                        <div class="flex_3">
                            <p class="box_title">Nguyễn Quốc Huy</p>
                            <span class="box_title_fun">Chỉnh Sửa</span>
                        </div>
                    </div>
                        <hr/>
                    <div class="menu_port mg_t15">
                        <ul class="box_list">
                            <li class="box_list_item" @click="changeTab('order')" :class="checkTab == 'order' && 'on'">Đơn Hàng</li>
                            <li class="box_list_item" @click="changeTab('account')" :class="checkTab == 'account' && 'on'">Tài khoản</li>
                            <li class="box_list_item" @click="changeTab('notifical')" :class="checkTab == 'notifical' && 'on'">Thông Báo</li>
                            <li class="box_list_item" @click="changeTab('vourcher')" :class="checkTab == 'vourcher' && 'on'">Mã Giảm Giá</li>
                            <li class="box_list_item" @click="changeTab('shop')" :class="checkTab == 'shop' && 'on'">Cửa Hàng</li>
                            <li class="box_list_item" @click="changeTab('articel')" :class="checkTab == 'articel' && 'on'">Bài Viết</li>
                            <li class="box_list_item" @click="changeTab('menu')" :class="checkTab == 'menu' && 'on'">Thực Đơn</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="flex_4">
                <PortfolioOrderMng v-if="checkTab == 'order'" />
                <PortfolioAccountMng v-if="checkTab == 'account'"/>
                <PortfolioNotificalMng v-if="checkTab == 'notifical'"/>
                <PortfolioVourcher v-if="checkTab == 'vourcher'"/>
                <PortfolioShopMng v-if="checkTab == 'shop'"/>
                <PortfolioArticel v-if="checkTab == 'articel'" />
                <PortfolioMenu v-if="checkTab == 'menu'" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
type TabNameType = "order" | "articel" | "menu" | "notifical" | "account" | "vourcher" | "shop";

import PortfolioAccountMng from './portfolioAccount/PortfolioAccountMng.vue';
import PortfolioArticel from './portfolioArticel/PortfolioArticel.vue';
import PortfolioMenu from './portfolioMenu/PortfolioMenu.vue';
import PortfolioNotificalMng from './portfolioNotifical/PortfolioNotificalMng.vue';
import PortfolioOrderMng from './portfolioOrder/PortfolioOrderMng.vue';
import PortfolioShopMng from './portfolioShop/PortfolioShopMng.vue';
import PortfolioVourcher from './portfolioVourcher/PortfolioVourcher.vue';

const checkTab = ref<TabNameType>("order");

const changeTab = (tab: TabNameType) => {
    checkTab.value = tab;
}
</script>

<style scoped></style>