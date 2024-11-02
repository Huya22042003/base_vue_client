<template>
  <div class="box_section mt-5">
    <!-- JOB 1 -->
    <div
      class="box_section mt-13"
      v-for="coreJobSelc in listCoreJobSelc"
      :key="coreJobSelc.coreJobSelcSeq"
    >
      <div class="tbl_col tbl">
        <table>
          <colgroup>
            <col style="width: 15%" />
            <col style="width: auto" />
            <col style="width: auto" />
            <col style="width: auto" />
            <col style="width: auto" />
            <col style="width: auto" />
            <col style="width: 10%" />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row" :colspan="1" class="td_custom_color">
                <!-- 직무명 -->{{ t("eduProcessCreation.jobEduMng.title4") }}
              </th>
              <td scope="row" :colspan="6" class="ta_l">
                {{ coreJobSelc.jobNm }}
              </td>
            </tr>
            <tr>
              <th scope="row" :colspan="1" class="td_custom_color">
                <!-- 직무정의 -->{{ t("eduProcessCreation.jobEduMng.title5") }}
              </th>
              <td scope="row" :colspan="6" class="ta_l">
                {{ coreJobSelc.defn }}
              </td>
            </tr>
            <tr>
              <th
                scope="row" class="td_custom_color"
                :colspan="1"
                :rowspan="coreJobSelc.listNcsSysClassification.length + 1"
              >
                <!-- NCS분류체계기술 -->{{
                  t("eduProcessCreation.jobEduMng.title6")
                }}
              </th>
              <td scope="row" :colspan="1" class="ta_c td_custom_color">
                <!-- NCS/KCS 구분 -->{{
                  t("eduProcessCreation.jobEduMng.title7")
                }}
              </td>
              <td scope="row" :colspan="1" class="ta_c td_custom_color">
                <!-- 대분류 -->{{ t("eduProcessCreation.jobEduMng.title8") }}
              </td>
              <td scope="row" :colspan="1" class="ta_c td_custom_color">
                <!-- 중분류 -->{{ t("eduProcessCreation.jobEduMng.title9") }}
              </td>
              <td scope="row" :colspan="1" class="ta_c td_custom_color">
                <!-- 소분류 -->{{ t("eduProcessCreation.jobEduMng.title10") }}
              </td>
              <td scope="row" :colspan="1" class="ta_c td_custom_color">
                <!-- 세분류 -->{{ t("eduProcessCreation.jobEduMng.title11") }}
              </td>
              <td scope="row" :colspan="1" class="ta_c td_custom_color">
                <!-- 관리 -->{{ t("eduProcessCreation.jobEduMng.title12") }}
              </td>
            </tr>
            <tr
              v-for="(
                classSys, indexSys
              ) in coreJobSelc.listNcsSysClassification.filter(
                (classSys) => classSys.delYn === stateN
              )"
              :key="coreJobSelc.coreJobSelcSeq + indexSys"
            >
              <td scope="row" :colspan="1" class="ta_c">
                <SelectBoxBase
                  :id="'listNcsKcs' + coreJobSelc.coreJobSelcSeq + indexSys"
                  :data="listNcsKcs"
                  v-model="classSys.ncsKcsClassCd"
                  @change="handleChangeJobCapa(classSys, 'ncsKcsClass')"
                  required
                >
                </SelectBoxBase>
              </td>
              <td scope="row" :colspan="1" class="ta_c">
                <SelectBoxBase
                  :id="'listMainClass' + coreJobSelc.coreJobSelcSeq + indexSys"
                  :data="classSys.listMainClass"
                  v-model="classSys.mainClassSeq"
                  @change="handleChangeJobCapa(classSys, 'mainClass')"
                  required
                >
                </SelectBoxBase>
              </td>
              <td scope="row" :colspan="1" class="ta_c">
                <SelectBoxBase
                  :id="'listMidClass' + coreJobSelc.coreJobSelcSeq + indexSys"
                  :data="classSys.listMidClass"
                  v-model="classSys.midClassSeq"
                  @change="handleChangeJobCapa(classSys, 'midClass')"
                  required
                >
                </SelectBoxBase>
              </td>
              <td scope="row" :colspan="1" class="ta_c">
                <SelectBoxBase
                  :id="'listSubClass' + coreJobSelc.coreJobSelcSeq + indexSys"
                  :data="classSys.listSubClass"
                  v-model="classSys.subClassSeq"
                  @change="handleChangeJobCapa(classSys, 'subClass')"
                  required
                >
                </SelectBoxBase>
              </td>
              <td scope="row" :colspan="1" class="ta_c">
                <SelectBoxBase
                  :id="
                    'listDetailClass' + coreJobSelc.coreJobSelcSeq + indexSys
                  "
                  :data="classSys.listDetailClass"
                  v-model="classSys.detailClassSeq"
                  required
                >
                </SelectBoxBase>
              </td>
              <td scope="row" :colspan="1" class="ta_c">
                <button
                  type="button"
                  class="btn_round btn_sm btn_primary"
                  v-if="indexSys === 0"
                  @click="addNcsKcsClassSystem(coreJobSelc)"
                >
                  {{ t("common.add") }}
                </button>
                <button
                  type="button"
                  class="btn_round btn_sm btn_gray"
                  v-if="indexSys > 0"
                  @click="deleteNcsKcsClassSystem(coreJobSelc, indexSys)"
                >
                  {{ t("common.deleteItem") }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="btn_group btn_end mg_t25">
      <!-- <button
        v-if="version && isSave"
        type="button"
        class="btn_round btn_lg btn_primary"
        @click="confirmSave()"
      >
        {{ t("common.save") }}
      </button> -->
      <ButtonBase
        v-if="version && isSave"
        type="button"
        class="btn_round btn_lg btn_primary"
        :buttonName="t('common.save')"
        @click="confirmSave()"
      ></ButtonBase>
      <button
        type="button"
        class="btn_round btn_lg btn_primary"
        :disabled="isDisabled"
        @click="next()"
      >
        {{ t("common.next") }}
      </button>
      <button type="button" class="btn_round btn_lg btn_white" @click="back()">
        {{ t("common.list") }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { commonStore } from "../../../stores/common";
import { SCREEN } from "../../../router/screen";
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { CodeMngModel } from "../../../stores/common/codeMng/codeMng.type";
import { getCodeMngByUpCdId } from "../../../stores/common/codeMng/codeMng.service";
import {
  STATUS_NO,
  STATUS_YES,
  UP_CD_NCS_KCS,
  VERSION_V1,
} from "../../../constants/common.const";
import {
  getJobEduCoreJobSelcList,
  getListJobCapa,
  saveClassSystemList,
} from "../../../stores/eduProcessCreation/jobEduMng/jobEduMng.service";
import {
  JobEduCoreJobSelcListModel,
  JobEduJobCapaReqModel,
  JobEduNcsSysClassificationModel,
} from "../../../stores/eduProcessCreation/jobEduMng/jobEduMng.type";

export default defineComponent({
  setup: () => {
    const router = useRouter();
    const storeCommon = commonStore();
    const { t } = useI18n();
    const id = window.history.state.id;
    const version = window.history.state.version == VERSION_V1;
    const isSave = window.history.state.isSave;

    return { router, storeCommon, t, id, version, isSave };
  },
  beforeMount() {
    this.getCodeNcsKcs();

    this.getListCoreJobSelc();
  },
  data() {
    return {
      listNcsKcs: [
        { cdId: "", cdNm: this.t("common.select") },
      ] as Array<CodeMngModel>,
      listCoreJobSelc: [] as Array<JobEduCoreJobSelcListModel>,
      jobEduJobCapaReqModel: {} as JobEduJobCapaReqModel,
      stateN: STATUS_NO,
      stateY: STATUS_YES,
      resetObj: { cdId: "", cdNm: this.t("common.select"), upCdId: "" },
      isDisabled: true,
    };
  },
  methods: {
    getListCoreJobSelc() {
      this.storeCommon.setLoading(true);
      getJobEduCoreJobSelcList({ eduCourseSeq: this.id }).then((res) => {
        this.listCoreJobSelc = res.data.data;
        if (this.listCoreJobSelc.length > 0) {
          this.isDisabled =
            !this.listCoreJobSelc[0].listNcsSysClassification[0]
              .classSystemListSeq;
        }
        this.storeCommon.setLoading(false);
      });
    },
    getCodeNcsKcs() {
      getCodeMngByUpCdId({ upCdId: UP_CD_NCS_KCS }).then((response: any) => {
        response.data.data.forEach((item: any) => {
          this.listNcsKcs.push(item);
        });
      });
    },
    handleChangeJobCapa(item: JobEduNcsSysClassificationModel, type: string) {
      const typeToCodeMap: Record<
        string,
        keyof JobEduNcsSysClassificationModel
      > = {
        ncsKcsClass: "ncsKcsClassCd",
        mainClass: "mainClassSeq",
        midClass: "midClassSeq",
        subClass: "subClassSeq",
      };

      const codeKey = typeToCodeMap[type];
      if (codeKey) {
        this.jobEduJobCapaReqModel.code = item[codeKey];
      }

      if (!this.jobEduJobCapaReqModel.code) {
        return;
      }

      this.jobEduJobCapaReqModel.type = type;

      // Reset logic
      const resetFieldsMap: Record<
        string,
        (keyof JobEduNcsSysClassificationModel)[]
      > = {
        ncsKcsClass: [
          "mainClassSeq",
          "midClassSeq",
          "subClassSeq",
          "detailClassSeq",
        ],
        mainClass: ["midClassSeq", "subClassSeq", "detailClassSeq"],
        midClass: ["subClassSeq", "detailClassSeq"],
        subClass: ["detailClassSeq"],
      };

      const resetListsMap: Record<
        string,
        (keyof JobEduNcsSysClassificationModel)[]
      > = {
        ncsKcsClass: [
          "listMainClass",
          "listMidClass",
          "listSubClass",
          "listDetailClass",
        ],
        mainClass: ["listMidClass", "listSubClass", "listDetailClass"],
        midClass: ["listSubClass", "listDetailClass"],
        subClass: ["listDetailClass"],
      };

      resetFieldsMap[type]?.forEach((field) => {
        item[field] = "";
      });
      resetListsMap[type]?.forEach((listField) => {
        item[listField] = [this.resetObj];
      });

      this.storeCommon.setLoading(true);

      getListJobCapa(this.jobEduJobCapaReqModel).then((res) => {
        const typeToListMap: Record<
          string,
          keyof JobEduNcsSysClassificationModel
        > = {
          ncsKcsClassCd: "listMainClass",
          mainClassSeq: "listMidClass",
          midClassSeq: "listSubClass",
          subClassSeq: "listDetailClass",
        };

        const listKey = typeToListMap[codeKey as string];
        if (listKey) {
          item[listKey] = res.data.data;
          res.data.data.unshift(this.resetObj);
        }

        this.storeCommon.setLoading(false);
      });
    },
    addNcsKcsClassSystem(item: JobEduCoreJobSelcListModel) {
      let newObj = ref<JobEduNcsSysClassificationModel>({
        classSystemListSeq: "",
        jobCapaStndSeq: "",
        ncsKcsClassCd: "",
        ncsKcsClassNm: "",
        mainClassSeq: "",
        mainClassNm: "",
        midClassSeq: "",
        midClassNm: "",
        subClassSeq: "",
        subClassNm: "",
        detailClassSeq: "",
        detailClassNm: "",
        delYn: this.stateN,
        listMainClass: [this.resetObj],
        listMidClass: [this.resetObj],
        listSubClass: [this.resetObj],
        listDetailClass: [this.resetObj],
      });
      item.listNcsSysClassification.push(newObj.value);
    },
    deleteNcsKcsClassSystem(
      item: JobEduCoreJobSelcListModel,
      indexSys: number
    ) {
      if (indexSys >= 0 && indexSys < item.listNcsSysClassification.length) {
        const classSystem = item.listNcsSysClassification[indexSys];

        if (!classSystem.classSystemListSeq) {
          item.listNcsSysClassification.splice(indexSys, 1);
        } else {
          classSystem.delYn = this.stateY;
        }
      }
    },
    confirmSave() {
      if (this.storeCommon.check) {
        this.$alert(this.t("common.messageValidateRequired"));
        return;
      }
      if (!this.validateDuplicateDetailClassSeq()) {
        this.$alert(
          this.t("eduProcessCreation.jobEduMng.messageValidateDuplicate")
        );
        return;
      }
      this.$confirm(
        this.t("eduProcessCreation.jobEduMng.messageConfirmSave"),
        "",
        (isConfirm: Boolean) => {
          if (isConfirm) {
            this.saveData();
          }
        }
      );
    },
    saveData() {
      this.storeCommon.setLoading(true);
      saveClassSystemList(this.listCoreJobSelc).then((res) => {
        this.storeCommon.setLoading(false);
        this.$confirm(
          this.t("common.messageSuccessNextTab"),
          "",
          (isConfirm: Boolean) => {
            if (isConfirm) {
              this.next();
            }
            this.$emit("updateStage", 42);
            this.isDisabled = false;
          }
        );
      });
    },
    validateDuplicateDetailClassSeq(): boolean {
      let isValid = true;

      this.listCoreJobSelc.forEach((jobSelc) => {
        const seenDetailClassSeqs = new Set<string>();

        jobSelc.listNcsSysClassification.forEach((classSys) => {
          if (seenDetailClassSeqs.has(classSys.detailClassSeq)) {
            isValid = false;
          } else {
            seenDetailClassSeqs.add(classSys.detailClassSeq);
          }
        });
      });

      return isValid;
    },
    next() {
      this.$emit("tabChange4", 42);
    },
    back() {
      this.router.push({
        path: SCREEN.eduProcessCreation.path,
      });
    },
  },
});
</script>
<style scoped>
@import url("../eduCourseCustom.css");
</style>
