<template>
  <div class="page_wrapper">
    <section id="content" class="content_wrapper grid_content" tabindex="0">
      <Breadcrumb :pageTitle="pageTitle" :breadcrumbItems="breadcrumbItems" />
      <div class="box dp_block">
        <div class="box_section">
          <div class="search_box col_3">
            <ul>
              <li>
                <p class="ta_c">{{ t("09.questAndAns.searchBox.category") }}</p>
                <InputBase :id="'content'" v-model="searchModel.qusTtl" />
              </li>
              <li>
                <p class="ta_c">{{ t("09.questAndAns.searchBox.status") }}</p>
                <SelectBoxBase
                  :id="'selectbox'"
                  :name="'selectbox'"
                  :data="listSelectBox"
                  v-model="searchModel.stsCd"
                ></SelectBoxBase>
              </li>
              <li>
                <p class="ta_c">{{ t("09.questAndAns.searchBox.regBy") }}</p>
                <InputBase :id="'regBy'" v-model="searchModel.regId" />
              </li>
              <li>
                <p class="ta_c">{{ t("09.questAndAns.searchBox.ansBy") }}</p>
                <InputBase :id="'ansBy'" v-model="searchModel.ansId" />
              </li>
              <li>
                <p class="ta_c">{{ t("09.questAndAns.searchBox.regDate") }}</p>
                <BaseDatePicker :placeholder="'시작일'" v-model="startDate" />
                ~
                <BaseDatePicker :placeholder="'종료일'" v-model="endDate" />
              </li>
            </ul>
            <div class="search_btnarea">
              <button
                type="button"
                class="btn_round btn_lg btn_primary mg_l10"
                @click="searchClick()"
              >
                {{ t("common.search") }}
              </button>
              <button
                type="button"
                class="btn_round btn_lg btn_gray mg_l5"
                @click="reset()"
              >
                {{ t("common.reset") }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="box">
        <div class="box_section">
          <GridComponentV2
            :rowData="rowData"
            :columnDefs="columnDefs"
            :pagination="true"
            :paginationPageSize="paginationPageSize"
            :paginationPageSizeSelector="paginationPageSizeSelector"
            ref="grid"
            :paginationClientFlag="false"
            @customPagination="fnPagination"
            :totalRecord="totalRows"
            :key="key"
          >
          </GridComponentV2>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import SelectBoxBase from "../../components/common/input/SelectBoxBase.vue";
import InputBase from "../../components/common/input/InputBase.vue";
import GridComponent from "../../components/common/grid/GridComponent.vue";
import BaseDatePicker from "@/components/common/datepicker/BaseDatePicker.vue";
import {
  PAGINATION_PAGE_SIZE,
  PAGINATION_PAGE_SIZE_SELECTOR,
  MODE_DETAIL,
  SUCCSESS_STATUS,
  FORMAT_YYY_MM_DD,
  CODE_QNA,
} from "../../constants/screen.const";
import LinkGridComponent from "../../components/common/grid/LinkGridComponent.vue";
import { SCREEN } from "../../router/screen";
import { commonStore } from "../../stores/common";
import { codeMngStore } from "../../stores/common/codeMng";
import type { SearchModelQa, QnaModelList } from "@/stores/qna/qna.type";
import type {
  CodeMngRes,
  CodeMngModel,
} from "@/stores/common/codeMng/codeMng.type";
import { format } from "date-fns";
import { list } from "@/stores/qna/qna.service";
import Swal from "sweetalert2";

export default defineComponent({
  name: "QnaList",
  components: {
    Breadcrumb,
    SelectBoxBase,
    InputBase,
    GridComponent,
    LinkGridComponent,
    BaseDatePicker,
  },
  setup() {
    const { t } = useI18n();
    const router = useRouter();
    const cmn = commonStore();
    const codeStore = codeMngStore();
    const pageTitle = t("09.questAndAns.title");
    const breadcrumbItems = [
      { label: "HOME", link: "/" },
      { label: "", link: "#" },
      { label: "", link: "#" },
    ];
    const rowSelected = ref<any[]>([]);
    const data = ref<Array<QnaModelList>>([]);
    const rowData = ref<Array<QnaModelList>>([]);
    const searchModel = ref<SearchModelQa>({
      stsCd: "",
    });
    const paginationPageSize = PAGINATION_PAGE_SIZE;
    const paginationPageSizeSelector = PAGINATION_PAGE_SIZE_SELECTOR;
    const listSelectBox = ref<Array<CodeMngModel>>([]);
    const startDate = ref("");
    const endDate = ref("");
    const codeMngRes: CodeMngRes = {
      upCdId: CODE_QNA,
    };
    const columnDefs = [
      {
        headerName: t("09.questAndAns.table.rowNum"),
        field: "rowNumber",
        cellStyle: { textAlign: "center" },
        flex: 1,
      },
      {
        headerName: t("09.questAndAns.table.category"),
        field: "qusTtl",
        cellRenderer: "LinkGridComponent",
        cellRendererParams: {
          onCustomEvent: handleCustomClick,
        },
        cellStyle: {
          color: "#2704FF",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
        flex: 3,
      },
      {
        headerName: t("09.questAndAns.table.status"),
        field: "stsCd",
        cellStyle: { textAlign: "center" },
        flex: 1,
      },
      {
        headerName: t("09.questAndAns.table.regBy"),
        field: "regId",
        cellStyle: { textAlign: "center" },
        flex: 1,
      },
      {
        headerName: t("09.questAndAns.table.regDate"),
        field: "regDate",
        cellStyle: { textAlign: "center" },
        flex: 2,
      },
      {
        headerName: t("09.questAndAns.table.ansBy"),
        field: "ansId",
        cellStyle: { textAlign: "center" },
        flex: 1,
      },
      {
        headerName: t("09.questAndAns.table.ansDateLast"),
        field: "ansDate",
        cellStyle: { textAlign: "center" },
        flex: 2,
      },
    ];
    function handleCustomClick(data: any) {
      router.push({
        name: SCREEN.crudAns.name,
        params: { mode: MODE_DETAIL },
        state: {
          id: data.qnaSeq,
        },
      });
    }
    return {
      t,
      router,
      breadcrumbItems,
      cmn,
      rowSelected,
      pageTitle,
      columnDefs,
      searchModel,
      paginationPageSize,
      paginationPageSizeSelector,
      rowData,
      data,
      codeStore,
      listSelectBox,
      codeMngRes,
      startDate,
      endDate,
    };
  },
  beforeMount() {
    try {
      Promise.all([this.getCode()]);
    } catch (e) {
      alert(e);
    }
  },
  data() {
    return {
      key: 1,
      totalRows: 0,
    };
  },

  methods: {
    searchClick() {
      this.searchModel.page = 1;
      this.key++;
    },
    fnPagination(pageNumber: any, pagesSize: any) {
      this.searchModel.size = pagesSize;
      this.searchModel.page = pageNumber;
      this.searchModel.sort = "";
      this.cmn.setLoading(true);
      this.searchModel.startDate = this.startDate;
      this.searchModel.endDate = this.endDate;
      list(this.searchModel)
        .then((res) => {
          this.rowData = res.data.data.content;
          this.totalRows = res.data.data.totalElements;
          this.rowData.forEach((item, index) => {
            item.rowNumber = this.totalRows - item.rowNumber + 1;
            item.regDate = format(new Date(item.regDate), FORMAT_YYY_MM_DD);
            if (item.ansDate != null) {
              item.ansDate = format(new Date(item.ansDate), FORMAT_YYY_MM_DD);
            }
          });
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
          upCdId: this.t("09.questAndAns.codeMng"),
          cdNm: this.t("common.all"),
        });
      }
      this.cmn.setLoading(false);
    },

    reset() {
      this.searchModel.qusTtl = "";
      this.searchModel.regId = "";
      this.startDate = "";
      this.endDate = "";
      this.searchModel.stsCd = "";
      this.searchModel.ansId = "";
    },

    formatDate(date: any) {
      const originalDate = new Date(date);
      const year = originalDate.getFullYear();
      const month = String(originalDate.getMonth() + 1).padStart(2, "0");
      const day = String(originalDate.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
  },
  watch: {
    startDate(newValue) {
      if (!this.endDate) {
        this.startDate = newValue;
      } else {
        const dStart = this.formatDate(newValue);
        const dEnd = this.formatDate(this.endDate);
        if (dStart > dEnd) {
          this.$nextTick(() => {
            this.startDate = this.endDate;
            Swal.fire({
              text: this.t("common.messageCheckDate"),
              type: "warning",
              showCancelButton: true,
              showConfirmButton: false,
              cancelButtonText: this.t("common.cancel"),
            });
          });
        }
      }
    },
    endDate(newValue) {
      if (!this.startDate) {
        this.endDate = newValue;
      } else {
        const dStart = this.formatDate(this.startDate);
        const dEnd = this.formatDate(newValue);
        if (dStart > dEnd) {
          this.$nextTick(() => {
            this.endDate = this.startDate;
            Swal.fire({
              text: this.t("common.messageCheckDate"),
              type: "warning",
              showCancelButton: true,
              showConfirmButton: false,
              cancelButtonText: this.t("common.cancel"),
            });
          });
        }
      }
    },
  },
});
</script>
