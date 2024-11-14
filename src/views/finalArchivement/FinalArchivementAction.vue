<template>
  <section id="content" class="content_wrapper grid_content" tabindex="0">
    <Breadcrumb
      :pageTitle="pageTitle"
      :breadcrumbItems="breadcrumbItems"
    ></Breadcrumb>
    <div class="search_box">
      <div class="search_section">
        <p class="box_title_sm">{{ t("finalArchi.action.titleSub1") }}</p>
        <div class="tbl tbl_col tbl_scroll scrollx_tbl_xs">
          <table class="tbl_col">
            <caption>
              table col scroll
            </caption>
            <colgroup>
              <col style="width: 8%" />
              <col style="width: 7%" />
              <col style="width: 7%" />
              <col style="width: 7%" />
              <col style="width: 7%" />
              <col style="width: 7%" />
              <col style="width: 7%" />
              <col style="width: 7%" />
              <col style="width: 7%" />
              <col style="width: 7%" />
              <col style="width: 7%" />
              <col style="width: 7%" />
              <col style="width: 7%" />
              <col style="width: 7%" />
            </colgroup>
            <thead>
              <tr>
                <th scope="col">{{ t("finalArchi.action.col1_1") }}</th>
                <th scope="col">{{ t("finalArchi.action.col1_2") }}</th>
                <th scope="col">{{ t("finalArchi.action.col1_3") }}</th>
                <th scope="col" v-for="(item,index) in gradeCounts" :key="item.grade" >
                  {{ item.grade}}
                </th>                 
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  v-if="finalAchiDetailModel.evalType == EVAL_TYPE_01"
                  class="score-cell"
                >
                {{ t("finalArchi.action.checkTil1") }}
                </td>
                <td v-else class="score-cell">
                  {{ t("finalArchi.action.checkTil2") }}
                </td>
                <td class="score-cell">
                  {{ mediScore }}
                </td>
                <td class="score-cell">
                  {{ finalAchiDetailModel.cntStd }}
                </td>
                <td class="score-cell" v-for="(item,index) in gradeCounts" :key="item.grade" >
                  {{ item.count }}<br />
                  {{ item.percentage }}
                </td>  
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="search_box">
      <div class="search_section">
        <p class="box_title_sm">
          2.{{ sbjtNm }}({{ sbjtCd }}) {{ yearEdu }}학년도 {{ gradeNm }}
          {{ termNm }} {{ divNm }}반({{ staffNm }}) 최종성적관리
        </p>
        <div class="btn_group btn_end score-cell">
          <button
            type="button"
            class="btn_round btn_lg btn_blue"
            :data="handClickRp()"
            :btnName="nameOfbtnRp"
          >
            {{ t("finalArchi.list.downloadRp") }}
          </button>

          <div class="search_btnarea">
            <ExportFileExcel
              :data="handClickExport()"
              :fileName="fileNameExport"
              :btnName="nameOfbtn"
            >
              {{ t("finalArchi.list.downloadExcel") }}
            </ExportFileExcel>
          </div>
        </div>
        <div class="tbl tbl_col tbl_scroll scrollx_tbl_xs">
          <table class="tbl_col">
            <caption>
              table col scroll
            </caption>
            <colgroup>
              <col style="width: 5%" />
              <col style="width: 7%" />
              <col style="width: 7%" />
              <col style="width: 7%" />
              <col style="width: 5%" />
              <col style="width: 5%" />
              <col style="width: 3%" v-for="index in sizeScore" />
              <col style="width: 5%" />
              <col style="width: 7%" />
              <col style="width: 5%" />
              <col style="width: 5%" />
              <col style="width: 4%" />
              <col style="width: 5%" />
              <col style="width: 7%" />
            </colgroup>
            <thead>
              <tr>
                <th scope="col">{{ t("finalArchi.action.col2_1") }}</th>
                <th scope="col">{{ t("finalArchi.action.col2_2") }}</th>
                <th scope="col">{{ t("finalArchi.action.col2_3") }}</th>
                <th scope="col">{{ t("finalArchi.action.col2_4") }}</th>
                <th scope="col">{{ t("finalArchi.action.col2_5") }}</th>
                <th scope="col">{{ t("finalArchi.action.col2_6") }}</th>
                <th scope="col" v-for="index in sizeScore">{{ index }}차</th>
                <th scope="col">{{ t("finalArchi.action.col2_9") }}</th>
                <th scope="col">{{ t("finalArchi.action.col2_10") }}</th>
                <th scope="col">{{ t("finalArchi.action.col2_11") }}</th>
                <th scope="col">{{ t("finalArchi.action.col2_12") }}</th>
                <th scope="col">{{ t("finalArchi.action.col2_13") }}</th>
                <th scope="col">{{ t("finalArchi.action.col2_14") }}</th>
                <th scope="col">{{ t("finalArchi.action.col2_15") }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in arrEnd">
                <td>{{ item.rowNum }}</td>
                <td>{{ item.gradeNm }}</td>
                <td>{{ item.stdId }}</td>
                <td>{{ item.stdNm }}</td>
                <td>{{ item.divNm }}</td>
                <td>{{ item.shregStsNm }}</td>
                <td
                  v-for="(itemScore, indexScore) in convertedData[index]
                    .scoreList"
                  :key="itemScore.stdId"
                >
                  {{ itemScore ? itemScore : "-" }}
                </td>
                <td>{{ item.total }}</td>
                <td>{{ item.level }}</td>
                <td>{{ item.attendScore }}</td>
                <td>{{ item.finalScore }}</td>
                <td>{{ item.rank }}</td>
                <td>{{ item.rate }}</td>
                <td>{{ item.finalScore }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="btn_group btn_end">
      <div class="btn_area">
        <button
          type="button"
          class="btn_round btn_lg btn_white"
          @click="back()"
        >
          {{ t("common.list") }}
        </button>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import type {
  FinalAchiRltModel,
  FinalAchiMngModel,
  FinalAchiDetailModel,
  LectInfoIdModel,
  UserJobModel,
  StdScoreListModel,
} from "../../stores/finalArchivement/finalArchivement.type";
import { getDataDetail } from "@/stores/finalArchivement/finalArchivement.service";
import { commonStore } from "@/stores/common";
import LoaddingComponent from "@/components/common/loading/LoaddingComponent.vue";
import { defineComponent, ref } from "vue";
import { MESSAGE_ERROR_API } from "@/constants/common.const";
import { SCREEN } from "../../router/screen";
import {
  STATUS_YES,
  STATUS_NO,
  EVAL_TYPE_01,
} from "../../constants/common.const";
import type { ExcelData } from "../../stores/common/excel/excelData.type";

export default defineComponent({
  components: {
    LoaddingComponent,
  },
  setup() {
    const { t } = useI18n();
    const cmn = commonStore();
    const lectInfoIdModel = {} as LectInfoIdModel;
    const finalAchiDetailModel = {} as FinalAchiDetailModel;
    const finalAchiMngModel = {} as FinalAchiMngModel;
    const finalAchiRltModel = {} as FinalAchiRltModel;
    const stdScoreListModel = {} as StdScoreListModel;
    const arrStdScoreListModel = ref([]);
    const arrCntScore = ref([]);
    const arrFinalAchiMngModel = ref([]);
    const router = useRouter();
    const userJobModel = {} as UserJobModel;
    const STS_NO = STATUS_NO;
    const pageTitle = t("finalArchi.action.titleMainAdmin");
    const breadcrumbItems = [] as any;
    return {
      t,
      cmn,
      lectInfoIdModel,
      finalAchiDetailModel,
      finalAchiMngModel,
      finalAchiRltModel,
      arrFinalAchiMngModel,
      router,
      userJobModel,
      STS_NO,
      pageTitle,
      breadcrumbItems,
      stdScoreListModel,
      arrCntScore,
      arrStdScoreListModel,
    };
  },
  data() {
    return {
      id: "",
      userJobPerformEvalSeq: "",
      finalGradeConfrmYn: "",
      messConfirm: "",
      staffNm: "",
      divNm: "",
      yearEdu: "",
      sbjtCd: "",
      sbjtNm: "",
      termNm: "",
      gradeNm: "",
      messConfirmSuccess: "",
      convertedData: [],
      sizeScore: 0,
      arrFinalAchiMngCus: [],
      arrEnd: [],
      nameOfbtn: this.t("finalArchi.list.downloadExcel"),
      fileNameExport: "공지사항",
      nameOfbtnRp: this.t("finalArchi.list.downloadRp"),
      mediScore: 0,
      gradeCounts : [
        { grade: "A+", count: 0, percentage: 0 },
        { grade: "A0", count: 0, percentage: 0 },
        { grade: "B+", count: 0, percentage: 0 },
        { grade: "B0", count: 0, percentage: 0 },
        { grade: "C+", count: 0, percentage: 0 },
        { grade: "C0", count: 0, percentage: 0 },
        { grade: "D+", count: 0, percentage: 0 },
        { grade: "D0", count: 0, percentage: 0 },
        { grade: "F", count: 0, percentage: 0 }
      ],
    };
  },
  beforeMount() {
    this.id = window.history.state.lectCd;
    this.lectInfoIdModel.lecCd = window.history.state.id;
    this.userJobPerformEvalSeq = window.history.state.userJobPerformEvalSeq;
    this.finalGradeConfrmYn = window.history.state.finalGradeConfrmYn;
    this.userJobModel.userJobPerformEvalSeq = this.userJobPerformEvalSeq;
    this.staffNm = window.history.state.staffNm;
    this.divNm = window.history.state.divNm;
    this.yearEdu = window.history.state.yearEdu;
    this.sbjtCd = window.history.state.sbjtCd;
    this.sbjtNm = window.history.state.sbjtNm;
    this.termNm = window.history.state.termNm;
    this.gradeNm = window.history.state.gradeNm;
    this.finalGradeConfrmYn === STATUS_NO
      ? (this.userJobModel.finalGradeConfrmYn = STATUS_YES)
      : (this.userJobModel.finalGradeConfrmYn = STATUS_NO);

    this.getDateDetail();
  },
  methods: {
    async getDateDetail() {
      this.cmn.setLoading(true);
      this.lectInfoIdModel.userJobPerformEvalSeq = this.userJobPerformEvalSeq;
      try {
        await getDataDetail(this.lectInfoIdModel)
          .then((res) => {
            this.finalAchiDetailModel = res.data.data;

            this.arrFinalAchiMngModel =
              this.finalAchiDetailModel.achievementMngDTOList;

            this.finalAchiRltModel =
              this.finalAchiDetailModel.abilArchEvalRlstInfoDTO;

            this.arrStdScoreListModel =
              this.finalAchiDetailModel.studentScoreListDTOList;

            const valuesInA = this.arrFinalAchiMngModel.map(
              (item) => item.stdId
            );

            this.arrStdScoreListModel.sort((a, b) => {
              return valuesInA.indexOf(a.stdId) - valuesInA.indexOf(b.stdId);
            });

            this.convertedData =
              this.finalAchiDetailModel.studentScoreListDTOList.map((item) => ({
                ...item,
                scoreList: item.scoreList.split(";"),
                total: item.scoreList
                  .split(";")
                  .map(Number)
                  .reduce((acc, current) => acc + current, 0),
              }));

            this.convertedData.forEach((element) => {
              this.arrCntScore.push({ total: element.total });
            });
            let maxLength = 0;
            for (const item of this.convertedData) {
              if (item.scoreList.length > maxLength) {
                maxLength = item.scoreList.length;
                this.sizeScore = maxLength;
              }
            }

            this.convertedData.forEach((obj) => {
              while (obj.scoreList.length < this.sizeScore) {
                obj.scoreList.push("-");
              }
            });
            this.calPoint(this.convertedData);

          })
          .catch((error) => {
            throw new Error(MESSAGE_ERROR_API);
          })
          .finally(() => {
            this.cmn.setLoading(false);
          });
      } catch (e) {
      } finally {
      }
    },
    back() {
      this.router.push({
        name: SCREEN.finalArchivement.name,
      });
    },
    calPoint(convertedData: any) {
      const totalItems = convertedData.length;

      convertedData
        .sort((a, b) => b.total - a.total)
        .forEach((item, index, sortedArr) => {
          if (index > 0 && item.total === sortedArr[index - 1].total) {
            item.rank = sortedArr[index - 1].rank;
          } else {
            item.rank = index + 1;
          }
        });

      const rankCounts = convertedData.reduce((acc, item) => {
        acc[item.rank] = (acc[item.rank] || 0) + 1;
        return acc;
      }, {});

      convertedData.forEach((item) => {
        const rate = ((rankCounts[item.rank] / totalItems) * 100).toFixed(2);
        item.rate = rate + "%";
      });

      let cntScore = 0;
      this.arrEnd = this.arrFinalAchiMngModel.map((itemA, index) => {
        let itemB = convertedData[index];
        let finalScoreItem = itemB.total + parseInt(itemA.attendScore);
        let errorCode = "0(충족)";
        if (finalScoreItem > 90) {
          errorCode = "5(탁월)";
        } else if (finalScoreItem > 80) {
          errorCode = "4(우수)";
        } else if (finalScoreItem > 70) {
          errorCode = "3(보통)";
        } else if (finalScoreItem > 60) {
          errorCode = "2(다소미흡)";
        } else {
          errorCode = "1(미흡)";
        }
        cntScore += finalScoreItem;

        return {
          rowNum: itemA.rowNum,
          divNm: itemA.divNm,
          stdId: itemA.stdId,
          stdNm: itemA.stdNm,
          total: itemB.total,
          level: errorCode,
          attendScore: itemA.attendScore,
          rank: itemB.rank,
          rate: itemB.rate,
          shregStsNm: itemA.shregStsNm,
          finalScore: finalScoreItem,
          gradeNm: itemA.gradeNm,
        };
      });

      // Classification of scores for item 1
      let sumScore = 0;
      this.arrEnd.forEach(student => {
        const grade = this.getGrade(student.finalScore);
        sumScore += student.finalScore

        const gradeObj = this.gradeCounts.find(g => g.grade === grade);
          if (gradeObj) gradeObj.count++;
        });

        const totalStudents = this.arrEnd.length;
        
        this.gradeCounts.forEach(gradeObj => {
          gradeObj.percentage = '(' +((gradeObj.count / totalStudents) * 100).toFixed(2) + '%)';                  
      });
      this.mediScore = (sumScore/totalStudents).toFixed(2)

      const countAorHigher = this.gradeCounts
        .filter(g => ["A+", "A"].includes(g.grade))
        .reduce((sum, g) => sum + g.count, 0);

      const countBorHigher = this.gradeCounts
        .filter(g => ["A+", "A", "B+", "B"].includes(g.grade))
        .reduce((sum, g) => sum + g.count, 0);

      this.gradeCounts.unshift(
        {
          grade: "A0이상",
          count: countAorHigher,
          percentage: '(' +((countAorHigher / totalStudents) * 100).toFixed(2) + '%)'
        },
        {
          grade: "B0이상",
          count: countBorHigher,
          percentage: '(' +((countBorHigher / totalStudents) * 100).toFixed(2) + '%)'
        }
      );
      
    },
    handClickExport() {
      let rowExcel = [] as Array<Array<any>>;
      let rowExcelHeader = [] as Array<any>;
      let result = [];

      for (let index = 1; index <= this.sizeScore; index++) {
        result.push(`${index}차`);
      }

      rowExcelHeader = [
        "번호",
        "학년",
        "학번",
        "이름",
        "분반",
        "학적",
        ...result,
        "소계",
        "성취수준",
        "출석",
        "총점",
        "순위",
        "백분위",
        "최종성적(점수)",
      ];

      this.arrEnd.forEach((el, idx2) => {
        let colExcel = [] as Array<any>;
        colExcel.push(el.rowNum);
        colExcel.push(el.gradeNm);
        colExcel.push(el.stdId);
        colExcel.push(el.stdNm);
        colExcel.push(el.divNm);
        colExcel.push(el.shregStsNm);
        for (let index = 0; index < this.sizeScore; index++) {
          colExcel.push(this.convertedData[idx2].scoreList[index]);
        }
        colExcel.push(el.total);
        colExcel.push(el.level);
        colExcel.push(el.attendScore);
        colExcel.push(el.finalScore);
        colExcel.push(el.rank);
        colExcel.push(el.rate);
        colExcel.push(el.finalScore);
        rowExcel.push(colExcel);
      });

      return [
        { sheetName: "sheet1", data: rowExcel, header: rowExcelHeader },
      ] as Array<ExcelData>;
    },
    handClickRp() {},
    getGrade(score: any) {
      if (score >= 95) return "A+";
      else if (score >= 90) return "A";
      else if (score >= 85) return "B+";
      else if (score >= 80) return "B";
      else if (score >= 75) return "C+";
      else if (score >= 70) return "C";
      else if (score >= 65) return "D+";
      else if (score >= 60) return "D";
      else return "F";
    }
  },
});
</script>
<style scoped>
.score-cell {
  text-align: center;
  vertical-align: middle;
  padding: 10px;
}
</style>
