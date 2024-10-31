<template>
  <div class="page_wrapper">
    <section id="content" class="content_wrapper grid_content" tabindex="0">
      <div class="box dp_block">
        <div class="box_section">
          <p class="box_title_sm">{{ t("09.questAndAns.ansTtl") }}</p>
          <h2 class="mb_10">{{ t("09.questAndAns.ansTtl2") }}</h2>
          <table class="tbl_row">
            <colgroup>
              <col style="width: 20%" />
              <col style="width: 40%" />
              <col style="width: 20%" />
              <col style="width: 40%" />
            </colgroup>
            <tbody>
              <tr>
                <th scope="row">{{ t("09.questAndAns.table.category") }}</th>
                <td colspan="3">
                  {{ qnaModel.qusTtl }}
                </td>
              </tr>
              <tr>
                <th scope="row">{{ t("09.questAndAns.regBy") }}</th>
                <td colspan="3">
                  {{ qnaModel.regId }}
                </td>
              </tr>
              <tr>
                <th scope="row">{{ t("09.questAndAns.regCode") }}</th>
                <td colspan="3">
                  {{ qnaModel.regCode }}
                </td>
              </tr>
              <tr>
                <th scope="row">{{ t("09.questAndAns.regDept") }}</th>
                <td colspan="3">
                  {{ qnaModel.regDept }}
                </td>
              </tr>
              <tr>
                <th scope="row">
                  {{ t("09.questAndAns.table.regDate") }}
                </th>
                <td colspan="3">
                  {{ qnaModel.regDate }}
                </td>
              </tr>
              <tr>
                <th scope="row">{{ t("09.questAndAns.qusCont") }}</th>
                <td colspan="3">
                  <TextArea :id="'cont'" readonly v-model="qnaModel.qusCont">
                  </TextArea>
                </td>
              </tr>
              <tr>
                <th scope="row">{{ t("09.questAndAns.file") }}</th>
                <td colspan="3">
                  <InputFileBase
                    v-if="qnaModel.qnaSeq"
                    :referKey="qnaModel.qnaSeq"
                    :mode="modeDetail"
                    :id="'idFan'"
                    :name="'idFan'"
                    :type="fileTypeOffice"
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
        <div class="box_section mt-10">
          <h2 class="mb_10">{{ t("09.questAndAns.ansTtl3") }}</h2>
          <table class="tbl_row">
            <colgroup>
              <col style="width: 20%" />
              <col style="width: 40%" />
              <col style="width: 20%" />
              <col style="width: 40%" />
            </colgroup>
            <tbody>
              <tr
                v-if="qnaModel.ansId"
                v-for="(value, key) in ansInfo"
                :key="key"
              >
                <th scope="row">{{ key }}</th>
                <td colspan="3">{{ value }}</td>
              </tr>
              <tr>
                <th scope="row" class="required">
                  {{ t("09.questAndAns.ansCont") }}
                </th>
                <td colspan="3">
                  <TextArea required :id="'contAns'" v-model="qnaModel.ansCont">
                  </TextArea>
                </td>
              </tr>
              <tr>
                <th scope="row">{{ t("09.questAndAns.file") }}</th>
                <td colspan="3">
                  <InputFileBase
                    v-if="qnaModel.qnaSeq"
                    :referKey="qnaModel.qnaSeq"
                    :mode="modeEdit"
                    :id="'idFan'"
                    :name="'idFan'"
                    :type="fileTypeOffice"
                    ref="childRef"
                    v-model="fileArr"
                    :maxFile="1"
                    :orgName="ansName"
                    :category="ansName"
                    :sectionName="fileTypeOffice"
                    :subTitle="'※ 30MB 이하의 파일 하나만 등록이 가능합니다.'"
                  ></InputFileBase>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="dp_flex btn_group btn_end mt-2">
          <ButtonBase
            class="btn_round btn_md btn_primary"
            :buttonName="t('09.questAndAns.saveAns')"
            @click="saveData()"
          >
          </ButtonBase>
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
import type { QnaModelList, AnsModel } from "@/stores/qna/qna.type";
import { getById, createAns } from "@/stores/qna/qna.service";
import { commonStore } from "@/stores/common";
import { format } from "date-fns";
import InputFileBase from "@/components/common/input/InputFileBase.vue";
import Swal from "sweetalert2";
import ButtonBase from "@/components/common/button/ButtonBase.vue";

export default defineComponent({
  name: "QnaStaffDetail",
  components: { InputFileBase, ButtonBase },
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
    this.qusSeq = window.history.state.id;
    this.getDataDetail();
  },
  computed: {
    ansInfo() {
      return {
        [this.t("09.questAndAns.ansId")]: this.qnaModel.ansId,
        [this.t("09.questAndAns.ansCode")]: this.qnaModel.ansCode,
        [this.t("09.questAndAns.ansDept")]: this.qnaModel.ansDept,
        [this.t("09.questAndAns.ansDate")]: this.qnaModel.ansDate,
      };
    },
  },
  data() {
    return {
      qnaModel: {} as QnaModelList,
      ansModel: {} as AnsModel,
      modeScreen: "",
      modeDetail: MODE_DETAIL,
      modeEdit: MODE_EDIT,
      modeCreate: MODE_CREATE,
      questionName: "QUESTION",
      ansName: "ANSWER",
      fileTypeOffice: FILE_TYPE_OFFICE,
      modeFile: MODE_CREATE,
      fileArr: [],
      qusSeq: "",
    };
  },
  methods: {
    getDataDetail() {
      getById(this.qusSeq).then((res) => {
        this.qnaModel = res.data.data;
        this.qnaModel.regDate = format(
          new Date(this.qnaModel.regDate),
          FORMAT_YYY_MM_DD
        );
        if (this.qnaModel.ansDate) {
          this.qnaModel.ansDate = format(
            new Date(this.qnaModel.ansDate),
            FORMAT_YYY_MM_DD
          );
        }
      });
    },
    checkData(qnaSeq: any) {
      const childComponent = this.$refs.childRef;
      childComponent.upLoadFile(qnaSeq);
    },
    back() {
      this.$router.replace({ path: SCREEN.questAndAns.path });
    },
    saveData() {
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
            this.ansModel.qnaSeq = this.qusSeq;
            this.ansModel.ansCont = this.qnaModel.ansCont;
            await createAns(this.ansModel).then((res) => {
              this.checkData(res.data.data);
              this.cmn.setLoading(false);
            });
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
  },
});
</script>
<style>
.mb_10 {
  margin-bottom: 10px;
}
</style>
