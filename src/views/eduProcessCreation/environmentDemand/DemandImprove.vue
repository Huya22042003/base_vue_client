<template>
  <div class="box_section mt-5">
    <div class="box_section mt-10">
      <div class="tbl_col tbl">
        <table>
          <tbody>
            <tr>
              <th scope="row" :colspan="1" class="td_custom_color">
                <!-- 항목 -->{{
                  t("eduProcessCreation.environmentDemand.title10")
                }}
              </th>
              <th
                scope="row"
                class="td_custom_color"
                :colspan="1"
                v-for="(item, index) in environmentDemandListModel.slice(0, 2)"
                :key="index"
              >
                <span>{{ item.dataNm }}</span>
              </th>
            </tr>
            <tr>
              <th scope="row" :colspan="1" class="td_custom_color">
                Strength <br />
                Weakness <br />
                Opportunity <br />
                Threat
              </th>
              <th
                scope="row"
                :colspan="1"
                v-for="(item, index) in environmentDemandListModel.slice(0, 2)"
                :key="index"
              >
                <TextArea
                  :id="item.dataCd + index"
                  required
                  rows="7"
                  v-model="item.cont"
                ></TextArea>
              </th>
            </tr>
            <tr>
              <th
                scope="row"
                class="td_custom_color"
                :colspan="1"
                v-for="(item, index) in environmentDemandListModel.slice(2, 5)"
                :key="index"
              >
                <span>{{ item.dataNm }}</span>
              </th>
            </tr>
            <tr>
              <th
                scope="row"
                :colspan="1"
                v-for="(item, index) in environmentDemandListModel.slice(2, 5)"
                :key="index"
              >
                <TextArea
                  :id="item.dataCd + index"
                  required
                  rows="7"
                  v-model="item.cont"
                ></TextArea>
              </th>
            </tr>
            <tr>
              <th
                scope="row"
                class="td_custom_color"
                :colspan="1"
                v-for="(item, index) in environmentDemandListModel.slice(5, 8)"
                :key="index"
              >
                <span>{{ item.dataNm }}</span>
              </th>
            </tr>
            <tr>
              <th
                scope="row"
                :colspan="1"
                v-for="(item, index) in environmentDemandListModel.slice(5, 8)"
                :key="index"
              >
                <TextArea
                  :id="item.dataCd + index"
                  required
                  rows="7"
                  v-model="item.cont"
                ></TextArea>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="btn_group btn_end mg_t25">
      <div class="btn_group btn_end">
        <button type="button" class="btn_lg btn_round btn_gray" @click="print()">
          <!-- 2.환경분석 및 요구분석 인쇄 -->{{
            t("eduProcessCreation.environmentDemand.title19")
          }}
        </button>
        <!-- <button
          v-if="isSave"
          type="button"
          class="btn_round btn_lg btn_primary"
          @click="confirmSaveData"
        >
          {{ t("common.save") }}
        </button> -->
        <ButtonBase
          v-if="isSave"
          type="button"
          class="btn_round btn_lg btn_primary"
          :buttonName="t('common.save')"
          @click="confirmSaveData"
        ></ButtonBase>
        <button
          type="button"
          class="btn_round btn_lg btn_primary"
          @click="next()"
          :disabled="isDisabled"
        >
          {{ t("common.next") }}
        </button>
        <button
          type="button"
          class="btn_round btn_lg btn_white"
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
  EnvironDemTitleModel,
  EnvironmentDemandListModel,
} from "../../../stores/eduProcessCreation/environmentDemand/environmentDemand.type";
import {
  detailAnalysisEnvDemand,
  detailShowEnvDemand,
  saveShowEnvDemand,
} from "../../../stores/eduProcessCreation/environmentDemand/environmentDemand.service";
import { CD_STG031, UP_CD_EDU_21, UP_CD_EDU_22, UP_CD_EDU_23, UP_CD_EDU_24, UP_CD_EDUT_21, UP_CD_EDUT_22, UP_CD_EDUT_23 } from "../../../constants/common.const";

export default defineComponent({
  setup: () => {
    const router = useRouter();
    const storeCommon = commonStore();
    const { t } = useI18n();
    const id = window.history.state.id;
    const isSave = window.history.state.isSave;

    return { router, storeCommon, t, id, isSave };
  },
  data() {
    return {
      environDemandShowReqModel: {} as EnvironDemandShowReqModel,
      environDemandShowSaveModel: {} as EnvironDemandShowSaveModel,
      environmentDemandListModel: [] as Array<EnvironmentDemandListModel>,
      isDisabled: true,
      nameFormRp: "07_02_environment_demand",
      datasetListRp: {} as any,
      paramListRp: {} as any,
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
            this.$emit("updateStage", 31);
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
        path: SCREEN.eduProcessCreation.path,
      });
    },
    async getEnvironmentInternal() {
      const environDemReqModel = {
        eduCourseSeq: this.id,
        upCdId: UP_CD_EDU_21,
        upRefrId: UP_CD_EDUT_21,
      };

      this.datasetListRp.environmentInternal = [];
      await detailAnalysisEnvDemand(environDemReqModel).then((res) => {
        const response = res.data.data as EnvironDemTitleModel[];

        this.datasetListRp.environmentInternal = response.map((item) => {
          return {
            title: item.title,
            result: item.listEnvironDemand[0].cont,
            cont: item.listEnvironDemand[1].cont,
          };
        });
      });
    },
    async getEvironmentOutside() {
      const environDemReqModel = {
        eduCourseSeq: this.id,
        upCdId: UP_CD_EDU_22,
        upRefrId: UP_CD_EDUT_22,
      };

      this.datasetListRp.environmentOutside = [];
      await detailAnalysisEnvDemand(environDemReqModel).then((res) => {
        const response = res.data.data as EnvironDemTitleModel[];

        this.datasetListRp.environmentOutside = response.map((item) => {
          return {
            title: item.title,
            result: item.listEnvironDemand[0].cont,
            cont: item.listEnvironDemand[1].cont,
          };
        });
      });
    },
    async getEvironmentAttention() {
      const environDemReqModel = {
        eduCourseSeq: this.id,
        upCdId: UP_CD_EDU_23,
        upRefrId: UP_CD_EDUT_23,
      };

      this.datasetListRp.environmentAttention = [];
      await detailAnalysisEnvDemand(environDemReqModel).then((res) => {
        const response = res.data.data as EnvironDemTitleModel[];

        this.datasetListRp.environmentAttention = response.map((item) => {
          return {
            title: item.title,
            result: item.listEnvironDemand[0].cont,
            cont: item.listEnvironDemand[1].cont,
          };
        });
      });
    },
    async getEvironmentImprove() {
      const environDemReqModel = {
        eduCourseSeq: this.id,
        upCdId: UP_CD_EDU_24,
      };

      this.datasetListRp.environmentImprove = [];
      await detailShowEnvDemand(environDemReqModel).then((res) => {
        const response = res.data.data as EnvironmentDemandListModel[];

        this.datasetListRp.environmentImprove = [
          {
            s: response.filter((item) => item.dataCd == "EDU241")[0].cont,
            w: response.filter((item) => item.dataCd == "EDU242")[0].cont,
            o: response.filter((item) => item.dataCd == "EDU243")[0].cont,
            s_o: response.filter((item) => item.dataCd == "EDU244")[0].cont,
            w_o: response.filter((item) => item.dataCd == "EDU245")[0].cont,
            t: response.filter((item) => item.dataCd == "EDU246")[0].cont,
            s_t: response.filter((item) => item.dataCd == "EDU247")[0].cont,
            w_t: response.filter((item) => item.dataCd == "EDU248")[0].cont,
          },
        ];
      });
    },
    async cloneData() {
      await this.getEnvironmentInternal();
      await this.getEvironmentOutside();
      await this.getEvironmentAttention();
      await this.getEvironmentImprove();
    },
    convertData() {
      this.datasetListRp.operationDevelopmentPlan = JSON.stringify(
        this.datasetListRp.operationDevelopmentPlan
      );
      this.datasetListRp.environmentInternal = JSON.stringify(
        this.datasetListRp.environmentInternal
      );
      this.datasetListRp.environmentOutside = JSON.stringify(
        this.datasetListRp.environmentOutside
      );
      this.datasetListRp.environmentAttention = JSON.stringify(
        this.datasetListRp.environmentAttention
      );
      this.datasetListRp.environmentImprove = JSON.stringify(
        this.datasetListRp.environmentImprove
      );
    },
    async print() {
      this.storeCommon.setLoading(true);

      await this.cloneData();

      await this.convertData();

      await this.storeCommon.fn_viewer_open(
        this.nameFormRp,
        this.datasetListRp,
        this.paramListRp
      );
      this.storeCommon.setLoading(false);
    },
    
  },
});
</script>
<style scoped>
@import url("../eduCourseCustom.css");
</style>
