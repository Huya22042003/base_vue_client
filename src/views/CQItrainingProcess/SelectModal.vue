<template>
  <TModal
    :is-open="isOpen"
    :is-show-header="true"
    :is-show-footer="true"
    :modal-id="'CompositionSelectModal'"
    @close-modal="onClose()"
  >
    <template #title>
      <strong>내부 자체평가위원 추가</strong>
    </template>
    <template #default>
      <div>
        <p class="text_blue">
          ※ 이름 또는 교번을 검색해서 내부 자체평가위원을 선택해주세요.
        </p>
        <div class="search_section">
          <div class="search_toggle lg center">
            <div class="right wd_p100">
              <div class="search_row wd_p75">
                <InputBase
                  type="search"
                  class="form_style"
                  v-model="dataSearch.name"
                  placeholder="보고 싶은 비교과 프로그램을 찾아보세요"
                />
                <button type="button" class="btn_search btn_icon icon_only">
                  검색
                </button>
              </div>
              <button @click="search()" type="button" class="btn_round btn_lg btn_primary mg_l10">
                검색
              </button>
              <button @click="reset()" type="button" class="btn_round btn_lg btn_gray mg_l5">
                초기화
              </button>
            </div>
          </div>
        </div>
        <div>
          <GridComponentV2
            :rowData="data"
            :columnDefs="columnDefs"
            :paginationClientFlag="false"
            :key="key"
            :paginationPageSize="paginationPageSize"
            :paginationPageSizeSelector="paginationPageSizeSelector"
            :totalRecord="totalRecord"
            @customPagination="fnPagination"
            ref="gridKey"
          >
          </GridComponentV2>
        </div>
      </div>
    </template>
    <template #footer>
      <button
        type="button"
        class="button btn_xl btn_white popup_close"
        @click="onClose()"
      >
        닫기
      </button>
    </template>
  </TModal>
</template>
<script lang="ts">
import ButtonGridComponent from "@/components/common/grid/ButtonGridComponent.vue";
import GridComponentV2 from "@/components/common/grid/GridComponentV2.vue";
import InputBase from "@/components/common/input/InputBase.vue";
import {
  PAGINATION_PAGE_SIZE,
  PAGINATION_PAGE_SIZE_SELECTOR,
} from "@/constants/screen.const";
import { commonStore } from "@/stores/common";
import { MESSAGE_ERROR_API } from "@/constants/common.const";
import { SUCCSESS_STATUS } from "@/constants/screen.const";
import { getSelectStaffType } from "@/stores/eduProcessCreation/typeTalentEdu/typeTalentEdu.service";
import {
  SelectStaffFilterDTO,
  StaffInfoResDTO,
} from "@/stores/eduProcessCreation/typeTalentEdu/typeTalentEdu.type";
import { EduCourseCommResDTO } from "@/stores/eduProcessCreation/typeTalentEdu/typeTalentEdu.type";
import { CD_INTERNAL } from "@/constants/common.const";

export default {
  components: {
    ButtonGridComponent,
    GridComponentV2,
    InputBase,
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
      type: Array<String|Number>,
    },
  },
  setup: () => {
    const router = useRouter();
    const storeCommon = commonStore();
    const { t } = useI18n();
    const id = window.history.state.id;

    return { router, storeCommon, t, id };
  },
  data() {
    return {
      searchPlace: this.t(
        "departmentMng.meettingReportEdu.modalAdd.searchPlace"
      ),
      paginationPageSize: PAGINATION_PAGE_SIZE,
      paginationPageSizeSelector: PAGINATION_PAGE_SIZE_SELECTOR,
      totalRecord: 0,
      dataSearch: {
        name: "",
        page: 1,
        size: PAGINATION_PAGE_SIZE,
        sort: "",
      } as SelectStaffFilterDTO,
      data: [] as StaffInfoResDTO[],
      key: 0,
      columnDefs: ref([
        {
          headerName: "계열",
          field: "affli",
          cellStyle: {
            textAlign: "center",
          },
        },
        {
          headerName: "학과/학부",
          field: "major",
          cellStyle: {
            textAlign: "center",
          },
        },
        {
          headerName: "성명",
          field: "nm",
          cellStyle: {
            textAlign: "center",
          },
        },
        {
          headerName: "교번",
          field: "code",
          cellStyle: {
            textAlign: "center",
          },
        },
        {
          headerName: "직책",
          field: "posi",
          cellStyle: {
            textAlign: "center",
          },
        },
        {
          headerName: "선택",
          cellRenderer: ButtonGridComponent,
          cellRendererParams: {
            onCustomEvent: this.onSelected,
            value: "선택",
            className: "btn_round btn_sm btn_white",
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
      this.dataSearch.page = pageNumber;
      this.dataSearch.size = pagesSize;

      this.getAllData();
    },
    getAllData() {
      this.storeCommon.setLoading(true);
      getSelectStaffType(this.dataSearch)
        .then((res:any) => {
          if (res.status === SUCCSESS_STATUS) {
            this.totalRecord = res.data.data.totalElements;
            this.data = res.data.data.content;
          }
        })
        .catch((err:any) => {
          throw new Error(MESSAGE_ERROR_API);
        })
        .finally(() => {
          this.storeCommon.setLoading(false);
        });
    },
    search() {
      this.dataSearch.page = 1;
      this.getAllData();
    },
    reset() {
      this.dataSearch = {
        name: "",
        page: 1,
        size: PAGINATION_PAGE_SIZE,
        sort: "",
      }
    },
    onSelected(data: StaffInfoResDTO) {
      this.$confirm(
        `${data.nm}을(를) 선택하시겠어요?`,
        "",
        (isConfirm: Boolean) => {
          if (isConfirm) {

            const dataSelect = {
              commSeq: "",
              affli: data.affli,
              divCd: CD_INTERNAL,
              id: data.code,
              nm: data.nm,
              major: data.major,
              posi: data.posi
            } as EduCourseCommResDTO;

            this.$emit("dataSelect", dataSelect);
            this.onClose();
          }
        }
      );
    },
  },
};
</script>
<style>
.text_blue {
  color: #0029ff;
}
</style>
