<template>
  <div class="box_section mt-5">
    <!-- Type Talent 1 -->
    <div class="box_section mt-13" v-for="(job, indexJob) in dataView">
      <div class="dp_flex between al_center box_title_sm">
        {{ job.typeNm }} - {{ job.jobNm }}
        <button class="button btn_primary btn_lg" @click="openModal(indexJob)">
          <!-- 교과목 추가 -->{{ t("eduProcessCreation.subjectMng.title53") }}
        </button>
      </div>
      <div class="tbl tbl_col">
        <table>
          <colgroup>
            <col style="width: auto" />
            <col style="width: auto" />
            <col style="width: auto" />
            <col style="width: 30%" />
            <col style="width: 15%" />
            <col style="width: 15%" />
            <col style="width: 10%" />
          </colgroup>
          <thead>
            <tr>
              <th scope="row" class="ta_c" :colspan="1">
                <!-- 교과목명 -->{{
                  t("eduProcessCreation.subjectMng.title54")
                }}
              </th>
              <th scope="row" class="ta_c" :colspan="1">
                <!-- 교과목 코드 -->{{
                  t("eduProcessCreation.subjectMng.title55")
                }}
              </th>
              <th scope="row" class="ta_c" :colspan="1">
                <!-- 학점 -->{{ t("eduProcessCreation.subjectMng.title56") }}
              </th>
              <th scope="row" class="ta_c" :colspan="1">
                <!-- 직무역량 -->{{
                  t("eduProcessCreation.subjectMng.title57")
                }}
              </th>
              <th scope="row" class="ta_c" :colspan="1">
                <!-- 하위역량 -->{{
                  t("eduProcessCreation.subjectMng.title58")
                }}
              </th>
              <th scope="row" class="ta_c" :colspan="1">
                <!-- 수행준거 -->{{
                  t("eduProcessCreation.subjectMng.title59")
                }}
              </th>
              <th scope="row" class="ta_c" :colspan="1">
                <!-- 관리 -->{{ t("eduProcessCreation.subjectMng.title60") }}
              </th>
            </tr>
          </thead>
          <tbody>
            <!-- Row 1 -->
            <template
              v-for="(sbjt, indexSbjt) in job.subjectNm"
              :key="indexSbjt"
            >
              <template
                v-for="(ability, indexAbility) in sbjt.jobAbility"
                :key="indexAbility"
              >
                <tr>
                  <template v-if="indexAbility === 0">
                    <td :rowspan="sbjt.jobAbility.length">{{ sbjt.sbjtNm }}</td>
                    <td :rowspan="sbjt.jobAbility.length">{{ sbjt.sbjtCd }}</td>
                    <td :rowspan="sbjt.jobAbility.length">{{ sbjt.acqGpa }}</td>
                  </template>
                  <td scope="row" :colspan="1">
                    <div class="dp_flex al_center">
                      <SelectBoxBase
                        v-if="dataForm.jobAbility && ability"
                        required
                        :id="`jobAbility_${indexJob}_${indexSbjt}_${indexAbility}`"
                        :name="`jobAbility_${indexJob}_${indexSbjt}_${indexAbility}`"
                        :data="dataForm.jobAbility.filter(
                          (item: any) =>
                          (item.upCdId.includes(sbjt.jobSeq)) || item.cdId == ''
                        )"
                        v-model="ability.cdId"
                        @change="
                          changeJobAbility(
                            indexJob,
                            indexSbjt,
                            indexAbility,
                            ability.cdId,
                            ability
                          )
                        "
                      >
                      </SelectBoxBase>
                      <div class="wd_100">
                        <button
                          type="button"
                          v-if="indexAbility == 0"
                          class="btn_round btn_sm btn_white"
                          @click="addJobAbility(indexJob, indexSbjt)"
                        >
                          {{ t("common.add") }}
                        </button>
                        <button
                          type="button"
                          v-if="indexAbility != 0"
                          class="btn_round btn_sm btn_white"
                          @click="
                            deleteJobAbility(indexJob, indexSbjt, indexAbility)
                          "
                        >
                          {{ t("common.deleteItem") }}
                        </button>
                      </div>
                    </div>
                  </td>
                  <td scope="row" :colspan="1">
                    <ListCheckBoxBase
                      v-if="dataForm.jobCapa"
                      :listData="
                        dataForm.jobCapa.filter(
                          (item: any) =>
                            ability.cdId && item.upCdId.includes(ability.cdId)
                        )
                      "
                      :mode="'show'"
                      v-model="ability.jobCapa"
                      :id="`jobCapa_${indexJob}_${indexSbjt}_${indexAbility}`"
                      :name="`jobCapa_${indexJob}_${indexSbjt}_${indexAbility}`"
                      :class="'check_box_custom'"
                      :hasCheckAll="false"
                      :useArray="true"
                      :key="`${ability.keyJobCapa}`"
                      :requireId="`jobCapa_${indexJob}_${indexSbjt}_${indexAbility}`"
                      :isRequire="true"
                      @change="checkCapaChange(ability)"
                    />
                    <span
                      v-if="
                        dataForm.jobCapaPerform &&
                        dataForm.jobCapa.filter(
                          (item: any) =>
                            ability.cdId && item.upCdId.includes(ability.cdId)
                        ).length == 0
                      "
                      >※직무역량을 선택해주세요.</span
                    >
                  </td>
                  <td scope="row" :colspan="1">
                    <ListCheckBoxBase
                      v-if="dataForm.jobCapaPerform"
                      :listData="
                        dataForm.jobCapaPerform.filter(
                          (item: any) =>
                            ability.jobCapa &&
                            ability.jobCapa.includes(item.upCdId)
                        )
                      "
                      :mode="'show'"
                      v-model="ability.jobCapaPerform"
                      :id="`jobCapaPerform_${indexJob}_${indexSbjt}_${indexAbility}`"
                      :name="`jobCapaPerform_${indexJob}_${indexSbjt}_${indexAbility}`"
                      :class="'check_box_custom'"
                      :hasCheckAll="false"
                      :useArray="true"
                      :key="`${ability.keyJobCapaPerform}`"
                      :requireId="`jobCapaPerform_${indexJob}_${indexSbjt}_${indexAbility}`"
                      :isRequire="true"
                    />
                    <span
                      v-if="
                        dataForm.jobCapaPerform &&
                        dataForm.jobCapaPerform.filter(
                          (item: any) =>
                            ability.jobCapa &&
                            ability.jobCapa.includes(item.upCdId)
                        ).length == 0
                      "
                      >※직무역량을 선택해주세요.</span
                    >
                  </td>
                  <td scope="row" class="ta_c" :colspan="1">
                    <button
                      type="button"
                      v-if="indexAbility == 0"
                      class="btn_round btn_sm btn_white"
                      @click="deleteSubject(indexJob, indexSbjt)"
                    >
                      교과목 삭제
                    </button>
                  </td>
                </tr>
              </template>
            </template>
          </tbody>
        </table>
      </div>
    </div>

    <div class="btn_group btn_end mg_t35">
      <div class="btn_group btn_end">
        <button
          v-if="checkTemp && isSave"
          type="button"
          class="btn_round btn_md btn_primary"
          @click="saveTemp()"
        >
          {{ t("common.saveTemp") }}
        </button>
        <button
          v-if="isSave"
          type="button"
          class="btn_round btn_md btn_primary"
          @click="save()"
        >
          {{ t("common.save") }}
        </button>
        <button
          type="button"
          class="btn_round btn_md btn_primary"
          :disabled="isDisabled"
          @click="next()"
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
  <SubjectSelectModal
    v-if="modalOpen"
    @dataSelect="dataSelected"
    :isOpen="modalOpen"
    :onClose="closeModal"
  />
</template>

<script lang="ts">
import { commonStore } from "@/stores/common";
import { SCREEN } from "@/router/screen";
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import SubjectSelectModal from "./SubjectSelectModal.vue";
import {
  getCreateSubject,
  getCreateSubjectForm,
} from "@/stores/eduProcessCreation/subjectMng/subjectMng.service";
import {
  CreateSubjectFormDTO,
  CreateSubjectResDTO,
} from "@/stores/eduProcessCreation/subjectMng/subjectMng.type";
import ListCheckBoxBase from "@/components/common/input/ListCheckBoxBase.vue";
import {
  CreateListSbjtSelResDTO,
  CreateSubjectReqDTO,
} from "@/stores/eduProcessCreation/subjectMng/subjectMng.type";
import { STATUS_NO, STATUS_YES } from "@/constants/common.const";
import { saveCreateSubjectForm } from "@/stores/eduProcessCreation/subjectMng/subjectMng.service";

export default defineComponent({
  components: {
    SubjectSelectModal,
    ListCheckBoxBase,
  },
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
      dataForm: {} as CreateSubjectFormDTO,
      dataView: [] as CreateSubjectResDTO[],
      modalOpen: false,
      keyJob: 1,
      indexSelect: -1,
      isDisabled: true,
      checkTemp: true,
    };
  },
  beforeMount() {
    this.goToDetail();
  },
  methods: {
    checkCapaChange(ability: any) {
      ability.keyJobCapaPerform++;
      ability.jobCapaPerform = [];
    },
    async goToDetail() {
      this.storeCommon.setLoading(true);
      const dataSearch = {
        eduCourseSeq: this.id,
      };
      await getCreateSubject(dataSearch).then((res: any) => {
        this.dataView = res.data.data as CreateSubjectResDTO[];
        this.dataView = this.dataView.map(
          (job: CreateSubjectResDTO, indexJob: number) => {
            job.subjectNm = job.subjectNm.map(
              (sbjt: CreateListSbjtSelResDTO, indexSbjt: number) => {

                this.checkTemp = sbjt.tempSaveYn == STATUS_YES;

                if (sbjt.jobAbility.length == 0) {
                  this.addJobAbility(indexJob, indexSbjt);
                }
                sbjt.jobAbility = sbjt.jobAbility.map((abi: any) => {
                  this.isDisabled = false;
                  abi.keyJobCapa = 1;
                  abi.keyJobCapaPerform = 1;
                  abi.jobCapa = abi.jobCapa.map((capa: any) => capa.cdId);
                  abi.jobCapaPerform = abi.jobCapaPerform.map(
                    (capa: any) => capa.cdId
                  );
                  return abi;
                });

                return sbjt;
              }
            );
            return job;
          }
        );
      });
      await getCreateSubjectForm(dataSearch).then((res: any) => {
        this.dataForm = res.data.data as CreateSubjectFormDTO;
        this.dataForm.jobAbility.unshift({
          cdId: "",
          cdNm: this.t("common.select"),
          upCdId: "",
        });
      });
      this.storeCommon.setLoading(false);
    },
    changeJobAbility(
      indexJob: number,
      indexSbjt: number,
      indexAbility: any,
      value: string,
      ability: any
    ) {
      ability.jobCapa = [];
      ability.jobCapaPerform = [];
      ability.keyJobCapa++;
      if (
        value &&
        this.dataView[indexJob].subjectNm[indexSbjt].jobAbility.filter(
          (item: any, index: number) =>
            item.cdId == value && indexAbility != index
        )[0]
      ) {
        this.$alert("동일한 직무역량을 중복 선택할 수 없습니다.");
        this.dataView[indexJob].subjectNm[indexSbjt].jobAbility[indexAbility] =
          {
            cdId: "",
            cdNm: "",
            keyJobCapa: 1,
            keyJobCapaPerform: 1,
            jobCapa: [],
            jobCapaPerform: [],
          };
        return;
      }
    },
    addJobAbility(indexJob: number, indexSbjt: number) {
      this.dataView[indexJob].subjectNm[indexSbjt].jobAbility.push({
        cdId: "",
        cdNm: "",
        keyJobCapa: 1,
        keyJobCapaPerform: 1,
        jobCapa: [],
        jobCapaPerform: [],
      });
    },
    deleteJobAbility(
      indexJob: number,
      indexSbjt: number,
      indexAbility: number
    ) {
      this.dataView[indexJob].subjectNm[indexSbjt].jobAbility = this.dataView[
        indexJob
      ].subjectNm[indexSbjt].jobAbility.filter(
        (item: any, index: number) => index != indexAbility
      );
    },
    save() {
      if (this.storeCommon.check) {
        this.$alert(this.t("common.messageValidateRequired"));
        return;
      }

      this.dataView.forEach((job: any) => {
        if (job.subjectNm.length == 0) {
          this.$alert(`${job.subjectNm.sbjtNm}의 교과목을 선택하세요`);
        }
      });

      this.$confirm(
        this.t("common.message.save"),
        "",
        async (isConfirm: Boolean) => {
          if (isConfirm) {
            await this.saveData(STATUS_NO);

            this.$confirm(
              this.t("common.messageSuccessNextTab"),
              "",
              (isConfirm: Boolean) => {
                if (isConfirm) {
                  this.next();
                }
                this.$emit("updateStage", 53);
                this.isDisabled = false;
              }
            );
          }
        }
      );
    },
    saveTemp() {
      this.$confirm(
        this.t("common.message.confirmSaveTemp"),
        "",
        async (isConfirm: Boolean) => {
          if (isConfirm) {
            await this.saveData(STATUS_YES);
            this.$alert(this.t("common.message.successSaveTemp"));
          }
        }
      );
    },
    async saveData(tempSaveYn: string) {
      this.storeCommon.setLoading(true);
      const dataSave = [] as CreateSubjectReqDTO[];

      this.dataView.forEach((job: any) => {
        job.subjectNm.forEach((sbjt: any) => {
          let jobAbilityList = [] as any[];
          let jobCapaList = [] as any[];
          let jobCapaPerformList = [] as any[];

          sbjt.jobAbility.forEach((ability: any) => {
            if (ability.cdId) {
              jobAbilityList.push({
                cdId: ability.cdId,
                cdNm: "",
                upCdId: ability.cdId,
              });
            }

            if (ability.jobCapa) {
              ability.jobCapa.forEach((capa: any) => {
                if (capa) {
                  jobCapaList.push({
                    cdId: capa,
                    cdNm: "",
                    upCdId: ability.cdId,
                  });
                }
              });
            }

            if (ability.jobCapaPerform) {
              ability.jobCapaPerform.forEach((capa: any) => {
                if (capa) {
                  jobCapaPerformList.push({
                    cdId: capa,
                    cdNm: "",
                    upCdId: ability.cdId,
                  });
                }
              });
            }
          });

          dataSave.push({
            sbjtCandSeq: sbjt.sbjtCandSeq,
            jobSeq: sbjt.jobSeq,
            sbjtCd: sbjt.sbjtCd,
            eduCursSeq: this.id,
            tempSaveYn: tempSaveYn,
            delYn: "",
            jobAbility: jobAbilityList,
            jobCapa: jobCapaList,
            jobCapaPerform: jobCapaPerformList,
          });
        });
      });
      await saveCreateSubjectForm({ eduCourseSeq: this.id, list: dataSave });
      this.storeCommon.setLoading(false);
    },
    next() {
      this.$emit("tabChange5", 53);
    },
    back() {
      this.router.push({
        name: SCREEN.eduProcessCreation.name,
      });
    },
    openModal(indexJob: number) {
      this.indexSelect = indexJob;
      this.modalOpen = true;
    },
    // Modal
    closeModal() {
      this.modalOpen = false;
    },
    confirmAction() {
      // Handle confirm action
      this.closeModal();
    },
    cancelAction() {
      // Handle cancel action
      this.closeModal();
    },
    dataSelected(data: any) {
      if (
        this.dataView.some((view: any) =>
          view.subjectNm.some((item: any) => item.sbjtCd === data.sbjtCd)
        )
      ) {
        this.$alert("동일한 교과목을 중복 편성할 수 없습니다");
        return;
      }
      const dataSbjt = {
        sbjtCandSeq: "",
        jobSeq: this.dataView[this.indexSelect].jobSeq,
        sbjtCd: data.sbjtCd,
        sbjtNm: data.sbjtNm,
        acqGpa: data.acqCredit,
        jobAbility: [
          {
            cdId: "",
            cdNm: "",
            keyJobCapa: 0,
            keyJobCapaPerform: 0,
            jobCapa: [],
            jobCapaPerform: [],
          },
        ],
        keyJobCapa: 1,
      };
      this.dataView[this.indexSelect].subjectNm.push(dataSbjt);
    },
    deleteSubject(indexJob: number, indexSubject: number) {
      this.dataView[indexJob].subjectNm = this.dataView[
        indexJob
      ].subjectNm.filter((item: any, index: number) => index != indexSubject);
    },
  },
});
</script>
<style scoped>
@import url("../eduCourseCustom.css");
.between {
  justify-content: space-between;
}
.check_box_custom {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: baseline;
}
</style>
