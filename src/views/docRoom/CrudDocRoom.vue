<template>
  <section id="content" class="content_wrapper grid_content" tabindex="0">
    <div class="box_section">
      <p class="box_title_sm">{{ t("09.documentRoom.form.title") }}</p>
      <table class="tbl_row">
        <caption>
          {{
            t("09.documentRoom.form.title")
          }}
        </caption>
        <colgroup>
          <col style="width: 20%" />
          <col style="width: 40%" />
          <col style="width: 20%" />
          <col style="width: 40%" />
        </colgroup>
        <tbody>
          <tr>
            <th scope="row">
              <p class="required">{{ t("09.documentRoom.form.ttl") }}</p>
            </th>
            <td colspan="3">
              <InputBase id="'title'" required v-model="docRoomModel.ttl">
              </InputBase>
            </td>
          </tr>
          <tr>
            <th scope="row">
              <p class="required">{{ t("09.documentRoom.form.content") }}</p>
            </th>
            <td colspan="3">
              <TextArea id="'content'" required v-model="docRoomModel.cont">
              </TextArea>
            </td>
          </tr>
          <tr>
            <th scope="row">
              <p>{{ t("09.documentRoom.form.file") }}</p>
            </th>
            <td colspan="3">
              <InputFileBase
                :referKey="docIdModel.metlSeq"
                :mode="modFile"
                :id="'idFan'"
                :name="'idFan'"
                :type="fileTypeOffice"
                v-model="fileArr"
                ref="childRef"
                :maxFile="1"
                :orgName="sectionName"
                :category="sectionName"
                :sectionName="fileTypeOffice"
                :subTitle="'※ 10mb 이하의 파일 한 개 등록 가능합니다.'"
              ></InputFileBase>
            </td>
          </tr>
          <tr v-if="modeScreen === modeDetail">
            <th scope="row">
              <p>{{ t("09.documentRoom.form.regName") }}</p>
            </th>
            <td colspan="3">
              <span>{{ docRoomModel.regId }}</span>
            </td>
          </tr>
          <tr v-if="modeScreen === modeDetail">
            <th scope="row">
              <p>{{ t("09.documentRoom.form.regDate") }}</p>
            </th>
            <td colspan="3">
              <span>{{ docRoomModel.regDate }}</span>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="box_section">
        <div class="btn_area">
          <button
            v-if="modeScreen === modeCreate"
            type="button"
            class="button btn_xs btn_blue btn_responsive"
            :disabled="cmn.check"
            @click="showAlert()"
          >
            {{ t("common.save") }}
          </button>
          <button
            v-if="modeScreen === modeDetail"
            type="button"
            class="button btn_xs btn_blue btn_responsive"
            :disabled="cmn.check"
            @click="showAlert()"
          >
            {{ t("common.edit") }}
          </button>
          <button
            type="button"
            class="button btn_sm btn_white bo_rd6"
            @click="back()"
          >
            {{ t("common.list") }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import InputBase from "../../components/common/input/InputBase.vue";
import TextArea from "../../components/common/input/TextArea.vue";
import InputFileBase from "../../components/common/input/InputFileBase.vue";
import SelectBoxBase from "../../components/common/input/SelectBoxBase.vue";
import RadiobuttonBase from "../../components/common/input/RadiobuttonBase.vue";
import GridComponent from "../../components/common/grid/GridComponent.vue";
import DatePickerComponent from "../../components/common/input/DatePickerComponent.vue";
import LinkGridComponent from "../../components/common/grid/LinkGridComponent.vue";
import Breadcrumb from "../../components/common/Breadcrumb.vue";
import LoaddingComponent from "../../components/common/loading/LoaddingComponent.vue";
import type {
  DocRoomModel,
  DocRoomCreModel,
  DocIdModel,
} from "../..//stores/docRoom/docRoom.type";
import { commonStore } from "../../stores/common";
import {
  saveData,
  findById,
  editData,
} from "../../stores/docRoom/docRoom.service";
import {
  MODE_CREATE,
  MODE_DETAIL,
  FILE_TYPE_OFFICE,
  FORMAT_YYY_MM_DD,
  MODE_EDIT,
} from "../../constants/screen.const";
import { SCREEN } from "../../router/screen";
import { useI18n } from "vue-i18n";
import { MESSAGE_ERROR_API } from "@/constants/common.const";
import { format } from "date-fns";
import Swal from "sweetalert2";

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
  },
  setup() {
    const { t } = useI18n();
    const cmn = commonStore();
    return {
      t,
      cmn,
    };
  },
  data() {
    return {
      docRoomModel: {} as DocRoomModel,
      docRoomCreModel: {} as DocRoomCreModel,
      docIdModel: {} as DocIdModel,
      modeScreen: "",
      modeCreate: MODE_CREATE,
      modeDetail: MODE_DETAIL,
      fileTypeOffice: FILE_TYPE_OFFICE,
      sectionName: "DOCROOM",
      fileArr: [],
      modFile: MODE_CREATE,
    };
  },
  beforeMount() {
    this.modeScreen = this.$route.params.mode;
    this.docIdModel.metlSeq = window.history.state.id;
    if (this.modeScreen == MODE_DETAIL) {
      this.modFile = MODE_EDIT;
    }
  },
  async mounted() {
    if (this.modeScreen == MODE_DETAIL) {
      this.cmn.setLoading(true);
      findById(this.docIdModel)
        .then((res) => {
          this.docRoomModel = res.data.data;
          this.docRoomModel.regDate = format(
            new Date(this.docRoomModel.regDate),
            FORMAT_YYY_MM_DD
          );
        })
        .catch((error) => {
          throw new Error(MESSAGE_ERROR_API);
        })
        .finally(() => {
          this.cmn.setLoading(false);
        });
    }
  },
  methods: {
    checkData(metlSeq: any) {
      const childComponent = this.$refs.childRef;
      childComponent.upLoadFile(metlSeq);
    },

    back() {
      this.$router.replace({ path: SCREEN.docRoom.path });
    },
    async saveOrEdit() {
      this.cmn.setLoading(true);
      try {
        this.docRoomCreModel.ttl = this.docRoomModel.ttl;
        this.docRoomCreModel.cont = this.docRoomModel.cont;
        if (this.modeScreen === MODE_DETAIL) {
          this.docRoomCreModel.metlSeq = this.docIdModel.metlSeq;
          await editData(this.docRoomCreModel);
          this.checkData(this.docRoomCreModel.metlSeq);
        } else if (this.modeScreen === MODE_CREATE) {
          await saveData(this.docRoomCreModel).then((res) => {
            this.checkData(res.data.data);
          });
        }
      } catch (error) {
      } finally {
        this.showMess();
        this.cmn.setLoading(false);
      }
    },
    showAlert() {
      Swal.fire({
        text: this.t("09.documentRoom.message.confirmSave"),
        type: "warning",
        showCancelButton: true,
        confirmButtonText: this.t("common.save"),
        cancelButtonText: this.t("common.cancel"),
      }).then((result) => {
        if (result.isConfirmed) {
          this.saveOrEdit();
        }
      });
    },
    async showMess() {
      Swal.fire({
        text: this.t("09.documentRoom.message.success"),
        type: "warning",
        showCancelButton: false,
        confirmButtonText: this.t("common.confirm"),
      }).then((result) => {
        if (result.isConfirmed) {
          this.back();
        }
      });
    },
  },
});
</script>
