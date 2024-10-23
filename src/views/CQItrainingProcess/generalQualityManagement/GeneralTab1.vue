<template>
  <!-- Table1 -->
  <div class="section_tit_wrap">
    <h4 class="section_tit_xs">{{ t("generalTab1.table1.title") }}</h4>
  </div>
  <div class="tbl tbl_col">
    <table>
      <caption>
        {{
          t("generalTab1.table1.caption")
        }}
      </caption>
      <colgroup>
        <col style="width: 18%" />
        <col style="width: 18%" />
        <col style="width: 18%" />
        <col style="width: 18%" />
        <col style="width: 18%" />
        <col style="width: auto" />
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
        <tr
          v-if="dataStudent.length"
          v-for="(item, index) in dataStudent"
          :key="index"
        >
          <td>
            <InputBase
              v-model="item.aff"
              :id="`dataStudent_1_${index}`"
              required
            />
          </td>
          <td>
            <InputBase
              v-model="item.nm"
              :id="`dataStudent_2_${index}`"
              required
            />
          </td>
          <td>
            <InputBase
              v-model="item.majField"
              :id="`dataStudent_3_${index}`"
              required
            />
          </td>
          <td>
            <InputBase
              v-model="item.posi"
              :id="`dataStudent_4_${index}`"
              required
            />
          </td>
          <td>
            <InputBase
              v-model="item.remark"
              :id="`dataStudent_5_${index}`"
              required
            />
          </td>
          <td scope="row">
            <button
              v-if="index == 0"
              @click="handleAddTable('TableStudent')"
              class="button btn_white btn_md"
            >
              {{ t("common.add") }}
            </button>
            <button
              v-else
              @click="handleDeleteItem('TableStudent', index)"
              class="button btn_white btn_md"
            >
              {{ t("common.delete") }}
            </button>
          </td>
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
      <caption>
        {{
          t("generalTab1.table2.caption")
        }}
      </caption>
      <colgroup>
        <col style="width: 22%" />
        <col style="width: auto" />
      </colgroup>
      <tbody>
        <tr>
          <th scope="row">교육과정CQI 시행목적</th>
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
    <p class="section_tit_xxs">
      {{ t("generalTab1.table3.item1.internalTitle") }}
    </p>
    <button
      class="button btn_white btn_md"
      @click="handleAddTable('TableInternal')"
    >
      {{ t("common.add") }}
    </button>
  </div>
  <div class="tbl tbl_col">
    <table>
      <caption>
        {{
          t("generalTab1.table3.item1.caption")
        }}
      </caption>
      <colgroup>
        <col style="width: 17%" />
        <col style="width: 17%" />
        <col style="width: 17%" />
        <col style="width: 17%" />
        <col style="width: 17%" />
        <col style="width: auto" />
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
        <tr
          v-if="dataInternal.length"
          v-for="(item, index) in dataInternal"
          :key="index"
        >
          <td>
            <div class="dp_flex">
              <InputBase
                v-model="item.nm"
                :id="`dataInternal_1_${index}`"
                readonly
              />
              <div class="wd_150">
                <button
                  class="button btn_sm btn_white"
                  @click="openModal(index)"
                >
                  {{ t("common.delete") }}
                </button>
              </div>
            </div>
          </td>
          <td>
            <InputBase
              v-model="item.majField"
              :id="`dataInternal_2_${index}`"
              readonly
            />
          </td>
          <td>
            <InputBase
              v-model="item.aff"
              :id="`dataInternal_3_${index}`"
              readonly
            />
          </td>
          <td>
            <InputBase
              v-model="item.posi"
              :id="`dataInternal_4_${index}`"
              readonly
            />
          </td>
          <td>
            <InputBase
              v-model="item.remark"
              :id="`dataInternal_5_${index}`"
              required
            />
          </td>
          <td>
            <button
              class="button btn_sm btn_white"
              @click="handleDeleteItem('TableInternal', index)"
            >
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
    <p class="section_tit_xxs">
      {{ t("generalTab1.table3.item2.companyTitle") }}
    </p>
    <button
      class="button btn_white btn_md"
      @click="handleAddTable('TableCompany')"
    >
      {{ t("common.add") }}
    </button>
  </div>
  <div class="tbl tbl_col">
    <table>
      <caption>
        {{
          t("generalTab1.table3.item2.caption")
        }}
      </caption>
      <colgroup>
        <col style="width: 17%" />
        <col style="width: 17%" />
        <col style="width: 17%" />
        <col style="width: 17%" />
        <col style="width: 17%" />
        <col style="width: auto" />
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
        <tr
          v-if="dataCompany.length"
          v-for="(item, index) in dataCompany"
          :key="index"
        >
          <td>
            <InputBase
              v-model="item.nm"
              :id="`dataCompany_1_${index}`"
              required
            />
          </td>
          <td>
            <InputBase
              v-model="item.majField"
              :id="`dataCompany_2_${index}`"
              required
            />
          </td>
          <td>
            <InputBase
              v-model="item.aff"
              :id="`dataCompany_3_${index}`"
              required
            />
          </td>
          <td>
            <InputBase
              v-model="item.posi"
              :id="`dataCompany_4_${index}`"
              required
            />
          </td>
          <td>
            <InputBase
              v-model="item.remark"
              :id="`dataCompany_5_${index}`"
              required
            />
          </td>
          <td>
            <button
              class="button btn_md btn_white"
              @click="handleDeleteItem('TableCompany', index)"
            >
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
      <caption>
        {{
          t("generalTab1.table4.caption")
        }}
      </caption>
      <colgroup>
        <col style="width: 20%" />
        <col style="width: 20%" />
        <col style="width: 20%" />
        <col style="width: 20%" />
        <col style="width: 20%" />
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
            <br />
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
      <caption>
        {{
          t("generalTab1.table5.caption")
        }}
      </caption>
      <colgroup>
        <col style="width: 33%" />
        <col style="width: 33%" />
        <col style="width: auto" />
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
      <caption>
        {{
          t("generalTab1.table6.caption")
        }}
      </caption>
      <colgroup>
        <col style="width: 22%" />
        <col style="width: auto" />
      </colgroup>
      <tbody>
        <tr>
          <th scope="row">
            {{ t("generalTab1.table6.header") }}
            <br />
            {{ t("generalTab1.table6.subHeader") }}
          </th>
          <td><TextArea v-model="usagePlan" id="generalTab1" required /></td>
        </tr>
      </tbody>
    </table>
  </div>
  <SelectModal
    v-if="modalOpen"
    @dataSelect="dataSelected"
    :isOpen="modalOpen"
    :lstIdSelect="dataInternal.map((item) => item.staffNo)"
    :onClose="closeModal"
  />
</template>

<script setup lang="ts">
import InputBase from "@/components/common/input/InputBase.vue";
import TextArea from "@/components/common/input/TextArea.vue";
import { useI18n } from "vue-i18n";
import { ref } from "vue";
import SelectModal from "../SelectModal.vue";
import {
  CQI_DIV_COMPANY,
  CQI_DIV_SCHOOL,
  CQI_DIV_STUDENT,
} from "@/constants/common.const";
import { commonStore } from "@/stores/common";
import { EduCourseCqiFilterDetail } from "@/stores/cqiTrainingProcess/cqiTrainingProcess.type";
import { getMajorOverview } from "@/stores/cqiTrainingProcess/overview/overview.service";
import {
  EduCourseOverviewDTO,
  EduCourseOverviewGroupDTO,
} from "@/stores/cqiTrainingProcess/overview/overview.type";

interface ITable {
  [key: string]: string | number;
}

const { t } = useI18n();

const modalOpen = ref(false);
const indexSelect = ref<number>(-1);

const dataInternal = ref<ITable[]>([]);
const dataCompany = ref<ITable[]>([]);
const dataStudent = ref<ITable[]>([
  {
    eduCursCqiGroupSeq: "",
    nm: "",
    majField: "",
    aff: "",
    posi: "",
    remark: "",
  },
]);

const usagePlan = ref("");
const store = commonStore();
const props = defineProps<{ dataDetail: {} }>()

onBeforeMount(() => {
  if (props.dataDetail) {
    convertToObject(props.dataDetail);
  } else {
    getDataDetail();
  }
});

const state = window.history.state;
const { deptCd, typeSeq, year, deptNm } = state;
const dataSave = ref({});

const getDataDetail = () => {
  store.setLoading(true);
  const dataFilter = {
    deptCd: deptCd,
    type: typeSeq,
    year: year,
  } as EduCourseCqiFilterDetail;
  getMajorOverview(dataFilter)
    .then((res) => {
      const response = res.data.data as EduCourseOverviewDTO;
      convertToObject(response);
    })
    .finally(() => {
      store.setLoading(false);
    });
};

const convertToObject = (response: any) => {
  usagePlan.value = response.usagePlan;
      if (response.majorOverviewGroup) {
        dataInternal.value = response.majorOverviewGroup.filter(
          (item:any) => item.divCd == CQI_DIV_SCHOOL
        );
        dataCompany.value = response.majorOverviewGroup.filter(
          (item:any) => item.divCd == CQI_DIV_COMPANY
        );
        dataStudent.value = response.majorOverviewGroup.filter(
          (item:any) => item.divCd == CQI_DIV_STUDENT
        );
      }
}

const handleAddTable = (value: string) => {
  if (value === "TableCompany")
    return dataCompany.value.push({
      eduCursCqiGroupSeq: "",
      staffNo: "",
      nm: "",
      majField: "",
      aff: "",
      posi: "",
      remark: "",
    });
  if (value === "TableInternal")
    return dataInternal.value.push({
      eduCursCqiGroupSeq: "",
      nm: "",
      majField: "",
      aff: "",
      posi: "",
      remark: "",
    });
  return dataStudent.value.push({
    eduCursCqiGroupSeq: "",
    nm: "",
    majField: "",
    aff: "",
    posi: "",
    remark: "",
  });
};

const handleDeleteItem = (value: string, index: number | string) => {
  if (value === "TableInternal") {
    dataInternal.value = [
      ...dataInternal.value.filter((i, ind) => ind !== index),
    ];
  } else if (value === "TableCompany") {
    dataCompany.value = [
      ...dataCompany.value.filter((i, ind) => ind !== index),
    ];
  } else {
    dataStudent.value = [
      ...dataStudent.value.filter((i, ind) => ind !== index),
    ];
  }
};

const openModal = (index: number) => {
  modalOpen.value = true;
  indexSelect.value = index;
};

const closeModal = () => {
  modalOpen.value = false;
  indexSelect.value = -1;
};

const dataSelected = (data: any) => {
  dataInternal.value[indexSelect.value] = {
    eduCursCqiGroupSeq: "",
    aff: data.affli,
    divCd: CQI_DIV_SCHOOL,
    nm: data.nm,
    majField: data.major,
    posi: data.posi,
    remark: data.remark,
    staffNo: data.id,
  };
};
const getData = () => {
  store.setLoading(true);

  const majorOverviewGroupInternal =
    dataInternal.value as EduCourseOverviewGroupDTO[];
  const majorOverviewGroupCompany =
    dataCompany.value as EduCourseOverviewGroupDTO[];
  const majorOverviewGroupStudent =
    dataStudent.value as EduCourseOverviewGroupDTO[];
  const majorOverviewGroup = [] as EduCourseOverviewGroupDTO[];

  majorOverviewGroupInternal.forEach((item) => {
    majorOverviewGroup.push(item);
  });
  majorOverviewGroupCompany.forEach((item) => {
    item.divCd = CQI_DIV_COMPANY;
    majorOverviewGroup.push(item);
  });
  majorOverviewGroupStudent.forEach((item) => {
    item.divCd = CQI_DIV_STUDENT;
    majorOverviewGroup.push(item);
  });
  dataSave.value = {
    usagePlan: usagePlan.value,
    majorOverviewState: [],
    majorOverviewGroup: majorOverviewGroup,
  };
  store.setLoading(false);
  return dataSave.value;
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

.table_title {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
}
</style>
