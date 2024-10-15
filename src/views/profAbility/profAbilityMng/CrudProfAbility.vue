<template>
  <div class="box dp_block">
    <section id="content" class="content_wrapper grid_content" tabindex="0">
      <Breadcrumb
        :pageTitle="pageTitle"
        :breadcrumbItems="breadcrumbItems"
      ></Breadcrumb>

      <div class="box_section">
        <p class="box_title_sm">{{ t("02.profAbilityAction.pageSubTitle") }}</p>
        <table class="tbl_row mg-b20">
          <caption>
            table row
          </caption>
          <colgroup>
            <col style="width: 20%" />
            <col style="width: auto" />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row" class="required">
                {{ t("02.profAbilityAction.wisePrideNm") }}
              </th>
              <td class="td_input">
                <InputBase
                  v-model="wisePride.wisePrideNm"
                  :id="'profAbilityNm'"
                  required
                ></InputBase>
              </td>
            </tr>
            <tr>
              <th scope="row" class="required">
                {{ t("02.profAbilityAction.wisePriDefn") }}
              </th>
              <td>
                <TextArea
                  :id="'textAreaMain'"
                  v-model="wisePride.defn"
                  required
                ></TextArea>
              </td>
            </tr>
            <tr>
              <th scope="row" class="required">
                {{ t("02.profAbilityAction.wisePriYn") }}
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

      <div class="box_section">
        <div class="box_section mg-b20" id="table_1">
          <table class="tbl_row">
            <caption>
              table row
            </caption>
            <colgroup>
              <col style="width: 20%" />
              <col style="width: auto" />
            </colgroup>
            <tbody>
              <tr>
                <th scope="row">
                  {{ t("02.profAbilityAction.laybalHDL") }}
                </th>
                <td class="td_input">상</td>
              </tr>
              <tr>
                <th scope="row" class="required">
                  {{ t("02.profAbilityAction.score") }}
                </th>
                <td>
                  <InputBase
                    v-model="compe1.standardScoreMin"
                    class="w-20"
                    :id="'scoreShort'"
                    required
                  ></InputBase>
                  ~
                  <InputBase
                    required
                    class="w-20"
                    :id="'maxHigh'"
                    v-model="compe1.standardScoreMax"
                  ></InputBase>
                </td>
              </tr>
              <tr>
                <th scope="row" class="required">
                  {{ t("02.profAbilityAction.defn") }}
                </th>
                <td>
                  <TextArea
                    :id="'textAreaHigh'"
                    v-model="compe1.contDefn"
                    required
                  ></TextArea>
                </td>
              </tr>
              <tr>
                <th scope="row" rowspan="5" class="required">
                  {{ t("02.profAbilityAction.program") }}
                </th>
                <td class="td_input">
                  <button
                    class="button btn_sm btn_blue"
                    @click="addHigh('high')"
                  >
                    {{ t("02.profAbilityAction.btnAddProgram") }}
                  </button>
                </td>
              </tr>
              <tr v-for="(programHigh, index) in arrHigh" :key="index">
                <td class="td_input">
                  <InputBase
                    type="text"
                    class="mg_l5"
                    style="width: 300px"
                    readonly
                    :id="index"
                    :value="programHigh.progNm"
                    @input="handleInput(index, $event)"
                    @click="showProgram(index, 'highItem')"
                  >
                  </InputBase>
                  <button
                    class="button btn_sm btn_gray"
                    @click="delItemQues(index, 'highItem')"
                    style="margin-left: 10px"
                  >
                    {{ t("02.profAbilityAction.btnDelProgram") }}
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
              <col style="width: 20%" />
              <col style="width: auto" />
            </colgroup>
            <tbody>
              <tr>
                <th scope="row">
                  {{ t("02.profAbilityAction.laybalHDL") }}
                </th>
                <td class="td_input">중</td>
              </tr>
              <tr>
                <th scope="row" class="required">
                  {{ t("02.profAbilityAction.score") }}
                </th>
                <td>
                  <InputBase
                    v-model="compe2.standardScoreMin"
                    class="w-20"
                    :id="'scoreShort'"
                    required
                  ></InputBase>
                  ~
                  <InputBase
                    required
                    class="w-20"
                    :id="'maxHigh'"
                    v-model="compe2.standardScoreMax"
                  ></InputBase>
                </td>
              </tr>
              <tr>
                <th scope="row" class="required">
                  {{ t("02.profAbilityAction.defn") }}
                </th>
                <td>
                  <TextArea
                    :id="'textAreaMedium'"
                    v-model="compe2.contDefn"
                    required
                  ></TextArea>
                </td>
              </tr>
              <tr>
                <th scope="row" rowspan="5" class="required">
                  {{ t("02.profAbilityAction.program") }}
                </th>
                <td class="td_input">
                  <button
                    class="button btn_sm btn_blue"
                    @click="addHigh('medium')"
                  >
                    {{ t("02.profAbilityAction.btnAddProgram") }}
                  </button>
                </td>
              </tr>
              <tr v-for="(programMedium, index) in arrMedium" :key="index">
                <td class="td_input">
                  <InputBase
                    type="text"
                    class="mg_l5"
                    style="width: 300px"
                    readonly
                    :id="index"
                    :value="programMedium.progNm"
                    @input="handleInput(index, $event)"
                    @click="showProgram(index, 'mediumItem')"
                  >
                  </InputBase>
                  <button
                    class="button btn_sm btn_gray"
                    @click="delItemQues(index, 'mediumItem')"
                    style="margin-left: 10px"
                  >
                    {{ t("02.profAbilityAction.btnDelProgram") }}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="box_section" id="table_3">
          <table class="tbl_row mg-b20">
            <caption>
              table row
            </caption>
            <colgroup>
              <col style="width: 20%" />
              <col style="width: auto" />
            </colgroup>
            <tbody>
              <tr>
                <th scope="row">
                  {{ t("02.profAbilityAction.laybalHDL") }}
                </th>
                <td class="td_input">하</td>
              </tr>
              <tr>
                <th scope="row" class="required">
                  {{ t("02.profAbilityAction.score") }}
                </th>
                <td>
                  <InputBase
                    v-model="compe3.standardScoreMin"
                    class="w-20"
                    :id="'scoreShort'"
                    required
                  ></InputBase>
                  ~
                  <InputBase
                    required
                    class="w-20"
                    :id="'maxHigh'"
                    v-model="compe3.standardScoreMax"
                  ></InputBase>
                </td>
              </tr>
              <tr>
                <th scope="row" class="required">
                  {{ t("02.profAbilityAction.defn") }}
                </th>
                <td>
                  <TextArea
                    :id="'textAreaShort'"
                    v-model="compe3.contDefn"
                    required
                  >
                  </TextArea>
                </td>
              </tr>
              <tr>
                <th scope="row" rowspan="5" class="required">
                  {{ t("02.profAbilityAction.program") }}
                </th>
                <td class="td_input">
                  <button
                    class="button btn_sm btn_blue"
                    @click="addHigh('short')"
                  >
                    {{ t("02.profAbilityAction.btnAddProgram") }}
                  </button>
                </td>
              </tr>
              <tr v-for="(programShort, index) in arrShort" :key="index">
                <td class="td_input">
                  <InputBase
                    type="text"
                    class="mg_l5"
                    style="width: 300px"
                    readonly
                    :id="index"
                    :value="programShort.progNm"
                    @input="handleInput(index, $event)"
                    @click="showProgram(index, 'shortItem')"
                  >
                  </InputBase>
                  <button
                    class="button btn_sm btn_gray"
                    @click="delItemQues(index, 'shortItem')"
                    style="margin-left: 10px"
                  >
                    {{ t("02.profAbilityAction.btnDelProgram") }}
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
            v-if="wisePride.temporaryYn != 'N' && modeScreen != 'detail'"
            type="button"
            class="button btn_sm btn_blue btn_responsive"
            @click="saveTalent('Y', 'save')"
          >
            {{ t("02.profAbilityAction.btnSaveOff") }}
          </button>
          <button
            v-if="wisePride.temporaryYn != 'N' && modeScreen == 'detail'"
            type="button"
            class="button btn_sm btn_blue btn_responsive"
            @click="saveTalent('Y', 'update')"
          >
            {{ t("02.profAbilityAction.btnSaveOff") }}
          </button>
          <button
            v-if="modeScreen == 'detail'"
            type="button"
            class="button btn_sm btn_blue btn_responsive"
            @click="saveTalent('N', 'update')"
          >
            {{ t("02.profAbilityAction.btnSave") }}
          </button>
          <button
            v-if="modeScreen != 'detail'"
            type="button"
            class="button btn_sm btn_blue btn_responsive"
            @click="saveTalent('N', 'save')"
          >
            {{ t("02.profAbilityAction.btnSave") }}
          </button>
          <button
            v-if="modeScreen == 'detail'"
            type="button"
            class="button btn_sm btn_gray btn_responsive"
            @click="removeProf"
          >
            {{ t("02.profAbilityAction.btnDel") }}
          </button>
          <button
            type="button"
            class="button btn_sm btn_white btn_responsive"
            @click="back"
          >
            {{ t("02.profAbilityAction.btnBack") }}
          </button>
        </div>
      </div>
    </section>
  </div>
  <ProfAbilityModal
    :isOpen="modalOpen"
    @close-modal="cancelAction"
    @action-modal="confirmAction(statusPopUp, progNm, url, id)"
    :statusPopUp="statusPopUp"
    v-if="modalOpen"
    :popUpInfo="popUpInfo"
  />
</template>
<script lang="ts">
import { WisePrideCreDTO } from "@/stores/profAbility/profAbility.type";
import InputBase from "@/components/common/input/InputBase.vue";
import TextArea from "@/components/common/input/TextArea.vue";
import ProfAbilityModal from "./modal/ProfAbilityModal.vue";
import { ConstiCompeCreDTO } from "@/stores/profAbility/profAbility.type";
import { LEVEL_HIGH } from "@/constants/common.const";
import {
  ConstiCompeProgResDTO,
  WisePrideId,
} from "@/stores/profAbility/profAbility.type";
import { LEVEL_LOW, LEVEL_MID } from "@/constants/common.const";
import { createProf } from "@/stores/profAbility/profAbility.service";
import { SUCCSESS_STATUS } from "@/constants/screen.const";
import { profStore } from "@/stores/profAbility";
import { commonStore } from "@/stores/common";
import { deleteProg } from "@/stores/profAbility/profAbility.service";
import {
  MESSAGE_ERROR_API,
  UPDATE_SUCCESS,
  CORRECTED,
} from "@/constants/common.const";
import {
  deleteProf,
  detailProf,
  updateProf,
} from "@/stores/profAbility/profAbility.service";
import { SCREEN } from "@/router/screen";
import { STATUS_YES, STATUS_NO } from "@/constants/common.const";
import type { PopUpInfo } from "@/stores/profAbility/profAbility.type";

export default defineComponent({
  components: {
    InputBase,
    TextArea,
    ProfAbilityModal,
  },
  setup: () => {
    const idxHigh = 0;
    const idxMedium = 0;
    const idxShort = 0;
    const profStr = profStore();
    const store = commonStore();
    const { t } = useI18n();
    return { idxHigh, idxMedium, idxShort, profStr, store, t };
  },
  data() {
    return {
      pageTitle: this.t("02.profAbilityAction.pageTitle"),
      breadcrumbItems: [
        { label: this.t("common.home"), link: "/" },
        { label: this.t("02.profAbilityChd.menu"), link: "#" },
        {
          label: this.t("02.profAbilityAction.pageTitle"),
          link: SCREEN.profChldList.path,
        },
      ],
      arrHigh: [],
      arrMedium: [],
      arrShort: [],
      modalOpen: false,
      statusPopUp: "",
      notiMess: "",
      idEdit: "",
      popUpInfo: {} as PopUpInfo,
      wisePrideId: {} as WisePrideId,
      wisePride: {} as WisePrideCreDTO,
      compe1: {} as ConstiCompeCreDTO,
      compe2: {} as ConstiCompeCreDTO,
      compe3: {} as ConstiCompeCreDTO,
      wisePrideSeq: "",
      check: true,
      modeScreen: "",
      arrProgId: [] as Array<ConstiCompeProgResDTO>,
      listSelectBox: [
        { cdId: STATUS_YES, cdNm: "사용", upCdId: "1" },
        { cdId: STATUS_NO, cdNm: "미사용", upCdId: "1" },
      ] as Array<any>,
      useYn: "Y",
      isCheckValidate: false,
      temporaryYn: "",
    };
  },
  beforeMount() {
    this.profAbiSeq = window.history.state.profAbilitySeq;
    this.modeScreen = window.history.state.modeScreen;
    this.wisePrideId.wisePrideSeq = this.profAbiSeq;
    if (this.profAbiSeq) {
      this.getDetail();
    }
  },
  updated() {},
  methods: {
    async getDetail() {
      this.store.setLoading(true);
      this.wisePrideId.wisePrideSeq = this.profAbiSeq;
      await detailProf(this.wisePrideId)
        .then((res) => {
          this.wisePride = res.data.data;
          this.useYn = this.wisePride.useYn;
          this.temporaryYn = this.wisePride.temporaryYn;
          this.wisePride.compeResDTOS.forEach((item) => {
            if (item.lvlCd == LEVEL_HIGH) {
              this.compe1 = item;
              this.standardScoreMin = this.compe1.standardScoreMin;
              this.standardScoreMax = this.compe1.standardScoreMax;
              this.arrHigh = this.compe1.compeProgCreDTOS;
            }

            if (item.lvlCd == LEVEL_MID) {
              this.compe2 = item;
              this.standardScoreMin = this.compe2.standardScoreMin;
              this.standardScoreMax = this.compe2.standardScoreMax;
              this.arrMedium = this.compe2.compeProgCreDTOS;
            }

            if (item.lvlCd == LEVEL_LOW) {
              this.compe3 = item;
              this.standardScoreMin = this.compe3.standardScoreMin;
              this.standardScoreMax = this.compe3.standardScoreMax;
              this.arrShort = this.compe3.compeProgCreDTOS;
            }
          });
        })
        .catch((error) => {
          throw new Error(MESSAGE_ERROR_API);
        })
        .finally(() => {
          this.store.setLoading(false);
        });
    },
    addRowHigh(progNm, url) {
      this.arrHigh.push({
        id: this.idxHigh,
        profAbilityRsltCmpnProgSeq: "",
        progNm: progNm.value,
        url: url.value,
      });
      this.idxHigh++;
    },
    addRowMedium() {
      this.arrMedium.push({
        id: this.idxMedium,
        profAbilityRsltCmpnProgSeq: "",
        progNm: progNm.value,
        url: url.value,
      });
      this.idxMedium++;
    },
    addRowShort() {
      this.arrShort.push({
        id: this.idxShort,
        profAbilityRsltCmpnProgSeq: "",
        progNm: progNm.value,
        url: url.value,
      });
      this.idxShort++;
    },
    handleInput(index, event) {
      this.arrHigh[index] = {
        ...this.arrHigh[index],
        value: event.target.value,
      };
    },
    openModalDelHigh(index) {
      const updatedItems = [
        ...this.arrHigh.slice(0, index),
        ...this.arrHigh.slice(index + 1),
      ];
      this.arrHigh = updatedItems;
    },
    confirmAction(statusPopUp, progNm, url) {
      this.addItem(statusPopUp);
    },
    closeModal() {
      this.modalOpen = false;
    },
    cancelAction() {
      this.closeModal();
    },
    addItem(statusPopUp) {
      const action = "addPro";
      this.$swal({
        text: this.t("02.profAbilityAction.message.quesSave"),
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "확인",
        cancelButtonText: "취소",
      })
        .then((result) => {
          if (result.isConfirmed) {
            if (statusPopUp == "high") {
              this.addRowHigh(progNm, url);
            } else if (statusPopUp == "medium") {
              this.addRowMedium();
            } else if (statusPopUp == "short") {
              this.addRowShort();
            }
            if (statusPopUp == "highItem") {
              this.arrHigh[this.idEdit].progNm = progNm.value;
              this.arrHigh[this.idEdit].url = url.value;
            } else if (statusPopUp == "mediumItem") {
              this.arrMedium[this.idEdit].progNm = progNm.value;
              this.arrMedium[this.idEdit].url = url.value;
            } else if (statusPopUp == "shortItem") {
              this.arrShort[this.idEdit].progNm = progNm.value;
              this.arrShort[this.idEdit].url = url.value;
            }
            this.cancelAction();
          } else if (result.isDismissed) {
          }
        })
        .finally(() => {});
    },
    addHigh(type) {
      this.modalOpen = true;
      this.statusPopUp = type;
      this.popUpInfo = {};
    },
    delItemQues(idRemove, classRemove) {
      this.showActionSuccess("delItem", true, () =>
        this.delItem(idRemove, classRemove)
      );
    },
    delItem(idRemove, classRemove) {
      let rvItem = {} as ConstiCompeProgResDTO;

      if (classRemove == "highItem") {
        rvItem = this.arrHigh[idRemove];

        const updHighItems = [
          ...this.arrHigh.slice(0, idRemove),
          ...this.arrHigh.slice(idRemove + 1),
        ];

        this.arrHigh = updHighItems;
      } else if (classRemove == "mediumItem") {
        rvItem = this.arrMedium[idRemove];

        const updMediumItems = [
          ...this.arrMedium.slice(0, idRemove),
          ...this.arrMedium.slice(idRemove + 1),
        ];

        this.arrMedium = updMediumItems;
      } else {
        rvItem = this.arrShort[idRemove];

        const updShortItems = [
          ...this.arrShort.slice(0, idRemove),
          ...this.arrShort.slice(idRemove + 1),
        ];

        this.arrShort = updShortItems;
      }
    },
    showProgram(id, type) {
      this.modalOpen = true;
      this.statusPopUp = type;
      this.idEdit = id;
      if (type === "highItem") {
        this.popUpInfo = { ...this.arrHigh[id], id: id };
      } else if (type === "mediumItem") {
        this.popUpInfo = { ...this.arrMedium[id], id: id };
      } else {
        this.popUpInfo = { ...this.arrShort[id], id: id };
      }
    },
    showActionSuccess(action: string, type: boolean, callBack?: Function) {
      if (action == "add" || action == "addPro") {
        this.notiMess = this.t("02.profAbilityAction.message.ansSave");
      } else if (action == "delProgram") {
        this.notiMess = this.t("02.profAbilityAction.message.ansDelProg");
      } else if (action == "del") {
        this.notiMess = this.t("02.profAbilityAction.message.ansDel");
      } else if (action == "checkName") {
        this.notiMess = this.t("02.profAbilityAction.message.checkWiseNm");
      } else if (action == "checkHis") {
        this.notiMess = this.t("02.profAbilityAction.message.checkProfUsed");
      } else if (action == "delItem") {
        this.notiMess = this.t("02.profAbilityAction.message.quesDelProg");
      } else if (action == "delAll") {
        this.notiMess = this.t("02.profAbilityAction.message.ansDel");
      } else if (action == "delFalse") {
        this.notiMess = this.t("02.profAbilityAction.message.checkProfUsed");
      } else if (action == "checkNameWisePride") {
        this.notiMess = this.t("02.profAbilityAction.message.checkWiseNm");
      } else if (action == "checkScore") {
        this.notiMess = this.t("02.profAbilityAction.message.checkValNum");
      } else if (action == "checkValiScore") {
        this.notiMess = this.t("02.profAbilityAction.message.checkMinMaxScore");
      } else if (action == "empty") {
        this.notiMess = this.t("02.profAbilityAction.message.checkEmpty");
      } else if (action == "checkScoreMediAndShort") {
        this.notiMess = this.t("02.profAbilityAction.message.checkValHM");
      } else if (action == "checkScoreHighAndMedi") {
        this.notiMess = this.t("02.profAbilityAction.message.checkValMS");
      } else if (action == "checkWiseName") {
        this.notiMess = this.t("02.profAbilityAction.message.valWiseNm");
      } else if (action == "used") {
        this.notiMess = this.t("02.profAbilityAction.message.checkWiseUsed");
      }
      this.$swal({
        text: this.notiMess,
        type: "warning",
        showCancelButton: type,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "확인",
        cancelButtonText: "취소",
      }).then((result) => {
        if (result.isConfirmed && callBack) {
          callBack();
        }
      });
    },
    saveTalent(save, type) {
      this.$swal({
        text: this.t("02.profAbilityAction.message.quesSave"),
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "확인",
        cancelButtonText: "취소",
      })
        .then((result) => {
          if (result.isConfirmed) {
            this.store.setLoading(true);
            if (save == "N") {
              if (this.isCheckValidate) {
                if (
                  this.validateDecimal(this.compe1.standardScoreMin) &&
                  this.validateDecimal(this.compe1.standardScoreMax) &&
                  this.validateDecimal(this.compe2.standardScoreMin) &&
                  this.validateDecimal(this.compe2.standardScoreMax) &&
                  this.validateDecimal(this.compe3.standardScoreMin) &&
                  this.validateDecimal(this.compe3.standardScoreMax)
                ) {
                  if (
                    parseFloat(this.compe3.standardScoreMax) <
                    parseFloat(this.compe2.standardScoreMin)
                  ) {
                    if (
                      parseFloat(this.compe2.standardScoreMax) <
                      parseFloat(this.compe1.standardScoreMin)
                    ) {
                      if (
                        this.checkValues(
                          this.compe1.standardScoreMin,
                          this.compe1.standardScoreMax
                        ) &&
                        this.checkValues(
                          this.compe2.standardScoreMin,
                          this.compe2.standardScoreMax
                        ) &&
                        this.checkValues(
                          this.compe3.standardScoreMin,
                          this.compe3.standardScoreMax
                        )
                      ) {
                        if (type == "save") {
                          this.onSave(save);
                        } else {
                          this.updateProf1(save);
                        }
                      } else {
                        this.showActionSuccess("checkValiScore", false);
                      }
                    } else {
                      this.showActionSuccess("checkScoreHighAndMedi", false);
                    }
                  } else {
                    this.showActionSuccess("checkScoreMediAndShort", false);
                  }
                } else {
                  this.showActionSuccess("checkScore", false);
                }
              } else {
                this.showActionSuccess("empty", false);
              }
            } else {
              if (this.wisePride.wisePrideNm) {
                if (type == "save") {
                  this.onSave(save);
                } else {
                  this.updateProf1(save);
                }
              } else {
                this.showActionSuccess("checkWiseName", false);
              }
            }
          }
        })
        .finally(() => {
          this.store.setLoading(false);
        });
    },
    async onSave(save) {
      const createCompeProgArray = (
        sourceArray: any[],
        level: string,
        standardScoreMin: string,
        standardScoreMax: string
      ): ConstiCompeProgResDTO[] => {
        return sourceArray.map(
          (item) =>
            ({
              lvlCd: level,
              profAbilityRsltCmpnProgSeq: item.profAbilityRsltCmpnProgSeq,
              progNm: item.progNm,
              url: item.url,
            }) as ConstiCompeProgResDTO
        );
      };

      this.compe1.compeProgCreDTOS = createCompeProgArray(
        this.arrHigh,
        LEVEL_HIGH,
        this.standardScoreMin,
        this.standardScoreMax
      );
      this.compe2.compeProgCreDTOS = createCompeProgArray(
        this.arrMedium,
        LEVEL_MID,
        this.standardScoreMin,
        this.standardScoreMax
      );
      this.compe3.compeProgCreDTOS = createCompeProgArray(
        this.arrShort,
        LEVEL_LOW,
        this.standardScoreMin,
        this.standardScoreMax
      );

      let compeLst = [] as ConstiCompeCreDTO;

      this.compe1.lvlCd = LEVEL_HIGH;
      this.compe2.lvlCd = LEVEL_MID;
      this.compe3.lvlCd = LEVEL_LOW;

      compeLst.push(this.compe1);
      compeLst.push(this.compe2);
      compeLst.push(this.compe3);
      let checkNmHigh = false;
      let checkNmMedi = false;
      let checkNmLow = false;
      checkNmHigh = this.hasDuplicateName(this.compe1.compeProgCreDTOS);
      checkNmMedi = this.hasDuplicateName(this.compe2.compeProgCreDTOS);
      checkNmLow = this.hasDuplicateName(this.compe3.compeProgCreDTOS);
      this.wisePride.compeResDTOS = compeLst;
      this.wisePride.useYn = this.useYn;

      if (checkNmHigh && checkNmMedi && checkNmLow) {
        this.wisePride.temporaryYn = save;
        createProf(this.wisePride)
          .then((res) => {
            if (res.data.data != "") {
              this.wisePride.temporaryYn = "Y";
              this.arrProgId = [];
              this.showActionSuccess("add", false, () => this.back());
            } else {
              this.wisePride.temporaryYn = "N";
              this.showActionSuccess("checkNameWisePride", false);
              this.store.setLoading(false);
            }
          })
          .catch((error) => {
            throw new Error(MESSAGE_ERROR_API);
          })
          .finally(() => {
            this.store.setLoading(false);
          });
      } else {
        this.showActionSuccess("checkName", false);
      }
    },
    removeTalent(prog: ConstiCompeProgResDTO, idRemove: number) {
      const action = "delProgram";
      this.$swal({
        text: this.t("02.profAbilityAction.message.quesDelProg"),
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "확인",
        cancelButtonText: "취소",
      }).then((result) => {
        if (result.isConfirmed) {
          if (prog.profAbilityRsltCmpnProgSeq) {
            this.arrProgId.push(prog);
          }

          this.$swal({
            text: this.t("02.profAbilityAction.message.ansDelProg"),
            type: "warning",
            showCancelButton: false,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "확인",
          });
          if (prog.lvlCd == LEVEL_HIGH) {
            this.arrHigh.splice(idRemove, 1)[0];
          }

          if (prog.lvlCd == LEVEL_MID) {
            this.arrMedium.splice(idRemove, 1)[0];
          }

          if (prog.lvlCd == LEVEL_LOW) {
            this.arrShort.splice(idRemove, 1)[0];
          }
        }
      });
    },
    removeProf() {
      const action = "del";
      this.$swal({
        text: this.t("02.profAbilityAction.message.quesDel"),
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "확인",
        cancelButtonText: "취소",
      }).then(async (result) => {
        if (result.isConfirmed) {
          deleteProf(this.wisePrideId.wisePrideSeq)
            .then((res) => {
              if (res.data.data) {
                this.showActionSuccess("delAll", false, () => this.back());
              } else {
                this.showActionSuccess("delFalse", false);
              }
            })
            .catch((error) => {
              throw new Error(MESSAGE_ERROR_API);
            })
            .finally(() => {
              this.store.setLoading(false);
            });
        }
      });
    },
    back() {
      this.$router.push({ path: SCREEN.profAbiList.path });
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
    checkValid() {
      this.isCheckValidate =
        this.wisePride.wisePrideNm &&
        this.wisePride.defn &&
        this.useYn &&
        this.compe1.contDefn &&
        this.compe1.standardScoreMin &&
        this.compe1.standardScoreMax &&
        this.compe2.contDefn &&
        this.compe2.standardScoreMin &&
        this.compe2.standardScoreMax &&
        this.compe3.contDefn &&
        this.compe3.standardScoreMin &&
        this.compe3.standardScoreMax &&
        this.arrHigh.length != 0 &&
        this.arrMedium.length != 0 &&
        this.arrShort.length != 0;
    },
    async updateProf1(save) {
      const createCompeProgArray = (
        sourceArray: any[],
        level: string,
        standardScoreMin: string,
        standardScoreMax: string
      ): ConstiCompeProgResDTO[] => {
        return sourceArray.map(
          (item) =>
            ({
              lvlCd: level,
              profAbilityRsltCmpnProgSeq: item.profAbilityRsltCmpnProgSeq,
              progNm: item.progNm,
              url: item.url,
            }) as ConstiCompeProgResDTO
        );
      };

      this.compe1.compeProgCreDTOS = createCompeProgArray(
        this.arrHigh,
        LEVEL_HIGH,
        this.standardScoreMin,
        this.standardScoreMax
      );
      this.compe2.compeProgCreDTOS = createCompeProgArray(
        this.arrMedium,
        LEVEL_MID,
        this.standardScoreMin,
        this.standardScoreMax
      );
      this.compe3.compeProgCreDTOS = createCompeProgArray(
        this.arrShort,
        LEVEL_LOW,
        this.standardScoreMin,
        this.standardScoreMax
      );

      let compeLst = [] as ConstiCompeCreDTO;

      this.compe1.lvlCd = LEVEL_HIGH;
      this.compe2.lvlCd = LEVEL_MID;
      this.compe3.lvlCd = LEVEL_LOW;

      compeLst.push(this.compe1);
      compeLst.push(this.compe2);
      compeLst.push(this.compe3);
      let checkNmHigh = false;
      let checkNmMedi = false;
      let checkNmLow = false;
      checkNmHigh = this.hasDuplicateName(this.compe1.compeProgCreDTOS);
      checkNmMedi = this.hasDuplicateName(this.compe2.compeProgCreDTOS);
      checkNmLow = this.hasDuplicateName(this.compe3.compeProgCreDTOS);
      this.wisePride.compeResDTOS = [];
      this.wisePride.compeResDTOS = compeLst;

      this.wisePride.useYn = this.useYn;

      if (save == "N") {
        if (this.isCheckValidate) {
          if (checkNmHigh && checkNmMedi && checkNmLow) {
            this.wisePride.temporaryYn = save;
            await updateProf(this.wisePride)
              .then((res) => {
                if (res.data.data == UPDATE_SUCCESS) {
                  this.arrProgId = [];
                  this.showActionSuccess("add", false, () => this.back());
                } else if (res.data.data == CORRECTED) {
                  this.showActionSuccess("checkNameWisePride", false);
                  this.store.setLoading(false);
                } else {
                  this.showActionSuccess("used", false);
                  this.store.setLoading(false);
                }
              })
              .catch((error) => {
                throw new Error(MESSAGE_ERROR_API);
              })
              .finally(() => {
                this.store.setLoading(false);
              });
          } else {
            this.showActionSuccess("checkName", false);
          }
        }
      } else {
        this.wisePride.temporaryYn = save;
        await updateProf(this.wisePride)
          .then((res) => {
            if (res.data.data == UPDATE_SUCCESS) {
              this.arrProgId = [];
              this.showActionSuccess("add", false, () => this.back());
            } else if (res.data.data == CORRECTED) {
              this.showActionSuccess("checkNameWisePride", false);
              this.store.setLoading(false);
            } else {
              this.showActionSuccess("used", false);
              this.store.setLoading(false);
            }
          })
          .catch((error) => {
            throw new Error(MESSAGE_ERROR_API);
          })
          .finally(() => {
            this.store.setLoading(false);
          });
      }
    },
  },
  watch: {
    wisePride: {
      handler: "checkValid",
      deep: true,
    },
    compe1: {
      handler: "checkValid",
      deep: true,
    },
    compe2: {
      handler: "checkValid",
      deep: true,
    },
    compe3: {
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
