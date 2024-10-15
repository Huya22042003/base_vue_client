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
                <tr v-for="(data, index) in element()" :key="index">
                  <th
                    v-if="data.isIndex"
                    scope="row"
                    :rowspan="data.rowSpanItem1"
                  >
                    {{ data.nameParentItem1 }}
                  </th>
                  <th v-if="data.isIndex2" :rowspan="2">
                    {{ data.nameParentItem2 }}
                  </th>
                  <td v-for="itemName in data.name">
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
import type {
  ResultIdModel,
  CoreModel,
} from "@/stores/searchLevelCoreCapacity/searchLevelCoreCapacity.type";
import { getListResult } from "@/stores/searchLevelCoreCapacity/searchLevelCoreCapacity.service";
import { commonStore } from "../../stores/common";

export default defineComponent({
  components: { Breadcrumb },
  setup() {
    const { t } = useI18n();
    const cmn = commonStore();
    return { t, cmn };
  },
  data() {
    return {
      modeScreen: "",
      idModel: {} as ResultIdModel,
      resultList: [] as Array<CoreModel>,
    };
  },
  computed: {
    pageTitle() {
      if (this.resultList.length !== 0) {
        return (
          this.resultList[0].yearNm +
          this.resultList[0].diagNm +
          "핵심역량 진단 결과 상세화면"
        );
      }
      return "";
    },
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
  methods: {
    element() {
      let dataElements = [];
      const maxColumns = this.resultList.length;

      this.resultList.forEach((item1) => {
        item1.chldList.forEach((item2, index2) => {
          let listName = [];
          let listPoint = [];

          item2.elemList.forEach((item3) => {
            listName.push({ name: item3.elemNm || "" });
          });

          item2.elemList.forEach((item3) => {
            listPoint.push({ name: item3.answerLevel || "" });
          });

          while (listName.length < maxColumns) {
            listName.push({ name: "" });
          }

          while (listPoint.length < maxColumns) {
            listPoint.push({ name: "" });
          }

          let elName = {
            rowSpanItem1: item1.chldList.length * 2,
            isIndex: index2 == 0,
            isIndex2: true,
            nameParentItem1: item1.coreAbilityNm,
            nameParentItem2: item2.chldAbilityNm,
            name: listName,
          };
          let elPonit = {
            rowSpanItem1: item1.chldList.length * 2,
            isIndex: false,
            isIndex2: false,
            nameParentItem1: item1.coreAbilityNm,
            nameParentItem2: item2.chldAbilityNm,
            name: listPoint,
          };

          dataElements.push(elName);
          dataElements.push(elPonit);
        });
      });
      return dataElements;
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
