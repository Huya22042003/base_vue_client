<template>
  <THeader />
  <div class="page_wrapper">
    <section id="content" class="content_wrapper grid_content" tabindex="0">
      <Breadcrumb
        :pageTitle="pageTitle"
        :breadcrumbItems="breadcrumbItems"
      ></Breadcrumb>

      <div class="box dp_block">
        <div class="box_section">
          <table class="tbl_row">
            <colgroup>
              <col style="width: 20%" />
              <col style="width: auto" />
            </colgroup>
            <tbody>
              <tr>
                <th scope="row">
                  {{ t("02.subEmpAbility.create.abilityName") }}
                </th>
                <td>{{ levelCreObject.ability1levelNm }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="box dp_block">
        <div class="box_section">
          <h3 class="box_title">
            {{ t("02.subEmpAbility.create.pageTitle") }}
          </h3>
          <div class="btn_group btn_end">
            <button
              type="button"
              class="button btn_sm btn_blue mg_b10"
              @click="addItemElem"
            >
              {{ t("02.subEmpAbility.create.btnAddEmp") }}
            </button>
          </div>
          <table class="tbl_col">
            <caption>
              table col
            </caption>
            <colgroup>
              <col style="width: 12%" />
              <col style="width: 26%" />
              <col style="width: 12%" />
              <col style="width: 26%" />
              <col style="width: 13%" />
              <col style="width: 13%" />
            </colgroup>
            <thead>
              <tr>
                <th scope="col">{{ t("02.subEmpAbility.create.empAbiNm") }}</th>
                <th scope="col">{{ t("02.subEmpAbility.create.defnAbi") }}</th>
                <th scope="col">{{ t("02.subEmpAbility.create.chldNm") }}</th>
                <th scope="col">{{ t("02.subEmpAbility.create.defnChld") }}</th>
                <th scope="col">{{ t("02.subEmpAbility.create.useYn") }}</th>
                <th scope="col">{{ t("02.subEmpAbility.create.subMng") }}</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="(item, index) in arrEmpObject" :key="index">
                <template
                  v-for="(itemChild, indexChild) in item.abilityChldCreDTOS"
                  :key="indexChild"
                >
                  <tr>
                    <td
                      v-if="!indexChild"
                      :rowspan="item.abilityChldCreDTOS.length"
                    >
                      <InputBase
                        :id="a + item + indexChild"
                        v-model="item.empAbilityNm"
                      />
                    </td>
                    <td
                      v-if="!indexChild"
                      :rowspan="item.abilityChldCreDTOS.length"
                    >
                      <TextArea
                        :id="b + item + indexChild"
                        v-model="item.defn"
                      ></TextArea>
                    </td>
                    <td>
                      <InputBase
                        :id="c + item + indexChild"
                        v-model="itemChild.chldAbilityNm"
                      />
                    </td>
                    <td>
                      <TextArea
                        :id="d + item + indexChild"
                        v-model="itemChild.defn"
                      ></TextArea>
                    </td>
                    <td>
                      <RadiobuttonBase
                        v-for="(subItem, subIndex) in listRadio11"
                        :mode="'show'"
                        :id="subItem.id + index + indexChild"
                        :value="subItem.id"
                        :name="index_indexChild"
                        :key="subItem.id"
                        :checked="subItem.id == itemChild.useYn"
                        :label="subItem.name"
                        v-model="itemChild.useYn"
                      ></RadiobuttonBase>
                    </td>
                    <td>
                      <button
                        v-if="indexChild == 0"
                        type="button"
                        class="button btn_sm btn_blue mg_t5"
                        style="width: 110%"
                        @click="addChld(index)"
                      >
                        {{ t("02.subEmpAbility.create.btnAddChld") }}
                      </button>
                      <button
                        v-if="indexChild == 0"
                        type="button"
                        class="button btn_sm btn_gray mg_t5"
                        style="width: 110%"
                        @click="
                          showQue(
                            t('02.subEmpAbility.message.quesDelEmp'),
                            true,
                            () => delEmp(index, item.empAbilitySeq)
                          )
                        "
                      >
                        {{ t("02.subEmpAbility.create.btnDelEmp") }}
                      </button>
                      <button
                        v-if="indexChild != 0"
                        type="button"
                        class="button btn_sm btn_gray mg_t5"
                        style="width: 110%"
                        @click="
                          showQue(
                            t('02.subEmpAbility.message.quesDelChld'),
                            true,
                            () =>
                              delChld(
                                index,
                                indexChild,
                                itemChild.empAbilityChldAbilitySeq
                              )
                          )
                        "
                      >
                        {{ t("02.subEmpAbility.create.btnDelChld") }}
                      </button>
                    </td>
                  </tr>
                </template>
              </template>
            </tbody>
          </table>
        </div>
        <div class="box_section mg-t20">
          <div class="btn_group btn_end">
            <button
              v-if="temporaryYn != 'N' && modeScreen != 'detail'"
              type="button"
              class="button btn_sm btn_blue btn_responsive"
              @click="saveEmpAbiQues('Y')"
            >
              {{ t("02.empAbility.create.saveOff") }}
            </button>
            <button
              type="button"
              class="button btn_sm btn_blue btn_responsive"
              v-if="modeScreen == 'detail' && temporaryYn != 'N'"
              @click="editEmpAbiQues('Y')"
            >
              {{ t("02.empAbility.create.saveOff") }}
            </button>
            <button
              type="button"
              class="button btn_sm btn_blue btn_responsive"
              v-if="modeScreen == 'detail'"
              @click="editEmpAbiQues('N')"
            >
              {{ t("02.empAbility.create.btnSave") }}
            </button>
            <button
              type="button"
              class="button btn_sm btn_blue btn_responsive"
              v-if="modeScreen == 'create'"
              @click="saveEmpAbiQues('N')"
            >
              {{ t("02.empAbility.create.btnSave") }}
            </button>
            <button
              v-if="modeScreen == 'detail'"
              type="button"
              class="button btn_sm btn_gray btn_responsive"
              @click="
                showQue(t('02.subEmpAbility.message.quesDel'), true, delAllEmp)
              "
            >
              {{ t("02.empAbility.create.btnDel") }}
            </button>
            <button
              type="button"
              class="button btn_sm btn_white btn_responsive"
              @click="handleCustomClick"
            >
              {{ t("02.empAbility.create.btnBack") }}
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script lang="ts">
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import THeader from "@/layouts/components/THeader.vue";
import TFooter from "@/layouts/components/TFooter.vue";
import { commonStore } from "@/stores/common";
import { ref } from "vue";
import LoaddingComponent from "@/components/common/loading/LoaddingComponent.vue";
import {
  PAGINATION_PAGE_SIZE_SELECTOR,
  PAGINATION_PAGE_SIZE,
} from "@/constants/screen.const";
import GridComponentV2 from "@/components/common/grid/GridComponentV2.vue";
import { SUCCSESS_STATUS } from "@/constants/screen.const";
import { format } from "date-fns";
import { codeMngStore } from "@/stores/common/codeMng";
import { SCREEN } from "@/router/screen";
import type { CodeMngRes } from "@/stores/common/codeMng/codeMng.type";

import {
  ChldIdDTO,
  ElemDetailDTO,
  ElemIdDTO,
  ElemDetailObDTO,
  EmpAbilityCre,
  EmpAbilityChld,
  EmpAbilitySubLevelCre,
  EmpAbilitySubLevel,
  EmpId,
} from "@/stores/empAbility/empAbility.type";
import { STATUS_YES, STATUS_NO } from "@/constants/common.const";
import { FORMAT_YYY_MM_DD } from "@/constants/screen.const";
import {
  getDetailSub,
  checkDelChld,
  checkDelEmp,
  checkDelAllEmp,
  delAllLevel,
  saveSubEmp,
  editSubReg,
} from "@/stores/empAbility/empAbility.service";
import { getCodeMngByUpCdId } from "@/stores/common/codeMng/codeMng.service";
import { MESSAGE_ERROR_API } from "@/constants/common.const";
import Swal from "sweetalert2";
import { MODE_CREATE, MODE_DETAIL } from "@/constants/screen.const";
export default defineComponent({
  components: {
    TFooter,
    THeader,
    Breadcrumb,
    LoaddingComponent,
    GridComponentV2,
  },
  data() {
    return {
      pageTitle: this.t("02.subEmpAbility.create.pageTitleMain"),
      breadcrumbItems: [
        { label: this.t("common.home"), link: "/" },
        {
          label: this.t("02.subEmpAbility.create.pageTitleMain"),
          link: SCREEN.subEmpAbility.path,
        },
      ],
      checkItem: true,
      empObject: {} as EmpAbilityCre,
      arrEmpObject: [] as EmpAbilityCre[],
      chldObject: {} as EmpAbilityChld,
      arrChldObject: [] as EmpAbilityChld[],
      levelCreObject: [] as EmpAbilitySubLevelCre[],
      levelDetailObject: {} as EmpAbilitySubLevel,
      chldAbility: {} as ChldIdDTO,
      empId: {} as EmpId,
      temporaryYn: "Y",
      modeScreen: MODE_CREATE,

      //=====
      elemDetailObDTO: {} as ElemDetailDTO,
      arrElemDetail: [] as ElemDetailObDTO[],
      newArrElemDetail: [] as ElemDetailDTO[],
      elemSeq: {} as ElemIdDTO,
      chldSeq: "",
      upCdId: {} as CodeMngRes,
      radiovalue11: ref(STATUS_YES),
      listRadio11: [
        { id: STATUS_YES, name: this.t("common.use") },
        { id: STATUS_NO, name: this.t("common.noUse") },
      ],
      checkConfirm: true,
      messNoti: "",
      items: [],
    };
  },
  setup() {
    const store = commonStore();
    const codeStore = codeMngStore();
    const { t } = useI18n();
    return {
      store,
      codeStore,
      t,
    };
  },
  beforeMount() {
    this.chldSeq = window.history.state.ability1levelSeq;
    this.levelDetailObject.ability1levelSeq = this.chldSeq;
    this.getSubEmpDetail();
  },
  computed: {
    allFieldsFilled() {
      return this.arrEmpObject.every(
        (item) =>
          item.empAbilityNm &&
          item.defn &&
          item.abilityChldCreDTOS.every(
            (child) => child.chldAbilityNm && child.defn
          )
      );
    },
  },
  methods: {
    async getSubEmpDetail() {
      this.store.setLoading(true);
      await getDetailSub(this.levelDetailObject)
        .then((res) => {
          this.levelCreObject = res.data.data;
          if (this.levelCreObject.subCreDTOS.length == 0) {
            this.modeScreen = MODE_CREATE;
            this.addItemElem();
          } else {
            this.modeScreen = MODE_DETAIL;
          }
          this.levelCreObject.subCreDTOS.forEach((item, index) => {
            this.temporaryYn = this.levelCreObject.subCreDTOS[0].temporaryYn;
            if (this.levelCreObject.subCreDTOS != null) {
              this.arrEmpObject.push(this.levelCreObject.subCreDTOS[index]);
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
    delChld(index, indexChild, chldSeq) {
      this.delElemAction(index, indexChild, chldSeq);
    },
    async delElemAction(index, indexChild, chldSeq) {
      this.chldAbility.empAbilityChldAbilitySeq = chldSeq;
      await checkDelChld(this.chldAbility)
        .then((res) => {
          if (res.data.data) {
            this.arrEmpObject[index].abilityChldCreDTOS.splice(indexChild, 1);
          } else {
            this.showMess(
              this.t("02.subEmpAbility.message.checkEmpUsed"),
              false
            );
          }
        })
        .catch((error) => {
          throw new Error(MESSAGE_ERROR_API);
        })
        .finally(() => {
          this.store.setLoading(false);
        });
    },
    addItemElem() {
      this.checkItem = true;
      this.arrEmpObject.unshift({
        empAbilitySeq: "",
        empAbilityNm: "",
        defn: "",
        temporaryYn: "",
        abilityChldCreDTOS: [
          {
            empAbilityChldAbilitySeq: "",
            empAbilitySeq: "",
            chldAbilityNm: "",
            defn: "",
            useYn: STATUS_YES,
          },
        ],
      });
    },
    async saveEmpAbiQues(temporaryYn) {
      this.showMess(this.t("02.subEmpAbility.message.quesSave"), true, () =>
        this.saveEmpAbi(temporaryYn)
      );
    },
    async saveEmpAbi(temporaryYn) {
      this.store.setLoading(true);
      this.levelCreObject.subCreDTOS = [];
      this.levelCreObject.subCreDTOS = this.arrEmpObject;
      let result = false;

      for (let i = 0; i < this.levelCreObject.subCreDTOS.length; i++) {
        result = this.hasDuplicateNameChld(
          this.levelCreObject.subCreDTOS[i].abilityChldCreDTOS
        );
        if (!result) {
          break;
        }
      }
      const resultemp = this.hasDuplicateName(this.levelCreObject.subCreDTOS);
      if (temporaryYn == "N") {
        if (this.allFieldsFilled) {
          if (result && resultemp) {
            this.levelCreObject.subCreDTOS.forEach((item, index) => {
              item.temporaryYn = temporaryYn;
            });
            await saveSubEmp(this.levelCreObject)
              .then((res) => {
                if (res.data.data == true) {
                  this.showMess(
                    this.t("02.subEmpAbility.message.ansSave"),
                    false,
                    () => this.handleCustomClick()
                  );
                }
              })
              .catch((error) => {
                throw new Error(MESSAGE_ERROR_API);
              })
              .finally(() => {
                this.store.setLoading(false);
              });
          } else {
            this.showMess(this.t("02.subEmpAbility.message.checkEmpNm"), false);
            this.store.setLoading(false);
          }
        } else {
          this.showMess(this.t("02.subEmpAbility.message.checkEmpty"), false);
          this.store.setLoading(false);
        }
      } else {
        await saveSubEmp(this.levelCreObject)
          .then((res) => {
            if (res.data.data == true) {
              this.showMess(
                this.t("02.subEmpAbility.message.ansSave"),
                false,
                () => this.handleCustomClick()
              );
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
    handleCustomClick(data: any) {
      this.$router.push({
        path: SCREEN.subEmpAbList.path,
      });
    },
    addItemChld() {
      this.checkItem = false;
      this.newArrElemDetail.push({
        cmpnElemSeq: "",
        elemNm: "",
        useYn: STATUS_YES,
      });
    },
    addChld(index) {
      this.arrEmpObject[index].abilityChldCreDTOS.push({
        empAbilityChldAbilitySeq: "",
        empAbilitySeq: "",
        chldAbilityNm: "",
        defn: "",
        useYn: STATUS_YES,
      });
    },
    async delEmp(index, abiEmpSeq) {
      this.empId.empAbilitySeq = abiEmpSeq;
      await checkDelEmp(this.empId)
        .then((res) => {
          if (res.data.data == true) {
            this.arrEmpObject.splice(index, 1);
          } else {
            this.showMess(
              this.t("02.subEmpAbility.message.checkEmpUsed"),
              false
            );
          }
        })
        .catch((error) => {
          throw new Error(MESSAGE_ERROR_API);
        })
        .finally(() => {
          this.store.setLoading(false);
        });
    },
    delAllEmp() {
      checkDelAllEmp(this.levelDetailObject)
        .then((res) => {
          if (res.data.data == true) {
            delAllLevel(this.levelDetailObject)
              .then((res) => {
                if (res.data.data == true) {
                  this.showMess(
                    this.t("02.subEmpAbility.message.ansDel"),
                    false,
                    () => this.handleCustomClick()
                  );
                }
              })
              .catch((error) => {
                throw new Error(MESSAGE_ERROR_API);
              })
              .finally(() => {
                this.store.setLoading(false);
              });
          } else {
            this.showMess(
              this.t("02.subEmpAbility.message.checkEmpUsed"),
              false
            );
          }
        })
        .catch((error) => {
          throw new Error(MESSAGE_ERROR_API);
        })
        .finally(() => {
          this.store.setLoading(false);
        });
    },
    async showMess(title: string, typebtn: boolean, callBack?: Function) {
      await Swal.fire({
        text: title,
        type: "warning",
        showCancelButton: typebtn,
        cancelButtonText: this.t("common.cancel"),
        confirmButtonText: this.t("common.save"),
      }).then((result) => {
        if (result.isConfirmed && callBack) {
          callBack();
        }
      });
    },
    async showQue(title: string, typebtn: boolean, callBack?: Function) {
      await Swal.fire({
        text: title,
        type: "warning",
        showCancelButton: typebtn,
        cancelButtonText: this.t("common.cancel"),
        confirmButtonText: this.t("common.confirm"),
      }).then((result) => {
        if (result.isConfirmed && callBack) {
          callBack();
        }
      });
    },
    async editEmpAbiQues(temporaryYn) {
      if (this.allFieldsFilled || temporaryYn == "N") {
        this.showMess(this.t("02.subEmpAbility.message.quesSave"), true, () =>
          this.editEmpQue(temporaryYn)
        );
      } else {
        this.showMess(this.t("02.subEmpAbility.message.checkEmpty"), false);
      }
    },
    async editEmpQue(temporaryYn) {
      this.store.setLoading(true);
      this.levelCreObject.subCreDTOS = [];
      let resultChld = false;
      this.levelCreObject.subCreDTOS = this.arrEmpObject;
      const result = this.hasDuplicateName(this.levelCreObject.subCreDTOS);

      for (
        let index = 0;
        index < this.levelCreObject.subCreDTOS.length;
        index++
      ) {
        let item = this.levelCreObject.subCreDTOS[index];
        resultChld = this.hasDuplicateNameChld(item.abilityChldCreDTOS);
        if (resultChld == false) {
          break;
        }
      }

      if (temporaryYn == "N") {
        if (this.allFieldsFilled) {
          if (result && resultChld) {
            this.levelCreObject.subCreDTOS.forEach((item, index) => {
              item.temporaryYn = temporaryYn;
            });
            await editSubReg(this.levelCreObject)
              .then((res) => {
                if (res.data.data) {
                  this.showMess(
                    this.t("02.subEmpAbility.message.ansSave"),
                    false,
                    () => this.handleCustomClick()
                  );
                }
              })
              .catch((error) => {
                throw new Error(MESSAGE_ERROR_API);
              })
              .finally(() => {
                this.store.setLoading(false);
              });
          } else {
            this.showMess(this.t("02.subEmpAbility.message.checkEmpNm"), false);
            this.store.setLoading(false);
          }
        } else {
          this.showMess(this.t("02.subEmpAbility.message.checkEmpty"), false);
          this.store.setLoading(false);
        }
      } else {
        this.levelCreObject.subCreDTOS.forEach((item, index) => {
          item.temporaryYn = temporaryYn;
        });
        await editSubReg(this.levelCreObject)
          .then((res) => {
            if (res.data.data) {
              this.showMess(
                this.t("02.subEmpAbility.message.ansSave"),
                false,
                () => this.handleCustomClick()
              );
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
    hasDuplicateName(array) {
      const nameCount = {};
      for (const item of array) {
        if (nameCount[item.empAbilityNm]) {
          return false;
        }
        nameCount[item.empAbilityNm] = 1;
      }
      return true;
    },
    hasDuplicateNameChld(array) {
      const nameCount = {};
      for (const item of array) {
        if (nameCount[item.chldAbilityNm]) {
          return false;
        }
        nameCount[item.chldAbilityNm] = 1;
      }
      return true;
    },
  },
});
</script>

<style>
.mg-t20 {
  margin-top: 20px;
}
</style>
