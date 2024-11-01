<template>
  <Wrapper>
    <Breadcrumb
      :pageTitle="'권한 관리'"
      :breadcrumb-items="breadcrumbItems"
    ></Breadcrumb>
    <BlockInput class="dp_block">
      <GridComponentV2
        :rowData="rowData"
        :columnDefs="columnDefs"
        :pagination="true"
        :paginationPageSize="paginationPageSize"
        :paginationPageSizeSelector="paginationPageSizeSelector"
        ref="grid"
        :paginationClientFlag="false"
        @customPagination="fnPagination"
        :totalRecord="total"
        :key="keyId"
      >
        <template #button>
          <div class="search_btnarea">
            <!-- <button type="button" class="btn_md btn_blue" @click="create()">
              {{ t("10.role.button.addRole") }}
            </button> -->
            <ButtonBase
            class="btn_md btn_blue"
            :buttonName="t('10.role.button.addRole')"
            @click="create()"
            >
            </ButtonBase>
          </div>
        </template>
      </GridComponentV2>
    </BlockInput>
  </Wrapper>
</template>

<script lang="ts" setup>
import { defineComponent, onMounted, ref } from "vue";
import { commonStore } from "@/stores/common";
import {
  PAGINATION_PAGE_SIZE,
  PAGINATION_PAGE_SIZE_SELECTOR,
  SUCCSESS_STATUS,
} from "@/constants/screen.const";
import { rolesStore } from "@/stores/role/index";
import { storeToRefs } from "pinia";
import LinkGridComponent from "@/components/common/grid/LinkGridComponent.vue";
import { SCREEN } from "@/router/screen";
import { useRouter } from "vue-router";
import InputGridComponent from "@/components/common/grid/InputGridCoponent.vue";
import { format } from "date-fns";
import { FORMAT_YYY_MM_DD } from "@/constants/screen.const";

const { t } = useI18n();
const storeCommon = commonStore();
const storeRole = rolesStore();
const { list, status } = storeToRefs(storeRole);

defineComponent(() => {
  LinkGridComponent;
  InputGridComponent;
});

const breadcrumbItems = ref([
  { label: t("common.home"), link: "/" },
  { label: t("10.role.pageTitle"), link: "#" },
  { label: t("10.role.pageTitle"), link: "/roles" },
]);

const columnDefs = ref([
  {
    headerName: t("10.role.rowNum"),
    field: "rowNum",
    flex: 0.5,
    cellStyle: {
      textAlign: "center",
    },
  },
  {
    headerName: t("10.role.roleName"),
    field: "rlNm",
    cellRenderer: LinkGridComponent,
    cellRendererParams: {
      onCustomEvent: (data: any) => handleCustomClick(data),
    },
    cellStyle: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  {
    headerName: t("10.role.roleCode"),
    field: "rlCd",
    cellStyle: {
      textAlign: "center",
    },
  },
  {
    headerName: t("10.role.regId"),
    field: "regId",
    cellStyle: {
      textAlign: "center",
    },
  },
  {
    headerName: t("10.role.regDate"),
    field: "createDate",
    cellStyle: {
      textAlign: "center",
    },
  },
]);
const paginationPageSize = ref(PAGINATION_PAGE_SIZE);
const paginationPageSizeSelector = ref(PAGINATION_PAGE_SIZE_SELECTOR);
const router = useRouter();
let rowData = ref([]);
const page = ref(0);
const total = ref(0);
const keyId = ref(0);

const fetchRoles = async () => {
  storeCommon.setLoading(true);
  const pageDto = {
    page: 1,
    size: 20,
    sort: "",
  };
  await storeRole.fetchRoles(pageDto);
  if (status.value == SUCCSESS_STATUS) {
    rowData.value = list.value.content;

    if (rowData.value.length > 0) {
      rowData.value.forEach((item, index) => {
        item.createDate = item.regDate
          ? format(item.regDate, FORMAT_YYY_MM_DD)
          : "";
          item.rowNum = rowData.value.length - index;
      });
    }
    total.value = list.value.totalElements;
  }

  storeCommon.setLoading(false);
};
const create = () => {
  router.push({
    path: SCREEN.roleCreate.path,
  });
};

onMounted(async () => {});
const fnPagination = async (pageNumber: any, pagesSize: any) => {
  paginationPageSize.value = pagesSize;
  page.value = pageNumber - 1;
  await fetchRoles();
};

const handleCustomClick = (data: any) => {
  router.push({
    path: SCREEN.roleEdit.path,
    state: { id: data.rlId },
  });
};
</script>

<style lang="css"></style>
