<template>
  <div class="page_wrapper">
    <section id="content" class="content_wrapper grid_content" tabindex="0">
      <div class="box dp_block">
        <div class="box_section">
          <p class="box_title_sm">{{ t("02.track.crud.title") }}</p>
          <table class="tbl_row">
            <caption>
              {{
                t("02.track.crud.title")
              }}
            </caption>
            <colgroup>
              <col style="width: 20%" />
              <col style="width: 40%" />
              <col style="width: 20%" />
              <col style="width: 40%" />
            </colgroup>
            <tbody>
              <tr>
                <th scope="row">
                  <p class="required">
                    {{ t("02.track.crud.form.trackName") }}
                  </p>
                </th>
                <td colspan="3">
                  <InputBase :id="'trackName'" required v-model="trackName" />
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <p class="required">{{ t("02.track.crud.form.useYn") }}</p>
                </th>
                <td colspan="3">
                  <RadiobuttonBase
                    v-for="item in listYn"
                    :mode="'show'"
                    :value="item.id"
                    v-model="useYn"
                    :id="item.id"
                    :name="item.id"
                    :key="item.id"
                    :checked="item.id == useYn"
                    :label="item.name"
                  ></RadiobuttonBase>
                </td>
              </tr>
              <tr>
                <th scope="row">{{ t("02.track.crud.form.intro") }}</th>
                <td colspan="3">
                  <TextArea :id="'textArea'" v-model="trackIntro"> </TextArea>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <p class="required">{{ t("02.track.crud.form.subject") }}</p>
                </th>
                <td colspan="3">
                  <button
                    type="button"
                    class="button btn_xs btn_blue btn_responsive"
                    @click="addSubject()"
                  >
                    {{ t("02.track.crud.button.openSub") }}
                  </button>
                  <div style="margin-top: 10px">
                    <table>
                      <thead>
                        <tr>
                          <th>
                            {{ t("02.track.crud.form.table.nameSubKor") }}
                          </th>
                          <th>{{ t("02.track.crud.form.table.nameSubEn") }}</th>
                          <th>{{ t("02.track.crud.form.table.codeSub") }}</th>
                          <th>{{ t("02.track.crud.form.table.typeSub") }}</th>
                          <th>{{ t("02.track.crud.form.table.credit") }}</th>
                          <th>{{ t("02.track.crud.form.table.theory") }}</th>
                          <th>{{ t("02.track.crud.form.table.practice") }}</th>
                          <th>{{ t("02.track.crud.form.table.manage") }}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(item, index) in listSubjectChoice"
                          :key="index"
                        >
                          <td>{{ item.sbjtNm }}</td>
                          <td>{{ item.sbjtEng }}</td>
                          <td>{{ item.sbjtCd }}</td>
                          <td>{{ item.sustDivNm }}</td>
                          <td>{{ item.acqCredit }}</td>
                          <td>{{ item.totalHrs }}</td>
                          <td>{{ item.thryHrs }}</td>
                          <td>
                            <span
                              style="color: #2704ff"
                              @click="confirmDeleteSb(index)"
                              >{{ t("02.track.crud.button.delelte") }}</span
                            >
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </td>
              </tr>
              <tr v-if="modeScreen === modelDetail">
                <th scope="row">
                  <p>{{ t("02.track.crud.form.regBy") }}</p>
                </th>
                <td colspan="3">{{ trackRegName }}</td>
              </tr>
              <tr v-if="modeScreen === modelDetail">
                <th scope="row">
                  <p>{{ t("02.track.crud.form.regDate") }}</p>
                </th>
                <td colspan="3">{{ trackRegDate }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="btn_area">
        <button
          v-if="modeScreen === modelCreate"
          type="button"
          class="button btn_xs btn_primary"
          @click="confirmSave()"
        >
          {{ t("02.track.crud.button.save") }}
        </button>
        <button
          v-if="modeScreen === modelDetail"
          type="button"
          class="button btn_xs btn_primary"
          @click="confirmEdit()"
        >
          {{ t("02.track.crud.button.save") }}
        </button>
        <button type="button" class="button btn_xs btn_white" @click="back()">
          {{ t("02.track.crud.button.close") }}
        </button>
      </div>
    </section>
  </div>
  <AddSubModal
    :isOpen="modalOpen"
    @close-modal="closeModal"
    @select-subject="addToListSubjectChoice"
  />
</template>
<script lang="ts">
import InputFileBase from "../../components/common/input/InputFileBase.vue";
import TextAreaBase from "../../components/common/input/TextAreaBase.vue";
import RadiobuttonBase from "../../components/common/input/RadiobuttonBase.vue";
import LoaddingComponent from "../../components/common/loading/LoaddingComponent.vue";
import { defineComponent, ref, watch } from "vue";
import { SCREEN } from "../../router/screen";
import { useI18n } from "vue-i18n";
import AddSubModal from "./AddSubModal.vue";
import { STATUS_YES, STATUS_NO } from "../../constants/common.const";
import type {
  SubjectDetail,
  TrackCre,
  DetailOutput,
  TrackId,
  SubjectCre,
} from "@/stores/trackMng/trackMng.type";
import { commonStore } from "../../stores/common";
import { trackStore } from "@/stores/trackMng";
import InputBase from "@/components/common/input/InputBase.vue";
import {
  SUCCSESS_STATUS,
  CREATED_STATUS,
  FORMAT_YYY_MM_DD,
  MODE_DETAIL,
  MODE_CREATE,
} from "../../constants/screen.const";
import { useRouter } from "vue-router";
import { format } from "date-fns";
import Swal from "sweetalert2";

export default defineComponent({
  components: {
    RadiobuttonBase,
    InputFileBase,
    LoaddingComponent,
    TextAreaBase,
    AddSubModal,
  },
  setup: () => {
    const { t } = useI18n();
    const store = trackStore();
    const cmn = commonStore();
    const router = useRouter();
    const listYn = [
      { id: STATUS_YES, name: t("common.use") },
      { id: STATUS_NO, name: t("common.noUse") },
    ];
    const useYn = ref(STATUS_YES);
    const courses = ref<Array<SubjectDetail>>([]);
    const modalOpen = ref(false);
    const modeScreen = ref("");
    const trackId = ref<TrackId>({});
    const listSubjectChoice = ref<Array<SubjectDetail>>([]);
    const trackCre = ref<TrackCre>({});
    const trackModelDetail = ref<DetailOutput>({});
    const trackName = ref("");
    const trackIntro = ref("");
    const trackRegName = ref("");
    const trackRegDate = ref("");
    const modelDetail = MODE_DETAIL;
    const modelCreate = MODE_CREATE;
    const listSubjectDelete = ref<Array<SubjectCre>>([]);
    function addToListSubjectChoice(subject: SubjectDetail) {
      const exists = listSubjectChoice.value.some(
        (item) => item.sbjtCd === subject.sbjtCd
      );
      if (!exists) {
        listSubjectChoice.value.push(subject);
      }
    }
    const deleteSubject = async (index: number) => {
      if (listSubjectChoice.value[index].trackCourseSbjtSeq) {
        listSubjectChoice.value[index].delYn = STATUS_YES;
        listSubjectDelete.value.push(listSubjectChoice.value[index]);
      }
      listSubjectChoice.value.splice(index, 1);
      await Swal.fire({
        text: t("02.track.crud.message.deleteSuccess"),
        type: "warning",
        showCancelButton: false,
        confirmButtonText: t("02.track.crud.button.oke"),
      });
      await closeModal();
    };
    function confirmDeleteSb(index: number) {
      Swal.fire({
        text: t("02.track.crud.message.confirmDelete"),
        type: "warning",
        showCancelButton: true,
        confirmButtonText: t("02.track.crud.button.delelteSb"),
        cancelButtonText: t("02.track.crud.button.cancel"),
      }).then((result) => {
        if (result.isConfirmed) {
          deleteSubject(index);
        }
      });
    }
    function closeModal() {
      modalOpen.value = false;
    }
    function addSubject() {
      modalOpen.value = true;
    }
    function back() {
      router.replace({ path: SCREEN.trackMng.path });
    }
    async function getDetaiTrack() {
      cmn.setLoading(true);
      await store.getTrackById(trackId.value);
      if (store && store.status == SUCCSESS_STATUS) {
        trackModelDetail.value = store.detailOutput.data;
        trackName.value = trackModelDetail.value.trackDetail?.trackCourseNm;
        trackIntro.value = trackModelDetail.value.trackDetail?.trackCourseIntro;
        useYn.value = trackModelDetail.value.trackDetail?.useYn;
        trackRegName.value = trackModelDetail.value.trackDetail?.regId;
        trackRegDate.value = format(
          new Date(trackModelDetail.value.trackDetail?.regDate),
          FORMAT_YYY_MM_DD
        );
        for (const subject of trackModelDetail.value.subjectDetailList) {
          listSubjectChoice.value.push(subject);
        }
      }
      cmn.setLoading(false);
    }

    async function save() {
      cmn.setLoading(true);
      trackCre.value.trackCourseNm = trackName;
      trackCre.value.trackCourseIntro = trackIntro;
      trackCre.value.useYn = useYn;
      trackCre.value.subjectList = listSubjectChoice.value.map((item) => ({
        sbjtCd: item.sbjtCd,
      }));
      await store.insertTrack(trackCre.value);
      if (store && store.status == CREATED_STATUS) {
        cmn.setLoading(false);
        if (store.statusIns.data == false) {
          await Swal.fire({
            text: t("02.track.crud.message.duplicateTrack"),
            type: "warning",
            showCancelButton: false,
            confirmButtonText: t("02.track.crud.button.oke"),
          });
        } else if (store.statusIns.data == true) {
          await Swal.fire({
            text: t("02.track.crud.message.success"),
            type: "warning",
            showCancelButton: false,
            confirmButtonText: t("02.track.crud.button.oke"),
          });
          back();
        }
      }
    }
    async function edit() {
      cmn.setLoading(true);
      trackCre.value.trackCourseSeq = trackId.value.trackCourseSeq;
      trackCre.value.trackCourseNm = trackName;
      trackCre.value.trackCourseIntro = trackIntro;
      trackCre.value.useYn = useYn;
      const subjectChoiceMapped = listSubjectChoice.value.map((item) => ({
        sbjtCd: item.sbjtCd,
        delYn: STATUS_NO,
        trackCourseSbjtSeq: item.trackCourseSbjtSeq,
      }));
      const subjectDeleteMapped = listSubjectDelete.value.map((item) => ({
        sbjtCd: item.sbjtCd,
        delYn: item.delYn,
        trackCourseSbjtSeq: item.trackCourseSbjtSeq,
      }));
      trackCre.value.subjectList = [
        ...subjectChoiceMapped,
        ...subjectDeleteMapped,
      ];
      await store.editTrack(trackCre.value);
      if (store && store.status == SUCCSESS_STATUS) {
        cmn.setLoading(false);
        if (store.statusIns.data == false) {
          await Swal.fire({
            text: t("02.track.crud.message.duplicateTrack"),
            type: "warning",
            showCancelButton: false,
            confirmButtonText: t("02.track.crud.button.oke"),
          });
        } else if (store.statusIns.data == true) {
          await Swal.fire({
            text: t("02.track.crud.message.success"),
            type: "warning",
            showCancelButton: false,
            confirmButtonText: t("02.track.crud.button.oke"),
          });
          back();
        }
      }
    }
    function confirmSave() {
      if (trackName && listSubjectChoice.value.length > 0) {
        Swal.fire({
          text: t("02.track.crud.message.confirmSave"),
          type: "warning",
          showCancelButton: true,
          confirmButtonText: t("02.track.crud.button.save"),
          cancelButtonText: t("02.track.crud.button.cancel"),
        }).then((result) => {
          if (result.isConfirmed) {
            save();
          }
        });
      } else {
        Swal.fire({
          text: t("common.messageValidateRequired"),
          type: "warning",
          showConfirmButton: false,
          showCancelButton: true,
          cancelButtonText: t("common.cancel"),
        });
      }
    }
    function confirmEdit() {
      if (
        trackName &&
        trackName.value != "" &&
        listSubjectChoice.value.length > 0
      ) {
        Swal.fire({
          text: t("02.track.crud.message.confirmSave"),
          type: "warning",
          showCancelButton: true,
          confirmButtonText: t("02.track.crud.button.save"),
          cancelButtonText: t("02.track.crud.button.cancel"),
        }).then((result) => {
          if (result.isConfirmed) {
            edit();
          }
        });
      } else {
        Swal.fire({
          text: t("common.messageValidateRequired"),
          type: "warning",
          showConfirmButton: false,
          showCancelButton: true,
          cancelButtonText: t("common.cancel"),
        });
      }
    }

    return {
      t,
      listYn,
      useYn,
      courses,
      modalOpen,
      modeScreen,
      trackId,
      listSubjectChoice,
      addToListSubjectChoice,
      deleteSubject,
      closeModal,
      addSubject,
      back,
      trackModelDetail,
      trackName,
      trackIntro,
      save,
      router,
      getDetaiTrack,
      trackRegName,
      trackRegDate,
      edit,
      confirmDeleteSb,
      confirmSave,
      confirmEdit,
      modelDetail,
      modelCreate,
    };
  },
  beforeMount() {
    this.modeScreen = this.$route.params.mode;
    this.trackId.trackCourseSeq = window.history.state.id;
    if (this.trackId.trackCourseSeq) {
      this.getDetaiTrack();
    }
  },
});
</script>
