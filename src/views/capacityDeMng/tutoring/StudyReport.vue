<template>
    <div class="box_section" v-if="dataForm.length != 0">
        <div v-for="(item, index) in dataForm" class="mb-10">
            <CollapseBase :mode="'custom'" :key="index" :isShow="item.openCollapse" :title="`${(index + 1)} ${reportTitle}`"
                :isCheck="item.isCheck" :onClick="() => { item.openCollapse = !item.openCollapse }">
                <div class="box_section">

                    <table class="tbl_row mt-5 mb-5">
                        <colgroup>
                            <col style="width: 20%" />
                            <col style="width: auto" />
                        </colgroup>
                        <tbody class="tbl_boder">
                            <tr>
                                <th scope="row">
                                    {{ t("capacityDeMng.tutoring.detail.tab3.subject") }} <!-- 교과목 -->
                                </th>
                                <td>{{ item.subject }}</td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    {{ t("capacityDeMng.tutoring.detail.tab3.target") }} <!-- 이번 주 학습목표 -->
                                </th>
                                <td>{{ item.target }}</td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    {{ t("capacityDeMng.tutoring.detail.tab3.eduDate") }} <!-- 학습일자 -->
                                </th>
                                <td>{{ item.eduDate }}</td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    {{ t("capacityDeMng.tutoring.detail.tab3.eduTime") }} <!-- 학습시간 -->
                                </th>
                                <td>{{ item.eduTime }}</td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    {{ t("capacityDeMng.tutoring.detail.tab3.eduAddress") }} <!-- 학습장소 -->
                                </th>
                                <td>{{ item.eduAddress }}</td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    {{ t("capacityDeMng.tutoring.detail.tab3.eduContent") }} <!-- 학습활동 진행내용 -->
                                </th>
                                <td>{{ item.eduContent }}</td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    {{ t("capacityDeMng.tutoring.detail.tab3.eduShare") }} <!-- 느낀점 · 배운점 감사 나누기 -->
                                </th>
                                <td>{{ item.eduShare }}</td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    {{ t("capacityDeMng.tutoring.detail.tab3.planWeekLast") }} <!-- 다음 주 활동 계획 -->
                                </th>
                                <td>{{ item.planWeekLast }}</td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    {{ t("capacityDeMng.tutoring.detail.tab3.eduImg") }} <!-- 학습수행 증거 사진 -->
                                </th>
                                <td>
                                    <InputFileBase :referKey="item.id" :mode="modefile" id="imageFile" name="imageFile"
                                        :type="fileTypeImg" v-model="fileImage" ref="imageRef" :orgName="`MENTORING_REPORT`"
                                        :category="`MENTORING_REPORT`" :sectionName="`MENTORING_REPORT`" previewFlag="true" />
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="box_section" v-if="item.isCheck">
                        <div class="btn_group btn_end">
                            <button type="button" class="button btn_xs btn_blue btn_responsive">
                                {{ t("capacityDeMng.tutoring.detail.button.print") }} <!-- 인쇄 -->
                            </button>
                        </div>
                    </div>
                </div>
            </CollapseBase>
        </div>
    </div>
</template>
<script lang="ts">
import { useI18n } from "vue-i18n";
import { defineComponent } from "vue";
import {
    getListReport
} from '@/stores/capacityDeMng/mentoring/tutoring/tutoring.service'
import type {
    AtcReportResDTO,
    ActPlanDetailResDTO
} from '@/stores/capacityDeMng/mentoring/mentoring.type'
import { commonStore } from "@/stores/common";
import { format } from 'date-fns';
import {
    FORMAT_YYY_MM_DD,
    MODE_DETAIL,
    ACCEPTTYPE_OFICE_AND_IMG
} from '@/constants/screen.const'

export default defineComponent({
    props: {
        idDetail: {
            type: String,
            required: true
        },
    },
    setup: () => {
        const { t } = useI18n();
        const store = commonStore();
        return { t, store };
    },
    data() {
        return {
            reportTitle: this.t("capacityDeMng.tutoring.detail.tab3.reportTitle") /* 주차 학습보고서 */,
            dataForm: [],
            modefile: MODE_DETAIL,
            fileImage: [],
            fileTypeImg: ACCEPTTYPE_OFICE_AND_IMG
        }
    },
    beforeMount() {
        this.getListData();
    },
    methods: {
        onClickCollapse(index: number) {
            this.dataForm[index].openCollapse = !this.dataForm[index].openCollapse
        },
        getListData() {
            this.store.setLoading(true)
            getListReport(this.idDetail).then(res => {
                this.dataForm = this.convertData(res.data.data);
            }).finally(() => {
                this.store.setLoading(false)
            })
        },
        convertData(data:AtcReportResDTO) {
            const reportList = data.report;
            const planList = data.plan;

            const plan = window.history.state.plan;
            
            const dataForm = planList.map((planItem:ActPlanDetailResDTO, index:number) => {
                let filterData = reportList.filter(report => report.planSeq == planItem.id);
                if (filterData.length == 0) {
                    return {
                        openCollapse: index + 1 == (plan ? plan : 1),
                        isCheck: false
                    };
                } else {
                    return {
                        id: filterData[0].id,
                        openCollapse: index + 1 == (plan ? plan : 1),
                        isCheck: true,
                        subject: filterData[0].subjectMn,
                        target: filterData[0].target,
                        eduDate: filterData[0].eduDate ? format(filterData[0].eduDate, FORMAT_YYY_MM_DD) : '',
                        eduTime: `${filterData[0].eduStart ? this.convertTime(filterData[0].eduStart) : ""} - ${filterData[0].eduEnd ? this.convertTime(filterData[0].eduEnd) : ""}`,
                        eduAddress: filterData[0].eduAddress,
                        eduContent: filterData[0].cont,
                        eduShare: filterData[0].share,
                        planWeekLast: filterData[0].planNextWeek,
                    };
                }
            })

            return dataForm;
        },
        convertTime(time:String) {
            if (time && time.length !== 4) {
                return ``
            }
            const hours = time.slice(0, 2);
            const minutes = time.slice(2);
            return `${hours}:${minutes}`;
        }
    },
});
</script>
