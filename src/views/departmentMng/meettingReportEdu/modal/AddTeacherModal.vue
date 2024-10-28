<template>
  <TModal :is-open="isOpen" :is-show-header="true" :is-show-footer="true" :modal-id="'modal_form_add_teacher'"
    @close-modal="onClose()">
    <!-- Modal content goes here -->
    <template #title>
      <strong>
        <!-- 전임교원 선택 -->
        {{ t("departmentMng.meettingReportEdu.modalAdd.titleTeacher") }}</strong>
    </template>
    <template #default>
      <div>
        <div>
          <div class="btn_group btn_end" style="gap: 10px">
            <InputBase class="flex-[7]" :placeholder="searchPlace" id="search_teacher" v-model="dataSearch.name" />
            <button class="button btn_sm btn_medium_gray bo_rd6" @click="search()">
              <!-- 조회 -->
              {{ t("departmentMng.meettingReportEdu.modalAdd.search") }}
            </button>
            <button class="button btn_sm btn_white bo_rd6" @click="reset()">
              <!-- 초기화 -->
              {{ t("departmentMng.meettingReportEdu.modalAdd.clear") }}
            </button>
          </div>
          <p class="box_title_sm note_custom">
            {{ t("departmentMng.meettingReportEdu.modalAdd.subTitle") }}
          </p>
        </div>
        <div>
          <GridComponentV2 :rowData="data" :columnDefs="columnDefs" :paginationClientFlag="false" :key="key"
            :paginationPageSize="paginationPageSize" :paginationPageSizeSelector="paginationPageSizeSelector"
            :totalRecord="totalRecord" @customPagination="fnPagination" ref="gridKey">
            <template #button> </template>
          </GridComponentV2>
        </div>
      </div>
    </template>
    <template #footer>
      <button type="button" class="btn_sm btn_white border_medium_gray bo_rd4" @click="onClose()">
        <!-- 닫기 -->
        {{ t("common.close") }}
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
import { meetReportEduStore } from "../../../../stores/departmentService/meettingReportEdu";
import { SelectListFilterDTO } from "../../../../stores/departmentService/meettingReportEdu/meettingReportEdu.type";
import { CD_ID_MEET_ATTE1, STAFF_CODE } from "../../../../constants/common.const";
import { PAGINATION_PAGE_SIZE, PAGINATION_PAGE_SIZE_SELECTOR, SUCCSESS_STATUS } from "../../../../constants/screen.const";
import { getUserInfo } from "@/utils/storage";

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
    const userLogin = JSON.parse(getUserInfo());

    return {
      t,
      storeCommon,
      storeMeetReportEdu,
      userLogin
    };
  },
  data() {
    return {
      searchPlace: this.t("departmentMng.meettingReportEdu.modalAdd.searchPlace"),
      paginationPageSize: PAGINATION_PAGE_SIZE,
      paginationPageSizeSelector: PAGINATION_PAGE_SIZE_SELECTOR,
      totalRecord: 0,
      key: 1,
      dataSearch: {
        id: "",
        name: "",
        type: STAFF_CODE,
        deptId: this.userLogin.deptCd,
        lstIdSelect: this.lstIdSelect,
        page: 1,
        size: PAGINATION_PAGE_SIZE,
        sort: ""
      } as SelectListFilterDTO,
      data: [],
      columnDefs: ref([
        {
          headerName: this.t("departmentMng.meettingReportEdu.modalAdd.department"
          ),
          field: "deptNm",
          cellStyle: {
            textAlign: "center",
          },
        },
        {
          headerName: this.t("departmentMng.meettingReportEdu.modalAdd.name"
          ),
          field: "userNm",
          cellStyle: {
            textAlign: "center",
          },
        },
        {
          headerName: this.t("departmentMng.meettingReportEdu.modalAdd.code"
          ),
          field: "userCd",
          cellStyle: {
            textAlign: "center",
          },
        },
        {
          headerName: this.t("departmentMng.meettingReportEdu.modalAdd.posi"
          ),
          field: "posi",
          cellStyle: {
            textAlign: "center",
          },
        },
        {
          headerName: this.t("departmentMng.meettingReportEdu.modalAdd.management"
          ),
          cellRenderer: ButtonGridComponent,
          cellRendererParams: {
            onCustomEvent: this.handleTeacher,
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

    search() {
      this.dataSearch.page = 1
      this.dataSearch.id = this.dataSearch.name

      this.key++
    },

    reset() {
      this.dataSearch = {
        id: "",
        name: "",
        type: STAFF_CODE,
        deptId: this.userLogin.deptCd,
        lstIdSelect: this.lstIdSelect,
        page: 1,
        size: this.dataSearch.size,
        sort: ""
      } as SelectListFilterDTO
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

    handleTeacher(data: any) {
      console.log("===", data)
      this.$swal({
        text: `${data.userNm} ${data.posi}을/를 선택하시겠습니까?`,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: this.t('common.select'),
        cancelButtonText: this.t('common.cancel'),
      })
        .then((result) => {
          if (result.isConfirmed) {
            this.storeCommon.setLoading(true);
            let newData = {
              id: data.userCd,
              name: data.userNm,
              position: data.posi,
              department: "",
              divCd: CD_ID_MEET_ATTE1
            }

            this.$emit('teacher-selected', newData);
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
