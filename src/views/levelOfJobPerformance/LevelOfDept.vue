<template>
  <div class="box dp_block">
    <div class="box_section">
      <div class="search_box col_3">
        <ul>
          <li>
            <p>학년도</p>
            <SelectBoxBase :id="'search1'" :data="listYear" />
          </li>
          <li>
            <p>학기</p>
            <SelectBoxBase :id="'search1'" :data="listTerm" />
          </li>
          <li>
            <p>학년</p>
            <SelectBoxBase :id="'search1'" :data="listGrade" />
          </li>
        </ul>
        <ul>
          <li>
            <p>학과</p>
            <SelectBoxBase :id="'search1'" :data="listDept" />
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
              <th class="ta_c" rowspan="2">직무</th>
              <th class="ta_c" colspan="3">능력단위</th>
              <th class="ta_c" colspan="4">직무능력성취도</th>
              <th class="ta_c" rowspan="2">연계교과목</th>
            </tr>
            <tr>
              <th class="ta_c">구분</th>
              <th class="ta_c">능력돤위명</th>
              <th class="ta_c">능력단위 요소명</th>
              <th class="ta_c">능력단위요소</th>
              <th class="ta_c">능력단위</th>
              <th class="ta_c">직무</th>
              <th class="ta_c">학과</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="ta_c">직무</td>
              <td class="ta_c">능력단위</td>
              <td class="ta_c">구분</td>
              <td class="ta_c">능력돤위명</td>
              <td class="ta_c">능력단위 요소명</td>
              <td class="ta_c">능력단위요소</td>
              <td class="ta_c">능력단위</td>
              <td class="ta_c">직무</td>
              <td class="ta_c">학과</td>
            </tr>
          </tbody>
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
