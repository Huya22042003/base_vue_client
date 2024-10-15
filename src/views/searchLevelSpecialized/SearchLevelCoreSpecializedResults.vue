<template>
  <div class="page_wrapper">
    <section id="content" class="content_wrapper grid_content" tabindex="0">
      <Breadcrumb :pageTitle="pageTitle" />
      <div class="box dp_block">
        <div class="box_section">
          <div class="table-container">
            <table class="tbl_row tbl_border">
              <caption>
                table row
              </caption>
              <tbody>
                <tr v-for="(data, index) in target()" :key="index">
                  <th v-if="data.isIndex" scope="row" :rowspan="2">
                    {{ data.nameSpecialized }}
                  </th>
                  <th>
                    {{ data.title }}
                  </th>
                  <td v-for="itemName in data.listTarget">
                    {{ itemName.name }}
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
              {{ t("common.close") }}
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
import { useI18n } from "vue-i18n";
import LineChart from "@/components/common/chart/LineChart.vue";
import { SCREEN } from "../../router/screen";
import type {
  ResultIdModel,
  MajorModel,
} from "@/stores/searchLevelSpecialized/searchLevelSpecialized.type";
import { getListResult } from "@/stores/searchLevelSpecialized/searchLevelSpecialized.service";
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
      idModel: {} as ResultIdModel,
      resultList: [] as Array<MajorModel>,
    };
  },
  beforeMount() {
    this.modeScreen = this.$route.params.mode;
    this.idModel.id = window.history.state.id;
    this.idModel.stdId = window.history.state.stdId;
    try {
      Promise.all([this.getData()]);
    } catch (e) {
      alert(e);
    }
  },
  computed: {
    pageTitle() {
      if (this.resultList.length !== 0) {
        return (
          this.resultList[0].yearNm +
          this.resultList[0].diagNm +
          "전공능력 진단 결과 상세화면"
        );
      }
      return "";
    },
  },
  methods: {
    target() {
      let dataTarget = [];
      const maxColumns = this.resultList.length;
      this.resultList.forEach((item, index) => {
        let listName = [];
        let listLevel = [];

        item.majorQusList.forEach((target) => {
          listName.push({
            name: "행동지표" + target.qusNumOrd,
          }),
            listLevel.push({
              name: target.answerLevel,
            });
        });
        while (listName.length < maxColumns) {
          listName.push({ name: "" });
        }

        while (listLevel.length < maxColumns) {
          listLevel.push({ name: "" });
        }
        let elName = {
          rowSpanItem1: item.majorQusList.length * 2,
          isIndex: true,
          nameSpecialized: item.majorCapaNm,
          title: this.t("07.searchLevelSpecialized.detail.nameTarget"),
          listTarget: listName,
        };
        let elLevel = {
          rowSpanItem1: item.majorQusList.length * 2,
          nameSpecialized: item.majorCapaNm,
          title: this.t("07.searchLevelSpecialized.detail.level"),
          isIndex: false,
          listTarget: listLevel,
        };
        dataTarget.push(elName);
        dataTarget.push(elLevel);
      });
      return dataTarget;
    },
    back() {
      this.$router.go(-1);
    },
    async getData() {
      this.cmn.setLoading(true);
      await getListResult(this.idModel).then((res) => {
        this.resultList = res.data.data;
      });
      this.cmn.setLoading(false);
    },
  },
});
</script>
<style>
.table-container {
  overflow-x: auto;
  white-space: nowrap;
}
</style>
