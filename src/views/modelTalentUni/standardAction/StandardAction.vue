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
                <p>{{ t("02.coreChildAbility.core") }}</p>
                <SelectBoxBase
                  :data="coreMngLst"
                  id="name"
                  name="name"
                  mode="show"
                  v-if="coreMngLst.length > 1"
                  v-model="searchModel.coreSeq"
                ></SelectBoxBase>
              </li>
              <li>
                <p>{{ t("02.coreChildAbility.child") }}</p>
                <SelectBoxBase
                  :data="childMngLst"
                  id="name"
                  name="name"
                  mode="show"
                  v-model="searchModel.childSeq"
                ></SelectBoxBase>
              </li>
              <li>
                <p>{{ t("02.generalFactor.cmpnElem") }}</p>
                <InputBase
                  name="department"
                  mode="show"
                  v-model="searchModel.cmpnElemNm"
                ></InputBase>
              </li>
            </ul>
            <ul>
              <li>
                <p>{{ t("02.generalFactor.status") }}</p>
                <RadiobuttonBase
                  v-for="itemRadio in codeRadio"
                  :mode="'show'"
                  :value="itemRadio.cdId"
                  :id="itemRadio.cdId"
                  :label="itemRadio.cdNm"
                  :checked="itemRadio.cdId === typeAll"
                  v-model="written"
                >
                </RadiobuttonBase>
              </li>
            </ul>
            <div class="search_btnarea">
              <button type="button" class="btn_xl btn_blue" @click="search">
                {{ t("common.search") }}
              </button>
              <button
                type="button"
                class="btn_xl btn_gray reload"
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
                {{ t("02.standardAction.textRed") }}
              </p>
            </div>
          </div>
          <!-- Table at here -->

          <GridComponentV2
            :rowData="standDardList"
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
import { standActionStore } from "@/stores/standardAction";
import { SUCCSESS_STATUS } from "@/constants/screen.const";
import { CodeMngModel } from "@/stores/common/codeMng/codeMng.type";
import { codeMngStore } from "@/stores/common/codeMng";
import {
  AbilityCmpnElemItem,
  AbilityItemSearch,
} from "@/stores/standardAction/standDardAction.type";
import { format } from "date-fns";
import { SCREEN } from "@/router/screen";
import LinkGridComponent from "@/components/common/grid/LinkGridComponent.vue";
import { STATUS_ALL, STATUS_YES } from "@/constants/common.const";
import { STATUS_NO } from "@/constants/common.const";
import { FORMAT_YYY_MM_DD } from "@/constants/screen.const";
import { getListChildAbility } from "../../../stores/standardAction/standDardAction.service";

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
      pageTitle: this.t("02.standardAction.pageTitle"),
      breadcrumbItems: [
        { label: this.t("common.home"), link: "/" },
        { label: this.t("02.coreChildAbility.menu"), link: "#" },
        {
          label: this.t("02.standardAction.pageTitle"),
          link: SCREEN.standardAction.path,
        },
      ],
      isOpen: false,
      isLoad: false,
      paginationPageSize: PAGINATION_PAGE_SIZE,
      paginationPageSizeSelector: PAGINATION_PAGE_SIZE_SELECTOR,
      columnDefs: ref([
        {
          headerName: this.t("02.coreChildAbility.core"),
          field: "coreAbilityNm",
          cellStyle: {
            textAlign: "center",
          },
        },
        {
          headerName: this.t("02.coreChildAbility.child"),
          field: "chldAbilityNm",
          cellStyle: {
            textAlign: "center",
          },
        },
        {
          headerName: this.t("02.generalFactor.cmpnElem"),
          field: "elemNm",
          cellStyle: {
            color: "#2704FF",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          },
          cellRenderer: LinkGridComponent,
          cellRendererParams: {
            onCustomEvent: this.handleCustomClick,
          },
        },
        {
          headerName: this.t("02.generalFactor.status"),
          field: "status",
          cellStyle: {
            textAlign: "center",
          },
        },
        {
          headerName: this.t("02.generalFactor.regId"),
          field: "regId",
          cellStyle: {
            textAlign: "center",
          },
        },
        {
          headerName: this.t("02.generalFactor.regDate"),
          field: "createDate",
          cellStyle: {
            textAlign: "center",
          },
        },
      ]),
      dataForm: {},
      coreMngLst: [],
      childMngLst: [
        {
          cdId: "",
          cdNm: this.t("common.all"),
          upCdId: "",
        },
      ],
      codeRadio: [
        { cdId: STATUS_ALL, cdNm: this.t("common.all") },
        { cdId: STATUS_YES, cdNm: this.t("02.generalFactor.write") },
        { cdId: STATUS_NO, cdNm: this.t("02.generalFactor.notWrite") },
      ] as Array<CodeMngModel>,
      searchModel: {
        coreSeq: "",
        childSeq: "",
        cmpnElemNm: "",
        writeSearch: "",
        page: 1,
        size: 10,
        sort: "",
      } as AbilityItemSearch,
      standDardList: [] as Array<AbilityCmpnElemItem>,
      key: 1,
      totalRows: 0,
      written: "",
      typeAll: STATUS_ALL,
    };
  },
  setup() {
    const store = commonStore();
    const standStore = standActionStore();
    const codeStore = codeMngStore();
    const { t } = useI18n();
    return {
      store,
      standStore,
      codeStore,
      t,
    };
  },
  beforeMount() {
    this.getListSearch();
  },
  watch: {
    "searchModel.coreSeq"(newValue) {
      this.searchModel.childSeq = "";
      if (newValue) {
        this.childMngLst = [
          {
            cdId: "",
            cdNm: this.t("common.all"),
            upCdId: "",
          },
        ];
        this.getListChildAbility();
      } else {
        this.childMngLst = [
          {
            cdId: "",
            cdNm: this.t("common.all"),
            upCdId: "",
          },
        ];
      }
    },
  },
  methods: {
    async getListSearch() {
      await this.standStore.fetchSearch();

      if (this.standStore.status && this.standStore.status == SUCCSESS_STATUS) {
        this.dataForm = this.standStore.coreChild;
        if (this.dataForm.length > 0) {
          this.dataForm.forEach((item) => {
            let codeMng = {};
            codeMng.cdId = item.coreAbilitySeq;
            codeMng.cdNm = item.coreAbilityNm;

            this.coreMngLst.push(codeMng);
          });
        }
        this.coreMngLst.unshift({
          cdId: "",
          cdNm: this.t("common.all"),
          upCdId: "",
        });
      }
    },
    getListChildAbility() {
      this.store.setLoading(true);
      getListChildAbility({ coreAbilitySeq: this.searchModel.coreSeq }).then(
        (res) => {
          if (res.data.data.length > 0) {
            res.data.data.forEach((item1) => {
              let codeMng1 = {};
              codeMng1.cdId = item1.chldAbilitySeq;
              codeMng1.cdNm = item1.chldAbilityNm;

              this.childMngLst.push(codeMng1);
            });
            this.store.setLoading(false);
          }
        }
      );
    },
    async getList() {
      this.store.setLoading(true);

      if (this.written == STATUS_ALL) {
        this.searchModel.writeSearch = "";
      } else {
        this.searchModel.writeSearch = this.written;
      }

      await this.standStore.fetchList(this.searchModel);

      if (this.standStore.status && this.standStore.status == SUCCSESS_STATUS) {
        this.standDardList = this.standStore.cmpnItemList.data.content;

        this.totalRows = this.standStore.cmpnItemList.data.totalElements;

        if (this.standDardList.length > 0) {
          this.standDardList.forEach((item) => {
            item.status =
              item.writeStatus == STATUS_YES
                ? this.t("02.generalFactor.write")
                : this.t("02.generalFactor.notWrite");
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
      this.searchModel.page = 1;
      this.key++;
    },
    handleCustomClick(data: any) {
      this.$router.push({
        path: SCREEN.standardActionCrud.path,
        state: { cmpnElemSeq: data.cmpnElemSeq },
      });
    },
    reset() {
      this.searchModel.coreSeq = "";
      this.searchModel.childSeq = "";
      this.searchModel.cmpnElemNm = "";
      this.written = STATUS_ALL;
    },
    fnPagination(pageNumber: any, pagesSize: any) {
      this.searchModel.size = pagesSize;
      this.searchModel.page = pageNumber;
      this.searchModel.sort = "";
      this.getList();
    },
  },
});
</script>

<style scoped lang="scss"></style>
