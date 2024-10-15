<template>
  <div class="box_section mt_5">
    <div
      class="search_box col_2"
      v-for="dataChart in listDataChart"
      :key="majorCapaSeq + dataChart.majorCapaDiagQus"
    >
      <ul>
        <li>
          <ColumnChart
            :chartHeight="dataBaseChart.chartHeight"
            :dataset="dataChart.listDataChart"
            :category="listPoint"
            :titleChart="textMajorCapaDiagQus + dataChart.qusNumOrd"
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
                  {{ t("07.coreCompetencyDiagnosisResult.detail.columnLevel") }}
                </th>
                <th scope="col" class="bold">
                  {{
                    t("07.coreCompetencyDiagnosisResult.detail.quantityAnswer")
                  }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(column, index) in dataChart.listDataChart[0].data"
                :key="index"
              >
                <td scope="col">
                  <p>
                    {{
                      dataChart.listDataChart[0].data.length -
                      index +
                      t("07.coreMajorCompDiagnosisResult.result.table.point")
                    }}
                  </p>
                </td>
                <td scope="col">
                  <p>
                    {{ column }}
                    ({{
                      calculatePercentage(
                        column,
                        dataChart.listDataChart[0].data
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
                      calculateTotal(dataChart.listDataChart[0].data)
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
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import {} from "../../../constants/screen.const";
import ColumnChart from "@/components/common/chart/ColumnChart.vue";
import { labelsPosition } from "@/types/chart/ChartTypes";
import { commonStore } from "@/stores/common";
import { DiagResultMajCapaChartGraphicResModel } from "@/stores/coreMajorCompDiagnosis/coreMajorCompDiagnosisResults/coreMajorCompDiagnosisResults.type";
import { getDataChartGraphicDiagMajorCapa } from "@/stores/coreMajorCompDiagnosis/coreMajorCompDiagnosisResults/coreMajorCompDiagnosisResults.service";
import { UP_CD_POINT } from "../../../constants/common.const";
import { getCodeMngByUpCdId } from "../../../stores/common/codeMng/codeMng.service";

export default defineComponent({
  name: "ResultTab",
  props: {
    majorCapaSeq: {
      type: String,
      required: true,
    },
    diagSeq: {
      type: String,
      required: true,
    },
  },
  setup() {
    const { t } = useI18n();
    const cmn = commonStore();
    return { t, cmn };
  },
  data() {
    return {
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
      listDataChart: [] as Array<DiagResultMajCapaChartGraphicResModel>,
      listPoint: [],
      textMajorCapaDiagQus: this.t(
        "07.coreMajorCompDiagnosisResult.result.majorCapaDiagQus"
      ),
    };
  },
  beforeMount() {
    this.getCodePoint();
  },
  watch: {
    majorCapaSeq(newValue) {
      this.listDataChart = [];
      if (newValue && this.diagSeq) {
        this.getDataChartGraphic();
      }
    },
  },
  methods: {
    getCodePoint() {
      getCodeMngByUpCdId({ upCdId: UP_CD_POINT }).then((response) => {
        response.data.data.forEach((item) => {
          this.listPoint.push(item.cdNm);
        });
      });
    },
    getDataChartGraphic() {
      let request = {
        majorCapaSeq: this.majorCapaSeq,
        diagSeq: this.diagSeq,
      };
      this.cmn.setLoading(true);
      getDataChartGraphicDiagMajorCapa(request).then((res: any) => {
        this.listDataChart = res.data.data;
        this.listDataChart.forEach((item) => {
          let objData = {
            data: item.listDataChart,
          };
          item.listDataChart = [];
          item.listDataChart.push(objData);
        });

        this.cmn.setLoading(false);
      });
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
    calculateTotal(data) {
      return data.reduce((acc, val) => acc + val, 0);
    },
  },
});
</script>
<style scoped>
.table-result-custom td,
th {
  text-align: center !important;
}
</style>
