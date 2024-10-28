<template>
  <TModal
    :is-open="isOpen"
    :is-show-header="true"
    :is-show-footer="true"
    :modal-id="'modalSaveJob'"
    id="modalSaveJob"
    @close-modal="onClose"
  >
    <template #title>
      <strong>
        {{
          jobSeq ? t("jobManagement.updateJob") : t("jobManagement.createJob")
        }}</strong
      >
    </template>
    <template #default>
      <div class="mg_b15">
        <span class="note_custom">
          {{ t("jobManagement.plan2") }}
        </span>
      </div>
      <div>
        <table class="tbl_row tbl_border">
          <colgroup>
            <col style="width: 25%" />
            <col style="width: auto" />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row">
                <p class="required">
                  {{ t("jobManagement.dept") }}
                </p>
              </th>
              <td class="td_input">{{ dataDetail.deptNm }}</td>
            </tr>
            <tr>
              <th scope="row">
                <p class="required">
                  {{ t("jobManagement.talt") }}
                </p>
              </th>
              <td>
                <SelectBoxBase
                  v-model="dataDetail.taltNrtgTypeSeq"
                  :data="listTaltNrtgType"
                  v-if="listTaltNrtgType.length > 1"
                >
                </SelectBoxBase>
              </td>
            </tr>
            <tr>
              <th scope="row">
                <p class="required">
                  {{ t("jobManagement.jobNm") }}
                </p>
              </th>
              <td>
                <InputBase
                  :id="'jobNm'"
                  :name="'jobNm'"
                  v-model="dataDetail.jobNm"
                  required
                />
              </td>
            </tr>
            <tr>
              <th scope="row">
                <p class="required">
                  {{ t("jobManagement.defn") }}
                </p>
              </th>
              <td>
                <TextArea
                  :id="'defn'"
                  :name="'defn'"
                  v-model="dataDetail.defn"
                  required
                />
              </td>
            </tr>
            <tr>
              <th scope="row">
                <p class="required">
                  {{ t("jobManagement.related") }}
                </p>
              </th>
              <td>
                <TextArea
                  :id="'related'"
                  :name="'related'"
                  v-model="dataDetail.relatedCertificates"
                  required
                />
              </td>
            </tr>
            <tr>
              <th scope="row">
                <p class="required">
                  {{ t("jobManagement.useYn") }}
                </p>
              </th>
              <td>
                <SelectBoxBase
                  :id="'listUseYn'"
                  name="'listUseYn'"
                  v-model="dataDetail.useYn"
                  :data="listUseYn"
                >
                </SelectBoxBase>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
    <template #footer
      ><div class="dp_flex btn_group btn_end" style="gap: 10px">
        <button
          type="button"
          class="btn_round btn_primary btn_md"
          @click="confirmSave"
        >
          {{ t("common.save") }}
        </button>
        <button
          type="button"
          class="btn_round btn_md btn_white"
          @click="onClose()"
        >
          {{ t("common.close") }}
        </button>
      </div></template
    >
  </TModal>
</template>

<script lang="ts">
import GridComponentV2 from "@/components/common/grid/GridComponentV2.vue";
import ButtonGridComponent from "@/components/common/grid/ButtonGridComponent.vue";
import { commonStore } from "../../stores/common";
import { JobDetailModel } from "../../stores/jobManagement/jobManagement.type";
import {
  detailJob,
  getListTaltNrtgType,
  saveJob,
} from "../../stores/jobManagement/jobManagement.service";
import { CodeMngModel } from "../../stores/common/codeMng/codeMng.type";
import { getCodeMngByUpCdId } from "../../stores/common/codeMng/codeMng.service";
import { UP_CD_ID_USE_YN } from "../../constants/common.const";
import TextArea from "../../components/common/input/TextArea.vue";

export default {
  name: "ModalForm",
  components: {
    GridComponentV2,
    ButtonGridComponent,
    TextArea,
  },
  setup() {
    const { t } = useI18n();
    const cmn = commonStore();
    return { t, cmn };
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
    jobSeq: {
      type: String,
    },
    fetchData: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      dataDetail: {} as JobDetailModel,
      listTaltNrtgType: [
        { cdId: "", cdNm: this.t("common.select") },
      ] as Array<CodeMngModel>,
      listUseYn: [],
    };
  },
  computed: {
    isRequiredValidate() {
      const { check } = this.cmn;
      const taltNrtgTypeSeq = this.dataDetail.taltNrtgTypeSeq;

      return check || !taltNrtgTypeSeq;
    },
  },
  watch: {
    isOpen(newValue) {
      if (newValue) {
        this.getListTaltNrtgType();
        this.getCodeUseYn();
        this.getDataDetail();
      } else {
        this.reset();
      }
    },
  },
  methods: {
    getDataDetail() {
      this.cmn.setLoading(true);
      detailJob({ jobSeq: this.jobSeq }).then((res) => {
        this.dataDetail = res.data.data;
        this.cmn.setLoading(false);
      });
    },
    async getListTaltNrtgType() {
      const res = await getListTaltNrtgType();
      res.data.data.forEach((item) => {
        let obj = {
          cdId: item.taltNrtgTypeSeq,
          cdNm: item.typeNm,
        };
        this.listTaltNrtgType.push(obj);
      });
    },
    getCodeUseYn() {
      getCodeMngByUpCdId({
        upCdId: UP_CD_ID_USE_YN,
      }).then((res) => {
        this.listUseYn = res.data.data;
      });
    },
    reset() {
      this.dataDetail = {};
      this.listTaltNrtgType = [{ cdId: "", cdNm: this.t("common.select") }];
    },
    confirmSave() {
      if (this.isRequiredValidate) {
        this.$swal({
          text: this.t("common.messageValidateRequired"),
          type: "warning",
          showCancelButton: true,
          showConfirmButton: false,
          cancelButtonText: this.t("common.confirm"),
        }).then(() => {});
        return;
      }
      this.$swal({
        text: this.t("common.message.save"),
        type: "warning",
        showCancelButton: true,
        confirmButtonText: this.t("common.save"),
        cancelButtonText: this.t("common.cancel"),
      }).then((result: any) => {
        if (result.isConfirmed) {
          this.saveData();
        }
      });
    },
    saveData() {
      this.cmn.setLoading(true);
      saveJob(this.dataDetail)
        .then((res) => {
          this.$swal({
            text: this.t("common.message.saveSuccess"),
            type: "success",
            showCancelButton: false,
            showConfirmButton: true,
            confirmButtonText: this.t("common.confirm"),
          }).then(() => {
            this.onClose();
            this.fetchData()
          });
        })
        .catch((error) => {
          if (error.response.status === 400) {
            this.$swal({
              text: this.t(
                "jobManagement.validateMes"
              ),
              type: "success",
              showCancelButton: true,
              showConfirmButton: false,
              cancelButtonText: this.t("common.cancel"),
            });
          }
        })
        .finally(() => {
          this.cmn.setLoading(false);
        });
    },
  },
};
</script>
