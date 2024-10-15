<template>
  <div class="box_section mt-5">
    <div class="box_section mt-13">
      <div class="tbl tbl_col">
        <GridComponentV2
          :rowData="data"
          v-if="dataEduCourse"
          :columnDefs="convertEduCourseType(columnDefs)"
          :paginationClientFlag="false"
          :key="key"
          :paginationPageSize="paginationPageSize"
          :paginationPageSizeSelector="paginationPageSizeSelector"
          :totalRecord="totalRecord"
          @customPagination="fnPagination"
          ref="gridKey"
        >
          <template #button> </template>
        </GridComponentV2>
      </div>
    </div>
    <div class="btn_group btn_end mg_t20">
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
  </div>
</template>

<script lang="ts">
import { commonStore } from "@/stores/common";
import { SCREEN } from "@/router/screen";
import { useI18n } from "vue-i18n";
import {
  PAGINATION_PAGE_SIZE,
  PAGINATION_PAGE_SIZE_SELECTOR,
} from "@/constants/screen.const";
import LinkGridComponent from "@/components/common/grid/LinkGridComponent.vue";
import { getPageSubjectProfile } from "@/stores/eduProcessCreation/subjectProfile/subjectProfile.service";
import {
  SubjectProfileFilterDTO,
  SubjectProfileResDTO,
} from "@/stores/eduProcessCreation/subjectProfile/subjectProfile.type";
import { detailEduCourse } from "@/stores/eduProcessCreation/eduCourse/eduProcess.service";
import { EduCourseDetailDTO } from "@/stores/eduProcessCreation/eduCourse/eduProcess.type";
import { EDU_TYPE_OTHER } from "@/constants/common.const";
export default {
  components: {
    LinkGridComponent,
  },
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
    const version = window.history.state.version;

    return { router, storeCommon, t, id, version };
  },
  data() {
    return {
      dataSearch: {
        eduCourseSeq: this.id ? this.id : "",
        sbjtCd: "",
        page: 1,
        size: PAGINATION_PAGE_SIZE,
        sort: "",
      } as SubjectProfileFilterDTO,
      paginationPageSize: PAGINATION_PAGE_SIZE,
      paginationPageSizeSelector: PAGINATION_PAGE_SIZE_SELECTOR,
      totalRecord: 0,
      data: [] as SubjectProfileResDTO[],
      key: 0,
      columnDefs: [
        {
          headerName: this.t("common.rowNum") /* "번호" */,
          field: "rowNum",
          cellStyle: {
            textAlign: "center",
          },
        },
        {
          headerName: this.t(
            "eduProcessCreation.subjectProfile.title1"
          ) /* "교과목구분" */,
          field: "sbjtType",
          cellStyle: {
            textAlign: "center",
          },
        },
        {
          headerName: this.t(
            "eduProcessCreation.subjectProfile.title2"
          ) /* "전공" */,
          field: "major",
          cellStyle: {
            textAlign: "center",
          },
        },
        {
          headerName: this.t(
            "eduProcessCreation.subjectProfile.title3"
          ) /* "교과목번호(학사)" */,
          field: "sbjtCd",
          cellStyle: {
            textAlign: "center",
          },
        },
        {
          headerName: this.t(
            "eduProcessCreation.subjectProfile.title4"
          ) /* "교과목명" */,
          field: "sbjtNm",
          cellStyle: {
            textAlign: "center",
            color: "#0029FF",
          },
          cellRenderer: LinkGridComponent,
          cellRendererParams: (data: any) => {
            return {
              onCustomEvent: this.goToDetail,
            };
          },
        },
        {
          headerName: this.t(
            "eduProcessCreation.subjectProfile.title5"
          ) /* "학년" */,
          field: "eduYear",
          cellStyle: {
            textAlign: "center",
          },
        },
        {
          headerName: this.t(
            "eduProcessCreation.subjectProfile.title6"
          ) /* "학기" */,
          field: "semester",
          cellStyle: {
            textAlign: "center",
          },
        },
        {
          headerName: this.t(
            "eduProcessCreation.subjectProfile.title7"
          ) /* "학점" */,
          field: "gpa",
          cellStyle: {
            textAlign: "center",
          },
        },
        {
          headerName: this.t(
            "eduProcessCreation.subjectProfile.title8"
          ) /* "시수(이론/실습)" */,
          field: "totalHrs",
          cellStyle: {
            textAlign: "center",
          },
        },
        {
          headerName: this.t(
            "eduProcessCreation.subjectProfile.title9"
          ) /* "작성상태" */,
          field: "statusNm",
          cellStyle(data: any) {
            const res = data.data as SubjectProfileResDTO;
            return {
              textAlign: "center",
              color: res.status == "0" ? "#000000" : "#026700",
            };
          },
        },
      ],
      dataEduCourse: {} as EduCourseDetailDTO
    };
  },
  async beforeMount() {
    this.storeCommon.setLoading(true);
    await detailEduCourse({ eduCourseSeq: this.id }).then((res: any) => {
      this.dataEduCourse = res.data.data as EduCourseDetailDTO;
    });
    this.storeCommon.setLoading(false);
  },
  methods: {
    getAllPage() {
      this.storeCommon.setLoading(true);
      getPageSubjectProfile(this.dataSearch)
        .then((res: any) => {
          this.totalRecord = res.data.data.totalElements as number;
          this.data = res.data.data.content.map(
            (item: SubjectProfileResDTO) => {
              item.totalHrs = `${item.totalHrs ? item.totalHrs : 0}(${
                item.thryHrs ? item.thryHrs : 0
              }/${item.pracHrs ? item.pracHrs : 0})`;

              item.statusNm = item.status == "0" ? "미작성" : "작성완료";

              return item;
            }
          ) as SubjectProfileResDTO[];
        })
        .finally(() => {
          this.storeCommon.setLoading(false);
        });
    },
    goToDetail(data: any) {
      this.router.push({
        name: SCREEN.eduSubjectProfileDetail.name,
        state: {
          id: this.id,
          version: this.version,
          sbjtCd: data.sbjtCd,
        },
      });
    },
    fnPagination(pageNumber: any, pagesSize: any) {
      this.dataSearch.page = pageNumber;
      this.dataSearch.size = pagesSize;

      this.getAllPage();
    },
    convertEduCourseType(columnDefs: any[]) {
      if (this.dataEduCourse && this.dataEduCourse.typeNm && this.dataEduCourse.typeNm.includes(EDU_TYPE_OTHER)) {
        return columnDefs.filter(item => item.field != 'major')
      }

      return columnDefs;
    },
    back() {
      this.router.push({
        name: SCREEN.eduProcessCreation.name,
      });
    },
  },
};
</script>
