<template>
  <TModal
    :is-open="isOpen"
    :is-show-header="true"
    :is-show-footer="true"
    :modal-id="'CompositionSelectModal'"
    @close-modal="onClose()"
  >
    <template #title>
      <strong
        >{{ t("eduProcessCreation.attachFile.title5")
        }}<!-- 부록 등록 --></strong
      >
    </template>
    <template #default>
      <div class="tbl tbl_col">
        <table>
          <colgroup>
            <col style="width: 25%" />
            <col style="width: auto" />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row" :colspan="1">
                {{ t("eduProcessCreation.attachFile.title6")
                }}<!-- 제목 -->
              </th>
              <th scope="row" :colspan="1">
                <InputBase id="ttl" v-model="eduCourseApdxModel.ttl" required />
              </th>
            </tr>
            <tr>
              <th scope="row" :colspan="1">
                {{ t("eduProcessCreation.attachFile.title7")
                }}<!-- 첨부파일 -->
              </th>
              <th scope="row" :colspan="1">
                <InputFileBase
                  :id="'attachfileApdx' + apdxSeq"
                  :name="'attachfileApdx' + apdxSeq"
                  :type="typeFile"
                  :referKey="apdxSeq"
                  :mode="modeFile"
                  :multiple="false"
                  :maxFile="1"
                  ref="childRefUpLoad"
                  :orgName="eduCourseApdx"
                  :category="eduCourseApdx"
                  :sectionName="eduCourseApdx"
                >
                </InputFileBase>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
    <template #footer>
      <button
        type="button"
        class="btn_round btn_md btn_primary"
        @click="confirmSave"
      >
        {{ t("common.save")
        }}<!-- 닫기 -->
      </button>
      <button
        type="button"
        class="btn_round btn_md btn_white"
        @click="onClose()"
      >
        {{ t("common.cancel")
        }}<!-- 확인 -->
      </button>
    </template>
  </TModal>
</template>
<script lang="ts">
import InputBase from "../../../components/common/input/InputBase.vue";
import { commonStore } from "../../../stores/common";
import InputFileBase from "../../../components/common/input/InputFileBase.vue";
import { FILE_TYPE_OFFICE, MODE_EDIT } from "@/constants/screen.const";
import { saveEduCourseApdx } from "@/stores/eduProcessCreation/attachFile/attachFile.service";
import { EduCourseApdxSaveModel } from "@/stores/eduProcessCreation/attachFile/attachFile.type";

export default {
  components: {
    InputBase,
    InputFileBase,
  },
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    onClose: {
      type: Function,
      required: true,
    },
    fnPagination: {
      type: Function,
      required: true,
    },
    apdxSeq: String,
    apdxSelected: {
      type: Object,
      required: true,
    },
  },
  setup: () => {
    const router = useRouter();
    const storeCommon = commonStore();
    const { t } = useI18n();
    const id = window.history.state.id;

    return { router, storeCommon, t, id };
  },
  data() {
    return {
      eduCourseApdxModel: {} as EduCourseApdxSaveModel,
      typeFile: FILE_TYPE_OFFICE,
      modeFile: MODE_EDIT,
      eduCourseApdx: "EDU_COURSE_APDX",
    };
  },
  beforeMount() {
    this.eduCourseApdxModel.eduCursSeq = this.id;
    this.eduCourseApdxModel.ttl = this.apdxSelected.ttl;
  },
  beforeUnmount() {
    this.eduCourseApdxModel = {};
  },
  methods: {
    confirmSave() {
      if (this.storeCommon.check) {
        this.$alert(this.t("common.messageValidateRequired"));
        return;
      }

      this.$confirm(this.t("common.message.save"), "", (isConfirm: Boolean) => {
        if (isConfirm) {
          this.saveData();
        }
      });
    },
    async saveData() {
      this.storeCommon.setLoading(true);
      this.eduCourseApdxModel.apdxSeq = this.apdxSeq ? this.apdxSeq : null;
      const res = await saveEduCourseApdx(this.eduCourseApdxModel);
      this.uploadFile(res.data.data);
      this.storeCommon.setLoading(false);
      await this.fnPagination(1, 10);
      this.onClose();
      this.$alert(this.t("common.message.saveSuccess"));
    },
    uploadFile(apdxSeq: string) {
      const chilRef = this.$refs.childRefUpLoad;
      chilRef.upLoadFile(apdxSeq);
    },
  },
};
</script>
<style>
.attach_filewrap {
  padding: 0;
}
</style>
