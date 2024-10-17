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
          <template v-for="(view, index) in dataView">
            <template v-for="(abil, indexAbil) in view.listAbil">
              <template v-for="(capa, indexCapa) in abil.capaUnit">
                <tr>
                  <td
                    scope="row"
                    class="ta_c"
                    v-if="indexCapa == 0"
                    :rowspan="abil.capaUnit.length"
                    :colspan="1"
                  >
                    {{ view.yearSemester }}
                  </td>
                  <td
                    scope="row"
                    class="ta_c"
                    v-if="indexCapa == 0"
                    :rowspan="abil.capaUnit.length"
                    :colspan="1"
                  >
                    {{ abil.jobAbilNm }}
                  </td>
                  <td scope="row" class="ta_c" :colspan="1">
                    {{ capa.capaUnitNm }}
                  </td>
                  <td scope="row" class="ta_c" :colspan="1">
                    {{ capa.typeCd ? "" : "🔴" }}
                  </td>
                  <td scope="row" class="ta_c" :colspan="1">
                    {{ capa.typeCd ? "🔴" : "" }}
                  </td>
                  <td scope="row" class="ta_c" :colspan="1">
                    {{ capa.sbjtNm }}
                  </td>
                </tr>
              </template>
            </template>
          </template>
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
import { getLinkRoadMap } from "@/stores/eduProcessCreation/roadmapMng/roadmapMng.service";
import {
  LinkRoadMapResDTO,
  LinkRoadMapView,
} from "@/stores/eduProcessCreation/roadmapMng/roadmapMng.type";
import { KCS_CD_ID } from "@/constants/common.const";

export default defineComponent({
  setup: () => {
    const router = useRouter();
    const storeCommon = commonStore();
    const { t } = useI18n();
    const id = window.history.state.id;

    return { router, storeCommon, t, id };
  },
  data() {
    return {
      dataRes: [] as LinkRoadMapResDTO[],
      dataView: [] as LinkRoadMapView[],
    };
  },
  beforeMount() {
    this.getData();
  },
  methods: {
    getData() {
      this.storeCommon.setLoading(true);
      getLinkRoadMap({ eduCourseSeq: this.id })
        .then((res) => {
          this.dataRes = res.data.data;
          this.convertData();
        })
        .finally(() => {
          this.storeCommon.setLoading(false);
        });
    },
    convertData() {
      let dataYear = [] as any[];

      this.dataRes.forEach((item) => {
        const yearSemester = `${item.gradeNm}-${item.termNm}`;
        if (
          !dataYear.filter((item) =>
            yearSemester.includes(item.yearSemester)
          )[0]
        ) {
          dataYear.push({ yearSemester: yearSemester });
        }
      });

      dataYear.sort((a, b) => a.yearSemester.localeCompare(b.yearSemester));

      dataYear = dataYear.map((item) => {
        const listAbil = [] as any[];
        this.dataRes.forEach((res) => {
          if (
            `${res.gradeNm}-${res.termNm}`.includes(item.yearSemester) &&
            !listAbil.filter((item) =>
              res.jobAbilSeq.includes(item.jobAbilSeq)
            )[0]
          ) {
            listAbil.push({
              jobAbilSeq: res.jobAbilSeq,
              jobAbilNm: res.jobAbilNm,
            });
          }
        });

        listAbil.forEach((abil, index) => {
          const capaUnit = [] as any[];
          this.dataRes.forEach((res: LinkRoadMapResDTO) => {
            if (
              `${res.gradeNm}-${res.termNm}`.includes(item.yearSemester) &&
              abil.jobAbilSeq == res.jobAbilSeq
            ) {
              capaUnit.push({
                capaUnitSeq: res.capaUnitSeq,
                capaUnitNm: res.capaUnitNm,
                typeCd: res.typeCd == KCS_CD_ID,
                sbjtNm: res.sbjtNm,
              });
            }
          });
          listAbil.splice(index, 1, {
            jobAbilSeq: abil.jobAbilSeq,
            jobAbilNm: abil.jobAbilNm,
            capaUnit: capaUnit,
          });
        });

        item.listAbil = listAbil;

        return item;
      });

      this.dataView = dataYear as LinkRoadMapView[];
    },
    next() {
      this.$emit("tabChange7", 73);
    },
    back() {
      this.router.push({
        name: SCREEN.eduProcessCreation.name,
      });
    },
  },
});
</script>
<style scoped>
@import url("../eduCourseCustom.css");
</style>
