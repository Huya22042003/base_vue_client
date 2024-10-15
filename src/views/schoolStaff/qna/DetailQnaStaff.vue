<template>
  <div class="page_wrapper">
    <section id="content" class="content_wrapper grid_content" tabindex="0">
      <div class="box dp_block">
        <div class="box_section">
          <p class="box_title_sm">{{ t("schoolStaff.qna.title") }}</p>
          <h2 class="mb_10">{{ t("schoolStaff.qna.titleReg") }}</h2>
          <table class="tbl_row">
            <colgroup>
              <col style="width: 20%" />
              <col style="width: 40%" />
              <col style="width: 20%" />
              <col style="width: 40%" />
            </colgroup>
            <tbody>
              <tr v-if="modeScreen != modeCreate">
                <th scope="row">{{ t("schoolStaff.qna.stsCd") }}</th>
                <td colspan="3">
                  {{ qnaModel.stsCd }}
                </td>
              </tr>
              <tr>
                <th scope="row" class="required">
                  {{ t("schoolStaff.qna.ttl") }}
                </th>
                <td colspan="3">
                  <InputBase
                    v-if="qnaModel.ansId"
                    readonly
                    :id="'title'"
                    v-model="qnaModel.qusTtl"
                  />
                  <InputBase
                    v-if="!qnaModel.ansId"
                    :id="'title'"
                    v-model="qnaModel.qusTtl"
                    required
                  />
                </td>
              </tr>
              <tr>
                <th scope="row" class="required">
                  {{ t("schoolStaff.qna.cont") }}
                </th>
                <td colspan="3">
                  <TextArea
                    v-if="qnaModel.ansId"
                    readonly
                    :id="'cont'"
                    v-model="qnaModel.qusCont"
                  >
                  </TextArea>
                  <TextArea
                    v-if="!qnaModel.ansId"
                    :id="'cont'"
                    v-model="qnaModel.qusCont"
                    required
                  >
                  </TextArea>
                </td>
              </tr>
              <tr v-if="modeScreen != modeCreate">
                <th scope="row">{{ t("schoolStaff.qna.regDate") }}</th>
                <td colspan="3">
                  {{ qnaModel.regDate }}
                </td>
              </tr>
              <tr>
                <th scope="row">{{ t("schoolStaff.qna.file") }}</th>
                <td colspan="3">
                  <InputFileBase
                    v-if="modeScreen == modeCreate"
                    :mode="modeCreate"
                    :id="'idFan'"
                    :name="'idFan'"
                    :type="fileTypeOffice"
                    v-model="fileArr"
                    ref="childRef"
                    :maxFile="1"
                    :orgName="questionName"
                    :category="questionName"
                    :sectionName="fileTypeOffice"
                  ></InputFileBase>
                  <InputFileBase
                    v-if="qnaModel.qnaSeq"
                    :referKey="qnaModel.qnaSeq"
                    :mode="modeFile"
                    :id="'idFan'"
                    :name="'idFan'"
                    :type="fileTypeOffice"
                    v-model="fileArr"
                    ref="childRef"
                    :maxFile="1"
                    :orgName="questionName"
                    :category="questionName"
                    :sectionName="fileTypeOffice"
                  ></InputFileBase>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="box_section mt-10" v-if="qnaModel.ansId">
          <h2 class="mb_10">{{ t("schoolStaff.qna.titleAns") }}</h2>
          <table class="tbl_row">
            <colgroup>
              <col style="width: 20%" />
              <col style="width: 40%" />
              <col style="width: 20%" />
              <col style="width: 40%" />
            </colgroup>
            <tbody>
              <tr>
                <th scope="row">{{ t("schoolStaff.qna.contAns") }}</th>
                <td colspan="3">
                  <TextArea :id="'cont'" readonly v-model="qnaModel.ansCont">
                  </TextArea>
                </td>
              </tr>
              <tr>
                <th scope="row">{{ t("schoolStaff.qna.ansDate") }}</th>
                <td colspan="3">
                  {{ qnaModel.ansDate }}
                </td>
              </tr>
              <tr>
                <th scope="row">{{ t("schoolStaff.qna.file") }}</th>
                <td colspan="3">
                  <InputFileBase
                    :referKey="qnaModel.qnaSeq"
                    :mode="modeDetail"
                    :id="'idFan'"
                    :name="'idFan'"
                    :type="fileTypeOffice"
                    ref="childRef"
                    :maxFile="1"
                    :orgName="ansName"
                    :category="ansName"
                    :sectionName="fileTypeOffice"
                  ></InputFileBase>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="dp_flex btn_group btn_end mt-2">
          <button
            v-if="!qnaModel.ansId"
            type="button"
            class="btn_round btn_md btn_primary"
            @click="saveData()"
          >
            {{ t("common.save") }}
          </button>
        <button
            v-if="qnaModel.ansId"
            type="button"
            class="btn_round btn_md btn_primary"
            @click="goCreate()"
          >
            {{ t("schoolStaff.qna.goNew") }}
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
    </section>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import {
  MODE_EDIT,
  FORMAT_YYY_MM_DD,
  MODE_CREATE,
  FILE_TYPE_OFFICE,
  MODE_DETAIL,
} from "@/constants/screen.const";
import { SCREEN } from "@/router/screen";
import type {
  QnaStaffCreModel,
  QnaStaffModel,
} from "@/stores/qnaStaff/qnaStaff.type";
import {
  createQus,
  getById,
  editQus,
} from "@/stores/qnaStaff/qnaStaff.service";
import { commonStore } from "@/stores/common";
import { format } from "date-fns";
import TextArea from "@/components/common/input/TextArea.vue";
import InputFileBase from "@/components/common/input/InputFileBase.vue";
import Swal from "sweetalert2";

export default defineComponent({
  name: "QnaStaffDetail",
  components: { InputFileBase },
  setup() {
    const { t } = useI18n();
    const cmn = commonStore();
    return {
      t,
      cmn,
    };
  },
  beforeMount() {
    this.modeScreen = this.$route.params.mode;
    this.qnaSeq = window.history.state.id;
    if (this.modeScreen == this.modeDetail) {
      this.getDataDetail();
    }
  },
  data() {
    return {
      qnaModel: {} as QnaStaffModel,
      qnaCreModel: {} as QnaStaffCreModel,
      modeScreen: "",
      modeDetail: MODE_DETAIL,
      modeEdit: MODE_EDIT,
      modeCreate: MODE_CREATE,
      questionName: "QUESTION",
      ansName: "ANSWER",
      fileTypeOffice: FILE_TYPE_OFFICE,
      modeFile: MODE_EDIT,
      fileArr: [],
      qnaSeq: "",
    };
  },
  methods: {
    checkData(qnaSeq: any) {
      const childComponent = this.$refs.childRef;
      childComponent.upLoadFile(qnaSeq);
    },
    saveData() {
      this.qnaCreModel.qnaSeq = this.qnaSeq;
      this.qnaCreModel.qusTtl = this.qnaModel.qusTtl;
      this.qnaCreModel.qusCont = this.qnaModel.qusCont;
      if (this.cmn.check) {
        Swal.fire({
          text: this.t("common.messageValidateRequired"),
          type: "warning",
          showConfirmButton: false,
          showCancelButton: true,
          cancelButtonText: this.t("common.cancel"),
        });
      } else {
        Swal.fire({
          text: this.t("common.message.save"),
          type: "warning",
          showCancelButton: true,
          confirmButtonText: this.t("common.save"),
          cancelButtonText: this.t("common.cancel"),
        }).then(async (result) => {
          if (result.isConfirmed) {
            this.cmn.setLoading(true);
            if (this.qnaCreModel.qnaSeq != undefined) {
              await editQus(this.qnaCreModel).then((res) => {
                this.checkData(res.data.data);
                this.cmn.setLoading(false);
              });
            } else {
              this.qnaCreModel.qnaSeq = "";
              await createQus(this.qnaCreModel).then((res) => {
                this.checkData(res.data.data);
                this.cmn.setLoading(false);
              });
            }

            await Swal.fire({
              text: this.t("common.message.saveSuccess"),
              type: "warning",
              showCancelButton: false,
              confirmButtonText: this.t("common.confirm"),
            });
            this.back();
          }
        });
      }
    },
    back() {
      this.$router.replace({ path: SCREEN.qnaStaff.path });
    },
    getDataDetail() {
      this.cmn.setLoading(true);
      getById(this.qnaSeq).then((res) => {
        this.qnaModel = res.data.data;
        this.qnaModel.regDate = format(
          new Date(this.qnaModel.regDate),
          FORMAT_YYY_MM_DD
        );
        if (this.qnaModel.ansId) {
          this.qnaModel.ansDate = format(
            new Date(this.qnaModel.ansDate),
            FORMAT_YYY_MM_DD
          );
          this.modeFile = this.modeDetail;
        }
      });
      this.cmn.setLoading(false);
    },
    resetData() {
      this.qnaModel = {} as QnaStaffModel;
      this.qnaSeq = "";
      this.fileArr = [];
      this.modeFile = this.modeCreate;
    },
    goCreate() {
      this.resetData();
      this.$router
        .push({
          name: SCREEN.qnaStaffDetail.name,
          params: { mode: MODE_CREATE },
        })
        .then(() => {
          this.$router.go(0);
        });
    },
  },
});
</script>
<style>
.mb_10 {
  margin-bottom: 10px;
}
</style>
