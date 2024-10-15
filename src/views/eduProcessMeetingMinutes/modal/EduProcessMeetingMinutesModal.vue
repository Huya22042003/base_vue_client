<template>
  <TModal
    :is-open="isOpen1"
    :is-show-header="true"
    :is-show-footer="true"
    :modal-id="'modal_form'"
    @close-modal="onClose"
  >
    <!-- Modal content goes here -->
    <template #title>
      <strong>내부 참석자 선택</strong>
    </template>
    <template #default>
      <div class="search_box">
        <div class="search_section">
          <div class="search_toggle lg center">
            <div class="select_row sm"></div>
            <div class="search_row">
              <input
                type="search"
                class="form_style wd_p100"
                placeholder="성명 또는 교번 검색"
              />
              <button type="button" class="btn_search btn_icon icon_only"></button>
            </div>
            <button type="button" class="btn_round btn_lg btn_primary mg_l10">
              검색
            </button>
            <button type="button" class="btn_round btn_lg btn_gray mg_l5">초기화</button>
          </div>
        </div>
      </div>
      <div class="tbl tbl_col tbl_scroll scrollx_tbl_xs">
        <div class="tbl_scroll_body"></div>
      </div>
      <div class="tbl tbl_col tbl_scroll scrollx_tbl_xs">
        <table>
          <caption>
            스크롤 테이블 제목
          </caption>
          <colgroup>
            <col style="width: auto" />
            <col style="width: 18%" />
            <col style="width: 18%" />
            <col style="width: 18%" />
          </colgroup>
          <thead>
            <tr>
              <th scope="row">학과</th>
              <th scope="row">성명</th>
              <th scope="row">교번</th>
              <th scope="row">직책</th>
              <th scope="row">선택</th>
            </tr>
          </thead>
        </table>
        <div class="tbl_scroll_body">
          <table>
            <caption>
              테이블 제목
            </caption>
            <colgroup>
              <col style="width: auto" />
              <col style="width: 18%" />
              <col style="width: 18%" />
              <col style="width: 18%" />
            </colgroup>
            <tbody>
              <tr v-for="(row, index) in rows" :key="index">
                <th scope="row">{{ row.sust }}</th>
                <td>{{ row.name }}</td>
                <td>{{ row.profId }}</td>
                <td>{{ row.sust }}</td>
                <td class="td_input">
                  <button type="button" class="btn_round btn_sm btn_white">선택</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>
    <template #footer>
      <!-- Footer content goes here -->
      <button
        type="button"
        class="button btn_md btn_white popup_close"
        @click="cancelAction"
      >
        닫기
      </button>
    </template>
  </TModal>
</template>
<script lang="ts">
import TModal from "@/components/common/modal/TModal.vue";
import { commonStore } from "@/stores/common";
import {
  PAGINATION_PAGE_SIZE,
  PAGINATION_PAGE_SIZE_SELECTOR,
} from "@/constants/screen.const";
import ButtonGridComponent from "@/components/common/grid/ButtonGridComponent.vue";

export default defineComponent({
  name: "EduProcessMeetingMinutesModal",
  components: {
    TModal,
    ButtonGridComponent,
  },
  props: {
    isOpen1: {
      type: Boolean,
    },
    onClose: {
      type: Function,
    },
    idDetail: {
      type: Boolean,
    },
  },

  setup() {
    const { t } = useI18n();
    const cmn = commonStore();
    let modeScreen = ref("");
    return {
      modeScreen,
      cmn,
      t,
    };
  },

  data() {
    return {
      rows: [
        { sust: "data1", name: "data1", profId: "data1", position: "data1" },
        { sust: "data2", name: "data2", profId: "data2", position: "data2" },
        { sust: "data3", name: "data3", profId: "data3", position: "data3" },
      ],
    };
  },
  methods: {
    cancelAction() {
      this.onClose();
    },
    handleCustomClick(data: any) {
      this.dataSelected = data;
      this.$emit("rowSelected", this.dataSelected);
      console.log(this.dataSelected);
      this.onClose();
    },
  },
});
</script>
