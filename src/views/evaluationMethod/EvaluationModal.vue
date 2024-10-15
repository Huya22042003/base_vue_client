<template>
  <TModal
    :is-open="isOpen"
    :is-show-header="true"
    :is-show-footer="true"
    @close-modal="closeModal"
  >
    <template #title>
      <strong>{{ t("02.evaluationMethodMng.modal.modalName") }}</strong>
    </template>
    <template #default>
      <table class="tbl_row">
        <colgroup>
          <col style="width: 25%" />
        </colgroup>
        <tbody>
          <tr>
            <th scope="row">
              <p class="required">
                {{ t("02.evaluationMethodMng.modal.evalName") }}
              </p>
            </th>
            <td class="td_input">
              <InputBase
                id="'evalName'"
                required
                v-model="evalMethodModel.methNm"
              />
            </td>
          </tr>
          <tr>
            <th scope="row">
              <p class="required">
                {{ t("02.evaluationMethodMng.modal.content") }}
              </p>
            </th>
            <td class="td_input">
              <TextArea
                v-model="evalMethodModel.defN"
                id="textArea_validate"
                placeholder=""
                required
              />
            </td>
          </tr>
          <tr>
            <th scope="row">
              <p>
                {{ t("02.evaluationMethodMng.modal.useYn") }}
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
          <tr v-if="modeScreen === 'detail'">
            <th scope="row">
              {{ t("02.evaluationMethodMng.modal.createdBy") }}
            </th>
            <td class="td_input">
              <InputBase
                disabled
                :id="'createdBy'"
                v-model="evalMethodModel.regId"
              />
            </td>
          </tr>
          <tr v-if="modeScreen === 'detail'">
            <th scope="row">
              {{ t("02.evaluationMethodMng.modal.createdDate") }}
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
        {{ t("02.evaluationMethodMng.button.save") }}
      </button>
      <button type="button" class="button btn_md btn_white" @click="closeModal">
        {{ t("02.evaluationMethodMng.button.close") }}
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
  CREATED_STATUS,
} from "../../constants/screen.const";
import { STATUS_YES, STATUS_NO } from "../../constants/common.const";
import { evalMethodStore } from "@/stores/evalMethod";
import { commonStore } from "@/stores/common";
import type {
  EvalInitModel,
  EvalCreModel,
  EvalIdModel,
} from "@/stores/evalMethod/evalMethod.type";
import Swal from "sweetalert2";
export default defineComponent({
  name: "EvaluationModal",
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    modeScreen: {
      type: String,
      required: true,
    },
    evaluationId: {
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
    const store = evalMethodStore();
    const evalMethodModel = ref<EvalInitModel>({} as EvalInitModel);
    const useYn = ref(STATUS_YES);
    const listYn = [
      { id: STATUS_YES, name: t("common.use") },
      { id: STATUS_NO, name: t("common.noUse") },
    ];
    const fomatDate = ref("");
    const evalCreModel = ref<EvalCreModel>({});
    const messageType = ref("");
    const evalIdModel = ref<EvalIdModel>({});
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
      evalIdModel.value.evalMethSeq = props.evaluationId;
      await store.getEvalById(evalIdModel.value);
      if (store.status === SUCCSESS_STATUS) {
        evalMethodModel.value = store.evalMethod.data;
        useYn.value = evalMethodModel.value.useYn;
        fomatDate.value = format(
          new Date(evalMethodModel.value.regDate),
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
      evalCreModel.value.methNm = evalMethodModel.value.methNm;
      evalCreModel.value.defN = evalMethodModel.value.defN;
      evalCreModel.value.useYn = useYn.value;
      if (props.modeScreen === MODE_DETAIL) {
        evalCreModel.value.evalMethSeq = props.evaluationId;
        await store.editEval(evalCreModel.value);
      } else if (props.modeScreen === MODE_CREATE) {
        evalCreModel.value.evalMethSeq = "";
        await store.insertEval(evalCreModel.value);
      }
      cmn.setLoading(false);

      if (store.status.data == false) {
        await Swal.fire({
          text: t("02.evaluationMethodMng.message.duplicate"),
          type: "warning",
          showCancelButton: false,
          confirmButtonText: t("02.evaluationMethodMng.button.oke"),
        });
      } else {
        await Swal.fire({
          text: t("02.evaluationMethodMng.message.success"),
          type: "warning",
          showCancelButton: false,
          confirmButtonText: t("02.evaluationMethodMng.button.oke"),
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
          text: t("02.evaluationMethodMng.message.confirmSave"),
          type: "warning",
          showCancelButton: true,
          confirmButtonText: t("02.evaluationMethodMng.button.save"),
          cancelButtonText: t("02.evaluationMethodMng.button.cancel"),
        }).then((result) => {
          if (result.isConfirmed) {
            saveOrEdit();
          }
        });
      }
    };

    const clear = () => {
      evalMethodModel.value.methNm = "";
      evalMethodModel.value.defN = "";
      evalMethodModel.value.useYn = "";
      evalMethodModel.value.regId = "";
      fomatDate.value = "";
      useYn.value = STATUS_YES;
    };

    return {
      t,
      cmn,
      store,
      evalMethodModel,
      useYn,
      listYn,
      fomatDate,
      evalCreModel,
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
