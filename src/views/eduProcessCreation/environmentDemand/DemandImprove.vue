<template>
  <div class="box_section mt-5">
    <div class="box_section mt-10">
      <div class="tbl_col tbl">
        <table>
          <tbody>
            <tr>
              <th scope="row" :colspan="1">
                <!-- 항목 -->{{
                  t("eduProcessCreation.environmentDemand.title10")
                }}
              </th>
              <th
                scope="row"
                :colspan="1"
                v-for="(item, index) in environmentDemandListModel.slice(0, 2)"
                :key="index"
              >
                <span>{{ item.dataNm }}</span>
              </th>
            </tr>
            <tr>
              <th scope="row" :colspan="1">
                Strength <br />
                Weakness <br />
                Opportunity <br />
                Threat
              </th>
              <td
                scope="row"
                :colspan="1"
                v-for="(item, index) in environmentDemandListModel.slice(0, 2)"
                :key="index"
              >
                <TextArea
                  :id="item.dataCd + index"
                  required
                  rows="5"
                  v-model="item.cont"
                ></TextArea>
              </td>
            </tr>
            <tr>
              <th
                scope="row"
                :colspan="1"
                v-for="(item, index) in environmentDemandListModel.slice(2, 5)"
                :key="index"
              >
                <span>{{ item.dataNm }}</span>
              </th>
            </tr>
            <tr>
              <td
                scope="row"
                :colspan="1"
                v-for="(item, index) in environmentDemandListModel.slice(2, 5)"
                :key="index"
              >
                <TextArea
                  :id="item.dataCd + index"
                  required
                  rows="5"
                  v-model="item.cont"
                ></TextArea>
              </td>
            </tr>
            <tr>
              <th
                scope="row"
                :colspan="1"
                v-for="(item, index) in environmentDemandListModel.slice(5, 8)"
                :key="index"
              >
                <span>{{ item.dataNm }}</span>
              </th>
            </tr>
            <tr>
              <td
                scope="row"
                :colspan="1"
                v-for="(item, index) in environmentDemandListModel.slice(5, 8)"
                :key="index"
              >
                <TextArea
                  :id="item.dataCd + index"
                  required
                  rows="5"
                  v-model="item.cont"
                ></TextArea>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="btn_group btn_end mg_t25">
      <div class="btn_group btn_end">
        <button type="button" class="btn_round btn_md btn_primary">
          <!-- 2.환경분석 및 요구분석 인쇄 -->{{
            t("eduProcessCreation.environmentDemand.title19")
          }}
        </button>
        <button
          type="button"
          class="btn_round btn_md btn_primary"
          @click="confirmSaveData"
        >
          {{ t("common.save") }}
        </button>
        <button
          type="button"
          class="btn_round btn_md btn_primary"
          @click="next()"
          :disabled="isDisabled"
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
import { commonStore } from "../../../stores/common";
import { SCREEN } from "../../../router/screen";
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import {
  EnvironDemandShowReqModel,
  EnvironDemandShowSaveModel,
  EnvironmentDemandListModel,
} from "../../../stores/eduProcessCreation/environmentDemand/environmentDemand.type";
import {
  detailShowEnvDemand,
  saveShowEnvDemand,
} from "../../../stores/eduProcessCreation/environmentDemand/environmentDemand.service";
import { CD_STG031, UP_CD_EDU_24 } from "../../../constants/common.const";

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
      environDemandShowReqModel: {} as EnvironDemandShowReqModel,
      environDemandShowSaveModel: {} as EnvironDemandShowSaveModel,
      environmentDemandListModel: [] as Array<EnvironmentDemandListModel>,
      isDisabled: true,
    };
  },
  beforeMount() {
    this.environDemandShowReqModel.eduCourseSeq = this.id;
    this.environDemandShowReqModel.upCdId = UP_CD_EDU_24;

    this.environDemandShowSaveModel.eduCourseSeq = this.id;

    this.getDetailDataEnvDemand();
  },
  methods: {
    getDetailDataEnvDemand() {
      this.storeCommon.setLoading(true);
      detailShowEnvDemand(this.environDemandShowReqModel).then((res) => {
        this.environmentDemandListModel = res.data.data;
        if (
          this.environmentDemandListModel.length > 0 &&
          this.environmentDemandListModel[0].dataSeq
        ) {
          this.isDisabled = false;
        }
        this.storeCommon.setLoading(false);
      });
    },
    confirmSaveData() {
      if (this.storeCommon.check) {
        this.$alert(this.t("common.messageValidateRequired"));
        return;
      }
      this.$confirm(this.t("common.message.save"), "", (isConfirm: Boolean) => {
        if (isConfirm) {
          this.saveDataEnvDemand();
        }
      });
    },
    saveDataEnvDemand() {
      this.storeCommon.setLoading(true);
      this.environDemandShowSaveModel.progStepCd = CD_STG031;
      this.environDemandShowSaveModel.listEnvironDemand =
        this.environmentDemandListModel;
      saveShowEnvDemand(this.environDemandShowSaveModel).then((res) => {
        this.storeCommon.setLoading(false);
        this.$confirm(
          this.t("common.messageSuccessNextTab"),
          "",
          (isConfirm: Boolean) => {
            if (isConfirm) {
              this.next();
            }
            if (this.isDisabled) {
              this.$emit("updateStage", 31);
            }
            this.isDisabled = false;
          }
        );
      });
    },
    next() {
      this.$emit("nextTab", 30);
    },
    back() {
      this.router.push({
        name: SCREEN.eduProcessCreation.name,
      });
    },
  },
});
</script>
