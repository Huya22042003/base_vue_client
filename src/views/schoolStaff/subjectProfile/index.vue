<template>
  <section id="content" class="content_wrapper grid_content" tabindex="0">
    <Breadcrumb :pageTitle="pageTitle" :breadcrumbItems="breadcrumbItems"></Breadcrumb>

    <div class="box dp_block">
      <div class="box_section">
        <div class="search_box col_3">
          <ul>
            <li>
              <p class="">{{ t('schoolStaff.subject.index.subject') }}</p>
              <InputBase v-model="subjectProfileSearchModel.sbjtNm"/>
            </li>
            <li>
              <p class="">{{ t('schoolStaff.subject.index.subjectCode') }}</p>
              <InputBase v-model="subjectProfileSearchModel.sbjtCd"/>
            </li>
            <li>
              <p class="">{{ t('schoolStaff.subject.index.academicStatus') }}</p>
              <SelectBoxBase :id="'selectStatus'" :name="'selectStatus'" v-model="subjectProfileSearchModel.sustDvCd"
                             :data="listSelectStatus"/>
            </li>
            <li>
              <p class="">{{ t('schoolStaff.subject.index.grade') }}</p>
              <SelectBoxBase :id="'selectYear'" :name="'selectYear'" v-model="subjectProfileSearchModel.gradeCd"
                             :data="listSelectYear"/>
            </li>
            <li>
              <p class="">{{ t('schoolStaff.subject.index.semester') }}</p>
              <SelectBoxBase :id="'selectSemester'" :name="'selectSemester'" v-model="subjectProfileSearchModel.termCd"
                             :data="listSelectSemester"/>
            </li>
          </ul>
        </div>
      </div>

      <div class="box_section">
        <div class="btn_group btn_end">
          <button type="button" class="button btn_xl btn_blue btn_responsive" v-on:click="searchData()">
            {{ t('common.search') }}
          </button>
          <button type="button" class="button btn_xl btn_lightgray btn_responsive" v-on:click="resetSearch()">{{
              t('common.reset')
            }}
          </button>
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
import {inject, ref} from "vue";
import InputBase from "@/components/common/input/InputBase.vue";
import SelectBoxBase from "@/components/common/input/SelectBoxBase.vue";
import GridComponentV2 from "@/components/common/grid/GridComponentV2.vue";
import LinkGridComponent from "@/components/common/grid/LinkGridComponent.vue";
import { subjectProfileStore } from '@/stores/subjectProfile'
import { SubjectProfileSearchModel } from '@/stores/subjectProfile/subjectProfile.type'
import {
  PAGINATION_PAGE_SIZE,
  SUCCSESS_STATUS,
  TERM_UP_CD_ID,
  SUSTDV_UP_CD_ID,
  GRADE_UP_CD_ID
} from '@/constants/screen.const.ts'
import {commonStore} from '@/stores/common'
import {useI18n} from 'vue-i18n'
import {codeMngStore} from '@/stores/common/codeMng'
import {CodeMngRes} from '@/stores/common/codeMng/codeMng.type'

const stores = subjectProfileStore();
const storeCodeMng = codeMngStore()
const cmn = commonStore();
const swal = inject('$swal')
const {t} = useI18n()

const key = ref(1)
const pageTitle = ref(t('schoolStaff.subject.index.pageTitle'))
const breadcrumbItems = ref([
  {label: 'HOME', link: '/'},
  {label: 'dept1', link: '#'},
  {label: 'dept2', link: '/banner'}
])

const listSelectStatus = ref([
  {cdId: '', cdNm: t('common.all')}
])
const listSelectYear = ref([
  {cdId: '', cdNm: t('common.all')}
])
const listSelectSemester = ref([
  {cdId: '', cdNm: t('common.all')}
])
// TODO: Wait for confirmation of the reporting tool module
const handleCustomClick = (item) => {
  console.log('handleCustomClick: ', item)
}

//grid
const totalRecord = ref(0)
const rowData = ref([]);
const columnDefs = ref([
  {headerName: t('schoolStaff.subject.index.grid.header1'), field: 'rowNumBer'},
  {headerName: t('schoolStaff.subject.index.grid.header2'), field: 'eduYear'},
  {headerName: t('schoolStaff.subject.index.grid.header3'), field: 'deptNm',},
  {
    headerName: t('schoolStaff.subject.index.grid.header4'),
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
  {headerName: t('schoolStaff.subject.index.grid.header5'), field: 'sbjtCd'},
  {headerName: t('schoolStaff.subject.index.grid.header6'), field: 'sustDivNm'},
  {headerName: t('schoolStaff.subject.index.grid.header7'), field: 'gradeNm'},
  {headerName: t('schoolStaff.subject.index.grid.header8'), field: 'termNm',},
  {headerName: t('schoolStaff.subject.index.grid.header9'), field: 'staffNm',}
])

const fnPagination = (pageNumber: any, pagesSize: any) => {
  subjectProfileSearchModel.page = pageNumber
  subjectProfileSearchModel.size = pagesSize
  getAllData();
}
onBeforeMount(async () => {
  try {
    await Promise.all([getAllData(), getDataTerm(), getDataSustDv(), getDataGrade()]);
  } catch (e) {
    cmn.setLoading(false)
    showAlert(e + '')
  }
});

const getAllData = async () => {
  cmn.setLoading(true)
  await stores.getAllData(subjectProfileSearchModel)
  if (stores && stores.status == SUCCSESS_STATUS) {
    rowData.value = stores.subjectProfileResponse.sort((a: any, b: any) => b.rowNumBer - a.rowNumBer)
    totalRecord.value = stores.totalRecord ?? 0
  }
  cmn.setLoading(false)
};
const searchData = () => {
  key.value++
}
const getDataTerm = async () => {
  const codeMngRes = {
    upCdId: TERM_UP_CD_ID
  } as CodeMngRes

  cmn.setLoading(true)
  await storeCodeMng.getCodeInfo(codeMngRes);
  if (storeCodeMng.status === SUCCSESS_STATUS) {
    let dataTerm = storeCodeMng.codeInfo.data.sort((a: any, b: any) => a.cdId - b.cdId)
    listSelectSemester.value = [...listSelectSemester.value, ...dataTerm]
  }
  cmn.setLoading(false)
};

const getDataGrade = async () => {
  const codeMngRes = {
    upCdId: GRADE_UP_CD_ID
  } as CodeMngRes

  cmn.setLoading(true)
  await storeCodeMng.getCodeInfo(codeMngRes);
  if (storeCodeMng.status === SUCCSESS_STATUS) {
    let dataTerm = storeCodeMng.codeInfo.data.sort((a: any, b: any) => a.cdId - b.cdId)
    listSelectYear.value = [...listSelectYear.value, ...dataTerm]
  }
  cmn.setLoading(false)

};


const getDataSustDv = async () => {
  const codeMngRes = {
    upCdId: SUSTDV_UP_CD_ID
  } as CodeMngRes

  cmn.setLoading(true)
  await storeCodeMng.getCodeInfo(codeMngRes);
  if (storeCodeMng.status === SUCCSESS_STATUS) {
    let dataTerm = storeCodeMng.codeInfo.data.sort((a: any, b: any) => a.cdId - b.cdId)
    listSelectStatus.value = [...listSelectStatus.value, ...dataTerm]
  }
  cmn.setLoading(false)
};
const initialSubjectProfileSearchModel = {
  sbjtNm: '',
  sbjtCd: '',
  sustDvCd: '',
  gradeCd: '',
  termCd: '',
  sort: '',
  page: 1,
  size: PAGINATION_PAGE_SIZE,
} as SubjectProfileSearchModel;

const subjectProfileSearchModel = reactive({...initialSubjectProfileSearchModel});

const resetSearch = () => {
  Object.assign(subjectProfileSearchModel, initialSubjectProfileSearchModel);
};

//alert
const showAlert = (message: string) => {
  swal.fire({
    text: message,
    showCancelButton: false,
    showConfirmButton: true,
    confirmButtonColor: '#DD6B55',
    confirmButtonText: t('common.confirm'),
    cancelButtonText: t('common.close'),
  })

};
</script>


<style scoped></style>