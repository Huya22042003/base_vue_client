<template>
  <section id="content" class="content_wrapper grid_content" tabindex="0">
    <Breadcrumb :pageTitle="pageTitle" :breadcrumbItems="''"></Breadcrumb>
    <div class="box dp_block">
      <div class="box_section">
        <div class="search_box col_3">
          <ul>
            <li>
              <!-- 상태 -->
              <p>{{ t("capacityDeMng.volunteerIndividual.search.status") }}</p>
              <SelectBoxBase
                id="selectbox_status"
                name="'selectbox'"
                v-model="formSearch.status"
                :data="listSelectStatus"
              >
              </SelectBoxBase>
            </li>
            <li>
              <!-- 단과대학 -->
              <p>{{ t("capacityDeMng.volunteerIndividual.search.major") }}</p>
              <SelectBoxBase
                id="selectbox_major"
                name="'selectbox'"
                v-model="formSearch.major"
                :data="listSelectBoxMajor"
              >
              </SelectBoxBase>
            </li>
            <li>
              <!-- 학과 -->
              <p>
                {{ t("capacityDeMng.volunteerIndividual.search.department") }}
              </p>
              <SelectBoxBase
                id="selectbox_department"
                name="'selectbox'"
                v-model="formSearch.department"
                :data="listSelectBoxDept"
              >
              </SelectBoxBase>
            </li>
            <li>
              <!-- 이름(학번) -->
              <p>{{ t("capacityDeMng.volunteerIndividual.search.name") }}</p>
              <InputTextBase
                v-model="formSearch.name"
                id="selectbox_name"
              ></InputTextBase>
            </li>
          </ul>
          <div class="dp_flex btn_group btn_end" style="gap: 10px">
            <button
              class="button btn_xl btn_blue btn_responsive"
              @click="searchFormData()"
            >
              <!-- 조회 -->
              {{ t("common.search") }}
            </button>
            <button
              class="button btn_xl btn_lightgray btn_responsive"
              @click="cleardataSearch()"
            >
              <!-- 초기화 -->
              {{ t("common.reset") }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="box dp_block">
      <div class="box_section">
        <GridComponentV2
          :key="key"
          :rowData="rowData"
          :columnDefs="columnDefs"
          :paginationClientFlag="false"
          :paginationPageSize="paginationPageSize"
          @customPagination="fnPagination"
          :totalRecord="totalRecord"
          :paginationPageSizeSelector="paginationPageSizeSelector"
        >
        </GridComponentV2>
      </div>
    </div>
  </section>
  <VolunteerIndividualDetail
    v-if="isOpen"
    :id-detail="id"
    :status="status"
    :isOpen="isOpen"
    :onClose="onClose"
  ></VolunteerIndividualDetail>
</template>
<script lang="ts">
import {
  TYPE_EVENT,
  MODE_CREATE,
  PAGINATION_PAGE_SIZE,
  PAGINATION_PAGE_SIZE_SELECTOR,
  SUCCSESS_STATUS,
  FORMAT_YYY_MM_DD,
  TYPE_BUTTON_DOWLOAD,
} from "@/constants/screen.const";
import { defineComponent, ref } from "vue";
import LinkGridComponent from "@/components/common/grid/LinkGridComponent.vue";
import ButtonGridComponent from "@/components/common/grid/ButtonGridComponent.vue";
import { useI18n } from "vue-i18n";
import { commonStore } from "@/stores/common";
import { SCREEN } from "@/router/screen";
import GridComponentV2 from "@/components/common/grid/GridComponentV2.vue";
import VolunteerIndividualDetail from "./modal/VolunteerIndividualDetail.vue";
import type { CodeMngModel } from "@/stores/common/codeMng/codeMng.type";
import { getListCodeMng } from "@/stores/common/codeMng/codeMng.service";
import {
  DIV_CD_DEPT_DEPART,
  DIV_CD_DEPT_MAJOR,
  MESSAGE_ERROR_API,
} from "@/constants/common.const";
import { getDepartmentList } from "@/stores/common/department/department.service";
import {
  STATUS_SOCIAL_REVIEW,
  STATUS_SOCIAL_APPROVE,
  STATUS_SOCIAL_REJECT,
} from "@/constants/common.const";
import { getPageSocialIndividual } from "@/stores/capacityDeMng/socialServe/volunteerActivities/volunteerActivities.service";
import type { SocialIndividualFilterDTO } from "@/stores/capacityDeMng/socialServe/volunteerActivities/volunteerActivities.type";
import { format } from "date-fns";
import { fileMngStore } from "@/stores/common/fileMng";
import { STATUS_SOCIAL_UP_CD_ID } from "@/constants/common.const";

export default defineComponent({
  components: {
    LinkGridComponent,
    VolunteerIndividualDetail,
    ButtonGridComponent,
  },
  setup: () => {
    const store = commonStore();
    const { t } = useI18n();
    const fileMng = fileMngStore();

    return { t, store, fileMng };
  },
  data() {
    return {
      pageTitle: this.t(
        "capacityDeMng.volunteerIndividual.title"
      ) /* 개인참여 사회봉사 관리 */,
      rowData: [] as Array<any>,
      rowselected: [],
      listRadio2: [
        { id: "4", name: "전체" },
        { id: "5", name: "해운대" },
        { id: "6", name: "양산" },
      ],
      formSearch: {
        status: "",
        major: "",
        department: "",
        name: "",
        page: 1,
        size: PAGINATION_PAGE_SIZE,
        sort: "",
      } as SocialIndividualFilterDTO,
      columnDefs: ref([
        {
          headerName: this.t("common.rowNum"),
          field: "rowNumb",
          flex: 0.2,
          cellStyle: {
            textAlign: "center",
          },
        },
        {
          headerName: this.t(
            "capacityDeMng.volunteerIndividual.table.status"
          ) /* 상태 */,
          field: "status",
          cellStyle(data: any) {
            let color = "";
            if (data.data.statusCd) {
              if (data.data.statusCd == STATUS_SOCIAL_REVIEW) {
                color = "#0019FD";
              }
              if (data.data.statusCd == STATUS_SOCIAL_APPROVE) {
                color = "#00800D";
              }
              if (data.data.statusCd == STATUS_SOCIAL_REJECT) {
                color = "#FF0000";
              }
            }
            return {
              color: color,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            };
          },
          flex: 0.5,
        },
        {
          headerName: this.t(
            "capacityDeMng.volunteerIndividual.table.major"
          ) /* 단과대학 */,
          field: "major",
          cellStyle: {
            textAlign: "center",
          },
          flex: 1,
        },
        {
          headerName: this.t(
            "capacityDeMng.volunteerIndividual.table.department"
          ) /* 학과 */,
          field: "dept",
          cellStyle: {
            textAlign: "center",
          },
          flex: 1,
        },
        {
          headerName: this.t(
            "capacityDeMng.volunteerIndividual.table.code"
          ) /* 학번 */,
          field: "code",
          cellStyle: {
            textAlign: "center",
          },
          flex: 0.7,
        },
        {
          headerName: this.t(
            "capacityDeMng.volunteerIndividual.table.name"
          ) /* 이름 */,
          field: "name",
          cellRenderer: "LinkGridComponent",
          cellRendererParams: {
            onCustomEvent: this.handleDetailClick,
            type: TYPE_EVENT,
          },
          cellStyle: {
            color: "rgb(39, 4, 255)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        },
        {
          headerName: this.t(
            "capacityDeMng.volunteerIndividual.table.eduYear"
          ) /* 학년 */,
          field: "yearEdu",
          cellStyle: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
          flex: 0.5,
        },
        {
          headerName: this.t(
            "capacityDeMng.volunteerIndividual.table.deptVolunteer"
          ) /* 봉사 기관 */,
          field: "topic",
          cellStyle: {
            textAlign: "center",
          },
          flex: 1,
        },
        {
          headerName: this.t(
            "capacityDeMng.volunteerIndividual.table.volunteerDate"
          ) /* 봉사 시간 */,
          field: "timeSocial",
          cellStyle: {
            textAlign: "center",
          },
          flex: 1,
        },
        {
          headerName: this.t(
            "capacityDeMng.volunteerIndividual.table.document"
          ) /* 증빙자료 */,
          field: "id",
          cellRenderer: ButtonGridComponent,
          cellRendererParams: {
            onCustomEvent: this.dowLoadFile,
            value: this.t(
              "capacityDeMng.volunteerIndividual.table.download"
            ) /* "[다운로드]" */,
          },
          flex: 0.6,
          cellStyle: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        },
      ]),
      paginationPageSize: PAGINATION_PAGE_SIZE,
      paginationPageSizeSelector: PAGINATION_PAGE_SIZE_SELECTOR,
      key: 1,
      totalRecord: 0,
      listSelectBoxDept: [
        {
          cdId: "",
          cdNm: this.t("common.all"),
          upCdId: "dept",
        },
      ] as CodeMngModel[],
      listSelectBoxMajor: [
        {
          cdId: "",
          cdNm: this.t("common.all"),
          upCdId: "major",
        },
      ] as CodeMngModel[],
      listSelectYear: [] as CodeMngModel[],
      listSelectDivSocial: [] as CodeMngModel[],
      listSelectStatus: [] as CodeMngModel[],
      isOpen: false,
      id: "",
      status: "",
    };
  },
  beforeMount() {
    this.getListCode();
    this.getListUniversity();
  },
  watch: {
    "formSearch.major"(newValue, oldValue) {
      if (newValue) {
        this.formSearch.department = "";
        this.getListDepartment();
      } else {
        this.formSearch.department = "";
        this.listSelectBoxDept = [
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
    getListUniversity() {
      getDepartmentList({
        deptCd: [],
        deptDivCd: [DIV_CD_DEPT_MAJOR],
        upDeptCd: [],
        useYn: "",
      })
        .then((res) => {
          res.data.data.forEach((item: any) => {
            if (item.deptDivCd === DIV_CD_DEPT_MAJOR) {
              this.listSelectBoxMajor.push({
                cdId: item.deptCd,
                cdNm: item.deptNm,
                upCdId: "major",
              });
            }
          });
        })
        .catch(() => {
          throw new Error(MESSAGE_ERROR_API);
        });
    },
    getListDepartment() {
      this.store.setLoading(true);
      getDepartmentList({
        deptCd: [],
        deptDivCd: [],
        upDeptCd: [this.formSearch.major],
        useYn: "",
      })
        .then((res) => {
          res.data.data.forEach((item: any) => {
            if (item.deptDivCd === DIV_CD_DEPT_DEPART) {
              this.listSelectBoxDept.push({
                cdId: item.deptCd,
                cdNm: item.deptNm,
                upCdId: "dept",
              });
            }
          });
          this.store.setLoading(false);
        })
        .catch(() => {
          throw new Error(MESSAGE_ERROR_API);
        });
    },
    getListCode() {
      getListCodeMng({
        upCdIdList: [STATUS_SOCIAL_UP_CD_ID],
      })
        .then((res) => {
          this.listSelectStatus = res.data.data.filter(
            (el: CodeMngModel) => el.upCdId == STATUS_SOCIAL_UP_CD_ID
          );

          this.listSelectStatus.unshift({
            cdId: "",
            cdNm: this.t("common.all"),
            upCdId: "dept",
          });
        })
        .finally(() => {
          this.store.setLoading(false);
        });
    },
    handleDetailClick(data: any) {
      this.id = data.id;
      this.status = data.statusCd;
      this.openModal();
    },
    create() {
      this.$router.push({
        name: SCREEN.volunteerActivitesForm.name,
        params: { mode: MODE_CREATE, id: "" },
      });
    },
    async dowLoadFile(params: any) {
      let dataDowload = {
        fimReferKeyId: params.id,
        fimFileCategory: "SOCIAL_SERVE_PAR",
      };

      let fileName = {
        encodedFileName: "",
      };

      await this.fileMng.getListFileUpload(dataDowload);
      if (this.fileMng.status == SUCCSESS_STATUS) {
        if (this.fileMng.fileUploadedInfoList.length != 0) {
          let fileData = this.fileMng.fileUploadedInfoList[0];
          fileName.encodedFileName = fileData.fimFileName;
        }
      }
      if (fileName.encodedFileName) {
        await this.fileMng.getFileDowload(fileName);
        if (this.fileMng.status && this.fileMng.status == SUCCSESS_STATUS) {
          let data = this.fileMng.fileDowload;
          const url = window.URL.createObjectURL(
            new Blob([data], { type: this.fileMng.type })
          );
          const fileNameFromServer = "downloadedFile.zip";

          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", fileNameFromServer);
          document.body.appendChild(link);
          link.click();
          link.remove();
          window.URL.revokeObjectURL(url);
        }
      } else {
        this.$swal.fire({
          text: this.t("capacityDeMng.volunteerIndividual.table.downloadError"),
          confirmButtonColor: "#DD6B55",
          confirmButtonText: this.t("common.confirm"),
        });
      }
    },
    onClose() {
      this.isOpen = false;
      this.searchFormData();
    },
    openModal() {
      this.isOpen = true;
    },
    searchFormData() {
      this.formSearch.page = 1;
      this.key++;
    },
    cleardataSearch() {
      this.formSearch = {
        status: "",
        major: "",
        department: "",
        name: "",
        page: 1,
        size: PAGINATION_PAGE_SIZE,
        sort: "",
      };
    },
    fnPagination(pageNumber: any, pagesSize: any) {
      this.formSearch.page = pageNumber;
      this.formSearch.size = pagesSize;
      this.getAllData();
    },
    getAllData() {
      this.store.setLoading(true);
      getPageSocialIndividual(this.formSearch)
        .then((res) => {
          if (res.status === SUCCSESS_STATUS) {
            this.totalRecord = res.data.data.totalElements;

            this.rowData = res.data.data.content.map((el: any) => {
              el.timeSocial = `${
                el.startDate ? format(el.startDate, FORMAT_YYY_MM_DD) : " - "
              } ~ ${el.endDate ? format(el.endDate, FORMAT_YYY_MM_DD) : " - "}`;
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
  },
});
</script>
