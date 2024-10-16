<template>
  <div class="box_section">
    <p class="box_title_sm mt-13">
      <!-- 교육과정개발위원회 회의록 목록 -->{{
        t("eduProcessCreation.meetingReport.title1")
      }}
    </p>
    <div class="box_section">
      <div class="tbl tbl_col">
        <GridComponentV2
          :rowData="data"
          :columnDefs="columnDefs"
          :paginationClientFlag="false"
          :key="key"
          :paginationPageSize="paginationPageSize"
          :paginationPageSizeSelector="paginationPageSizeSelector"
          :totalRecord="totalRows"
          @customPagination="fnPagination"
          ref="gridKey"
        >
          <template #button> </template>
        </GridComponentV2>
      </div>
    </div>
    <div class="btn_group btn_end">
      <button
        type="button"
        class="btn_round btn_md btn_white"
        @click="back()"
      >
        {{ t("common.list") }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import {
  EduMeetingReportListModel,
  EduMeetingReportSearchModel,
} from "../../../stores/eduProcessCreation/meetingReport/meetingReport.type";
import LinkGridComponent from "../../../components/common/grid/LinkGridComponent.vue";
import {
  FORMAT_YYY_MM_DD,
  PAGINATION_PAGE_SIZE,
  PAGINATION_PAGE_SIZE_SELECTOR,
} from "../../../constants/screen.const";
import { commonStore } from "../../../stores/common";
import { useI18n } from "vue-i18n";
import { getPageMeetingReport } from "@/stores/eduProcessCreation/meetingReport/meetingReport.service";
import { format } from "date-fns";
import { SCREEN } from "@/router/screen";
export default {
  components: { LinkGridComponent },
  props: {
    stage: {
      type: Number,
      default: true,
    },
  },
  setup: () => {
    const router = useRouter();
    const storeCommon = commonStore();
    const { t } = useI18n();
    const id = window.history.state.id;
    const isSave = window.history.state.isSave;

    return { router, storeCommon, t, id, isSave };
  },
  data() {
    return {
      dataSearch: {
        page: 1,
        size: PAGINATION_PAGE_SIZE,
        sort: "",
      },
      paginationPageSize: PAGINATION_PAGE_SIZE,
      paginationPageSizeSelector: PAGINATION_PAGE_SIZE_SELECTOR,
      totalRecord: 0,
      data: [] as Array<EduMeetingReportListModel>,
      key: 0,
      columnDefs: [
        {
          headerName: this.t(
            "eduProcessCreation.meetingReport.title2"
          ) /* "번호" */,
          field: "rowNum",
          cellStyle: {
            textAlign: "center",
          },
          flex: 0.5,
        },
        {
          headerName: this.t(
            "eduProcessCreation.meetingReport.title3"
          ) /* "사업구분" */,
          field: "businessDivNm",
          cellStyle: {
            textAlign: "center",
          },
        },
        {
          headerName: this.t(
            "eduProcessCreation.meetingReport.title4"
          ) /* "학년도" */,
          field: "year",
          cellStyle: {
            textAlign: "center",
          },
          flex: 0.5,
        },
        {
          headerName: this.t(
            "eduProcessCreation.meetingReport.title5"
          ) /* "학과/학부" */,
          field: "deptNm",
          cellStyle: {
            textAlign: "center",
          },
        },
        {
          headerName: this.t(
            "eduProcessCreation.meetingReport.title6"
          ) /* "회의주제" */,
          field: "sbjt",
          cellStyle: {
            textAlign: "center",
            color: "#0029FF",
          },
          flex: 2,
          cellRenderer: LinkGridComponent,
          cellRendererParams: (data: any) => {
            return {
              onCustomEvent: this.goToReportModule,
            };
          },
        },
        {
          headerName: this.t(
            "eduProcessCreation.meetingReport.title7"
          ) /* "작성자" */,
          field: "regBy",
          cellStyle: {
            textAlign: "center",
          },
          flex: 0.75,
        },
        {
          headerName: this.t(
            "eduProcessCreation.meetingReport.title8"
          ) /* "작성일" */,
          field: "regDate",
          cellStyle: {
            textAlign: "center",
          },
          flex: 0.75,
        },
      ],
      eduMeetingReportSearchModel: {} as EduMeetingReportSearchModel,
      totalRows: 0,
    };
  },
  beforeMount() {
    this.eduMeetingReportSearchModel.eduCourseSeq = this.id;
  },
  methods: {
    getDataPage() {
      this.storeCommon.setLoading(true);
      getPageMeetingReport(this.eduMeetingReportSearchModel)
        .then(
          (res) => {
            this.data = res.data.data.content;
            this.totalRows = res.data.data.totalElements;
            this.data.forEach((item) => {
              item.regDate = format(new Date(item.regDate), FORMAT_YYY_MM_DD);
            });
          },
          (err) => {}
        )
        .finally(() => {
          this.storeCommon.setLoading(false);
        });
    },
    fnPagination(pageNumber: any, pageSize: any) {
      this.eduMeetingReportSearchModel.size = pageSize;
      this.eduMeetingReportSearchModel.page = pageNumber;
      this.eduMeetingReportSearchModel.sort = "";
      this.getDataPage();
    },
    goToReportModule() {
      this.$alert("웹레포팅툴 호출 (Report Module)");
    },
    back() {
      this.router.push({
        name: SCREEN.eduProcessCreation.name,
      });
    },
  },
};
</script>
