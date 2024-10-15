<template>
  <div class="content_wrap">
    <div class="grid_content">
      <div class="page_toparea">
        <h2 class="page_title">{{
          t("trainingProcess.title")
          }}</h2>
      </div>
    </div>
    <div class="grid_content">
      <div class="sub_section">
        <div class="sub_section_xs">
          <!-- 검색유형 1 -->
          <div class="search_box">
            <div class="search_section">
              <div class="search_toggle sm">
                <div class="left"></div>
                <div class="right">
                  <div class="search_daywrap mg_r10">
                    <span class="tag">{{
                        t("trainingProcess.search1")
                      }}</span>
                    <div class="max_wd100">
                      <SelectBoxBase/>
                    </div>
                  </div>
                  <div class="search_daywrap mg_r10">
                    <span class="tag">{{
                        t("trainingProcess.search2")
                      }}</span>
                    <div class="max_wd100">
                      <InputBase/>
                    </div>
                  </div>
                  <button type="button" class="btn_round btn_lg btn_primary mg_l10">{{
                    t("trainingProcess.btnSearch")
                    }}
                  </button>
                  <button type="button" class="btn_round btn_lg btn_gray mg_l5">{{
                    t("common.reset")
                    }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="sub_section">
        <div class="box">
          <GridComponentV2
              :rowData="rowDataService1"
              :columnDefs="columnDefs1"
              :paginationClientFlag="false"
              :totalRecord="paginationFake"
              @customPagination="fnPagination"
              ref="gridKey"
              :id="'test'"
          >
          </GridComponentV2>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import GridComponentV2 from "@/components/common/grid/GridComponentV2.vue";
import {ref} from "vue";
import InputBase from "@/components/common/input/InputBase.vue";
import SelectBoxBase from "@/components/common/input/SelectBoxBase.vue";
import LinkGridComponent from "@/components/common/grid/LinkGridComponent.vue";
import {useRouter} from "vue-router";
import {SCREEN} from "@/router/screen";
import { useI18n } from "vue-i18n";

const {t} = useI18n();
const router = useRouter()

const rowDataService1 = ref([
  {
    number: 1,
    major: "Major",
    typeOfRedirect: "major",
  },
  {
    number: 1,
    major: "General",
    typeOfRedirect: "general"
  }
]);
const columnDefs1 = ref([
  {headerName: t("trainingProcess.column1"), field: 'number'},
  {headerName: t("trainingProcess.column2"), field: 'year'},
  {
    headerName: t("trainingProcess.column3"),
    field: 'major',
    cellRenderer: LinkGridComponent,
    cellRendererParams: {
      onCustomEvent: handleDetailClick,
    },
  },
  {headerName: t("trainingProcess.column4"), field: 'typeOf'},
  {headerName: t("trainingProcess.column5"), field: 'status'},
  {headerName: t("trainingProcess.column6"), field: 'author'},
  {headerName: t("trainingProcess.column7"), field: 'date'},
  {headerName: t("trainingProcess.column8"), field: 'print'},
])
const gridKey = ref(null)
const paginationFake = ref(100)

const fnPagination = (pageNumber: any, pagesSize: any) => {
  console.log('call data')
}

function handleDetailClick(item) {
  router.push({name: SCREEN.createTrainingProcess.name, params: {mode: item.typeOfRedirect}})
}
</script>

<style scoped>

</style>
