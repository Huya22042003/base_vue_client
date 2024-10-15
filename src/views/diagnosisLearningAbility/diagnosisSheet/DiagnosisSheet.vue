<template>
  <div class="page_wrapper">
    <section id="content" class="content_wrapper grid_content" tabindex="0">
      <Breadcrumb :pageTitle="pageTitle" :breadcrumbItems="breadcrumbItems" />
      <div class="box dp_block">
        <div class="box_section">
          <div class="search_box col_3">
            <ul>
              <li>
                <p class="ta_c">
                  {{
                    t(
                      "07.diagnosisLearningAbility.diagnosisTable.titleSearch.name"
                    )
                  }}
                </p>
                <InputBase
                  :id="'name'"
                  :name="'name'"
                  :mode="'show'"
                  v-model="searchModel.surveyNm"
                ></InputBase>
              </li>
              <li>
                <p class="ta_c">
                  {{
                    t(
                      "07.diagnosisLearningAbility.diagnosisTable.titleSearch.idTeacher"
                    )
                  }}
                </p>
                <InputBase
                  :id="'name'"
                  :name="'name'"
                  :mode="'show'"
                  v-model="searchModel.regId"
                ></InputBase>
              </li>
              <li>
                <p class="ta_c">
                  {{
                    t(
                      "07.diagnosisLearningAbility.diagnosisTable.titleSearch.useYn"
                    )
                  }}
                </p>
                <RadiobuttonBase
                  v-for="item in listUseYn"
                  :mode="'show'"
                  :value="item.cdId"
                  :id="'useYn' + item.cdId"
                  :name="'useYn' + item.cdId"
                  :key="'useYn' + item.cdId"
                  v-model="searchModel.useYn"
                  :checked="item.cdId == searchModel.useYn"
                  :label="item.cdNm"
                >
                </RadiobuttonBase>
              </li>
            </ul>
            <ul>
              <li>
                <p class="ta_c">
                  {{
                    t(
                      "07.diagnosisLearningAbility.diagnosisTable.titleSearch.languageYn"
                    )
                  }}
                </p>
                <RadiobuttonBase
                  v-for="item in listLanguageYn"
                  :mode="'show'"
                  :value="item.cdId"
                  :id="'multiLangUseYn' + item.cdId"
                  :name="'multiLangUseYn' + item.cdId"
                  :key="'multiLangUseYn' + item.cdId"
                  v-model="searchModel.multiLangUseYn"
                  :checked="item.cdId == searchModel.multiLangUseYn"
                  :label="item.cdNm"
                >
                </RadiobuttonBase>
              </li>
              <li>
                <p class="ta_c">
                  {{
                    t(
                      "07.diagnosisLearningAbility.diagnosisTable.titleSearch.status"
                    )
                  }}
                </p>

                <RadiobuttonBase
                  v-for="item in listStatus"
                  :mode="'show'"
                  :value="item.cdId"
                  :id="'stsCd' + item.cdId"
                  :name="'stsCd' + item.cdId"
                  :key="'stsCd' + item.cdId"
                  v-model="searchModel.stsCd"
                  :checked="item.cdId == searchModel.stsCd"
                  :label="item.cdNm"
                >
                </RadiobuttonBase>
              </li>
              <li>
                <p class="ta_c">
                  {{
                    t(
                      "07.diagnosisLearningAbility.diagnosisTable.titleSearch.date"
                    )
                  }}
                </p>

                <div class="search_flex" style="position: relative">
                  <BaseDatePicker
                    :placeholder="t('common.startDate')"
                    v-model="searchModel.startDate"
                  >
                  </BaseDatePicker>
                  <span>~</span>
                  <BaseDatePicker
                    :placeholder="t('common.endDate')"
                    v-model="searchModel.endDate"
                  >
                  </BaseDatePicker>
                </div>
              </li>
            </ul>
            <div class="dp_flex btn_group btn_end" style="gap: 10px">
              <button
                class="button btn_xl btn_blue btn_responsive"
                @click="search"
              >
                {{ t("common.search") }}
              </button>
              <button
                class="button btn_xl btn_lightgray btn_responsive"
                @click="reset"
              >
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
            :pagination="true"
            :paginationPageSize="paginationPageSize"
            :paginationPageSizeSelector="paginationPageSizeSelector"
            ref="grid"
            :paginationClientFlag="false"
            @customPagination="fnPagination"
            :totalRecord="totalRows"
          >
            <template #button>
              <div class="search_btnarea">
                <button
                  type="button"
                  class="button btn_xs btn_blue btn_responsive"
                  @click="register()"
                >
                  {{ t("07.diagnosisLearningAbility.button.register1") }}
                </button>
              </div>
            </template>
          </GridComponentV2>
        </div>
      </div>
    </section>
  </div>
</template>
<script lang="ts">
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import LinkGridComponent from "@/components/common/grid/LinkGridComponent.vue";
import {
  FORMAT_YYY_MM_DD,
  MODE_CREATE,
  MODE_DETAIL,
  PAGINATION_PAGE_SIZE,
  PAGINATION_PAGE_SIZE_SELECTOR,
  SUCCSESS_STATUS,
} from "../../../constants/screen.const";
import { defineComponent } from "vue";
import { SCREEN } from "../../../router/screen";
import { useI18n } from "vue-i18n";
import { commonStore } from "../../../stores/common";
import { format } from "date-fns";
import {
  LearnAbilitySearchModel,
  LearnAbilityListModel,
} from "../../../stores/diagnosislearningAbility/diagLearnAbilitySheet/diagLearnAbilitySheet.type";
import { getPage } from "../../../stores/diagnosislearningAbility/diagLearnAbilitySheet/diagLearnAbilitySheet.service";
import {
  MESSAGE_ERROR_API,
  UP_CD_ID_MULTI_LANG_USE_YN,
  UP_CD_ID_STS_CD,
  UP_CD_ID_USE_YN,
} from "../../../constants/common.const";
import { getListCodeMng } from "../../../stores/common/codeMng/codeMng.service";
export default defineComponent({
  components: { Breadcrumb, LinkGridComponent },
  setup() {
    const cmStore = commonStore();
    const { t } = useI18n();
    return { t, cmStore };
  },
  watch: {
    "searchModel.startDate"(newValue) {
      if (!this.searchModel.endDate) {
        this.searchModel.startDate = newValue;
      } else {
        const dStart = this.formatDate(newValue);
        const dEnd = this.formatDate(this.searchModel.endDate);
        if (dStart > dEnd) {
          this.$nextTick(() => {
            this.searchModel.startDate = this.searchModel.endDate;
            this.$swal({
              text: this.t("common.messageCheckDate"),
              type: "success",
              showCancelButton: true,
              showConfirmButton: false,
              cancelButtonText: this.t("common.cancel"),
            });
          });
        }
      }
    },
    "searchModel.endDate"(newValue) {
      if (!this.searchModel.startDate) {
        this.searchModel.endDate = newValue;
      } else {
        const dStart = this.formatDate(this.searchModel.startDate);
        const dEnd = this.formatDate(newValue);
        if (dStart > dEnd) {
          this.$nextTick(() => {
            this.searchModel.endDate = this.searchModel.startDate;
            this.$swal({
              text: this.t("common.messageCheckDate"),
              type: "success",
              showCancelButton: true,
              showConfirmButton: false,
              cancelButtonText: this.t("common.cancel"),
            });
          });
        }
      }
    },
  },
  data() {
    return {
      modalOpen: false,
      modeScreen: "",
      rowselected: [],
      listUseYn: [
        {
          cdId: "",
          cdNm: this.t("common.all"),
        },
      ],
      listLanguageYn: [
        {
          cdId: "",
          cdNm: this.t("common.all"),
        },
      ],
      listStatus: [
        {
          cdId: "",
          cdNm: this.t("common.all"),
        },
      ],
      pageTitle: this.t(
        "07.diagnosisLearningAbility.diagnosisTable.breadcrumb.pageTitle"
      ),
      breadcrumbItems: [],
      columnDefs: [
        {
          headerName: this.t(
            "07.diagnosisLearningAbility.diagnosisTable.table.rowNum"
          ),
          field: "rowNumb",
          cellStyle: { textAlign: "center" },
          flex: 0.5,
        },
        {
          headerName: this.t(
            "07.diagnosisLearningAbility.diagnosisTable.table.name"
          ),
          field: "surveyNm",
          cellStyle: {
            color: "#2704FF",
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
            cursor: "pointer",
          },
          cellRenderer: "LinkGridComponent",
          cellRendererParams: {
            onCustomEvent: this.handleCustomClick,
          },
          flex: 1.5,
        },
        {
          headerName: this.t(
            "07.diagnosisLearningAbility.diagnosisTable.table.idTeacher"
          ),
          field: "regId",
          cellStyle: { textAlign: "center" },
          flex: 0.75,
        },
        {
          headerName: this.t(
            "07.diagnosisLearningAbility.diagnosisTable.table.useYn"
          ),
          field: "useYn",
          cellStyle: { textAlign: "center" },
          flex: 0.7,
        },
        {
          headerName: this.t(
            "07.diagnosisLearningAbility.diagnosisTable.table.languageYn"
          ),
          field: "multiLangUseYn",
          cellStyle: { textAlign: "center" },
          flex: 0.75,
        },
        {
          headerName: this.t(
            "07.diagnosisLearningAbility.diagnosisTable.table.status"
          ),
          field: "stsCd",
          cellStyle: { textAlign: "center" },
          flex: 0.75,
        },
        {
          headerName: this.t(
            "07.diagnosisLearningAbility.diagnosisTable.table.date"
          ),
          field: "regDate",
          cellStyle: { textAlign: "center" },
          flex: 0.75,
        },
      ],
      paginationPageSize: PAGINATION_PAGE_SIZE,
      paginationPageSizeSelector: PAGINATION_PAGE_SIZE_SELECTOR,
      rowData: [],
      key: 1,
      totalRows: null,
      searchModel: {} as LearnAbilitySearchModel,
      LearnAbilityModel: {} as LearnAbilityListModel,
    };
  },
  beforeMount() {
    this.searchModel = {};
    this.searchModel.useYn = "";
    this.searchModel.multiLangUseYn = "";
    this.searchModel.stsCd = "";
    this.getListCode();
  },
  methods: {
    reset() {
      this.searchModel = {};
      this.searchModel.useYn = "";
      this.searchModel.multiLangUseYn = "";
      this.searchModel.stsCd = "";
    },
    search() {
      this.searchModel.page = 1;
      this.key++;
    },
    getListCode() {
      getListCodeMng({
        upCdIdList: [
          UP_CD_ID_USE_YN,
          UP_CD_ID_STS_CD,
          UP_CD_ID_MULTI_LANG_USE_YN,
        ],
      }).then((res: any) => {
        if (res.status === SUCCSESS_STATUS) {
          res.data.data.forEach((item) => {
            if (item.upCdId === UP_CD_ID_USE_YN) {
              this.listUseYn.push(item);
            }
            if (item.upCdId === UP_CD_ID_STS_CD) {
              this.listStatus.push(item);
            }
            if (item.upCdId === UP_CD_ID_MULTI_LANG_USE_YN) {
              this.listLanguageYn.push(item);
            }
          });
        }
      });
    },

    fnPagination(pageNumber: any, pageSize: any) {
      this.searchModel.size = pageSize;
      this.searchModel.page = pageNumber;
      this.searchModel.sort = "";
      this.getAll();
    },
    getAll() {
      this.cmStore.setLoading(true);
      getPage(this.searchModel)
        .then((res) => {
          if (res.status === SUCCSESS_STATUS) {
            this.totalRows = res.data.data.totalElements;
            this.rowData = res.data.data.content.map((item) => {
              item.regDate = format(item.regDate, FORMAT_YYY_MM_DD);
              item.rowNumber = this.totalRows - item.rowNumber + 1;
              return item;
            });
          }
        })
        .catch(() => {
          throw new Error(MESSAGE_ERROR_API);
        })
        .finally(() => {
          this.cmStore.setLoading(false);
        });
    },
    formatDate(date: any) {
      const originalDate = new Date(date);
      const year = originalDate.getFullYear();
      const month = String(originalDate.getMonth() + 1).padStart(2, "0");
      const day = String(originalDate.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
    register() {
      this.$router.push({
        name: SCREEN.diagnosisLearningAbilitySheetCrud.name,
        params: { mode: MODE_CREATE },
      });
    },
    handleCustomClick(data: any) {
      this.$router.push({
        name: SCREEN.diagnosisLearningAbilitySheetCrud.name,
        params: { mode: MODE_DETAIL },
        state: { id: data.surveySeq },
      });
    },
  },
});
</script>
