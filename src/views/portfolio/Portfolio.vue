<template>
    <div class="content_wrapper grid_content">
        <div class="dp_flex gap_15">
            <div class="flex_1">
                <div class="box dp_block">
                    <div class="header_portfolio dp_flex gap_10">
                        <div class="flex_1">
                            <AvatarCommon/>
                        </div>
                        <div class="flex_3">
                            <p class="box_title">Nguyễn Quốc Huy</p>
                            <span class="box_title_fun">Chỉnh Sửa</span>
                        </div>
                    </div>
                    <div class="menu_port mg_t15">
                        <ul class="box_list">
                            <li class="box_list_item on">Đơn Hàng</li>
                            <li class="box_list_item">Bài Viết</li>
                            <li class="box_list_item">Thực Đơn</li>
                            <li class="box_list_item">item 1</li>
                            <li class="box_list_item">item select</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="flex_4">
                <PortfolioOrderMng/>
            </div>
        </div>
    </div>
  </template>
  
  <script setup lang="ts">
import PortfolioOrderMng from './portfolioOrder/PortfolioOrderMng.vue';

  </script>
  
  <style scoped>
  
  </style>
  