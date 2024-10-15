<template>
    <section id="content" class="content_wrapper grid_content" tabindex="0">
        <Breadcrumb :pageTitle="pageTitle" :breadcrumbItems="breadcrumbItems"></Breadcrumb>

        <div class="box dp_block">
            <div class="box_section">
                <p class="box_title_sm">
                    <!-- 학과 및 전공능력 정보 -->
                    {{ t('departmentMng.consititutiveMajor.form.title') }}
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
                                {{ t('departmentMng.consititutiveMajor.form.universityMajor') }}
                            </th>
                            <td class="td_input">
                                <InputBase v-model="dataForm.major" id="input_major" readonly />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">
                                <!-- 학과 -->
                                {{ t('departmentMng.consititutiveMajor.form.dept') }}
                            </th>
                            <td>
                                <InputBase v-model="dataForm.dept" id="input_deptment" readonly />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">
                                <!-- 전공능력 -->
                                {{ t('departmentMng.consititutiveMajor.form.capactityMajor') }}
                            </th>
                            <td class="td_input">
                                <InputBase v-model="dataForm.majorCapa" id="input_talent" readonly />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">
                                <!-- 하위능력 -->
                                {{ t('departmentMng.consititutiveMajor.form.lowerGrade') }}
                            </th>
                            <td>
                                <InputBase v-model="dataForm.chldCapaNm" id="input_talentDefine" readonly />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="box dp_block">
            <div class="box_section">

                <p class="box_title_sm">
                    <!-- 구성요소 관리 -->
                    {{ t('departmentMng.consititutiveMajor.form.title02') }}
                </p>

                <div class="dp_flex mb-10" v-for="(item, index) in dataForm.majorCapaElem" :key="index">
                    <table class="tbl_row">
                        <colgroup>
                            <col style="width: 18%;">
                            <col style="width: auto;">
                        </colgroup>
                        <tbody>
                            <tr>
                                <th scope="row">
                                    <!-- 구성요소  -->
                                    <p class="required">
                                        {{ t('departmentMng.consititutiveMajor.form.constitutive') }}{{ index + 1 }}
                                    </p>
                                </th>
                                <td class="td_input">
                                    <InputBase v-model="item.name" :id="`constitutive_${index}`" required />
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    <p class="required">
                                        <!-- 사용여부 -->
                                        {{ t('departmentMng.consititutiveMajor.form.isActive') }}
                                    </p>
                                </th>
                                <td>
                                    <RadiobuttonBase v-for="itemRadio in listStatus" :mode="'show'" :value="itemRadio.cdId" v-model="item.useYn"
                                                    :id="itemRadio.cdId + 'itemIsActive' + index" :name="itemRadio.cdId + 'itemIsActive' + index" :key="itemRadio.cdId + 'itemIsActive' + index" :checked="itemRadio.cdId == item.useYn"
                                                    :label="itemRadio.cdNm">
                                    </RadiobuttonBase>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="dp_flex al_center">
                        <button type="button" v-if="index == 0" @click="addJob()"
                            class="button btn_xs btn_blue wd_65">
                            <!-- 추가 -->
                            {{ t('departmentMng.consititutiveMajor.form.btnAdd') }}
                        </button>
                        <button type="button" v-if="index != 0" @click="eventDelete(index)"
                            class="button btn_xs btn_gray wd_65">
                            <!-- 삭제 -->
                            {{ t('departmentMng.consititutiveMajor.form.btnDelete') }}
                        </button>
                    </div>
                </div>

                <div class="box_section">
                    <div class="btn_area">
                        <button type="button" class="button btn_xs btn_blue" @click="eventSave()">
                            <!-- 저장 -->
                            {{ t('departmentMng.consititutiveMajor.form.btnSave') }}
                        </button>
                        <button type="button" class="button btn_xs btn_white" @click="back()">
                            <!-- 목록 -->
                            {{ t('departmentMng.consititutiveMajor.form.btnBack') }}
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
import { useI18n } from 'vue-i18n';
import type {
    ChldCapaDetailDTO,
    MajorCapaElemAddDTO
} from "@/stores/departmentService/consititutiveMajor/consititutiveMajor.type";
import type {
    CodeMngModel
} from "@/stores/common/codeMng/codeMng.type";
import {
    getListCodeMng
} from "@/stores/common/codeMng/codeMng.service";
import { MESSAGE_ERROR_API, STATUS_YES, UP_CD_ID_USE_YN } from '@/constants/common.const'
import {
    detailById,
    update,
    checkDelete
} from "@/stores/departmentService/consititutiveMajor/consititutiveMajor.service";

export default {
    components: {
        Breadcrumb,
        InputBase
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
            modeScreen: '' as any,
            isOpen: false,
            isLoad: false,
            listStatus: [] as CodeMngModel[],
            dataForm: {
                chldCapaId: "",
                chldCapaNm: "",
                dept: "",
                major: "",
                majorCapaId: "",
                majorCapa: "",
                majorCapaElem: [] as MajorCapaElemAddDTO[]
            } as ChldCapaDetailDTO,
            id: ""
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
        getListCodeMng({ upCdIdList: [UP_CD_ID_USE_YN] }).then(res => {
            this.listStatus = res.data.data;
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
            this.$router.push({ path: SCREEN.consititutiveMajorDept.path })
        },
        addJob() {
            this.dataForm.majorCapaElem.push(
                {
                    id: "",
                    name: "",
                    useYn: STATUS_YES
                })
        },
        eventDelete(index: number) {
            this.$swal({
                /* 직무를 삭제하시겠어요? */
                text: this.t('departmentMng.consititutiveMajor.message.confirmDelete'),
                showCancelButton: true,
                confirmButtonColor: '#DD6B55',
                confirmButtonText: this.t('common.save'),
                cancelButtonText: this.t('common.cancel'),
            })
                .then((result) => {
                    if (result.isConfirmed) {
                        if (index >= 0 && index < this.dataForm.majorCapaElem.length) {
                            // select job
                            if (this.dataForm.majorCapaElem[index].id && this.dataForm.majorCapaElem[index].id.trim().length != 0) {
                                this.store.setLoading(true);  
                                checkDelete(this.dataForm.majorCapaElem[index].id).then((res) => {
                                    if (res.data.data) {
                                        this.deleteJob(index);
                                    } else {
                                        this.$swal.fire({
                                            /* 활용된 직무는 삭제할 수 없습니다. */
                                            text: this.t('departmentMng.consititutiveMajor.message.deleteError'),
                                            confirmButtonColor: '#DD6B55',
                                            confirmButtonText: this.t('common.confirm')
                                        });
                                    }
                                }).finally(() => {
                                    this.store.setLoading(false);
                                })
                            } else {
                                this.deleteJob(index);
                            }

                        }
                    }
                })
        },
        deleteJob(index: number) {
            this.$swal.fire({
                /* 삭제됐습니다. */
                text: this.t('departmentMng.consititutiveMajor.message.deleteSuccess'),
                confirmButtonColor: '#DD6B55',
                confirmButtonText: this.t('common.confirm')
            }).then((res) => {
                this.dataForm.majorCapaElem.splice(index, 1);
            });
        },
        eventSave() {
            if (this.store.check) {
                this.$swal.fire({
                    text: this.t('common.messageValidateRequired'),
                    confirmButtonColor: '#DD6B55',
                    confirmButtonText: this.t('common.confirm')
                })
                return;
            }
            this.$swal({
                /* 저장하시겠어요? */
                text: this.t('departmentMng.consititutiveMajor.message.confirmSave'),
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
            update(this.dataForm).then((res) => {
                this.$swal.fire({
                    /* 정상처리됐습니다. */
                    text: this.t('departmentMng.consititutiveMajor.message.saveSuccess'),
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
                this.dataForm.majorCapaElem = this.dataForm.majorCapaElem.length == 0 ? [
                    {
                        id: "",
                        name: "",
                        useYn: STATUS_YES
                    },
                ] : this.dataForm.majorCapaElem;

            }).catch(() => {
                throw new Error(MESSAGE_ERROR_API);
            }).finally(() => {
                this.store.setLoading(false);
            });
        },
    }
}
</script>

<style scoped lang="scss"></style>