<template>
  <section id="content" class="content_wrapper grid_content" tabindex="0">
    <Breadcrumb
      :pageTitle="pageTitle"
      :breadcrumbItems="breadcrumbItems"
    ></Breadcrumb>
    <!-- Form search -->
    <div class="box dp_block">
      <div class="box_section">
        <div class="search_box col_3">
          <ul>
            <li>
              <p>
                {{ t("departmentMng.meettingReportEdu.search.job") }}
              </p>

              <SelectBoxBase
                :id="'selectbox'"
                :name="'selectbox'"
                v-model="dataSearch.bsinesDivCd"
                :data="listSelectBox"
              >
              </SelectBoxBase>
            </li>
            <li>
              <p>
                {{ t("departmentMng.meettingReportEdu.search.yearEdu") }}
              </p>
              <SelectBoxBase
                :id="'selectbox'"
                :name="'selectbox'"
                v-model="dataSearch.eduYear"
                :data="listSelectBoxEduYear"
              >
              </SelectBoxBase>
            </li>
            <li>
              <p>
                {{ t("departmentMng.meettingReportEdu.search.dept") }}
              </p>
              <InputBase
                v-model="dataSearch.deptNm"
                id="input_constitutiveFactor"
              />
            </li>
          </ul>
        </div>
        <div class="btn_group btn_end" style="gap: 10px">
          <button
            type="button"
            class="btn_round btn_lg btn_primary mg_l10"
            @click="search()"
          >
            {{ t("departmentMng.typeTalentNurturingMng.search.btnSeach") }}
          </button>
          <button
            type="button"
            class="btn_round btn_lg btn_gray mg_l5"
            @click="reset()"
          >
            {{ t("departmentMng.typeTalentNurturingMng.search.btnClear") }}
          </button>
        </div>
      </div>
    </div>

    <div class="box dp_block">
      <div class="box_inner">
        <!-- Table at here -->
        <GridComponentV2
          :rowData="data"
          :columnDefs="columnDefs"
          :pagination="true"
          :paginationClientFlag="false"
          :totalRecord="totalRecord"
          @customPagination="customPagination"
          :key="key"
          :paginationPageSize="paginationPageSize"
          :paginationPageSizeSelector="paginationPageSizeSelector"
        >
          <template #button>
            <div>
              <!-- <button
                type="button"
                class="btn_round btn_md btn_primary"
                @click="create"
              >
                {{ t("departmentMng.meettingReportEdu.list.btnCreate") }}
              </button> -->
              <ButtonBase
              class="btn_round btn_md btn_primary"
              :buttonName="t('departmentMng.meettingReportEdu.list.btnCreate')"
              @click="create()"
              >
              </ButtonBase>
            </div>
          </template>
        </GridComponentV2>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import { commonStore } from "../../../stores/common";
import { ref } from "vue";
import {
  PAGINATION_PAGE_SIZE_SELECTOR,
  PAGINATION_PAGE_SIZE,
  FORMAT_YYY_MM_DD,
  MODE_DETAIL,
  MODE_CREATE,
} from "../../../constants/screen.const";
import GridComponentV2 from "@/components/common/grid/GridComponentV2.vue";
import LinkGridComponent from "@/components/common/grid/LinkGridComponent.vue";
import { SCREEN } from "../../../router/screen";
import { useI18n } from "vue-i18n";
import { meetReportEduStore } from "../../../stores/departmentService/meettingReportEdu";
import Swal from "sweetalert2";
import { SUCCSESS_STATUS } from "../../../constants/screen.const";
import { MeetReportEduFilterDTO } from "../../../stores/departmentService/meettingReportEdu/meettingReportEdu.type";
import { STATUS_NO, UP_CD_ID_BSINES } from "../../../constants/common.const";
import { format } from "date-fns";
import { codeMngStore } from "@/stores/common/codeMng";

export default {
  components: {
    Breadcrumb,
    GridComponentV2,
    LinkGridComponent,
  },

  data() {
    return {
      /* '교육과정 회의록' */
      pageTitle: this.t("departmentMng.meettingReportEdu.title"),
      breadcrumbItems: [
        /* 'HOME' */
        {
          label: this.t("departmentMng.meettingReportEdu.breadcrumb.01"),
          link: "/",
        },
        /* '학과정보 관리' */
        {
          label: this.t("departmentMng.meettingReportEdu.breadcrumb.02"),
          link: "#",
        },
        /* '교육과정 회의록' */
        {
          label: this.t("departmentMng.meettingReportEdu.breadcrumb.03"),
          link: SCREEN.typeTalentNurturingCrudDept.path,
        },
      ],
      paginationPageSize: PAGINATION_PAGE_SIZE,
      paginationPageSizeSelector: PAGINATION_PAGE_SIZE_SELECTOR,
      dataSearch: {
        deptNm: "",
        eduYear: "",
        bsinesDivCd: "",
        delYn: STATUS_NO,
        page: 1,
        size: PAGINATION_PAGE_SIZE,
        sort: "",
      } as unknown as MeetReportEduFilterDTO,
      listSelectBox: [] as Array<any>,
      listSelectBoxDept: [] as Array<any>,
      listSelectBoxEduYear: [
        { cdId: "", cdNm: this.t("common.all"), upCdId: "" },
      ] as Array<any>,
      key: 1,
      totalRecord: 0,
      data: [],
      columnDefs: ref([
        {
          headerName: this.t("departmentMng.meettingReportEdu.list.rowNum"),
          field: "rowNumber",
          cellStyle: {
            textAlign: "center",
          },
          flex: 0.4,
        },
        {
          headerName: this.t("departmentMng.meettingReportEdu.list.job"),
          field: "bsinesDivNm",
          cellStyle: {
            textAlign: "center",
          },
        },
        {
          headerName: this.t("departmentMng.meettingReportEdu.list.yearEdu"),
          field: "year",
          cellStyle: {
            textAlign: "center",
          },
          flex: 0.6,
        },
        {
          headerName: this.t("departmentMng.meettingReportEdu.list.dept"),
          field: "deptNm",
          cellStyle: {
            textAlign: "center",
          },
        },
        {
          headerName: this.t("departmentMng.meettingReportEdu.list.topic"),
          cellRenderer: LinkGridComponent,
          cellRendererParams: { onCustomEvent: this.handleCustomClick },
          field: "sbjt",
          cellStyle: {
            color: "#2704FF",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        },
        {
          headerName: this.t(
            "departmentMng.meettingReportEdu.list.userRegis"
          ) /* '등록자' */,
          field: "regNm",
          cellStyle: {
            textAlign: "center",
          },
        },
        {
          headerName: this.t(
            "departmentMng.meettingReportEdu.list.dateGegis"
          ) /* '등록일' */,
          field: "regDate",
          cellStyle: {
            textAlign: "center",
          },
        },
      ]),
      isLoading: true,
    };
  },

  setup() {
    const { t } = useI18n();
    const storeCommon = commonStore();
    const storeMeetReportEdu = meetReportEduStore();
    const codeMng = codeMngStore();

    return {
      t,
      storeCommon,
      storeMeetReportEdu,
      codeMng,
    };
  },

  beforeMount() {
    this.listSelectBoxDept.push({
      cdId: "",
      cdNm: this.t("common.all"),
      upCdId: "dept",
    });
    this.getListSelectEduYear();
    this.getListData();
    this.getCodeBsiness();
    this.isLoading = false;
  },
  methods: {
    getListSelectEduYear() {
      const currentYear = new Date().getFullYear();
      this.listSelectBoxEduYear = [
        ...this.listSelectBoxEduYear,
        { cdId: currentYear - 1, cdNm: currentYear - 1, upCdId: "" },
        { cdId: currentYear, cdNm: currentYear, upCdId: "1" },
        { cdId: currentYear + 1, cdNm: currentYear + 1, upCdId: "1" },
      ];
    },

    async getCodeBsiness() {
      await this.codeMng.getCodeInfo({ upCdId: UP_CD_ID_BSINES });
      if (this.codeMng && this.codeMng.status == SUCCSESS_STATUS) {
        this.listSelectBox = this.codeMng.codeInfo.data;
      }
      this.listSelectBox.unshift({
        cdId: "",
        cdNm: this.t("common.all"),
        upCdId: UP_CD_ID_BSINES,
      });
    },

    async getListData() {
      if (this.isLoading) {
        this.storeCommon.setLoading(true);

        await this.storeMeetReportEdu.searchMeetReportEdu(this.dataSearch);
        if (
          this.storeMeetReportEdu.status &&
          this.storeMeetReportEdu.status == SUCCSESS_STATUS
        ) {
          this.data = this.storeMeetReportEdu.resultData.content.map(
            (item: { regDate: string }) => {
              item.regDate = format(item.regDate, FORMAT_YYY_MM_DD);

              return item;
            }
          );

          this.totalRecord =
            this.storeMeetReportEdu.resultData.totalElements ?? 0;
        }

        this.storeCommon.setLoading(false);
      }
    },

    //alert
    showAlert(message: string) {
      Swal.fire({
        text: message,
        showConfirmButton: true,
        confirmButtonColor: "#DD6B55",
        cancelButtonText: this.t("common.confirm"),
      });
    },

    customPagination(pageNumber: any, pagesSize: any) {
      this.dataSearch.page = pageNumber;
      this.dataSearch.size = pagesSize;

      if (!this.isLoading) {
        this.isLoading = true;
      } else {
        this.getListData();
      }
    },

    search() {
      this.dataSearch.page = 1;
      this.key++;
    },

    reset() {
      this.dataSearch = {
        deptNm: "",
        eduYear: "",
        bsinesDivCd: "",
        delYn: STATUS_NO,
        page: 1,
        size: this.dataSearch.size,
        sort: "",
      } as unknown as MeetReportEduFilterDTO;
    },

    create() {
      this.$router.push({
        name: SCREEN.meettingReportEduForm.name,
        params: { mode: MODE_CREATE },
      });
    },

    handleCustomClick(data: any) {
      this.$router.push({
        name: SCREEN.meettingReportEduForm.name,
        params: { mode: MODE_DETAIL },
        state: { id: data.docuSeq },
      });
    },
  },
};
</script>

<style scoped lang="scss"></style>
