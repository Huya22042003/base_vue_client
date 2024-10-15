<template>
  <section id="content" class="content_wrapper grid_content" tabindex="0">
    <Breadcrumb
      :pageTitle="pageTitle"
      :breadcrumbItems="breadcrumbItems"
    ></Breadcrumb>

    <div class="box dp_block">
      <div class="box_inner">
        <p class="note_custom mb-2">
          <!-- ※ 신규 교육과정개발개편 시 최근 학년도 내용으로 적용됩니다. -->
          {{ t("talentEduGoalsMng.list.subTitle") }}
        </p>
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
                class="btn_round btn_lg btn_primary mg_l10"
                @click="goActionCreate"
              >
                <!-- 신규 등록 -->
                {{ t("talentEduGoalsMng.list.openModal") }}
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
import { getListData } from "@/stores/departmentService/talentEduGoal/talentEduGoal.service";
import { MESSAGE_ERROR_API } from "@/constants/common.const";
import { format } from "date-fns";
import type {
  DeptEduGoalFilterDTO,
  DeptEduGoalResDTO,
} from "@/stores/departmentService/talentEduGoal/talentEduGoal.type";

export default {
  components: {
    Breadcrumb,
    GridComponentV2,
    LinkGridComponent,
  },
  data() {
    return {
      /* '학과인재상 및 교육목표' */
      pageTitle: this.t("talentEduGoalsMng.title"),
      breadcrumbItems: [
        /* 'HOME' */
        { label: this.t("talentEduGoalsMng.breadcrumb.01"), link: "/" },
        /* '학과정보 관리' */
        { label: this.t("talentEduGoalsMng.breadcrumb.02"), link: "#" },
        /* '학과인재상 및 교육목표' */
        {
          label: this.t("talentEduGoalsMng.breadcrumb.03"),
          link: SCREEN.talentEduGoalsMngDept.path,
        },
      ],
      isOpen: false,
      isLoad: false,
      paginationPageSize: PAGINATION_PAGE_SIZE,
      paginationPageSizeSelector: PAGINATION_PAGE_SIZE_SELECTOR,
      columnDefs: ref([
        {
          /* '학과' */
          headerName: this.t("talentEduGoalsMng.list.dept"),
          field: "deptNm",
          cellRenderer: LinkGridComponent,
          cellRendererParams: { onCustomEvent: this.goAction },
          cellStyle: {
            color: "#2704FF",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          },
        },
        {
          /* '학년도' */
          headerName: this.t("talentEduGoalsMng.list.year"),
          field: "eduYear",
          flex: 0.4,
          cellStyle: {
            textAlign: "center",
          },
        },
        {
          /* '등록자' */
          headerName: this.t("talentEduGoalsMng.list.createdBy"),
          field: "regId",
          cellStyle: {
            textAlign: "center",
          },
          flex: 0.4,
        },
        {
          /* '등록일' */
          headerName: this.t("talentEduGoalsMng.list.createdDate"),
          field: "regDate",
          cellStyle: {
            textAlign: "center",
          },
          flex: 0.4,
        },
      ]),
      yearSelect: "",
      deptSelect: "",
      deptNmSelect: "",
      majorSelect: "",
      data: [] as DeptEduGoalResDTO[],
      dataSearch: {
        page: 1,
        size: PAGINATION_PAGE_SIZE,
        sort: "",
      } as DeptEduGoalFilterDTO,
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
    getAllData() {
      this.store.setLoading(true);
      getListData(this.dataSearch)
        .then((res) => {
          if (res.status === SUCCSESS_STATUS) {
            this.totalRecord = res.data.data.totalElements;

            this.data = res.data.data.content.map((el: DeptEduGoalResDTO) => {
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
    goAction(data: DeptEduGoalResDTO) {
      this.$router.push({
        name: SCREEN.talentEduGoalsDeptAction.name,
        state: {
          yearSelect: data.eduYear,
          deptSelect: data.deptCd,
          deptNm: data.deptNm,
          major: data.major,
        },
      });
    },
    goActionCreate() {
      this.$router.push({
        name: SCREEN.talentEduGoalsDeptAction.name,
      });
    },
  },
};
</script>
