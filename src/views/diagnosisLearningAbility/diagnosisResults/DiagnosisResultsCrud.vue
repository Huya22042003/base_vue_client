<template>
  <div class="page_wrapper">
    <section id="content" class="content_wrapper grid_content" tabindex="0">
      <Breadcrumb :pageTitle="pageTitle" :breadcrumbItems="breadcrumbItems" />
      <div class="box dp_block">
        <div class="box_section">
          <p class="box_title_sm">
            {{
              t("07.diagnosisLearningAbility.diagnosisResults.detail.title1")
            }}
          </p>
          <table class="tbl_row tbl_border tbl_result_detail_custom">
            <caption>
              {{
                t("07.diagnosisLearningAbility.diagnosisResults.detail.title1")
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
                    {{
                      t(
                        "07.diagnosisLearningAbility.diagnosisResults.detail.table.name"
                      )
                    }}
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
                        "07.diagnosisLearningAbility.diagnosisResults.detail.table.languageYn"
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
                      t(
                        "07.diagnosisLearningAbility.diagnosisResults.detail.table.diagnosisTime"
                      )
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
                      t(
                        "07.diagnosisLearningAbility.diagnosisResults.detail.table.eduYear"
                      )
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
                    {{
                      t(
                        "07.diagnosisLearningAbility.diagnosisResults.detail.table.object1"
                      )
                    }}
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
                    {{
                      t(
                        "07.diagnosisLearningAbility.diagnosisResults.detail.table.object2"
                      )
                    }}
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
                    {{
                      t(
                        "07.diagnosisLearningAbility.diagnosisResults.detail.table.object3"
                      )
                    }}
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
                    {{
                      t(
                        "07.diagnosisLearningAbility.diagnosisResults.detail.table.object4"
                      )
                    }}
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
                    {{
                      t(
                        "07.diagnosisLearningAbility.diagnosisResults.detail.table.object5"
                      )
                    }}
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
                    {{
                      t(
                        "07.diagnosisLearningAbility.diagnosisResults.detail.table.target"
                      )
                    }}
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
              v-for="learnAbility in listLearnAbility"
              :key="learnAbility.learnAbilitySeq"
              class="radio_tab"
            >
              <input
                type="radio"
                :id="'radio_tab_' + learnAbility.learnAbilitySeq"
                name="radio_tab"
                :checked="
                  learnAbilitySeqSelected === learnAbility.learnAbilitySeq
                "
                @change="selectLearnAbility(learnAbility.learnAbilitySeq)"
              />
              <label :for="'radio_tab_' + learnAbility.learnAbilitySeq">{{
                learnAbility.learnAbilityNm
              }}</label>
            </p>
          </div>
        </div>
        <ResultTab
          :learnAbilitySeq="learnAbilitySeqSelected"
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
import { SCREEN } from "../../..//router/screen";
import ResultTab from "./ResultTab.vue";
import { MODE_DETAIL } from "../../../constants/screen.const";
import BaseDatePicker from "@/components/common/datepicker/BaseDatePicker.vue";
import { commonStore } from "@/stores/common";
import {
  DiagListLearnAbilityModel,
  DiagResultLearnAbilityDetailModel,
} from "../../../stores/diagnosislearningAbility/diagLearnAbilityResult/diagLearnAbilityResult.type";
import {
  detailResultDiagLearnAbility,
  downloadExelDiagLearnAbility,
  getListLearnAbility,
} from "../../../stores/diagnosislearningAbility/diagLearnAbilityResult/diagLearnAbilityResult.service";

export default defineComponent({
  components: { Breadcrumb, ResultTab, BaseDatePicker },
  setup() {
    const { t } = useI18n();
    const cmn = commonStore();
    return { t, cmn };
  },

  data() {
    return {
      pageTitle: this.t(
        "07.diagnosisLearningAbility.diagnosisResults.detail.pageTitle"
      ),
      breadcrumbItems: [],
      modeDetail: MODE_DETAIL,
      id: "",
      listLearnAbility: [] as Array<DiagListLearnAbilityModel>,
      detailInfo: {} as DiagResultLearnAbilityDetailModel,
      learnAbilitySeqSelected: "",
    };
  },
  beforeMount() {
    this.id = window.history.state.id;
    this.getDetailInfo();
    this.getListLearnAbility();
  },
  methods: {
    getListLearnAbility() {
      this.cmn.setLoading(true);
      getListLearnAbility().then((res) => {
        this.listLearnAbility = res.data.data;
        if (this.listLearnAbility.length > 0) {
          this.learnAbilitySeqSelected =
            this.listLearnAbility[0].learnAbilitySeq;
        }
      });
    },
    getDetailInfo() {
      this.cmn.setLoading(true);
      detailResultDiagLearnAbility({ diagSeq: this.id }).then((res: any) => {
        this.detailInfo = res.data.data;
      });
    },
    selectLearnAbility(learnAbilitySeq: string) {
      this.learnAbilitySeqSelected = learnAbilitySeq;
    },
    back() {
      this.$router.replace({
        name: SCREEN.diagnosisLearningAbilityResults.name,
      });
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
          downloadExelDiagLearnAbility({
            diagSeq: this.id,
          }).then((response: any) => {
            const blob = new Blob([response.data], {
              type: response.headers["content-type"],
            });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            const fileNameFromServer = "학습역량진단.xlsx";
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
