<template>
  <div class="page_wrapper">
    <section id="content" class="content_wrapper grid_content" tabindex="0">
      <Breadcrumb :pageTitle="pageTitle" :breadcrumbItems="breadcrumbItems" />
      <div class="box dp_block">
        <div class="box_section">
          <p class="box_title_sm">
            {{ t("11.diagProfessorAbility.result.title1") }}
          </p>
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
              <col style="width: 15%" />
            </colgroup>
            <tbody>
              <tr>
                <th scope="row">
                  {{ t("11.diagProfessorAbility.detail.column1") }}
                </th>
                <th scope="row">
                  {{ t("11.diagProfessorAbility.detail.column2") }}
                </th>
                <th scope="row">
                  {{ t("11.diagProfessorAbility.detail.column3") }}
                </th>
                <th scope="row">
                  {{ t("11.diagProfessorAbility.detail.column4") }}
                </th>
                <th scope="row">
                  {{ t("11.diagProfessorAbility.detail.column5") }}
                </th>
                <th scope="row">
                  {{ t("11.diagProfessorAbility.detail.column6") }}
                </th>
              </tr>
              <tr>
                <td scope="row">
                  <p>{{ detailInfo.deptNm }}</p>
                </td>
                <td scope="row">
                  <p>{{ detailInfo.experienceNm }}</p>
                </td>
                <td scope="row">
                  <p>{{ detailInfo.staffPstnNm }}</p>
                </td>
                <td scope="row">
                  <p>{{ detailInfo.stdNo }}</p>
                </td>
                <td scope="row">
                  <p>{{ detailInfo.genderNm }}</p>
                </td>
                <td scope="row">
                  <p>{{ detailInfo.stdNm }}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="box_section mt_8">
          <p class="box_title_sm">
            {{ t("11.diagProfessorAbility.result.title2") }}
          </p>
          <table class="tbl_row tbl_border tbl_result_detail_custom">
            <caption>
              {{
                t("07.coreCompetencyDiagnosisResult.detail.subTitle")
              }}
            </caption>
            <colgroup>
              <col style="width: 15%" />
              <col style="width: 10%" />
              <col style="width: 25%" />
              <col style="width: 25%" />
            </colgroup>
            <tbody>
              <tr>
                <th scope="row">
                  {{ t("11.diagProfessorAbility.result.column1") }}
                </th>
                <th scope="row">
                  {{ t("11.diagProfessorAbility.result.column2") }}
                </th>
                <th scope="row">
                  {{ t("11.diagProfessorAbility.result.column3") }}
                </th>
                <th scope="row">
                  {{ t("11.diagProfessorAbility.result.column4") }}
                </th>
              </tr>
              <tr
                v-for="wisePride in detailInfo.listWisePride"
                :key="wisePride.wisePrideSeq"
              >
                <td scope="row">
                  <p>{{ wisePride.wisePrideNm }}</p>
                </td>
                <td scope="row">
                  <p>{{ wisePride.category }}</p>
                </td>
                <td scope="row">
                  <p>{{ wisePride.content }}</p>
                </td>
                <td scope="row">
                  <div
                    v-for="program in wisePride.listProgram"
                    :key="program.programSeq"
                    class="box_program_custom"
                  >
                    <a
                      :href="program.url"
                      target="_blank"
                      class="program_custom"
                    >
                      {{ program.programNm }}
                    </a>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="dp_flex btn_group btn_end mt_8" style="gap: 10px">
          <button
            type="button"
            class="button btn_xs btn_white bo_rd6"
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
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import LinkGridComponent from "@/components/common/grid/LinkGridComponent.vue";
import { defineComponent } from "vue";
import { commonStore } from "../../stores/common";
import { useI18n } from "vue-i18n";
import { SCREEN } from "../../router/screen";
import { getDetailResult } from "../../stores/diagProfessorAbilityStaff/diagProfessorAbility.service";
import { DiagProfAbilityStaffDetailResultModel } from "../../stores/diagProfessorAbilityStaff/diagProfessorAbility.type";

export default defineComponent({
  components: { Breadcrumb, LinkGridComponent },
  setup() {
    const store = commonStore();
    const { t } = useI18n();
    return { t, store };
  },
  data() {
    return {
      pageTitle: this.t("11.diagProfessorAbility.result.pageTitle"),
      breadcrumbItems: [],
      diagSeq: "",
      detailInfo: {} as DiagProfAbilityStaffDetailResultModel,
    };
  },
  beforeMount() {
    this.diagSeq = window.history.state.id;

    this.getDetailResult();
  },
  methods: {
    getDetailResult() {
      this.store.setLoading(true);
      getDetailResult({ diagSeq: this.diagSeq }).then((res) => {
        this.detailInfo = res.data.data;
        this.store.setLoading(false);
      });
    },
    back() {
      this.$router.push({
        name: SCREEN.diagProfessorAbilityStaff.name,
      });
    },
  },
});
</script>
<style scoped>
.program_custom {
  color: blue;
  font-weight: 500;
  cursor: pointer;
}

.program_custom:hover {
  color: blue;
  font-weight: 500;
  cursor: pointer;
  text-decoration: underline;
  transition: 0.5s;
}

.box_program_custom {
  margin-bottom: 10px;
  margin-top: 10px;
}
</style>
