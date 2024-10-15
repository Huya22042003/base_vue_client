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
                v-if="!upVer && (haveVer == 'N' || haveVer == '')"
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
                v-if="upVer || haveVer == 'Y'"
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
                    v-if="!upVer && (haveVer == 'N' || haveVer == '')"
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
                  <div v-if="upVer || haveVer == 'Y'">
                    {{ detailData.hightCapa }}
                  </div>
                </div>
                <div style="width: 18%">
                  <SelectBoxBase
                    v-if="!upVer && (haveVer == 'N' || haveVer == '')"
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
                  <div v-if="upVer || haveVer == 'Y'">
                    {{ detailData.mediumCapa }}
                  </div>
                </div>
                <div style="width: 18%">
                  <SelectBoxBase
                    v-if="!upVer && (haveVer == 'N' || haveVer == '')"
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
                  <div v-if="upVer || haveVer == 'Y'">
                    {{ detailData.lowCapa }}
                  </div>
                </div>
                <div style="width: 18%">
                  <SelectBoxBase
                    v-if="!upVer && (haveVer == 'N' || haveVer == '')"
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
                  <div v-if="upVer || haveVer == 'Y'">
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
                v-if="!upVer && (haveVer == 'N' || haveVer == '')"
                :id="'jobAbilityNm'"
                :name="'jobAbilityNm'"
                v-model="jobAbilityCrudModel.jobAbilNm"
                required
              />
              <InputBase
                v-if="upVer || haveVer == 'Y'"
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
                v-if="!upVer && (haveVer == 'N' || haveVer == '')"
                class="width_job"
                :id="'jobAbilityCd'"
                :name="'jobAbilityCd'"
                :isNumber="true"
                v-model="verOption"
                maxLength="2"
                required
              />
              <InputBase
                v-if="upVer || haveVer == 'Y'"
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
                {{ jobAbilityCrudModel.jobAbilYear }}
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
                  v-if="!upVer"
                  :id="'listVersion'"
                  name="'listVersion'"
                  :data="listVersion"
                  v-model="jobAbilityCrudModel.ver"
                  @change="handleVerChange"
                  required
                >
                </SelectBoxBase>
                <div v-if="upVer">{{ jobAbilityCrudModel.ver }}</div>
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
                v-if="!upVer"
                :id="'defn'"
                :name="'defn'"
                v-model="jobAbilityCrudModel.defn"
                required
              />
              <TextArea
                v-if="upVer"
                :id="'defn'"
                :name="'defn'"
                v-model="jobAbilityCrudModel.defn"
                readonly
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
                    v-if="!upVer"
                    :id="'moduleCd'"
                    name="'moduleCd'"
                    :data="listModule"
                    v-model="learnMouleYn"
                    required
                  >
                  </SelectBoxBase>
                  <div v-if="upVer">
                    {{
                      learnMouleYn == registerCd
                        ? t("jobAbilityManagement.register")
                        : t("jobAbilityManagement.notYes")
                    }}
                  </div>
                </div>
                <div style="width: 40%">
                  <InputBase
                    v-if="learnMouleYn == registerCd && !upVer"
                    :id="'moduleNm'"
                    :name="'moduleNm'"
                    v-model="jobAbilityCrudModel.learnModuleNm"
                    required
                  />
                  <InputBase
                    v-if="learnMouleYn == registerCd && upVer"
                    :id="'moduleNm'"
                    :name="'moduleNm'"
                    v-model="jobAbilityCrudModel.learnModuleNm"
                    readonly
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
                  v-if="!upVer"
                  :id="'listStandard'"
                  name="'listStandard'"
                  :data="listStandard"
                  v-model="jobAbilityCrudModel.lvl"
                  required
                >
                </SelectBoxBase>
                <div v-if="upVer">{{ jobAbilityCrudModel.lvl }}</div>
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
              >
              </InputFileBase>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- up_Ver_Start -->
      <div v-if="upVer" class="mt_50">
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
                  v-for="item in listType"
                  :mode="'show'"
                  :value="item.cdId"
                  :id="'kcsNcs' + item.cdId"
                  :name="'kcsNcs'"
                  :key="'kcsNcs' + item.cdId"
                  v-model="upVerData.typeCd"
                  :checked="item.cdId == upVerData.typeCd"
                  :isDisable="true"
                  :label="item.cdNm"
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
                      :id="'bigClassCd'"
                      name="'bigClassCd'"
                      :data="listBigClass"
                      v-model="upVerData.jobCapaHightLevel"
                      :isDisable="true"
                    >
                    </SelectBoxBase>
                  </div>
                  <div style="width: 18%">
                    <SelectBoxBase
                      :id="'medClassCd'"
                      name="'medClassCd'"
                      :data="listMedClass"
                      v-model="upVerData.jobCapaMediumLevel"
                      :isDisable="true"
                    >
                    </SelectBoxBase>
                  </div>
                  <div style="width: 18%">
                    <SelectBoxBase
                      :id="'smallClassCd'"
                      name="'smallClassCd'"
                      :data="listSmallClass"
                      v-model="upVerData.jobCapaLowLevel"
                      :isDisable="true"
                    >
                    </SelectBoxBase>
                  </div>
                  <div style="width: 18%">
                    <SelectBoxBase
                      :id="'detailClassCd'"
                      name="'detailClassCd'"
                      :data="listDetailClass"
                      v-model="upVerData.jobCapaDetailLevel"
                      :isDisable="true"
                    >
                    </SelectBoxBase>
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
                  :id="'jobAbilityNm'"
                  :name="'jobAbilityNm'"
                  v-model="upVerData.jobAbilNm"
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
                {{ upVerData.jobAbilCd }}
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
                  {{ upVerData.jobAbilYear }}
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
                  {{ upVerData.ver }}
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
                  v-model="upVerData.defn"
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
                      v-model="learnMouleVerYn"
                      required
                    >
                    </SelectBoxBase>
                  </div>
                  <div style="width: 40%">
                    <InputBase
                      v-if="learnMouleVerYn == registerCd"
                      :id="'moduleNm'"
                      :name="'moduleNm'"
                      v-model="upVerData.learnModuleNm"
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
                    v-model="upVerData.lvl"
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
                  :id="'jobAbilityFileVer'"
                  :name="'jobAbilityFileVer'"
                  :type="typeFile"
                  :mode="'create'"
                  :multiple="false"
                  :maxFile="1"
                  ref="childRefUpLoad"
                  :orgName="jobAbility"
                  :category="jobAbility"
                  :sectionName="jobAbility"
                >
                </InputFileBase>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="dp_flex btn_group btn_end mt_8" style="gap: 10px">
        <button
          type="button"
          class="btn_round btn_md btn_gray"
          @click="confirmVersionUp"
          v-if="modeScreen == modeDetail && !upVer"
        >
          {{ t("jobAbilityManagement.tab1.btnVersionUp") }}
        </button>
        <button
          type="button"
          class="btn_round btn_md btn_gray"
          v-if="modeScreen == modeDetail && !upVer"
          @click="confirmEdit"
        >
          {{ t("jobAbilityManagement.tab1.update") }}
        </button>
        <button
          type="button"
          class="btn_round btn_primary btn_md"
          @click="saveVer"
          v-if="modeScreen == modeDetail && upVer"
        >
          {{ t("jobAbilityManagement.tab1.btnVersionUp") }}
        </button>
        <button
          type="button"
          class="btn_round btn_primary btn_md"
          v-if="!upVer"
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
  FILE_TYPE_OFFICE,
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
      upVer: false,
      upVerData: {} as JobAbilityReg,
      jobResultIdUpVer: "",
      dataVer: {} as CheckVer,
      haveVer: "",
      modeFile: MODE_CREATE,
      jobAbility: "JOBABILITY",
    };
  },
  async beforeMount() {
    this.modeScreen = this.$route.params.mode;
    this.jobAbilSeq = window.history.state.jobAbilSeq;
    this.getCodeCategoryKcsNcs();

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
    async versionUp() {
      this.upVerData.jobAbilSeq = this.jobAbilSeq;
      if (this.learnMouleVerYn == NOT_YET_DELELOPED_CD) {
        this.upVerData.learnModuleNm = "";
      }
      await upVer(this.upVerData).then((res) => {
        this.jobResultIdUpVer = res.data.data;
        this.uploadFile(this.jobResultIdUpVer);
      });
    },
    nextTab(id: any) {
      this.$emit("change-tab", "tab2", id);
    },
    async confirmVersionUp() {
      this.upVer = true;
      this.modeFile = MODE_DETAIL;
      await this.getDataDetail();
      this.upVerData.typeCd = this.jobAbilityCrudModel.typeCd;
      this.upVerData.jobCapaHightLevel =
        this.jobAbilityCrudModel.jobCapaHightLevel;
      this.upVerData.jobCapaMediumLevel =
        this.jobAbilityCrudModel.jobCapaMediumLevel;
      this.upVerData.jobCapaLowLevel = this.jobAbilityCrudModel.jobCapaLowLevel;
      this.upVerData.jobCapaDetailLevel =
        this.jobAbilityCrudModel.jobCapaDetailLevel;
      this.upVerData.jobAbilNm = this.jobAbilityCrudModel.jobAbilNm;
      this.upVerData.jobAbilYear = this.jobAbilityCrudModel.jobAbilYear;
      const lastTwoDigits = String(this.upVerData.jobAbilYear).slice(-2);
      this.upVerData.ver = Math.min(
        Number(this.jobAbilityCrudModel.ver) + 1,
        9
      );
      this.upVerData.jobAbilCd =
        this.jobAbilityCrudModel.jobAbilCd.slice(0, 10) +
        lastTwoDigits +
        this.jobAbilityCrudModel.jobAbilCd.slice(12, -1) +
        this.upVerData.ver;
      this.upVerData.defn = this.jobAbilityCrudModel.defn;
      this.learnMouleVerYn = this.learnMouleYn;
      this.upVerData.learnModuleNm = this.jobAbilityCrudModel.learnModuleNm;
      this.upVerData.lvl = this.jobAbilityCrudModel.lvl;
    },

    async saveVer() {
      if (this.checkValUpVer()) {
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
        text: this.t("jobAbilityManagement.tab1.confirmVersionUp"),
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "올리기",
        cancelButtonText: this.t("common.cancel"),
      });

      if (result.isConfirmed) {
        this.cmn.setLoading(true);
        this.dataVer.seq = "";
        this.dataVer.ver = this.upVerData.jobAbilCd;
        const res = await checkVer(this.dataVer);
        if (res.data.data === true) {
          this.$swal({
            text: this.t("jobAbilityManagement.tab1.dupliCateCVer"),
            type: "warning",
            showCancelButton: false,
            confirmButtonText: this.t("common.confirm"),
          });
        } else {
          await this.versionUp();
          this.cmn.setLoading(false);
          this.back();
        }
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
            "jobAbilityManagement.tab1.defaultSelect1"
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
          defaultItemOne.cdNm = this.t(
            "jobAbilityManagement.tab1.defaultSelect2"
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
          defaultItemOne.cdNm = this.t(
            "jobAbilityManagement.tab1.defaultSelect3"
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
          defaultItemOne.cdNm = this.t(
            "jobAbilityManagement.tab1.defaultSelect4"
          );
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
                  res.data.data.forEach((element: any) => {
                    this.listMedClass.push({
                      cdId: element.jobCapaStndSeq,
                      cdNm: element.jobCapaStndNm,
                      orderNo: element.jobCapaStndCd,
                      upId: element.upJobCapaStndSeq,
                    });
                  });
                }
              }),
              itemList(this.detailData?.mediumNo).then((res) => {
                if (res.data?.code === SUCCESS) {
                  res.data.data.forEach((element: any) => {
                    this.listSmallClass.push({
                      cdId: element.jobCapaStndSeq,
                      cdNm: element.jobCapaStndNm,
                      orderNo: element.jobCapaStndCd,
                      upId: element.upJobCapaStndSeq,
                    });
                  });
                }
              }),
              itemList(this.detailData?.lowNo).then((res) => {
                if (res.data?.code === SUCCESS) {
                  res.data.data.forEach((element: any) => {
                    this.listDetailClass.push({
                      cdId: element.jobCapaStndSeq,
                      cdNm: element.jobCapaStndNm,
                      orderNo: element.jobCapaStndCd,
                      upId: element.upJobCapaStndSeq,
                    });
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
        this.verOption.length !== 2 ||
        !this.jobAbilityCrudModel.defn ||
        (this.learnMouleYn === REGISTER_CD &&
          !this.jobAbilityCrudModel.learnModuleNm) ||
        this.jobAbilityCrudModel.lvl === ""
      );
    },
    checkValUpVer() {
      return (
        (this.learnMouleVerYn === REGISTER_CD &&
          this.upVerData.learnModuleNm === "") ||
        this.upVerData.defn === "" ||
        this.upVerData.lvl === ""
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
