<template>
  <div class="box dp_block">
    <div class="box_section">
      <div class="search_box col_3">
        <ul>
          <li>
            <p>{{ t("levelJobPerformance.job.search1") }}</p>
            <SelectBoxBase
              v-model="searchModel.year"
              :id="'year'"
              :data="listYear"
            />
          </li>
          <li>
            <p>{{ t("levelJobPerformance.job.search2") }}</p>
            <SelectBoxBase
              v-model="searchModel.termCd"
              :id="'termCd'"
              :data="listTerm"
            />
          </li>
          <li>
            <p>{{ t("levelJobPerformance.job.search3") }}</p>
            <SelectBoxBase
              v-model="searchModel.gradeCd"
              :id="'gradeCd'"
              :data="listGrade"
            />
          </li>
        </ul>
        <ul>
          <li>
            <p>{{ t("levelJobPerformance.job.search4") }}</p>
            <SelectBoxBaseSearch
              v-model="searchModel.deptCd"
              :id="'dept'"
              :name="'dept'"
              :data="listDept"
            >
            </SelectBoxBaseSearch>
          </li>
          <li>
            <p>{{ t("levelJobPerformance.job.search5") }}</p>
            <SelectBoxBaseSearch
              v-model="searchModel.jobSeq"
              :id="'jobSeq'"
              :name="'jobSeq'"
              :data="listJob"
            >
            </SelectBoxBaseSearch>
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
      <button class="btn_round btn_lg btn_primary" @click="dowloadExcel">
        {{ t("levelJobPerformance.student.dowload") }}
      </button>
    </div>
    <div class="box_section">
      <div class="tbl tbl_col" v-if="listLevelOfJob.length > 0">
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
                {{ t("levelJobPerformance.job.tbl1") }}
              </th>
              <th scope="col" class="ta_c" colspan="3">
                {{ t("levelJobPerformance.job.tbl2") }}
              </th>
              <th scope="col" class="ta_c" colspan="2">
                {{ t("levelJobPerformance.job.tbl3") }}
              </th>
              <th scope="col" class="ta_c" rowspan="2">
                {{ t("levelJobPerformance.job.tbl4") }}
              </th>
              <th scope="col" class="ta_c" rowspan="2">
                {{ t("levelJobPerformance.job.tbl5") }}
              </th>
            </tr>
            <tr>
              <th scope="col" class="ta_c">
                {{ t("levelJobPerformance.job.tbl6") }}
              </th>
              <th scope="col" class="ta_c">
                {{ t("levelJobPerformance.job.tbl7") }}
              </th>
              <th scope="col" class="ta_c">
                {{ t("levelJobPerformance.job.tbl8") }}
              </th>
              <th scope="col" class="ta_c">
                {{ t("levelJobPerformance.job.tbl9") }}
              </th>
              <th scope="col" class="ta_c">
                {{ t("levelJobPerformance.job.tbl10") }}
              </th>
            </tr>
          </thead>
        </table>
      </div>
      <div v-else class="no_cnt">
        <p>{{ t("levelJobPerformance.empty") }}</p>
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
import { getListJob } from "@/stores/levelOfJobPerformance/levelOfJobAbility/levelOfJobAbility.service";
import { LevelOfJobAbilitySearchModel } from "@/stores/levelOfJobPerformance/levelOfJobAbility/levelOfJobAbility.type";

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
      listDept: [] as Array<CodeMngModel>,
      listLevelOfJob: [],
      listJob: [] as Array<CodeMngModel>,
      searchModel: {
        year: "",
        deptCd: "",
        termCd: "",
        gradeCd: "",
        jobSeq: "",
      } as LevelOfJobAbilitySearchModel,
    };
  },
  beforeMount() {
    this.getCodeTermCd();
    this.getCodeGradeCd();
    this.getDepartment();
    this.getListJob();
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
        })
        .catch(() => {
          throw new Error(MESSAGE_ERROR_API);
        });
    },
    getListJob() {
      this.cmn.setLoading(true);
      getListJob().then((res) => {
        this.listJob = res.data.data.map((el) => {
          return {
            cdId: el.jobSeq,
            cdNm: el.jobNm,
            upCdId: "job",
          };
        });
        this.cmn.setLoading(false);
      });
    },
    search() {},
    reset() {
      this.searchModel = {
        year: "",
        deptCd: "",
        termCd: "",
        gradeCd: "",
        jobSeq: "",
      };
    },
    dowloadExcel() {},
  },
});
</script>

<style scoped lang="scss">
@import url("../eduProcessCreation/eduCourseCustom.css");
</style>
