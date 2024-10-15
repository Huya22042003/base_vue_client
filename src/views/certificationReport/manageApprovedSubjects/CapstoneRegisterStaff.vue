<template>
  <section id="content" class="content_wrapper grid_content" tabindex="0">
    <Breadcrumb
      :pageTitle="pageTitle"
      :breadcrumbItems="breadcrumbItems"
    ></Breadcrumb>

    <div class="box dp_block">
      <div class="box_section">
        <table class="tbl_row">
          <colgroup>
            <col style="width: 18%" />
            <col style="width: auto" />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row">
                <!-- 교과목명 -->
                {{ t("certificationReport.manageApprovedSubjects.field17") }}
              </th>
              <td class="td_input">
                {{ dataDetail.name }}
              </td>
            </tr>
            <tr>
              <th scope="row">
                <!-- 수강코드 -->
                {{ t("certificationReport.manageApprovedSubjects.field18") }}
              </th>
              <td>
                {{ dataDetail.codeLect }}
              </td>
            </tr>
            <tr>
              <th scope="row">
                <!-- 구분 -->
                {{ t("certificationReport.manageApprovedSubjects.field19") }}
              </th>
              <td class="td_input">
                {{ dataDetail.typeSubject }}
              </td>
            </tr>
            <tr>
              <th scope="row">
                <!-- 신청분야 -->
                {{ t("certificationReport.manageApprovedSubjects.field20") }}
              </th>
              <td>
                <RadiobuttonBase
                  v-for="(item, index) in listRadioField"
                  :value="item.cdId"
                  :isDisable="!checkButton"
                  v-model="dataDetail.fieldRegister"
                  :id="`${item.cdId}_${index}_field`"
                  :name="`${item.cdId}_${index}_field`"
                  :key="`${item.cdId}_${index}_field`"
                  :checked="item.cdId == dataDetail.fieldRegister"
                  :label="item.cdNm"
                >
                </RadiobuttonBase>
              </td>
            </tr>
            <tr>
              <th scope="row">
                <!-- 성명 -->
                {{ t("certificationReport.manageApprovedSubjects.field21") }}
              </th>
              <td class="td_input">
                {{ dataDetail.teacher }}
              </td>
            </tr>
            <tr>
              <th scope="row">
                <!-- 소속학과 -->
                {{ t("certificationReport.manageApprovedSubjects.field22") }}
              </th>
              <td>
                {{ dataDetail.department }}
              </td>
            </tr>
            <tr>
              <th scope="row">
                <!-- 대상학년 -->
                {{ t("certificationReport.manageApprovedSubjects.field23") }}
              </th>
              <td class="td_input">
                {{ dataDetail.yearEdu }}
              </td>
            </tr>
            <tr>
              <th scope="row">
                <!-- 유형 -->
                {{ t("certificationReport.manageApprovedSubjects.field24") }}
              </th>
              <td>
                {{ dataDetail.divSubject }}
              </td>
            </tr>
            <tr>
              <th scope="row">
                <!-- 설계 -->
                {{ t("certificationReport.manageApprovedSubjects.field25") }}
              </th>
              <td class="td_input">
                <ul>
                  <li>
                    <!-- 1.강의계획서 -->
                    {{
                      t("certificationReport.manageApprovedSubjects.field26")
                    }}
                    <!-- TODO: Report 강의계획서 -->
                    <!-- <InputFileBase
                  :type="fileTypeImg"
                  :showMess="false" :referKey="`P${searchForm.idDept}${searchForm.year}${item.id}`"
                          v-model="item.fileUpLoad" :mode="modefile" :id="`plansFile_${item.id}`"
                          :name="`plansFile_${item.id}`" :ref="`P${searchForm.idDept}${searchForm.year}${item.id}`"
                          :orgName="'plansFile_report'" :type="fileType" :category="'plansFile_report'"
                          :sectionName="'plansFile_report'">
                        </InputFileBase> -->
                  </li>
                  <li>
                    <span class="dp_flex mt-2 al_center">
                      <!-- 2.교육계획서 -->
                      {{
                        t("certificationReport.manageApprovedSubjects.field27")
                      }}
                      <InputFileBase
                        v-if="dataDetail.idCert"
                        :type="fileTypeImg"
                        :showMess="false"
                        :referKey="`${dataDetail.idCert}`"
                        :mode="modefile"
                        v-model="dataDetail.fileResult"
                        :id="`result_education_${dataDetail.idCert}`"
                        :name="`result_education_${dataDetail.idCert}`"
                        :ref="`result_education_${dataDetail.idCert}`"
                        :orgName="'result_education'"
                        :category="'result_education'"
                        :sectionName="'result_education'"
                      >
                      </InputFileBase>
                    </span>
                  </li>
                  <li>
                    <span class="dp_flex mt-2 al_center">
                      <!-- 3.계획서(학습자) -->
                      {{
                        t("certificationReport.manageApprovedSubjects.field28")
                      }}
                      <InputFileBase
                        v-if="dataDetail.idCert"
                        :type="fileTypeImg"
                        :showMess="false"
                        :referKey="`${dataDetail.idCert}`"
                        :mode="modefile"
                        v-model="dataDetail.fileResultUser"
                        :id="`result_education_user_${dataDetail.idCert}`"
                        :name="`result_education_user_${dataDetail.idCert}`"
                        :ref="`result_education_user_${dataDetail.idCert}`"
                        :orgName="'result_education_user'"
                        :category="'result_education_user'"
                        :sectionName="'result_education_user'"
                      >
                      </InputFileBase>
                    </span>
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <th scope="row">
                <!-- 운영 -->
                {{ t("certificationReport.manageApprovedSubjects.field29") }}
              </th>
              <td>
                <ul>
                  <li>
                    <span class="dp_flex mt-2 al_center">
                      <!-- 4.결과보고서(학습자) -->
                      {{
                        t("certificationReport.manageApprovedSubjects.field30")
                      }}
                      <InputFileBase
                        v-if="dataDetail.idCert"
                        :type="fileTypeImg"
                        :showMess="false"
                        :referKey="`${dataDetail.idCert}`"
                        v-model="dataDetail.filePlanUser"
                        :mode="modefile"
                        :id="`plan_education_user_${dataDetail.idCert}`"
                        :name="`plan_education_user_${dataDetail.idCert}`"
                        :ref="`plan_education_user_${dataDetail.idCert}`"
                        :orgName="'plan_education_user'"
                        :category="'plan_education_user'"
                        :sectionName="'plan_education_user'"
                      >
                      </InputFileBase>
                    </span>
                  </li>
                  <li>
                    <span class="dp_flex mt-2 al_center">
                      <!-- 5.수업운영결과보고서 -->
                      {{
                        t("certificationReport.manageApprovedSubjects.field31")
                      }}
                      <InputFileBase
                        v-if="dataDetail.idCert"
                        :type="fileTypeImg"
                        :showMess="false"
                        :referKey="`${dataDetail.idCert}`"
                        :mode="modefile"
                        v-model="dataDetail.filePlanOperate"
                        :id="`result_plan_operate_${dataDetail.idCert}`"
                        :name="`result_plan_operate_${dataDetail.idCert}`"
                        :ref="`result_plan_operate_${dataDetail.idCert}`"
                        :orgName="'result_plan_operate'"
                        :category="'result_plan_operate'"
                        :sectionName="'result_plan_operate'"
                      >
                      </InputFileBase>
                    </span>
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <th scope="row">
                <!-- 성과 -->
                {{ t("certificationReport.manageApprovedSubjects.field32") }}
              </th>
              <td>
                <ul>
                  <li>
                    <span class="dp_flex mt-2 al_center">
                      <!-- 6.평가결과표 -->
                      {{
                        t("certificationReport.manageApprovedSubjects.field33")
                      }}
                      <InputFileBase
                        v-if="dataDetail.idCert"
                        :type="fileTypeImg"
                        :showMess="false"
                        :referKey="`${dataDetail.idCert}`"
                        :mode="modefile"
                        v-model="dataDetail.fileResultPlanEval"
                        :id="`result_plan_eval_${dataDetail.idCert}`"
                        :name="`result_plan_eval_${dataDetail.idCert}`"
                        :ref="`result_plan_eval_${dataDetail.idCert}`"
                        :orgName="'result_plan_eval'"
                        :category="'result_plan_eval'"
                        :sectionName="'result_plan_eval'"
                        :previewFlag="false"
                      >
                      </InputFileBase>
                    </span>
                  </li>
                  <li>
                    <!-- 7.CQI보고서 -->
                    {{
                      t("certificationReport.manageApprovedSubjects.field34")
                    }}
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="box_section mt-6">
        <div class="btn_group btn_end">
          <button
            v-if="checkButton"
            type="button"
            class="button btn_xs btn_blue"
            :disabled="isDisable"
            @click="registerCapstone"
          >
            <!-- 심사 신청 -->
            {{ t("certificationReport.manageApprovedSubjects.button2") }}
          </button>
          <button
            type="button"
            class="button btn_xs btn_white"
            @click="gotoPage"
          >
            {{ t("06.capstoneDesign.tableAchievements.button.list") }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import { commonStore } from "@/stores/common";
import { SCREEN } from "@/router/screen";
import InputBase from "@/components/common/input/InputBase.vue";
import TextArea from "@/components/common/input/TextArea.vue";
import { useI18n } from "vue-i18n";
import type { CodeMngModel } from "@/stores/common/codeMng/codeMng.type";
import { getListCodeMng } from "@/stores/common/codeMng/codeMng.service";
import {
  CAPSTONE_DESIGN_FIELD,
  CAPSTONE_DESIGN_FIELD_BASIC,
  CAPSTONE_DESIGN_STATUS_APPROVE_1,
  CAPSTONE_DESIGN_STATUS_APPROVE_2,
  CAPSTONE_DESIGN_STATUS_BEFORE_APPROVE,
} from "@/constants/common.const";
import {
  FILE_TYPE_OFFICE,
  MODE_DETAIL,
  MODE_EDIT,
} from "@/constants/screen.const";
import {
  getDetailCapstone,
  registerCapstone,
} from "@/stores/approvedSubjectsStaff/approvedSubjectsStaff.service";

export default {
  components: {
    Breadcrumb,
    InputBase,
    TextArea,
  },
  data() {
    return {
      /* '캡스톤 디자인 교과목 인증제 신청 ' */
      pageTitle: this.t("certificationReport.manageApprovedSubjects.title4"),
      breadcrumbItems: [],
      modeScreen: "" as any,
      listRadioField: [] as CodeMngModel[],
      dataForm: {
        status: "",
      },
      modefile: MODE_DETAIL,
      id: "",
      fileTypeImg: FILE_TYPE_OFFICE,
      dataDetail: {
        idCert: "",
        status: "",
        name: "",
        typeSubject: "",
        codeLect: "",
        divSubject: "",
        fieldRegister: "",
        teacher: "",
        department: "",
        yearEdu: "",
        fileResultPlanEval: [],
        filePlanOperate: [],
        fileResult: [],
        fileResultUser: [],
        filePlanUser: [],
      },
      isDisable: true,
      checkButton: true,
    };
  },
  setup() {
    const { t } = useI18n();
    const store = commonStore();

    return {
      t,
      store,
    };
  },
  async beforeMount() {
    this.id = window.history.state.id;
    await getListCodeMng({
      upCdIdList: [CAPSTONE_DESIGN_FIELD],
    }).then((res) => {
      this.listRadioField = res.data.data.filter(
        (el: CodeMngModel) => el.upCdId == CAPSTONE_DESIGN_FIELD
      );
    });
    if (this.id) {
      await this.goToDetail();
    }
  },
  watch: {
    "dataDetail.filePlanOperate": "checkValidate",
    "dataDetail.filePlanUser": "checkValidate",
    "dataDetail.fileResult": "checkValidate",
    "dataDetail.fileResultPlanEval": "checkValidate",
    "dataDetail.fileResultUser": "checkValidate",
  },
  methods: {
    checkData(metlSeq: any) {
      const childComponent = this.$refs[metlSeq];
      childComponent.upLoadFile(this.dataDetail.idCert);
    },
    checkValidate() {
      if (
        !this.dataDetail.filePlanOperate ||
        this.dataDetail.filePlanOperate.length <= 0 ||
        !this.dataDetail.filePlanUser ||
        this.dataDetail.filePlanUser.length <= 0 ||
        !this.dataDetail.fileResult ||
        this.dataDetail.fileResult.length <= 0 ||
        !this.dataDetail.fileResultPlanEval ||
        this.dataDetail.fileResultPlanEval.length <= 0 ||
        !this.dataDetail.fileResultUser ||
        this.dataDetail.fileResultUser.length <= 0
      ) {
        this.isDisable = true;
      } else {
        this.isDisable = false;
      }
    },
    gotoPage() {
      this.$router.push({
        name: SCREEN.approveSubjectStaff.name,
      });
    },
    goToDetail() {
      this.store.setLoading(true);
      getDetailCapstone(this.id)
        .then((res) => {
          this.dataDetail = res.data.data;
          this.dataDetail.fieldRegister = this.dataDetail.fieldRegister
            ? this.dataDetail.fieldRegister
            : CAPSTONE_DESIGN_FIELD_BASIC;
          if (
            this.dataDetail.status == CAPSTONE_DESIGN_STATUS_BEFORE_APPROVE ||
            this.dataDetail.status == CAPSTONE_DESIGN_STATUS_APPROVE_1 ||
            this.dataDetail.status == CAPSTONE_DESIGN_STATUS_APPROVE_2
          ) {
            this.modefile = MODE_DETAIL;
            this.checkButton = false;
          } else {
            this.modefile = MODE_EDIT;
            this.checkButton = true;
          }
        })
        .finally(() => {
          this.store.setLoading(false);
        });
    },
    registerCapstone() {
      this.$swal({
        /* "교과목 인증제 승인처리하시겠어요?" */
        text: this.t("certificationReport.manageApprovedSubjects.title4"),
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "승인",
        cancelButtonText: "취소",
      }).then((result: any) => {
        if (result.isConfirmed) {
          this.store.setLoading(true);
          let params = {
            idCert: this.dataDetail.idCert,
            fieldSubject: this.dataDetail.fieldRegister,
          };
          registerCapstone(params)
            .then((res) => {
              this.checkData(`result_education_${this.dataDetail.idCert}`);
              this.checkData(`result_education_user_${this.dataDetail.idCert}`);
              this.checkData(`plan_education_user_${this.dataDetail.idCert}`);
              this.checkData(`result_plan_operate_${this.dataDetail.idCert}`);
              this.checkData(`result_plan_eval_${this.dataDetail.idCert}`);
            })
            .finally(() => {
              this.store.setLoading(false);

              this.$swal({
                /* "승인처리됐습니다." */
                text: this.t(
                  "certificationReport.manageApprovedSubjects.message4"
                ),
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "확인",
              });
              this.gotoPage();
            });
        }
      });
    },
  },
};
</script>
<style>
.file_name > p {
  padding: 0;
  margin-left: 10px;
}
</style>
