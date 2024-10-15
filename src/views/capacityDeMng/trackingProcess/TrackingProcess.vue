<template>
  <div class="page_wrapper">
    <section id="content" class="content_wrapper grid_content" tabindex="0">
      <Breadcrumb :pageTitle="pageTitle" :breadcrumbItems="''"></Breadcrumb>
      <div class="box dp_block">
        <div class="box_section">
          <div class="search_box col_3">
            <ul>
              <li>
                <p>{{ t("capacityDeMng.track.titleSearch.university") }}</p>
                <SelectBoxBase
                  v-model="searchModel.majorCd"
                  :data="listUniversity"
                ></SelectBoxBase>
              </li>
              <li>
                <p>{{ t("capacityDeMng.track.titleSearch.department") }}</p>
                <SelectBoxBase
                  v-model="searchModel.deptCd"
                  :data="listDepartment"
                ></SelectBoxBase>
              </li>
              <li>
                <p>{{ t("capacityDeMng.track.titleSearch.stdId") }}</p>
                <InputBase v-model="searchModel.stdId" :isDisable="false" />
              </li>
            </ul>
            <ul>
              <li>
                <p>{{ t("capacityDeMng.track.titleSearch.stdName") }}</p>
                <InputBase v-model="searchModel.userNm" :isDisable="false" />
              </li>
              <li>
                <p>{{ t("capacityDeMng.track.titleSearch.eduYear") }}</p>
                <SelectBoxBase
                  v-model="searchModel.gradeCd"
                  :data="listGrade"
                ></SelectBoxBase>
              </li>
              <li>
                <p>{{ t("capacityDeMng.track.titleSearch.trackName") }}</p>
                <SelectBoxBase
                  v-model="searchModel.trackCourseSeq"
                  :data="listTrackInfo"
                ></SelectBoxBase>
              </li>
            </ul>
            <ul>
              <li>
                <p>{{ t("capacityDeMng.track.titleSearch.status") }}</p>
                <div class="select_checkbox">
                  <RadiobuttonBase
                    v-for="item in listStatus"
                    :value="item.cdId"
                    :id="'listStatus' + item.cdId"
                    :name="'listStatus' + item.cdId"
                    :key="'listStatus' + item.cdId"
                    v-model="selectStatus"
                    :checked="item.cdId == selectStatus"
                    :label="item.cdNm"
                  >
                  </RadiobuttonBase>
                </div>
              </li>
            </ul>
            <div class="search_btnarea">
              <button
                type="button"
                class="button btn_xl btn_blue btn_responsive"
                @click="searchClick()"
              >
                {{ t("capacityDeMng.track.button.search") }}
              </button>
              <button
                type="button"
                class="button btn_xl btn_lightgray btn_responsive"
                @click="reset"
              >
                {{ t("capacityDeMng.track.button.refresh") }}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="box dp_block">
        <div class="box_section">
          <GridComponentV2
            :rowData="rowData"
            :columnDefs="columnDefs"
            :pagination="true"
            :paginationPageSize="paginationPageSize"
            :paginationPageSizeSelector="paginationPageSizeSelector"
            ref="gridKey"
            :paginationClientFlag="false"
            @customPagination="fnPagination"
            :totalRecord="totalRows"
            :key="key"
          >
          </GridComponentV2>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import LinkGridComponent from "@/components/common/grid/LinkGridComponent.vue";
import { useI18n } from "vue-i18n";
import { SCREEN } from "@/router/screen";
import {
  MODE_DETAIL,
  PAGINATION_PAGE_SIZE,
  PAGINATION_PAGE_SIZE_SELECTOR,
} from "@/constants/screen.const";
import {
  UP_CD_ID_COURSE_STATUS,
  UP_CD_ID_GRADE_LEVEL,
  DIV_CD_DEPT_MAJOR,
  DIV_CD_DEPT_DEPART,
} from "@/constants/common.const";
import { commonStore } from "@/stores/common";
import {
  getListTrack,
  getListTrackInfo,
} from "@/stores/capacityDeMng/trackingProcess/trackingProcess.service";
import type {
  SearchTrack,
  TrackInitModel,
} from "@/stores/capacityDeMng/trackingProcess/trackingProcess.type";
import { getListCodeMng } from "../../../stores/common/codeMng/codeMng.service";
import type { CodeMngResModel } from "@/stores/common/codeMng/codeMng.type";
import { getDepartmentList } from "@/stores/common/department/department.service";
export default defineComponent({
  components: {
    LinkGridComponent,
  },
  setup: () => {
    const store = commonStore();
    const { t } = useI18n();
    return { t, store };
  },
  data() {
    return {
      pageTitle: this.t("capacityDeMng.track.breadcrumb.pageTitle"),
      paginationPageSize: PAGINATION_PAGE_SIZE,
      paginationPageSizeSelector: PAGINATION_PAGE_SIZE_SELECTOR,
      key: 1,
      totalRows: 0,
      rowData: [] as Array<TrackInitModel>,
      searchModel: {
        majorCd: "",
        deptCd: "",
        gradeCd: "",
        trackCourseSeq: "",
      } as SearchTrack,
      listCode: {
        upCdIdList: [],
      } as CodeMngResModel,
      columnDefs: ref([
        {
          headerName: this.t("capacityDeMng.track.table.rowNum"),
          field: "rowNumber",
          cellStyle: {
            textAlign: "center",
          },
          flex: 0.7,
        },
        {
          headerName: this.t("capacityDeMng.track.table.university"),
          field: "majorNm",
        },
        {
          headerName: this.t("capacityDeMng.track.table.department"),
          field: "deptNm",
        },
        {
          headerName: this.t("capacityDeMng.track.table.stdId"),
          field: "stdId",
          cellStyle: {
            textAlign: "center",
          },
          flex: 0.7,
        },
        {
          headerName: this.t("capacityDeMng.track.table.stdName"),
          field: "userNm",
          cellRenderer: "LinkGridComponent",
          cellRendererParams: {
            onCustomEvent: this.handleDetailClick,
          },
          cellStyle: {
            color: "#2704FF",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        },
        {
          headerName: this.t("capacityDeMng.track.table.eduYear"),
          field: "gradeNm",
          cellStyle: {
            textAlign: "center",
          },
          flex: 0.7,
        },
        {
          headerName: this.t("capacityDeMng.track.table.trackName"),
          field: "trackCourseNm",
        },
        {
          headerName: this.t("capacityDeMng.track.table.status"),
          field: "status",
        },
        {
          headerName: this.t("capacityDeMng.track.table.numberSubject"),
          valueGetter: (params: any) =>
            `${params.data.subjectHad}/${params.data.totalSubject}`,
          cellStyle: {
            textAlign: "center",
          },
          flex: 0.7,
        },
      ]),
      selectStatus: "",
      listDepartment: [
        {
          cdId: "",
          cdNm: this.t("common.all"),
          upCdId: "dept",
        },
      ],
      listTrackInfo: [],
      listUniversity: [
        {
          cdId: "",
          cdNm: this.t("common.all"),
          upCdId: "major",
        },
      ],
      listData: [],
      listGrade: [
        {
          cdId: "",
          cdNm: this.t("capacityDeMng.track.titleSearch.dataStatus.dataStatus"),
        },
      ],
      listStatus: [],
    };
  },
  beforeMount() {
    try {
      Promise.all([
        this.getCode(),
        this.getListTrackData(),
        this.getListUniversity(),
      ]);
    } catch (e) {
      alert(e);
    }
  },
  watch: {
    "searchModel.majorCd"(newValue, oldValue) {
      if (newValue) {
        this.searchModel.deptCd = "";
        this.getListDepartment();
      } else {
        this.searchModel.deptCd = "";
        this.listDepartment = [
          {
            cdId: "",
            cdNm: this.t("common.all"),
            upCdId: "dept",
          },
        ];
      }
    },
  },
  methods: {
    searchClick() {
      this.searchModel.page = 1;
      this.key++;
    },
    search() {
      this.store.setLoading(true);
      this.searchModel.status = this.selectStatus;
      getListTrack(this.searchModel)
        .then((res) => {
          this.rowData = res.data.data.content;
          this.totalRows = res.data.data.totalElements;
        })
        .finally(() => {
          this.store.setLoading(false);
        });
    },
    handleDetailClick(data: any) {
      this.$router.push({
        name: SCREEN.trackingProcessDetail.name,
        params: {
          mode: MODE_DETAIL,
        },
        state: {
          stdId: data.stdId,
          trackCourseSeq: data.trackCourseSeq,
        },
      });
    },

    fnPagination(pageNumber: any, pagesSize: any) {
      this.searchModel.size = pagesSize;
      this.searchModel.page = pageNumber;
      this.searchModel.sort = "";
      this.search();
    },
    getCode() {
      this.store.setLoading(true);
      this.listCode.upCdIdList.push(UP_CD_ID_GRADE_LEVEL);
      this.listCode.upCdIdList.push(UP_CD_ID_COURSE_STATUS);
      getListCodeMng(this.listCode)
        .then((res) => {
          this.listGrade = res.data.data.filter(
            (item) => item.upCdId === UP_CD_ID_GRADE_LEVEL
          );
          this.listStatus = res.data.data.filter(
            (item) => item.upCdId === UP_CD_ID_COURSE_STATUS
          );
          this.listGrade.unshift({
            cdId: "",
            cdNm: this.t(
              "capacityDeMng.track.titleSearch.dataStatus.dataStatus"
            ),
          });
          this.listStatus.unshift({
            cdId: "",
            cdNm: this.t(
              "capacityDeMng.track.titleSearch.dataStatus.dataStatus"
            ),
          });
        })
        .finally(() => {
          this.store.setLoading(false);
        });
    },
    reset() {
      this.searchModel.majorCd = "";
      this.searchModel.deptCd = "";
      this.searchModel.stdId = "";
      this.searchModel.userNm = "";
      this.searchModel.gradeCd = "";
      this.searchModel.trackCourseSeq = "";
      this.selectStatus = "";
    },
    getListUniversity() {
      getDepartmentList({
        deptCd: [],
        deptDivCd: [DIV_CD_DEPT_MAJOR],
        upDeptCd: [],
        useYn: "",
      }).then((res) => {
        res.data.data.forEach((item: any) => {
          if (item.deptDivCd === DIV_CD_DEPT_MAJOR) {
            this.listUniversity.push({
              cdId: item.deptCd,
              cdNm: item.deptNm,
              upCdId: "major",
            });
          }
        });
      });
    },
    getListDepartment() {
      this.store.setLoading(true);
      getDepartmentList({
        deptCd: [],
        deptDivCd: [],
        upDeptCd: [this.searchModel.majorCd],
        useYn: "",
      }).then((res) => {
        res.data.data.forEach((item: any) => {
          if (item.deptDivCd === DIV_CD_DEPT_DEPART) {
            this.listDepartment.push({
              cdId: item.deptCd,
              cdNm: item.deptNm,
              upCdId: "dept",
            });
          }
        });
        this.store.setLoading(false);
      });
    },
    getListTrackData() {
      getListTrackInfo().then((res) => {
        this.listTrackInfo = res.data.data.map((item: any) => ({
          cdId: item.trackCourseSeq,
          cdNm: item.trackCourseNm,
        }));
        this.listTrackInfo.unshift({
          cdId: "",
          cdNm: this.t("capacityDeMng.track.titleSearch.dataStatus.dataStatus"),
        });
      });
    },
  },
});
</script>
