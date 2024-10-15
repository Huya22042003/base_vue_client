<template>
  <TModal
    :is-open="isOpen"
    :is-show-header="true"
    :is-show-footer="true"
    :modal-id="'modal_form'"
    @close-modal="onClose"
  >
    <template #title>
      <p>{{ t("lookupAchievement.detail.title") }}</p>
      <strong class="title-bold">{{
        t("lookupAchievement.detail.subTitle")
      }}</strong>
    </template>
    <template #default>
      <div class="tbl tbl_col tbl_scroll scrollx_tbl_xs">
        <table>
          <colgroup>
            <col style="width: 12%" />
            <col style="width: 12%" />
            <col style="width: 12%" />
            <col style="width: 8%" />
            <col style="width: 8%" />
            <col style="width: 8%" />
            <col style="width: 8%" />
            <col style="width: 8%" />
            <col style="width: 8%" />
            <col style="width: 8%" />
            <col style="width: 8%" />
            <col style="width: 8%" />
          </colgroup>
          <thead>
            <tr>
              <th>{{ t("lookupAchievement.detail.restriction") }}</th>
              <th>{{ t("lookupAchievement.detail.rating") }}</th>
              <th>{{ t("lookupAchievement.detail.total") }}</th>
              <th>{{ t("lookupAchievement.detail.higherA") }}</th>
              <th>{{ t("lookupAchievement.detail.higherB") }}</th>
              <th>{{ t("lookupAchievement.detail.A") }}</th>
              <th>{{ t("lookupAchievement.detail.A0") }}</th>
              <th>{{ t("lookupAchievement.detail.B") }}</th>
              <th>{{ t("lookupAchievement.detail.B0") }}</th>
              <th>{{ t("lookupAchievement.detail.C") }}</th>
              <th>{{ t("lookupAchievement.detail.C0") }}</th>
              <th>{{ t("lookupAchievement.detail.D") }}</th>
              <th>{{ t("lookupAchievement.detail.D0") }}</th>
              <th>{{ t("lookupAchievement.detail.F") }}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>A0/40%, B0/90%</td>
              <td>45.20</td>
              <td>35</td>
              <td>9 (25.71%)</td>
              <td>3 (34.28%)</td>
              <td>3 (34.28%)</td>
              <td>3 (34.28%)</td>
              <td>3 (34.28%)</td>
              <td>3 (34.28%)</td>
              <td>3 (34.28%)</td>
              <td>3 (34.28%)</td>
              <td>3 (34.28%)</td>
              <td>3 (34.28%)</td>
              <td>3 (34.28%)</td>
            </tr>
          </tbody>
        </table>
        <strong class="title-bold">{{
          t("lookupAchievement.detail.titleSubject")
        }}</strong>
        <div class="title-modal">
          <button
            type="button"
            class="btn_round btn_lg btn_primary mg_l10"
            @click="print()"
          >
            {{ t("lookupAchievement.detail.print") }}
          </button>
          <button
            type="button"
            class="btn_round btn_lg btn_gray mg_l5"
            @click="download()"
          >
            {{ t("lookupAchievement.detail.download") }}
          </button>
        </div>

        <table class="tbl tbl_col tbl_scroll scrollx_tbl_xs">
          <colgroup>
            <col style="width: 5%" />
            <col style="width: 5%" />
            <col style="width: 5%" />
            <col style="width: 10%" />
            <col style="width: 5%" />
            <col style="width: 10%" />
            <col style="width: 8%" />
            <col style="width: 8%" />
            <col style="width: 8%" />
            <col style="width: 8%" />
            <col style="width: 8%" />
            <col style="width: 8%" />
            <col style="width: 8%" />
            <col style="width: 8%" />
            <col style="width: 8%" />
          </colgroup>
          <thead>
            <tr>
              <th>{{ t("lookupAchievement.detail.number") }}</th>
              <th>{{ t("lookupAchievement.detail.grade") }}</th>
              <th>{{ t("lookupAchievement.detail.studentName") }}</th>
              <th>{{ t("lookupAchievement.detail.name") }}</th>
              <th>{{ t("lookupAchievement.detail.class") }}</th>
              <th>{{ t("lookupAchievement.detail.academicRecord") }}</th>
              <th>{{ t("lookupAchievement.detail.1st") }}</th>
              <th>{{ t("lookupAchievement.detail.2st") }}</th>
              <th>{{ t("lookupAchievement.detail.subtotal") }}</th>
              <th>{{ t("lookupAchievement.detail.archievementLevel") }}</th>
              <th>{{ t("lookupAchievement.detail.attendance") }}</th>
              <th>{{ t("lookupAchievement.detail.totalScore") }}</th>
              <th>{{ t("lookupAchievement.detail.ranking") }}</th>
              <th>{{ t("lookupAchievement.detail.percentile") }}</th>
              <th>{{ t("lookupAchievement.detail.score") }}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>홍길동</td>
              <td>01</td>
              <td>재학</td>
              <td>40.00</td>
              <td>40.00</td>
              <td>80.00</td>
              <td>5 (충족)</td>
              <td>20.00</td>
              <td>100.00</td>
              <td>1</td>
              <td>2.86</td>
              <td>100.00</td>
            </tr>
            <tr>
              <td>2</td>
              <td>1</td>
              <td>1</td>
              <td>심청이</td>
              <td>01</td>
              <td>재학</td>
              <td>40.00</td>
              <td>40.00</td>
              <td>80.00</td>
              <td>5 (충족)</td>
              <td>17.00</td>
              <td>97.00</td>
              <td>1</td>
              <td>2.86</td>
              <td>97.00</td>
            </tr>
          </tbody>
        </table>
        <div class="title-modal">
          <button
            type="button"
            class="btn_round btn_lg btn_gray mg_l5"
            @click="back()"
          >
            {{ t("lookupAchievement.detail.list") }}
          </button>
        </div>
      </div>
    </template>
  </TModal>
</template>

<script lang="ts">
import { SCREEN } from "@/router/screen";
import { useI18n } from "vue-i18n";

export default {
  components: {},
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    onClose: {
      type: Function,
      required: true,
    },
  },
  setup() {
    const { t } = useI18n();
    return {
      t,
    };
  },
  methods:{
    back(){
      this.$router.replace({
        path: SCREEN.lookupAchievement.path
      })
    }
  }
};
</script>

<style scoped>
.tbl_row {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.tbl_row th,
.tbl_row td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

.tbl_row th {
  background-color: #f4f4f4;
  font-weight: bold;
}

.title-modal {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 10px;
  margin-top: 10px;
}
.title-bold {
  font-weight: bold;
  font-weight: 600;
  font-size: 2rem;
}
.popup_content{
  max-height: 400px; 
  overflow-y: auto; 
  padding-right: 10px;
}
</style>
