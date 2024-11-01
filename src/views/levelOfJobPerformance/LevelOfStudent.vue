<template>
  <div class="box dp_block">
    <div class="box_section">
      <div class="search_box col_3">
        <ul>
          <li>
            <p>{{ t("levelJobPerformance.student.column1") }}</p>
            <SelectBoxBase :id="'search1'" :data="listYear" />
          </li>
          <li>
            <p>{{ t("levelJobPerformance.student.column2") }}</p>
            <SelectBoxBase :id="'search2'" :data="listTerm" />
          </li>
          <li>
            <p>{{ t("levelJobPerformance.student.column3") }}</p>
            <SelectBoxBase :id="'search3'" :data="listGrade" />
          </li>
        </ul>
        <ul>
          <li>
            <p>{{ t("levelJobPerformance.student.column4") }}</p>
            <SelectBoxBaseSearch :id="'dept'" :name="'dept'" :data="listDept">
            </SelectBoxBaseSearch>
          </li>
          <li>
            <p>{{ t("levelJobPerformance.student.column5") }}</p>
            <InputBase :id="'search5'" />
          </li>
          <li>
            <p>{{ t("levelJobPerformance.student.column6") }}</p>
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
    <div class="dp_flex btn_group btn_end mg_b20" style="gap: 10px">
      <button class="btn_round btn_lg btn_gray" @click="search">
        {{ t("levelJobPerformance.student.dowload") }}
      </button>
    </div>
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
              <th scope="row" class="ta_c" rowspan="2">
                {{ t("levelJobPerformance.student.tbl1") }}
              </th>
              <th scope="row" class="ta_c" rowspan="2">
                {{ t("levelJobPerformance.student.tbl2") }}
              </th>
              <th scope="col" class="ta_c" colspan="3">
                {{ t("levelJobPerformance.student.tbl3") }}
              </th>
              <th scope="col" class="ta_c" colspan="4">
                {{ t("levelJobPerformance.student.tbl4") }}
              </th>
            </tr>
            <tr>
              <th scope="col" class="ta_c">
                {{ t("levelJobPerformance.student.tbl5") }}
              </th>
              <th scope="col" class="ta_c">
                {{ t("levelJobPerformance.student.tbl6") }}
              </th>
              <th scope="col" class="ta_c">
                {{ t("levelJobPerformance.student.tbl7") }}
              </th>
              <th scope="col" class="ta_c">
                {{ t("levelJobPerformance.student.tbl8") }}
              </th>
              <th scope="col" class="ta_c">
                {{ t("levelJobPerformance.student.tbl9") }}
              </th>
              <th scope="col" class="ta_c">
                {{ t("levelJobPerformance.student.tbl10") }}
              </th>
              <th scope="col" class="ta_c">
                {{ t("levelJobPerformance.student.tbl11") }}
              </th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  DIV_CD_DEPT_DEPART,
  MESSAGE_ERROR_API,
  UP_CD_ID_GRADE_LEVEL,
  UP_CD_ID_SEMESTER,
} from "@/constants/common.const";
import { START_YEAR_NUMBER } from "@/constants/screen.const";
import { commonStore } from "@/stores/common";
import { getCodeMngByUpCdId } from "@/stores/common/codeMng/codeMng.service";
import { CodeMngModel } from "@/stores/common/codeMng/codeMng.type";
import { getDepartmentList } from "@/stores/common/department/department.service";

export default defineComponent({
  setup() {
    const { t } = useI18n();
    const cmn = commonStore();
    return { t, cmn };
  },
  data() {
    return {
      breadcrumbItems: [],
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
  beforeMount() {
    this.getCodeTermCd();
    this.getCodeGradeCd();
    this.getDepartment();

    const currentYear = new Date().getFullYear();
    for (let index = START_YEAR_NUMBER; index <= currentYear + 1; index++) {
      this.listYear.push({ cdId: index, cdNm: index, upCdId: "" });
    }
  },
  methods: {
    getCodeTermCd() {
      getCodeMngByUpCdId({ upCdId: UP_CD_ID_SEMESTER }).then((response) => {
        response.data.data.forEach((item: any) => {
          this.listTerm.push(item);
        });
      });
    },
    getCodeGradeCd() {
      getCodeMngByUpCdId({ upCdId: UP_CD_ID_GRADE_LEVEL }).then((response) => {
        response.data.data.forEach((item: any) => {
          this.listGrade.push(item);
        });
      });
    },
    getDepartment() {
      getDepartmentList({
        deptCd: [],
        deptDivCd: [DIV_CD_DEPT_DEPART],
        upDeptCd: [],
        useYn: "",
      })
        .then((res) => {
          this.listDept = res.data.data
            .filter((el) => el.deptDivCd == DIV_CD_DEPT_DEPART)
            .map((el) => {
              return {
                cdId: el.deptCd,
                cdNm: el.deptNm,
                upCdId: "dept",
              };
            });
          this.listDept.unshift({
            cdId: "",
            cdNm: this.t("common.all"),
            upCdId: "major",
          });
        })
        .catch(() => {
          throw new Error(MESSAGE_ERROR_API);
        });
    },
    search() {},
    reset() {},
  },
});
</script>

<style scoped lang="scss">
@import url("../eduProcessCreation/eduCourseCustom.css");
</style>
