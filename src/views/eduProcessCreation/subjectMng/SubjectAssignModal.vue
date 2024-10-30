<template>
  <TModal
    :is-open="isOpen"
    :is-show-header="true"
    :is-show-footer="true"
    :modal-id="'CompositionSelectModal'"
    @close-modal="onClose()"
  >
    <template #title>
      <strong>{{
        type === 1
          ? t("eduProcessCreation.subjectMng.modal.titleBefore")
          : t("eduProcessCreation.subjectMng.modal.titleAfter")
      }}</strong>
    </template>
    <template #default>
      <div class="search_section">
        <div class="search_box col_3">
          <ul>
            <li>
              <p class="ta_c">{{
                t("eduProcessCreation.subjectMng.modal.title2")
              }}</p>
              <InputBase v-model="dataSearch.sbjtNm" />
            </li>
            <li>
              <p class="ta_c">{{
                t("eduProcessCreation.subjectMng.modal.title3")
              }}</p>
              <InputBase v-model="dataSearch.sbjtCd" />
            </li>
            <li>
              <p class="ta_c">{{
                t("eduProcessCreation.subjectMng.modal.title4")
              }}</p>
                <SelectBoxBase
                  :id="'selectbox'"
                  :name="'selectbox'"
                  :data="listSustDivCd"
                  v-model="dataSearch.sustDivCd"
                >
                </SelectBoxBase>
            </li>
            <li>
              <p class="ta_c">{{
                t("eduProcessCreation.subjectMng.modal.title5")
              }}</p>
                <InputBase v-model="dataSearch.acqGpa" />
            </li>
            <li>
              <p class="ta_c">{{
                t("eduProcessCreation.subjectMng.modal.title6")
              }}</p>
                <InputBase v-model="dataSearch.totalHrs" />
            </li>
            <li>
              <p class="ta_c">{{
                t("eduProcessCreation.subjectMng.modal.title7")
              }}</p>
                <InputBase v-model="dataSearch.thryHrs" />
            </li>
            <li>
              <p class="ta_c">{{
                t("eduProcessCreation.subjectMng.modal.title8")
              }}</p>
                <InputBase v-model="dataSearch.pracHrs" />
            </li>
          </ul>
          <div class="search_btnarea">
            <button
              type="button"
              class="btn_round btn_lg btn_primary mg_l10"
              @click="search"
            >
              {{ t("common.search") }}
            </button>
            <button
              type="button"
              class="btn_round btn_lg btn_gray mg_l5"
              @click="reset"
            >
              {{ t("common.reset") }}
            </button>
          </div>
        </div>
      </div>
      <div>
        <GridComponentV2
          :rowData="data"
          :columnDefs="columnDefs"
          :paginationClientFlag="false"
          :key="key"
          :paginationPageSize="paginationPageSize"
          :paginationPageSizeSelector="paginationPageSizeSelector"
          :totalRecord="totalRecord"
          @customPagination="fnPagination"
          ref="gridKey"
        >
          <template #button> </template>
        </GridComponentV2>
      </div>
    </template>
    <template #footer>
      <button
        type="button"
        class="button btn_xl btn_white popup_close"
        @click="onClose()"
      >
        {{ t("common.close") }}
      </button>
    </template>
  </TModal>
</template>
<script lang="ts">
import ButtonGridComponent from "@/components/common/grid/ButtonGridComponent.vue";
import GridComponentV2 from "@/components/common/grid/GridComponentV2.vue";
import InputBase from "@/components/common/input/InputBase.vue";
import {
  PAGINATION_PAGE_SIZE,
  PAGINATION_PAGE_SIZE_SELECTOR,
} from "../../../constants/screen.const";
import { commonStore } from "../../../stores/common";
import {
  getSubMngSbjtInfoListDTO,
} from "../../../stores/eduProcessCreation/subjectMng/subjectMng.service";
import {
  SubMngSbjtInfoSearchModel,
} from "../../../stores/eduProcessCreation/subjectMng/subjectMng.type";
import { format } from "date-fns";
import { FORMAT_YYY_MM_DD } from "../../../constants/screen.const";
import {
  getCodeMngByUpCdId,
} from "../../../stores/common/codeMng/codeMng.service";
import {
  UP_CD_ID_SUST_DIV_CD,
} from "../../../constants/common.const";

export default {
  components: {
    ButtonGridComponent,
    GridComponentV2,
    InputBase,
  },
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    onClose: {
      type: Function,
      required: true,
    },
    type: {
      type: Number,
      default: 1,
    },
  },
  setup: (props) => {
    const router = useRouter();
    const storeCommon = commonStore();
    const { t } = useI18n();
    const id = window.history.state.id;

    return { router, storeCommon, t, id };
  },
  data() {
    return {
      paginationPageSize: PAGINATION_PAGE_SIZE,
      paginationPageSizeSelector: PAGINATION_PAGE_SIZE_SELECTOR,
      totalRecord: 0,
      dataSearch: {
        sbjtCd: "",
        sbjtNm: "",
        acqGpa: "",
        sustDivCd: "",
        totalHrs: "",
        thryHrs: "",
        pracHrs: "",
        eduCourseSeq: this.id,
        page: 1,
        size: PAGINATION_PAGE_SIZE,
        sort: "",
        type: this.type === 1 ? "before" : "after",
        listSbjtCd: [],
      } as unknown as SubMngSbjtInfoSearchModel,
      data: [],
      key: 0,
      listSustDivCd: [{ cdId: "", cdNm: this.t("common.all") }] as Array<any>,
      columnDefs: ref([
        {
          headerName: this.t("eduProcessCreation.subjectMng.modal.column1"),
          field: "sbjtNm",
          cellStyle: {
            textAlign: "center",
          },
        },
        {
          headerName: this.t("eduProcessCreation.subjectMng.modal.column2"),
          field: "sbjtCd",
          cellStyle: {
            textAlign: "center",
          },
        },
        {
          headerName: this.t("eduProcessCreation.subjectMng.modal.column3"),
          field: "sustDivNm",
          cellStyle: {
            textAlign: "center",
          },
        },
        {
          headerName: this.t("eduProcessCreation.subjectMng.modal.column4"),
          field: "acqGpa",
          cellStyle: {
            textAlign: "center",
          },
        },
        {
          headerName: this.t("eduProcessCreation.subjectMng.modal.column5"),
          field: "totalHrs",
          cellStyle: {
            textAlign: "center",
          },
        },
        {
          headerName: this.t("eduProcessCreation.subjectMng.modal.column6"),
          field: "thryHrs",
          cellStyle: {
            textAlign: "center",
          },
        },
        {
          headerName: this.t("eduProcessCreation.subjectMng.modal.column7"),
          field: "pracHrs",
          cellStyle: {
            textAlign: "center",
          },
        },
        {
          headerName: this.t("eduProcessCreation.subjectMng.modal.column8"),
          field: "regDate",
          cellStyle: {
            textAlign: "center",
          },
        },
        {
          headerName: this.t("eduProcessCreation.subjectMng.modal.column9"),
          cellRenderer: ButtonGridComponent,
          cellRendererParams: {
            onCustomEvent: this.onSelected,
            value: "선택",
            className: "btn_round btn_sm btn_white",
          },
          cellStyle: {
            textAlign: "center",
          },
        },
      ]),
    };
  },
  beforeMount() {
    this.getCodeForm();
  },
  methods: {
    getCodeForm() {
      getCodeMngByUpCdId({ upCdId: UP_CD_ID_SUST_DIV_CD }).then((response) => {
        response.data.data.forEach((element) => {
          this.listSustDivCd.push(element);
        });
      });
    },
    getAllSubject() {
      this.storeCommon.setLoading(true);
      getSubMngSbjtInfoListDTO(this.dataSearch)
        .then((res: any) => {
          this.totalRecord = res.data.data.totalElements;
          this.data = res.data.data.content.map((item: any) => {
            item.regDate = item.regDate
              ? format(item.regDate, FORMAT_YYY_MM_DD)
              : "";
            return item;
          });
        })
        .finally(() => {
          this.storeCommon.setLoading(false);
        });
    },
    fnPagination(pageNumber: any, pagesSize: any) {
      this.dataSearch.page = pageNumber;
      this.dataSearch.size = pagesSize;
      this.getAllSubject();
    },
    search() {
      this.getAllSubject();
    },
    reset() {
      this.dataSearch = {
        sbjtCd: "",
        sbjtNm: "",
        acqGpa: "",
        sustDivCd: "",
        totalHrs: "",
        thryHrs: "",
        pracHrs: "",
        eduCourseSeq: this.id,
        page: 1,
        size: PAGINATION_PAGE_SIZE,
        sort: "",
        type: "before",
        listSbjtCd: [],
      } as unknown as SubMngSbjtInfoSearchModel;
    },
    onSelected(data: any) {
      this.$confirm(
        `${data.sbjtNm}를 선택하시겠어요?`,
        "",
        (isConfirm: Boolean) => {
          if (isConfirm) {
            this.$emit("dataSelect", data);
            this.onClose();
          }
        }
      );
    },
  },
};
</script>
<style scoped>
.text_blue {
  color: #0029ff;
}
.popup_content {
  overflow-x: auto;
}
.search_box.col_3 > ul > li > p:first-child {
    width: 60px;
}
</style>
