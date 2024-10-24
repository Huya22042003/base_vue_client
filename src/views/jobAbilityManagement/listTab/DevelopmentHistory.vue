<template>
  <div class="page_wrapper">
    <div class="box dp_block mg_b30">
      <div class="box_section">
        <p class="box_title_sm">
          {{ t("jobAbilityManagement.tab3.pageTitle") }}
        </p>
      </div>
      <table class="tbl_row tbl_border">
        <colgroup>
          <col style="width: 15%" />
          <col style="width: auto" />
        </colgroup>
        <tbody>
          <tr>
            <th scope="row">
              <p class="required">
                {{ t("jobAbilityManagement.tab4.column1") }}
              </p>
            </th>
            <td class="td_input">{{ jobHistory.jobAbilNm }}</td>
          </tr>
          <tr>
            <th scope="row">
              <p class="required">
                {{ t("jobAbilityManagement.tab4.column2") }}
              </p>
            </th>
            <td class="td_input">{{ jobHistory.jobAbilCd }}</td>
          </tr>
          <tr>
            <th scope="row">
              <p class="required">
                {{ t("jobAbilityManagement.tab4.column3") }}
              </p>
            </th>
            <td class="td_input">{{ currentYear }}</td>
          </tr>
          <tr v-for="(item, index) in listJobHistory">
            <th scope="row">
              <p class="required">개발연도 최초({{ index + 1 }}차)</p>
            </th>
            <td class="td_input">{{ item.supportYear }}</td>
          </tr>
          <tr>
            <th scope="row">
              <p class="required">
                {{ t("jobAbilityManagement.tab4.column5") }}
              </p>
            </th>
            <td class="td_input">
              <InputBase v-model="authNm" required />
            </td>
          </tr>
          <tr v-for="(item, index) in listJobHistory">
            <th scope="row">
              <p class="required">개발자 최초({{ index + 1 }}차)</p>
            </th>
            <td class="td_input">{{ item.authNm }}</td>
          </tr>
          <tr>
            <th scope="row">
              <p>
                {{ t("jobAbilityManagement.tab4.column7") }}
              </p>
            </th>
            <td class="td_input">
              <InputBase v-model="year" required />
            </td>
          </tr>
        </tbody>
      </table>
      <div class="dp_flex btn_group btn_end mt_8" style="gap: 10px">
        <button
          type="button"
          class="btn_round btn_md btn_gray"
          v-if="modeScreen === modeDetail"
          @click="saveVer"
        >
          {{ t("jobAbilityManagement.tab1.btnVersionUp") }}
        </button>
        <button
          type="button"
          class="btn_round btn_md btn_primary"
          v-if="modeScreen === modeCreate"
          @click="saveData"
        >
          {{ t("common.save") }}
        </button>
        <button
          type="button"
          class="btn_round btn_md btn_primary"
          v-if="modeScreen === modeDetail"
          @click="saveData"
        >
          {{ t("common.save") }}
        </button>
        <button type="button" class="btn_round btn_white btn_md" @click="back">
          {{ t("common.list") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { commonStore } from "../../../stores/common";
import {
  MODE_CREATE,
  MODE_DETAIL,
  MAXIMUM_STATUS,
  DUPLICATE_STATUS,
} from "../../../constants/screen.const";
import { SCREEN } from "../../../router/screen";
import { useI18n } from "vue-i18n";
import type { JobHistory } from "@/stores/jobAbilityManagement/jobAbilityManagement.type";
import {
  saveJobHistory,
  detailHistory,
  upVer,
} from "@/stores/jobAbilityManagement/jobAbilityManagement.service";

export default {
  components: {},
  setup() {
    const cmn = commonStore();
    const { t } = useI18n();
    const currentYear = new Date().getFullYear();
    return {
      cmn,
      t,
      currentYear,
    };
  },
  props: {
    id: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      jobAbilitySeq: "",
      modeScreen: "" as any,
      modeDetail: MODE_DETAIL,
      modeCreate: MODE_CREATE,
      jobAbilSeq: "",
      listJobHistory: [] as Array<JobHistory>,
      jobHistory: {} as JobHistory,
      authNm: "",
      year: "",
    };
  },
  beforeMount() {
    this.modeScreen = this.$route.params.mode;
    this.jobAbilSeq = this.$props.id;
    this.getDetailData();
  },
  methods: {
    getDetailData() {
      this.cmn.setLoading(true);
      detailHistory(this.jobAbilSeq)
        .then((res) => {
          this.listJobHistory = res.data.data;
          this.jobHistory = this.listJobHistory.find(
            (item) => item.jobAbilSeq === this.jobAbilSeq
          );
          this.authNm = this.jobHistory.authNm;
          this.year = this.jobHistory.supportYear;
        })
        .finally(() => {
          this.cmn.setLoading(false);
        });
    },
    saveData() {
      if (!this.authNm || this.authNm == "") {
        this.$swal({
          text: this.t("common.messageValidateRequired"),
          type: "warning",
          showCancelButton: false,
          showConfirmButton: true,
          confirmButtonText: this.t("common.confirm"),
        });
      } else {
        this.$swal({
          text: this.t("common.message.save"),
          type: "warning",
          showCancelButton: true,
          confirmButtonText: this.t("common.save"),
          cancelButtonText: this.t("common.cancel"),
        }).then((result) => {
          if (result.isConfirmed) {
            this.cmn.setLoading(true);
            this.jobHistory.authNm = this.authNm;
            this.jobHistory.supportYear = this.year;
            saveJobHistory(this.jobHistory);
            this.cmn.setLoading(false);
            this.back();
          }
        });
      }
    },
    saveVer() {
      this.jobHistory.authNm = this.authNm;
      this.jobHistory.supportYear = this.year;
      if (!this.authNm || this.authNm == "") {
        this.$swal({
          text: this.t("common.messageValidateRequired"),
          type: "warning",
          showCancelButton: false,
          showConfirmButton: true,
          confirmButtonText: this.t("common.confirm"),
        });
      } else {
        this.$swal({
          text: this.t("jobAbilityManagement.tab1.confirmVersionUp"),
          type: "warning",
          showCancelButton: true,
          confirmButtonText: this.t("common.save"),
          cancelButtonText: this.t("common.cancel"),
        }).then((result) => {
          if (result.isConfirmed) {
            this.cmn.setLoading(true);
            upVer(this.jobHistory.jobAbilSeq)
              .then((res) => {
                this.back();
              })
              .catch((error) => {
                if (
                  error.response &&
                  error.response.data &&
                  error.response.data.code === DUPLICATE_STATUS
                ) {
                  this.$swal({
                    text: this.t("jobAbilityManagement.tab1.dupliCateCVer"),
                    type: "warning",
                    showCancelButton: false,
                    confirmButtonText: this.t("common.confirm"),
                  });
                } else if (
                  error.response &&
                  error.response.data &&
                  error.response.data.code === MAXIMUM_STATUS
                ) {
                  this.$swal({
                    text: this.t("jobAbilityManagement.tab1.maxVer"),
                    type: "warning",
                    showCancelButton: false,
                    confirmButtonText: this.t("common.confirm"),
                  });
                }
              });
            this.cmn.setLoading(false);
          }
        });
      }
    },
    back() {
      this.$router.push({ name: SCREEN.jobAbilityManagement.name });
    },
  },
};
</script>
<style scoped>
.d-flex {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
