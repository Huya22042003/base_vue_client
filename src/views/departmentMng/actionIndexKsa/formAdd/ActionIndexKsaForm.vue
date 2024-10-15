<template>
    <section id="content" class="content_wrapper grid_content" tabindex="0">
        <Breadcrumb :pageTitle="pageTitle" :breadcrumbItems="breadcrumbItems"></Breadcrumb>

        <div class="box dp_block">
            <div class="box_section">
                <!-- 핵심역량 정보 -->
                <p class="box_title_sm">{{ t('departmentMng.actionIndexKsa.form.title1') }}
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
                                <p class="required">
                                    {{ t('departmentMng.actionIndexKsa.form.universityMajor') }}
                                </p>
                            </th>
                            <td class="td_input">
                                <InputBase v-model="dataForm.universityMajor" id="input_major" readonly />
                            </td>
                        </tr>
                        <tr>
                            <!-- 학과 -->
                            <th scope="row">
                                <p class="required">
                                    {{ t('departmentMng.actionIndexKsa.form.dept') }}
                                </p>
                            </th>
                            <td>
                                <InputBase v-model="dataForm.dept" id="input_deptment" readonly />
                            </td>
                        </tr>
                        <tr>
                            <!-- 전공능력 -->
                            <th scope="row">
                                <p class="required">
                                    {{ t('departmentMng.actionIndexKsa.form.capacityMajor') }}
                                </p>
                            </th>
                            <td class="td_input">
                                <InputBase v-model="dataForm.capacityMajor" id="input_capacityMajor" readonly />
                            </td>
                        </tr>
                        <tr>
                            <!-- 하위능력 -->
                            <th scope="row">
                                <p class="required">
                                    {{ t('departmentMng.actionIndexKsa.form.lowerGrade') }}
                                </p>
                            </th>
                            <td>
                                <InputBase v-model="dataForm.lowerGrade" id="input_lowerGrade" readonly />
                            </td>
                        </tr>
                        <tr>
                            <!-- 구성요소 -->
                            <th scope="row">
                                <p class="required">
                                    {{ t('departmentMng.actionIndexKsa.form.constitutiveFactor') }}
                                </p>
                            </th>
                            <td>
                                <InputBase v-model="dataForm.constitutiveFactor" id="input_constitutiveFactor"
                                    readonly />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="box dp_block">
            <div class="box_section">

                <!-- 행동지표, 행동기준평정척도, KSA 관리 -->
                <p class="box_title_sm">{{ t('departmentMng.actionIndexKsa.form.title2') }}</p>

                <div class="dp_flex mb-10 justify-between" v-for="(item, index) in dataForm.actionIndexKsa" :key="index">
                    <table class="tbl_row flex-10">
                        <colgroup>
                            <col style="width: 18%;">
                            <col style="width: auto;">
                        </colgroup>
                        <tbody>
                            <!-- row 1 -->
                            <tr>
                                <!-- 행동지표  -->
                                <th scope="row" class="border_right">
                                    <p class="required">
                                        {{ t('departmentMng.actionIndexKsa.form.actionDetail') }}
                                    </p>
                                </th>
                                <td colspan="2" class="td_input">
                                    <InputBase v-model="item.actionDetail" :id="`actionDetail_${index}`" required />
                                </td>
                            </tr>
                            <!-- row 2 -->
                            <tr>
                                <!-- 행동기준평정척도 -->
                                <th scope="row" rowspan="3" class="border_right">
                                    <p class="required">
                                        {{ t('departmentMng.actionIndexKsa.form.point') }}
                                    </p>
                                </th>
                                <th scope="row" class="border_right">
                                    <p class="required">
                                        {{ t('departmentMng.actionIndexKsa.form.highPoint') }}
                                    </p> <!-- 상 -->
                                </th>
                                <td>
                                    <InputBase v-model="item.highPoint" :id="`highPoint_${index}`" required />
                                </td>
                            </tr>
                            <tr>
                                <th scope="row" class="border_right">
                                    <p class="required">
                                        {{ t('departmentMng.actionIndexKsa.form.middlePoint') }}
                                    </p> <!-- 중 -->
                                </th>
                                <td>
                                    <InputBase v-model="item.middlePoint" :id="`middlePoint_${index}`" required />
                                </td>
                            </tr>
                            <tr>
                                <th scope="row" class="border_right">
                                    <p class="required">
                                        {{ t('departmentMng.actionIndexKsa.form.lowPoint') }}
                                    </p> <!-- 하 -->
                                </th>
                                <td>
                                    <InputBase v-model="item.lowPoint" :id="`lowPoint_${index}`" required />
                                </td>
                            </tr>
                            <!-- row 3 -->
                            <tr>
                                <th scope="row" class="border_right">
                                    <!-- 지식  -->
                                    <p class="required">
                                        {{ t('departmentMng.actionIndexKsa.form.constitutive') }}
                                    </p>
                                </th>
                                <td colspan="2" class="td_input border_right">
                                    <div class="input-group-base flex mb-2"
                                        v-for="(conItem, indexCon) in item.consciousness" :key="indexCon">
                                        <div class="dp_flex w-full al_center">
                                            <div class="mr-5 flex-10">
                                                <InputBase :type="'text'" :id="`consciousness_${indexCon}_${index}`"
                                                    required v-model="conItem.value" />
                                            </div>
                                            <div>
                                                <button v-if="indexCon == 0"
                                                    class="button btn_xs btn_medium_gray border_medium_gray bo_rd6 font_base_2"
                                                    @click="addKsa(index, 'consciousness')">
                                                    <!-- 추가 -->
                                                    {{ t('departmentMng.actionIndexKsa.form.addCell') }}</button>
                                                <button v-if="indexCon != 0"
                                                    class="button btn_xs btn_medium_gray border_medium_gray bo_rd6 font_base_2"
                                                    @click="delKsa(index, indexCon, 'consciousness')">
                                                    <!-- 삭제 -->
                                                    {{ t('departmentMng.actionIndexKsa.form.delCell') }}</button>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <!-- row 4 -->
                            <tr>
                                <th scope="row" class="border_right">
                                    <!-- 기술  -->
                                    <p class="required">
                                        {{ t('departmentMng.actionIndexKsa.form.technique') }}
                                    </p>
                                </th>
                                <td colspan="2" class="td_input border_right">

                                    <div class="input-group-base mb-2"
                                        v-for="(technItem, indexTechn) in item.technique" :key="indexTechn">
                                        <div class="dp_flex w-full al_center">
                                            <div class="mr-5 flex-10">
                                                <InputBase :type="'text'" :id="`technique_${indexTechn}_${index}`"
                                                    required v-model="technItem.value" />
                                            </div>
                                            <div>
                                                <button v-if="indexTechn == 0"
                                                    class="button btn_xs btn_medium_gray border_medium_gray bo_rd6 font_base_2"
                                                    @click="addKsa(index, 'technique')">
                                                    <!-- 추가 -->
                                                    {{ t('departmentMng.actionIndexKsa.form.addCell') }}</button>
                                                <button v-if="indexTechn != 0"
                                                    class="button btn_xs btn_medium_gray border_medium_gray bo_rd6 font_base_2"
                                                    @click="delKsa(index, indexTechn, 'technique')">
                                                    <!-- 삭제 -->
                                                    {{ t('departmentMng.actionIndexKsa.form.delCell') }}</button>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <!-- row 5 -->
                            <tr>
                                <th scope="row">
                                    <!-- 태도  -->
                                    <p class="required">
                                        {{ t('departmentMng.actionIndexKsa.form.attitude') }}
                                    </p>
                                </th>
                                <td colspan="2" class="td_input">

                                    <div class="input-group-base flex mb-2" v-for="(attItem, itemAtt) in item.attitude"
                                        :key="itemAtt">
                                        <div class="dp_flex w-full al_center">
                                            <div class="mr-5 flex-10">
                                                <InputBase :type="'text'" :id="`attitude_${itemAtt}_${index}`" required
                                                    v-model="attItem.value" />
                                            </div>
                                            <div class=" flex-[1]">
                                                <button v-if="itemAtt == 0"
                                                    class="button btn_xs btn_medium_gray border_medium_gray bo_rd6 font_base_2"
                                                    @click="addKsa(index, 'attitude')">
                                                    <!-- 추가 -->
                                                    {{ t('departmentMng.actionIndexKsa.form.addCell') }}</button>
                                                <button v-if="itemAtt != 0"
                                                    class="button btn_xs btn_medium_gray border_medium_gray bo_rd6 font_base_2"
                                                    @click="delKsa(index, itemAtt, 'attitude')">
                                                    <!-- 삭제 -->
                                                    {{ t('departmentMng.actionIndexKsa.form.delCell') }}</button>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="dp_flex mt-4">
                        <button type="button" v-if="index == 0" @click="addItem()" class="button btn_xs btn_blue ml-8">
                            <!-- 추가 -->
                            {{ t('departmentMng.actionIndexKsa.form.btnAdd') }}</button>
                        <button type="button" v-if="index != 0" @click="deleteItem(index)"
                            class="button btn_xs btn_gray ml-8">
                            <!-- 삭제 -->
                            {{ t('departmentMng.actionIndexKsa.form.btnDelete') }}</button>
                    </div>
                </div>

                <div class="box_section">
                    <div class="btn_area">
                        <button type="button" :disabled="store.check" class="button btn_xs btn_blue" @click="eventSave()">
                            <!-- 저장 -->
                            {{ t('departmentMng.actionIndexKsa.form.btnSave') }}
                        </button>
                        <button type="button" class="button btn_xs btn_white" @click="back()">
                            <!-- 목록 -->
                            {{ t('departmentMng.actionIndexKsa.form.btnBack') }}</button>
                    </div>
                </div>
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
} from '@/constants/screen.const'
import { SCREEN } from '@/router/screen';
import InputBase from '@/components/common/input/InputBase.vue';
import { useI18n } from 'vue-i18n';
import { update, detailById, checkDelete } from '@/stores/departmentService/actionIndexKsa/actionIndexKsa.service';
import type { ActionIndexKsaDetailDTO, ActionIndexKsaReqDTO } from '@/stores/departmentService/actionIndexKsa/actionIndexKsa.type'
import { MESSAGE_ERROR_API } from '@/constants/common.const';

export default {
    components: {
        Breadcrumb,
        InputBase
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
            modeScreen: '' as any,
            isOpen: false,
            isLoad: false,
            paginationPageSize: PAGINATION_PAGE_SIZE,
            paginationPageSizeSelector: PAGINATION_PAGE_SIZE_SELECTOR,
            listRadio1: [
                { id: '3', name: '사용' },
                { id: '4', name: '미사용' }
            ],
            dataForm: {
                elemId: "",
                universityMajor: "",
                dept: "",
                capacityMajor: "",
                lowerGrade: "",
                constitutiveFactor: "",
                actionIndexKsa: [
                    {
                        id: "",
                        actionDetail: "",
                        highPoint: "",
                        middlePoint: "",
                        lowPoint: "",
                        consciousness: [{ id: "", value: "" }],
                        technique: [{ id: "", value: "" }],
                        attitude: [{ id: "", value: "" }]
                    },
                ]
            } as ActionIndexKsaDetailDTO,
            id: '' as any,
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
            this.$router.push({ path: SCREEN.actionIndexKsa.path })
        },
        eventSave() {
            this.$swal({
                /* 저장하시겠어요? */
                text: this.t('departmentMng.actionIndexKsa.message.confirmCreate'),
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: '#DD6B55',
                confirmButtonText: this.t('common.save'),
                cancelButtonText: this.t('common.cancel'),
            })
                .then((result) => {
                    if (result.isConfirmed) {
                        this.updateAction();
                    }
                })
        },
        updateAction() {
            this.store.setLoading(true);
            let dataSave = {
                elemId: this.dataForm.elemId,
                actionIndexKsa: this.dataForm.actionIndexKsa
            } as ActionIndexKsaReqDTO;

            /* 정상처리됐습니다. */
            update(dataSave).then((res) => {
                this.$swal.fire({
                    text: this.t('departmentMng.actionIndexKsa.message.successCreate'),
                    confirmButtonColor: '#DD6B55',
                    confirmButtonText: this.t('common.confirm')
                }).then((res) => {
                    this.back();
                });
            }).catch((err) => {
                throw new Error(MESSAGE_ERROR_API);
            }).finally(() => {
                this.store.setLoading(false)
            })
        },
        goToDetail() {
            detailById(this.id).then(res => {
                this.dataForm = res.data.data;

                this.dataForm.actionIndexKsa = this.dataForm.actionIndexKsa.length == 0 ? [
                    {
                        id: "",
                        actionDetail: "",
                        highPoint: "",
                        middlePoint: "",
                        lowPoint: "",
                        consciousness: [{ id: "", value: "" }],
                        technique: [{ id: "", value: "" }],
                        attitude: [{ id: "", value: "" }]
                    },
                ] : this.dataForm.actionIndexKsa;
            });
        },
        addItem() {
            this.dataForm.actionIndexKsa.push(
                {
                    id: "",
                    actionDetail: "",
                    highPoint: "",
                    middlePoint: "",
                    lowPoint: "",
                    consciousness: [{ id: "", value: "" }],
                    technique: [{ id: "", value: "" }],
                    attitude: [{ id: "", value: "" }]
                })
        },
        eventDeleteItem(index: number) {
            if (index >= 0 && index < this.dataForm.actionIndexKsa.length) {
                this.$swal.fire({
                    text: this.t('departmentMng.actionIndexKsa.message.deleteSuccess'),
                    confirmButtonColor: '#DD6B55',
                    confirmButtonText: this.t('common.confirm')
                }).then(() => {
                    this.dataForm.actionIndexKsa.splice(index, 1);
                })
            }
        },
        deleteItem(index: number) {
            this.$swal({
                text: this.t('departmentMng.actionIndexKsa.message.confirmDelete'),
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: '#DD6B55',
                confirmButtonText: this.t('common.save'),
                cancelButtonText: this.t('common.cancel'),
            })
                .then((result) => {
                    if (result.isConfirmed) {
                        this.store.setLoading(true);
                        if (this.dataForm.actionIndexKsa[index] && this.dataForm.actionIndexKsa[index].id !== "") {
                            checkDelete(this.dataForm.actionIndexKsa[index].id).then((res) => {
                                if (res.data.data) {
                                    this.eventDeleteItem(index);
                                } else {
                                    this.$swal.fire({
                                        text: this.t('departmentMng.actionIndexKsa.message.errorDelete'),
                                        confirmButtonColor: '#DD6B55',
                                        confirmButtonText: this.t('common.confirm')
                                    })
                                }
                            })
                        } else {
                            this.eventDeleteItem(index);
                        }
                        this.store.setLoading(false)
                    }
                })
        },
        addKsa(indexParent: number, type: string) {
            this.dataForm.actionIndexKsa[indexParent][type].push({ id: "", value: "" });
        },
        eventDeleteKsa(indexParent: number, indexCon: number, type: string) {
            this.$swal.fire({
                text: this.t('departmentMng.actionIndexKsa.message.deleteSuccess'),
                confirmButtonColor: '#DD6B55',
                confirmButtonText: this.t('common.confirm')
            }).then(() => {
                this.dataForm.actionIndexKsa[indexParent][type].splice(indexCon, 1);
            })
        },
        delKsa(indexParent: number, indexCon: number, type: string) {
            this.$swal({
                text: this.t('departmentMng.actionIndexKsa.message.confirmDelete'),
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: '#DD6B55',
                confirmButtonText: this.t('common.save'),
                cancelButtonText: this.t('common.cancel'),
            })
                .then((result) => {
                    if (result.isConfirmed) {
                        this.store.setLoading(true);
                        if (this.dataForm.actionIndexKsa[indexParent][type][indexCon] && this.dataForm.actionIndexKsa[indexParent][type][indexCon].id !== "") {
                            checkDelete(this.dataForm.actionIndexKsa[indexParent][type][indexCon].id).then((res) => {
                                if (res.data.data) {
                                    this.eventDeleteKsa(indexParent, indexCon, type);
                                } else {
                                    this.$swal.fire({
                                        text: this.t('departmentMng.actionIndexKsa.message.errorDelete'),
                                        confirmButtonColor: '#DD6B55',
                                        confirmButtonText: this.t('common.confirm')
                                    })
                                }
                            })
                        } else {
                            this.eventDeleteKsa(indexParent, indexCon, type);
                        }
                        this.store.setLoading(false)
                    }
                })
        },
    }
}
</script>
<style>
    .justify-between {
        justify-content: space-between;
    }
    .flex-10 {
        flex: 10;
    }
    .border_right {
        border-right: 1px solid var(--light-blue-gray);
    }
</style>