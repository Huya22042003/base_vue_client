<template>
  <div class="box dp_block">
    <div class="box_section">
      <div class="search_box col_3">
        <ul>
          <li>
            <p>{{ t("levelJobPerformance.school.search1") }}</p>
            <SelectBoxBase
              v-model="searchModel.year"
              :id="'listYear'"
              :data="listYear"
            />
          </li>
          <li>
            <p>{{ t("levelJobPerformance.school.search2") }}</p>
            <SelectBoxBase
              v-model="searchModel.termCd"
              :id="'listTerm'"
              :data="listTerm"
            />
          </li>
          <li>
            <p>{{ t("levelJobPerformance.school.search3") }}</p>
            <SelectBoxBase
              v-model="searchModel.gradeCd"
              :id="'listGrade'"
              :data="listGrade"
            />
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
    <div class="dp_flex jc_end al_center box_title_sm">
      <ExportFileExcel
        :data="dataExport"
        :fileName="t('levelJobPerformance.school.fileName')"
        :btnName="t('levelJobPerformance.student.dowload')"
        :multiHeaderFlag="true"
        :callData="true"
        ref="exportExcelRef"
        @click="dowloadExcel"
      >
      </ExportFileExcel>
    </div>
    <div class="dp_flex between al_center box_title_sm">
      <p class="section_tit_xs">
        {{ t("levelJobPerformance.messSchool") }}:
        {{ averageSchool ? averageSchool : "-" }}
      </p>
      <p class="section_tit_xs">
        {{ t("levelJobPerformance.messalert") }}
      </p>
    </div>
    <div class="box_section">
      <div v-if="isLoad == 0" class="no_cnt">
        <p>{{ t("levelJobPerformance.empty") }}</p>
      </div>
      <div class="tbl tbl_col" v-else-if="listLevelOfSchool.length > 0">
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
              <th class="ta_c" rowspan="2">
                {{ t("levelJobPerformance.school.tbl1") }}
              </th>
              <th class="ta_c" rowspan="2">
                {{ t("levelJobPerformance.school.tbl2") }}
              </th>
              <th class="ta_c" colspan="2">
                {{ t("levelJobPerformance.school.tbl3") }}
              </th>
              <th class="ta_c" colspan="4">
                {{ t("levelJobPerformance.school.tbl4") }}
              </th>
            </tr>
            <tr>
              <th class="ta_c">{{ t("levelJobPerformance.school.tbl5") }}</th>
              <th class="ta_c">{{ t("levelJobPerformance.school.tbl6") }}</th>
              <th class="ta_c">{{ t("levelJobPerformance.school.tbl7") }}</th>
              <th class="ta_c">{{ t("levelJobPerformance.school.tbl8") }}</th>
              <th class="ta_c">{{ t("levelJobPerformance.school.tbl9") }}</th>
              <th class="ta_c">{{ t("levelJobPerformance.school.tbl10") }}</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="dept in listLevelOfSchool" :key="dept.deptCd">
              <template
                v-for="(job, indexJob) in dept.listJob"
                :key="job.jobSeq"
              >
                <template
                  v-for="(jobAbility, indexJobAbility) in job.listJobAbility"
                  :key="jobAbility.jobAbilSeq"
                >
                  <template
                    v-for="(jobCapa, indexJobCapa) in jobAbility.listJobCapa"
                    :key="jobCapa.jobCapaUnitSeq"
                  >
                    <tr>
                      <td
                        v-if="
                          indexJob === 0 &&
                          indexJobAbility === 0 &&
                          indexJobCapa === 0
                        "
                        :rowspan="dept.rowSpan"
                      >
                        {{ dept.deptNm }}
                      </td>
                      <td
                        v-if="indexJobAbility === 0 && indexJobCapa === 0"
                        :rowspan="job.rowSpan"
                      >
                        {{ job.jobNm }}
                      </td>
                      <td
                        v-if="indexJobCapa === 0"
                        :rowspan="jobAbility.rowSpan"
                      >
                        <div>{{ jobAbility.jobAbilNm }}</div>
                        <div>{{ jobAbility.jobAbilCd }}</div>
                      </td>
                      <td>{{ jobCapa.capaUnitNm }}</td>
                      <td>{{ jobCapa.scoreJobCapa }}</td>
                      <td
                        v-if="indexJobCapa === 0"
                        :rowspan="jobAbility.rowSpan"
                      >
                        {{ jobAbility.scoreJobAbility }}
                      </td>
                      <td
                        v-if="indexJobAbility === 0 && indexJobCapa === 0"
                        :rowspan="job.rowSpan"
                      >
                        {{ job.scoreJob }}
                      </td>
                      <td
                        v-if="
                          indexJob === 0 &&
                          indexJobAbility === 0 &&
                          indexJobCapa === 0
                        "
                        :rowspan="dept.rowSpan"
                      >
                        {{ dept.scoreDept }}
                      </td>
                    </tr>
                  </template>
                </template>
              </template>
            </template>
          </tbody>
        </table>
      </div>
      <div v-else class="no_cnt">
        <p>{{ t("levelJobPerformance.empty1") }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  UP_CD_ID_GRADE_LEVEL,
  UP_CD_ID_SEMESTER,
} from "@/constants/common.const";
import { START_YEAR_NUMBER } from "@/constants/screen.const";
import { commonStore } from "@/stores/common";
import { getCodeMngByUpCdId } from "@/stores/common/codeMng/codeMng.service";
import { CodeMngModel } from "@/stores/common/codeMng/codeMng.type";
import {
  CheckMerge,
  MultiHeaderData,
} from "@/stores/common/excel/excelData.type";
import { getLevelOfSchoolList } from "@/stores/levelOfJobPerformance/levelOfSchool/levelOfSchool.service";
import {
  LevelOfSchoolDeptModel,
  LevelOfSchoolListDTO,
  LevelOfSchoolSearchModel,
} from "@/stores/levelOfJobPerformance/levelOfSchool/levelOfSchool.type";

export default defineComponent({
  setup() {
    const { t } = useI18n();
    const cmn = commonStore();
    const exportExcelRef = ref();
    return { t, cmn, exportExcelRef };
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
      searchModel: {
        year: "",
        termCd: "",
        gradeCd: "",
      } as LevelOfSchoolSearchModel,
      dataExport: [] as Array<MultiHeaderData>,
      listLevelOfSchool: [] as Array<LevelOfSchoolDeptModel>,
      listLevelOfSchoolExcel: [] as Array<LevelOfSchoolListDTO>,
      averageSchool: 0,
      isLoad: 0,
    };
  },
  beforeMount() {
    this.getCodeTermCd();
    this.getCodeGradeCd();
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
      this.cmn.setLoading(true);
      getCodeMngByUpCdId({ upCdId: UP_CD_ID_GRADE_LEVEL }).then((response) => {
        response.data.data.forEach((item: any) => {
          this.listGrade.push(item);
        });
        this.cmn.setLoading(false);
      });
    },
    search() {
      if (
        !this.searchModel.gradeCd ||
        !this.searchModel.year ||
        !this.searchModel.termCd
      ) {
        this.$alert(this.t("levelJobPerformance.school.messageWarning"));
        return;
      }
      this.isLoad++;
      this.cmn.setLoading(true);
      getLevelOfSchoolList(this.searchModel)
        .then((res) => {
          this.listLevelOfSchool = this.calculateRowSpan(res.data.data);
          this.convertListLevelOfSchoolToExcel();
          this.calculatorAverage();
          this.cmn.setLoading(false);
        })
        .catch((error) => {
          this.cmn.setLoading(false);
        });
    },
    convertListLevelOfSchoolToExcel() {
      this.listLevelOfSchoolExcel = this.listLevelOfSchool.flatMap((dept) =>
        dept.listJob.flatMap((job) =>
          job.listJobAbility.flatMap((ability) =>
            ability.listJobCapa.map((capaUnit) => ({
              deptCd: dept.deptCd,
              deptNm: dept.deptNm,
              scoreDept: dept.scoreDept,
              jobSeq: job.jobSeq,
              jobNm: job.jobNm,
              scoreJob: job.scoreJob,
              jobAbilSeq: ability.jobAbilSeq,
              jobAbilNm: ability.jobAbilNm,
              jobAbilCd: ability.jobAbilCd,
              scoreJobAbility: ability.scoreJobAbility,
              jobCapaUnitSeq: capaUnit.jobCapaUnitSeq,
              capaUnitNm: capaUnit.capaUnitNm,
              scoreJobCapa: capaUnit.scoreJobCapa,
            }))
          )
        )
      );
    },
    calculateRowSpan(
      levels: LevelOfSchoolDeptModel[]
    ): LevelOfSchoolDeptModel[] {
      levels.forEach((dept) => {
        dept.rowSpan = dept.listJob.reduce((sum, job) => {
          job.rowSpan = job.listJobAbility.reduce((subSum, ability) => {
            ability.rowSpan = ability.listJobCapa.length || 1;
            return subSum + ability.rowSpan;
          }, 0);
          return sum + job.rowSpan;
        }, 0);
      });
      return levels;
    },
    reset() {
      this.searchModel = {
        year: "",
        termCd: "",
        gradeCd: "",
      };
    },
    calculatorAverage() {
      let sum = 0;
      this.listLevelOfSchool.forEach((dept) => {
        sum += dept.scoreDept;
      });
      this.averageSchool = (sum / this.listLevelOfSchool.length).toFixed(2);
    },

    dowloadExcel() {
      if (
        !this.searchModel.gradeCd ||
        !this.searchModel.year ||
        !this.searchModel.termCd
      ) {
        this.$alert(this.t("levelJobPerformance.school.messageWarning"));
        return;
      }
      let dataInput = {} as MultiHeaderData;
      dataInput.sheetName = "sheet1";
      dataInput.data = [];
      dataInput.header = [];
      dataInput.indexCheckMerge = 2;
      dataInput.mutilCheck = [] as Array<CheckMerge>;
      dataInput.mutilCheck.push({
        indexKey: 0,
        indexChild: [0, 1, 2, 7],
      });
      dataInput.mutilCheck.push({
        indexKey: 1,
        indexChild: [6],
      });
      dataInput.mutilCheck.push({
        indexKey: 2,
        indexChild: [5],
      });
      dataInput.indexNotMerge = [3, 4];
      let header1 = [
        this.t("levelJobPerformance.school.tbl1"),
        this.t("levelJobPerformance.school.tbl2"),
        this.t("levelJobPerformance.school.tbl3"),
        this.t("levelJobPerformance.school.tbl3"),
        this.t("levelJobPerformance.school.tbl4"),
        this.t("levelJobPerformance.school.tbl4"),
        this.t("levelJobPerformance.school.tbl4"),
        this.t("levelJobPerformance.school.tbl4"),
      ];
      let header2 = [
        this.t("levelJobPerformance.school.tbl1"),
        this.t("levelJobPerformance.school.tbl2"),
        this.t("levelJobPerformance.school.tbl5"),
        this.t("levelJobPerformance.school.tbl6"),
        this.t("levelJobPerformance.school.tbl7"),
        this.t("levelJobPerformance.school.tbl8"),
        this.t("levelJobPerformance.school.tbl9"),
        this.t("levelJobPerformance.school.tbl10"),
      ];
      dataInput.header.push(header1);
      dataInput.header.push(header2);
      this.listLevelOfSchoolExcel.forEach((item: LevelOfSchoolListDTO) => {
        let rowData = [];
        rowData.push(item.deptNm);
        rowData.push(item.jobNm);
        rowData.push(item.jobAbilNm + item.jobAbilCd);
        rowData.push(item.capaUnitNm);
        rowData.push(item.scoreJobCapa);
        rowData.push(item.scoreJobAbility);
        rowData.push(item.scoreJob);
        rowData.push(item.scoreDept);
        dataInput.data.push(rowData);
      });
      this.dataExport.push(dataInput);
      this.exportExcelRef.downloadExcel();
    },
  },
});
</script>

<style scoped lang="scss">
@import url("../eduProcessCreation/eduCourseCustom.css");
.between {
  justify-content: space-between;
}
</style>
