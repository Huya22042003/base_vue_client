<template>
  <TModal
    :is-open="isOpen"
    :is-show-header="true"
    :is-show-footer="true"
    @close-modal="closeModal"
  >
    <template #title>
      <strong>{{ t("02.learnAbilytiMng.modal.modalName") }}</strong>
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
                {{ t("02.learnAbilytiMng.modal.learnName") }}
              </p>
            </th>
            <td class="td_input">
              <InputBase
                id="'learnName'"
                v-model="learnInitModel.learnAbilityNm"
              />
            </td>
          </tr>
          <tr>
            <th scope="row">
              <p class="required">
                {{ t("02.learnAbilytiMng.modal.content") }}
              </p>
            </th>
            <td class="td_input">
              <TextArea
                v-model="learnInitModel.defN"
                id="textArea_validate"
                placeholder=""
                required
              />
            </td>
          </tr>
          <tr>
            <th scope="row">
              <p>
                {{ t("02.learnAbilytiMng.modal.useYn") }}
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
            <th scope="row">{{ t("02.learnAbilytiMng.modal.createdBy") }}</th>
            <td class="td_input">
              <InputBase
                disabled
                :id="'createdBy'"
                v-model="learnInitModel.regId"
              />
            </td>
          </tr>
          <tr v-if="modeScreen === 'detail'">
            <th scope="row">
              {{ t("02.learnAbilytiMng.modal.createdDate") }}
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
        v-if="modeScreen === 'detail'"
        type="button"
        class="button btn_xs btn_blue btn_responsive"
        @click="showAlert()"
        :disabled="!isCheck"
      >
        {{ t("02.learnAbilytiMng.button.save") }}
      </button>
      <button
        v-if="modeScreen === 'create'"
        type="button"
        class="button btn_xs btn_blue btn_responsive"
        :disabled="!isCheck"
        @click="showAlert()"
      >
        {{ t("02.learnAbilytiMng.button.save") }}
      </button>
      <button
        type="button"
        class="button btn_sm btn_white bo_rd6"
        @click="closeModal"
      >
        {{ t("02.learnAbilytiMng.button.close") }}
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
import { learnAbilityStore } from "@/stores/learnAbility";
import { commonStore } from "@/stores/common";
import type {
  LearnInitModel,
  LearnCreModel,
  LearnIdModel,
} from "@/stores/learnAbility/learnAbility.type";
import Swal from "sweetalert2";
export default defineComponent({
  name: "LearnAbilytiModal",
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    modeScreen: {
      type: String,
      required: true,
    },
    learnId: {
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
    const store = learnAbilityStore();
    const learnInitModel = ref<LearnInitModel>({});
    const useYn = ref(STATUS_YES);
    const listYn = [
      { id: STATUS_YES, name: t("02.common.yesUse") },
      { id: STATUS_NO, name: t("02.common.noUse") },
    ];
    const fomatDate = ref("");
    const learnCreModel = ref<LearnCreModel>({});
    const messageType = ref("");
    const isCheck = ref(false);
    const learnId = ref<LearnIdModel>({});

    watch(
      () => props.isOpen,
      (newVal) => {
        if (newVal && props.modeScreen === MODE_DETAIL) {
          getDataById();
        }
        clear();
      }
    );

    watch(
      () => learnInitModel.value,
      () => {
        checkValid();
      },
      { deep: true }
    );

    const getDataById = async () => {
      cmn.setLoading(true);
      try {
        learnId.value.learnAbilitySeq = props.learnId;
        await store.getLearnById(learnId.value);
        if (store.status === SUCCSESS_STATUS) {
          learnInitModel.value = store.learnAbility.data;
          useYn.value = learnInitModel.value.useYn;
          fomatDate.value = format(
            new Date(learnInitModel.value.regDate),
            FORMAT_YYY_MM_DD
          );
        }
      } catch (error) {
      } finally {
        cmn.setLoading(false);
      }
    };

    const closeModal = async () => {
      emit("close-modal");
    };

    const saveOrEdit = async () => {
      cmn.setLoading(true);
      try {
        learnCreModel.value.learnAbilityNm =
          learnInitModel.value.learnAbilityNm;
        learnCreModel.value.defN = learnInitModel.value.defN;
        learnCreModel.value.useYn = useYn.value;
        if (props.modeScreen === MODE_DETAIL) {
          learnCreModel.value.learnAbilitySeq = props.learnId;
          await store.editLearn(learnCreModel.value);
        } else if (props.modeScreen === MODE_CREATE) {
          await store.insertLearn(learnCreModel.value);
        }
        if (
          store.status === SUCCSESS_STATUS ||
          store.status === CREATED_STATUS
        ) {
          await Swal.fire({
            text: t("02.learnAbilytiMng.message.success"),
            type: "warning",
            showCancelButton: false,
            confirmButtonText: t("02.learnAbilytiMng.button.oke"),
          });
          await props.getDataAll();
          await closeModal();
        }
      } catch (error) {
      } finally {
        cmn.setLoading(false);
      }
    };

    const showAlert = () => {
      Swal.fire({
        text: t("02.learnAbilytiMng.message.confirmSave"),
        type: "warning",
        showCancelButton: true,
        confirmButtonText: t("02.learnAbilytiMng.button.save"),
        cancelButtonText: t("02.learnAbilytiMng.button.cancel"),
      }).then((result) => {
        if (result.isConfirmed) {
          saveOrEdit();
        }
      });
    };

    const clear = () => {
      learnInitModel.value.learnAbilityNm = "";
      learnInitModel.value.defN = "";
      learnInitModel.value.useYn = "";
      learnInitModel.value.regId = "";
      fomatDate.value = "";
      useYn.value = STATUS_YES;
    };

    const checkValid = () => {
      isCheck.value =
        !!learnInitModel.value.learnAbilityNm && !!learnInitModel.value.defN;
    };

    return {
      t,
      cmn,
      store,
      learnInitModel,
      useYn,
      listYn,
      fomatDate,
      learnCreModel,
      messageType,
      isCheck,
      learnInitModel,
      getDataById,
      closeModal,
      saveOrEdit,
      showAlert,
      clear,
      checkValid,
    };
  },
});
</script>
