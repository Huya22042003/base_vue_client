<template>
  <div class="box_section mt-5">
    <div class="tbl_col tbl">
      <table>
        <thead>
          <tr>
            <th scope="row" class="ta_c" :colspan="1">
              <!-- 학년-학기 -->{{ t("eduProcessCreation.roadmapMng.title1") }}
            </th>
            <th scope="row" class="ta_c" :colspan="1">
              <!-- 직무역량 -->{{ t("eduProcessCreation.roadmapMng.title2") }}
            </th>
            <th scope="row" class="ta_c" :colspan="1">
              <!-- 하위역량 -->{{ t("eduProcessCreation.roadmapMng.title3") }}
            </th>
            <th scope="row" class="ta_c" :colspan="1">NCS</th>
            <th scope="row" class="ta_c" :colspan="1">KCS</th>
            <th scope="row" class="ta_c" :colspan="1">
              <!-- 교과목명 -->{{ t("eduProcessCreation.roadmapMng.title4") }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td scope="row" class="ta_c" :colspan="1">1-1</td>
            <td scope="row" class="ta_c" :colspan="1">직무역량A</td>
            <td scope="row" class="ta_c" :colspan="1">하위역량A-1</td>
            <td scope="row" class="ta_c" :colspan="1">🔴</td>
            <td scope="row" class="ta_c" :colspan="1"></td>
            <td scope="row" class="ta_c" :colspan="1">A교과목</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="btn_group btn_end mg_t30">
      <div class="btn_group btn_end">
        <button type="button" class="btn_md btn_round btn_gray">
          {{ t("common.print") }}
        </button>
        <button
          type="button"
          class="btn_round btn_md btn_primary"
          @click="next()"
        >
          {{ t("common.next") }}
        </button>
        <button
          type="button"
          class="btn_round btn_md btn_white"
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
        name: SCREEN.eduProcessCreation.name,
      });
    },
  },
});
</script>
<style scoped></style>
