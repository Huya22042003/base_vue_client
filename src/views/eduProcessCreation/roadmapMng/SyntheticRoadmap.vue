<template>
  <div class="box_section mt-5">
    <div class="box_section mt-13">
      <div class="tbl tbl_col">
        <table>
          <colgroup>
            <col style="width: 25%" />
            <col style="width: auto" />
          </colgroup>
          <thead>
            <tr>
              <th scope="row" :colspan="1">
                <!-- 학과명 -->{{ t("eduProcessCreation.roadmapMng.title11") }}
              </th>
              <td scope="row" :colspan="1">
                <div class="line_heigth pd_20">
                  {{ data.deptNm }}
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row" :colspan="1">
                <!-- 교육목표 -->{{
                  t("eduProcessCreation.roadmapMng.title12")
                }}
              </th>
              <td scope="row" :colspan="1">
                <div class="line_heigth pd_20">
                  {{ data.targetNm }}
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row" :colspan="1">
                <!-- 인재상 -->{{ t("eduProcessCreation.roadmapMng.title13") }}
              </th>
              <td scope="row" :colspan="1">
                <div class="line_heigth pd_20">
                  {{ data.typeDeptNm }}
                </div>
              </td>
            </tr>
          </thead>
        </table>
        <table>
          <colgroup>
            <col style="width: 25%" />
            <col style="width: 25%" />
            <col style="width: 25%" />
            <col style="width: 25%" />
          </colgroup>
          <thead>
            <tr>
              <th scope="row" :colspan="1" :rowspan="3">
                <!-- 인재양성유형 핵심직무 -->{{
                  t("eduProcessCreation.roadmapMng.title14")
                }}
              </th>
              <th scope="row" :colspan="1" class="ta_c">
                <!-- 인재양성유형 -->{{
                  t("eduProcessCreation.roadmapMng.title15")
                }}
              </th>
              <th scope="row" :colspan="1" class="ta_c">
                <!-- 주요직무내용 -->{{
                  t("eduProcessCreation.roadmapMng.title16")
                }}
              </th>
              <th scope="row" :colspan="1" class="ta_c">
                <!-- 관련 분야 비전 -->{{
                  t("eduProcessCreation.roadmapMng.title17")
                }}
              </th>
            </tr>
            <tr>
              <td scope="row" :colspan="1" class="ta_c">
                <div class="line_heigth pd_20">인재양성유형A</div>
              </td>
              <td scope="row" :colspan="1" class="ta_c">
                <div class="line_heigth pd_20">인재양성유형A</div>
              </td>
              <td scope="row" :colspan="1" class="ta_c">
                <div class="line_heigth pd_20">인재양성유형A</div>
              </td>
            </tr>
            <tr>
              <td scope="row" :colspan="1" class="ta_c">
                <div class="line_heigth pd_20">인재양성유형A</div>
              </td>
              <td scope="row" :colspan="1" class="ta_c">
                <div class="line_heigth pd_20">인재양성유형A</div>
              </td>
              <td scope="row" :colspan="1" class="ta_c">
                <div class="line_heigth pd_20">인재양성유형A</div>
              </td>
            </tr>
          </thead>
        </table>
        <table>
          <colgroup>
            <col style="width: 25%" />
            <col style="width: 25%" />
            <col style="width: 25%" />
            <col style="width: 25%" />
          </colgroup>
          <thead>
            <tr>
              <th scope="row" :colspan="1" :rowspan="2">
                <!-- 핵심역량 -->{{
                  t("eduProcessCreation.roadmapMng.title18")
                }}
              </th>
              <th scope="row" :colspan="1" class="ta_c">
                <!-- 인재양성유형 -->{{
                  t("eduProcessCreation.roadmapMng.title19")
                }}
              </th>
              <th scope="row" :colspan="1" class="ta_c">
                <!-- 핵심역량 -->{{
                  t("eduProcessCreation.roadmapMng.title20")
                }}
              </th>
              <th scope="row" :colspan="1" class="ta_c">
                <!-- 하위역량 -->{{
                  t("eduProcessCreation.roadmapMng.title21")
                }}
              </th>
            </tr>
            <tr>
              <td scope="row" :colspan="1" class="ta_c">
                <div class="line_heigth pd_20">인재양성유형A</div>
              </td>
              <td scope="row" :colspan="1" class="ta_c">
                <div class="line_heigth pd_20">인재양성유형A</div>
              </td>
              <td scope="row" :colspan="1" class="ta_c">
                <div class="line_heigth pd_20">인재양성유형A</div>
              </td>
            </tr>
          </thead>
        </table>
        <table v-if="data.relatedCertificate">
          <colgroup>
            <col style="width: 25%" />
            <col style="width: 25%" />
            <col style="width: 50%" />
          </colgroup>
          <thead>
            <tr>
              <th
                scope="row"
                :colspan="1"
                :rowspan="data.relatedCertificate.length + 1"
              >
                <!-- 관련 자격증 -->{{
                  t("eduProcessCreation.roadmapMng.title22")
                }}
              </th>
              <th scope="row" :colspan="1" class="ta_c">
                <!-- 직무 -->{{ t("eduProcessCreation.roadmapMng.title23") }}
              </th>
              <th scope="row" :colspan="1" class="ta_c">
                <!-- 관련 자격증 -->{{
                  t("eduProcessCreation.roadmapMng.title24")
                }}
              </th>
            </tr>
            <tr v-for="item in data.relatedCertificate">
              <td scope="row" :colspan="1" class="ta_c">
                <div class="line_heigth pd_20">{{ item.jobNm }}</div>
              </td>
              <td scope="row" :colspan="1" class="ta_c">
                <div class="line_heigth pd_20">{{ item.cert }}</div>
              </td>
            </tr>
          </thead>
        </table>
        <table v-if="data.graduationRoadmap">
          <colgroup>
            <col style="width: 25%" />
            <col style="width: 25%" />
            <col style="width: 50%" />
          </colgroup>
          <thead>
            <tr>
              <th
                scope="row"
                :colspan="1"
                :rowspan="data.graduationRoadmap.length + 1"
              >
                <!-- 졸업 후 진로 -->{{
                  t("eduProcessCreation.roadmapMng.title25")
                }}
              </th>
              <th scope="row" :colspan="1" class="ta_c">
                <!-- 인재양성유형 -->{{
                  t("eduProcessCreation.roadmapMng.title26")
                }}
              </th>
              <th scope="row" :colspan="1" class="ta_c">
                <!-- 졸업 후 진로 -->{{
                  t("eduProcessCreation.roadmapMng.title27")
                }}
              </th>
            </tr>
            <tr v-for="item in data.graduationRoadmap">
              <td scope="row" :colspan="1" class="ta_c">
                <div class="line_heigth pd_20">{{ item.typeNm }}</div>
              </td>
              <td scope="row" :colspan="1" class="ta_c">
                <div class="line_heigth pd_20">{{ item.career }}</div>
              </td>
            </tr>
          </thead>
        </table>
      </div>
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
import { getSyntheticRoadMap } from "@/stores/eduProcessCreation/roadmapMng/roadmapMng.service";
import { SyntheticRoadmapResDTO } from "@/stores/eduProcessCreation/roadmapMng/roadmapMng.type";
import { EduCourseSelResDTO } from "@/stores/eduProcessCreation/eduCourse/eduProcess.type";

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
      data: {} as SyntheticRoadmapResDTO,
    };
  },
  beforeMount() {
    this.getData();
  },
  methods: {
    getData() {
      this.storeCommon.setLoading(true);
      getSyntheticRoadMap({ eduCourseSeq: this.id })
        .then((res) => {
          this.data = res.data.data;
          this.data.targetNm = this.convertDataNmToString(this.data.targetDept);
          this.data.typeDeptNm = this.convertDataNmToString(this.data.typeDept);
        })
        .finally(() => {
          this.storeCommon.setLoading(false);
        });
    },
    convertDataNmToString(data: EduCourseSelResDTO[]): string {
      return data.map((item) => item.refrNm).join(", ");
    },
    next() {
      this.$emit("nextTab", 80);
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
.line_heigth {
  line-height: 30px;
}
.tbl table thead td {
  border-bottom: 1px solid var(--dark1);
}
</style>
