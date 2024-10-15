<template>
  <div class="page_wrapper">
    <section id="content" class="content_wrapper grid_content" tabindex="0">
      <Breadcrumb :pageTitle="pageTitle" :breadcrumbItems="breadcrumbItems" />
      <div class="box dp_block">
        <div class="box_section">
          <p class="box_title_sm">
            {{ t("07.diagnosingEmployee.diagnosisSheet.crud.table1.title") }}
          </p>
          <table class="tbl_row">
            <caption>
              {{
                t("07.diagnosingEmployee.diagnosisSheet.crud.table1.title")
              }}
            </caption>
            <colgroup>
              <col style="width: 20%" />
              <col style="width: 40%" />
              <col style="width: 20%" />
              <col style="width: 40%" />
            </colgroup>
            <tbody>
              <tr>
                <th scope="row">
                  <p class="required">
                    {{
                      t("07.diagnosingEmployee.diagnosisSheet.crud.table1.name")
                    }}
                  </p>
                </th>
                <td colspan="3">
                  <InputBase
                    :mode="'show'"
                    :id="'nameSheet'"
                    :name="'nameSheet'"
                    v-model="dataDetail.surveyNm"
                    required
                  ></InputBase>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <p class="required">
                    {{
                      t(
                        "07.diagnosingEmployee.diagnosisSheet.crud.table1.useYn"
                      )
                    }}
                  </p>
                </th>
                <td colspan="3">
                  <RadiobuttonBase
                    v-for="item in listUseYn"
                    :mode="'show'"
                    :value="item.cdId"
                    :id="'useYn' + item.cdId"
                    :name="'useYn' + item.cdId"
                    :key="'useYn' + item.cdId"
                    v-model="dataDetail.useYn"
                    :checked="item.cdId == dataDetail.useYn"
                    :label="item.cdNm"
                  >
                  </RadiobuttonBase>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="box_title_sm mt_8">
          {{ t("07.diagnosingEmployee.diagnosisSheet.crud.infoOfSheet") }}
        </p>
        <div>
          <span class="note_custom">
            {{
              t("07.diagnosingEmployee.diagnosisSheet.crud.instructContent1")
            }} </span
          ><br /><span class="note_custom">
            {{
              t("07.diagnosingEmployee.diagnosisSheet.crud.instructContent2")
            }}
          </span>
        </div>
        <div class="box_section mt-10">
          <div
            v-for="ability1level in dataDetail.listAbility1level"
            :key="ability1level.ability1levelSeq"
            class="mb-5"
          >
            <CollapseBase
              :isShow="ability1level.collapseFlag"
              :title="ability1level.ability1levelNm"
              :isCheck="allProfAbilitiesChecked(ability1level)"
              :onClick="
                () => {
                  ability1level.collapseFlag = !ability1level.collapseFlag;
                }
              "
              :mode="'custom'"
            >
              <div class="box_section mt-5">
                <div class="tab_list mb_5">
                  <p
                    class="radio_tab"
                    v-for="empAbility in ability1level.listEmpAbility"
                    :key="empAbility.empAbilitySeq"
                  >
                    <input
                      type="radio"
                      :id="'radioEmpAbility' + empAbility.empAbilitySeq"
                      :name="'radioEmpAbility' + empAbility.empAbilitySeq"
                      :checked="empAbility.isCheck"
                    />
                    <label
                      @click="
                        handleChangeEmpAbility(
                          ability1level,
                          empAbility.empAbilitySeq
                        )
                      "
                      >{{ empAbility.empAbilityNm }}</label
                    >
                  </p>
                </div>
                <div v-for="ability in ability1level.listEmpAbility">
                  <table
                    class="tbl_row tbl_border mb-7"
                    v-for="abilityChld in ability.listAbilityChld"
                    :key="abilityChld.empAbilityChldAbilitySeq"
                    v-show="
                      ability.empAbilitySeq === ability1level.defaultEmpAbility
                    "
                  >
                    <caption>
                      {{
                        t(
                          "07.diagnosingEmployee.diagnosisSheet.crud.infoOfSheet"
                        )
                      }}
                    </caption>
                    <colgroup>
                      <col style="width: 20%" />
                      <col style="width: 10%" />
                      <col style="width: auto" />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th colspan="3">
                          <p>
                            {{ abilityChld.chldAbilityNm }}
                          </p>
                        </th>
                      </tr>
                      <template
                        v-for="elem in abilityChld.listAbilityElem"
                        :key="elem.cmpnElemSeq"
                      >
                        <tr>
                          <th scope="row" :rowspan="6">
                            <p>{{ elem.elemNm }}</p>
                          </th>
                          <th>
                            {{
                              t(
                                "07.diagnosingEmployee.diagnosisSheet.crud.question"
                              )
                            }}
                          </th>
                          <td>
                            <span>{{ elem.defn }}</span>
                          </td>
                        </tr>
                        <tr
                          v-for="(lvl, indexLvl) in elem.listAbilityDiagQus"
                          :key="indexLvl"
                        >
                          <th>
                            {{ lvl.lvlNm }}
                          </th>
                          <td>
                            <InputBase
                              :mode="'show'"
                              :id="
                                'level' +
                                ability.empAbilitySeq +
                                abilityChld.empAbilityChldAbilitySeq +
                                elem.cmpnElemSeq +
                                lvl.lvlCd
                              "
                              :name="
                                'level' +
                                ability.empAbilitySeq +
                                abilityChld.empAbilityChldAbilitySeq +
                                elem.cmpnElemSeq +
                                lvl.lvlCd
                              "
                              v-model="lvl.cont"
                              required
                            ></InputBase>
                          </td>
                        </tr>
                      </template>
                    </tbody>
                  </table>
                </div>
              </div>
            </CollapseBase>
          </div>
        </div>
        <div class="dp_flex btn_group btn_end" style="gap: 10px">
          <button
            type="button"
            class="btn_round btn_xs btn_secondary"
            @click="comfirmSave(saveTemp)"
            v-if="showSaveTempButton"
          >
            {{ t("common.saveTemp") }}
          </button>
          <button
            type="button"
            class="btn_round btn_xs btn_lightgray"
            v-if="showDeleteButton"
            @click="confirmDelete()"
          >
            {{ t("common.deleteItem") }}
          </button>
          <button
            type="button"
            class="btn_round btn_xs btn_primary"
            @click="comfirmSave(save)"
          >
            {{ t("common.save") }}
          </button>
          <button class="btn_round btn_xs btn_white" @click="backList">
            {{ t("common.list") }}
          </button>
        </div>
      </div>
    </section>
  </div>
</template>
<script lang="ts">
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import LinkGridComponent from "@/components/common/grid/LinkGridComponent.vue";
import { defineComponent } from "vue";
import { SCREEN } from "../../../router/screen";
import {
  MESSAGE_ERROR_API,
  STATUS_0,
  STATUS_1,
  STATUS_YES,
  STS_CD_SAVE,
  STS_CD_SAVE_TEMP,
  UP_CD_ID_USE_YN,
} from "../../../constants/common.const";
import { useI18n } from "vue-i18n";
import {
  SurveyCrudModel,
  AbilityDiagQusModel,
  Ability1LevelModel,
} from "../../../stores/diagnosisEmployee/diagnosisEmployeeSurvey/diagnosisEmployeeSurvey.type";
import {
  getDataRegister,
  save,
  remove,
} from "../../../stores/diagnosisEmployee/diagnosisEmployeeSurvey/diagnosisEmployeeSurvey.service";
import { commonStore } from "../../../stores/common";
import {
  MODE_CREATE,
  MODE_DETAIL,
  SUCCSESS_STATUS,
} from "../../../constants/screen.const";
import { getCodeMngByUpCdId } from "../../../stores/common/codeMng/codeMng.service";
export default defineComponent({
  components: { Breadcrumb, LinkGridComponent },
  setup() {
    const { t } = useI18n();
    const store = commonStore();
    return { t, store };
  },
  watch: {
    dataDetail: {
      handler: "handlerWatchDataDetail",
      deep: true,
    },
    "dataDetail.surveyNm": {
      handler: "checkFormValidity",
      deep: true,
    },
  },
  data() {
    return {
      modalOpen: false,
      id: "",
      modeScreen: "",
      listUseYn: [],
      pageTitle: this.t("07.diagnosingEmployee.diagnosisSheet.crud.pageTitle"),
      breadcrumbItems: [],
      dataDetail: {} as SurveyCrudModel,
      listLvlCd: [] as AbilityDiagQusModel[],
      isFormValid: false,
      showDeleteButton: false,
      showSaveTempButton: false,
      status0: STATUS_0,
      status1: STATUS_1,
      isTempValid: false,
      save: STS_CD_SAVE,
      saveTemp: STS_CD_SAVE_TEMP,
    };
  },
  beforeMount() {
    this.modeScreen = this.$route.params.mode;
    this.id = window.history.state.id;
    this.register(this.id);
    this.getLvlCd();
  },
  methods: {
    checkFormValidity() {
      this.isTempValid = this.dataDetail.surveyNm;
    },
    handlerWatchDataDetail(newValue: SurveyCrudModel) {
      if (newValue && newValue.listAbility1level) {
        newValue.listAbility1level?.forEach((wisePride) => {
          wisePride.listEmpAbility?.forEach((ability) => {
            let allContFilled = true;
            ability.listAbilityChld.forEach((child) => {
              child.listAbilityElem.forEach((element) => {
                element.listAbilityDiagQus.forEach((diagQus) => {
                  if (!diagQus.cont) {
                    allContFilled = false;
                  }
                });
              });
            });
            ability.isCheck = allContFilled;
          });
        });
      }
    },
    comfirmSave(stt: string) {
      if (stt === this.save) {
        if (this.store.check) {
          this.$swal({
            text: this.t("common.messageValidateRequired"),
            type: "warning",
            showCancelButton: true,
            showConfirmButton: false,
            cancelButtonText: this.t("common.cancel"),
          }).then(() => {});
          return;
        }
        this.$swal({
          text: this.t("07.diagnosingEmployee.modalConfirm.titleConfirmSave"),
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: this.t("common.save"),
          cancelButtonText: this.t("common.cancel"),
        }).then((result: any) => {
          if (result.isConfirmed) {
            this.saveData(stt);
          }
        });
      }
      if (stt === this.saveTemp) {
        if (!this.isTempValid) {
          this.$swal({
            text: this.t("common.messageValidateRequired"),
            type: "warning",
            showCancelButton: true,
            showConfirmButton: false,
            cancelButtonText: this.t("common.cancel"),
          }).then(() => {});
          return;
        }
        this.$swal({
          text: this.t("07.diagnosingEmployee.modalConfirm.titleConfirmTemp"),
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: this.t("common.saveTemp"),
          cancelButtonText: this.t("common.cancel"),
        }).then((result: any) => {
          if (result.isConfirmed) {
            this.saveData(stt);
          }
        });
      }
    },
    confirmDelete() {
      this.$swal({
        text: this.t("07.diagnosingEmployee.modalConfirm.titleConfirmDelete"),
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: this.t("common.deleteItem"),
        cancelButtonText: this.t("common.cancel"),
      }).then((result: any) => {
        if (result.isConfirmed) {
          this.deleteData();
        }
      });
    },
    getLvlCd() {
      getCodeMngByUpCdId({ upCdId: UP_CD_ID_USE_YN }).then((res: any) => {
        if (res.status === SUCCSESS_STATUS) {
          res.data.data.forEach((item) => {
            this.listUseYn.push(item);
          });
        }
      });
    },
    saveData(stt: string) {
      if (this.modeScreen === MODE_DETAIL) {
        this.dataDetail.surveySeq = this.id;
      }
      this.dataDetail.stsCd = stt;
      this.store.setLoading(true);
      save(this.dataDetail)
        .then((res) => {
          if (res.status === SUCCSESS_STATUS) {
            this.store.setLoading(false);
            this.dataDetail.surveySeq = res.data.data;
            if (stt === this.save) {
              this.$swal({
                text: this.t(
                  "07.diagnosingEmployee.modalConfirm.titleModifySave"
                ),
                type: "success",
                showCancelButton: true,
                showConfirmButton: false,
                cancelButtonText: this.t("common.confirm"),
              }).then(() => {
                this.backList();
              });
            }
            if (stt === this.saveTemp) {
              this.$swal({
                text: this.t(
                  "07.diagnosingEmployee.modalConfirm.titleModifyTemp"
                ),
                type: "success",
                showCancelButton: true,
                showConfirmButton: false,
                cancelButtonText: this.t("common.confirm"),
              });
            }
          }
        })
        .catch(() => {
          throw new Error(MESSAGE_ERROR_API);
        })
        .finally(() => {
          this.store.setLoading(false);
        });
    },
    deleteData() {
      this.store.setLoading(true);
      remove({ surveySeq: this.id })
        .then((res) => {
          if (res.status === SUCCSESS_STATUS) {
            this.store.setLoading(false);
            if (res.data.data == true) {
              this.$swal({
                text: this.t(
                  "07.diagnosingEmployee.modalConfirm.titleModifyDelete1"
                ),
                type: "success",
                showCancelButton: true,
                showConfirmButton: false,
                cancelButtonText: this.t("common.confirm"),
              }).then(() => {
                this.backList();
              });
            } else {
              this.$swal({
                text: this.t(
                  "07.diagnosingEmployee.modalConfirm.titleModifyDelete2"
                ),
                type: "success",
                showCancelButton: true,
                showConfirmButton: false,
                cancelButtonText: this.t("common.confirm"),
              }).then(() => {
                this.backList();
              });
            }
          }
        })
        .catch(() => {
          throw new Error(MESSAGE_ERROR_API);
        })
        .finally(() => {
          this.store.setLoading(false);
        });
    },
    register(id: string) {
      this.store.setLoading(true);
      getDataRegister({ surveySeq: id })
        .then((res) => {
          if (res.status === SUCCSESS_STATUS) {
            this.dataDetail = res.data.data;
            if (this.modeScreen === MODE_CREATE) {
              this.dataDetail.useYn = STATUS_YES;
            }
            if (
              !this.dataDetail.stsCd ||
              this.dataDetail.stsCd == this.saveTemp
            ) {
              this.showSaveTempButton = true;
            }
            if (this.dataDetail.stsCd === this.save) {
              this.showDeleteButton = true;
            }
          }
        })
        .catch(() => {
          throw new Error(MESSAGE_ERROR_API);
        })
        .finally(() => {
          this.store.setLoading(false);
        });
    },
    handleChangeEmpAbility(item: Ability1LevelModel, empAbilitySeq: any) {
      for (var ability1level of this.dataDetail.listAbility1level) {
        if (ability1level.ability1levelSeq === item.ability1levelSeq) {
          item.defaultEmpAbility = empAbilitySeq;
        }
      }
    },
    allProfAbilitiesChecked(wisePride: Ability1LevelModel) {
      return (
        wisePride.listEmpAbility?.every((empAbility) => empAbility.isCheck) ??
        false
      );
    },
    backList() {
      this.$router.push({
        name: SCREEN.diagnosingEmployeeSheet.name,
      });
    },
  },
});
</script>
<style>
.instruct-content {
  color: red;
}
</style>
