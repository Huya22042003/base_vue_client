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
                {{ t("jobAbilityManagement.tab3.column1") }}
              </p>
            </th>
            <td class="td_input">
              <TextArea
                :id="'cont'"
                :name="'cont'"
                v-model="jobData.consdInfo"
                required
              />
            </td>
          </tr>
          <tr>
            <th scope="row">
              <p class="required">
                {{ t("jobAbilityManagement.tab3.column2") }}
              </p>
            </th>
            <td class="td_input">
              <TextArea
                :id="'document'"
                :name="'document'"
                v-model="jobData.relDoc"
                required
              />
            </td>
          </tr>
          <tr>
            <th scope="row">
              <p class="required">
                {{ t("jobAbilityManagement.tab3.column3") }}
              </p>
            </th>
            <td class="td_input">
              <TextArea
                :id="'equipment'"
                :name="'equipment'"
                v-model="jobData.tool"
                required
              />
            </td>
          </tr>
          <tr>
            <th scope="row">
              <p class="required">
                {{ t("jobAbilityManagement.tab3.column4") }}
              </p>
            </th>
            <td class="td_input">
              <TextArea
                :id="'ingredient'"
                :name="'ingredient'"
                v-model="jobData.metl"
                required
              />
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
          class="btn_round btn_md btn_gray"
          v-if="modeScreen === modeDetail"
          @click="confirmEdit"
        >
          {{ t("jobAbilityManagement.tab1.update") }}
        </button>
        <button
          type="button"
          class="btn_round btn_primary btn_md"
          @click="confirmNextTab"
        >
          {{ t("jobAbilityManagement.tab1.btnNext") }}
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
import type { JobScope } from "../../../stores/jobAbilityManagement/jobAbilityManagement.type";
import {
  saveJobScope,
  detailJobScope,
  upVer,
} from "../../../stores/jobAbilityManagement/jobAbilityManagement.service";

export default {
  components: {},
  setup() {
    const cmn = commonStore();
    const { t } = useI18n();

    return {
      cmn,
      t,
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
      modeScreen: "" as any,
      modeDetail: MODE_DETAIL,
      modeCreate: MODE_CREATE,
      jobAbilSeq: "",
      jobData: {} as JobScope,
    };
  },
  beforeMount() {
    this.jobAbilSeq = this.$props.id;
    this.modeScreen = this.$route.params.mode;
    if (this.modeScreen == MODE_DETAIL) {
      this.getData();
    }
  },
  methods: {
    saveVer() {
      if (this.checkVal()) {
        this.$swal({
          text: this.t("common.messageValidateRequired"),
          type: "warning",
          showCancelButton: false,
          showConfirmButton: true,
          confirmButtonText: this.t("common.confirm"),
        });
        return;
      }
      this.jobData.jobAbilSeq = this.jobAbilSeq;
      this.$swal({
        text: this.t("jobAbilityManagement.tab1.confirmVersionUp"),
        type: "warning",
        showCancelButton: true,
        confirmButtonText: this.t("common.save"),
        cancelButtonText: this.t("common.cancel"),
      }).then((result) => {
        if (result.isConfirmed) {
          this.cmn.setLoading(true);
          upVer(this.jobData.jobAbilSeq)
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
    },
    back() {
      this.$router.push({ name: SCREEN.jobAbilityManagement.name });
    },
    confirmNextTab() {
      if (this.modeScreen === this.modeDetail) {
        this.nextTab(this.jobAbilSeq);
        return;
      }
      if (this.checkVal()) {
        this.$swal({
          text: this.t("common.messageValidateRequired"),
          type: "warning",
          showCancelButton: false,
          showConfirmButton: true,
          confirmButtonText: this.t("common.confirm"),
        });
      } else {
        this.$swal({
          text: this.t("jobAbilityManagement.tab1.confirmNextTab"),
          type: "warning",
          showCancelButton: true,
          confirmButtonText: this.t("common.save"),
          cancelButtonText: this.t("common.cancel"),
        }).then((result: any) => {
          if (result.isConfirmed) {
            this.saveData();
            this.nextTab(this.jobAbilSeq);
          }
        });
      }
    },
    nextTab(id) {
      this.$emit("change-tab", "tab4", id);
    },
    saveData() {
      this.jobData.jobAbilSeq = this.jobAbilSeq;
      saveJobScope(this.jobData).then((res) => {});
    },
    getData() {
      this.cmn.setLoading(true);
      detailJobScope(this.jobAbilSeq).then((res) => {
        this.jobData = res.data.data;
      });
      this.cmn.setLoading(false);
    },
    async confirmEdit() {
      if (this.checkVal()) {
        this.$swal({
          text: this.t("common.messageValidateRequired"),
          type: "warning",
          showCancelButton: false,
          showConfirmButton: true,
          confirmButtonText: this.t("common.confirm"),
        });
        return;
      }
      const result = await this.$swal({
        text: this.t("common.message.save"),
        type: "warning",
        showCancelButton: true,
        confirmButtonText: this.t("common.save"),
        cancelButtonText: this.t("common.cancel"),
      });

      if (result.isConfirmed) {
        this.cmn.setLoading(true);
        await this.saveData();
        this.cmn.setLoading(false);
        const resultNext = await this.$swal({
          text: this.t("jobAbilityManagement.tab1.nextTab"),
          type: "warning",
          showCancelButton: true,
          confirmButtonText: this.t("common.save"),
          cancelButtonText: this.t("common.cancel"),
        });
        if (resultNext.isConfirmed) {
          this.nextTab(this.jobAbilSeq);
        }
      }
    },
    checkVal() {
      return (
        !this.jobData ||
        this.jobData.consdInfo === "" ||
        !this.jobData.relDoc ||
        this.jobData.relDoc === "" ||
        !this.jobData.tool ||
        this.jobData.tool === "" ||
        !this.jobData.metl ||
        this.jobData.metl === ""
      );
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
