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
                            <li class="box_list_item" @click="changeTab('event')" :class="checkTab == 'event' && 'on'">Sự Kiện</li>
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
                <PortfolioEvent v-if="checkTab == 'event'" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

type TabNameType = "order" | "articel" | "event" | "notifical" | "account" | "vourcher" | "shop";

import PortfolioAccountMng from './portfolioAccount/PortfolioAccountMng.vue';
import PortfolioArticel from './portfolioArticel/PortfolioArticel.vue';
import PortfolioNotificalMng from './portfolioNotifical/PortfolioNotificalMng.vue';
import PortfolioOrderMng from './portfolioOrder/PortfolioOrderMng.vue';
import PortfolioShopMng from './portfolioShop/PortfolioShopMng.vue';
import PortfolioVourcher from './portfolioVourcher/PortfolioVourcher.vue';
import PortfolioEvent from './portfolioEvent/PortfolioEvent.vue';

const route = useRoute();
const router = useRouter();

const tabFromUrl = route.query.tab as TabNameType;
const checkTab = ref<TabNameType>("order");

if (tabFromUrl) {
  checkTab.value = tabFromUrl;
}

const changeTab = (tab: TabNameType) => {
  checkTab.value = tab;
  router.push({ query: { ...route.query, tab } });
};

watch(() => route.query.tab, (newTab) => {
  if (newTab && newTab !== checkTab.value) {
    checkTab.value = newTab as TabNameType;
  }
});

</script>

<style scoped></style>