<template>
  <div class="section_tit_wrap mt_8">
    <h4 class="section_tit_xs">파일 첨부하기</h4>
  </div>
  <div class="tbl tbl_row">
    <table>
      <caption>
        {{
          t("majorTab1.table7.caption")
        }}
      </caption>
      <colgroup>
        <col style="width: 22%" />
        <col style="width: auto" />
      </colgroup>
      <tbody>
        <tr>
          <th scope="row">첨부파일</th>
          <td>
            <InputFileBase
              :id="'eduCourseCqiAttachFile'"
              :name="'eduCourseCqiAttachFile'"
              :type="'office'"
              :referKey="eduCourseCqiSeq"
              :mode="'edit'"
              :multiple="true"
              :maxFile="100000"
              ref="childRefUpLoad"
              :orgName="'EDU_COURSE_CQI'"
              :category="'EDU_COURSE_CQI'"
              :sectionName="'EDU_COURSE_CQI'"
              :showMess="false"
              :subTitle="'※ 10mb 이하의 파일만 등록 가능합니다. '"
              v-model="modelValue"
            >
            </InputFileBase>
            <span v-if="modelValue && modelValue.length == 0"
              >선택된 파일이 없습니다.</span
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { ref } from "vue";
import { commonStore } from "@/stores/common";
import InputFileBase from "@/components/common/input/InputFileBase.vue";
import {
  STS_EDU_CQI_CREATE,
  STS_EDU_CQI_SUCCESS,
} from "@/constants/common.const";
import { MODE_DETAIL, MODE_EDIT } from "@/constants/screen.const";
import { saveEduCourseCqi } from "@/stores/cqiTrainingProcess/cqiTrainingProcess.service";

interface Props {
  year: string;
  deptCd: string;
  typeSeq: string;
}

const { t } = useI18n();
const store = commonStore();

const dataOverview = ref();
const dataResult = ref();

const state = window.history.state;
const { eduCourseCqiSeq, status } = state;

const props = defineProps<Props>();
const mode = ref<string>();
const modelValue = ref<[]>([]);

if (status != STS_EDU_CQI_SUCCESS) {
  mode.value = MODE_EDIT;
} else {
  mode.value = MODE_DETAIL;
}

const childRefUpLoad = ref<InstanceType<typeof InputFileBase> | null>(null);

const saveDataFile = (eduCourseCqiSeq: string) => {
  if (childRefUpLoad.value) {
    childRefUpLoad.value.upLoadFile(eduCourseCqiSeq);
  }
};

watch(modelValue, (newValue, oldValue) => {
  if (newValue.length == 0) {
    store.setLoading(true);
    const dataSave = {
      eduCursCqiSeq: "",
      year: props.year,
      deptCd: props.deptCd,
      eduCursTypeSeq: props.typeSeq,
      stsCd: STS_EDU_CQI_CREATE,
      usagePlan: dataOverview.value?.usagePlan,
      overview: dataOverview.value,
      evalStnrd: dataResult.value,
    };
    saveEduCourseCqi(dataSave).finally(() => {
      store.setLoading(false);
    });
  }
});

defineExpose({
  saveDataFile,
  modelValue,
});
</script>

<style scoped lang="css">
.between {
  justify-content: space-between;
}

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
<style>
.attach_filewrap {
  padding-left: 0 !important;
}
</style>
