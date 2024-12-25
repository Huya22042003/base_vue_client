<template>
    <div class="box dp_block">
        <div class="box_section">
            <div>
                <div class="radio_tab_lg_wrap">
                    <p class="radio_tab_lg" v-for="tab in tabs" :key="tab.id">
                        <input type="radio" :id="tab.id" name="sub_tab" :checked="isActive(tab.value)"
                            @change="changeRequestParam(tab.value)" />
                        <label :for="tab.id">{{ tab.label }}</label>
                    </p>
                </div>
            </div>
        </div>
        <ProfileSetting v-if="currentTab == 'profileSetting'" />
        <AddressSetting v-if="currentTab == 'addressSetting'" />
        <ChangePassword v-if="currentTab == 'changePassword'" />
        <CustomSetting v-if="currentTab == 'customSetting'" />
    </div>
</template>
<script lang="ts" setup>
import ProfileSetting from './ProfileSetting.vue';
import AddressSetting from './AddressSetting.vue';
import ChangePassword from './ChangePassword.vue';
import CustomSetting from './CustomSetting.vue';

const tabs = [
    { id: "radio_1", label: "Hồ Sơ", value: "profileSetting" },
    // { id: "radio_2", label: "Địa Chỉ", value: "addressSetting" },
    { id: "radio_3", label: "Đổi Mật Khẩu", value: "changePassword" },
    { id: "radio_4", label: "Thiết Lập Riêng", value: "customSetting" },
];

const currentTab = ref(new URLSearchParams(window.location.search).get("subTab") || tabs[0].value);

const isActive = (value: string) => {
    return currentTab.value === value;
};

const changeRequestParam = (value: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set("subTab", value);
    window.history.replaceState({}, "", url.toString());
    currentTab.value = value;
};
</script>
