<template>
  <div class="box dp_block">
    <div class="box_section">
      <div class="search_box col_3">
        <ul>
          <li>
            <p>{{ t("eduCourseCqi.levelAchStudent.search1") }}</p>
            <SelectBoxBase :id="'search1'" :data="listYear" />
          </li>
          <li>
            <p>{{ t("eduCourseCqi.levelAchStudent.search2") }}</p>
            <SelectBoxBase :id="'search1'" :data="listTerm" />
          </li>
          <li>
            <p>{{ t("eduCourseCqi.levelAchStudent.search3") }}</p>
            <SelectBoxBase :id="'search1'" :data="listGrade" />
          </li>
        </ul>
        <ul>
          <li>
            <p>{{ t("eduCourseCqi.levelAchStudent.search4") }}</p>
            <SelectBoxBase :id="'search1'" :data="listDept" />
          </li>
          <li>
            <p>{{ t("eduCourseCqi.levelAchStudent.search5") }}</p>
            <InputBase :id="'search5'" />
          </li>
          <li>
            <p>{{ t("eduCourseCqi.levelAchStudent.search6") }}</p>
            <InputBase :id="'search6'" />
          </li>
        </ul>
        <div class="dp_flex btn_group btn_end" style="gap: 10px">
          <button class="btn_round btn_lg btn_primary" @click="search">
            {{ t("common.search") }}
          </button>
          <button class="btn_round btn_lg btn_gray" @click="reset">
            {{ t("common.reset") }}
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="box dp_block">
    <div class="box_section">
      <div class="tbl tbl_col">
        <table>
          <colgroup>
            <col style="width: auto" />
            <col style="width: auto" />
            <col style="width: auto" />
            <col style="width: auto" />
            <col style="width: auto" />
            <col style="width: auto" />
            <col style="width: auto" />
            <col style="width: auto" />
            <col style="width: auto" />
          </colgroup>
          <thead>
            <tr>
              <th scope="row" class="ta_c" rowspan="2">1</th>
              <th scope="row" class="ta_c" rowspan="2">2</th>
              <th scope="col" class="ta_c" colspan="3">3</th>
              <th scope="col" class="ta_c" colspan="3">4</th>
            </tr>
            <tr>
              <th scope="col" class="ta_c">4</th>
              <th scope="col" class="ta_c">5</th>
              <th scope="col" class="ta_c">6</th>
              <th scope="col" class="ta_c">7</th>
              <th scope="col" class="ta_c">8</th>
              <th scope="col" class="ta_c">9</th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { commonStore } from "@/stores/common";
import { CodeMngModel } from "@/stores/common/codeMng/codeMng.type";

export default defineComponent({
  setup() {
    const { t } = useI18n();
    const cmn = commonStore();
    return { t, cmn };
  },
  data() {
    return {
      listYear: [
        { cdId: "", cdNm: this.t("common.select") },
      ] as Array<CodeMngModel>,
      listTerm: [
        { cdId: "", cdNm: this.t("common.select") },
      ] as Array<CodeMngModel>,
      listGrade: [
        { cdId: "", cdNm: this.t("common.select") },
      ] as Array<CodeMngModel>,
      listDept: [
        { cdId: "", cdNm: this.t("common.select") },
      ] as Array<CodeMngModel>,
    };
  },
  beforeMount() {},
  methods: { search() {}, reset() {} },
});
</script>

<style scoped lang="scss"></style>
