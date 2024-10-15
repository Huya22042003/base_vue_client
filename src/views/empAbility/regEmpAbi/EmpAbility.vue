<template>
  <div class="page_wrapper">
    <section id="content" class="content_wrapper grid_content" tabindex="0">
      <Breadcrumb
        :pageTitle="pageTitle"
        :breadcrumbItems="breadcrumbItems"
      ></Breadcrumb>
      <div class="box dp_block">
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
          >
            <template #button>
              <div class="dp_flex btn_group btn_end">
                <button
                  type="button"
                  class="button btn_xs btn_blue btn_responsive"
                  @click="register"
                >
                  {{ t("02.empAbility.list.btnCreate") }}
                </button>
              </div>
            </template>
          </GridComponentV2>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { useI18n } from "vue-i18n";
import { SCREEN } from "@/router/screen";
import { empAbilityStore } from "@/stores/empAbility";
import { defineComponent, ref } from "vue";
import type {
  EmpAbiInitModel,
  OneAbilityList,
  OneAbilityPage,
} from "@/stores/empAbility/empAbility.type";
import { commonStore } from "@/stores/common";
import {
  MODE_CREATE,
  MODE_DETAIL,
  SUCCSESS_STATUS,
  FORMAT_YYY_MM_DD,
  PAGINATION_PAGE_SIZE,
  PAGINATION_PAGE_SIZE_SELECTOR,
} from "@/constants/screen.const";
import { number } from "yup";
import { format } from "date-fns";
import { useRouter } from "vue-router";
import LinkGridComponent from "@/components/common/grid/LinkGridComponent.vue";
import { listReg } from "@/stores/empAbility/empAbility.service";
import { MESSAGE_ERROR_API } from "@/constants/common.const";

export default defineComponent({
  components: {
    LinkGridComponent,
  },
  setup: () => {
    const { t } = useI18n();
    const router = useRouter();
    const store = empAbilityStore();
    const cmn = commonStore();
    const paginationPageSize = PAGINATION_PAGE_SIZE;
    const paginationPageSizeSelector = PAGINATION_PAGE_SIZE_SELECTOR;
    const rowData = ref<Array<OneAbilityList>>([]);
    const totalRows = ref(number);
    const modalOpen = ref(false);
    const empAbilitySeq = ref("");
    const oneAbiPage = ref<OneAbilityPage>({
      page: 1,
      size: 10,
      sort: "",
    });
    return {
      t,
      store,
      cmn,
      oneAbiPage,
      paginationPageSize,
      paginationPageSizeSelector,
      rowData,
      totalRows,
      modalOpen,
      empAbilitySeq,
    };
  },
  data() {
    return {
      input5: "",
      arrHigh: [],
      arrMedium: [],
      arrShort: [],
      modalOpen: false,
      statusPopUp: "",
      notiMess: "",
      pageTitle: this.t("02.empAbility.list.pageTitle"),
      breadcrumbItems: [
        { label: this.t("common.home"), link: "/" },
        {
          label: this.t("02.empAbility.list.pageTitle"),
          link: SCREEN.empAbility.path,
        },
      ],
      columnDefs: [
        {
          headerName: this.t("02.empAbility.list.rowNum"),
          field: "rowNum",
          cellStyle: { textAlign: "center" },
          flex: 1,
        },
        {
          headerName: this.t("02.empAbility.list.abilityName"),
          field: "ability1levelNm",
          cellRenderer: "LinkGridComponent",
          flex: 4,
          cellRendererParams: {
            onCustomEvent: this.handleCustomClick,
          },
          cellStyle: {
            color: "#2704FF",
            display: "flex",
            alignItems: "center",
          },
        },
        {
          headerName: this.t("02.empAbility.list.regName"),
          field: "regNm",
          flex: 3,
          cellStyle: { textAlign: "center" },
        },
        {
          headerName: this.t("02.empAbility.list.regDate"),
          field: "regDate",
          cellStyle: { textAlign: "center" },
          flex: 3,
        },
      ],
    };
  },

  methods: {
    async getDataAll() {
      this.cmn.setLoading(true);
      await listReg(this.oneAbiPage)
        .then((res) => {
          this.rowData = res.data.data.content;
          this.totalRows = res.data.data.totalElements;
        })
        .catch((error) => {
          throw new Error(MESSAGE_ERROR_API);
        })
        .finally(() => {
          this.cmn.setLoading(false);
        });
    },
    fnPagination(pageNumber: any, pagesSize: any) {
      this.oneAbiPage.size = pagesSize;
      this.oneAbiPage.page = pageNumber;
      this.oneAbiPage.sort = "";
      this.getDataAll();
    },
    register() {
      this.$router.push({
        name: SCREEN.createEmpAbility.name,
        params: { mode: MODE_CREATE },
      });
    },
    handleCustomClick(data: any) {
      this.$router.push({
        name: SCREEN.createEmpAbility.name,
        params: { mode: MODE_DETAIL },
        state: {
          id: data.ability1levelSeq,
        },
      });
    },
  },
});
</script>
