<template>
  <div class="page_wrapper">
    <section id="content" class="content_wrapper grid_content" tabindex="0">
      <Breadcrumb :pageTitle="pageTitle" />
      <div class="box dp_block">
        <div class="box_section">
          <p class="box_title_sm">
            {{ t("07.searchLevelAcademicSpe.detail.title1") }}
          </p>
          <div class="scrollx_table lg">
            <table class="tbl_col">
              <caption>
                table col scroll
              </caption>
              <colgroup>
                <col
                  v-for="data in listName"
                  :key="data.majorCapaSeq"
                  style="width: 15%"
                />
              </colgroup>
              <thead>
                <tr>
                  <th scope="col">
                    {{ t("07.searchLevelAcademicSpe.detail.university") }}
                  </th>
                  <th scope="col">
                    {{ t("07.searchLevelAcademicSpe.detail.department") }}
                  </th>
                  <th scope="col">
                    {{ t("07.searchLevelAcademicSpe.detail.nameStd") }}
                  </th>
                  <th scope="col">
                    {{ t("07.searchLevelAcademicSpe.detail.idStd") }}
                  </th>
                  <th scope="col">
                    {{ t("07.searchLevelAcademicSpe.detail.gender") }}
                  </th>
                  <th scope="col">
                    {{ t("07.searchLevelAcademicSpe.detail.eduYear") }}
                  </th>
                  <th scope="col">
                    {{ t("07.searchLevelAcademicSpe.detail.status") }}
                  </th>
                  <th scope="col">
                    {{ t("07.searchLevelAcademicSpe.detail.studyYn") }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="detailDataList.length != 0">
                  <td>{{ detailDataList[0].major }}</td>
                  <td>{{ detailDataList[0].deptNm }}</td>
                  <td>{{ detailDataList[0].userNm }}</td>
                  <td>{{ detailDataList[0].stdId }}</td>
                  <td>{{ detailDataList[0].sexNm }}</td>
                  <td>{{ detailDataList[0].gradeNm }}</td>
                  <td>{{ detailDataList[0].shregStsNm }}</td>
                  <td>{{ detailDataList[0].gradYn }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="box_section">
          <BarChart
            :chartHeight="dataBaseChart.chartHeight"
            :dataset="dataBaseChart.dataset"
            :category="dataBaseChart.category"
            :title="dataBaseChart.title"
            :labelsPosition="dataBaseChart.labelsPosition"
          />
        </div>
        <div class="box_section">
          <p class="box_title_sm">
            {{ t("07.searchLevelAcademicSpe.detail.title3") }}
          </p>
          <div class="scrollx_table lg">
            <table class="tbl_col">
              <caption>
                table col scroll
              </caption>
              <colgroup>
                <col style="width: 15%" />
                <col style="width: 15%" />
                <col style="width: 15%" />
                <col style="width: 15%" />
                <col style="width: 15%" />
                <col style="width: 15%" />
                <col style="width: 15%" />
              </colgroup>
              <thead>
                <tr>
                  <th scope="col">
                    {{ t("07.searchLevelAcademicSpe.detail.yearSemester") }}
                  </th>
                  <th scope="col">
                    {{ t("07.searchLevelAcademicSpe.detail.classify") }}
                  </th>
                  <th scope="col">
                    {{ t("07.searchLevelAcademicSpe.detail.subject") }}
                  </th>
                  <th
                    scope="col"
                    v-for="data in listName"
                    :key="data.majorCapaSeq"
                  >
                    {{ data.majorCapaNm }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="data in detailDataList" :key="data.id">
                  <td>{{ data.yearTerm }}</td>
                  <td>{{ data.sustDivNm }}</td>
                  <td>
                    {{ data.sbjtNm }}
                  </td>
                  <td v-for="name in listName" :key="name.majorCapaSeq">
                    {{ data.scores[name.majorCapaSeq] || 0 }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="btn_group btn_end mt-5">
            <button
              @click="back()"
              type="button"
              class="button btn_xs btn_gray btn_responsive"
            >
              {{ t("common.list") }}
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script lang="ts">
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import { defineComponent } from "vue";
import { SCREEN } from "../../router/screen";
import { useI18n } from "vue-i18n";
import { labelsPosition } from "@/types/chart/ChartTypes";
import BarChart from "@/components/common/chart/BarChart.vue";
import {
  getDetail,
  getListMajor,
  getDataChart,
} from "@/stores/searchLevelAcademicSpe/searchLevelAcademicSpe.service";
import type {
  IdModel,
  DiagTargetMemberModel,
  DataChart,
} from "@/stores/searchLevelAcademicSpe/searchLevelAcademicSpe.type";
import { commonStore } from "../../stores/common";
export default defineComponent({
  components: { Breadcrumb, BarChart },
  setup() {
    const { t } = useI18n();
    const cmn = commonStore();
    return { t, cmn };
  },
  data() {
    return {
      pageTitle: this.t("07.searchLevelAcademicSpe.detail.pageTitle"),
      dataBaseChart: {
        title: "Chart",
        category: [],
        labelsPosition: {
          position: "bottom",
          horizontalAlign: "center",
        } as labelsPosition,
        chartHeight: 550,
        tooltip: (value: number) => {
          return value + " tooltip functions";
        },
        color: ["#546E7A", "#E91E63"],
        dataset: [],
      },
      idModel: {} as IdModel,
      modeScreen: "",
      detailDataList: [] as Array<DiagTargetMemberModel>,
      listName: [],
      listChart: [] as Array<DataChart>,
    };
  },
  beforeMount() {
    this.modeScreen = this.$route.params.mode;
    this.idModel.id = window.history.state.id;
    this.idModel.deptCd = window.history.state.deptCd;
    try {
      Promise.all([
        this.getDetailData(),
        this.getMajorCapaName(),
        this.getDataToChart(),
      ]);
    } catch (e) {
      alert(e);
    }
  },
  methods: {
    async getDetailData() {
      this.cmn.setLoading(true);
      await getDetail(this.idModel).then((res) => {
        this.detailDataList = res.data.data;
      });
      this.cmn.setLoading(false);
    },
    async getMajorCapaName() {
      this.cmn.setLoading(true);
      await getListMajor(this.idModel.deptCd).then((res) => {
        this.listName = res.data.data;
      });
      this.cmn.setLoading(false);
    },
    async getDataToChart() {
      this.cmn.setLoading(true);
      try {
        const res = await getDataChart(this.idModel);
        this.listChart = res.data.data;
        this.listChart.forEach((item) => {
          this.dataBaseChart.category.push(item.majorCapaNm);
        });
        this.dataBaseChart.dataset = [
          {
            name: "나의점수",
            data: this.listChart.map((item) => item.studentScore),
          },
          {
            name: "동일학년평균",
            data: this.listChart.map((item) => item.mediumScore),
          },
        ];
      } finally {
        this.cmn.setLoading(false);
      }
    },
    back() {
      this.$router.push({
        name: SCREEN.searchLevelAcademicSpe.name,
      });
    },
  },
});
</script>
