<template>
  <div class="page_wrapper">
    <section id="content" class="content_wrapper grid_content" tabindex="0">
      <Breadcrumb :pageTitle="pageTitle" :breadcrumbItems="''"></Breadcrumb>
      <div class="box dp_block">
        <div class="box_section">
          <p class="box_title_sm">
            {{ t("capacityDeMng.track.detail.breadcrumb.nameTable1") }}
          </p>
          <table class="tbl_col">
            <caption>
              Information
            </caption>
            <colgroup>
              <col style="width: 20%" />
              <col style="width: 20%" />
              <col style="width: 20%" />
              <col style="width: 20%" />
              <col style="width: 20%" />
            </colgroup>
            <thead>
              <tr>
                <th scope="col">
                  {{ t("capacityDeMng.track.detail.information.university") }}
                </th>
                <th scope="col">
                  {{ t("capacityDeMng.track.detail.information.department") }}
                </th>
                <th scope="col">
                  {{ t("capacityDeMng.track.detail.information.stdId") }}
                </th>
                <th scope="col">
                  {{ t("capacityDeMng.track.detail.information.stdName") }}
                </th>
                <th scope="col">
                  {{ t("capacityDeMng.track.detail.information.eduYear") }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ trackInfo.majorNm }}</td>
                <td>{{ trackInfo.deptNm }}</td>
                <td>{{ trackInfo.stdId }}</td>
                <td>{{ trackInfo.userNm }}</td>
                <td>{{ trackInfo.gradeNm }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="box dp_block">
        <div class="box_section">
          <p class="box_title_sm">
            {{ t("capacityDeMng.track.detail.breadcrumb.nameTable2") }}
          </p>
          <table class="tbl_col">
            <caption>
              Information
            </caption>
            <colgroup>
              <col style="width: 30%" />
              <col style="width: 30%" />
              <col style="width: 10%" />
              <col style="width: 5%" />
              <col style="width: 5%" />
              <col style="width: 5%" />
              <col style="width: 15%" />
            </colgroup>
            <thead>
              <tr>
                <th scope="col">
                  {{ t("capacityDeMng.track.detail.nameTrack.engName") }}
                </th>
                <th scope="col">
                  {{ t("capacityDeMng.track.detail.nameTrack.krName") }}
                </th>
                <th scope="col">
                  {{ t("capacityDeMng.track.detail.nameTrack.classify") }}
                </th>
                <th scope="col">
                  {{ t("capacityDeMng.track.detail.nameTrack.credits") }}
                </th>
                <th scope="col">
                  {{ t("capacityDeMng.track.detail.nameTrack.theory") }}
                </th>
                <th scope="col">
                  {{ t("capacityDeMng.track.detail.nameTrack.practice") }}
                </th>
                <th scope="col">
                  {{ t("capacityDeMng.track.detail.nameTrack.situation") }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="nameTrack in listSubject" :key="nameTrack.sbjtCd">
                <td>{{ nameTrack.sbjtNm }}</td>
                <td>{{ nameTrack.sbjtNmEng }}</td>
                <td>{{ nameTrack.sustDivNm }}</td>
                <td>{{ nameTrack.acqCredit }}</td>
                <td>{{ nameTrack.thryHrs }}</td>
                <td>{{ nameTrack.practiceHrs }}</td>
                <td
                  :class="
                    nameTrack.status
                      ? getClassStatus(nameTrack.status.toLowerCase())
                      : ''
                  "
                >
                  {{ nameTrack.status || "-" }}
                </td>
              </tr>
            </tbody>
          </table>
          <div class="btn_area">
            <button
              type="button"
              class="button btn_xs btn_gray"
              @click="back()"
            >
              {{ t("capacityDeMng.track.button.back") }}
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script lang="ts">
import { SCREEN } from "@/router/screen";
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import { commonStore } from "@/stores/common";
import {
  getDetailTrack,
  getDetailSubject,
} from "@/stores/capacityDeMng/trackingProcess/trackingProcess.service";
import type {
  TrackIdModel,
  SubjectInTrack,
  TrackInitModel,
} from "@/stores/capacityDeMng/trackingProcess/trackingProcess.type";
import { MESSAGE_ERROR_API } from "@/constants/common.const";

export default defineComponent({
  setup: () => {
    const store = commonStore();
    const { t } = useI18n();
    return { t, store };
  },
  beforeMount() {
    this.modeScreen = this.$route.params.mode;
    this.idModel.stdId = window.history.state.stdId;
    this.idModel.trackCourseSeq = window.history.state.trackCourseSeq;
    try {
      Promise.all([this.getDetail()]);
    } catch (e) {
      alert(e);
    }
  },
  data() {
    return {
      pageTitle: this.t("capacityDeMng.track.detail.breadcrumb.pageTitle"),
      rowDataStd: [] as Array<any>,
      modeScreen: "",
      idModel: {} as TrackIdModel,
      listSubject: [] as Array<SubjectInTrack>,
      trackInfo: {} as TrackInitModel,
    };
  },
  methods: {
    back() {
      this.$router.push({ name: SCREEN.trackingProcess.name });
    },
    getClassStatus(status: any) {
      if (!status) return "default";
      if (status === "fail") {
        return "fail";
      } else if (status === "pass") {
        return "pass";
      } else {
        return "default";
      }
    },
    async getDetail() {
      this.store.setLoading(true);
      await getDetailTrack(this.idModel)
        .then((res) => {
          this.trackInfo = res.data.data;
        })
        .catch((error) => {
          throw new Error(MESSAGE_ERROR_API);
        })
        .finally(() => {
          this.store.setLoading(false);
        });
      await getDetailSubject(this.idModel)
        .then((res) => {
          this.listSubject = res.data.data;
        })
        .catch((error) => {
          throw new Error(MESSAGE_ERROR_API);
        })
        .finally(() => {
          this.store.setLoading(false);
        });
    },
  },
});
</script>
<style>
.fail {
  color: red;
}
.pass {
  color: #0b8e48;
}
.default {
  color: #1c4eff;
}
</style>
