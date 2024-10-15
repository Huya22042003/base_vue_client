<template>
    <TModal
      :is-open="isOpen"
      :is-show-header="true"
      :is-show-footer="true"
      :modal-id="'modal_form'"
      @close-modal="onClose"
    >
      <template #title>
        <p>{{ t("finalGradeManagement.modal.title") }}</p>
        <strong class="title-bold">{{
          t("finalGradeManagement.modal.titleheader1")
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
            </colgroup>
            <thead>
              <tr>
                <th scope="row">{{ t("finalGradeManagement.modal.limit") }}</th>
                <th scope="row">{{ t("finalGradeManagement.modal.rate") }}</th>
                <th scope="row">{{ t("finalGradeManagement.modal.total") }}</th>
                <th scope="row">{{ t("finalGradeManagement.modal.height") }}</th>
                <th scope="row">{{ t("finalGradeManagement.modal.heightB") }}</th>
                <th scope="row">{{ t("finalGradeManagement.modal.A") }}</th>
                <th scope="row">{{ t("finalGradeManagement.modal.A0") }}</th>
                <th scope="row">{{ t("finalGradeManagement.modal.B") }}</th>
                <th scope="row">{{ t("finalGradeManagement.modal.B0") }}</th>
                <th scope="row">{{ t("finalGradeManagement.modal.C") }}</th>
                <th scope="row">{{ t("finalGradeManagement.modal.C0") }}</th>
                <th scope="row">{{ t("finalGradeManagement.modal.D") }}</th>
                <th scope="row">{{ t("finalGradeManagement.modal.D0") }}</th>
                <th scope="row">{{ t("finalGradeManagement.modal.F") }}</th>
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
              </tr>
            </tbody>
          </table>
          <strong class="title-bold">{{
            t("finalGradeManagement.modal.titleheader2")
          }}</strong>
          <div class="title-modal">
            <button
              type="button"
              class="btn_round btn_lg btn_primary mg_l10"
              @click="print"
            >
              {{ t("finalGradeManagement.modal.print") }}
            </button>
            <button
              type="button"
              class="btn_round btn_lg btn_gray mg_l5"
              @click="download()"
            >
              {{ t("finalGradeManagement.modal.download") }}
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
            </colgroup>
            <thead>
              <tr>
                <th>{{ t("finalGradeManagement.modal.number") }}</th>
                <th>{{ t("finalGradeManagement.modal.grade") }}</th>
                <th>{{ t("finalGradeManagement.modal.studentNumber") }}</th>
                <th>{{ t("finalGradeManagement.modal.name") }}</th>
                <th>{{ t("finalGradeManagement.modal.classDivision") }}</th>
                <th>{{ t("finalGradeManagement.modal.academicRecord") }}</th>
                <th>{{ t("finalGradeManagement.modal.1st") }}</th>
                <th>{{ t("finalGradeManagement.modal.2st") }}</th>
                <th>{{ t("finalGradeManagement.modal.subtotal") }}</th>
                <th>{{ t("finalGradeManagement.modal.level") }}</th>
                <th>{{ t("finalGradeManagement.modal.attendance") }}</th>
                <th>{{ t("finalGradeManagement.modal.totalScore") }}</th>
                <th>{{ t("finalGradeManagement.modal.ranking") }}</th>
                <th>{{ t("finalGradeManagement.modal.percentile") }}</th>
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
              </tr>
            </tbody>
          </table>
          <div class="title-modal">
            <button
              type="button"
              class="btn_round btn_lg btn_primary mg_l5"
              @click="complete()"
            >
              {{ t("finalGradeManagement.modal.complete") }}
            </button>
            <button
              type="button"
              class="btn_round btn_lg btn_gray mg_l5"
              @click="back()"
            >
              {{ t("finalGradeManagement.modal.cancel") }}
            </button>
          </div>
          <div class="title-modal">
            <button
              type="button"
              class="btn_round btn_lg btn_primary mg_l5"
              @click="complete()"
            >
              {{ t("finalGradeManagement.modal.inventory") }}
            </button>
            <button
              type="button"
              class="btn_round btn_lg btn_gray mg_l5"
              @click="back()"
            >
              {{ t("finalGradeManagement.modal.cancel") }}
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
      },
      complete() {

      },
      print(){

      },
      download(){

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
  </style>
  