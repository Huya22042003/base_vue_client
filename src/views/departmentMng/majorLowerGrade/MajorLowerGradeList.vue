<template>
    <section id="content" class="content_wrapper grid_content" tabindex="0">
        <Breadcrumb :pageTitle="pageTitle" :breadcrumbItems="breadcrumbItems"></Breadcrumb>
        <!-- Form search -->
        <div class="box dp_block">
            <div class="box_section">
                <div class="search_box col_2">
                    <ul>
                        <li>
                            <p>
                                <!-- 단과대학 -->
                                {{ t('departmentMng.majorLowerGradeList.search.universityMajor') }}
                            </p>
                            <SelectBoxBase :id="'selectbox'" :name="'selectbox'" v-model="dataSearch.universityMajor"
                                :data="listSelectBoxMajor">
                            </SelectBoxBase>
                        </li>
                        <li>
                            <p>
                                <!-- 학과 -->
                                {{ t('departmentMng.majorLowerGradeList.search.dept') }}
                            </p>
                            <SelectBoxBase :id="'selectbox'" :name="'selectbox'" v-model="dataSearch.dept"
                                :data="listSelectBoxDept">
                            </SelectBoxBase>
                        </li>
                    </ul>
                </div>
                <div class="btn_group btn_end" style="gap:10px;">
                    <button class="button btn_xl btn_blue btn_responsive" @click="searchFormData()">
                        <!-- 조회 -->
                        {{ t('departmentMng.majorLowerGradeList.search.search') }}
                    </button>
                    <button class="button btn_xl btn_lightgray btn_responsive" @click="clearFormSearch()">
                        <!-- 초기화 -->
                        {{ t('departmentMng.majorLowerGradeList.search.clear') }}
                    </button>
                </div>
            </div>
        </div>

        <div class="box dp_block">
            <div class="box_inner">
                <p class="note_custom mb-4">
                                <!-- ※ 최고 관리자 외에는 로그인한 학과장 소속 학과의 전공능력만 목록에 조회됩니다 -->
                                {{ t('departmentMng.majorLowerGradeList.list.subTitle') }}
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
import GridComponentV2 from '@/components/common/grid/GridComponentV2.vue'
import { SCREEN } from '@/router/screen';
import { useI18n } from 'vue-i18n';
import {
    PAGINATION_PAGE_SIZE_SELECTOR,
    PAGINATION_PAGE_SIZE,
    MODE_CREATE,
    SUCCSESS_STATUS,
    FORMAT_YYY_MM_DD,
} from '@/constants/screen.const'
import { format } from 'date-fns';
import LinkGridComponent from '@/components/common/grid/LinkGridComponent.vue'
import {
    getListData
} from "@/stores/departmentService/majorLowerGrade/majorLowerGrade.service";
import type {
    DeptInfoFilterDTO,
    SimpleDeptInfoDTO
} from "@/stores/departmentService/majorLowerGrade/majorLowerGrade.type";
import { DIV_CD_DEPT_DEPART, DIV_CD_DEPT_MAJOR, MESSAGE_ERROR_API } from '@/constants/common.const';
import { getDepartmentList } from "@/stores/common/department/department.service"

export default {
    components: {
        Breadcrumb,
        GridComponentV2
    },
    data() {
        return {
            /* '전공능력 및 하위능력 관리' */
            pageTitle: this.t('departmentMng.majorLowerGradeList.pageTitle'),
            breadcrumbItems: [
                /* 'HOME' */
                { label: this.t('departmentMng.majorLowerGradeList.breadcrumb.01'), link: '/' },
                /* '학과정보 관리' */
                { label: this.t('departmentMng.majorLowerGradeList.breadcrumb.02'), link: '#' },
                /* '전공능력 및 하위능력 관리' */
                { label: this.t('departmentMng.majorLowerGradeList.breadcrumb.03'), link: SCREEN.majorLowerGradeFormDept.path }
            ],
            parentListObject: [],
            isOpen: false,
            paginationPageSize: PAGINATION_PAGE_SIZE,
            paginationPageSizeSelector: PAGINATION_PAGE_SIZE_SELECTOR,
            data: [],
            dataSearch: {
                universityMajor: "",
                dept: "",
                page: 1,
                size: PAGINATION_PAGE_SIZE,
                sort: "",
            } as DeptInfoFilterDTO,
            listSelectBoxDept: [] as Array<SimpleDeptInfoDTO>,
            listSelectBoxMajor: [] as Array<SimpleDeptInfoDTO>,
            columnDefs: ref([
                {
                    /* '번호' */
                    headerName: this.t('departmentMng.majorLowerGradeList.list.rowNum'),
                    field: 'rowNumb',
                    flex: 0.2,
                    cellStyle: {
                        textAlign: 'center'
                    }
                },
                {
                    /* '단과대학' */
                    headerName: this.t('departmentMng.majorLowerGradeList.list.universityMajor'),
                    field: 'major',
                    cellStyle: {
                        textAlign: 'center'
                    }
                },
                {
                    /* '학과' */
                    headerName: this.t('departmentMng.majorLowerGradeList.list.dept'),
                    field: 'dept',
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
                    /* '등록자' */
                    headerName: this.t('departmentMng.majorLowerGradeList.list.createdBy'),
                    field: 'regId',
                    cellStyle: {
                        textAlign: 'center'
                    },
                    flex: 0.4
                },
                {
                    /* '등록일' */
                    headerName: this.t('departmentMng.majorLowerGradeList.list.createdDate'),
                    field: 'regDate',
                    cellStyle: {
                        textAlign: 'center'
                    },
                    flex: 0.4
                }
            ]),
            key: 1,
            totalRecord: 0
        }
    },
    setup() {
        const { t } = useI18n()
        const store = commonStore()

        return {
            t,
            store
        }
    },
    beforeMount() {
        this.listSelectBoxDept.push({
            cdId: "",
            cdNm: this.t('common.all'),
            upCdId: "dept"
        });
        getDepartmentList({
            deptCd: [],
            deptDivCd: [DIV_CD_DEPT_MAJOR, DIV_CD_DEPT_DEPART],
            upDeptCd: [],
            useYn: ""
        }).then(res => {
            this.listSelectBoxDept = res.data.data.filter((el) => el.deptDivCd == DIV_CD_DEPT_DEPART).map(el => {
                return {
                    cdId: el.deptCd,
                    cdNm: el.deptNm,
                    upCdId: "dept"
                }
            })
            this.listSelectBoxDept.unshift({
                cdId: "",
                cdNm: this.t('common.all'),
                upCdId: "major"
            });
            this.listSelectBoxMajor = res.data.data.filter((el) => el.deptDivCd == DIV_CD_DEPT_MAJOR).map(el => {
                return {
                    cdId: el.deptCd,
                    cdNm: el.deptNm,
                    upCdId: "dept"
                }
            })
            this.listSelectBoxMajor.unshift({
                cdId: "",
                cdNm: this.t('common.all'),
                upCdId: "major"
            });
        }).catch(() => {
            throw new Error(MESSAGE_ERROR_API);
        })
    },
    watch: {
        'dataSearch.universityMajor': {
            handler: function () {
                this.getDeptByMajor();
            }
        }
    },
    methods: {
        getDeptByMajor() {
            this.store.setLoading(true);
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
                this.listSelectBoxDept = res.data.data.map(el => {
                    return {
                        cdId: el.deptCd,
                        cdNm: el.deptNm,
                        upCdId: "dept"
                    }
                })
                this.listSelectBoxDept.unshift({
                    cdId: "",
                    cdNm: this.t('common.all'),
                    upCdId: "dept"
                });
            }).catch(() => {
                throw new Error(MESSAGE_ERROR_API);
            }).finally(() => {
                this.store.setLoading(false);
            })
        },
        goToDetail(data) {
            this.$router.push({ name: SCREEN.majorLowerGradeFormDept.name, params: { mode: MODE_CREATE }, state: { id: data.id } })
        },
        getAllData() {
            this.store.setLoading(true)
            getListData(this.dataSearch).then(res => {
                if (res.status === SUCCSESS_STATUS) {
                    this.totalRecord = res.data.data.totalElements

                    this.data = res.data.data.content.map(el => {
                        el.regDate = el.regDate ? format(el.regDate, FORMAT_YYY_MM_DD) : '-'
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
                page: 1,
                size: PAGINATION_PAGE_SIZE,
                sort: ""
            };
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