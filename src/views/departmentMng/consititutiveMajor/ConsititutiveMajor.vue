<template>
    <section id="content" class="content_wrapper grid_content" tabindex="0">
        <Breadcrumb :pageTitle="pageTitle" :breadcrumbItems="breadcrumbItems"></Breadcrumb>
        <!-- Form search -->
        <div class="box dp_block">
            <div class="box_section">
                <div class="search_box col_3">
                    <ul>
                        <li>
                            <p>
                                <!-- 단과대학 -->
                                {{ t('departmentMng.consititutiveMajor.search.universityMajor') }}
                            </p>
                            <SelectBoxBase :id="'selectbox'" :name="'selectbox'" v-if="listSelectBoxForm.listMajor"
                                v-model="dataSearch.universityMajor" :data="listSelectBoxForm.listMajor">
                            </SelectBoxBase>
                        </li>
                        <li>
                            <p>
                                <!-- 학과 -->
                                {{ t('departmentMng.consititutiveMajor.search.dept') }}
                            </p>
                            <SelectBoxBase :id="'selectbox'" :name="'selectbox'" v-model="dataSearch.dept"
                                v-if="listSelectBoxForm.listDept" :data="listSelectBoxForm.listDept">
                            </SelectBoxBase>
                        </li>
                        <li>
                            <p>
                                <!-- 전공능력 -->
                                {{ t('departmentMng.consititutiveMajor.search.capactityMajor') }}
                            </p>
                            <SelectBoxBase :id="'selectbox'" :name="'selectbox'" v-model="dataSearch.capactityMajor"
                                v-if="listSelectBoxForm.listMajorCapa" :data="listSelectBoxForm.listMajorCapa">
                            </SelectBoxBase>
                        </li>
                        <li>
                            <p>
                                <!-- 하위능력 -->
                                {{ t('departmentMng.consititutiveMajor.search.lowerGrade') }}
                            </p>
                            <SelectBoxBase :id="'selectbox'" :name="'selectbox'" v-model="dataSearch.lowerGrade"
                                v-if="listSelectBoxForm.listChldCapa" :data="listSelectBoxForm.listChldCapa">
                            </SelectBoxBase>
                        </li>
                        <li>
                            <p>
                                <!-- 상태 -->
                                {{ t('departmentMng.consititutiveMajor.search.status') }}
                            </p>
                            <RadiobuttonBase v-for="(itemRadio, index) in listStatus" :mode="'show'"
                                :value="itemRadio.cdId" v-model="dataSearch.status"
                                :id="itemRadio.cdId + 'listStatus' + index"
                                :name="itemRadio.cdId + 'listStatus' + index"
                                :key="itemRadio.cdId + 'listStatus' + index"
                                :checked="itemRadio.cdId == dataSearch.status" :label="itemRadio.cdNm">
                            </RadiobuttonBase>
                        </li>
                    </ul>
                </div>
                <div class="btn_group btn_end" style="gap:10px;">
                    <button class="button btn_xl btn_blue btn_responsive" @click="searchFormData()">
                        <!-- 조회 -->
                        {{ t('departmentMng.typeTalentNurturingMng.search.btnSeach') }}</button>
                    <button class="button btn_xl btn_lightgray btn_responsive" @click="clearFormSearch()">
                        <!-- 초기화 -->
                        {{ t('departmentMng.typeTalentNurturingMng.search.btnClear') }}</button>
                </div>
            </div>
        </div>

        <div class="box dp_block">
            <div class="box_inner">
                <p class="note_custom">
                    <!-- ※ 등록된 핵심역량-하위역량으로 목록이 자동구성됩니다. -->
                    {{ t('departmentMng.consititutiveMajor.list.subtitle01') }}
                </p>
                <p class="note_custom">
                    <!-- ※ 최고 관리자 외에는 로그인한 학과장 소속 학과의 전공능력만 목록에 조회됩니다. -->
                    {{ t('departmentMng.consititutiveMajor.list.subtitle02') }}
                </p>
                <!-- Table at here -->
                <GridComponentV2 :key="key" :rowData="data" :columnDefs="columnDefs" :paginationClientFlag="false"
                    :paginationPageSize="paginationPageSize" @customPagination="fnPagination" :totalRecord="totalRecord"
                    :paginationPageSizeSelector="paginationPageSizeSelector">
                </GridComponentV2>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import Breadcrumb from '@/components/common/Breadcrumb.vue'
import { commonStore } from '@/stores/common'
import { ref } from "vue";
import {
    PAGINATION_PAGE_SIZE_SELECTOR,
    PAGINATION_PAGE_SIZE,
    MODE_CREATE,
    SUCCSESS_STATUS,
    FORMAT_YYY_MM_DD,
} from '@/constants/screen.const'
import GridComponentV2 from '@/components/common/grid/GridComponentV2.vue'
import { SCREEN } from '@/router/screen';
import { useI18n } from 'vue-i18n';
import LinkGridComponent from '@/components/common/grid/LinkGridComponent.vue'
import type {
    DataSearch,
    ChldCapaFormDTO,
    DataResponse
} from "@/stores/departmentService/consititutiveMajor/consititutiveMajor.type";
import {
    getListData,
    getListForm
} from "@/stores/departmentService/consititutiveMajor/consititutiveMajor.service";
import type {
    CodeMngModel
} from "@/stores/common/codeMng/codeMng.type";
import {
    getListCodeMng
} from "@/stores/common/codeMng/codeMng.service";
import { DIV_CD_DEPT_DEPART, DIV_CD_DEPT_MAJOR, MESSAGE_ERROR_API, UP_CD_CONS_MAJOR } from '@/constants/common.const'
import { format } from 'date-fns';
import { getDepartmentList } from "@/stores/common/department/department.service"

export default {
    components: {
        Breadcrumb,
        GridComponentV2,
        LinkGridComponent
    },
    setup() {
        const { t } = useI18n()
        const store = commonStore()

        return {
            t,
            store
        }
    },
    data() {
        return {
            //'전공능력 구성요소 관리',
            pageTitle: this.t('departmentMng.consititutiveMajor.pageTitle'),
            breadcrumbItems: [
                { label: this.t('departmentMng.consititutiveMajor.breadcrumb.01'), link: '/' },
                { label: this.t('departmentMng.consititutiveMajor.breadcrumb.02'), link: '#' },
                { label: this.t('departmentMng.consititutiveMajor.breadcrumb.03'), link: SCREEN.consititutiveMajorDept.path }
            ],
            listStatus: [] as CodeMngModel[],
            dataSearch: {
                universityMajor: "",
                dept: "",
                capactityMajor: "",
                lowerGrade: "",
                status: "",
                page: 1,
                size: PAGINATION_PAGE_SIZE,
                sort: "",
            } as DataSearch,
            listSelectBoxForm: {
                listDept: [{
                    cdId: "",
                    cdNm: this.t('common.all'),
                }],
                listMajorCapa: [{
                    cdId: "",
                    cdNm: this.t('common.all'),
                }],
                listChldCapa: [{
                    cdId: "",
                    cdNm: this.t('common.all'),
                }]
            } as ChldCapaFormDTO,
            isOpen: false,
            isLoad: false,
            paginationPageSize: PAGINATION_PAGE_SIZE,
            paginationPageSizeSelector: PAGINATION_PAGE_SIZE_SELECTOR,
            data: [] as DataResponse[],
            columnDefs: ref([
                {
                    /* '단과대학' */
                    headerName: this.t('departmentMng.consititutiveMajor.list.universityMajor'),
                    field: 'majorUniversity',
                    cellStyle: {
                        textAlign: 'center'
                    }
                },
                {
                    /* '학과' */
                    headerName: this.t('departmentMng.consititutiveMajor.list.dept'),
                    field: 'dept',
                    cellStyle: {
                        textAlign: 'center'
                    }
                },
                {
                    /* '전공능력' */
                    headerName: this.t('departmentMng.consititutiveMajor.list.capactityMajor'),
                    field: 'majorCapaNm',
                    cellStyle: {
                        textAlign: 'center'
                    }
                },
                {
                    /* '하위능력' */
                    headerName: this.t('departmentMng.consititutiveMajor.list.lowerGrade'),
                    field: 'chldCapaNm',
                    cellRenderer: LinkGridComponent,
                    cellRendererParams: { onCustomEvent: this.goToDetail },
                    cellStyle: {
                        color: '#2704FF',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'pointer'
                    }
                },
                {
                    /* '상태' */
                    headerName: this.t('departmentMng.consititutiveMajor.list.status'),
                    field: 'status',
                    cellStyle: {
                        textAlign: 'center'
                    }
                },
                {
                    /* '등록자' */
                    headerName: this.t('departmentMng.consititutiveMajor.list.createdBy'),
                    field: 'regId',
                    cellStyle: {
                        textAlign: 'center'
                    },
                    flex: 0.6,
                },
                {
                    /* '등록일' */
                    headerName: this.t('departmentMng.consititutiveMajor.list.createdDate'),
                    field: 'regDate',
                    cellStyle: {
                        textAlign: 'center'
                    },
                    flex: 0.6
                },
            ]),
            key: 1,
            totalRecord: 0
        }
    },
    beforeMount() {
        // Load combobox
        getListCodeMng({ upCdIdList: [UP_CD_CONS_MAJOR] }).then(res => {
            this.listStatus = res.data.data;
            this.listStatus.unshift({
                cdId: "",
                cdNm: this.t('common.all'),
                upCdId: UP_CD_CONS_MAJOR
            });
        })
        getDepartmentList({
            deptCd: [],
            deptDivCd: [DIV_CD_DEPT_MAJOR, DIV_CD_DEPT_DEPART],
            upDeptCd: [],
            useYn: ""
        }).then(res => {
            this.listSelectBoxForm.listDept = res.data.data.filter((el) => el.deptDivCd == DIV_CD_DEPT_DEPART).map(el => {
                return {
                    cdId: el.deptCd,
                    cdNm: el.deptNm,
                    upCdId: "dept"
                }
            })
            this.listSelectBoxForm.listDept.unshift({
                cdId: "",
                cdNm: this.t('common.all'),
                upCdId: "major"
            });
            this.listSelectBoxForm.listMajor = res.data.data.filter((el) => el.deptDivCd == DIV_CD_DEPT_MAJOR).map(el => {
                return {
                    cdId: el.deptCd,
                    cdNm: el.deptNm,
                    upCdId: "dept"
                }
            })
            this.listSelectBoxForm.listMajor.unshift({
                cdId: "",
                cdNm: this.t('common.all'),
                upCdId: "major"
            });
        }).catch(() => {
            throw new Error(MESSAGE_ERROR_API);
        })
        getListForm().then(res => {
            this.listSelectBoxForm.listMajorCapa = res.data.data.listMajorCapa
            this.listSelectBoxForm.listChldCapa = res.data.data.listChldCapa

            
            this.listSelectBoxForm.listChldCapa.unshift({
                cdId: "",
                cdNm: this.t('common.all'),
            });

            this.listSelectBoxForm.listMajorCapa.unshift({
                cdId: "",
                cdNm: this.t('common.all'),
            });
        }).catch(() => {
            throw new Error(MESSAGE_ERROR_API);
        }).finally(() => {
            this.store.setLoading(false);
        })
    },
    watch: {
        'dataSearch.universityMajor': {
            handler: function () {
                this.getDeptByMajor();
            }
        },
        'dataSearch.dept': {
            handler: function () {
                this.getMajorCapa();
            }
        },
        'dataSearch.capactityMajor': {
            handler: function () {
                this.getMajorChld();
            }
        }
    },
    methods: {
        getDeptByMajor() {
            this.store.setLoading(true);
            this.dataSearch.capactityMajor = ""
            this.dataSearch.dept = ""
            this.dataSearch.lowerGrade = ""
            let dataSearch = [] as any[];
            if (this.dataSearch.universityMajor) {
                dataSearch.push(this.dataSearch.universityMajor)
            }
            getDepartmentList({
                deptCd: [],
                deptDivCd: [DIV_CD_DEPT_DEPART],
                upDeptCd: dataSearch,
                useYn: ""
            }).then(res => {
                this.listSelectBoxForm.listDept = res.data.data.map(el => {
                    return {
                        cdId: el.deptCd,
                        cdNm: el.deptNm,
                        upCdId: "dept"
                    }
                })

                this.listSelectBoxForm.listDept.unshift({
                    cdId: "",
                    cdNm: this.t('common.all'),
                    upCdId: "dept"
                });

                this.listSelectBoxForm.listChldCapa = [{
                    cdId: "",
                    cdNm: this.t('common.all'),
                }];

                this.listSelectBoxForm.listMajorCapa = [{
                    cdId: "",
                    cdNm: this.t('common.all'),
                }];

            }).catch(() => {
                throw new Error(MESSAGE_ERROR_API);
            }).finally(() => {
                this.store.setLoading(false);
            })
        },
        getMajorCapa() {
            this.store.setLoading(true);
            this.dataSearch.capactityMajor = ""
            this.dataSearch.lowerGrade = ""
            getListForm().then(res => {
                this.listSelectBoxForm.listMajorCapa = res.data.data.listMajorCapa.filter(item => (item.upCdId.includes(this.dataSearch.dept)))
                
                this.listSelectBoxForm.listChldCapa = res.data.data.listChldCapa
                this.listSelectBoxForm.listChldCapa.unshift({
                    cdId: "",
                    cdNm: this.t('common.all'),
                });

                this.listSelectBoxForm.listMajorCapa.unshift({
                    cdId: "",
                    cdNm: this.t('common.all'),
                });
            }).catch(() => {
                throw new Error(MESSAGE_ERROR_API);
            }).finally(() => {
                this.store.setLoading(false);
            })
        },
        getMajorChld() {
            this.store.setLoading(true);
            this.dataSearch.lowerGrade = ""
            getListForm().then(res => {
                this.listSelectBoxForm.listChldCapa = res.data.data.listChldCapa.filter(item => item.upCdId.includes(this.dataSearch.capactityMajor))

                this.listSelectBoxForm.listChldCapa.unshift({
                    cdId: "",
                    cdNm: this.t('common.all'),
                });
            }).catch(() => {
                throw new Error(MESSAGE_ERROR_API);
            }).finally(() => {
                this.store.setLoading(false);
            })
        },
        goToDetail(data: any) {
            this.$router.push({ name: SCREEN.consititutiveMajorFormDept.name, params: { mode: MODE_CREATE }, state: { id: data.chldCapaId } })
        },
        getAllData() {
            this.store.setLoading(true)
            getListData(this.dataSearch).then(res => {
                if (res.status === SUCCSESS_STATUS) {
                    this.totalRecord = res.data.data.totalElements

                    this.data = res.data.data.content.map(el => {
                        el.regDate = el.regDate ? format(el.regDate, FORMAT_YYY_MM_DD) : '-';
                        const index = this.listStatus.findIndex(statusItem => statusItem.cdId == el.status);
                        el.status = this.listStatus[index].cdNm;
                        return el;
                    });
                }
            }).catch((err) => {
                throw new Error(MESSAGE_ERROR_API);
            }).finally(() => {
                this.store.setLoading(false)
            })
        },
        searchFormData() {
            this.dataSearch.page = 1;
            this.key++;
            this.fnPagination(this.dataSearch.page, this.dataSearch.size);
        },
        clearFormSearch() {
            this.dataSearch = {
                universityMajor: "",
                dept: "",
                capactityMajor: "",
                lowerGrade: "",
                status: "",
                page: 1,
                size: PAGINATION_PAGE_SIZE,
                sort: "",
            }
        },
        fnPagination(pageNumber: any, pagesSize: any) {
            this.dataSearch.page = pageNumber;
            this.dataSearch.size = pagesSize;
            this.getAllData();
        }
    }
}
</script>

<style scoped lang="scss"></style>