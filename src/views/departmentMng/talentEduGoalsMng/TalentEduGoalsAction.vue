<template>
  <!-- 학과인재상 및 교육목표 등록 -->
  <section id="content" class="content_wrapper grid_content" tabindex="0">
    <div class="section_tit_wrap">
      <h3 class="section_tit_md">{{ t("talentEduGoalsMng.form.title") }}</h3>
    </div>
    <table class="tbl_row">
      <colgroup>
        <col style="width: 25%" />
      </colgroup>
      <tbody>
        <tr>
          <th scope="row">
            <!-- 학과 -->
            <p class="required">
              {{ t("talentEduGoalsMng.form.dept") }}
            </p>
          </th>
          <td class="td_input">
            {{ deptNmSelect }}
          </td>
        </tr>
        <tr>
          <th scope="row">
            <p class="required">
              <!-- 학년도 -->
              {{ t("talentEduGoalsMng.form.year") }}
            </p>
          </th>
          <td class="td_input">
            <div class="select_form wd_p100">
              <SelectBoxBase
                :id="'selectbox'"
                :name="'selectbox'"
                v-model="dataForm.year"
                :data="listSelectBoxYear"
              >
              </SelectBoxBase>
            </div>
          </td>
        </tr>
        <tr>
          <th scope="row">
            <p class="required">
              <!-- 학과 비전 -->
              {{ t("talentEduGoalsMng.form.vision") }}
            </p>
          </th>
          <td class="td_input">
            <div
              class="dp_flex al_center mb-1"
              v-for="(item, index) in dataForm.visionDept"
              :key="`vision_${item.id || index}`"
            >
              <div class="mr-5 flex-[7]">
                <InputBase
                  :id="`vision_` + (item.id || index)"
                  required
                  v-model="item.value"
                  class="form_style"
                />
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <th scope="row">
            <p class="required">
              <!-- 학과 교육목표 -->
              {{ t("talentEduGoalsMng.form.edu") }}
            </p>
          </th>
          <td class="td_input">
            <div
              class="dp_flex al_center mb-1"
              v-for="(item, index) in dataForm.targetDept"
              :key="`target_${item.id || index}`"
            >
              <div class="mr-5 flex-[7]">
                <InputBase
                  :id="`target_` + (item.id || index)"
                  required
                  v-model="item.value"
                  class="form_style"
                />
              </div>
              <div class="flex-[1]">
                <ButtonBase
                  v-if="index == 0"
                  class="btn_round btn_lg btn_gray mg_l5"
                  @click="addObject('targetDept')"
                  :buttonName="t('common.add')"
                >
                  <!-- 추가 -->
                </ButtonBase>
                <ButtonBase
                  v-if="index != 0"
                  class="btn_round btn_lg btn_gray mg_l5"
                  @click="eventDeleteObject(index, 'targetDept')"
                  :buttonName="t('common.deleteItem')"
                >
                  <!-- 삭제 -->
                </ButtonBase>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <th scope="row">
            <p class="required">
              <!-- 학과 인재상 -->
              {{ t("talentEduGoalsMng.form.talent") }}
            </p>
          </th>
          <td>
            <div
              class="dp_flex al_center mb-1"
              v-for="(item, index) in dataForm.modelDept"
              :key="`model_${item.id || index}`"
            >
              <div class="mr-5 flex-[7]">
                <InputBase
                  :id="`model_` + (item.id || index)"
                  required
                  v-model="item.value"
                  class="form_style"
                />
              </div>
              <div class="flex-[1]">
                <ButtonBase
                  v-if="index == 0"
                  class="btn_round btn_lg btn_gray mg_l5"
                  @click="addObject('modelDept')"
                  :buttonName="t('common.add')"
                >
                  <!-- 추가 -->
                </ButtonBase>
                <ButtonBase
                  v-if="index != 0"
                  class="btn_round btn_lg btn_gray mg_l5"
                  @click="eventDeleteObject(index, 'modelDept')"
                  :buttonName="t('common.deleteItem')"
                >
                  <!-- 삭제 -->
                </ButtonBase>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <th scope="row">
            <p class="required">
              <!-- 학과 발전계획 -->
              {{ t("talentEduGoalsMng.form.progress") }}
            </p>
          </th>
          <td>
            <div
              class="dp_flex al_center mb-1"
              v-for="(item, index) in dataForm.planDept"
              :key="index"
            >
              <TextArea :id="`plan1_` + index" required v-model="item.value" />
            </div>
          </td>
        </tr>
        <tr>
          <th scope="row">
            <p class="required">
              <!-- 졸업 후 진로 -->
              {{ t("talentEduGoalsMng.form.carrerAfterGraduation") }}
            </p>
          </th>
          <td>
            <div
              class="dp_flex al_center mb-1"
              v-for="(item, index) in dataForm.roadGraduationDept"
              :key="index"
            >
              <TextArea :id="`plan2_` + index" required v-model="item.value" />
            </div>
          </td>
        </tr>
        <tr>
          <th scope="row">
            <p class="required">
              <!-- 취득 가능 자격증 -->
              {{ t("talentEduGoalsMng.form.qualificationsAvailable") }}
            </p>
          </th>
          <td>
            <div
              class="dp_flex al_center mb-1"
              v-for="(item, index) in dataForm.certificateDept"
              :key="index"
            >
              <TextArea :id="`plan2_` + index" required v-model="item.value" />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="btn_group btn_end">
      <ButtonBase
        type="button"
        class="btn_round btn_sm btn_primary"
        @click="saveData"
        :buttonName="t('common.save')"
      >
      </ButtonBase>
      <ButtonBase
        type="button"
        class="btn_round btn_sm btn_white"
        @click="goBack()"
        :buttonName="t('common.list')"
      >
      </ButtonBase>
    </div>
  </section>
</template>

<script lang="ts">
import { useI18n } from "vue-i18n";
import { commonStore } from "@/stores/common";
import type { CodeMngModel } from "@/stores/common/codeMng/codeMng.type";
import {
  detailById,
  create,
  update,
  checkDelete,
} from "@/stores/departmentService/talentEduGoal/talentEduGoal.service";
import { MESSAGE_ERROR_API } from "@/constants/common.const";
import type {
  DeptEduGoalDetailDTO,
  DeptEduGoalReqDTO,
  SimpleDeptEduDTO,
} from "@/stores/departmentService/talentEduGoal/talentEduGoal.type";
import InputBase from "@/components/common/input/InputBase.vue";
import { getUserInfo } from "@/utils/storage";
import { getDepartmentList } from "@/stores/common/department/department.service";
import TextAreaBase from "@/components/common/input/TextAreaBase.vue";
import { SCREEN } from "@/router/screen";
import ButtonBase from "@/components/common/button/ButtonBase.vue";

export default {
  name: "ModalForm",
  components: {
    InputBase,
    TextAreaBase,
    ButtonBase,
  },
  setup() {
    const { t } = useI18n();
    const store = commonStore();
    const userLogin = JSON.parse(getUserInfo());

    return {
      t,
      store,
      userLogin,
    };
  },
  data() {
    return {
      listSelectBoxYear: [] as CodeMngModel[],
      deptNmSelect: "" as String,
      majorNmSelect: "" as String,
      dept: "" as String,
      year: "" as String,
      dataForm: {
        // major: '',
        dept: "",
        year: 0,
        visionDept: [
          {
            id: "",
            value: "",
          },
        ] as SimpleDeptEduDTO[],
        modelDept: [
          {
            id: "",
            value: "",
          },
        ] as SimpleDeptEduDTO[],
        targetDept: [
          {
            id: "",
            value: "",
          },
        ] as SimpleDeptEduDTO[],
        planDept: [
          {
            id: "",
            value: "",
          },
        ] as SimpleDeptEduDTO[],
        roadGraduationDept: [
          {
            id: "",
            value: "",
          },
        ] as SimpleDeptEduDTO[],
        certificateDept: [
          {
            id: "",
            value: "",
          },
        ] as SimpleDeptEduDTO[],
      } as DeptEduGoalDetailDTO,
    };
  },

  computed: {
    isRequiredValidate() {
      const { check } = this.store;

      return check;
    },
  },

  async beforeMount() {
    this.dataForm.year = new Date().getFullYear();
    this.deptNmSelect = window.history.state.deptNm;
    this.majorNmSelect = window.history.state.major;
    this.dept = window.history.state.deptSelect;
    this.year = window.history.state.yearSelect;
    for (
      let year = this.dataForm.year;
      year <= this.dataForm.year + 1;
      year++
    ) {
      this.listSelectBoxYear.push({
        cdId: year,
        cdNm: year,
        upCdId: "year",
      });
    }

    if (this.dept && this.year) {
      this.goToDetail();
    } else {
      let upDeptCd = null;
      this.store.setLoading(true);
      await getDepartmentList({
        deptCd: [this.userLogin.deptCd],
        deptDivCd: [],
        upDeptCd: [],
        useYn: "",
      }).then((res) => {
        if (res.data.data.length > 0) {
          this.deptNmSelect = res.data.data[0].deptNm;
          this.dataForm.dept = res.data.data[0].deptCd;
          upDeptCd = res.data.data[0].upDeptCd;
        }
      });
      if (upDeptCd) {
        await getDepartmentList({
          deptCd: [upDeptCd],
          deptDivCd: [],
          upDeptCd: [],
          useYn: "",
        }).then((res) => {
          if (res.data.data.length > 0) {
            this.majorNmSelect = res.data.data[0].deptNm;
          }
        });
      }
      this.store.setLoading(false);
    }
  },
  methods: {
    goToDetail() {
      this.store.setLoading(true);
      detailById({ dept: this.dept, year: this.year })
        .then((res) => {
          this.dataForm = res.data.data;

          if (
            !this.dataForm.visionDept ||
            this.dataForm.visionDept.length == 0
          ) {
            this.dataForm.visionDept = [
              {
                id: "",
                value: "",
              },
            ];
          }
          if (!this.dataForm.modelDept || this.dataForm.modelDept.length == 0) {
            this.dataForm.modelDept = [
              {
                id: "",
                value: "",
              },
            ];
          }
          if (
            !this.dataForm.targetDept ||
            this.dataForm.targetDept.length == 0
          ) {
            this.dataForm.targetDept = [
              {
                id: "",
                value: "",
              },
            ];
          }
          if (!this.dataForm.planDept || this.dataForm.planDept.length == 0) {
            this.dataForm.planDept = [
              {
                id: "",
                value: "",
              },
            ];
          }
          if (
            !this.dataForm.roadGraduationDept ||
            this.dataForm.roadGraduationDept.length == 0
          ) {
            this.dataForm.roadGraduationDept = [
              {
                id: "",
                value: "",
              },
            ];
          }
          if (
            !this.dataForm.certificateDept ||
            this.dataForm.certificateDept.length == 0
          ) {
            this.dataForm.certificateDept = [
              {
                id: "",
                value: "",
              },
            ];
          }
        })
        .catch(() => {
          throw new Error(MESSAGE_ERROR_API);
        })
        .finally(() => {
          this.store.setLoading(false);
        });
    },
    saveData() {
      const isFormValid =
        this.dataForm.year &&
        this.dataForm.dept &&
        this.dataForm.visionDept.every((item) => item.value.trim() !== "") &&
        this.dataForm.modelDept.every((item) => item.value.trim() !== "") &&
        this.dataForm.targetDept.every((item) => item.value.trim() !== "") &&
        this.dataForm.planDept.every((item) => item.value.trim() !== "") &&
        this.dataForm.roadGraduationDept.every(
          (item) => item.value.trim() !== ""
        ) &&
        this.dataForm.certificateDept.every((item) => item.value.trim() !== "");

      if (!isFormValid) {
        this.$swal.fire({
          text: this.t("talentEduGoalsMng.message.valid"),
          type: "warning",
          confirmButtonColor: "#DD6B55",
          confirmButtonText: this.t("common.confirm"),
        });
        return;
      }

      if (this.store.check) {
        this.$swal.fire({
          text: this.t("common.messageValidateRequired"),
          confirmButtonColor: "#DD6B55",
          confirmButtonText: this.t("common.save"),
        });
        return;
      }
      this.$swal({
        /* 저장하시겠어요? */
        text: this.t("talentEduGoalsMng.message.confirmSave"),
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: this.t("common.save"),
        cancelButtonText: this.t("common.cancel"),
      }).then((result) => {
        if (result.isConfirmed) {
          if (this.year && this.dept) {
            this.updateDept();
          } else {
            this.createDept();
          }
        }
      });
    },
    createDept() {
      let dataSave = {
        dept: this.dataForm.dept,
        year: this.dataForm.year,
        modelDept: this.dataForm.modelDept,
        planDept: this.dataForm.planDept,
        targetDept: this.dataForm.targetDept,
        visionDept: this.dataForm.visionDept,
        roadGraduationDept: this.dataForm.roadGraduationDept,
        certificateDept: this.dataForm.certificateDept,
      } as DeptEduGoalReqDTO;

      this.store.setLoading(true);
      create(dataSave)
        .then((res) => {
          let textAlert = "";
          if (res.data.data) {
            textAlert = this.t("talentEduGoalsMng.message.saveSuccess");
          } else {
            textAlert = this.t("talentEduGoalsMng.message.saveError");
          }
          this.$swal
            .fire({
              /* 정상처리됐습니다. */
              text: textAlert,
              confirmButtonColor: "#DD6B55",
              confirmButtonText: this.t("common.confirm"),
            })
            .then((res) => {
              this.goBack();
            });
        })
        .catch((err) => {
          throw new Error(MESSAGE_ERROR_API);
        })
        .finally(() => {
          this.store.setLoading(false);
        });
    },
    updateDept() {
      let dataSave = {
        dept: this.dept,
        year: this.dataForm.year,
        modelDept: this.dataForm.modelDept,
        planDept: this.dataForm.planDept,
        targetDept: this.dataForm.targetDept,
        visionDept: this.dataForm.visionDept,
        roadGraduationDept: this.dataForm.roadGraduationDept,
        certificateDept: this.dataForm.certificateDept,
      } as DeptEduGoalReqDTO;

      this.store.setLoading(true);
      update(dataSave)
        .then((res) => {
          this.$swal
            .fire({
              /* 정상처리됐습니다. */
              text: this.t("talentEduGoalsMng.message.saveSuccess"),
              confirmButtonColor: "#DD6B55",
              confirmButtonText: this.t("common.confirm"),
            })
            .then((res) => {
              this.goBack();
            });
        })
        .catch((err) => {
          throw new Error(MESSAGE_ERROR_API);
        })
        .finally(() => {
          this.store.setLoading(false);
        });
    },
    addObject(type: string) {
      this.dataForm[type].push({
        id: "",
        value: "",
      });
    },
    deleteObject(indexDel: number, type: string) {
      this.$swal
        .fire({
          /* 정상처리됐습니다. */
          text: this.t("talentEduGoalsMng.message.deleteSuccess"),
          confirmButtonColor: "#DD6B55",
          confirmButtonText: this.t("common.confirm"),
        })
        .then((res) => {
          this.dataForm[type] = this.dataForm[type].filter(
            (el: any, index: number) => index != indexDel
          );
        });
    },
    eventDeleteObject(indexDel: number, type: string) {
      this.$swal({
        /* 저장하시겠어요? */
        text: this.t("talentEduGoalsMng.message.confirmDelete"),
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: this.t("common.delete"),
        cancelButtonText: this.t("common.cancel"),
      }).then((result: any) => {
        if (result.isConfirmed) {
          this.store.setLoading(true);
          if (
            this.dataForm[type][indexDel].id &&
            this.dataForm[type][indexDel].id.trim().length != 0
          ) {
            checkDelete(this.dataForm[type][indexDel].id).then((res) => {
              if (res.data.data) {
                this.deleteObject(indexDel, type);
              } else {
                this.$swal.fire({
                  /* 정상처리됐습니다. */
                  text: this.t("talentEduGoalsMng.message.deleteError"),
                  confirmButtonColor: "#DD6B55",
                  confirmButtonText: this.t("common.confirm"),
                });
              }
            });
          } else {
            this.deleteObject(indexDel, type);
          }

          this.store.setLoading(false);
        }
      });
    },
    goBack() {
      this.$router.push({
        name: SCREEN.talentEduGoalsMngDept.name,
      });
    },
  },
};
</script>
<style scoped>
.custom_scroll {
  max-height: 400px;
  overflow-y: auto;
  padding-right: 10px;
}
</style>
