<template>
  <THeader />
  <div class="page_wrapper">
    <section id="content" class="content_wrapper grid_content" tabindex="0">
      <Breadcrumb
        :pageTitle="pageTitle"
        :breadcrumbItems="breadcrumbItems"
      ></Breadcrumb>
      <div class="box dp_block">
        <div class="box_section">
          <div class="search_box col_3">
            <ul>
              <li>
                <p>{{ t("02.learnAbility.core") }}</p>
                <InputBase
                  name="name"
                  mode="show"
                  v-model="abiSearch.learnNmSearch"
                ></InputBase>
              </li>
              <li>
                <p>{{ t("02.learnAbility.child") }}</p>
                <InputBase
                  name="title"
                  mode="show"
                  v-model="abiSearch.childNmSearch"
                ></InputBase>
              </li>
              <li>
                <p>{{ t("02.generalFactorLearn.status") }}</p>
                <RadiobuttonBase
                  v-for="itemRadio in codeRadio"
                  :mode="'show'"
                  :value="itemRadio.cdId"
                  v-model="written"
                  :id="itemRadio.cdId"
                  :label="itemRadio.cdNm"
                  :checked="itemRadio.cdId === typeAll"
                >
                </RadiobuttonBase>
              </li>
            </ul>
            <div class="search_btnarea">
              <button type="button" class="button btn_xl btn_blue btn_responsive" @click="search">
                {{ t("common.search") }}
              </button>
              <button
                type="button"
                class="button btn_xl btn_lightgray btn_responsive"
                @click="reset"
              >
                {{ t("common.reset") }}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="box dp_block">
        <div class="box_inner">
          <div class="flex justify-between">
            <div class="box_title mb-0">
                <p class="box_title_sm note_custom">
                  {{ t("02.generalFactorLearn.textRed") }}
                </p>
            </div>
          </div>
          <GridComponentV2
            :rowData="coreChildList"
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
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import THeader from "@/layouts/components/THeader.vue";
import TFooter from "@/layouts/components/TFooter.vue";
import { commonStore } from "@/stores/common";
import { ref } from "vue";
import LoaddingComponent from "@/components/common/loading/LoaddingComponent.vue";
import {
  PAGINATION_PAGE_SIZE_SELECTOR,
  PAGINATION_PAGE_SIZE,
} from "@/constants/screen.const";
import GridComponentV2 from "@/components/common/grid/GridComponentV2.vue";
import { SUCCSESS_STATUS } from "@/constants/screen.const";
import { format } from "date-fns";
import { codeMngStore } from "@/stores/common/codeMng";
import { CodeMngModel } from "@/stores/common/codeMng/codeMng.type";
import LinkGridComponent from "@/components/common/grid/LinkGridComponent.vue";
import { SCREEN } from "@/router/screen";
import { learnComStore } from "@/stores/learnAbilityElem";
import {
  LearnComponentRes,
  LearnComponentSearch,
} from "@/stores/learnAbilityElem/learnCom.type";
import { STATUS_ALL, STATUS_NO, STATUS_YES } from "@/constants/common.const";
import { FORMAT_YYY_MM_DD } from "@/constants/screen.const";
import { PAGE_IN_GROUP } from "@/constants/screen.const";

export default defineComponent({
  components: {
    TFooter,
    THeader,
    Breadcrumb,
    LoaddingComponent,
    GridComponentV2,
  },
  data() {
    return {
      pageTitle: this.t("02.generalFactorLearn.pageTitle"),
      breadcrumbItems: [
        { label: this.t("common.home"), link: "/" },
        { label: this.t("02.learnAbility.menu"), link: "#" },
        {
          label: this.t("02.generalFactorLearn.pageTitle"),
          link: SCREEN.learnComponent.path,
        },
      ],
      picker1: new Date(),
      parentListObject: [],
      paginationPageSize: PAGINATION_PAGE_SIZE,
      paginationPageSizeSelector: PAGINATION_PAGE_SIZE_SELECTOR,
      columnDefs: ref([
        {
          headerName: this.t("02.learnAbility.core"),
          field: "learnAbilityNm",
          cellStyle: {
            textAlign: "center",
          },
        },
        {
          headerName: this.t("02.learnAbility.child"),
          field: "chldAbilityNm",
          cellRenderer: LinkGridComponent,
          cellRendererParams: {
            onCustomEvent: this.handleCustomClick,
          },
          cellStyle: {
            color: "#2704FF",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          },
        },
        {
          headerName: this.t("02.generalFactorLearn.status"),
          field: "status",
          cellStyle: {
            textAlign: "center",
          },
        },
        {
          headerName: this.t("02.generalFactorLearn.regId"),
          field: "regId",
          cellStyle: {
            textAlign: "center",
          },
        },
        {
          headerName: this.t("02.generalFactorLearn.regDate"),
          field: "createDate",
          cellStyle: {
            textAlign: "center",
          },
        },
      ]),
      coreChildList: [] as Array<LearnComponentRes>,
      abiSearch: {
        learnNmSearch: "",
        childNmSearch: "",
        writeSearch: "",
        page: 1,
        size: PAGE_IN_GROUP,
        sort: "",
      } as LearnComponentSearch,
      rowData: [],
      codeRadio: [
        { cdId: STATUS_ALL, cdNm: this.t("common.all") },
        { cdId: STATUS_YES, cdNm: this.t("02.generalFactorLearn.write") },
        { cdId: STATUS_NO, cdNm: this.t("02.generalFactorLearn.notWrite") },
      ] as Array<CodeMngModel>,
      totalRows: 0,
      wrote: "",
      notWrote: "",
      key: 1,
      typeAll: STATUS_ALL,
      written: "",
    };
  },
  setup() {
    const store = commonStore();
    const cmpnStore = learnComStore();
    const codeStore = codeMngStore();
    const { t } = useI18n();
    return {
      store,
      cmpnStore,
      codeStore,
      t,
    };
  },
  beforeMount() {},
  methods: {
    async getList() {
      this.store.setLoading(true);
      if (this.written == STATUS_ALL) {
        this.abiSearch.writeSearch = "";
      } else {
        this.abiSearch.writeSearch = this.written;
      }
      await this.cmpnStore.fetchList(this.abiSearch);
      if (this.cmpnStore.status && this.cmpnStore.status == SUCCSESS_STATUS) {
        this.coreChildList = this.cmpnStore.chldList.data.content;

        this.totalRows = this.cmpnStore.chldList.data.totalElements;

        if (this.coreChildList.length > 0) {
          this.coreChildList.forEach((item) => {
            item.status =
              item.writeStatus == STATUS_YES
                ? this.t("02.generalFactorLearn.write")
                : this.t("02.generalFactorLearn.notWrite");

            if (item.regDate != null) {
              item.createDate = format(
                new Date(item.regDate),
                FORMAT_YYY_MM_DD
              );
            }
          });
        }
      }
      this.store.setLoading(false);
    },
    search() {
      this.abiSearch.page = 1;
      this.key++;
    },
    handleCustomClick(data: any) {
      this.$router.push({
        path: SCREEN.learnComponentCrud.path,
        state: {
          chldSeq: data.learnAbilityChldAbilitySeq,
        },
      });
    },
    reset() {
      this.abiSearch.learnNmSearch = "";
      this.abiSearch.childNmSearch = "";
      this.written = STATUS_ALL;
    },
    fnPagination(pageNumber: any, pagesSize: any) {
      this.abiSearch.size = pagesSize;
      this.abiSearch.page = pageNumber;
      this.abiSearch.sort = "";
      this.getList();
    },
  },
});
</script>

<style scoped lang="scss">
</style>
