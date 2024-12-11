<template>
        <div class="box dp_block">
      <div class="box_inner">
        <h3 class="box_title_sm">
          <text
            >Bình luận bài viết <span class="font_red mg_l10">50</span></text
          >
        </h3>
      </div>
      <div>
        <template v-for="(item, index) in 5">
          <div class="dp_flex mg_b20 mg_l30">
            <div>
              <AvatarCommon
                imageUrl="https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/076956f7-2972-485e-b6ce-2dff9d0e0410/8727b7ec-a53c-4f23-9832-ef445981e0b4.png"
              />
            </div>

            <div class="mg_l20 wd_p100">
              <a class="dp_flex al_center" href="javascript:void(0);"
                ><span class="box_title font_red">Nguyễn Quốc Huy</span>
                <span class="mg_l10 font_gray">04/12/2024 12:00</span>
              </a>
              <p class="font_gray">Bài viết rất ngon nha {{ item }}</p>
              <a
                class="comment_btn font_primary mg_r5"
                href="javascript:void(0);"
                >Bình luận(2)</a
              >
              <a class="comment_btn font_primary" href="javascript:void(0);"
                >Xóa</a
              >

              <template v-if="index == 0" v-for="(item, index) in 3">
                <div class="dp_flex mg_b10 mg_t10">
                  <div>
                    <AvatarCommon
                      imageUrl="https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/076956f7-2972-485e-b6ce-2dff9d0e0410/8727b7ec-a53c-4f23-9832-ef445981e0b4.png"
                    />
                  </div>

                  <div class="mg_l20">
                    <a class="dp_flex al_center" href="javascript:void(0);"
                      ><span class="box_title font_red">Nguyễn Quốc Huy</span>
                      <span class="mg_l10 font_gray">04/12/2024 12:00</span>
                    </a>
                    <p class="font_gray">Bài viết rất ngon nha {{ item }}</p>
                    <a
                      class="comment_btn font_primary mg_r5"
                      href="javascript:void(0);"
                      >Bình luận(2)</a
                    >
                    <a
                      class="comment_btn font_primary"
                      href="javascript:void(0);"
                      >Xóa</a
                    >
                  </div>
                </div>
              </template>

              <div v-if="index == 0" class="mg_t10 wd_p100">
                <div class="dp_flex">
                  <div>
                    <AvatarCommon
                      imageUrl="https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/076956f7-2972-485e-b6ce-2dff9d0e0410/8727b7ec-a53c-4f23-9832-ef445981e0b4.png"
                    />
                  </div>

                  <div class="mg_l20 wd_p100">
                    <span class="dp_flex al_center"
                      ><span class="box_title font_red"
                        >Nguyễn Quốc Huy</span
                      ></span
                    >
                    <TextArea />
                  </div>
                </div>
                <div class="btn_group btn_end mg_t10">
                  <button class="button btn_sm btn_primary btn_responsive">
                    Bình luận
                  </button>
                </div>
              </div>
            </div>
          </div>
        </template>
        <div class="dp_flex jc_center mg_t25">
          <div style="position: relative" class="box_title_funtion">
            <a href="javascript:void(0);" class="font_primary"
              >Xem thêm bình luận</a
            >
          </div>
        </div>
        <div class="mg_t25">
          <div class="dp_flex">
            <div>
              <AvatarCommon
                imageUrl="https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/076956f7-2972-485e-b6ce-2dff9d0e0410/8727b7ec-a53c-4f23-9832-ef445981e0b4.png"
              />
            </div>

            <div class="mg_l20 wd_p100">
              <span class="dp_flex al_center"
                ><span class="box_title font_red">Nguyễn Quốc Huy</span></span
              >
              <TextArea />
            </div>
          </div>
          <div class="btn_group btn_end mg_t10">
            <button class="button btn_sm btn_primary btn_responsive">
              Bình luận
            </button>
          </div>
        </div>
      </div>
    </div>
</template>