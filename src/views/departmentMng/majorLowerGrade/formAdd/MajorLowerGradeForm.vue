<template>
    <section id="content" class="content_wrapper grid_content" tabindex="0">
        <Breadcrumb :pageTitle="pageTitle" :breadcrumbItems="breadcrumbItems"></Breadcrumb>

        <div class="box dp_block">
            <div class="box_section">
                <p class="box_title_sm">
                    <!-- 학과 정보 -->
                    {{ t('departmentMng.majorLowerGradeList.form.title1') }}
                </p>
                <table class="tbl_row">
                    <colgroup>
                        <col style="width: 18%;">
                        <col style="width: auto;">
                    </colgroup>
                    <tbody>
                        <tr>
                            <th scope="row">
                                <!-- 단과대학 -->
                                {{ t('departmentMng.majorLowerGradeList.form.major') }}
                            </th>
                            <td class="td_input">
                                <InputBase v-model="dataForm.major" id="input_major" readonly />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">
                                <!-- 학과 -->
                                {{ t('departmentMng.majorLowerGradeList.form.deptment') }}
                            </th>
                            <td>
                                <InputBase v-model="dataForm.deptment" id="input_deptment" readonly />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="box dp_block">

            <div class="box_section">

                <div class="dp_flex justify-between al_center mb-5">
                    <p class="box_title_sm mb-0">
                        <!-- 전공능력 및 하위능력 관리 -->
                        {{ t('departmentMng.majorLowerGradeList.form.title2') }}
                    </p>
                    <button type="button" @click="addMajor()" class="btn_xs btn_blue">
                        <!-- 전공능력 추가 -->
                        {{ t('departmentMng.majorLowerGradeList.form.btnAdd') }}
                    </button>
                </div>
                <div class="scrollx_table sm">
                    <table class="tbl_col">
                        <colgroup>
                            <col style="width: 16%;">
                            <col style="width: auto;">
                            <col style="width: 12%;">
                            <col style="width: auto;">
                            <col style="width: 12%;">
                            <col style="width: 10%;">
                        </colgroup>
                        <thead>
                            <tr>
                                <th scope="col">
                                    <!-- 전공능력 -->
                                    {{ t('departmentMng.majorLowerGradeList.form.majorItem') }}
                                </th>
                                <th scope="col">
                                    <!-- 전공능력 정의 -->
                                    {{ t('departmentMng.majorLowerGradeList.form.defineMajorItem') }}
                                </th>
                                <th scope="col">
                                    <!-- 하위능력 -->
                                    {{ t('departmentMng.majorLowerGradeList.form.lowerGrade') }}
                                </th>
                                <th scope="col">
                                    <!-- 하위능력 정의 -->
                                    {{ t('departmentMng.majorLowerGradeList.form.defineLowerGrade') }}
                                </th>
                                <th scope="col">
                                    <!-- 사용여부 -->
                                    {{ t('departmentMng.majorLowerGradeList.form.isActive') }}
                                </th>
                                <th scope="col">
                                    <!-- 관리 -->
                                    {{ t('departmentMng.majorLowerGradeList.form.management') }}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in lowerGradeForm" :key="index">
                                <td v-if="item.isFirst" :rowspan="item.rowSpan">
                                    <div class="dp_flex al_center">
                                        <InputBase v-model="item.majorItemName" :id="`majorItemName_${index}`"
                                            required />
                                        <button type="button" @click="eventDeleteMajor(item.majorIndex)"
                                            class="button btn_xs btn_gray ml-1 wd_80">
                                            <!-- 삭제 -->
                                            {{ t('departmentMng.majorLowerGradeList.form.deleteMajor') }}
                                        </button>
                                    </div>
                                </td>
                                <td v-if="item.isFirst" :rowspan="item.rowSpan">
                                    <TextArea v-model="item.majorItemDefine" :id="`majorItemDefine_${index}`"
                                        required></TextArea>
                                </td>
                                <td>
                                    <InputBase v-model="item.lowerItemName" :id="`lowerItemName_${index}`" required />
                                </td>
                                <td>
                                    <TextArea v-model="item.lowerItemDefine" :id="`lowerItemDefine_${index}`"
                                        required></TextArea>
                                </td>
                                <td>
                                    <RadiobuttonBase v-for="itemRadio in listRadioUseYn" :mode="'show'"
                                        :value="itemRadio.cdId" v-model="item.lowerItemActive"
                                        :id="itemRadio.cdId + 'itemIsActive' + index"
                                        :name="itemRadio.cdId + 'itemIsActive' + index"
                                        :key="itemRadio.cdId + 'itemIsActive' + index"
                                        :checked="itemRadio.cdId == item.lowerItemActive" :label="itemRadio.cdNm">
                                    </RadiobuttonBase>
                                </td>
                                <td>
                                    <button type="button" v-if="item.lowerIndex == 0"
                                        @click="addLowerGrade(item.majorIndex)" class="button btn_xs btn_blue ml-8">
                                        <!-- 추가 -->
                                        {{ t('departmentMng.majorLowerGradeList.form.addLowerGrade') }}
                                    </button>
                                    <button type="button" v-if="item.lowerIndex != 0"
                                        @click="eventDeleteLowerGrade(item.majorIndex, item.lowerIndex)"
                                        class="button btn_xs btn_gray ml-8">
                                        <!-- 삭제 -->
                                        {{ t('departmentMng.majorLowerGradeList.form.deleteLowerGrade') }}</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="box_section">
                    <div class="btn_area">
                        <button type="button" class="button btn_xs btn_blue" @click="onSave">
                            <!-- 저장 -->
                            {{ t('departmentMng.majorLowerGradeList.form.btnSave') }}
                        </button>
                        <button type="button" class="button btn_xs btn_white" @click="back()">
                            <!-- 목록 -->
                            {{ t('departmentMng.majorLowerGradeList.form.btnBack') }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import Breadcrumb from '@/components/common/Breadcrumb.vue'
import { commonStore } from '@/stores/common'
import { SCREEN } from '@/router/screen';
import InputBase from '@/components/common/input/InputBase.vue';
import TextArea from '@/components/common/input/TextArea.vue';
import { useI18n } from 'vue-i18n';
import {
    detailById,
    update,
    checkMajorDelete,
    checkChldDelete
} from "@/stores/departmentService/majorLowerGrade/majorLowerGrade.service";
import type {
    MajorCapaDetailDTO,
    MajorCapaReqDTO,
    UnivesityMajorReqDTO,
    DataConvert
} from "@/stores/departmentService/majorLowerGrade/majorLowerGrade.type";
import { MESSAGE_ERROR_API, UP_CD_ID_USE_YN } from '@/constants/common.const'
import {
    getListCodeMng
} from "@/stores/common/codeMng/codeMng.service";
import type {
    CodeMngModel
} from "@/stores/common/codeMng/codeMng.type";

export default {
    components: {
        Breadcrumb,
        InputBase,
        TextArea
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
            modeScreen: '' as any,
            isOpen: false,
            isLoad: false,
            listRadioUseYn: [] as CodeMngModel[],
            lowerGradeForm: [] as Array<DataConvert>,
            dataForm: {} as MajorCapaDetailDTO,
            id: ''
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
        // Load combobox
        getListCodeMng({ upCdIdList: [UP_CD_ID_USE_YN] }).then(res => {
            this.listRadioUseYn = res.data.data;
        })

        this.modeScreen = this.$route.params.mode
        this.id = window.history.state.id

        if (this.id) {
            this.goToDetail();
        }

    },
    methods: {
        onClose() {
            this.isOpen = false
        },
        openModal() {
            this.isOpen = true
        },
        back() {
            this.$router.push({ path: SCREEN.majorLowerGradeDept.path })
        },
        convertToTable() {
            let dataReturn = [] as Array<DataConvert>;

            if (this.dataForm.listMajor && this.dataForm.listMajor.length > 0) {
                this.dataForm.listMajor.forEach((majorItem, majorIndex) => {
                    if (majorItem.lowerGrade && majorItem.lowerGrade.length > 0) {
                        majorItem.lowerGrade.forEach((lowerItem, lowerIndex) => {
                            dataReturn.push({
                                lowerItemId: lowerItem.id,
                                lowerItemName: lowerItem.name,
                                lowerItemDefine: lowerItem.define,
                                lowerItemActive: lowerItem.useYn,
                                lowerIndex: lowerIndex,
                                rowSpan: majorItem.lowerGrade.length,
                                isFirst: lowerIndex === 0,
                                majorItemId: majorItem.id,
                                majorItemName: majorItem.name,
                                majorItemDefine: majorItem.define,
                                majorIndex: majorIndex
                            });
                        });
                    } else {
                        dataReturn.push({
                            lowerItemId: "",
                            lowerItemName: "",
                            lowerItemDefine: "",
                            lowerItemActive: "Y",
                            lowerIndex: 0,
                            rowSpan: 1,
                            isFirst: true,
                            majorItemId: majorItem.id,
                            majorItemName: majorItem.name,
                            majorItemDefine: majorItem.define,
                            majorIndex: majorIndex
                        });
                    }
                });
            }

            return dataReturn;
        },
        convertToNested(flatData: Array<DataConvert>) {
            let nestedData = [] as Array<UnivesityMajorReqDTO>;

            flatData.forEach(item => {
                // Find or create the major item
                let majorItem = nestedData.find(major => major.majorIndex === item.majorIndex);
                if (!majorItem && item.isFirst) {
                    majorItem = {
                        id: item.majorItemId,
                        name: item.majorItemName,
                        define: item.majorItemDefine,
                        majorIndex: item.majorIndex,
                        lowerGrade: []
                    };
                    nestedData.push(majorItem);
                }

                // Add the lower grade to the corresponding major item
                majorItem.lowerGrade.push({
                    id: item.lowerItemId,
                    name: item.lowerItemName,
                    define: item.lowerItemDefine,
                    useYn: item.lowerItemActive
                });
            });

            return nestedData;
        },
        addMajor() {
            this.dataForm.listMajor = this.convertToNested(this.lowerGradeForm);
            this.dataForm.listMajor.unshift({
                id: "",
                name: "",
                define: "",
                lowerGrade: [
                    {
                        id: "",
                        name: "",
                        define: "",
                        useYn: "Y"
                    },
                ]
            })

            this.lowerGradeForm = this.convertToTable();
        },
        eventDeleteMajor(maJorIndex: number) {
            this.$swal({
                /* 전공능력을 삭제하시겠어요? 관련 하위능력 모두 삭제됩니다. */
                text: this.t('departmentMng.majorLowerGradeList.message.deleteMajor'),
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: '#DD6B55',
                confirmButtonText: this.t('common.confirm'),
                cancelButtonText: this.t('common.cancel'),
            }).then((result) => {
                if (result.isConfirmed) {
                    this.store.setLoading(true);
                    this.dataForm.listMajor = this.convertToNested(this.lowerGradeForm);

                    if (this.dataForm.listMajor[maJorIndex].id && this.dataForm.listMajor[maJorIndex].id != '') {
                        // Call api check is delete
                        checkMajorDelete(this.dataForm.listMajor[maJorIndex].id).then((res) => {
                            if (res.data.data) {
                                this.deleteMajor(maJorIndex);
                            } else {
                                this.$swal.fire({
                                    /* 활용된 능력은 삭제할 수 없습니다. */
                                    text: this.t('departmentMng.majorLowerGradeList.message.deleteError'),
                                    confirmButtonColor: '#DD6B55',
                                    confirmButtonText: this.t('common.confirm')
                                })
                            }
                        }).catch(() => {
                            throw new Error(MESSAGE_ERROR_API);
                        })
                    } else {
                        this.deleteMajor(maJorIndex);
                    }
                    this.store.setLoading(false);
                }
            })
        },
        deleteMajor(maJorIndex: number) {
            this.$swal.fire({
                /* 삭제됐습니다. */
                text: this.t('departmentMng.majorLowerGradeList.message.deleteMajorSuccess'),
                confirmButtonColor: '#DD6B55',
                confirmButtonText: this.t('common.confirm')
            }).then((res) => {
                this.dataForm.listMajor = this.dataForm.listMajor.filter((el, index) => index != maJorIndex);
                this.lowerGradeForm = this.convertToTable();
            });
        },
        addLowerGrade(maJorIndex: number) {
            this.dataForm.listMajor = this.convertToNested(this.lowerGradeForm);
            this.dataForm.listMajor[maJorIndex].lowerGrade.unshift(
                {
                    id: "",
                    name: "",
                    define: "",
                    useYn: "Y"
                },)
            this.lowerGradeForm = this.convertToTable();
        },
        eventDeleteLowerGrade(maJorIndex: number, lowerGradeIndex: number) {
            this.$swal({
                /* 하위능력을 삭제하시겠어요? */
                text: this.t('departmentMng.majorLowerGradeList.message.deleteLowgrade'),
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: '#DD6B55',
                confirmButtonText: this.t('common.confirm'),
                cancelButtonText: this.t('common.cancel'),
            }).then((result) => {
                if (result.isConfirmed) {
                    this.store.setLoading(true);
                    this.dataForm.listMajor = this.convertToNested(this.lowerGradeForm);

                    if (this.dataForm.listMajor[maJorIndex].lowerGrade[lowerGradeIndex].id && this.dataForm.listMajor[maJorIndex].lowerGrade[lowerGradeIndex].id != '') {
                        // Call api check is delete
                        checkChldDelete(this.dataForm.listMajor[maJorIndex].lowerGrade[lowerGradeIndex].id).then((res) => {
                            if (res.data.data) {
                                this.deleteLowerGrade(maJorIndex, lowerGradeIndex);
                            } else {
                                this.$swal.fire({
                                    /* 활용된 능력은 삭제할 수 없습니다. */
                                    text: this.t('departmentMng.majorLowerGradeList.message.deleteError'),
                                    confirmButtonColor: '#DD6B55',
                                    confirmButtonText: this.t('common.confirm')
                                })
                            }
                        }).catch(() => {
                            throw new Error(MESSAGE_ERROR_API);
                        })
                    } else {
                        this.deleteLowerGrade(maJorIndex, lowerGradeIndex);
                    }
                    this.store.setLoading(false);
                }
            })
        },
        deleteLowerGrade(maJorIndex: number, lowerGradeIndex: number) {
            this.$swal.fire({
                /* 삭제됐습니다. */
                text: this.t('departmentMng.majorLowerGradeList.message.deleteLowgradeSuccess'),
                confirmButtonColor: '#DD6B55',
                confirmButtonText: this.t('common.confirm')
            }).then((res) => {
                this.dataForm.listMajor = this.convertToNested(this.lowerGradeForm);
                this.dataForm.listMajor[maJorIndex].lowerGrade.splice(lowerGradeIndex, 1);
                this.lowerGradeForm = this.convertToTable();
            })
        },
        checkValidate() {
            const listData = this.lowerGradeForm;
            const nameMap = new Map();

            for (const item of listData) {
                if (nameMap.has(item.majorItemName)) {
                    if (nameMap.get(item.majorItemName) !== item.majorIndex) {
                        return false;
                    }
                } else {
                    nameMap.set(item.majorItemName, item.majorIndex);
                }
            }

            return true;
        },
        onSave() {
            if (this.store.check) {
                this.$swal.fire({
                    text: this.t('common.messageValidateRequired'),
                    confirmButtonColor: '#DD6B55',
                    confirmButtonText: this.t('common.confirm')
                })
                return;
            }
            if (this.lowerGradeForm.length == 0) {
                this.$swal.fire({
                    text: this.t('common.messageValidateRequired'),
                    confirmButtonColor: '#DD6B55',
                    confirmButtonText: this.t('common.confirm')
                })
                return;
            }
            if (!this.checkValidate()) {
                this.$swal.fire({
                    text: "동일한 이름의 역량명을 추가할 수 없습니다.",
                    confirmButtonColor: '#DD6B55',
                    confirmButtonText: this.t('common.confirm')
                })
                return;
            }
            this.$swal({
                /* 저장하시겠어요? */
                text: this.t('departmentMng.majorLowerGradeList.message.isSave'),
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: '#DD6B55',
                confirmButtonText: this.t('common.save'),
                cancelButtonText: this.t('common.cancel'),
            })
                .then((result) => {
                    if (result.isConfirmed) {
                        this.saveData();
                    }
                })
        },
        saveData() {
            this.dataForm.listMajor = this.convertToNested(this.lowerGradeForm);

            let dataRequest = {
                major: "",
                deptment: this.dataForm.deptCd,
                listMajor: this.dataForm.listMajor
            } as MajorCapaReqDTO;

            update(dataRequest).then((res) => {
                this.$swal.fire({
                    /* 정상처리됐습니다. */
                    text: this.t('departmentMng.majorLowerGradeList.message.success'),
                    confirmButtonColor: '#DD6B55',
                    confirmButtonText: this.t('common.confirm')
                }).then((res) => {
                    this.back();
                });
            }).catch((error) => {
                throw new Error(MESSAGE_ERROR_API);
            })
        },
        goToDetail() {
            this.store.setLoading(true);
            detailById(this.id).then(res => {
                this.dataForm = res.data.data;
                this.lowerGradeForm = this.convertToTable();
            }).catch(() => {
                throw new Error(MESSAGE_ERROR_API);
            }).finally(() => {
                this.store.setLoading(false);
            });
        },
    }
}
</script>

<style scoped lang="scss">
.justify-between {
    justify-content: space-between;
}
</style>