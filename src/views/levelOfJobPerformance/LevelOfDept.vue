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
              :id="'deptCd'"
              :name="'deptCd'"
              :data="listDept"
              v-if="listDept.length != 0"
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
      <div class="tbl tbl_col" v-else-if="listLevelOfDept.length > 0">
        <div class="dp_flex jc_end al_center box_title_sm">
          <ExportFileExcel
            :data="dataExport"
            :fileName="t('levelJobPerformance.dept.fileName')"
            :btnName="t('levelJobPerformance.student.dowload')"
            :multiHeaderFlag="true"
            :callData="true"
            ref="exportExcelRef"
            @click="dowloadExcel"
          >
          </ExportFileExcel>
        </div>
        <div class="dp_flex between al_center box_title_sm">
          <p class="section_tit_xs"></p>
          <p class="section_tit_xs">
            {{ t("levelJobPerformance.messalert") }}
          </p>
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
              <th class="ta_c" rowspan="2">
                {{ t("levelJobPerformance.job.tbl1") }}
              </th>
              <th class="ta_c" colspan="3">
                직무역량
              </th>
              <th class="ta_c" colspan="2">
                {{ t("levelJobPerformance.job.tbl3") }}
              </th>
              <th class="ta_c" rowspan="2">
                {{ t("levelJobPerformance.job.tbl4") }}
              </th>
            </tr>
            <tr>
              <th class="ta_c">{{ t("levelJobPerformance.job.tbl5") }}</th>
              <th class="ta_c">직무역량명</th>
              <th class="ta_c">하위역량명</th>
              <th class="ta_c">하위역량</th>
              <th class="ta_c">직무역량</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="job in listLevelOfDept" :key="job.jobSeq">
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
                      <td>{{ jobCapa.scoreJobCapa }}</td>
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
import {
  CheckMerge,
  MultiHeaderData,
} from "@/stores/common/excel/excelData.type";
import { getLevelOfDeptList } from "@/stores/levelOfJobPerformance/levelOfDept/levelOfDept.service";
import {
  LevelOfDeptJobInfoModel,
  LevelOfDeptListModel,
  LevelOfDeptSearchModel,
} from "@/stores/levelOfJobPerformance/levelOfDept/levelOfDept.type";

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
      listDept: [] as Array<CodeMngModel>,
      listLevelOfDept: [] as Array<LevelOfDeptJobInfoModel>,
      listLevelOfDeptExcel: [] as Array<LevelOfDeptListModel>,
      searchModel: {
        year: "",
        deptCd: "",
        termCd: "",
        gradeCd: "",
      } as LevelOfDeptSearchModel,
      dataExport: [] as Array<MultiHeaderData>,
      isLoad: 0,
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
      this.cmn.setLoading(true);
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
          this.cmn.setLoading(false);
        })
        .catch(() => {
          throw new Error(MESSAGE_ERROR_API);
        });
    },
    search() {
      if (
        !this.searchModel.deptCd ||
        !this.searchModel.gradeCd ||
        !this.searchModel.year ||
        !this.searchModel.termCd
      ) {
        this.$alert(this.t("levelJobPerformance.dept.messageWarning"));
        return;
      }      
      this.isLoad++;
      this.cmn.setLoading(true);
      getLevelOfDeptList(this.searchModel)
        .then((res) => {
          this.listLevelOfDept = this.calculateRowSpan(res.data.data);
          this.convertListLevelOfDeptToExcel();
          this.cmn.setLoading(false);
        })
        .catch((error) => {
          this.cmn.setLoading(false);
        });
    },
    convertListLevelOfDeptToExcel() {
      this.listLevelOfDeptExcel = this.listLevelOfDept.flatMap((jobInfo) =>
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
            }))
          )
        )
      );
    },
    calculateRowSpan(
      levels: LevelOfDeptJobInfoModel[]
    ): LevelOfDeptJobInfoModel[] {
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
      };
    },
    dowloadExcel() {
      if (
        !this.searchModel.deptCd ||
        !this.searchModel.gradeCd ||
        !this.searchModel.year ||
        !this.searchModel.termCd
      ) {
        this.$alert(this.t("levelJobPerformance.dept.messageWarning"));
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
        indexChild: [0, 1, 2],
      });
      dataInput.mutilCheck.push({
        indexKey: 2,
        indexChild: [5, 6],
      });
      dataInput.indexNotMerge = [3, 4];
      let header1 = [
        this.t("levelJobPerformance.dept.tbl1"),
        this.t("levelJobPerformance.dept.tbl2"),
        this.t("levelJobPerformance.dept.tbl2"),
        this.t("levelJobPerformance.dept.tbl2"),
        this.t("levelJobPerformance.dept.tbl3"),
        this.t("levelJobPerformance.dept.tbl3"),
        this.t("levelJobPerformance.dept.tbl4"),
      ];
      let header2 = [
        this.t("levelJobPerformance.dept.tbl1"),
        this.t("levelJobPerformance.dept.tbl5"),
        this.t("levelJobPerformance.dept.tbl6"),
        this.t("levelJobPerformance.dept.tbl7"),
        this.t("levelJobPerformance.dept.tbl8"),
        this.t("levelJobPerformance.dept.tbl9"),
        this.t("levelJobPerformance.dept.tbl4"),
      ];
      dataInput.header.push(header1);
      dataInput.header.push(header2);
      this.listLevelOfDeptExcel.forEach((item: LevelOfDeptListModel) => {
        let rowData = [];
        rowData.push(item.jobNm);
        rowData.push(item.typeNm);
        rowData.push(item.jobAbilNm + item.jobAbilCd);
        rowData.push(item.capaUnitNm);
        rowData.push(item.scoreJobCapa);
        rowData.push(item.scoreJobAbil);
        rowData.push(item.sbjtNm);
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
.between {
  justify-content: space-between;
}
</style>
