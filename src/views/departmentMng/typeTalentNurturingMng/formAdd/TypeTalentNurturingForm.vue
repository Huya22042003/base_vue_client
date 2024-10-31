<template>
  <TModal
    v-if="isOpen"
    :is-open="isOpen"
    :is-show-header="true"
    :is-show-footer="true"
    :modal-id="'Template'"
    @close-modal="closeModal"
  >
    <template #title>
      <strong>{{ pageTitle }}</strong>
    </template>
    <template #default>
      <div class="box_section">
        <p class="mb-3">
          <!-- 인재양성유형 관리 -->
          {{ t("departmentMng.typeTalentNurturingMng.form.note") }}
        </p>
        <table class="tbl_row">
          <colgroup>
            <col style="width: 23%" />
            <col style="width: auto" />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row">
                <!-- 학과 -->
                <p class="required">
                  {{ t("departmentMng.typeTalentNurturingMng.form.deptment") }}
                </p>
              </th>
              <td>
                <p class="mt-2 mb-2">{{ dataForm.deptNm }}</p>
              </td>
            </tr>
            <tr>
              <th scope="row">
                <!-- 인재양성유형 -->
                <p class="required">
                  {{ t("departmentMng.typeTalentNurturingMng.form.talent") }}
                </p>
              </th>
              <td class="td_input">
                <InputBase
                  v-model="dataForm.typeNm"
                  id="input_talent"
                  required
                  class="form_style"
                />
              </td>
            </tr>
            <tr>
              <th scope="row">
                <!-- 인재양성유형 정의(선택입력) -->
                <p class="required">
                  {{
                    t("departmentMng.typeTalentNurturingMng.form.talentDefine")
                  }}
                </p>
              </th>
              <td>
                <TextArea
                  v-model="dataForm.defn"
                  id="input_talentDefine"
                  required
                ></TextArea>
              </td>
            </tr>
            <tr>
              <th scope="row">
                <!-- 인재양성유형 정의(선택입력) -->
                <p class="required">
                  {{ t("departmentMng.typeTalentNurturingMng.form.track") }}
                </p>
              </th>
              <td>
                <TextArea
                  v-model="dataForm.afterGradTrack"
                  id="input_track"
                  required
                ></TextArea>
              </td>
            </tr>
            <tr>
              <th scope="row">
                <!-- 사용여부 -->
                <p class="required">
                  {{ t("departmentMng.typeTalentNurturingMng.form.isActive") }}
                </p>
              </th>
              <td>
                <SelectBoxBase
                  :data="listRadioUseYn"
                  v-model="dataForm.useYn"
                  class="wd_p30"
                >
                </SelectBoxBase>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="box_section">
          <div class="popup_footer">
            <ButtonBase
              type="button"
              class="button btn_xl btn_primary"
              @click="save()"
              :buttonName="t('common.save')"
            >
              <!-- 저장 -->
            </ButtonBase>
            <ButtonBase
              type="button"
              class="button btn_xl btn_white popup_close"
              @click="closeModal(false)"
              :buttonName="t('common.close')"
            >
              <!-- 인재양성유형 삭제 -->
            </ButtonBase>
          </div>
        </div>
      </div>
    </template>
    <template #footer> </template>
  </TModal>
</template>

<script lang="ts">
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import { commonStore } from "@/stores/common";
import { MODE_DETAIL, MODE_SHOW, MODE_CREATE } from "@/constants/screen.const";
import GridComponent from "@/components/common/grid/GridComponent.vue";
import { SCREEN } from "@/router/screen";
import InputBase from "@/components/common/input/InputBase.vue";
import { useI18n } from "vue-i18n";
import type { TaltNrtgTypeReqDTO } from "@/stores/departmentService/typeTalentNurturingMng/typeTalentNurturing.type";
import {
  create,
  detailById,
  update,
  deleteTail,
} from "@/stores/departmentService/typeTalentNurturingMng/typeTalentNurturing.service";
import { MESSAGE_ERROR_API } from "@/constants/common.const";
import { getListCodeMng } from "@/stores/common/codeMng/codeMng.service";
import type { CodeMngModel } from "@/stores/common/codeMng/codeMng.type";
import { getUserInfo } from "@/utils/storage";
import { getDepartmentList } from "@/stores/common/department/department.service";
import ButtonBase from "@/components/common/button/ButtonBase.vue";

export default {
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    id: {
      type: String,
      default: "",
    },
  },
  components: {
    Breadcrumb,
    GridComponent,
    InputBase,
    ButtonBase,
  },
  data() {
    return {
      pageTitle: this.id
        ? this.t("departmentMng.typeTalentNurturingMng.form.title2")
        : this.t(
            "departmentMng.typeTalentNurturingMng.form.title1"
          ) /* '인재양성유형 및 직무 관리' */,
      breadcrumbItems: [
        {
          label: this.t(
            "departmentMng.typeTalentNurturingMng.breadcrumb.01"
          ) /* 'HOME' */,
          link: "/",
        },
        {
          label: this.t(
            "departmentMng.typeTalentNurturingMng.breadcrumb.02"
          ) /* '학과정보 관리' */,
          link: "#",
        },
        {
          label: this.t(
            "departmentMng.typeTalentNurturingMng.breadcrumb.03"
          ) /* '인재양성유형 및 직무 관리' */,
          link: SCREEN.typeTalentNurturingCrudDept.path,
        },
      ],
      modeScreen: "" as any,
      listRadioUseYn: [] as CodeMngModel[],
      dataForm: {
        id: "",
        defn: "",
        deptCd: "",
        typeNm: "",
        useYn: "Y",
      } as TaltNrtgTypeReqDTO,
      checkVald: false,
    };
  },
  setup() {
    const { t } = useI18n();
    const store = commonStore();
    const userLogin = JSON.parse(getUserInfo());

    return {
      t,
      store,
      MODE_DETAIL,
      MODE_SHOW,
      MODE_CREATE,
      userLogin,
    };
  },
  async beforeMount() {
    getListCodeMng({ upCdIdList: ["1005"] }).then((res) => {
      this.listRadioUseYn = res.data.data;
    });
    if (this.id) {
      this.goToDetail();
    } else {
      this.store.setLoading(true);
      await getDepartmentList({
        deptCd: [this.userLogin.deptCd],
        deptDivCd: [],
        upDeptCd: [],
        useYn: "",
      }).then((res) => {
        if (res.data.data.length > 0) {
          this.dataForm.deptNm = res.data.data[0].deptNm;
          this.dataForm.deptCd = res.data.data[0].deptCd;
        }
      });
      this.store.setLoading(false);
    }
  },
  methods: {
    closeModal(isLoad: boolean) {
      this.$emit("close-modal", isLoad);
    },
    save() {
      if (this.store.check) {
        this.$swal.fire({
          text: this.t("common.messageValidateRequired"),
          confirmButtonColor: "#DD6B55",
          confirmButtonText: this.t("common.confirm"),
        });
        return;
      }
      this.$swal({
        /* 저장하시겠어요? */
        text: this.t("departmentMng.typeTalentNurturingMng.mess.confirmSave"),
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: this.t("common.save"),
        cancelButtonText: this.t("common.cancel"),
      }).then((result) => {
        if (result.isConfirmed) {
          if (this.id) {
            this.updateTypeTalent();
          } else {
            this.createTypeTalent();
          }
        }
      });
    },
    deleteTypeTalent() {
      this.$swal({
        text: this.t("departmentMng.typeTalentNurturingMng.mess.confirmDelete"),
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: this.t("common.confirm"),
        cancelButtonText: this.t("common.cancel"),
      }).then((result) => {
        if (result.isConfirmed) {
          this.store.setLoading(true);
          deleteTail(this.id)
            .then((res) => {
              if (res.data.data) {
                this.$swal
                  .fire({
                    text: this.t(
                      "departmentMng.typeTalentNurturingMng.mess.deleteSuccess"
                    ),
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: this.t("common.confirm"),
                  })
                  .then(() => {
                    this.back();
                  });
              } else {
                this.$swal.fire({
                  text: this.t(
                    "departmentMng.typeTalentNurturingMng.mess.notDeleteType"
                  ),
                  confirmButtonColor: "#DD6B55",
                  confirmButtonText: this.t("common.confirm"),
                });
              }
            })
            .catch(() => {
              throw new Error(MESSAGE_ERROR_API);
            })
            .finally(() => {
              this.store.setLoading(false);
            });
        }
      });
    },
    goToDetail() {
      this.store.setLoading(true);
      detailById(this.id)
        .then((res) => {
          this.dataForm = res.data.data;
        })
        .catch(() => {
          throw new Error(MESSAGE_ERROR_API);
        })
        .finally(() => {
          this.store.setLoading(false);
        });
    },
    updateTypeTalent() {
      this.store.setLoading(true);
      /* 정상처리됐습니다. */
      update(this.dataForm)
        .then((res) => {
          this.$swal
            .fire({
              text: this.t(
                "departmentMng.typeTalentNurturingMng.mess.notificationSuccess"
              ),
              confirmButtonColor: "#DD6B55",
              confirmButtonText: this.t("common.confirm"),
            })
            .then((res) => {
              this.closeModal(true);
            });
        })
        .catch((err) => {
          throw new Error(MESSAGE_ERROR_API);
        })
        .finally(() => {
          this.store.setLoading(false);
        });
    },
    createTypeTalent() {
      this.store.setLoading(true);
      create(this.dataForm)
        .then((res) => {
          this.$swal
            .fire({
              /* 정상처리됐습니다. */
              text: this.t(
                "departmentMng.typeTalentNurturingMng.mess.notificationSuccess"
              ),
              confirmButtonColor: "#DD6B55",
              confirmButtonText: this.t("common.confirm"),
            })
            .then((res) => {
              this.closeModal(true);
            });
        })
        .catch((err) => {
          throw new Error(MESSAGE_ERROR_API);
        })
        .finally(() => {
          this.store.setLoading(false);
        });
    },
  },
};
</script>

<style scoped lang="scss">
.flex-10 {
  flex: 10;
}
</style>
