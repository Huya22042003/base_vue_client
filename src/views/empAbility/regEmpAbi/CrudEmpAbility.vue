<template>
  <div class="box dp_block">
    <section id="content" class="content_wrapper grid_content" tabindex="0">
      <Breadcrumb
        :pageTitle="pageTitle"
        :breadcrumbItems="breadcrumbItems"
      ></Breadcrumb>
      <div class="box_section">
        <div class="section_tit_wrap">
          <p class="section_tit">{{ t("02.empAbility.create.subTitile") }}</p>
        </div>
        <table class="tbl_row mg-b20">
          <colgroup>
            <col style="width: 18%" />
            <col style="width: auto" />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row" class="required">
                {{ t("02.empAbility.create.abilityName") }}
              </th>
              <td class="td_input">
                <InputBase
                  required
                  :id="'abilityName'"
                  v-model="empAbility.ability1levelNm"
                ></InputBase>
              </td>
            </tr>
            <tr>
              <th scope="row" class="required">
                {{ t("02.empAbility.create.abilityDefi") }}
              </th>
              <td>
                <TextArea
                  required
                  :id="'textAreaMain'"
                  v-model="empAbility.defn"
                ></TextArea>
              </td>
            </tr>
            <tr>
              <th scope="row" class="required">
                {{ t("02.empAbility.create.useYn") }}
              </th>
              <td class="td_input">
                <SelectBoxBase
                  style="width: 25%"
                  :id="'selectbox'"
                  :name="'selectbox'"
                  :data="listSelectBox"
                  v-model="useYn"
                >
                </SelectBoxBase>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="box_section mg-b20">
        <div class="box_section" id="table_1">
          <table class="tbl_row mg-b20">
            <caption>
              table row
            </caption>
            <colgroup>
              <col style="width: 18%" />
              <col style="width: auto" />
            </colgroup>
            <tbody>
              <tr>
                <th scope="row">{{ t("02.empAbility.create.classify") }}</th>
                <td class="td_input">상</td>
              </tr>
              <tr>
                <th scope="row" class="required">
                  {{ t("02.empAbility.create.score") }}
                </th>
                <td class="td_input">
                  <InputBase
                    required
                    class="w-20"
                    :id="'minHigh'"
                    v-model="empAbilityRlstHigh.standardScoreMin"
                  ></InputBase>
                  ~
                  <InputBase
                    required
                    class="w-20"
                    :id="'maxHigh'"
                    v-model="empAbilityRlstHigh.standardScoreMax"
                  ></InputBase>
                </td>
              </tr>
              <tr>
                <th scope="row" class="required">
                  {{ t("02.empAbility.create.content") }}
                </th>
                <td class="td_input">
                  <TextArea
                    required
                    :id="'textAreaHigh'"
                    v-model="empAbilityRlstHigh.contDefn"
                  ></TextArea>
                </td>
              </tr>
              <tr>
                <th scope="row" :rowspan="arrHigh.length + 1" class="required">
                  {{ t("02.empAbility.create.program") }}
                </th>
                <td class="td_input">
                  <button
                    class="button btn_sm btn_blue"
                    @click="addHigh('high')"
                  >
                    {{ t("02.empAbility.create.addProgram") }}
                  </button>
                </td>
              </tr>
              <tr
                class="td_input"
                v-for="(programHigh, index) in arrHigh"
                :key="index"
              >
                <td>
                  <InputBase
                    type="text"
                    class="mg_l5"
                    style="width: 300px"
                    readonly
                    :id="index"
                    :value="programHigh.progNm"
                    @click="showProgram(index, 'high')"
                  />

                  <button
                    class="button btn_sm btn_gray"
                    @click="delItem(index, 'highItem')"
                    style="margin-left: 10px"
                  >
                    {{ t("02.empAbility.create.delProgram") }}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="box_section" id="table_2">
          <table class="tbl_row mg-b20">
            <caption>
              table row
            </caption>
            <colgroup>
              <col style="width: 18%" />
              <col style="width: auto" />
            </colgroup>
            <tbody>
              <tr>
                <th scope="row">{{ t("02.empAbility.create.classify") }}</th>
                <td class="td_input">중</td>
              </tr>
              <tr>
                <th scope="row" class="required">
                  {{ t("02.empAbility.create.score") }}
                </th>
                <td class="td_input">
                  <InputBase
                    required
                    class="w-20"
                    :id="'minMedl'"
                    v-model="empAbilityRlstMedi.standardScoreMin"
                  ></InputBase>
                  ~
                  <InputBase
                    required
                    class="w-20"
                    :id="'maxMedl'"
                    v-model="empAbilityRlstMedi.standardScoreMax"
                  ></InputBase>
                </td>
              </tr>
              <tr>
                <th scope="row" class="required">
                  {{ t("02.empAbility.create.content") }}
                </th>
                <td>
                  <TextArea
                    required
                    :id="'textAreaMedium'"
                    v-model="empAbilityRlstMedi.contDefn"
                  ></TextArea>
                </td>
              </tr>
              <tr>
                <th
                  scope="row"
                  :rowspan="arrMedium.length + 1"
                  class="required"
                >
                  {{ t("02.empAbility.create.program") }}
                </th>
                <td class="td_input">
                  <button
                    class="button btn_sm btn_blue"
                    @click="addHigh('medium')"
                  >
                    {{ t("02.empAbility.create.addProgram") }}
                  </button>
                </td>
              </tr>
              <tr
                class="td_input"
                v-for="(programMedium, index) in arrMedium"
                :key="index"
              >
                <td>
                  <InputBase
                    type="text"
                    class="mg_l5"
                    style="width: 300px"
                    readonly
                    :id="index"
                    :value="programMedium.progNm"
                    @click="showProgram(index, 'medium')"
                  >
                  </InputBase>
                  <button
                    class="button btn_sm btn_gray"
                    @click="delItem(index, 'mediumItem')"
                    style="margin-left: 10px"
                  >
                    {{ t("02.empAbility.create.delProgram") }}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="box_section" id="table_3">
          <table class="tbl_row">
            <caption>
              table row
            </caption>
            <colgroup>
              <col style="width: 18%" />
              <col style="width: auto" />
            </colgroup>
            <tbody>
              <tr>
                <th scope="row">{{ t("02.empAbility.create.classify") }}</th>
                <td class="td_input">하</td>
              </tr>
              <tr>
                <th scope="row" class="required">
                  {{ t("02.empAbility.create.score") }}
                </th>
                <td class="td_input">
                  <InputBase
                    required
                    class="w-20"
                    :id="'minShort'"
                    v-model="empAbilityRlstShort.standardScoreMin"
                  ></InputBase>
                  ~
                  <InputBase
                    required
                    class="w-20"
                    :id="'maxShort'"
                    v-model="empAbilityRlstShort.standardScoreMax"
                  ></InputBase>
                </td>
              </tr>
              <tr>
                <th scope="row" class="required">
                  {{ t("02.empAbility.create.content") }}
                </th>
                <td>
                  <TextArea
                    required
                    :id="'textAreaShort'"
                    v-model="empAbilityRlstShort.contDefn"
                  >
                  </TextArea>
                </td>
              </tr>
              <tr>
                <th scope="row" :rowspan="arrShort.length + 1" class="required">
                  {{ t("02.empAbility.create.program") }}
                </th>
                <td class="td_input">
                  <button
                    class="button btn_sm btn_blue"
                    @click="addHigh('short')"
                  >
                    {{ t("02.empAbility.create.addProgram") }}
                  </button>
                </td>
              </tr>
              <tr
                class="td_input"
                v-for="(programShort, index) in arrShort"
                :key="index"
              >
                <td>
                  <InputBase
                    type="text"
                    class="mg_l5"
                    style="width: 300px"
                    readonly
                    :id="index"
                    :value="programShort.progNm"
                    @click="showProgram(index, 'short')"
                  >
                  </InputBase>
                  <button
                    class="button btn_sm btn_gray"
                    @click="delItem(index, 'shortItem')"
                    style="margin-left: 10px"
                  >
                    {{ t("02.empAbility.create.delProgram") }}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="box_section">
        <div class="btn_group btn_end">
          <button
            v-if="temporaryYn != 'N' && modeScreen === 'create'"
            type="button"
            class="button btn_sm btn_blue btn_responsive"
            @click="confirmSave('Y')"
          >
            {{ t("02.empAbility.create.saveOff") }}
          </button>
          <button
            v-if="modeScreen === 'create'"
            type="button"
            class="button btn_sm btn_blue btn_responsive"
            @click="confirmSave('N')"
          >
            {{ t("02.empAbility.create.btnSave") }}
          </button>
          <button
            v-if="temporaryYn != 'N' && modeScreen === 'detail'"
            type="button"
            class="button btn_sm btn_blue btn_responsive"
            @click="confirmEditData('Y')"
          >
            {{ t("02.empAbility.create.saveOff") }}
          </button>
          <button
            v-if="modeScreen === 'detail'"
            type="button"
            class="button btn_sm btn_blue btn_responsive"
            @click="confirmEditData('N')"
          >
            {{ t("02.empAbility.create.btnSave") }}
          </button>

          <button
            v-if="modeScreen === 'detail'"
            type="button"
            class="button btn_sm btn_gray btn_responsive"
            @click="removeTalent"
          >
            {{ t("02.empAbility.create.btnDel") }}
          </button>
          <button
            type="button"
            class="button btn_sm btn_white btn_responsive"
            @click="goBackList"
          >
            {{ t("02.empAbility.create.btnBack") }}
          </button>
        </div>
      </div>
    </section>
  </div>
  <FacultyCompetenceModal
    v-if="modalOpen"
    :isOpen="modalOpen"
    :statusPopUp="statusPopUp"
    @close-modal="closeModal"
    @select-item="addItemToArr"
    :popUpInfo="popUpInfo"
  />
</template>
<script lang="ts">
import InputBase from "@/components/common/input/InputBase.vue";
import TextArea from "@/components/common/input/TextArea.vue";
import FacultyCompetenceModal from "./EmpAbilityModal.vue";
import { defineComponent } from "vue";
import type {
  OneAbilityCre,
  EmpAbilityRlst,
  EmpId,
  EmpAbilityDetailDTO,
  EmpAbilityProg,
  EmpName,
  EmpAbilitySubLevelCre,
} from "@/stores/empAbility/empAbility.type";
import { useI18n } from "vue-i18n";
import type { PopUpInfo } from "@/stores/empAbility/empAbility.type";
import {
  insert,
  detailReg,
  deleteReg,
  editReg,
  checkDouble,
} from "@/stores/empAbility/empAbility.service";
import { MODE_DETAIL } from "@/constants/screen.const";
import { commonStore } from "@/stores/common";
import { SCREEN } from "@/router/screen";
import {
  STATUS_YES,
  STATUS_NO,
  HIGH_ABI,
  MEDI_ABI,
  LOW_ABI,
  UPDATE_SUCCESS,
  CORRECTED,
} from "@/constants/common.const";

export default defineComponent({
  components: {
    InputBase,
    TextArea,
    FacultyCompetenceModal,
  },
  setup: () => {
    const { t } = useI18n();
    const cmn = commonStore();
    return { t, cmn };
  },
  data() {
    return {
      pageTitle: this.t("02.empAbility.create.pageTitleMain"),
      breadcrumbItems: [
        { label: this.t("common.home"), link: "/" },
        {
          label: this.t("02.empAbility.create.pageTitleMain"),
          link: SCREEN.createEmpAbility.path,
        },
      ],
      arrHigh: [] as Array<EmpAbilityProg>,
      arrMedium: [] as Array<EmpAbilityProg>,
      arrShort: [] as Array<EmpAbilityProg>,
      modalOpen: false,
      statusPopUp: "",
      popUpInfo: {} as PopUpInfo,
      empAbilityRlstHigh: {} as EmpAbilityRlst,
      empAbilityRlstMedi: {} as EmpAbilityRlst,
      empAbilityRlstShort: {} as EmpAbilityRlst,
      empAbility: {} as OneAbilityCre,
      notiMess: "",
      idModel: {} as EmpId,
      empAbilitySubLevelCre: {} as EmpAbilitySubLevelCre,
      modeScreen: "",
      isCheckValidate: false,
      detailModel: {} as EmpAbilityDetailDTO,
      empName: {} as EmpName,
      arrHighDelete: [] as Array<EmpAbilityProg>,
      arrMediumDelete: [] as Array<EmpAbilityProg>,
      arrShortDelete: [] as Array<EmpAbilityProg>,
      listSelectBox: [
        { cdId: STATUS_YES, cdNm: "사용", upCdId: "1" },
        { cdId: STATUS_NO, cdNm: "미사용", upCdId: "1" },
      ] as Array<any>,
      useYn: "Y",
      add: "add",
      update: "",
      messDelete: "delete",
      messDelProgram: "delProgram",
      checkScore: "checkScore",
      checkValiScore: "checkValiScore",
      teporaryYn: "",
      mode: "detail",
      stsN: "N",
      stsY: "Y",
      progHigh: "high",
      progMedi: "medium",
      progShort: "short",
      progHighItem: "highItem",
      progMediItem: "mediumItem",
      progShortItem: "shortItem",
    };
  },
  beforeMount() {
    this.modeScreen = this.$route.params.mode;
    this.idModel.ability1levelSeq = window.history.state.id;
    if (this.modeScreen == MODE_DETAIL) {
      this.getDetail();
    }
  },

  methods: {
    closeModal() {
      this.modalOpen = false;
    },

    addHigh(statusPopUp: any) {
      this.modalOpen = true;
      this.statusPopUp = statusPopUp;
      this.popUpInfo = {};
    },
    delItem(idRemove: any, classRemove: any) {
      const action = this.messDelProgram;
      this.$swal({
        text: this.t("02.empAbility.message.quesDelProg"),
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: this.t("common.confirm"),
        cancelButtonText: this.t("common.cancel"),
      }).then((result: any) => {
        if (result.isConfirmed) {
          if (classRemove == this.progHighItem) {
            let updHighItems;
            if (this.arrHigh[idRemove].empAbilityRsltCmpnProgSeq) {
              this.arrHigh[idRemove].delYn = this.stsY;
              this.arrHighDelete.push(this.arrHigh[idRemove]);
            }
            updHighItems = [
              ...this.arrHigh.slice(0, idRemove),
              ...this.arrHigh.slice(idRemove + 1),
            ];
            this.arrHigh = updHighItems;
          } else if (classRemove == this.progMediItem) {
            let updMediItems;
            if (this.arrMedium[idRemove].empAbilityRsltCmpnProgSeq) {
              this.arrMedium[idRemove].delYn = this.stsY;
              this.arrMediumDelete.push(this.arrMedium[idRemove]);
            }
            updMediItems = [
              ...this.arrMedium.slice(0, idRemove),
              ...this.arrMedium.slice(idRemove + 1),
            ];
            this.arrMedium = updMediItems;
          } else {
            let updShortItems;
            if (this.arrShort[idRemove].empAbilityRsltCmpnProgSeq) {
              this.arrShort[idRemove].delYn = this.stsY;
              this.arrShortDelete.push(this.arrShort[idRemove]);
            }
            updShortItems = [
              ...this.arrShort.slice(0, idRemove),
              ...this.arrShort.slice(idRemove + 1),
            ];
            this.arrShort = updShortItems;
          }
          this.showActionSuccess(action);
        }
      });
    },
    showProgram(id: any, type: any) {
      this.modalOpen = true;
      this.statusPopUp = type;
      if (type === this.progHigh) {
        this.popUpInfo = { ...this.arrHigh[id], id: id };
      } else if (type === this.progMedi) {
        this.popUpInfo = { ...this.arrMedium[id], id: id };
      } else {
        this.popUpInfo = { ...this.arrShort[id], id: id };
      }
    },
    showActionSuccess(action: any) {
      if (action == this.add) {
        this.notiMess = this.t("02.empAbility.message.ansSave");
      } else if (action == this.messDelProgram) {
        this.notiMess = this.t("02.empAbility.message.ansDelProg");
      } else if (action == "del") {
        this.notiMess = this.t("02.empAbility.message.ansDel");
      } else if (action == "checkName") {
        this.notiMess = this.t("02.empAbility.message.ansCheckName");
      } else if (action == "checkHis") {
        this.notiMess = this.t("02.empAbility.message.checkUseAbi");
      } else if (action == this.checkScore) {
        this.notiMess = this.t("02.empAbility.message.ansCheckNum");
      } else if (action == this.checkValiScore) {
        this.notiMess = this.t("02.empAbility.message.checkValScore");
      } else if (action == this.update) {
        this.notiMess = this.t("02.empAbility.message.ansSave");
      } else if (action == this.messDelete) {
        this.notiMess = this.t("02.empAbility.message.ansDel");
      }
      this.$swal({
        text: this.notiMess,
        type: "warning",
        showCancelButton: false,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: this.t("common.confirm"),
      }).then((result: any) => {
        if (result.isConfirmed) {
          if (
            action == this.add ||
            action == this.update ||
            action == this.messDelete
          ) {
            this.goBackList();
          }
        }
      });
    },
    confirmSave(temporaryYn: string) {
      if (this.modeScreen === this.mode) {
        this.empAbility.temporaryYn = this.stsN;
        this.confirmEditData(this.empAbility.temporaryYn);
      } else {
        this.$swal({
          text: this.t("02.empAbility.message.quesSave"),
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: this.t("common.confirm"),
          cancelButtonText: this.t("common.cancel"),
        }).then((result: any) => {
          if (result.isConfirmed) {
            if (temporaryYn == this.stsN) {
              if (this.isCheckValidate) {
                if (
                  this.validateDecimal(
                    this.empAbilityRlstHigh.standardScoreMin
                  ) &&
                  this.validateDecimal(
                    this.empAbilityRlstHigh.standardScoreMax
                  ) &&
                  this.validateDecimal(
                    this.empAbilityRlstMedi.standardScoreMin
                  ) &&
                  this.validateDecimal(
                    this.empAbilityRlstMedi.standardScoreMax
                  ) &&
                  this.validateDecimal(
                    this.empAbilityRlstShort.standardScoreMin
                  ) &&
                  this.validateDecimal(
                    this.empAbilityRlstShort.standardScoreMax
                  )
                ) {
                  if (
                    this.checkValues(
                      this.empAbilityRlstHigh.standardScoreMin,
                      this.empAbilityRlstHigh.standardScoreMax
                    ) &&
                    this.checkValues(
                      this.empAbilityRlstMedi.standardScoreMin,
                      this.empAbilityRlstMedi.standardScoreMax
                    ) &&
                    this.checkValues(
                      this.empAbilityRlstShort.standardScoreMin,
                      this.empAbilityRlstShort.standardScoreMax
                    )
                  ) {
                    if (
                      parseFloat(this.empAbilityRlstHigh.standardScoreMin) >
                      parseFloat(this.empAbilityRlstMedi.standardScoreMax)
                    ) {
                      if (
                        parseFloat(this.empAbilityRlstMedi.standardScoreMax) >
                        parseFloat(this.empAbilityRlstShort.standardScoreMin)
                      ) {
                        this.save(temporaryYn);
                      } else {
                        this.$swal({
                          text: this.t("02.empAbility.message.checkScoreHM"),
                          type: "warning",
                          showCancelButton: false,
                          confirmButtonColor: "#DD6B55",
                          confirmButtonText: this.t("common.confirm"),
                        });
                      }
                    } else {
                      this.$swal({
                        text: this.t("02.empAbility.message.checkScoreMS"),
                        type: "warning",
                        showCancelButton: false,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: this.t("common.confirm"),
                      });
                    }
                  } else {
                    this.showActionSuccess(this.checkValiScore);
                  }
                } else {
                  this.showActionSuccess(this.checkScore);
                }
              } else {
                this.$swal({
                  text: this.t("02.empAbility.message.validNotEmpty"),
                  type: "warning",
                  showCancelButton: false,
                  confirmButtonColor: "#DD6B55",
                  confirmButtonText: this.t("common.confirm"),
                });
              }
            } else {
              if (this.empAbility.ability1levelNm) {
                this.save(temporaryYn);
              } else {
                this.$swal({
                  text: this.t("02.empAbility.message.checkLevelNm"),
                  type: "warning",
                  showCancelButton: false,
                  confirmButtonColor: "#DD6B55",
                  confirmButtonText: this.t("common.confirm"),
                });
              }
            }
          }
        });
      }
    },
    async save(temporaryYn: string) {
      this.cmn.setLoading(true);
      this.empAbilityRlstHigh.empAbilityProgCreDTOS = this.arrHigh;
      this.empAbilityRlstMedi.empAbilityProgCreDTOS = this.arrMedium;
      this.empAbilityRlstShort.empAbilityProgCreDTOS = this.arrShort;
      let checkNmHigh = false;
      let checkNmMedi = false;
      let checkNmLow = false;
      checkNmHigh = this.hasDuplicateName(
        this.empAbilityRlstHigh.empAbilityProgCreDTOS
      );
      checkNmMedi = this.hasDuplicateName(
        this.empAbilityRlstMedi.empAbilityProgCreDTOS
      );
      checkNmLow = this.hasDuplicateName(
        this.empAbilityRlstShort.empAbilityProgCreDTOS
      );
      this.empAbilityRlstHigh.lvlCd = HIGH_ABI;
      this.empAbilityRlstMedi.lvlCd = MEDI_ABI;
      this.empAbilityRlstShort.lvlCd = LOW_ABI;
      for (
        let i = 0;
        i < this.empAbilityRlstHigh.empAbilityProgCreDTOS.length;
        i++
      ) {
        this.empAbilityRlstHigh.empAbilityProgCreDTOS[i].lvlCd = HIGH_ABI;
      }
      for (
        let i = 0;
        i < this.empAbilityRlstMedi.empAbilityProgCreDTOS.length;
        i++
      ) {
        this.empAbilityRlstMedi.empAbilityProgCreDTOS[i].lvlCd = MEDI_ABI;
      }
      for (
        let i = 0;
        i < this.empAbilityRlstShort.empAbilityProgCreDTOS.length;
        i++
      ) {
        this.empAbilityRlstShort.empAbilityProgCreDTOS[i].lvlCd = LOW_ABI;
      }
      const arr = [];
      arr.push(this.empAbilityRlstHigh);
      arr.push(this.empAbilityRlstMedi);
      arr.push(this.empAbilityRlstShort);
      this.empAbility.empAbilityRlstCreDTOs = arr;
      this.empAbility.temporaryYn = temporaryYn;
      this.empAbility.useYn = this.useYn;
      this.empName.name = this.empAbility.empAbilityNm;
      if (checkNmHigh && checkNmMedi && checkNmLow) {
        await insert(this.empAbility).then((res) => {
          if (res.data.data) {
            this.showActionSuccess(this.add);
          } else {
            this.$swal({
              text: this.t("02.empAbility.message.checkLevelDouble"),
              type: "warning",
              showCancelButton: false,
              confirmButtonColor: "#DD6B55",
              confirmButtonText: this.t("common.confirm"),
              cancelButtonText: this.t("common.cancel"),
            });
          }
          this.cmn.setLoading(false);
        });
      } else {
        this.$swal({
          text: this.t("02.empAbility.message.checkProgNm"),
          type: "warning",
          showCancelButton: false,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: this.t("common.confirm"),
        });
      }
      this.cmn.setLoading(false);
    },
    confirmEditData(temporary: string) {
      this.$swal({
        text: this.t("02.empAbility.message.quesSave"),
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: this.t("common.confirm"),
        cancelButtonText: this.t("common.cancel"),
      }).then((result: any) => {
        if (result.isConfirmed) {
          if (temporary == this.stsN) {
            if (
              parseFloat(this.empAbilityRlstHigh.standardScoreMin) >
              parseFloat(this.empAbilityRlstMedi.standardScoreMax)
            ) {
              if (
                parseFloat(this.empAbilityRlstMedi.standardScoreMax) >
                parseFloat(this.empAbilityRlstShort.standardScoreMin)
              ) {
                this.editData(temporary);
              } else {
                this.$swal({
                  text: this.t("02.empAbility.message.checkScoreHM"),
                  type: "warning",
                  showCancelButton: false,
                  confirmButtonColor: "#DD6B55",
                  confirmButtonText: this.t("common.confirm"),
                });
              }
            } else {
              this.$swal({
                text: this.t("02.empAbility.message.checkScoreMS"),
                type: "warning",
                showCancelButton: false,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: this.t("common.confirm"),
              });
            }
          } else {
            if (this.empAbility.ability1levelNm) {
              this.editData(temporary);
            } else {
              this.$swal({
                text: this.t("02.empAbility.message.checkLevelNm"),
                type: "warning",
                showCancelButton: false,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: this.t("common.confirm"),
              });
            }
          }
        }
      });
    },
    async editData(temporary: any) {
      this.cmn.setLoading(true);
      this.empAbility.ability1levelSeq = this.idModel.ability1levelSeq;
      this.empAbility.useYn = this.useYn;
      this.empAbility.temporaryYn = temporary;
      this.empAbilityRlstHigh.empAbilityProgCreDTOS = [
        ...this.arrHigh,
        ...this.arrHighDelete,
      ];
      this.empAbilityRlstMedi.empAbilityProgCreDTOS = [
        ...this.arrMedium,
        ...this.arrMediumDelete,
      ];

      this.empAbilityRlstShort.empAbilityProgCreDTOS = [
        ...this.arrShort,
        ...this.arrShortDelete,
      ];
      let checkNmHigh = false;
      let checkNmMedi = false;
      let checkNmLow = false;
      checkNmHigh = this.hasDuplicateName(
        this.empAbilityRlstHigh.empAbilityProgCreDTOS
      );
      checkNmMedi = this.hasDuplicateName(
        this.empAbilityRlstMedi.empAbilityProgCreDTOS
      );
      checkNmLow = this.hasDuplicateName(
        this.empAbilityRlstShort.empAbilityProgCreDTOS
      );
      this.empAbilityRlstHigh.lvlCd = HIGH_ABI;
      this.empAbilityRlstMedi.lvlCd = MEDI_ABI;
      this.empAbilityRlstShort.lvlCd = LOW_ABI;
      for (
        let i = 0;
        i < this.empAbilityRlstHigh.empAbilityProgCreDTOS.length;
        i++
      ) {
        this.empAbilityRlstHigh.empAbilityProgCreDTOS[i].lvlCd = HIGH_ABI;
      }
      for (
        let i = 0;
        i < this.empAbilityRlstMedi.empAbilityProgCreDTOS.length;
        i++
      ) {
        this.empAbilityRlstMedi.empAbilityProgCreDTOS[i].lvlCd = MEDI_ABI;
      }
      for (
        let i = 0;
        i < this.empAbilityRlstShort.empAbilityProgCreDTOS.length;
        i++
      ) {
        this.empAbilityRlstShort.empAbilityProgCreDTOS[i].lvlCd = LOW_ABI;
      }
      const arr = [];
      arr.push(this.empAbilityRlstHigh);
      arr.push(this.empAbilityRlstMedi);
      arr.push(this.empAbilityRlstShort);
      this.empAbility.empAbilityRlstCreDTOs = arr;
      this.empName.name = this.empAbility.empAbilityNm;
      this.empName.ability1levelSeq = this.idModel.ability1levelSeq;
      if (temporary == this.stsN) {
        if (this.isCheckValidate) {
          if (checkNmHigh && checkNmMedi && checkNmLow) {
            await editReg(this.empAbility).then((res) => {
              if (res.data.data == UPDATE_SUCCESS) {
                this.showActionSuccess(this.update);
              } else if (res.data.data == CORRECTED) {
                this.$swal({
                  text: this.t("02.empAbility.message.checkLevelUse"),
                  type: "warning",
                  showCancelButton: false,
                  confirmButtonColor: "#DD6B55",
                  confirmButtonText: this.t("common.confirm"),
                });
              } else {
                this.$swal({
                  text: this.t("02.empAbility.message.checkLevelDouble"),
                  type: "warning",
                  showCancelButton: false,
                  confirmButtonColor: "#DD6B55",
                  confirmButtonText: this.t("common.confirm"),
                });
              }
            });
          }
        } else {
          this.$swal({
            text: this.t("02.empAbility.message.checkProgNm"),
            type: "warning",
            showCancelButton: false,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: this.t("common.confirm"),
          });
        }
      } else {
        await editReg(this.empAbility).then((res) => {
          if (res.data.data) {
            this.showActionSuccess(this.update);
          } else {
            this.$swal({
              text: this.t("02.empAbility.message.checkLevelDouble"),
              type: "warning",
              showCancelButton: false,
              confirmButtonColor: "#DD6B55",
              confirmButtonText: this.t("common.confirm"),
              cancelButtonText: this.t("common.cancel"),
            });
          }
        });
      }
      this.cmn.setLoading(false);
    },

    removeTalent() {
      this.$swal({
        text: this.t("02.empAbility.message.quesDel"),
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: this.t("common.confirm"),
        cancelButtonText: this.t("common.cancel"),
      }).then((result: any) => {
        if (result.isConfirmed) {
          this.delete();
        }
      });
    },
    goBackList() {
      this.$router.replace({ path: SCREEN.empAbility.path });
    },
    addItemToArr(selectedItems: PopUpInfo) {
      if (selectedItems.status == this.progHigh) {
        let isReplaced = false;

        for (let i = 0; i < this.arrHigh.length; i++) {
          if (i === selectedItems.id) {
            this.arrHigh[i].progNm = selectedItems.progNm;
            this.arrHigh[i].url = selectedItems.url;
            isReplaced = true;
            break;
          }
        }
        if (!isReplaced) {
          this.arrHigh.push({
            progNm: selectedItems.progNm,
            url: selectedItems.url,
          });
        }
      } else if (selectedItems.status == this.progMedi) {
        let isReplaced = false;

        for (let i = 0; i < this.arrMedium.length; i++) {
          if (i === selectedItems.id) {
            this.arrMedium[i].progNm = selectedItems.progNm;
            this.arrMedium[i].url = selectedItems.url;
            isReplaced = true;
            break;
          }
        }
        if (!isReplaced) {
          this.arrMedium.push({
            progNm: selectedItems.progNm,
            url: selectedItems.url,
          });
        }
      } else if (selectedItems.status == this.progShort) {
        let isReplaced = false;

        for (let i = 0; i < this.arrShort.length; i++) {
          if (i === selectedItems.id) {
            this.arrShort[i].progNm = selectedItems.progNm;
            this.arrShort[i].url = selectedItems.url;
            isReplaced = true;
            break;
          }
        }
        if (!isReplaced) {
          this.arrShort.push({
            progNm: selectedItems.progNm,
            url: selectedItems.url,
          });
        }
      }
    },
    getDetail() {
      this.cmn.setLoading(true);
      detailReg(this.idModel)
        .then((res) => {
          this.detailModel = res.data.data;
          this.empAbility.ability1levelNm = this.detailModel.ability1levelNm;
          this.empAbility.defn = this.detailModel.defn;
          this.temporaryYn = this.detailModel.temporaryYn;
          this.useYn = this.detailModel.useYn;
          if (
            this.detailModel.empAbilityRlstCreDTOs &&
            this.detailModel.empAbilityRlstCreDTOs.length > 0
          ) {
            for (
              var i = 0;
              i < this.detailModel.empAbilityRlstCreDTOs.length;
              i++
            ) {
              if (this.detailModel.empAbilityRlstCreDTOs[i].lvlCd == LOW_ABI) {
                this.empAbilityRlstShort =
                  this.detailModel.empAbilityRlstCreDTOs[i];
                this.arrShort = this.empAbilityRlstShort.empAbilityProgCreDTOS;
              } else if (
                this.detailModel.empAbilityRlstCreDTOs[i].lvlCd == MEDI_ABI
              ) {
                this.empAbilityRlstMedi =
                  this.detailModel.empAbilityRlstCreDTOs[i];
                this.arrMedium = this.empAbilityRlstMedi.empAbilityProgCreDTOS;
              } else if (
                this.detailModel.empAbilityRlstCreDTOs[i].lvlCd == HIGH_ABI
              ) {
                this.empAbilityRlstHigh =
                  this.detailModel.empAbilityRlstCreDTOs[i];

                this.arrHigh = this.empAbilityRlstHigh.empAbilityProgCreDTOS;
              }
            }
          }
        })
        .catch((error) => {})
        .finally(() => {
          this.cmn.setLoading(false);
        });
    },
    delete() {
      this.cmn.setLoading(true);
      deleteReg(this.idModel)
        .then((res) => {
          if (res.data.data) {
            this.showActionSuccess(this.messDelete);
          } else {
            this.$swal({
              text: this.t("02.empAbility.message.ansDelAll"),
              type: "warning",
              showCancelButton: false,
              confirmButtonColor: "#DD6B55",
              confirmButtonText: this.t("common.confirm"),
              cancelButtonText: this.t("common.cancel"),
            });
          }
        })
        .catch((error) => {})
        .finally(() => {
          this.cmn.setLoading(false);
        });
    },
    checkValid() {
      this.isCheckValidate =
        this.empAbility.ability1levelNm &&
        this.empAbility.defn &&
        this.useYn &&
        this.empAbilityRlstHigh.contDefn &&
        this.empAbilityRlstHigh.standardScoreMin &&
        this.empAbilityRlstHigh.standardScoreMax &&
        this.empAbilityRlstMedi.contDefn &&
        this.empAbilityRlstMedi.standardScoreMin &&
        this.empAbilityRlstMedi.standardScoreMax &&
        this.empAbilityRlstShort.contDefn &&
        this.empAbilityRlstShort.standardScoreMin &&
        this.empAbilityRlstShort.standardScoreMax &&
        this.arrHigh.length != 0 &&
        this.arrMedium.length != 0 &&
        this.arrShort.length != 0;
    },
    validateDecimal(value) {
      const regex = /^[0-9]*\.?[0-9]*$/;
      return regex.test(value) && value.split(".").length - 1 <= 1;
    },
    checkValues(min, max) {
      const numA = parseFloat(min);
      const numB = parseFloat(max);
      if (numA > numB) {
        return false;
      } else {
        return true;
      }
    },
    hasDuplicateName(array) {
      const nameCount = {};
      for (const item of array) {
        if (nameCount[item.progNm]) {
          return false;
        }
        nameCount[item.progNm] = 1;
      }
      return true;
    },
  },
  watch: {
    empAbility: {
      handler: "checkValid",
      deep: true,
    },
    empAbilityRlstHigh: {
      handler: "checkValid",
      deep: true,
    },
    empAbilityRlstMedi: {
      handler: "checkValid",
      deep: true,
    },
    empAbilityRlstShort: {
      handler: "checkValid",
      deep: true,
    },
    arrHigh: {
      handler: "checkValid",
      deep: true,
    },
    arrMedium: {
      handler: "checkValid",
      deep: true,
    },
    arrShort: {
      handler: "checkValid",
      deep: true,
    },
  },
});
</script>
<style>
.w-20 {
  width: 10%;
}

.mg-b20 {
  margin-bottom: 20px;
}
</style>
