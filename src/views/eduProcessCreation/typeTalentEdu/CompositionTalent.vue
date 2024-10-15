<template>
  <div class="box_section mt-5">
    <!-- Table 1 -->
    <div class="box_section mt-13">
      <div class="dp_flex between al_center box_title_sm">
        <!-- 내부 -->{{ t("eduProcessCreation.typeTalentEdu.title6") }}
        <button
          class="button btn_primary btn_lg"
          @click="modalOpen = !modalOpen"
        >
          {{ t("common.add") }}
        </button>
      </div>
      <div class="tbl tbl_col">
        <table>
          <colgroup>
            <col style="width: 18%" />
            <col style="width: 18%" />
            <col style="width: 18%" />
            <col style="width: 18%" />
            <col style="width: 18%" />
            <col style="width: 10%" />
          </colgroup>
          <thead>
            <tr>
              <th scope="row" class="ta_c" :colspan="1">
                <!-- 성명 -->{{ t("eduProcessCreation.typeTalentEdu.title7") }}
              </th>
              <th scope="row" class="ta_c" :colspan="1">
                <!-- 전공분야 -->{{
                  t("eduProcessCreation.typeTalentEdu.title8")
                }}
              </th>
              <th scope="row" class="ta_c" :colspan="1">
                <!-- 소속 -->{{ t("eduProcessCreation.typeTalentEdu.title9") }}
              </th>
              <th scope="row" class="ta_c" :colspan="1">
                <!-- 직위 -->{{ t("eduProcessCreation.typeTalentEdu.title10") }}
              </th>
              <th scope="row" class="ta_c" :colspan="1">
                <!-- 비고 -->{{ t("eduProcessCreation.typeTalentEdu.title11") }}
              </th>
              <th scope="row" class="ta_c" :colspan="1">
                <!-- 삭제 -->{{ t("eduProcessCreation.typeTalentEdu.title12") }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="dataInternal.length == 0">
              <td colspan="6" class="ta_c">
                <!-- ※ 추가 버튼을 이용해서 내부 교육과정운영위워을 선택해주세요. -->{{
                  t("eduProcessCreation.typeTalentEdu.title13")
                }}
              </td>
            </tr>
            <template v-else>
              <tr v-for="(item, index) in dataInternal">
                <td scope="row" :colspan="1">{{ item.nm }}</td>
                <td scope="row" :colspan="1">{{ item.major }}</td>
                <td scope="row" :colspan="1">{{ item.affli }}</td>
                <td scope="row" :colspan="1">{{ item.posi }}</td>
                <td scope="row" :colspan="1">
                  <InputBase
                    v-model="item.remark"
                    required
                    :id="`remark_internal_${index}`"
                  />
                </td>
                <td scope="row" class="ta_c" :colspan="1">
                  <button @click="deleteDataInternal(index)" type="button" class="btn_round btn_sm btn_white">
                    {{ t("common.deleteItem") }}
                  </button>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Table 2 -->
    <div class="box_section mt-13">
      <div class="dp_flex between al_center box_title_sm">
        <!-- 내부 -->{{ t("eduProcessCreation.typeTalentEdu.title6") }}
        <button
          type="button"
          class="btn_lg btn_blue pointer-events-none"
          @click="addDataOutside()"
        >
          {{ t("common.add") }}
        </button>
      </div>
      <div class="tbl tbl_col">
        <table>
          <colgroup>
            <col style="width: 18%" />
            <col style="width: 18%" />
            <col style="width: 18%" />
            <col style="width: 18%" />
            <col style="width: 18%" />
            <col style="width: 10%" />
          </colgroup>
          <thead>
            <tr>
              <th scope="row" class="ta_c" :colspan="1">
                <!-- 성명 -->{{ t("eduProcessCreation.typeTalentEdu.title7") }}
              </th>
              <th scope="row" class="ta_c" :colspan="1">
                <!-- 전공분야 -->{{
                  t("eduProcessCreation.typeTalentEdu.title8")
                }}
              </th>
              <th scope="row" class="ta_c" :colspan="1">
                <!-- 소속 -->{{ t("eduProcessCreation.typeTalentEdu.title9") }}
              </th>
              <th scope="row" class="ta_c" :colspan="1">
                <!-- 직위 -->{{ t("eduProcessCreation.typeTalentEdu.title10") }}
              </th>
              <th scope="row" class="ta_c" :colspan="1">
                <!-- 비고 -->{{ t("eduProcessCreation.typeTalentEdu.title11") }}
              </th>
              <th scope="row" class="ta_c" :colspan="1">
                <!-- 삭제 -->{{ t("eduProcessCreation.typeTalentEdu.title12") }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="dataOutside.length == 0">
              <td colspan="6" class="ta_c">
                <!-- ※ 추가 버튼을 이용해서 내부 교육과정운영위워을 선택해주세요. -->{{
                  t("eduProcessCreation.typeTalentEdu.title13")
                }}
              </td>
            </tr>
            <template v-else>
              <tr v-for="(item, index) in dataOutside">
                <td scope="row" :colspan="1">
                  <InputBase v-model="item.nm" required :id="`nm_${index}`" />
                </td>
                <td scope="row" :colspan="1">
                  <InputBase
                    v-model="item.major"
                    required
                    :id="`maj_${index}`"
                  />
                </td>
                <td scope="row" :colspan="1">
                  <InputBase
                    v-model="item.affli"
                    required
                    :id="`aff_${index}`"
                  />
                </td>
                <td scope="row" :colspan="1">
                  <InputBase
                    v-model="item.posi"
                    required
                    :id="`posi_${index}`"
                  />
                </td>
                <td scope="row" :colspan="1">
                  <InputBase
                    v-model="item.remark"
                    required
                    :id="`remark_outside_${index}`"
                  />
                </td>
                <td scope="row" class="ta_c" :colspan="1">
                  <button
                    @click="deleteDataOutside(index)"
                    type="button"
                    class="btn_round btn_sm btn_white"
                  >
                    {{ t("common.deleteItem") }}
                  </button>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>

    <div class="btn_group btn_end mg_t20">
      <div class="btn_group btn_end">
        <button type="button" class="btn_round btn_md btn_primary"
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
  <CompositionSelectModal
    v-if="modalOpen"
    @dataSelect="dataSelected"
    :isOpen="modalOpen"
    @idDetail="id"
    :lstIdSelect="[]"
    :onClose="closeModal"
  />
</template>

<script lang="ts">
import { commonStore } from "@/stores/common";
import { SCREEN } from "@/router/screen";
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import CompositionSelectModal from "./CompositionSelectModal.vue";
import { EduCourseCommResDTO } from "@/stores/eduProcessCreation/typeTalentEdu/typeTalentEdu.type";
import { CD_OUTSIDE, CD_INTERNAL } from "@/constants/common.const";
import { getAllEduCourseComm } from "@/stores/eduProcessCreation/typeTalentEdu/typeTalentEdu.service";
import { saveEduCourseComm } from "@/stores/eduProcessCreation/typeTalentEdu/typeTalentEdu.service";
import { EduCourseCommReqDTO } from "@/stores/eduProcessCreation/typeTalentEdu/typeTalentEdu.type";

export default defineComponent({
  components: {
    CompositionSelectModal,
  },
  setup: () => {
    const router = useRouter();
    const storeCommon = commonStore();
    const { t } = useI18n();
    const id = window.history.state.id;

    return { router, storeCommon, t, id };
  },
  beforeMount() {
    this.detailEduCourseComm();
  },
  data() {
    return {
      dataInternal: [] as EduCourseCommResDTO[],
      dataOutside: [] as EduCourseCommResDTO[],
      modalOpen: false,
      isDisabled: true,
    };
  },
  methods: {
    detailEduCourseComm() {
      this.storeCommon.setLoading(true);
      getAllEduCourseComm({ eduCourseSeq: this.id })
        .then((res: any) => {
          const response = res.data.data as EduCourseCommResDTO[];

          if (response.length != 0) {
            this.isDisabled = false;
          }

          this.dataInternal = response.filter(
            (item: EduCourseCommResDTO) => item.divCd == CD_INTERNAL
          );
          this.dataOutside = response.filter(
            (item: EduCourseCommResDTO) => item.divCd == CD_OUTSIDE
          );
        })
        .finally(() => {
          this.storeCommon.setLoading(false);
        });
    },
    addDataOutside() {
      this.dataOutside.push({
        commSeq: "",
        divCd: CD_OUTSIDE,
        id: "",
        nm: "",
        affli: "",
        major: "",
        eduCourseSeq: "",
        posi: "",
        remark: "",
      });
    },
    deleteDataOutside(indexSelect: number) {
      this.$confirm("삭제하시겠어요?", "", (isConfirm: Boolean) => {
        if (isConfirm) {
          this.dataOutside = this.dataOutside.filter(
            (item: EduCourseCommResDTO, index: number) => index != indexSelect
          );
          this.$alert("삭제됐습니다.");
        }
      });
    },
    addDataInternal(data: EduCourseCommResDTO) {
      this.dataInternal.push(data);
    },
    deleteDataInternal(indexSelect: number) {
      this.$confirm("삭제하시겠어요?", "", (isConfirm: Boolean) => {
        if (isConfirm) {
          this.dataInternal = this.dataInternal.filter(
            (item: EduCourseCommResDTO, index: number) => index != indexSelect
          );
          this.$alert("삭제됐습니다.");
        }
      });
    },
    next() {
      this.$emit("tabChange3", 32);
    },
    back() {
      this.router.push({
        name: SCREEN.eduProcessCreation.name,
      });
    },
    save() {
      if (this.storeCommon.check) {
        this.$alert(this.t("common.messageValidateRequired"));
        return;
      }

      if (this.dataInternal.length == 0 || this.dataOutside.length == 0) {
        this.$alert(
          "내부, 외부 교육과정개발위원은 최소 한 명이상 등록해주세요."
        );
        return;
      }

      this.$confirm(this.t("common.message.save"), "", (isConfirm: Boolean) => {
        if (isConfirm) {
          this.storeCommon.setLoading(true);

          const dataSave = [] as EduCourseCommReqDTO[];

          this.dataInternal.forEach((el:EduCourseCommResDTO) => {
            dataSave.push({
              commSeq: el.commSeq,
              divCd: CD_INTERNAL,
              id: el.id,
              nm: el.nm,
              affli: el.affli,
              major: el.major,
              eduCourseSeq: this.id,
              posi: el.posi,
              remark: el.remark,
            });
          });

          this.dataOutside.forEach((el:EduCourseCommResDTO) => {
            dataSave.push({
              commSeq: el.commSeq,
              divCd: CD_OUTSIDE,
              id: el.id,
              nm: el.nm,
              affli: el.affli,
              major: el.major,
              eduCourseSeq: this.id,
              posi: el.posi,
              remark: el.remark,
            });
          });

          saveEduCourseComm(dataSave).then((res:any) => {
            this.storeCommon.setLoading(false);
            this.$confirm(
              this.t("common.messageSuccessNextTab"),
              "",
              (isConfirm: Boolean) => {
                if (isConfirm) {
                  this.next();
                } else {
                  if (this.isDisabled) {
                    this.$emit("updateStage", 32);
                  }
                }
                this.isDisabled = false;
              }
            );
          });
        }
      });
    },
    closeModal() {
      this.modalOpen = false;
    },
    dataSelected(data: EduCourseCommResDTO) {
      this.addDataInternal(data);
    },
  },
});
</script>
<style scoped>
.text_blue {
  color: #0029ff;
}
.between {
  justify-content: space-between;
}
</style>
