<template>
  <div class="box_section mt-5">
    <div class="box_section mt-13">
      <p class="box_title_sm">
        <!-- AS-IS -->{{ t("eduProcessCreation.typeTalentEdu.title21") }}
      </p>
      <div class="tbl_col tbl">
        <table>
          <colgroup>
            <col style="width: 20%" />
            <col style="width: 80%" />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row" :colspan="1" class="td_custom_color">
                <!-- 교육과정 목록 -->{{
                  t("eduProcessCreation.typeTalentEdu.title22")
                }}
              </th>
              <th scope="row" :colspan="1" class="ta_l">
                <template
                  v-if="data.asisEduCourse && data.asisEduCourse.indexEduCourse"
                >
                  {{ data.asisEduCourse.indexEduCourseNm }}
                </template>
              </th>
            </tr>
            <tr>
              <th scope="row" :colspan="1" class="td_custom_color">
                <!-- 인재양성유형 -->{{
                  t("eduProcessCreation.typeTalentEdu.title23")
                }}
              </th>
              <th scope="row" :colspan="1" class="ta_l">
                <template
                  v-if="
                    data.asisEduCourse &&
                    data.asisEduCourse.tobeTaltNrtgTypeDivCd
                  "
                >
                  {{ data.asisEduCourse.eduCourseType }}
                </template>
              </th>
            </tr>
            <tr>
              <th scope="row" :colspan="1" class="td_custom_color">
                <!-- 핵심직무 -->{{
                  t("eduProcessCreation.typeTalentEdu.title24")
                }}
              </th>
              <th scope="row" :colspan="1" class="ta_l">
                <template
                  v-if="
                    data.asisEduCourse && data.asisEduCourse.tobeCoreJobDivCd
                  "
                >
                  {{ data.asisEduCourse.eduCourseJob }}
                </template>
              </th>
            </tr>
            <tr>
              <th scope="row" :colspan="1" class="td_custom_color">
                <!-- 한계점 -->{{
                  t("eduProcessCreation.typeTalentEdu.title25")
                }}
              </th>
              <th scope="row" :colspan="1" class="ta_l">
                <TextArea
                  v-if="data.tobeEduCourse"
                  required
                  id="asisLimits"
                  v-model="data.tobeEduCourse.asisLimits"
                />
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="box_section mt-13">
      <p class="box_title_sm">
        <!-- TO-BE -->{{ t("eduProcessCreation.typeTalentEdu.title26") }}
      </p>
      <div class="tbl_col tbl">
        <table>
          <colgroup>
            <col style="width: 20%" />
            <col style="width: 20%" />
            <col style="width: 60%" />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row" :colspan="1" class="td_custom_color">
                <!-- 교육과정 목록 -->{{
                  t("eduProcessCreation.typeTalentEdu.title27")
                }}
              </th>
              <th scope="row" class="ta_l" :colspan="1">
                <SelectBoxBase
                  required
                  v-if="data.tobeEduCourse"
                  :id="'tobeCursListDivCd'"
                  :name="'selectbox'"
                  :data="
                    listResult.filter(
                      (item: any) => item.cdId != CD_RESULT_SEL_02
                    )
                  "
                  v-model:model-value="data.tobeEduCourse.tobeCursListDivCd"
                >
                </SelectBoxBase>
              </th>
              <th scope="row" :colspan="1" class="ta_l">
                <template
                  v-if="
                    data.tobeEduCourse && data.tobeEduCourse.indexEduCourse
                  "
                >
                  <ListCheckBoxBase
                    :listData="listReultMajor"
                    v-model="data.tobeEduCourse.indexEduCourse"
                    id="indexEduCourse"
                    name="indexEduCourse"
                    :isRequire="true"
                    :requireId="'indexEduCourse'"
                    :useArray="true"
                  />
                </template>
              </th>
            </tr>
            <tr>
              <th scope="row" :colspan="1" class="td_custom_color">
                <!-- 인재양성유형 -->{{
                  t("eduProcessCreation.typeTalentEdu.title28")
                }}
              </th>
              <th scope="row" class="ta_l" :colspan="1">
                <SelectBoxBase
                  required
                  v-if="data.tobeEduCourse"
                  :id="'tobeTaltNrtgTypeDivCd'"
                  :name="'selectbox'"
                  :data="
                    listResult.filter(
                      (item: any) => item.cdId != CD_RESULT_SEL_02
                    )
                  "
                  v-model:model-value="data.tobeEduCourse.tobeTaltNrtgTypeDivCd"
                >
                </SelectBoxBase>
              </th>
              <th scope="row" :colspan="1" class="ta_l">
                <template
                  v-if="
                    data.tobeEduCourse &&
                    data.tobeEduCourse.eduCourseType
                  "
                >
                  {{ data.tobeEduCourse.eduCourseType }}
                </template>
              </th>
            </tr>
            <tr>
              <th scope="row" :colspan="1" class="td_custom_color">
                <!-- 핵심직무 -->{{
                  t("eduProcessCreation.typeTalentEdu.title29")
                }}
              </th>
              <th scope="row" class="ta_l" :colspan="1">
                <SelectBoxBase
                  required
                  v-if="data.tobeEduCourse"
                  :id="'tobeCoreJobDivCd'"
                  :name="'selectbox'"
                  :data="listResult"
                  v-model:model-value="data.tobeEduCourse.tobeCoreJobDivCd"
                >
                </SelectBoxBase>
              </th>
              <th scope="row" :colspan="1" class="ta_l">
                <template
                  v-if="
                    data.tobeEduCourse && data.tobeEduCourse.eduCourseJob
                  "
                >
                  {{ data.tobeEduCourse.eduCourseJob }}
                </template>
              </th>
            </tr>
            <tr>
              <th scope="row" :colspan="1" class="td_custom_color">
                <!-- 변경사유 -->{{
                  t("eduProcessCreation.typeTalentEdu.title30")
                }}
              </th>
              <th scope="row" :colspan="2" class="ta_l">
                <TextArea
                  v-if="data.tobeEduCourse"
                  required
                  id="tobeRsn"
                  v-model="data.tobeEduCourse.tobeRsn"
                />
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="btn_group btn_end mg_t30">
      <div class="btn_group btn_end">
        <button type="button" class="btn_lg btn_round btn_gray" @click="print()">
          <!-- 3.인재양성유형 설정 및 교육목표 수립 인쇄 -->{{
            t("eduProcessCreation.typeTalentEdu.title31")
          }}
        </button>
        <ButtonBase
          v-if="isSave"
          type="button"
          @click="save"
          :buttonName="t('common.save')"
          class="btn_round btn_lg btn_primary"
        />
        <button
          type="button"
          class="btn_round btn_lg btn_primary"
          :disabled="isDisabled"
          @click="next()"
        >
          {{ t("common.next") }}
        </button>
        <button
          type="button"
          class="btn_round btn_lg btn_white"
          @click="back()"
        >
          {{ t("common.list") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { commonStore } from "@/stores/common";
import { SCREEN } from "@/router/screen";
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import TextArea from "@/components/common/input/TextArea.vue";
import { getListCodeMng } from "@/stores/common/codeMng/codeMng.service";
import {
  UP_RESULT_MAJOR,
  UP_RESULT_SEL,
  CD_RESULT_SEL_01,
  CD_RESULT_SEL_02,
  CD_RESULT_SEL_03,
  CD_STG041,
  CD_SELCT_TALT_YES,
  CD_INTERNAL,
} from "@/constants/common.const";
import {
  getAllEduCourseComm,
  getCoreJobSel,
  getEduGoal,
  getResultEduCourse,
  getTaltNrtgSel,
  saveResultEduCourse,
} from "@/stores/eduProcessCreation/typeTalentEdu/typeTalentEdu.service";
import {
  ResultEduCourseResDTO,
  ResultEduCourseReqDTO,
  CoreJobSelDTO,
  TaltNrtgResDTO,
  EduCourseCommResDTO,
} from "@/stores/eduProcessCreation/typeTalentEdu/typeTalentEdu.type";
import {
  EduCourseDescReqDTO,
  EduCourseSelRegistDTO,
  EduCourseSelReqDTO,
  EduCourseSelResDTO,
} from "@/stores/eduProcessCreation/eduCourse/eduProcess.type";
import {
  createEduCourseDesc,
  createEduCourseSel,
} from "@/stores/eduProcessCreation/eduCourse/eduProcess.service";
import ButtonBase from "@/components/common/button/ButtonBase.vue";
import { CodeMngModel } from "@/stores/common/codeMng/codeMng.type";
import { format } from "date-fns";
import { FORMAT_YYY_MM_DD } from "@/constants/screen.const";

export default defineComponent({
  components: {
    TextArea,
    ButtonBase,
  },
  setup: () => {
    const router = useRouter();
    const storeCommon = commonStore();
    const { t } = useI18n();
    const id = window.history.state.id;
    const TYPE_JOB = ref<string>("TYPE_JOB");
    const TYPE_TALT = ref<string>("TYPE_TALT");
    const isSave = window.history.state.isSave;

    return {
      router,
      storeCommon,
      t,
      id,
      CD_RESULT_SEL_01,
      CD_RESULT_SEL_02,
      CD_RESULT_SEL_03,
      TYPE_JOB,
      TYPE_TALT,
      isSave,
    };
  },
  data() {
    return {
      listResult: [] as Array<any>,
      listReultMajor: [] as Array<any>,
      data: {} as ResultEduCourseResDTO,
      isDisabled: true,
      nameFormRp: "07_03_type_talent_edu",
      datasetListRp: {} as any,
      paramListRp: {} as any,
      listCodeResponse: [] as CodeMngModel[],
    };
  },
  beforeMount() {
    this.goToDetail();
  },
  methods: {
    async goToDetail() {
      this.storeCommon.setLoading(true);
      await getListCodeMng({
        upCdIdList: [UP_RESULT_SEL],
      }).then((res: any) => {
        this.listResult = res.data.data.filter(
          (item: any) => item.upCdId == UP_RESULT_SEL
        );
        this.listResult.unshift({ id: 0, cdId: "", cdNm: this.t("common.select") });
      });
      await getResultEduCourse({ eduCourseSeq: this.id }).then((res: any) => {
        this.data = res.data.data;
        this.listReultMajor = res.data.data.listCurriculum;
        
        this.data.tobeEduCourse.tobeCursListDivCd = this.data.tobeEduCourse
          .tobeCursListDivCd
          ? this.data.tobeEduCourse.tobeCursListDivCd
          : "";
        this.data.tobeEduCourse.tobeTaltNrtgTypeDivCd = this.data.tobeEduCourse
          .tobeTaltNrtgTypeDivCd
          ? this.data.tobeEduCourse.tobeTaltNrtgTypeDivCd
          : "";
        this.data.tobeEduCourse.tobeCoreJobDivCd = this.data.tobeEduCourse
          .tobeCoreJobDivCd
          ? this.data.tobeEduCourse.tobeCoreJobDivCd
          : "";

        this.data.tobeEduCourse.indexEduCourse = this.convertDataCdToString(
          this.data.tobeEduCourse.indexEduCourse
        );
        this.data.asisEduCourse.indexEduCourseNm = this.listReultMajor
          .filter((item) =>
            this.data.asisEduCourse.indexEduCourse.some(
              (asi) => asi.selCd == item.cdId
            )
          )
          .map((item) => item.cdNm)
          .join(", ");

        if (this.data.tobeEduCourse.tobeRsn) {
          this.isDisabled = false;
        }
      });
      this.storeCommon.setLoading(false);
    },
    convertDataCdToString(data: EduCourseSelResDTO[]): string[] {
      return data.map((item) => item.selCd);
    },
    convertDataNmToString(data: EduCourseSelResDTO[]): string {
      return data.map((item) => item.dataNm).join(", ");
    },
    findCodeNmByCdId(cdId: string[]) {
      return;
    },
    save() {
      if (this.storeCommon.check) {
        this.$alert(this.t("common.messageValidateRequired"));
        return;
      }

      this.$confirm(
        this.t("common.message.save"),
        "",
        async (isConfirm: Boolean) => {
          if (isConfirm) {
            this.storeCommon.setLoading(true);

            this.storeCommon.setLoading(true);

            let dataSel = [] as EduCourseSelReqDTO[];
            this.data.tobeEduCourse.indexEduCourse.forEach((item: string) => {
              dataSel.push({
                dataCd: UP_RESULT_MAJOR,
                dataNm: "",
                selCd: item,
                refrSeq: this.id,
                etc: "",
                eduCourseSeq: this.id,
              });
            });

            const dataSaveSel = {
              proStep: CD_STG041,
              eduCourseSelReqDTOs: dataSel,
              eduCourseDescSelDTO: {
                eduCourseSeq: this.id,
                refrSeq: this.id,
                upCdId: [],
              },
            } as EduCourseSelRegistDTO;

            this.storeCommon.setLoading(true);
            
            await createEduCourseSel(dataSaveSel).finally(() => {
              this.storeCommon.setLoading(false);
            });

            const dataSave = {
              eduCourseSeq: this.id,
              asisLimits: this.data.tobeEduCourse.asisLimits,
              tobeCursListDivCd: this.data.tobeEduCourse.tobeCursListDivCd,
              tobeTaltNrtgTypeDivCd:
                this.data.tobeEduCourse.tobeTaltNrtgTypeDivCd,
              tobeCoreJobDivCd: this.data.tobeEduCourse.tobeCoreJobDivCd,
              tobeRsn: this.data.tobeEduCourse.tobeRsn,
            } as ResultEduCourseReqDTO;

            await saveResultEduCourse(dataSave)
              .then((res: any) => {
                this.$confirm(
                  this.t("common.messageSuccessNextTab"),
                  "",
                  (isConfirm: Boolean) => {
                    if (isConfirm) {
                      this.next();
                    }
                    if (this.isDisabled) {
                      this.$emit("updateStage", 41);
                    }
                    this.isDisabled = false;
                  }
                );
              })
              .finally(() => {
                this.storeCommon.setLoading(false);
              });
          }
        }
      );
    },
    next() {
      this.$emit("nextTab", 40);
    },
    back() {
      this.router.push({
        path: SCREEN.eduProcessCreation.path,
      });
    },
    async getListCodeEduCourse() {
      await getListCodeMng({
        upCdIdList: [UP_RESULT_SEL],
      }).then((res: any) => {
        this.listCodeResponse = res.data.data;
      });
    },
    async getEduCompositionTalent() {
      await getAllEduCourseComm({ eduCourseSeq: this.id })
        .then((res: any) => {
          const response = res.data.data as EduCourseCommResDTO[];

          this.datasetListRp.compositionTalent = response.map((item) => {
            item.divCd = item.divCd == CD_INTERNAL ? "내부" : "외부";
            return item;
          });
        })
    },
    async getCreatedTypeTalent() {
      await getEduGoal({ eduCourseSeq: this.id }).then(
        (res: any) => {
          const response = res.data.data;

          this.datasetListRp.createdTypeTalent = [
            {
              schVision: response.schEduGoal
                .filter((item: any) => item.divCd == "103720")
                .map((item: any) => item.cont)
                .join("\n"),
              schTalent: response.schEduGoal
                .filter((item: any) => item.divCd == "103730")
                .map((item: any) => item.cont)
                .join("\n"),
              schTarget: response.schEduGoal
                .filter((item: any) => item.divCd == "103740")
                .map((item: any) => item.cont)
                .join("\n"),
              deptVision: response.deptEduGoal
                .filter((item: any) => item.divCd == "103810")
                .map((item: any) => item.cont)
                .join("\n"),
              deptTalent: response.eduSel
                .filter((item: any) => item.dataCd == "103820")
                .map((item: any) => item.refrNm)
                .join("\n"),
              deptTarget: response.eduSel
                .filter((item: any) => item.dataCd == "103830")
                .map((item: any) => item.refrNm)
                .join("\n"),
              deptDesc: response.eduDesc
                .filter((item: any) => item.dataCd == "EDU_032_03")
                .map((item: any) => item.cont)
                .join("\n"),
            },
          ];
        }
      );
    },
    async getSetGoalTalent() {
      await getTaltNrtgSel({ eduCourseSeq: this.id }).then(
        (res: any) => {
          const response = res.data.data as TaltNrtgResDTO;

          response.taltNrtgSel = response.taltNrtgSel.filter(
            (item) => item.taltNrtgSelcSeq
          );

          this.datasetListRp.setGoalTalentTable1 = [
            {
              eduCourseType: response.eduCourseType,
              evalDate: response.evalDate
                ? format(response.evalDate, FORMAT_YYY_MM_DD)
                : "",
              evalPartiCnt: response.evalPartiCnt + '명',
              jobField: response.jobField,
            },
          ];
          this.datasetListRp.setGoalTalentTable2 = response.taltNrtgSel
            .filter((item) => item.taltNrtgSelcSeq)
            .map((item: any) => {
              item.avgScore = this.getAvgScore([
                item.jobImpt,
                item.jobOl,
                item.employFruitage,
                item.deptVisn,
                item.eduEfft,
              ]);
              return item;
            });
        }
      );
      await getCoreJobSel({ eduCourseSeq: this.id }).then(
        (res) => {
          const response = res.data.data.map((item: any) => {
            if (item.coreJobSelcSeq) {
              item.check = true;
            } else {
              item.check = false;
            }
            return item;
          }) as CoreJobSelDTO[];

          this.datasetListRp.setGoalTalentTable3 =
            this.datasetListRp.setGoalTalentTable2
              .filter((item: any) => item.selCd == CD_SELCT_TALT_YES)
              .map((item: any) => {
                return {
                  typeNm: item.typeNm,
                  defn: response.filter(
                    (res) => res.taltNrtgTypeSeq == item.taltNrtgTypeSeq
                  )[0].defn,
                  job: response
                    .filter(
                      (res) => res.taltNrtgTypeSeq == item.taltNrtgTypeSeq
                    )
                    .map((res) => res.jobNm)
                    .join(", "),
                };
              });
        }
      );
    },
    async getSelectionTalent() {
      type SelectionTalentType = {
        col1: string,
        col2: string,
        colLeft1: string,
        colLeft2: string,
        row: number,
        value: string,
        taltTypeSeq: string
      };
      let dataConvert = [] as SelectionTalentType[];

      await getCoreJobSel({ eduCourseSeq: this.id })
        .then((res: any) => {
          const response = res.data.data.filter((item: any) => item.coreJobSelcSeq) as any[];
          response.forEach((item) => {
            /* row 1 */
            dataConvert.push({
              col1: item.typeNm + ' 디자이너',
              col2: item.jobNm + ' 디자인',
              colLeft1: '(1) 산업체, 지역사회 인력수요도',
              colLeft2: '40점',
              row: 1,
              value: '',
              taltTypeSeq: item.taltNrtgTypeSeq
            });
            /* row 2 */
            dataConvert.push({
              col1: item.typeNm + ' 디자이너',
              col2: item.jobNm + ' 디자인',
              colLeft1: '\t• 해당산업의 인력수요의 미래전망과 비전',
              colLeft2: '20',
              row: 2,
              value: `${item.visn}`,
              taltTypeSeq: item.taltNrtgTypeSeq
            })
            /* row 3 */
            dataConvert.push({
              col1: item.typeNm + ' 디자이너',
              col2: item.jobNm + ' 디자인',
              colLeft1: '\t• 신입사원 채용 시 전공 일치도에 대한 중요도',
              colLeft2: '10',
              row: 3,
              value: `${item.impt}`,
              taltTypeSeq: item.taltNrtgTypeSeq
            })
            /* row 4 */
            dataConvert.push({
              col1: item.typeNm + ' 디자이너',
              col2: item.jobNm + ' 디자인',
              colLeft1: '\t• 향후 해당직무에 대한 채용 가능성',
              colLeft2: '10',
              row: 4,
              value: `${item.psbl}`,
              taltTypeSeq: item.taltNrtgTypeSeq
            })
            /* row 5 */
            dataConvert.push({
              col1: item.typeNm + ' 디자이너',
              col2: item.jobNm + ' 디자인',
              colLeft1: '(2) 본교 교육여건과의 연계성 ',
              colLeft2: '30점',
              row: 5,
              value: '',
              taltTypeSeq: item.taltNrtgTypeSeq
            });
            /* row 6 */
            dataConvert.push({
              col1: item.typeNm + ' 디자이너',
              col2: item.jobNm + ' 디자인',
              colLeft1: '\t• 강의 실습실의 공간 면적 및 시설은 해당 직무능력 성취를 위한 수업에 적합한가?',
              colLeft2: '15',
              row: 6,
              value: `${item.factSutb}`,
              taltTypeSeq: item.taltNrtgTypeSeq
            })
            /* row 7 */
            dataConvert.push({
              col1: item.typeNm + ' 디자이너',
              col2: item.jobNm + ' 디자인',
              colLeft1: '\t• 강의 실습실의 기자재 구비 및 활용은 해당 직무능력 성취를 위한 수업에 적합한가?',
              colLeft2: '15',
              row: 7,
              value: `${item.matlSutb}`,
              taltTypeSeq: item.taltNrtgTypeSeq
            })
            /* row 8 */
            dataConvert.push({
              col1: item.typeNm + ' 디자이너',
              col2: item.jobNm + ' 디자인',
              colLeft1: '(3) 학생 선호도',
              colLeft2: '15',
              row: 8,
              value: ``,
              taltTypeSeq: item.taltNrtgTypeSeq
            })
            /* row 9 */
            dataConvert.push({
              col1: item.typeNm + ' 디자이너',
              col2: item.jobNm + ' 디자인',
              colLeft1: '\t• 재학생의 해당직무 선호도 (재학생 설문조사)',
              colLeft2: '30',
              row: 9,
              value: `${item.prfr}`,
              taltTypeSeq: item.taltNrtgTypeSeq
            })
            /* row 10 */
            dataConvert.push({
              col1: item.typeNm + ' 디자이너',
              col2: item.jobNm + ' 디자인',
              colLeft1: '\t\t\t합계',
              colLeft2: '100',
              row: 10,
              value: `${this.totalScoreAnalysis([item.visn, item.impt, item.psbl, item.factSutb, item.matlSutb, item.prfr])}`,
              taltTypeSeq: item.taltNrtgTypeSeq
            })
            /* row 11 */
            dataConvert.push({
              col1: item.typeNm + ' 디자이너',
              col2: item.jobNm + ' 디자인',
              colLeft1: '\t\t\t판정',
              colLeft2: '',
              row: 11,
              value: `${item.selcNm}`,
              taltTypeSeq: item.taltNrtgTypeSeq
            })
          })
          this.datasetListRp.getSelectionTalent = dataConvert;
        })
    },
    async getResultTypeTalent() {
      await getResultEduCourse({ eduCourseSeq: this.id }).then(
        (res: any) => {
          const response = res.data.data;
          const responseCode = this.listCodeResponse.filter(
            (item) => item.upCdId == UP_RESULT_SEL
          );
          this.datasetListRp.resultTypeTalent = [
            {
              asisIndex: response.asisEduCourse.indexEduCourse
                .map(
                  (item: any) =>
                    response.listCurriculum.filter(
                      (curri: any) => curri.cdId == item.selCd
                    )[0].cdNm
                )
                .join(", "),
              asisJob: response.asisEduCourse.eduCourseJob,
              asisType: response.asisEduCourse.eduCourseType,
              asisLimit: response.tobeEduCourse.asisLimits,
              tobeIndex: response.tobeEduCourse.indexEduCourse
                .map(
                  (item: any) =>
                    response.listCurriculum.filter(
                      (curri: any) => curri.cdId == item.selCd
                    )[0].cdNm
                )
                .join(", "),
              tobeJob: response.tobeEduCourse.eduCourseJob,
              tobeType: response.tobeEduCourse.eduCourseType,
              tobeRsn: response.tobeEduCourse.tobeRsn,
              tobeCoreJobDivCd: responseCode.filter(
                (item: CodeMngModel) =>
                  item.cdId == response.tobeEduCourse.tobeCoreJobDivCd
              )[0].cdNm,
              tobeTaltNrtgTypeDivCd: responseCode.filter(
                (item: CodeMngModel) =>
                  item.cdId == response.tobeEduCourse.tobeTaltNrtgTypeDivCd
              )[0].cdNm,
              tobeCursListDivCd: responseCode.filter(
                (item: CodeMngModel) =>
                  item.cdId == response.tobeEduCourse.tobeCursListDivCd
              )[0].cdNm,
            },
          ];
        }
      );
    },
    async cloneData() {
      await this.getListCodeEduCourse();
      await this.getEduCompositionTalent();
      await this.getCreatedTypeTalent();
      await this.getSetGoalTalent();
      await this.getSelectionTalent();
      await this.getResultTypeTalent();
    },
    convertData() {
      this.datasetListRp.compositionTalent = JSON.stringify(
        this.datasetListRp.compositionTalent
      );
      this.datasetListRp.createdTypeTalent = JSON.stringify(
        this.datasetListRp.createdTypeTalent
      );
      this.datasetListRp.setGoalTalentTable1 = JSON.stringify(
        this.datasetListRp.setGoalTalentTable1
      );
      this.datasetListRp.setGoalTalentTable2 = JSON.stringify(
        this.datasetListRp.setGoalTalentTable2
      );
      this.datasetListRp.setGoalTalentTable3 = JSON.stringify(
        this.datasetListRp.setGoalTalentTable3
      );
      this.datasetListRp.getSelectionTalent = JSON.stringify(
        this.datasetListRp.getSelectionTalent
      );
      this.datasetListRp.resultTypeTalent = JSON.stringify(
        this.datasetListRp.resultTypeTalent
      );
    },
    async print() {
      this.storeCommon.setLoading(true);

      await this.cloneData();

      await this.convertData();

      await this.storeCommon.fn_viewer_open(
        this.nameFormRp,
        this.datasetListRp,
        this.paramListRp
      );
      this.storeCommon.setLoading(false);
    },
    totalScoreAnalysis(listSbjt: number[]) {
      return listSbjt.reduce((sum, sbjt) => sum + sbjt, 0);
    },
    getAvgScore(scores: string[]) {
      const sum = scores.reduce((acc, score) => acc + parseFloat(score), 0);
      const avgScore = sum / scores.length;
      return parseFloat(avgScore ? avgScore.toFixed(3) : "0");
    },
  },
});
</script>
<style scoped>
@import url("../eduCourseCustom.css");
</style>
