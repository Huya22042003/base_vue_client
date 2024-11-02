<template lang="">
  <div class="content_wrap">
    <div class="grid_content">
      <Breadcrumb
        :pageTitle="pageTitle"
        :breadcrumbItems="breadcrumbItems"
      ></Breadcrumb>
      <p class="box_title_custom" v-if="data && data.year">
        {{
          data.year +
          t("05.eduProcessCreation.title2") +
          data.deptNm +
          t("05.eduProcessCreation.title3")
        }}
      </p>
      <div class="box_section mt-5">
        <div class="box">
          <div class="box_section mt-13">
            <div class="tbl tbl_row">
              <table>
                <colgroup>
                  <col style="width: 15%" />
                  <col style="width: auto" />
                  <col style="width: 15%" />
                  <col style="width: auto" />
                </colgroup>
                <tbody>
                  <tr>
                    <th scope="row" :colspan="1">
                      <!-- 교과목명 -->{{
                        t("eduProcessCreation.subjectProfile.title10")
                      }}
                    </th>
                    <td scope="row" :colspan="1">
                      {{ dataSubject.sbjtNm }}
                    </td>
                    <th scope="row" :colspan="1">
                      {{ t("eduProcessCreation.subjectProfile.title11")
                      }}<!-- 이수구분 -->
                    </th>
                    <td scope="row" :colspan="1">
                      {{ dataSubject.sustDivNm }}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" :colspan="1">
                      {{ t("eduProcessCreation.subjectProfile.title12")
                      }}<!-- 이수기간 -->
                    </th>
                    <td scope="row" :colspan="1">
                      {{
                        `${dataSubject.termNm ? dataSubject.termNm : ""}(${
                          dataSubject.gradeNm ? dataSubject.gradeNm : ""
                        })`
                      }}
                    </td>
                    <th scope="row" :colspan="1">
                      {{ t("eduProcessCreation.subjectProfile.title13")
                      }}<!-- 시수(이론/실습) -->
                    </th>
                    <td scope="row" :colspan="1">
                      {{
                        `${dataSubject.totalHrs ? dataSubject.totalHrs : 0}(${
                          dataSubject.thryHrs ? dataSubject.thryHrs : 0
                        }/${
                          dataSubject.practiceHrs ? dataSubject.practiceHrs : 0
                        })`
                      }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="sub_section">
          <div class="section_tit_wrap">
            <h3 class="section_tit">
              {{ t("eduProcessCreation.subjectProfile.title14")
              }}<!-- 인재양성유형 및 직무역량 -->
            </h3>
          </div>
          <div class="box">
            <div class="sub_section_sm">
              <div class="tbl tbl_col">
                <table>
                  <thead>
                    <tr>
                      <th scope="row" :colspan="1">
                        {{ t("eduProcessCreation.subjectProfile.title15")
                        }}<!-- 인재양성유형 -->
                      </th>
                      <th scope="row" :colspan="1">
                        {{ t("eduProcessCreation.subjectProfile.title16")
                        }}<!-- 직무명 -->
                      </th>
                      <th scope="row" :colspan="1">
                        {{ t("eduProcessCreation.subjectProfile.title17")
                        }}<!-- 직무역량 -->
                      </th>
                      <th scope="row" :colspan="1">
                        {{ t("eduProcessCreation.subjectProfile.title18")
                        }}<!-- 학습모듈명 -->
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in dataSubject.jobAbility">
                      <td scope="row" :colspan="1">{{ item.taltNm }}</td>
                      <td scope="row" :colspan="1">{{ item.jobNm }}</td>
                      <td scope="row" :colspan="1">{{ item.abilNm }}</td>
                      <td scope="row" :colspan="1">{{ item.moduleNm }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="box_section mt-13">
              <div class="tbl tbl_row">
                <table>
                  <colgroup>
                    <col style="width: 20%" />
                    <col style="width: auto" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th scope="row" :colspan="1">
                        {{ t("eduProcessCreation.subjectProfile.title19")
                        }}<!-- 교과목 개요 및 특징 -->
                      </th>
                      <td scope="row" :colspan="1">
                        <TextArea
                          required
                          id="sbjtOver"
                          v-model="dataSubject.sbjtOver"
                        />
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" :colspan="1">
                        {{ t("eduProcessCreation.subjectProfile.title20")
                        }}<!-- 교육목표 -->
                      </th>
                      <td scope="row" :colspan="1">
                        <TextArea
                          required
                          id="eduGoal"
                          v-model="dataSubject.eduGoal"
                        />
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" :colspan="1">
                        {{ t("eduProcessCreation.subjectProfile.title21")
                        }}<!-- 교육내용 -->
                      </th>
                      <td scope="row" :colspan="1">
                        <TextArea
                          required
                          id="eduCont"
                          v-model="dataSubject.eduCont"
                        />
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" :colspan="1">
                        {{ t("eduProcessCreation.subjectProfile.title22")
                        }}<!-- 교육정보 -->
                      </th>
                      <td scope="row" :colspan="1">
                        <TextArea
                          required
                          id="eduInfo"
                          v-model="dataSubject.eduInfo"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="box_section mt-13">
              <div class="tbl tbl_row">
                <table>
                  <colgroup>
                    <col style="width: 20%" />
                    <col style="width: auto" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th scope="row" :colspan="1">
                        {{ t("eduProcessCreation.subjectProfile.title23")
                        }}<!-- 교수학습법 -->
                      </th>
                      <td scope="row" :colspan="1">
                        <ListCheckBoxBase
                          v-if="dataSubject.listProfLearnMng"
                          :listData="dataSubject.listProfLearnMng"
                          :mode="'show'"
                          v-model="dataSubject.evalSel"
                          :id="`evalSel`"
                          :name="`evalSel`"
                          :class="'check_box_custom'"
                          :hasCheckAll="false"
                          :useArray="true"
                          :requireId="`evalSel`"
                          :isRequire="true"
                        />
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" :colspan="1">
                        {{ t("eduProcessCreation.subjectProfile.title24")
                        }}<!-- 평가방법 -->
                      </th>
                      <td scope="row" :colspan="1">
                        <ListCheckBoxBase
                          v-if="dataSubject.listEvalMethod"
                          :listData="dataSubject.listEvalMethod"
                          :mode="'show'"
                          v-model="dataSubject.profEvalSel"
                          :id="`profEvalSel`"
                          :name="`profEvalSel`"
                          :class="'check_box_custom'"
                          :hasCheckAll="false"
                          :useArray="true"
                          :requireId="`profEvalSel`"
                          :isRequire="true"
                        />
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" :colspan="1">
                        {{ t("eduProcessCreation.subjectProfile.title25")
                        }}<!-- 교과 구분 -->
                      </th>
                      <td scope="row" :colspan="1">
                        <ListCheckBoxBase
                          v-if="dataSubject.listCurriculum"
                          :listData="dataSubject.listCurriculum"
                          :mode="'show'"
                          v-model="dataSubject.curriculumSel"
                          :id="`curriculumSel`"
                          :name="`curriculumSel`"
                          :class="'check_box_custom'"
                          :hasCheckAll="false"
                          :useArray="true"
                          :requireId="`curriculumSel`"
                          :isRequire="true"
                        />
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" :colspan="1">
                        {{ t("eduProcessCreation.subjectProfile.title26")
                        }}<!-- 타학과 수강 가능 여부 -->
                      </th>
                      <td scope="row" :colspan="1">
                        <RadiobuttonBase
                          v-for="(item, index) in listLecture"
                          :value="item.cdId"
                          v-model="dataSubject.otherDeptCoursePsblYn"
                          :id="`otherDeptCoursePsblYn_${index}`"
                          :name="`otherDeptCoursePsblYn`"
                          :key="`otherDeptCoursePsblYn_${index}`"
                          :checked="
                            item.cdId == dataSubject.otherDeptCoursePsblYn
                          "
                          :label="item.cdNm"
                        >
                        </RadiobuttonBase>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" :colspan="1">
                        {{ t("eduProcessCreation.subjectProfile.title27")
                        }}<!-- 원격수업 여부 -->
                      </th>
                      <td scope="row" :colspan="1">
                        <RadiobuttonBase
                          v-for="(item, index) in listClassOnline"
                          :value="item.cdId"
                          v-model="dataSubject.remoteClassYn"
                          :id="`classOnline_${index}`"
                          :name="`classOnline`"
                          :key="`classOnline_${index}`"
                          :checked="item.cdId == dataSubject.remoteClassYn"
                          :label="item.cdNm"
                        >
                        </RadiobuttonBase>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div class="sub_section">
          <div class="section_tit_wrap">
            <h3 class="section_tit">
              {{ t("eduProcessCreation.subjectProfile.title28")
              }}<!-- 장비 및 도구 -->
            </h3>
          </div>
          <div class="box">
            <div class="box_section mt-13">
              <div class="tbl tbl_row">
                <table>
                  <colgroup>
                    <col style="width: 20%" />
                    <col style="width: auto" />
                  </colgroup>
                  <tbody>
                    <tr
                      v-if="
                        dataSubject.unitNcs && dataSubject.unitNcs.length != 0
                      "
                    >
                      <th scope="row" :colspan="1">
                        {{ t("eduProcessCreation.subjectProfile.title29")
                        }}<!-- NCS능력단위 -->
                      </th>
                      <td scope="row" :colspan="1">
                        <div v-for="item in dataSubject.unitNcs">
                          - {{ item }}
                        </div>
                      </td>
                    </tr>
                    <tr
                      v-if="
                        dataSubject.unitKcs && dataSubject.unitKcs.length != 0
                      "
                    >
                      <th scope="row" :colspan="1">
                        {{ t("eduProcessCreation.subjectProfile.title30")
                        }}<!-- KCS능력단위(자체능력단위) -->
                      </th>
                      <td scope="row" :colspan="1">
                        <div v-for="item in dataSubject.unitKcs">
                          - {{ item }}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div class="sub_section">
          <CollapseBase
            :isShow="openCollapse"
            :title="
              t(
                'eduProcessCreation.subjectProfile.title31'
              ) /* '하위역량 / 수행준거 / 지식•기술•태도  ' */
            "
            :onClick="
              () => {
                openCollapse = !openCollapse;
              }
            "
          >
            <div class="tbl tbl_col mg_t50">
              <table>
                <colgroup>
                  <col style="width: 20%" />
                  <col style="width: 20%" />
                  <col style="width: auto" />
                </colgroup>
                <thead>
                  <tr>
                    <th scope="row" :colspan="1">
                      {{ t("eduProcessCreation.subjectProfile.title32")
                      }}<!-- 하위역량 -->
                    </th>
                    <th scope="row" :colspan="1">
                      {{ t("eduProcessCreation.subjectProfile.title33")
                      }}<!-- 수행준거 -->
                    </th>
                    <th scope="row" :colspan="1">
                      {{ t("eduProcessCreation.subjectProfile.title34")
                      }}<!-- 지식•기술•태도 -->
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <template v-for="(unit, index) in dataSubject.jobCapaUnit">
                    <template
                      v-if="unit.capaPer && unit.capaPer.length != 0"
                      v-for="(per, indexPer) in unit.capaPer"
                    >
                      <tr>
                        <td
                          scope="row"
                          v-if="indexPer == 0"
                          :rowspan="unit.capaPer && unit.capaPer.length"
                          :colspan="1"
                        >
                          {{ unit.capaNm }}<br />({{ unit.abilCd }})
                        </td>
                        <td scope="row" :colspan="1">
                          {{ per }}
                        </td>
                        <td
                          scope="row"
                          v-if="indexPer == 0"
                          :rowspan="unit.capaPer && unit.capaPer.length"
                          :colspan="1"
                        >
                          <div class="ta_l pd_l30 line_height">
                            <span class="font_weigth">[지식]</span><br />
                            <span v-html="unit.know.replace(/\n/g, '<br />')"></span><br />
                            <span class="font_weigth">[기술]</span><br />
                            <span v-html="unit.skil.replace(/\n/g, '<br />')"></span><br />
                            <span class="font_weigth">[태도]</span><br />
                            <span v-html="unit.attit.replace(/\n/g, '<br />')"></span><br />
                          </div>
                        </td>
                      </tr>
                    </template>
                    <template v-else>
                      <tr>
                        <td scope="row" :colspan="1">
                          {{ unit.capaNm }}({{ unit.abilCd }})
                        </td>
                        <td scope="row" :colspan="1"></td>
                        <td scope="row" :colspan="1">
                          <div class="ta_l pd_l30 line_height">
                            <span class="font_weigth">[지식]</span><br />
                            <span v-html="unit.know.replace(/\n/g, '<br />')"></span><br />
                            <span class="font_weigth">[기술]</span><br />
                            <span v-html="unit.skil.replace(/\n/g, '<br />')"></span><br />
                            <span class="font_weigth">[태도]</span><br />
                            <span v-html="unit.attit.replace(/\n/g, '<br />')"></span><br />
                          </div>
                        </td>
                      </tr>
                    </template>
                  </template>
                </tbody>
              </table>
            </div>
          </CollapseBase>
        </div>
        <div class="box">
          <div class="btn_group btn_end">
            <button type="button" class="btn_round btn_lg btn_primary">
              {{ t("common.print") }}
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
              class="btn_round btn_lg btn_white"
              @click="back()"
            >
              {{ t("common.list") }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { SCREEN } from "@/router/screen";
import { commonStore } from "@/stores/common";
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import TextArea from "@/components/common/input/TextArea.vue";
import CollapseBase from "@/components/common/collapse/CollapseBase.vue";
import { MODE_EDIT } from "@/constants/screen.const";
import {
  getDetailSubjectProfile,
  updateSubjectProfile,
} from "@/stores/eduProcessCreation/subjectProfile/subjectProfile.service";
import { detailEduCourse } from "@/stores/eduProcessCreation/eduCourse/eduProcess.service";
import { EduCourseDetailDTO } from "@/stores/eduProcessCreation/eduCourse/eduProcess.type";
import {
  SubjectProfileDetailDTO,
  SubjectProfileReqDTO,
} from "@/stores/eduProcessCreation/subjectProfile/subjectProfile.type";
import {
  getCodeMngByUpCdId,
} from "@/stores/common/codeMng/codeMng.service";
import { UP_CLASS_ONLINE_YN, UP_LECTURE_YN } from "@/constants/common.const";
import { CodeMngModel } from "@/stores/common/codeMng/codeMng.type";
import RadiobuttonBase from "@/components/common/input/RadiobuttonBase.vue";
import ListCheckBoxBase from "@/components/common/input/ListCheckBoxBase.vue";

export default {
  components: {
    Breadcrumb,
    TextArea,
    CollapseBase,
    RadiobuttonBase,
    ListCheckBoxBase,
  },
  props: {
    stage: {
      type: Number,
      default: true,
    },
  },
  setup: () => {
    const router = useRouter();
    const storeCommon = commonStore();
    const { t } = useI18n();
    const id = window.history.state.id;
    const sbjtCd = window.history.state.sbjtCd;
    const version = window.history.state.version;
    const isSave = window.history.state.isSave;

    return { router, storeCommon, t, id, sbjtCd, version, isSave };
  },
  data() {
    return {
      pageTitle: "교육과정개발",
      listLecture: [] as CodeMngModel[],
      listClassOnline: [] as CodeMngModel[],
      openCollapse: false,
      breadcrumbItems: [],
      data: {} as EduCourseDetailDTO,
      dataSubject: {} as SubjectProfileDetailDTO,
    };
  },
  beforeMount() {
    this.getDetailData();
  },
  methods: {
    async getDetailData() {
      this.storeCommon.setLoading(true);
      await getCodeMngByUpCdId({ upCdId: UP_LECTURE_YN }).then((res) => {
        this.listLecture = res.data.data;
      });
      await getCodeMngByUpCdId({ upCdId: UP_CLASS_ONLINE_YN }).then((res) => {
        this.listClassOnline = res.data.data;
      });
      await detailEduCourse({ eduCourseSeq: this.id }).then((res: any) => {
        this.data = res.data.data as EduCourseDetailDTO;
      });
      await getDetailSubjectProfile({
        eduCourseSeq: this.id,
        sbjtCd: this.sbjtCd,
      }).then((res) => {
        this.dataSubject = res.data.data as SubjectProfileDetailDTO;
        this.dataSubject.otherDeptCoursePsblYn = this.dataSubject
          .otherDeptCoursePsblYn
          ? this.dataSubject.otherDeptCoursePsblYn
          : `${this.listLecture[0].cdId}`;
        this.dataSubject.remoteClassYn = this.dataSubject.remoteClassYn
          ? this.dataSubject.remoteClassYn
          : `${this.listClassOnline[0].cdId}`;
      });
      this.storeCommon.setLoading(false);
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
            const dataSave = {
              sbjtCd: this.dataSubject.sbjtCd,
              eduCursSeq: this.dataSubject.eduCursSeq,
              prflSeq: this.dataSubject.prflSeq,
              sbjtOver: this.dataSubject.sbjtOver,
              eduGoal: this.dataSubject.eduGoal,
              eduCont: this.dataSubject.eduCont,
              eduInfo: this.dataSubject.eduInfo,
              otherDeptCoursePsblYn: this.dataSubject.otherDeptCoursePsblYn,
              remoteClassYn: this.dataSubject.remoteClassYn,
              evalSel: this.dataSubject.evalSel,
              profEvalSel: this.dataSubject.profEvalSel,
              curriculumSel: this.dataSubject.curriculumSel,
            } as SubjectProfileReqDTO;
            updateSubjectProfile(dataSave)
              .then((res) => {
                this.$alert("저장이 되었습니다.", "", () => {
                  this.back();
                });
              })
              .finally(() => {
                this.storeCommon.setLoading(false);
              });
          }
        }
      );
    },
    back() {
      this.$router.push({
        name: SCREEN.eduProcessCreationMng.name,
        params: {
          mode: MODE_EDIT,
        },
        state: {
          id: this.id,
          version: this.version,
          isSave: this.isSave,
        },
      });
    },
  },
};
</script>
<style scoped>
@import url("../eduCourseCustom.css");
.font_weigth {
  font-weight: bold;
}
.line_height {
  line-height: 30px;
}
</style>
<style>
.check_box_custom .check_row {
  margin-right: 20px !important;
}
</style>
