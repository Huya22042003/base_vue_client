<template>
  <div class="page_wrapper">
    <section id="content" class="content_wrapper grid_content" tabindex="0">
      <Breadcrumb :pageTitle="pageTitle" :breadcrumbItems="''"></Breadcrumb>
      <div class="box dp_block">
        <div class="box_section">
          <div class="search_box col_3">
            <ul>
              <li>
                <p>{{ t("capacityDeMng.tutoring.titleSearch.campus") }}</p>
                <div class="select_checkbox">
                  <RadiobuttonBase
                    v-for="(item, index) in listCampus"
                    :mode="'show'"
                    :value="item.cdId"
                    v-model="dataSearch.campusCd"
                    :id="`${item.cdId}_${index}`"
                    :name="item.cdId"
                    :key="`${item.cdId}_${index}`"
                    :checked="item.cdId == dataSearch.campusCd"
                    :label="item.cdNm"
                  >
                  </RadiobuttonBase>
                </div>
              </li>
              <li>
                <p>{{ t("capacityDeMng.tutoring.titleSearch.status") }}</p>
                <div class="select_checkbox">
                  <RadiobuttonBase
                    v-for="(item, index) in listStatus"
                    :mode="'show'"
                    :value="item.cdId"
                    v-model="dataSearch.statusCd"
                    :id="`${item.cdId}_${index}`"
                    :name="item.cdId"
                    :key="`${item.cdId}_${index}`"
                    :checked="item.cdId == dataSearch.statusCd"
                    :label="item.cdNm"
                  >
                  </RadiobuttonBase>
                </div>
              </li>
              <li>
                <p>{{ t("capacityDeMng.tutoring.titleSearch.team") }}</p>
                <InputBase
                  v-model="dataSearch.teamNm"
                  id="team"
                  mode="show"
                ></InputBase>
              </li>
              <li>
                <p>{{ t("capacityDeMng.tutoring.titleSearch.nameOrId") }}</p>
                <InputBase
                  v-model="dataSearch.mentorMenteeNm"
                  id="nameOrId"
                ></InputBase>
              </li>
            </ul>
            <div class="dp_flex btn_group btn_end" style="gap: 10px">
              <button
                class="button btn_xl btn_blue btn_responsive"
                @click="searchFormData()"
              >
                <!-- 조회 -->
                {{ t("departmentMng.typeTalentNurturingMng.search.btnSeach") }}
              </button>
              <button
                class="button btn_xl btn_lightgray btn_responsive"
                @click="cleardataSearch()"
              >
                <!-- 초기화 -->
                {{ t("departmentMng.typeTalentNurturingMng.search.btnClear") }}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="box dp_block">
        <div class="box_section">
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
          </GridComponentV2>
        </div>
      </div>
    </section>
  </div>
</template>
<script lang="ts">
import {
  TYPE_EVENT,
  MODE_DETAIL,
  PAGINATION_PAGE_SIZE,
  SUCCSESS_STATUS,
  PAGINATION_PAGE_SIZE_SELECTOR,
} from "@/constants/screen.const";
import { defineComponent, ref } from "vue";
import LinkGridComponent from "@/components/common/grid/LinkGridComponent.vue";
import TimeLineGridComponent from "@/components/common/grid/TimeLineGridComponent.vue";
import { useI18n } from "vue-i18n";
import { commonStore } from "@/stores/common";
import { SCREEN } from "@/router/screen";
import GridComponentV2 from "@/components/common/grid/GridComponentV2.vue";
import type { CodeMngModel } from "@/stores/common/codeMng/codeMng.type";
import { getListCodeMng } from "@/stores/common/codeMng/codeMng.service";
import type {
  EducationSDLFilterDTO,
  EducationSDLResDTO,
} from "@/stores/capacityDeMng/mentoring/educationSDL/eudcationSDL.type";
import { getPageEduSDL } from "@/stores/capacityDeMng/mentoring/educationSDL/educationSDL.service";
import {
  CAMPUS_UP_CD_ID,
  MENTORING_STATUS_BEFOR_APPROVE,
  MENTORING_STATUS_UP_CD_ID,
  MESSAGE_ERROR_API,
  MENTORING_STATUS_APPROVE,
  MENTORING_STATUS_STOP,
  MENTORING_STATUS_REJECT,
} from "@/constants/common.const";
export default defineComponent({
  components: {
    LinkGridComponent,
    TimeLineGridComponent,
    GridComponentV2,
  },
  setup: () => {
    const store = commonStore();
    const { t } = useI18n();
    return { t, store };
  },
  data() {
    return {
      pageTitle: this.t("capacityDeMng.educationSDL.title"),
      paginationPageSize: PAGINATION_PAGE_SIZE,
      paginationPageSizeSelector: PAGINATION_PAGE_SIZE_SELECTOR,
      dataSearch: {
        campusCd: "",
        statusCd: MENTORING_STATUS_BEFOR_APPROVE,
        teamNm: "",
        mentorMenteeNm: "",
        page: 1,
        size: PAGINATION_PAGE_SIZE,
        sort: "",
      } as EducationSDLFilterDTO,
      listCampus: [] as CodeMngModel[],
      listStatus: [] as CodeMngModel[],
      columnDefs: ref([
        {
          headerName: this.t("capacityDeMng.tutoring.table.rowNum"),
          field: "rowNumb",
          flex: 1,
        },
        {
          headerName: this.t("capacityDeMng.tutoring.table.campus"),
          field: "campus",
          flex: 9,
        },
        {
          headerName: this.t("capacityDeMng.tutoring.table.team"),
          field: "teamNm",
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
          flex: 9,
        },
        {
          headerName: this.t("capacityDeMng.tutoring.table.nameOrIdMtor"),
          field: "mentorNm",
          flex: 9,
        },
        {
          headerName: this.t("capacityDeMng.tutoring.table.nameOrIdMti"),
          field: "menteeSize",
          flex: 9,
        },
        {
          headerName: this.t("capacityDeMng.tutoring.table.status"),
          field: "status",
          flex: 9,
        },
        {
          headerName: this.t("capacityDeMng.tutoring.table.report"),
          field: "listPlan",
          cellRenderer: "TimeLineGridComponent",
          cellRendererParams: (data: EducationSDLResDTO) => {
            return {
              listParams: data.listPlan,
              onCustomEvent: this.goToPlan,
            };
          },
          flex: 9,
        },
      ]),
      data: [],
      key: 1,
      totalRecord: 0,
    };
  },
  beforeMount() {
    this.getData();
  },

  methods: {
    getData() {
      this.store.setLoading(true);
      getListCodeMng({
        upCdIdList: [CAMPUS_UP_CD_ID, MENTORING_STATUS_UP_CD_ID],
      }).then((res) => {
        this.listCampus = res.data.data.filter(
          (el: CodeMngModel) => el.upCdId == CAMPUS_UP_CD_ID
        );
        this.listStatus = res.data.data.filter(
          (el: CodeMngModel) =>
            el.upCdId == MENTORING_STATUS_UP_CD_ID &&
            (el.cdId == MENTORING_STATUS_BEFOR_APPROVE ||
              el.cdId == MENTORING_STATUS_APPROVE ||
              el.cdId == MENTORING_STATUS_STOP ||
              el.cdId == MENTORING_STATUS_REJECT)
        );
        this.dataSearch.statusCd = this.listStatus[0].cdId + "";

        this.listCampus.unshift({
          cdId: "",
          cdNm: this.t("common.all"),
          upCdId: CAMPUS_UP_CD_ID,
        });
      });

      this.store.setLoading(false);
    },
    handleDetailClick(data: any) {
      this.$router.push({
        name: SCREEN.educationSDLDetail.name,
        params: { mode: MODE_DETAIL },
        state: { id: data.id, plan: null },
      });
    },
    getAllData() {
      this.store.setLoading(true);
      getPageEduSDL(this.dataSearch)
        .then((res) => {
          if (res.status === SUCCSESS_STATUS) {
            this.totalRecord = res.data.data.totalElements;

            this.data = res.data.data.content.map((el: any) => {
              el.listPlan = this.convertPlan(el.listPlan);

              el.mentorNm = `${this.convertUser(
                el.mentorNm
              )}(${this.convertUser(el.stdMentor)})`;
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
    convertPlan(input: String) {
      const pairs = input.split(" . ");
      const result = pairs.map((pair) => {
        const [id, value] = pair.split(" - ");
        return {
          check: value === "1",
          value: parseInt(id),
        };
      });
      return result;
    },
    convertUser(input: String) {
      const index = input.indexOf(".");
      if (index < 0) {
        return input;
      }
      return input.split(".")[0];
    },
    searchFormData() {
      this.dataSearch.page = 1;
      this.key++;
      this.fnPagination(this.dataSearch.page, this.dataSearch.size);
    },
    cleardataSearch() {
      this.dataSearch = {
        campusCd: "",
        statusCd: this.listStatus[0].cdId + "",
        teamNm: "",
        mentorMenteeNm: "",
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
    goToPlan(data:any) {
      this.$router.push({
        name: SCREEN.educationSDLDetail.name,
        params: { mode: MODE_DETAIL },
        state: { id: data.id, plan: data.value },
      });
    }
  },
});
</script>
