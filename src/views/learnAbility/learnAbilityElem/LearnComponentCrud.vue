<template>

  <div class="page_wrapper">
    <section id="content" class="content_wrapper grid_content" tabindex="0">
      <Breadcrumb
        :pageTitle="pageTitle"
        :breadcrumbItems="breadcrumbItems"
      ></Breadcrumb>

      <div class="box dp_block">
        <div class="box_section">
          <p class="box_title_sm">
            {{ t("02.generalFactorLearn.titleAbility") }}
          </p>
          <table class="tbl_row">
            <caption>
              {{
                t("02.generalFactorLearn.titleAbility")
              }}
            </caption>
            <colgroup>
              <col style="width: 18%" />
              <col style="width: auto" />
            </colgroup>
            <tbody>
              <tr>
                <th scope="row">{{ t("02.learnAbility.core") }}</th>
                <td class="td_input">
                  {{ coreChild.learnAbilityNm }}
                </td>
              </tr>
              <tr>
                <th scope="row">{{ t("02.learnAbility.child") }}</th>
                <td>
                  {{ coreChild.chldAbilityNm }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="box dp_block">
        <div class="box_section">
          <div class="flex justify-between items-center mb-[24px]">
            <p class="box_title_sm">
              {{ t("02.generalFactorLearn.button.addChild") }}
            </p>
            <div class="btn_group btn_end">
              <button
                type="button"
                @click="addJob()"
                class="button btn_xs btn_blue ml-8 w-[100px] mb-5"
              >
                {{ t("common.add") }}
              </button>
            </div>
          </div>
          <div
            class="flex mb-10 table1"
            v-for="(item, index) in dataForm.listJob"
            :key="index"
          >
            <table class="tbl_row">
              <caption></caption>
              <colgroup>
                <col style="width: 18%" />
                <col style="width: auto" />
              </colgroup>
              <tbody>
                <tr>
                  <th scope="row">
                    {{ t("02.generalFactorLearn.cmpnElem") }} {{ index + 1 }}
                  </th>
                  <td class="td_input">
                    <InputBase
                      :id="`name_${index}`"
                      v-model="item.learnComponentNm"
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <th scope="row">{{ t("02.generalFactorLearn.useYn") }}</th>
                  <td>
                    <RadiobuttonBase
                      v-for="itemRadio in codeRadio"
                      :mode="'show'"
                      :value="itemRadio.cdId"
                      v-model="item.useYn"
                      :id="itemRadio.cdId + index"
                      :name="itemRadio.cdId + index"
                      :key="itemRadio.cdId + index"
                      :checked="itemRadio.cdId == item.useYn"
                      :label="itemRadio.cdNm"
                      required
                    >
                    </RadiobuttonBase>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="flex items-center button-table1">
              <button
                type="button"
                @click="showAlertDel(index)"
                class="button btn_xs btn_gray ml-8 w-[100px]"
              >
                {{ t("common.delete") }}
              </button>
            </div>
          </div>

          <div class="box_section">
            <div class="btn_group btn_center">
              <button
                type="button"
                class="button btn_xs btn_blue"
                @click="showAlertSave()"
              >
                {{ t("common.save") }}
              </button>
              <button
                type="button"
                class="button btn_xs btn_white"
                @click="back()"
              >
                {{ t("common.list") }}
              </button>
            </div>
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
import LoaddingComponent from "@/components/common/loading/LoaddingComponent.vue";
import {
  PAGINATION_PAGE_SIZE_SELECTOR,
  PAGINATION_PAGE_SIZE,
} from "@/constants/screen.const";
import { SCREEN } from "@/router/screen";
import InputBase from "@/components/common/input/InputBase.vue";
import { codeMngStore } from "@/stores/common/codeMng";
import { SUCCSESS_STATUS } from "@/constants/screen.const";
import Swal from "sweetalert2";
import { CREATED_STATUS } from "@/constants/screen.const";
import { STATUS_NO, STATUS_YES } from "@/constants/common.const";
import { learnComStore } from "@/stores/learnAbilityElem";
import {
  LearnComponent,
  LearnComponentRes,
  LearnComponentSeq,
} from "@/stores/learnAbilityElem/learnCom.type";
import {
  createLearnComponent,
  delCom,
} from "@/stores/learnAbilityElem/learnCom.service";
import { STATUS_ADD } from "@/constants/common.const";

export default {
  components: {
    TFooter,
    THeader,
    Breadcrumb,
    LoaddingComponent,
    InputBase,
  },
  data() {
    return {
      pageTitle: this.t("02.generalFactorLearn.pageTitle"),
      breadcrumbItems: [
        { label: this.t("common.home"), link: "/" },
        { label: this.t("02.learnAbility.menu"), link: "#" },
        {
          label: this.t("02.generalFactorLearn.pageTitle"),
          link: SCREEN.learnComponent.path,
        },
      ],
      modeScreen: "" as any,
      isOpen: false,
      isLoad: false,
      paginationPageSize: PAGINATION_PAGE_SIZE,
      paginationPageSizeSelector: PAGINATION_PAGE_SIZE_SELECTOR,

      codeRadio: [
        { cdId: STATUS_YES, cdNm: this.t("common.use") },
        { cdId: STATUS_NO, cdNm: this.t("common.noUse") },
      ],
      dataForm: {
        listJob: [],
      },
      coreAndChildDTO: {} as LearnComponentRes,
      listDel: [],
      chldSeq: "",
      delAbilityCmpn: [] as Array<LearnComponent>,
      checkRequired: true,
      coreChild: {},
    };
  },
  setup() {
    const store = commonStore();
    const cmpnStore = learnComStore();
    const codeStore = codeMngStore();
    const { t } = useI18n();
    return {
      store,
      cmpnStore,
      codeStore,
      t,
    };
  },
  beforeMount() {
    this.chldSeq = window.history.state.chldSeq;
    this.getDetail();
  },
  methods: {
    async getDetail() {
      this.store.setLoading(true);

      this.coreAndChildDTO = {
        chldSeq: this.chldSeq,
      } as LearnComponentSeq;

      await this.cmpnStore.fetchDetail(this.coreAndChildDTO);

      if (this.cmpnStore.status) {
        this.dataForm.listJob = this.cmpnStore.cmpnList;

        if (this.cmpnStore.cmpnList.length > 0) {
          this.coreChild = this.cmpnStore.cmpnList[0];

          if (
            this.cmpnStore.cmpnList.length == 1 &&
            this.cmpnStore.cmpnList[0].useYn == null
          ) {
            this.cmpnStore.cmpnList[0].useYn = STATUS_YES;
          }
        }
      }

      this.store.setLoading(false);
    },
    back() {
      this.$router.push({ path: SCREEN.learnComponent.path });
    },
    addJob() {
      this.dataForm.listJob.push({
        learnComponentSeq: "",
        learnComponentNm: "",
        useYn: STATUS_YES,
        learnAbilityChldAbilitySeq: this.chldSeq,
        status: STATUS_ADD,
      });
    },
    async save() {
      let listDTO = {
        listLearnCreate: [] as LearnComponent[],
        delLearnDTO: [],
      };
      let listCmpn = this.dataForm.listJob;

      if (this.dataForm.listJob.length > 0) {
        listCmpn.forEach((item) => {
          let cmpn = {} as LearnComponent;
          cmpn.learnComponentSeq = item.learnComponentSeq;
          cmpn.learnComponentNm = item.learnComponentNm;
          cmpn.learnAbilityChldAbilitySeq = this.chldSeq;
          cmpn.useYn = item.useYn;
          cmpn.delYn = item.delYn;
          if (item.learnComponentSeq == null) {
            cmpn.status = STATUS_ADD;
          } else {
            cmpn.status = item.status;
          }

          listDTO.listLearnCreate.push(cmpn);
        });
      }
      listDTO.delLearnDTO = this.delAbilityCmpn;

      await this.cmpnStore.checkDuplicate(listDTO.listLearnCreate);

      if (this.cmpnStore.status && this.cmpnStore.status == SUCCSESS_STATUS) {
        createLearnComponent(listDTO).then((res) => {
          if (res.status && res.status == CREATED_STATUS) {
            Swal.fire({
              text: this.t("02.generalFactorLearn.alert.saveSuccess"),
              type: "warning",
              showCancelButton: false,
              confirmButtonText: this.t("common.confirm"),
            }).then((result) => {
              if (result.isConfirmed) {
                this.delAbilityCmpn = [];
                this.back();
              }
            });
          }
        });
      } else {
        this.showAlert(this.t("02.generalFactorLearn.alert.checkDuplicate"));
      }
    },
    showAlertSave() {
      if (!this.store.check) {
        Swal.fire({
          text: this.t("02.generalFactorLearn.alert.save"),
          type: "warning",
          showCancelButton: true,
          confirmButtonText: this.t("common.save"),
          cancelButtonText: this.t("common.cancel"),
        }).then((result) => {
          if (result.isConfirmed) {
            this.save();
          }
        });
      } else {
        this.showAlert(this.t("common.messageValidateRequired"));
      }
    },
    showAlertDel(index) {
      Swal.fire({
        text: this.t("02.generalFactorLearn.alert.del"),
        type: "warning",
        showCancelButton: true,
        confirmButtonText: this.t("common.delete"),
        cancelButtonText: this.t("common.cancel"),
      }).then(async (result) => {
        if (result.isConfirmed) {
          let dataDel = {} as LearnComponent;
          dataDel = this.dataForm.listJob[index];

          if (dataDel.learnComponentSeq) {
            this.store.setLoading(true);
            await this.cmpnStore.checkDel(dataDel);
            if (
              this.cmpnStore.status &&
              this.cmpnStore.status == SUCCSESS_STATUS
            ) {
              this.delAbilityCmpn.push(dataDel);
              this.dataForm.listJob.splice(index, 1)[0];
              this.showAlert(this.t("02.generalFactorLearn.alert.delSuccess"));
            } else {
              this.showAlert(this.t("02.generalFactorLearn.alert.delCancle"));
            }
            this.store.setLoading(false);
          } else {
            this.dataForm.listJob.splice(index, 1)[0];
          }
        }
      });
    },
    showAlert(message: string) {
      Swal.fire({
        text: message,
        type: "warning",
        showCancelButton: false,
        confirmButtonText: this.t("common.confirm"),
      });
    },
  },
};
</script>

<style scoped lang="scss">
.table1 {
  display: flex;
}

.button-table1 {
  margin-top: 10px;
  width: 6.7%;
}
</style>
