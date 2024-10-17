<template>

  <div class="page_wrapper">
    <section id="content" class="content_wrapper grid_content" tabindex="0">
      <Breadcrumb
        :pageTitle="pageTitle"
        :breadcrumbItems="breadcrumbItems"
      ></Breadcrumb>

      <div class="box dp_block">
        <div class="box_section">
          <div class="flex justify-between items-center mb-[24px]">
            <div class="btn_group btn_end mb-3">
              <button type="button" @click="addMajor()" class="btn_xs btn_blue">
                {{ t("02.learnAbility.button.addCore") }}
              </button>
            </div>
          </div>
          <div class="scrollx_table sm">
            <table class="tbl_col">
              <caption></caption>
              <colgroup>
                <col style="width: 16%" />
                <col style="width: auto" />
                <col style="width: 16%" />
                <col style="width: auto" />
                <col style="width: 13%" />
                <col style="width: 12%" />
              </colgroup>
              <thead>
                <tr>
                  <th scope="col">
                    {{ t("02.learnAbility.core") }}
                  </th>
                  <th scope="col">
                    {{ t("02.learnAbility.coreDefn") }}
                  </th>
                  <th scope="col">
                    {{ t("02.learnAbility.child") }}
                  </th>
                  <th scope="col">
                    {{ t("02.learnAbility.childDefn") }}
                  </th>
                  <th scope="col">
                    {{ t("02.learnAbility.useYn") }}
                  </th>
                  <th scope="col">
                    {{ t("02.learnAbility.manager") }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in lowerGradeForm" :key="index">
                  <td v-if="item.isFirst">
                    <InputBase
                      v-model="item.majorItemName"
                      :id="`majorItemName_${index}`"
                      required
                    />
                  </td>
                  <td v-else></td>
                  <td v-if="item.isFirst">
                    <TextArea
                      v-model="item.majorItemDefine"
                      :id="`majorItemDefine_${index}`"
                      placeholder=""
                      required
                    ></TextArea>
                  </td>
                  <td v-else></td>
                  <td>
                    <InputBase
                      v-model="item.lowerItemName"
                      :id="`lowerItemName_${index}`"
                      required
                    />
                  </td>
                  <td>
                    <TextArea
                      v-model="item.lowerItemDefine"
                      :id="`lowerItemDefine_${index}`"
                      placeholder=""
                      required
                    ></TextArea>
                  </td>
                  <td>
                    <RadiobuttonBase
                      v-for="itemRadio in codeRadio"
                      :mode="'show'"
                      :value="itemRadio.id"
                      v-model="item.lowerItemActive"
                      :id="itemRadio.id + index"
                      :name="itemRadio.id + index"
                      :key="itemRadio.id + index"
                      :checked="itemRadio.id == item.lowerItemActive"
                      :label="itemRadio.name"
                    >
                    </RadiobuttonBase>
                  </td>
                  <td>
                    <button
                      type="button"
                      v-if="item.lowerIndex == 0"
                      @click="addLowerGrade(item.majorIndex)"
                      class="button btn_xs btn_blue ml-8 w-[100px]"
                    >
                      {{ t("02.learnAbility.button.addChild") }}
                    </button>
                    <button
                      v-if="item.lowerIndex == 0"
                      type="button"
                      @click="showAlertDelMajor(item.majorIndex)"
                      class="button btn_xs btn_gray ml-8 w-[100px] mt-3"
                    >
                      {{ t("02.learnAbility.button.delCore") }}
                    </button>
                    <button
                      type="button"
                      v-if="item.lowerIndex != 0"
                      @click="
                        showAlertDelLowerMajor(item.majorIndex, item.lowerIndex)
                      "
                      class="button btn_xs btn_gray ml-8 w-[100px]"
                    >
                      {{ t("02.learnAbility.button.delChild") }}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="box_section">
            <div class="btn_area btn_group btn_end">
              <button
                type="button"
                class="btn_xs btn_blue"
                :disabled="checkRequired"
                @click="showAlertSave"
              >
                {{ t("common.save") }}
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
import InputBase from "@/components/common/input/InputBase.vue";
import { useI18n } from "vue-i18n";
import { CREATED_STATUS } from "@/constants/screen.const";
import Swal from "sweetalert2";
import { STATUS_YES, STATUS_ADD } from "@/constants/common.const";
import { learnAbiStore } from "@/stores/learnAbility";
import { SUCCSESS_STATUS } from "@/constants/screen.const";
import { createLearnAbility } from "@/stores/learnAbility/learnAbility.service";
import { STATUS_NO } from "@/constants/common.const";
import { SCREEN } from "@/router/screen";
import { LearnAbilityRes } from "@/stores/learnAbility/learnAbility.type";
import { LearnAbility } from "@/stores/learnAbility/learnAbility.type";
import { LearnChldAbility } from "@/stores/learnAbility/learnAbility.type";

export default defineComponent({
  components: {
    TFooter,
    THeader,
    Breadcrumb,
    LoaddingComponent,
    InputBase,
  },
  data() {
    return {
      pageTitle: this.t("02.learnAbility.pageTitle"),
      breadcrumbItems: [
        { label: this.t("common.home"), link: "/" },
        { label: this.t("02.learnAbility.menu"), link: "#" },
        {
          label: this.t("02.learnAbility.pageTitle"),
          link: SCREEN.learnAbility.path,
        },
      ],
      codeRadio: [
        { id: STATUS_YES, name: this.t("common.use") },
        { id: STATUS_NO, name: this.t("common.noUse") },
      ],
      lowerGradeForm: [] as Array<any>,
      dataForm: {} as LearnAbilityRes,
      dataDelete: [] as Array<LearnAbility>,
      dataDeleteChld: [] as Array<LearnChldAbility>,
    };
  },
  setup() {
    const { t } = useI18n();
    const store = commonStore();
    const learnStore = learnAbiStore();
    return {
      t,
      store,
      learnStore,
    };
  },
  beforeMount() {
    this.getList();
  },
  methods: {
    async getList() {
      this.store.setLoading(true);
      await this.learnStore.fetchList();
      if (this.learnStore.status && this.learnStore.status == SUCCSESS_STATUS) {
        this.dataForm = this.learnStore.learnList;

        this.lowerGradeForm = this.convertToTable();
      }
      this.store.setLoading(false);
    },
    convertToTable() {
      let dataReturn = [] as Array<any>;

      this.dataForm.learnAbilityReqDTOS.forEach((majorItem, majorIndex) => {
        majorItem.chldList.forEach((lowerItem, lowerIndex) => {
          dataReturn.push({
            lowerItemId: lowerItem.learnAbilityChldAbilitySeq,
            lowerItemName: lowerItem.chldAbilityNm,
            lowerItemDefine: lowerItem.defn,
            lowerItemActive: lowerItem.useYn,
            lowerItemStatus: lowerItem.status,
            lowerIndex: lowerIndex,

            rowSpan: majorItem.chldList.length,
            isFirst: lowerIndex === 0,

            majorItemId: majorItem.learnAbilitySeq,
            majorItemName: majorItem.learnAbilityNm,
            majorItemDefine: majorItem.defn,
            majorItemStatus: majorItem.status,
            majorIndex: majorIndex,
          });
        });
      });
      return dataReturn;
    },
    convertToNested(flatData) {
      let nestedData = [] as Array<any>;
      flatData.forEach((item) => {
        // Find or create the major item
        let majorItem = nestedData.find((major) => {
          return major.majorIndex == item.majorIndex;
        });

        if (!majorItem && item.isFirst) {
          majorItem = {
            learnAbilitySeq: item.majorItemId,
            learnAbilityNm: item.majorItemName,
            defn: item.majorItemDefine,
            status: item.majorItemStatus,
            majorIndex: item.majorIndex,
            chldList: [],
          };
          nestedData.push(majorItem);
        }
        // Add the lower grade to the corresponding major item
        majorItem.chldList.push({
          learnAbilityChldAbilitySeq: item.lowerItemId,
          chldAbilityNm: item.lowerItemName,
          defn: item.lowerItemDefine,
          useYn: item.lowerItemActive,
          status: item.lowerItemStatus,
        });
      });
      return nestedData;
    },
    addMajor() {
      // Directly add a new empty major item to dataForm.listMajor
      this.dataForm.learnAbilityReqDTOS = this.convertToNested(
        this.lowerGradeForm
      );
      this.dataForm.learnAbilityReqDTOS.unshift({
        learnAbilitySeq: "",
        learnAbilityNm: "",
        defn: "",
        status: STATUS_ADD,
        chldList: [
          {
            learnAbilityChldAbilitySeq: "",
            chldAbilityNm: "",
            defn: "",
            useYn: STATUS_YES,
            status: STATUS_ADD,
          },
        ],
      });
      this.lowerGradeForm = this.convertToTable();
    },
    addLowerGrade(maJorIndex) {
      this.dataForm.learnAbilityReqDTOS = this.convertToNested(
        this.lowerGradeForm
      );
      this.dataForm.learnAbilityReqDTOS[maJorIndex].chldList.push({
        learnAbilityChldAbilitySeq: "",
        chldAbilityNm: "",
        defn: "",
        useYn: STATUS_YES,
        status: STATUS_ADD,
      });

      this.lowerGradeForm = this.convertToTable();
    },
    async onSave() {
      this.store.setLoading(true);

      this.dataForm.learnAbilityReqDTOS = this.convertToNested(
        this.lowerGradeForm
      );

      let listDTO = {} as LearnAbilityRes;
      listDTO.learnAbilityReqDTOS = this.dataForm.learnAbilityReqDTOS;
      listDTO.learnAbiDel = this.dataDelete;
      listDTO.chldAbiDel = this.dataDeleteChld;

      await this.learnStore.checkDupNm(listDTO);
      if (this.learnStore.status && this.learnStore.status == SUCCSESS_STATUS) {
        // if check duplicate pass then save
        createLearnAbility(listDTO).then((res) => {
          if (res.status && res.status == CREATED_STATUS) {
            Swal.fire({
              text: this.t("02.learnAbility.alert.saveSuccess"),
              type: "warning",
              showCancelButton: false,
              confirmButtonText: this.t("common.confirm"),
            }).then((result) => {
              if (result.isConfirmed) {
                this.dataDelete = [];
                this.dataDeleteChld = [];
                this.getList();
              }
            });
          }
        });
      } else {
        this.showAlert(this.t("02.learnAbility.alert.checkDuplicate"));
      }

      this.store.setLoading(false);
    },
    showAlertSave() {
      if (!this.store.check) {
        Swal.fire({
          text: this.t("02.learnAbility.alert.save"),
          type: "warning",
          showCancelButton: true,
          confirmButtonText: this.t("common.save"),
          cancelButtonText: this.t("common.cancel"),
        }).then((result) => {
          if (result.isConfirmed) {
            this.onSave();
          }
        });
      } else {
        this.showAlert(this.t("common.messageValidateRequired"));
      }
    },
    showAlertDelMajor(majorIndex) {
      this.store.setLoading(true);

      this.dataForm.learnAbilityReqDTOS = this.convertToNested(
        this.lowerGradeForm
      );
      let coreObject = this.dataForm.learnAbilityReqDTOS.splice(
        majorIndex,
        1
      )[0];

      if (coreObject.learnAbilitySeq) {
        this.dataDelete.push(coreObject);

        Swal.fire({
          text: this.t("02.learnAbility.alert.delCore"),
          type: "warning",
          showCancelButton: true,
          confirmButtonText: this.t("common.delete"),
          cancelButtonText: this.t("common.cancel"),
        }).then(async (result) => {
          if (result.isConfirmed) {
            await this.learnStore.checkRmLearn(coreObject);
            if (
              this.learnStore.status &&
              this.learnStore.status == SUCCSESS_STATUS
            ) {
              this.showAlert(this.t("02.learnAbility.alert.delSuccess"));
            } else {
              this.showAlert(this.t("02.learnAbility.alert.abilityUse"));
            }
          }
        });
      } else {
        this.lowerGradeForm = this.convertToTable();
      }
      this.store.setLoading(false);
    },
    showAlert(message: string) {
      Swal.fire({
        text: message,
        type: "warning",
        showCancelButton: false,
        confirmButtonText: this.t("common.confirm"),
      });
      this.lowerGradeForm = this.convertToTable();
    },
    showAlertDelLowerMajor(majorIndex, lowerGradeIndex) {
      this.store.setLoading(true);

      this.dataForm.learnAbilityReqDTOS = this.convertToNested(
        this.lowerGradeForm
      );

      let childObject = this.dataForm.learnAbilityReqDTOS[
        majorIndex
      ].chldList.splice(lowerGradeIndex, 1)[0];

      if (childObject.learnAbilityChldAbilitySeq) {
        this.dataDeleteChld.push(childObject);

        Swal.fire({
          text: this.t("02.learnAbility.alert.delChild"),
          type: "warning",
          showCancelButton: true,
          confirmButtonText: this.t("common.delete"),
          cancelButtonText: this.t("common.cancel"),
        }).then(async (result) => {
          if (result.isConfirmed) {
            await this.learnStore.checkRmChild(childObject);

            if (
              this.learnStore.status &&
              this.learnStore.status == SUCCSESS_STATUS
            ) {
              this.showAlert(this.t("02.learnAbility.alert.delSuccess"));
            } else {
              this.showAlert(this.t("02.learnAbility.alert.abilityUse"));
            }
          }
        });
      } else {
        this.lowerGradeForm = this.convertToTable();
      }
      this.store.setLoading(false);
    },
  },
});
</script>

<style scoped lang="scss"></style>
