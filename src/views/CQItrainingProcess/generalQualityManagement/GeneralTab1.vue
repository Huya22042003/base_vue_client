<template>
  <!-- Table1 -->
  <div class="section_tit_wrap">
    <h4 class="section_tit_xs">{{ t("generalTab1.table1.title") }}</h4>
  </div>
  <div class="tbl tbl_col">
    <table>
      <caption>{{ t("generalTab1.table1.caption") }}</caption>
      <colgroup>
        <col style="width:18%">
        <col style="width:18%">
        <col style="width:18%">
        <col style="width:18%">
        <col style="width:18%">
        <col style="width:auto">
      </colgroup>
      <thead>
      <tr>
        <th scope="col">{{ t("generalTab1.table1.header1") }}</th>
        <th scope="col">{{ t("generalTab1.table1.header2") }}</th>
        <th scope="col">{{ t("generalTab1.table1.header3") }}</th>
        <th scope="col">{{ t("generalTab1.table1.header4") }}</th>
        <th scope="col">{{ t("generalTab1.table1.header5") }}</th>
        <th scope="col">{{ t("generalTab1.table1.header6") }}</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <th scope="row">
          <InputBase :isNumber="true" v-model="table1.value1" id="table1_value1" required/>
        </th>
        <th scope="row">
          <InputBase :isNumber="true" minValue="0" maxValue="5" decimalPlaces="5" v-model="table1.value2" id="table1_value2" required/>
        </th>
        <th scope="row">
          <InputBase v-model="table1.value3" id="table1_value3" required/>
        </th>
        <th scope="row">
          <InputBase :isNumber="true" v-model="table1.value4" id="table1_value4" required/>
        </th>
        <th scope="row">
          <InputBase :isNumber="true" v-model="table1.value5" id="table1_value5" required/>
        </th>
        <th scope="row">
          <button class="button btn_white btn_md">{{ t("common.add") }}</button>
        </th>
      </tr>
      </tbody>
    </table>
  </div>

  <!-- Table2 -->
  <div class="section_tit_wrap mt_8">
    <h4 class="section_tit_xs">{{ t("generalTab1.table2.title") }}</h4>
  </div>
  <div class="tbl tbl_row">
    <table>
      <caption>{{ t("generalTab1.table2.caption") }}</caption>
      <colgroup>
        <col style="width:22%;">
        <col style="width:auto;">
      </colgroup>
      <tbody>
      <tr>
        <th scope="row">{{ t("generalTab1.table2.title") }}</th>
        <td>
          <ul class="list_ul">
            <li>{{ t("generalTab1.table2.content1") }}</li>
            <li>{{ t("generalTab1.table2.content2") }}</li>
            <li>{{ t("generalTab1.table2.content3") }}</li>
          </ul>
        </td>
      </tr>
      </tbody>
    </table>
  </div>

  <!-- Table3 -->
  <div class="section_tit_wrap mt_8">
    <h4 class="section_tit_xs">{{ t("generalTab1.table3.title") }}</h4>
  </div>
  <div class="table_title">
    <p class="section_tit_xxs">{{ t("generalTab1.table3.item1.internalTitle") }}</p>
    <button class="button btn_white btn_md" @click="handleAddTable('TableInternal')">
      {{ t("common.add") }}
    </button>
  </div>
  <div class="tbl tbl_col">
    <table>
      <caption>{{ t("generalTab1.table3.item1.caption") }}</caption>
      <colgroup>
        <col style="width:17%">
        <col style="width:17%">
        <col style="width:17%">
        <col style="width:17%">
        <col style="width:17%">
        <col style="width:auto">
      </colgroup>
      <thead>
      <tr>
        <th scope="row">{{ t("generalTab1.table3.item1.header1") }}</th>
        <th scope="row">{{ t("generalTab1.table3.item1.header2") }}</th>
        <th scope="row">{{ t("generalTab1.table3.item1.header3") }}</th>
        <th scope="row">{{ t("generalTab1.table3.item1.header4") }}</th>
        <th scope="row">{{ t("generalTab1.table3.item1.header5") }}</th>
        <th scope="row">{{ t("generalTab1.table3.item1.header6") }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-if="table3Internal.length" v-for="(item,index) in table3Internal" :key="item.id">
        <td>
          <InputBase v-model="item.value1" :id="`table3Internal_1_${item.id}`" required/>
        </td>
        <td>
          <InputBase v-model="item.value2" :id="`table3Internal_2_${item.id}`" required/>
        </td>
        <td>
          <InputBase v-model="item.value3" :id="`table3Internal_3_${item.id}`" required/>
        </td>
        <td>
          <InputBase v-model="item.value4" :id="`table3Internal_4_${item.id}`" required/>
        </td>
        <td>
          <InputBase v-model="item.value5" :id="`table3Internal_5_${item.id}`" required/>
        </td>
        <td>
          <button class="button btn_sm btn_white" @click="handleDeleteItem('TableInternal',item.id)">
            {{ t("common.delete") }}
          </button>
        </td>
      </tr>
      <tr v-else>
        <td colspan="6">{{ t("generalTab1.table3.item1.emptyMessage") }}</td>
      </tr>
      </tbody>
    </table>
  </div>

  <div class="table_title mt_8">
    <p class="section_tit_xxs">{{ t("generalTab1.table3.item2.companyTitle") }}</p>
    <button class="button btn_white btn_md" @click="handleAddTable('TableCompany')">
      {{ t("common.add") }}
    </button>
  </div>
  <div class="tbl tbl_col">
    <table>
      <caption>{{ t("generalTab1.table3.item2.caption") }}</caption>
      <colgroup>
        <col style="width:17%">
        <col style="width:17%">
        <col style="width:17%">
        <col style="width:17%">
        <col style="width:17%">
        <col style="width:auto">
      </colgroup>
      <thead>
      <tr>
        <th scope="row">{{ t("generalTab1.table3.item2.header1") }}</th>
        <th scope="row">{{ t("generalTab1.table3.item2.header2") }}</th>
        <th scope="row">{{ t("generalTab1.table3.item2.header3") }}</th>
        <th scope="row">{{ t("generalTab1.table3.item2.header4") }}</th>
        <th scope="row">{{ t("generalTab1.table3.item2.header5") }}</th>
        <th scope="row">{{ t("generalTab1.table3.item2.header6") }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-if="table3Company.length" v-for="(item,index) in table3Company" :key="item.id">
        <td>
          <InputBase v-model="item.value1" :id="`table3Company_1_${item.id}`" required/>
        </td>
        <td>
          <InputBase v-model="item.value2" :id="`table3Company_2_${item.id}`" required/>
        </td>
        <td>
          <InputBase v-model="item.value3" :id="`table3Company_3_${item.id}`" required/>
        </td>
        <td>
          <InputBase v-model="item.value4" :id="`table3Company_4_${item.id}`" required/>
        </td>
        <td>
          <InputBase v-model="item.value5" :id="`table3Company_5_${item.id}`" required/>
        </td>
        <td>
          <button class="button btn_md btn_white" @click="handleDeleteItem('TableCompany',item.id)">
            {{ t("common.delete") }}
          </button>
        </td>
      </tr>
      <tr v-else>
        <td colspan="6">{{ t("generalTab1.table3.item2.emptyMessage") }}</td>
      </tr>
      </tbody>
    </table>
  </div>

  <!-- Table4 -->
  <div class="section_tit_wrap mt_8">
    <h4 class="section_tit_xs">{{ t("generalTab1.table4.title") }}</h4>
  </div>
  <div class="tbl tbl_col">
    <table>
      <caption>{{ t("generalTab1.table4.caption") }}</caption>
      <colgroup>
        <col style="width:20%">
        <col style="width:20%">
        <col style="width:20%">
        <col style="width:20%">
        <col style="width:20%">
      </colgroup>
      <thead>
      <tr>
        <th scope="row">{{ t("generalTab1.table4.header1") }}</th>
        <th scope="row">{{ t("generalTab1.table4.header2") }}</th>
        <th scope="row">{{ t("generalTab1.table4.header3") }}</th>
        <th scope="row">{{ t("generalTab1.table4.header4") }}</th>
        <th scope="row">{{ t("generalTab1.table4.header5") }}</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <th>{{ t("generalTab1.table4.contentHeader1") }}</th>
        <td>
          <ul class="list_ul">
            <li>{{ t("generalTab1.table4.content1_1") }}</li>
            <li>{{ t("generalTab1.table4.content1_2") }}</li>
            <li>{{ t("generalTab1.table4.content1_3") }}</li>
          </ul>
        </td>
        <td>
          <ul class="list_ul">
            <li>{{ t("generalTab1.table4.content2_1") }}</li>
            <li>{{ t("generalTab1.table4.content2_2") }}</li>
            <li>{{ t("generalTab1.table4.content2_3") }}</li>
            <li>{{ t("generalTab1.table4.content2_4") }}</li>
            <li>{{ t("generalTab1.table4.content2_5") }}</li>
            <li>{{ t("generalTab1.table4.content2_6") }}</li>
          </ul>
        </td>
        <td>
          <ul class="list_ul">
            <li>{{ t("generalTab1.table4.content3_1") }}</li>
            <li>{{ t("generalTab1.table4.content3_2") }}</li>
          </ul>
        </td>
        <td>
          <ul class="list_ul">
            <li>{{ t("generalTab1.table4.content4_1") }}</li>
          </ul>
        </td>
      </tr>
      <tr>
        <th>{{ t("generalTab1.table4.contentHeader2") }}</th>
        <td>{{ t("generalTab1.table4.content5_1") }}</td>
        <td>{{ t("generalTab1.table4.content5_2") }}</td>
        <td>{{ t("generalTab1.table4.content5_3") }}</td>
        <td>
          {{ t("generalTab1.table4.content5_4") }}
          <br/>
          {{ t("generalTab1.table4.subContent5_4") }}
        </td>
      </tr>
      </tbody>
    </table>
  </div>

  <!-- Table5 -->
  <div class="section_tit_wrap mt_8">
    <h4 class="section_tit_xs">{{ t("generalTab1.table5.title") }}</h4>
  </div>
  <div class="tbl tbl_col">
    <table>
      <caption>{{ t("generalTab1.table5.caption") }}</caption>
      <colgroup>
        <col style="width:33%">
        <col style="width:33%">
        <col style="width:auto">
      </colgroup>
      <thead>
      <tr>
        <th scope="row">{{ t("generalTab1.table5.header1") }}</th>
        <th scope="row">{{ t("generalTab1.table5.header2") }}</th>
        <th scope="row">{{ t("generalTab1.table5.header3") }}</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td rowspan="3">{{ t("generalTab1.table5.content1_1") }}</td>
        <td>{{ t("generalTab1.table5.content1_2") }}</td>
        <td rowspan="8">{{ t("generalTab1.table5.evaluationMethod") }}</td>
      </tr>
      <tr>
        <td>{{ t("generalTab1.table5.content1_3") }}</td>
      </tr>
      <tr>
        <td>{{ t("generalTab1.table5.content1_4") }}</td>
      </tr>
      <tr>
        <td>{{ t("generalTab1.table5.content2_1") }}</td>
        <td>{{ t("generalTab1.table5.content2_2") }}</td>
      </tr>
      <tr>
        <td rowspan="2">{{ t("generalTab1.table5.content3_1") }}</td>
        <td>{{ t("generalTab1.table5.content3_2") }}</td>
      </tr>
      <tr>
        <td>{{ t("generalTab1.table5.content3_3") }}</td>
      </tr>
      <tr>
        <td rowspan="2">{{ t("generalTab1.table5.content4_1") }}</td>
        <td>{{ t("generalTab1.table5.content4_2") }}</td>
      </tr>
      <tr>
        <td>{{ t("generalTab1.table5.content4_3") }}</td>
      </tr>
      </tbody>
    </table>
  </div>

  <!-- Table6 -->
  <div class="section_tit_wrap mt_8">
    <h4 class="section_tit_xs">{{ t("generalTab1.table6.title") }}</h4>
  </div>
  <div class="tbl tbl_row">
    <table>
      <caption>{{ t("generalTab1.table6.caption") }}</caption>
      <colgroup>
        <col style="width:22%;">
        <col style="width:auto;">
      </colgroup>
      <tbody>
      <tr>
        <th scope="row">
          {{ t("generalTab1.table6.header") }}
          <br/>
          {{ t("generalTab1.table6.subHeader") }}
        </th>
        <td><TextArea v-model="table6TextArea" id="generalTab1" required/></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import InputBase from "@/components/common/input/InputBase.vue";
import TextArea from "@/components/common/input/TextArea.vue";
import { useI18n } from "vue-i18n";
import {ref} from 'vue'

interface ITable {
  [key: string]: string | number
}

const {t} = useI18n();
const table1 = ref<ITable>({
  value1: "",
  value2: "",
  value3: "",
  value4: "",
  value5: "",
})
const table2 = ref<ITable>({
  value1: "",
  value2: "",
  value3: "",
  value4: "",
  value5: "",
  value6: "",
  value7: "",
  value8: "",
  value9: "",
  value10: "",
  value11: "",
})

const table3Internal = ref<ITable[]>([])
const table3Company = ref<ITable[]>([])

const table6TextArea = ref('')

const handleAddTable = (value: string) => {
  if (value !== 'TableCompany')
    return table3Internal.value.push({
      id:new Date().getTime(),
      value1: "",
      value2: "",
      value3: "",
      value4: "",
      value5: ""
    })
  return table3Company.value.push({
    id:new Date().getTime(),
    value1: "",
    value2: "",
    value3: "",
    value4: "",
    value5: ""
  })
}

const handleDeleteItem = (value: string, index: number | string) => {
  if (value !== 'TableCompany') {
    table3Internal.value = [...table3Internal.value.filter((i) => i.id !== index)];
  } else {
    table3Company.value = [...table3Company.value.filter((i) => i.id !== index)];
  }
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

.table_title {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
}
</style>
