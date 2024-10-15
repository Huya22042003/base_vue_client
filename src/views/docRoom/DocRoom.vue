<template>
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
              <p>{{ t("09.documentRoom.search.ttl") }}</p>
              <InputBase v-model="docRoomSearchModel.ttl" id="ttl"> </InputBase>
            </li>
            <li>
              <p>{{ t("09.documentRoom.search.subscribers") }}</p>
              <InputBase
                v-model="docRoomSearchModel.createdBy"
                id="subscribers"
              >
              </InputBase>
            </li>
            <li>
              <p>{{ t("09.documentRoom.search.regDate") }}</p>
              <div class="search_flex" style="position: relative">
                <BaseDatePicker placeholder="시작일" v-model="startDate">
                </BaseDatePicker>
                <span>~</span>
                <BaseDatePicker placeholder="종료일" v-model="endDate">
                </BaseDatePicker>
              </div>
            </li>
          </ul>

          <div class="search_btnarea">
            <button
              class="button btn_xl btn_blue btn_responsive"
              v-on:click="searchClick()"
            >
              {{ t("common.search") }}
            </button>
            <button
              class="button btn_xl btn_gray btn_responsive"
              v-on:click="resetSearch()"
            >
              {{ t("common.reset") }}
            </button>
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
          ref="gridKey"
          :paginationClientFlag="false"
          @customPagination="fnPagination"
          :totalRecord="totalRows"
          :key="key"
        >
          <template #button>
            <div class="search_btnarea">
              <button
                type="button"
                class="button btn_xs btn_blue btn_responsive"
                @click="create()"
              >
                {{ t("09.documentRoom.table.register") }}
              </button>
            </div>
          </template>
        </GridComponentV2>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import InputBase from "../../components/common/input/InputBase.vue";
import SelectBoxBase from "../../components/common/input/SelectBoxBase.vue";
import GridComponent from "../../components/common/grid/GridComponent.vue";
import BaseDatePicker from "@/components/common/datepicker/BaseDatePicker.vue";
import LinkGridComponent from "../../components/common/grid/LinkGridComponent.vue";
import Breadcrumb from "../../components/common/Breadcrumb.vue";
import LoaddingComponent from "../../components/common/loading/LoaddingComponent.vue";
import type {
  DocRoomSearchModel,
  DocRoomModel,
} from "../..//stores/docRoom/docRoom.type";
import { defineComponent, ref } from "vue";
import {
  PAGINATION_PAGE_SIZE,
  PAGINATION_PAGE_SIZE_SELECTOR,
  MODE_CREATE,
  MODE_DETAIL,
  FORMAT_YYY_MM_DD,
} from "../../constants/screen.const";
import { fetchData } from "../../stores/docRoom/docRoom.service";
import { STATUS_YES } from "../../constants/common.const";
import { SCREEN } from "../../router/screen";
import { useI18n } from "vue-i18n";
import { format } from "date-fns";
import { commonStore } from "../../stores/common";
import { MESSAGE_ERROR_API } from "@/constants/common.const";
import Swal from "sweetalert2";

export default defineComponent({
  components: {
    InputBase,
    SelectBoxBase,
    GridComponent,
    BaseDatePicker,
    Breadcrumb,
    LoaddingComponent,
    LinkGridComponent,
  },
  setup() {
    const { t } = useI18n();
    const store = commonStore();
    return { t, store };
  },
  data() {
    return {
      pageTitle: this.t("09.documentRoom.title"),
      breadcrumbItems: [
        { label: "HOME", link: "/" },
        { label: "", link: "#" },
        { label: "", link: "/" },
      ],
      key: 1,
      paginationPageSize: PAGINATION_PAGE_SIZE,
      paginationPageSizeSelector: PAGINATION_PAGE_SIZE_SELECTOR,
      rowData: [] as Array<DocRoomModel>,
      columnDefs: ref([
        {
          headerName: this.t("09.documentRoom.table.rowNum"),
          field: "rowNumber",
          flex: 1,
          cellStyle: { textAlign: "center" },
        },
        {
          headerName: this.t("09.documentRoom.table.ttl"),
          field: "ttl",
          cellRenderer: LinkGridComponent,
          cellRendererParams: { onCustomEvent: this.handleCustomClick },
          cellStyle: {
            color: "#2704FF",
            display: "flex",
            alignItems: "center",
          },
          flex: 5,
        },
        {
          headerName: this.t("09.documentRoom.table.subscribers"),
          field: "regId",
          flex: 2,
          cellStyle: { textAlign: "center" },
        },
        {
          headerName: this.t("09.documentRoom.form.regDate"),
          field: "regDate",
          flex: 2,
          cellStyle: { textAlign: "center" },
        },
        {
          headerName: this.t("09.documentRoom.table.fileYn"),
          field: "fileStatus",
          flex: 1,
          cellStyle: { textAlign: "center" },
        },
      ]),
      docRoomSearchModel: {} as DocRoomSearchModel,
      totalRows: 0,
      startDate: "",
      endDate: "",
    };
  },

  methods: {
    searchClick() {
      this.docRoomSearchModel.page = 1;
      this.key++;
    },

    create() {
      this.$router.push({
        name: SCREEN.crudDocRoom.name,
        params: { mode: MODE_CREATE },
      });
    },
    handleCustomClick(data: any) {
      this.$router.push({
        name: SCREEN.crudDocRoom.name,
        params: { mode: MODE_DETAIL },
        state: {
          id: data.metlSeq,
        },
      });
    },
    resetSearch() {
      this.docRoomSearchModel = {
        ttl: "",
        createdBy: "",
      };
      this.startDate = "";
      this.endDate = "";
    },
    fnPagination(pageNumber: any, pagesSize: any) {
      this.docRoomSearchModel.size = pagesSize;
      this.docRoomSearchModel.page = pageNumber;
      this.docRoomSearchModel.sort = "";
      this.store.setLoading(true);
      this.docRoomSearchModel.regStrDate = this.startDate;
      this.docRoomSearchModel.regEndDate = this.endDate;
      fetchData(this.docRoomSearchModel)
        .then((res) => {
          this.rowData = res.data.data.content;
          this.totalRows = res.data.data.totalElements;
          this.rowData.forEach((item, index) => {
            item.rowNumber = this.totalRows - item.rowNumber + 1;
            item.regDate = format(new Date(item.regDate), FORMAT_YYY_MM_DD);
            if (item.fileStatus != null) {
              item.fileStatus = this.t("09.documentRoom.form.yes");
            } else {
              item.fileStatus = this.t("09.documentRoom.form.no");
            }
          });
        })
        .catch((error) => {
          throw new Error(MESSAGE_ERROR_API);
        })
        .finally(() => {
          this.store.setLoading(false);
        });
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
