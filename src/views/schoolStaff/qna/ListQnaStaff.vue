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
            :key="key"
          >
            <template #button>
              <div class="dp_flex btn_group btn_end">
                <button
                  type="button"
                  class="btn_round btn_sm btn_primary"
                  @click="goCreate"
                >
                  {{ t("schoolStaff.qna.goCreate") }}
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
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import GridComponent from "@/components/common/grid/GridComponent.vue";
import {
  PAGINATION_PAGE_SIZE,
  PAGINATION_PAGE_SIZE_SELECTOR,
  MODE_DETAIL,
  FORMAT_YYY_MM_DD,
  MODE_CREATE,
} from "@/constants/screen.const";
import LinkGridComponent from "@/components/common/grid/LinkGridComponent.vue";
import { SCREEN } from "@/router/screen";
import { commonStore } from "@/stores/common";
import { format } from "date-fns";
import type { Pageable, QnaStaffModel } from "@/stores/qnaStaff/qnaStaff.type";
import { list } from "@/stores/qnaStaff/qnaStaff.service";
export default defineComponent({
  name: "QnaStaffList",
  components: {
    Breadcrumb,
    GridComponent,
    LinkGridComponent,
  },
  setup() {
    const { t } = useI18n();
    const router = useRouter();
    const cmn = commonStore();
    const pageTitle = t("schoolStaff.qna.title");
    const breadcrumbItems = [
      { label: "HOME", link: "/" },
      { label: "", link: "#" },
      { label: "", link: "#" },
    ];
    const paginationPageSize = PAGINATION_PAGE_SIZE;
    const paginationPageSizeSelector = PAGINATION_PAGE_SIZE_SELECTOR;

    return {
      t,
      router,
      breadcrumbItems,
      cmn,
      pageTitle,
      paginationPageSize,
      paginationPageSizeSelector,
    };
  },

  data() {
    return {
      key: 1,
      totalRows: 0,
      columnDefs: [
        {
          headerName: this.t("schoolStaff.qna.rowNum"),
          field: "rowNumber",
          cellStyle: { textAlign: "center" },
          flex: 1,
        },
        {
          headerName: this.t("schoolStaff.qna.ttl"),
          field: "qusTtl",
          cellRenderer: "LinkGridComponent",
          cellRendererParams: {
            onCustomEvent: this.handleCustomClick,
          },
          cellStyle: {
            color: "#2704FF",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
          flex: 3,
        },
        {
          headerName: this.t("schoolStaff.qna.regDate"),
          field: "regDate",
          cellStyle: { textAlign: "center" },
          flex: 2,
        },
        {
          headerName: this.t("schoolStaff.qna.stsCd"),
          field: "stsCd",
          cellStyle: { textAlign: "center" },
          flex: 1,
        },
        {
          headerName: this.t("schoolStaff.qna.ansDate"),
          field: "ansDate",
          cellStyle: { textAlign: "center" },
          flex: 1,
        },
        {
          headerName: this.t("schoolStaff.qna.ansId"),
          field: "ansId",
          cellStyle: { textAlign: "center" },
          flex: 1,
        },
      ],
      rowData: [] as Array<QnaStaffModel>,
      searchPage: {
        size: 1,
        page: 10,
        sort: "",
      } as Pageable,
    };
  },

  methods: {
    fnPagination(pageNumber: any, pagesSize: any) {
      this.searchPage.size = pagesSize;
      this.searchPage.page = pageNumber;
      this.searchPage.sort = "";
      this.cmn.setLoading(true);
      list(this.searchPage)
        .then((res) => {
          this.rowData = res.data.data.content;
          this.totalRows = res.data.data.totalElements;
          this.rowData.forEach((item, index) => {
            item.rowNumber = this.totalRows - item.rowNumber + 1;
            item.regDate = format(new Date(item.regDate), FORMAT_YYY_MM_DD);
            if (item.ansDate != null) {
              item.ansDate = format(new Date(item.ansDate), FORMAT_YYY_MM_DD);
            }
          });
        })
        .finally(() => {
          this.cmn.setLoading(false);
        });
    },

    handleCustomClick(data: any) {
      this.router.push({
        name: SCREEN.qnaStaffDetail.name,
        params: { mode: MODE_DETAIL },
        state: {
          id: data.qnaSeq,
        },
      });
    },
    goCreate() {
      this.$router.push({
        name: SCREEN.qnaStaffDetail.name,
        params: { mode: MODE_CREATE },
      });
    },
  },
});
</script>
