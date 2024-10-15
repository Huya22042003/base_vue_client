<template>
  <TModal :is-open="isOpen" :is-show-header="true" :is-show-footer="true" :modal-id="'modal_form_add_teacher'"
    @close-modal="onClose()">
    <!-- Modal content goes here -->
    <template #title>
      <!-- 학생대표 선택 -->
      <strong>{{ t("departmentMng.meettingReportEdu.modalAdd.titleStudent") }}</strong>
    </template>
    <template #default>
      <div>
        <div>
          <div class="btn_group btn_end" style="gap: 10px">
            <InputBase class="flex-[7]" :placeholder="searchPlace" id="search_teacher" v-model="dataSearch.name" />
            <button class="button btn_sm btn_medium_gray bo_rd6">
              <!-- 조회 -->
              {{ t("departmentMng.meettingReportEdu.modalAdd.search") }}
            </button>
            <button class="button btn_sm btn_white bo_rd6">
              <!-- 초기화 -->
              {{ t("departmentMng.meettingReportEdu.modalAdd.clear") }}
            </button>
          </div>
          <p class="box_title_sm text-red-500">
            {{ t("departmentMng.meettingReportEdu.modalAdd.subTitle") }}
          </p>
        </div>
        <div>
          <GridComponentV2 :rowData="data" :columnDefs="columnDefs" :paginationClientFlag="false"
            :paginationPageSize="paginationPageSize" :paginationPageSizeSelector="paginationPageSizeSelector"
            :totalRecord="totalRecord" @customPagination="fnPagination" ref="gridKey">
            <template #button> </template>
          </GridComponentV2>
        </div>
      </div>
    </template>
    <template #footer>
      <button type="button" class="btn_sm btn_white border_medium_gray bo_rd4" @click="onClose()">
        {{ t("common.close") }}<!-- 닫기 -->
      </button>
    </template>
  </TModal>
</template>

<script lang="ts">
import { useI18n } from "vue-i18n";
import { commonStore } from "../../../../stores/common";
import InputBase from "@/components/common/input/InputBase.vue";
import { ref } from "vue";
import GridComponentV2 from "@/components/common/grid/GridComponentV2.vue";
import ButtonGridComponent from "@/components/common/grid/ButtonGridComponent.vue";
import { STUDENT_CODE } from "../../../../constants/common.const";
import { PAGINATION_PAGE_SIZE, PAGINATION_PAGE_SIZE_SELECTOR, SUCCSESS_STATUS } from "../../../../constants/screen.const";
import { SelectListFilterDTO } from "../../../../stores/departmentService/meettingReportEdu/meettingReportEdu.type";
import { meetReportEduStore } from "../../../../stores/departmentService/meettingReportEdu";

export default {
  name: "AddTeacherModal",
  components: {
    InputBase,
    GridComponentV2,
  },
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    onClose: {
      type: Function,
      required: true,
    },
    idDetail: {
      type: Boolean,
    },
    lstIdSelect: {
      type: Array<String>
    }
  },
  setup() {
    const { t } = useI18n();
    const storeCommon = commonStore();
    const storeMeetReportEdu = meetReportEduStore()

    return {
      t,
      storeCommon,
      storeMeetReportEdu
    };
  },
  data() {
    return {
      searchPlace: this.t("departmentMng.meettingReportEdu.modalAdd.searchPlace"),
      paginationPageSize: PAGINATION_PAGE_SIZE,
      paginationPageSizeSelector: PAGINATION_PAGE_SIZE_SELECTOR,
      totalRecord: 0,
      dataSearch: {
        id: "",
        name: "",
        type: STUDENT_CODE,
        deptId: "dept1",
        lstIdSelect: this.lstIdSelect,
        page: 1,
        size: PAGINATION_PAGE_SIZE,
        sort: ""
      } as SelectListFilterDTO,
      data: [],
      columnDefs: ref([
        {
          headerName: this.t("departmentMng.meettingReportEdu.modalAdd.universityMajor"
          ) /* '단과대학' */,
          field: "majorNm",
          cellStyle: {
            textAlign: "center",
          },
        },
        {
          headerName: this.t("departmentMng.meettingReportEdu.modalAdd.department"
          ) /* '학과' */,
          field: "deptNm",
          cellStyle: {
            textAlign: "center",
          },
        },
        {
          headerName: this.t("departmentMng.meettingReportEdu.modalAdd.name"
          ) /* '성명' */,
          field: "userNm",
          cellStyle: {
            textAlign: "center",
          },
        },
        {
          headerName: this.t("departmentMng.meettingReportEdu.modalAdd.code"
          ) /* '학번' */,
          field: "userCd",
          cellStyle: {
            textAlign: "center",
          },
        },
        {
          headerName: this.t("departmentMng.meettingReportEdu.modalAdd.year"
          ) /* '학년' */,
          field: "eduYear",
          cellStyle: {
            textAlign: "center",
          },
        },
        {
          headerName: this.t("departmentMng.meettingReportEdu.modalAdd.management"
          ) /* '선택' */,
          cellRenderer: ButtonGridComponent,
          cellRendererParams: {
            onCustomEvent: this.handleStudent,
            value: this.t("departmentMng.meettingReportEdu.modalAdd.select"
            ),
            className: "button btn_sm btn_blue border_blue bo_rd4"
          },
          cellStyle: {
            textAlign: "center",
          },
        },
      ]),
    };
  },
  methods: {
    fnPagination(pageNumber: any, pagesSize: any) {
      this.dataSearch.page = pageNumber
      this.dataSearch.size = pagesSize

      this.getListData();
    },

    async getListData() {
      this.storeCommon.setLoading(true)

      await this.storeMeetReportEdu.searchSelectList(this.dataSearch)
      if (this.storeMeetReportEdu.status && this.storeMeetReportEdu.status == SUCCSESS_STATUS) {
        this.data = this.storeMeetReportEdu.resultData.content

        this.totalRecord = this.storeMeetReportEdu.resultData.totalElements ?? 0
      }

      this.storeCommon.setLoading(false)
    },

    handleStudent(data: any) {
      this.$swal({
        text: this.t('departmentMng.meettingReportEdu.message.selectStudent'),
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: this.t('common.save'),
        cancelButtonText: this.t('common.cancel'),
      })
        .then((result) => {
          if (result.isConfirmed) {
            this.storeCommon.setLoading(true);
            let newData = {
              id: data.userCd,
              name: data.userNm,
              position: this.t("departmentMng.meettingReportEdu.form.studentPosition"),
              department: data.deptNm
            }

            this.$emit('student-selected', newData);
            this.onClose();
            this.storeCommon.setLoading(false);
          }
        })
    },
  },
};
</script>

<style scoped>
/* Your styles here */
</style>