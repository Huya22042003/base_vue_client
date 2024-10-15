<template>
  <section id="content" class="content_wrapper grid_content" tabindex="0">
    <Breadcrumb
      :pageTitle="pageTitle"
      :breadcrumbItems="breadcrumbItems"
    ></Breadcrumb>

    <div class="box dp_block">
      <div class="box_section">
        <GridComponentV2
          :rowData="rowData"
          :columnDefs="columnDefs"
          :paginationClientFlag="false"
          :key="key"
          :totalRecord="totalRecord"
          @customPagination="fnPagination"
          ref="gridKey"
        >
          <template #button>
            <InputBase v-model="notificationSearchModel.ttl" />
            <button
              type="button"
              class="button btn_xl btn_blue btn_custom"
              v-on:click="searchData()"
            >
              {{ t("common.title.search") }}
            </button>
          </template>
        </GridComponentV2>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import { ref } from "vue";
import GridComponentV2 from "@/components/common/grid/GridComponentV2.vue";
import LinkGridComponent from "@/components/common/grid/LinkGridComponent.vue";
import { SCREEN } from "@/router/screen";
import { useRouter } from "vue-router";
import InputBase from "@/components/common/input/InputBase.vue";
import { useI18n } from "vue-i18n";
import { commonStore } from "@/stores/common";
import { notificationStore } from "@/stores/notification";
import {
  NotificationSearchModel,
  NotificationResponseModel,
} from "@/stores/notification/notification.type";
import {
  PAGINATION_PAGE_SIZE,
  SUCCSESS_STATUS,
  FORMAT_YYY_MM_DD,
} from "@/constants/screen.const.ts";
import { STATUS_YES } from "@/constants/common.const.ts";
import { format } from "date-fns";
const cmn = commonStore();
const router = useRouter();
const { t } = useI18n();
const store = notificationStore();
const swal = inject("$swal");
const key = ref(1);
const pageTitle = ref(t("schoolStaff.notification.index.pageTitle"));
const sizeObject = ref(0);
const breadcrumbItems = ref([
  { label: "HOME", link: "/" },
  { label: "dept1", link: "#" },
  { label: "dept2", link: "/banner" },
]);
const notificationSearchModel = {
  ttl: "",
  sort: "",
  page: 1,
  size: PAGINATION_PAGE_SIZE,
} as NotificationSearchModel;

const handleCustomClick = (item: NotificationResponseModel) => {
  router.push({
    name: SCREEN.detailNotification.name,
    state: {
      id: item.noticeSeq,
      ttl: notificationSearchModel.ttl,
    },
  });
};

//grid
const totalRecord = ref(0);
const rowData = ref([]);
const columnDefs = ref([
  {
    headerName: t("schoolStaff.notification.index.grid.header1"),
    field: "rowNumber",
    flex: 1,
    cellStyle: { textAlign: "center" },
  },
  {
    headerName: t("schoolStaff.notification.index.grid.header2"),
    field: "ttl",
    cellRenderer: LinkGridComponent,
    cellRendererParams: {
      onCustomEvent: handleCustomClick,
      type: "flag",
    },
    cellStyle: {
      color: "#2704FF",
      display: "flex",
      justifyContent: "flexStart",
      alignItems: "center",
      cursor: "pointer",
    },
    flex: 4,
  },
  {
    headerName: t("schoolStaff.notification.index.grid.header3"),
    field: "regDate",
    flex: 2,
    cellStyle: { textAlign: "center" },
  },
  {
    headerName: t("schoolStaff.notification.index.grid.header4"),
    field: "readCnt",
    flex: 1,
    cellStyle: { textAlign: "center" },
  },
  {
    headerName: t("schoolStaff.notification.index.grid.header5"),
    field: "staffNm",
    flex: 2,
    cellStyle: { textAlign: "center" },
  },
]);

const fnPagination = (pageNumber: any, pagesSize: any) => {
  notificationSearchModel.page = pageNumber;
  notificationSearchModel.size = pagesSize;
  getAllData();
};

const getAllData = async () => {
  cmn.setLoading(true);
  await store.getAllDataList(notificationSearchModel);
  if (store && store.status == SUCCSESS_STATUS) {
    rowData.value = store.resultData;
    sizeObject.value = rowData.value.length;
    totalRecord.value = store.totalRecord ?? 0;
    rowData.value.forEach((item: any) => {
      item.regDate = format(item.regDate, FORMAT_YYY_MM_DD);
      if (item.topFixYn == STATUS_YES) {
        item.ttl = item.ttl + " 🚩";
      }
      if (item.readCnt == 0) {
        item.readCnt = "-";
      }
    });
  }
  cmn.setLoading(false);
};

const searchData = () => {
  key.value++;
};
</script>

<style scoped>
.btn_custom {
  min-width: 100px;
}
</style>
