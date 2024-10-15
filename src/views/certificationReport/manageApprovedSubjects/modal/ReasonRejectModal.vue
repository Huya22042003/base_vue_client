<template>
    <TModal :is-open="isOpen" :is-show-header="true" :is-show-footer="true" :modal-id="'modal_form'"
        @close-modal="onClose">

        <template #title>
            <strong>{{ t("06.manageApprovedSubjects.popUp.title") }}</strong>
        </template>
        <template #default>
            <div class="box_section">
                <table class="tbl_row">
                    <colgroup>
                        <col style="width: 18%" />
                        <col style="width: auto" />
                    </colgroup>
                    <tbody>
                        <tr>
                            <th scope="row">
                                {{ t("06.manageApprovedSubjects.popUp.nameOfApprover") }}
                            </th>
                            <td class="td_input">
                                {{ dataDetail.approveName }}
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">
                                {{ t("06.manageApprovedSubjects.popUp.approverAffiliation") }}
                            </th>
                            <td>
                                {{ dataDetail.department }}
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">
                                {{ t("06.manageApprovedSubjects.popUp.reasonForRejection") }}
                            </th>
                            <td class="td_input">
                                {{ dataDetail.reason }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </template>
        <template #footer>
            <button type="button" class="button btn_md btn_black" @click="onClose()">
                {{ t("06.manageApprovedSubjects.popUp.confirm") }}
            </button>
        </template>
    </TModal>
</template>

<script lang="ts">
import { useI18n } from "vue-i18n";
import { commonStore } from '@/stores/common';
import { getReasonReject } from '@/stores/manageApprovedSubjects/manageApprovedSubjects.service';
import { getReasonRejectStaff } from '@/stores/approvedSubjectsStaff/approvedSubjectsStaff.service';
import {
    MESSAGE_ERROR_API,
} from '@/constants/common.const';
import { getUserInfo } from "@/utils/storage";
import { ROLE_ADMIN, ROLE_STAFF } from "@/constants/common.const";

export default {
    components: {
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
    },
    setup() {
        const { t } = useI18n();
        const store = commonStore();
        return {
            t,
            store
        };
    },
    data() {
        return {
            dataDetail: {
                id: "",
                approveName: "",
                department: "",
                reason: "",
            },
        }
    },
    beforeMount() {
        if (this.idDetail) {
            this.reasonReject();
        }
    },
    methods: {
        reasonReject() {
            this.store.setLoading(true);
            const userInfo = JSON.parse(getUserInfo());

            if (userInfo?.userDiv === ROLE_ADMIN) {
                getReasonReject({ reportId: this.idDetail }).then((res: any) => {
                    this.dataDetail = res.data.data
                }).catch(() => {
                    throw new Error(MESSAGE_ERROR_API);
                }).finally(() => {
                    this.store.setLoading(false);
                });
            } else {
                getReasonRejectStaff(this.idDetail).then((res: any) => {
                    this.dataDetail = res.data.data
                }).catch(() => {
                    throw new Error(MESSAGE_ERROR_API);
                }).finally(() => {
                    this.store.setLoading(false);
                });
            }
        }
    }
}
</script>

<style scoped>
/* Your styles here */
</style>