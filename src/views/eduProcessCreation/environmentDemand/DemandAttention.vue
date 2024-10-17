<template>
  <div class="box_section mt-5">
    <template v-for="envDemand in environDemTitleModel" :key="envDemand.code">
      <div class="box_section mt-10">
        <p class="box_title_sm">
          {{ envDemand.title }}
        </p>
        <div class="tbl_col tbl">
          <table>
            <colgroup>
              <col style="width: 20%" />
              <col style="width: 80%" />
            </colgroup>
            <tbody>
              <tr
                v-for="(item, index) in envDemand.listEnvironDemand"
                :key="item.dataCd + index"
              >
                <th scope="row" :colspan="1">
                  {{ item.dataNm }}
                </th>
                <td scope="row" :colspan="1">
                  <TextArea
                    :id="'envDemand' + envDemand.code + item.dataCd + index"
                    :name="'envDemand' + envDemand.code + item.dataCd + index"
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
    </template>

    <div class="btn_group btn_end mg_t25">
      <div class="btn_group btn_end">
        <button
          v-if="isSave"
          type="button"
          class="btn_round btn_md btn_primary"
          @click="confirmSaveData()"
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
  CD_STG024,
  UP_CD_EDU_23,
  UP_CD_EDUT_23,
} from "../../../constants/common.const";
import {
  EnvironDemReqModel,
  EnvironDemSaveModel,
  EnvironDemTitleModel,
} from "../../../stores/eduProcessCreation/environmentDemand/environmentDemand.type";
import {
  detailAnalysisEnvDemand,
  saveAnalysisEnvDemand,
} from "../../../stores/eduProcessCreation/environmentDemand/environmentDemand.service";

export default defineComponent({
  setup: () => {
    const router = useRouter();
    const storeCommon = commonStore();
    const { t } = useI18n();
    const id = window.history.state.id;
    const isSave = window.history.state.isSave;

    return { router, storeCommon, t, id, isSave };
  },
  beforeMount() {
    this.environDemReqModel.eduCourseSeq = this.id;
    this.environDemReqModel.upCdId = UP_CD_EDU_23;
    this.environDemReqModel.upRefrId = UP_CD_EDUT_23;

    this.environDemSaveModel.eduCourseSeq = this.id;

    this.getDetailDataEnvDemand();
  },
  data() {
    return {
      environDemTitleModel: [] as Array<EnvironDemTitleModel>,
      environDemReqModel: {} as EnvironDemReqModel,
      environDemSaveModel: {} as EnvironDemSaveModel,
      isDisabled: true,
    };
  },
  methods: {
    getDetailDataEnvDemand() {
      this.storeCommon.setLoading(true);
      detailAnalysisEnvDemand(this.environDemReqModel).then((res) => {
        this.environDemTitleModel = res.data.data;
        if (
          this.environDemTitleModel.length > 0 &&
          this.environDemTitleModel[0].listEnvironDemand[0].dataSeq
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
      this.environDemSaveModel.listEnvironDem = this.environDemTitleModel;
      this.environDemSaveModel.progStepCd = CD_STG024;
      saveAnalysisEnvDemand(this.environDemSaveModel).then((res) => {
        this.storeCommon.setLoading(false);
        this.$confirm(
          this.t("common.messageSuccessNextTab"),
          "",
          (isConfirm: Boolean) => {
            if (isConfirm) {
              this.next();
            }
            if (this.isDisabled) {
              this.$emit("updateStage", 24);
            }
            this.isDisabled = false;
          }
        );
      });
    },
    next() {
      this.$emit("tabChange2", 24);
    },
    back() {
      this.router.push({
        name: SCREEN.eduProcessCreation.name,
      });
    },
  },
});
</script>
