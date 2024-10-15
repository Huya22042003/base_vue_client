<template>
  <section id="content" class="content_wrapper grid_content" tabindex="0">
    <Breadcrumb :pageTitle="pageTitle" :breadcrumbItems="breadcrumbItems"></Breadcrumb>

    <div class="box dp_block">
      <div class="box_section">
        <div class="search_box col_4">
          <ul>
            <li>
              <p class="">{{ t('schoolStaff.studentReceive.detail.major') }}</p>
              <SelectBoxBase :class="'select_row lg'" :id="'selectSubjectDepartment'" :name="'selectSubjectDepartment'"
                             v-model="selectSubjectDepartment" :data="listSelectSubjectDepartment" />
            </li>
            <li>
              <p class="">{{ t('schoolStaff.studentReceive.detail.year') }}</p>
              <SelectBoxBase :class="'select_row lg'" :id="'selectYear'" :name="'selectYear'" v-model="selectYear" :data="listSelectYear" />
            </li>
            <li>
              <p class="">{{ t('schoolStaff.studentReceive.detail.nameStd') }}</p>
              <InputBase :id="'userNm'" :name="'userNm'" v-model="lectureDetailSearchmodel.userNm" />
            </li>
            <li>
              <p class="">{{ t('schoolStaff.studentReceive.detail.codeStd') }}</p>
              <InputBase :id="'stdId'" :name="'stdId'" v-model="lectureDetailSearchmodel.stdId" />
            </li>
          </ul>
        </div>
      </div>

      <div class="box_section">
        <div class="btn_group btn_end">
          <button type="button" class="btn_xl_2 btn_round btn_primary" @click="search()">
            {{ t('common.title.search') }}
          </button>
          <button type="button" class="btn_xl_2 btn_round btn_white" @click="reset()">
            {{ t('common.reset') }}
          </button>
        </div>
      </div>

    </div>
    <div class="box dp_block">
      <p class="note_custom">*학생이름 선택 시 포트폴리오를 조회할 수 있습니다</p>
      <div class="box_section">
        <GridComponentV2 :key="key" :rowData="rowData" :columnDefs="columnDefs" :paginationClientFlag="false"
                         :totalRecord="totalRecord" @customPagination="fnPagination" ref="gridKey">
        </GridComponentV2>
      </div>
    </div>
    <div class="box_section">
      <div class="btn_group btn_end">
        <ExportFileExcel :data="data" :fileName="fileNameExport" :btnName="nameOfbtn">
        </ExportFileExcel>
        <button type="button" class="btn_round btn_white" @click="back()">{{ t('common.list') }}
        </button>
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
import {useRouter} from "vue-router";
import {commonStore} from "@/stores/common";
import {studentLectureStore} from "@/stores/schoolStaff/studentecture";
import {
  StudentLectureDetailResponseModel,
  StudentLectureDetailSearchModel
} from "@/stores/schoolStaff/studentecture/studentLecture.type";
import {GRADE_UP_CD_ID, PAGINATION_PAGE_SIZE, SUCCSESS_STATUS} from "@/constants/screen.const";
import Swal from "sweetalert2";
import {ExcelData} from "@/stores/common/excel/excelData.type";
import {codeMngStore} from "@/stores/common/codeMng";
import {useI18n} from "vue-i18n";
import ExportFileExcel from "@/components/common/excel/ExportFileExcel.vue";

const router = useRouter()
const {t} = useI18n()
const storeCommon = commonStore()
const storeCodeMng = codeMngStore()
const storeLecture = studentLectureStore()

const pageTitle = ref('수강생 목록')
const breadcrumbItems = ref([
  {label: 'HOME', link: '/'},
  {label: 'dept1', link: '#'},
  {label: 'dept2', link: '/banner'}
])

//input
const id = ref('')

//select box
const selectSubjectDepartment = ref('')
const selectYear = ref('')
const listSelectSubjectDepartment = ref([
  {cdId: '', cdNm: '전체', upCdId: ''}
])
const listSelectYear = ref([
  {cdId: '', cdNm: '전체', upCdId: ''}
])

const handleCustomClick = (item: any) => {

}

//grid
const key = ref(1)
const totalRecord = ref(0)
const rowData = ref([] as Array<StudentLectureDetailResponseModel>)
const columnDefs = ref([
  {headerName: t('schoolStaff.studentReceive.detail.list.stt'), field: 'rowNumber'},
  {headerName: t('schoolStaff.studentReceive.detail.list.majorName'), field: 'majorNm'},
  {headerName: t('schoolStaff.studentReceive.detail.list.department'), field: 'deptNm',},
  {headerName: t('schoolStaff.studentReceive.detail.list.grade'), field: 'gradeNm'},
  {
    headerName: t('schoolStaff.studentReceive.detail.list.userName'),
    field: 'userNm',
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
  {headerName: t('schoolStaff.studentReceive.detail.list.userCode'), field: 'stdId'},
  {headerName: t('schoolStaff.studentReceive.detail.list.phone'), field: 'phone'},
])

// data exel
const fileNameExport = 'DetailSubject'
const nameOfbtn = t('schoolStaff.studentReceive.detail.button.downloadExcel')

//model
const lectureDetailSearchmodel = ref({
  lectureId: '',
  deptNm: '',
  gradeNm: '',
  userNm: '',
  stdId: '',

  page: 1,
  size: PAGINATION_PAGE_SIZE,
  sort: ''
} as StudentLectureDetailSearchModel)

const isLoading = ref(true)
const data = ref<Array<ExcelData>>([])

onBeforeMount(async () => {
  try {
    id.value = window.history.state.id
    lectureDetailSearchmodel.value.lectureId = id.value
    await Promise.all([getListSelectSubjectDepartment(), getListSelectYear(), getDataAll()]);
    isLoading.value = false
  } catch (e) {
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
  lectureDetailSearchmodel.value.page = pageNumber
  lectureDetailSearchmodel.value.size = pagesSize

  if (!isLoading.value) {
    isLoading.value = true
    getDataAll()
  }
}

const getListSelectYear = async () => {
  storeCommon.setLoading(true)

  await storeCodeMng.getCodeInfo({upCdId: GRADE_UP_CD_ID})
  if (storeCodeMng.status && storeCodeMng.status == SUCCSESS_STATUS) {
    if (storeCodeMng.codeInfo) {
      listSelectYear.value = [
        ...listSelectYear.value,
        ...storeCodeMng.codeInfo.data.filter((item: { upCdId: string; }) => item.upCdId == GRADE_UP_CD_ID)
      ]
    }
  }

  storeCommon.setLoading(false)
}

const getListSelectSubjectDepartment = async () => {
  storeCommon.setLoading(true)

  await storeLecture.getsListDept()
  if (storeLecture.status && storeLecture.status == SUCCSESS_STATUS) {
    listSelectSubjectDepartment.value = [
      ...listSelectSubjectDepartment.value,
      ...storeLecture.selectBoxData.map((item: { id: any; name: any; }) => {
        return {
          cdId: item.id,
          upCdId: '',
          cdNm: item.name
        }
      })
    ]
  }

  storeCommon.setLoading(false)
}

const search = () => {
  key.value++
  lectureDetailSearchmodel.value.deptNm = selectSubjectDepartment.value
  lectureDetailSearchmodel.value.gradeNm = selectYear.value
  lectureDetailSearchmodel.value.page = 1
}

const reset = () => {
  lectureDetailSearchmodel.value = {
    lectureId: id.value,
    deptNm: '',
    gradeNm: '',
    userNm: '',
    stdId: '',

    page: 1,
    size: PAGINATION_PAGE_SIZE,
    sort: ''
  } as StudentLectureDetailSearchModel

  selectSubjectDepartment.value = listSelectSubjectDepartment.value[0].cdId
  selectYear.value = listSelectYear.value[0].cdId
}

const getDataAll = async () => {
  if (isLoading.value) {
    storeCommon.setLoading(true)
    await storeLecture.searchStudentLectureDetail(lectureDetailSearchmodel.value)
      .then(() => {
        if (storeLecture.status && storeLecture.status == SUCCSESS_STATUS) {
          rowData.value = storeLecture.detailData
          totalRecord.value = storeLecture.totalRecord ?? 0
        }
      })
      .catch(() => { })
      .finally(() => {
        isLoading.value = false
        storeCommon.setLoading(false)
        handClickExport()
      })
  }

}

const handClickExport = async () => {
  let dataExel = [];
  storeCommon.setLoading(true)
  await storeLecture.getsListExcel(id.value)
    .then(() => {
      if (storeLecture.status && storeLecture.status == SUCCSESS_STATUS) {
        dataExel = storeLecture.detailDataExel
      }
    })
    .catch(() => { })
    .finally(() => {
      storeCommon.setLoading(false)
    })

  let rowExcel = [] as Array<Array<any>>
  let rowExcelHeader = [] as Array<any>

  columnDefs.value.forEach(el => {
    rowExcelHeader.push(el.headerName)
  })

  dataExel.forEach((el: any) => {
    let colExcel = [] as Array<any>
    colExcel.push(el.rowNumber)
    colExcel.push(el.majorNm)
    colExcel.push(el.deptNm)
    colExcel.push(el.gradeNm)
    colExcel.push(el.userNm)
    colExcel.push(el.stdId)
    colExcel.push(el.phone)

    rowExcel.push(colExcel)
  })

  data.value = [{sheetName: 'sheet1', data: rowExcel, header: rowExcelHeader}] as Array<ExcelData>

  return data.value
}

const back = () => {
  router.push({
    name: SCREEN.studentsReceiveLectures.name,
  })
}
</script>

<style scoped></style>