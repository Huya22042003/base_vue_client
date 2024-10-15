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
                <!-- ※ 신규 교육과정개발개편 시 최근 학년도 내용으로 적용됩니다. -->
                {{ t("02.modelTalentUni.talentAndGoal.pageNote") }}
              <!-- </p> -->
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
                class="button btn_xs btn_blue border_blue bo_rd4"
                @click="openModal"
              >
                <!-- 신규 등록 -->
                {{ t("02.modelTalentUni.talentAndGoal.button.register") }}
              </button>
            </div>
          </template>
        </GridComponentV2>
      </div>
    </div>
  </section>
  <ModalForm
    v-if="isOpen"
    :loadTable="() => fnPagination(1, dataSearch.size)"
    :isOpen="isOpen"
    :onClose="onClose"
    :year="yearSelect"
  ></ModalForm>
</template>

<script lang="ts">
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import { commonStore } from "@/stores/common";
import { ref } from "vue";
import ModalForm from "./modal/CrudGoals.vue";
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
import { getListData } from "@/stores/talentAndGoals/talentAndGoals.service";
import { SchEduGoal } from "@/stores/talentAndGoals/talentAndGoals.type";
import { EduSearch } from "@/stores/talentAndGoals/talentAndGoals.type";

export default {
  components: {
    Breadcrumb,
    ModalForm,
    GridComponentV2,
    LinkGridComponent,
  },
  data() {
    return {
      /* '장학제도 관리 시스템' */
      pageTitle: this.t("02.modelTalentUni.talentAndGoal.pageTitle"),
      breadcrumbItems: [
        /* 'HOME' */
        { label: this.t("common.home"), link: "/" },
        /* '학과정보 관리' */
        { label: this.t("02.modelTalentUni.talentAndGoal.menu"), link: "#" },
        /* '장학제도 관리 시스템' */
        {
          label: this.t("02.modelTalentUni.talentAndGoal.pageTitle"),
          link: SCREEN.talentEduUni.path,
        },
      ],
      isOpen: false,
      isLoad: false,
      paginationPageSize: PAGINATION_PAGE_SIZE,
      paginationPageSizeSelector: PAGINATION_PAGE_SIZE_SELECTOR,
      columnDefs: ref([
        {
          /* '학년도' */
          headerName: this.t("02.modelTalentUni.talentAndGoal.year"),
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
          headerName: this.t("02.modelTalentUni.talentAndGoal.regId"),
          field: "regId",
          cellStyle: {
            textAlign: "center",
          },
        },
        {
          /* '등록일' */
          headerName: this.t("02.modelTalentUni.talentAndGoal.regDate"),
          field: "regDate",
          cellStyle: {
            textAlign: "center",
          },
        },
      ]),
      yearSelect: "",
      data: [] as SchEduGoal[],
      dataSearch: {
        page: 1,
        size: PAGINATION_PAGE_SIZE,
        sort: "",
      } as EduSearch,
      totalRecord: 0,
    };
  },
  setup() {
    const { t } = useI18n();
    const store = commonStore();

    return {
      t,
      store,
    };
  },
  methods: {
    onClose() {
      this.isOpen = false;
      this.yearSelect = "";
    },
    openModal() {
      this.isOpen = true;
    },
    goToDetail(data: SchEduGoal) {
      this.yearSelect = data.eduYear;
      this.openModal();
    },
    getAllData() {
      this.store.setLoading(true);
      getListData(this.dataSearch)
        .then((res) => {
          if (res.status === SUCCSESS_STATUS) {
            this.totalRecord = res.data.data.totalElements;

            this.data = res.data.data.content.map((el: SchEduGoal) => {
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

<style scoped>
</style>
