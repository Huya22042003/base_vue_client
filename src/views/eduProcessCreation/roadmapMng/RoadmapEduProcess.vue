<template>
  <div class="box_section mt-5">
    <div class="tbl_col tbl">
      <table>
        <thead>
          <tr>
            <th scope="row" class="ta_c" :colspan="2">
              트랙구분
            </th>
            <th scope="row" class="ta_c" :colspan="3">
              전공트랙
            </th>
            <th scope="row" class="ta_c" :colspan="3">
              주문식트랙 (과정명: )
            </th>
          </tr>
          <tr>
            <th scope="row" class="ta_c" :colspan="2">
              인재양성유형
            </th>
            <th scope="row" class="ta_c" :colspan="3">
              
            </th>
            <th scope="row" class="ta_c" :colspan="3">
              
            </th>
          </tr>
          <tr>
            <th scope="row" class="ta_c" :colspan="2">
              핵심직무
            </th>
            <th scope="row" class="ta_c" :colspan="1">
              000기획
            </th>
            <th scope="row" class="ta_c" :colspan="1">
              개발
            </th>
            <th scope="row" class="ta_c" :colspan="1">
              000
            </th>
            <th scope="row" class="ta_c" :colspan="1">
              000
            </th>
            <th scope="row" class="ta_c" :colspan="1">
              000
            </th>
            <th scope="row" class="ta_c" :colspan="1">
              000
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td scope="row" class="ta_c" :colspan="1" :rowspan="6">전공 교과목</td>
            <td scope="row" class="ta_c" :colspan="1">1 - 1</td>
            <td scope="row" class="ta_c" :colspan="1"></td>
            <td scope="row" class="ta_c" :colspan="1"></td>
            <td scope="row" class="ta_c" :colspan="1"></td>
            <td scope="row" class="ta_c" :colspan="1"></td>
            <td scope="row" class="ta_c" :colspan="1"></td>
            <td scope="row" class="ta_c" :colspan="1"></td>
          </tr>
          <tr>
            <td scope="row" class="ta_c" :colspan="1">1 - 2</td>
            <td scope="row" class="ta_c" :colspan="1"></td>
            <td scope="row" class="ta_c" :colspan="1"></td>
            <td scope="row" class="ta_c" :colspan="1"></td>
            <td scope="row" class="ta_c" :colspan="1"></td>
            <td scope="row" class="ta_c" :colspan="1"></td>
            <td scope="row" class="ta_c" :colspan="1"></td>
          </tr>
          <tr>
            <td scope="row" class="ta_c" :colspan="1">2 - 1</td>
            <td scope="row" class="ta_c" :colspan="1"></td>
            <td scope="row" class="ta_c" :colspan="1"></td>
            <td scope="row" class="ta_c" :colspan="1"></td>
            <td scope="row" class="ta_c" :colspan="1"></td>
            <td scope="row" class="ta_c" :colspan="1"></td>
            <td scope="row" class="ta_c" :colspan="1"></td>
          </tr>
          <tr>
            <td scope="row" class="ta_c" :colspan="1">2 - 2</td>
            <td scope="row" class="ta_c" :colspan="1"></td>
            <td scope="row" class="ta_c" :colspan="1"></td>
            <td scope="row" class="ta_c" :colspan="1"></td>
            <td scope="row" class="ta_c" :colspan="1"></td>
            <td scope="row" class="ta_c" :colspan="1"></td>
            <td scope="row" class="ta_c" :colspan="1"></td>
          </tr>
          <tr>
            <td scope="row" class="ta_c" :colspan="1">1 - 2</td>
            <td scope="row" class="ta_c" :colspan="1"></td>
            <td scope="row" class="ta_c" :colspan="1"></td>
            <td scope="row" class="ta_c" :colspan="1"></td>
            <td scope="row" class="ta_c" :colspan="1"></td>
            <td scope="row" class="ta_c" :colspan="1"></td>
            <td scope="row" class="ta_c" :colspan="1"></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="btn_group btn_end mg_t30">
      <div class="btn_group btn_end">
        <button type="button" class="btn_lg btn_round btn_gray">
          {{ t("common.print") }}
        </button>
        <button
          type="button"
          class="btn_round btn_lg btn_primary"
          @click="next()"
        >
          {{ t("common.next") }}
        </button>
        <button
          type="button"
          class="btn_round btn_lg btn_white"
          @click="back()"
        >
          {{ t("common.list") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { commonStore } from "@/stores/common";
import { SCREEN } from "@/router/screen";
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

export default defineComponent({
  setup: () => {
    const router = useRouter();
    const storeCommon = commonStore();
    const { t } = useI18n();
    const id = window.history.state.id;

    return { router, storeCommon, t, id };
  },
  beforeMount() {},
  methods: {
    next() {
      this.$emit("tabChange7", 74);
    },
    back() {
      this.router.push({
        path: SCREEN.eduProcessCreation.path,
      });
    },
  },
});
</script>
<style scoped>
@import url("../eduCourseCustom.css");
</style>
