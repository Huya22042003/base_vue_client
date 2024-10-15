<template>
  <div class="page_wrapper">
    <section id="content" class="content_wrapper grid_content" tabindex="0">
      <Breadcrumb :pageTitle="pageTitle" :breadcrumbItems="breadcrumbItems" />
      <div class="box dp_block">
        <div class="box_section">
          <p class="box_title_sm">
            {{ t("07.coreMajorCompDiagnosisResult.result.title") }}
          </p>
          <table class="tbl_row tbl_border tbl_result_detail_custom">
            <caption>
              {{
                t("07.coreMajorCompDiagnosisResult.result.title")
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
                    {{ t("07.coreMajorCompDiagnosisResult.result.form.name") }}
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
                        "07.coreMajorCompDiagnosisResult.result.form.languageYn"
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
                    {{ t("07.coreMajorCompDiagnosisResult.result.form.time") }}
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
                    {{ t("07.coreMajorCompDiagnosisResult.result.form.year") }}
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
                      t("07.coreMajorCompDiagnosisResult.result.form.object1")
                    }}
                  </p>
                </th>
                <td colspan="3">
                  <span> {{ detailInfo.deptNm }}</span>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <p>
                    {{
                      t("07.coreMajorCompDiagnosisResult.result.form.object2")
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
                      t("07.coreMajorCompDiagnosisResult.result.form.object3")
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
                      t("07.coreMajorCompDiagnosisResult.result.form.object4")
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
                      t("07.coreMajorCompDiagnosisResult.result.form.status")
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
              v-for="majorCapa in listMajorCapa"
              :key="majorCapa.majorCapaSeq"
              class="radio_tab"
            >
              <input
                type="radio"
                :id="'radio_tab_' + majorCapa.majorCapaSeq"
                name="radio_tab"
                :checked="majorCapaSeqSelected === majorCapa.majorCapaSeq"
                @change="selectMajorCapa(majorCapa.majorCapaSeq)"
              />
              <label :for="'radio_tab_' + majorCapa.majorCapaSeq">{{
                majorCapa.majorCapaNm
              }}</label>
            </p>
          </div>
        </div>
        <ResultTab
          :majorCapaSeq="majorCapaSeqSelected"
          :diagSeq="id"
        ></ResultTab>
        <div class="dp_flex btn_group btn_end" style="gap: 10px">
          <button
            type="button"
            class="btn_round btn_xs btn_secondary"
            @click="downloadExel()"
          >
            {{ t("07.coreMajorCompDiagnosisResult.result.button.download") }}
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
import { commonStore } from "@/stores/common";
import {
  ResultDiagMajorCapaDetailModel,
  ResultListMajorCapaModel,
} from "../../../stores/coreMajorCompDiagnosis/coreMajorCompDiagnosisResults/coreMajorCompDiagnosisResults.type";
import { detailResultDiagMajorCapa } from "@/stores/coreMajorCompDiagnosis/coreMajorCompDiagnosisResults/coreMajorCompDiagnosisResults.service";
import { getListMajorCapa } from "@/stores/coreMajorCompDiagnosis/coreMajorCompDiagnosisResults/coreMajorCompDiagnosisResults.service";
import { downloadExelDiagMajorCapa } from "@/stores/coreMajorCompDiagnosis/coreMajorCompDiagnosisResults/coreMajorCompDiagnosisResults.service";

export default defineComponent({
  name: "CoreMajorCompDiagnosisResults",
  components: { Breadcrumb, ResultTab },
  setup() {
    const { t } = useI18n();
    const cmn = commonStore();
    return { t, cmn };
  },
  data() {
    return {
      pageTitle: this.t("07.coreMajorCompDiagnosisResult.result.pageTitle"),
      breadcrumbItems: [],
      id: "",
      majorCapaSeqSelected: "",
      listMajorCapa: [] as Array<ResultListMajorCapaModel>,
      detailInfo: {} as ResultDiagMajorCapaDetailModel,
    };
  },
  beforeMount() {
    this.id = window.history.state.id;
    this.getDetailInfo();
    this.getListMajorCapa();
  },
  methods: {
    getListMajorCapa() {
      getListMajorCapa({ diagSeq: this.id }).then((res) => {
        this.listMajorCapa = res.data.data;
        if (this.listMajorCapa.length > 0) {
          this.majorCapaSeqSelected = this.listMajorCapa[0].majorCapaSeq;
        }
      });
    },
    getDetailInfo() {
      this.cmn.setLoading(true);
      detailResultDiagMajorCapa({ diagSeq: this.id }).then((res: any) => {
        this.detailInfo = res.data.data;
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
          downloadExelDiagMajorCapa({
            diagSeq: this.id,
          }).then((response: any) => {
            const blob = new Blob([response.data], {
              type: response.headers["content-type"],
            });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            const fileNameFromServer = "전공능력진단.xlsx";
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
    selectMajorCapa(majorCapaSeq: string) {
      this.majorCapaSeqSelected = majorCapaSeq;
    },
    back() {
      this.$router.replace({
        path: SCREEN.coreMajorCompDiagnosisResultList.path,
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
