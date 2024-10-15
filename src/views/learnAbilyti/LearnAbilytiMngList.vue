<template>
  <div class="page_wrapper">
    <section id="content" class="content_wrapper grid_content" tabindex="0">
      <Breadcrumb :pageTitle="pageTitle" :breadcrumbItems="breadcrumbItems" />
      <div class="box dp_block">
        <div class="box_section">
          <GridComponent
            :rowData="rowData"
            :columnDefs="columnDefs"
            :pagination="true"
            v-model="rowselected"
            :isShowAll="true"
            ref="grid"
          >
            <template #button>
              <div class="search_btnarea">
                <button
                  type="button"
                  class="button btn_xs btn_blue btn_responsive"
                  @click="register"
                >
                  {{ t("02.learnAbilytiMng.button.register") }}
                </button>
              </div>
            </template>
          </GridComponent>
        </div>
      </div>
    </section>
    <LearnAbilytiModal
      :isOpen="modalOpen"
      @close-modal="closeModal"
      :modeScreen="modeScreen"
      :learnId="learnId"
      :getDataAll="getDataAll"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import LearnAbilytiModal from "./LearnAbilytiModal.vue";
import LinkGridComponent from "../../components/common/grid/LinkGridComponent.vue";
import { useI18n } from "vue-i18n";
import {
  MODE_CREATE,
  MODE_DETAIL,
  SUCCSESS_STATUS,
  FORMAT_YYY_MM_DD,
} from "../../constants/screen.const";
import { STATUS_YES } from "../../constants/common.const";
import { learnAbilityStore } from "@/stores/learnAbility";
import { commonStore } from "../../stores/common";
import type { LearnInitModel } from "@/stores/learnAbility/learnAbility.type";
import { format } from "date-fns";
import { SCREEN } from "../../router/screen";
import GridComponent from "@/components/common/grid/GridComponent.vue";
export default defineComponent({
  name: "LearnAbilytiMng",
  components: {
    Breadcrumb,
    LearnAbilytiModal,
    LinkGridComponent,
    GridComponent,
  },
  setup() {
    const { t } = useI18n();
    const store = learnAbilityStore();
    const cmn = commonStore();
    const modalOpen = ref(false);
    const modeScreen = ref("");
    const learnId = ref("");
    const rowSelected = ref<any[]>([]);
    const pageTitle = t("02.learnAbilytiMng.title");
    const data = ref<Array<LearnInitModel>>([]);
    const rowData = ref<Array<LearnInitModel>>([]);
    const breadcrumbItems = [
      { label: "HOME", link: "/" },
      { label: "사이트관리", link: "#" },
      {
        label: t("02.learnAbilytiMng.title"),
        link: SCREEN.learnAbilytiMng.path,
      },
    ];
    const columnDefs = [
      {
        headerName: t("02.learnAbilytiMng.table.rowNum"),
        field: "rowNum",
        cellStyle: { textAlign: "center" },
        flex: 1,
      },
      {
        headerName: t("02.learnAbilytiMng.table.learnName"),
        field: "learnAbilityNm",
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
      },
      {
        headerName: t("02.learnAbilytiMng.table.useYn"),
        field: "useYn",
        flex: 3,
        cellStyle: { textAlign: "center" },
        cellRenderer: (params: any) => {
          return params.value === STATUS_YES
            ? t("02.common.yesUse")
            : t("02.common.noUse");
        },
      },
      {
        headerName: t("02.learnAbilytiMng.table.regBy"),
        field: "regId",
        cellStyle: { textAlign: "center" },
        flex: 2,
      },
      {
        headerName: t("02.learnAbilytiMng.table.regDate"),
        field: "regDate",
        flex: 2,
        cellStyle: { textAlign: "center" },
      },
    ];

    async function getDataAll() {
      cmn.setLoading(true);
      await store.listLearn();
      if (store && store.status == SUCCSESS_STATUS) {
        data.value = store.learnAbilytiList.data;
        rowData.value = data.value;
        const totalRows = rowData.value.length;
        rowData.value.forEach((item, index) => {
          item.rowNum = totalRows - index;
          item.regDate = format(new Date(item.regDate), FORMAT_YYY_MM_DD);
        });
      }
      cmn.setLoading(false);
    }

    function register() {
      modeScreen.value = MODE_CREATE;
      modalOpen.value = true;
      learnId.value = "";
    }

    function closeModal() {
      modalOpen.value = false;
      learnId.value = "";
    }

    function handleCustomClick(data: any) {
      modeScreen.value = MODE_DETAIL;
      modalOpen.value = true;
      learnId.value = data.learnAbilitySeq;
    }

    return {
      t,
      store,
      cmn,
      modalOpen,
      modeScreen,
      learnId,
      rowSelected,
      pageTitle,
      data,
      rowData,
      breadcrumbItems,
      columnDefs,
      getDataAll,
      register,
      closeModal,
      handleCustomClick,
    };
  },
  beforeMount() {
    try {
      Promise.all([this.getDataAll()]);
    } catch (e) {
      alert(e);
    }
  },
});
</script>
