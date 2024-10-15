<template>
  <div class="page_wrapper">
    <section id="content" class="content_wrapper grid_content" tabindex="0">
      <Breadcrumb :pageTitle="pageTitle" :breadcrumbItems="breadcrumbItems" />
      <div class="box dp_block">
        <div class="box_section">
          <p class="box_title_sm">
            {{ t("07.basicAcademicDiagnosisResult.detail.subTitle") }}
          </p>
          <table class="tbl_row tbl_border tbl_result_detail_custom">
            <caption>
              {{
                t("07.basicAcademicDiagnosisResult.detail.subTitle")
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
                    {{ t("07.basicAcademicDiagnosisResult.detail.name") }}
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
                      t("07.basicAcademicDiagnosisResult.detail.dateCoreComp")
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
                      t("07.basicAcademicDiagnosisResult.detail.yearSemester")
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
                    {{ t("07.basicAcademicDiagnosisResult.detail.object1") }}
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
                    {{ t("07.basicAcademicDiagnosisResult.detail.object2") }}
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
                    {{ t("07.basicAcademicDiagnosisResult.detail.object3") }}
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
                    {{ t("07.basicAcademicDiagnosisResult.detail.object4") }}
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
                    {{ t("07.basicAcademicDiagnosisResult.detail.object5") }}
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
                    {{ t("07.basicAcademicDiagnosisResult.quantityReal") }}
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
            {{ t("07.basicAcademicDiagnosisResult.detail.titleGraphic") }}
          </p>
        </div>
        <div
          v-for="baseLearn in listBaseLearnItem"
          :key="baseLearn.baseLearnItemSeq"
        >
          <CollapseBase
            :isShow="baseLearn.collapseFlag"
            :title="baseLearn.itemNm"
            :isCheck="true"
            :onClick="
              () => {
                baseLearn.collapseFlag = !baseLearn.collapseFlag;
                baseLearnItemSeqSelected = baseLearn.baseLearnItemSeq;
              }
            "
            :mode="'custom'"
          >
            <div
              class="search_box col_2 mt_8"
              v-for="dataChart in baseLearn.listGraphic"
              :key="baseLearn.baseLearnItemSeq + dataChart.qusSeq"
            >
              <div class="mb_3 title-question-custom">
                {{ t("07.basicAcademicDiagnosisResult.detail.textQus")
                }}{{ dataChart.qusNumOrd }}
              </div>
              <ul>
                <li>
                  <ColumnChart
                    :chartHeight="dataBaseChart.chartHeight"
                    v-if="
                      dataChart.listDataChart &&
                      dataChart.listDataChart.length > 0
                    "
                    :dataset="dataChart.listDataChart"
                    :category="dataChart.listAnswer"
                    :titleChart="dataChart.cont"
                    :labelsPosition="dataBaseChart.labelsPosition"
                    :tooltip="dataBaseChart.tooltip"
                  />
                </li>
                <li>
                  <table class="tbl_col table-result-custom tbl_border">
                    <caption></caption>
                    <colgroup></colgroup>
                    <thead>
                      <tr>
                        <th scope="col" class="bold">
                          {{
                            t(
                              "07.coreCompetencyDiagnosisResult.detail.columnLevel"
                            )
                          }}
                        </th>
                        <th scope="col" class="bold">
                          {{
                            t(
                              "07.coreCompetencyDiagnosisResult.detail.quantityAnswer"
                            )
                          }}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(column, index) in dataChart.listColumnTable"
                        :key="index"
                      >
                        <td scope="col">
                          <p>
                            {{ column.level }}
                          </p>
                        </td>
                        <td scope="col">
                          <p>
                            {{ column.countAnswer }}
                            ({{
                              calculatePercentage(
                                column.countAnswer,
                                dataChart.listColumnTable
                              )
                            }}%)
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td scope="col">
                          <span class="bold">{{
                            t(
                              "07.coreCompetencyDiagnosisResult.detail.totalQuantityPeople"
                            )
                          }}</span>
                        </td>
                        <td scope="col">
                          <p>
                            <span class="bold">{{
                              calculateTotal(dataChart.listColumnTable)
                            }}</span>
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </li>
              </ul>
            </div>
          </CollapseBase>
        </div>

        <div class="dp_flex btn_group btn_end" style="gap: 10px">
          <button
            type="button"
            class="btn_round btn_xs btn_secondary"
            @click="downloadExel()"
          >
            {{ t("07.basicAcademicDiagnosisResult.detail.excelDowload") }}
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
import { MODE_DETAIL } from "../../../constants/screen.const";
import BaseDatePicker from "@/components/common/datepicker/BaseDatePicker.vue";
import { commonStore } from "@/stores/common";
import {
  DataColumnTable,
  DiagListBaseLearnModel,
  DiagResultBaseLearnDetailModel,
} from "../../../stores/basicAcademicDiagnosis/basicAcademicDiagnosisResult/basicAcademicDiagnosisResult.type";
import { getListBaseLearn } from "@/stores/basicAcademicDiagnosis/basicAcademicDiagnosisResult/basicAcademicDiagnosisResult.service";
import { detailResultDiagBaseLearn } from "@/stores/basicAcademicDiagnosis/basicAcademicDiagnosisResult/basicAcademicDiagnosisResult.service";
import { getDataChartGraphicDiagBaseLearn } from "@/stores/basicAcademicDiagnosis/basicAcademicDiagnosisResult/basicAcademicDiagnosisResult.service";
import { labelsPosition } from "../../../types/chart/ChartTypes";
import ColumnChart from "../../../components/common/chart/ColumnChart.vue";
import { downloadExelDiagBaseLearn } from "@/stores/basicAcademicDiagnosis/basicAcademicDiagnosisResult/basicAcademicDiagnosisResult.service";

export default defineComponent({
  name: "BasicAcademicDiagResultCrud",
  components: { Breadcrumb, BaseDatePicker, ColumnChart },
  setup() {
    const { t } = useI18n();
    const cmn = commonStore();
    return { t, cmn };
  },
  data() {
    return {
      pageTitle: this.t("07.basicAcademicDiagnosisResult.detail.pageTitle"),
      breadcrumbItems: [],
      modeDetail: MODE_DETAIL,
      listBaseLearnItem: [] as Array<DiagListBaseLearnModel>,
      detailInfo: {} as DiagResultBaseLearnDetailModel,
      id: "",
      baseLearnItemSeqSelected: "",
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
    };
  },
  beforeMount() {
    this.id = window.history.state.id;
    this.getDetailInfo();
    this.getListBaseLearnItem();
  },
  methods: {
    getDetailInfo() {
      this.cmn.setLoading(true);
      detailResultDiagBaseLearn({ diagSeq: this.id }).then((res: any) => {
        this.detailInfo = res.data.data;
        this.cmn.setLoading(false);
      });
    },
    getListBaseLearnItem() {
      getListBaseLearn({ diagSeq: this.id }).then((res) => {
        if (res) {
          this.listBaseLearnItem = res.data.data;
          this.listBaseLearnItem.forEach((item) => {
            item.collapseFlag = false;
            item.listGraphic = [];
            this.getDataChartGraphic(item);
          });
        }
      });
    },
    getDataChartGraphic(baseLearnItem: DiagListBaseLearnModel) {
      getDataChartGraphicDiagBaseLearn({
        diagSeq: this.id,
        baseLearnItemSeq: baseLearnItem.baseLearnItemSeq,
      })
        .then((res) => {
          baseLearnItem.listGraphic = res.data.data;

          baseLearnItem.listGraphic.forEach((graphic) => {
            graphic.listColumnTable = graphic.listAnswer
              .map((answer, index) => ({
                level: answer,
                countAnswer: graphic.listDataChart[index],
              }))
              .filter(
                (item) =>
                  item.countAnswer !== undefined && item.countAnswer !== null
              );
          });

          baseLearnItem.listGraphic.forEach((item) => {
            item.listDataChart = [{ data: item.listDataChart }];
          });
        })
        .catch((error) => {
          console.error("Lỗi khi lấy dữ liệu:", error);
        });
    },

    back() {
      this.$router.replace({
        name: SCREEN.basicAcademicDiagnosisResult.name,
      });
    },
    calculatePercentage(column: number, dataList: DataColumnTable[]): string {
      const total = dataList.reduce((acc, item) => acc + item.countAnswer, 0);

      if (total === 0) {
        return "0";
      }

      const percentage = (column / total) * 100;

      return percentage.toFixed(percentage % 1 === 0 ? 0 : 1);
    },
    calculateTotal(data: DataColumnTable[]): number {
      return data.reduce((acc, item) => acc + item.countAnswer, 0);
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
          downloadExelDiagBaseLearn({
            diagSeq: this.id,
          }).then((response: any) => {
            const blob = new Blob([response.data], {
              type: response.headers["content-type"],
            });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            const fileNameFromServer = "기초학력진단.xlsx";
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
}

.table-result-custom td,
th {
  text-align: center !important;
}

.title-question-custom {
  font-size: 18px;
  font-weight: 500;
}
</style>
