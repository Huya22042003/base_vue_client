<template>
  <!-- Table1 -->
  <div class="section_tit_wrap">
    <h4 class="section_tit_xs">{{ t("generalTab2.table1.title") }}</h4>
  </div>
  <div class="tbl tbl_col">
    <table>
      <caption>{{ t("generalTab2.table1.caption") }}</caption>
      <colgroup>
        <col style="width:20%">
        <col style="width:18%">
        <col style="width:10%">
        <col style="width:18%">
        <col style="width:18%">
        <col style="width:18%">
      </colgroup>
      <thead>
      <tr>
        <th scope="col">{{ t("generalTab2.table1.header1") }}</th>
        <th scope="col">{{ t("generalTab2.table1.header2") }}</th>
        <th scope="col">{{ t("generalTab2.table1.header3") }}</th>
        <th scope="col">{{ t("generalTab2.table1.header4") }}</th>
        <th scope="col">{{ t("generalTab2.table1.header5") }}</th>
        <th scope="col">{{ t("generalTab2.table1.header6") }}</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <th scope="row" rowspan="2">{{ t("generalTab2.table1.row1.header1") }}</th>
        <th scope="row">{{ t("generalTab2.table1.row1.content1") }}</th>
        <th scope="row">
          <InputBase v-model="table1.row1.input1" id="generalTab2-table1-input1" :isNumber="true" minValue="0" maxValue="5" :decimalPlaces="1" required/>
        </th>
        <th scope="row"><TextArea v-model="table1.row1.textArea1" :rows='rowsText' id="generalTab2-table1-textArea1" required/></th>
        <th scope="row" rowspan="2"><TextArea v-model="table1.row1.textArea3" :rows='rowsText' id="generalTab2-table1-textArea3" :resize-auto="true" required/></th>
        <th scope="row" rowspan="2"><TextArea v-model="table1.row1.textArea4" :rows='rowsText' id="generalTab2-table1-textArea4" :resize-auto="true" required/></th>
      </tr>
      <tr>
        <th scope="row">{{ t("generalTab2.table1.row1.content2") }}</th>
        <th scope="row">
          <InputBase v-model="table1.row1.input2" id="generalTab2-table-input2" :isNumber="true" minValue="0" maxValue="5" :decimalPlaces="1" required/>
        </th>
        <th scope="row"><TextArea v-model="table1.row1.textArea2" :rows='rowsText' id="generalTab2-table-textArea2" required/></th>
      </tr>

      <!-- row2 -->
      <tr>
        <th scope="row" rowspan="2">{{ t("generalTab2.table1.row2.header1") }}</th>
        <th scope="row">{{ t("generalTab2.table1.row2.content1") }}</th>
        <th scope="row">
          <InputBase v-model="table1.row2.input1" id="generalTab2-table1-input3" :isNumber="true" minValue="0" maxValue="5" :decimalPlaces="1" required/>
        </th>
        <th scope="row"><TextArea v-model="table1.row2.textArea1" :rows='rowsText' id="generalTab2-table1-textArea5" required/></th>
        <th scope="row" rowspan="2"><TextArea v-model="table1.row2.textArea3" :rows='rowsText' id="generalTab2-table1-textArea6" :resize-auto="true" required/></th>
        <th scope="row" rowspan="2"><TextArea v-model="table1.row2.textArea4" :rows='rowsText' id="generalTab2-table1-textArea7" :resize-auto="true" required/></th>
      </tr>
      <tr>
        <th scope="row">{{ t("generalTab2.table1.row2.content2") }}</th>
        <th scope="row">
          <InputBase v-model="table1.row2.input2" id="generalTab2-table1-input4" :isNumber="true" minValue="0" maxValue="5" :decimalPlaces="1" required/>
        </th>
        <th scope="row"><TextArea v-model="table1.row2.textArea2" :rows='rowsText' id="generalTab2-table1-textArea8" required/></th>
      </tr>

      <!-- row3 -->
      <tr>
        <th scope="row" colspan="2">{{ t("generalTab2.table1.average") }}</th>
        <th scope="row" colspan="4">{{averageTable1}}</th>
      </tr>
      </tbody>
    </table>
  </div>

  <!-- Table2 -->
  <div class="section_tit_wrap mt_8">
    <h4 class="section_tit_xs">{{ t("generalTab2.table2.title") }}</h4>
  </div>
  <div class="tbl tbl_col">
    <table>
      <caption>{{ t("generalTab2.table2.caption") }}</caption>
      <colgroup>
        <col style="width:20%">
        <col style="width:18%">
        <col style="width:10%">
        <col style="width:18%">
        <col style="width:18%">
        <col style="width:18%">
      </colgroup>
      <thead>
      <tr>
        <th scope="col">{{ t("generalTab2.table2.header1") }}</th>
        <th scope="col">{{ t("generalTab2.table2.header2") }}</th>
        <th scope="col">{{ t("generalTab2.table2.header3") }}</th>
        <th scope="col">{{ t("generalTab2.table2.header4") }}</th>
        <th scope="col">{{ t("generalTab2.table2.header5") }}</th>
        <th scope="col">{{ t("generalTab2.table2.header6") }}</th>
      </tr>
      </thead>
      <tbody>
      <!-- row1 -->
      <tr>
        <th scope="row" rowspan="3">{{ t("generalTab2.table2.row1.header1") }}</th>
        <th scope="row">{{ t("generalTab2.table2.row1.content1") }}</th>
        <th scope="row">
          <InputBase v-model="table2.row1.input1" id="generalTab2-table2-input1" :isNumber="true" minValue="0" maxValue="5" :decimalPlaces="1" required/>
        </th>
        <th scope="row"><TextArea v-model="table2.row1.textArea1" :rows='rowsText' id="generalTab2-table2-textArea1" required/></th>
        <th scope="row" rowspan="3"><TextArea v-model="table2.row1.textArea4" :rows='rowsText' id="generalTab2-table2-textArea4" :resize-auto="true" required/></th>
        <th scope="row" rowspan="3"><TextArea v-model="table2.row1.textArea5" :rows='rowsText' id="generalTab2-table2-textArea5" :resize-auto="true" required/></th>
      </tr>
      <tr>
        <th scope="row">{{ t("generalTab2.table2.row1.content2") }}</th>
        <th scope="row">
          <InputBase v-model="table2.row1.input2" id="generalTab2-table2-input2" :isNumber="true" minValue="0" maxValue="5" :decimalPlaces="1" required/>
        </th>
        <th scope="row"><TextArea v-model="table2.row1.textArea2" :rows='rowsText' id="generalTab2-table2-textArea2" required/></th>
      </tr>
      <tr>
        <th scope="row">{{ t("generalTab2.table2.row1.content3") }}</th>
        <th scope="row">
          <InputBase v-model="table2.row1.input3" id="generalTab2-table2-input3" :isNumber="true" minValue="0" maxValue="5" :decimalPlaces="1" required/>
        </th>
        <th scope="row"><TextArea v-model="table2.row1.textArea3" :rows='rowsText' id="generalTab2-table2-textArea3" required/></th>
      </tr>

      <!-- row2 -->
      <tr>
        <th scope="row" colspan="2">{{ t("generalTab2.table2.average") }}</th>
        <th scope="row" colspan="4">{{averageTable2}}</th>
      </tr>
      </tbody>
    </table>
  </div>

  <!-- Table3 -->
  <div class="section_tit_wrap mt_8">
    <h4 class="section_tit_xs">{{ t("generalTab2.table3.title") }}</h4>
  </div>
  <div class="tbl tbl_col">
    <table>
      <caption>{{ t("generalTab2.table3.caption") }}</caption>
      <colgroup>
        <col style="width:20%">
        <col style="width:18%">
        <col style="width:10%">
        <col style="width:18%">
        <col style="width:18%">
        <col style="width:18%">
      </colgroup>
      <thead>
      <tr>
        <th scope="col">{{ t("generalTab2.table3.header1") }}</th>
        <th scope="col">{{ t("generalTab2.table3.header2") }}</th>
        <th scope="col">{{ t("generalTab2.table3.header3") }}</th>
        <th scope="col">{{ t("generalTab2.table3.header4") }}</th>
        <th scope="col">{{ t("generalTab2.table3.header5") }}</th>
        <th scope="col">{{ t("generalTab2.table3.header6") }}</th>
      </tr>
      </thead>
      <tbody>
      <!-- row1 -->
      <tr>
        <th scope="row" rowspan="2">{{ t("generalTab2.table3.row1.header1") }}</th>
        <th scope="row">{{ t("generalTab2.table3.row1.content1") }}</th>
        <th scope="row">
          <InputBase v-model="table3.row1.input1" id="generalTab2-table3-input" :isNumber="true" minValue="0" maxValue="5" :decimalPlaces="1" required/>
        </th>
        <th scope="row"><TextArea v-model="table3.row1.textArea1" :rows='rowsText' id="generalTab2-table3-textArea1" required/></th>
        <th scope="row" rowspan="2"><TextArea v-model="table3.row1.textArea3" :rows='rowsText' id="generalTab2-table3-textArea3" :resize-auto="true" required/></th>
        <th scope="row" rowspan="2"><TextArea v-model="table3.row1.textArea4" :rows='rowsText' id="generalTab2-table3-textArea4" :resize-auto="true" required/></th>
      </tr>
      <tr>
        <th scope="row">{{ t("generalTab2.table3.row1.content2") }}</th>
        <th scope="row">
          <InputBase v-model="table3.row1.input2" id="generalTab2-table3-input" :isNumber="true" minValue="0" maxValue="5" :decimalPlaces="1" required/>
        </th>
        <th scope="row"><TextArea v-model="table3.row1.textArea2" :rows='rowsText' id="generalTab2-table3-textArea2" required/></th>
      </tr>
      <!-- row2 -->
      <tr>
        <th scope="row">{{ t("generalTab2.table3.row2.header1") }}</th>
        <th scope="row">{{ t("generalTab2.table3.row2.content1") }}</th>
        <th scope="row">
          <InputBase v-model="table3.row2.input1" id="generalTab2-table3-input" :isNumber="true" minValue="0" maxValue="5" :decimalPlaces="1" required/>
        </th>
        <th scope="row"><TextArea v-model="table3.row2.textArea1" :rows='rowsText' id="generalTab2-table3-textArea1" required/></th>
        <th scope="row"><TextArea v-model="table3.row2.textArea2" :rows='rowsText' id="generalTab2-table3-textArea2" required/></th>
        <th scope="row"><TextArea v-model="table3.row2.textArea3" :rows='rowsText' id="generalTab2-table3-textArea3" required/></th>
      </tr>

      <!-- row3 -->
      <tr>
        <th scope="row" colspan="2">{{ t("generalTab2.table3.average") }}</th>
        <th scope="row" colspan="4">{{averageTable3}}</th>
      </tr>
      </tbody>
    </table>
  </div>

  <!-- Table4 -->
  <div class="section_tit_wrap mt_8">
    <h4 class="section_tit_xs">{{ t("generalTab2.table4.title") }}</h4>
  </div>
  <div class="tbl tbl_col">
    <table>
      <caption>{{ t("generalTab2.table4.caption") }}</caption>
      <colgroup>
        <col style="width:20%">
        <col style="width:18%">
        <col style="width:10%">
        <col style="width:18%">
        <col style="width:18%">
        <col style="width:18%">
      </colgroup>
      <thead>
      <tr>
        <th scope="col">{{ t("generalTab2.table4.header1") }}</th>
        <th scope="col">{{ t("generalTab2.table4.header2") }}</th>
        <th scope="col">{{ t("generalTab2.table4.header3") }}</th>
        <th scope="col">{{ t("generalTab2.table4.header4") }}</th>
        <th scope="col">{{ t("generalTab2.table4.header5") }}</th>
        <th scope="col">{{ t("generalTab2.table4.header6") }}</th>
      </tr>
      </thead>
      <tbody>
      <!-- row1 -->
      <tr>
        <th scope="row" rowspan="4">{{ t("generalTab2.table4.row1.header1") }}</th>
        <th scope="row">{{ t("generalTab2.table4.row1.content1") }}</th>
        <th scope="row">
          <InputBase v-model="table4.row1.input1" id="generalTab2-table4-input1" :isNumber="true" minValue="0" maxValue="5" :decimalPlaces="1" required/>
        </th>
        <th scope="row"><TextArea v-model="table4.row1.textArea1" :rows='rowsText' id="generalTab2-table4-textArea1" required/></th>
        <th scope="row" rowspan="4"><TextArea v-model="table4.row1.textArea5" :rows='rowsText' id="generalTab2-table4-textArea5" :resize-auto="true" required/></th>
        <th scope="row" rowspan="4"><TextArea v-model="table4.row1.textArea6" :rows='rowsText' id="generalTab2-table4-textArea6" :resize-auto="true" required/></th>
      </tr>
      <tr>
        <th scope="row">{{ t("generalTab2.table4.row1.content2") }}</th>
        <th scope="row">
          <InputBase v-model="table4.row1.input2" id="generalTab2-table4-input2" :isNumber="true" minValue="0" maxValue="5" :decimalPlaces="1" required/>
        </th>
        <th scope="row"><TextArea v-model="table4.row1.textArea2" :rows='rowsText' id="generalTab2-table4-textArea2" required/></th>
      </tr>
      <tr>
        <th scope="row">{{ t("generalTab2.table4.row1.content3") }}</th>
        <th scope="row">
          <InputBase v-model="table4.row1.input3" id="generalTab2-table4-input3" :isNumber="true" minValue="0" maxValue="5" :decimalPlaces="1" required/>
        </th>
        <th scope="row"><TextArea v-model="table4.row1.textArea3" :rows='rowsText' id="generalTab2-table4-textArea3" required/></th>
      </tr>
      <tr>
        <th scope="row">{{ t("generalTab2.table4.row1.content4") }}</th>
        <th scope="row">
          <InputBase v-model="table4.row1.input4" id="generalTab2-table4-input4" :isNumber="true" minValue="0" maxValue="5" :decimalPlaces="1" required/>
        </th>
        <th scope="row"><TextArea v-model="table4.row1.textArea4" :rows='rowsText' id="generalTab2-table4-textArea4" required/></th>
      </tr>

      <!-- row2 -->
      <tr>
        <th scope="row" rowspan="2">{{ t("generalTab2.table4.row2.header1") }}</th>
        <th scope="row">{{ t("generalTab2.table4.row2.content1") }}</th>
        <th scope="row">
          <InputBase v-model="table4.row2.input1" id="generalTab2-table4-input5" :isNumber="true" minValue="0" maxValue="5" :decimalPlaces="1" required/>
        </th>
        <th scope="row"><TextArea v-model="table4.row2.textArea1" :rows='rowsText' id="generalTab2-table4-textArea7" required/></th>
        <th scope="row" rowspan="2"><TextArea v-model="table4.row2.textArea3" :rows='rowsText' id="generalTab2-table4-textArea9" :resize-auto="true" required/></th>
        <th scope="row" rowspan="2"><TextArea v-model="table4.row2.textArea4" :rows='rowsText' id="generalTab2-table4-textArea10" :resize-auto="true" required/></th>
      </tr>
      <tr>
        <th scope="row">{{ t("generalTab2.table4.row2.content2") }}</th>
        <th scope="row">
          <InputBase v-model="table4.row2.input2" id="generalTab2-table4-input6" :isNumber="true" minValue="0" maxValue="5" :decimalPlaces="1" required/>
        </th>
        <th scope="row"><TextArea v-model="table4.row2.textArea2" :rows='rowsText' id="generalTab2-table4-textArea8" required/></th>
      </tr>

      <!-- row3 -->
      <tr>
        <th scope="row" colspan="2">{{ t("generalTab2.table4.average") }}</th>
        <th scope="row" colspan="4">{{averageTable4}}</th>
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
import {ref} from 'vue'

const {t} = useI18n();
const rowsText = ref('3');
const table1 = ref({
  row1:{
    input1:"",
    input2:"",
    textArea1:"",
    textArea2:"",
    textArea3:"",
    textArea4:"",
  },
  row2:{
    input1:"",
    input2:"",
    textArea1:"",
    textArea2:"",
    textArea3:"",
    textArea4:"",
  }
})
const table2 = ref({
  row1:{
    input1:"",
    input2:"",
    input3:"",
    textArea1:"",
    textArea2:"",
    textArea3:"",
    textArea4:"",
    textArea5:"",
  },
})
const table3 = ref({
  row1:{
    input1:"",
    input2:"",
    textArea1:"",
    textArea2:"",
    textArea3:"",
    textArea4:"",
  },
  row2:{
    input1:"",
    textArea1:"",
    textArea2:"",
    textArea3:"",
  },
})
const table4 = ref({
  row1:{
    input1:"",
    input2:"",
    input3:"",
    input4:"",
    textArea1:"",
    textArea2:"",
    textArea3:"",
    textArea4:"",
    textArea5:"",
    textArea6:"",
  },
  row2:{
    input1:"",
    input2:"",
    textArea1:"",
    textArea2:"",
    textArea3:"",
    textArea4:"",
  },
})

const averageTable1 = computed(() => {
  const inputs = [
    table1.value.row1.input1, table1.value.row1.input2, table1.value.row1.input3,
    table1.value.row2.input1, table1.value.row2.input2, table1.value.row2.input3,
    table1.value.row2.input4, table1.value.row2.input5, table1.value.row2.input6
  ];

  return calculateAverage(inputs)
});
const averageTable2 = computed(() => {
  const inputs = [
    table2.value.row1.input1,table2.value.row1.input2,table2.value.row1.input3,
    table2.value.row1.input4,table2.value.row1.input5,table2.value.row1.input6,
  ];

  return calculateAverage(inputs)
});
const averageTable3 = computed(() => {
  const inputs = [
    table3.value.row1.input1,table3.value.row2.input1,table3.value.row2.input2,
  ];

  return calculateAverage(inputs)
});
const averageTable4 = computed(() => {
  const inputs = [
    table4.value.row1.input1,table4.value.row1.input2,table4.value.row1.input3,
    table4.value.row1.input4,table4.value.row2.input1,table4.value.row2.input2
  ];

  return calculateAverage(inputs)
});

const calculateAverage = (inputs:string[]) => {
  const validInputs = inputs
      .map(input => Number(input))
      .filter(input => !isNaN(input) && input > 0);

  const total = validInputs.reduce((sum, input) => sum + input, 0);

  return validInputs.length > 0 ? (total / validInputs.length).toFixed(1) : '0.0';
};

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
</style>
