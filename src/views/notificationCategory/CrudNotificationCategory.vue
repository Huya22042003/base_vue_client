<template>
  <section id="content" class="content_wrapper grid_content" tabindex="0">
    <div class="sub_section">
      <div class="section_tit_wrap">
        <h3 class="section_tit_md">공지사항</h3>
      </div>
      <div class="sub_section_xs">
        <div class="box">
          <div class="section_tit_wrap">
            <h4 class="section_tit_xs">공지사항 등록</h4>
          </div>

          <div class="box_section tbl_row">
            <table class="">
              <colgroup>
                <col style="width: 15%" />
                <col style="width: 85%" />
              </colgroup>
              <tbody>
                <tr>
                  <th scope="row" class="required">
                    {{ t("09.notificationCategory.form.ttl") }}
                  </th>
                  <td colspan="3">
                    <InputBase
                      :mode="mode"
                      :id="'headingNoti'"
                      :name="'headingNoti'"
                      required
                      :disabled="isDisableRadio"
                      v-model="notiCategoryDetailModel.ttl"
                      class="form_style"
                    >
                    </InputBase>
                  </td>
                </tr>
                <tr>
                  <th scope="row" class="required">
                    {{ t("09.notificationCategory.form.cont") }}
                  </th>
                  <td colspan="3" class="word_break">
                    <QuillEditor
                      :modules="modules"
                      toolbar="full"
                      class="quill-editor-custom"
                      @editorChange="changeEditorDiagnosticGuide()"
                      ref="diagnosticGuide"
                    />
                  </td>
                </tr>
                <tr>
                  <th scope="row" class="required">
                    {{ t("09.notificationCategory.form.showYn") }}
                  </th>
                  <td colspan="3">
                    <RadiobuttonBase
                      v-for="item in listRadioOpenYn"
                      :mode="mode"
                      :value="item.value"
                      :id="item.id"
                      name="radioOpen"
                      :key="item.id"
                      :label="item.label"
                      :isDisable="isDisableRadio"
                      v-model="notiCategoryDetailModel.openYn"
                      :checked="item.value == notiCategoryDetailModel.openYn"
                    >
                    </RadiobuttonBase>
                  </td>
                </tr>
                <tr>
                  <th scope="row" class="required">
                    {{ t("09.notificationCategory.form.permanentYn") }}
                  </th>
                  <td colspan="3">
                    <RadiobuttonBase
                      v-for="item in listRadioTopFix"
                      :mode="mode"
                      :value="item.value"
                      :id="item.id"
                      name="radioTopFix"
                      :key="item.id"
                      :label="item.label"
                      :isDisable="isDisableRadio"
                      v-model="notiCategoryDetailModel.topFixYn"
                      :checked="item.value == notiCategoryDetailModel.topFixYn"
                    >
                    </RadiobuttonBase>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    {{ t("09.notificationCategory.form.file") }}
                  </th>
                  <td colspan="3">
                    <InputFileBase
                      :referKey="noticeIdRes.id"
                      :mode="'edit'"
                      :id="'idFile'"
                      :name="'idFile'"
                      :type="fileTypeImageAll"
                      v-model="fileModel"
                      ref="childRef"
                      :maxFile="1"
                      :orgName="'NTC'"
                      :category="'NOTICE'"
                      :sectionName="fileTypeImageAll"
                    ></InputFileBase>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="btn_group btn_end">
            <div v-if="modeScreen == 'create'" class="btn_area">
              <ButtonBase
                type="ButtonBase"
                class="btn_round btn_sm btn_primary"
                @click="handleCreate()"
                :buttonName="t('common.save')"
              >
              </ButtonBase>
              <ButtonBase
                type="ButtonBase"
                class="btn_round btn_sm btn_white"
                @click="back()"
                :buttonName="t('common.list')"
              >
              </ButtonBase>
            </div>
            <div v-if="modeScreen != 'create'" class="btn_area">
              <ButtonBase
                type="ButtonBase"
                class="btn_round btn_sm btn_primary"
                @click="handleDelete()"
                :buttonName="t('09.notificationCategory.form.btnDelete')"
              >
              </ButtonBase>
              <ButtonBase
                type="ButtonBase"
                class="btn_round btn_sm btn_primary"
                @click="handleUpdate()"
                :buttonName="t('09.notificationCategory.form.btnEdit')"
              >
              </ButtonBase>
              <ButtonBase
                type="ButtonBase"
                class="btn_round btn_sm btn_white"
                @click="back()"
                :buttonName="t('common.list')"
              >
              </ButtonBase>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import InputBase from "@/components/common/input/InputBase.vue";
import TextArea from "@/components/common/input/TextArea.vue";
import InputFileBase from "../../components/common/input/InputFileBase.vue";
import SelectBoxBase from "../../components/common/input/SelectBoxBase.vue";
import RadiobuttonBase from "../../components/common/input/RadiobuttonBase.vue";
import GridComponent from "../../components/common/grid/GridComponent.vue";
import DatePickerComponent from "../../components/common/input/DatePickerComponent.vue";
import LinkGridComponent from "../../components/common/grid/LinkGridComponent.vue";
import Breadcrumb from "../../components/common/Breadcrumb.vue";
import LoaddingComponent from "../../components/common/loading/LoaddingComponent.vue";
import type {
  NotiCategoryDetailModel,
  NoticeUpdateModel,
  NoticeIdRes,
  SiteNotificationCategoryModel,
} from "../../stores/notificationCategory/notificationCategory.type";
import {
  findById,
  deleteById,
  updateData,
  saveData,
  countTop,
} from "@/stores/notificationCategory/notificationCategory.service";
import {
  MODE_CREATE,
  MODE_SHOW,
  ACCEPTTYPE_All,
} from "../../constants/screen.const";
import { SCREEN } from "../../router/screen";
import { useI18n } from "vue-i18n";
import { commonStore } from "../../stores/common";
import { SHOW_Y, SHOW_N, TOP_Y, TOP_N } from "../../constants/common.const";
import { MESSAGE_ERROR_API } from "@/constants/common.const";
import { QuillEditor } from "@vueup/vue-quill";
import { uploadFileEditor } from "@/stores/common/fileMng/fileMng.service";
import ImageUploader from "quill-image-uploader";
import ButtonBase from "@/components/common/button/ButtonBase.vue";

export default defineComponent({
  components: {
    InputBase,
    SelectBoxBase,
    RadiobuttonBase,
    GridComponent,
    DatePickerComponent,
    Breadcrumb,
    TextArea,
    LoaddingComponent,
    LinkGridComponent,
    InputFileBase,
    QuillEditor,
    ButtonBase,
  },
  setup() {
    const { t } = useI18n();
    let modeScreen = ref("");
    const cmn = commonStore();
    const fileOfficeFa: any[] = [];
    const fileOffice: any[] = [];
    const mode = MODE_SHOW;
    const listRadioOpenYn = [
      {
        id: "radioOpenY",
        value: SHOW_Y,
        label: t("09.notificationCategory.form.openY"),
      },
      {
        id: "radioOpenN",
        value: SHOW_N,
        label: t("09.notificationCategory.form.openN"),
      },
    ];
    const listRadioTopFix = [
      {
        id: "radioTopY",
        value: TOP_Y,
        label: t("09.notificationCategory.form.topY"),
      },
      {
        id: "radioTopN",
        value: TOP_N,
        label: t("09.notificationCategory.form.topN"),
      },
    ];
    const id = "" as string | any;
    const isDisable = false;
    const isDisableRadio = false;
    const formattedDate = ref("");
    const isCheckValid = false;
    const isCheckTtl = false;
    const isCheckCont = false;
    const isDelete = false;
    const messageInfo = ref("");
    const messageCheckTop = ref("");
    const messagAlert = ref(t("09.notificationCategory.message.saveSuccess"));
    const notiCategoryDetailModel = ref({
      openYn: SHOW_Y,
      topFixYn: TOP_N,
    }) as NotiCategoryDetailModel;

    const warringProf = ref(t("09.notificationCategory.message.warringProf"));
    const warringEmp = ref(t("09.notificationCategory.message.warringProf"));
    const saveSuccess = ref(t("09.notificationCategory.message.saveSuccess"));
    const quesDel = ref(t("09.notificationCategory.message.quesDel"));
    const quesSave = ref(t("09.notificationCategory.message.quesSave"));
    const delSuccess = ref(t("09.notificationCategory.message.delSuccess"));

    const noticeIdRes = {} as NoticeIdRes;
    const noticeUpdateModel = {} as NoticeUpdateModel;
    const fileTypeAll = ACCEPTTYPE_All;
    const sectionName = ref("NOTICE");
    const fileModel: any[] = [];
    const siteNotificationCategoryModel = {} as SiteNotificationCategoryModel;
    return {
      cmn,
      modeScreen,
      t,
      fileOfficeFa,
      fileOffice,
      mode,
      listRadioTopFix,
      listRadioOpenYn,
      id,
      isDisable,
      isDisableRadio,
      formattedDate,
      isCheckValid,
      isDelete,
      messageInfo,
      messageCheckTop,
      messagAlert,
      noticeIdRes,
      notiCategoryDetailModel,
      noticeUpdateModel,
      fileTypeAll,
      sectionName,
      fileModel,
      warringEmp,
      warringProf,
      saveSuccess,
      delSuccess,
      quesDel,
      quesSave,
      siteNotificationCategoryModel,
      isCheckCont,
      isCheckTtl,
    };
  },
  data() {
    return {
      modules: {
        name: "imageUploader",
        module: ImageUploader,
        options: {
          upload: (file: any) => {
            return new Promise((resolve, reject) => {
              if (!file) {
                reject("Upload failed");
              } else {
                this.storeCommon.setLoading(true);
                const formData = new FormData();
                formData.append("file", file);
                formData.append("category", "MEETING_REPORT_EDITER");
                formData.append("orgName", "MEETING_REPORT_EDITER");
                formData.append("sectionName", "MEETING_REPORT_EDITER");
                uploadFileEditor(formData)
                  .then((res) => {
                    resolve(res.data.urlFile);
                    this.storeCommon.setLoading(false);
                  })
                  .catch((err) => {
                    reject("Upload failed");
                  });
              }
            });
          },
        },
      },
    };
  },
  beforeMount() {
    this.modeScreen = this.$route.params.mode;
    this.id = window.history.state.id;
    this.noticeIdRes.id = window.history.state.id;
    if (this.modeScreen != MODE_CREATE) {
      this.getDateDetail();
    }
  },
  mounted() {},
  methods: {
    checkData(idSeq: any) {
      const childComponent = this.$refs.childRef;
      childComponent.upLoadFile(idSeq);
    },
    back() {
      this.$router.replace({ path: SCREEN.notificationCategory.path });
    },
    async getDateDetail() {
      this.cmn.setLoading(true);

      if (this.modeScreen != MODE_CREATE) {
        try {
          await findById(this.noticeIdRes)
            .then((res) => {
              this.notiCategoryDetailModel = res.data.data;
              this.$refs.diagnosticGuide.setHTML(
                this.notiCategoryDetailModel.cont
              );
            })
            .catch((error) => {
              throw new Error(MESSAGE_ERROR_API);
            })
            .finally(() => {
              this.cmn.setLoading(false);
            });
        } catch (error) {}
      }
      this.cmn.setLoading(false);
    },
    async handleModifyAction() {
      this.cmn.setLoading(true);
      var checkValid = 0;
      await countTop()
        .then((res) => {
          this.siteNotificationCategoryModel = res.data.data;
        })
        .catch((error) => {
          throw new Error(MESSAGE_ERROR_API);
        })
        .finally(() => {
          this.cmn.setLoading(false);
        });

      try {
        if (this.modeScreen == MODE_CREATE) {
          if (
            (this.siteNotificationCategoryModel.length < 3 &&
              this.notiCategoryDetailModel.topFixYn == TOP_Y) ||
            this.notiCategoryDetailModel.topFixYn == TOP_N
          ) {
            await saveData(this.notiCategoryDetailModel)
              .then((res) => {
                this.checkData(res.data.data);
                this.messagAlert = this.saveSuccess;
                this.showAlert();
              })
              .catch((error) => {
                throw new Error(MESSAGE_ERROR_API);
              })
              .finally(() => {
                this.cmn.setLoading(false);
              });
          } else {
            this.messageCheckTop = this.warringProf;
            this.showAlertWarning();
          }
          this.cmn.setLoading(false);
        } else {
          if (this.isDelete) {
            //call api to delete
            await deleteById(this.noticeIdRes)
              .then((res) => {
                if (res.data.data) {
                  this.messagAlert = this.delSuccess;
                  this.showAlert();
                }
              })
              .catch((error) => {
                throw new Error(MESSAGE_ERROR_API);
              })
              .finally(() => {
                this.cmn.setLoading(false);
              });
          } else {
            if (checkValid == 0) {
              if (
                this.notiCategoryDetailModel.topFixYn == TOP_N ||
                this.siteNotificationCategoryModel.some(
                  (item) => item.id === this.id
                ) ||
                (this.notiCategoryDetailModel.topFixYn == TOP_Y &&
                  this.siteNotificationCategoryModel.length < 3) ||
                (this.notiCategoryDetailModel.topFixYn == TOP_Y &&
                  this.siteNotificationCategoryModel.some(
                    (item) => item.id === this.id
                  ))
              ) {
                this.updateObject();
              } else {
                this.messageCheckTop = this.warringProf;
                this.showAlertWarning();
              }
            }
            this.cmn.setLoading(false);
          }
        }
      } catch (error) {
        this.messagAlert = error + "";
      }
      this.cmn.setLoading(false);
    },
    handleDelete() {
      this.isDelete = true;
      this.messageInfo = this.quesDel;
      this.showAlertConfirm(true);
    },
    handleUpdate() {
      let type = true;
      this.isDelete = false;
      this.messageInfo = this.quesSave;
      if (!this.isCheckValid) {
        this.messageInfo = this.t("09.notificationCategory.message.checkEmpty");
        type = false;
      }
      this.showAlertConfirm(type);
    },
    handleCreate() {
      let type = true;
      this.messageInfo = this.quesSave;
      if (!this.isCheckValid) {
        this.messageInfo = this.t("09.notificationCategory.message.checkEmpty");
        type = false;
      }
      this.showAlertConfirm(type);
    },
    showAlert() {
      this.$swal({
        text: this.messagAlert,
        type: "warning",
        showCancelButton: false,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "확인",
      }).then((result) => {
        if (result.isConfirmed) {
          this.back();
        }
      });
    },
    showAlertConfirm(type: boolean) {
      this.$swal({
        text: this.messageInfo,
        type: "warning",
        showCancelButton: type,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "확인",
        cancelButtonText: "취소",
      }).then((result) => {
        if (result.isConfirmed && type) {
          this.handleModifyAction();
        }
      });
    },
    async updateObject() {
      this.noticeUpdateModel.noticeSeq = this.id;
      this.noticeUpdateModel.targetSiteCd =
        this.notiCategoryDetailModel.targetSiteCd;
      this.noticeUpdateModel.ttl = this.notiCategoryDetailModel.ttl;
      this.noticeUpdateModel.cont = this.notiCategoryDetailModel.cont;
      this.noticeUpdateModel.openYn = this.notiCategoryDetailModel.openYn;
      this.noticeUpdateModel.topFixYn = this.notiCategoryDetailModel.topFixYn;
      await updateData(this.noticeUpdateModel)
        .then((res) => {
          this.checkData(this.id);
          this.messagAlert = this.saveSuccess;
        })
        .catch((error) => {
          throw new Error(MESSAGE_ERROR_API);
        })
        .finally(() => {
          this.cmn.setLoading(false);
        });
      this.showAlert();
    },
    showAlertWarning() {
      this.$swal({
        text: this.messageCheckTop,
        type: "warning",
        showCancelButton: false,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "확인",
      });
    },
    changeEditorDiagnosticGuide() {
      this.notiCategoryDetailModel.cont = this.$refs.diagnosticGuide
        .getHTML()
        .toString()
        .replace("<p><br></p>", "");
    },
  },
  watch: {
    "notiCategoryDetailModel.ttl": {
      handler(value) {
        if (value.trim().length > 0) {
          this.isCheckTtl = true;
        } else {
          this.isCheckTtl = false;
        }
        if (this.isCheckTtl && this.isCheckCont) {
          this.isCheckValid = true;
        } else {
          this.isCheckValid = false;
        }
      },
    },
    "notiCategoryDetailModel.cont": {
      handler(value) {
        if (value.trim().length > 0) {
          this.isCheckCont = true;
        } else {
          this.isCheckCont = false;
        }
        if (this.isCheckTtl && this.isCheckCont) {
          this.isCheckValid = true;
        } else {
          this.isCheckValid = false;
        }
      },
    },
  },
});
</script>

<style>
.word_break {
  word-break: break-word;
}
.ql-editor {
  height: 120px;
}
</style>
