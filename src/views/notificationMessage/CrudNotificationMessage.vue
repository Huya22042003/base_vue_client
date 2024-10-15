<template>
  <section id="content" class="content_wrapper grid_content" tabindex="0">
    <div class="box dp_block">
      <div class="divide_box">
        <div class="box">
          <div class="btn_receiver flex justify-between items-center">
            <div>
              <p class="box_title_sm">
                {{ t("09.notificationMessage.form.subTitle") }}
              </p>
            </div>
            <div>
              <button
                type="button"
                class="button btn_xs btn_blue btn_responsive mr-2"
                @click="openModal()"
              >
                {{ t("09.notificationMessage.form.action.setting") }}
              </button>
              <button
                type="button"
                class="button btn_xs btn_gray btn_responsive mr-2"
                @click="confirmDetele()"
              >
                {{ t("09.notificationMessage.form.action.detete") }}
              </button>
              <button
                type="button"
                class="button btn_xs btn_gray btn_responsive mr-2"
                @click="resetData()"
              >
                {{ t("09.notificationMessage.form.action.reset") }}
              </button>
            </div>
          </div>
          <div class="box_section scroll_box mt-2">
            <p class="box_title_sm mt-5">총 {{ rowData.length }}명</p>
            <table class="tbl_col tbl_hover">
              <caption></caption>
              <colgroup>
                <col style="width: 5%" />
                <col style="width: 18%" />
                <col style="width: 18%" />
                <col style="width: 18%" />
                <col style="width: 18%" />
                <col style="width: 18%" />
              </colgroup>
              <thead>
                <tr>
                  <th scope="col">
                    <div v-if="rowData.length != 0">
                      <p class="check_only">
                        <input
                          type="checkbox"
                          id="table_check_all"
                          name="tablecheck"
                          class="checked_all"
                          @change="toggleSelectAll"
                          :checked="isAllSelected"
                        />
                        <label for="table_check_all">check_only</label>
                      </p>
                    </div>
                  </th>
                  <th scope="col">
                    {{ t("09.notificationMessage.form.table.faculty") }}
                  </th>
                  <th scope="col">
                    {{ t("09.notificationMessage.form.table.year") }}
                  </th>
                  <th scope="col">
                    {{ t("09.notificationMessage.form.table.studentCode") }}
                  </th>
                  <th scope="col">
                    {{ t("09.notificationMessage.form.table.gender") }}
                  </th>
                  <th scope="col">
                    {{ t("09.notificationMessage.form.table.name") }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  class="check"
                  v-for="(item, index) in rowData"
                  :key="item.stdId"
                >
                  <th scope="row">
                    <p class="check_only">
                      <input
                        type="checkbox"
                        :id="'table_check_' + index"
                        name="tablecheck"
                        class="checked"
                        v-model="item.selected"
                      />
                      <label :for="'table_check_' + index">check_only</label>
                    </p>
                  </th>
                  <td>{{ item.deptNm }}</td>
                  <td>{{ item.gradeNm }}</td>
                  <td>{{ item.stdId }}</td>
                  <td>{{ item.sexNm }}</td>
                  <td>{{ item.userNm }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="box">
          <div class="box_section">
            <p class="box_title_sm">
              {{ t("09.notificationMessage.form.form.title") }}
            </p>
            <table class="tbl_row">
              <caption>
                {{
                  t("09.notificationMessage.form.form.title")
                }}
              </caption>
              <colgroup>
                <col style="width: 18%" />
                <col style="width: auto" />
              </colgroup>
              <tbody>
                <tr>
                  <th scope="row">
                    <p class="required">
                      {{ t("09.notificationMessage.form.form.topic") }}
                    </p>
                  </th>
                  <td class="td_input">
                    <InputBase
                      required
                      :id="'topic'"
                      v-model="detailModelNo.ttl"
                    />
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <p class="required">
                      {{ t("09.notificationMessage.form.form.content") }}
                    </p>
                  </th>
                  <td class="td_input">
                    <TextArea
                      v-model="detailModelNo.cont"
                      id="textArea_validate"
                      required
                      placeholder="placeholder"
                    ></TextArea>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    {{ t("09.notificationMessage.form.form.file") }}
                  </th>
                  <td colspan="3">
                    <InputFileBase
                      :referKey="noticeIdModel.altkSeq"
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
                    ></InputFileBase>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="flex items-center justify-between mt-2">
            <div class="flex items-center ml-2">
              <div class="mr-2 flex items-center">
                <input
                  type="checkbox"
                  v-model="checkSleep"
                  id="checkSleep"
                  @change="handleChangeCheckSleep"
                />
              </div>
              <label for="checkSleep" class="" style="text-wrap: nowrap">{{
                t("09.notificationMessage.form.action.settingSleep")
              }}</label>
              <div class="flex items-center ml-4" v-if="checkSleep">
                <BaseDatePicker v-model="dateModel" :mode="'show'" />
                <div class="ml-2 wd_100">
                  <SelectBoxBase
                    :id="'selectboxHH'"
                    :name="'selectboxHH'"
                    :data="listSelectBoxHH"
                    v-model="hourModel"
                  ></SelectBoxBase>
                </div>
                <div class="ml-2 wd_100">
                  <SelectBoxBase
                    :id="'selectboxMM'"
                    :name="'selectboxMM'"
                    :data="listSelectBoxMM"
                    v-model="minuteModel"
                  ></SelectBoxBase>
                </div>
              </div>
            </div>

            <button
              type="button"
              class="btn_round btn_xs btn_blue ml-2"
              style="text-wrap: nowrap"
              @click="confirmSave()"
            >
              {{ t("09.notificationMessage.form.action.send") }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <StudentModal
      v-if="modalOpen"
      :isOpen="modalOpen"
      @close-modal="closeModal"
      @select-item="handleSelectItem"
      :rowCheck="rowData"
    />
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import InputTextBase from "@/components/common/input/InputTextBase.vue";
import SelectBoxBase from "@/components/common/input/SelectBoxBase.vue";
import TextAreaBase from "@/components/common/input/TextAreaBase.vue";
import InputFileBase from "@/components/common/input/InputFileBase.vue";
import StudentModal from "./StudentModal.vue";
import {
  MODE_CREATE,
  FILE_TYPE_OFFICE,
  MODE_DETAIL,
  MODE_EDIT
} from "../../constants/screen.const";
import { commonStore } from "../../stores/common";
import type {
  StudentModel,
  NotiMessCreModel,
  NoticeIdModel,
  NoticeDetailModel,
} from "@/stores/noticeMessage/noticeMessage.type";
import {
  insertData,
  getDetailNotice,
} from "@/stores/noticeMessage/noticeMessage.service";
import BaseDatePicker from "@/components/common/datepicker/BaseDatePicker.vue";
import { format } from "date-fns";
import { SCREEN } from "../../router/screen";

export default defineComponent({
  components: {
    InputTextBase,
    SelectBoxBase,
    TextAreaBase,
    InputFileBase,
    StudentModal,
    BaseDatePicker,
  },
  setup() {
    const { t } = useI18n();
    const cmn = commonStore();
    return { t, cmn };
  },
  beforeMount() {
    this.modeScreen = this.$route.params.mode;
    this.noticeIdModel.altkSeq = window.history.state.id;
    if (this.modeScreen == MODE_DETAIL) {
      this.modFile = MODE_EDIT;
    }
  },

  data() {
    let listSelectBoxHH = Array.from({ length: 24 }, (_, index) => ({
      cdId: index,
      upCdId: index.toString(),
      cdNm: index.toString().padStart(2, "0"),
    }));
    let listSelectBoxMM = Array.from({ length: 60 }, (_, index) => ({
      cdId: index.toString(),
      upCdId: index.toString(),
      cdNm: index.toString().padStart(2, '0'),
    }));
    return {
      pageTitle: this.t("09.notificationMessage.title"),
      rowData: [] as Array<StudentModel>,
      checkSleep: false,
      dateModel: "",
      hourModel: 0 as number,
      minuteModel: 0 as number,
      listSelectBoxHH: listSelectBoxHH,
      listSelectBoxMM: listSelectBoxMM,
      modalOpen: false,
      noticeMessageCre: {} as NotiMessCreModel,
      noticeIdModel: {} as NoticeIdModel,
      modFile: MODE_CREATE,
      fileTypeOffice: FILE_TYPE_OFFICE,
      sectionName: "NOTICEMESSAGE",
      fileArr: [],
      dateString: {} as Date,
      isCheck: false,
      modeScreen: "",
      detailModelNo: {} as NoticeDetailModel,
      sendDateString: {} as Date,
      dateNow: new Date(),
    };
  },
  computed: {
    isAllSelected(): boolean {
      return (
        this.rowData.length > 0 && this.rowData.every((item) => item.selected)
      );
    },
  },
  watch: {
  detailModelNo: {
    handler: "checkValid",
    deep: true,
  },
  dateModel(newValue) {
    if(this.modeScreen != 'detail'){
      if (!this.dateNow) {
      this.dateModel = newValue;
    } else {
      const dStart = this.formatDate(newValue);
      const dEnd = this.formatDate(this.dateNow);
      const currentTime = new Date();
      if (dStart < dEnd) {
        this.$nextTick(() => {
          this.dateModel = this.formatDate(this.dateNow);
          this.$swal({
            text: "발송일은 금일보다 빠를 수 없습니다. ",
            type: "warning",
            showCancelButton: false,
            showConfirmButton: true,
          });
        });
      }
    }
    }

    this.checkValid();
  },
  checkSleep: {
    handler: "checkValid",
    immediate: true,
  },
  rowData: {
    handler() {
      this.checkValid();
    },
    deep: true,
    immediate: true,
  },
  },
  async mounted() {
    if (this.modeScreen == MODE_DETAIL) {
      this.cmn.setLoading(true);
      getDetailNotice(this.noticeIdModel)
        .then((res) => {
          this.detailModelNo = res.data.data;
          this.rowData = this.detailModelNo.studentDetailDTOS;
          if (this.detailModelNo.bkngSendDate) {
            this.checkSleep = true;
            let date = new Date(this.detailModelNo.bkngSendDate);
            let hour = date.getHours();
            let minute = date.getMinutes();
            this.dateModel = date;
            this.hourModel = hour;
            this.minuteModel = minute;
          }
        })
        .finally(() => {
          this.cmn.setLoading(false);
        });
    }
  },
  methods: {
    back() {
      this.$router.replace({ path: SCREEN.notificationMessage.path });
    },
    checkData(altkSeq: any) {
      const childComponent = this.$refs.childRef;
      childComponent.upLoadFile(altkSeq);
    },
    checkValid() {
    this.isCheck =
    !!this.detailModelNo.ttl &&
    !!this.detailModelNo.cont &&
    this.rowData.length !== 0;

    if (this.checkSleep) {
    this.isCheck = this.isCheck && !!this.dateModel;
    }
    },
    closeModal() {
      this.modalOpen = false;
    },
    openModal() {
      this.modalOpen = true;
    },
    handleSelectItem(selectedItems: any) {
      this.rowData = selectedItems;
    },
    toggleSelectAll(event: Event) {
      const isChecked = (event.target as HTMLInputElement).checked;
      this.rowData.forEach((item) => {
        item.selected = isChecked;
      });
    },
    resetData() {
      this.rowData = [];
    },
    confirmDetele() {
      const count = (this.rowData.filter((item) => item.selected)).length;
      this.$swal({
        text: "선택 된 " + count + "명을 삭제 하시겠습니까?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "확인",
        cancelButtonText: "취소",
      }).then((result: any) => {
        if (result.isConfirmed) {
          this.deleteSelectedRows();
        }
      });
    },
    deleteSelectedRows() {
      this.rowData = this.rowData.filter((item) => !item.selected);
      this.$swal({
        text: "삭제 되었습니다",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: this.t("common.confirm"),
        cancelButtonText: this.t("common.cancel"),
      });
    },
    confirmSave() {

          if (this.checkSleep) {
            this.dateString = new Date(this.dateModel);
            this.dateString.setHours(this.hourModel);
            this.dateString.setMinutes(this.minuteModel);
            this.dateString = format(this.dateString, "yyyy-MM-dd HH:mm:ss.SSS");
            this.noticeMessageCre.bkngSendDate = this.dateString;
          } else{
            this.sendDateString = new Date();
            this.sendDateString = format(this.sendDateString, "yyyy-MM-dd HH:mm:ss.SSS");
            this.noticeMessageCre.sendDate = this.sendDateString
          }
          const currentTime = new Date();
          const futureTime = new Date(currentTime);
          futureTime.setMinutes(currentTime.getMinutes() + 30);
          const dateToCheck = new Date(this.dateString);
        if(dateToCheck  < futureTime){
          this.$swal({
            text: "발송예약시간은 지금 시간보다 30분부터 늦어야 됩니다.   ",
            type: "warning",
            showCancelButton: false,
            showConfirmButton: true,
          });
        }else{
          this.$swal({
            text: this.checkSleep ?  this.dateString+"에 예약발송 하시겠습니까?" : "발송하시겠습니까?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: this.t("common.confirm"),
            cancelButtonText: this.t("common.cancel"),
          }).then((result: any) => {
            if (result.isConfirmed) {
              this.saveData();
            }
          })

        }


    },
    async saveData() {
      this.cmn.setLoading(true);
      this.rowData.forEach((item, index) => {
        if (!this.noticeMessageCre.allimTalkTarMenCreDTOList) {
          this.noticeMessageCre.allimTalkTarMenCreDTOList = [];
        }
        if (!this.noticeMessageCre.allimTalkTarMenCreDTOList[index]) {
          this.noticeMessageCre.allimTalkTarMenCreDTOList[index] = {};
        }
        this.noticeMessageCre.allimTalkTarMenCreDTOList[index].targMembNo =
          item.stdId;
        this.noticeMessageCre.allimTalkTarMenCreDTOList[index].rcptYn =
          item.selected ? "Y" : "N";
      });
      this.noticeMessageCre.ttl = this.detailModelNo.ttl;
      this.noticeMessageCre.cont = this.detailModelNo.cont;
      await insertData(this.noticeMessageCre).then((res) => {
        this.checkData(res.data.data);

      });
      this.cmn.setLoading(false);

      await this.$swal({
        text: "발송 되었습니다",
        type: "warning",
        showCancelButton: false,
        confirmButtonText: this.t("common.confirm"),
      }).then((result: any) => {
        if (result.isConfirmed) {
          this.back()
        }
      });
    },
    handleChangeCheckSleep() {
      if (!this.checkSleep) {
        this.dateModel = "";
        this.hourModel = 0;
        this.minuteModel = 0
      }
    },
    formatDate(date: any) {
      const originalDate = new Date(date)
      const year = originalDate.getFullYear()
      const month = String(originalDate.getMonth() + 1).padStart(2, '0')
      const day = String(originalDate.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
    },
  },
});
</script>
<style>
.scroll_box {
  max-height: 400px;
  overflow-y: auto;
}
.flex {
  display: flex;
}

.items-center {
  align-items: center;
}

.justify-between {
  justify-content: space-between;
}

.mr-2 {
  margin-right: 0.5rem;
}

.ml-4 {
  margin-left: 1rem;
}

.ml-2 {
  margin-left: 0.5rem;
}

.wd_100 {
  width: 100%;
}
</style>
