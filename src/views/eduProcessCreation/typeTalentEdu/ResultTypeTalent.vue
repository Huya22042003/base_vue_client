<template>
  <div class="box_section mt-5">
    <div class="box_section mt-13">
      <p class="box_title_sm">
        <!-- AS-IS -->{{ t("eduProcessCreation.typeTalentEdu.title21") }}
      </p>
      <div class="tbl_col tbl">
        <table>
          <colgroup>
            <col style="width: 20%" />
            <col style="width: 80%" />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row" :colspan="1">
                <!-- 교육과정 목록 -->{{
                  t("eduProcessCreation.typeTalentEdu.title22")
                }}
              </th>
              <td scope="row" :colspan="1" class="ta_l">
                <template
                  v-if="
                    data.asisEduCourse && data.asisEduCourse.tobeCoreJobDivCd
                  "
                >
                  {{ data.asisEduCourse.indexEduCourseNm }}
                </template>
              </td>
            </tr>
            <tr>
              <th scope="row" :colspan="1">
                <!-- 인재양성유형 -->{{
                  t("eduProcessCreation.typeTalentEdu.title23")
                }}
              </th>
              <td scope="row" :colspan="1" class="ta_l">
                <template
                  v-if="
                    data.asisEduCourse &&
                    data.asisEduCourse.tobeTaltNrtgTypeDivCd
                  "
                >
                  <template
                    v-if="
                      data.asisEduCourse.tobeTaltNrtgTypeDivCd ==
                      CD_RESULT_SEL_01
                    "
                  >
                    {{ data.asisEduCourse.eduCourseTypeDesc }}
                  </template>
                  <template
                    v-else-if="
                      data.asisEduCourse.tobeTaltNrtgTypeDivCd ==
                      CD_RESULT_SEL_03
                    "
                  >
                    {{ data.asisEduCourse.eduCourseType }}
                  </template>
                  <template v-else>
                    {{ "" }}
                  </template>
                </template>
              </td>
            </tr>
            <tr>
              <th scope="row" :colspan="1">
                <!-- 핵심직무 -->{{
                  t("eduProcessCreation.typeTalentEdu.title24")
                }}
              </th>
              <td scope="row" :colspan="1" class="ta_l">
                <template
                  v-if="
                    data.asisEduCourse && data.asisEduCourse.tobeCoreJobDivCd
                  "
                >
                  <template
                    v-if="
                      data.asisEduCourse.tobeCoreJobDivCd == CD_RESULT_SEL_01
                    "
                  >
                    {{ data.asisEduCourse.eduCourseJobDesc }}
                  </template>
                  <template
                    v-else-if="
                      data.asisEduCourse.tobeCoreJobDivCd == CD_RESULT_SEL_03
                    "
                  >
                    {{ data.asisEduCourse.eduCourseJob }}
                  </template>
                  <template v-else>
                    {{ "" }}
                  </template>
                </template>
              </td>
            </tr>
            <tr>
              <th scope="row" :colspan="1">
                <!-- 한계점 -->{{
                  t("eduProcessCreation.typeTalentEdu.title25")
                }}
              </th>
              <td scope="row" :colspan="1" class="ta_l">
                <TextArea
                  v-if="data.tobeEduCourse"
                  required
                  id="asisLimits"
                  v-model="data.tobeEduCourse.asisLimits"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="box_section mt-13">
      <p class="box_title_sm">
        <!-- TO-BE -->{{ t("eduProcessCreation.typeTalentEdu.title26") }}
      </p>
      <div class="tbl_col tbl">
        <table>
          <colgroup>
            <col style="width: 20%" />
            <col style="width: 20%" />
            <col style="width: 60%" />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row" :colspan="1">
                <!-- 교육과정 목록 -->{{
                  t("eduProcessCreation.typeTalentEdu.title27")
                }}
              </th>
              <th scope="row" class="ta_l" :colspan="1">
                <SelectBoxBase
                  v-if="
                    data.tobeEduCourse && data.tobeEduCourse.tobeCursListDivCd
                  "
                  :id="'selectbox'"
                  :name="'selectbox'"
                  :data="
                    listResult.filter(
                      (item: any) => item.cdId != CD_RESULT_SEL_02
                    )
                  "
                  v-model:model-value="data.tobeEduCourse.tobeCursListDivCd"
                >
                </SelectBoxBase>
              </th>
              <td scope="row" :colspan="1" class="ta_l">
                <template
                  v-if="
                    data.tobeEduCourse && data.tobeEduCourse.tobeCursListDivCd
                  "
                >
                  <template
                    v-if="
                      data.tobeEduCourse.tobeCursListDivCd == CD_RESULT_SEL_01
                    "
                  >
                    <ListCheckBoxBase
                      :listData="listReultMajor"
                      v-model="data.tobeEduCourse.indexEduCourse"
                      id="indexEduCourse"
                      name="indexEduCourse"
                      :useArray="true"
                    />
                  </template>
                  <template
                    v-else-if="
                      data.tobeEduCourse.tobeCursListDivCd == CD_RESULT_SEL_03
                    "
                  >
                    <ListCheckBoxBase
                      :listData="listReultMajor"
                      v-model="data.asisEduCourse.indexEduCourse"
                      id="indexEduCourse"
                      name="indexEduCourse"
                      :is-disable="true"
                      :useArray="true"
                    />
                  </template>
                  <template v-else>
                    {{ "" }}
                  </template>
                </template>
              </td>
            </tr>
            <tr>
              <th scope="row" :colspan="1">
                <!-- 인재양성유형 -->{{
                  t("eduProcessCreation.typeTalentEdu.title28")
                }}
              </th>
              <th scope="row" class="ta_l" :colspan="1">
                <SelectBoxBase
                  v-if="
                    data.tobeEduCourse &&
                    data.tobeEduCourse.tobeTaltNrtgTypeDivCd
                  "
                  :id="'selectbox'"
                  :name="'selectbox'"
                  :data="
                    listResult.filter(
                      (item: any) => item.cdId != CD_RESULT_SEL_02
                    )
                  "
                  v-model:model-value="data.tobeEduCourse.tobeTaltNrtgTypeDivCd"
                >
                </SelectBoxBase>
              </th>
              <td scope="row" :colspan="1" class="ta_l">
                <template
                  v-if="
                    data.tobeEduCourse &&
                    data.tobeEduCourse.tobeTaltNrtgTypeDivCd
                  "
                >
                  <template
                    v-if="
                      data.tobeEduCourse.tobeTaltNrtgTypeDivCd ==
                      CD_RESULT_SEL_01
                    "
                  >
                    <InputBase
                      v-model:model-value="data.tobeEduCourse.eduCourseTypeDesc"
                      id="eduCourseTypeDesc"
                      required
                    />
                  </template>
                  <template
                    v-else-if="
                      data.tobeEduCourse.tobeTaltNrtgTypeDivCd ==
                      CD_RESULT_SEL_03
                    "
                  >
                    {{ data.tobeEduCourse.eduCourseType }}
                  </template>
                  <template v-else>
                    {{ "" }}
                  </template>
                </template>
              </td>
            </tr>
            <tr>
              <th scope="row" :colspan="1">
                <!-- 핵심직무 -->{{
                  t("eduProcessCreation.typeTalentEdu.title29")
                }}
              </th>
              <th scope="row" class="ta_l" :colspan="1">
                <SelectBoxBase
                  v-if="
                    data.tobeEduCourse && data.tobeEduCourse.tobeCoreJobDivCd
                  "
                  :id="'selectbox'"
                  :name="'selectbox'"
                  :data="listResult"
                  v-model:model-value="data.tobeEduCourse.tobeCoreJobDivCd"
                >
                </SelectBoxBase>
              </th>
              <td scope="row" :colspan="1" class="ta_l">
                <template
                  v-if="
                    data.tobeEduCourse && data.tobeEduCourse.tobeCoreJobDivCd
                  "
                >
                  <template
                    v-if="
                      data.tobeEduCourse.tobeCoreJobDivCd == CD_RESULT_SEL_01 ||
                      data.tobeEduCourse.tobeCoreJobDivCd == CD_RESULT_SEL_02
                    "
                  >
                    <InputBase
                      v-model:model-value="data.tobeEduCourse.eduCourseJobDesc"
                      id="eduCourseJobDesc"
                      required
                    />
                  </template>
                  <template
                    v-else-if="
                      data.tobeEduCourse.tobeCoreJobDivCd == CD_RESULT_SEL_03
                    "
                  >
                    {{ data.tobeEduCourse.eduCourseJob }}
                  </template>
                  <template v-else>
                    {{ "" }}
                  </template>
                </template>
              </td>
            </tr>
            <tr>
              <th scope="row" :colspan="1">
                <!-- 변경사유 -->{{
                  t("eduProcessCreation.typeTalentEdu.title30")
                }}
              </th>
              <td scope="row" :colspan="2" class="ta_l">
                <TextArea
                  v-if="data.tobeEduCourse"
                  required
                  id="tobeRsn"
                  v-model="data.tobeEduCourse.tobeRsn"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="btn_group btn_end mg_t25">
      <div class="btn_group btn_end">
        <button type="button" class="btn_round btn_md btn_primary">
          <!-- 3.인재양성유형 설정 및 교육목표 수립 인쇄 -->{{
            t("eduProcessCreation.typeTalentEdu.title31")
          }}
        </button>
        <button
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
</template>

<script lang="ts">
import { commonStore } from "@/stores/common";
import { SCREEN } from "@/router/screen";
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import TextArea from "@/components/common/input/TextArea.vue";
import { getListCodeMng } from "@/stores/common/codeMng/codeMng.service";
import {
  UP_RESULT_MAJOR,
  UP_RESULT_SEL,
  CD_RESULT_SEL_01,
  CD_RESULT_SEL_02,
  CD_RESULT_SEL_03,
  CD_STG041,
} from "@/constants/common.const";
import {
  getResultEduCourse,
  saveResultEduCourse,
} from "@/stores/eduProcessCreation/typeTalentEdu/typeTalentEdu.service";
import {
  ResultEduCourseResDTO,
  ResultEduCourseReqDTO,
} from "@/stores/eduProcessCreation/typeTalentEdu/typeTalentEdu.type";
import {
  EduCourseDescReqDTO,
  EduCourseSelRegistDTO,
  EduCourseSelReqDTO,
  EduCourseSelResDTO,
} from "@/stores/eduProcessCreation/eduCourse/eduProcess.type";
import {
  createEduCourseDesc,
  createEduCourseSel,
} from "@/stores/eduProcessCreation/eduCourse/eduProcess.service";

export default defineComponent({
  components: {
    TextArea,
  },
  setup: () => {
    const router = useRouter();
    const storeCommon = commonStore();
    const { t } = useI18n();
    const id = window.history.state.id;
    const TYPE_JOB = ref<string>("TYPE_JOB");
    const TYPE_TALT = ref<string>("TYPE_TALT");

    return {
      router,
      storeCommon,
      t,
      id,
      CD_RESULT_SEL_01,
      CD_RESULT_SEL_02,
      CD_RESULT_SEL_03,
      TYPE_JOB,
      TYPE_TALT,
    };
  },
  data() {
    return {
      listResult: [] as Array<any>,
      listReultMajor: [] as Array<any>,
      data: {} as ResultEduCourseResDTO,
      isDisabled: true,
    };
  },
  beforeMount() {
    this.goToDetail();
  },
  methods: {
    async goToDetail() {
      this.storeCommon.setLoading(true);
      await getListCodeMng({
        upCdIdList: [UP_RESULT_MAJOR, UP_RESULT_SEL],
      }).then((res: any) => {
        this.listResult = res.data.data.filter(
          (item: any) => item.upCdId == UP_RESULT_SEL
        );
        this.listReultMajor = res.data.data.filter(
          (item: any) => item.upCdId == UP_RESULT_MAJOR
        );
      });
      await getResultEduCourse({ eduCourseSeq: this.id }).then((res: any) => {
        this.data = res.data.data;
        this.data.tobeEduCourse.tobeCursListDivCd = this.data.tobeEduCourse
          .tobeCursListDivCd
          ? this.data.tobeEduCourse.tobeCursListDivCd
          : CD_RESULT_SEL_03;
        this.data.tobeEduCourse.tobeTaltNrtgTypeDivCd = this.data.tobeEduCourse
          .tobeTaltNrtgTypeDivCd
          ? this.data.tobeEduCourse.tobeTaltNrtgTypeDivCd
          : CD_RESULT_SEL_03;
        this.data.tobeEduCourse.tobeCoreJobDivCd = this.data.tobeEduCourse
          .tobeCoreJobDivCd
          ? this.data.tobeEduCourse.tobeCoreJobDivCd
          : CD_RESULT_SEL_03;

        this.data.tobeEduCourse.indexEduCourse = this.convertDataCdToString(
          this.data.tobeEduCourse.indexEduCourse
        );
        this.data.asisEduCourse.indexEduCourseNm = this.convertDataNmToString(
          this.data.asisEduCourse.indexEduCourse
        );
        this.data.asisEduCourse.indexEduCourse = this.convertDataCdToString(
          this.data.asisEduCourse.indexEduCourse
        );

        if (this.data.tobeEduCourse.tobeRsn) {
          this.isDisabled = false;
        }
      });
      this.storeCommon.setLoading(false);
    },
    convertDataCdToString(data: EduCourseSelResDTO[]): string[] {
      return data.map((item) => item.dataCd);
    },
    convertDataNmToString(data: EduCourseSelResDTO[]): string {
      return data.map((item) => item.dataNm).join(", ");
    },
    save() {
      if (this.storeCommon.check) {
        this.$alert(this.t("common.messageValidateRequired"));
        return;
      }

      this.$confirm(this.t("common.message.save"), "", async (isConfirm: Boolean) => {
        if (isConfirm) {
          this.storeCommon.setLoading(true);

          this.storeCommon.setLoading(true);
          let dataDesc = [
            {
              cont: this.data.tobeEduCourse.eduCourseJobDesc,
              dataCd: this.TYPE_JOB,
              dataNm: "",
              eduCourseSeq: this.id,
              proStep: CD_STG041,
              refrSeq: this.id,
            },
            {
              cont: this.data.tobeEduCourse.eduCourseTypeDesc,
              dataCd: this.TYPE_TALT,
              dataNm: "",
              eduCourseSeq: this.id,
              proStep: CD_STG041,
              refrSeq: this.id,
            },
          ] as EduCourseDescReqDTO[];

          let dataSel = [] as EduCourseSelReqDTO[];
          this.data.tobeEduCourse.indexEduCourse.forEach((item: string) => {
            dataSel.push({
              dataCd: item,
              dataNm: "",
              selCd: item,
              refrSeq: this.id,
              etc: "",
              eduCourseSeq: this.id,
            });
          });

          const dataSaveSel = {
            proStep: CD_STG041,
            eduCourseSelReqDTOs: dataSel,
            eduCourseDescSelDTO: {
              eduCourseSeq: this.id,
              refrSeq: this.id,
              upCdId: [],
            },
          } as EduCourseSelRegistDTO;

          this.storeCommon.setLoading(true);
          await createEduCourseDesc(dataDesc);

          await createEduCourseSel(dataSaveSel).finally(() => {
            this.storeCommon.setLoading(false);
          });

          const dataSave = {
            eduCourseSeq: this.id,
            asisLimits: this.data.tobeEduCourse.asisLimits,
            tobeCursListDivCd: this.data.tobeEduCourse.tobeCursListDivCd,
            tobeTaltNrtgTypeDivCd:
              this.data.tobeEduCourse.tobeTaltNrtgTypeDivCd,
            tobeCoreJobDivCd: this.data.tobeEduCourse.tobeCoreJobDivCd,
            tobeRsn: this.data.tobeEduCourse.tobeRsn,
          } as ResultEduCourseReqDTO;

          await saveResultEduCourse(dataSave)
            .then((res: any) => {
              this.$confirm(
                this.t("common.messageSuccessNextTab"),
                "",
                (isConfirm: Boolean) => {
                  if (isConfirm) {
                    this.next();
                  }
                  this.$emit("updateStage", 40);
                  this.isDisabled = false;
                }
              );
            })
            .finally(() => {
              this.storeCommon.setLoading(false);
            });
        }
      });
    },
    next() {
      this.$emit("nextTab", 40);
    },
    back() {
      this.router.push({
        name: SCREEN.eduProcessCreation.name,
      });
    },
  },
});
</script>
<style scoped></style>
