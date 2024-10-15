<template>
  <TModal
    :is-open="isOpen"
    :is-show-header="true"
    :is-show-footer="true"
    @close-modal="closeModal"
  >
    <template #title>
      <strong>{{ t("02.eduCourseTypeMng.modal.modalName") }}</strong>
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
                {{ t("02.eduCourseTypeMng.modal.eduName") }}
              </p>
            </th>
            <td class="td_input">
              <InputBase
                id="'eduName'"
                required
                v-model="eduInitModel.typeNm"
              />
            </td>
          </tr>
          <tr>
            <th scope="row">
              <p class="required">
                {{ t("02.eduCourseTypeMng.modal.content") }}
              </p>
            </th>
            <td class="td_input">
              <TextArea
                v-model="eduInitModel.defN"
                id="textArea_validate"
                placeholder=""
                required
              />
            </td>
          </tr>
          <tr>
            <th scope="row">
              <p>
                {{ t("02.eduCourseTypeMng.modal.useYn") }}
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
            <th scope="row">{{ t("02.eduCourseTypeMng.modal.createdBy") }}</th>
            <td class="td_input">
              <InputBase
                disabled
                :id="'createdBy'"
                v-model="eduInitModel.regId"
              />
            </td>
          </tr>
          <tr v-if="modeScreen === modelDetail">
            <th scope="row">
              {{ t("02.eduCourseTypeMng.modal.createdDate") }}
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
        {{ t("02.eduCourseTypeMng.button.save") }}
      </button>
      <button type="button" class="button btn_md btn_white" @click="closeModal">
        {{ t("02.eduCourseTypeMng.button.close") }}
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
import { eduCourseStore } from "@/stores/eduCourseType";
import { commonStore } from "@/stores/common";
import type {
  EduInitModel,
  EduCreModel,
  EduIdModel,
} from "@/stores/eduCourseType/eduCourse.type";
import Swal from "sweetalert2";
export default defineComponent({
  name: "EduCourseTypeModal",
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    modeScreen: {
      type: String,
      required: true,
    },
    eduCourseTypeId: {
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
    const store = eduCourseStore();
    const eduInitModel = ref<EduInitModel>({});
    const useYn = ref(STATUS_YES);
    const listYn = [
      { id: STATUS_YES, name: t("common.use") },
      { id: STATUS_NO, name: t("common.noUse") },
    ];
    const fomatDate = ref("");
    const eduCreModel = ref<EduCreModel>({});
    const messageType = ref("");
    const eduIdModel = ref<EduIdModel>({});
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
      eduIdModel.value.eduCourseTypeSeq = props.eduCourseTypeId;
      await store.getEduById(eduIdModel.value);
      if (store.status === SUCCSESS_STATUS) {
        eduInitModel.value = store.eduCourse.data;
        useYn.value = eduInitModel.value.useYn;
        fomatDate.value = format(
          new Date(eduInitModel.value.regDate),
          FORMAT_YYY_MM_DD
        );
      }
      cmn.setLoading(false);
    };

    const closeModal = async () => {
      emit("close-modal");
    };

    const saveOrEdit = async () => {
      cmn.setLoading(true);
      eduCreModel.value.typeNm = eduInitModel.value.typeNm;
      eduCreModel.value.defN = eduInitModel.value.defN;
      eduCreModel.value.useYn = useYn.value;
      if (props.modeScreen === MODE_DETAIL) {
        eduCreModel.value.eduCourseTypeSeq = props.eduCourseTypeId;
        await store.editEdu(eduCreModel.value);
      } else if (props.modeScreen === MODE_CREATE) {
        eduCreModel.value.eduCourseTypeSeq = "";
        await store.insertEdu(eduCreModel.value);
      }
      cmn.setLoading(false);
      if (store.status.data == false) {
        await Swal.fire({
          text: t("02.eduCourseTypeMng.message.duplicate"),
          type: "warning",
          showCancelButton: false,
          confirmButtonText: t("02.eduCourseTypeMng.button.oke"),
        });
      } else {
        await Swal.fire({
          text: t("02.eduCourseTypeMng.message.success"),
          type: "warning",
          showCancelButton: false,
          confirmButtonText: t("02.eduCourseTypeMng.button.oke"),
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
          text: t("02.eduCourseTypeMng.message.confirmSave"),
          type: "warning",
          showCancelButton: true,
          confirmButtonText: t("02.eduCourseTypeMng.button.save"),
          cancelButtonText: t("02.eduCourseTypeMng.button.cancel"),
        }).then((result) => {
          if (result.isConfirmed) {
            saveOrEdit();
          }
        });
      }
    };

    const clear = () => {
      eduInitModel.value.typeNm = "";
      eduInitModel.value.defN = "";
      eduInitModel.value.useYn = "";
      eduInitModel.value.regId = "";
      fomatDate.value = "";
      useYn.value = STATUS_YES;
    };

    return {
      t,
      cmn,
      store,
      eduInitModel,
      useYn,
      listYn,
      fomatDate,
      eduCreModel,
      messageType,
      eduIdModel,
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
