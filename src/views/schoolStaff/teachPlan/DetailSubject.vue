<template>
  <section id="content" class="content_wrapper grid_content" tabindex="0">
    <Breadcrumb :pageTitle="pageTitle" :breadcrumbItems="breadcrumbItems"></Breadcrumb>

    <div class="box dp_block">
      <CollapseBase :isShow="openCollapse" :title="`Template Collapse`" :isCheck="true"
                    :onClick="() => {openCollapse = !openCollapse}">
        <div class="box_section">
          <table class="tbl_col">
            <caption>table col</caption>
            <colgroup>
              <col style="width: 14%;">
              <col style="width: 14%;">
              <col style="width: 14%;">
              <col style="width: 14%;">
              <col style="width: 14%;">
              <col style="width: 14%;">
              <col style="width: auto;">
            </colgroup>
            <thead>
            <tr>
              <th scope="col">{{ t('schoolStaff.teachPlan.detail.table1.subjectTitle') }}</th>
              <th scope="col">{{ t('schoolStaff.teachPlan.detail.table1.subjectCode') }}</th>
              <th scope="col">{{ t('schoolStaff.teachPlan.detail.table1.categories') }}</th>
              <th scope="col">{{ t('schoolStaff.teachPlan.detail.table1.point') }}</th>
              <th scope="col">{{ t('schoolStaff.teachPlan.detail.table1.actualPoint') }}</th>
              <th scope="col">{{ t('schoolStaff.teachPlan.detail.table1.professor') }}</th>
              <th scope="col">{{ t('schoolStaff.teachPlan.detail.table1.evaluationMethods') }}</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>{{ dataProfile?.table1.subjectTitle }}</td>
              <td>{{ dataProfile?.table1.subjectCode }}</td>
              <td>{{ dataProfile?.table1.categories }}</td>
              <td>{{ dataProfile?.table1.point }}</td>
              <td>{{ dataProfile?.table1.actualPoint }}</td>
              <td>{{ dataProfile?.table1.professor }}</td>
              <td>{{ dataProfile?.table1.evaluationMethods }}</td>
            </tr>
            </tbody>
          </table>
        </div>

        <div class="box_section">
          <table class="tbl_row">
            <caption>table col</caption>
            <colgroup>
              <col style="width: 15%"/>
              <col style="width: auto"/>
            </colgroup>
            <thead>
            </thead>
            <tbody>
            <tr>
              <th>{{ t('schoolStaff.teachPlan.detail.table2.typeClass1') }}</th>
              <td>
                {{ dataProfile?.table2.typeClass1 }}
              </td>
            </tr>
            <tr>
              <th>{{ t('schoolStaff.teachPlan.detail.table2.typeClass2') }}</th>
              <td>
                {{ dataProfile?.table2.typeClass2 }}
              </td>
            </tr>
            </tbody>
          </table>
        </div>

        <div class="box_section">
          <table v-if="mode==='major'" class="tbl_col">
            <caption>table col</caption>
            <colgroup>
              <col style="width: 15%"/>
              <col style="width: 15%"/>
              <col style="width: 15%"/>
              <col style="width: 15%"/>
              <col style="width: 15%"/>
              <col style="width: auto"/>
            </colgroup>
            <tbody>
            <tr class="td_custom">
              <td rowspan="3">{{ t('schoolStaff.teachPlan.detail.table3.majorCompetence') }}</td>
              <td>{{ t('schoolStaff.teachPlan.detail.table3.talentType') }}</td>
              <td>{{ t('schoolStaff.teachPlan.detail.table3.competence') }}</td>
              <td>{{ t('schoolStaff.teachPlan.detail.table3.subCompetence') }}</td>
              <td>{{ t('schoolStaff.teachPlan.detail.table3.components') }}</td>
              <td>{{ t('schoolStaff.teachPlan.detail.table3.behaviorIndicators') }}</td>
            </tr>
            <template v-for="(item, index) in dataProfile?.table3" :key="index">
              <tr>
                <td v-for="(row, rowIndex) in item.rowNum" :key="rowIndex">{{ row.col }}</td>
              </tr>
            </template>
            </tbody>
          </table>
          <table v-else class="tbl_col">
            <caption>table col</caption>
            <colgroup>
              <col style="width: 15%"/>
              <col style="width: 15%"/>
              <col style="width: 15%"/>
              <col style="width: 15%"/>
              <col style="width: auto"/>
            </colgroup>
            <tbody>
            <tr class="td_custom">
              <td rowspan="3">{{ t('schoolStaff.teachPlan.detail.table3.coreCompetence') }}</td>
              <td>{{ t('schoolStaff.teachPlan.detail.table3.coreCompetenceLabel') }}</td>
              <td>{{ t('schoolStaff.teachPlan.detail.table3.subCoreCompetence') }}</td>
              <td>{{ t('schoolStaff.teachPlan.detail.table3.components') }}</td>
              <td>{{ t('schoolStaff.teachPlan.detail.table3.behaviorIndicators') }}</td>
            </tr>
            <template v-for="(item, index) in dataProfile?.table3" :key="index">
              <tr>
                <td v-for="(row, rowIndex) in item.rowNum" :key="rowIndex">{{ row.col }}</td>
              </tr>
            </template>
            </tbody>
          </table>
        </div>

        <div class="box_section">
          <table class="tbl_row">
            <caption>table col</caption>
            <colgroup>
              <col style="width: 15%"/>
              <col style="width: auto"/>
            </colgroup>
            <thead>
            </thead>
            <tbody>
            <tr>
              <th>{{ t('schoolStaff.teachPlan.detail.table4.teachingPhilosophy') }}</th>
              <td>
                <TextArea v-model="dataTemporary.table4.trainingPhilosophy"/>
              </td>
            </tr>
            <tr>
              <th>{{ t('schoolStaff.teachPlan.detail.table4.courseSummary') }}</th>
              <td>
                <TextArea v-model="dataTemporary.table4.courseSummary"/>
              </td>
            </tr>
            <tr>
              <th>{{ t('schoolStaff.teachPlan.detail.table4.learningGoals') }}</th>
              <td>
                <TextArea v-model="dataTemporary.table4.learningGoals"/>
              </td>
            </tr>
            <tr>
              <th>{{ t('schoolStaff.teachPlan.detail.table4.prerequisites') }}</th>
              <td>
                <TextArea v-model="dataTemporary.table4.required"/>
              </td>
            </tr>
            <tr>
              <th>{{ t('schoolStaff.teachPlan.detail.table4.cqi') }}</th>
              <td>
                <TextArea v-model="dataTemporary.table4.cqi"/>
              </td>
            </tr>
            </tbody>
          </table>
        </div>

        <div class="box_section">
          <table class="tbl_row">
            <caption>table col</caption>
            <colgroup>
              <col style="width: 15%"/>
              <col style="width: auto"/>
            </colgroup>
            <thead>
            </thead>
            <tbody>
            <tr>
              <th>{{ t('schoolStaff.teachPlan.detail.table5.teachingMethods') }}</th>
              <td v-if="mode==='major'">
                <ListCheckBoxBase
                    :listData="listCheckBoxMajor"
                    :mode="'show'"
                    v-model="dataTemporary.table5.method"
                    :id="`checkBoxMarjorTb`"
                    :name="`checkBoxMarjorTb`"
                    ::hasCheckAll="false"
                />
                <InputBase v-if="checkSelectBox"/>
              </td>
              <td v-else>
                <ListCheckBoxBase
                    :listData="listCheckBoxGeneral"
                    :mode="'show'"
                    v-model="dataTemporary.table5.method"
                    id="checkBoxGenarelTb"
                    name="checkBoxGenarelTb"
                    :hasCheckAll="false"
                />
              </td>
            </tr>
            </tbody>
          </table>
        </div>

        <div class="box_section">
          <table class="tbl_row">
            <caption>table col</caption>
            <colgroup>
              <col style="width: 15%"/>
              <col style="width: auto"/>
            </colgroup>
            <thead>
            </thead>
            <tbody>
            <tr>
              <th>{{ t('schoolStaff.teachPlan.detail.table6.exerciseContent') }}</th>
              <td>
                <TextArea v-model="dataTemporary.table6.exerciseContent"/>
              </td>
            </tr>
            <tr>
              <th>{{ t('schoolStaff.teachPlan.detail.table6.feedbackMethod') }}</th>
              <td>
                <TextArea v-model="dataTemporary.table6.feedback"/>
              </td>
            </tr>
            </tbody>
          </table>
        </div>

        <div class="box_section">
          <table class="tbl_col">
            <caption>table col</caption>
            <colgroup>
              <col style="width: 15%;">
              <col style="width: auto;">
              <col style="width: 10%;">
            </colgroup>
            <thead>
            <tr>
              <th scope="col">{{ t('schoolStaff.teachPlan.detail.table7.assessmentElement') }}</th>
              <th scope="col">{{ t('schoolStaff.teachPlan.detail.table7.evaluationCriteria') }}</th>
              <th scope="col">{{ t('schoolStaff.teachPlan.detail.table7.ratio') }}</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>{{ t('schoolStaff.teachPlan.detail.table7.attendance') }}</td>
              <td>
                <InputBase v-model="dataTemporary.table7.attendance"/>
              </td>
              <td>20%</td>
            </tr>
            <tr v-if="mode==='major'">
              <td>{{ t('schoolStaff.teachPlan.detail.table7.competencyBasedEvaluation') }}</td>
              <th class="table_child">
                <table class="tbl_col">
                  <caption>table col</caption>
                  <colgroup>
                    <col style="width: 10%;">
                    <col style="width: 10%;">
                    <col style="width: 10%;">
                    <col style="width: 10%;">
                    <col style="width: 10%;">
                    <col style="width: 10%;">
                    <col style="width: 10%;">
                    <col style="width: 10%;">
                  </colgroup>
                  <thead>
                  <tr>
                    <th scope="col">{{ t('schoolStaff.teachPlan.detail.table7.talentType') }}</th>
                    <th scope="col">{{ t('schoolStaff.teachPlan.detail.table7.majorCompetency') }}</th>
                    <th scope="col">{{ t('schoolStaff.teachPlan.detail.table7.subCompetency') }}</th>
                    <th scope="col">{{ t('schoolStaff.teachPlan.detail.table7.component') }}</th>
                    <th scope="col">{{ t('schoolStaff.teachPlan.detail.table7.behaviorIndicator') }}</th>
                    <th scope="col">{{ t('schoolStaff.teachPlan.detail.table7.achievementCriteria') }}</th>
                    <th scope="col">{{ t('schoolStaff.teachPlan.detail.table7.evaluationMethod') }}</th>
                    <th scope="col">{{ t('schoolStaff.teachPlan.detail.table7.weight') }}</th>
                  </tr>
                  </thead>
                  <tbody>
                  <template v-for="(item, index) in dataTemporary.table7.learningOutcomes" :key="index">
                    <tr>
                      <td v-for="(row, rowIndex) in item.rowNum" :key="rowIndex">{{ row.col }}</td>
                      <td>
                        <SelectBoxBase
                            :id="`selectbox_major_${index}_${rowIndex}`"
                            :name="`selectbox_major_${index}_${rowIndex}`"
                            v-model="item.evaluationMethods"
                            :data="listEvaluationMethods"
                        />
                      </td>
                      <td>
                        <SelectBoxBase
                            :id="`selectbox1_major_${index}_${rowIndex}`"
                            :name="`selectbox1_major_${index}_${rowIndex}`"
                            v-model="item.selectBoxValue"
                            :data="listCheckBoxRatio"
                        />
                      </td>
                    </tr>
                  </template>
                  </tbody>
                </table>
              </th>
              <td>10%</td>
            </tr>
            <tr v-else>
              <td>{{ t('schoolStaff.teachPlan.detail.table7.competencyBasedEvaluation') }}</td>
              <th class="table_child">
                <table class="tbl_col">
                  <caption>table col</caption>
                  <colgroup>
                    <col style="width: 10%;">
                    <col style="width: 10%;">
                    <col style="width: 10%;">
                    <col style="width: 10%;">
                    <col style="width: 10%;">
                    <col style="width: 10%;">
                    <col style="width: 10%;">
                  </colgroup>
                  <thead>
                  <tr>
                    <th scope="col">{{ t('schoolStaff.teachPlan.detail.table7.coreCompetency') }}</th>
                    <th scope="col">{{ t('schoolStaff.teachPlan.detail.table7.subCompetency') }}</th>
                    <th scope="col">{{ t('schoolStaff.teachPlan.detail.table7.component') }}</th>
                    <th scope="col">{{ t('schoolStaff.teachPlan.detail.table7.behaviorIndicator') }}</th>
                    <th scope="col">{{ t('schoolStaff.teachPlan.detail.table7.achievementCriteria') }}</th>
                    <th scope="col">{{ t('schoolStaff.teachPlan.detail.table7.evaluationMethod') }}</th>
                    <th scope="col">{{ t('schoolStaff.teachPlan.detail.table7.weight') }}</th>
                  </tr>
                  </thead>
                  <tbody>
                  <template v-for="(item, index) in dataTemporary.table7.learningOutcomes" :key="index">
                    <tr>
                      <td v-for="(row, rowIndex) in item.rowNum" :key="rowIndex">{{ row.col }}</td>
                      <td>
                        <SelectBoxBase
                            :id="`selectbox_general_${index}_${rowIndex}`"
                            :name="`selectbox_general_${index}_${rowIndex}`"
                            v-model="item.evaluationMethods"
                            :data="listEvaluationMethods"
                        />
                      </td>
                      <td>
                        <SelectBoxBase
                            :id="`selectbox1_general_${index}_${rowIndex}`"
                            :name="`selectbox1_general_${index}_${rowIndex}`"
                            v-model="item.selectBoxValue"
                            :data="listCheckBoxRatio"
                        />
                      </td>
                    </tr>
                  </template>
                  </tbody>
                </table>
              </th>
              <td>10%</td>
            </tr>
            <tr>
              <td>{{ t('schoolStaff.teachPlan.detail.table7.midtermExam') }}</td>
              <td>
                <InputBase v-model="dataTemporary.table7.midtermExam"/>
              </td>
              <td>
                <SelectBoxBase/>
              </td>
            </tr>
            <tr>
              <td>{{ t('schoolStaff.teachPlan.detail.table7.finalExam') }}</td>
              <td>
                <InputBase v-model="dataTemporary.table7.finalExam"/>
              </td>
              <td>
                <SelectBoxBase/>
              </td>
            </tr>
            <tr>
              <td>{{ t('schoolStaff.teachPlan.detail.table7.exercise') }}</td>
              <td>
                <InputBase v-model="dataTemporary.table7.exercise"/>
              </td>
              <td>
                <SelectBoxBase/>
              </td>
            </tr>
            <tr>
              <td>{{ t('schoolStaff.teachPlan.detail.table7.additionalPoints') }}</td>
              <td>
                <InputBase v-model="dataTemporary.table7.points"/>
              </td>
              <td>
                <SelectBoxBase/>
              </td>
            </tr>
            </tbody>
          </table>
        </div>

        <div class="box_section">
          <table class="tbl_col">
            <caption>table col</caption>
            <colgroup>
              <col style="width: 20%;">
              <col style="width: 20%;">
              <col style="width: 20%;">
              <col style="width: 20%;">
              <col style="width: 20%;">
            </colgroup>
            <thead>
            <tr>
              <th scope="col">{{ t('schoolStaff.teachPlan.detail.table8.type') }}</th>
              <th scope="col">{{ t('schoolStaff.teachPlan.detail.table8.textbookName') }}</th>
              <th scope="col">{{ t('schoolStaff.teachPlan.detail.table8.author') }}</th>
              <th scope="col">{{ t('schoolStaff.teachPlan.detail.table8.publisher') }}</th>
              <th scope="col">{{ t('schoolStaff.teachPlan.detail.table8.otherInput') }}</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>{{ t('schoolStaff.teachPlan.detail.table8.mainTextbook') }}</td>
              <td>
                <InputBase v-model="dataTemporary.table8.mainTextbooks.name"/>
              </td>
              <td>
                <InputBase v-model="dataTemporary.table8.mainTextbooks.author"/>
              </td>
              <td>
                <InputBase v-model="dataTemporary.table8.mainTextbooks.publishing"/>
              </td>
              <td>
                <InputBase v-model="dataTemporary.table8.mainTextbooks.other"/>
              </td>
            </tr>
            <tr>
              <td>{{ t('schoolStaff.teachPlan.detail.table8.additionalTextbook') }}</td>
              <td>
                <InputBase v-model="dataTemporary.table8.additionalTextbooks.name"/>
              </td>
              <td>
                <InputBase v-model="dataTemporary.table8.additionalTextbooks.author"/>
              </td>
              <td>
                <InputBase v-model="dataTemporary.table8.additionalTextbooks.publishing"/>
              </td>
              <td>
                <InputBase v-model="dataTemporary.table8.additionalTextbooks.other"/>
              </td>
            </tr>
            <tr>
              <td>{{ t('schoolStaff.teachPlan.detail.table8.optionalClassics') }}</td>
              <td>
                <InputBase v-model="dataTemporary.table8.otherTextbook.name"/>
              </td>
              <td>
                <InputBase v-model="dataTemporary.table8.otherTextbook.author"/>
              </td>
              <td>
                <InputBase v-model="dataTemporary.table8.otherTextbook.publishing"/>
              </td>
              <td>
                <InputBase v-model="dataTemporary.table8.otherTextbook.other"/>
              </td>
            </tr>
            </tbody>
          </table>
        </div>

        <div class="box_section">
          <table class="tbl_row">
            <caption>table col</caption>
            <colgroup>
              <col style="width: 15%"/>
              <col style="width: auto"/>
            </colgroup>
            <thead>
            </thead>
            <tbody>
            <tr>
              <th>{{ t('schoolStaff.teachPlan.detail.table9.studentNote') }}</th>
              <td>
                <TextArea v-model="dataTemporary.table9.note"/>
              </td>
            </tr>
            </tbody>
          </table>
        </div>

        <div class="box_section">
          <table class="tbl_col">
            <caption>{{ t('schoolStaff.teachPlan.detail.tableSupport.classification') }}</caption>
            <colgroup>
              <col style="width: 15%;">
              <col style="width: auto;">
            </colgroup>
            <thead>
            <tr>
              <th scope="col">{{ t('schoolStaff.teachPlan.detail.tableSupport.classification.index') }}</th>
              <th scope="col">{{ t('schoolStaff.teachPlan.detail.tableSupport.supportContent.index') }}</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>{{ t('schoolStaff.teachPlan.detail.tableSupport.classification.common') }}</td>
              <td>{{ t('schoolStaff.teachPlan.detail.tableSupport.supportContent.common') }}</td>
            </tr>
            <tr>
              <td>{{ t('schoolStaff.teachPlan.detail.tableSupport.classification.hearingImpairment') }}</td>
              <td>{{ t('schoolStaff.teachPlan.detail.tableSupport.supportContent.hearingImpairment') }}</td>
            </tr>
            <tr>
              <td>{{ t('schoolStaff.teachPlan.detail.tableSupport.classification.physicalDisability') }}</td>
              <td>{{ t('schoolStaff.teachPlan.detail.tableSupport.supportContent.physicalDisability') }}</td>
            </tr>
            <tr>
              <td>{{ t('schoolStaff.teachPlan.detail.tableSupport.classification.visualImpairment') }}</td>
              <td>{{ t('schoolStaff.teachPlan.detail.tableSupport.supportContent.visualImpairment') }}</td>
            </tr>
            </tbody>
          </table>
        </div>

      </CollapseBase>
      <template v-for="(i,index) in 16" :key="i">
        <CollapseBase
            v-if="weekValue[index]"
            :isShow="weekValue[index]?.openCollapse"
            :title="`Template Collapse ${i}`"
            :isCheck="
              weekValue[index]?.classContent?.length > 0 &&
              weekValue[index]?.studyMethod?.length > 0 &&
              weekValue[index]?.operate?.length > 0 &&
              weekValue[index]?.preparationCategory?.length > 0
            "
            :onClick="() => {weekValue[index].openCollapse = !weekValue[index].openCollapse}"
        >
          <div class="box_section">
            <table class="tbl_row">
              <caption>{{ t('schoolStaff.teachPlan.detail.week.caption') }}</caption>
              <colgroup>
                <col style="width: 15%;">
                <col style="width: auto;">
              </colgroup>
              <thead>
              </thead>
              <tbody>
              <tr>
                <th>{{ t('schoolStaff.teachPlan.detail.week.classContent') }}</th>
                <td>
                  <TextArea v-model="weekValue[index]!.classContent"/>
                </td>
              </tr>
              <tr>
                <th>{{ t('schoolStaff.teachPlan.detail.week.studyMethod') }}</th>
                <td>
                  <InputBase v-model="weekValue[index]!.studyMethod"/>
                </td>
              </tr>
              <tr>
                <th>{{ t('schoolStaff.teachPlan.detail.week.operate') }}</th>
                <td>
                  <RadiobuttonBase
                      v-for="item in listRadioWeek"
                      :mode="'show'"
                      :value="item.name"
                      v-model="weekValue[index]!.operate"
                      :id="`week_${item.id}_${i}`"
                      :name="`week_${item.id}_${i}`"
                      :key="item.id"
                      :checked="item.name == weekValue[index]!.operate"
                      :label="$t(item.name)"
                  />
                </td>
              </tr>
              <tr>
                <th>{{ t('schoolStaff.teachPlan.detail.week.preparationCategory') }}</th>
                <td>
                  <InputBase v-model="weekValue[index]!.preparationCategory"/>
                </td>
              </tr>
              </tbody>
            </table>
          </div>

        </CollapseBase>
      </template>

      <div class="btn_group btn_end">
        <button type="button" class="button btn_sm btn_medium_gray btn_responsive" @click="handleSaveTemporarily">
          {{ t('common.saveTemp') }}
        </button>
        <button type="button" class="button btn_sm btn_medium_gray btn_responsive" @click="handleSave">
          {{ t('common.save') }}
        </button>
        <button type="button" class="button btn_sm btn_blue btn_responsive" @click="handlePrint">{{ t('common.print') }}
        </button>
        <button type="button" class="button btn_sm btn_white btn_responsive" @click="handleRedirect">
          {{ t('common.list') }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import {computed, onMounted, onUpdated, ref} from "vue";
import {SCREEN} from "@/router/screen";
import {useRoute, useRouter} from "vue-router";
import CollapseBase from "@/components/common/collapse/CollapseBase.vue";
import TextArea from "@/components/common/input/TextArea.vue";
import ListCheckBoxBase from "@/components/common/input/ListCheckBoxBase.vue";
import InputBase from "@/components/common/input/InputBase.vue";
import SelectBoxBase from "@/components/common/input/SelectBoxBase.vue";
import RadiobuttonBase from "@/components/common/input/RadiobuttonBase.vue";
import type {CodeMngModel} from "@/stores/common/codeMng/codeMng.type";
import {getSessionStorage, setSessionStorage} from "@/utils/storage";
import {useI18n} from "vue-i18n";

const router = useRouter()
const route = useRoute()
const swal = inject('$swal')
const {t} = useI18n()

const pageTitle = ref('수강생 목록')
const mode = ref('')
const breadcrumbItems = ref([
  {label: 'HOME', link: '/'},
  {label: 'dept1', link: '#'},
  {label: 'dept2', link: '/banner'}
])
const id = ref(null)
const idSession = ref('detailTeachPlan')
const idCollapse = ref('collapseTeachPlan')

//checkbox
const selectBoxValue = ref('')
const listCheckBoxMajor = ref([
  {cdId: '1', cdNm: '학생참여 AL(Active Learning)', upCdId: '1'},
  {cdId: '2', cdNm: 'PBL(프로젝트중심)', upCdId: '1'},
  {cdId: '3', cdNm: '실험/실습/실기', upCdId: '1'},
  {cdId: '4', cdNm: '현장실습', upCdId: '1'},
  {cdId: '5', cdNm: '블렌디드(On+Off병행)', upCdId: '1'},
  {cdId: '6', cdNm: '플립러닝', upCdId: '1'},
  {cdId: '7', cdNm: '강의', upCdId: '1'},
  {cdId: '8', cdNm: '발표', upCdId: '1'},
  {cdId: '9', cdNm: '토론', upCdId: '1'},
  {cdId: '10', cdNm: '액션러닝', upCdId: '1'},
  {cdId: '11', cdNm: '협동학습', upCdId: '1'},
  {cdId: '12', cdNm: '팀티칭 M.PBL(문제중심)', upCdId: '1'},
  {cdId: '13', cdNm: '시연', upCdId: '1'},
  {cdId: '14', cdNm: '사이버', upCdId: '1'},
  {cdId: '15', cdNm: '서비스러닝', upCdId: '1'},
  {cdId: '16', cdNm: '기타', upCdId: '1'}

] as Array<any>,);
const listCheckBoxGeneral = ref([
  {cdId: '1', cdNm: '프로파일에서 선택된 교수학습방법1', upCdId: '1'},
  {cdId: '2', cdNm: '프로파일에서 선택된 교수학습방법2', upCdId: '1'},
  {cdId: '3', cdNm: '프로파일에서 선택된 교수학습방법3', upCdId: '1'},
  {cdId: '4', cdNm: '프로파일에서 선택된 교수학습방법4', upCdId: '1'},
] as Array<any>,);
const listRadioWeek = ref([
  {id: '0', name: '대면'},
  {id: '1', name: '비대면'}
])
const listCheckBoxRatio = ref<CodeMngModel>([])
const listEvaluationMethods = ref<CodeMngModel>([
  {cdId: '1', cdNm: 'demo1', upCdId: '1'},
  {cdId: '2', cdNm: 'demo2', upCdId: '1'},
])
//general data
const dataProfile = ref<DataProfile>()

const dataTemporary = ref<DataTemporary>({
  table4: {
    trainingPhilosophy: '',
    courseSummary: '',
    learningGoals: '',
    required: "",
    cqi: ""
  },
  table5: {
    method: ''
  },
  table6: {
    exerciseContent: "",
    feedback: ''
  },
  table7: {
    attendance: "",
    learningOutcomes: [],
    midtermExam: "",
    finalExam: "",
    exercise: "",
    points: ""
  },
  table8: {
    mainTextbooks: {
      name: "",
      author: "",
      publishing: "",
      other: "",
    },
    additionalTextbooks: {
      name: "",
      author: "",
      publishing: "",
      other: "",
    },
    otherTextbook: {
      name: "",
      author: "",
      publishing: "",
      other: "",
    }
  },
  table9: {
    note: ""
  }
})
//collapse
const weekValue = ref<ModalStateWeek[]>([]);
const openCollapse = ref(true);

onMounted(() => {
  id.value = window.history.state.id
  mode.value = <string>route.params.type
  pageTitle.value = route.params.type === 'major' ? "강의계획서 작성(전공)" : '강의계획서 작성(교양)'

  if (!id.value) {
    router.replace({name: SCREEN.home.name})
  }

  weekValue.value = (new Array(16).fill(null).map((_, index) => ({
    id: index + 1,
    classContent: '',
    studyMethod: '',
    operate: '',
    preparationCategory: '',
    openCollapse: false
  } as ModalStateWeek)));

  // Fake data
  if (mode.value == 'major') {
    dataProfile.value = {
      table1: {
        subjectTitle: "Sơ lược dư lịch học",
        subjectCode: "12345678",
        categories: "Chuyên ngành bắt buộc",
        point: '2',
        actualPoint: "3",
        professor: "Hong Gil Dong",
        evaluationMethods: "Trạng thái đánh giá"
      },
      table2: {
        typeClass1: 'Loại hình cơ bản',
        typeClass2: 'Loại hình liên kết chứng chỉ'
      },
      table3: [
        {
          rowNum: [
            {col: 'Chuyên gia quản trị khách sạn'},
            {col: 'Kiến thức chuyên môn khách sạn và nghiệp vụ tổng hợp SW khách sạn'},
            {col: 'Năng lực quản lý vận hành'},
            {col: 'Khảo sát thị trường'},
            {col: 'Có thể cài đặt mục tiêu doanh số của khách sạn thông qua phân tích xu hướng thị trường khách sạn'},
          ]
        },
        {
          rowNum: [
            {col: 'Chuyên gia quản trị khách sạn'},
            {col: 'Kiến thức chuyên môn khách sạn và nghiệp vụ tổng hợp SW khách sạn'},
            {col: 'Năng lực quản lý vận hành'},
            {col: 'Khảo sát thị trường'},
            {col: 'Có thể cài đặt mục tiêu doanh số của khách sạn thông qua phân tích xu hướng thị trường khách sạn'},
          ]
        },
      ]
    }

    dataTemporary.value.table7.learningOutcomes = [
      {
        rowNum: [
          {col: '호텔경영전문가'},
          {col: '호텔전문지식 및 호텔SW융합실무'},
          {col: '운영관리능력'},
          {col: '시장조사'},
          {col: '호텔시장 동향 분석을 통해 호텔의 매출 목표를 설정할 수 있다.'},
          {col: '상'},
        ],
        selectBoxValue: '',
        evaluationMethods: ''
      },
      {
        rowNum: [
          {col: '호텔경영전문가'},
          {col: '호텔전문지식 및 호텔SW융합실무'},
          {col: '운영관리능력'},
          {col: '시장조사'},
          {col: '호텔시장 동향 분석을 통해 호텔의 매출 목표를 설정할 수 있다.'},
          {col: '상'},
        ],
        selectBoxValue: '',
        evaluationMethods: ''
      },
    ]
  } else {
    dataProfile.value = {
      table1: {
        subjectTitle: "Sơ lược dư lịch học",
        subjectCode: "12345678",
        categories: "Chuyên ngành bắt buộc",
        point: '2',
        actualPoint: "3",
        professor: "Hong Gil Dong",
        evaluationMethods: "Trạng thái đánh giá"
      },
      table2: {
        typeClass1: 'Loại hình cơ bản',
        typeClass2: 'Loại hình liên kết chứng chỉ'
      },
      table3: [
        {
          rowNum: [
            {col: 'Sự thông minh'},
            {col: 'Bản ngã '},
            {col: 'Tự khám phá bản thân'},
            {col: 'Phân tích, phán đoán về vị trí, năng lực hiện tại của bản thân và tính khả thi trong tương lai '},
          ]
        },
        {
          rowNum: [
            {col: 'Sự thông minh'},
            {col: 'Bản ngã '},
            {col: 'Tự khám phá bản thân'},
            {col: 'Phân tích, phán đoán về vị trí, năng lực hiện tại của bản thân và tính khả thi trong tương lai '},
          ]
        }
      ]
    }

    dataTemporary.value.table7.learningOutcomes = [
      {
        rowNum: [
          {col: '지혜로움'},
          {col: '자아정체성'},
          {col: '시장조사'},
          {col: '자신의 현재 위상과 역량 및 미래가능성에 대해 분석ㆍ판단하고 있다 '},
          {col: '1'},
        ],
        selectBoxValue: '',
        evaluationMethods: ''
      },
      {
        rowNum: [
          {col: '지혜로움'},
          {col: '자아정체성'},
          {col: '시장조사'},
          {col: '자신의 현재 위상과 역량 및 미래가능성에 대해 분석ㆍ판단하고 있다 '},
          {col: '5'},
        ],
        selectBoxValue: '',
        evaluationMethods: ''
      },
    ]
  }

  //create listCheckBoxRatio
  for (let i = 5; i <= 100; i += 5) {
    listCheckBoxRatio.value.push({cdId: String(i), cdNm: `${i}%`, upCdId: '1'});
  }

  //check seesion
  if (getSessionStorage(`${idSession.value}_${mode.value}`)) {
    dataTemporary.value = JSON.parse(getSessionStorage(`${idSession.value}_${mode.value}`))
  }
  if (getSessionStorage(`${idCollapse.value}_${mode.value}`)) {
    const data = JSON.parse(getSessionStorage(`${idCollapse.value}_${mode.value}`));

    weekValue.value = weekValue.value.map(item => {
      const newItem = data.find((newData: ModalStateWeek) => newData.id === item.id);
      return newItem ? {...item, ...newItem} : item;
    });
  }
})

//computed
const checkSelectBox = computed(() => {
  return dataTemporary.value.table5.method.includes(listCheckBoxMajor.value[listCheckBoxMajor.value.length - 1].cdId);
});

//func
const handleSaveTemporarily = () => {

  swal({
    text: '임시저장하시겠어요 ?',
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: '#DD6B55',
    confirmButtonText: '확인',
    cancelButtonText: "취소",
  }).then((result: any) => {
    if (result.isConfirmed) {
      const data = {
        ...dataTemporary.value,
        table5: {
          method: Array.isArray(dataTemporary.value.table5.method) ? dataTemporary.value.table5.method.join(',') : dataTemporary.value.table5.method,
        }
      }
      setSessionStorage(`${idSession.value}_${mode.value}`, (data));

      const filteredData = weekValue.value.filter(item => {
        return !(item.classContent === '' && item.studyMethod === '' && item.operate === '' && item.preparationCategory === '');
      });
      setSessionStorage(`${idCollapse.value}_${mode.value}`, (filteredData));
      confirmAlert('임시저장됐습니다.')
    }
  })
}

const handleSave = () => {

  const totalSelectBoxValue = dataTemporary.value.table7.learningOutcomes.reduce((total, outcome) => {
    return total + parseInt(outcome.selectBoxValue, 10);
  }, 0);
  if (totalSelectBoxValue !== 100) {
    confirmAlert('평가요소 비율의 합을 100%가 되도록 설정해주세요.')
  } else {
    console.log('send data')
  }
}

const handlePrint = () => {
  console.log('handlePrint')
}

const handleRedirect = () => {
  router.push({name: SCREEN.teachPlan.name})
}

//alert
const confirmAlert = (text) => {
  swal({
    text: text,
    type: "warning",
    showCancelButton: false,
    confirmButtonColor: '#DD6B55',
    confirmButtonText: '확인',
    cancelButtonText: "취소",
  })
}

</script>

<style scoped>
.td_custom {
  padding: 8px 12px;
  text-align: center;
  color: var(--tb-text--color);
  font-weight: 500;
  background-color: var(--tb-bg--color);
  border-right: 1px solid var(--tb-boder--color1);
  border-bottom: 1px solid var(--tb-boder--color2);
}

.table_child {
  padding: 0 !important;
}
</style>