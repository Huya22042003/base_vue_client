<template>
    <section id="content" class="content_wrapper grid_content" tabindex="0">
        <Breadcrumb :pageTitle="pageTitle" :breadcrumbItems="breadcrumbItems"></Breadcrumb>
        <div class="box dp_block">
            <div class="box_section">
                <div class="search_box col_3">
                    <ul>
                        <li>
                            <p class="ta_c">{{ t('05.eduProcessCreation.listAndApprove.label.majorUni') }}</p>
                            <SelectBoxBase :data="listSch" @update:modelValue="changSch" 
                                :mode="modeSelectBox" v-model="searhParms.uniCd">
                            </SelectBoxBase>
                        </li>
                        <li>
                            <p class="ta_c">{{ t('05.eduProcessCreation.listAndApprove.label.sust') }}</p>
                            <SelectBoxBase :data="listDept" :mode="modeSelectBox" v-model="searhParms.deptCd">
                            </SelectBoxBase>
                        </li>
                        <li>
                            <p class="ta_c">{{ t('05.eduProcessCreation.listAndApprove.label.uniYear') }}</p>
                            <SelectBoxBase :data="listYear" :mode="modeSelectBox" v-model="searhParms.year">
                            </SelectBoxBase>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <p class="ta_c">{{ t('05.eduProcessCreation.listAndApprove.label.status') }}</p>
                            <SelectBoxBase :data="listSts" :mode="modeSelectBox" v-model="searhParms.stsCd">
                            </SelectBoxBase>
                        </li>
                    </ul>
                    <div class="search_btnarea">
                        <button type="button" class="btn_xl btn_blue" @click="search">
                            {{ t('common.search') }}
                        </button>
                        <button type="button" class="btn_xl btn_white" @click="onReset">
                            {{ t('common.reset') }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="box dp_block">
            <div class="box_section">
                <GridComponentV2 :rowData="eduProcessCreationList" :columnDefs="columnDefs" :pagination="true"
                    :key="keyId" v-model="rowselected" ref="grid" :paginationClientFlag="false" @customPagination="fnPagination"
                    :totalRecord="pageable.totalElements">
                    <template #button>
                        <div>
                            <div class="search_btnarea">
                                <ExportFileExcel
                                :callData="true"
                                ref="exportExcelRef"
                                @click="exportExcel"
                                :data="dataExport"
                                :fileName="fileNameExport"
                                :btnName="
                                    t('05.eduProcessCreation.listAndApprove.button.downloadExcel')
                                "
                                >
                                </ExportFileExcel>
                                <button type="button" :disabled="isEnableApprove" class="btn_lg btn_blue" @click="openApproveAlert()">
                                    {{ t('05.eduProcessCreation.listAndApprove.button.approve') }}
                                </button>
                                <button type="button" :disabled="isEnableReject" class="btn_lg btn_black" @click="openModalReject">
                                    {{ t('05.eduProcessCreation.listAndApprove.button.reject') }}
                                </button>
                            </div>
                            <p class="note_custom ta_r mt-5">{{ t('05.eduProcessCreation.listAndApprove.warning.warning5') }}</p>
                        </div>
                    </template>
                </GridComponentV2>
            </div>
        </div>
    </section>
    <CreationReject @close-modal="closeModalReject" :id="appSeq" v-if="isOpenReject">
    </CreationReject>
    <RejectReasonDetail :title="t('05.eduProcessCreation.listAndApprove.title6')" :data="data" @close-modal="closeModalReason" v-if="isOpenReason">
    </RejectReasonDetail>
</template>

<script lang="ts">
import InputTextBase from '@/components/common/input/InputTextBase.vue'
import GridComponentV2 from '@/components/common/grid/GridComponentV2.vue'
import Breadcrumb from '@/components/common/Breadcrumb.vue'
import LinkGridComponent from '@/components/common/grid/LinkGridComponent.vue'
import SelectBoxBase from '@/components/common/input/SelectBoxBase.vue'
import CreationReject from './popup/CreationReject.vue'
import RejectReasonDetail from './popup/RejectReasonDetail.vue'

import { defineComponent, ref } from 'vue'
import {
    PAGINATION_PAGE_SIZE,
    SUCCSESS_STATUS,
    PAGINATION_PAGE_1,
    CODE_SCH,
    START_YEAR_NUMBER,
    CODE_1039,
    CREATED_STATUS,
    FORMAT_YYY_MM_DD,
    CODE_103980,
    CODE_103960,
CODE_103970,
CODE_103950
} from '@/constants/screen.const'
import { commonStore } from '@/stores/common'
import { useI18n } from 'vue-i18n'
import { format } from 'date-fns';
import type { CodeMngModel } from '@/stores/common/codeMng/codeMng.type'
import { codeMngStore } from '@/stores/common/codeMng'
import { departmentStore } from '@/stores/common/department'
import { EduCourseStore } from '@/stores/eduProcessCreation'
import { useRouter } from 'vue-router'
import type { EduCourseAppReqReqModel, EduCourseAppReqResModel, EduCourseSearchModel } from '@/stores/eduProcessCreation/eduCourse/eduProcess.type'
import type { DepartmentFilterDTO } from '@/stores/common/department/department.type'
import ButtonGridComponent from '@/components/common/grid/ButtonGridComponent.vue'
import CheckboxGrid from '@/components/common/grid/CheckboxGrid.vue'

export default defineComponent({
    components: {
        InputTextBase,
        GridComponentV2,
        Breadcrumb,
        LinkGridComponent,
        SelectBoxBase,
        CreationReject,
        RejectReasonDetail,
        ButtonGridComponent,
        CheckboxGrid
    },
    setup: () => {
        const router = useRouter()
        const storeCommon = commonStore()
        const eduCourseStore = EduCourseStore()
        const storeDepartment = departmentStore()
        const codeStore = codeMngStore()
        const { t } = useI18n()
        const id = ref<string>()
        const codeList = ref<CodeMngModel[]>();
        const exportExcelRef = ref(null)

        return { router, eduCourseStore, storeCommon, t, storeDepartment, codeStore, codeList, id, exportExcelRef }
    },
    data() {
        return {
            isOpenReject : false,
            isOpenReason : false,
            keyId: 0,
            pageTitle: this.t('05.eduProcessCreation.listAndApprove.title4'),
            breadcrumbItems: [
                { label: 'HOME', link: '/' },
                { label: this.t('05.eduProcessCreation.listAndApprove.title1'), link: '#' },
                { label: this.t('05.eduProcessCreation.listAndApprove.title1'), link: '/edu-process-creation' }
            ],
            displayTypes: [
                { cdId: '', cdNm: this.t('common.all') },
                { cdId: 'Y', cdNm: '' },
                { cdId: 'N', cdNm: '' }
            ],
            searhParms: {
                page : PAGINATION_PAGE_1,
                size : PAGINATION_PAGE_SIZE,
                sort : '',
                uniCd: '',
                deptCd: '',
                year: '',
                stsCd: ''
            } as EduCourseSearchModel,
            rowselected: [],
            eduProcessCreationList: [] as any,
            dataList: [] as Array<EduCourseAppReqResModel>,
            columnDefs: ref([
                {
                    headerName: this.t('common.select'),
                    flex : 0.6
                },
                {
                    headerName: this.t('05.eduProcessCreation.listAndApprove.label.status'),
                    field: 'stsNm',
                    cellRenderer: 'LinkGridComponent',
                    cellRendererParams: (data: any) => {
                        return {
                            onCustomEvent: (data.value.substring(0,6) == CODE_103980 ? this.openModalReason : ()=>{} ),
                            value:data.value.substring(6,data.value.length)
                        }
                    },
                    flex : 0.8,
                    cellStyle: (params : any) => {
                        return{
                            color: (params.value.substring(0,6) == CODE_103980 ? '#2704FF': '#000000' ),
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }
                    }
                },
                {
                    headerName: this.t('05.eduProcessCreation.listAndApprove.label.majorUni'),
                    field: 'schNm',
                    flex : 1.5,
                },
                {
                    headerName: this.t('05.eduProcessCreation.listAndApprove.label.sust'),
                    field: 'deptNm',
                    flex : 1.5,
                },
                {
                    headerName: this.t('05.eduProcessCreation.listAndApprove.label.createdYear'),
                    field: 'year',
                    flex : 1.1,
                    cellStyle: {
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }
                },
                {
                    headerName: this.t('05.eduProcessCreation.listAndApprove.label.approvedRegister'),
                    field: 'reqId',
                    flex : 1.5
                },
                {
                    headerName: this.t('05.eduProcessCreation.listAndApprove.label.approvedRegDate'),
                    field: 'reqDate',
                    cellStyle: {
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }
                },
                {
                    headerName: this.t('05.eduProcessCreation.listAndApprove.label.printPreview'),
                    field: 'stsCd',
                    cellStyle: {
                        color: '#FFFFFF',
                        alignItems: 'center',
                        justifyContent: 'center',
                        display: 'flex'
                    },
                    flex : 0.8,
                    cellRenderer: 'ButtonGridComponent',
                    cellRendererParams: (data: any) => {
                        return {
                            onCustomEvent: this.openModalReject,
                            value : this.t('05.eduProcessCreation.listAndApprove.button.print'),
                            className : 'btn_xs button btn_blue'
                        }
                    }
                },
                {
                    headerName: this.t('05.eduProcessCreation.listAndApprove.label.approver'),
                    field: 'procId',
                    flex : 1.5
                },
                {
                    headerName: this.t('05.eduProcessCreation.listAndApprove.label.approvedDate'),
                    field: 'procDate',
                    flex : 0.9,
                    cellStyle: {
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }
                }
            ]),
            modeSelectBox : '',
            confirmMessage : '',
            confirmButton : '',
            cancelButton : '',
            apprReqModels: [] as Array<EduCourseAppReqReqModel>,
            showCancel : false,
            pageable : {} as any,
            year: new Date().getFullYear() as number,
            listDept: [{ id:0, cdId: '', cdNm: this.t("common.all")}] as any,
            listSch: [{ id:0, cdId: '', cdNm: this.t("common.all")}] as any,
            listYear : [] as any,
            listSts : [{ id:0, cdId: '', cdNm: this.t('common.all') }] as any,
            departmentFilterDTO: {} as DepartmentFilterDTO,
            listCheckBoxGrid: [] as any,
            listName: [] as any,
            appSeq : '',
            data: '',
            fileNameExport: "교육과정개발 승인",
            dataExport: [] as any
        }
    },
    beforeMount() {
        Promise.all([this.getDepartment()])
                .catch((e) => alert(e.message))
    },
    beforeUnmount() {
        document.removeEventListener('keypress', this.handleKeyPress)
    },
    mounted() {
        document.addEventListener('keypress', this.handleKeyPress)
    },
    computed: {
        isEnableApprove: function () {
            if (this.listCheckBoxGrid.length) {
                return false
            }
            return true
        },
        isEnableReject: function () {
            if (this.listCheckBoxGrid.length == 1) {
                return false
            } 
            return true
        },
    },
    methods: {
        async getDepartment() {
            this.storeCommon.setLoading(true)
            this.departmentFilterDTO.deptDivCd = [CODE_SCH]
            const currentYear = new Date().getFullYear();
            for (let index = START_YEAR_NUMBER; index <= currentYear+1; index++) {
                this.listYear.push({ id:index, cdId:index, cdNm:index })
            }
            this.searhParms.year = currentYear + 1
            await this.storeDepartment.getDepartment(this.departmentFilterDTO)
            if (this.storeDepartment && this.storeDepartment.status == SUCCSESS_STATUS) {
                this.storeDepartment.deptRes?.forEach((element,index) => {
                    this.listSch.push({
                        id: index + 1,
                        cdId: element.deptCd,
                        cdNm: element.deptNm
                    })
                });
            }
            await this.codeStore.getCodeInfo({upCdId : CODE_1039})
            if (this.codeStore && this.codeStore.status == SUCCSESS_STATUS) {
                this.codeList = this.codeStore.codeInfo?.data
                this.codeList?.forEach((element,index) => {
                    if (element.cdId > CODE_103950) {
                        this.listSts.push({
                            id: index + 1,
                            cdId: element.cdId,
                            cdNm: element.cdNm
                        } as any)
                    }
                });
            }
            this.storeCommon.setLoading(false)
        },
        search() {
            this.listCheckBoxGrid = []
            this.keyId++
        },
        async getAll() {
            try {
                this.storeCommon.setLoading(true)
                await this.eduCourseStore.getEduCourseApprove(this.searhParms)
                if (this.eduCourseStore.EduCourseAppReqRes && this.eduCourseStore.status == SUCCSESS_STATUS) {
                    this.pageable = this.eduCourseStore.EduCourseAppReqRes
                    this.dataList = this.eduCourseStore.EduCourseAppReqRes.content
                    this.eduProcessCreationList = this.formatDataList()
                }
            } catch (error : any) {
                this.confirmMessage = error.message
                this.showCancel = false
                this.showAlert(()=>{},()=>{})
            } finally {
                this.storeCommon.setLoading(false)
            }
        },
        async changSch(data : any) {
            this.storeCommon.setLoading(true)
            this.departmentFilterDTO.deptDivCd = []
            this.departmentFilterDTO.upDeptCd = [data]
            this.searhParms.deptCd = ''
            this.listDept = []
            this.listDept = [{ id:0, cdId: '', cdNm: this.t("common.all")}]
            await this.storeDepartment.getDepartment(this.departmentFilterDTO)
            if (this.storeDepartment && this.storeDepartment.status == SUCCSESS_STATUS) {
                this.storeDepartment.deptRes?.forEach((element,index) => {
                    this.listDept.push({
                        id: index + 1,
                        cdId: element.deptCd,
                        cdNm: element.deptNm
                    })
                });
            }
            this.storeCommon.setLoading(false) 
        },
        onReset() {
            this.searhParms.deptCd = ''
            this.searhParms.uniCd = ''
            this.searhParms.year = new Date().getFullYear() + 1
            this.searhParms.stsCd = ''
            this.listDept = [{ id:0, cdId: '', cdNm: this.t("common.all")}]
        },
        onCreate() {
            this.$router.push({ name: 'eduProcessCreationMng', params: { mode: 'create' } })
        },
        handleKeyPress(event: any) {
            if (
                event.key === 'Enter' &&
                (this.searhParms.deptCd != '' ||
                    this.searhParms.uniCd != '' ||
                    this.searhParms.year != '' ||
                    this.searhParms.stsCd != '')
            ) {
                event.preventDefault()
                this.search()
            }
        },
        async fnPagination(pageNumber: any, pagesSize: any) {
            this.searhParms.size = pagesSize
            this.searhParms.page = pageNumber
            
            this.getAll()
        },
        async requestApprove(){
            try {
                this.storeCommon.setLoading(true)
                this.listCheckBoxGrid.forEach((element:any) => {
                    this.apprReqModels.push({
                        apprReqSeq: element,
                        stsCd: CODE_103970
                    } as EduCourseAppReqReqModel)
                });
                await this.eduCourseStore.requestEduCourseApprove(this.apprReqModels);   
                if (this.eduCourseStore) {
                    if (this.eduCourseStore.status == CREATED_STATUS) {
                        this.confirmMessage = this.t('05.eduProcessCreation.listAndApprove.message.approveRequestSuccess')
                        this.showCancel = false
                        this.confirmButton = this.t('common.confirm')
                        this.showAlert(this.search,()=>{})
                    } 
                }
            } catch (error : any) {
                this.confirmMessage = error.message
                this.showCancel = false
                this.showAlert(()=>{},()=>{})
            } finally {
                this.storeCommon.setLoading(false)
            }
        },
        formatDataList() {
            let newRowData = [...this.dataList]
            newRowData.forEach(item => {
                item.reqDate = item.reqDate?.substring(0, 10)
                item.procDate = item.procDate?.substring(0, 10)
                item.reqId = item.reqNm+'('+item.reqId+')'
                item.procId = item.procId ? item.procNm+'('+item.procId+')' : ''
                item.stsNm = item.stsCd + item.stsNm
                if (item.stsCd == CODE_103960) {
                    item.checkedShow = true
                    item.procNm = ''
                    item.procDate = ''
                }
            })
            return newRowData
        },
        checkChild(value : any, data: any) {
            if (value) {
                this.listCheckBoxGrid.push(data.apprReqSeq)
                this.listName.push({name: data.deptNm, year: data.year})
            } else {
                const index = this.listCheckBoxGrid.indexOf(data.apprReqSeq);
                if (index !== -1) {
                    this.listCheckBoxGrid.splice(index, 1);
                    this.listName.splice(index, 1);
                }
            }
            this.listCheckBoxGrid = [...new Set(this.listCheckBoxGrid)];
        },
        openModalReject() {
            this.appSeq = this.listCheckBoxGrid[0];
            this.isOpenReject = true
        },
        openModalReason(data : any) {
            this.data = data.eduCourseSeq;
            this.isOpenReason = true
        },
        closeModalReject() {
            this.isOpenReject = false
            this.search()
        },
        closeModalReason() {
            this.isOpenReason = false
        },
        openApproveAlert() {
            let name = [] as any
            this.listName.forEach((element:any) => {
                name.push(element.year + '학년도 ' + element.name) 
            });
            this.showCancel = true
            this.confirmMessage = name.join(", ") + this.t('05.eduProcessCreation.listAndApprove.message.approveRequest')
            this.confirmButton = this.t('05.eduProcessCreation.listAndApprove.button.confirmApprove')
            this.cancelButton = this.t('common.cancel')
            this.showAlert(this.requestApprove, () => { });
        },
        deleteEduProcess() {
            this.showCancel = false
            this.confirmMessage = this.t('05.eduProcessCreation.listAndApprove.message.deleteSuccess')
            this.confirmButton = this.t('common.cancel')
            this.showAlert(this.onCreate, () => { })
        },
        showAlert(callBackConfirm: Function,callBackCancel: Function) {
            this.$swal({
                text: this.confirmMessage,
                type: "warning",
                showCancelButton: this.showCancel,
                confirmButtonColor: '#DD6B55',
                confirmButtonText: this.confirmButton,
                cancelButtonText: this.cancelButton,
            }).then((result: any) => {
                if (result.isConfirmed) {
                    callBackConfirm()
                }
                if (result.isDismissed) {
                    callBackCancel()
                }
            });
        },
        async exportExcel() {
          this.storeCommon.setLoading(true)
          let paramExport = this.searhParms
          paramExport.size = this.pageable.totalElements

          await this.eduCourseStore.getEduCourseApprove(paramExport)
          if (this.eduCourseStore && this.eduCourseStore.status == SUCCSESS_STATUS) {
            let dataContent = this.eduCourseStore.EduCourseAppReqRes.content;
            const header = [
              this.t("common.rowNum"),
              this.t('05.eduProcessCreation.listAndApprove.label.status'),
              this.t('05.eduProcessCreation.listAndApprove.label.majorUni'),
              this.t('05.eduProcessCreation.listAndApprove.label.sust'),
              this.t('05.eduProcessCreation.listAndApprove.label.createdYear'),
              this.t('05.eduProcessCreation.listAndApprove.label.approvedRegister'),
              this.t('05.eduProcessCreation.listAndApprove.label.approvedRegDate'),
              this.t('05.eduProcessCreation.listAndApprove.label.approver'),
              this.t('05.eduProcessCreation.listAndApprove.label.approvedDate')]
            let content = [] as Array<any>;
            dataContent.forEach((element:any, index:number) => {
              let contentItem = [];

              contentItem.push(index + 1);
              contentItem.push(element.stsNm);
              contentItem.push(element.schNm);
              contentItem.push(element.deptNm);
              contentItem.push(element.year);
              contentItem.push(element.reqNm);
              contentItem.push(format(element.reqDate, FORMAT_YYY_MM_DD));
              contentItem.push(element.procId ? element.procId : '-');
              contentItem.push(element.procDate ? (format(element.procDate, FORMAT_YYY_MM_DD)) : '-');

              content.push(contentItem);
            });
            this.dataExport = [{ sheetName: 'sheet1', data: content, header: header }]

            this.exportExcelRef.downloadExcel();
          }

          this.storeCommon.setLoading(false)
        }
    }
})
</script>

<style lang="css" scoped></style>