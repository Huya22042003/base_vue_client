<template>

  <div class="page_wrapper">
    <section id="content" class="content_wrapper grid_content" tabindex="0">
      <Breadcrumb
        :pageTitle="pageTitle"
        :breadcrumbItems="breadcrumbItems"
      ></Breadcrumb>

      <div class="box dp_block">
        <div class="box_section">
          <p class="box_title_sm">{{ t("02.generalFactor.titleAbility") }}</p>
          <table class="tbl_row">
            <caption>
              {{
                t("02.generalFactor.titleAbility")
              }}
            </caption>
            <colgroup>
              <col style="width: 18%" />
              <col style="width: auto" />
            </colgroup>
            <tbody>
              <tr>
                <th scope="row">{{ t("02.coreChildAbility.core") }}</th>
                <td class="td_input">
                  {{ coreChild.coreAbilityNm }}
                </td>
              </tr>
              <tr>
                <th scope="row">{{ t("02.coreChildAbility.child") }}</th>
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
              {{ t("02.generalFactor.button.addChild") }}
            </p>
            <div class="btn_group btn_end mb-3">
              <button
                type="button"
                @click="addJob()"
                class="button btn_xs btn_blue ml-8 w-[100px]"
              >
                {{ t("common.add") }}
              </button>
            </div>
          </div>
          <div
            class="flex mb-10 data-form"
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
                    {{ t("02.generalFactor.cmpnElem") }} {{ index + 1 }}
                  </th>
                  <td class="td_input">
                    <InputBase
                      :id="`name_${index}`"
                      v-model="item.elemNm"
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <th scope="row">{{ t("02.generalFactor.useYn") }}</th>
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
                class="button btn_xs btn_gray w-[100px]"
              >
                {{ t("common.delete") }}
              </button>
            </div>
          </div>

          <div class="box_section">
            <div class="btn_area">
              <button
                type="button"
                class="btn_xs btn_blue"
                @click="showAlertSave()"
              >
                {{ t("common.save") }}
              </button>
              <button type="button" class="btn_xs btn_white" @click="back()">
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
import GridComponent from "@/components/common/grid/GridComponent.vue";
import { SCREEN } from "@/router/screen";
import InputBase from "@/components/common/input/InputBase.vue";
import {
  createAbilityCmpnElem,
  removeAbilityCmpn,
} from "@/stores/generalFactor/generalFactor.service";
import { cmpnAbiStore, coreAbiStore } from "@/stores/generalFactor";
import { AbilityDetail } from "@/stores/generalFactor/generalFactor.type";
import { AbilityCmpnElem } from "@/stores/generalFactor/generalFactor.type";
import { codeMngStore } from "@/stores/common/codeMng";
import { SUCCSESS_STATUS } from "@/constants/screen.const";
import Swal from "sweetalert2";
import { CREATED_STATUS } from "@/constants/screen.const";
import { STATUS_NO, STATUS_YES, STATUS_ADD } from "@/constants/common.const";
import { AbilityCoreAndChild } from "@/stores/generalFactor/generalFactor.type";

export default {
  components: {
    TFooter,
    THeader,
    Breadcrumb,
    LoaddingComponent,
    GridComponent,
    InputBase,
  },
  data() {
    return {
      pageTitle: this.t("02.generalFactor.pageTitle"),
      breadcrumbItems: [
        { label: this.t("common.home"), link: "/" },
        { label: this.t("02.coreChildAbility.menu"), link: "#" },
        {
          label: this.t("02.generalFactor.pageTitle"),
          link: SCREEN.generalFactor.path,
        },
      ],
      paginationPageSize: PAGINATION_PAGE_SIZE,
      paginationPageSizeSelector: PAGINATION_PAGE_SIZE_SELECTOR,
      codeRadio: [
        { cdId: STATUS_YES, cdNm: this.t("common.use") },
        { cdId: STATUS_NO, cdNm: this.t("common.noUse") },
      ],
      dataForm: {
        listJob: [] as Array<AbilityCmpnElem>,
      },
      coreAndChildDTO: {} as AbilityDetail,
      listDel: [] as Array<AbilityCmpnElem>,
      coreId: "",
      childId: "",
      delAbilityCmpn: {} as AbilityCmpnElem,
      checkRequired: true,
      coreChild: {} as AbilityCoreAndChild,
    };
  },
  setup() {
    const store = commonStore();
    const cmpnStore = cmpnAbiStore();
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
    this.coreId = window.history.state.coreAbilitySeq;
    this.childId = window.history.state.chldAbilitySeq;

    this.getDetail();
  },
  updated() {
    this.checkRequired = this.store.check;
  },
  methods: {
    async getDetail() {
      this.store.setLoading(true);

      this.coreAndChildDTO = {
        coreAbilitySeq: this.coreId,
        chldAbilitySeq: this.childId,
      };
      await this.cmpnStore.fetchDetail(this.coreAndChildDTO);
      if (this.cmpnStore.status && this.cmpnStore.status == SUCCSESS_STATUS) {
        this.dataForm.listJob = this.cmpnStore.cmpnList;
        if (this.cmpnStore.cmpnList.length > 0) {
          this.coreChild = this.cmpnStore.cmpnList[0];
        }

        if (
          this.cmpnStore.cmpnList.length == 1 &&
          this.cmpnStore.cmpnList[0].useYn == null
        ) {
          this.cmpnStore.cmpnList[0].useYn = STATUS_YES;
        }
      }

      this.store.setLoading(false);
    },
    back() {
      this.$router.push({ path: SCREEN.generalFactor.path });
    },
    addJob() {
      this.dataForm.listJob.push({
        elemNm: "",
        useYn: STATUS_YES,
        coreAbilitySeq: this.coreId,
        chldAbilitySeq: this.childId,
        delYn: STATUS_NO,
        status: STATUS_ADD,
      });
    },
    async save() {
      let listDTO = {
        resDTOList: [],
        cmpnElemResDTO: [],
      };

      if (this.dataForm.listJob.length > 0) {
        this.dataForm.listJob.forEach((item) => {
          let cmpn = {};
          cmpn.cmpnElemSeq = item.cmpnElemSeq;
          cmpn.elemNm = item.elemNm;
          cmpn.coreAbilitySeq = item.coreAbilitySeq;
          cmpn.chldAbilitySeq = item.chldAbilitySeq;
          cmpn.useYn = item.useYn;
          cmpn.delYn = item.delYn;
          if (item.cmpnElemSeq == null) {
            cmpn.status = STATUS_ADD;
          } else {
            cmpn.status = item.status;
          }

          listDTO.resDTOList.push(cmpn);
        });
      }
      listDTO.cmpnElemResDTO = this.listDel;

      this.store.setLoading(true);
      await this.cmpnStore.checkDupNm(listDTO.resDTOList);

      if (this.cmpnStore.status && this.cmpnStore.status == SUCCSESS_STATUS) {
        createAbilityCmpnElem(listDTO).then((res) => {
          if (res.status && res.status == CREATED_STATUS) {
            Swal.fire({
              text: this.t("02.generalFactor.alert.saveSuccess"),
              type: "warning",
              showCancelButton: false,
              confirmButtonText: this.t("common.confirm"),
            }).then((result) => {
              if (result.isConfirmed) {
                this.listDel = [];
                this.back();
              }
            });
          }
        });
      } else {
        this.showAlert(this.t("02.generalFactor.alert.checkDuplicate"));
      }
      this.store.setLoading(false);
    },
    showAlertSave() {
      if (!this.store.check) {
        Swal.fire({
          text: this.t("02.generalFactor.alert.save"),
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
        text: this.t("02.generalFactor.alert.del"),
        type: "warning",
        showCancelButton: true,
        confirmButtonText: this.t("common.delete"),
        cancelButtonText: this.t("common.cancel"),
      }).then(async (result) => {
        if (result.isConfirmed) {
          let dataDel = {} as AbilityCmpnElem;
          dataDel = this.dataForm.listJob[index];

          if (dataDel.cmpnElemSeq) {
            this.store.setLoading(true);

            await this.cmpnStore.checkRmAbi(dataDel);
            if (
              this.cmpnStore.status &&
              this.cmpnStore.status == SUCCSESS_STATUS
            ) {
              this.showAlert(this.t("02.generalFactor.alert.delSuccess"));
              this.listDel.push(dataDel);
              this.dataForm.listJob.splice(index, 1)[0];
            } else {
              this.showAlert(this.t("02.generalFactor.alert.delCancle"));
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
.data-form {
  display: flex;
}

.button-table1 {
  display: flex;
  margin-top: 10px;
  margin-left: 20px;
  width: 4%;
}
</style>
