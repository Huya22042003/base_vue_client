<template>
  <div class="page_wrapper">
    <section id="content" class="content_wrapper grid_content" tabindex="0">
      <Breadcrumb :pageTitle="pageTitle" :breadcrumbItems="breadcrumbItems" />
      <div class="box dp_block">
        <div class="box_section">
          <GridComponentV2
            :rowData="rowData"
            :columnDefs="columnDefs"
            :pagination="true"
            :paginationPageSize="paginationPageSize"
            :paginationPageSizeSelector="paginationPageSizeSelector"
            ref="grid"
            :paginationClientFlag="false"
            @customPagination="fnPagination"
            :totalRecord="totalRows"
          >
            <template #button>
              <div class="dp_flex btn_group btn_end">
                <button
                  type="button"
                  class="btn_round btn_xs btn_primary"
                  @click="register"
                >
                  {{ t("02.track.button.register") }}
                </button>
              </div>
            </template>
          </GridComponentV2>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import LinkGridComponent from "../../components/common/grid/LinkGridComponent.vue";
import GridComponent from "@/components/common/grid/GridComponent.vue";
import { useI18n } from "vue-i18n";
import { SCREEN } from "../../router/screen";
import {
  MODE_CREATE,
  MODE_DETAIL,
  SUCCSESS_STATUS,
  FORMAT_YYY_MM_DD,
  PAGINATION_PAGE_SIZE,
  PAGINATION_PAGE_SIZE_SELECTOR,
} from "../../constants/screen.const";
import { STATUS_YES } from "../../constants/common.const";
import { trackStore } from "@/stores/trackMng";
import { commonStore } from "../../stores/common";
import type {
  TrackListOutput,
  PageableModel,
} from "@/stores/trackMng/trackMng.type";
import { format } from "date-fns";
import { useRouter } from "vue-router";
import { number } from "yup";

export default defineComponent({
  name: "TrackList",
  components: { Breadcrumb, LinkGridComponent, GridComponent },
  setup() {
    const { t } = useI18n();
    const store = trackStore();
    const cmn = commonStore();
    const router = useRouter();
    const modeScreen = ref("");
    const trackId = ref("");
    const rowSelected = ref<any[]>([]);
    const pageTitle = t("02.track.title");
    const rowData = ref<Array<TrackListOutput>>([]);
    const breadcrumbItems = [
      { label: "HOME", link: "/" },
      { label: t("02.track.breadcrumb"), link: "#" },
      {
        label: t("02.track.title"),
        link: "#",
      },
    ];
    const paginationPageSize = PAGINATION_PAGE_SIZE;
    const paginationPageSizeSelector = PAGINATION_PAGE_SIZE_SELECTOR;
    const pageable = ref<PageableModel>({});
    const totalRows = ref(number);
    const columnDefs = [
      {
        headerName: t("02.track.table.rowNum"),
        field: "rowNumber",
        cellStyle: { textAlign: "center" },
        flex: 1,
      },
      {
        headerName: t("02.track.table.trackName"),
        field: "trackCourseNm",
        cellRenderer: "LinkGridComponent",
        cellRendererParams: {
          onCustomEvent: handleCustomClick,
        },
        cellStyle: {
          color: "#2704FF",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
        flex: 4,
      },
      {
        headerName: t("02.track.table.totalSubject"),
        field: "numberSubject",
        cellStyle: { textAlign: "center" },
        flex: 1,
      },
      {
        headerName: t("02.track.table.totalCer"),
        field: "totalCredit",
        cellStyle: { textAlign: "center" },
        flex: 1,
      },
      {
        headerName: t("02.track.table.useYn"),
        field: "useYn",
        cellStyle: { textAlign: "center" },
        cellRenderer: (params: any) => {
          return params.value === STATUS_YES
            ? t("common.use")
            : t("common.noUse");
        },
        flex: 1,
      },
      {
        headerName: t("02.track.table.regBy"),
        field: "regId",
        cellStyle: { textAlign: "center" },
        flex: 1,
      },
      {
        headerName: t("02.track.table.regDate"),
        field: "regDate",
        cellStyle: { textAlign: "center" },
        flex: 2,
      },
    ];
    function register() {
      router.push({
        name: SCREEN.crudTrackMng.name,
        params: { mode: MODE_CREATE },
      });
    }
    function handleCustomClick(data: any) {
      router.push({
        name: SCREEN.crudTrackMng.name,
        params: { mode: MODE_DETAIL },
        state: {
          id: data.trackCourseSeq,
        },
      });
    }

    return {
      store,
      cmn,
      t,
      register,
      modeScreen,
      trackId,
      rowSelected,
      pageTitle,
      breadcrumbItems,
      columnDefs,
      rowData,
      paginationPageSize,
      paginationPageSizeSelector,
      totalRows,
      pageable,
    };
  },
  methods: {
    async getDataAll() {
      this.cmn.setLoading(true);
      await this.store.listTrack(this.pageable);
      if (this.store && this.store.status == SUCCSESS_STATUS) {
        this.rowData = this.store.listTrackOutput.data.content;
        this.totalRows = this.store.listTrackOutput.data.totalElements;
        this.rowData.forEach((item, index) => {
          item.rowNumber = this.totalRows - item.rowNumber + 1;
          item.regDate = format(new Date(item.regDate), FORMAT_YYY_MM_DD);
        });
      }
      this.cmn.setLoading(false);
    },
    fnPagination(pageNumber: any, pagesSize: any) {
      this.pageable.size = pagesSize;
      this.pageable.page = pageNumber;
      this.pageable.sort = "";
      this.getDataAll();
    },
  },
});
</script>
