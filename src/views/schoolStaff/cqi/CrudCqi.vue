<template>
  <section id="content" class="content_wrapper grid_content" tabindex="0">
    <Breadcrumb
      :pageTitle="pageTitle"
      :breadcrumbItems="breadcrumbItems"
    ></Breadcrumb>

    <div class="box dp_block">
      <h5 class="box_title">{{ t("schoolStaff.cqi.detail.boxTitle1") }}</h5>
      <div class="box_section">
        <table class="tbl_row">
          <caption>
            table col
          </caption>
          <colgroup>
            <col style="width: auto" />
            <col style="width: auto" />
          </colgroup>
          <tbody>
            <tr>
              <th scope="col">
                {{ t("schoolStaff.cqi.detail.table1.yearSemester") }}
              </th>
              <td>{{ basicInfo.yearTerm }}</td>
              <th scope="col">
                {{ t("schoolStaff.cqi.detail.table1.subjectTitle") }}
              </th>
              <td>{{ basicInfo.sbjtNm }}</td>
              <th scope="col">
                {{ t("schoolStaff.cqi.detail.table1.point") }}
              </th>
              <td>{{ basicInfo.acqCredit }}</td>
              <th scope="col">
                {{ t("schoolStaff.cqi.detail.table1.initDate") }}
              </th>
              <td v-if="basicInfo.creDate">{{ basicInfo.creDate }}</td>
              <td v-else>-</td>
            </tr>

            <tr>
              <th scope="col">
                {{ t("schoolStaff.cqi.detail.table1.initYear") }}
              </th>
              <td>{{ basicInfo.yearCreate }}</td>
              <th scope="col">
                {{ t("schoolStaff.cqi.detail.table1.classify") }}
              </th>
              <td>{{ basicInfo.sustDivNm }}</td>
              <th scope="col">
                {{ t("schoolStaff.cqi.detail.table1.count") }}
              </th>
              <td>
                {{ basicInfo.numLect }}
                {{ t("schoolStaff.cqi.detail.table1.unit") }}
              </td>
              <th scope="col">
                {{ t("schoolStaff.cqi.detail.table1.professor") }}
              </th>
              <td>{{ basicInfo.staffNm }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h5 class="box_title mt_8">{{ t("schoolStaff.cqi.detail.boxTitle2") }}</h5>
      <div class="box_section">
        <table class="tbl_col">
          <caption>
            table col
          </caption>
          <colgroup>
            <col style="width: 10%" />
            <col style="width: 10%" />
            <col style="width: 10%" />
            <col
              :style="{ width: route.params.type === 'major' ? '10%' : 'auto' }"
            />
            <col
              :style="{ width: route.params.type === 'major' ? 'auto' : '10%' }"
            />
            <col style="width: 5%" />
          </colgroup>
          <thead>
            <tr>
              <th>
                {{ t("schoolStaff.cqi.detail.tableHeaderGeneral.header1") }}
              </th>
              <th>
                {{ t("schoolStaff.cqi.detail.tableHeaderGeneral.header2") }}
              </th>
              <th>
                {{ t("schoolStaff.cqi.detail.tableHeaderGeneral.header3") }}
              </th>
              <th>
                {{ t("schoolStaff.cqi.detail.tableHeaderGeneral.header4") }}
              </th>
              <th>
                {{ t("schoolStaff.cqi.detail.tableHeaderGeneral.header5") }}
              </th>
              <th>
                {{ t("schoolStaff.cqi.detail.tableHeaderGeneral.header6") }}
              </th>
              <th>
                {{ t("schoolStaff.cqi.detail.tableHeaderGeneral.header7") }}
              </th>
            </tr>
          </thead>
          <tbody>
            <template v-for="item in abilityList">
              <tr>
                <td>{{ item.typeNm }}</td>
                <td>{{ item.majorCapaNm }}</td>
                <td>{{ item.chldCapaNm }}</td>
                <td>{{ item.elemNm }}</td>
                <td>{{ item.lvlNm }}</td>
                <td>{{ item.actnIndi }}</td>
                <td>{{ item.methNm }}</td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
      <div class="box_section mt_6">
        <table class="tbl_col">
          <caption>
            table col
          </caption>
          <colgroup>
            <col style="width: 20%" />
            <col style="width: auto" />
          </colgroup>
          <tbody>
            <tr v-for="(tableItem, index) in table1" :key="index">
              <th>
                {{ tableItem.qus }}
              </th>
              <td v-if="tableItem.evalCd">
                <RadiobuttonBase
                  v-for="item in listRadio"
                  :mode="'show'"
                  :value="item.cdId"
                  :id="`${index}_${item.cdId}`"
                  :name="item.cdId"
                  :key="item.cdId"
                  :checked="item.cdId == tableItem.evalCd"
                  :label="item.cdNm"
                  v-model="tableItem.evalCd"
                >
                </RadiobuttonBase>
              </td>
              <td v-else>
                <RadiobuttonBase
                  v-for="item in listRadio"
                  :mode="'show'"
                  :value="item.cdId"
                  :id="`${index}_${item.cdId}`"
                  :name="item.cdId"
                  :key="item.cdId"
                  :checked="item.cdId == listRadio[0].cdId"
                  :label="item.cdNm"
                  v-model="tableItem.evalCd"
                >
                </RadiobuttonBase>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h5 class="box_title mt_8">{{ t("schoolStaff.cqi.detail.boxTitle3") }}</h5>
      <div class="box_section">
        <table class="tbl_col">
          <caption>
            table col
          </caption>
          <colgroup>
            <col style="width: 20%" />
            <col style="width: auto" />
            <col style="width: 35%" />
          </colgroup>
          <thead>
            <tr>
              <th scope="col">
                {{ t("schoolStaff.cqi.detail.table4.category") }}
              </th>
              <th scope="col">
                {{ t("schoolStaff.cqi.detail.table4.question") }}
              </th>
              <th scope="col">
                {{ t("schoolStaff.cqi.detail.table4.evaluation") }}
              </th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(tableItem, index) in table2" :key="index">
              <tr>
                <th
                  :rowspan="tableItem?.rowSpan"
                  :style="{ display: !tableItem?.rowSpan ? 'none' : '' }"
                >
                  {{ tableItem.row1 }}
                </th>
                <td>{{ tableItem.qus }}</td>
                <td v-if="tableItem.evalCd">
                  <RadiobuttonBase
                    v-for="item in listRadio"
                    :mode="'show'"
                    :value="item.cdId"
                    v-model="tableItem.evalCd"
                    :id="`table2_${item.cdId}_${index}`"
                    :name="`table2_${item.cdId}_${index}`"
                    :key="`table2_${item.cdId}_${index}`"
                    :checked="item.cdId == tableItem.evalCd"
                    :label="`${item.cdNm}`"
                    required
                  >
                  </RadiobuttonBase>
                </td>
                <td v-else>
                  <RadiobuttonBase
                    v-for="item in listRadio"
                    :mode="'show'"
                    :value="item.cdId"
                    v-model="tableItem.evalCd"
                    :id="`table2_${item.cdId}_${index}`"
                    :name="`table2_${item.cdId}_${index}`"
                    :key="`table2_${item.cdId}_${index}`"
                    :checked="item.cdId == listRadio[0].cdId"
                    :label="`${item.cdNm}`"
                    required
                  >
                  </RadiobuttonBase>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>

      <h5 class="box_title mt_8">{{ t("schoolStaff.cqi.detail.boxTitle4") }}</h5>
      <div class="box_section mt_8">
        <table class="tbl_col">
          <caption>
            table col
          </caption>
          <colgroup>
            <col style="width: 5%" />
            <col style="width: auto" />
            <col style="width: 30%" />
          </colgroup>
          <thead>
            <tr>
              <th scope="col">
                {{ t("schoolStaff.cqi.detail.table4.category") }}
              </th>
              <th scope="col">
                {{ t("schoolStaff.cqi.detail.table4.question") }}
              </th>
              <th scope="col">
                {{ t("schoolStaff.cqi.detail.table4.evaluation") }}
              </th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(tableItem, index) in table3" :key="index">
              <tr>
                <th>{{ index + 1 }}</th>
                <td>{{ tableItem.qus }}</td>
                <td v-if="tableItem.evalCd">
                  <RadiobuttonBase
                    v-for="item in listRadioNum"
                    :mode="'show'"
                    :value="item.cdId"
                    v-model="tableItem.evalCd"
                    :id="`table3_${item.cdId}_${index}`"
                    :name="`table3_${item.cdId}_${index}`"
                    :key="`table3_${item.cdId}_${index}`"
                    :checked="item.cdId == tableItem.evalCd"
                    :label="`${item.cdNm}`"
                  >
                  </RadiobuttonBase>
                </td>
                <td v-else>
                  <RadiobuttonBase
                    v-for="item in listRadioNum"
                    :mode="'show'"
                    :value="item.cdId"
                    v-model="tableItem.evalCd"
                    :id="`table3_${item.cdId}_${index}`"
                    :name="`table3_${item.cdId}_${index}`"
                    :key="`table3_${item.cdId}_${index}`"
                    :checked="item.cdId == listRadioNum[0].cdId"
                    :label="`${item.cdNm}`"
                  >
                  </RadiobuttonBase>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
      <div class="box_section mt_6">
        <table class="tbl_row">
          <caption>
            table col
          </caption>
          <colgroup>
            <col style="width: 20%" />
            <col style="width: auto" />
          </colgroup>
          <thead></thead>
          <tbody>
            <tr>
              <th scope="col">
                {{ t("schoolStaff.cqi.detail.table5.title") }}
              </th>
              <td>
                <TextArea
                  :id="'tchrAnlsOpin'"
                  v-model="cqiInfo.tchrAnlsOpin"
                  required
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h5 class="box_title mt_8">{{ t("schoolStaff.cqi.detail.boxTitle5") }}</h5>
      <div class="box_section">
        <table class="tbl_col">
          <caption>
            table col
          </caption>
          <colgroup>
            <col style="width: auto" />

            <col style="width: 8%" />
            <col style="width: 8%" />
            <col style="width: 8%" />
            <col style="width: 8%" />
            <col style="width: 8%" />
            <col style="width: 8%" />
            <col style="width: 8%" />
            <col style="width: 8%" />
            <col style="width: 8%" />
            <col style="width: 8%" />
            <col style="width: 8%" />
          </colgroup>
          <thead>
            <tr>
              <th colspan="12" scope="colgroup">
                {{ t("schoolStaff.cqi.detail.table6.coreCompetencies") }}
              </th>
            </tr>
            <tr>
              <th scope="col"></th>
              <th scope="col" v-for="i in table4" :key="i">{{ i }}</th>

              <th>{{ t("schoolStaff.cqi.detail.table6.total") }}</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>{{ t("schoolStaff.cqi.detail.table6.personnel") }}</td>
              <td class="text-center" v-for="(i, index) in table4" :key="i">
                <span v-if="getGradeInfo(i)">{{
                  getGradeInfo(i).numGrade
                }}</span>
                <span v-else>0</span>
              </td>
              <td class="text-center">{{ numAllGrade }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="box_section mt_6">
        <table class="tbl_row">
          <caption>
            table col
          </caption>
          <colgroup>
            <col style="width: 20%" />
            <col style="width: auto" />
          </colgroup>
          <thead></thead>
          <tbody>
            <tr>
              <th>{{ t("schoolStaff.cqi.detail.table6.title") }}</th>
              <td>
                <TextArea
                  :id="'gradeAnlsOpin'"
                  v-model="cqiInfo.gradeAnlsOpin"
                  required
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="box_section mt_8">
        <table class="tbl_row">
          <caption>
            table col
          </caption>
          <colgroup>
            <col style="width: 20%" />
            <col style="width: auto" />
          </colgroup>
          <thead></thead>
          <tbody>
            <tr>
              <th>{{ t("schoolStaff.cqi.detail.table7.title") }}</th>
              <td>
                <TextArea
                  :id="'nextImprDmdIssue'"
                  v-model="cqiInfo.nextImprDmdIssue"
                  required
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
    <div class="box_section">
      <div class="btn_group btn_end">
        <button
            type="button"
            class="button btn_xs btn_blue btn_responsive"
            @click="checkAllRequired"
        >
          {{ t("common.save") }}
        </button>
        <button type="button" class="button btn_xs btn_bo_primary  btn_responsive">
          {{ t("common.print") }}
        </button>
        <button
            type="button"
            class="button btn_xs btn_white btn_responsive"
            @click="back"
        >
          {{ t("common.list") }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { commonStore } from "@/stores/common";
import RadiobuttonBase from "@/components/common/input/RadiobuttonBase.vue";
import TextArea from "@/components/common/input/TextArea.vue";
import { useI18n } from "vue-i18n";
import { Cqi, CqiRequest } from "@/stores/cqi/cqi.type";
import { createCqi } from "@/stores/cqi/cqi.service";
import { SUCCSESS_STATUS, CREATED_STATUS } from "@/constants/screen.const";
import { cqiStore } from "@/stores/cqi";
import { CqiInfoBasic } from "@/stores/cqi/cqi.type";
import { getListCodeMng } from "@/stores/common/codeMng/codeMng.service";
import { CqiAbility } from "@/stores/cqi/cqi.type";
import { format } from "date-fns";
import { FORMAT_YYY_MM_DD } from "@/constants/screen.const";
import Swal from "sweetalert2";
import { SCREEN } from "@/router/screen";
import {
  CQI_EVAL_1,
  CQI_EVAL_2,
  CQI_EVAL_3,
  UP_CD_ID_CQI_EVAL_LVL,
  UP_CD_ID_CQI_EVAL_NUM,
} from "@/constants/common.const";

const route = useRoute();
const router = useRouter();
const store = commonStore();
const { t } = useI18n();
const cqiStr = cqiStore();

const pageTitle = ref("");
const breadcrumbItems = ref([
  { label: t("common.home"), link: "/" },
  { label: t("schoolStaff.cqi.detail.pageTitleMajor"), link: SCREEN.cqi.path },
]);
const cqiInfo = ref({
  cqiSeq: "",
  tchrAnlsOpin: "",
  gradeAnlsOpin: "",
  nextImprDmdIssue: "",
  stsCd: "",
  lectCd: "",
} as Cqi);

// radio
const listRadio = ref([]);
const listRadioNum = ref([]);

//table
const table1 = ref([]);
const table2 = ref([]);
const table3 = ref([]);
const table4 = ref(["A+", "A", "B+", "B", "C+", "C", "D+", "D", "P", "F"]);

const cqiRequest = ref({} as CqiRequest);
const evalList = ref([]);

const lectCd = ref("");
const lectPlanDocSeq = ref("");
const cqiSeq = ref("");

onMounted(() => {
  lectCd.value = window.history.state.lectCd;
  lectPlanDocSeq.value = window.history.state.lectPlanDocSeq;
  cqiSeq.value = window.history.state.cqiSeq;

  getBasicInfo();
  getCodeInfo();

  if (cqiSeq.value) {
    getDetailCqi();
  }

  pageTitle.value =
    route.params.type === "major"
      ? t("schoolStaff.cqi.detail.pageTitleMajor")
      : t("schoolStaff.cqi.detail.pageTitleGeneral");

  if (!lectCd.value) {
    router.replace({ name: SCREEN.home.name });
  }
});

const abilityList = ref([] as CqiAbility[]);
const basicInfo = ref({} as CqiInfoBasic);
const analysInfo = ref([]);
const numAllGrade = ref(0);

const getBasicInfo = async () => {
  store.setLoading(true);
  await cqiStr.fetchBasicInfo({ lectCd: lectCd.value, cqiSeq: cqiSeq.value });

  if (cqiStr.status == SUCCSESS_STATUS) {
    basicInfo.value = cqiStr.basicInfo.data.subjectInfoDetail;

    if (basicInfo.value.createdDate) {
      basicInfo.value.creDate = format(
        basicInfo.value.createdDate,
        FORMAT_YYY_MM_DD
      );
    }

    abilityList.value = cqiStr.basicInfo.data.cqiAbilityList;
    analysInfo.value = cqiStr.basicInfo.data.cqiAnalys;
    numAllGrade.value = cqiStr.basicInfo.data.numAllGrade;

    cqiStr.basicInfo.data.lectEvalItems.forEach((item) => {
      if (item.divCd == CQI_EVAL_2) {
        if (item.ordNo == 1) {
          item.rowSpan = 2;
          item.row1 = t("schoolStaff.cqi.detail.table4.category1");
        } else if (item.ordNo == 3) {
          item.rowSpan = 4;
          item.row1 = t("schoolStaff.cqi.detail.table4.category2");
        } else if (item.ordNo == 7) {
          item.rowSpan = 1;
          item.row1 = t("schoolStaff.cqi.detail.table4.category3");
        }

        table2.value.push(item);
      }

      if (item.divCd == CQI_EVAL_3) {
        table3.value.push(item);
      }

      if (item.divCd == CQI_EVAL_1) {
        table1.value.push(item);
      }
    });
    store.setLoading(false);
  }
};

const getGradeInfo = (gradeNm) => {
  return analysInfo.value.find((item) => item.gradeNm === gradeNm);
};

const getCodeInfo = () => {
  const codeMng = {
    upCdIdList: [UP_CD_ID_CQI_EVAL_NUM, UP_CD_ID_CQI_EVAL_LVL],
  };

  getListCodeMng(codeMng).then((res) => {
    if (res.status == SUCCSESS_STATUS) {
      res.data.data.forEach((item) => {
        if (item.upCdId == UP_CD_ID_CQI_EVAL_LVL) {
          listRadio.value.push(item);
        }

        if (item.upCdId == UP_CD_ID_CQI_EVAL_NUM) {
          listRadioNum.value.push(item);
        }
      });
    }
  });
};

const getDetailCqi = async () => {
  await cqiStr.fetchDetail({ cqiSeq: cqiSeq.value });
  if (cqiStr.status && cqiStr.status == SUCCSESS_STATUS) {
    cqiInfo.value = cqiStr.cqiDetail.cqiDTO;
  }
};

const isRequired = ref();
onUpdated(() => {
  isRequired.value = store.check;
});

const checkAllRequired = () => {
  if (isRequired.value) {
    Swal.fire({
      text: t("schoolStaff.cqi.detail.alert.validate"),
      type: "warning",
      showCancelButton: false,
      confirmButtonText: t("common.confirm"),
    });
  } else {
    showAlertSave();
  }
};

const showAlertSave = () => {
  Swal.fire({
    text: t("schoolStaff.cqi.detail.alert.save"),
    type: "warning",
    showCancelButton: true,
    confirmButtonText: t("common.save"),
    cancelButtonText: t("common.cancel"),
  }).then((result) => {
    if (result.isConfirmed) {
      onSave();
    }
  });
};

const onSave = () => {
  store.setLoading(true);

  cqiInfo.value.lectCd = lectCd.value;
  cqiRequest.value.cqiDTO = cqiInfo.value;

  evalList.value = [...table1.value, ...table2.value, ...table3.value];

  for (let i = 0; i < evalList.value.length; i++) {
    delete evalList.value[i].row1;
  }

  cqiRequest.value.lectEvalDTOS = evalList.value;

  createCqi(cqiRequest.value).then((res) => {
    if (cqiStr.status && res.status == CREATED_STATUS) {

      store.setLoading(false);
      Swal.fire({
        text: t("schoolStaff.cqi.detail.alert.saveSuccess"),
        type: "warning",
        showCancelButton: false,
        confirmButtonText: t("common.confirm"),
      }).then((result) => {
        if (result.isConfirmed) {
          back();
        }
      });
    }
  });
};

const back = () => {
  router.push({
    path: SCREEN.cqi.path,
  });
};
</script>

<style scoped></style>
