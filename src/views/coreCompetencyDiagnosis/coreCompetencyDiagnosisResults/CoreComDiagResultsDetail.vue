<template>
  <div class="page_wrapper">
    <section id="content" class="content_wrapper grid_content" tabindex="0">
      <Breadcrumb :pageTitle="pageTitle" :breadcrumbItems="breadcrumbItems" />
      <div class="box dp_block">
        <div class="box_section">
          <p class="box_title_sm">
            {{ t("07.coreCompetencyDiagnosisResult.detail.subTitle") }}
          </p>
          <table class="tbl_row tbl_border tbl_result_detail_custom">
            <caption>
              {{
                t("07.coreCompetencyDiagnosisResult.detail.subTitle")
              }}
            </caption>
            <colgroup>
              <col style="width: 15%" />
              <col style="width: 85%" />
            </colgroup>
            <tbody>
              <tr>
                <th scope="row">
                  <p>
                    {{ t("07.coreCompetencyDiagnosisResult.detail.name") }}
                  </p>
                </th>
                <td colspan="3">
                  <span>{{ detailInfo.diagNm }}</span>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <p>
                    {{
                      t(
                        "07.coreCompetencyDiagnosisResult.detail.multiLanguageYn"
                      )
                    }}
                  </p>
                </th>
                <td colspan="3">
                  <span>{{ detailInfo.multiLanguageUseYn }}</span>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <p>
                    {{
                      t("07.coreCompetencyDiagnosisResult.detail.dateCoreComp")
                    }}
                  </p>
                </th>
                <td colspan="3">
                  <span>
                    {{ detailInfo.diagDurStr }} ~
                    {{ detailInfo.diagDurEnd }}</span
                  >
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <p>
                    {{
                      t("07.coreCompetencyDiagnosisResult.detail.yearSemester")
                    }}
                  </p>
                </th>
                <td colspan="3">
                  <span> {{ detailInfo.year }} - {{ detailInfo.termCd }}</span>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <p>
                    {{ t("07.coreCompetencyDiagnosisResult.detail.object1") }}
                  </p>
                </th>
                <td colspan="3">
                  <span>
                    {{
                      detailInfo.universityNm &&
                      detailInfo.universityNm.join(", ")
                    }}</span
                  >
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <p>
                    {{ t("07.coreCompetencyDiagnosisResult.detail.object2") }}
                  </p>
                </th>
                <td colspan="3">
                  <span
                    v-if="
                      detailInfo.departmentNm &&
                      detailInfo.departmentNm.length > 0
                    "
                  >
                    {{
                      detailInfo.departmentNm &&
                      detailInfo.departmentNm.join(", ")
                    }}</span
                  >
                  <span v-else>{{ t("common.all") }}</span>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <p>
                    {{ t("07.coreCompetencyDiagnosisResult.detail.object3") }}
                  </p>
                </th>
                <td colspan="3">
                  <span>
                    {{
                      detailInfo.genderNm && detailInfo.genderNm.join(", ")
                    }}</span
                  >
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <p>
                    {{ t("07.coreCompetencyDiagnosisResult.detail.object4") }}
                  </p>
                </th>
                <td colspan="3">
                  <span>
                    {{
                      detailInfo.gradeNm && detailInfo.gradeNm.join(", ")
                    }}</span
                  >
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <p>
                    {{ t("07.coreCompetencyDiagnosisResult.detail.object5") }}
                  </p>
                </th>
                <td colspan="3">
                  <span>
                    {{
                      detailInfo.personNm && detailInfo.personNm.join(", ")
                    }}</span
                  >
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <p>
                    {{ t("07.coreCompetencyDiagnosisResult.quantityReal") }}
                  </p>
                </th>
                <td colspan="3">
                  <span v-if="detailInfo.statusNm" class="text-green-custom"
                    >{{ detailInfo.quantityAnswer }}/{{
                      detailInfo.quantityTarget
                    }}
                    ({{ detailInfo.statusNm }})</span
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="box_section mt_8">
          <p class="box_title_sm">
            {{ t("07.coreCompetencyDiagnosisResult.detail.titleGraphic") }}
          </p>
          <div class="tab_list">
            <p
              v-for="coreAbility in listCoreAbility"
              :key="coreAbility.coreAbilitySeq"
              class="radio_tab"
            >
              <input
                type="radio"
                :id="'radio_tab_' + coreAbility.coreAbilitySeq"
                name="radio_tab"
                :checked="coreAbilitySeqSelected === coreAbility.coreAbilitySeq"
                @change="selectCoreAbility(coreAbility.coreAbilitySeq)"
              />
              <label :for="'radio_tab_' + coreAbility.coreAbilitySeq">{{
                coreAbility.coreAbilityNm
              }}</label>
            </p>
          </div>
        </div>
        <ResultTab
          :coreAbilitySeq="coreAbilitySeqSelected"
          :diagSeq="id"
        ></ResultTab>
        <div class="dp_flex btn_group btn_end" style="gap: 10px">
          <button
            type="button"
            class="btn_round btn_xs btn_secondary"
            @click="downloadExel()"
          >
            {{ t("07.coreCompetencyDiagnosisResult.detail.excelDowload") }}
          </button>
          <button
            type="button"
            class="btn_round btn_xs btn_white"
            @click="back()"
          >
            {{ t("common.list") }}
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import { defineComponent, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import { SCREEN } from "../../..//router/screen";
import ResultTab from "./ResultTab.vue";
import { MODE_DETAIL } from "../../../constants/screen.const";
import BaseDatePicker from "@/components/common/datepicker/BaseDatePicker.vue";
import { detailResultDiagCoreAbility } from "@/stores/coreCompetencyDiagnosis/coreCompetencyDiagnosisResults/coreCompetencyDiagnosisResults.service";
import {
  DiagListCoreAbilityModel,
  DiagResultCoreAbilityDetailModel,
} from "../../../stores/coreCompetencyDiagnosis/coreCompetencyDiagnosisResults/coreCompetencyDiagnosisResults.type";
import { commonStore } from "@/stores/common";
import { getListCoreAbility } from "@/stores/coreCompetencyDiagnosis/coreCompetencyDiagnosisResults/coreCompetencyDiagnosisResults.service";
import { downloadExelDiagCoreAbility } from "@/stores/coreCompetencyDiagnosis/coreCompetencyDiagnosisResults/coreCompetencyDiagnosisResults.service";

export default defineComponent({
  name: "CoreComDiagResultsDetail",
  components: { Breadcrumb, ResultTab, BaseDatePicker },
  setup() {
    const route = useRoute();
    const { t } = useI18n();
    const modeScreen = route.params.mode;
    const cmn = commonStore();
    return { t, modeScreen, cmn };
  },
  data() {
    return {
      pageTitle: this.t("07.coreCompetencyDiagnosisResult.detail.pageTitle"),
      breadcrumbItems: [],
      modeDetail: MODE_DETAIL,
      id: "",
      listCoreAbility: [] as Array<DiagListCoreAbilityModel>,
      detailInfo: {} as DiagResultCoreAbilityDetailModel,
      coreAbilitySeqSelected: "",
    };
  },
  beforeMount() {
    this.id = window.history.state.id;
    this.getDetailInfo();
    this.getListCoreAbility();
  },
  mounted() {},
  methods: {
    async getListCoreAbility() {
      this.cmn.setLoading(true);
      const res = await getListCoreAbility();
      if (res) {
        this.listCoreAbility = res.data.data;
        if (this.listCoreAbility.length > 0) {
          this.coreAbilitySeqSelected = this.listCoreAbility[0].coreAbilitySeq;
        }
      }
    },
    getDetailInfo() {
      this.cmn.setLoading(true);
      detailResultDiagCoreAbility({ diagSeq: this.id }).then((res: any) => {
        this.detailInfo = res.data.data;
      });
    },
    back() {
      this.$router.replace({
        name: SCREEN.coreCompetencyDiagnosisResultList.name,
      });
    },
    selectCoreAbility(coreAbilitySeq: string) {
      this.coreAbilitySeqSelected = coreAbilitySeq;
    },
    downloadExel() {
      this.$swal({
        text: this.t("common.message.confirmDowloadExcel"),
        type: "warning",
        showCancelButton: true,
        confirmButtonText: this.t("common.confirm"),
        cancelButtonText: this.t("common.cancel"),
      }).then((result: any) => {
        if (result.isConfirmed) {
          this.cmn.setLoading(true);
          downloadExelDiagCoreAbility({
            diagSeq: this.id,
          }).then((response: any) => {
            const blob = new Blob([response.data], {
              type: response.headers["content-type"],
            });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            const fileNameFromServer = "핵심역량진단.xlsx";
            link.setAttribute("download", fileNameFromServer);

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            window.URL.revokeObjectURL(url);
            this.cmn.setLoading(false);
          });
        }
      });
    },
  },
});
</script>
<style scoped>
.tbl_result_detail_custom th {
  text-align: left !important;
}

.text-green-custom {
  color: green;
  font-weight: 500;
}
</style>
