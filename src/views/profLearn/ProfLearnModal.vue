<template>
  <TModal
    :is-open="isOpen"
    :is-show-header="true"
    :is-show-footer="true"
    @close-modal="closeModal"
  >
    <template #title>
      <strong>{{ t("02.profLearn.modal.modalName") }}</strong>
    </template>
    <template #default>
      <table class="tbl_row">
        <colgroup>
          <col style="width: 30%" />
        </colgroup>
        <tbody>
          <tr>
            <th scope="row">
              <p class="required">
                {{ t("02.profLearn.modal.learnName") }}
              </p>
            </th>
            <td class="td_input">
              <InputBase
                id="'learnName'"
                required
                v-model="profInitModel.methNm"
              />
            </td>
          </tr>
          <tr>
            <th scope="row">
              <p class="required">
                {{ t("02.profLearn.modal.content") }}
              </p>
            </th>
            <td class="td_input">
              <TextArea
                v-model="profInitModel.defN"
                id="textArea_validate"
                placeholder=""
                required
              />
            </td>
          </tr>
          <tr>
            <th scope="row">
              <p>
                {{ t("02.profLearn.modal.useYn") }}
              </p>
            </th>
            <td class="td_input">
              <div class="select_checkbox">
                <RadiobuttonBase
                  v-for="item in listYn"
                  :mode="'show'"
                  :value="item.id"
                  v-model="useYn"
                  :id="item.id"
                  :name="item.id"
                  :key="item.id"
                  :checked="item.id == useYn"
                  :label="item.name"
                >
                </RadiobuttonBase>
              </div>
            </td>
          </tr>
          <tr v-if="modeScreen === modelDetail">
            <th scope="row">{{ t("02.profLearn.modal.createdBy") }}</th>
            <td class="td_input">
              <InputBase
                disabled
                :id="'createdBy'"
                v-model="profInitModel.regId"
              />
            </td>
          </tr>
          <tr v-if="modeScreen === modelDetail">
            <th scope="row">
              {{ t("02.profLearn.modal.createdDate") }}
            </th>
            <td class="td_input">
              <InputBase disabled id="'createdDate'" v-model="fomatDate" />
            </td>
          </tr>
        </tbody>
      </table>
    </template>
    <template #footer>
      <button
        type="button"
        class="button btn_md btn_primary"
        @click="showAlert()"
      >
        {{ t("02.profLearn.button.save") }}
      </button>
      <button type="button" class="button btn_md btn_white" @click="closeModal">
        {{ t("02.profLearn.button.close") }}
      </button>
    </template>
  </TModal>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { format } from "date-fns";
import {
  MODE_CREATE,
  MODE_DETAIL,
  SUCCSESS_STATUS,
  FORMAT_YYY_MM_DD,
} from "../../constants/screen.const";
import { STATUS_YES, STATUS_NO } from "../../constants/common.const";
import { profLearnStore } from "@/stores/profLearnMethod";
import { commonStore } from "@/stores/common";
import type {
  ProfInitModel,
  ProfCreModel,
  ProfIdModel,
} from "@/stores/profLearnMethod/profLearn.type";
import Swal from "sweetalert2";
export default defineComponent({
  name: "ProfLearnModal",
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    modeScreen: {
      type: String,
      required: true,
    },
    profId: {
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
    const store = profLearnStore();
    const profInitModel = ref<ProfInitModel>({});
    const useYn = ref(STATUS_YES);
    const listYn = [
      { id: STATUS_YES, name: t("common.use") },
      { id: STATUS_NO, name: t("common.noUse") },
    ];
    const fomatDate = ref("");
    const profCreModel = ref<ProfCreModel>({});
    const messageType = ref("");
    const profId = ref<ProfIdModel>({});
    const modelDetail = MODE_DETAIL;
    const modelCreate = MODE_CREATE;
    watch(
      () => props.isOpen,
      (newVal) => {
        if (newVal && props.modeScreen === MODE_DETAIL) {
          getDataById();
        }
        clear();
      }
    );
    const getDataById = async () => {
      cmn.setLoading(true);
      profId.value.profLearnSeq = props.profId;
      await store.getProfById(profId.value);
      if (store.status === SUCCSESS_STATUS) {
        profInitModel.value = store.profLearn.data;
        useYn.value = profInitModel.value.useYn;
        fomatDate.value = format(
          new Date(profInitModel.value.regDate),
          FORMAT_YYY_MM_DD
        );
      }
      cmn.setLoading(false);
    };

    const closeModal = () => {
      emit("close-modal");
    };

    const saveOrEdit = async () => {
      cmn.setLoading(true);
      profCreModel.value.methNm = profInitModel.value.methNm;
      profCreModel.value.defN = profInitModel.value.defN;
      profCreModel.value.useYn = useYn.value;
      if (props.modeScreen === MODE_DETAIL) {
        profCreModel.value.profLearnSeq = props.profId;
        await store.editProf(profCreModel.value);
      } else if (props.modeScreen === MODE_CREATE) {
        profCreModel.value.profLearnSeq = "";
        await store.insertProf(profCreModel.value);
      }
      cmn.setLoading(false);
      if (store.status.data == false) {
        await Swal.fire({
          text: t("02.profLearn.message.duplicate"),
          type: "warning",
          showCancelButton: false,
          confirmButtonText: t("02.profLearn.button.oke"),
        });
      } else {
        await Swal.fire({
          text: t("02.profLearn.message.success"),
          type: "warning",
          showCancelButton: false,
          confirmButtonText: t("02.profLearn.button.oke"),
        });
        await props.getDataAll();
        await closeModal();
      }
    };

    const showAlert = () => {
      if (cmn.check) {
        Swal.fire({
          text: t("common.messageValidateRequired"),
          type: "warning",
          showConfirmButton: false,
          showCancelButton: true,
          cancelButtonText: t("common.cancel"),
        });
      } else {
        Swal.fire({
          text: t("02.profLearn.message.confirmSave"),
          type: "warning",
          showCancelButton: true,
          confirmButtonText: t("02.profLearn.button.save"),
          cancelButtonText: t("02.profLearn.button.cancel"),
        }).then((result) => {
          if (result.isConfirmed) {
            saveOrEdit();
          }
        });
      }
    };
    const clear = () => {
      profInitModel.value.methNm = "";
      profInitModel.value.defN = "";
      profInitModel.value.useYn = "";
      profInitModel.value.regId = "";
      fomatDate.value = "";
      useYn.value = STATUS_YES;
    };

    return {
      t,
      cmn,
      store,
      profInitModel,
      useYn,
      listYn,
      fomatDate,
      messageType,
      getDataById,
      closeModal,
      saveOrEdit,
      showAlert,
      clear,
      modelDetail,
      modelCreate,
    };
  },
});
</script>
