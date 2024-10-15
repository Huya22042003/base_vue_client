<template>
  <div class="page_wrapper">
    <!-- Team information -->
    <div class="box_section">
      <p class="box_title_sm">
        {{ t("capacityDeMng.tutoring.detail.table.table1.name") }} <!-- 팀정보 -->
      </p>
      <table class="tbl_row">
        <colgroup>
          <col style="width: 15%" />
          <col style="width: 35%" />
          <col style="width: 15%" />
          <col style="width: 35%" />
        </colgroup>
        <tbody>
          <tr>
            <th scope="row">
              {{ t("capacityDeMng.tutoring.detail.table.table1.team") }} <!-- 팀명 -->
            </th>
            <td>{{ dataForm.teamNm }}</td>
            <th scope="row">
              {{ t("capacityDeMng.tutoring.detail.table.table1.campus") }} <!-- 해운대 -->
            </th>
            <td>{{ dataForm.campus }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Mentor information -->
    <div class="box_section">
      <p class="box_title_sm">
        {{ t("capacityDeMng.tutoring.detail.table.table2.name") }} <!-- 멘토 인적사항 -->
      </p>
      <table class="tbl_row">
        <colgroup>
          <col style="width: 15%" />
          <col style="width: 35%" />
          <col style="width: 15%" />
          <col style="width: 35%" />
        </colgroup>
        <tbody>
          <tr>
            <th scope="row">
              {{ t("capacityDeMng.tutoring.detail.table.table2.nameMentor") }} <!-- 멘토이름 -->
            </th>
            <td>{{ dataForm.mentor.name }}</td>
            <th scope="row">
              {{ t("capacityDeMng.tutoring.detail.table.table2.idStudent") }} <!-- 학번 -->
            </th>
            <td>{{ dataForm.mentor.code }}</td>
          </tr>
          <tr>
            <th scope="row">
              {{ t("capacityDeMng.tutoring.detail.table.table2.gpa") }}<!-- 직전학기 평균평점 -->
            </th>
            <td>{{ dataForm.mentor.scoreMedium }}</td>
            <th scope="row">
              {{ t("capacityDeMng.tutoring.detail.table.table2.eduYear") }} <!-- 학년 -->
            </th>
            <td>{{ dataForm.mentor.yearEdu }}</td>
          </tr>
          <tr>
            <th scope="row">
              {{ t("capacityDeMng.tutoring.detail.table.table2.major") }} <!-- 소속 단과대학 -->
            </th>
            <td>{{ dataForm.mentor.major }}</td>
            <th scope="row">
              {{ t("capacityDeMng.tutoring.detail.table.table2.department") }} <!-- 소속 학과 -->
            </th>
            <td>{{ dataForm.mentor.department }}</td>
          </tr>
          <tr>
            <th scope="row">
              {{ t("capacityDeMng.tutoring.detail.table.table2.phone") }} <!-- 연락처(휴대폰) -->
            </th>
            <td>{{ dataForm.mentor.phone }}</td>
            <th scope="row">
              {{ t("capacityDeMng.tutoring.detail.table.table2.receiver") }} <!-- 예금주 -->
            </th>
            <td>{{ dataForm.mentor.receiver }}</td>
          </tr>
          <tr>
            <th scope="row">
              {{ t("capacityDeMng.tutoring.detail.table.table2.bankName") }} <!-- 은행명 -->
            </th>
            <td>{{ dataForm.mentor.bankNm }}</td>
            <th scope="row">
              {{ t("capacityDeMng.tutoring.detail.table.table2.bankNumber") }} <!-- 계좌번호 -->
            </th>
            <td>{{ dataForm.mentor.bankCode }}</td>
          </tr>
          <tr>
            <th scope="row">
              {{ t("capacityDeMng.tutoring.detail.table.table2.studyProgram") }} <!-- 직적학기 교수학습 프로그램 참여 여부 -->
            </th>
            <td>{{ dataForm.mentor.isStudy }}</td>
            <th scope="row">
              {{ t("capacityDeMng.tutoring.detail.table.table2.programName") }} <!-- 참여한 프로그램명 -->
            </th>
            <td>{{ dataForm.mentor.studyNm }}</td>
          </tr>
          <tr>
            <th scope="row">
              {{ t("capacityDeMng.tutoring.detail.table.table2.attachBank") }} <!-- 통장사본 첨부 -->
            </th>
            <td>{{ dataForm.mentor.bankNm }}</td>
            <th scope="row">
              {{ t("capacityDeMng.tutoring.detail.table.table2.achievement") }} <!-- 성적표 첨부 -->
            </th>
            <td>{{ dataForm.mentor.bankCode }}</td>
          </tr>
          <tr>
            <th scope="row">
              {{ t("capacityDeMng.tutoring.detail.table.table3.attachBank") }} <!-- 통장사본 첨부 -->
            </th>
            <td>
              <InputFileBase v-if="dataForm.mentor.id" :referKey="dataForm.mentor.id" :mode="modefile" id="imageFile" name="imageFile"
                :type="fileTypeImg" v-model="fileImage" ref="imageRef" :orgName="`MENTORING_BANK_${idDetail}`"
                :category="`MENTORING_BANK_${idDetail}`" :sectionName="`MENTORING_BANK_${idDetail}`" previewFlag="true" />
              </td>
            <th scope="row">
              {{ t("capacityDeMng.tutoring.detail.table.table3.achievement") }} <!-- 성적표 첨부 -->
            </th>
            <td>
              <InputFileBase v-if="dataForm.mentor.id" :referKey="dataForm.mentor.id" :mode="modefile" id="imageFile" name="imageFile"
                :type="fileTypeImg" v-model="fileImage" ref="imageRef" :orgName="`MENTORING_SCORE_${idDetail}`"
                :category="`MENTORING_SCORE_${idDetail}`" :sectionName="`MENTORING_SCORE_${idDetail}`" previewFlag="true" />
              </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Menti information -->
    <div class="box_section">
      <p class="box_title_sm">
        {{ t("capacityDeMng.tutoring.detail.table.table3.name") }} <!-- 멘티 인적사항 -->
      </p>
      <table class="tbl_row">
        <caption>
          table3
        </caption>
        <colgroup>
          <col style="width: 15%" />
          <col style="width: 35%" />
          <col style="width: 15%" />
          <col style="width: 35%" />
        </colgroup>
        <tbody>
          <tr>
            <th scope="row">
              {{ t("capacityDeMng.tutoring.detail.table.table3.nameMenti") }}
              <!-- 멘티이름 -->
            </th>
            <td>{{ dataForm.mentee.name }}</td>
            <th scope="row">
              {{ t("capacityDeMng.tutoring.detail.table.table3.idStudent") }} <!-- 학번 -->
            </th>
            <td>{{ dataForm.mentee.code }}</td>
          </tr>
          <tr>
            <th scope="row">
              {{ t("capacityDeMng.tutoring.detail.table.table3.gpa") }} <!-- 직전학기 평균평점 -->
            </th>
            <td>{{ dataForm.mentee.scoreMedium }}</td>
            <th scope="row">
              {{ t("capacityDeMng.tutoring.detail.table.table3.eduYear") }} <!-- 학년 -->
            </th>
            <td>{{ dataForm.mentee.yearEdu }}</td>
          </tr>
          <tr>
            <th scope="row">
              {{ t("capacityDeMng.tutoring.detail.table.table3.major") }} <!-- 소속 단과대학 -->
            </th>
            <td>{{ dataForm.mentee.major }}</td>
            <th scope="row">
              {{ t("capacityDeMng.tutoring.detail.table.table3.department") }} <!-- 소속 학과 -->
            </th>
            <td>{{ dataForm.mentee.department }}</td>
          </tr>
          <tr>
            <th scope="row">
              {{ t("capacityDeMng.tutoring.detail.table.table3.phone") }} <!-- 연락처(휴대폰) -->
            </th>
            <td>{{ dataForm.mentee.phone }}</td>
            <th scope="row">
              {{ t("capacityDeMng.tutoring.detail.table.table3.receiver") }} <!-- 예금주 -->
            </th>
            <td>{{ dataForm.mentee.receiver }}</td>
          </tr>
          <tr>
            <th scope="row">
              {{ t("capacityDeMng.tutoring.detail.table.table3.bankName") }} <!-- 은행명 -->
            </th>
            <td>{{ dataForm.mentee.bankNm }}</td>
            <th scope="row">
              {{ t("capacityDeMng.tutoring.detail.table.table3.bankNumber") }} <!-- 계좌번호 -->
            </th>
            <td>{{ dataForm.mentee.bankCode }}</td>
          </tr>
          <tr>
            <th scope="row">
              {{ t("capacityDeMng.tutoring.detail.table.table3.studyProgram") }} <!-- 직적학기 교수학습 프로그램 참여 여부 -->
            </th>
            <td>{{ dataForm.mentee.isStudy }}</td>
            <th scope="row">
              {{ t("capacityDeMng.tutoring.detail.table.table3.programName") }} <!-- 참여한 프로그램명 -->
            </th>
            <td>{{ dataForm.mentee.studyNm }}</td>
          </tr>
          <tr>
            <th scope="row">
              {{ t("capacityDeMng.tutoring.detail.table.table3.attachBank") }} <!-- 통장사본 첨부 -->
            </th>
            <td>
              <InputFileBase v-if="dataForm.mentee.id" :referKey="dataForm.mentee.id" :mode="modefile" id="imageFile" name="imageFile"
                :type="fileTypeImg" v-model="fileImage" ref="imageRef" :orgName="`MENTORING_BANK_${idDetail}`"
                :category="`MENTORING_BANK_${idDetail}`" :sectionName="`MENTORING_BANK_${idDetail}`" previewFlag="true" />
              </td>
            <th scope="row">
              {{ t("capacityDeMng.tutoring.detail.table.table3.achievement") }} <!-- 성적표 첨부 -->
            </th>
            <td>
              <InputFileBase v-if="dataForm.mentee.id" :referKey="dataForm.mentee.id" :mode="modefile" id="imageFile" name="imageFile"
                :type="fileTypeImg" v-model="fileImage" ref="imageRef" :orgName="`MENTORING_SCORE_${idDetail}`"
                :category="`MENTORING_SCORE_${idDetail}`" :sectionName="`MENTORING_SCORE_${idDetail}`" previewFlag="true" />
              </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script lang="ts">
import { useI18n } from "vue-i18n";
import { defineComponent } from "vue";
import {
  getTeamInfo
} from '@/stores/capacityDeMng/mentoring/tutoring/tutoring.service'
import {
  MODE_DETAIL,
  ACCEPTTYPE_OFICE_AND_IMG
} from "@/constants/screen.const";
import { commonStore } from "@/stores/common";

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
      dataForm: {
        teamNm: "",
        campus: "",
        mentor: {
          id: "",
          name: "",
          code: "",
          scoreMedium: "",
          yearEdu: "",
          major: "",
          department: "",
          phone: "",
          receiver: "",
          bankNm: "",
          bankCode: "",
          isStudy: "",
          studyNm: ""
        },
        mentee: {
          id: "",
          name: "",
          code: "",
          scoreMedium: "",
          yearEdu: "",
          major: "",
          department: "",
          phone: "",
          receiver: "",
          bankNm: "",
          bankCode: "",
          isStudy: "",
          studyNm: ""
        }
      },
      modefile: MODE_DETAIL,
      fileImage: [],
      fileTypeImg: ACCEPTTYPE_OFICE_AND_IMG
    }
  },
  beforeMount() {
    this.getTeamData();
  },
  methods: {
    getTeamData() {
      this.store.setLoading(true)
      getTeamInfo(this.idDetail).then(res => {
        this.dataForm = res.data.data;
      }).finally(() => {
        this.store.setLoading(false)
      }) 
    }
  },
});
</script>
<style>
.add_photo .btn_add_photo {
  cursor: unset;
}
</style>
