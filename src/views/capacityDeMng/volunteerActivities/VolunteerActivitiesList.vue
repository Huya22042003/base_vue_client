<template>
  <section id="content" class="content_wrapper grid_content" tabindex="0">
    <Breadcrumb :pageTitle="pageTitle" :breadcrumbItems="''"></Breadcrumb>
    <div class="box dp_block">
      <div class="box_section">
        <div class="search_box col_3 mb-0">
          <ul>
            <li>
              <p>
                {{ t("capacityDeMng.volunteerActivities.formSearch.status") }}
                <!-- 상태 -->
              </p>
              <SelectBoxBase
                id="selectbox_validate"
                name="'selectbox'"
                v-model="dataSearch.status"
                :data="listStatus"
              >
              </SelectBoxBase>
            </li>
            <li>
              <p>
                {{ t("capacityDeMng.volunteerActivities.formSearch.topic") }}
                <!-- 봉사 제목 -->
              </p>
              <InputTextBase v-model="dataSearch.topic"></InputTextBase>
            </li>
            <li>
              <p>
                {{
                  t(
                    "capacityDeMng.volunteerActivities.formSearch.typeVolunteer"
                  )
                }}
                <!-- 봉사 유형 -->
              </p>
              <div class="select_checkbox">
                <RadiobuttonBase
                  v-for="(item, index) in listType"
                  :mode="'show'"
                  :value="item.cdId"
                  v-model="dataSearch.typeSocial"
                  :id="`${item.cdId}_${index}`"
                  :name="`${item.cdId}_${index}`"
                  :key="`${item.cdId}_${index}`"
                  :checked="item.cdId == dataSearch.typeSocial"
                  :label="item.cdNm"
                >
                </RadiobuttonBase>
              </div>
            </li>
            <li>
              <p>
                {{
                  t(
                    "capacityDeMng.volunteerActivities.formSearch.fieldVolunteer"
                  )
                }}
              </p>
              <!-- 봉사 분야 -->
              <SelectBoxBase
                id="selectbox_validate"
                name="'selectbox'"
                v-model="dataSearch.fieldSocial"
                :data="listField"
              >
              </SelectBoxBase>
            </li>
            <li>
              <p>
                {{
                  t(
                    "capacityDeMng.volunteerActivities.formSearch.objectVolunteer"
                  )
                }}
              </p>
              <!-- 봉사 대상 -->
              <SelectBoxBase
                id="selectbox_validate"
                name="'selectbox'"
                v-model="dataSearch.objectSocial"
                :data="listObject"
              >
              </SelectBoxBase>
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
          <template #button>
            <div>
              <button
                class="button btn_xs btn_blue border_blue bo_rd4"
                @click="create"
              >
                등록
              </button>
            </div>
          </template>
        </GridComponentV2>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import {
  TYPE_EVENT,
  MODE_CREATE,
  PAGINATION_PAGE_SIZE,
  PAGINATION_PAGE_SIZE_SELECTOR,
  SUCCSESS_STATUS,
  FORMAT_YYY_MM_DD,
  MODE_SHOW,
} from "@/constants/screen.const";
import { defineComponent, ref } from "vue";
import LinkGridComponent from "@/components/common/grid/LinkGridComponent.vue";
import UserRegistGridComponet from "./selectUserRegist/UserRegistGridComponet.vue";
import { useI18n } from "vue-i18n";
import { commonStore } from "@/stores/common";
import { SCREEN } from "@/router/screen";
import GridComponentV2 from "@/components/common/grid/GridComponentV2.vue";
import type {
  SocialServeFilterDTO,
  SocialServeResDTO,
} from "@/stores/capacityDeMng/socialServe/volunteerActivities/volunteerActivities.type";
import { getPageVolunteer } from "@/stores/capacityDeMng/socialServe/volunteerActivities/volunteerActivities.service";
import type { CodeMngModel } from "@/stores/common/codeMng/codeMng.type";
import { getListCodeMng } from "@/stores/common/codeMng/codeMng.service";
import {
  SOCIAL_TYPE_UP_CD_ID,
  SOCIAL_STATUS_UP_CD_ID,
  SOCIAL_FIELD_UP_CD_ID,
  SOCIAL_OBJECT_UP_CD_ID,
  MESSAGE_ERROR_API,
  SOCIAL_USER_APPROVE_SUCCESS,
} from "@/constants/common.const";
import { format } from "date-fns";

export default defineComponent({
  components: {
    LinkGridComponent,
    UserRegistGridComponet,
  },
  setup: () => {
    const store = commonStore();
    const { t } = useI18n();
    return { t, store };
  },
  data() {
    return {
      pageTitle: this.t(
        "capacityDeMng.volunteerActivities.title"
      ) /* 사회봉사 관리 */,
      listStatus: [] as CodeMngModel[],
      listType: [] as CodeMngModel[],
      listField: [] as CodeMngModel[],
      listObject: [] as CodeMngModel[],
      paginationPageSize: PAGINATION_PAGE_SIZE,
      paginationPageSizeSelector: PAGINATION_PAGE_SIZE_SELECTOR,
      dataSearch: {
        status: "",
        typeSocial: "",
        fieldSocial: "",
        objectSocial: "",
        page: 1,
        size: PAGINATION_PAGE_SIZE,
        sort: "",
      } as SocialServeFilterDTO,
      columnDefs: ref([
        {
          headerName: this.t("common.rowNum"),
          field: "rowNumb",
          flex: 0.2,
        },
        {
          headerName: this.t(
            "capacityDeMng.volunteerActivities.table.status"
          ) /* 상태 */,
          field: "status",
          flex: 0.4,
        },
        {
          headerName: this.t(
            "capacityDeMng.volunteerActivities.table.topic"
          ) /* 봉사 제목 */,
          field: "topic",
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
            "capacityDeMng.volunteerActivities.table.volunteerTime"
          ) /* 봉사기간 */,
          field: "timeSocial",
        },
        {
          headerName: this.t(
            "capacityDeMng.volunteerActivities.table.recruitmentTime"
          ) /* 모집기간 */,
          field: "timeRecruitment",
        },
        {
          headerName: this.t(
            "capacityDeMng.volunteerActivities.table.quantityRecruitment"
          ) /* 모집인원 */,
          field: "recruitmentNumb",
          flex: 0.5,
        },
        {
          headerName: this.t(
            "capacityDeMng.volunteerActivities.table.quantityRegister"
          ) /* 신청인원 */,
          field: "regisNumb",
          cellRenderer: UserRegistGridComponet,
          cellRendererParams: {
            onCustomEvent: this.goToUserRegis,
          },
          cellStyle: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
          flex: 1.3
        },
        {
          headerName: this.t(
            "capacityDeMng.volunteerActivities.table.typeVolunteer"
          ) /* 봉사유형 */,
          field: "typeSocial",
        },
        {
          headerName: this.t(
            "capacityDeMng.volunteerActivities.table.fieldVolunteer"
          ) /* 봉사분야 */,
          field: "fieldSocial",
        },
        {
          headerName: this.t(
            "capacityDeMng.volunteerActivities.table.objectVolunteer"
          ) /* 봉사대상 */,
          field: "objectSocial",
        },
      ]),
      data: [] as SocialServeResDTO[],
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
        upCdIdList: [
          SOCIAL_TYPE_UP_CD_ID,
          SOCIAL_STATUS_UP_CD_ID,
          SOCIAL_FIELD_UP_CD_ID,
          SOCIAL_OBJECT_UP_CD_ID,
        ],
      }).then((res) => {
        this.listType = res.data.data.filter(
          (el: CodeMngModel) => el.upCdId == SOCIAL_TYPE_UP_CD_ID
        );
        this.listStatus = res.data.data.filter(
          (el: CodeMngModel) =>
            el.upCdId == SOCIAL_STATUS_UP_CD_ID &&
            el.cdId != SOCIAL_USER_APPROVE_SUCCESS
        );
        this.listField = res.data.data
          .filter((el: CodeMngModel) => el.upCdId == SOCIAL_FIELD_UP_CD_ID)
          .map((el: CodeMngModel) => {
            return {
              cdId: el.cdNm,
              cdNm: el.cdNm,
              upCdId: el.upCdId,
            };
          });
        this.listObject = res.data.data
          .filter((el: CodeMngModel) => el.upCdId == SOCIAL_OBJECT_UP_CD_ID)
          .map((el: CodeMngModel) => {
            return {
              cdId: el.cdNm,
              cdNm: el.cdNm,
              upCdId: el.upCdId,
            };
          });

        this.listType.unshift({
          cdId: "",
          cdNm: this.t("common.all"),
          upCdId: SOCIAL_TYPE_UP_CD_ID,
        });

        this.listStatus.unshift({
          cdId: "",
          cdNm: this.t("common.all"),
          upCdId: SOCIAL_STATUS_UP_CD_ID,
        });

        this.listField.unshift({
          cdId: "",
          cdNm: this.t("common.all"),
          upCdId: SOCIAL_FIELD_UP_CD_ID,
        });

        this.listObject.unshift({
          cdId: "",
          cdNm: this.t("common.all"),
          upCdId: SOCIAL_OBJECT_UP_CD_ID,
        });
      });

      this.store.setLoading(false);
    },
    handleDetailClick(data: any) {
      this.$router.push({
        name: SCREEN.volunteerActivitesForm.name,
        params: { mode: MODE_SHOW },
        state: { id: data.id },
      });
    },
    goToUserRegis(data: any) {
      this.$router.push({
        name: SCREEN.volunteerActivitesUserRegist.name,
        state: { id: data.id },
      });
    },
    searchFormData() {
      this.dataSearch.page = 1;
      this.key++;
    },
    cleardataSearch() {
      this.dataSearch = {
        typeSocial: "",
        fieldSocial: "",
        objectSocial: "",
        page: 1,
        size: PAGINATION_PAGE_SIZE,
        sort: "",
      } as SocialServeFilterDTO;
    },
    create() {
      this.$router.push({
        name: SCREEN.volunteerActivitesForm.name,
        params: { mode: MODE_CREATE },
      });
    },
    fnPagination(pageNumber: any, pagesSize: any) {
      this.dataSearch.page = pageNumber;
      this.dataSearch.size = pagesSize;
      this.getAllData();
    },
    getAllData() {
      this.store.setLoading(true);
      getPageVolunteer(this.dataSearch)
        .then((res) => {
          if (res.status === SUCCSESS_STATUS) {
            this.totalRecord = res.data.data.totalElements;

            this.data = res.data.data.content.map((el: SocialServeResDTO) => {
              el.regisNumb = el.regisNumb ? el.regisNumb : "0";
              el.timeSocial = `${format(
                el.timeSocialStart,
                FORMAT_YYY_MM_DD
              )} ~ ${format(el.timeSocialEnd, FORMAT_YYY_MM_DD)}`;
              el.timeRecruitment = `${format(
                el.timeRecruitmentStart,
                FORMAT_YYY_MM_DD
              )} ~ ${format(el.timeRecruitmentEnd, FORMAT_YYY_MM_DD)}`;

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
