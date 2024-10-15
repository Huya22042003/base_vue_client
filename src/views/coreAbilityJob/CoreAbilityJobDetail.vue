<template>
  <div class="page_wrapper">
    <section id="content" class="content_wrapper grid_content" tabindex="0">
      <div class="box dp_block">
        <div class="box_section">
          <p class="box_title_sm">{{ t("coreAbilityJobList.detailTitle") }}</p>
          <h2 class="mb_10">{{ t("coreAbilityJobList.detailTitle2") }}</h2>
          <table class="tbl_row">
            <colgroup>
              <col style="width: 20%" />
              <col style="width: 40%" />
              <col style="width: 20%" />
              <col style="width: 40%" />
            </colgroup>
            <tbody>
              <tr>
                <th scope="row">{{ t("coreAbilityJobList.coreAbility") }}</th>
                <td colspan="3">
                  {{ coreAbilNm }}
                </td>
              </tr>
              <tr>
                <th scope="row">{{ t("coreAbilityJobList.lowerLever") }}</th>
                <td colspan="3">{{ chldAbilNm }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="box_section mt_30">
          <h2 class="mb_10">{{ t("coreAbilityJobList.detailTitle3") }}</h2>
          <table class="tbl_col tbl_hover">
            <caption></caption>
            <colgroup>
              <col style="width: 5%" />
              <col style="width: 20%" />
              <col style="width: 75%" />
            </colgroup>
            <thead>
              <tr class="bg_color">
                <th class="border_td" scope="col">{{ t("common.select") }}</th>
                <th class="border_td" scope="col">
                  {{ t("coreAbilityJobList.mainFiled") }}
                </th>
                <th scope="col">
                  {{ t("coreAbilityJobList.subordinateField") }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in rowData" :key="item.baseJobCapaSeq">
                <td class="border_td" scope="row">
                  <p class="check_only">
                    <input
                      type="checkbox"
                      :id="'table_check_' + index"
                      v-model="item.isChecked"
                      name="tablecheck"
                      class="checked"
                    />
                    <label :for="'table_check_' + index">check_only</label>
                  </p>
                </td>
                <td class="border_td">{{ item.mainSeq }}</td>
                <td>{{ item.chldSeq }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="dp_flex btn_group btn_end mt-2">
          <button
            type="button"
            class="btn_round btn_md btn_primary"
            @click="saveData()"
          >
            {{ t("common.save") }}
          </button>
          <button
            type="button"
            class="btn_round btn_md btn_white"
            @click="back()"
          >
            {{ t("common.title.list") }}
          </button>
        </div>
      </div>
    </section>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import { SCREEN } from "@/router/screen";
import { commonStore } from "@/stores/common";
import {
  listBaseJob,
  saveBaseJob,
  detailBaseJob,
} from "@/stores/coreAbilityJob/coreAbilityJob.service";
import type {
  BaseJobCapa,
  ChldBaseReg,
} from "@/stores/coreAbilityJob/coreAbilityJob.type";

export default defineComponent({
  name: "CoreAbilityJobDetail",
  components: {},
  setup() {
    const { t } = useI18n();
    const cmn = commonStore();
    return {
      t,
      cmn,
    };
  },
  beforeMount() {
    this.modeScreen = this.$route.params.mode;
    this.coreAbilNm = window.history.state.coreAbilNm;
    this.chldAbilNm = window.history.state.chldAbilNm;
    this.chldAbilSeq = window.history.state.chldAbilSeq;
    this.getDataAndListBaseJob();
  },

  data() {
    return {
      coreAbilNm: "",
      chldAbilNm: "",
      chldAbilSeq: "",
      modeScreen: "",
      rowData: [] as Array<BaseJobCapa>,
      dataInput: {} as ChldBaseReg,
    };
  },
  methods: {
    back() {
      this.$router.replace({ path: SCREEN.coreAbilityJob.path });
    },
    saveData() {
      const existingBaseJobCapaSeqs = this.dataInput.baseItemList.map(
        (item) => item.baseJobCapaSeq
      );
      const updatedBaseItemList = this.rowData
        .map((item) => {
          if (!item) return null;

          if (item.isChecked) {
            return {
              seq: item.seq || null,
              baseJobCapaSeq: item.baseJobCapaSeq,
              delYn: "N",
            };
          } else if (
            !item.isChecked &&
            existingBaseJobCapaSeqs.includes(item.baseJobCapaSeq)
          ) {
            return {
              seq: item.seq,
              baseJobCapaSeq: item.baseJobCapaSeq,
              delYn: "Y",
            };
          }
          return null;
        })
        .filter((item) => item !== null);

      this.dataInput.baseItemList = updatedBaseItemList;
      saveBaseJob(this.dataInput);
      this.back();
    },
    getDataAndListBaseJob() {
      this.cmn.setLoading(true);

      Promise.all([listBaseJob(), detailBaseJob(this.chldAbilSeq)])
        .then(([listRes, detailRes]) => {
          this.rowData = listRes.data.data;

          this.dataInput = detailRes.data.data;

          this.rowData.forEach((item) => {
            const matchedBaseItem = this.dataInput.baseItemList.find(
              (baseItem) => baseItem.baseJobCapaSeq === item.baseJobCapaSeq
            );

            if (matchedBaseItem) {
              item.seq = matchedBaseItem.seq;
              item.isChecked = true;
            } else {
              item.seq = null;
              item.isChecked = false;
            }
          });
        })
        .finally(() => {
          this.cmn.setLoading(false);
        });
    },
  },
});
</script>
<style>
.mt_30 {
  margin-top: 30px;
}
.mb_10 {
  margin-bottom: 10px;
}
.bg_color {
  background-color: aliceblue;
}
.border_td {
  border-right: 1px solid var(--tb-boder--color1);
}
</style>
