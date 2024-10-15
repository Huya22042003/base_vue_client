<template>
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
                <p>{{ t("09.notificationMessage.search.heading") }}</p>
                <InputBase :id="'ttl'" v-model="searchModel.ttlSearch" />
              </li>
              <li>
                <p>{{ t("09.notificationMessage.search.receiver") }}</p>
                <InputBase :id="'regBy'" v-model="searchModel.regId" />
              </li>
              <li>
                <p>{{ t("09.notificationMessage.search.acceptOrNot") }}</p>
                <SelectBoxBase
                  :id="'selectbox'"
                  :name="'selectbox'"
                  :data="listSelectBox"
                  v-model="searchModel.sendStsCd"
                ></SelectBoxBase>
              </li>
            </ul>
            <div class="search_btnarea">
              <button
                class="button btn_xl btn_blue btn_responsive"
                @click="searchClick()"
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
          :key="keyId"
        >
          <template #button>
            <button
              type="button"
              class="button btn_sm btn_blue btn_responsive"
              @click="register()"
            >
              {{ t("09.notificationMessage.table.send") }}
            </button>
          </template>
        </GridComponentV2>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import SelectBoxBase from "@/components/common/input/SelectBoxBase.vue";
import GridComponent from "@/components/common/grid/GridComponent.vue";
import LinkGridComponent from "@/components/common/grid/LinkGridComponent.vue";
import { SCREEN } from "../../router/screen";
import {
  PAGINATION_PAGE_SIZE,
  PAGINATION_PAGE_SIZE_SELECTOR,
  MODE_CREATE,
  MODE_DETAIL,
  NOTIMES_UP_CD_ID,
} from "../../constants/screen.const";
import { defineComponent, ref } from "vue";
import { useI18n } from "vue-i18n";
import type {
  SearchModel,
  NoticeMessageModel,
} from "@/stores/noticeMessage/noticeMessage.type";
import InputBase from "@/components/common/input/InputBase.vue";
import { commonStore } from "../../stores/common";
import { listData } from "@/stores/noticeMessage/noticeMessage.service";
import type { CodeMngRes } from "@/stores/common/codeMng/codeMng.type";
import { getCodeMngByUpCdId } from "@/stores/common/codeMng/codeMng.service";

export default defineComponent({
  components: {
    GridComponent,
    SelectBoxBase,
    LinkGridComponent,
  },
  setup: () => {
    const { t } = useI18n();
    const cmn = commonStore();
    return { t, cmn };
  },
  data() {
    return {
      pageTitle: this.t("09.notificationMessage.title"),
      breadcrumbItems: [
        { label: "HOME", link: "/" },
        { label: "", link: "#" },
        { label: "", link: "/notification-message" },
      ],
      keyId: 1,
      searchModel: {} as SearchModel,
      noticeModel: {} as NoticeMessageModel,
      totalRows: 0,
      columnDefs: ref([
        {
          headerName: this.t("09.notificationMessage.table.rowNum"),
          field: "rowNum",
          flex: 1,
          cellStyle: { textAlign: "center" },
        },
        {
          headerName: this.t(
            "09.notificationMessage.table.messageNotifications"
          ),
          field: "ttl",
          flex: 3,
          cellRenderer: "LinkGridComponent",
          cellRendererParams: { onCustomEvent: this.handleCustomClick },
          cellStyle: {
            color: "#2704FF",
            display: "flex",
            textAlign: "center",
            alignItems: "center",
          },
        },
        {
          headerName: this.t("09.notificationMessage.table.receiver"),
          field: "deptNm",
          flex: 2,
          cellStyle: { textAlign: "center" },
        },
        {
          headerName: this.t("09.notificationMessage.table.dateSend"),
          field: "sendDate",
          flex: 2,
          cellStyle: { textAlign: "center" },
        },
        {
          headerName: this.t("09.notificationMessage.table.acceptOrNot"),
          field: "rcptYn",
          flex: 1,
          cellStyle: { textAlign: "center" },
        },
      ]),
      rowData: [],
      paginationPageSize: PAGINATION_PAGE_SIZE,
      paginationPageSizeSelector: PAGINATION_PAGE_SIZE_SELECTOR,
      upCdId: {} as CodeMngRes,
      listSelectBox: [
        {
          cdId: "",
          cdNm: this.t("common.all"),
        },
      ],
      listData: [],
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
      this.searchModel.page = 1;
      this.keyId++;
    },
    register() {
      this.$router.push({
        name: SCREEN.crudNotificationMessage.name,
        params: { mode: MODE_CREATE, id: "id" },
      });
    },
    fnPagination(pageNumber: any, pagesSize: any) {
      this.searchModel.size = pagesSize;
      this.searchModel.page = pageNumber;
      this.searchModel.sort = "";
      this.cmn.setLoading(true);
      listData(this.searchModel)
        .then((res) => {
          this.rowData = res.data.data.content;
          this.totalRows = res.data.data.totalElements;
        })
        .finally(() => {
          this.cmn.setLoading(false);
        });
    },
    reset() {
      this.searchModel.ttlSearch = "";
      this.searchModel.regId = "";
      this.searchModel.sendStsCd = "";
    },
    handleCustomClick(data: any) {
      this.$router.push({
        name: SCREEN.crudNotificationMessage.name,
        params: { mode: MODE_DETAIL },
        state: {
          id: data.altkSeq,
        },
      });
    },
    async getCode() {
      this.upCdId.upCdId = NOTIMES_UP_CD_ID;
      await getCodeMngByUpCdId(this.upCdId)
        .then((res) => {
          this.listData = res.data.data;
          this.listData.forEach((item) => {
            this.listSelectBox.push(item);
          });
        })
        .finally(() => {});
    },
  },
});
</script>
<style scoped></style>
