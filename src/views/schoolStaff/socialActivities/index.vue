<template>
  <section id="content" class="content_wrapper grid_content" tabindex="0">
    <Breadcrumb :pageTitle="pageTitle" :breadcrumbItems="breadcrumbItems"></Breadcrumb>

    <div class="box dp_block">
      <div class="box_section">
        <div class="search_box col_2">
          <ul>
            <li>
              <p class="">{{ t('schoolStaff.socialActivities.index.searchFields.status') }}</p>
              <CheckboxBase v-for="item in listCheckBox" :mode="'show'" :value="item.cdId"
                v-model="checkboxGroup" :id="item.cdId" :name="item.cdId" :key="item.cdId" :label="item.cdNm">
              </CheckboxBase>
            </li>
            <li>
              <p class="">{{ t('schoolStaff.socialActivities.index.searchFields.topic') }}</p>
              <InputBase v-model="socialServeAplcnSearchModel.serveTtl" />
            </li>
            <li>
              <p class="">{{ t('schoolStaff.socialActivities.index.searchFields.activeName') }}</p>
              <RadiobuttonBase v-for="item in listRadio" :mode="'show'" :value="item.cdId" v-model="radiovalue"
                :id="item.cdId" :cdNm="item.cdId" :key="item.cdId" :checked="item.cdId == radiovalue"
                :label="item.cdNm">
                radio
              </RadiobuttonBase>
            </li>
            <li>
              <p class="">{{ t('schoolStaff.socialActivities.index.searchFields.activeTime') }}</p>
              <BaseDatePicker v-model="socialServeAplcnSearchModel.serveDurStr" :placeholder="t('common.startDate')" />~
              <BaseDatePicker v-model="socialServeAplcnSearchModel.serveDurEnd" :placeholder="t('common.endDate')" />
            </li>
          </ul>
        </div>
      </div>

      <div class="box_section">
        <div class="btn_group btn_end">
          <button type="button" class="button btn_xl btn_blue btn_responsive" v-on:click="searchData()">{{
              t('common.search')
            }}
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
        <GridComponentV2 :rowData="rowData" :columnDefs="columnDefs" :paginationClientFlag="false" :key="key"
          :totalRecord="totalRecord" @customPagination="fnPagination" ref="gridKey">
        </GridComponentV2>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import { ref } from "vue";
import GridComponentV2 from "@/components/common/grid/GridComponentV2.vue";
import { SCREEN } from "@/router/screen";
import LinkGridComponent from "@/components/common/grid/LinkGridComponent.vue";
import { useRouter } from "vue-router";
import InputBase from "@/components/common/input/InputBase.vue";
import BaseDatePicker from "@/components/common/datepicker/BaseDatePicker.vue";
import RadiobuttonBase from "@/components/common/input/RadiobuttonBase.vue";
import CheckboxBase from "@/components/common/input/CheckboxBase.vue";
import { socialServeAplcnStore } from '@/stores/socialServeAplcn';
import { SocialServeAplcnResponseModel, SocialServeAplcnSearchModel } from '@/stores/socialServeAplcn/socialServeAplcn.type';
import { commonStore } from '@/stores/common'
import { useI18n } from 'vue-i18n'
import { codeMngStore } from '@/stores/common/codeMng'
import { CodeMngRes, CodeMngModel } from '@/stores/common/codeMng/codeMng.type'
import {
  PAGINATION_PAGE_SIZE,
  SUCCSESS_STATUS,
  SOCIAL_STS_UP_CD,
  SOCIAL_TYPE_UP_CD,
  SOCIAL_TYPE_CD_ID_SCHOOL,
  FORMAT_YYY_MM_DD
} from '@/constants/screen.const.ts'
import { format } from "date-fns";
const store = socialServeAplcnStore()
const storeCodeMng = codeMngStore()
const cmn = commonStore();
const swal = inject('$swal')
const { t } = useI18n()
const key = ref(1);
const router = useRouter()

const pageTitle = ref(t('schoolStaff.socialActivities.index.pageTitle'));
const breadcrumbItems = ref([
  { label: 'HOME', link: '/' },
  { label: 'dept1', link: '#' },
  { label: 'dept2', link: '/banner' }
])

const handleCustomClick = (item: SocialServeAplcnResponseModel) => {
  router.push({
    name: SCREEN.detailSocialActivities.name,
    params: {
      type: item.serveTypeCd == SOCIAL_TYPE_CD_ID_SCHOOL ? 'school' : 'personal'
    },
    state: {
      id: item.sociServeSeq
    }
  })
}

//grid
const totalRecord = ref(0)
const rowData = ref([] as SocialServeAplcnResponseModel[]);
const columnDefs = ref([
  {headerName: t('schoolStaff.socialActivities.index.grid.header1'), field: 'rowNumBer'},
  {headerName: t('schoolStaff.socialActivities.index.grid.header2'), field: 'serveTypeNm'},
  {
    headerName: t('schoolStaff.socialActivities.index.grid.header3'),
    field: 'serveTtl',
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
  {headerName: t('schoolStaff.socialActivities.index.grid.header4'), field: 'serveDurTime'},
  {headerName: t('schoolStaff.socialActivities.index.grid.header5'), field: 'recrDurTime'},
  {headerName: t('schoolStaff.socialActivities.index.grid.header6'), field: 'stsNm'},
  {headerName: t('schoolStaff.socialActivities.index.grid.header7'), field: 'recrMemb',},
  {headerName: t('schoolStaff.socialActivities.index.grid.header8'), field: 'actTime',},
  {headerName: t('schoolStaff.socialActivities.index.grid.header9'), field: 'aplcnSeq',}
])

// checkbox
const listCheckBox = ref<CodeMngModel[]>([]);
const checkboxGroup = ref([])

// radio
const listRadio = ref([
  {cdId: t('common.all'), cdNm: t('common.all')},
])
const radiovalue = ref(t('common.all'))

// func
const fnPagination = (pageNumber: any, pagesSize: any) => {
  socialServeAplcnSearchModel.page = pageNumber
  socialServeAplcnSearchModel.size = pagesSize
  getAllData();
}
onBeforeMount(async () => {
  try {
    await Promise.all([getAllData(), getDataSts(), getDataActivityType()]);
  } catch (e) {
    cmn.setLoading(false)
    showAlert(e + '')
  }
});

const initialSocialServeAplcnSearchModel = {
  stsCd: [],
  serveTtl: '',
  serveTypeCd: '',
  serveDurStr: null,
  serveDurEnd: null,
  sort: '',
  page: 1,
  size: PAGINATION_PAGE_SIZE,
} as SocialServeAplcnSearchModel;

const socialServeAplcnSearchModel = reactive({...initialSocialServeAplcnSearchModel});

const resetSearch = () => {
  Object.assign(socialServeAplcnSearchModel, initialSocialServeAplcnSearchModel);
  radiovalue.value = t('common.all')
  checkboxGroup.value = []
}
const searchData = () => {
  key.value++;
}
const getAllData = async () => {
  cmn.setLoading(true)
  socialServeAplcnSearchModel.serveTypeCd = radiovalue.value == t('common.all') ? "" : radiovalue.value
  socialServeAplcnSearchModel.stsCd = checkboxGroup
  await store.getAllData(socialServeAplcnSearchModel)
  if (store && store.status == SUCCSESS_STATUS) {
    rowData.value = store.resultData.sort((a: any, b: any) => b.rowNumBer - a.rowNumBer);
    totalRecord.value = store.totalRecord ?? 0
    rowData.value.forEach((item: any) => {
      item.serveDurTime = formatDate(item.serveDurStr) + ' ~ ' + formatDate(item.serveDurEnd)
      item.recrDurTime = formatDate(item.recrDurStr) + ' ~ ' + formatDate(item.recrDurEnd)
      item.aplcnSeq = item.aplcnSeq ? "신청" : "미신청"
    })
  }
  cmn.setLoading(false)
};
const getDataSts = async () => {
  const codeMngRes = {
    upCdId: SOCIAL_STS_UP_CD
  } as CodeMngRes
  cmn.setLoading(true)
  await storeCodeMng.getCodeInfo(codeMngRes);
  listCheckBox.value = storeCodeMng.codeInfo.data;
  cmn.setLoading(false)
};
const getDataActivityType = async () => {
  const codeMngRes = {
    upCdId: SOCIAL_TYPE_UP_CD
  } as CodeMngRes
  cmn.setLoading(true)
  await storeCodeMng.getCodeInfo(codeMngRes);
  let data = storeCodeMng.codeInfo.data;
  listRadio.value.push(...data)
  cmn.setLoading(false)
};


const formatDate = (dateStr: string) => {
  if (dateStr) {
    return format(dateStr, FORMAT_YYY_MM_DD)
  }
  return ``;
}

//alert
const showAlert = (message: string) => {
  swal.fire({
    text: message,
    showCancelButton: true,
    showConfirmButton: false,
    confirmButtonColor: '#DD6B55',
    confirmButtonText: t('common.confirm'),
    cancelButtonText: t('common.close'),
  })

};
// Watch serveDurStr for changes
watch(() => socialServeAplcnSearchModel.serveDurStr, async (newValue) => {
  if (!socialServeAplcnSearchModel.serveDurEnd) {
    socialServeAplcnSearchModel.serveDurStr = newValue;
  } else {
    const dStart = formatDate(newValue);
    const dEnd = formatDate(socialServeAplcnSearchModel.serveDurEnd);
    if (dStart > dEnd) {
      await nextTick();
      socialServeAplcnSearchModel.serveDurStr = socialServeAplcnSearchModel.serveDurEnd;
      showAlert(t('common.messageCheckDate'));
    }
  }
});

// Watch serveDurEnd for changes
watch(() => socialServeAplcnSearchModel.serveDurEnd, async (newValue) => {
  if (!socialServeAplcnSearchModel.serveDurStr) {
    socialServeAplcnSearchModel.serveDurEnd = newValue;
  } else {
    const dStart = formatDate(socialServeAplcnSearchModel.serveDurStr);
    const dEnd = formatDate(newValue);
    if (dStart > dEnd) {
      await nextTick();
      socialServeAplcnSearchModel.serveDurEnd = socialServeAplcnSearchModel.serveDurStr;
      showAlert(t('common.messageCheckDate'));
    }
  }
});
</script>

<style scoped></style>