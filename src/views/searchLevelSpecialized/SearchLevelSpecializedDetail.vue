<template>
  <div class="page_wrapper">
    <section id="content" class="content_wrapper grid_content" tabindex="0">
      <Breadcrumb :pageTitle="pageTitle" />
      <div class="box dp_block">
        <div class="box_section">
          <p class="box_title_sm">
            {{ t("07.searchLevelSpecialized.detail.title1") }}
          </p>
          <div class="scrollx_table lg">
            <table class="tbl_col">
              <caption>
                table col scroll
              </caption>
              <colgroup>
                <col
                  v-for="data in listName"
                  :key="data.learnAbilitySeq"
                  style="width: 15%"
                />
              </colgroup>
              <thead>
                <tr>
                  <th scope="col">
                    {{ t("07.searchLevelSpecialized.detail.university") }}
                  </th>
                  <th scope="col">
                    {{ t("07.searchLevelSpecialized.detail.department") }}
                  </th>
                  <th scope="col">
                    {{ t("07.searchLevelSpecialized.detail.nameStd") }}
                  </th>
                  <th scope="col">
                    {{ t("07.searchLevelSpecialized.detail.idStd") }}
                  </th>
                  <th scope="col">
                    {{ t("07.searchLevelSpecialized.detail.gender") }}
                  </th>
                  <th scope="col">
                    {{ t("07.searchLevelSpecialized.detail.eduYear") }}
                  </th>
                  <th scope="col">
                    {{ t("07.searchLevelSpecialized.detail.status") }}
                  </th>
                  <th scope="col">
                    {{ t("07.searchLevelSpecialized.detail.studyYn") }}
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
          <LineChart
            v-if="dataLineChart.category.length > 0"
            :dataset="dataLineChart.dataset"
            :labelsPosition="dataLineChart.labelsPosition"
            :title="dataLineChart.title"
            :category="dataLineChart.category"
            :colorset="dataLineChart.color"
          />
        </div>
        <div class="box_section">
          <p class="box_title_sm">
            {{ t("07.searchLevelSpecialized.detail.title3") }}
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
              </colgroup>
              <thead>
                <tr>
                  <th scope="col">
                    {{ t("07.searchLevelSpecialized.table.eduYear") }}
                  </th>
                  <th scope="col">
                    {{ t("07.searchLevelSpecialized.detail.name") }}
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
                  <td>{{ data.yearNm }}학년도</td>
                  <td
                    style="color: #000aff; cursor: pointer"
                    @click="handleCustomClick(data)"
                  >
                    {{ data.diagNm }}
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
import { MODE_DETAIL } from "../../constants/screen.const";
import { defineComponent } from "vue";
import { SCREEN } from "../../router/screen";
import { useI18n } from "vue-i18n";
import { labelsPosition } from "@/types/chart/ChartTypes";
import LineChart from "@/components/common/chart/LineChart.vue";
import {
  getDetail,
  getListMajor,
} from "@/stores/searchLevelSpecialized/searchLevelSpecialized.service";
import type {
  IdModel,
  DiagTargetMemberModel,
} from "@/stores/searchLevelSpecialized/searchLevelSpecialized.type";
import { commonStore } from "../../stores/common";

export default defineComponent({
  components: { Breadcrumb, LineChart },
  setup() {
    const { t } = useI18n();
    const cmn = commonStore();
    return { t, cmn };
  },
  data() {
    return {
      pageTitle: this.t("07.searchLevelSpecialized.detail.pageTitle"),
      dataLineChart: {
        dataset: [],
        color: ["#546E7A", "#E91E63"],
        labelsPosition: {
          position: "bottom",
          horizontalAlign: "center",
        } as labelsPosition,
        title: this.t("07.searchLevelCapacity.detail.university"),
        category: [],
      },
      idModel: {} as IdModel,
      modeScreen: "",
      detailDataList: [] as Array<DiagTargetMemberModel>,
      listName: [],
      deptCd: "",
    };
  },
  beforeMount() {
    this.modeScreen = this.$route.params.mode;
    this.idModel.id = window.history.state.id;
    this.deptCd = window.history.state.deptCd;
    try {
      Promise.all([this.getDetailData(), this.getMajorCapaName()]);
    } catch (e) {
      alert(e);
    }
  },
  methods: {
    handleCustomClick(data: any) {
      this.$router.push({
        name: SCREEN.searchLevelSpecializedResults.name,
        params: { mode: MODE_DETAIL },
        state: {
          id: data.diagSeq,
          stdId: data.stdId,
        },
      });
    },
    back() {
      this.$router.push({
        name: SCREEN.searchLevelSpecialized.name,
      });
    },
    async getDetailData() {
      this.cmn.setLoading(true);
      await getDetail(this.idModel).then((res) => {
        this.detailDataList = res.data.data;
        this.updateChartData();
      });
      this.cmn.setLoading(false);
    },
    async getMajorCapaName() {
      this.cmn.setLoading(true);
      await getListMajor(this.deptCd).then((res) => {
        this.listName = res.data.data;
        this.updateChartData();
      });
      this.cmn.setLoading(false);
    },
    updateChartData() {
      this.dataLineChart = {
        ...this.dataLineChart,
        dataset: this.getChartDatasets(),
        category: this.getChartCategories(),
      };
    },
    getChartDatasets() {
      if (
        Array.isArray(this.detailDataList) &&
        this.detailDataList.length > 0
      ) {
        return this.detailDataList.map((data) => {
          return {
            name: data.diagNm,
            data: this.listName.map((name) => {
              const originalValue = data.scores[name.majorCapaSeq] || 0;
              return this.convertToScale5(originalValue);
            }),
            fill: true,
          };
        });
      }
      return [];
    },
    getChartCategories() {
      if (Array.isArray(this.listName) && this.listName.length > 0) {
        return this.listName.map((element) => element.majorCapaNm);
      }
      return [];
    },
    convertToScale5(value: number): number {
      const convertedValue = Math.round((value - 40) / 15 + 1);
      return convertedValue;
    },
  },
});
</script>
