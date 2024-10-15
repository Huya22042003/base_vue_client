<template>
  <div class="page_wrapper">
    <section id="content" class="content_wrapper grid_content" tabindex="0">
      <Breadcrumb :pageTitle="pageTitle" :breadcrumbItems="breadcrumbItems" />
      <div class="box dp_block">
        <div class="box_section">
          <p class="box_title_sm">
            {{ t("07.surveySatisfile.result.title1") }}
          </p>
          <table class="tbl_row tbl_border tbl_result_detail_custom">
            <colgroup>
              <col style="width: 15%" />
              <col style="width: 85%" />
            </colgroup>
            <tbody>
              <tr>
                <th scope="row">
                  <p>
                    {{ t("07.surveySatisfile.result.diagNm") }}
                  </p>
                </th>
                <td colspan="3">
                  <p>
                    <span>{{ detailResult.diagNm }}</span>
                  </p>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <p>
                    {{ t("07.surveySatisfile.result.date") }}
                  </p>
                </th>
                <td colspan="3">
                  <p>
                    <span>
                      {{ detailResult.diagDurStr }} ~
                      {{ detailResult.diagDurEnd }}</span
                    >
                  </p>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <p>
                    {{ t("07.surveySatisfile.result.content") }}
                  </p>
                </th>
                <td colspan="3">
                  <div v-html="detailResult.diagGuide"></div>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <p>
                    {{ t("07.surveySatisfactionOffCampus.list.column3") }}
                  </p>
                </th>
                <td colspan="3">
                  <p>
                    <span>
                      {{ detailResult.quantityAnswer }}
                    </span>
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          class="box_section mt_8 search_flex"
          style="justify-content: space-between"
        >
          <div>
            <p class="box_title_sm">
              {{ t("07.surveySatisfile.result.title2") }}
            </p>
            <div>
              <span class="note_custom">{{
                t("07.surveySatisfile.result.plan1")
              }}</span>
              <br />
              <span class="note_custom">{{
                t("07.surveySatisfile.result.plan2")
              }}</span>
            </div>
          </div>
          <div>
            <button
              type="button"
              class="btn_round btn_xs btn_secondary"
              @click="downloadExel"
            >
              {{ t("07.surveySatisfile.result.btnDowloadExcel") }}
            </button>
          </div>
        </div>
        <div
          class="box_section mt_8"
          v-for="(question, index) in detailResult.listQuestion"
          :key="question.qusSeq"
        >
          <table class="tbl_row tbl_border tbl_result_detail_custom">
            <colgroup>
              <col style="width: 15%" />
              <col style="width: 85%" />
            </colgroup>
            <tbody>
              <tr>
                <th scope="row">
                  <p>
                    {{ t("07.surveySatisfile.result.question") }}
                    {{ index + 1 }}
                  </p>
                </th>
                <td colspan="3">
                  <p>
                    {{ question.cont }}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="mt_8">
            <div class="search_box col_2">
              <ul>
                <li>
                  <ColumnChart
                    :chartHeight="dataBaseChart.chartHeight"
                    :dataset="question.listDataChart"
                    :category="listLevel"
                    :titleChart="''"
                    :labelsPosition="dataBaseChart.labelsPosition"
                    :tooltip="dataBaseChart.tooltip"
                    :isShowToolbar="true"
                  />
                </li>
                <li>
                  <table class="tbl_col table-result-custom tbl_border">
                    <caption></caption>
                    <colgroup>
                      <col style="width: 50%" />
                      <col style="width: 50%" />
                    </colgroup>
                    <thead>
                      <tr>
                        <th scope="col" class="bold">
                          {{ t("07.surveySatisfile.result.column1") }}
                        </th>
                        <th scope="col" class="bold">
                          {{ t("07.surveySatisfile.result.column2") }}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(dataChart, index) in question.listDataChart[0]
                          .data"
                        :key="index"
                      >
                        <td>
                          <p>
                            {{
                              question.listDataChart[0].data.length -
                              index +
                              " "
                            }}({{
                              listLevel[
                                question.listDataChart[0].data.length -
                                  index -
                                  1
                              ]
                            }})
                          </p>
                        </td>
                        <td>
                          <p>
                            {{ dataChart }}({{
                              calculatePercentage(
                                dataChart,
                                question.listDataChart[0].data
                              )
                            }}%)
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td scope="col">
                          <span class="bold">{{
                            t("07.surveySatisfile.result.average")
                          }}</span>
                        </td>
                        <td scope="col">
                          <p>
                            <span class="bold">{{
                              calculateAverage(question.listDataChart[0].data)
                            }}</span>
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="dp_flex btn_group btn_end" style="gap: 10px">
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
import { FORMAT_YYY_MM_DD, MODE_DETAIL } from "../../constants/screen.const";
import BaseDatePicker from "@/components/common/datepicker/BaseDatePicker.vue";
import { commonStore } from "../../stores/common";
import { SurveyOutSchoolResultModel } from "../../stores/survey/outSchool/surveyOutSchool.type";
import { getResultSurveyOutSchool } from "@/stores/survey/outSchool/surveyOutSchool.service";
import { format } from "date-fns";
import { labelsPosition } from "@/types/chart/ChartTypes";
import { getCodeMngByUpCdId } from "@/stores/common/codeMng/codeMng.service";
import { UP_CD_ID_SURVEY_ANSWER_LEVEL } from "@/constants/common.const";
import { SCREEN } from "@/router/screen";
import { downloadExcelResultSurveyOutSchool } from "@/stores/survey/outSchool/surveyOutSchool.service";

export default defineComponent({
  name: "SurveyStatisFieldResult",
  components: { Breadcrumb, BaseDatePicker },
  setup() {
    const route = useRoute();
    const { t } = useI18n();
    const modeScreen = route.params.mode;
    const cmn = commonStore();
    return { t, modeScreen, cmn };
  },
  data() {
    return {
      pageTitle: this.t("07.surveySatisfactionOffCampus.result.pageTitle"),
      breadcrumbItems: [],
      modeDetail: MODE_DETAIL,
      id: "",
      detailResult: {} as SurveyOutSchoolResultModel,
      dataBaseChart: ref({
        labelsPosition: {
          position: "top",
          horizontalAlign: "left",
        } as labelsPosition,
        chartHeight: 350,
        tooltip: (value: number) => {
          return value;
        },
      }),
      listLevel: [],
    };
  },
  beforeMount() {
    this.id = window.history.state.id;
    this.getCodeLevel();
    this.getDetailInfo();
  },
  methods: {
    getDetailInfo() {
      this.cmn.setLoading(true);
      getResultSurveyOutSchool({ diagSeq: this.id }).then((res: any) => {
        this.detailResult = res.data.data;
        this.detailResult.diagDurStr = format(
          new Date(this.detailResult.diagDurStr),
          FORMAT_YYY_MM_DD
        );
        this.detailResult.diagDurEnd = format(
          new Date(this.detailResult.diagDurEnd),
          FORMAT_YYY_MM_DD
        );
        this.detailResult.listQuestion.forEach((question) => {
          let objData = {
            data: question.listDataChart,
          };
          question.listDataChart = [];
          question.listDataChart.push(objData);
        });
        this.cmn.setLoading(false);
      });
    },
    getCodeLevel() {
      getCodeMngByUpCdId({ upCdId: UP_CD_ID_SURVEY_ANSWER_LEVEL }).then(
        (response) => {
          response.data.data.forEach((item) => {
            this.listLevel.push(item.cdNm);
          });
        }
      );
    },
    calculatePercentage(column: any, dataList: any) {
      const total = dataList.reduce((acc: any, item: any) => acc + item, 0);
      if (total > 0) {
        const percentage = (column / total) * 100;
        return Number.isInteger(percentage)
          ? percentage.toFixed(0)
          : percentage.toFixed(1);
      }
    },
    calculateAverage(data) {
      const totalWeightedSum = data.reduce(
        (acc, count, index) => acc + count * (5 - index),
        0
      );
      const totalResponses = data.reduce((acc, count) => acc + count, 0);

      if (totalResponses > 0) {
        const average = totalWeightedSum / totalResponses;
        return average.toFixed(1);
      }

      return "0";
    },
    back() {
      this.$router.push({
        name: SCREEN.surveySatisfactionOffCampus.name,
      });
    },
    downloadExel() {
      this.cmn.setLoading(true);
      downloadExcelResultSurveyOutSchool({
        diagSeq: this.id,
      }).then((response: any) => {
        const blob = new Blob([response.data], {
          type: response.headers["content-type"],
        });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        const fileNameFromServer = "교외_만족도_조사_결과.xlsx";
        link.setAttribute("download", fileNameFromServer);

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        window.URL.revokeObjectURL(url);
        this.cmn.setLoading(false);
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

.table-result-custom td,
th {
  text-align: center !important;
}
</style>
