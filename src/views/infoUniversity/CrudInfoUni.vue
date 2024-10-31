<template>
  <section id="content" class="content_wrapper grid_content" tabindex="0">
    <Breadcrumb
      :pageTitle="pageTitle"
      :breadcrumbItems="breadcrumbItems"
    ></Breadcrumb>
    <div class="box dp_block">
      <div class="box_inner">
        <div class="flex justify-between">
          <div class="box_title mb-5">
            <p class="box_title_sm">
              {{
                t("03.basicInfoManagement.infoUniversity.form.pageTitleAction")
              }}
            </p>
          </div>
        </div>
        <table class="tbl_row">
          <colgroup>
            <col style="width: 15%" />
            <col style="width: auto" />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row">
                <p class="required">
                  <!-- 학년도 -->
                  {{ t("03.basicInfoManagement.infoUniversity.form.cont") }}
                </p>
              </th>
              <td class="td_input">
                <div class="select_form wd_p100">
                  <SelectBoxBase
                    :id="'selectboxYear'"
                    :name="'selectboxYear'"
                    v-model="dataForm.eduYear"
                    :data="listSelectBoxYear"
                    class="wd_120"
                    required
                  >
                  </SelectBoxBase>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">
                <p class="required">
                  <!-- 학과 비전 -->
                  {{ t("03.basicInfoManagement.infoUniversity.form.vision") }}
                </p>
              </th>
              <td class="td_input">
                <div
                  class="flex w-full mb-1 form-vision"
                  v-for="(item, index) in dataForm.visionDept"
                  :key="`vision_${item.id || index}`"
                >
                  <InputBase
                    :id="`vision_` + (item.id || index)"
                    class="mr-5 form_style"
                    required
                    v-model="item.value"
                  />
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">
                <p class="required">
                  <!-- 학과 인재상 -->
                  {{ t("03.basicInfoManagement.infoUniversity.form.edu") }}
                </p>
              </th>
              <td>
                <div
                  class="flex w-full mb-1 form-vision"
                  v-for="(item, index) in dataForm.targetDept"
                  :key="`target_${item.id || index}`"
                >
                  <InputBase
                    :id="`target_` + (item.id || index)"
                    class="mr-5 form_style"
                    required
                    v-model="item.value"
                  />
                  <div class="add-delete">
                    <ButtonBase
                      v-if="index == 0"
                      class="btn_round btn_sm btn_primary mg_l5"
                      @click="addObject('targetDept')"
                      :buttonName="t('common.add')"
                    >
                      <!-- 추가 -->
                    </ButtonBase>
                    <ButtonBase
                      v-if="index != 0"
                      class="btn_round btn_sm btn_gray mg_l5"
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
                  {{ t("03.basicInfoManagement.infoUniversity.form.talent") }}
                </p>
              </th>
              <td>
                <div
                  class="flex w-full mb-1 form-vision"
                  v-for="(item, index) in dataForm.modelDept"
                  :key="`model_${item.id || index}`"
                >
                  <InputBase
                    :id="`model_` + (item.id || index)"
                    class="mr-5 form_style"
                    required
                    v-model="item.value"
                  />
                  <div class="add-delete">
                    <ButtonBase
                      v-if="index == 0"
                      class="btn_round btn_sm btn_primary mg_l5"
                      @click="addObject('modelDept')"
                      :buttonName="t('common.add')"
                    >
                      <!-- 추가 -->
                    </ButtonBase>
                    <ButtonBase
                      v-if="index != 0"
                      class="btn_round btn_sm btn_gray mg_l5"
                      @click="eventDeleteObject(index, 'modelDept')"
                      :buttonName="t('common.deleteItem')"
                    >
                      <!-- 삭제 -->
                    </ButtonBase>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="box_section">
        <div class="dp_flex btn_group btn_end mt_8" style="gap: 10px">
          <ButtonBase
            type="button"
            @click="saveData"
            class="btn_round btn_md btn_primary mg_l10"
            :buttonName="t('common.save')"
          >
            <!-- 확인 -->
          </ButtonBase>
          <ButtonBase
            type="button"
            class="btn_round btn_white btn_md mg_l5"
            @click="back()"
            :buttonName="t('common.list')"
          >
            <!-- 목록 -->
          </ButtonBase>
        </div>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import { MESSAGE_ERROR_API } from "@/constants/common.const";
import { commonStore } from "@/stores/common";
import type { CodeMngModel } from "@/stores/common/codeMng/codeMng.type";
import { infoUniStore } from "@/stores/infoUniversity";
import {
  createInfoUni,
  detailById,
  updateInfoUni,
} from "@/stores/infoUniversity/infoUniversity.service";
import type {
  infoUni,
  infoUniPart,
} from "@/stores/infoUniversity/infoUniversity.type";
import { useI18n } from "vue-i18n";
import InputBase from "@/components/common/input/InputBase.vue";
import { SCREEN } from "@/router/screen";
import { useRouter } from "vue-router";
import ButtonBase from "@/components/common/button/ButtonBase.vue";

export default {
  name: "ModalForm",
  components: {
    InputBase,
    ButtonBase,
  },
  setup() {
    const { t } = useI18n();
    const store = commonStore();
    const inforStore = infoUniStore();
    const router = useRouter();
    return {
      t,
      store,
      inforStore,
      router,
    };
  },

  beforeMount() {
    const currentYear = new Date().getFullYear();

    const specificYears = [];

    for (let i = 2021; i <= currentYear + 1; i++) {
      specificYears.push(i);
    }

    this.year = window.history.state.year;
    specificYears.forEach((year) => {
      this.listSelectBoxYear.push({
        cdId: year.toString(),
        cdNm: year.toString(),
        upCdId: "year",
      });
    });

    if (this.year) {
      this.goToDetail();
    }
  },

  data() {
    return {
      listSelectBoxYear: [
        { cdId: "", cdNm: this.t("common.select") },
      ] as CodeMngModel[],

      dataForm: {
        eduYear: 0,
        visionDept: [
          {
            id: "",
            value: "",
          },
        ] as infoUniPart[],
        targetDept: [
          {
            id: "",
            value: "",
          },
        ] as infoUniPart[],
        modelDept: [
          {
            id: "",
            value: "",
          },
        ] as infoUniPart[],
      } as infoUni,
      year: "" as string,
      pageTitle: this.t("03.basicInfoManagement.infoUniversity.pageTitle"),
      breadcrumbItems: [
        /* 'HOME' */
        { label: this.t("common.home"), link: "/" },
        /* '학과정보 관리' */
        {
          label: this.t("03.basicInfoManagement.infoUniversity.menu"),
          link: "#",
        },
        /* '장학제도 관리 시스템' */
        {
          label: this.t("03.basicInfoManagement.infoUniversity.pageTitle"),
          link: SCREEN.infoUniversity.path,
        },
      ],
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
            this.dataForm.visionDept.length === 0
          ) {
            this.dataForm.visionDept = [
              {
                id: "",
                value: "",
              },
            ];
          }

          if (
            !this.dataForm.targetDept ||
            this.dataForm.targetDept.length === 0
          ) {
            this.dataForm.targetDept = [
              {
                id: "",
                value: "",
              },
            ];
          }

          if (
            !this.dataForm.modelDept ||
            this.dataForm.modelDept.length === 0
          ) {
            this.dataForm.modelDept = [
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

    addObject(type: string) {
      this.dataForm[type].push({
        id: "",
        value: "",
      });
    },

    deleteObject(indexDel: number, type: string) {
      this.$swal
        .fire({
          text: this.t(
            "03.basicInfoManagement.infoUniversity.alert.deleteSuccess"
          ),
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
        text: this.t("03.basicInfoManagement.infoUniversity.alert.delete"),
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: this.t("common.save"),
        cancelButtonText: this.t("common.cancel"),
      }).then(async (result: any) => {
        if (result.isConfirmed) {
          this.deleteObject(indexDel, type);
        }
      });
    },

    saveData() {
      const isFormValid =
        this.dataForm.eduYear &&
        this.dataForm.visionDept.every((item) => item.value.trim() !== "") &&
        this.dataForm.targetDept.every((item) => item.value.trim() !== "") &&
        this.dataForm.modelDept.every((item) => item.value.trim() !== "");

      if (!isFormValid) {
        this.$swal.fire({
          text: this.t("03.basicInfoManagement.infoUniversity.alert.valid"),
          type: "warning",
          confirmButtonColor: "#DD6B55",
          confirmButtonText: this.t("common.confirm"),
        });
        return;
      }

      if (!this.store.check) {
        this.$swal({
          text: this.t("03.basicInfoManagement.infoUniversity.alert.save"),
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
      }
    },

    updateDept() {
      let dataSave = {
        eduYear: this.dataForm.eduYear,
        visionDept: this.dataForm.visionDept,
        targetDept: this.dataForm.targetDept,
        modelDept: this.dataForm.modelDept,
      } as infoUni;

      this.store.setLoading(true);
      updateInfoUni(dataSave)
        .then((res) => {
          let textAlert = "";
          if (res.data.data) {
            textAlert = this.t(
              "03.basicInfoManagement.infoUniversity.alert.saveSuccess"
            );
          } else {
            textAlert = this.t(
              "03.basicInfoManagement.infoUniversity.alert.saveError"
            );
          }

          this.$swal
            .fire({
              text: textAlert,
              confirmButtonColor: "#DD6B55",
              confirmButtonText: this.t("common.confirm"),
            })
            .then(() => {
              if (res.data.data) {
                this.back();
              }
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
        visionDept: this.dataForm.visionDept,
        targetDept: this.dataForm.targetDept,
        modelDept: this.dataForm.modelDept,
      } as infoUni;

      this.store.setLoading(true);
      createInfoUni(dataSave)
        .then((res) => {
          let textAlert = "";
          if (res.data.data) {
            textAlert = this.t(
              "03.basicInfoManagement.infoUniversity.alert.saveSuccess"
            );
          } else {
            textAlert = this.t(
              "03.basicInfoManagement.infoUniversity.alert.saveError"
            );
          }

          this.$swal
            .fire({
              text: textAlert,
              confirmButtonColor: "#DD6B55",
              confirmButtonText: this.t("common.confirm"),
            })
            .then(() => {
              if (res.data.data) {
                this.back();
              }
            });
        })
        .catch((err) => {
          throw new Error(MESSAGE_ERROR_API);
        })
        .finally(() => {
          this.store.setLoading(false);
        });
    },
    back() {
      this.router.push({
        name: SCREEN.infoUniversity.name,
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
  width: 10%;
}
</style>
