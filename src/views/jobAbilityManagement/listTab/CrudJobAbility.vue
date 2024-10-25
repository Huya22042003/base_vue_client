<template>
  <div class="page_wrapper">
    <div class="box dp_block mg_b30">
      <div class="box_section">
        <p class="box_title_sm">
          {{ t("jobAbilityManagement.tab1.pageTitle") }}
        </p>
      </div>
      <table class="tbl_row tbl_border">
        <colgroup>
          <col style="width: 15%" />
          <col style="width: auto" />
        </colgroup>
        <tbody>
          <tr>
            <th scope="row">
              <p class="required">
                {{ t("jobAbilityManagement.tab1.column1") }}
              </p>
            </th>
            <td class="td_input">
              <RadiobuttonBase
                v-if="haveVer == 'N' || haveVer == ''"
                v-for="item in listType"
                :mode="'show'"
                :value="item.cdId"
                :id="'kcsNcs' + item.cdId"
                :name="'kcsNcs'"
                :key="'kcsNcs' + item.cdId"
                v-model="jobAbilityCrudModel.typeCd"
                :checked="item.cdId == jobAbilityCrudModel.typeCd"
                :label="item.cdNm"
                @change="handelChangeRadioType(jobAbilityCrudModel.typeCd)"
              >
              </RadiobuttonBase>
              <RadiobuttonBase
                v-if="haveVer == 'Y'"
                v-for="item in listType"
                :mode="'show'"
                :value="item.cdId"
                v-model="jobAbilityCrudModel.typeCd"
                :id="item.cdId"
                :name="item.cdId"
                :key="item.cdId"
                :checked="item.cdId == jobAbilityCrudModel.typeCd"
                :label="item.cdNm"
                :isDisable="true"
                @change="handelChangeRadioType(jobAbilityCrudModel.typeCd)"
              >
              </RadiobuttonBase>
            </td>
          </tr>
          <tr>
            <th scope="row">
              <p class="required">
                {{ t("jobAbilityManagement.tab1.column2") }}
              </p>
            </th>
            <td class="td_input">
              <div style="display: flex; gap: 10px">
                <div style="width: 18%">
                  <SelectBoxBase
                    v-if="haveVer == 'N' || haveVer == ''"
                    :id="'bigClassCd'"
                    name="'bigClassCd'"
                    :data="listBigClass"
                    v-model="jobAbilityCrudModel.jobCapaHightLevel"
                    @change="
                      handleSelectChange(
                        'bigClassCd',
                        jobAbilityCrudModel.jobCapaHightLevel
                      )
                    "
                    required
                  >
                  </SelectBoxBase>
                  <div v-if="haveVer == 'Y'">
                    {{ detailData.hightCapa }}
                  </div>
                </div>
                <div style="width: 18%">
                  <SelectBoxBase
                    v-if="haveVer == 'N' || haveVer == ''"
                    :id="'medClassCd'"
                    name="'medClassCd'"
                    :data="listMedClass"
                    v-model="jobAbilityCrudModel.jobCapaMediumLevel"
                    @change="
                      handleSelectChange(
                        'medClassCd',
                        jobAbilityCrudModel.jobCapaMediumLevel
                      )
                    "
                    required
                  >
                  </SelectBoxBase>
                  <div v-if="haveVer == 'Y'">
                    {{ detailData.mediumCapa }}
                  </div>
                </div>
                <div style="width: 18%">
                  <SelectBoxBase
                    v-if="haveVer == 'N' || haveVer == ''"
                    :id="'smallClassCd'"
                    name="'smallClassCd'"
                    :data="listSmallClass"
                    v-model="jobAbilityCrudModel.jobCapaLowLevel"
                    @change="
                      handleSelectChange(
                        'smallClassCd',
                        jobAbilityCrudModel.jobCapaLowLevel
                      )
                    "
                    required
                  >
                  </SelectBoxBase>
                  <div v-if="haveVer == 'Y'">
                    {{ detailData.lowCapa }}
                  </div>
                </div>
                <div style="width: 18%">
                  <SelectBoxBase
                    v-if="haveVer == 'N' || haveVer == ''"
                    :id="'detailClassCd'"
                    name="'detailClassCd'"
                    :data="listDetailClass"
                    v-model="jobAbilityCrudModel.jobCapaDetailLevel"
                    @change="
                      handleSelectChange(
                        'detailClassCd',
                        jobAbilityCrudModel.jobCapaDetailLevel
                      )
                    "
                    required
                  >
                  </SelectBoxBase>
                  <div v-if="haveVer == 'Y'">
                    {{ detailData.detailCapa }}
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row">
              <p class="required">
                {{ t("jobAbilityManagement.tab1.column3") }}
              </p>
            </th>
            <td class="td_input">
              <InputBase
                v-if="haveVer == 'N' || haveVer == ''"
                :id="'jobAbilityNm'"
                :name="'jobAbilityNm'"
                v-model="jobAbilityCrudModel.jobAbilNm"
                required
              />
              <InputBase
                v-if="haveVer == 'Y'"
                :id="'jobAbilityNm'"
                :name="'jobAbilityNm'"
                v-model="jobAbilityCrudModel.jobAbilNm"
                readonly
                required
              />
            </td>
          </tr>
          <tr>
            <th scope="row">
              <p class="required">
                {{ t("jobAbilityManagement.tab1.column4") }}
              </p>
            </th>
            <td class="td_input">
              {{ selectedOrders.bigClassCd }}
              {{ selectedOrders.medClassCd }}
              {{ selectedOrders.smallClassCd }}
              {{ selectedOrders.detailClassCd }}
              <InputBase
                v-if="haveVer == 'N' || haveVer == ''"
                class="width_job"
                :id="'jobAbilityCd'"
                :name="'jobAbilityCd'"
                :isNumber="true"
                v-model="verOption"
                maxLength="2"
                required
              />
              <InputBase
                v-if="haveVer == 'Y'"
                class="width_job"
                :id="'jobAbilityCd'"
                :name="'jobAbilityCd'"
                :isNumber="true"
                v-model="verOption"
                maxLength="2"
                readonly
                required
              />
              {{ lastTwoDigitsOfYear }}
              {{ verType }}
            </td>
          </tr>
          <tr>
            <th scope="row">
              <p class="required">
                {{ t("jobAbilityManagement.tab1.column5") }}
              </p>
            </th>
            <td class="td_input">
              <div style="width: 12%">
                <SelectBoxBase
                  v-if="haveVer == 'N' || haveVer == ''"
                  :id="'listYear'"
                  name="'listYear'"
                  :data="listYear"
                  v-model="jobAbilityCrudModel.jobAbilYear"
                  @change="handleChangeYear"
                  required
                >
                </SelectBoxBase>
                <div v-if="haveVer == 'Y'">
                  {{ jobAbilityCrudModel.jobAbilYear }}
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row">
              <p class="required">
                {{ t("jobAbilityManagement.tab1.column6") }}
              </p>
            </th>
            <td class="td_input">
              <div style="width: 12%">
                <SelectBoxBase
                  v-if="haveVer == 'N' || haveVer == ''"
                  :id="'listVersion'"
                  name="'listVersion'"
                  :data="listVersion"
                  v-model="jobAbilityCrudModel.ver"
                  @change="handleVerChange"
                  required
                >
                </SelectBoxBase>
                <div v-if="haveVer == 'Y'">
                  {{ jobAbilityCrudModel.jobAbilYear }}
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row">
              <p class="required">
                {{ t("jobAbilityManagement.tab1.column7") }}
              </p>
            </th>
            <td class="td_input">
              <TextArea
                :id="'defn'"
                :name="'defn'"
                v-model="jobAbilityCrudModel.defn"
                required
              />
            </td>
          </tr>
          <tr>
            <th scope="row">
              <p class="required">
                {{ t("jobAbilityManagement.tab1.column8") }}
              </p>
            </th>
            <td class="td_input">
              <div class="d-flex">
                <div style="width: 12%">
                  <SelectBoxBase
                    :id="'moduleCd'"
                    name="'moduleCd'"
                    :data="listModule"
                    v-model="learnMouleYn"
                    required
                  >
                  </SelectBoxBase>
                </div>
                <div style="width: 40%">
                  <InputBase
                    v-if="learnMouleYn == registerCd"
                    :id="'moduleNm'"
                    :name="'moduleNm'"
                    v-model="jobAbilityCrudModel.learnModuleNm"
                    required
                  />
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row">
              <p class="required">
                {{ t("jobAbilityManagement.tab1.column9") }}
              </p>
            </th>
            <td class="td_input">
              <div style="width: 12%">
                <SelectBoxBase
                  :id="'listStandard'"
                  name="'listStandard'"
                  :data="listStandard"
                  v-model="jobAbilityCrudModel.lvl"
                  required
                >
                </SelectBoxBase>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row">
              <p>
                {{ t("jobAbilityManagement.tab1.column10") }}
              </p>
            </th>
            <td class="td_input">
              <InputFileBase
                :id="'jobAbilityFile'"
                :name="'jobAbilityFile'"
                :type="typeFile"
                :referKey="jobAbilSeq"
                :mode="modeFile"
                :multiple="false"
                :maxFile="1"
                ref="childRefUpLoad"
                :orgName="jobAbility"
                :category="jobAbility"
                :sectionName="jobAbility"
                :subTitle="'※ 30MB 이하의 파일 하나만 등록이 가능합니다. '"
              >
              </InputFileBase>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- up_Ver_Start -->

      <div class="dp_flex btn_group btn_end mt_8" style="gap: 10px">
        <button
          type="button"
          class="btn_round btn_gray btn_md"
          @click="saveVer"
          v-if="modeScreen == modeDetail"
        >
          {{ t("jobAbilityManagement.tab1.btnVersionUp") }}
        </button>
        <button
          type="button"
          class="btn_round btn_md btn_gray"
          v-if="modeScreen == modeDetail"
          @click="confirmEdit"
        >
          {{ t("jobAbilityManagement.tab1.update") }}
        </button>
        <button
          type="button"
          class="btn_round btn_primary btn_md"
          @click="confirmNextTab"
        >
          {{ t("jobAbilityManagement.tab1.btnNext") }}
        </button>
        <button type="button" class="btn_round btn_white btn_md" @click="back">
          {{ t("common.list") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { commonStore } from "../../../stores/common";
import {
  DUPLICATE_STATUS,
  FILE_TYPE_OFFICE,
  MAXIMUM_STATUS,
  MODE_CREATE,
  MODE_DETAIL,
  MODE_EDIT,
  SUCCSESS_STATUS,
} from "../../../constants/screen.const";
import type { CodeMngModel } from "../../../stores/common/codeMng/codeMng.type";
import { getCodeMngByUpCdId } from "../../../stores/common/codeMng/codeMng.service";
import {
  NOT_YET_DELELOPED_CD,
  NOT_YET_DELELOPED_NM,
  REGISTER_CD,
  REGISTER_NM,
} from "../../../constants/common.const";
import { SUCCESS } from "../../../constants/screen.const";
import type {
  JobAbilityReg,
  JobAbilityData,
  CheckVer,
} from "../../../stores/jobAbilityManagement/jobAbilityManagement.type";
import {
  saveJob,
  jobDetail,
  upVer,
  parentList,
  itemList,
  checkVer,
} from "../../../stores/jobAbilityManagement/jobAbilityManagement.service";
import { SCREEN } from "../../../router/screen";
import InputFileBase from "@/components/common/input/InputFileBase.vue";
import { useI18n } from "vue-i18n";
import { KCS_CD_ID, UP_CD_NCS_KCS } from "@/constants/common.const";

export default {
  components: {
    InputFileBase,
  },
  setup() {
    const cmn = commonStore();
    const { t } = useI18n();
    const currentYear = new Date().getFullYear();

    return {
      cmn,
      t,
      currentYear,
    };
  },
  data() {
    return {
      jobAbilitySeq: "",
      modeScreen: "" as any,
      modeDetail: MODE_DETAIL,
      modeCreate: MODE_CREATE,
      listType: [] as Array<CodeMngModel>,
      learnMouleYn: "",
      learnMouleVerYn: "",
      listBigClass: [
        {
          cdId: "",
          cdNm: this.t("jobAbilityManagement.tab1.defaultSelect1"),
          orderNo: "",
          upCd: "",
        },
      ],
      listMedClass: [
        {
          cdId: "",
          cdNm: this.t("jobAbilityManagement.tab1.defaultSelect2"),
          orderNo: "",
          upCd: "",
        },
      ],
      listSmallClass: [
        {
          cdId: "",
          cdNm: this.t("jobAbilityManagement.tab1.defaultSelect3"),
          orderNo: "",
          upCd: "",
        },
      ],
      listDetailClass: [
        {
          cdId: "",
          cdNm: this.t("jobAbilityManagement.tab1.defaultSelect4"),
          orderNo: "",
          upCd: "",
        },
      ],
      jobAbilityCrudModel: {} as JobAbilityReg,
      listVersion: this.generateVersions(),
      listStandard: this.generateStandards(),
      listModule: [
        { cdId: REGISTER_CD, cdNm: REGISTER_NM },
        { cdId: NOT_YET_DELELOPED_CD, cdNm: NOT_YET_DELELOPED_NM },
      ] as Array<CodeMngModel>,
      registerCd: REGISTER_CD,
      typeFile: FILE_TYPE_OFFICE,
      selectedOrders: {
        bigClassCd: "",
        medClassCd: "",
        smallClassCd: "",
        detailClassCd: "",
      },
      lastTwoDigitsOfYear: "",
      verType: "",
      verOption: "",
      detailData: {} as JobAbilityData,
      jobAbilSeq: "",
      jobResultId: "",
      dataVer: {} as CheckVer,
      haveVer: "",
      modeFile: MODE_CREATE,
      jobAbility: "JOBABILITY",
      listYear: this.getListYear(),
      jobResultIdUpVer: "",
    };
  },
  async beforeMount() {
    this.modeScreen = this.$route.params.mode;
    this.jobAbilSeq = window.history.state.jobAbilSeq;
    this.getCodeCategoryKcsNcs();
    this.emitId();
    if (this.modeScreen == MODE_CREATE) {
      this.jobAbilityCrudModel.typeCd = KCS_CD_ID;
      this.jobAbilityCrudModel.ver = 1;
      this.verType = "V1";
      this.jobAbilityCrudModel.jobAbilYear = this.currentYear + "";
      this.jobAbilityCrudModel.jobCapaHightLevel = "";
      this.jobAbilityCrudModel.jobCapaMediumLevel = "";
      this.jobAbilityCrudModel.jobCapaLowLevel = "";
      this.jobAbilityCrudModel.jobCapaDetailLevel = "";
      this.jobAbilityCrudModel.lvl = "";
      this.learnMouleYn = this.registerCd;
      this.lastTwoDigitsOfYear = this.currentYear.toString().slice(-2);
    }
    if (this.modeScreen == MODE_DETAIL) {
      this.modeFile = MODE_EDIT;
      await this.getDataDetail().then(() => {
        return this.getListParent();
      });
    } else {
      await this.getListParent();
    }
  },
  methods: {
    async handelChangeRadioType(type: string) {
      this.jobAbilityCrudModel.jobCapaHightLevel = "";
      this.selectedOrders.bigClassCd = "";
      this.jobAbilityCrudModel.jobCapaMediumLevel = "";
      this.jobAbilityCrudModel.jobCapaLowLevel = "";
      this.jobAbilityCrudModel.jobCapaDetailLevel = "";
      this.selectedOrders.medClassCd = "";
      this.selectedOrders.smallClassCd = "";
      this.selectedOrders.detailClassCd = "";
      await this.getListParent(type);
    },
    async getDataDetail() {
      this.cmn.setLoading(true);
      await jobDetail(this.jobAbilSeq)
        .then((res) => {
          this.detailData = res.data.data;
          this.haveVer = this.detailData.haveVer;
          this.jobAbilityCrudModel.typeCd = this.detailData.typeCd;
          this.jobAbilityCrudModel.jobCapaHightLevel = this.detailData.hightNo;
          this.jobAbilityCrudModel.jobCapaMediumLevel =
            this.detailData.mediumNo;
          this.jobAbilityCrudModel.jobCapaLowLevel = this.detailData.lowNo;
          this.jobAbilityCrudModel.jobCapaDetailLevel =
            this.detailData.detailNo;
          this.jobAbilityCrudModel.jobAbilNm = this.detailData.jobAbilNm;
          this.jobAbilityCrudModel.jobAbilCd = this.detailData.jobAbilCd;
          this.selectedOrders.bigClassCd = this.detailData.hightNm;
          this.selectedOrders.medClassCd = this.detailData.mediumNm;
          this.selectedOrders.smallClassCd = this.detailData.lowNm;
          this.selectedOrders.detailClassCd = this.detailData.detailNm;
          this.verOption = this.detailData.jobAbilCd.slice(8, 10);
          this.lastTwoDigitsOfYear = this.detailData.jobAbilYear.slice(2, 4);
          this.jobAbilityCrudModel.jobAbilYear = this.detailData.jobAbilYear;
          this.verType = "V" + this.detailData.ver;
          this.jobAbilityCrudModel.ver = this.detailData.ver;
          this.jobAbilityCrudModel.defn = this.detailData.defn;
          if (!this.detailData.learnModuleNm) {
            this.learnMouleYn = NOT_YET_DELELOPED_CD;
          } else {
            this.learnMouleYn = REGISTER_CD;
            this.jobAbilityCrudModel.learnModuleNm =
              this.detailData.learnModuleNm;
          }
          this.jobAbilityCrudModel.lvl = this.detailData.lvl;
        })
        .finally(() => {
          this.cmn.setLoading(false);
        });
    },
    async getCodeCategoryKcsNcs() {
      const response = await getCodeMngByUpCdId({
        upCdId: UP_CD_NCS_KCS,
      });
      if (response.status == SUCCSESS_STATUS) {
        response.data.data.forEach((item: any) => {
          this.listType.push(item);
        });
      }
    },
    async confirmNextTab() {
      this.verOption =
        this.verOption.length === 1 ? "0" + this.verOption : this.verOption;
      this.jobAbilityCrudModel.jobAbilSeq = this.jobAbilSeq;
      this.jobAbilityCrudModel.jobAbilCd =
        this.selectedOrders.bigClassCd +
        this.selectedOrders.medClassCd +
        this.selectedOrders.smallClassCd +
        this.selectedOrders.detailClassCd +
        this.verOption +
        this.lastTwoDigitsOfYear +
        this.verType;

      if (this.learnMouleYn == NOT_YET_DELELOPED_CD) {
        this.jobAbilityCrudModel.learnModuleNm = "";
      }

      if (this.modeScreen === this.modeDetail) {
        this.nextTab(this.jobAbilSeq);
        return;
      }
      if (this.checkVal()) {
        this.$swal({
          text: this.t("common.messageValidateRequired"),
          type: "warning",
          showCancelButton: false,
          showConfirmButton: true,
          confirmButtonText: this.t("common.confirm"),
        });
        return;
      }
      const result = await this.$swal({
        text: this.t("jobAbilityManagement.tab1.confirmNextTab"),
        type: "warning",
        showCancelButton: true,
        confirmButtonText: this.t("common.save"),
        cancelButtonText: this.t("common.cancel"),
      });

      if (result.isConfirmed) {
        this.cmn.setLoading(true);
        this.dataVer.seq = this.jobAbilityCrudModel.jobAbilSeq || "";
        this.dataVer.ver = this.jobAbilityCrudModel.jobAbilCd;

        const res = await checkVer(this.dataVer);
        if (res.data.data === true) {
          this.$swal({
            text: this.t("jobAbilityManagement.tab1.dupliCateCVer"),
            type: "warning",
            showCancelButton: false,
            confirmButtonText: this.t("common.confirm"),
          });
        } else {
          await this.saveData();
          this.nextTab(this.jobResultId);
        }
        this.cmn.setLoading(false);
      }
    },

    async confirmEdit() {
      this.jobAbilityCrudModel.jobAbilSeq = this.jobAbilSeq;
      this.jobAbilityCrudModel.jobAbilCd =
        this.selectedOrders.bigClassCd +
        this.selectedOrders.medClassCd +
        this.selectedOrders.smallClassCd +
        this.selectedOrders.detailClassCd +
        this.verOption +
        this.lastTwoDigitsOfYear +
        this.verType;

      if (this.learnMouleYn == NOT_YET_DELELOPED_CD) {
        this.jobAbilityCrudModel.learnModuleNm = "";
      }
      if (this.checkVal()) {
        this.$swal({
          text: this.t("common.messageValidateRequired"),
          type: "warning",
          showCancelButton: false,
          showConfirmButton: true,
          confirmButtonText: this.t("common.confirm"),
        });
        return;
      }
      const result = await this.$swal({
        text: this.t("common.message.save"),
        type: "warning",
        showCancelButton: true,
        confirmButtonText: this.t("common.save"),
        cancelButtonText: this.t("common.cancel"),
      });
      if (result.isConfirmed) {
        this.cmn.setLoading(true);
        this.dataVer.seq = this.jobAbilityCrudModel.jobAbilSeq || "";
        this.dataVer.ver = this.jobAbilityCrudModel.jobAbilCd;

        const res = await checkVer(this.dataVer);
        if (res.data.data === true) {
          this.$swal({
            text: this.t("jobAbilityManagement.tab1.dupliCateCVer"),
            type: "warning",
            showCancelButton: false,
            confirmButtonText: this.t("common.confirm"),
          });
        } else {
          await this.saveData();
          this.cmn.setLoading(false);
          const resultNext = await this.$swal({
            text: this.t("jobAbilityManagement.tab1.nextTab"),
            type: "warning",
            showCancelButton: true,
            confirmButtonText: this.t("common.save"),
            cancelButtonText: this.t("common.cancel"),
          });

          if (resultNext.isConfirmed) {
            this.nextTab(this.jobResultId);
          }
        }
        this.cmn.setLoading(false);
      }
    },
    async saveData() {
      await saveJob(this.jobAbilityCrudModel).then((res) => {
        this.jobResultId = res.data.data;
        this.uploadFile(this.jobResultId);
      });
    },
    nextTab(id: any) {
      this.$emit("change-tab", "tab2", id);
    },

    async saveVer() {
      const result = await this.$swal({
        text: this.t("jobAbilityManagement.tab1.confirmVersionUp"),
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "올리기",
        cancelButtonText: this.t("common.cancel"),
      });

      if (result.isConfirmed) {
        this.cmn.setLoading(true);
        upVer(this.jobAbilSeq)
          .then(async (res) => {
            await this.$swal({
              text: "직무역량 버전을 올리기가 되었습니다.",
              type: "warning",
              showCancelButton: false,
              confirmButtonText: this.t("common.confirm"),
            });
            await this.back();
          })
          .catch((error) => {
            if (
              error.response &&
              error.response.data &&
              error.response.data.code === DUPLICATE_STATUS
            ) {
              this.$swal({
                text: this.t("jobAbilityManagement.tab1.dupliCateCVer"),
                type: "warning",
                showCancelButton: false,
                confirmButtonText: this.t("common.confirm"),
              });
            } else if (
              error.response &&
              error.response.data &&
              error.response.data.code === MAXIMUM_STATUS
            ) {
              this.$swal({
                text: this.t("jobAbilityManagement.tab1.maxVer"),
                type: "warning",
                showCancelButton: false,
                confirmButtonText: this.t("common.confirm"),
              });
            }
          });
        this.cmn.setLoading(false);
      }
    },
    uploadFile(jobAbilitySeq: string) {
      const chilRef = this.$refs.childRefUpLoad;
      chilRef.upLoadFile(jobAbilitySeq);
    },
    back() {
      this.$router.push({ name: SCREEN.jobAbilityManagement.name });
    },
    gotoEdit() {
      this.modeScreen = MODE_EDIT;
    },
    handleVerChange() {
      this.verType = "V" + this.jobAbilityCrudModel.ver;
    },
    handleChangeYear() {
      this.lastTwoDigitsOfYear = this.jobAbilityCrudModel.jobAbilYear.slice(
        2,
        4
      );
    },
    generateVersions() {
      let versions = [];
      for (let i = 1; i <= 9; i++) {
        versions.push({
          cdId: i.toString(),
          cdNm: i.toString(),
        });
      }

      return versions;
    },
    emitId() {
      this.$emit("update-id", this.jobAbilSeq);
    },
    getListYear() {
      let yearData = [];
      for (let i = 2013; i <= this.currentYear; i++) {
        yearData.push({
          cdId: i.toString(),
          cdNm: i.toString(),
        });
      }
      return yearData;
    },
    generateStandards() {
      let standards = [];
      standards.push({
        cdId: "",
        cdNm: this.t("jobAbilityManagement.tab1.no"),
      });
      for (let i = 1; i <= 8; i++) {
        standards.push({
          cdId: i.toString(),
          cdNm: i.toString(),
        });
      }

      return standards;
    },
    async handleSelectChange(selectBoxId: any, selectedValue: any) {
      let selectedItem;
      const defaultItemOne = {
        cdId: "",
        cdNm: "",
        orderNo: "",
        upCd: "",
      };
      switch (selectBoxId) {
        case "bigClassCd":
          defaultItemOne.cdNm = this.t(
            "jobAbilityManagement.tab1.defaultSelect2"
          );
          this.listMedClass = [defaultItemOne];
          this.jobAbilityCrudModel.jobCapaMediumLevel = "";
          this.jobAbilityCrudModel.jobCapaLowLevel = "";
          this.jobAbilityCrudModel.jobCapaDetailLevel = "";
          this.selectedOrders.medClassCd = "";
          this.selectedOrders.smallClassCd = "";
          this.selectedOrders.detailClassCd = "";
          selectedItem = this.listBigClass.find(
            (item) => item.cdId === selectedValue
          );
          this.selectedOrders.bigClassCd = selectedItem
            ? selectedItem.orderNo
            : "";

          if (selectedValue) {
            await this.getListItem(selectedValue, "medium");
          }
          break;

        case "medClassCd":
          if (this.jobAbilityCrudModel.jobCapaHightLevel == "") {
            this.$swal({
              text: this.t("jobAbilityManagement.tab1.alertChoice"),
              type: "warning",
              showConfirmButton: false,
              showCancelButton: true,
              cancelButtonText: this.t("common.confirm"),
            });
            return;
          }
          defaultItemOne.cdNm = this.t(
            "jobAbilityManagement.tab1.defaultSelect3"
          );
          this.listSmallClass = [defaultItemOne];
          this.jobAbilityCrudModel.jobCapaLowLevel = "";
          this.jobAbilityCrudModel.jobCapaDetailLevel = "";
          this.selectedOrders.smallClassCd = "";
          this.selectedOrders.detailClassCd = "";
          selectedItem = this.listMedClass.find(
            (item) => item.cdId === selectedValue
          );
          this.selectedOrders.medClassCd = selectedItem
            ? selectedItem.orderNo
            : "";

          if (selectedValue) {
            await this.getListItem(selectedValue, "small");
          }
          break;

        case "smallClassCd":
          if (this.jobAbilityCrudModel.jobCapaMediumLevel == "") {
            this.$swal({
              text: this.t("jobAbilityManagement.tab1.alertChoice"),
              type: "warning",
              showConfirmButton: false,
              showCancelButton: true,
              cancelButtonText: this.t("common.confirm"),
            });
            return;
          }
          defaultItemOne.cdNm = this.t(
            "jobAbilityManagement.tab1.defaultSelect4"
          );
          this.listDetailClass = [defaultItemOne];
          this.jobAbilityCrudModel.jobCapaDetailLevel = "";
          this.selectedOrders.detailClassCd = "";
          selectedItem = this.listSmallClass.find(
            (item) => item.cdId === selectedValue
          );
          this.selectedOrders.smallClassCd = selectedItem
            ? selectedItem.orderNo
            : "";

          if (selectedValue) {
            await this.getListItem(selectedValue, "detail");
          }
          break;

        case "detailClassCd":
          if (this.jobAbilityCrudModel.jobCapaLowLevel == "") {
            this.$swal({
              text: this.t("jobAbilityManagement.tab1.alertChoice"),
              type: "warning",
              showConfirmButton: false,
              showCancelButton: true,
              cancelButtonText: this.t("common.confirm"),
            });
            return;
          }
          selectedItem = this.listDetailClass.find(
            (item) => item.cdId === selectedValue
          );
          this.selectedOrders.detailClassCd = selectedItem
            ? selectedItem.orderNo
            : "";
          break;
      }
    },
    async getListParent(type = KCS_CD_ID) {
      this.cmn.setLoading(true);
      await parentList(type)
        .then((res) => {
          this.listBigClass = [
            {
              cdId: "",
              cdNm: this.t("jobAbilityManagement.tab1.defaultSelect1"),
              orderNo: "",
              upCd: "",
            },
          ];
          res.data.data.forEach((element: any) => {
            this.listBigClass.push({
              cdId: element.jobCapaStndSeq,
              cdNm: element.jobCapaStndNm,
              orderNo: element.jobCapaStndCd,
              upId: element.upJobCapaStndSeq,
            });
          });
          if (
            res.data?.code &&
            res.data?.code === SUCCESS &&
            this.modeScreen == MODE_DETAIL
          ) {
            Promise.all([
              itemList(this.detailData?.hightNo).then((res) => {
                if (res.data?.code === SUCCESS) {
                  let dataResult = res.data.data.map((element: any) => ({
                    cdId: element.jobCapaStndSeq,
                    cdNm: element.jobCapaStndNm,
                    orderNo: element.jobCapaStndCd,
                    upId: element.upJobCapaStndSeq,
                  }));

                  this.listMedClass = dataResult;
                }
              }),
              itemList(this.detailData?.mediumNo).then((res) => {
                if (res.data?.code === SUCCESS) {
                  let dataResult = res.data.data.map((element: any) => ({
                    cdId: element.jobCapaStndSeq,
                    cdNm: element.jobCapaStndNm,
                    orderNo: element.jobCapaStndCd,
                    upId: element.upJobCapaStndSeq,
                  }));

                  this.listSmallClass = dataResult;
                }
              }),
              itemList(this.detailData?.lowNo).then((res) => {
                if (res.data?.code === SUCCESS) {
                  res.data.data.forEach((element: any) => {
                    let dataResult = res.data.data.map((element: any) => ({
                      cdId: element.jobCapaStndSeq,
                      cdNm: element.jobCapaStndNm,
                      orderNo: element.jobCapaStndCd,
                      upId: element.upJobCapaStndSeq,
                    }));

                    this.listDetailClass = dataResult;
                  });
                }
              }),
            ]);
          }
        })
        .finally(() => {
          this.cmn.setLoading(false);
        });
    },
    async getListItem(parentId: any, level: any) {
      this.cmn.setLoading(true);
      let response;
      response = await itemList(parentId);

      response.data.data.forEach((element: any) => {
        if (level === "medium") {
          this.listMedClass.push({
            cdId: element.jobCapaStndSeq,
            cdNm: element.jobCapaStndNm,
            orderNo: element.jobCapaStndCd,
          });
        } else if (level === "small") {
          this.listSmallClass.push({
            cdId: element.jobCapaStndSeq,
            cdNm: element.jobCapaStndNm,
            orderNo: element.jobCapaStndCd,
          });
        } else if (level === "detail") {
          this.listDetailClass.push({
            cdId: element.jobCapaStndSeq,
            cdNm: element.jobCapaStndNm,
            orderNo: element.jobCapaStndCd,
          });
        }
      });
      this.cmn.setLoading(false);
    },
    checkVal() {
      return (
        this.jobAbilityCrudModel.jobCapaHightLevel === "" ||
        this.jobAbilityCrudModel.jobCapaMediumLevel === "" ||
        this.jobAbilityCrudModel.jobCapaLowLevel === "" ||
        this.jobAbilityCrudModel.jobCapaDetailLevel === "" ||
        !this.jobAbilityCrudModel.jobAbilNm ||
        this.verOption === "" ||
        !this.jobAbilityCrudModel.defn ||
        (this.learnMouleYn === REGISTER_CD &&
          !this.jobAbilityCrudModel.learnModuleNm) ||
        this.jobAbilityCrudModel.lvl === ""
      );
    },
  },
};
</script>
<style scoped>
.d-flex {
  display: flex;
  align-items: center;
  gap: 10px;
}
.width_job {
  width: 50px;
}
.mt_50 {
  margin-top: 50px;
}
</style>
