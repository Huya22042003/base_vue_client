<template>
  <div class="box_section">
    <table class="tbl_row">
      <colgroup>
        <col style="width: 20%" />
        <col style="width: 10%" />
        <col style="width: auto" />
      </colgroup>
      <tbody class="tbl_boder">
        <tr>
          <th scope="row">
            {{ t("capacityDeMng.tutoring.detail.tab2.team") }} <!-- 팀 소개 -->
          </th>
          <td colspan="2">{{ dataForm.teamIntro }}</td>
        </tr>
        <tr>
          <th scope="row">
            {{ t("capacityDeMng.tutoring.detail.tab2.subjectName") }} <!-- 학습교과목명 -->
          </th>
          <td colspan="2">{{ dataForm.subjectNm }}</td>
        </tr>
        <tr>
          <th scope="row">
            {{ t("capacityDeMng.tutoring.detail.tab2.target") }} <!-- 활동 주체 및 학습목표 -->
          </th>
          <td colspan="2">{{ dataForm.topic }}</td>
        </tr>
        <tr v-if="dataForm.actPlanEdu">
          <th scope="row" :rowspan="dataForm.actPlanEdu.length + 1">
            <p>{{ t("capacityDeMng.tutoring.detail.tab2.plan") }}</p> <!-- 주차별 활동계획 -->
          </th>
          <th>
            {{ t("capacityDeMng.tutoring.detail.tab2.week") }} <!-- 주차 -->
          </th>
          <th>
            {{ t("capacityDeMng.tutoring.detail.tab2.content") }} <!-- 내용 -->
          </th>
        </tr>
        <tr v-for="item in dataForm.actPlanEdu">
          <td>
            {{ `${item.week}${t("capacityDeMng.tutoring.detail.tab2.week")}` }} <!-- 1주차 -->
          </td>
          <td>{{ item.cont }}</td>
        </tr>
        <tr>
          <th scope="row">
            {{ t("capacityDeMng.tutoring.detail.tab2.topic") }} <!-- 추가 활동 주체 및 학습 목표 -->
          </th>
          <td colspan="2">{{ dataForm.topic }}</td>
        </tr>
        <tr>
          <th scope="row">
            {{ t("capacityDeMng.tutoring.detail.tab2.method") }} <!-- 학습방법 -->
          </th>
          <td colspan="2">{{ dataForm.methodEdu }}</td>
        </tr>
        <tr>
          <th scope="row">
            {{ t("capacityDeMng.tutoring.detail.tab2.document") }} <!-- 참고도서 -->
          </th>
          <td colspan="2">{{ dataForm.documentEdu }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script lang="ts">
import { useI18n } from "vue-i18n";
import { defineComponent } from "vue";
import {
  getPlanInfo
} from '@/stores/capacityDeMng/mentoring/tutoring/tutoring.service'
import { commonStore } from "@/stores/common";
import type {
  ActPlanResDTO
} from '@/stores/capacityDeMng/mentoring/mentoring.type'

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
      dataForm: {} as ActPlanResDTO
    }
  },
  beforeMount() {
    this.getPlanData();
  },
  methods: {
    getPlanData() {
      this.store.setLoading(true)
      getPlanInfo(this.idDetail).then(res => {
        this.dataForm = res.data.data;
      }).finally(() => {
        this.store.setLoading(false)
      }) 
    }
  },
});
</script>
<style lang="scss" scoped>
.tbl_boder th,
.tbl_boder td {
  border: 1px solid var(--light-blue-gray);
}
</style>
