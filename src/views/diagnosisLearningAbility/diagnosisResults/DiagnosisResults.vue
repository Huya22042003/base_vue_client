<template>
  <div class="page_wrapper">
    <section id="content" class="content_wrapper grid_content" tabindex="0">
      <Breadcrumb :pageTitle="pageTitle" :breadcrumbItems="breadcrumbItems" />
      <div class="box dp_block">
        <div class="box_section">
          <div class="search_box col_3">
            <ul>
              <li>
                <p>
                  {{
                    t(
                      "07.diagnosisLearningAbility.diagnosisResults.titleSearch.name"
                    )
                  }}
                </p>
                <InputBase
                  :id="'name'"
                  :name="'name'"
                  :mode="'show'"
                  v-model="resultDiagLearnAbilitySearchModel.diagNm"
                ></InputBase>
              </li>
              <li class="li__search__custom">
                <p class="ta_c">
                  {{
                    t(
                      "07.diagnosisLearningAbility.diagnosisResults.titleSearch.languageYn"
                    )
                  }}
                </p>
                <RadiobuttonBase
                  v-for="item in listLanguageYn"
                  :mode="'show'"
                  :value="item.cdId"
                  :id="'multiLanguageYn' + item.cdId"
                  :name="'multiLanguageYn' + item.cdId"
                  :key="'multiLanguageYn' + item.cdId"
                  v-model="resultDiagLearnAbilitySearchModel.multiLanguage"
                  :checked="
                    item.cdId == resultDiagLearnAbilitySearchModel.multiLanguage
                  "
                  :label="item.cdNm"
                >
                </RadiobuttonBase>
              </li>
              <li>
                <p>
                  {{
                    t(
                      "07.diagnosisLearningAbility.diagnosisResults.titleSearch.status"
                    )
                  }}
                </p>
                <SelectBoxBase
                  :id="'status'"
                  :name="'status'"
                  :data="listStatus"
                  v-model="resultDiagLearnAbilitySearchModel.status"
                ></SelectBoxBase>
              </li>
            </ul>
            <ul>
              <li>
                <p>
                  {{
                    t(
                      "07.diagnosisLearningAbility.diagnosisResults.titleSearch.date"
                    )
                  }}
                </p>
                <div class="search_flex" style="position: relative">
                  <BaseDatePicker
                    v-model="resultDiagLearnAbilitySearchModel.startDate"
                    :placeholder="t('common.startDate')"
                  >
                  </BaseDatePicker>
                  <span>~</span>
                  <BaseDatePicker
                    v-model="resultDiagLearnAbilitySearchModel.endDate"
                    :placeholder="t('common.endDate')"
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
            ref="gridKey"
            :paginationClientFlag="false"
            @customPagination="fnPagination"
            :totalRecord="totalRows"
          >
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
  MODE_DETAIL,
  PAGINATION_PAGE_SIZE,
  PAGINATION_PAGE_SIZE_SELECTOR,
} from "../../../constants/screen.const";
import { defineComponent } from "vue";
import BaseDatePicker from "@/components/common/datepicker/BaseDatePicker.vue";
import { SCREEN } from "../../../router/screen";
import {
  ResultDiagLearnAbilityListModel,
  ResultDiagLearnAbilitySearchModel,
} from "../../../stores/diagnosislearningAbility/diagLearnAbilityResult/diagLearnAbilityResult.type";
import { getCodeMngByUpCdId } from "../../../stores/common/codeMng/codeMng.service";
import {
  UP_CD_ID_MULTI_LANG_USE_YN,
  UP_CD_ID_STATUS_DIAG,
} from "../../../constants/common.const";
import { getPageResultDiagLearnAbility } from "@/stores/diagnosislearningAbility/diagLearnAbilityResult/diagLearnAbilityResult.service";
import { commonStore } from "@/stores/common";
import { format } from "date-fns";

export default defineComponent({
  components: { Breadcrumb, LinkGridComponent, BaseDatePicker },
  setup() {
    const { t } = useI18n();
    const cmn = commonStore();
    return { t, cmn };
  },
  data() {
    return {
      modalOpen: false,
      modeScreen: "",
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
        "07.diagnosisLearningAbility.diagnosisResults.breadcrumb.pageTitle"
      ),
      breadcrumbItems: [],
      columnDefs: [
        {
          headerName: this.t("common.rowNum"),
          field: "rowNumb",
          cellStyle: { textAlign: "center" },
          flex: 0.5,
        },
        {
          headerName: this.t(
            "07.diagnosisLearningAbility.diagnosisResults.table.semester"
          ),
          field: "year",
          cellStyle: { textAlign: "center" },
          flex: 1,
          cellRenderer: (params: any) => {
            return `<span>${params.data.year} - ${params.data.termCd}</span>`;
          },
        },
        {
          headerName: this.t("07.coreCompetencyDiagnosisResult.name"),
          field: "diagNm",
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
          flex: 2,
        },
        {
          headerName: this.t("07.coreCompetencyDiagnosisResult.dateCoreComp"),
          field: "diagDurStr",
          cellStyle: { textAlign: "center" },
          flex: 1.5,
          cellRenderer: (params: any) => {
            return `<span>${params.data.diagDurStr} - ${params.data.diagDurEnd}</span>`;
          },
        },
        {
          headerName: this.t("07.coreCompetencyDiagnosisResult.status"),
          field: "statusNm",
          cellStyle: { textAlign: "center" },
          flex: 0.65,
        },
        {
          headerName: this.t(
            "07.coreCompetencyDiagnosisResult.multiLanguageYn"
          ),
          field: "multiLangUseYn",
          cellStyle: { textAlign: "center" },
          flex: 0.65,
        },
        {
          headerName: this.t("07.coreCompetencyDiagnosisResult.quantityReal"),
          field: "quantityObject",
          cellStyle: { textAlign: "center" },
          flex: 0.75,
          cellRenderer: (params: any) => {
            return `<span>${params.data.quantityAnswer}/${params.data.quantityTarget}</span>`;
          },
        },
        {
          headerName: this.t("07.coreCompetencyDiagnosisResult.createdDate"),
          field: "regDate",
          cellStyle: { textAlign: "center" },
          flex: 0.75,
        },
      ],
      paginationPageSize: PAGINATION_PAGE_SIZE,
      paginationPageSizeSelector: PAGINATION_PAGE_SIZE_SELECTOR,
      rowData: [] as Array<ResultDiagLearnAbilityListModel>,
      resultDiagLearnAbilitySearchModel:
        {} as ResultDiagLearnAbilitySearchModel,
      key: 1,
      totalRows: 0,
    };
  },
  beforeMount() {
    this.getCodeMultiLanguage();
    this.getCodeStatusDiag();
    this.reset();
  },
  methods: {
    reset() {
      this.resultDiagLearnAbilitySearchModel = {};
      this.resultDiagLearnAbilitySearchModel.multiLanguage = "";
      this.resultDiagLearnAbilitySearchModel.status = "";
      this.resultDiagLearnAbilitySearchModel.diagNm = "";
    },
    search() {
      this.resultDiagLearnAbilitySearchModel.page = 1;
      this.key++;
    },
    getDataPage() {
      this.cmn.setLoading(true);
      getPageResultDiagLearnAbility(this.resultDiagLearnAbilitySearchModel)
        .then(
          (res) => {
            this.rowData = res.data.data.content;
            this.totalRows = res.data.data.totalElements;
            this.rowData.forEach((item) => {
              item.diagDurStr = format(
                new Date(item.diagDurStr),
                FORMAT_YYY_MM_DD
              );
              item.diagDurEnd = format(
                new Date(item.diagDurEnd),
                FORMAT_YYY_MM_DD
              );
              item.regDate = format(new Date(item.regDate), FORMAT_YYY_MM_DD);
            });
          },
          (err) => {}
        )
        .finally(() => {
          this.cmn.setLoading(false);
        });
    },
    fnPagination(pageNumber: any, pageSize: any) {
      this.resultDiagLearnAbilitySearchModel.size = pageSize;
      this.resultDiagLearnAbilitySearchModel.page = pageNumber;
      this.resultDiagLearnAbilitySearchModel.sort = "";
      this.getDataPage();
    },
    getCodeMultiLanguage() {
      getCodeMngByUpCdId({ upCdId: UP_CD_ID_MULTI_LANG_USE_YN }).then(
        (response) => {
          response.data.data.forEach((item) => {
            this.listLanguageYn.push(item);
          });
        }
      );
    },
    getCodeStatusDiag() {
      getCodeMngByUpCdId({ upCdId: UP_CD_ID_STATUS_DIAG }).then((response) => {
        response.data.data.forEach((item) => {
          this.listStatus.push(item);
        });
      });
    },
    handleCustomClick(data: any) {
      this.$router.push({
        name: SCREEN.diagnosisLearningAbilityResultsCrud.name,
        params: { mode: MODE_DETAIL },
        state: { id: data.diagSeq },
      });
    },
  },
});
</script>
<style scoped>
.li__search__custom {
  display: flex;
  justify-content: center;
}
</style>
