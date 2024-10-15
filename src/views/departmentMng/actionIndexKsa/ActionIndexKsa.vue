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
                                {{ t('departmentMng.actionIndexKsa.search.universityMajor') }}</p>

                            <SelectBoxBase :id="'selectbox'" :name="'selectbox'" v-if="listSelectBox.major"
                                v-model="dataSearch.major" :data="listSelectBox.major">
                            </SelectBoxBase>
                        </li>
                        <li>
                            <p>
                                <!-- 학과 -->
                                {{ t('departmentMng.actionIndexKsa.search.dept') }}
                            </p>
                            <SelectBoxBase :id="'selectbox'" :name="'selectbox'" v-model="dataSearch.dept" v-if="listSelectBox.dept"
                                :data="listSelectBox.dept">
                            </SelectBoxBase>
                        </li>
                        <li>
                            <p>
                                <!-- 전공능력 -->
                                {{ t('departmentMng.actionIndexKsa.search.capacityMajor') }}
                            </p>
                            <SelectBoxBase :id="'selectbox'" :name="'selectbox'" v-model="dataSearch.majorCapa" v-if="listSelectBox.majorCapa"
                                :data="listSelectBox.majorCapa">
                            </SelectBoxBase>
                        </li>
                        <!-- row 2 -->

                        <li>
                            <p>
                                <!-- 하위능력 -->
                                {{ t('departmentMng.actionIndexKsa.search.lowerGrade') }}</p>
                            <SelectBoxBase :id="'selectbox'" :name="'selectbox'" v-model="dataSearch.chldCapa" v-if="listSelectBox.chldCapa"
                                :data="listSelectBox.chldCapa">
                            </SelectBoxBase>
                        </li>
                        <li>
                            <p>
                                <!-- 구성요소 -->
                                {{ t('departmentMng.actionIndexKsa.search.constitutiveFactor') }}</p>
                            <InputBase v-model="dataSearch.majorElem" id="input_constitutiveFactor" />
                        </li>
                        <li>
                            <p>
                                <!-- 상태 -->
                                {{ t('departmentMng.actionIndexKsa.search.isAction') }}</p>
                                <RadiobuttonBase v-for="(itemRadio, index) in listStatus"
                                    :value="itemRadio.cdId" v-model="dataSearch.status" :id="`${itemRadio.cdId}_${index}`"
                                    :name="`${itemRadio.cdId}_${index}`" :key="`${itemRadio.cdId}_${index}`"
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
                    <!-- ※ 최고 관리자 외에는 로그인한 학과장 소속 학과의 전공능력만 목록에 조회됩니다 -->
                    {{ t('departmentMng.majorLowerGradeList.list.subTitle') }}</p>
                <!-- Table at here -->
                <GridComponentV2 
                    :key="key"
                    :rowData="data" 
                    :columnDefs="columnDefs"
                    :paginationClientFlag="false"
                    :paginationPageSize="paginationPageSize"
                    @customPagination="fnPagination"
                    :totalRecord="totalRecord"
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
    MODE_SHOW,
    MODE_CREATE,
    FORMAT_YYY_MM_DD,
    SUCCSESS_STATUS,
} from '@/constants/screen.const'
import { SCREEN } from '@/router/screen';
import { useI18n } from 'vue-i18n';
import GridComponentV2 from '@/components/common/grid/GridComponentV2.vue';
import LinkGridComponent from '@/components/common/grid/LinkGridComponent.vue';
import { getListData, getListForm} from '@/stores/departmentService/actionIndexKsa/actionIndexKsa.service';
import type { ActionIndexKsaFilterDTO, ActionIndexKsaResDTO, ActionIndexKsaLoadFilterDTO, SimpleListBoxDTO } from '@/stores/departmentService/actionIndexKsa/actionIndexKsa.type'
import { DIV_CD_DEPT_DEPART, DIV_CD_DEPT_MAJOR, MESSAGE_ERROR_API, UP_CD_ID_STATUS } from '@/constants/common.const';
import type {
    CodeMngModel
} from "@/stores/common/codeMng/codeMng.type";
import {
    getListCodeMng
} from "@/stores/common/codeMng/codeMng.service";
import { format } from 'date-fns';
import { getDepartmentList } from "@/stores/common/department/department.service"

export default {
    components: {
        Breadcrumb,
        GridComponentV2,
        LinkGridComponent
    },
    beforeMount() {
        // Load combobox
        getListCodeMng({ upCdIdList: [UP_CD_ID_STATUS] }).then(res => {
            this.listStatus = res.data.data;
            this.listStatus.unshift({
                cdId: "",
                cdNm: this.t('common.all'),
                upCdId: UP_CD_ID_STATUS
            });
        })
        getListForm().then(res => {
            this.listSelectBox.majorCapa = res.data.data.majorCapa.map((el: SimpleListBoxDTO) => {
                return {
                    cdId: el.id,
                    cdNm: el.value,
                    upCdId: 'majorCapa'
                }
            });
            this.listSelectBox.chldCapa = res.data.data.chldCapa.map((el: SimpleListBoxDTO) => {
                return {
                    cdId: el.id,
                    cdNm: el.value,
                    upCdId: 'chldCapa'
                }
            });

            this.listSelectBox.majorCapa.unshift({
                cdId: "",
                cdNm: this.t('common.all'),
                upCdId: 'majorCapa'
            });

            this.listSelectBox.chldCapa.unshift({
                cdId: "",
                cdNm: this.t('common.all'),
                upCdId: 'chldCapa'
            });
        }).catch(() => {
            throw new Error(MESSAGE_ERROR_API);
        });
        getDepartmentList({
            deptCd: [],
            deptDivCd: [DIV_CD_DEPT_DEPART, DIV_CD_DEPT_MAJOR],
            upDeptCd: [],
            useYn: ""
        }).then(res => {
            this.listSelectBox.dept = res.data.data.filter((el) => el.deptDivCd == DIV_CD_DEPT_DEPART).map(el => {
                return {
                    cdId: el.deptCd,
                    cdNm: el.deptNm,
                    upCdId: "dept"
                }
            })
            this.listSelectBox.dept.unshift({
                cdId: "",
                cdNm: this.t('common.all'),
                upCdId: "dept"
            });

            this.listSelectBox.major = res.data.data.filter((el) => el.deptDivCd == DIV_CD_DEPT_MAJOR).map(el => {
                return {
                    cdId: el.deptCd,
                    cdNm: el.deptNm,
                    upCdId: "dept"
                }
            })
            this.listSelectBox.major.unshift({
                cdId: "",
                cdNm: this.t('common.all'),
                upCdId: "major"
            });
        }).catch(() => {
            throw new Error(MESSAGE_ERROR_API);
        })
    },
    data() {
        return {
            /* '행동지표, 행동기준평정척도, KSA 관리' */
            pageTitle: this.t('departmentMng.actionIndexKsa.title'),
            breadcrumbItems: [
                /* 'HOME' */
                { label: this.t('departmentMng.actionIndexKsa.breadcrumb.01'), link: '/' },
                /* '학과정보 관리' */
                { label: this.t('departmentMng.actionIndexKsa.breadcrumb.02'), link: '#' },
                /* '행동지표, 행동기준평정척도, KSA 관리' */
                { label: this.t('departmentMng.actionIndexKsa.breadcrumb.03'), link: SCREEN.typeTalentNurturingCrudDept.path }
            ],
            radiovalue1: ref('name03'),
            parentListObject: [],
            isOpen: false,
            isLoad: false,
            paginationPageSize: PAGINATION_PAGE_SIZE,
            paginationPageSizeSelector: PAGINATION_PAGE_SIZE_SELECTOR,
            dataSearch: {
                major: "",
                dept: "",
                majorCapa: "",
                chldCapa: "",
                majorElem: "",
                status: "",
                page: 1,
                size: PAGINATION_PAGE_SIZE,
                sort: ""
            } as ActionIndexKsaFilterDTO,
            listSelectBox: {} as ActionIndexKsaLoadFilterDTO,
            data: [] as ActionIndexKsaResDTO[],
            columnDefs: ref([
                {/* '단과대학' */
                    headerName: this.t('departmentMng.actionIndexKsa.list.universityMajor'),
                    field: 'universityMajor',
                    cellStyle: {
                        textAlign: 'center'
                    }
                },
                {/* '학과' */
                    headerName: this.t('departmentMng.actionIndexKsa.list.dept'),
                    field: 'dept',
                    cellStyle: {
                        textAlign: 'center'
                    }
                },
                {/* '전공능력' */
                    headerName: this.t('departmentMng.actionIndexKsa.list.capacityMajor'),
                    field: 'capacityMajor',
                    cellStyle: {
                        textAlign: 'center'
                    }
                },
                {/* '하위능력' */
                    headerName: this.t('departmentMng.actionIndexKsa.list.lowerGrade'),
                    field: 'lowerGrade',
                    cellStyle: {
                        textAlign: 'center'
                    }
                },
                {/* '구성요소' */
                    headerName: this.t('departmentMng.actionIndexKsa.list.constitutiveFactor'),
                    field: 'constitutiveFactor',
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
                {/* '상태' */
                    headerName: this.t('departmentMng.actionIndexKsa.list.isAction'),
                    field: 'isAction',
                    cellStyle: {
                        textAlign: 'center'
                    }
                },
                {/* '등록자' */
                    headerName: this.t('departmentMng.actionIndexKsa.list.createdBy'),
                    field: 'createdBy',
                    cellStyle: {
                        textAlign: 'center'
                    }
                },
                {/* '등록일' */
                    headerName: this.t('departmentMng.actionIndexKsa.list.createdDate'),
                    field: 'createdDate',
                    cellStyle: {
                        textAlign: 'center'
                    }
                }
            ]),
            key: 0,
            totalRecord: 0,
            listStatus: [] as CodeMngModel[]
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
    methods: {
        create() {
            this.$router.push({ name: SCREEN.actionIndexKsaForm.name, params: { mode: MODE_CREATE } })
        },
        goToDetail(data: any) {
            this.$router.push({ name: SCREEN.actionIndexKsaForm.name, params: { mode: MODE_SHOW }, state: { id: data.id } })
        },
        getAllData() {
            this.store.setLoading(true)
            getListData(this.dataSearch).then(res => {
                if (res.status === SUCCSESS_STATUS) {
                    this.totalRecord = res.data.data.totalElements
                    
                    this.data = res.data.data.content.map((el: ActionIndexKsaResDTO) => {
                        el.createdDate = el.createdDate ? format(el.createdDate, FORMAT_YYY_MM_DD) : ' - ';
                        el.isAction = el.isAction == 'Y' ? this.t('departmentMng.actionIndexKsa.search.isActionTrue') : this.t('departmentMng.actionIndexKsa.search.isActionFalse')
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
                major: "",
                dept: "",
                majorCapa: "",
                chldCapa: "",
                majorElem: "",
                status: "",
                page: 1,
                size: PAGINATION_PAGE_SIZE,
                sort: ""
            };
        },
        fnPagination (pageNumber: any, pagesSize: any) {
            this.dataSearch.page = pageNumber;
            this.dataSearch.size = pagesSize;
            this.getAllData();
        }
    }
}
</script>