<template>
  <div class="page_wrapper">
    <section id="content" class="content_wrapper grid_content" tabindex="0">
      <Breadcrumb :pageTitle="pageTitle"></Breadcrumb>
      <div class="box dp_block">
        <div class="box_section">
          <div class="search_box col_3">
            <ul>
              <li>
                <p>{{ t("coreAbilityJobList.coreAbility") }}</p>
                <InputBase
                  :id="'content'"
                  v-model="searchModel.coreAbilityNm"
                  class="form_style"
                />
              </li>
              <li>
                <p>{{ t("coreAbilityJobList.lowerLever") }}</p>
                <InputBase
                  :id="'content'"
                  v-model="searchModel.chldAbilityNm"
                  class="form_style"
                />
              </li>
              <li>
                <p>{{ t("coreAbilityJobList.status") }}</p>
                <SelectBoxBase
                  :id="'selectbox'"
                  :name="'selectbox'"
                  :data="listSelectBox"
                  v-model="searchModel.status"
                ></SelectBoxBase>
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
            :key="key"
          >
          </GridComponentV2>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import SelectBoxBase from "../../components/common/input/SelectBoxBase.vue";
import InputBase from "../../components/common/input/InputBase.vue";
import GridComponent from "../../components/common/grid/GridComponent.vue";
import {
  PAGINATION_PAGE_SIZE,
  PAGINATION_PAGE_SIZE_SELECTOR,
  FORMAT_YYY_MM_DD,
  MODE_DETAIL,
} from "../../constants/screen.const";
import LinkGridComponent from "../../components/common/grid/LinkGridComponent.vue";
import { SCREEN } from "../../router/screen";
import { commonStore } from "../../stores/common";
import type {
  CoreAbilityJobModel,
  CoreAbilityJobSearchModel,
} from "@/stores/coreAbilityJob/coreAbilityJob.type";
import { format } from "date-fns";
import { list } from "@/stores/coreAbilityJob/coreAbilityJob.service";
import { getCodeMngByUpCdId } from "@/stores/common/codeMng/codeMng.service";
import { UP_CD_ID_STATUS } from "@/constants/common.const";

export default defineComponent({
  name: "CoreAbilityJob",
  components: {
    Breadcrumb,
    SelectBoxBase,
    InputBase,
    GridComponent,
    LinkGridComponent,
  },
  setup() {
    const { t } = useI18n();
    const router = useRouter();
    const cmn = commonStore();
    const pageTitle = t("coreAbilityJobList.pageTitle");

    return {
      t,
      router,
      cmn,
      pageTitle,
    };
  },
  beforeMount() {
    try {
      Promise.all([this.getCodeType()]);
    } catch (e) {
      alert(e);
    }
  },
  data() {
    return {
      key: 1,
      totalRows: 0,
      paginationPageSize: PAGINATION_PAGE_SIZE,
      paginationPageSizeSelector: PAGINATION_PAGE_SIZE_SELECTOR,
      rowData: [] as Array<CoreAbilityJobModel>,
      searchModel: {
        status: "",
        page: 1,
        size: PAGINATION_PAGE_SIZE,
        sort: "",
      } as CoreAbilityJobSearchModel,
      listSelectBox: [
        {
          cdId: "",
          upCdId: "",
          cdNm: this.t("common.all"),
        },
      ],
      columnDefs: [
        {
          headerName: this.t("coreAbilityJobList.coreAbility"),
          field: "coreAbilNm",
          cellStyle: { textAlign: "center" },
          flex: 3,
        },
        {
          headerName: this.t("coreAbilityJobList.lowerLever"),
          field: "chldAbilNm",
          cellRenderer: "LinkGridComponent",
          cellRendererParams: {
            onCustomEvent: this.handleCustomClick,
          },
          cellStyle: {
            color: "#2704FF",
            display: "status",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          },
          flex: 3,
        },
        {
          headerName: this.t("coreAbilityJobList.status"),
          field: "status",
          cellStyle: { textAlign: "center" },
          flex: 1,
        },
        {
          headerName: this.t("coreAbilityJobList.regBy"),
          field: "regId",
          cellStyle: { textAlign: "center" },
          flex: 1,
        },
        {
          headerName: this.t("coreAbilityJobList.regDate"),
          field: "regDate",
          cellStyle: { textAlign: "center" },
          flex: 2,
        },
      ],
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
      list(this.searchModel)
        .then((res) => {
          this.rowData = res.data.data.content;
          this.totalRows = res.data.data.totalElements;
          this.rowData.forEach((item: any) => {
            if (item.regDate) {
              item.regDate = format(new Date(item.regDate), FORMAT_YYY_MM_DD);
            }
          });
        })
        .finally(() => {
          this.cmn.setLoading(false);
        });
    },
    getCodeType() {
      getCodeMngByUpCdId({ upCdId: UP_CD_ID_STATUS }).then((response: any) => {
        response.data.data.forEach((item: any) => {
          this.listSelectBox.push(item);
        });
      });
    },
    reset() {
      this.searchModel.coreAbilityNm = "";
      this.searchModel.chldAbilityNm = "";
      this.searchModel.status = "";
    },
    handleCustomClick(data: any) {
      this.$router.push({
        name: SCREEN.coreAbilityJobDetail.name,
        params: { mode: MODE_DETAIL },
        state: {
          coreAbilNm: data.coreAbilNm,
          chldAbilNm: data.chldAbilNm,
          chldAbilSeq: data.chldAbilSeq,
        },
      });
    },
  },
});
</script>
