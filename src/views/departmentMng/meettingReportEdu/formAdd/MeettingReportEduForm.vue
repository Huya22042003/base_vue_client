<template>
  <div class="page_wrapper">
    <section id="content" class="content_wrapper grid_content" tabindex="0">
      <Breadcrumb
        :pageTitle="pageTitle"
        :breadcrumbItems="breadcrumbItems"
      ></Breadcrumb>

      <div class="box dp_block">
        <div class="box_section">
          <p class="box_title_sm">
            {{ t("departmentMng.meettingReportEdu.form.title") }}
          </p>
          <table class="tbl_row">
            <colgroup>
              <col style="width: 18%" />
              <col style="width: auto" />
            </colgroup>
            <tbody>
              <!-- dept -->
              <tr>
                <th scope="row">
                  <p class="required">
                    {{ t("departmentMng.meettingReportEdu.form.dept") }}
                  </p>
                </th>
                <td class="td_input" colspan="6">
                  <div class="wd_p30">
                    <SelectBoxBase
                      :id="'deptCd'"
                      :name="'deptCd'"
                      v-model="dataForm.deptCd"
                      :data="listSelectBoxDept"
                      required
                    >
                    </SelectBoxBase>
                  </div>
                </td>
              </tr>
              <!-- category job -->
              <tr>
                <th scope="row">
                  <p class="required">
                    {{ t("departmentMng.meettingReportEdu.form.job") }}
                  </p>
                </th>
                <td class="td_input" colspan="6">
                  <div class="wd_p30">
                    <SelectBoxBase
                      :id="'bsinesDivCd'"
                      :name="'bsinesDivCd'"
                      v-model="dataForm.bsinesDivCd"
                      :data="listSelectBoxJob"
                      required
                    >
                    </SelectBoxBase>
                  </div>
                  <div class="mt-5" v-if="displayTextInput">
                    <InputBase v-model="dataForm.bsinesDivEtc" />
                  </div>
                </td>
              </tr>
              <!-- edu year -->
              <tr v-if="displayYear">
                <th scope="row">
                  <p class="required">
                    {{ t("departmentMng.meettingReportEdu.form.yearEdu") }}
                  </p>
                </th>
                <td class="td_input" colspan="6">
                  <div class="wd_p30">
                    <SelectBoxBase
                      :id="'year'"
                      :name="'year'"
                      v-model="dataForm.year"
                      :data="listSelectBox"
                      required
                    >
                    </SelectBoxBase>
                  </div>
                </td>
              </tr>
              <!-- topic -->
              <tr>
                <th scope="row">
                  <p class="required">
                    {{ t("departmentMng.meettingReportEdu.form.topic") }}
                  </p>
                </th>
                <td class="td_input" colspan="6">
                  <InputBase v-model="dataForm.sbjt" :id="'sbjt'" required />
                </td>
              </tr>
              <!-- meeting day -->
              <tr>
                <th scope="row">
                  <p class="required">
                    {{ t("departmentMng.meettingReportEdu.form.meettingDate") }}
                  </p>
                </th>
                <td class="td_input" colspan="6">
                  <div class="search_daywrap flex_fit wd_p100">
                    <div class="wd_p50 mr-5">
                      <BaseDatePicker
                        v-model="dataForm.meetDate"
                        required
                      ></BaseDatePicker>
                    </div>
                    <div class="search_daywrap flex_fit wd_p100">
                      <div class="wd_100">
                        <SelectBoxBase
                          v-model="timeHourStr"
                          :data="selectOptionHour.type"
                        />
                      </div>
                      <div class="wd_100">
                        <SelectBoxBase
                          v-model="timeMinuteStr"
                          :data="selectOptionMinute.type"
                        />
                      </div>
                      <p class="input_tilde">~</p>
                      <div class="wd_100">
                        <SelectBoxBase
                          v-model="timeHourEnd"
                          :data="selectOptionHour.type"
                        />
                      </div>
                      <div class="wd_100">
                        <SelectBoxBase
                          v-model="timeMinuteEnd"
                          :data="selectOptionMinute.type"
                        />
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <!-- writer -->
              <tr>
                <th scope="row">
                  <p class="required">
                    {{ t("departmentMng.meettingReportEdu.form.writer") }}
                  </p>
                </th>
                <td class="td_input" colspan="6">
                  <InputBase
                    maxlength="100"
                    v-model="dataForm.writer"
                    required
                    id="writer"
                  />
                </td>
              </tr>
              <!-- location -->
              <tr>
                <th scope="row">
                  <p class="required">
                    {{ t("departmentMng.meettingReportEdu.form.location") }}
                  </p>
                </th>
                <td class="td_input" colspan="6">
                  <InputBase
                    maxlength="100"
                    v-model="dataForm.loc"
                    required
                    id="loc"
                  />
                </td>
              </tr>
              <!-- cost -->
              <tr>
                <th scope="row">
                  <p class="required">
                    {{ t("departmentMng.meettingReportEdu.form.cost") }}
                  </p>
                </th>
                <td class="td_input" colspan="6">
                  <InputBase
                    maxlength="100"
                    v-model="dataForm.cost"
                    required
                    id="cost"
                  />
                </td>
              </tr>
              <!-- issue meeting -->
              <tr>
                <th scope="row">
                  <p class="required">
                    {{ t("departmentMng.meettingReportEdu.form.purpose") }}
                  </p>
                </th>
                <td class="td_input" colspan="6">
                  <TextArea
                    maxlength="1000"
                    v-model="dataForm.agnd"
                    :id="`purpose`"
                    required
                  ></TextArea>
                </td>
              </tr>
              <!-- content -->
              <tr>
                <th scope="row">
                  <p class="required">
                    {{
                      t("departmentMng.meettingReportEdu.form.contentMeetting")
                    }}
                  </p>
                </th>
                <td class="td_input" colspan="6">
                  <TextArea
                    maxlength="1000"
                    v-model="dataForm.vote"
                    :id="`cont`"
                    required
                  ></TextArea>
                </td>
              </tr>
              <!-- participant -->
              <tr>
                <th scope="row" :rowspan="listTeacher.length + 1">
                  <p class="required">
                    {{ t("departmentMng.meettingReportEdu.form.listTeacher") }}
                  </p>
                </th>
                <th class="border_td ta_c">
                  {{ t("departmentMng.meettingReportEdu.form.category") }}
                </th>
                <th class="border_td ta_c">
                  {{ t("departmentMng.meettingReportEdu.form.name") }}
                </th>
                <th class="border_td ta_c">
                  {{ t("departmentMng.meettingReportEdu.form.position") }}
                </th>
                <th class="border_td ta_c">
                  {{ t("departmentMng.meettingReportEdu.form.department") }}
                </th>
                <th class="border_td ta_c">
                  {{ t("departmentMng.meettingReportEdu.form.management") }}
                </th>
              </tr>
              <!-- Tearch -->
              <tr v-for="(teacher, index) in listTeacher" :key="index">
                <td class="wd_p15 border_td">
                  <SelectBoxBase
                    :id="`participant_${index}`"
                    :name="`participant_${index}`"
                    v-model="teacher.divCd"
                    :data="listSelectBoxParti"
                    required
                  >
                  </SelectBoxBase>
                </td>
                <td class="wd_p17 border_td">
                  <div class="dp_flex w-full" v-if="teacher.divCd == teacherCd">
                    <div class="mr-5 flex-[7] wd_p85">
                      <InputBase
                        v-model="teacher.name"
                        :id="`input_teacher_${index}`"
                        readonly
                        required
                      />
                    </div>
                    <div class="dp_flex al_center flex-[2] wd_p35">
                      <button
                        v-if="teacher.divCd == teacherCd"
                        class="button btn_xs btn_medium_gray border_medium_gray bo_rd6 font_base_2"
                        @click="openModalAddTeach(index)"
                      >
                        {{ t("common.add") }}
                      </button>
                    </div>
                  </div>
                  <div class="dp_flex w-full" v-else>
                    <InputBase
                      v-model="teacher.name"
                      :id="`input_teacher_${index}`"
                      required
                    />
                  </div>
                </td>
                <td class="wd_p17 border_td" v-if="teacher.divCd == teacherCd">
                  {{ teacher.position }}
                </td>
                <td v-else>
                  <InputBase
                    :id="`teacherPosi_${index}`"
                    v-model="teacher.position"
                    required
                  />
                </td>
                <td class="wd_p17 border_td">
                  <InputBase
                    :id="`teacherDepart_${index}`"
                    v-model="teacher.department"
                    required
                  />
                </td>
                <td class="wd_p8 border_td">
                  <button
                    v-if="index == 0"
                    class="button btn_xs btn_medium_gray border_medium_gray bo_rd6 font_base_2"
                    @click="addTeacher()"
                  >
                    {{ t("common.add") }}
                  </button>
                  <button
                    v-if="index != 0"
                    class="button btn_xs btn_medium_gray border_medium_gray bo_rd6 font_base_2"
                    @click="deleteTeacher(index)"
                  >
                    {{ t("common.delete") }}
                  </button>
                </td>
              </tr>
              <!-- file attack -->
              <tr>
                <th scope="row">
                  {{ t("departmentMng.meettingReportEdu.form.meettingFile") }}
                </th>
                <td class="td_input" colspan="6">
                  <InputFileBase
                    :referKey="docuSeq"
                    :mode="modefile"
                    id="imageFile"
                    name="imageFile"
                    :type="fileTypeImg"
                    v-model="fileImage"
                    ref="imageRef"
                    :orgName="'meeting_report'"
                    :category="'meeting_report'"
                    :sectionName="'meeting_report'"
                    :multiple="true"
                    :maxFile="3"
                    :subTitle="'※ 10mb 이하의 파일 세 개 등록 가능합니다.'"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- content detail -->
        <div class="box_section mt-10">
          <p class="box_title_sm">
            {{ t("departmentMng.meettingReportEdu.form.contentDetail") }}
          </p>
          <div>
            <QuillEditor
              :modules="modules"
              toolbar="full"
              @editorChange="changeEditor()"
              ref="myEditor"
            />
          </div>
        </div>

        <div class="box_section">
          <div class="dp_flex btn_group btn_end mt_8" style="gap: 10px">
            <button
              type="button"
              v-if="modeScreen == 'detail'"
              class="btn_round btn_gray btn_md"
            >
              {{ t("common.print") }}
            </button>
            <button
              type="button"
              class="btn_round btn_primary btn_md"
              @click="save()"
            >
              {{ t("common.save") }}
            </button>
            <button
              v-if="modeScreen == 'detail'"
              type="button"
              class="btn_round btn_gray btn_md"
              @click="updateDeleteFlag()"
            >
              <!-- 작제 -->
              {{ t("common.delete") }}
            </button>
            <button
              type="button"
              class="btn_round btn_white btn_md"
              @click="back()"
            >
              {{ t("common.list") }}
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
  <AddTeacherModal
    v-if="isOpenModalAddTeacher"
    :isOpen="isOpenModalAddTeacher"
    @teacher-selected="selectTeacher"
    :lstIdSelect="lstTeacherId"
    :onClose="closeModalAddTeach"
  ></AddTeacherModal>
</template>

<script lang="ts">
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import { commonStore } from "@/stores/common";
import {
  PAGINATION_PAGE_SIZE_SELECTOR,
  PAGINATION_PAGE_SIZE,
  MODE_DETAIL,
  MODE_SHOW,
  SUCCSESS_STATUS,
  MODE_CREATE,
  FILE_TYPE_OFFICE,
} from "@/constants/screen.const";
import GridComponent from "@/components/common/grid/GridComponent.vue";
import { SCREEN } from "@/router/screen";
import InputBase from "@/components/common/input/InputBase.vue";
import { useI18n } from "vue-i18n";
import AddTeacherModal from "../modal/AddTeacherModal.vue";
import AddStudentModal from "../modal/AddStudentModal.vue";
import BaseDatePicker from "@/components/common/datepicker/BaseDatePicker.vue";
import Swal from "sweetalert2";
import { meetReportEduStore } from "@/stores/departmentService/meettingReportEdu";
import {
  MeetReportEduReqDTO,
  MeetReportEduResDTO,
} from "@/stores/departmentService/meettingReportEdu/meettingReportEdu.type";
import { MESSAGE_ERROR_API } from "@/constants/common.const";
import ImageUploader from "quill-image-uploader";
import { uploadFileEditor } from "@/stores/common/fileMng/fileMng.service";
import InputFileBase from "@/components/common/input/InputFileBase.vue";
import { getDepartmentList } from "@/stores/common/department/department.service";
import {
  DIV_CD_DEPT_DEPART,
  UP_CD_ID_MEET_ATTE,
  UP_CD_ID_BSINES,
} from "@/constants/common.const";
import { MODE_EDIT } from "@/constants/screen.const";
import { getListCodeMng } from "@/stores/common/codeMng/codeMng.service";
import { CodeMngModel } from "@/stores/common/codeMng/codeMng.type";
import {
  CD_ID_BSINES1,
  CD_ID_BSINES3,
  CD_ID_MEET_ATTE1,
  CD_ID_MEET_ATTE2,
} from "@/constants/common.const";

export default {
  components: {
    Breadcrumb,
    GridComponent,
    InputBase,
    AddTeacherModal,
    AddStudentModal,
    BaseDatePicker,
    InputFileBase,
  },
  data() {
    return {
      /* '교육과정 회의록' */
      pageTitle: this.t("departmentMng.meettingReportEdu.title"),
      breadcrumbItems: [
        {
          /* 'HOME' */
          label: this.t("departmentMng.meettingReportEdu.breadcrumb.01"),
          link: "/",
        },
        {
          /* '학과정보 관리' */
          label: this.t("departmentMng.meettingReportEdu.breadcrumb.02"),
          link: "#",
        },
        {
          /* '교육과정 회의록' */
          label: this.t("departmentMng.meettingReportEdu.breadcrumb.03"),
          link: SCREEN.majorLowerGradeFormDept.path,
        },
      ],
      modeScreen: "" as any,
      mode: MODE_SHOW,
      paginationPageSize: PAGINATION_PAGE_SIZE,
      paginationPageSizeSelector: PAGINATION_PAGE_SIZE_SELECTOR,
      dataForm: {
        majorNm: "",
        deptNm: "",
      } as MeetReportEduResDTO,
      dataReq: {} as MeetReportEduReqDTO,
      isOpenModalAddTeacher: false,
      teacherIndexSelected: -1,
      listSelectBox: [
        { cdId: "", cdNm: this.t("common.all"), upCdId: "" },
      ] as Array<any>,
      docuSeq: "",
      lstTeacherId: [] as Array<String>,
      listTeacher: [
        {
          id: "",
          name: "",
          position: "",
          department: "",
          divCd: CD_ID_MEET_ATTE1,
        },
      ],
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
      modefile: MODE_CREATE,
      fileImage: [],
      fileTypeImg: FILE_TYPE_OFFICE,
      listSelectBoxDept: [] as Array<any>,
      listSelectBoxJob: [] as Array<any>,
      listSelectBoxParti: [] as Array<any>,
      displayYear: false,
      selectOptionHour: {
        value: "0",
        type: Array.from({ length: 24 }, (v, k) => ({
          cdId: k.toString(),
          cdNm: k.toString(),
          upCdId: "hour",
        })),
      },
      selectOptionMinute: {
        value: "0",
        type: Array.from({ length: 60 }, (v, k) => ({
          cdId: k.toString(),
          cdNm: k.toString(),
          upCdId: "minute",
        })),
      },
      displayTextInput: false,
      displaySme: false,
      timeHourStr: "",
      timeHourEnd: "",
      timeMinuteStr: "",
      timeMinuteEnd: "",
      teacherCd: CD_ID_MEET_ATTE1,
    };
  },

  setup() {
    const { t } = useI18n();
    const storeCommon = commonStore();
    const storeMeetReportEdu = meetReportEduStore();

    return {
      t,
      storeCommon,
      storeMeetReportEdu,
    };
  },

  beforeMount() {
    this.getDataAll();
  },

  methods: {
    checkData(metlSeq: any) {
      const childComponent = this.$refs.imageRef;
      childComponent.upLoadFile(metlSeq);
    },

    async getDataAll() {
      try {
        this.modeScreen = Array.isArray(this.$route.params.mode)
          ? this.$route.params.mode[0]
          : this.$route.params.mode;
        this.docuSeq = window.history.state.id;
        if (this.modeScreen == MODE_DETAIL) {
          this.mode = MODE_DETAIL;
          this.modefile = MODE_EDIT;
        }

        await Promise.all([
          this.getListSelectEduYear(),
          this.getDetailData(),
          this.getListSelectDept(),
          this.getCodeMng(),
        ]);
      } catch (e) {
        throw new Error(MESSAGE_ERROR_API);
      }
    },

    async getCodeMng() {
      await getListCodeMng({
        upCdIdList: [UP_CD_ID_BSINES, UP_CD_ID_MEET_ATTE],
      }).then((res) => {
        this.listSelectBoxJob = res.data.data.filter(
          (el: CodeMngModel) => el.upCdId == UP_CD_ID_BSINES
        );

        this.listSelectBoxParti = res.data.data.filter(
          (el: CodeMngModel) =>
            el.upCdId == UP_CD_ID_MEET_ATTE && el.cdId !== CD_ID_MEET_ATTE2
        );
      });

      this.listSelectBoxJob.unshift({
        cdId: "",
        cdNm: this.t("common.select"),
        upCdId: UP_CD_ID_BSINES,
      });
    },

    getListSelectEduYear() {
      const currentYear = new Date().getFullYear();
      this.listSelectBox = [
        ...this.listSelectBox,
        { cdId: currentYear - 1, cdNm: currentYear - 1, upCdId: "" },
        { cdId: currentYear, cdNm: currentYear, upCdId: "1" },
        { cdId: currentYear + 1, cdNm: currentYear + 1, upCdId: "1" },
      ];
    },

    async getDetailData() {
      if (this.docuSeq) {
        this.storeCommon.setLoading(true);

        await this.storeMeetReportEdu.getDetailMeetReportEdu(this.docuSeq);
        if (
          this.storeMeetReportEdu.status &&
          this.storeMeetReportEdu.status == SUCCSESS_STATUS
        ) {
          this.dataForm = this.storeMeetReportEdu.resultData;

          const [startTime, endTime] = this.dataForm.meetTime.split("|");

          const [timeHourStr, timeMinuteStr] = startTime.split(":");
          const [timeHourEnd, timeMinuteEnd] = endTime.split(":");

          this.timeHourStr = parseInt(timeHourStr, 10).toString();
          this.timeMinuteStr = parseInt(timeMinuteStr, 10).toString();
          this.timeHourEnd = parseInt(timeHourEnd, 10).toString();
          this.timeMinuteEnd = parseInt(timeMinuteEnd, 10).toString();

          this.$refs.myEditor.setHTML(this.dataForm.cont);

          this.listTeacher =
            this.storeMeetReportEdu.resultData.listMeetAtte.map((item: any) => {
              return {
                id: item.atteSeq,
                name: item.nm,
                position: item.posi,
                department: item.aff,
                divCd: item.divCd,
              };
            });
          if (this.listTeacher && this.listTeacher.length == 0) {
            this.listTeacher.push({
              id: "",
              department: "",
              name: "",
              position: "",
              divCd: CD_ID_MEET_ATTE1,
            });
          }
        }
        this.storeCommon.setLoading(false);
      }
    },

    changeEditor() {
      // Get content
      let content = this.$refs.myEditor
        .getHTML()
        .toString()
        .replace("<p><br></p>", "");
      this.dataForm.cont = content;
    },

    //alert
    showAlert(message: string) {
      Swal.fire({
        text: message,
        showConfirmButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: this.t("common.save"),
      });
    },

    back() {
      this.$router.push({ path: SCREEN.meettingReportEdu.path });
    },

    openModalAddTeach(index: number) {
      this.teacherIndexSelected = index;
      this.lstTeacherId = this.listTeacher
        .filter((item) => item.id != "")
        .map((item) => item.id);
      this.isOpenModalAddTeacher = true;
    },

    closeModalAddTeach() {
      this.isOpenModalAddTeacher = false;
    },

    addTeacher() {
      this.listTeacher.push({
        id: "",
        name: "",
        position: "",
        department: "",
        divCd: CD_ID_MEET_ATTE1,
      });
    },

    deleteTeacher(index: number) {
      this.$swal({
        text: this.t("departmentMng.meettingReportEdu.message.confirmDelete"),
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: this.t("common.delete"),
        cancelButtonText: this.t("common.cancel"),
      }).then((result) => {
        if (result.isConfirmed) {
          this.storeCommon.setLoading(true);
          this.listTeacher.splice(index, 1);
          this.showAlert(
            this.t("departmentMng.meettingReportEdu.message.deleteSuccess")
          );
          this.storeCommon.setLoading(false);
        }
      });
    },

    selectTeacher(data: any) {
      this.listTeacher[this.teacherIndexSelected] = data;
    },

    getListMeetAtte(listForm: Array<any>) {
      listForm.map((item) => {
        let meetAtteData = {
          atteSeq: item.id,
          nm: item.name,
          posi: item.position,
          aff: item.department,
          divCd: item.divCd,
        };

        this.dataReq.listMeetAtte.push(meetAtteData);
      });
    },

    getFormData() {
      this.dataReq = {
        docuSeq: this.dataForm.docuSeq,
        year: this.dataForm.year,
        agnd: this.dataForm.agnd,
        meetDate: this.dataForm.meetDate,
        deptCd: this.dataForm.deptCd,
        meetTime: this.dataForm.meetTime,
        loc: this.dataForm.loc,
        cont: this.dataForm.cont,
        bsinesDivCd: this.dataForm.bsinesDivCd,
        bsinesDivEtc: this.dataForm.bsinesDivEtc,
        sbjt: this.dataForm.sbjt,
        cost: this.dataForm.cost,
        vote: this.dataForm.vote,
        writer: this.dataForm.writer,
        listMeetAtte: [],
      } as MeetReportEduReqDTO;

      if (this.dataForm.bsinesDivCd !== CD_ID_BSINES1) {
        this.dataReq.year = null;
      }

      if (this.dataForm.bsinesDivCd !== CD_ID_BSINES3) {
        this.dataReq.bsinesDivEtc = null;
      }

      const hourStr = this.timeHourStr.toString().padStart(2, "0");
      const minuteStr = this.timeMinuteStr.toString().padStart(2, "0");

      const hourEnd = this.timeHourEnd.toString().padStart(2, "0");
      const minuteEnd = this.timeMinuteEnd.toString().padStart(2, "0");

      this.dataReq.meetTime = `${hourStr}:${minuteStr}|${hourEnd}:${minuteEnd}`;

      this.getListMeetAtte(this.listTeacher);
    },

    save() {
      if (this.storeCommon.check) {
        this.$swal.fire({
          text: this.t("common.messageValidateRequired"),
          confirmButtonColor: "#DD6B55",
          confirmButtonText: this.t("common.save"),
        });
        return;
      }
      this.$swal({
        text: this.t("departmentMng.meettingReportEdu.message.confirmSave"),
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: this.t("common.save"),
        cancelButtonText: this.t("common.cancel"),
      }).then(async (result) => {
        if (result.isConfirmed) {
          this.getFormData();

          this.storeCommon.setLoading(true);

          if (this.modeScreen == MODE_CREATE) {
            await this.storeMeetReportEdu.createMeetReportEdu(this.dataReq);
          } else {
            await this.storeMeetReportEdu.updateMeetReportEdu(this.dataReq);
          }

          if (
            this.storeMeetReportEdu.status &&
            this.storeMeetReportEdu.status == SUCCSESS_STATUS
          ) {
            this.checkData(this.storeMeetReportEdu.resultData.docuSeq);
            Swal.fire({
              text: this.t(
                "departmentMng.meettingReportEdu.message.saveSuccess"
              ),
              showConfirmButton: true,
              confirmButtonColor: "#DD6B55",
              confirmButtonText: this.t("common.save"),
            }).then((result) => {
              if (result.isConfirmed) {
                this.back();
              }
            });
          }
          this.storeCommon.setLoading(false);
        }
      });
    },

    async updateDeleteFlag() {
      this.$swal({
        text: this.t("departmentMng.meettingReportEdu.message.deleteReport"),
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: this.t("common.save"),
        cancelButtonText: this.t("common.cancel"),
      }).then(async (result) => {
        if (result.isConfirmed) {
          this.storeCommon.setLoading(true);

          await this.storeMeetReportEdu.deleteMeetReportEdu(this.docuSeq);
          if (
            this.storeMeetReportEdu.status &&
            this.storeMeetReportEdu.status == SUCCSESS_STATUS
          ) {
            Swal.fire({
              text: this.t(
                "departmentMng.meettingReportEdu.message.deleteReportSuccess"
              ),
              showConfirmButton: true,
              confirmButtonColor: "#DD6B55",
              confirmButtonText: this.t("common.save"),
            }).then((result) => {
              if (result.isConfirmed) {
                this.back();
              }
            });
            this.storeCommon.setLoading(false);
          }
        }
      });
    },
    getListSelectDept() {
      this.storeCommon.setLoading(true);
      getDepartmentList({
        deptCd: [],
        deptDivCd: [DIV_CD_DEPT_DEPART],
        useYn: "",
      })
        .then((res) => {
          this.listSelectBoxDept = res.data.data.map((el) => {
            return {
              cdId: el.deptCd,
              cdNm: el.deptNm,
              upCdId: "dept",
            };
          });
          this.listSelectBoxDept.unshift({
            cdId: "",
            cdNm: this.t("common.all"),
            upCdId: "dept",
          });
        })
        .catch(() => {
          throw new Error(MESSAGE_ERROR_API);
        })
        .finally(() => {
          this.storeCommon.setLoading(false);
        });
    },
    validateTimeRange() {
      const startHour = parseInt(this.timeHourStr);
      const endHour = parseInt(this.timeHourEnd);
      const startMinute = parseInt(this.timeMinuteStr);
      const endMinute = parseInt(this.timeMinuteEnd);

      if (startHour && endHour && startHour > endHour) {
        this.showAlert(
          this.t("departmentMng.meettingReportEdu.message.validateTime")
        );
        this.timeHourEnd = this.timeHourStr;
        return;
      }

      if (
        startHour === endHour &&
        startMinute &&
        endMinute &&
        startMinute > endMinute
      ) {
        this.showAlert(
          this.t("departmentMng.meettingReportEdu.message.validateTime")
        );
        this.timeMinuteEnd = this.timeMinuteStr;
        return;
      }
    },
  },
  watch: {
    "dataForm.bsinesDivCd"(newVal) {
      this.displayYear = newVal === CD_ID_BSINES1;
      this.displayTextInput = newVal === CD_ID_BSINES3;

      if (!this.displayYear && newVal !== CD_ID_BSINES3) {
        this.displayTextInput = false;
      }
    },
    timeHourStr: "validateTimeRange",
    timeMinuteStr: "validateTimeRange",
    timeHourEnd: "validateTimeRange",
    timeMinuteEnd: "validateTimeRange",
  },
};
</script>

<style lang="scss">
.ql-editor {
  height: 120px;
}
.border_td {
  border: 1px solid var(--light-blue-gray);
}
</style>
