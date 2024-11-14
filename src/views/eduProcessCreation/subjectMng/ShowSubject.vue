<template>
  <div class="box_section mt-5">
    <div class="box_section mt-13">
      <div class="dp_flex jc_end al_center box_title_sm">
        <CheckboxBase
          :mode="'show'"
          :id="'isCheckCreate'"
          :name="'isCheckCreate'"
          :key="'isCheckCreate'"
          :label="
            t('eduProcessCreation.subjectMng.title85') /* '신설 교과목 없음' */
          "
          v-model:model-value="isCheckCreate"
        >
        </CheckboxBase>
          <!-- 교과목 추가 -->
        <ButtonBase
          type="button"
          @click="addNewSubject()"
          v-if="!isCheckCreate && isSave"
          :buttonName="t('eduProcessCreation.subjectMng.title86')"
          class="btn_round btn_lg btn_primary"
        />
      </div>
      <div v-if="!isCheckCreate" class="tbl tbl_col">
        <table>
          <colgroup>
            <col style="width: 20%" />
            <col style="width: 10%" />
            <col style="width: auto" />
            <col style="width: auto" />
            <col style="width: auto" />
            <col style="width: auto" />
            <col style="width: auto" />
            <col style="width: auto" />
            <col style="width: 20%" />
            <col style="width: 10%" />
          </colgroup>
          <thead>
            <tr>
              <th scope="row" class="ta_c" :colspan="1">
                <!-- 교과목명 -->{{
                  t("eduProcessCreation.subjectMng.title87")
                }}
              </th>
              <th scope="row" class="ta_c" :colspan="1">
                <!-- 이수구분 -->{{
                  t("eduProcessCreation.subjectMng.title88")
                }}
              </th>
              <th scope="row" class="ta_c" :colspan="1">
                <!-- 학점 -->학점
              </th>
              <th scope="row" class="ta_c" :colspan="1">
                <!-- 시수 -->{{ t("eduProcessCreation.subjectMng.title89") }}
              </th>
              <th scope="row" class="ta_c" :colspan="1">
                <!-- 이론 -->{{ t("eduProcessCreation.subjectMng.title90") }}
              </th>
              <th scope="row" class="ta_c" :colspan="1">
                <!-- 실습 -->{{ t("eduProcessCreation.subjectMng.title91") }}
              </th>
              <th scope="row" class="ta_c" :colspan="1">
                <!-- 학년 -->{{ t("eduProcessCreation.subjectMng.title92") }}
              </th>
              <th scope="row" class="ta_c" :colspan="1">
                <!-- 학기 -->{{ t("eduProcessCreation.subjectMng.title93") }}
              </th>
              <th scope="row" class="ta_c" :colspan="1">
                <!-- 신설내용 -->{{
                  t("eduProcessCreation.subjectMng.title94")
                }}
              </th>
              <th scope="row" class="ta_c" :colspan="1">
                <!-- 관리 -->{{ t("eduProcessCreation.subjectMng.title95") }}
              </th>
            </tr>
          </thead>
          <tbody>
            <!-- NCS -->
            <tr v-for="(item, index) in data">
              <td scope="row" :colspan="1">
                <InputBase
                  :id="`sbjtNm_${index}`"
                  required
                  v-model:model-value="item.sbjtNm"
                />
              </td>
              <td scope="row" :colspan="1">
                <SelectBoxBase
                  :id="`currDivCd_${index}`"
                  :name="`currDivCd_${index}`"
                  required
                  :data="listSubjectType"
                  v-model="item.currDivCd"
                >
                </SelectBoxBase>
              </td>
              <td scope="row" :colspan="1">
                <InputBase
                  :id="`gpa_${index}`"
                  required
                  v-model:model-value="item.gpa"
                  :isNumber="true"
                  :decimalPlaces="0"
                />
              </td>
              <td scope="row" :colspan="1">
                <InputBase
                  :id="`hrs_${index}`"
                  required
                  v-model:model-value="item.hrs"
                  :isNumber="true"
                  :decimalPlaces="0"
                />
              </td>
              <td scope="row" :colspan="1">
                <InputBase
                  :id="`thry_${index}`"
                  required
                  v-model:model-value="item.thry"
                  :isNumber="true"
                  :decimalPlaces="0"
                />
              </td>
              <td scope="row" :colspan="1">
                <InputBase
                  :id="`prac_${index}`"
                  required
                  v-model:model-value="item.prac"
                  :isNumber="true"
                  :decimalPlaces="0"
                />
              </td>
              <td scope="row" :colspan="1">
                <InputBase
                  :id="`estbGradeCd_${index}`"
                  required
                  v-model:model-value="item.estbGradeCd"
                  :isNumber="true"
                  :decimalPlaces="0"
                />
              </td>
              <td scope="row" :colspan="1">
                <InputBase
                  :id="`estbTermCd_${index}`"
                  required
                  v-model:model-value="item.estbTermCd"
                  :isNumber="true"
                  :decimalPlaces="0"
                />
              </td>
              <td scope="row" :colspan="1">
                <InputBase
                  :id="`newCont_${index}`"
                  required
                  v-model:model-value="item.newCont"
                />
              </td>
              <td scope="row" :colspan="1">
                <button
                  type="button"
                  @click="deleteSubject(index)"
                  class="btn_round btn_sm btn_white"
                >
                  {{ t("common.deleteItem") }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="btn_group btn_end mg_t30">
      <div class="btn_group btn_end">
        <ButtonBase
          v-if="isSave"
          type="button"
          @click="save"
          :buttonName="t('common.save')"
          class="btn_round btn_lg btn_primary"
        />
        <button
          type="button"
          class="btn_round btn_lg btn_primary"
          :disabled="isDisabled"
          @click="next()"
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
import { commonStore } from "@/stores/common";
import { SCREEN } from "@/router/screen";
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { getNewSubject, saveNewSubject } from "@/stores/eduProcessCreation/subjectMng/subjectMng.service";
import {
  NewSubjectDTO,
  NewSubjectReqDTO,
} from "@/stores/eduProcessCreation/subjectMng/subjectMng.type";
import { getListCodeMng } from "@/stores/common/codeMng/codeMng.service";
import { STATUS_NO, STATUS_YES, SUBJECT_TYPE_CD } from "@/constants/common.const";

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
      listSubjectType: [] as Array<any>,
      isCheckCreate: false,
      data: [] as NewSubjectDTO[],
      isDisabled: true
    };
  },
  async beforeMount() {
    this.storeCommon.setLoading(true)
    await getListCodeMng({
      upCdIdList: [SUBJECT_TYPE_CD],
    }).then((res: any) => {
      this.listSubjectType = res.data.data.filter(
        (item: any) => item.upCdId == SUBJECT_TYPE_CD
      );
      this.listSubjectType.unshift({
        id: 0,
        cdId: "",
        cdNm: this.t("common.select"),
      });
    });
    this.getDataDetail();
  },
  methods: {
    getDataDetail() {
      this.storeCommon.setLoading(true);
      const dataSearch = {
        eduCourseSeq: this.id,
      };
      getNewSubject(dataSearch)
        .then((res: any) => {
          const response = res.data.data;
          this.data = response.listData;

          this.isCheckCreate = response.isData == STATUS_YES
          if (this.isCheckCreate || this.data && this.data.length != 0) {
            this.isDisabled = false;
          }
          
        })
        .finally(() => {
          this.storeCommon.setLoading(false);
        });
    },
    addNewSubject() {
      this.data.push({
        sbjtSeq: "",
        sbjtNm: "",
        currDivCd: "",
        currDivNm: "",
        gpa: 0,
        hrs: 0,
        thry: 0,
        prac: 0,
        estbGradeCd: 0,
        estGradeNm: "",
        estbTermCd: 0,
        estbTermNm: "",
        newCont: "",
        eduCursSeq: this.id,
      });
    },
    deleteSubject(indexSel: number) {
      this.data = this.data.filter(
        (item: any, index: number) => index != indexSel
      );
    },
    checkValidate() {
      if (this.data.some(item => item.estbGradeCd == 0) || this.data.some(item => item.estbTermCd == 0)) {
        return false;
      }
      return true;
    },
    save() {
      if (this.storeCommon.check) {
        this.$alert(this.t("common.messageValidateRequired"));
        return;
      }
      
      if (!this.checkValidate()) {
        this.$alert('학년/학기는 0보다 큰 숫자를 입력해주세요.');
        return;
      }

      this.$confirm(this.t("common.message.save"), "", (isConfirm: Boolean) => {
        if (isConfirm) {
          this.storeCommon.setLoading(true);
          const dataSave = {
            eduCourseSeq: this.id,
            isData: this.isCheckCreate ? STATUS_YES : STATUS_NO,
            listData: this.isCheckCreate ? [] : this.data
          } as NewSubjectReqDTO;
          saveNewSubject(dataSave).then((res:any) => {
            this.$confirm(
                this.t("common.messageSuccessNextTab"),
                "",
                (isConfirm: Boolean) => {
                  if (isConfirm) {
                    this.next();
                  }
                  if (this.isDisabled) {
                    this.$emit("updateStage", 52);
                  }
                  this.isDisabled = false;
                }
              );
          }).finally(() => {
            this.storeCommon.setLoading(false);
          })
        }
      });
    },
    next() {
      this.$emit("tabChange5", 52);
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
