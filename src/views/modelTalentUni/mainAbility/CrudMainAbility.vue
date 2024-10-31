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
            <p class="box_title_sm mb-0"></p>
            <div class="btn_group btn_end mb-3">
              <ButtonBase
                class="btn_round btn_md btn_primary"
                :buttonName="t('02.coreChildAbility.button.addCore')"
                @click="addMajor()"
              >
              </ButtonBase>
            </div>
          </div>
          <div class="tbl tbl_col">
            <table>
              <caption>
                table col scroll
              </caption>
              <colgroup>
                <col style="width: 16%" />
                <col style="width: auto" />
                <col style="width: 8%" />
                <col style="width: 5%" />
                <col style="width: 16%" />
                <col style="width: auto" />
                <col style="width: 13%" />
                <col style="width: 5%" />
              </colgroup>
              <thead>
                <tr>
                  <th scope="row">
                    {{ t("02.coreChildAbility.core") }}
                  </th>
                  <th scope="row">
                    {{ t("02.coreChildAbility.coreDefn") }}
                  </th>
                  <th scope="row">
                    {{ t("02.coreChildAbility.useYn") }}
                  </th>
                  <th scope="row">
                    {{ t("02.coreChildAbility.manager") }}
                  </th>
                  <th scope="row">
                    {{ t("02.coreChildAbility.child") }}
                  </th>
                  <th scope="row">
                    {{ t("02.coreChildAbility.childDefn") }}
                  </th>
                  <th scope="row">
                    {{ t("02.coreChildAbility.useYn") }}
                  </th>
                  <th scope="row">
                    {{ t("02.coreChildAbility.manager") }}
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
                      required
                    ></TextArea>
                  </td>
                  <td v-else></td>
                  <td
                    v-if="item.isFirst"
                    :class="{ 'text-red': item.majorItemActive !== statusY }"
                  >
                    {{
                      item.majorItemActive === statusY
                        ? t("common.use")
                        : t("common.noUse")
                    }}
                  </td>
                  <td v-else></td>
                  <td
                    v-if="item.isFirst"
                    @click="showAlertDelMajor(item.majorIndex)"
                    class="clickable-cell"
                  >
                    ❌
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
                      required
                    ></TextArea>
                  </td>
                  <td>
                    <SelectBoxBase
                      :data="listRadio1"
                      v-model="item.lowerItemActive"
                      :id="`lowerItemActive_${index}`"
                      @change="convertToTable"
                    ></SelectBoxBase>
                  </td>
                  <td
                    v-if="item.lowerIndex == 0"
                    @click="addLowerGrade(item.majorIndex)"
                    class="clickable-cell"
                  >
                    ➕
                  </td>
                  <td
                    v-if="item.lowerIndex != 0"
                    @click="
                      showAlertDelLowerMajor(item.majorIndex, item.lowerIndex)
                    "
                    class="clickable-cell"
                  >
                    ❌
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="box_section">
            <div class="btn_area btn_group btn_end">
              <ButtonBase
                class="btn_md btn_blue"
                :buttonName="t('common.save')"
                @click="showAlertSave"
              >
              </ButtonBase>
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
import { useI18n } from "vue-i18n";
import { CREATED_STATUS } from "@/constants/screen.const";
import Swal from "sweetalert2";
import { STATUS_YES } from "@/constants/common.const";
import { coreAbiStore } from "@/stores/mainAbility";
import { createCoreAbility } from "@/stores/mainAbility/mainAbility.service";
import { SUCCSESS_STATUS } from "@/constants/screen.const";
import { STATUS_ADD } from "@/constants/common.const";
import { STATUS_NO } from "@/constants/common.const";
import type { CoreAbilityRes } from "@/stores/mainAbility/mainAbility.type";
import ButtonBase from "@/components/common/button/ButtonBase.vue";

export default defineComponent({
  components: {
    TFooter,
    THeader,
    Breadcrumb,
    LoaddingComponent,
    GridComponent,
    InputBase,
    ButtonBase,
  },
  data() {
    return {
      pageTitle: this.t("02.coreChildAbility.pageTitle"),
      breadcrumbItems: [
        { label: this.t("common.home"), link: "/" },
        { label: this.t("02.coreChildAbility.menu"), link: "#" },
        {
          label: this.t("02.coreChildAbility.pageTitle"),
          link: SCREEN.mainAbility.path,
        },
      ],
      modeScreen: "" as any,
      paginationPageSize: PAGINATION_PAGE_SIZE,
      paginationPageSizeSelector: PAGINATION_PAGE_SIZE_SELECTOR,
      listRadio1: [
        { cdId: STATUS_YES, cdNm: this.t("common.use"), upCdId: "useYn" },
        { cdId: STATUS_NO, cdNm: this.t("common.noUse"), upCdId: "useYn" },
      ],
      lowerGradeForm: [] as Array<any>,
      dataForm: {} as CoreAbilityRes,
      dataDeleteCore: [] as Array<any>,
      dataDeleteChild: [] as Array<any>,
      checkRequired: "",
      statusY: STATUS_YES,
    };
  },
  setup() {
    const { t } = useI18n();
    const store = commonStore();
    const coreAbilityStore = coreAbiStore();
    return {
      t,
      store,
      coreAbilityStore,
    };
  },
  beforeMount() {
    this.getList();
  },
  updated() {
    this.checkRequired = this.store.check;
  },
  methods: {
    async getList() {
      this.store.setLoading(true);

      await this.coreAbilityStore.fetchList();
      if (
        this.coreAbilityStore.status &&
        this.coreAbilityStore.status == SUCCSESS_STATUS
      ) {
        this.dataForm = this.coreAbilityStore.coreList;

        this.lowerGradeForm = this.convertToTable();
        this.store.setLoading(false);
      }
    },
    convertToTable() {
      let dataReturn = [] as Array<any>;
      this.dataForm.coreAbilityResDTOList.forEach((majorItem, majorIndex) => {
        majorItem.childAbilityList.forEach((lowerItem, lowerIndex) => {
          dataReturn.push({
            lowerItemId: lowerItem.chldAbilitySeq,
            lowerItemName: lowerItem.chldAbilityNm,
            lowerItemDefine: lowerItem.defn,
            lowerItemActive: lowerItem.useYn,
            lowerItemStatus: lowerItem.status,
            lowerIndex: lowerIndex,

            rowSpan: majorItem.childAbilityList.length,
            isFirst: lowerIndex === 0,

            majorItemId: majorItem.coreAbilitySeq,
            majorItemName: majorItem.coreAbilityNm,
            majorItemDefine: majorItem.defn,
            majorItemActive: majorItem.useYn,
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
            coreAbilitySeq: item.majorItemId,
            coreAbilityNm: item.majorItemName,
            defn: item.majorItemDefine,
            useYn: item.majorItemActive,
            status: item.majorItemStatus,
            majorIndex: item.majorIndex,
            childAbilityList: [],
          };
          nestedData.push(majorItem);
        }
        // Add the lower grade to the corresponding major item
        majorItem.childAbilityList.push({
          chldAbilitySeq: item.lowerItemId,
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
      this.dataForm.coreAbilityResDTOList = this.convertToNested(
        this.lowerGradeForm
      );
      this.dataForm.coreAbilityResDTOList.push({
        coreAbilitySeq: "",
        coreAbilityNm: "",
        defn: "",
        useYn: STATUS_YES,
        status: STATUS_ADD,
        childAbilityList: [
          {
            chldAbilitySeq: "",
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
      this.dataForm.coreAbilityResDTOList = this.convertToNested(
        this.lowerGradeForm
      );
      this.dataForm.coreAbilityResDTOList[maJorIndex].childAbilityList.push({
        chldAbilitySeq: "",
        chldAbilityNm: "",
        defn: "",
        useYn: STATUS_YES,
        status: STATUS_ADD,
      });

      this.lowerGradeForm = this.convertToTable();
    },
    async onSave() {
      this.store.setLoading(true);

      this.dataForm.coreAbilityResDTOList = this.convertToNested(
        this.lowerGradeForm
      );

      let listDTO = {} as CoreAbilityRes;
      listDTO.coreAbilityResDTOList = this.dataForm.coreAbilityResDTOList;
      listDTO.coreAbiDel = this.dataDeleteCore;
      listDTO.chldAbiDel = this.dataDeleteChild;

      await this.coreAbilityStore.checkDupName(listDTO);

      if (
        this.coreAbilityStore.status &&
        this.coreAbilityStore.status == SUCCSESS_STATUS
      ) {
        createCoreAbility(listDTO).then((res) => {
          if (res.status && res.status == CREATED_STATUS) {
            this.store.setLoading(false);
            Swal.fire({
              text: this.t("02.coreChildAbility.alert.saveSuccess"),
              type: "warning",
              showCancelButton: false,
              confirmButtonText: this.t("common.confirm"),
            }).then((result) => {
              if (result.isConfirmed) {
                this.dataDeleteCore = [];
                this.dataDeleteChild = [];
                this.getList();
              }
            });
          } else {
            this.store.setLoading(false);
          }
        });
      } else {
        this.store.setLoading(false);
        Swal.fire({
          text: this.t("02.coreChildAbility.alert.checkDuplicate"),
          type: "warning",
          showCancelButton: false,
          confirmButtonText: this.t("common.confirm"),
        }).then((result) => {
          if (result.isConfirmed) {
            this.getList();
          }
        });
      }
    },
    showAlertSave() {
      if (!this.store.check) {
        Swal.fire({
          text: this.t("02.coreChildAbility.alert.save"),
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
    async showAlertDelMajor(majorIndex) {
      this.store.setLoading(true);

      this.dataForm.coreAbilityResDTOList = this.convertToNested(
        this.lowerGradeForm
      );

      let coreObject = this.dataForm.coreAbilityResDTOList[majorIndex];

      if (coreObject.coreAbilitySeq) {
        Swal.fire({
          text: this.t("02.coreChildAbility.alert.delCore"),
          type: "warning",
          showCancelButton: true,
          confirmButtonText: this.t("common.delete"),
          cancelButtonText: this.t("common.cancel"),
        }).then(async (result) => {
          if (result.isConfirmed) {
            await this.coreAbilityStore.checkRemoveCore(coreObject);

            if (
              this.coreAbilityStore.status &&
              this.coreAbilityStore.status == SUCCSESS_STATUS
            ) {
              this.dataForm.coreAbilityResDTOList.splice(majorIndex, 1);
              this.dataDeleteCore.push(coreObject);
              this.showAlert(this.t("02.coreChildAbility.alert.delSuccess"));
            } else {
              this.showAlert(this.t("02.coreChildAbility.alert.abilityUse"));
            }
          }
        });
      } else {
        this.dataForm.coreAbilityResDTOList.splice(majorIndex, 1);
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
    async showAlertDelLowerMajor(majorIndex, lowerGradeIndex) {
      this.store.setLoading(true);

      this.dataForm.coreAbilityResDTOList = this.convertToNested(
        this.lowerGradeForm
      );

      let childObject =
        this.dataForm.coreAbilityResDTOList[majorIndex].childAbilityList[
          lowerGradeIndex
        ];

      if (childObject.chldAbilitySeq) {
        Swal.fire({
          text: this.t("02.coreChildAbility.alert.delChild"),
          type: "warning",
          showCancelButton: true,
          confirmButtonText: this.t("common.delete"),
          cancelButtonText: this.t("common.cancel"),
        }).then(async (result) => {
          if (result.isConfirmed) {
            await this.coreAbilityStore.checkRemoveChild(childObject);

            if (
              this.coreAbilityStore.status &&
              this.coreAbilityStore.status == SUCCSESS_STATUS
            ) {
              this.dataForm.coreAbilityResDTOList[
                majorIndex
              ].childAbilityList.splice(lowerGradeIndex, 1);
              this.dataDeleteChild.push(childObject);
              this.showAlert(this.t("02.coreChildAbility.alert.delSuccess"));
            } else {
              this.showAlert(this.t("02.coreChildAbility.alert.abilityUse"));
            }
          }
        });
      } else {
        this.dataForm.coreAbilityResDTOList[majorIndex].childAbilityList.splice(
          lowerGradeIndex,
          1
        );
        this.lowerGradeForm = this.convertToTable();
      }
      this.store.setLoading(false);
    },
  },
});
</script>

<style scoped lang="scss">
.clickable-cell {
  cursor: pointer;
}

table,
td,
th {
  border: 1px solid var(--light-blue-gray);
  padding: 5px;
}
</style>
