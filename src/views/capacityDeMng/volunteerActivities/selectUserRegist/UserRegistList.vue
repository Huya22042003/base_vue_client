<template>
    <section id="content" class="content_wrapper grid_content" tabindex="0">
        <Breadcrumb :pageTitle="pageTitle" :breadcrumbItems="breadcrumbItems"></Breadcrumb>

        <div class="box dp_block">
            <div class="box_section">
                <p class="box_title_sm">
                    <!-- 봉사활동 정보 -->
                    {{ t("capacityDeMng.volunteerActivities.userRegist.title") }}
                </p>
                <table class="tbl_row">
                    <colgroup>
                        <col style="width: 18%;">
                        <col style="width: auto;">
                    </colgroup>
                    <tbody v-if="dataDetail">
                        <tr>
                            <th scope="row">
                                <!-- 봉사제목 -->
                                {{ t("capacityDeMng.volunteerActivities.userRegist.topic") }}
                            </th>
                            <td class="td_input">
                                {{ dataDetail.topic }}
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">
                                <!-- 봉사기간 -->
                                {{ t("capacityDeMng.volunteerActivities.userRegist.volunteerTime") }}
                            </th>
                            <td>
                                {{ dataDetail.timeSocialStart ? format(dataDetail.timeSocialStart, FORMAT_YYY_MM_DD) : "" }}
                                 ~ 
                                {{ dataDetail.timeSocialEnd ? format(dataDetail.timeSocialEnd, FORMAT_YYY_MM_DD) : " " }}
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">
                                <!-- 모집인원 -->
                                {{ t("capacityDeMng.volunteerActivities.userRegist.quantityRegister") }}
                            </th>
                            <td class="td_input">
                                {{ dataDetail.recoTime.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }} 명
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">
                                <!-- 인정봉사시간 -->
                                {{ t("capacityDeMng.volunteerActivities.userRegist.volunteerReality") }}
                            </th>
                            <td>
                                {{ dataDetail.recruitmentNumb.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }} 시간
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">
                                <!-- 봉사자 유형 -->
                                {{ t("capacityDeMng.volunteerActivities.userRegist.typeVolunteer") }}
                            </th>
                            <td>{{ dataDetail.typeSocial }}</td>
                        </tr>
                        <tr>
                            <th scope="row">
                                <!-- 봉사 분야 -->
                                {{ t("capacityDeMng.volunteerActivities.userRegist.fieldVolunteer") }}
                            </th>
                            <td> {{ dataDetail.fieldSocial }} </td>
                        </tr>
                        <tr>
                            <th scope="row">
                                <!-- 봉사 대상 -->
                                {{ t("capacityDeMng.volunteerActivities.userRegist.objectVolunteer") }}
                            </th>
                            <td>{{ dataDetail.objectSocial }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="box dp_block">
            <div class="box_section">
                <GridComponentV2 :rowData="rowData" :columnDefs="columnDefs" :paginationClientFlag="false"
                    :paginationPageSize="paginationPageSize" @customPagination="fnPagination" :totalRecord="totalRecord"
                    :paginationPageSizeSelector="paginationPageSizeSelector">
                    <template #button>
                        <button type="button" @click="passList"
                            class="button btn_xs btn_white border_medium_gray bo_rd4">pass</button>
                        <button type="button" @click="failList"
                            class="button btn_xs btn_white border_medium_gray bo_rd4">fail</button>
                        <ExportFileExcel
                            :callData="true"
                            ref="exportExcelRef"
                            @click="exportExcel"
                            :data="dataExport"
                            :fileName="fileNameExport"
                            :btnName="
                                t('capacityDeMng.volunteerActivities.userRegist.btnExportExcel')
                            "
                        >
                        </ExportFileExcel>
                    </template>
                </GridComponentV2>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import Breadcrumb from '@/components/common/Breadcrumb.vue'
import { commonStore } from '@/stores/common'
import {
    PAGINATION_PAGE_SIZE_SELECTOR,
    PAGINATION_PAGE_SIZE,
    SUCCSESS_STATUS,
    FORMAT_YYY_MM_DD,
} from '@/constants/screen.const'
import GridComponentV2 from '@/components/common/grid/GridComponentV2.vue'
import { SCREEN } from '@/router/screen';
import { getDetailUserRegist, getFormDetailUser, passUserDetail, failUserDetail, getFormDetailUserAll } from "@/stores/capacityDeMng/socialServe/volunteerActivities/volunteerActivities.service";
import { MESSAGE_ERROR_API } from '@/constants/common.const'
import CheckboxGrid from "@/components/common/grid/CheckboxGrid.vue";
import { format } from 'date-fns';

export default {
    components: {
        Breadcrumb,
        GridComponentV2,
        CheckboxGrid
    },
    data() {
        return {
            pageTitle: this.t("capacityDeMng.volunteerActivities.title") /* 사회봉사 관리 */,
            breadcrumbItems: [],
            modeScreen: '' as any,
            isOpen: false,
            isLoad: false,
            paginationPageSize: PAGINATION_PAGE_SIZE,
            paginationPageSizeSelector: PAGINATION_PAGE_SIZE_SELECTOR,
            rowselected: [] as any[],
            columnDefs: ref([
                {
                    headerName: this.t("common.rowNum"),
                    field: "rowNumb",
                    flex: .3
                },
                {
                    headerComponent: CheckboxGrid,
                    headerComponentParams: {
                        valueChecked: this.selectAll,
                        onCustomEvent: this.checkAll,
                        type: 'selectAll',
                        selectAllGridId: "selectAllGridId01",
                        childName: "childName"
                    },
                    headerName: this.t("common.select"),
                    cellRenderer: CheckboxGrid,
                    cellRendererParams: {
                        onCustomEvent: this.checkChild,
                        type: "selectChild",
                        selectAllGridId: "selectAllGridId01",
                        childName: "childName"
                    },
                    field: 'checkedFlag',
                    cellStyle: {
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    },
                    flex: .3
                },
                {
                    headerName: this.t("capacityDeMng.volunteerActivities.userRegist.name"),/* 이름 */
                    field: "name",
                },
                {
                    headerName: this.t("capacityDeMng.volunteerActivities.userRegist.code"),/* 학번/교번 */
                    field: "code",
                },
                {
                    headerName: this.t("capacityDeMng.volunteerActivities.userRegist.date"),/* 생년월일 */
                    field: "birthDate",
                },
                {
                    headerName: this.t("capacityDeMng.volunteerActivities.userRegist.type"),/* 구분 */
                    field: "typeApp",
                },
                {
                    headerName: this.t("capacityDeMng.volunteerActivities.userRegist.department"),/* 학과/부서 */
                    field: "department",
                },
                {
                    headerName: this.t("capacityDeMng.volunteerActivities.userRegist.id"),/* 1365 ID */
                    field: "codeUserSocial",
                },
                {
                    headerName: this.t("capacityDeMng.volunteerActivities.userRegist.result"),/* 이수 결과 */
                    field: "result",
                },
            ]),
            rowData: [],
            dataDetail: {
                id: "",
                topic: "",
                timeSocialStart: "",
                timeSocialEnd: "",
                recoTime: "",
                recruitmentNumb: "",
                typeSocial: "",
                fieldSocial: "",
                objectSocial: "",
            },
            key: 1,
            totalRecord: 0,
            dataSearch: {
                id: "",
                page: 1,
                size: PAGINATION_PAGE_SIZE,
                sort: "",
            },
            rowDataExcel: [],
            dataExport: [],
            fileNameExport: "참가자_목록",
        }
    },
    setup: () => {
        const store = commonStore();
        const { t } = useI18n();
        const gridKey = ref(null);
        const exportExcelRef = ref(null)

        return { t, store, gridKey, FORMAT_YYY_MM_DD, format, exportExcelRef };
    },
    beforeMount() {
        this.dataSearch.id = window.history.state.id;

        this.fillDataDetail();
    },
    methods: {
        back() {
            this.$router.push({ path: SCREEN.volunteerActivites.path })
        },
        checkChild(value: any, data: any) {
            if (value) {
                this.rowselected.push(data)
            } else {
                const index = this.rowselected.indexOf(data);
                if (index !== -1) {
                    this.rowselected.splice(index, 1);
                }
            }
            this.rowselected = [...new Set(this.rowselected)];

        },
        checkAll(value: boolean) {
            this.rowData.forEach(item => {
                item.checkedFlag = value;
                if (value) {
                    this.rowselected.push(item)

                } else {
                    const index = this.rowselected.indexOf(item);
                    if (index !== -1) {
                        this.rowselected.splice(index, 1);
                    }
                }
            })

            this.rowselected = [...new Set(this.rowselected)];
        },
        fillDataDetail() {
            this.store.setLoading(true)
            getDetailUserRegist(this.dataSearch.id).then(res => {
                if (res.status === SUCCSESS_STATUS) {
                    this.dataDetail = res.data.data;
                }
            }).catch((err) => {
                throw new Error(MESSAGE_ERROR_API);
            }).finally(() => {
                this.store.setLoading(false)
            })
        },
        passList() {
            this.$swal({
                /* 저장하시겠어요? */
                text: this.t("capacityDeMng.volunteerActivities.userRegist.confirmPass", { count: this.rowselected.length }),
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: this.t("common.save"),
                cancelButtonText: this.t("common.cancel"),
            }).then((result) => {
                if (result.isConfirmed) {
                    this.passSave();
                }
            });
        },
        failList() {
            this.$swal({
                /* 저장하시겠어요? */
                text: this.t("capacityDeMng.volunteerActivities.userRegist.confirmFail", { count: this.rowselected.length }),
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: this.t("common.save"),
                cancelButtonText: this.t("common.cancel"),
            }).then((result) => {
                if (result.isConfirmed) {
                    this.failSave();
                }
            });
        },
        passSave() {
            const selectedIds = this.rowselected.map(item => item.id);
            this.store.setLoading(true)
            passUserDetail(selectedIds)
                .then((res) => {
                    this.$swal
                        .fire({
                            text: this.t(
                                "capacityDeMng.volunteerActivities.userRegist.passSuccess",
                                { count: selectedIds.length }
                            ),
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: this.t("common.confirm"),
                        })
                        .then(() => {
                            this.dataSearch.page = 1;
                            this.rowselected = []
                            this.fnPagination(this.dataSearch.page, this.dataSearch.size);
                        });
                })
                .finally(() => {
                    this.store.setLoading(false);
                });
        },
        failSave() {
            const selectedIds = this.rowselected.map(item => item.id);
            this.store.setLoading(true)
            failUserDetail(selectedIds)
                .then((res) => {
                    this.$swal
                        .fire({
                            text: this.t(
                                "capacityDeMng.volunteerActivities.userRegist.failSuccess",
                                { count: selectedIds.length }
                            ),
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: this.t("common.confirm"),
                        })
                        .then(() => {
                            this.dataSearch.page = 1;
                            this.rowselected = []
                            this.fnPagination(this.dataSearch.page, this.dataSearch.size);
                        });
                })
                .finally(() => {
                    this.store.setLoading(false);
                });
        },
        exportExcel() {
            this.store.setLoading(true)
            getFormDetailUserAll(this.dataSearch).then(res => {
                if (res.status === SUCCSESS_STATUS) {
                    let dataContent = res.data.data;
                    const header = [
                        this.t("common.rowNum"),
                        this.t("capacityDeMng.volunteerActivities.userRegist.name"),
                        this.t("capacityDeMng.volunteerActivities.userRegist.code"),
                        this.t("capacityDeMng.volunteerActivities.userRegist.date"),
                        this.t("capacityDeMng.volunteerActivities.userRegist.type"),
                        this.t("capacityDeMng.volunteerActivities.userRegist.department"),
                        this.t("capacityDeMng.volunteerActivities.userRegist.id"),
                        this.t("capacityDeMng.volunteerActivities.userRegist.result")]
                    let content = [] as Array<any>;
                    dataContent.forEach((element:any) => {
                        let contentItem = [];

                        contentItem.push(element.rowNumb                        );
                        contentItem.push(element.name);
                        contentItem.push(element.code);
                        contentItem.push(element.birthDate);
                        contentItem.push(element.typeApp);
                        contentItem.push(element.department);
                        contentItem.push(element.codeUserSocial);
                        contentItem.push(element.result);

                        content.push(contentItem);
                    });

                    this.dataExport = [
                    { sheetName: "sheet1", data: content, header: header },
                    ];
                    
                    this.exportExcelRef.downloadExcel();
                }
            }).catch((err) => {
                throw new Error(MESSAGE_ERROR_API);
            }).finally(() => {
                this.store.setLoading(false)
            })
        },
        fnPagination(pageNumber: any, pagesSize: any) {
            this.dataSearch.page = pageNumber;
            this.dataSearch.size = pagesSize;
            this.getAllData();
        },
        getAllData() {
            this.store.setLoading(true)
            getFormDetailUser(this.dataSearch).then(res => {
                if (res.status === SUCCSESS_STATUS) {
                    this.totalRecord = res.data.data.totalElements
                    this.rowData = res.data.data.content;
                    console.log(this.rowData);
                    
                    let check = true
                    const selectedIds = this.rowselected.map(item => item.id);
                    this.rowData = this.rowData.map((el) => {
                        if (selectedIds.includes(el.id)) {
                            el.checkedFlag = true;
                        } else {
                            el.checkedFlag = false;
                        }
                        return el;
                    });
                    this.rowData.forEach((row) => {
                        if (!row.checkedFlag) {
                            check = false
                        }
                    })
                    const resetSelect = document.getElementById('selectAllGridId01')

                    if (check) {
                        resetSelect.checked = true
                    } else {
                        resetSelect.checked = false
                    }
                }
            }).catch((err) => {
                throw new Error(MESSAGE_ERROR_API);
            }).finally(() => {
                this.store.setLoading(false)
            })
        },
    }
}
</script>

<style scoped lang="scss"></style>