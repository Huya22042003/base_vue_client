<template>
  <div class="page_wrapper">
    <div class="box dp_block mg_b30">
      <div class="box_section d-flex-header">
        <div>
          <p class="box_title_sm">
            {{ t("jobAbilityManagement.tab2.pageTitle") }}
          </p>
        </div>
        <div>
          <ButtonBase
            class="btn_round btn_primary btn_md"
            :buttonName="t('jobAbilityManagement.tab2.createChildAbility')"
            @click="addChildAbility"
          >
          </ButtonBase>
        </div>
      </div>
      <div
        class="mt-7"
        v-for="(childAbility, indexChild) in listJobCapaUnit"
        :key="'childAbility' + indexChild"
      >
        <template v-if="childAbility.delYn === statusNo"
          ><div class="box_section d-flex-header">
            <div></div>
            <div>
              <ButtonBase
                class="btn_round btn_gray btn_md"
                :buttonName="`${t(
                  'jobAbilityManagement.tab2.deleteChildAbility'
                )} ${childAbility.order} ${t('common.deleteItem')}`"
                @click="deleteChildAbility(indexChild, childAbility)"
              >
              </ButtonBase>
            </div>
          </div>
          <div class="mt-3">
            <table class="tbl_row tbl_border">
              <colgroup>
                <col style="width: 15%" />
                <col style="width: auto" />
              </colgroup>
              <tbody>
                <tr>
                  <th scope="row">
                    <p class="required">
                      {{ t("jobAbilityManagement.tab2.childAbilityCd") }}
                    </p>
                  </th>
                  <td class="td_input">
                    <span>{{ childAbility.order }}</span>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <p class="required">
                      {{ t("jobAbilityManagement.tab2.childAbilityNm") }}
                    </p>
                  </th>
                  <td class="td_input">
                    <div>
                      <InputBase
                        :id="'childAbilityNm'"
                        :name="'childAbilityNm'"
                        v-model="childAbility.capaUnitNm"
                        required
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <p class="required">
                      {{ t("jobAbilityManagement.tab2.conductingStandards") }}
                    </p>
                  </th>
                  <td class="td_input">
                    <div
                      class="d-flex"
                      :class="`d-flex ${
                        indexConStant > 0 && conStan.delYn === statusNo
                          ? 'mg_t10'
                          : ''
                      }`"
                      v-for="(
                        conStan, indexConStant
                      ) in childAbility.performList"
                      :key="'conduct' + indexConStant"
                    >
                      <template v-if="conStan.delYn === statusNo"
                        ><div style="width: 3%">
                          {{ conStan.order }}
                        </div>
                        <div style="width: 90%">
                          <InputBase
                            :id="'childAbilityNm'"
                            :name="'childAbilityNm'"
                            v-model="conStan.cont"
                            required
                          />
                        </div>
                        <div style="width: 7%">
                          <ButtonBase
                            v-if="indexConStant === 0"
                            class="btn_round btn_sm btn_primary"
                            :buttonName="t('common.add')"
                            @click="addConductStandard(childAbility)"
                          >
                          </ButtonBase>
                          <ButtonBase
                            v-if="indexConStant > 0"
                            class="btn_round btn_sm btn_gray"
                            :buttonName="t('common.add')"
                            @click="
                              deleteConductStandard(
                                childAbility,
                                indexConStant,
                                conStan
                              )
                            "
                          >
                          </ButtonBase></div
                      ></template>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <p class="required">
                      {{ t("jobAbilityManagement.tab2.knowledge") }}
                    </p>
                  </th>
                  <td class="td_input">
                    <TextArea
                      :id="'knowledge'"
                      :name="'knowledge'"
                      v-model="childAbility.know"
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <p class="required">
                      {{ t("jobAbilityManagement.tab2.technical") }}
                    </p>
                  </th>
                  <td class="td_input">
                    <TextArea
                      :id="'technical'"
                      :name="'technical'"
                      v-model="childAbility.skil"
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <p class="required">
                      {{ t("jobAbilityManagement.tab2.attitude") }}
                    </p>
                  </th>
                  <td class="td_input">
                    <TextArea
                      :id="'attitude'"
                      :name="'attitude'"
                      v-model="childAbility.attit"
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <p class="required">
                      {{ t("jobAbilityManagement.tab2.useYn") }}
                    </p>
                  </th>
                  <td class="td_input">
                    <RadiobuttonBase
                      v-for="(item, index) in listUseYn"
                      :mode="'show'"
                      :value="item.cdId"
                      :id="index + indexChild"
                      :name="indexChild"
                      :label="item.cdNm"
                      v-model="childAbility.useYn"
                      :checked="item.cdId == childAbility.useYn"
                    >
                    </RadiobuttonBase>
                  </td>
                </tr>
              </tbody>
            </table></div
        ></template>
      </div>

      <div class="dp_flex btn_group btn_end mt_8" style="gap: 10px">
        <ButtonBase
          class="btn_round btn_gray btn_md"
          :buttonName="t('jobAbilityManagement.tab1.btnVersionUp')"
          @click="saveVer"
          v-if="modeScreen == modeDetail"
        >
        </ButtonBase>
        <ButtonBase
          class="btn_round btn_md btn_gray"
          :buttonName="t('jobAbilityManagement.tab1.update')"
          @click="confirmEdit"
          v-if="modeScreen == modeDetail"
        >
        </ButtonBase>
        <button
          type="button"
          class="btn_round btn_primary btn_md"
          @click="confirmNextTab"
        >
          {{ t("jobAbilityManagement.tab1.btnNext") }}
        </button>
        <button type="button" class="btn_round btn_white btn_md" @click="back">
          {{ t("common.list") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import THeader from "@/layouts/components/THeader.vue";
import TFooter from "@/layouts/components/TFooter.vue";
import { commonStore } from "../../../stores/common";
import LoaddingComponent from "@/components/common/loading/LoaddingComponent.vue";
import {
  MODE_CREATE,
  MODE_DETAIL,
  MAXIMUM_STATUS,
  DUPLICATE_STATUS,
} from "../../../constants/screen.const";
import { SCREEN } from "../../../router/screen";
import type {
  JobCapaUnit,
  JobCapaUnitPerform,
} from "../../../stores/jobAbilityManagement/jobAbilityManagement.type";
import {
  saveJobUnit,
  listJobUnit,
  upVer,
  checkPerform,
  checkUnit,
} from "../../../stores/jobAbilityManagement/jobAbilityManagement.service";
import {
  STATUS_NO,
  STATUS_YES,
  UP_CD_ID_USE_YN,
} from "../../../constants/common.const";
import { getCodeMngByUpCdId } from "../../../stores/common/codeMng/codeMng.service";
import { useI18n } from "vue-i18n";
import ButtonBase from "@/components/common/button/ButtonBase.vue";

export default {
  components: {
    TFooter,
    THeader,
    Breadcrumb,
    LoaddingComponent,
    ButtonBase,
  },
  props: {
    id: {
      type: String,
      default: "",
    },
  },
  setup() {
    const cmn = commonStore();
    const { t } = useI18n();

    return {
      cmn,
      t,
    };
  },

  data() {
    return {
      modeScreen: "" as any,
      modeDetail: MODE_DETAIL,
      modeCreate: MODE_CREATE,
      listChildAbility: [] as Array<JobCapaUnit>,
      statusNo: STATUS_NO,
      statusYes: STATUS_YES,
      listUseYn: [],
      listJobCapaUnit: [] as Array<JobCapaUnit>,
      jobAbilSeq: "",
    };
  },
  beforeMount() {
    this.jobAbilSeq = this.$props.id;
    this.modeScreen = this.$route.params.mode;
    this.getCodeUseYn();

    if (this.modeScreen === MODE_CREATE) {
      let obj: JobCapaUnit = {
        order: "1",
        jobCapaUnitSeq: "",
        capaUnitNm: "",
        performList: [
          {
            order: "1.1",
            capaUnitPerformStnrdSeq: "",
            cont: "",
            delYn: this.statusNo,
            jobCapaUnitSeq: "",
          },
        ],
        delYn: this.statusNo,
        know: "",
        skil: "",
        attit: "",
        useYn: this.statusYes,
        jobAbilSeq: this.jobAbilSeq,
      };
      this.listJobCapaUnit.push(obj);
    }
    if (this.modeScreen === MODE_DETAIL) {
      this.getDataDetai();
    }
  },

  methods: {
    saveVer() {
      if (this.checkVal()) {
        this.$swal({
          text: this.t("common.messageValidateRequired"),
          type: "warning",
          showCancelButton: false,
          showConfirmButton: true,
          confirmButtonText: this.t("common.confirm"),
        });
      } else {
        this.$swal({
          text: this.t("jobAbilityManagement.tab1.confirmVersionUp"),
          type: "warning",
          showCancelButton: true,
          confirmButtonText: this.t("common.save"),
          cancelButtonText: this.t("common.cancel"),
        }).then((result) => {
          if (result.isConfirmed) {
            this.cmn.setLoading(true);
            upVer(this.jobAbilSeq)
              .then(async (res) => {
                await this.$swal({
                  text: "직무역량 버전을 올리기가 되었습니다.",
                  type: "warning",
                  showCancelButton: false,
                  confirmButtonText: this.t("common.confirm"),
                });
                await this.back();
              })
              .catch((error) => {
                if (
                  error.response &&
                  error.response.data &&
                  error.response.data.code === DUPLICATE_STATUS
                ) {
                  this.$swal({
                    text: this.t("jobAbilityManagement.tab1.dupliCateCVer"),
                    type: "warning",
                    showCancelButton: false,
                    confirmButtonText: this.t("common.confirm"),
                  });
                } else if (
                  error.response &&
                  error.response.data &&
                  error.response.data.code === MAXIMUM_STATUS
                ) {
                  this.$swal({
                    text: this.t("jobAbilityManagement.tab1.maxVer"),
                    type: "warning",
                    showCancelButton: false,
                    confirmButtonText: this.t("common.confirm"),
                  });
                }
              });
            this.cmn.setLoading(false);
          }
        });
      }
    },

    async getDataDetai() {
      this.cmn.setLoading(true);
      await listJobUnit(this.jobAbilSeq).then((res) => {
        this.listJobCapaUnit = res.data.data;
      });
      this.listJobCapaUnit?.forEach((childAbility, indexChild) => {
        childAbility.order = `${indexChild + 1}`;

        childAbility.performList?.forEach((performItem, indexPerform) => {
          performItem.order = `${childAbility.order}.${indexPerform + 1}`;
        });
      });
      this.cmn.setLoading(false);
    },
    confirmNextTab() {
      if (this.modeScreen === this.modeDetail) {
        this.nextTab(this.jobAbilSeq);
        return;
      }
      if (this.checkVal()) {
        this.$swal({
          text: this.t("common.messageValidateRequired"),
          type: "warning",
          showCancelButton: false,
          showConfirmButton: true,
          confirmButtonText: this.t("common.confirm"),
        });
      } else {
        this.$swal({
          text: this.t("jobAbilityManagement.tab1.confirmNextTab"),
          type: "warning",
          showCancelButton: true,
          confirmButtonText: this.t("common.save"),
          cancelButtonText: this.t("common.cancel"),
        }).then((result: any) => {
          if (result.isConfirmed) {
            this.saveData();
            this.nextTab(this.jobAbilSeq);
          }
        });
      }
    },
    saveData() {
      saveJobUnit(this.listJobCapaUnit);
    },
    addChildAbility(): void {
      const activeChildAbilitiesCount =
        this.listJobCapaUnit.filter((child) => child.delYn === this.statusNo)
          .length || 0;

      const newChildAbility: JobCapaUnit = {
        jobCapaUnitSeq: "",
        order: `${activeChildAbilitiesCount + 1}`,
        capaUnitNm: "",
        performList: [
          {
            capaUnitPerformStnrdSeq: "",
            order: `${activeChildAbilitiesCount + 1}.1`,
            cont: "",
            delYn: this.statusNo,
            jobCapaUnitSeq: "",
          },
        ],
        know: "",
        skil: "",
        attit: "",
        jobAbilSeq: this.jobAbilSeq,
        useYn: this.statusYes,
        delYn: this.statusNo,
      };

      this.listJobCapaUnit.push(newChildAbility);
    },
    async deleteChildAbility(indexChild: number, childAbility: any): void {
      const result = await this.$swal({
        text: "하위역량을 삭제하시겠어요?",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: this.t("common.delete"),
        cancelButtonText: this.t("common.cancel"),
      });
      if (!result.isConfirmed) return;

      if (childAbility.jobCapaUnitSeq != "") {
        this.cmn.setLoading(true);
        const response = await checkUnit(childAbility.jobCapaUnitSeq);
        this.cmn.setLoading(false);
        if (response.data.data == true) {
          this.updateCapaUnit(indexChild, childAbility);
        } else {
          this.$swal({
            text: "활용된 하위역량은 삭제할 수 없습니다.",
            type: "warning",
            showCancelButton: false,
            confirmButtonText: this.t("common.confirm"),
            cancelButtonText: this.t("common.cancel"),
          });
        }
      } else {
        this.updateCapaUnit(indexChild, childAbility);
      }
    },
    updateCapaUnit(indexChild: number, childAbility: any) {
      const child = this.listJobCapaUnit?.[indexChild];
      if (!child || !child.performList?.length) return;

      if (child.jobCapaUnitSeq == null) {
        this.listJobCapaUnit.splice(indexChild, 1);
      } else {
        child.delYn = this.statusYes;
        child.performList.forEach((standard) => {
          standard.delYn = this.statusYes;
        });
      }

      let count = 1;
      this.listJobCapaUnit.forEach((childAbility) => {
        if (childAbility.delYn === this.statusNo) {
          childAbility.order = `${count}`;
          let subCount = 1;
          childAbility.performList.forEach((standard) => {
            if (standard.delYn === this.statusNo) {
              standard.order = `${childAbility.order}.${subCount}`;
              subCount++;
            }
          });
          count++;
        }
      });
      this.$swal({
        text: "삭제되었습니다.",
        type: "warning",
        showCancelButton: false,
        confirmButtonText: this.t("common.confirm"),
        cancelButtonText: this.t("common.cancel"),
      });
    },
    addConductStandard(childAbility: JobCapaUnit): void {
      const activeConductStandardsCount =
        childAbility.performList.filter(
          (standard) => standard.delYn === this.statusNo
        ).length || 0;

      const newConductStandard: JobCapaUnitPerform = {
        capaUnitPerformStnrdSeq: "",
        order: `${childAbility.order}.${activeConductStandardsCount + 1}`,
        cont: "",
        delYn: this.statusNo,
        jobCapaUnitSeq: childAbility.jobCapaUnitSeq,
      };

      childAbility.performList.push(newConductStandard);
    },
    async deleteConductStandard(
      childAbility: JobCapaUnit,
      indexConStant: number,
      conStan: any
    ): Promise<void> {
      const result = await this.$swal({
        text: "수행준거를 삭제하시겠습니까?",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: this.t("common.delete"),
        cancelButtonText: this.t("common.cancel"),
      });

      if (!result.isConfirmed) return;

      const conductStandard = childAbility.performList?.[indexConStant];
      if (!conductStandard) return;

      if (conStan.capaUnitPerformStnrdSeq != "") {
        this.cmn.setLoading(true);
        const response = await checkPerform(conStan.capaUnitPerformStnrdSeq);
        this.cmn.setLoading(false);
        if (response.data.data == true) {
          this.updateConductStandard(childAbility, indexConStant);
        } else {
          this.$swal({
            text: "활용된 수행준거를 삭제할 수 없습니다.",
            type: "warning",
            showCancelButton: false,
            confirmButtonText: this.t("common.confirm"),
            cancelButtonText: this.t("common.cancel"),
          });
        }
      } else {
        this.updateConductStandard(childAbility, indexConStant);
      }
    },
    updateConductStandard(childAbility: JobCapaUnit, indexConStant: number) {
      const conductStandard = childAbility.performList?.[indexConStant];
      if (!conductStandard) return;

      if (conductStandard.capaUnitPerformStnrdSeq == null) {
        childAbility.performList.splice(indexConStant, 1);
      } else {
        conductStandard.delYn = this.statusYes;
      }

      let count = 1;
      childAbility.performList.forEach((standard) => {
        if (standard.delYn === this.statusNo) {
          standard.order = `${childAbility.order}.${count}`;
          count++;
        }
      });
      this.$swal({
        text: "삭제되었습니다.",
        type: "warning",
        showCancelButton: false,
        confirmButtonText: this.t("common.confirm"),
        cancelButtonText: this.t("common.cancel"),
      });
    },
    getCodeUseYn() {
      getCodeMngByUpCdId({ upCdId: UP_CD_ID_USE_YN }).then((response: any) => {
        response.data.data.forEach((item: any) => {
          this.listUseYn.push(item);
        });
      });
    },
    nextTab(id: any) {
      this.$emit("change-tab", "tab3", id);
    },
    back() {
      this.$router.push({ name: SCREEN.jobAbilityManagement.name });
    },
    async confirmEdit() {
      if (this.checkVal()) {
        this.$swal({
          text: this.t("common.messageValidateRequired"),
          type: "warning",
          showCancelButton: false,
          showConfirmButton: true,
          confirmButtonText: this.t("common.confirm"),
        });
        return;
      }
      const result = await this.$swal({
        text: this.t("common.message.save"),
        type: "warning",
        showCancelButton: true,
        confirmButtonText: this.t("common.save"),
        cancelButtonText: this.t("common.cancel"),
      });

      if (result.isConfirmed) {
        this.cmn.setLoading(true);
        await this.saveData();
        this.cmn.setLoading(false);
        const resultNext = await this.$swal({
          text: this.t("jobAbilityManagement.tab1.nextTab"),
          type: "warning",
          showCancelButton: true,
          confirmButtonText: this.t("common.save"),
          cancelButtonText: this.t("common.cancel"),
        });
        if (resultNext.isConfirmed) {
          this.nextTab(this.jobAbilSeq);
        } else {
          this.getDataDetai();
        }
      }
    },
    checkVal() {
      if (
        this.listJobCapaUnit.length === 0 ||
        !this.listJobCapaUnit.some((item) => item.delYn === "N")
      ) {
        return true;
      }

      return this.listJobCapaUnit.some((item) => {
        if (item.delYn === "N") {
          if (
            item.attit === "" ||
            item.capaUnitNm === "" ||
            item.know === "" ||
            item.skil === "" ||
            item.performList.length === 0 ||
            !item.performList.some((item2) => item2.delYn === "N")
          ) {
            return true;
          }

          return item.performList.some(
            (item3) => item3.delYn === "N" && item3.cont === ""
          );
        }
        return false;
      });
    },
  },
};
</script>
<style scoped>
.d-flex {
  display: flex;
  align-items: center;
  gap: 10px;
}

.d-flex-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
