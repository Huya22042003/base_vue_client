<template>
  <section id="content" class="content_wrapper grid_content" tabindex="0">
    <Breadcrumb
      :pageTitle="pageTitle"
      :breadcrumbItems="breadcrumbItems"
    ></Breadcrumb>
    <div class="search_box">
      <div class="search_section">
        <p class="box_title_sm">{{ t("finalArchi.action.titleSub1") }}</p>
        <div class="tbl tbl_col tbl_scroll scrollx_tbl_xs">
          <table class="tbl_col">
            <caption>
              table col scroll
            </caption>
            <colgroup>
              <col style="width: 8%" />
              <col style="width: 7%" />
              <col style="width: 7%" />
              <col style="width: 7%" />
              <col style="width: 7%" />
              <col style="width: 7%" />
              <col style="width: 7%" />
              <col style="width: 7%" />
              <col style="width: 7%" />
              <col style="width: 7%" />
              <col style="width: 7%" />
              <col style="width: 7%" />
              <col style="width: 7%" />
              <col style="width: 7%" />
            </colgroup>
            <thead>
              <tr>
                <th scope="col">{{ t("finalArchi.action.col1_1") }}</th>
                <th scope="col">{{ t("finalArchi.action.col1_2") }}</th>
                <th scope="col">{{ t("finalArchi.action.col1_3") }}</th>
                <th scope="col">{{ t("finalArchi.action.col1_4") }}</th>
                <th scope="col">{{ t("finalArchi.action.col1_5") }}</th>
                <th scope="col">{{ t("finalArchi.action.col1_6") }}</th>
                <th scope="col">{{ t("finalArchi.action.col1_7") }}</th>
                <th scope="col">{{ t("finalArchi.action.col1_8") }}</th>
                <th scope="col">{{ t("finalArchi.action.col1_9") }}</th>
                <th scope="col">{{ t("finalArchi.action.col1_10") }}</th>
                <th scope="col">{{ t("finalArchi.action.col1_11") }}</th>
                <th scope="col">{{ t("finalArchi.action.col1_12") }}</th>
                <th scope="col">{{ t("finalArchi.action.col1_13") }}</th>
                <th scope="col">{{ t("finalArchi.action.col1_14") }}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td rowspan="2" class="score-cell">A0/40% B0/90%</td>
                <!-- check điều kiện  (đang QA)-->
                <td rowspan="2" class="score-cell">
                  {{ finalAchiRltModel.scoreMedi }}
                </td>
                <td rowspan="2" class="score-cell">
                  {{ finalAchiDetailModel.cntStd }}
                </td>
                <td>{{ finalAchiRltModel.bigA0 }}</td>
                <td>{{ finalAchiRltModel.bigB0 }}</td>
                <td>{{ finalAchiRltModel.apCnt }}</td>
                <td>{{ finalAchiRltModel.a0Cnt }}</td>
                <td>{{ finalAchiRltModel.bpCnt }}</td>
                <td>{{ finalAchiRltModel.b0Cnt }}</td>
                <td>{{ finalAchiRltModel.cpCnt }}</td>
                <td>{{ finalAchiRltModel.c0Cnt }}</td>
                <td>{{ finalAchiRltModel.dpCnt }}</td>
                <td>{{ finalAchiRltModel.d0Cnt }}</td>
                <td>{{ finalAchiRltModel.fcnt }}</td>
              </tr>
              <tr>
                <td>{{ finalAchiRltModel.percentBigA0 }}</td>
                <td>{{ finalAchiRltModel.percentBigB0 }}</td>
                <td>{{ finalAchiRltModel.apRate }}%</td>
                <td>{{ finalAchiRltModel.a0Rate }}%</td>
                <td>{{ finalAchiRltModel.bpRate }}%</td>
                <td>{{ finalAchiRltModel.b0Rate }}%</td>
                <td>{{ finalAchiRltModel.cpRate }}%</td>
                <td>{{ finalAchiRltModel.c0Rate }}%</td>
                <td>{{ finalAchiRltModel.dpRate }}%</td>
                <td>{{ finalAchiRltModel.d0Rate }}%</td>
                <td>{{ finalAchiRltModel.frate }}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="search_box">
      <div class="search_section">
        <p class="box_title_sm">
          2.{{ sbjtNm }}({{ sbjtCd }}) {{ yearEdu }}학년도 {{ gradeNm }}
          {{ termNm }} {{ divNm }}반({{ staffNm }}) 최종성적관리
        </p>
        <!-- tbl_scroll_body -->
        <div class="tbl tbl_col tbl_scroll scrollx_tbl_xs">
          <table class="tbl_col">
            <caption>
              table col scroll
            </caption>
            <colgroup>
              <col style="width: 5%" />
              <col style="width: 5%" />
              <col style="width: 7%" />
              <col style="width: 7%" />
              <col style="width: 7%" />
              <col style="width: 7%" />
              <col style="width: 7%" />
              <col style="width: 7%" />
              <col style="width: 7%" />
              <col style="width: 7%" />
              <col style="width: 7%" />
              <col style="width: 5%" />
              <col style="width: 7%" />
              <col style="width: 5%" />
              <col style="width: 10%" />
            </colgroup>
            <thead>
              <tr>
                <th scope="col">{{ t("finalArchi.action.col2_1") }}</th>
                <th scope="col">{{ t("finalArchi.action.col2_2") }}</th>
                <th scope="col">{{ t("finalArchi.action.col2_3") }}</th>
                <th scope="col">{{ t("finalArchi.action.col2_4") }}</th>
                <th scope="col">{{ t("finalArchi.action.col2_5") }}</th>
                <th scope="col">{{ t("finalArchi.action.col2_6") }}</th>
                <th scope="col">{{ t("finalArchi.action.col2_7") }}</th>
                <th scope="col">{{ t("finalArchi.action.col2_8") }}</th>
                <th scope="col">{{ t("finalArchi.action.col2_9") }}</th>
                <th scope="col">{{ t("finalArchi.action.col2_10") }}</th>
                <th scope="col">{{ t("finalArchi.action.col2_11") }}</th>
                <th scope="col">{{ t("finalArchi.action.col2_12") }}</th>
                <th scope="col">{{ t("finalArchi.action.col2_13") }}</th>
                <th scope="col">{{ t("finalArchi.action.col2_14") }}</th>
                <th scope="col">{{ t("finalArchi.action.col2_15") }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in arrFinalAchiMngModel">
                <td>{{ item.rowNum }}</td>
                <td>{{ item.divNm }}</td>
                <td>{{ item.stdId }}</td>
                <td>{{ item.stdNm }}</td>
                <td>333</td>
                <td>{{ item.shregStsNm }}</td>
                <td>333</td>
                <td>333</td>
                <td>333</td>
                <!-- chờ QA -->
                <td>{{ item.level }}</td>
                <td>{{ item.attendScore }}</td>
                <td>{{ item.finalScore }}</td>
                <td>{{ item.ranking }}</td>
                <td>{{ item.rankRate }}</td>
                <td>{{ item.finalScore }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="btn_group btn_end">
      <div class="btn_area">
        <button
          type="button"
          class="btn_round btn_sm btn_white"
          @click="back()"
        >
          {{ t("common.list") }}
        </button>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import type {
  FinalAchiRltModel,
  FinalAchiMngModel,
  FinalAchiDetailModel,
  LectInfoIdModel,
  UserJobModel,
} from "../../stores/finalArchivement/finalArchivement.type";
import { getDataDetail } from "@/stores/finalArchivement/finalArchivement.service";
import { commonStore } from "@/stores/common";
import LoaddingComponent from "@/components/common/loading/LoaddingComponent.vue";
import { defineComponent, ref } from "vue";
import { MESSAGE_ERROR_API } from "@/constants/common.const";
import { SCREEN } from "../../router/screen";
import { STATUS_YES, STATUS_NO } from "../../constants/common.const";

export default defineComponent({
  components: {
    LoaddingComponent,
  },
  setup() {
    const { t } = useI18n();
    const cmn = commonStore();
    const lectInfoIdModel = {} as LectInfoIdModel;
    const finalAchiDetailModel = {} as FinalAchiDetailModel;
    const finalAchiMngModel = {} as FinalAchiMngModel;
    const finalAchiRltModel = {} as FinalAchiRltModel;
    const arrFinalAchiMngModel = ref([]);
    const router = useRouter();
    const userJobModel = {} as UserJobModel;
    const STS_NO = STATUS_NO;
    const pageTitle = t("finalArchi.action.titleMain");
    const breadcrumbItems = [] as any;
    return {
      t,
      cmn,
      lectInfoIdModel,
      finalAchiDetailModel,
      finalAchiMngModel,
      finalAchiRltModel,
      arrFinalAchiMngModel,
      router,
      userJobModel,
      STS_NO,
      pageTitle,
      breadcrumbItems,
    };
  },
  data() {
    return {
      id: "",
      userJobPerformEvalSeq: "",
      finalGradeConfrmYn: "",
      messConfirm: "",
      staffNm: "",
      divNm: "",
      yearEdu: "",
      sbjtCd: "",
      sbjtNm: "",
      termNm: "",
      gradeNm: "",
      messConfirmSuccess: "",
    };
  },
  beforeMount() {
    this.id = window.history.state.lectCd;
    this.lectInfoIdModel.lecCd = window.history.state.id;
    this.userJobPerformEvalSeq = window.history.state.userJobPerformEvalSeq;
    this.finalGradeConfrmYn = window.history.state.finalGradeConfrmYn;
    this.userJobModel.userJobPerformEvalSeq = this.userJobPerformEvalSeq;
    this.staffNm = window.history.state.staffNm;
    this.divNm = window.history.state.divNm;
    this.yearEdu = window.history.state.yearEdu;
    this.sbjtCd = window.history.state.sbjtCd;
    this.sbjtNm = window.history.state.sbjtNm;
    this.termNm = window.history.state.termNm;
    this.gradeNm = window.history.state.gradeNm;
    this.finalGradeConfrmYn === STATUS_NO
      ? (this.userJobModel.finalGradeConfrmYn = STATUS_YES)
      : (this.userJobModel.finalGradeConfrmYn = STATUS_NO);

    this.getDateDetail();
  },
  methods: {
    async getDateDetail() {
      this.cmn.setLoading(true);
      try {
        await getDataDetail(this.lectInfoIdModel)
          .then((res) => {
            this.finalAchiDetailModel = res.data.data;
            this.arrFinalAchiMngModel =
              this.finalAchiDetailModel.achievementMngDTOList;
            this.finalAchiRltModel =
              this.finalAchiDetailModel.abilArchEvalRlstInfoDTO;

            this.finalAchiRltModel.percentBigA0 = parseFloat(
              this.finalAchiRltModel.percentBigA0
            ).toFixed(2);
            this.finalAchiRltModel.percentBigB0 = parseFloat(
              this.finalAchiRltModel.percentBigB0
            ).toFixed(2);
            this.finalAchiRltModel.scoreMedi = parseFloat(
              this.finalAchiRltModel.scoreMedi
            ).toFixed(2);
            this.arrFinalAchiMngModel.forEach((element) => {
              element.rankRate = parseFloat(element.rankRate).toFixed(2);
            });
          })
          .catch((error) => {
            throw new Error(MESSAGE_ERROR_API);
          })
          .finally(() => {
            this.cmn.setLoading(false);
          });
      } catch (e) {
      } finally {
      }
    },
    back() {
      this.router.push({
        name: SCREEN.finalArchivement.name,
      });
    },
  },
});
</script>
<style scoped>
.score-cell {
  text-align: center;
  vertical-align: middle;
  padding: 10px;
}
</style>
