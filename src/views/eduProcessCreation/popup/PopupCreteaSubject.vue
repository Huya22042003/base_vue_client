<template>
  <TModal
    :is-open="isOpen"
    :is-show-header="true"
    :is-show-footer="true"
    :modal-id="'PopupCreateSubject'"
    @close-modal="closeModal"
  >
    <!-- Modal content goes here -->
    <template #title>
      <strong>{{
        t(
          "05.eduProcessCreation.subjectProfile.create.modalCreateSubject.title"
        )
      }}</strong>
    </template>
    <template #default>
      <div class="box_section">
        <div class="search_box col_4">
          <ul>
            <li>
              <p>
                {{
                  t(
                    "05.eduProcessCreation.subjectProfile.create.modalCreateSubject.subjectName"
                  )
                }}
              </p>
              <InputBase v-model="searhParms.sbjtNm" />
            </li>
            <li>
              <p>
                {{
                  t(
                    "05.eduProcessCreation.subjectProfile.create.modalCreateSubject.subjectCode"
                  )
                }}
              </p>
              <InputBase v-model="searhParms.sbjtCd" />
            </li>
            <li>
              <p>
                {{
                  t(
                    "05.eduProcessCreation.subjectProfile.create.modalCreateSubject.subjectCategory"
                  )
                }}
              </p>
              <SelectBoxBase
                :id="'selectbox'"
                :name="'selectbox'"
                v-model="searhParms.sustDivCd"
                :data="listSelectBox"
              >
              </SelectBoxBase>
            </li>
            <li>
              <p>
                {{
                  t(
                    "05.eduProcessCreation.subjectProfile.create.modalCreateSubject.credits"
                  )
                }}
              </p>
              <InputBase type="number" v-model="searhParms.credit" />
            </li>
          </ul>
        </div>
      </div>

      <div class="box_section">
        <div class="btn_group btn_end">
          <button
            type="button"
            class="button btn_sm btn_blue btn_responsive"
            @click="search"
          >
            {{ t("common.search") }}
          </button>
          <button
            type="button"
            class="button btn_sm btn_white btn_responsive"
            @click="onReset"
          >
            {{ t("common.reset") }}
          </button>
        </div>
      </div>

      <div class="box_section">
        <GridComponentV2
          :rowData="rowDataService1"
          :columnDefs="columnDefs1"
          :paginationClientFlag="false"
          :totalRecord="pageable.totalElements"
          @customPagination="fnPagination"
          ref="gridKey"
          :key="keyId"
        >
        </GridComponentV2>
      </div>
    </template>
    <template #footer>
      <!-- Footer content goes here -->
      <button
        type="button"
        class="button btn_md btn_medium_gray"
        @click="closeModal"
      >
        확인
      </button>
    </template>
  </TModal>
</template>

<script lang="ts">
import TModal from "@/components/common/modal/TModal.vue";
import { useI18n } from "vue-i18n";
import GridComponentV2 from "@/components/common/grid/GridComponentV2.vue";
import { ref } from "vue";
import BtnGridComponent from "@/components/common/grid/BtnGridComponent.vue";
import InputBase from "@/components/common/input/InputBase.vue";
import SelectBoxBase from "@/components/common/input/SelectBoxBase.vue";
import { defineComponent } from "vue";
import {
  CODE_1064,
  PAGINATION_PAGE_1,
  PAGINATION_PAGE_SIZE,
  SUCCSESS_STATUS,
} from "@/constants/screen.const";
import { commonStore } from "@/stores/common";
import { EduCourseProfileStore } from "@/stores/eduCourseProfile";
import { codeMngStore } from "@/stores/common/codeMng";
import { getListCodeMng } from "@/stores/common/codeMng/codeMng.service";

export default defineComponent({
  props: {
    isOpen: {
      type: Boolean,
      require: true,
    },
    id: {
      type: String,
      require: true,
    },
    sbjtCd: {
      type: String,
      require: true,
    },
  },
  setup: () => {
    const { t } = useI18n();
    const codeStore = codeMngStore();
    const profileStore = EduCourseProfileStore();
    const storeCommon = commonStore();
    const listSelectBox = ref<any>([
      { cdId: "", cdNm: t("common.all"), upCdId: "" },
    ]);

    return { t, listSelectBox, codeStore, profileStore, storeCommon };
  },
  data() {
    return {
      columnDefs1: ref([
        {
          headerName: this.t(
            "05.eduProcessCreation.subjectProfile.create.modalCreateSubject.gridColumn.header1"
          ),
          field: "sbjtNm",
        },
        {
          headerName: this.t(
            "05.eduProcessCreation.subjectProfile.create.modalCreateSubject.gridColumn.header2"
          ),
          field: "sbjtCd",
        },
        {
          headerName: this.t(
            "05.eduProcessCreation.subjectProfile.create.modalCreateSubject.gridColumn.header3"
          ),
          field: "sustDivNm",
        },
        {
          headerName: this.t(
            "05.eduProcessCreation.subjectProfile.create.modalCreateSubject.gridColumn.header4"
          ),
          field: "credit",
        },
        {
          headerName: this.t(
            "05.eduProcessCreation.subjectProfile.create.modalCreateSubject.gridColumn.header5"
          ),
          field: "",
          cellRenderer: BtnGridComponent,
          cellRendererParams: { onCustomEvent: this.handleCustomClick },
          cellStyle: {
            display: "flex",
            alignItems: "center",
            padding: "10px",
          },
        },
      ]),
      rowDataService1: [] as any,
      searhParms: {
        page: PAGINATION_PAGE_1,
        size: PAGINATION_PAGE_SIZE,
        sort: "",
        curSbjtCd: this.sbjtCd || "",
        sbjtCd: "",
        sbjtNm: "",
        sustDivCd: "",
        credit: null,
        eduCourseSeq: this.id || "",
      },
      pageable: {} as any,
      confirmMessage: "",
      confirmButton: "",
      cancelButton: "",
      showCancel: false,
      keyId: 0,
    };
  },
  beforeUnmount() {
    document.removeEventListener("keypress", this.handleKeyPress);
  },
  mounted() {
    document.addEventListener("keypress", this.handleKeyPress);
  },
  beforeMount() {
    Promise.all([this.getCodeList()])
      .then()
      .catch((e) => {
        this.confirmMessage = e.message;
        this.confirmButton = this.t("common.confirm");
        this.showCancel = false;
        this.showAlert(
          () => {},
          () => {}
        );
      });
  },
  methods: {
    async getCodeList() {
      this.storeCommon.setLoading(true);
      const response = await getListCodeMng({ upCdIdList: [CODE_1064] });
      if (response.status == SUCCSESS_STATUS) {
        let codeList = response.data.data;
        codeList.forEach((element: any) => {
          this.listSelectBox.push(element);
        });
      }
      this.storeCommon.setLoading(false);
    },
    async getAll() {
      try {
        this.storeCommon.setLoading(true);
        await this.profileStore.getEduCourseSbjt(this.searhParms);
        if (
          this.profileStore.SbjtResModelPage &&
          this.profileStore.status == SUCCSESS_STATUS
        ) {
          this.pageable = this.profileStore.SbjtResModelPage;
          this.rowDataService1 = this.pageable.content;
        }
      } catch (error: any) {
        this.confirmMessage = error.message;
        this.confirmButton = this.t("common.confirm");
        this.showCancel = false;
        this.showAlert(
          () => {},
          () => {}
        );
      } finally {
        this.storeCommon.setLoading(false);
      }
    },
    search() {
      this.keyId++;
    },
    fnPagination(pageNumber: any, pagesSize: any) {
      this.searhParms.size = pagesSize;
      this.searhParms.page = pageNumber;

      this.getAll();
    },
    handleCustomClick(item: any) {
      this.$emit("selectSubject", item);
    },
    closeModal() {
      this.$emit("closeModalCreate");
    },
    handleKeyPress(event: any) {
      if (
        event.key === "Enter" &&
        (this.searhParms.sbjtCd != "" ||
          this.searhParms.sbjtNm != "" ||
          this.searhParms.credit != "" ||
          this.searhParms.sustDivCd != "")
      ) {
        event.preventDefault();
        this.search();
      }
    },
    onReset() {
      this.searhParms.sbjtCd = "";
      this.searhParms.sbjtNm = "";
      this.searhParms.credit = null;
      this.searhParms.sustDivCd = "";
    },
    showAlert(callBackConfirm: Function, callBackCancel: Function) {
      this.swal({
        text: this.confirmMessage,
        type: "warning",
        showCancelButton: this.showCancel,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: this.confirmButton,
        cancelButtonText: this.cancelButton,
      }).then((result: any) => {
        if (result.isConfirmed) {
          callBackConfirm();
        }
        if (result.isDismissed) {
          callBackCancel();
        }
      });
    },
  },
});
</script>

<style scoped></style>
