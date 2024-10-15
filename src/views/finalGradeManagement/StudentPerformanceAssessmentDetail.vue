<template>
  <section id="content" class="content_wrapper grid_content" tabindex="0">
    <Breadcrumb
      :pageTitle="t('finalGradeManagement.modalStuPerformance.title')"
    ></Breadcrumb>

    <div class="box dp_block">
      <div class="box_section">
        <strong class="title-bold">{{
          t("finalGradeManagement.modalStuPerformance.header")
        }}</strong>
        <div class="tbl tbl_row mt-10 mb-10">
          <table>
            <colgroup>
              <col style="width: 20%" />
              <col style="width: 30%" />
              <col style="width: 20%" />
              <col style="width: 30%" />
            </colgroup>
            <tbody>
              <tr>
                <th scope="row">
                  {{ t("finalGradeManagement.modalStuPerformance.courseName") }}
                </th>
                <td class="td_input" colspan="1">
                  {{ sbjtInfo.sbjtNm }}
                </td>
                <th scope="row">
                  {{ t("finalGradeManagement.modalStuPerformance.lesson") }}
                </th>
                <td class="td_input" colspan="11">{{ sbjtInfo.deptNm }}</td>
              </tr>
              <tr>
                <th scope="row">
                  {{ t("finalGradeManagement.modalStuPerformance.year") }}
                </th>
                <td>
                  {{ sbjtInfo.yearTerm }}
                </td>
                <th scope="row">
                  {{ t("finalGradeManagement.modalStuPerformance.grade") }}
                </th>
                <td>{{ sbjtInfo.gradeDiv }}</td>
              </tr>
              <tr>
                <th scope="row">
                  {{ t("finalGradeManagement.modalStuPerformance.credit") }}
                </th>
                <td>
                  {{ sbjtInfo.acqJpaTotalHour }}
                </td>
                <th scope="row">
                  {{ t("finalGradeManagement.modalStuPerformance.theory") }}
                </th>
                <td>{{ sbjtInfo.thryPrac }}</td>
              </tr>
              <tr>
                <th scope="row">
                  {{ t("finalGradeManagement.modalStuPerformance.distin") }}
                </th>
                <td>
                  {{ sbjtInfo.sustDivNm }}
                </td>
                <th scope="row">
                  {{
                    t("finalGradeManagement.modalStuPerformance.professCharge")
                  }}
                </th>
                <td>{{ sbjtInfo.staffNm }}</td>
              </tr>
              <tr>
                <th scope="row">
                  {{
                    t("finalGradeManagement.modalStuPerformance.numberStudent")
                  }}
                </th>
                <td>
                  <span>{{ sbjtInfo.numStudent }}</span>
                </td>
                <th scope="row">
                  {{ t("finalGradeManagement.modalStuPerformance.evaluation") }}
                </th>
                <td>{{ sbjtInfo.regDate }}</td>
              </tr>
            </tbody>
          </table>
          <p class="title-bold mt-10">
            {{ t("finalGradeManagement.modalStuPerformance.header1") }}
          </p>
          <div class="title-modal">
            <ExportFileExcel
              :data="handClickExport()"
              :fileName="fileNameExport"
              :btnName="nameOfbtn"
              :multiHeaderFlag="true"
            >
              {{ t("finalGradeManagement.modalStuPerformance.download") }}
            </ExportFileExcel>
          </div>
          <div class="tbl tbl_col tbl_scroll scrollx_tbl_xs">
            <table>
              <colgroup>
                <col style="width: 5%" />
                <col style="width: 5%" />
                <col style="width: 7%" />
                <col style="width: 5%" />
                <col style="width: 5%" />
                <!-- total total -->
                <col style="width: 7%" />
                <!-- v-for -->
                <col style="width: 5%" v-for="abi1 in ability1" />
                <!-- total -->
                <col style="width: 7%" />

                <col style="width: 5%" v-for="abi2 in ability2" />
                <!-- total  -->
                <col style="width: 7%" />
              </colgroup>
              <thead>
                <tr>
                  <th>
                    {{ t("finalGradeManagement.modalStuPerformance.number") }}
                  </th>
                  <th>
                    {{ t("finalGradeManagement.modalStuPerformance.grade") }}
                  </th>
                  <th>
                    {{
                      t(
                        "finalGradeManagement.modalStuPerformance.studentNumber"
                      )
                    }}
                  </th>
                  <th>
                    {{ t("finalGradeManagement.modalStuPerformance.name") }}
                  </th>
                  <th>
                    {{
                      t("finalGradeManagement.modalStuPerformance.attendance")
                    }}
                  </th>
                  <th>
                    {{
                      t("finalGradeManagement.modalStuPerformance.totalEval")
                    }}
                  </th>
                  <th :colspan="ability1.length">
                    {{ t("finalGradeManagement.modalStuPerformance.1st") }}
                  </th>
                  <th>
                    {{ t("finalGradeManagement.modalStuPerformance.subtotal") }}
                  </th>
                  <th :colspan="ability2.length">
                    {{ t("finalGradeManagement.modalStuPerformance.2st") }}
                  </th>
                  <th>
                    {{ t("finalGradeManagement.modalStuPerformance.subtotal") }}
                  </th>
                </tr>
                <tr>
                  <th :colspan="ability1.length + ability2.length + 1"></th>
                  <th v-for="abi1 in ability1">
                    {{ abi1.jobAbilNm }}
                  </th>
                  <th></th>
                  <th v-for="abi2 in ability2">
                    {{ abi2.jobAbilNm }}
                  </th>
                  <th></th>
                </tr>
                <tr>
                  <th :colspan="ability1.length + ability2.length + 1"></th>
                  <th v-for="abi1 in ability1">
                    {{ abi1.capaUnitNm }}
                  </th>
                  <th></th>
                  <th v-for="abi2 in ability2">
                    {{ abi2.capaUnitNm }}
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in studentList" :key="index">
                  <td>{{ item.rowNum }}</td>
                  <td>{{ item.stdId }}</td>
                  <td>{{ item.stdNm }}</td>
                  <td>{{ item.shregStsNm }}</td>
                  <td>{{ item.attendScore }}</td>
                  <td>
                    <InputBase
                      :id="`totalAll_${index}`"
                      :value="calculateTotal1(item) + calculateTotal2(item)"
                      readonly
                    />
                  </td>
                  <td v-for="(abi1, idx1) in ability1" :key="idx1">
                    <InputBase
                      :id="`${idx1}_${index}`"
                      v-model="item.jobCapaUnitList[idx1].score"
                      @input="updateTotals(item, idx1)"
                      required
                    />
                  </td>

                  <td>
                    <InputBase
                      :id="`total1_${index}`"
                      :value="calculateTotal1(item)"
                      readonly
                    />
                  </td>

                  <td v-for="(abi2, idx2) in ability2" :key="idx2">
                    <InputBase
                      :id="`${idx2}_${index}`"
                      v-model="
                        item.jobCapaUnitList[idx2 + ability1.length].score
                      "
                      @input="updateTotals(item, idx2 + ability1.length)"
                      required
                    />
                  </td>

                  <td>
                    <InputBase
                      :id="`total2_${index}`"
                      :value="calculateTotal2(item)"
                      readonly
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="title-modal">
          <button
            v-if="sbjtInfo.tempSaveYn == 'Y'"
            type="button"
            class="btn_round btn_lg btn_primary mg_l5"
            @click="saveTemp()"
          >
            {{ t("finalGradeManagement.modalStuPerformance.temporaryStorage") }}
          </button>
          <button
            type="button"
            class="btn_round btn_lg btn_gray mg_l5"
            @click="complete()"
          >
            {{ t("finalGradeManagement.modalStuPerformance.save") }}
          </button>
          <button
            type="button"
            class="btn_round btn_lg btn_gray mg_l5"
            @click="back()"
          >
            {{ t("finalGradeManagement.modalStuPerformance.inventory") }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { abilityWorkStore } from "@/stores/abilityWorkStudent";
import { SUCCSESS_STATUS } from "@/constants/screen.const";
import { useI18n } from "vue-i18n";
import {
  AbilityWorkStdResponseDTO,
  JobCapaUnitDTO,
  SubjectInfoDTO,
  StudentInfoDTO,
  UserJobPerformEvalReqDTO,
} from "@/stores/abilityWorkStudent/abilityWorkStudent.type";
import InputBase from "@/components/common/input/InputBase.vue";
import { createUserJob } from "@/stores/abilityWorkStudent/abilityWorkStudent.service";
import { SCREEN } from "@/router/screen";
import { ExcelData } from "@/stores/common/excel/excelData.type";
import { STATUS_NO } from "@/constants/common.const";
import Swal from "sweetalert2";
import { STATUS_YES } from "@/constants/common.const";
import { commonStore } from "@/stores/common";
import { MultiHeaderData } from "@/stores/common/excel/excelData.type";

export default defineComponent({
  setup() {
    const { t } = useI18n();
    const abilityWorkStr = abilityWorkStore();
    const cmnStore = commonStore();
    return {
      t,
      abilityWorkStr,
      cmnStore,
    };
  },
  data() {
    return {
      abilityWork: {} as AbilityWorkStdResponseDTO,
      sbjtInfo: {} as SubjectInfoDTO,
      lectCd: "20240001",
      abilityList: [] as Array<JobCapaUnitDTO>,
      ability1: [] as Array<JobCapaUnitDTO>,
      ability2: [] as Array<JobCapaUnitDTO>,
      studentList: [] as Array<StudentInfoDTO>,
      dataForm: {} as UserJobPerformEvalReqDTO,
      fileNameExport: "CQI lookup",
      nameOfbtn: "교과목 프로파일 조회",
    };
  },
  async beforeMount() {
    await this.getSbjtInfo();

    if (this.sbjtInfo.userJobPerformEvalSeq) {
      await this.getDetailAbilityWork();
    }
  },
  mounted() {
    this.studentList.forEach((item: { total1: any; total2: any }) => {
      item.total1 = this.calculateTotal1(item);
      item.total2 = this.calculateTotal2(item);
    });
  },
  methods: {
    async getSbjtInfo() {
      await this.abilityWorkStr.fetchSbjtInfo({ lectCd: this.lectCd });

      if (
        this.abilityWorkStr.status &&
        this.abilityWorkStr.status == SUCCSESS_STATUS
      ) {
        this.abilityWork = this.abilityWorkStr.sbjtInfo;
        this.sbjtInfo = this.abilityWork.subjectInfo;
        this.abilityList = this.abilityWork.jobCapaUnitList;
        this.studentList = this.abilityWork.studentInfoList;

        if (this.abilityList.length > 0) {
          for (let i = 0; i < 3; i++) {
            this.ability1.push(this.abilityList[i]);
          }

          for (let i = 3; i < 5; i++) {
            this.ability2.push(this.abilityList[i]);
          }
        }
      }
    },
    async getDetailAbilityWork() {
      await this.abilityWorkStr.fetchDetail({ lectCd: this.lectCd });

      if (
        this.abilityWorkStr.status &&
        this.abilityWorkStr.status == SUCCSESS_STATUS
      ) {
        this.studentList = this.abilityWorkStr.detailAbilityWork;
      }
    },
    showAlert(message: string) {
      Swal.fire({
        text: message,
        type: "warning",
        showCancelButton: false,
        confirmButtonText: this.t("common.confirm"),
      });
    },
    complete() {
      if (!this.cmnStore.check) {
        this.save(STATUS_NO);
      } else {
        this.showAlert(this.t("common.messageValidateRequired"));
      }
    },
    saveTemp() {
      this.save(STATUS_YES);
    },
    save(tempYn: string) {
      Swal.fire({
        text: this.t("common.message.save"),
        type: "warning",
        showCancelButton: true,
        confirmButtonText: this.t("common.delete"),
        cancelButtonText: this.t("common.cancel"),
      }).then(async (result) => {
        if (result.isConfirmed) {
          this.dataForm.lectCd = this.lectCd;
          this.dataForm.tempSaveYn = tempYn;
          this.dataForm.studentInfoList = this.studentList;
          this.dataForm.userJobPerformEvalSeq =
            this.sbjtInfo.userJobPerformEvalSeq;

          createUserJob(this.dataForm).then((res) => {
            this.showAlert(this.t("common.message.saveSuccess"));
            this.back();
          });
        }
      });
    },
    back() {
      this.$router.push({ path: SCREEN.studentPerformanceAssessment.path });
    },
    calculateTotal1(item) {
      return item.jobCapaUnitList
        .slice(0, this.ability1.length)
        .reduce((sum, unit) => sum + Number(unit.score || 0), 0);
    },
    calculateTotal2(item) {
      return item.jobCapaUnitList
        .slice(this.ability1.length)
        .reduce((sum, unit) => sum + Number(unit.score || 0), 0);
    },
    calculateAll() {},
    updateTotals(item, index) {
      item.total1 = this.calculateTotal1(item);
      item.total2 = this.calculateTotal2(item);
    },
    handClickExport() {
      let rowExcel = [] as Array<Array<any>>;
      let header = [] as Array<Array<any>>;
      let rowExcelHeader1 = [] as Array<any>;
      let rowExcelHeader2 = [] as Array<any>;
      let rowExcelHeader3 = [] as Array<any>;

      // 1
      rowExcelHeader1.push("번호");
      rowExcelHeader1.push("학년-분반");
      rowExcelHeader1.push("학번");
      rowExcelHeader1.push("이름");
      rowExcelHeader1.push("출석(00%)");
      rowExcelHeader1.push("평가 합계(00%)");
      this.ability1.forEach((abi1) => {
        rowExcelHeader1.push("1차");
      });

      rowExcelHeader1.push("소계");
      this.ability2.forEach((abi2) => {
        rowExcelHeader1.push("2차");
      });
      rowExcelHeader1.push("소계");

      // 2
      rowExcelHeader2.push("번호");
      rowExcelHeader2.push("학년-분반");
      rowExcelHeader2.push("학번");
      rowExcelHeader2.push("이름");
      rowExcelHeader2.push("출석(00%)");
      rowExcelHeader2.push("평가 합계(00%)");
      this.ability1.forEach((abi1) => {
        rowExcelHeader2.push(abi1.capaUnitNm);
      });
      rowExcelHeader2.push("소계");
      this.ability2.forEach((abi2) => {
        rowExcelHeader2.push(abi2.capaUnitNm);
      });
      rowExcelHeader2.push("소계");

      // 3
      rowExcelHeader3.push("번호");
      rowExcelHeader3.push("학년-분반");
      rowExcelHeader3.push("학번");
      rowExcelHeader3.push("이름");
      rowExcelHeader3.push("출석(00%)");
      rowExcelHeader3.push("평가 합계(00%)");
      this.ability1.forEach((abi1) => {
        rowExcelHeader3.push(abi1.jobAbilNm);
      });
      rowExcelHeader3.push("소계");
      this.ability2.forEach((abi2) => {
        rowExcelHeader3.push(abi2.jobAbilNm);
      });
      rowExcelHeader3.push("소계");

      header.push(rowExcelHeader1);
      header.push(rowExcelHeader2);
      header.push(rowExcelHeader3);

      this.studentList.forEach((item, index) => {
        let colExcel = [] as Array<any>;
        colExcel.push(item.rowNum);
        colExcel.push(item.stdId);
        colExcel.push(item.stdNm);
        colExcel.push(item.shregStsNm);
        colExcel.push(item.attendScore);
        colExcel.push(this.calculateTotal1(item) + this.calculateTotal2(item));
        this.ability1.forEach((abi1, idx1) => {
          colExcel.push(item.jobCapaUnitList[idx1].score);
        });
        colExcel.push(this.calculateTotal1(item));

        this.ability2.forEach((abi2, idx2) => {
          colExcel.push(item.jobCapaUnitList[idx2].score);
        });
        colExcel.push(this.calculateTotal2(item));

        rowExcel.push(colExcel);
      });
      return [
        { sheetName: "sheet1", data: rowExcel, header: header },
      ] as Array<MultiHeaderData>;
    },
  },
});
</script>
<style>
.title-modal {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 10px;
  margin-top: 10px;
}
.title-bold {
  font-weight: bold;
  font-weight: 600;
  font-size: 2rem;
}
</style>
