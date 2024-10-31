<template lang="html">
  <TModal
    :is-open="modalOpen"
    :is-show-header="true"
    :is-show-footer="true"
    :modal-id="modalId"
    :size="'md'"
    @close-modal="closeModal"
  >
    <template #title>
      <strong>
        {{ t("eduProcessCreation.modal.title") }}
      </strong>
    </template>
    <template #default>
      <div class="tbl_col">
        <table class="">
          <caption></caption>
          <colgroup>
            <col style="width: 30%" />
            <col style="width: 70%" />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row" class="required">
                {{ t("eduProcessCreation.table.deptNm") }}
              </th>
              <td>
                <SelectBoxBase
                  v-model="eduCourseRequest.deptCd"
                  required
                  class="wd_p60"
                  :id="'selectbox2'"
                  :name="'selectbox2'"
                  :data="listDept"
                  @change="loadDataTypeTalent"
                >
                </SelectBoxBase>
              </td>
            </tr>
            <tr>
              <th scope="row" class="required">
                {{ t("eduProcessCreation.table.year") }}
              </th>
              <td>
                <SelectBoxBase
                  v-model="eduCourseRequest.year"
                  required
                  class="wd_p60"
                  :id="'selectbox3'"
                  :name="'selectbox3'"
                  :data="listYear"
                >
                </SelectBoxBase>
              </td>
            </tr>
            <tr>
              <th scope="row" class="required">
                {{ t("eduProcessCreation.modal.title1") }}
              </th>
              <td>
                <SelectBoxBase
                  v-model="eduCourseRequest.eduCourseTypeSeq"
                  required
                  class="wd_p60"
                  :id="'selectbox1'"
                  :name="'selectbox1'"
                  :data="listEduTypeData"
                >
                </SelectBoxBase>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
    <template #footer>
      <!-- Footer content goes here -->
      <button
        type="button"
        class="button btn_xl btn_white popup_close"
        @click="closeModal()"
      >
        {{ t("common.cancel") }}
      </button>
      <ButtonBase
        type="button"
        @click="onCreate"
        :buttonName="t('common.save')"
        class="button btn_xl btn_primary"
      />
    </template>
  </TModal>
</template>

<script lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import type {
  EduCourseReqModel,
} from "../../../stores/eduProcessCreation/eduCourse/eduProcess.type";
import { EduCourseStore } from "../../../stores/eduProcessCreation";
import { SUCCSESS_STATUS } from "@/constants/screen.const";
import { commonStore } from "@/stores/common";
import { SCREEN } from "../../../router/screen";
import { useRouter } from "vue-router";
import { departmentStore } from "@/stores/common/department";
import type {
  DepartmentDTO,
  DepartmentFilterDTO,
} from "@/stores/common/department/department.type";
import { codeMngStore } from "@/stores/common/codeMng";
import { CODE_MAJOR } from "@/constants/screen.const";
import {
  getFormAdd,
  createEduCourse,
} from "@/stores/eduProcessCreation/eduCourse/eduProcess.service";
import { MODE_EDIT } from "@/constants/screen.const";
import { START_YEAR_NUMBER } from "@/constants/screen.const";
import { getUserInfo } from "@/utils/storage";
import { BAD_REQUEST_EDU_COURSE, BAD_REQUEST_NO_REGISTER_WRITE_SCHDL, DEPT_TYPE_SPECIAL, EDU_TYPE_OTHER, VERSION_V1 } from "@/constants/common.const";
import ButtonBase from "@/components/common/button/ButtonBase.vue";

export default {
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    ButtonBase
  },
  setup() {
    const { t } = useI18n();
    const router = useRouter();
    const storeCommon = commonStore();
    const eduCourseStore = EduCourseStore();
    const storeDepartment = departmentStore();
    const codeStore = codeMngStore();
    const modalId = "example-modal";
    const mode = "";
    const eduCourseRequest = ref<EduCourseReqModel>({
      deptCd: "",
      year: "",
      eduCourseTypeSeq: "",
    });
    const response = ref<string>();
    const modalOpen = false;
    const departmentFilterDTO = {} as DepartmentFilterDTO;

    const userInfo = JSON.parse(getUserInfo());

    return {
      t,
      eduCourseStore,
      modalId,
      mode,
      eduCourseRequest,
      response,
      modalOpen,
      storeCommon,
      router,
      storeDepartment,
      departmentFilterDTO,
      codeStore,
      userInfo,
    };
  },
  data() {
    return {
      listEduType: [{ id: 0, cdId: "", cdNm: this.t("common.select") }] as any,
      listDept: [{ id: 0, cdId: "", cdNm: this.t("common.select") }] as any,
      listYear: [] as any,
      listEduTypeData: [{ id: 0, cdId: "", cdNm: this.t("common.select") }] as any,
    };
  },
  beforeMount() {
    this.openModal();
    Promise.all([this.getDepartment()]).catch((e) => alert(e.message));
  },
  methods: {
    openModal() {
      this.modalOpen = true;
    },
    closeModal() {
      this.$emit("close-modal");
    },
    loadDataTypeTalent() {
      this.listEduTypeData = this.getListType(this.listEduType);
    },
    async getDepartment() {
      this.storeCommon.setLoading(true);
      const currentYear = new Date().getFullYear();
      this.listYear = [];
      for (let index = START_YEAR_NUMBER; index <= currentYear + 1; index++) {
        this.listYear.push({ id: index, cdId: index, cdNm: index });
      }
      this.eduCourseRequest.year = currentYear + 1 + "";
      this.departmentFilterDTO.deptDivCd = [CODE_MAJOR];
      this.departmentFilterDTO.deptCd = this.userInfo.userDepts.split(",");
      await this.storeDepartment.getDepartment(this.departmentFilterDTO);
      if (
        this.storeDepartment &&
        this.storeDepartment.status == SUCCSESS_STATUS
      ) {
        this.storeDepartment.deptRes?.forEach(
          (element: DepartmentDTO, index: number) => {
            this.listDept.push({
              id: index + 1,
              cdId: element.deptCd,
              cdNm: element.deptNm,
            });
          }
        );
      }
      getFormAdd().then((res: any) => {
        res.data.data.forEach((item: any, index: number) => {
          this.listEduType.push({
            id: index,
            cdId: item.eduCursTypeSeq,
            cdNm: item.typeNm,
          });
        });
        this.loadDataTypeTalent();
      });
      this.storeCommon.setLoading(false);
    },
    getListType(listType:any) {
      if (this.eduCourseRequest && this.eduCourseRequest.deptCd) {
        if (this.eduCourseRequest.deptCd == DEPT_TYPE_SPECIAL) {
          this.eduCourseRequest.eduCourseTypeSeq = listType.filter((item:any) => item.cdNm == EDU_TYPE_OTHER)[0].cdId
          return listType.filter((item:any) => item.cdNm == EDU_TYPE_OTHER);
        } else {
          this.eduCourseRequest.eduCourseTypeSeq = "";
        }
      }
      return listType.filter((item:any) => item.cdNm != EDU_TYPE_OTHER);
    },
    async onCreate() {
      if (
        !this.eduCourseRequest.deptCd ||
        !this.eduCourseRequest.eduCourseTypeSeq
      ) {
        this.$alert(this.t("common.messageValidateRequired"));
      } else {
        this.$confirm(
          this.t("common.message.save"),
          "",
          (isConfirm: Boolean) => {
            if (isConfirm) {
              this.storeCommon.setLoading(true);
              createEduCourse(this.eduCourseRequest)
                .then((res: any) => {
                  this.response = res.data.data;
                  this.goCreateForm();
                  this.$toast(this.t("common.message.saveSuccess"));
                }).
                catch((error) => {
                  if (error.response.data.code == BAD_REQUEST_EDU_COURSE) {
                    this.$alert("이미 개발중 또는 개발된 교육과정유형입니다.");
                  }
                  if (error.response.data.code == BAD_REQUEST_NO_REGISTER_WRITE_SCHDL) {
                    this.$alert("교과과정 개발 기간이 아닙니다. 다시 확인해주세요.");
                  }
                })
                .finally(() => {
                  this.storeCommon.setLoading(false);
                });
            }
          }
        );
      }
    },
    async goCreateForm() {
      this.router.push({
        name: SCREEN.eduProcessCreationMng.name,
        params: {
          mode: MODE_EDIT,
        },
        state: {
          id: this.response,
          version: VERSION_V1,
          isSave: true,
        },
      });
    },
  },
};
</script>

<style scoped>
@import url("../eduCourseCustom.css");
.note {
  color: red;
}
</style>
