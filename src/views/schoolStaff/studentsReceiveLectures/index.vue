<template>
  <section id="content" class="content_wrapper grid_content" tabindex="0">
    <Breadcrumb :pageTitle="pageTitle" :breadcrumbItems="breadcrumbItems"></Breadcrumb>

    <div class="box dp_block">
      <div class="box_section">
        <div class="search_box col_3">
          <ul>
            <li>
              <p>{{ t('schoolStaff.studentReceive.index.year') }}</p>
              <SelectBoxBase :class="'select_row lg'" :id="'selectYear'" :name="'selectYear'" v-model="selectYear" :data="listSelectYearStart" />
            </li>
            <li>
              <p>{{ t('schoolStaff.studentReceive.index.trainingYear') }}</p>
              <SelectBoxBase :class="'select_row lg'" :id="'selectYearTrain'" :name="'selectYearTrain'" v-model="selectYearTrain"
                :data="listSelectYearTrain" />
            </li>
            <li>
              <p>{{ t('schoolStaff.studentReceive.index.subject') }}</p>
              <InputBase v-model="lectureSearchModel.subjectNm"/>
            </li>
          </ul>
        </div>
      </div>

      <div class="box_section">
        <div class="btn_group btn_end">
          <button type="button" class="btn_xl_2 btn_round btn_primary" @click="search()">{{t('common.title.search')}}
          </button>
          <button type="button" class="btn_xl_2 btn_round btn_white" @click="reset()">{{t('common.reset')}}</button>
        </div>
      </div>
    </div>
    <div class="box dp_block">
      <div class="box_section">
        <GridComponentV2 :key="key" :rowData="rowData" :columnDefs="columnDefs" :paginationClientFlag="false"
                         :totalRecord="totalRecord" @customPagination="fnPagination" ref="gridKey">
        </GridComponentV2>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">

import Breadcrumb from "@/components/common/Breadcrumb.vue";
import {ref} from "vue";
import InputBase from "@/components/common/input/InputBase.vue";
import SelectBoxBase from "@/components/common/input/SelectBoxBase.vue";
import GridComponentV2 from "@/components/common/grid/GridComponentV2.vue";
import LinkGridComponent from "@/components/common/grid/LinkGridComponent.vue";
import {SCREEN} from "@/router/screen";
import {useRouter} from 'vue-router';
import {commonStore} from "@/stores/common";
import {studentLectureStore} from "@/stores/schoolStaff/studentecture";
import {
  StudentLectureResponseModel,
  StudentLectureSearchModel
} from "@/stores/schoolStaff/studentecture/studentLecture.type";
import {PAGINATION_PAGE_SIZE, SUCCSESS_STATUS, GRADE_UP_CD_ID, TERM_UP_CD_ID} from "@/constants/screen.const";
import Swal from "sweetalert2";
import { codeMngStore } from "@/stores/common/codeMng";
import {useI18n} from "vue-i18n";

const router = useRouter()
const storeCommon = commonStore()
const storeCodeMng = codeMngStore()
const storeLecture = studentLectureStore()
const { t } = useI18n()

const pageTitle = ref(t('schoolStaff.studentReceive.index.pageTitle'));
const breadcrumbItems = ref([
  {label: 'HOME', link: '/'},
  {label: 'dept1', link: '#'},
  {label: 'dept2', link: '/banner'}
])

//select box
const selectYear = ref('2025')
const selectYearTrain = ref('')
const listSelectYearStart = ref([
  {cdId: '2025', cdNm: '2025', upCdId: ''},
])
const listSelectYearTrain = ref([
  {cdId: '', cdNm: '전체', upCdId: ''},
])

const handleCustomClick = (item: { id: any; }) => {
  router.push({
    name: SCREEN.detailStudentsReceiveLectures.name,
    state: {
      id: item.id
    }
  })
}

//grid
const key = ref(1)
const totalRecord = ref(0)
const rowData = ref([] as Array<StudentLectureResponseModel>)
const columnDefs = ref([
  {headerName: t('schoolStaff.studentReceive.list.trainingMonthYear'), field: 'trainingMonthYear'},
  {headerName: t('schoolStaff.studentReceive.list.majorName'), field: 'majorNm'},
  {headerName: t('schoolStaff.studentReceive.list.department'), field: 'deptNm',},
  {
    headerName: t('schoolStaff.studentReceive.list.subject'),
    field: 'sbjtNm',
    cellRenderer: LinkGridComponent,
    cellRendererParams: {onCustomEvent: handleCustomClick},
    cellStyle: {
      color: '#2704FF',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
    }
  },
  {headerName: t('schoolStaff.studentReceive.list.sustDivNm'), field: 'sustDivNm'},
  {headerName: t('schoolStaff.studentReceive.list.grade'), field: 'gradeNm'},
  {headerName: t('schoolStaff.studentReceive.list.divName'), field: 'divNm'},
  {headerName: t('schoolStaff.studentReceive.list.trainingYear'), field: 'eduYear',},
])

//model
const lectureSearchModel = ref({
  eduYear: '2025',
  gradeYear: '',
  termNm: '',
  subjectNm: '',
  staffNm: '',

  page: 1,
  size: PAGINATION_PAGE_SIZE,
  sort: ''
} as StudentLectureSearchModel)

let isLoading = ref(true)

onBeforeMount(async () => {
  try {
    await Promise.all([getListSelectYearTrain(), getListSelectYearStart(), getDataAll()])
    isLoading.value = false
  } catch (e) {
    storeCommon.setLoading(false)
    showAlert(e + '')
  }
});

//alert
const showAlert = (message: string) => {
  Swal.fire({
    text: message,
    showCancelButton: true,
    showConfirmButton: false,
    confirmButtonColor: '#DD6B55',
    confirmButtonText: t('common.confirm'),
    cancelButtonText: t('common.close'),
  })
}

const fnPagination = (pageNumber: any, pagesSize: any) => {
  lectureSearchModel.value.page = pageNumber
  lectureSearchModel.value.size = pagesSize

  if (!isLoading.value) {
    isLoading.value = true
    getDataAll()
  }
}

const getListSelectYearTrain = async () => {
  storeCommon.setLoading(true)

  await storeCodeMng.getCodeInfo({upCdId: TERM_UP_CD_ID})
  if (storeCodeMng.status && storeCodeMng.status == SUCCSESS_STATUS) {
    if (storeCodeMng.codeInfo) {
      listSelectYearTrain.value = [
        ...listSelectYearTrain.value,
        ...storeCodeMng.codeInfo.data.filter((item: { upCdId: string; }) => item.upCdId == TERM_UP_CD_ID)
      ]
    }
  }

  storeCommon.setLoading(false)
}

const getListSelectYearStart = async () => {
  storeCommon.setLoading(true)

  for (let i = 2026; i <= new Date().getFullYear(); i++) {
    listSelectYearStart.value.push({
      cdId: i + "",
      upCdId: '',
      cdNm: i + ""
    })
  }

  storeCommon.setLoading(false)
}

const search = () => {
  key.value++
  lectureSearchModel.value.eduYear = selectYear.value
  lectureSearchModel.value.termNm = selectYearTrain.value
  lectureSearchModel.value.page = 1
}

const reset = () => {
  lectureSearchModel.value = {
    eduYear: '',
    gradeYear: '',
    termNm: '',
    subjectNm: '',
    staffNm: '',

    page: 1,
    size: lectureSearchModel.value.size,
    sort: ''
  } as StudentLectureSearchModel

  selectYear.value = listSelectYearStart.value[0].cdId
  selectYearTrain.value = listSelectYearTrain.value[0].cdId
}

const getDataAll = async () => {
  if (isLoading.value) {
    storeCommon.setLoading(true)
    await storeLecture.searchStudentLecture(lectureSearchModel.value)
      .then(() => {
        if (storeLecture.status && storeLecture.status == SUCCSESS_STATUS) {
          rowData.value = storeLecture.resultData.map((item: any) => {
            item.trainingMonthYear = item.termNm ? (item.eduYear + '-' + item.termNm) : item.eduYear

            return item
          })
          totalRecord.value = storeLecture.totalRecord ?? 0
        }
      })
      .catch(() => { })
      .finally(() => {
        isLoading.value = false
        storeCommon.setLoading(false)
      })
  }

}

</script>


<style scoped></style>