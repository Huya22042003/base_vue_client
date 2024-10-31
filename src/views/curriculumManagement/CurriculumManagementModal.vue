<template>
  <TModal
    :is-open="isOpen"
    :is-show-header="true"
    :is-show-footer="true"
    @close-modal="closeModal"
  >
    <template #title>
      <strong v-if="modeScreen == modelCreate">{{
        t("curriculumManagement.regTitleModal")
      }}</strong>
      <strong v-if="modeScreen == modelDetail">{{
        t("curriculumManagement.detailTitleModal")
      }}</strong>
    </template>
    <template #default>
      <h2 class="mb_10">
        {{ t("curriculumManagement.alert") }}
      </h2>
      <table class="tbl_row">
        <colgroup>
          <col style="width: 25%" />
        </colgroup>
        <tbody>
          <tr>
            <th scope="row" class="required">
              {{ t("curriculumManagement.dept") }}
            </th>
            <td class="td_input">
              <SelectBoxBase
                :id="'deptBox'"
                :name="'deptBox'"
                :data="listDeptInfo"
                v-model="currRegData.deptCd"
              ></SelectBoxBase>
            </td>
          </tr>
          <tr>
            <th scope="row" class="required">
              {{ t("curriculumManagement.program") }}
            </th>
            <td class="td_input">
              <InputBase
                id="'program'"
                v-model="currRegData.currDivNm"
                required
              />
            </td>
          </tr>
          <tr>
            <th scope="row" class="required">
              {{ t("curriculumManagement.define") }}
            </th>
            <td class="td_input">
              <TextArea
                id="textArea_validate"
                v-model="currRegData.defn"
                required
              />
            </td>
          </tr>
          <tr>
            <th scope="row" class="required">
              {{ t("curriculumManagement.useYn") }}
            </th>
            <td class="td_input">
              <SelectBoxBase
                :id="'selectbox'"
                :name="'selectbox'"
                :data="listSelectBox"
                v-model="currRegData.useYn"
              ></SelectBoxBase>
            </td>
          </tr>
          <tr v-if="modeScreen === modelDetail">
            <th scope="row">{{ t("02.eduCourseTypeMng.modal.createdBy") }}</th>
            <td class="td_input">{{ regBy }}</td>
          </tr>
          <tr v-if="modeScreen === modelDetail">
            <th scope="row">
              {{ t("02.eduCourseTypeMng.modal.createdDate") }}
            </th>
            <td class="td_input">{{ fomatDate }}</td>
          </tr>
        </tbody>
      </table>
    </template>
    <template #footer>
      <button
        type="button"
        class="button btn_lg btn_primary"
        @click="showAlert"
      >
        {{ t("common.save") }}
      </button>
      <button type="button" class="button btn_lg btn_white" @click="closeModal">
        {{ t("common.close") }}
      </button>
    </template>
  </TModal>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import { format } from "date-fns";
import {
  MODE_CREATE,
  MODE_DETAIL,
  FORMAT_YYY_MM_DD,
} from "../../constants/screen.const";
import { STATUS_YES, STATUS_NO } from "../../constants/common.const";
import { commonStore } from "@/stores/common";

import Swal from "sweetalert2";
import {
  listDeptInfo,
  saveCurr,
  detailCurr,
} from "@/stores/curriculumMng/curriculumMng.service";
import type {
  CurrReg,
  CurrInfo,
} from "@/stores/curriculumMng/curriculumMng.type";

export default defineComponent({
  name: "CurriculumManagementModal",
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    modeScreen: {
      type: String,
      required: true,
    },
    currSeq: {
      type: String,
      required: false,
    },
    getDataAll: {
      type: Function,
    },
  },
  setup(props, { emit }) {
    const { t } = useI18n();
    const cmn = commonStore();

    const closeModal = async () => {
      emit("close-modal");
    };

    return {
      t,
      cmn,
      closeModal,
    };
  },
  watch: {
    isOpen(newVal) {
      if (newVal && this.modeScreen === MODE_DETAIL) {
        this.getDetailData();
      }
      if (newVal) {
        this.getListDept();
      }
      this.clear();
    },
  },
  data() {
    return {
      modelDetail: MODE_DETAIL,
      modelCreate: MODE_CREATE,
      listSelectBox: [
        {
          cdId: STATUS_YES,
          upCdId: "",
          cdNm: this.t("common.use"),
        },
        {
          cdId: STATUS_NO,
          upCdId: "",
          cdNm: this.t("common.noUse"),
        },
      ],
      listDeptInfo: [
        {
          cdId: "",
          cdNm: this.t("common.select"),
        },
      ],
      currRegData: {
        deptCd: "",
        useYn: STATUS_YES,
      } as CurrReg,
      fomatDate: "",
      regBy: "",
    };
  },
  methods: {
    getListDept() {
      this.cmn.setLoading(true);
      listDeptInfo()
        .then((res) => {
          res.data.data.forEach((item: any) => {
            this.listDeptInfo.push({
              cdId: item.deptCd,
              cdNm: item.deptNm,
            });
          });
        })
        .finally(() => {
          this.cmn.setLoading(false);
        });
    },
    clear() {
      this.currRegData.deptCd = "";
      this.currRegData.currDivNm = "";
      this.currRegData.defn = "";
      this.currRegData.useYn = STATUS_YES;
      this.fomatDate = "";
      this.regBy = "";
      this.listDeptInfo = [
        {
          cdId: "",
          cdNm: this.t("common.select"),
        },
      ];
    },
    async saveData() {
      this.cmn.setLoading(true);
      saveCurr(this.currRegData)
        .then((res) => {
          Swal.fire({
            text: this.t("common.message.saveSuccess"),
            type: "warning",
            showCancelButton: false,
            confirmButtonText: this.t("common.confirm"),
          });
        })
        .finally(async () => {
          await this.getDataAll(1, 10);
          await this.closeModal();
          this.cmn.setLoading(false);
        });
    },
    showAlert() {
      if (
        this.currRegData.deptCd == "" ||
        this.currRegData.currDivNm == "" ||
        this.currRegData.defn == ""
      ) {
        Swal.fire({
          text: this.t("common.messageValidateRequired"),
          type: "warning",
          showConfirmButton: false,
          showCancelButton: true,
          cancelButtonText: this.t("common.cancel"),
        });
      } else {
        Swal.fire({
          text: this.t("common.message.save"),
          type: "warning",
          showCancelButton: true,
          confirmButtonText: this.t("common.save"),
          cancelButtonText: this.t("common.cancel"),
        }).then((result) => {
          if (result.isConfirmed) {
            this.saveData();
          }
        });
      }
    },
    async getDetailData() {
      this.cmn.setLoading(true);
      await detailCurr(this.currSeq).then((res) => {
        this.currRegData.currDivSeq = res.data.data.currDivSeq;
        this.currRegData.deptCd = res.data.data.deptNm;
        this.currRegData.currDivNm = res.data.data.currDivNm;
        this.currRegData.defn = res.data.data.defn;
        this.currRegData.useYn = res.data.data.useYn;
        this.regBy = res.data.data.regNm;
        this.fomatDate = format(
          new Date(res.data.data.regDate),
          FORMAT_YYY_MM_DD
        );
      });
      this.cmn.setLoading(false);
    },
  },
});
</script>
<style scoped>
.mb_10 {
  margin-bottom: 10px;
}
</style>
