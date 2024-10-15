<template>
  <div class="page_wrapper">
    <section id="content" class="content_wrapper grid_content" tabindex="0">
      <Breadcrumb :pageTitle="pageTitle" :breadcrumbItems="breadcrumbItems" />
      <div class="divide_box">
        <div class="box box_diag_custom">
          <h3 class="box_title">
            {{ t("11.diagProfessorAbility.subTitle1") }}
          </h3>
          <div
            class="mt_5 mb_8"
            v-for="item in listDiagProf"
            :key="item.diagSeq"
          >
            <div
              class="diag-flex-custom"
              @click="
                gotoDetailDiag(
                  item.diagSeq,
                  item.publicInfo,
                  item.indvInfoAgrYn,
                  item.statusCode
                )
              "
            >
              <div class="diagNm-flex-custom">
                <div
                  :class="
                    item.statusCode !== statusDiagTargetMember02
                      ? 'diagNm-custom'
                      : 'diag-end-custom'
                  "
                >
                  {{ item.diagNm }}
                </div>
                <div>
                  <span
                    :class="
                      item.statusCode !== statusDiagTargetMember02
                        ? 'statusNm-custom'
                        : 'statusNm-end-custom'
                    "
                  >
                    {{ item.statusNm }}
                  </span>
                </div>
              </div>
            </div>
            <div class="time-diag-custom">
              {{ item.diagDurStr }} ~ {{ item.diagDurEnd }}
            </div>
          </div>
        </div>
        <div class="box box_diag_custom">
          <h3 class="box_title">
            {{ t("11.diagProfessorAbility.subTitle2") }}
          </h3>
          <div class="mb-10" v-for="item in listResult" :key="item.diagSeq">
            <div class="diag-flex-custom">
              <div class="diagNm-flex-custom">
                <div class="diagNm-result-custom">
                  {{ item.diagNm }}
                </div>
                <div>
                  <span class="statusNm-custom" style="cursor: auto">
                    {{ item.statusNm }}
                  </span>
                </div>
              </div>
              <div>
                <span
                  class="see-result"
                  @click="gotoDetailResult(item.diagSeq)"
                  >{{ t("11.diagProfessorAbility.seeResult") }}</span
                >
              </div>
            </div>
            <div class="time-diag-custom">
              {{ item.excutionDate }}
            </div>
          </div>
        </div>
      </div>
      <ModalPublicInfo
        :isOpen="isOpenModalPublicInfo"
        :diagSeq="diagSeqSelected"
        @close-modal="closeModalPublicInfo"
      />
    </section>
  </div>
</template>
<script lang="ts">
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import LinkGridComponent from "@/components/common/grid/LinkGridComponent.vue";
import { defineComponent } from "vue";
import { commonStore } from "../../stores/common";
import { useI18n } from "vue-i18n";
import { format } from "date-fns";
import { FORMAT_YYY_MM_DD } from "../../constants/screen.const";
import { SCREEN } from "../../router/screen";
import {
  DIAG_TARGET_MEMBER_STATUS_02,
  STATUS_YES,
} from "../../constants/common.const";
import ModalPublicInfo from "./ModalPublicInfo.vue";
import {
  DiagProfAbilityStaffListModel,
  DiagProfAbilityStaffResultModel,
} from "../../stores/diagProfessorAbilityStaff/diagProfessorAbility.type";
import { getListDataDiagProfAbility } from "../../stores/diagProfessorAbilityStaff/diagProfessorAbility.service";

export default defineComponent({
  components: { Breadcrumb, LinkGridComponent, ModalPublicInfo },
  setup() {
    const store = commonStore();
    const { t } = useI18n();
    return { t, store };
  },
  data() {
    return {
      pageTitle: this.t("11.diagProfessorAbility.pageTitle"),
      breadcrumbItems: [],
      listDiagProf: [] as Array<DiagProfAbilityStaffListModel>,
      listResult: [] as Array<DiagProfAbilityStaffResultModel>,
      publicInfoY: STATUS_YES,
      isOpenModalPublicInfo: false,
      diagSeqSelected: "",
      statusDiagTargetMember02: DIAG_TARGET_MEMBER_STATUS_02,
      statusY: STATUS_YES,
    };
  },
  beforeMount() {
    this.loadData();
  },
  methods: {
    loadData() {
      this.store.setLoading(true);
      getListDataDiagProfAbility().then((res) => {
        this.listDiagProf = res.data.data.listDiagProf;
        this.listDiagProf.forEach((item) => {
          item.diagDurStr = format(item.diagDurStr, FORMAT_YYY_MM_DD);
          item.diagDurEnd = format(item.diagDurEnd, FORMAT_YYY_MM_DD);
        });

        this.listResult = res.data.data.listResult;
        this.listResult.forEach((item) => {
          item.excutionDate = format(item.excutionDate, FORMAT_YYY_MM_DD);
        });

        this.store.setLoading(false);
      });
    },
    openModalPublicInfo(diagSeq: string) {
      this.isOpenModalPublicInfo = true;
      this.diagSeqSelected = diagSeq;
    },
    closeModalPublicInfo() {
      this.isOpenModalPublicInfo = false;
    },
    gotoDetailDiag(
      diagSeq: string,
      publicInfo: string,
      indvInfoAgrYn: string,
      statusCode: string
    ) {
      if (statusCode !== this.statusDiagTargetMember02) {
        if (publicInfo === this.publicInfoY && indvInfoAgrYn !== this.statusY) {
          this.openModalPublicInfo(diagSeq);
        } else {
          this.$router.push({
            name: SCREEN.detailDiagProfessorAbilityStaff.name,
            state: { id: diagSeq },
          });
        }
      }
    },
    gotoDetailResult(diagSeq: string) {
      this.$router.push({
        name: SCREEN.resultDiagProfessorAbilityStaff.name,
        state: { id: diagSeq },
      });
    },
  },
});
</script>
<style scoped>
.box.box_diag_custom {
  height: 650px;
  overflow-y: auto;
}

.diagNm-custom {
  font-size: 18px;
  color: #0019fd;
  font-weight: 500;
  cursor: pointer;
}

.diagNm-result-custom {
  font-size: 18px;
  color: #292929;
  font-weight: 500;
}

.statusNm-custom {
  color: white;
  background-color: green;
  border-radius: 20px;
  margin-left: 15px;
  padding: 10px;
  padding-top: 4px;
  padding-bottom: 4px;
  cursor: pointer;
}

.diag-flex-custom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.time-diag-custom {
  margin-top: 10px;
  color: #7c7c7c;
  font-weight: 500;
}

.diag-end-custom {
  color: #7c7c7c;
  font-weight: 500;
  font-size: 18px;
}

.statusNm-end-custom {
  color: rgb(255, 255, 255);
  background-color: #7c7c7c;
  border-radius: 20px;
  margin-left: 15px;
  padding: 10px;
  padding-top: 4px;
  padding-bottom: 4px;
  cursor: pointer;
}

.diagNm-flex-custom {
  display: flex;
  align-items: center;
}

.see-result {
  font-size: 16px;
  font-weight: 500;
  color: #0019fd;
  cursor: pointer;
}
</style>
