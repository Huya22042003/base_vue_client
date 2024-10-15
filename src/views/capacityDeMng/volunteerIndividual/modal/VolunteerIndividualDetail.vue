<template>
    <TModal :is-open="isOpen" :is-show-header="true" :is-show-footer="true" :modal-id="'modal_form'"
        @close-modal="onClose">
        <!-- Modal content goes here -->
        <template #title>
            <strong>{{ t("capacityDeMng.volunteerIndividual.modal.title") }}<!-- 개인참여 사회봉사 승인 신청 --></strong>
        </template>
        <template #default>
            <table class="tbl_row">
                <colgroup>
                    <col style="width: 25%" />
                </colgroup>
                <tbody>
                    <tr>
                        <th scope="row">{{ t("capacityDeMng.volunteerIndividual.modal.status") }}<!-- 상태 --></th>
                        <td>{{ dataDetail.status }}</td>
                    </tr>
                    <tr>
                        <th scope="row">{{ t("capacityDeMng.volunteerIndividual.modal.major") }}<!-- 단과대학 --></th>
                        <td>{{ dataDetail.major }}</td>
                    </tr>
                    <tr>
                        <th scope="row">{{ t("capacityDeMng.volunteerIndividual.modal.department") }}<!-- 학과 --></th>
                        <td>{{ dataDetail.dept }}</td>
                    </tr>
                    <tr>
                        <th scope="row">{{ t("capacityDeMng.volunteerIndividual.modal.code") }}<!-- 학번 --></th>
                        <td>{{ dataDetail.code }}</td>
                    </tr>
                    <tr>
                        <th scope="row">{{ t("capacityDeMng.volunteerIndividual.modal.name") }}<!-- 이름 --></th>
                        <td>{{ dataDetail.name }}</td>
                    </tr>
                    <tr>
                        <th scope="row">{{ t("capacityDeMng.volunteerIndividual.modal.eduYear") }}<!-- 학년 --></th>
                        <td>{{ dataDetail.grade }}</td>
                    </tr>
                    <tr>
                        <th scope="row">{{ t("capacityDeMng.volunteerIndividual.modal.typeOfVolunteer") }}<!-- 봉사 유형 -->
                        </th>
                        <td>
                            <RadiobuttonBase v-for="(item, index) in listType" :isDisable="true" :value="item.cdId"
                                v-model="dataDetail.type" :id="`${item.cdId}_${index}`" :name="`${item.cdId}_${index}`"
                                :key="`${item.cdId}_${index}`" :checked="item.cdId == dataDetail.type"
                                :label="item.cdNm">
                            </RadiobuttonBase>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">{{ t("capacityDeMng.volunteerIndividual.modal.nameVolunteer") }}<!-- 사회봉사명 -->
                        </th>
                        <td>{{ dataDetail.topic }}</td>
                    </tr>
                    <tr>
                        <th scope="row">{{ t("capacityDeMng.volunteerIndividual.modal.volunteerDate") }}<!-- 봉사 시간 -->
                        </th>
                        <td>
                            <div class="flex items-center !w-[450px]">
                                {{ dataDetail.startDate }}
                                <span class="mx-2"> ~ </span>
                                {{ dataDetail.endDate }}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">{{ t("capacityDeMng.volunteerIndividual.modal.volunteerTime") }}<!-- 봉사 기관 -->
                        </th>
                        <td>{{ dataDetail.recoTime }}</td>
                    </tr>
                    <tr>
                        <th scope="row">{{ t("capacityDeMng.volunteerIndividual.modal.document") }}<!-- 증빙자료 --></th>
                        <td>
                            <InputFileBase :referKey="idDetail" :mode="'detail'" id="imageFile" name="imageFile"
                                ref="imageRef" :orgName="'SOCIAL_SERVE_PAR'" :category="'SOCIAL_SERVE_PAR'"
                                :sectionName="'office'"></InputFileBase>
                        </td>
                    </tr>
                </tbody>
            </table>
        </template>
        <template #footer>
            <button type="button" v-if="status == STATUS_SOCIAL_REVIEW" class="button btn_md btn_white popup_close" @click="approveData()">
                승인
            </button>
            <button type="button" v-if="status == STATUS_SOCIAL_REVIEW" class="button btn_md btn_white popup_close" @click="rejectData()">
                반려
            </button>
            <button type="button" class="button btn_md btn_black" @click="onClose()">닫기
            </button>
        </template>
    </TModal>
</template>

<script lang="ts">
import InputGroupBase from '../../../../components/common/input/InputGroupBase.vue';
import { commonStore } from '@/stores/common'
import type { CodeMngModel } from "@/stores/common/codeMng/codeMng.type";
import { getListCodeMng } from "@/stores/common/codeMng/codeMng.service";
import {
    SOCIAL_TYPE_UP_CD_ID,
    STATUS_SOCIAL_REVIEW,
    STATUS_SOCIAL_APPROVE,
    STATUS_SOCIAL_REJECT
} from "@/constants/common.const";
import {
    getDetailIndividual,
    approveSocialIndividual,
    rejectSocialIndividual
} from "@/stores/capacityDeMng/socialServe/volunteerActivities/volunteerActivities.service";
import {format} from 'date-fns';
import {
  FORMAT_YYY_MM_DD,
} from "@/constants/screen.const";

export default {
    name: "ModalForm",
    components: {
        InputGroupBase
    },
    props: {
        isOpen: {
            type: Boolean,
            required: true
        },
        onClose: {
            type: Function,
            required: true
        },
        idDetail: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        },
    },
    setup: () => {
        const store = commonStore();
        const { t } = useI18n();
        return {
            t, store,
            STATUS_SOCIAL_REVIEW,
            STATUS_SOCIAL_APPROVE,
            STATUS_SOCIAL_REJECT
        };
    },
    data() {
        return {
            listType: [] as CodeMngModel[],
            dataDetail: {
                status: "",
                major: "",
                dept: "",
                code: "",
                name: "",
                grade: "",
                type: "",
                topic: "",
                startDate: "",
                endDate: "",
                recoTime: ""
            },
        }
    },
    beforeMount() {
        this.getData();
    },
    methods: {
        async getData() {
            this.store.setLoading(true);
            await getListCodeMng({
                upCdIdList: [
                    SOCIAL_TYPE_UP_CD_ID,
                ],
            })
                .then((res) => {
                    this.listType = res.data.data.filter(
                        (el: CodeMngModel) => el.upCdId == SOCIAL_TYPE_UP_CD_ID
                    );
                })
                .finally(() => {
                    this.store.setLoading(false);
                });

            if (this.idDetail) {
                await this.goToDetail();
            }
        },
        goToDetail() {
            this.store.setLoading(true);
            getDetailIndividual(this.idDetail)
                .then((res) => {
                    this.dataDetail = res.data.data;
                    this.dataDetail.startDate = this.dataDetail.startDate ? format(this.dataDetail.startDate, FORMAT_YYY_MM_DD) : ""
                    this.dataDetail.endDate = this.dataDetail.endDate ? format(this.dataDetail.endDate, FORMAT_YYY_MM_DD) : ""
                })
                .finally(() => {
                    this.store.setLoading(false);
                });
        },
        confirmApprove() {
            this.$swal({
                /* 저장하시겠어요? */
                text: this.t("capacityDeMng.volunteerIndividual.modal.approveConfirm"),
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: this.t("common.save"),
                cancelButtonText: this.t("common.cancel"),
            }).then((result) => {
                if (result.isConfirmed) {
                    this.approveData();
                }
            });
        },
        confirmReject() {
            this.$swal({
                /* 저장하시겠어요? */
                text: this.t("capacityDeMng.volunteerIndividual.modal.rejectConfirm"),
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: this.t("common.save"),
                cancelButtonText: this.t("common.cancel"),
            }).then((result) => {
                if (result.isConfirmed) {
                    this.rejectData();
                }
            });
        },
        approveData() {
            this.store.setLoading(true);
            approveSocialIndividual(this.idDetail)
                .then((res) => {
                    this.dataDetail = res.data.data;
                })
                .finally(() => {
                    this.store.setLoading(false);
                    this.$swal
                        .fire({
                            text: this.t(
                                "capacityDeMng.volunteerIndividual.modal.approveSuccess"
                            ),
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: this.t("common.confirm"),
                        })
                        .then((res) => {
                            this.onClose();
                        });
                });
        },
        rejectData() {
            this.store.setLoading(true);
            rejectSocialIndividual(this.idDetail)
                .then((res) => {
                    this.dataDetail = res.data.data;
                })
                .finally(() => {
                    this.store.setLoading(false);
                    this.$swal
                        .fire({
                            text: this.t(
                                "capacityDeMng.volunteerIndividual.modal.rejectSuccess"
                            ),
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: this.t("common.confirm"),
                        })
                        .then((res) => {
                            this.onClose();
                        });
                });
        }

    },
}
</script>

<style scoped>
/* Your styles here */
</style>