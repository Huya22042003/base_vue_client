<template>
  <div class="page_wrapper">
    <section id="content" class="content_wrapper grid_content" tabindex="0">
      <Breadcrumb :pageTitle="pageTitle" />
      <div class="box dp_block">
        <div class="box_section">
          <table class="tbl_row tbl_border tbl_result_detail_custom">
            <caption>
              {{
                t("07.coreCompetencyDiagnosisResult.detail.subTitle")
              }}
            </caption>
            <colgroup>
              <col style="width: 15%" />
              <col style="width: 15%" />
              <col style="width: 15%" />
              <col style="width: 15%" />
              <col style="width: 15%" />
              <col style="width: 10%" />
              <col style="width: 20%" />
            </colgroup>
            <tbody>
              <tr>
                <th scope="row">
                  {{
                    t("07.diagnosingLecturer.diagnosisResults.detail.profName")
                  }}
                </th>
                <th scope="row">
                  {{
                    t("07.diagnosingLecturer.diagnosisResults.detail.profCode")
                  }}
                </th>
                <th scope="row">
                  {{
                    t(
                      "07.diagnosingLecturer.diagnosisResults.detail.department"
                    )
                  }}
                </th>
                <th scope="row">
                  {{ t("07.diagnosingLecturer.diagnosisResults.detail.role") }}
                </th>
                <th scope="row">
                  {{
                    t(
                      "07.diagnosingLecturer.diagnosisResults.detail.experience"
                    )
                  }}
                </th>
                <th scope="row">
                  {{
                    t("07.diagnosingLecturer.diagnosisResults.detail.gender")
                  }}
                </th>
                <th scope="row">
                  {{ t("07.diagnosingLecturer.diagnosisResults.detail.time") }}
                </th>
              </tr>
              <tr>
                <td scope="row">
                  <p>{{ dataDetail && dataDetail.staffNm }}</p>
                </td>
                <td scope="row">
                  <p>{{ dataDetail && dataDetail.staffNo }}</p>
                </td>
                <td scope="row">
                  <p>{{ dataDetail && dataDetail.departmentNm }}</p>
                </td>
                <td scope="row">
                  <p>{{ dataDetail && dataDetail.staffPstnNm }}</p>
                </td>
                <td scope="row">
                  <p>{{ dataDetail && dataDetail.experienceNm }}</p>
                </td>
                <td scope="row">
                  <p>{{ dataDetail && dataDetail.genderNm }}</p>
                </td>
                <td scope="row">
                  <p>{{ dataDetail && dataDetail.dateDiag }}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="box_section mt_8">
          <p class="box_title_sm">
            {{
              t("07.diagnosingLecturer.diagnosisResults.detail.wisePrideTitle")
            }}
          </p>
          <table class="tbl_row tbl_border tbl_result_detail_custom">
            <caption>
              {{
                t("07.coreCompetencyDiagnosisResult.detail.subTitle")
              }}
            </caption>
            <colgroup>
              <col style="width: 25%" />
              <col style="width: 25%" />
              <col style="width: 25%" />
              <col style="width: 25%" />
            </colgroup>
            <tbody>
              <tr>
                <th scope="row">
                  {{
                    t(
                      "07.diagnosingLecturer.diagnosisResults.detail.nameAbility"
                    )
                  }}
                </th>
                <th scope="row">
                  {{ t("07.diagnosingLecturer.diagnosisResults.detail.score") }}
                </th>
                <th scope="row">
                  {{
                    t("07.diagnosingLecturer.diagnosisResults.detail.numberQus")
                  }}
                </th>
                <th scope="row">
                  {{ t("07.diagnosingLecturer.diagnosisResults.detail.level") }}
                </th>
              </tr>
              <tr v-for="item in dataDetail.listWisePride">
                <td scope="row">
                  <p>{{ item.wisePrideNm }}</p>
                </td>
                <td scope="row">
                  <p>{{ item.score }}</p>
                </td>
                <td scope="row">
                  <p>{{ item.numberQus }}</p>
                </td>
                <td scope="row">
                  <p>{{ item.levelNm }}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="box_section mt_8">
          <p class="box_title_sm">
            {{
              t(
                "07.diagnosingLecturer.diagnosisResults.detail.profAbilityTitle"
              )
            }}
          </p>
          <table class="tbl_row tbl_border tbl_result_detail_custom">
            <caption>
              {{
                t("07.coreCompetencyDiagnosisResult.detail.subTitle")
              }}
            </caption>
            <colgroup>
              <col style="width: 33%" />
              <col style="width: 33%" />
              <col style="width: 33%" />
            </colgroup>
            <tbody>
              <tr>
                <th scope="row">
                  {{
                    t(
                      "07.diagnosingLecturer.diagnosisResults.detail.nameAbility"
                    )
                  }}
                </th>
                <th scope="row">
                  {{ t("07.diagnosingLecturer.diagnosisResults.detail.score") }}
                </th>
                <th scope="row">
                  {{
                    t("07.diagnosingLecturer.diagnosisResults.detail.numberQus")
                  }}
                </th>
              </tr>
              <tr v-for="item in dataDetail.listProfAbility">
                <td scope="row">
                  <p>{{ item.profAbilityNm }}</p>
                </td>
                <td scope="row">
                  <p>{{ item.totalScore }}</p>
                </td>
                <td scope="row">
                  <p>{{ item.numberQus }}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="dp_flex btn_group btn_end mt_8" style="gap: 10px">
          <button
            type="button"
            class="button btn_xs btn_white"
            @click="back()"
          >
            {{ t("common.list") }}
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import { commonStore } from "../../../stores/common";
import { DiagResultDetailProfModel } from "../../../stores/profAbilityLecturer/profAbilityLecturerResult/profAbilityLecturerResult.type";
import { getResultProfDetail } from "@/stores/profAbilityLecturer/profAbilityLecturerResult/profAbilityLecturerResult.service";
import { FORMAT_YYY_MM_DD } from "@/constants/screen.const";
import { format } from "date-fns";
import { SCREEN } from "@/router/screen";
import { MODE_DETAIL } from "@/constants/screen.const";

export default defineComponent({
  name: "DiagnosingLecturerProfDetail",
  props: {},
  setup() {
    const { t } = useI18n();
    const cmn = commonStore();
    return { t, cmn };
  },
  data() {
    return {
      staffNo: "",
      diagSeq: "",
      pageTitle: this.t(
        "07.diagnosingLecturer.diagnosisResults.detail.detailStaffInfoPageTitle"
      ),
      dataDetail: {} as DiagResultDetailProfModel,
    };
  },
  beforeMount() {
    this.staffNo = window.history.state.staffNo;
    this.diagSeq = window.history.state.diagSeq;

    this.getDataDetail();
  },
  methods: {
    getDataDetail() {
      this.cmn.setLoading(true);
      getResultProfDetail({ diagSeq: this.diagSeq, staffNo: this.staffNo })
        .then((res) => {
          this.dataDetail = res.data.data;
          this.dataDetail.dateDiag = format(
            new Date(this.dataDetail.dateDiag),
            FORMAT_YYY_MM_DD
          );
        })
        .finally(() => {
          this.cmn.setLoading(false);
        });
    },
    back() {
      this.$router.push({
        name: SCREEN.diagnosingLecturerResultsCrud.name,
        params: { mode: MODE_DETAIL },
        state: { id: this.diagSeq },
      });
    },
  },
});
</script>
