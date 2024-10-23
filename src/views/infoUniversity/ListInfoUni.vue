<template>
  <section id="content" class="content_wrapper grid_content" tabindex="0">
    <Breadcrumb
      :pageTitle="pageTitle"
      :breadcrumbItems="breadcrumbItems"
    ></Breadcrumb>
    <div class="box dp_block">
      <div class="box_inner">
        <div class="flex justify-between">
          <div class="box_title mb-5">
            <p class="section_tit_md note_custom">
              {{ t("03.basicInfoManagement.infoUniversity.pageNote") }}
            </p>
          </div>
        </div>

        <GridComponentV2
          :rowData="data"
          :columnDefs="columnDefs"
          :paginationClientFlag="false"
          :paginationPageSize="paginationPageSize"
          @customPagination="fnPagination"
          :totalRecord="totalRecord"
          :paginationPageSizeSelector="paginationPageSizeSelector"
        >
          <template #button>
            <div>
              <button
                class="btn_round btn_md btn_primary mg_l10"
                @click="goRegter"
              >
                {{ t("03.basicInfoManagement.infoUniversity.button.register") }}
              </button>
            </div>
          </template>
        </GridComponentV2>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import { commonStore } from "@/stores/common";
import { ref } from "vue";
import {
  PAGINATION_PAGE_SIZE_SELECTOR,
  PAGINATION_PAGE_SIZE,
  SUCCSESS_STATUS,
  FORMAT_YYY_MM_DD,
} from "@/constants/screen.const";
import GridComponentV2 from "@/components/common/grid/GridComponentV2.vue";
import { SCREEN } from "@/router/screen";
import { useI18n } from "vue-i18n";
import LinkGridComponent from "@/components/common/grid/LinkGridComponent.vue";
import { MESSAGE_ERROR_API } from "@/constants/common.const";
import { format } from "date-fns";
import { getListDataInfo } from "@/stores/infoUniversity/infoUniversity.service";
import type {
  infoUni,
  infoUniSearch,
} from "@/stores/infoUniversity/infoUniversity.type";
import { useRouter } from "vue-router";

export default {
  components: {
    Breadcrumb,
    GridComponentV2,
    LinkGridComponent,
  },
  data() {
    return {
      /* '장학제도 관리 시스템' */
      pageTitle: this.t("03.basicInfoManagement.infoUniversity.pageTitle"),
      breadcrumbItems: [
        /* 'HOME' */
        { label: this.t("common.home"), link: "/" },
        /* '학과정보 관리' */
        {
          label: this.t("03.basicInfoManagement.infoUniversity.menu"),
          link: "#",
        },
        /* '장학제도 관리 시스템' */
        {
          label: this.t("03.basicInfoManagement.infoUniversity.pageTitle"),
          link: SCREEN.infoUniversity.path,
        },
      ],
      isOpen: false,
      isLoad: false,
      paginationPageSize: PAGINATION_PAGE_SIZE,
      paginationPageSizeSelector: PAGINATION_PAGE_SIZE_SELECTOR,
      columnDefs: ref([
        {
          /* '학년도' */
          headerName: this.t("03.basicInfoManagement.infoUniversity.year"),
          field: "eduYear",
          cellRenderer: LinkGridComponent,
          cellRendererParams: { onCustomEvent: this.goToDetail },
          cellStyle: {
            color: "#2704FF",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          },
        },
        {
          /* '등록자' */
          headerName: this.t("03.basicInfoManagement.infoUniversity.regId"),
          field: "regId",
          cellStyle: {
            textAlign: "center",
          },
        },
        {
          /* '등록일' */
          headerName: this.t("03.basicInfoManagement.infoUniversity.regDate"),
          field: "regDate",
          cellStyle: {
            textAlign: "center",
          },
        },
      ]),
      yearSelect: "",
      data: [] as infoUni[],
      dataSearch: {
        page: 1,
        size: PAGINATION_PAGE_SIZE,
        sort: "",
      } as infoUniSearch,
      totalRecord: 0,
    };
  },
  setup() {
    const { t } = useI18n();
    const store = commonStore();
    const router = useRouter();

    return {
      t,
      store,
      router,
    };
  },
  methods: {
    goToDetail(data: infoUni) {
      this.router.push({
        name: SCREEN.infoUniversityAction.name,
        params: {},
        state: {
          year: data.eduYear,
        },
      });
    },
    goRegter() {
      this.$router.push({
        name: SCREEN.infoUniversityAction.name,
      });
    },
    getAllData() {
      this.store.setLoading(true);
      getListDataInfo(this.dataSearch)
        .then((res) => {
          if (res.status === SUCCSESS_STATUS) {
            this.totalRecord = res.data.data.totalElements;

            this.data = res.data.data.content.map((el: infoUni) => {
              el.regDate = format(el.regDate, FORMAT_YYY_MM_DD);
              return el;
            });
          }
        })
        .catch((err) => {
          throw new Error(MESSAGE_ERROR_API);
        })
        .finally(() => {
          this.store.setLoading(false);
        });
    },
    clearFormSearch() {
      this.dataSearch = {
        page: 1,
        size: PAGINATION_PAGE_SIZE,
        sort: "",
      };
    },
    fnPagination(pageNumber: any, pagesSize: any) {
      this.dataSearch.page = pageNumber;
      this.dataSearch.size = pagesSize;
      this.getAllData();
    },
  },
};
</script>
