<template>
  <TModal
    :is-open="isOpen"
    :is-show-header="true"
    :is-show-footer="true"
    :modal-id="'modal_form'"
    @close-modal="onClose"
  >
    <!-- Modal content goes here -->
    <template #title>
      <strong>{{ t("02.modelTalentUni.talentAndGoal.pageTitle") }}</strong>
    </template>
    <template #default>
      <table class="tbl_row">
        <colgroup>
          <col style="width: 25%" />
        </colgroup>
        <tbody>
          <tr>
            <th scope="row">
              <p class="required">
                <!-- 학년도 -->
                {{ t("02.modelTalentUni.talentAndGoal.year") }}
              </p>
            </th>
            <td class="td_input">
              <div class="select_form wd_p100">
                <SelectBoxBase
                  :mode="'detail'"
                  :id="'selectbox'"
                  :name="'selectbox'"
                  v-model="dataForm.eduYear"
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
                {{ t("02.modelTalentUni.talentAndGoal.form.vision") }}
              </p>
            </th>
            <td class="td_input">
              <div
                class="flex w-full mb-1 form-vision"
                v-for="(item, index) in dataForm.visionDept"
                :key="index"
              >
                <InputBase
                  :id="`vision_` + index"
                  class="mr-5"
                  required
                  v-model="item.value"
                />
                <div class="add-delete">
                  <button
                    v-if="index == 0"
                    class="button btn_sm btn_medium_gray border_medium_gray bo_rd6 font_base_2 w-[100%]"
                    @click="addObject('visionDept')"
                  >
                    <!-- 추가 -->
                    {{ t("common.add") }}
                  </button>
                  <button
                    v-if="index != 0"
                    class="button btn_sm btn_medium_gray border_medium_gray bo_rd6 font_base_2 w-[100%]"
                    @click="eventDeleteObject(index, 'visionDept')"
                  >
                    <!-- 삭제 -->
                    {{ t("common.deleteItem") }}
                  </button>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row">
              <p class="required">
                <!-- 학과 인재상 -->
                {{ t("02.modelTalentUni.talentAndGoal.form.talent") }}
              </p>
            </th>
            <td>
              <div
                class="flex w-full mb-1 form-vision"
                v-for="(item, index) in dataForm.modelDept"
                :key="index"
              >
                <InputBase
                  :id="`model_` + index"
                  class="mr-5"
                  required
                  v-model="item.value"
                />
                <div class="add-delete">
                  <button
                    v-if="index == 0"
                    class="button btn_sm btn_medium_gray border_medium_gray bo_rd6 font_base_2 w-[100%]"
                    @click="addObject('modelDept')"
                  >
                    <!-- 추가 -->
                    {{ t("common.add") }}
                  </button>
                  <button
                    v-if="index != 0"
                    class="button btn_sm btn_medium_gray border_medium_gray bo_rd6 font_base_2 w-[100%]"
                    @click="eventDeleteObject(index, 'modelDept')"
                  >
                    <!-- 삭제 -->
                    {{ t("common.deleteItem") }}
                  </button>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row">
              <p class="required">
                <!-- 학과 교육목표 -->
                {{ t("02.modelTalentUni.talentAndGoal.form.edu") }}
              </p>
            </th>
            <td class="td_input">
              <div
                class="flex w-full mb-1 form-vision"
                v-for="(item, index) in dataForm.targetDept"
                :key="index"
              >
                <InputBase
                  :id="`target_` + index"
                  class="mr-5"
                  required
                  v-model="item.value"
                />
                <div class="add-delete">
                  <button
                    v-if="index == 0"
                    class="button btn_sm btn_medium_gray border_medium_gray bo_rd6 font_base_2 w-[100%]"
                    @click="addObject('targetDept')"
                  >
                    <!-- 추가 -->
                    {{ t("common.add") }}
                  </button>
                  <button
                    v-if="index != 0"
                    class="button btn_sm btn_medium_gray border_medium_gray bo_rd6 font_base_2 w-[100%]"
                    @click="eventDeleteObject(index, 'targetDept')"
                  >
                    <!-- 삭제 -->
                    {{ t("common.deleteItem") }}
                  </button>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row">
              <p class="required">
                <!-- 학과 발전계획 -->
                {{ t("02.modelTalentUni.talentAndGoal.form.progress") }}
              </p>
            </th>
            <td>
              <div
                class="flex w-full mb-1 form-vision"
                v-for="(item, index) in dataForm.planDept"
                :key="index"
              >
                <InputBase
                  :id="`plan_` + index"
                  class="mr-5"
                  required
                  v-model="item.value"
                />
                <div class="add-delete">
                  <button
                    v-if="index == 0"
                    class="button btn_sm btn_medium_gray border_medium_gray bo_rd6 font_base_2 w-[100%]"
                    @click="addObject('planDept')"
                  >
                    <!-- 추가 -->
                    {{ t("common.add") }}
                  </button>
                  <button
                    v-if="index != 0"
                    class="button btn_sm btn_medium_gray border_medium_gray bo_rd6 font_base_2 w-[100%]"
                    @click="eventDeleteObject(index, 'planDept')"
                  >
                    <!-- 삭제 -->
                    {{ t("common.deleteItem") }}
                  </button>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </template>
    <template #footer>
      <div class="btn_group btn_end" style="gap: 10px">
        <button
          type="button"
          @click="saveData"
          class="btn_sm btn_black border_medium_gray bo_rd4 font_base_2"
        >
          <!-- 확인 -->
          {{ t("common.save") }}
        </button>
        <button
          type="button"
          class="btn_sm btn_white border_medium_gray bo_rd4"
          @click="onClose()"
        >
          <!-- 닫기 -->
          {{ t("common.close") }}
        </button>
      </div>
    </template>
  </TModal>
</template>

<script lang="ts">
import InputBase from "@/components/common/input/InputBase.vue";
import { commonStore } from "@/stores/common";
import { CodeMngModel } from "@/stores/common/codeMng/codeMng.type";
import {
  EduPart,
  SchEduGoal,
} from "@/stores/talentAndGoals/talentAndGoals.type";
import { MESSAGE_ERROR_API } from "@/constants/common.const";
import {
  createSchEdu,
  detailById,
  updateSchEdu,
} from "@/stores/talentAndGoals/talentAndGoals.service";
import { talentStore } from "@/stores/talentAndGoals";
import { SUCCSESS_STATUS } from "@/constants/screen.const";

export default {
  name: "ModalForm",
  components: {
    InputBase,
  },
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    onClose: {
      type: Function,
      required: true,
    },
    loadTable: {
      type: Function,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
  },
  setup() {
    const { t } = useI18n();
    const store = commonStore();
    const schEduStore = talentStore();

    return {
      t,
      store,
      schEduStore,
    };
  },
  beforeMount() {
    this.dataForm.eduYear = new Date().getFullYear();
    for (
      let year = this.dataForm.eduYear;
      year <= this.dataForm.eduYear + 1;
      year++
    ) {
      this.listSelectBoxYear.push({
        cdId: year,
        cdNm: year,
        upCdId: "year",
      });
    }

    if (this.year) {
      this.goToDetail();
    }
  },

  data() {
    return {
      listSelectBoxYear: [] as CodeMngModel[],
      deptNmSelect: "" as String,
      dataForm: {
        eduYear: 0,
        visionDept: [
          {
            id: "",
            value: "",
          },
        ] as EduPart[],
        modelDept: [
          {
            id: "",
            value: "",
          },
        ] as EduPart[],
        targetDept: [
          {
            id: "",
            value: "",
          },
        ] as EduPart[],
        planDept: [
          {
            id: "",
            value: "",
          },
        ] as EduPart[],
      } as SchEduGoal,
    };
  },
  methods: {
    goToDetail() {
      this.store.setLoading(true);
      detailById({ year: this.year })
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
        })
        .catch(() => {
          throw new Error(MESSAGE_ERROR_API);
        })
        .finally(() => {
          this.store.setLoading(false);
        });
    },

    saveData() {
      if (!this.store.check) {
        this.$swal({
          /* 저장하시겠어요? */
          text: this.t("02.modelTalentUni.talentAndGoal.alert.save"),
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: this.t("common.save"),
          cancelButtonText: this.t("common.cancel"),
        }).then((result) => {
          if (result.isConfirmed) {
            if (this.year) {
              this.updateDept();
            } else {
              this.createDept();
            }
          }
        });
      } else {
        this.$swal({
          /* 저장하시겠어요? */
          text: this.t("common.messageValidateRequired"),
          type: "warning",
          showCancelButton: false,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: this.t("common.confirm"),
        });
      }
    },
    updateDept() {
      let dataSave = {
        eduYear: this.dataForm.eduYear,
        modelDept: this.dataForm.modelDept,
        planDept: this.dataForm.planDept,
        targetDept: this.dataForm.targetDept,
        visionDept: this.dataForm.visionDept,
      } as SchEduGoal;

      this.store.setLoading(true);
      updateSchEdu(dataSave)
        .then((res) => {
          this.$swal
            .fire({
              /* 정상처리됐습니다. */
              text: this.t("02.modelTalentUni.talentAndGoal.alert.saveSuccess"),
              confirmButtonColor: "#DD6B55",
              confirmButtonText: this.t("common.confirm"),
            })
            .then((res) => {
              this.onClose();
              this.loadTable();
            });
        })
        .catch((err) => {
          throw new Error(MESSAGE_ERROR_API);
        })
        .finally(() => {
          this.store.setLoading(false);
        });
    },

    createDept() {
      let dataSave = {
        eduYear: this.dataForm.eduYear,
        modelDept: this.dataForm.modelDept,
        planDept: this.dataForm.planDept,
        targetDept: this.dataForm.targetDept,
        visionDept: this.dataForm.visionDept,
      } as SchEduGoal;

      this.store.setLoading(true);
      createSchEdu(dataSave)
        .then((res) => {
          let textAlert = "";
          if (res.data.data) {
            textAlert = this.t(
              "02.modelTalentUni.talentAndGoal.alert.saveSuccess"
            );
          } else {
            textAlert = this.t(
              "02.modelTalentUni.talentAndGoal.alert.saveError"
            );
          }

          this.$swal
            .fire({
              /* 정상처리됐습니다. */
              text: textAlert,
              confirmButtonColor: "#DD6B55",
              confirmButtonText: this.t("common.confirm"),
            })
            .then((res) => {
              this.onClose();
              this.loadTable();
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
          text: this.t("02.modelTalentUni.talentAndGoal.alert.deleteSuccess"),
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
        text: this.t("02.modelTalentUni.talentAndGoal.alert.delete"),
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: this.t("common.save"),
        cancelButtonText: this.t("common.cancel"),
      }).then(async (result: any) => {
        if (result.isConfirmed) {
          this.store.setLoading(true);
          let schId = this.dataForm[type][indexDel].id;

          if (schId && schId.trim().length != 0) {
            await this.schEduStore.checkRemoveSch(schId);
            if (
              this.schEduStore.status &&
              this.schEduStore.status == SUCCSESS_STATUS
            ) {
              this.deleteObject(indexDel, type);
            } else {
              this.$swal.fire({
                text: this.t(
                  "02.modelTalentUni.talentAndGoal.alert.deleteError"
                ),
                confirmButtonColor: "#DD6B55",
                confirmButtonText: this.t("common.confirm"),
              });
            }
          } else {
            this.deleteObject(indexDel, type);
          }
          this.store.setLoading(false);
        }
      });
    },
  },
};
</script>

<style scoped>
/* Your styles here */
.form-vision {
  display: flex;
  /* justify-content: space-between; */
}

.add-delete {
  width: 19%;
}
</style>
