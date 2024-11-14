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
              v-if="listDept.length != 0"
              :valueSelectAll="t('common.select')"
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
              v-if="listJob.length != 0"
              :valueSelectAll="t('common.select')"
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
    <div class="box_section">
      <div v-if="isLoad == 0" class="no_cnt">
        <p>{{ t("levelJobPerformance.empty") }}</p>
      </div>
      <div class="tbl tbl_col" v-else-if="listLevelOfJob.length > 0">
        <div class="dp_flex btn_group btn_end mg_b20" style="gap: 10px">
          <ExportFileExcel
            :data="dataExport"
            :fileName="t('levelJobPerformance.job.fileName')"
            :btnName="t('levelJobPerformance.student.dowload')"
            :multiHeaderFlag="true"
            :callData="true"
            ref="exportExcelRef"
            @click="dowloadExcel"
          >
          </ExportFileExcel>
        </div>
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
                직무역량
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
                직무역량
              </th>
              <th scope="col" class="ta_c">
                직무역량명
              </th>
              <th scope="col" class="ta_c">
                하위역량명
              </th>
              <th scope="col" class="ta_c">
                하위역량
              </th>
              <th scope="col" class="ta_c">
                직무역량
              </th>
            </tr>
          </thead>
          <tbody>
            <template v-for="job in listLevelOfJob" :key="job.jobSeq">
              <template
                v-for="(type, indexType) in job.listTypeNm"
                :key="type.typeNm"
              >
                <template
                  v-for="(jobAbility, indexJobAbility) in type.listJobAbility"
                  :key="jobAbility.jobAbilSeq"
                >
                  <template
                    v-for="(jobCapa, indexJobCapa) in jobAbility.listJobCapa"
                    :key="jobCapa.jobCapaUnitSeq"
                  >
                    <tr>
                      <td
                        v-if="
                          indexType === 0 &&
                          indexJobAbility === 0 &&
                          indexJobCapa === 0
                        "
                        :rowspan="job.rowSpan"
                      >
                        {{ job.jobNm }}
                      </td>
                      <td
                        v-if="indexJobAbility === 0 && indexJobCapa === 0"
                        :rowspan="type.rowSpan"
                      >
                        {{ type.typeNm }}
                      </td>
                      <td
                        v-if="indexJobCapa === 0"
                        :rowspan="jobAbility.rowSpan"
                      >
                        <div>{{ jobAbility.jobAbilNm }}</div>
                        <div>{{ jobAbility.jobAbilCd }}</div>
                      </td>
                      <td>{{ jobCapa.capaUnitNm }}</td>
                      <td>{{ formatToTwoDecimalPlaces(jobCapa.scoreJobCapa) }}</td>
                      <td
                        v-if="indexJobCapa === 0"
                        :rowspan="jobAbility.rowSpan"
                      >
                        {{ formatToTwoDecimalPlaces(jobAbility.scoreJobAbility) }}
                      </td>
                      <td
                        v-if="indexJobCapa === 0"
                        :rowspan="jobAbility.rowSpan"
                      >
                        {{ jobAbility.sbjtNm }}
                      </td>
                      <td
                        v-if="
                          indexType === 0 &&
                          indexJobAbility === 0 &&
                          indexJobCapa === 0
                        "
                        :rowspan="job.rowSpan"
                      >
                        {{ job.deptNm }}
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
import { CheckMerge, MultiHeaderData } from "@/stores/common/excel/excelData.type";
import {
  getLevelOfJobAbilityList,
  getListJob,
} from "@/stores/levelOfJobPerformance/levelOfJobAbility/levelOfJobAbility.service";
import {
  LevelOfJobAbilityListModel,
  LevelOfJobAbilitySearchModel,
  LevelOfJobInfoModel,
} from "@/stores/levelOfJobPerformance/levelOfJobAbility/levelOfJobAbility.type";

export default defineComponent({
  setup() {
    const { t } = useI18n();
    const cmn = commonStore();
    const exportExcelRef = ref();
    return { t, cmn, exportExcelRef };
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
      listLevelOfJob: [] as Array<LevelOfJobInfoModel>,
      listLevelOfJobExcel: [] as Array<LevelOfJobAbilityListModel>,
      listJob: [] as Array<CodeMngModel>,
      searchModel: {
        year: "",
        deptCd: "",
        termCd: "",
        gradeCd: "",
        jobSeq: "",
      } as LevelOfJobAbilitySearchModel,
      dataExport: [] as Array<MultiHeaderData>,
      isLoad: 0,
    };
  },
  beforeMount() {
    this.getCodeTermCd();
    this.getCodeGradeCd();
    this.getDepartment();
    this.getListJob();
    const currentYear = new Date().getFullYear();
    for (let index = 2025; index <= currentYear + 1; index++) {
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
          this.listDept.unshift({ cdId: "", cdNm: this.t("common.select"), upCdId: "dept" });
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
        this.listJob.unshift({ cdId: "", cdNm: this.t("common.select"), upCdId: "job" });
        this.cmn.setLoading(false);
      });
    },
    search() {
      if (
        !this.searchModel.deptCd ||
        !this.searchModel.gradeCd ||
        !this.searchModel.year ||
        !this.searchModel.termCd ||
        !this.searchModel.jobSeq
      ) {
        this.$alert(this.t("levelJobPerformance.job.messageWarning"));
        return;
      }
      this.isLoad++;
      this.cmn.setLoading(true);
      getLevelOfJobAbilityList(this.searchModel)
        .then((res) => {
          this.listLevelOfJob = this.calculateRowSpan(res.data.data);
          this.convertListLevelOfJobToExcel();
          this.cmn.setLoading(false);
        })
        .catch((error) => {
          this.cmn.setLoading(false);
        });
    },
    convertListLevelOfJobToExcel() {
      this.listLevelOfJobExcel = this.listLevelOfJob.flatMap((jobInfo) =>
        jobInfo.listTypeNm.flatMap((type) =>
          type.listJobAbility.flatMap((ability) =>
            ability.listJobCapa.map((capaUnit) => ({
              jobSeq: jobInfo.jobSeq,
              jobNm: jobInfo.jobNm,
              typeNm: type.typeNm,
              jobAbilSeq: ability.jobAbilSeq,
              jobAbilNm: ability.jobAbilNm,
              jobAbilCd: ability.jobAbilCd,
              jobCapaUnitSeq: capaUnit.jobCapaUnitSeq,
              capaUnitNm: capaUnit.capaUnitNm,
              scoreJobCapa: capaUnit.scoreJobCapa,
              scoreJobAbil: ability.scoreJobAbility,
              sbjtNm: ability.sbjtNm,
              deptNm: jobInfo.deptNm,
            }))
          )
        )
      );
    },
    calculateRowSpan(levels: LevelOfJobInfoModel[]): LevelOfJobInfoModel[] {
      levels.forEach((jobInfo) => {
        jobInfo.rowSpan = jobInfo.listTypeNm.reduce((sum, type) => {
          type.rowSpan = type.listJobAbility.reduce((subSum, ability) => {
            ability.rowSpan = ability.listJobCapa.length || 1;
            return subSum + ability.rowSpan;
          }, 0);
          return sum + type.rowSpan;
        }, 0);
      });
      return levels;
    },
    reset() {
      this.searchModel = {
        year: "",
        deptCd: "",
        termCd: "",
        gradeCd: "",
        jobSeq: "",
      };
    },
    dowloadExcel() {
      if (
        !this.searchModel.deptCd ||
        !this.searchModel.gradeCd ||
        !this.searchModel.year ||
        !this.searchModel.termCd ||
        !this.searchModel.jobSeq
      ) {
        this.$alert(this.t("levelJobPerformance.job.messageWarning"));
        return;
      }
      let dataInput = {} as MultiHeaderData;
      dataInput.sheetName = "sheet1";
      dataInput.data = [];
      dataInput.header = [];
      dataInput.indexCheckMerge = 2;
      dataInput.mutilCheck = [] as Array<CheckMerge>
      dataInput.mutilCheck.push({
          indexKey : 0,
          indexChild : [0,1,2,7]
        })
        dataInput.mutilCheck.push({
          indexKey : 2,
          indexChild : [5, 6]
        })
      dataInput.indexNotMerge = [3, 4];
      let header1 = [
        this.t("levelJobPerformance.job.tbl1"),
        this.t("levelJobPerformance.job.tbl2"),
        this.t("levelJobPerformance.job.tbl2"),
        this.t("levelJobPerformance.job.tbl2"),
        this.t("levelJobPerformance.job.tbl3"),
        this.t("levelJobPerformance.job.tbl3"),
        this.t("levelJobPerformance.job.tbl4"),
        this.t("levelJobPerformance.job.tbl5"),
      ];
      let header2 = [
        this.t("levelJobPerformance.job.tbl1"),
        this.t("levelJobPerformance.job.tbl6"),
        this.t("levelJobPerformance.job.tbl7"),
        this.t("levelJobPerformance.job.tbl8"),
        this.t("levelJobPerformance.job.tbl9"),
        this.t("levelJobPerformance.job.tbl10"),
        this.t("levelJobPerformance.job.tbl4"),
        this.t("levelJobPerformance.job.tbl5"),
      ];
      dataInput.header.push(header1);
      dataInput.header.push(header2);
      this.listLevelOfJobExcel.forEach((item: LevelOfJobAbilityListModel) => {
        let rowData = [];
        rowData.push(item.jobNm);
        rowData.push(item.typeNm);
        rowData.push(item.jobAbilNm + item.jobAbilCd);
        rowData.push(item.capaUnitNm);
        rowData.push(item.scoreJobCapa);
        rowData.push(item.scoreJobAbil);
        rowData.push(item.sbjtNm);
        rowData.push(item.deptNm);
        dataInput.data.push(rowData);
      });
      this.dataExport.push(dataInput);
      this.exportExcelRef.downloadExcel();
    },
    formatToTwoDecimalPlaces(number:number) {
      const numberStr = number.toString();
      const decimalIndex = numberStr.indexOf(".");

      if (decimalIndex === -1 || decimalIndex + 3 >= numberStr.length) {
          return numberStr;
      }

      return numberStr.substring(0, decimalIndex + 3);
    }
  },
});
</script>

<style scoped lang="scss">
@import url("../eduProcessCreation/eduCourseCustom.css");
</style>
