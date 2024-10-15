<template>
  <TModal
    :is-open="isOpen"
    :is-show-header="true"
    :is-show-footer="true"
    @close-modal="closeModal"
    :modalId="'modalSurvey'"
  >
    <template #title>
      <strong>{{ t("02.track.crud.popup.title") }}</strong>
    </template>
    <template #default>
      <div class="box">
        <div class="box_section">
          <div class="search_box col_3">
            <ul>
              <li>
                <p>{{ t("02.track.crud.popup.nameSub") }}</p>
                <InputBase :id="'nameSub'" v-model="searchBox.name" />
              </li>
              <li>
                <p>{{ t("02.track.crud.popup.codeSub") }}</p>
                <InputBase :id="'codeSub'" v-model="searchBox.code" />
              </li>
              <li>
                <p>{{ t("02.track.crud.popup.typeSub") }}</p>
                <SelectBoxBase
                  :id="'selectbox'"
                  :name="'selectbox'"
                  :data="listSelectBox"
                  v-model="searchBox.classify"
                ></SelectBoxBase>
              </li>
              <li>
                <p>{{ t("02.track.crud.popup.credit") }}</p>
                <InputBase :id="'credit'" v-model="searchBox.credits" />
              </li>
            </ul>
            <div class="dp_flex btn_group btn_end">
              <button
                type="button"
                class="button btn_xl btn_blue btn_responsive"
                @click="searchClick"
              >
                {{ t("02.track.crud.button.search") }}
              </button>
              <button
                type="button"
                class="button btn_xl btn_lightgray btn_responsive"
                @click="reset()"
              >
                {{ t("02.track.crud.button.reset") }}
              </button>
            </div>
          </div>
        </div>
      </div>
      <GridComponentV2
        :rowData="rowData"
        :columnDefs="columnDefs"
        :pagination="true"
        :paginationPageSize="paginationPageSize"
        :paginationPageSizeSelector="paginationPageSizeSelector"
        ref="gridKey"
        :paginationClientFlag="false"
        @customPagination="fnPagination"
        :totalRecord="totalRows"
        :key="key"
      >
      </GridComponentV2>
    </template>
    <template #footer>
      <button
        type="button"
        class="button btn_xs btn_lightgray btn_responsive"
        @click="closeModal"
      >
        {{ t("02.track.crud.button.close") }}
      </button>
    </template>
  </TModal>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useI18n } from "vue-i18n";
import SelectBoxBase from "../../components/common/input/SelectBoxBase.vue";
import ButtonGridComponent from "../../components/common/grid/ButtonGridComponent.vue";
import GridComponent from "@/components/common/grid/GridComponent.vue";
import {
  SUCCSESS_STATUS,
  PAGINATION_PAGE_SIZE,
  PAGINATION_PAGE_SIZE_SELECTOR,
} from "../../constants/screen.const";
import {} from "../../constants/screen.const";
import { commonStore } from "../../stores/common";
import { trackStore } from "@/stores/trackMng";
import { codeMngStore } from "@/stores/common/codeMng";
import type {
  SubjectDetail,
  SearchSubject,
} from "@/stores/trackMng/trackMng.type";
import type {
  CodeMngRes,
  CodeMngModel,
} from "@/stores/common/codeMng/codeMng.type";
import Swal from "sweetalert2";
import { listSubject } from "@/stores/trackMng/trackMng.service";
import { SUBJECT_TYPE_CD } from "@/constants/common.const";
export default defineComponent({
  name: "TrackModal",
  components: {
    SelectBoxBase,
    ButtonGridComponent,
    GridComponent,
  },
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, { emit }) {
    const { t } = useI18n();
    const store = trackStore();
    const cmn = commonStore();
    const codeStore = codeMngStore();
    const rowSelected = ref<any[]>([]);
    const searchBox = ref<SearchSubject>({
      classify: "",
    });
    const rowData = ref<Array<SubjectDetail>>([]);
    const choiceSubject = ref<SubjectDetail>({});
    const codeMngRes: CodeMngRes = {
      upCdId: SUBJECT_TYPE_CD,
    };
    const listSelectBox = ref<Array<CodeMngModel>>([]);
    const paginationPageSize = PAGINATION_PAGE_SIZE;
    const paginationPageSizeSelector = PAGINATION_PAGE_SIZE_SELECTOR;
    const columnDefs = [
      {
        headerName: t("02.track.crud.popup.nameSub"),
        field: "sbjtNm",
        cellStyle: { textAlign: "center" },
        flex: 1,
      },
      {
        headerName: t("02.track.crud.popup.codeSub"),
        field: "sbjtCd",
        cellStyle: { textAlign: "center" },
        flex: 1,
      },
      {
        headerName: t("02.track.crud.popup.typeSub"),
        field: "sustDivNm",
        cellStyle: { textAlign: "center" },
        flex: 1,
      },
      {
        headerName: t("02.track.crud.popup.credit"),
        field: "acqCredit",
        cellStyle: { textAlign: "center" },
        flex: 1,
      },
      {
        headerName: t("02.track.crud.popup.choice"),
        cellRenderer: "ButtonGridComponent",
        cellRendererParams: (data: any) => {
          return {
            className: "button btn_xs btn_blue btn_responsive",
            onCustomEvent: handleCustomClick,
            value: t("02.track.crud.button.choice"),
          };
        },
        cellStyle: {
          color: "#2704FF",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
      },
    ];

    const closeModal = async () => {
      emit("close-modal");
    };
    const choiceSb = async (data: any) => {
      choiceSubject.value = data;
      emit("select-subject", choiceSubject.value);
      closeModal();
    };
    function handleCustomClick(data: any) {
      Swal.fire({
        text: `교과목 ${data.sbjtNm} 을(를) 선택하시겠어요?`,
        type: "warning",
        showCancelButton: true,
        confirmButtonText: t("02.track.crud.button.choice"),
        cancelButtonText: t("02.track.crud.button.cancel"),
      }).then((result) => {
        if (result.isConfirmed) {
          choiceSb(data);
        }
      });
    }

    return {
      t,
      store,
      cmn,
      listSelectBox,
      rowSelected,
      rowData,
      columnDefs,
      searchBox,
      closeModal,
      codeStore,
      paginationPageSize,
      paginationPageSizeSelector,
      codeMngRes,
    };
  },
  data() {
    return {
      key: 1,
      totalRows: 0,
    };
  },

  beforeMount() {
    try {
      Promise.all([this.getCode()]);
    } catch (e) {
      alert(e);
    }
  },
  methods: {
    searchClick() {
      this.searchBox.page = 1;
      this.key++;
    },
    fnPagination(pageNumber: any, pagesSize: any) {
      this.searchBox.size = pagesSize;
      this.searchBox.page = pageNumber;
      this.searchBox.sort = "";
      this.cmn.setLoading(true);
      listSubject(this.searchBox)
        .then((res) => {
          this.rowData = res.data.data.content;
          this.totalRows = res.data.data.totalElements;
        })
        .finally(() => {
          this.cmn.setLoading(false);
        });
    },
    async getCode() {
      this.cmn.setLoading(true);
      await this.codeStore.getCodeInfo(this.codeMngRes);
      if (this.codeStore && this.codeStore.status == SUCCSESS_STATUS) {
        this.listSelectBox = this.codeStore.codeInfo.data;

        this.listSelectBox.unshift({
          cdId: "",
          upCdId: this.t("02.track.codeMng"),
          cdNm: this.t("common.all"),
        });
      }
      this.cmn.setLoading(false);
    },
    reset() {
      this.searchBox.name = "";
      this.searchBox.code = "";
      this.searchBox.classify = "";
      this.searchBox.credits = "";
      this.searchBox.page = 1;
      this.searchBox.size = this.paginationPageSize;
    },
  },
});
</script>
<style>
.popup_content {
  max-height: 600px;
}
</style>
