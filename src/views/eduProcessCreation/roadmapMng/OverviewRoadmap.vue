<template>
  <div class="box_section mt-5">
    <div class="tbl_col tbl">
      <table>
        <thead>
          <tr>
            <th scope="row" class="ta_c" :colspan="1" :rowspan="2">
              <!-- 교과목 -->{{ t("eduProcessCreation.roadmapMng.title5") }}
            </th>
            <th scope="row" class="ta_c" :colspan="6">
              <!-- 학년-학기 -->{{ t("eduProcessCreation.roadmapMng.title6") }}
            </th>
            <th scope="row" class="ta_c" :colspan="1" :rowspan="2">
              <!-- 주문식 교과목 -->{{
                t("eduProcessCreation.roadmapMng.title7")
              }}
            </th>
            <th scope="row" class="ta_c" :colspan="1" :rowspan="2">
              <!-- 중점 교과목 -->{{
                t("eduProcessCreation.roadmapMng.title8")
              }}
            </th>
            <th scope="row" class="ta_c" :colspan="1" :rowspan="2">
              <!-- 캡스톤 디자인 교과목 -->{{
                t("eduProcessCreation.roadmapMng.title9")
              }}
            </th>
            <th scope="row" class="ta_c" :colspan="1" :rowspan="2">
              <!-- 창업 교과목 -->{{
                t("eduProcessCreation.roadmapMng.title10")
              }}
            </th>
          </tr>
          <tr>
            <th scope="row" class="ta_c" :colspan="1">1-1</th>
            <th scope="row" class="ta_c" :colspan="1">1-2</th>
            <th scope="row" class="ta_c" :colspan="1">2-1</th>
            <th scope="row" class="ta_c" :colspan="1">2-2</th>
            <th scope="row" class="ta_c" :colspan="1">3-1</th>
            <th scope="row" class="ta_c" :colspan="1">3-2</th>
          </tr>
          <!-- Semester 1 -->
        </thead>
        <tbody>
          <tr>
            <td scope="row" class="ta_c" :colspan="1">교과목 1</td>
            <td scope="row" class="ta_c" :colspan="1">●</td>
            <td scope="row" class="ta_c" :colspan="1"></td>
            <td scope="row" class="ta_c" :colspan="1"></td>
            <td scope="row" class="ta_c" :colspan="1"></td>
            <td scope="row" class="ta_c" :colspan="1"></td>
            <td scope="row" class="ta_c" :colspan="1">●</td>
            <td scope="row" class="ta_c" :colspan="1">●</td>
            <td scope="row" class="ta_c" :colspan="1"></td>
            <td scope="row" class="ta_c" :colspan="1"></td>
            <td scope="row" class="ta_c" :colspan="1"></td>
          </tr>
          <tr>
            <td scope="row" class="ta_c" :colspan="1">교과목 2</td>
            <td scope="row" class="ta_c" :colspan="1">●</td>
            <td scope="row" class="ta_c" :colspan="1"></td>
            <td scope="row" class="ta_c" :colspan="1"></td>
            <td scope="row" class="ta_c" :colspan="1"></td>
            <td scope="row" class="ta_c" :colspan="1"></td>
            <td scope="row" class="ta_c" :colspan="1"></td>
            <td scope="row" class="ta_c" :colspan="1">●</td>
            <td scope="row" class="ta_c" :colspan="1">●</td>
            <td scope="row" class="ta_c" :colspan="1"></td>
            <td scope="row" class="ta_c" :colspan="1"></td>
          </tr>
          <tr>
            <td scope="row" class="ta_c" :colspan="1">교과목 3</td>
            <td scope="row" class="ta_c" :colspan="1">●</td>
            <td scope="row" class="ta_c" :colspan="1"></td>
            <td scope="row" class="ta_c" :colspan="1"></td>
            <td scope="row" class="ta_c" :colspan="1"></td>
            <td scope="row" class="ta_c" :colspan="1"></td>
            <td scope="row" class="ta_c" :colspan="1"></td>
            <td scope="row" class="ta_c" :colspan="1">●</td>
            <td scope="row" class="ta_c" :colspan="1">●</td>
            <td scope="row" class="ta_c" :colspan="1"></td>
            <td scope="row" class="ta_c" :colspan="1"></td>
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
          class="btn_md btn_round btn_primary"
          @click="next()"
        >
          {{ t("common.next") }}
        </button>
        <button
          type="button"
          class="btn_md btn_round btn_white"
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
      this.$emit("tabChange7", 72);
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
