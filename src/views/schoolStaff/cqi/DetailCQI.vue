<template>
  <section id="content" class="content_wrapper grid_content" tabindex="0">
    <Breadcrumb :pageTitle="pageTitle" :breadcrumbItems="breadcrumbItems"></Breadcrumb>

    <div class="box dp_block">
      <h5 class="box_title">{{ t('schoolStaff.cqi.detail.boxTitle1') }}</h5>
      <div class="box_section">
        <table class="tbl_row">
          <caption>table col</caption>
          <colgroup>
            <col style="width: auto"/>
            <col style="width: auto"/>
          </colgroup>
          <tbody>

          <tr>
            <th scope="col">{{ t('schoolStaff.cqi.detail.table1.yearSemester') }}</th>
            <td>{{ dataInfo.yearSemester }}</td>
            <th scope="col">{{ t('schoolStaff.cqi.detail.table1.subjectTitle') }}</th>
            <td>{{ dataInfo.subjectTitle }}</td>
            <th scope="col">{{ t('schoolStaff.cqi.detail.table1.point') }}</th>
            <td>{{ dataInfo.point }}</td>
            <th scope="col">{{ t('schoolStaff.cqi.detail.table1.initDate') }}</th>
            <td>{{ dataInfo.initDate }}</td>
          </tr>

          <tr>
            <th scope="col">{{ t('schoolStaff.cqi.detail.table1.initYear') }}</th>
            <td>{{ dataInfo.initYear }}</td>
            <th scope="col">{{ t('schoolStaff.cqi.detail.table1.classify') }}</th>
            <td>{{ dataInfo.classify }}</td>
            <th scope="col">{{ t('schoolStaff.cqi.detail.table1.count') }}</th>
            <td>{{ dataInfo.count }}명</td>
            <th scope="col">{{ t('schoolStaff.cqi.detail.table1.professor') }}</th>
            <td>{{ dataInfo.professor }}</td>
          </tr>

          </tbody>
        </table>
      </div>

      <h5 class="box_title mt_8">{{ t('schoolStaff.cqi.detail.boxTitle2') }}</h5>
      <div class="box_section">
        <table class="tbl_col">
          <caption>table col</caption>
          <colgroup>
            <col style="width: auto;">
            <col style="width: auto;">
            <col style="width: 10%;">
            <col :style="{width: route.params.type === 'major' ? '10%' : 'auto'}">
            <col :style="{width: route.params.type === 'major' ? 'auto' : '10%'}">
            <col style="width: auto;">
            <col style="width: 10%;">
          </colgroup>
          <thead>
          <tr>
            <th scope="col" v-for="i in tableHeader" :key="i">{{ i }}</th>
          </tr>
          </thead>
          <tbody>
          <template v-for="(item, index) in dataPerformanceAssessment" :key="index">
            <tr>
              <td v-for="(row, rowIndex) in item.rowNum" :key="rowIndex">{{ row.col }}</td>
            </tr>
          </template>
          </tbody>
        </table>
      </div>
      <div class="box_section mt_6">
        <table class="tbl_col">
          <caption>table col</caption>
          <colgroup>
            <col style="width: 20%"/>
            <col style="width: auto"/>
          </colgroup>
          <tbody>
          <tr>
            <th>{{t('schoolStaff.cqi.detail.table3.performanceAssessment')}}</th>
            <td>
              <RadiobuttonBase v-for="item in listRadio" :mode="'show'" :value="item.name" v-model="radiovalue"
                               :id="item.id" :name="item.id" :key="item.id" :checked="item.name == radiovalue"
                               :label="item.name">
                radio
              </RadiobuttonBase>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

      <h5 class="box_title mt_8">{{ t('schoolStaff.cqi.detail.boxTitle3') }}</h5>
      <div class="box_section">
        <table class="tbl_col">
          <caption>table col</caption>
          <colgroup>
            <col style="width: 20%"/>
            <col style="width: auto"/>
            <col style="width: 35%"/>
          </colgroup>
          <thead>
          <tr>
            <th scope="col">구분</th>
            <th scope="col">문항</th>
            <th scope="col">평가</th>
          </tr>
          </thead>
          <tbody>
          <template v-for="(tableItem,index) in table2" :key="index">
            <tr>
              <th :rowspan="tableItem?.rowSpan" :style="{ display: !tableItem?.rowSpan ? 'none' : '' }">
                {{ tableItem.row1 }}
              </th>
              <td>{{ tableItem.row2 }}</td>
              <td>
                <RadiobuttonBase v-for="item in listRadio" :mode="'show'" :value="item.name"
                                 v-model="tableItem.value"
                                 :id="`table2_${item.id}_${index}`" :name="`table2_${item.name}_${index}`"
                                 :key="`table2_${item.id}_${index}`"
                                 :checked="item.name == tableItem.value"
                                 :label="`${item.name}`">
                  radio
                </RadiobuttonBase>
              </td>
            </tr>
          </template>

          </tbody>
        </table>
      </div>

      <h5 class="box_title mt_8">{{ t('schoolStaff.cqi.detail.boxTitle4') }}</h5>
      <div class="box_section mt_8">
        <table class="tbl_col">
          <caption>table col</caption>
          <colgroup>
            <col style="width: 5%"/>
            <col style="width: auto"/>
            <col style="width: 35%"/>
          </colgroup>
          <thead>
          <tr>
            <th scope="col">{{ t('schoolStaff.cqi.detail.table4.category') }}</th>
            <th scope="col">{{ t('schoolStaff.cqi.detail.table4.question') }}</th>
            <th scope="col">{{ t('schoolStaff.cqi.detail.table4.evaluation') }}</th>
          </tr>
          </thead>
          <tbody>
          <template v-for="(tableItem,index) in table3" :key="index">
            <tr>
              <th>{{ index + 1 }}</th>
              <td>{{ tableItem.title }}</td>
              <td>
                <RadiobuttonBase v-for="item in listRadio" :mode="'show'" :value="item.name"
                                 v-model="tableItem.value"
                                 :id="`table3_${item.id}_${index}`" :name="`table3_${item.name}_${index}`"
                                 :key="`table3_${item.id}_${index}`"
                                 :checked="item.name == tableItem.value"
                                 :label="`${item.name}`">
                  radio
                </RadiobuttonBase>
              </td>
            </tr>
          </template>
          </tbody>
        </table>
      </div>
      <div class="box_section mt_6">
        <table class="tbl_row">
          <caption>table col</caption>
          <colgroup>
            <col style="width: 20%"/>
            <col style="width: auto"/>
          </colgroup>
          <thead>
          </thead>
          <tbody>
          <tr>
            <th scope="col">{{t('schoolStaff.cqi.detail.table5.title')}}</th>
            <td>
              <TextArea v-model="professorAnalytic"/>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

      <h5 class="box_title mt_8">{{ t('schoolStaff.cqi.detail.boxTitle5') }}</h5>
      <div class="box_section">
        <table class="tbl_col">
          <caption>table col</caption>
          <colgroup>
            <col style="width: auto;">

            <col style="width: 8%;">
            <col style="width: 8%;">
            <col style="width: 8%;">
            <col style="width: 8%;">
            <col style="width: 8%;">
            <col style="width: 8%;">
            <col style="width: 8%;">
            <col style="width: 8%;">
            <col style="width: 8%;">
            <col style="width: 8%;">
            <col style="width: 8%;">
          </colgroup>
          <thead>
          <tr>
            <th colspan="12" scope="colgroup">{{t('schoolStaff.cqi.detail.table6.coreCompetencies')}}</th>
          </tr>
          <tr>
            <th scope="col"></th>
            <th scope="col" v-for="i in table4" :key="i">{{ i }}</th>
          </tr>
          </thead>

          <tbody>
          <tr>
            <td>{{t('schoolStaff.cqi.detail.table6.personnel')}}</td>
            <td v-for="(item,index) in table4">
              -
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="box_section mt_6">
        <table class="tbl_row">
          <caption>table col</caption>
          <colgroup>
            <col style="width: 20%"/>
            <col style="width: auto"/>
          </colgroup>
          <thead>
          </thead>
          <tbody>
          <tr>
            <th>{{t('schoolStaff.cqi.detail.table6.title')}}</th>
            <td>
              <TextArea v-model="achievementAnalytic"/>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="box_section mt_6">
        <table class="tbl_row">
          <caption>table col</caption>
          <colgroup>
            <col style="width: 20%"/>
            <col style="width: auto"/>
          </colgroup>
          <thead>
          </thead>
          <tbody>
          <tr>
            <th>{{t('schoolStaff.cqi.detail.table7.title')}}</th>
            <td>
              <TextArea v-model="improve"/>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

      <div class="box_section mt_8">
        <div class="btn_group btn_end">
          <button type="button" class="button btn_lg btn_gray btn_responsive ">{{ t('common.save') }}
          </button>
          <button type="button" class="button btn_lg btn_blue btn_responsive ">{{ t('common.print') }}
          </button>
          <button type="button" class="button btn_lg btn_white btn_responsive ">{{ t('common.list') }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import {onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {commonStore} from "@/stores/common";
import {SCREEN} from "@/router/screen";
import RadiobuttonBase from "@/components/common/input/RadiobuttonBase.vue";
import TextArea from "@/components/common/input/TextArea.vue";
import {useI18n} from "vue-i18n";

const route = useRoute()
const router = useRouter()
const store = commonStore()
const {t} = useI18n()

const pageTitle = ref('')
const breadcrumbItems = ref([
  {label: 'HOME', link: '/'},
  {label: 'dept1', link: '#'},
  {label: 'dept2', link: '/banner'}
])
const id = ref(null)
const professorAnalytic = ref('professorAnalytic')
const achievementAnalytic = ref('achievementAnalytic')
const improve = ref('improve')
const dataInfo = ref({
  yearSemester: "2025-1",
  subjectTitle: "교과목명A",
  point: "3",
  initDate: "2024-09-09",
  initYear: "2",
  classify: "전공필수",
  count: "00",
  professor: "홍길동"
})
// table1
const tableHeader = ref<string[]>([])
const dataPerformanceAssessment = ref<TableCustom[]>([])

// radio
const listRadio = ref([
  {id: '1', name: '매우 미흡'},
  {id: '2', name: '교내외'},
  {id: '3', name: '보통'},
  {id: '4', name: '우수'},
  {id: '5', name: '매우 우수'},
])
const radiovalue = ref('')

//table
const table2 = ref([
  {
    row1: '준비',
    row2: '1. 학생들의 수준과 요구를 파악하려고 노력하였다.',
    value: null,
    rowSpan: 2
  },
  {
    row1: '준비',
    row2: '2. 학생 수준에 맞게 수업을 계획하였다.',
    value: null
  },

  {
    row1: '진행',
    row2: '1. 학생의 흥미를 유도하기 위해 노력하였다.',
    value: null,
    rowSpan: 4
  },
  {
    row1: '진행',
    row2: '2. 학생들이 적극 참여하는 수업을 진행하였다.',
    value: null
  },
  {
    row1: '진행',
    row2: '3. 학생들에게 적절한 답변과 피드백을 제공하였다.',
    value: null
  },
  {
    row1: '진행',
    row2: '4. 수업시간과 기간을 준수하였고 학생 출결관리를 엄격히 하였다.',
    value: null
  },

  {
    row1: '평가',
    row2: '1. 성적평가 기준을 명확히 알리고, 공정하게 평가하였다.',
    value: null,
    rowSpan: 1
  },
])
const table3 = ref([
  {
    title: "교수님은 수업계획을 안내하고 성실하게 진행하셨다.",
    value: null,
  },
  {
    title: "수업은 학생들이 학습에 대한 흥미를 갖도록 진행되었다.",
    value: null,
  },
  {
    title: "수업은 학생들이 수업내용을 이해할 수 있도록 진행되었다.",
    value: null,
  },
  {
    title: "수업의 발표 및 토론은 활발하게 진행되었다.",
    value: null,
  },
  {
    title: "교수님은 학생들과 활발하게 소통하였다.",
    value: null,
  },
  {
    title: "교수님은 학습활동에 대해 적절한 피드백을 제공하였다.",
    value: null,
  },
  {
    title: "교수님은 시험/발표/과제에 대해 공정하게 평가하려고 노력하였다.",
    value: null,
  },
  {
    title: "온라인 수업(컨텐츠)의 구성과 내용은 적절하였다.",
    value: null,
  },
  {
    title: "온라인 수업(컨텐츠)와 오프라인(강의실) 수업은 상호보완적이며 체계적으로 이루어졌다.",
    value: null,
  },
  {
    title: "수업은 (지식) 향상에 도움이 되었다. (- 기업경영 실무의 이해)",
    value: null,
  },
  {
    title: "수업은 (기술) 향상에 도움이 되었다. (- 실무적용 기술의 이해)",
    value: null,
  },
  {
    title: "수업은 (태도) 향상에 도움이 되었다. (- 창의적 문제해결 노력 )",
    value: null,
  },
  {
    title: "나는 수업에 성실하게 참여하였다.",
    value: null,
  },
  {
    title: "수업의 난이도는 교과 목표를 달성하는데 적절하였다.",
    value: null,
  },
])
const table4 = ref([
    'A+',"A","B+","B","C+","C","D+","D","P","F","계"
])
const valueTable4 = {}

onMounted(() => {
  id.value = window.history.state.id
  pageTitle.value = route.params.type === 'major' ? t('schoolStaff.cqi.detail.pageTitleMajor') : t('schoolStaff.cqi.detail.pageTitleGeneral')
  if (!id.value) {
    router.replace({name: SCREEN.home.name})
  }
  if (route.params.type === 'major') {
    tableHeader.value = [
      t('schoolStaff.cqi.detail.tableHeaderMajor.header1'),
      t('schoolStaff.cqi.detail.tableHeaderMajor.header2'),
      t('schoolStaff.cqi.detail.tableHeaderMajor.header3'),
      t('schoolStaff.cqi.detail.tableHeaderMajor.header4'),
      t('schoolStaff.cqi.detail.tableHeaderMajor.header5'),
      t('schoolStaff.cqi.detail.tableHeaderMajor.header6'),
      t('schoolStaff.cqi.detail.tableHeaderMajor.header7')
    ]
    dataPerformanceAssessment.value = [
      {
        rowNum: [
          {col: "호텔경영전문가"},
          {col: "호텔전문지식 및 호텔SW융합실무"},
          {col: "운영관리능력"},
          {col: "시장조사"},
          {col: "호텔시장 동향 분석을 통해 호텔의 매출 목표를 설정할 수 있다."},
          {col: "하"},
          {col: "평가방법"},
        ]
      },
      {
        rowNum: [
          {col: "호텔경영전문가"},
          {col: "호텔전문지식 및 호텔SW융합실무"},
          {col: "운영관리능력"},
          {col: "경쟁사 동향파악"},
          {col: "호텔시장 동향 분석을 통해 호텔의 매출 목표를 설정할 수 있다."},
          {col: "하"},
          {col: "평가방법"},
        ]
      },
      ]
  } else {
    tableHeader.value = [
      t('schoolStaff.cqi.detail.tableHeaderGeneral.header1'),
      t('schoolStaff.cqi.detail.tableHeaderGeneral.header2'),
      t('schoolStaff.cqi.detail.tableHeaderGeneral.header3'),
      t('schoolStaff.cqi.detail.tableHeaderGeneral.header4'),
      t('schoolStaff.cqi.detail.tableHeaderGeneral.header5'),
      t('schoolStaff.cqi.detail.tableHeaderGeneral.header6'),
      t('schoolStaff.cqi.detail.tableHeaderGeneral.header7')
    ]
    dataPerformanceAssessment.value = [
      {
        rowNum: [
          {col: "지혜로움"},
          {col: "자아정체성"},
          {col: "자아탐색"},
          {col: "자신의 현재 위상과 역량 및 미래가능성에 대해 분석ㆍ판단하고 있다"},
          {col: "보고서"},
          {col: "평가방법"},
          {col: "5수준"},
        ]
      },
      {
        rowNum: [
          {col: "지혜로움"},
          {col: "자아정체성"},
          {col: "자아탐색"},
          {col: "자신의 현재 위상과 역량 및 미래가능성에 대해 분석ㆍ판단하고 있다"},
          {col: "보고서"},
          {col: "평가방법"},
          {col: "5수준"},
        ]
      }
    ]
  }
})
</script>

<style scoped>

</style>