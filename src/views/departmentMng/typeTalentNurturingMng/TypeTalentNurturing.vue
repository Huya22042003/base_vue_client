<template>
  <section id="content" class="content_wrapper grid_content" tabindex="0">
    <Breadcrumb
      :pageTitle="pageTitle"
      :breadcrumbItems="breadcrumbItems"
    ></Breadcrumb>
    <!-- Form search -->
    <div class="sub_section_xs">
      <div class="search_box">
        <div class="search_section">
          <div class="search_toggle sm">
            <div class="left"></div>
            <div class="right">
              <div class="search_daywrap mg_r10">
                <span class="tag">
                  {{ t("departmentMng.typeTalentNurturingMng.search.dept") }}
                </span>
                <div class="select_row">
                  <SelectBoxBaseSearch
                    :id="'selectbox'"
                    :name="'selectbox'"
                    v-model="dataSearch.dept"
                    :data="listSelectBoxDept"
                  >
                  </SelectBoxBaseSearch>
                </div>
              </div>
              <div class="search_daywrap mg_r10">
                <span class="tag">
                  {{
                    t("departmentMng.typeTalentNurturingMng.search.typeTalent")
                  }}
                </span>
                <div class="select_row">
                  <InputBase
                    v-model="dataSearch.typeTalent"
                    id="input_typeTalent"
                  />
                </div>
              </div>
              <button
                type="button"
                class="btn_round btn_lg btn_primary mg_l10"
                @click="searchFormData"
              >
                조회하기
              </button>
              <button
                type="button"
                class="btn_round btn_lg btn_gray mg_l5"
                @click="clearFormSearch"
              >
                초기화
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="box dp_block">
      <p class="note_custom mb-4">
        {{ t("departmentMng.typeTalentNurturingMng.search.subTitle") }}
      </p>
      <div class="box_section">
        <!-- Table at here -->
        <GridComponentV2
          :key="key"
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
              <button class="btn_round btn_sm btn_primary" @click="create">
                <!-- 등록 -->
                {{ t("departmentMng.typeTalentNurturingMng.list.btnCreate") }}
              </button>
            </div>
          </template>
        </GridComponentV2>
      </div>
    </div>
  </section>
  <TypeTalentNurturingForm
    v-if="modalOpen"
    :is-open="modalOpen"
    :id="id"
    @close-modal="closeModal"
  ></TypeTalentNurturingForm>
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
import type {
  TaltNrtgTypeFilterDTO,
  TaltNrtgTypeResDTO,
} from "@/stores/departmentService/typeTalentNurturingMng/typeTalentNurturing.type";
import { format } from "date-fns";
import LinkGridComponent from "@/components/common/grid/LinkGridComponent.vue";
import { getListData } from "@/stores/departmentService/typeTalentNurturingMng/typeTalentNurturing.service";
import {
  DIV_CD_DEPT_DEPART,
  DIV_CD_DEPT_MAJOR,
  MESSAGE_ERROR_API,
} from "@/constants/common.const";
import { getDepartmentList } from "@/stores/common/department/department.service";
import TypeTalentNurturingForm from "./formAdd/TypeTalentNurturingForm.vue";

export default {
  components: {
    Breadcrumb,
    GridComponentV2,
    LinkGridComponent,
    TypeTalentNurturingForm,
  },
  data() {
    return {
      /* '인재양성유형 및 직무 관리' */
      pageTitle: this.t("departmentMng.typeTalentNurturingMng.title"),
      breadcrumbItems: [
        /* 'HOME' */
        {
          label: this.t("departmentMng.typeTalentNurturingMng.breadcrumb.01"),
          link: "/",
        },
        /* '학과정보 관리' */
        {
          label: this.t("departmentMng.typeTalentNurturingMng.breadcrumb.02"),
          link: "#",
        },
        /* '인재양성유형 및 직무 관리' */
        {
          label: this.t("departmentMng.typeTalentNurturingMng.breadcrumb.03"),
          link: SCREEN.typeTalentNurturingCrudDept.path,
        },
      ],
      parentListObject: [] as TaltNrtgTypeResDTO[],
      isOpen: false,
      paginationPageSize: PAGINATION_PAGE_SIZE,
      paginationPageSizeSelector: PAGINATION_PAGE_SIZE_SELECTOR,
      dataSearch: {
        dept: "",
        typeTalent: "",
        page: 1,
        size: 10,
        sort: "",
      } as TaltNrtgTypeFilterDTO,
      listSelectBoxDept: [] as Array<any>,
      listSelectBoxMajor: [] as Array<any>,
      data: ref([]),
      columnDefs: ref([
        {
          headerName: this.t(
            "departmentMng.typeTalentNurturingMng.list.dept"
          ) /* '학과' */,
          field: "deptmentNm",
          cellStyle: {
            textAlign: "center",
          },
        },
        {
          headerName: this.t(
            "departmentMng.typeTalentNurturingMng.list.typeTalent"
          ) /* '인재양성유형' */,
          field: "typeNm",
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
          headerName: this.t(
            "departmentMng.typeTalentNurturingMng.list.useYn"
          ) /* '학과' */,
          field: "useYn",
          cellStyle: {
            textAlign: "center",
          },
          flex: 0.4,
        },
        {
          headerName: this.t(
            "departmentMng.typeTalentNurturingMng.list.createdBy"
          ) /* '등록자' */,
          field: "regId",
          cellStyle: {
            textAlign: "center",
          },
          flex: 0.6,
        },
        {
          headerName: this.t(
            "departmentMng.typeTalentNurturingMng.list.createdDate"
          ) /* '등록일' */,
          field: "regDate",
          cellStyle: {
            textAlign: "center",
          },
          flex: 0.5,
        },
      ]),
      key: 1,
      totalRecord: 0,
      modalOpen: false,
      id: "",
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
  watch: {
    "dataSearch.universityMajor": {
      handler: function () {
        this.getDeptByMajor();
      },
    },
  },
  beforeMount() {
    this.listSelectBoxDept.push({
      cdId: "",
      cdNm: this.t("common.all"),
      upCdId: "dept",
    });
    getDepartmentList({
      deptCd: [],
      deptDivCd: [DIV_CD_DEPT_MAJOR, DIV_CD_DEPT_DEPART],
      upDeptCd: [],
      useYn: "",
    })
      .then((res) => {
        this.listSelectBoxDept = res.data.data
          .filter((el) => el.deptDivCd == DIV_CD_DEPT_DEPART)
          .map((el) => {
            return {
              cdId: el.deptCd,
              cdNm: el.deptNm,
              upCdId: "dept",
            };
          });
        this.listSelectBoxDept.unshift({
          cdId: "",
          cdNm: this.t("common.all"),
          upCdId: "major",
        });
        this.listSelectBoxMajor = res.data.data
          .filter((el) => el.deptDivCd == DIV_CD_DEPT_MAJOR)
          .map((el) => {
            return {
              cdId: el.deptCd,
              cdNm: el.deptNm,
              upCdId: "dept",
            };
          });
        this.listSelectBoxMajor.unshift({
          cdId: "",
          cdNm: this.t("common.all"),
          upCdId: "major",
        });
      })
      .catch(() => {
        throw new Error(MESSAGE_ERROR_API);
      });
  },
  methods: {
    getDeptByMajor() {
      this.store.setLoading(true);
      let dataSearch = [] as any[];
      getDepartmentList({
        deptCd: [],
        deptDivCd: [DIV_CD_DEPT_DEPART],
        upDeptCd: dataSearch,
        useYn: "",
      })
        .then((res) => {
          this.listSelectBoxDept = res.data.data.map((el) => {
            return {
              cdId: el.deptCd,
              cdNm: el.deptNm,
              upCdId: "dept",
            };
          });
          this.listSelectBoxDept.unshift({
            cdId: "",
            cdNm: this.t("common.all"),
            upCdId: "dept",
          });
        })
        .catch(() => {
          throw new Error(MESSAGE_ERROR_API);
        })
        .finally(() => {
          this.store.setLoading(false);
        });
    },
    create() {
      this.id = "";
      this.openModal();
    },
    goToDetail(data: any) {
      this.id = data.id;
      this.openModal();
    },
    getAllData() {
      this.store.setLoading(true);
      getListData(this.dataSearch)
        .then((res) => {
          if (res.status === SUCCSESS_STATUS) {
            this.totalRecord = res.data.data.totalElements;

            this.data = res.data.data.content.map((el) => {
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
    searchFormData() {
      this.dataSearch.page = 1;
      this.key++;
      this.fnPagination(this.dataSearch.page, this.dataSearch.size);
    },
    clearFormSearch() {
      this.dataSearch = {
        dept: "",
        typeTalent: "",
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
    openModal() {
      this.modalOpen = true;
    },
    closeModal(isLoad: boolean) {
      this.modalOpen = false;
      if (isLoad) {
        this.searchFormData();
      }
    },
  },
};
</script>

<style scoped lang="scss"></style>
