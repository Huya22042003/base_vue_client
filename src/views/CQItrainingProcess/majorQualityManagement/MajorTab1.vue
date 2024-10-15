<template>
  <!-- Table1 -->
  <div class="section_tit_wrap">
    <h4 class="section_tit_xs">{{ t("majorTab1.table1.title") }}</h4>
  </div>
  <div class="tbl tbl_col">
    <table>
      <caption>{{ t("majorTab1.table1.caption") }}</caption>
      <colgroup>
        <col style="width:9%">
        <col style="width:9%">
        <col style="width:9%">
        <col style="width:9%">
        <col style="width:9%">
        <col style="width:9%">
        <col style="width:9%">
        <col style="width:9%">
        <col style="width:9%">
        <col style="width:9%">
        <col style="width:9%">
      </colgroup>
      <thead>
      <tr>
        <th scope="rowgroup" rowspan="2">{{ t("majorTab1.table1.header1") }}</th>
        <th scope="colgroup" colspan="3">{{ t("majorTab1.table1.header2") }}</th>
        <th scope="colgroup" colspan="3">{{ t("majorTab1.table1.header3") }}</th>
        <th scope="colgroup" colspan="3">{{ t("majorTab1.table1.header4") }}</th>
        <th scope="rowgroup" rowspan="2">{{ t("majorTab1.table1.header5") }}</th>
      </tr>
      <tr>
        <th scope="col">{{ t("majorTab1.table1.subHeader1") }}</th>
        <th scope="col">{{ t("majorTab1.table1.subHeader2") }}</th>
        <th scope="col">{{ t("majorTab1.table1.subHeader3") }}</th>
        <th scope="col">{{ t("majorTab1.table1.subHeader4") }}</th>
        <th scope="col">{{ t("majorTab1.table1.subHeader5") }}</th>
        <th scope="col">{{ t("majorTab1.table1.subHeader6") }}</th>
        <th scope="col">{{ t("majorTab1.table1.subHeader7") }}</th>
        <th scope="col">{{ t("majorTab1.table1.subHeader8") }}</th>
        <th scope="col">{{ t("majorTab1.table1.subHeader9") }}</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <th scope="row">{{ t("majorTab1.table1.text1") }}</th>
        <th scope="row">
          <InputBase :isNumber="true" v-model="table1.value1" id="table1_value1" required/>
        </th>
        <th scope="row">
          <InputBase :isNumber="true" v-model="table1.value2" id="table1_value2" required/>
        </th>
        <th scope="row">
          <InputBase :isNumber="true" v-model="table1.value3" id="table1_value3" required/>
        </th>
        <th scope="row">
          <InputBase :isNumber="true" v-model="table1.value4" id="table1_value4" required/>
        </th>
        <th scope="row">
          <InputBase :isNumber="true" v-model="table1.value5" id="table1_value5" required/>
        </th>
        <th scope="row">
          <InputBase :isNumber="true" v-model="table1.value6" id="table1_value6" required/>
        </th>
        <th scope="row">
          <InputBase :isNumber="true" v-model="table1.value7" id="table1_value7" required/>
        </th>
        <th scope="row">
          <InputBase :isNumber="true" v-model="table1.value8" id="table1_value8" required/>
        </th>
        <th scope="row">
          <InputBase :isNumber="true" v-model="table1.value9" id="table1_value9" required/>
        </th>
        <th scope="row">
          <InputBase :isNumber="true" v-model="table1.value10" id="table1_value10" required/>
        </th>
      </tr>
      </tbody>
    </table>
  </div>

  <!-- Table2 -->
  <div class="section_tit_wrap mt_8">
    <h4 class="section_tit_xs">{{ t("majorTab1.table2.title") }}</h4>
  </div>
  <div class="tbl tbl_col">
    <table>
      <caption>{{ t("majorTab1.table2.caption") }}</caption>
      <colgroup>
        <col style="width:10%">
        <col style="width:auto">
        <col style="width:8%">
        <col style="width:8%">
        <col style="width:8%">
        <col style="width:8%">
        <col style="width:auto">
        <col style="width:8%">
        <col style="width:8%">
        <col style="width:8%">
        <col style="width:8%">
        <col style="width:auto">
      </colgroup>
      <thead>
      <tr>
        <th scope="row" rowspan="2">{{ t("majorTab1.table2.header1") }}</th>
        <th scope="row" rowspan="2">{{ t("majorTab1.table2.header2") }}</th>
        <th scope="col" colspan="4">{{ t("majorTab1.table2.header3") }}</th>
        <th scope="row" rowspan="2">{{ t("majorTab1.table2.header4") }}</th>
        <th scope="col" colspan="4">{{ t("majorTab1.table2.header5") }}</th>
        <th scope="col" rowspan="2">{{ t("majorTab1.table2.header6") }}</th>
      </tr>
      <tr>
        <th scope="col">{{ t("majorTab1.table2.subHeader1") }}</th>
        <th scope="col">{{ t("majorTab1.table2.subHeader2") }}</th>
        <th scope="col">{{ t("majorTab1.table2.subHeader3") }}</th>
        <th scope="col">{{ t("majorTab1.table2.subHeader4") }}</th>
        <th scope="col">{{ t("majorTab1.table2.subHeader5") }}</th>
        <th scope="col">{{ t("majorTab1.table2.subHeader6") }}</th>
        <th scope="col">{{ t("majorTab1.table2.subHeader7") }}</th>
        <th scope="col">{{ t("majorTab1.table2.subHeader8") }}</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <th scope="row">{{ t("majorTab1.table2.text1") }}</th>
        <th scope="row">
          <InputBase :isNumber="true" v-model="table2.value1" id="table2_value1" required/>
        </th>
        <th scope="row">
          <InputBase :isNumber="true" v-model="table2.value2" id="table2_value2" required/>
        </th>
        <th scope="row">
          <InputBase :isNumber="true" v-model="table2.value3" id="table2_value3" required/>
        </th>
        <th scope="row">
          <InputBase :isNumber="true" v-model="table2.value4" id="table2_value4" required/>
        </th>
        <th scope="row">
          <InputBase :isNumber="true" v-model="table2.value5" id="table2_value5" required/>
        </th>
        <th scope="row">
          <InputBase :isNumber="true" v-model="table2.value6" id="table2_value6" required/>
        </th>
        <th scope="row">
          <InputBase :isNumber="true" v-model="table2.value7" id="table2_value7" required/>
        </th>
        <th scope="row">
          <InputBase :isNumber="true" v-model="table2.value8" id="table2_value8" required/>
        </th>
        <th scope="row">
          <InputBase :isNumber="true" v-model="table2.value9" id="table2_value9" required/>
        </th>
        <th scope="row">
          <InputBase :isNumber="true" v-model="table2.value10" id="table2_value10" required/>
        </th>
        <th scope="row">
          <InputBase :isNumber="true" v-model="table2.value11" id="table2_value11" required/>
        </th>
      </tr>
      </tbody>
    </table>
  </div>

  <!-- Table3 -->
  <div class="section_tit_wrap mt_8">
    <h4 class="section_tit_xs">{{ t("majorTab1.table3.title") }}</h4>
  </div>
  <div class="tbl tbl_row">
    <table>
      <caption>{{ t("majorTab1.table3.caption") }}</caption>
      <colgroup>
        <col style="width:22%;">
        <col style="width:auto;">
      </colgroup>
      <tbody>
      <tr>
        <th scope="row">{{ t("majorTab1.table3.title") }}</th>
        <td>
          <ul class="list_ul">
            <li>{{ t("majorTab1.table3.content1") }}</li>
            <li>{{ t("majorTab1.table3.content2") }}</li>
            <li>{{ t("majorTab1.table3.content3") }}</li>
          </ul>
        </td>
      </tr>
      </tbody>
    </table>
  </div>

  <!-- Table4 -->
  <div class="section_tit_wrap mt_8">
    <h4 class="section_tit_xs">{{ t("majorTab1.table4.title") }}</h4>
  </div>
  <p class="section_tit_xxs">{{ t("majorTab1.table4.item1.internalTitle") }}</p>
  <div class="tbl tbl_col">
    <table>
      <caption>{{ t("majorTab1.table4.item1.caption") }}</caption>
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
        <th scope="row">{{ t("majorTab1.table4.item1.header1") }}</th>
        <th scope="row">{{ t("majorTab1.table4.item1.header2") }}</th>
        <th scope="row">{{ t("majorTab1.table4.item1.header3") }}</th>
        <th scope="row">{{ t("majorTab1.table4.item1.header4") }}</th>
        <th scope="row">{{ t("majorTab1.table4.item1.header5") }}</th>
        <th scope="row">{{ t("majorTab1.table4.item1.header6") }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-if="table4Internal.length" v-for="(item,index) in table4Internal" :key="item.id">
        <td>
          <InputBase v-model="item.value1" :id="`table4Internal_1_${item.id}`" required/>
        </td>
        <td>
          <InputBase v-model="item.value2" :id="`table4Internal_2_${item.id}`" required/>
        </td>
        <td>
          <InputBase v-model="item.value3" :id="`table4Internal_3_${item.id}`" required/>
        </td>
        <td>
          <InputBase v-model="item.value4" :id="`table4Internal_4_${item.id}`" required/>
        </td>
        <td>
          <InputBase v-model="item.value5" :id="`table4Internal_5_${item.id}`" required/>
        </td>
        <td>
          <button class="button btn_sm btn_white" @click="handleDeleteItem('TableInternal',item.id)">
            {{ t("common.delete") }}
          </button>
        </td>
      </tr>
      <tr v-else>
        <td colspan="6">{{ t("majorTab1.table4.item1.emptyMessage") }}</td>
      </tr>
      </tbody>
    </table>
  </div>
  <p class="section_tit_xxs mt_8">{{ t("majorTab1.table4.item2.companyTitle") }}</p>
  <div class="tbl tbl_col">
    <table>
      <caption>{{ t("majorTab1.table4.item2.caption") }}</caption>
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
        <th scope="row">{{ t("majorTab1.table4.item2.header1") }}</th>
        <th scope="row">{{ t("majorTab1.table4.item2.header2") }}</th>
        <th scope="row">{{ t("majorTab1.table4.item2.header3") }}</th>
        <th scope="row">{{ t("majorTab1.table4.item2.header4") }}</th>
        <th scope="row">{{ t("majorTab1.table4.item2.header5") }}</th>
        <th scope="row">{{ t("majorTab1.table4.item2.header6") }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-if="table4Company.length" v-for="(item,index) in table4Company" :key="item.id">
        <td>
          <InputBase v-model="item.value1" :id="`table4Company_1_${item.id}`" required/>
        </td>
        <td>
          <InputBase v-model="item.value2" :id="`table4Company_2_${item.id}`" required/>
        </td>
        <td>
          <InputBase v-model="item.value3" :id="`table4Company_3_${item.id}`" required/>
        </td>
        <td>
          <InputBase v-model="item.value4" :id="`table4Company_4_${item.id}`" required/>
        </td>
        <td>
          <InputBase v-model="item.value5" :id="`table4Company_5_${item.id}`" required/>
        </td>
        <td>
          <button class="button btn_md btn_white" @click="handleDeleteItem('TableCompany',item.id)">
            {{ t("common.delete") }}
          </button>
        </td>
      </tr>
      <tr v-else>
        <td colspan="6">{{ t("majorTab1.table4.item2.emptyMessage") }}</td>
      </tr>
      </tbody>
    </table>
  </div>

  <!-- Table5 -->
  <div class="section_tit_wrap mt_8">
    <h4 class="section_tit_xs">{{ t("majorTab1.table5.title") }}</h4>
  </div>
  <div class="tbl tbl_col">
    <table>
      <caption>{{ t("majorTab1.table5.caption") }}</caption>
      <colgroup>
        <col style="width:20%">
        <col style="width:20%">
        <col style="width:20%">
        <col style="width:20%">
        <col style="width:20%">
      </colgroup>
      <thead>
      <tr>
        <th scope="row">{{ t("majorTab1.table5.header1") }}</th>
        <th scope="row">{{ t("majorTab1.table5.header2") }}</th>
        <th scope="row">{{ t("majorTab1.table5.header3") }}</th>
        <th scope="row">{{ t("majorTab1.table5.header4") }}</th>
        <th scope="row">{{ t("majorTab1.table5.header5") }}</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <th>{{ t("majorTab1.table5.contentHeader1") }}</th>
        <td>
          <ul class="list_ul">
            <li>{{ t("majorTab1.table5.content1_1") }}</li>
            <li>{{ t("majorTab1.table5.content1_2") }}</li>
            <li>{{ t("majorTab1.table5.content1_3") }}</li>
          </ul>
        </td>
        <td>
          <ul class="list_ul">
            <li>{{ t("majorTab1.table5.content2_1") }}</li>
            <li>{{ t("majorTab1.table5.content2_2") }}</li>
            <li>{{ t("majorTab1.table5.content2_3") }}</li>
            <li>{{ t("majorTab1.table5.content2_4") }}</li>
            <li>{{ t("majorTab1.table5.content2_5") }}</li>
            <li>{{ t("majorTab1.table5.content2_6") }}</li>
          </ul>
        </td>
        <td>
          <ul class="list_ul">
            <li>{{ t("majorTab1.table5.content3_1") }}</li>
            <li>{{ t("majorTab1.table5.content3_2") }}</li>
          </ul>
        </td>
        <td>
          <ul class="list_ul">
            <li>{{ t("majorTab1.table5.content4_1") }}</li>
          </ul>
        </td>
      </tr>
      <tr>
        <th>{{ t("majorTab1.table5.contentHeader2") }}</th>
        <td>{{ t("majorTab1.table5.content5_1") }}</td>
        <td>{{ t("majorTab1.table5.content5_2") }}</td>
        <td>{{ t("majorTab1.table5.content5_3") }}</td>
        <td>
          {{ t("majorTab1.table5.content5_4") }}
          <br/>
          {{ t("majorTab1.table5.subContent5_4") }}
        </td>
      </tr>
      </tbody>
    </table>
  </div>

  <!-- Table6 -->
  <div class="section_tit_wrap mt_8">
    <h4 class="section_tit_xs">{{ t("majorTab1.table6.title") }}</h4>
  </div>
  <div class="tbl tbl_col">
    <table>
      <caption>{{ t("majorTab1.table6.caption") }}</caption>
      <colgroup>
        <col style="width:33%">
        <col style="width:33%">
        <col style="width:auto">
      </colgroup>
      <thead>
      <tr>
        <th scope="row">{{ t("majorTab1.table6.header1") }}</th>
        <th scope="row">{{ t("majorTab1.table6.header2") }}</th>
        <th scope="row">{{ t("majorTab1.table6.header3") }}</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td rowspan="2">{{ t("majorTab1.table6.content1_1") }}</td>
        <td>{{ t("majorTab1.table6.content2_1") }}</td>
        <td rowspan="7">{{ t("majorTab1.table6.content3_1") }}</td>
      </tr>
      <tr>
        <td>{{ t("majorTab1.table6.content2_2") }}</td>
      </tr>
      <tr>
        <td>{{ t("majorTab1.table6.content1_2") }}</td>
        <td>{{ t("majorTab1.table6.content2_3") }}</td>
      </tr>
      <tr>
        <td rowspan="2">{{ t("majorTab1.table6.content1_3") }}</td>
        <td>{{ t("majorTab1.table6.content2_4") }}</td>
      </tr>
      <tr>
        <td>{{ t("majorTab1.table6.content2_5") }}</td>
      </tr>
      <tr>
        <td rowspan="2">{{ t("majorTab1.table6.content1_4") }}</td>
        <td>{{ t("majorTab1.table6.content2_6") }}</td>
      </tr>
      <tr>
        <td>{{ t("majorTab1.table6.content2_7") }}</td>
      </tr>
      </tbody>
    </table>
  </div>

  <!-- Table7 -->
  <div class="section_tit_wrap mt_8">
    <h4 class="section_tit_xs">{{ t("majorTab1.table7.title") }}</h4>
  </div>
  <div class="tbl tbl_row">
    <table>
      <caption>{{ t("majorTab1.table7.caption") }}</caption>
      <colgroup>
        <col style="width:22%;">
        <col style="width:auto;">
      </colgroup>
      <tbody>
      <tr>
        <th scope="row">
          {{ t("majorTab1.table7.header") }}
          <br/>
          {{ t("majorTab1.table7.subHeader") }}
        </th>
        <td><TextArea v-model="table7TextArea" id="majorTab1" required/></td>
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

const {t} = useI18n();
interface ITable {
  [key: string]: string | number
}

const table1 = ref<ITable>({
  value1:"",
  value2:"",
  value3:"",
  value4:"",
  value5:"",
  value6:"",
  value7:"",
  value8:"",
  value9:"",
  value10:"",
})
const table2 = ref<ITable>({
  value1:"",
  value2:"",
  value3:"",
  value4:"",
  value5:"",
  value6:"",
  value7:"",
  value8:"",
  value9:"",
  value10:"",
  value11:"",
})

const table4Internal = ref<ITable[]>([])
const table4Company = ref<ITable[]>([])

const table7TextArea = ref('')

const handleAddTable = (value: string) => {
  if (value !== 'TableCompany')
    return table4Internal.value.push({
      id:new Date().getTime(),
      value1: "",
      value2: "",
      value3: "",
      value4: "",
      value5: ""
    })
  return table4Company.value.push({
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
    table4Internal.value = [...table4Internal.value.filter((i) => i.id !== index)];
  } else {
    table4Company.value = [...table4Company.value.filter((i) => i.id !== index)];
  }
};
</script>

<style scoped lang="css">
.list_ul {
  text-align: left;
}
.list_ul li:before{
  content: "\2022";
  position: relative;
  top: -4px;
  left: -4px;
  padding-left: 4px;
}
.tbl table tbody td,
.tbl table tbody th{
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
.tbl table thead tr th[rowspan]{
  border-bottom: none !important;
}

.tbl table thead th:first-child {
  border-left: 1px solid var(--dark1);
}
.tbl table thead th:last-child{
  border-right: 1px solid var(--dark1);
}
.tbl_row table tbody th {
  padding: 18px 6px !important;
  background: var(--dark1);
  color: var(--white-color);
}
</style>
