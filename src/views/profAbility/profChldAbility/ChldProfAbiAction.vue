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
                  {{ t("02.profAbilityChldAction.wisePrideNm") }}
                </th>
                <td>{{ wisePrideObject.wisePrideNm }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="box dp_block">
        <div class="box_section">
          <h3 class="box_title">
            {{ t("02.profAbilityChldAction.subTitle") }}
          </h3>
          <div class="btn_group btn_end">
            <button
              type="button"
              class="button btn_sm btn_blue mg_b10"
              @click="addItemProf"
            >
              {{ t("02.profAbilityChldAction.btnAddProf") }}
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
                <th scope="col">{{ t("02.profAbilityChldAction.profNm") }}</th>
                <th scope="col">
                  {{ t("02.profAbilityChldAction.profDefn") }}
                </th>
                <th scope="col">{{ t("02.profAbilityChldAction.chldNm") }}</th>
                <th scope="col">
                  {{ t("02.profAbilityChldAction.chldDefn") }}
                </th>
                <th scope="col">{{ t("02.profAbilityChldAction.stsNm") }}</th>
                <th scope="col">
                  {{ t("02.profAbilityChldAction.actionMng") }}
                </th>
              </tr>
            </thead>
            <tbody>
              <template v-for="(item, index) in arrProfObject" :key="index">
                <template
                  v-for="(itemChild, indexChild) in item.chldCreDTOList"
                  :key="indexChild"
                >
                  <tr>
                    <td
                      v-if="!indexChild"
                      :rowspan="item.chldCreDTOList.length"
                    >
                      <InputBase
                        required
                        :id="a + item + indexChild"
                        v-model="item.profAbilityNm"
                      />
                    </td>
                    <td
                      v-if="!indexChild"
                      :rowspan="item.chldCreDTOList.length"
                    >
                      <TextArea
                        required
                        :id="b + item + indexChild"
                        v-model="item.defn"
                      ></TextArea>
                    </td>
                    <td>
                      <InputBase
                        required
                        :id="c + item + indexChild"
                        v-model="itemChild.chldAbilityNm"
                      />
                    </td>
                    <td>
                      <TextArea
                        :id="d + item + indexChild"
                        v-model="itemChild.defn"
                        required
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
                        {{ t("02.profAbilityChldAction.btnAddChld") }}
                      </button>
                      <button
                        v-if="indexChild == 0"
                        type="button"
                        class="button btn_sm btn_gray mg_t5"
                        style="width: 110%"
                        @click="
                          showQue(
                            t('02.profAbilityChldAction.message.quesDelProf'),
                            true,
                            () => delProf(index, item.profAbilitySeq)
                          )
                        "
                      >
                        {{ t("02.profAbilityChldAction.btnDelProf") }}
                      </button>
                      <button
                        v-if="indexChild != 0"
                        type="button"
                        class="button btn_sm btn_gray mg_t5"
                        style="width: 110%"
                        @click="
                          showQue(
                            t('02.profAbilityChldAction.message.quesDelChld'),
                            true,
                            () =>
                              delChld(
                                index,
                                indexChild,
                                itemChild.profAbilityChldAbilitySeq
                              )
                          )
                        "
                      >
                        {{ t("02.profAbilityChldAction.btnDelChld") }}
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
              v-if="modeScreen != 'detail' && temporaryYn != 'N'"
              type="button"
              class="button btn_sm btn_blue btn_responsive"
              @click="saveEmpAbiQues('Y')"
            >
              {{ t("02.profAbilityChldAction.btnSaveOff") }}
            </button>
            <button
              type="button"
              class="button btn_sm btn_blue btn_responsive"
              v-if="modeScreen == 'detail' && temporaryYn != 'N'"
              @click="editEmpQue('Y')"
            >
              {{ t("02.profAbilityChldAction.btnSaveOff") }}
            </button>
            <button
              type="button"
              class="button btn_sm btn_blue btn_responsive"
              v-if="modeScreen == 'detail'"
              @click="editEmpQue('N')"
            >
              {{ t("02.profAbilityChldAction.btnSave") }}
            </button>

            <button
              type="button"
              class="button btn_sm btn_blue btn_responsive"
              v-if="modeScreen == 'create'"
              @click="saveEmpAbiQues('N')"
            >
              {{ t("02.profAbilityChldAction.btnSave") }}
            </button>
            <button
              v-if="modeScreen == 'detail'"
              type="button"
              class="button btn_sm btn_gray btn_responsive"
              @click="queDelAll"
            >
              {{ t("02.profAbilityChldAction.btnDel") }}
            </button>
            <button
              type="button"
              class="button btn_sm btn_white btn_responsive"
              @click="handleCustomClick"
            >
              {{ t("02.profAbilityChldAction.btnBack") }}
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
  WisePrideId,
  WisePrideSubDetailDTO,
  ProfAbilityDetailDTO,
  ProfAbilityChldDetailDTO,
  ProfChldId,
  ProfId,
} from "@/stores/ProfAbility/profAbility.type";
import { STATUS_YES, STATUS_NO } from "@/constants/common.const";
import { FORMAT_YYY_MM_DD } from "@/constants/screen.const";
import {
  detailSubWise,
  checkDelProfChld1,
  checkDelProf,
  checkDelAllProf,
  delAllWisePride,
  createProfChld,
  editSubProf,
} from "@/stores/profAbility/profAbility.service";
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
      pageTitle: this.t("02.profAbilityChldAction.pageTitle"),
      breadcrumbItems: [
        { label: this.t("common.home"), link: "/" },
        {
          label: this.t("02.profAbilityChldAction.pageTitle"),
          link: SCREEN.profChldAbility.path,
        },
      ],
      checkItem: true,
      profObject: {} as ProfAbilityDetailDTO,
      arrProfObject: [] as ProfAbilityDetailDTO[],
      chldObject: {} as ProfAbilityChldDetailDTO,
      arrChldObject: [] as ProfAbilityChldDetailDTO[],
      wiseCreObject: [] as WisePrideSubDetailDTO[],
      wisePrideObject: {} as WisePrideSubDetailDTO,
      wisePriAbility: {} as WisePrideId,
      profId: {} as ProfId,
      profChldId: {} as ProfChldId,

      temporaryYn: "Y",
      modeScreen: MODE_CREATE,
      wisePriSeq: "",
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
    this.wisePriSeq = window.history.state.wisePrideSeq;
    this.wisePriAbility.wisePrideSeq = this.wisePriSeq;
    this.getWisePriDetail();
  },
  computed: {
    allFieldsFilled() {
      return this.arrProfObject.every(
        (item) =>
          item.profAbilityNm &&
          item.defn &&
          item.chldCreDTOList.every(
            (child) => child.chldAbilityNm && child.defn
          )
      );
    },
  },
  methods: {
    async getWisePriDetail() {
      this.store.setLoading(true);
      await detailSubWise(this.wisePriAbility)
        .then((res) => {
          this.wisePrideObject = res.data.data;
          if (this.wisePrideObject.profAbilityDetailDTOS.length == 0) {
            this.modeScreen = MODE_CREATE;
            this.addItemProf();
          } else {
            this.modeScreen = MODE_DETAIL;
          }
          this.wisePrideObject.profAbilityDetailDTOS.forEach((item, index) => {
            this.temporaryYn =
              this.wisePrideObject.profAbilityDetailDTOS[0].temporaryYn;
            if (this.wisePrideObject.profAbilityDetailDTOS != null) {
              this.arrProfObject.push(
                this.wisePrideObject.profAbilityDetailDTOS[index]
              );
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
      this.delChldAction(index, indexChild, chldSeq);
    },
    async delChldAction(index, indexChild, chldSeq) {
      this.profChldId.profAbilityChldSeq = chldSeq;
      await checkDelProfChld1(this.profChldId)
        .then((res) => {
          if (res.data.data) {
            this.arrProfObject[index].chldCreDTOList.splice(indexChild, 1);
          } else {
            this.showMess(
              this.t("02.profAbilityChldAction.message.checkProfUsed"),
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
    addItemProf() {
      this.checkItem = true;
      this.arrProfObject.unshift({
        profAbilitySeq: "",
        profAbilityNm: "",
        defn: "",
        delYn: "",
        temporaryYn: "",
        chldCreDTOList: [
          {
            profAbilityChldAbilitySeq: "",
            profAbilitySeq: "",
            chldAbilityNm: "",
            defn: "",
            useYn: STATUS_YES,
            delYn: "",
          },
        ],
      });
    },
    async saveEmpAbiQues(temporaryYn) {
      if (temporaryYn == "N") {
        if (this.allFieldsFilled) {
          this.saveEmpAbi(temporaryYn);
        } else {
          this.showMess(
            this.t("02.profAbilityChldAction.message.checkEmpty"),
            false
          );
        }
      } else {
        this.saveEmpAbi(temporaryYn);
      }
    },
    async saveEmpAbi(temporaryYn) {
      this.store.setLoading(true);
      this.wisePrideObject.profAbilityDetailDTOS = [];
      this.wisePrideObject.profAbilityDetailDTOS = this.arrProfObject;
      let result = false;
      for (
        let index = 0;
        index < this.wisePrideObject.profAbilityDetailDTOS.length;
        index++
      ) {
        let item = this.wisePrideObject.profAbilityDetailDTOS[index];
        result = this.hasDuplicateNameChld(item.chldCreDTOList);
        if (!result) {
          break;
        }
      }
      const resultemp = this.hasDuplicateName(
        this.wisePrideObject.profAbilityDetailDTOS
      );

      if (result && resultemp) {
        this.wisePrideObject.profAbilityDetailDTOS.forEach((item, index) => {
          item.temporaryYn = temporaryYn;
        });
        await createProfChld(this.wisePrideObject)
          .then((res) => {
            if (res.data.data == true) {
              this.showMess(
                this.t("02.profAbilityChldAction.message.ansDel"),
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
          this.t("02.profAbilityChldAction.message.checkProfNm"),
          false
        );
        this.store.setLoading(false);
      }
    },
    handleCustomClick(data: any) {
      this.$router.push({
        path: SCREEN.profChldList.path,
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
      this.arrProfObject[index].chldCreDTOList.push({
        profAbilityChldAbilitySeq: "",
        profAbilitySeq: "",
        chldAbilityNm: "",
        defn: "",
        useYn: STATUS_YES,
        delYn: "",
      });
    },
    async delProf(index, abiEmpSeq) {
      this.profId.profAbilitySeq = abiEmpSeq;
      await checkDelProf(this.profId)
        .then((res) => {
          if (res.data.data == true) {
            this.arrProfObject.splice(index, 1);
          } else {
            this.showMess(
              this.t("02.profAbilityChldAction.message.checkProfUsed"),
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
    queDelAll() {
      this.showMess(
        this.t("02.profAbilityChldAction.message.quesDel"),
        true,
        () => this.delAllEmp()
      );
    },
    delAllEmp() {
      checkDelAllProf(this.wisePriAbility)
        .then((res) => {
          if (res.data.data == true) {
            delAllWisePride(this.wisePriAbility)
              .then((res) => {
                if (res.data.data == true) {
                  this.showMess(
                    this.t("02.profAbilityChldAction.message.ansDel"),
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
              this.t("02.profAbilityChldAction.message.checkProfUsed"),
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
        confirmButtonText: this.t("common.confirm"),
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
    async editEmpQue(temporaryYn) {
      this.store.setLoading(true);
      this.wisePrideObject.profAbilityDetailDTOS = [];
      this.wisePrideObject.profAbilityDetailDTOS = this.arrProfObject;
      let result = false;
      for (
        let index = 0;
        index < this.wisePrideObject.profAbilityDetailDTOS.length;
        index++
      ) {
        let item = this.wisePrideObject.profAbilityDetailDTOS[index];
        result = this.hasDuplicateNameChld(item.chldCreDTOList);
        if (!result) {
          break;
        }
      }
      const resultemp = this.hasDuplicateName(
        this.wisePrideObject.profAbilityDetailDTOS
      );
      if (result && resultemp) {
        this.wisePrideObject.profAbilityDetailDTOS.forEach((item, index) => {
          item.temporaryYn = temporaryYn;
        });
        await editSubProf(this.wisePrideObject)
          .then((res) => {
            if (res.data.data) {
              this.showMess(
                this.t("02.profAbilityChldAction.message.ansDel"),
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
          this.t("02.profAbilityChldAction.message.checkProfNm"),
          false
        );
        this.store.setLoading(false);
      }
    },
    hasDuplicateName(array) {
      const nameCount = {};
      for (const item of array) {
        if (nameCount[item.profAbilityNm]) {
          return false;
        }
        nameCount[item.profAbilityNm] = 1;
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
