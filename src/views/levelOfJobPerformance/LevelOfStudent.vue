<template>
  <div class="box dp_block">
    <div class="box_section">
      <div class="search_box col_3">
        <ul>
          <li>
            <p>{{ t("levelJobPerformance.student.column1") }}</p>
            <SelectBoxBase
              v-model="searchModel.year"
              :id="'search1'"
              :data="listYear"
            />
          </li>
          <li>
            <p>{{ t("levelJobPerformance.student.column2") }}</p>
            <SelectBoxBase
              :id="'search2'"
              v-model="searchModel.termCd"
              :data="listTerm"
            />
          </li>
          <li>
            <p>{{ t("levelJobPerformance.student.column3") }}</p>
            <SelectBoxBase
              :id="'search3'"
              v-model="searchModel.gradeCd"
              :data="listGrade"
            />
          </li>
        </ul>
        <ul>
          <li>
            <p>{{ t("levelJobPerformance.student.column4") }}</p>
            <SelectBoxBaseSearch
              :id="'dept'"
              v-model="searchModel.deptCd"
              :name="'dept'"
              :data="listDept"
            >
            </SelectBoxBaseSearch>
          </li>
          <li>
            <p>{{ t("levelJobPerformance.student.column5") }}</p>
            <InputBase :id="'search5'" v-model="searchModel.stdNo" />
          </li>
          <li>
            <p>{{ t("levelJobPerformance.student.column6") }}</p>
            <InputBase :id="'search6'" v-model="searchModel.stdNm" />
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
      <!-- <button class="btn_round btn_lg btn_gray" @click="dowloadExcel">
        {{ t("levelJobPerformance.student.dowload") }}
      </button> -->
      <ExportFileExcel
            :data="dataExport"
            :fileName="'fileNameExport'"
            :btnName="t('levelJobPerformance.student.dowload')"
            :multiHeaderFlag="true"
            :callData="true"
            ref="exportExcelRef"
            @click="dowloadExcel"
            >
        </ExportFileExcel>
    </div>
    <div class="box_section">
      <div class="tbl tbl_col" v-if="listLevelOfStudent.length > 0">
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
          <tbody>
            <template
              v-for="(student, indexStudent) in listLevelOfStudent"
              :key="student.stdId"
            >
              <template
                v-for="(job, indexJob) in student.jobs"
                :key="job.jobSeq"
              >
                <template
                  v-for="(jobAbility, indexJobAbility) in job.jobAbilities"
                  :key="jobAbility.jobAbilSeq"
                >
                  <template
                    v-for="(
                      jobCapaUnit, indexJobCapaUnit
                    ) in jobAbility.jobCapaUnits"
                    :key="jobCapaUnit.jobCapaUnitSeq"
                  >
                    <tr>
                      <td
                        v-if="
                          indexJob === 0 &&
                          indexJobAbility === 0 &&
                          indexJobCapaUnit === 0
                        "
                        :rowspan="student.rowSpan"
                      >
                        {{ student.stdId + " - " + student.stdNm }}
                      </td>
                      <td
                        v-if="indexJobAbility === 0 && indexJobCapaUnit === 0"
                        :rowspan="job.rowSpan"
                      >
                        {{ job.jobNm }}
                      </td>
                      <td
                        :rowspan="job.rowSpan"
                        v-if="indexJobAbility === 0 && indexJobCapaUnit === 0"
                      >
                        {{ job.typeNm }}
                      </td>
                      <td
                        v-if="indexJobCapaUnit === 0"
                        :rowspan="jobAbility.rowSpan"
                      >
                        {{ jobAbility.jobAbilNm }}
                      </td>
                      <td>{{ jobCapaUnit.capaUnitNm }}</td>
                      <td>{{ jobCapaUnit.scoreJobCapa }}</td>
                      <td
                        :rowspan="jobAbility.rowSpan"
                         v-if="indexJobCapaUnit === 0"
                      >
                        {{ jobAbility.scoreJobAbility }}
                      </td>
                      <td
                        v-if="indexJobAbility === 0 && indexJobCapaUnit === 0"
                        :rowspan="job.rowSpan"
                      >
                        {{ job.scoreJob }}
                      </td>
                      <td
                        v-if="
                          indexJob === 0 &&
                          indexJobAbility === 0 &&
                          indexJobCapaUnit === 0
                        "
                        :rowspan="student.rowSpan"
                      >
                        {{ student.scoreStudent }}
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
import { getLevelOfStudentList } from "@/stores/levelOfJobPerformance/levelOfStudent/levelOfStudent.service";
import {
  LevelOfStudentListModel,
  LevelOfStudentSearchModel,
  StudentLevelOfStudent,
} from "@/stores/levelOfJobPerformance/levelOfStudent/levelOfStudent.type";
import ExportFileExcel from "@/components/common/excel/ExportFileExcel.vue";
import {MultiHeaderData } from "@/stores/common/excel/excelData.type";
import { hkdf } from "crypto";
export default defineComponent({
  setup() {
    const { t } = useI18n();
    const cmn = commonStore();
    const exportExcelRef = ref()
    return { t, cmn ,exportExcelRef};
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
      searchModel: {
        year: "",
        termCd: "",
        gradeCd: "",
        deptCd: "",
        stdNo: "",
        stdNm: "",
      } as LevelOfStudentSearchModel,
      listLevelOfStudent: [] as Array<StudentLevelOfStudent>,
      listLevelOfStudentExcel: [] as LevelOfStudentListModel[],
      dataExport: [] as Array<MultiHeaderData>
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
    search() {
      if (
        !this.searchModel.deptCd ||
        !this.searchModel.gradeCd ||
        !this.searchModel.year ||
        !this.searchModel.termCd
      ) {
        this.$alert(this.t("levelJobPerformance.messageWarning"));
        return;
      }
      this.cmn.setLoading(true);
      getLevelOfStudentList(this.searchModel).then((res) => {
        this.listLevelOfStudent = this.transformToTreeStructure(res.data.data);
        this.cmn.setLoading(false);
      });
    },
    transformToTreeStructure(
      data: LevelOfStudentListModel[]
    ): StudentLevelOfStudent[] {
      const studentMap = new Map<string, StudentLevelOfStudent>();

      data.forEach((item) => {
        if (!studentMap.has(item.stdId)) {
          studentMap.set(item.stdId, {
            stdId: item.stdId,
            stdNm: item.stdNm,
            jobs: [],
            scoreStudent: 0,
            rowSpan: 0,
          });
        }

        const student = studentMap.get(item.stdId)!;

        let job = student.jobs.find((j) => j.jobSeq === item.jobSeq);
        if (!job) {
          job = {
            jobSeq: item.jobSeq,
            jobNm: item.jobNm,
            typeNm: item.typeNm,
            jobAbilities: [],
            scoreJob: 0,
            rowSpan: 0,
          };
          student.jobs.push(job);
        }

        let jobAbility = job.jobAbilities.find(
          (ja) => ja.jobAbilSeq === item.jobAbilSeq
        );
        if (!jobAbility) {
          jobAbility = {
            jobAbilSeq: item.jobAbilSeq,
            jobAbilNm: item.jobAbilNm,
            jobCapaUnits: [],
            scoreJobAbility: 0,
            rowSpan: 0,
            typeNm: item.typeNm,
          };
          job.jobAbilities.push(jobAbility);
        } else {
          const existingTypes = new Set<string>(
            jobAbility.typeNm.split(",").map((type) => type.trim())
          );
          existingTypes.add(item.typeNm);
          jobAbility.typeNm = Array.from(existingTypes).join(", ");
        }

        jobAbility.jobCapaUnits.push({
          jobCapaUnitSeq: item.jobCapaUnitSeq,
          capaUnitNm: item.capaUnitNm,
          scoreJobCapa: item.scoreJobCapa,
        });
      });

      studentMap.forEach((student) => {
        student.jobs.forEach((job) => {
          let totalScoreJobAbility = 0;

          job.jobAbilities.forEach((jobAbility) => {
            jobAbility.rowSpan = jobAbility.jobCapaUnits.length;

            const totalJobCapaScore = jobAbility.jobCapaUnits.reduce(
              (sum, unit) => sum + unit.scoreJobCapa,
              0
            );
            jobAbility.scoreJobAbility =
              jobAbility.jobCapaUnits.length > 0
                ? totalJobCapaScore / jobAbility.jobCapaUnits.length
                : 0;
            totalScoreJobAbility += jobAbility.scoreJobAbility;
          });

          job.rowSpan = job.jobAbilities.reduce(
            (sum, jobAbility) => sum + jobAbility.rowSpan,
            0
          );
          job.scoreJob =
            job.jobAbilities.length > 0
              ? totalScoreJobAbility / job.jobAbilities.length
              : 0;
        });

        student.rowSpan = student.jobs.reduce(
          (sum, job) => sum + job.rowSpan,
          0
        );
        student.scoreStudent =
          student.jobs.length > 0
            ? student.jobs.reduce((sum, job) => sum + job.scoreJob, 0) /
              student.jobs.length
            : 0;
      });

      const listLevelOfStudentExcel: LevelOfStudentListModel[] = [];

      studentMap.forEach((student) => {
        student.jobs.forEach((job) => {
          job.jobAbilities.forEach((jobAbility) => {
            jobAbility.jobCapaUnits.forEach((capaUnit) => {
              listLevelOfStudentExcel.push({
                stdId: student.stdId,
                stdNm: student.stdNm,
                jobSeq: job.jobSeq,
                jobNm: job.jobNm,
                typeNm: job.typeNm,
                jobAbilSeq: jobAbility.jobAbilSeq,
                jobAbilNm: jobAbility.jobAbilNm,
                jobCapaUnitSeq: capaUnit.jobCapaUnitSeq,
                capaUnitNm: capaUnit.capaUnitNm,
                scoreJobCapa: capaUnit.scoreJobCapa,
                scoreJobAbility: jobAbility.scoreJobAbility,
                scoreJob: job.scoreJob,
                scoreStudent: student.scoreStudent,
              });
            });
          });
        });
      });

      this.listLevelOfStudentExcel = listLevelOfStudentExcel;

      return Array.from(studentMap.values());
    },
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
    reset() {
      this.searchModel = {
        year: "",
        termCd: "",
        gradeCd: "",
        deptCd: "",
        stdNo: "",
        stdNm: "",
      };
    },
    dowloadExcel() {
      let dataInput = {} as MultiHeaderData
      dataInput.sheetName = 'sheet1'
      dataInput.data = []
      dataInput.header = []
      dataInput.indexCheckMerge = 0
      dataInput.indexNotMerge = [4,5]
      let header1 = [this.t("levelJobPerformance.student.tbl1"), this.t("levelJobPerformance.student.tbl2"),this.t("levelJobPerformance.student.tbl3"),this.t("levelJobPerformance.student.tbl3"),this.t("levelJobPerformance.student.tbl3"),this.t("levelJobPerformance.student.tbl4"), this.t("levelJobPerformance.student.tbl4"),this.t("levelJobPerformance.student.tbl4"),this.t("levelJobPerformance.student.tbl4")]
      let header2 = [this.t("levelJobPerformance.student.tbl1"), this.t("levelJobPerformance.student.tbl2"),this.t("levelJobPerformance.student.tbl5"),this.t("levelJobPerformance.student.tbl6"),this.t("levelJobPerformance.student.tbl7"),this.t("levelJobPerformance.student.tbl8"), this.t("levelJobPerformance.student.tbl9"),this.t("levelJobPerformance.student.tbl10"),this.t("levelJobPerformance.student.tbl11")]
      // let header1 = [this.t("levelJobPerformance.student.tbl1"), this.t("levelJobPerformance.student.tbl2")]
      // let header2 = [this.t("levelJobPerformance.student.tbl1"), this.t("levelJobPerformance.student.tbl2")]
      dataInput.header.push(header1)
      dataInput.header.push(header2)
      this.listLevelOfStudentExcel.forEach((item :LevelOfStudentListModel)=>{
        let rowData = []
        let student = `${item.stdId}-${item.stdNm}`
        rowData.push(student)
        rowData.push(item.jobNm)
        rowData.push(item.typeNm)
        rowData.push(item.jobAbilNm)
        rowData.push(item.capaUnitNm)
        rowData.push(item.scoreJobCapa)
        rowData.push(item.scoreJobAbility)
         rowData.push(item.scoreJob)
        rowData.push(item.scoreStudent)
        dataInput.data.push(rowData)
        
      })
      this.dataExport.push(dataInput)
      this.exportExcelRef.downloadExcel()
      console.log(dataInput)
    },
  },
});
</script>

<style scoped lang="scss">
@import url("../eduProcessCreation/eduCourseCustom.css");
</style>
