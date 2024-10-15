<template>
  <THeader />
  <div class="page_wrapper">
    <section id="content" class="content_wrapper grid_content" tabindex="0">
      <Breadcrumb
        :pageTitle="pageTitle"
        :breadcrumbItems="breadcrumbItems"
      ></Breadcrumb>

      <div class="box dp_block">
        <div class="box_inner">
          <div class="box_section">
            <div class="search_box col_3">
              <ul>
                <li>
                  <p>{{ t("02.empElemAbility.elemList.empNm") }}</p>
                  <InputBase :id="'profNm'" v-model="abiSearch.empAbilityNm" />
                </li>
                <li>
                  <p>{{ t("02.empElemAbility.elemList.subNm") }}</p>
                  <InputBase
                    :id="'subNm'"
                    v-model="abiSearch.subEmpAbilityNm"
                  />
                </li>
                <li>
                  <p>{{ t("02.empElemAbility.elemList.stsNm") }}</p>
                  <RadiobuttonBase
                    v-for="item in listRadio1"
                    :mode="'show'"
                    :value="item.id"
                    v-model="abiSearch.stsAbility"
                    :id="item.id"
                    :name="'useYn'"
                    :checked="item.id == radiovalue1"
                    :label="item.name"
                  >
                  </RadiobuttonBase>
                </li>
              </ul>
              <div class="search_btnarea">
                <button
                  class="button btn_xl btn_blue btn_responsive"
                  @click="search()"
                >
                  {{ t("common.search") }}
                </button>
                <button
                  class="button btn_xl btn_gray btn_responsive"
                  @click="reset()"
                >
                  {{ t("common.reset") }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="box dp_block">
        <div class="box_inner">
          <span class="note_custom"
            >※ 등록된 직원역량-하위역량으로 목록이 자동구성됩니다.</span
          >
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
import LinkGridComponent from "@/components/common/grid/LinkGridComponent.vue";
import { SCREEN } from "@/router/screen";
import { FORMAT_YYY_MM_DD } from "@/constants/screen.const";
import { subElemList } from "@/stores/empAbility/empAbility.service";
import { ElemPageSearchDTO } from "@/stores/empAbility/empAbility.type";
import { MESSAGE_ERROR_API, STATUS_ALL } from "@/constants/common.const";
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
      pageTitle: this.t("02.empElemAbility.elemList.titleMain"),
      breadcrumbItems: [
        { label: this.t("common.home"), link: "/" },
        {
          label: this.t("02.empElemAbility.elemList.titleMain"),
          link: SCREEN.subElemAbList.path,
        },
      ],
      picker1: new Date(),
      parentListObject: [],
      paginationPageSize: PAGINATION_PAGE_SIZE,
      paginationPageSizeSelector: PAGINATION_PAGE_SIZE_SELECTOR,
      columnDefs: ref([
        {
          headerName: this.t("02.empElemAbility.elemList.empNm"),
          field: "empAbiNm",
          flex: 3,
          cellStyle: {
            textAlign: "center",
          },
        },

        {
          headerName: this.t("02.empElemAbility.elemList.subNm"),
          field: "subEmpAbiNm",
          flex: 3,
          cellStyle: {
            color: "#2704FF",
            display: "flex",
            alignItems: "center",
          },
          cellRenderer: LinkGridComponent,
          cellRendererParams: {
            onCustomEvent: this.handleCustomClick,
          },
        },
        {
          headerName: this.t("02.empElemAbility.elemList.stsNm"),
          field: "stsReg",
          flex: 2,
          cellStyle: {
            textAlign: "center",
          },
        },
        {
          headerName: this.t("02.empElemAbility.elemList.regNm"),
          field: "regNm",
          flex: 2,
          cellStyle: {
            textAlign: "center",
          },
        },
        {
          headerName: this.t("02.empElemAbility.elemList.regDate"),
          field: "regDate",
          flex: 2,
          cellStyle: {
            textAlign: "center",
          },
        },
      ]),
      abiSearch: {
        empAbilityNm: "",
        subEmpAbilityNm: "",
        stsAbility: STATUS_ALL,
        page: 1,
        size: 10,
        sort: "",
      } as ElemPageSearchDTO,
      rowData: [],
      totalRows: 0,
      key: 1,
      radiovalue1: ref(STATUS_ALL),
      listRadio1: [
        { id: STATUS_ALL, name: this.t("common.all") },
        {
          id: this.t("02.empElemAbility.elemList.use"),
          name: this.t("02.empElemAbility.elemList.use"),
        },
        {
          id: this.t("02.empElemAbility.elemList.not_use"),
          name: this.t("02.empElemAbility.elemList.not_use"),
        },
      ],
    };
  },
  setup() {
    const store = commonStore();
    const codeStore = codeMngStore();
    const { t } = useI18n();

    return {
      store,
      codeStore,
      t,
    };
  },
  methods: {
    async getList() {
      this.store.setLoading(true);
      await subElemList(this.abiSearch)
        .then((res) => {
          this.rowData = res.data.data.content;
          this.totalRows = res.data.data.totalElements;
        })
        .catch((error) => {
          throw new Error(MESSAGE_ERROR_API);
        })
        .finally(() => {
          this.store.setLoading(false);
        });
    },
    search() {
      this.abiSearch.page = 1;
      this.key++;
    },
    handleCustomClick(data: any) {
      this.$router.push({
        path: SCREEN.subElemAb.path,
        state: {
          chldSeq: data.empAbilityChldAbilitySeq,
        },
      });
    },
    reset() {
      this.abiSearch.empAbilityNm = "";
      this.abiSearch.subEmpAbilityNm = "";
      this.abiSearch.stsAbility = STATUS_ALL;
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

<style scoped lang="scss"></style>
