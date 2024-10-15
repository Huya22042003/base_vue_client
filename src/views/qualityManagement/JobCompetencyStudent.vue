<template>
  <div class="page_wrapper">
    <section id="content" class="content_wrapper grid_content" tabindex="0">
      <Breadcrumb
        :pageTitle="pageTitle"
        :breadcrumbItems="breadcrumbItems"
      ></Breadcrumb>
      <div class="search_box mg_b30">
        <div class="search_section">
          <div class="title">
            <strong>{{ t("competencyStudent.form.header") }}</strong>
          </div>
          <div class="search_toggle sm">
            <div class="right">
              <div class="search_daywrap mg_r10">
                <span class="tag">{{
                  t("competencyStudent.form.year")
                }}</span>
                  <SelectBoxBase
                    :id="'year'"
                    :name="'year'"
                    :data="listCheckBox"
                    v-model="searchModel.deptNm"
                  />
              </div>
              <div class="search_daywrap mg_r10">
                <span class="tag">{{
                  t("competencyStudent.form.term")
                }}</span>
                  <SelectBoxBase
                    :id="'term'"
                    :name="'term'"
                    :data="listCheckBox"
                    v-model="searchModel.deptNm"
                  />
              </div>
              <div class="search_daywrap mg_r10">
                <span class="tag">{{
                  t("competencyStudent.form.grade")
                }}</span>
                  <SelectBoxBase
                    :id="'grade'"
                    :name="'grade'"
                    :data="listCheckBox"
                    v-model="searchModel.deptNm"
                  />
              </div>
              <div class="search_daywrap mg_r10">
                <span class="tag">{{
                  t("competencyStudent.form.lesson")
                }}</span>
                  <SelectBoxBase
                    :id="'lesson'"
                    :name="'lesson'"
                    :data="listCheckBox"
                    v-model="searchModel.deptNm"
                  />
              </div>
              <div class="search_daywrap mg_r10">
                <span class="tag">{{
                  t("competencyStudent.form.studentNumber")
                }}</span>
                  <InputBase
                    :id="'studentNumber'"
                    :name="'studentNumber'"
                    v-model="searchModel.deptNm"
                  />
              </div>
              <div class="search_daywrap mg_r10">
                <span class="tag">{{
                  t("competencyStudent.form.name")
                }}</span>
                  <InputBase
                    :id="'name'"
                    :name="'name'"
                    v-model="searchModel.deptNm"
                  />
              </div>
              <button
                type="button"
                class="btn_round btn_lg btn_primary mg_l10"
                @click="search"
              >
                {{ t("competencyStudent.form.search") }}
              </button>
              <button
                type="button"
                class="btn_round btn_lg btn_gray mg_l5"
                @click="reset"
              >
                {{ t("competencyStudent.form.reset") }}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="box">
        <div class="mg_b15">
          <span class="note_cus">
            {{ t("competencyStudent.list.header") }}
          </span>
        </div>
        <div class="title-modal">
          <button
            type="button"
            class="btn_round btn_lg btn_primary mg_l5"
            @click="download()"
          >
            {{ t("competencyStudent.list.download") }}
          </button>
        </div>
        <div class="box_section">
          <GridComponentV2
            :key="key"
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
          </GridComponentV2>
        </div>
      </div>
    </section>
  </div>
</template>
<script lang="ts">
import {
  PAGINATION_PAGE_SIZE,
  PAGINATION_PAGE_SIZE_SELECTOR,
} from "@/constants/screen.const";
import { commonStore } from "@/stores/common";
import { useI18n } from "vue-i18n";

export default {
  components: {},
  setup() {
    const { t } = useI18n();
    const cmn = commonStore();
    return { t, cmn };
  },
  data() {
    return {
      pageTitle: this.t("competencyStudent.title"),
      breadcrumbItems: [],
      searchModel: {} as JobSearchModel,
      key: 1,
      rowData: [{}],
      columnDefs: ref([
        {
          headerName: this.t("competencyStudent.list.student"),
          field: "student",
          width: 150, 
        },
        {
          headerName: this.t("competencyStudent.list.job"),
          field: "job",
          width: 150,
        },
        {
          headerName: this.t("competencyStudent.list.abilityUnit"),
          field: "abilityUnit",
          flex: 1,
          children: [
            {
              headerName: this.t("competencyStudent.list.division"),
              field: "division",
              width: 100,
            },
            {
              headerName: this.t("competencyStudent.list.abilityUnitName"),
              field: "abilityUnitName",
              width: 100,
            },
            {
              headerName: this.t("competencyStudent.list.abilityUnitElement"),
              field: "abilityUnitElement",
              width: 100,
            }
          ],
        },
        {
          headerName: this.t("competencyStudent.list.jobAchievement"),
          field: "jobAchievement",
          children: [
            {
              headerName: this.t("competencyStudent.list.competencyUnitElement"),
              field: "unitElementScore",
              width: 100,
            },
            {
              headerName: this.t("competencyStudent.list.abilityUnit"),
              field: "unitScore",
              width: 100,
            },
            {
              headerName: this.t("competencyStudent.list.job"),
              field: "unitScore",
              width: 100,
            },
            {
              headerName: this.t("competencyStudent.list.student"),
              field: "unitScore",
              width: 100,
            },
          ],
        }
      ]),
      paginationPageSize: PAGINATION_PAGE_SIZE,
      paginationPageSizeSelector: PAGINATION_PAGE_SIZE_SELECTOR,
      totalRows: 0,
      listCheckBox: []
    };
  },
  methods: {
    fnPagination(pageNumber: any, pageSize: any) {},
  },
};
</script>
<style>
.title-modal {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 10px;
  margin-top: 10px;
}
</style>
