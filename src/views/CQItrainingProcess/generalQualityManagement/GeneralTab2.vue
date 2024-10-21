<template>
  <!-- Table1 -->
  <div class="section_tit_wrap">
    <h4 class="section_tit_xs">{{ t("majorTab2.table1.title") }}</h4>
  </div>
  <div class="tbl tbl_col">
    <table>
      <caption>
        {{
          t("majorTab2.table1.caption")
        }}
      </caption>
      <colgroup>
        <col style="width: 20%" />
        <col style="width: 18%" />
        <col style="width: 10%" />
        <col style="width: 18%" />
        <col style="width: 18%" />
        <col style="width: 18%" />
      </colgroup>
      <thead>
        <tr>
          <th scope="col">{{ t("majorTab2.table1.header1") }}</th>
          <th scope="col">{{ t("majorTab2.table1.header2") }}</th>
          <th scope="col">{{ t("majorTab2.table1.header3") }}</th>
          <th scope="col">{{ t("majorTab2.table1.header4") }}</th>
          <th scope="col">{{ t("majorTab2.table1.header5") }}</th>
          <th scope="col">{{ t("majorTab2.table1.header6") }}</th>
        </tr>
      </thead>
      <tbody>
        <template
          v-for="evalItem in listData?.slice(0, 2)"
          :key="evalItem.evalItemCd"
        >
          <template
            v-for="(evalStnrd, indexEvalStnrd) in evalItem.listEvalStnrdCont"
            :key="evalStnrd.evalStnrdSeq"
          >
            <tr>
              <th
                :rowspan="evalItem.listEvalStnrdCont.length"
                v-if="indexEvalStnrd === 0"
              >
                {{ evalItem.evalItemNm }}
              </th>
              <th>{{ evalStnrd.cont }}</th>
              <th>
                <InputBase
                  v-model="evalStnrd.score"
                  :id="
                    'evalStnrdScore' +
                    evalItem.evalItemCd +
                    evalStnrd.evalStnrdSeq +
                    indexEvalStnrd
                  "
                  :isNumber="true"
                  :minValue="0"
                  :maxValue="5"
                  :decimalPlaces="1"
                  required
                />
              </th>
              <th>
                <TextArea
                  v-model="evalStnrd.rslt"
                  :rows="rowsText"
                  :id="
                    'evalStnrdRslt' +
                    evalItem.evalItemCd +
                    evalStnrd.evalStnrdSeq +
                    indexEvalStnrd
                  "
                  :resize-auto="true"
                  required
                />
              </th>
              <th
                v-if="indexEvalStnrd === 0"
                :rowspan="evalItem.listEvalStnrdCont.length"
              >
                <TextArea
                  v-model="evalItem.impr"
                  :rows="rowsText"
                  :id="
                    'evalStnrdImpr' +
                    evalItem.evalItemCd +
                    evalStnrd.evalStnrdSeq +
                    indexEvalStnrd
                  "
                  :resize-auto="true"
                  required
                />
              </th>
              <th
                v-if="indexEvalStnrd === 0"
                :rowspan="evalItem.listEvalStnrdCont.length"
              >
                <TextArea
                  v-model="evalItem.goal"
                  :rows="rowsText"
                  :id="
                    'evalStnrdGoal' +
                    evalItem.evalItemCd +
                    evalStnrd.evalStnrdSeq +
                    indexEvalStnrd
                  "
                  :resize-auto="true"
                  required
                />
              </th>
            </tr>
          </template>
        </template>

        <tr>
          <th scope="row" colspan="2" class="td_custom_color">
            {{ t("majorTab2.table1.average") }}
          </th>
          <th scope="row" colspan="4" class="td_custom_color">
            {{ calculateAverageScore(listData?.slice(0, 2)) }}
          </th>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Table2 -->
  <div class="section_tit_wrap mt_8">
    <h4 class="section_tit_xs">{{ t("majorTab2.table2.title") }}</h4>
  </div>
  <div class="tbl tbl_col">
    <table>
      <caption>
        {{
          t("majorTab2.table2.caption")
        }}
      </caption>
      <colgroup>
        <col style="width: 20%" />
        <col style="width: 18%" />
        <col style="width: 10%" />
        <col style="width: 18%" />
        <col style="width: 18%" />
        <col style="width: 18%" />
      </colgroup>
      <thead>
        <tr>
          <th scope="col">{{ t("majorTab2.table2.header1") }}</th>
          <th scope="col">{{ t("majorTab2.table2.header2") }}</th>
          <th scope="col">{{ t("majorTab2.table2.header3") }}</th>
          <th scope="col">{{ t("majorTab2.table2.header4") }}</th>
          <th scope="col">{{ t("majorTab2.table2.header5") }}</th>
          <th scope="col">{{ t("majorTab2.table2.header6") }}</th>
        </tr>
      </thead>
      <tbody>
        <template
          v-for="evalItem in listData?.slice(2, 3)"
          :key="evalItem.evalItemCd"
        >
          <template
            v-for="(evalStnrd, indexEvalStnrd) in evalItem.listEvalStnrdCont"
            :key="evalStnrd.evalStnrdSeq"
          >
            <tr>
              <th
                :rowspan="evalItem.listEvalStnrdCont.length"
                v-if="indexEvalStnrd === 0"
              >
                {{ evalItem.evalItemNm }}
              </th>
              <th>{{ evalStnrd.cont }}</th>
              <th>
                <InputBase
                  v-model="evalStnrd.score"
                  :id="
                    'evalStnrdScore' +
                    evalItem.evalItemCd +
                    evalStnrd.evalStnrdSeq +
                    indexEvalStnrd
                  "
                  :isNumber="true"
                  :minValue="0"
                  :maxValue="5"
                  :decimalPlaces="1"
                  required
                />
              </th>
              <th>
                <TextArea
                  v-model="evalStnrd.rslt"
                  :rows="rowsText"
                  :id="
                    'evalStnrdRslt' +
                    evalItem.evalItemCd +
                    evalStnrd.evalStnrdSeq +
                    indexEvalStnrd
                  "
                  :resize-auto="true"
                  required
                />
              </th>
              <th
                v-if="indexEvalStnrd === 0"
                :rowspan="evalItem.listEvalStnrdCont.length"
              >
                <TextArea
                  v-model="evalItem.impr"
                  :rows="rowsText"
                  :id="
                    'evalStnrdImpr' +
                    evalItem.evalItemCd +
                    evalStnrd.evalStnrdSeq +
                    indexEvalStnrd
                  "
                  :resize-auto="true"
                  required
                />
              </th>
              <th
                v-if="indexEvalStnrd === 0"
                :rowspan="evalItem.listEvalStnrdCont.length"
              >
                <TextArea
                  v-model="evalItem.goal"
                  :rows="rowsText"
                  :id="
                    'evalStnrdGoal' +
                    evalItem.evalItemCd +
                    evalStnrd.evalStnrdSeq +
                    indexEvalStnrd
                  "
                  :resize-auto="true"
                  required
                />
              </th>
            </tr>
          </template>
        </template>
        <tr>
          <th scope="row" colspan="2" class="td_custom_color">
            {{ t("majorTab2.table1.average") }}
          </th>
          <th scope="row" colspan="4" class="td_custom_color">
            {{ calculateAverageScore(listData?.slice(2, 3)) }}
          </th>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Table3 -->
  <div class="section_tit_wrap mt_8">
    <h4 class="section_tit_xs">{{ t("majorTab2.table3.title") }}</h4>
  </div>
  <div class="tbl tbl_col">
    <table>
      <caption>
        {{
          t("majorTab2.table3.caption")
        }}
      </caption>
      <colgroup>
        <col style="width: 20%" />
        <col style="width: 18%" />
        <col style="width: 10%" />
        <col style="width: 18%" />
        <col style="width: 18%" />
        <col style="width: 18%" />
      </colgroup>
      <thead>
        <tr>
          <th scope="col">{{ t("majorTab2.table3.header1") }}</th>
          <th scope="col">{{ t("majorTab2.table3.header2") }}</th>
          <th scope="col">{{ t("majorTab2.table3.header3") }}</th>
          <th scope="col">{{ t("majorTab2.table3.header4") }}</th>
          <th scope="col">{{ t("majorTab2.table3.header5") }}</th>
          <th scope="col">{{ t("majorTab2.table3.header6") }}</th>
        </tr>
      </thead>
      <tbody>
        <template
          v-for="evalItem in listData?.slice(3, 5)"
          :key="evalItem.evalItemCd"
        >
          <template
            v-for="(evalStnrd, indexEvalStnrd) in evalItem.listEvalStnrdCont"
            :key="evalStnrd.evalStnrdSeq"
          >
            <tr>
              <th
                :rowspan="evalItem.listEvalStnrdCont.length"
                v-if="indexEvalStnrd === 0"
              >
                {{ evalItem.evalItemNm }}
              </th>
              <th>{{ evalStnrd.cont }}</th>
              <th>
                <InputBase
                  v-model="evalStnrd.score"
                  :id="
                    'evalStnrdScore' +
                    evalItem.evalItemCd +
                    evalStnrd.evalStnrdSeq +
                    indexEvalStnrd
                  "
                  :isNumber="true"
                  :minValue="0"
                  :maxValue="5"
                  :decimalPlaces="1"
                  required
                />
              </th>
              <th>
                <TextArea
                  v-model="evalStnrd.rslt"
                  :rows="rowsText"
                  :id="
                    'evalStnrdRslt' +
                    evalItem.evalItemCd +
                    evalStnrd.evalStnrdSeq +
                    indexEvalStnrd
                  "
                  :resize-auto="true"
                  required
                />
              </th>
              <th
                v-if="indexEvalStnrd === 0"
                :rowspan="evalItem.listEvalStnrdCont.length"
              >
                <TextArea
                  v-model="evalItem.impr"
                  :rows="rowsText"
                  :id="
                    'evalStnrdImpr' +
                    evalItem.evalItemCd +
                    evalStnrd.evalStnrdSeq +
                    indexEvalStnrd
                  "
                  :resize-auto="true"
                  required
                />
              </th>
              <th
                v-if="indexEvalStnrd === 0"
                :rowspan="evalItem.listEvalStnrdCont.length"
              >
                <TextArea
                  v-model="evalItem.goal"
                  :rows="rowsText"
                  :id="
                    'evalStnrdGoal' +
                    evalItem.evalItemCd +
                    evalStnrd.evalStnrdSeq +
                    indexEvalStnrd
                  "
                  :resize-auto="true"
                  required
                />
              </th>
            </tr>
          </template>
        </template>
        <tr>
          <th scope="row" colspan="2" class="td_custom_color">
            {{ t("majorTab2.table1.average") }}
          </th>
          <th scope="row" colspan="4" class="td_custom_color">
            {{ calculateAverageScore(listData?.slice(3, 5)) }}
          </th>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Table4 -->
  <div class="section_tit_wrap mt_8">
    <h4 class="section_tit_xs">{{ t("majorTab2.table4.title") }}</h4>
  </div>
  <div class="tbl tbl_col">
    <table>
      <caption>
        {{
          t("majorTab2.table4.caption")
        }}
      </caption>
      <colgroup>
        <col style="width: 20%" />
        <col style="width: 18%" />
        <col style="width: 10%" />
        <col style="width: 18%" />
        <col style="width: 18%" />
        <col style="width: 18%" />
      </colgroup>
      <thead>
        <tr>
          <th scope="col">{{ t("majorTab2.table4.header1") }}</th>
          <th scope="col">{{ t("majorTab2.table4.header2") }}</th>
          <th scope="col">{{ t("majorTab2.table4.header3") }}</th>
          <th scope="col">{{ t("majorTab2.table4.header4") }}</th>
          <th scope="col">{{ t("majorTab2.table4.header5") }}</th>
          <th scope="col">{{ t("majorTab2.table4.header6") }}</th>
        </tr>
      </thead>
      <tbody>
        <template
          v-for="evalItem in listData?.slice(5, 7)"
          :key="evalItem.evalItemCd"
        >
          <template
            v-for="(evalStnrd, indexEvalStnrd) in evalItem.listEvalStnrdCont"
            :key="evalStnrd.evalStnrdSeq"
          >
            <tr>
              <th
                :rowspan="evalItem.listEvalStnrdCont.length"
                v-if="indexEvalStnrd === 0"
              >
                {{ evalItem.evalItemNm }}
              </th>
              <th>{{ evalStnrd.cont }}</th>
              <th>
                <InputBase
                  v-model="evalStnrd.score"
                  :id="
                    'evalStnrdScore' +
                    evalItem.evalItemCd +
                    evalStnrd.evalStnrdSeq +
                    indexEvalStnrd
                  "
                  :isNumber="true"
                  :minValue="0"
                  :maxValue="5"
                  :decimalPlaces="1"
                  required
                />
              </th>
              <th>
                <TextArea
                  v-model="evalStnrd.rslt"
                  :rows="rowsText"
                  :id="
                    'evalStnrdRslt' +
                    evalItem.evalItemCd +
                    evalStnrd.evalStnrdSeq +
                    indexEvalStnrd
                  "
                  :resize-auto="true"
                  required
                />
              </th>
              <th
                v-if="indexEvalStnrd === 0"
                :rowspan="evalItem.listEvalStnrdCont.length"
              >
                <TextArea
                  v-model="evalItem.impr"
                  :rows="rowsText"
                  :id="
                    'evalStnrdImpr' +
                    evalItem.evalItemCd +
                    evalStnrd.evalStnrdSeq +
                    indexEvalStnrd
                  "
                  :resize-auto="true"
                  required
                />
              </th>
              <th
                v-if="indexEvalStnrd === 0"
                :rowspan="evalItem.listEvalStnrdCont.length"
              >
                <TextArea
                  v-model="evalItem.goal"
                  :rows="rowsText"
                  :id="
                    'evalStnrdGoal' +
                    evalItem.evalItemCd +
                    evalStnrd.evalStnrdSeq +
                    indexEvalStnrd
                  "
                  :resize-auto="true"
                  required
                />
              </th>
            </tr>
          </template>
        </template>
        <tr>
          <th scope="row" colspan="2" class="td_custom_color">
            {{ t("majorTab2.table1.average") }}
          </th>
          <th scope="row" colspan="4" class="td_custom_color">
            {{ calculateAverageScore(listData?.slice(5, 7)) }}
          </th>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import InputBase from "@/components/common/input/InputBase.vue";
import TextArea from "@/components/common/input/TextArea.vue";
import { useI18n } from "vue-i18n";
import { computed } from "vue";
import { ref } from "vue";
import {
  EduCourseCqiEvalStnrdModel,
  EduCourseCqiEvalStnrdReqModel,
} from "@/stores/cqiTrainingProcess/selfAssessmentResult/selfAssessmentResult.type";
import { UP_CD_ID_121902 } from "@/constants/common.const";
import { getListEduCourseCqiEvalStnrd } from "@/stores/cqiTrainingProcess/selfAssessmentResult/selfAssessmentResult.service";
import { commonStore } from "@/stores/common";
const { t } = useI18n();
const rowsText = ref("5");
const table1 = ref({
  row1: {
    input1: "",
    input2: "",
    textArea1: "",
    textArea2: "",
    textArea3: "",
    textArea4: "",
  },
  row2: {
    input1: "",
    input2: "",
    textArea1: "",
    textArea2: "",
    textArea3: "",
    textArea4: "",
  },
});
const table2 = ref({
  row1: {
    input1: "",
    input2: "",
    input3: "",
    textArea1: "",
    textArea2: "",
    textArea3: "",
    textArea4: "",
    textArea5: "",
  },
});
const table3 = ref({
  row1: {
    input1: "",
    input2: "",
    textArea1: "",
    textArea2: "",
    textArea3: "",
    textArea4: "",
  },
  row2: {
    input1: "",
    textArea1: "",
    textArea2: "",
    textArea3: "",
  },
});
const table4 = ref({
  row1: {
    input1: "",
    input2: "",
    input3: "",
    input4: "",
    textArea1: "",
    textArea2: "",
    textArea3: "",
    textArea4: "",
    textArea5: "",
    textArea6: "",
  },
  row2: {
    input1: "",
    input2: "",
    textArea1: "",
    textArea2: "",
    textArea3: "",
    textArea4: "",
  },
});

const cmn = commonStore();

const state = window.history.state;
const { eduCourseCqiSeq } = state;

const eduCourseCqiEvalStnrdReqModel = ref<EduCourseCqiEvalStnrdReqModel>({
  eduCourseCqiSeq: eduCourseCqiSeq,
  evalItemCd: UP_CD_ID_121902,
});

const listData = ref<Array<EduCourseCqiEvalStnrdModel>>();

const averageTable1 = computed(() => {
  const inputs = [
    table1.value.row1.input1,
    table1.value.row1.input2,
    table1.value.row2.input1,
    table1.value.row2.input2,
  ];

  return calculateAverage(inputs);
});
const averageTable2 = computed(() => {
  const inputs = [
    table2.value.row1.input1,
    table2.value.row1.input2,
    table2.value.row1.input3,
  ];

  return calculateAverage(inputs);
});
const averageTable3 = computed(() => {
  const inputs = [
    table3.value.row1.input1,
    table3.value.row1.input2,
    table3.value.row1.input1,
  ];

  return calculateAverage(inputs);
});
const averageTable4 = computed(() => {
  const inputs = [
    table4.value.row1.input1,
    table4.value.row1.input2,
    table4.value.row1.input3,
    table4.value.row1.input4,
    table4.value.row2.input1,
    table4.value.row2.input2,
  ];

  return calculateAverage(inputs);
});

const calculateAverage = (inputs: string[]) => {
  const validInputs = inputs
    .map((input) => Number(input))
    .filter((input) => !isNaN(input) && input > 0);

  const total = validInputs.reduce((sum, input) => sum + input, 0);

  return validInputs.length > 0
    ? (total / validInputs.length).toFixed(1)
    : "0.0";
};

const getDataDetail = () => {
  cmn.setLoading(true);
  getListEduCourseCqiEvalStnrd(eduCourseCqiEvalStnrdReqModel.value).then(
    (res) => {
      listData.value = res.data.data;
      cmn.setLoading(false);
    }
  );
};

const calculateAverageScore = (
  evalItems: Array<EduCourseCqiEvalStnrdModel>
) => {
  let totalScore = 0;
  let totalCount = 0;

  if (!evalItems) {
    return 0;
  }

  evalItems.forEach((evalItem) => {
    evalItem.listEvalStnrdCont.forEach((evalStnrd) => {
      if (evalStnrd.score !== undefined) {
        totalScore += Number(evalStnrd.score);
        totalCount++;
      }
    });
  });

  return totalCount > 0 ? (totalScore / totalCount).toFixed(2) : 0;
};

onBeforeMount(() => {
  getDataDetail();
});
const getData = () => {
  return listData.value;
};

defineExpose({
  getData,
});
</script>

<style scoped lang="css">
.list_ul {
  text-align: left;
}

.list_ul li:before {
  content: "\2022";
  position: relative;
  top: -4px;
  left: -4px;
  padding-left: 4px;
}

.tbl table tbody td,
.tbl table tbody th {
  border-left: 1px solid var(--dark1);
  border-right: 1px solid var(--dark1);
  vertical-align: middle;
}

.tbl table thead th {
  border-left: 1px solid var(--gray-lavender);
  border-right: 1px solid var(--gray-lavender);
  border-bottom: 1px solid var(--gray-lavender);
}

.tbl table thead tr:last-child th,
.tbl table thead tr th[rowspan] {
  border-bottom: none !important;
}

.tbl table thead th:first-child {
  border-left: 1px solid var(--dark1);
}

.tbl table thead th:last-child {
  border-right: 1px solid var(--dark1);
}

.tbl_row table tbody th {
  padding: 18px 6px !important;
  background: var(--dark1);
  color: var(--white-color);
}

.td_custom_color {
  background-color: var(--dark1);
  color: white;
  border: 1px solid white !important;
}

.td_custom_color:first-child {
  border-left: 1px solid var(--dark1) !important;
}

.td_custom_color:last-child {
  border-right: 1px solid var(--dark1) !important;
}
</style>
