<template>
  <section id="content" class="content_wrapper grid_content" tabindex="0">
    <Breadcrumb
      :pageTitle="pageTitle"
      :breadcrumbItems="breadcrumbItems"
    ></Breadcrumb>
    <div class="box dp_block" id="section1">
      <div class="box_section">
        <div class="search_box col_3">
          <ul>
            <li>
              <p class="">
                <!-- 수강 개설년도 -->
                 {{ t('certificationReport.manageApprovedSubjects.title') }}
                </p>
              <SelectBoxBase
                :id="'selectbox'"
                :name="'selectbox'"
                v-model="formSearch.yearEdu"
                :data="listSelectYear"
              >
              </SelectBoxBase>
            </li>
            <li>
              <p class="">
                <!-- 과목명 -->
                {{ t('certificationReport.manageApprovedSubjects.field1') }}
                </p>
              <InputBase v-model="formSearch.subjectNm" />
            </li>
            <li>
              <p class="">
                <!-- 담당교수 -->
                 {{ t('certificationReport.manageApprovedSubjects.field2') }}
                </p>
              <InputBase v-model="formSearch.teacher" />
            </li>
            <li>
              <p class="">
                <!-- 구분 -->
                 {{ t('certificationReport.manageApprovedSubjects.field3') }}
                </p>
              <RadiobuttonBase
                v-for="(item, index) in listRadioType"
                :mode="'show'"
                :value="item.cdId"
                v-model="formSearch.type"
                :id="`${item.cdId}_${index}_type`"
                :name="`${item.cdId}_${index}_type`"
                :key="`${item.cdId}_${index}_type`"
                :checked="item.cdId == formSearch.type"
                :label="item.cdNm"
              >
              </RadiobuttonBase>
            </li>
            <li>
              <p class="">
                <!-- 작성상태 -->
                {{ t('certificationReport.manageApprovedSubjects.field4') }}
              </p>
              <SelectBoxBase
                :id="'selectbox'"
                :name="'selectbox'"
                v-model="formSearch.statusCert"
                :data="listRadioStatusHyflex"
              >
              </SelectBoxBase>
            </li>
          </ul>
        </div>
      </div>
      <div class="box_section">
        <div class="btn_group btn_end">
          <div class="dp_flex" style="gap: 10px">
            <button
              class="button btn_xl btn_blue btn_responsive"
              @click="searchFormData"
            >
              {{ t("06.manageApprovedSubjects.search.searchButton") }}
            </button>
            <button class="button btn_xl btn_lightgray btn_responsive" @click="reset">
              {{ t("06.manageApprovedSubjects.search.resetButton") }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="box dp_block" id="section16">
      <div class="box_section">
        <div class="search_box col_3">
          <GridComponentV2
            :key="key"
            :rowData="dataTable"
            :columnDefs="columnDefs"
            :paginationClientFlag="false"
            :paginationPageSize="paginationPageSize"
            @customPagination="fnPagination"
            :totalRecord="totalRecord"
            :paginationPageSizeSelector="paginationPageSizeSelector"
          >
            <template #button>
              <button class="button btn_xs btn_blue bo_rd6" @click="openModal">
                <!-- 교과목 인증제 신청 -->
                {{ t("certificationReport.manageApprovedSubjects.exportExcel") }}
              </button>
            </template>
          </GridComponentV2>
        </div>
      </div>
    </div>
  </section>
  <SelectSubjectStaffModal
    v-if="isOpen"
    :isOpen="isOpen"
    :onClose="onClose"
    :onEvent="searchFormData"
  ></SelectSubjectStaffModal>

  <ReasonRejectModal
    v-if="opentReason"
    :isOpen="opentReason"
    :onClose="onCloseReason"
    :idDetail="idDetail">
  </ReasonRejectModal>

</template>

<script lang="ts">
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import { ref } from "vue";
import { defineComponent } from "vue";
import SelectBoxBase from "@/components/common/input/SelectBoxBase.vue";
import GridComponentV2 from "@/components/common/grid/GridComponentV2.vue";
import LinkGridComponent from "@/components/common/grid/LinkGridComponent.vue";
import { useI18n } from "vue-i18n";
import InputBase from "@/components/common/input/InputBase.vue";
import { getSubjectCert } from "@/stores/approvedSubjectsStaff/approvedSubjectsStaff.service";
import type {
  SubjectCertFilterDTO,
  SubjectCertResDTO,
} from "@/stores/approvedSubjectsStaff/approvedSubjectsStaff.type";
import { SCREEN } from "@/router/screen";
import {
  PAGINATION_PAGE_SIZE_SELECTOR,
  PAGINATION_PAGE_SIZE,
} from "@/constants/screen.const";
import { commonStore } from "@/stores/common";
import type { CodeMngModel } from "@/stores/common/codeMng/codeMng.type";
import { getListCodeMng } from "@/stores/common/codeMng/codeMng.service";
import {
  STATUS_SUBJECT,
  STATUS_HYFLEX_AL,
  STATUS_SUBJECT_CAPSTONE,
  HYFLEX_AL_STATUS_REJECT,
  CAPSTONE_DESIGN_STATUS_REJECT,
  HYFLEX_AL_STATUS_APPROVE,
  CAPSTONE_DESIGN_STATUS_APPROVE_1,
  CAPSTONE_DESIGN_STATUS_APPROVE_2,
} from "@/constants/common.const";
import SelectSubjectStaffModal from "./modal/SelectSubjectStaffModal.vue";
import ReasonRejectModal from './modal/ReasonRejectModal.vue'

export default defineComponent({
  components: {
    Breadcrumb,
    SelectBoxBase,
    GridComponentV2,
    LinkGridComponent,
    InputBase,
    SelectSubjectStaffModal,
    ReasonRejectModal
  },
  setup() {
    const { t } = useI18n();
    const store = commonStore();

    return {
      store,
      t,
      STATUS_SUBJECT_CAPSTONE,
    };
  },

  data() {
    return {
      pageTitle: this.t("certificationReport.manageApprovedSubjects.title1") /* 교과목 인증제 신청 */,
      breadcrumbItems: [],
      listRadioType: [] as CodeMngModel[],
      listRadioStatusHyflex: [] as any[],
      listSelectYear: [] as any[],
      paginationPageSize: PAGINATION_PAGE_SIZE,
      paginationPageSizeSelector: PAGINATION_PAGE_SIZE_SELECTOR,
      columnDefs: ref([
        {
          headerName: this.t("certificationReport.manageApprovedSubjects.header1")/* "개설년도-학기" */,
          field: "yearEdu",
          cellStyle: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        },
        {
          headerName: this.t("certificationReport.manageApprovedSubjects.header2")/* "학과" */,
          field: "department",
        },
        {
          headerName: this.t("certificationReport.manageApprovedSubjects.header3")/* "과목명" */,
          field: "name",
          cellStyle: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "blue",
          },
          cellRenderer: LinkGridComponent,
          cellRendererParams: {
            onCustomEvent: this.gotoPage,
          }
        },
        {
          headerName: this.t("certificationReport.manageApprovedSubjects.header4")/* "신청분야" */,
          field: "fieldNm",
          cellStyle: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        },

        {
          headerName: this.t("certificationReport.manageApprovedSubjects.header5")/* "이수구분" */,
          field: "sustDivNm",
          cellStyle: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        },
        {
          headerName: this.t("certificationReport.manageApprovedSubjects.header6")/* "학년" */,
          field: "gradeNm",
          cellStyle: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        },
        {
          headerName: this.t("certificationReport.manageApprovedSubjects.header7")/* "분반" */,
          field: "staffNm",
          cellStyle: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        },
        {
          headerName: this.t("certificationReport.manageApprovedSubjects.header8")/*  "담당 교수" */,
          field: "year",
          cellStyle: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        },
        {
          headerName: this.t("certificationReport.manageApprovedSubjects.header9")/* "구분" */,
          field: "type",
          cellStyle: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        },
        {
          headerName: this.t("certificationReport.manageApprovedSubjects.header10")/* "상태" */,
          field: "statusNm",
          cellStyle: (data: any) => {
            let color = "#000000";

            if (
              data.data.status === CAPSTONE_DESIGN_STATUS_APPROVE_1 ||
              data.data.status === CAPSTONE_DESIGN_STATUS_APPROVE_2 ||
              data.data.status === HYFLEX_AL_STATUS_APPROVE
            ) {
              color = "#005C14";
            }
            if (
              data.data.status === HYFLEX_AL_STATUS_REJECT ||
              data.data.status === CAPSTONE_DESIGN_STATUS_REJECT
            ) {
              color = "#0042ED";
            }

            return {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: color,
            };
          },
          cellRenderer: LinkGridComponent,
          cellRendererParams: {
            onCustomEvent: this.openModalReason,
          }
        },
      ]),
      dataTable: [] as SubjectCertResDTO[],
      formSearch: {
        yearEdu: new Date().getFullYear().toString(),
        subjectNm: "",
        teacher: "",
        type: "",
        statusCert: "",
        page: 1,
        size: PAGINATION_PAGE_SIZE,
        sort: "",
      } as SubjectCertFilterDTO,
      key: 1,
      isOpen: false,
      opentReason: false,
      totalRecord: 0,
      idDetail: ""
    };
  },
  beforeMount() {
    const yearCurrent = new Date().getFullYear();
    for (let year = yearCurrent; year <= yearCurrent + 1; year++) {
      this.listSelectYear.push({
        cdId: year,
        cdNm: year,
        upCdId: "year",
      });
    }
    getListCodeMng({
      upCdIdList: [STATUS_SUBJECT, STATUS_HYFLEX_AL],
    }).then((res) => {
      this.listRadioType = res.data.data.filter(
        (el: CodeMngModel) => el.upCdId == STATUS_SUBJECT
      );
      this.listRadioType.unshift({
        cdId: "",
        cdNm: this.t("common.all"),
        upCdId: STATUS_SUBJECT,
      });
      this.listRadioStatusHyflex = res.data.data.filter(
        (el: CodeMngModel) => el.upCdId == STATUS_HYFLEX_AL
      );
      this.listRadioStatusHyflex.unshift({
        cdId: "",
        cdNm: this.t("common.all"),
        upCdId: STATUS_HYFLEX_AL,
      });
    });
  },
  methods: {
    onClose() {
      this.isOpen = false;
    },
    openModal() {
      this.isOpen = true;
    },
    onCloseReason() {
      this.opentReason = false;
      this.idDetail = "";
    },
    openModalReason(data:any) {
      this.opentReason = true;
      this.idDetail = data.id;
    },
    searchFormData() {
      this.formSearch.page = 1;
      this.key++;
      this.fnPagination(this.formSearch.page, this.formSearch.size);
    },
    reset() {
      this.formSearch = {
        yearEdu: new Date().getFullYear().toString(),
        subjectNm: "",
        teacher: "",
        type: "",
        statusCert: "",
        page: 1,
        size: PAGINATION_PAGE_SIZE,
        sort: "",
      } as SubjectCertFilterDTO;
    },
    fnPagination(pageNumber: number, pagesSize: number) {
      this.formSearch.page = pageNumber;
      this.formSearch.size = pagesSize;
      this.getAllData();
    },
    getAllData() {
      this.store.setLoading(true);
      getSubjectCert(this.formSearch)
        .then((res) => {
          const data = res.data.data;
          this.dataTable = data.content.map((el: SubjectCertResDTO) => {
            el.yearEdu = `${el.yearEdu} - ${el.semester}`;

            return el;
          });
          this.totalRecord = data.totalElements;
        })
        .finally(() => {
          this.store.setLoading(false);
        });
    },
    clickOpenModalReject(data: SubjectCertResDTO) {
      if (
        data.status == CAPSTONE_DESIGN_STATUS_REJECT ||
        data.status === HYFLEX_AL_STATUS_REJECT
      ) {
        // open modal
      }
    },
    goPageHyflexAl(data: SubjectCertResDTO) {
      this.$router.push({
        name: SCREEN.hyflexALStaff.name,
        state: {
          id: data.id,
        },
      });
    },
    goPageCapstone(data: SubjectCertResDTO) {
      this.$router.push({
        name: SCREEN.capstoneDesignStaff.name,
        state: {
          id: data.id,
        },
      });
    },
    gotoPage(data: SubjectCertResDTO) {
      return data.typeCd == STATUS_SUBJECT_CAPSTONE
        ? this.goPageCapstone(data)
        : this.goPageHyflexAl(data);
    },
  },
});
</script>
