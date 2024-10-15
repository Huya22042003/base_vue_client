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
          <p class="box_title_sm">{{ t("02.standardAction.title") }}</p>

          <table class="tbl_row">
            <caption>
              {{
                t("02.standardAction.title")
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
                  <InputBase
                    v-model="itemDetail.coreAbilityNm"
                    id="input_major"
                    required
                  />
                </td>
              </tr>
              <tr>
                <th scope="row">{{ t("02.coreChildAbility.child") }}</th>
                <td>
                  <InputBase
                    v-model="itemDetail.childAbilityNm"
                    id="input_deptment"
                    required
                  />
                </td>
              </tr>
              <tr>
                <th scope="row">{{ t("02.generalFactor.cmpnElem") }}</th>
                <td class="td_input">
                  <InputBase
                    v-model="itemDetail.cmpnElemNm"
                    id="input_talent"
                    required
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div class="flex items-center"></div>
        </div>
      </div>
      <div class="box dp_block">
        <div class="box_section">
          <div class="flex justify-between items-center mb-[24px]">
            <p class="box_title_sm">{{ t("02.standardAction.titleAction") }}</p>
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
          <div v-for="(item, index) in dataForm.listJob" :key="index">
            <table class="tbl_row tbl_border mb-10">
              <caption>
                {{
                  t("02.standardAction.titleAction")
                }}
              </caption>
              <colgroup>
                <col style="width: 18%" />
                <col style="width: 10%" />
                <col style="width: auto" />
              </colgroup>
              <tbody>
                <tr>
                  <th scope="row">{{ t("02.standardAction.actionIndex") }}</th>
                  <td class="td_input" colspan="2">
                    <div class="flex input-actn">
                      <InputBase
                        v-model="item.actnIndi"
                        :id="`input_major_${index}`"
                        required
                      />
                      <button
                        type="button"
                        @click="showAlertDel(index)"
                        class="button btn_xs btn_gray ml-8 w-[100px] button-del"
                      >
                        {{ t("common.delete") }}
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row" rowspan="3">
                    {{ t("02.standardAction.rank") }}
                  </th>
                  <th>{{ t("02.standardAction.high") }}</th>
                  <td>
                    <InputBase
                      v-model="item.actnStnrdBarsHigh"
                      :id="`input_deptment_${index}`"
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <th>{{ t("02.standardAction.middle") }}</th>
                  <td class="td_input">
                    <InputBase
                      v-model="item.actnStnrdBarsMedl"
                      :id="`input_talent_${index}`"
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <th>{{ t("02.standardAction.low") }}</th>
                  <td>
                    <InputBase
                      v-model="item.actnStnrdBarsLow"
                      :id="`input_talentDefine_${index}`"
                      required
                    />
                  </td>
                </tr>
              </tbody>
            </table>
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
    </section>
  </div>
</template>

<script lang="ts">
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import THeader from "@/layouts/components/THeader.vue";
import TFooter from "@/layouts/components/TFooter.vue";
import { commonStore } from "@/stores/common";
import LoaddingComponent from "@/components/common/loading/LoaddingComponent.vue";
import GridComponent from "@/components/common/grid/GridComponent.vue";
import { SCREEN } from "@/router/screen";
import InputBase from "@/components/common/input/InputBase.vue";
import { standActionStore } from "@/stores/standardAction";
import { AbilityItemSeq } from "@/stores/standardAction/standDardAction.type";
import { AbilityCmpnElemItem } from "@/stores/standardAction/standDardAction.type";
import { createAbilityCmpnElemItem } from "@/stores/standardAction/standDardAction.service";
import Swal from "sweetalert2";
import { CREATED_STATUS } from "@/constants/screen.const";
import { SUCCSESS_STATUS } from "@/constants/screen.const";
import { STATUS_YES } from "@/constants/common.const";
import { STATUS_ADD, STATUS_NO } from "@/constants/common.const";

export default defineComponent({
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
      pageTitle: this.t("02.standardAction.pageTitle"),
      breadcrumbItems: [
        { label: this.t("common.home"), link: "/" },
        { label: this.t("02.coreChildAbility.menu"), link: "#" },
        {
          label: this.t("02.standardAction.pageTitle"),
          link: SCREEN.standardAction.path,
        },
      ],
      itemSeq: {} as AbilityItemSeq,
      itemDetail: {} as AbilityCmpnElemItem,
      cmpnElemSeq: "",
      dataForm: {
        listJob: [],
      },
      itemDel: [] as Array<AbilityCmpnElemItem>,
      dataRequest: {
        itemResDTOS: [] as Array<AbilityCmpnElemItem>,
        itemDeleteDTO: [] as Array<AbilityCmpnElemItem>,
      },
    };
  },
  setup() {
    const store = commonStore();
    const actionStore = standActionStore();
    const { t } = useI18n();
    return {
      store,
      actionStore,
      t,
    };
  },
  beforeMount() {
    this.cmpnElemSeq = window.history.state.cmpnElemSeq;
    this.getDetail();
  },
  methods: {
    async getDetail() {
      this.store.setLoading(true);
      this.itemSeq = {
        cmpnElemSeq: this.cmpnElemSeq,
      };
      await this.actionStore.fetchDetail(this.itemSeq);
      if (
        this.actionStore.status &&
        this.actionStore.status == SUCCSESS_STATUS
      ) {
        this.dataForm.listJob = this.actionStore.cmpnItem;
        this.itemDetail = this.actionStore.cmpnItem[0];
      }
      this.store.setLoading(false);
    },
    back() {
      this.$router.push({ path: SCREEN.standardAction.path });
    },
    addJob() {
      this.dataForm.listJob.push({
        actnIndi: "",
        actnStnrdBarsHigh: "",
        actnStnrdBarsMedl: "",
        actnStnrdBarsLow: "",
        useYn: STATUS_YES,
        cmpnElemSeq: this.itemSeq,
        delYn: STATUS_NO,
        status: STATUS_ADD,
      });
    },
    saveItem() {
      let listElemItem = [] as Array<AbilityCmpnElemItem>;
      this.dataForm.listJob.forEach((item) => {
        let elemItem = {};
        elemItem.itemSeq = item.itemSeq;
        elemItem.actnIndi = item.actnIndi;
        elemItem.actnStnrdBarsHigh = item.actnStnrdBarsHigh;
        elemItem.actnStnrdBarsMedl = item.actnStnrdBarsMedl;
        elemItem.actnStnrdBarsLow = item.actnStnrdBarsLow;
        elemItem.cmpnElemSeq = this.cmpnElemSeq;
        elemItem.useYn = STATUS_YES;
        elemItem.delYn = STATUS_NO;

        listElemItem.push(elemItem);
      });

      this.dataRequest.itemResDTOS = listElemItem;
      this.dataRequest.itemDeleteDTO = this.itemDel;

      createAbilityCmpnElemItem(this.dataRequest).then((res) => {
        if (res.status && res.status == CREATED_STATUS) {
          Swal.fire({
            text: this.t("02.standardAction.alert.saveSuccess"),
            type: "warning",
            showCancelButton: false,
            confirmButtonText: this.t("common.confirm"),
          }).then((result) => {
            if (result.isConfirmed) {
              this.back();
            }
          });
        }
      });
    },
    showAlertSave() {
      if (!this.store.check) {
        Swal.fire({
          text: this.t("02.standardAction.alert.save"),
          type: "warning",
          showCancelButton: true,
          confirmButtonText: this.t("common.save"),
          cancelButtonText: this.t("common.cancel"),
        }).then((result) => {
          if (result.isConfirmed) {
            this.saveItem();
          }
        });
      } else {
        Swal.fire({
          text: this.t("common.messageValidateRequired"),
          type: "warning",
          showCancelButton: false,
          confirmButtonText: this.t("common.confirm"),
        });
      }
    },
    showAlertDel(index) {
      Swal.fire({
        text: this.t("02.generalFactor.alert.del"),
        type: "warning",
        showCancelButton: true,
        confirmButtonText: this.t("common.delete"),
        cancelButtonText: this.t("common.cancel"),
      }).then((result) => {
        if (result.isConfirmed) {
          let dataDel = {} as AbilityCmpnElemItem;

          dataDel = this.dataForm.listJob[index];
          if (dataDel.itemSeq) {
            this.store.setLoading(true);

            this.itemDel.push(dataDel);
            this.dataForm.listJob.splice(index, 1)[0];
            Swal.fire({
              text: this.t("02.generalFactor.alert.delSuccess"),
              type: "warning",
              showCancelButton: false,
              confirmButtonText: this.t("common.confirm"),
            });

            this.store.setLoading(false);
          } else {
            this.dataForm.listJob.splice(index, 1)[0];
          }
        }
      });
    },
  },
});
</script>

<style scoped lang="scss">
.input-actn {
  display: flex;
}

.button-del {
  width: 5%;
}
</style>
