<template>
  <section id="content" class="content_wrapper grid_content" tabindex="0">
    <Breadcrumb
      :pageTitle="pageTitle"
      :breadcrumbItems="breadcrumbItems"
    ></Breadcrumb>

    <div class="box dp_block">
      <div class="box_section">
        <div class="detail_noti">
          <div>
            <h2>{{ notificationDetailResponseModel.ttl }}</h2>
            <div class="mt-2">
              <span class="mr-2"
                >{{ t("schoolStaff.notification.detail.author") }}
              </span>
              <span class="mr-2">{{
                notificationDetailResponseModel.staffNm
              }}</span>
              <span class="mr-2">{{
                t("schoolStaff.notification.detail.date")
              }}</span>
              <span class="mr-2"
                >📆 {{ notificationDetailResponseModel.regDate }}</span
              >
            </div>
          </div>
          <div class="detail_noti_view">
            <p>{{ t("schoolStaff.notification.detail.view") }}</p>
            <p>{{ notificationDetailResponseModel.readCnt }}</p>
          </div>
        </div>
      </div>
      <hr />
      <div class="box_section detail_noti_content">
        <div v-html="notificationDetailResponseModel.cont"></div>
      </div>

      <hr />
      <div class="box_section">
        <div class="detail_noti flex justify-between items-center">
          <div>
            <div
              v-if="prev != null"
              @click="getDataDetail(prev)"
              class="detail_noti_icon flex items-center"
            >
              <span class="icon">
                <IconLeft />
              </span>
              <p class="detail_span">
                {{ t("schoolStaff.notification.detail.prev") }}
              </p>
            </div>
            <div
              class="btn_center"
              style="position: absolute; top: 88%; right: 50%"
            >
              <button class="button btn_white btn_xs" v-on:click="back()">
                목록
              </button>
            </div>
          </div>
          <div
            v-if="next != null"
            class="detail_noti_icon flex items-center"
            @click="getDataDetail(next)"
          >
            <p class="detail_span">
              {{ t("schoolStaff.notification.detail.next") }}
            </p>
            <span class="icon">
              <IconRight />
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import { onMounted, ref } from "vue";
import IconLeft from "@/components/icon/IconLeft.vue";
import IconRight from "@/components/icon/IconRight.vue";
import { useRouter } from "vue-router";
import { SCREEN } from "@/router/screen";
import {
  NotificationDetailResponseModel,
  NotificationDetailModel,
  NotiIdModel,
} from "@/stores/notification/notification.type";
import { notificationStore } from "@/stores/notification";
import { useI18n } from "vue-i18n";
import { commonStore } from "@/stores/common";
import { SUCCSESS_STATUS, FORMAT_YYY_MM_DD } from "@/constants/screen.const.ts";
import { format } from "date-fns";
const router = useRouter();
const { t } = useI18n();
const store = notificationStore();
const cmn = commonStore();
const pageTitle = ref(t("schoolStaff.notification.detail.pageTitle"));
const breadcrumbItems = ref([
  { label: "HOME", link: "/" },
  { label: "dept1", link: "#" },
  { label: "dept2", link: "/banner" },
]);
const id = ref(1);
const ttl = ref("");
const sizeObject = ref(0);
const next = ref("");
const prev = ref("");

const notificationDetailModel = ref<NotificationDetailModel>({
  noticeSeq: id.value,
  ttl: ttl.value,
});
const notiIdModel = ref<NotiIdModel>([]);
const notificationDetailResponseModel = ref<NotificationDetailResponseModel>(
  {}
);
onBeforeMount(() => {
  id.value = window.history.state.id;
  ttl.value = window.history.state.ttl;
  notificationDetailModel.value.noticeSeq = id.value;
  getNoticeId();
  getDataDetail(id.value);
});

const getDataDetail = async (id: any) => {
  try {
    cmn.setLoading(true);
    notificationDetailModel.value.noticeSeq = id;
    await store.getDataDetailNotification(notificationDetailModel.value);
    if (store && store.status == SUCCSESS_STATUS) {
      notificationDetailResponseModel.value = store.detailData;
      notificationDetailResponseModel.value.regDate = format(
        notificationDetailResponseModel.value.regDate,
        FORMAT_YYY_MM_DD
      );
    }
    getNoticeId();
  } catch (e) {
    back();
  } finally {
    cmn.setLoading(false);
  }
};
const getNoticeId = async () => {
  try {
    cmn.setLoading(true);
    await store.getNoticeListId();
    if (store && store.status == SUCCSESS_STATUS) {
      notiIdModel.value = store.notiIdModel;
      let index = notiIdModel.value.findIndex(
        (item) => item.noticeSeq === id.value
      );
      if (index !== -1) {
        let previousValue = index > 0 ? notiIdModel.value[index - 1] : null;
        let nextValue =
          index < notiIdModel.value.length - 1
            ? notiIdModel.value[index + 1]
            : null;
        prev.value = previousValue?.noticeSeq;
        next.value = nextValue?.noticeSeq;
      }
    }
  } catch (e) {
    back();
  } finally {
    cmn.setLoading(false);
  }
};
const back = () => {
  router.push({
    name: SCREEN.notification.name,
  });
};
</script>

<style scoped>
.detail_noti_icon {
  cursor: pointer;
}
</style>
