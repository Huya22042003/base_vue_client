<template>
  <section id="content" class="content_wrapper grid_content" tabindex="0">
    <Breadcrumb
      :pageTitle="pageTitle"
      :breadcrumbItems="breadcrumbItems"
    ></Breadcrumb>

    <CollapseBase
      :isShow="openCollapse"
      :title="`강좌 정보`"
      :isCheck="true"
      :onClick="
        () => {
          openCollapse = !openCollapse;
        }
      "
      :mode="'custom'"
    >
      <div class="box_section">
        <table class="tbl_col">
          <caption>
            table col
          </caption>
          <colgroup>
            <col style="width: 14%" />
            <col style="width: 14%" />
            <col style="width: 14%" />
            <col style="width: 14%" />
            <col style="width: 14%" />
            <col style="width: 14%" />
            <col style="width: auto" />
          </colgroup>
          <thead>
            <tr>
              <th scope="col">
                {{ t("schoolStaff.teachPlan.detail.table1.subjectTitle") }}
              </th>
              <th scope="col">
                {{ t("schoolStaff.teachPlan.detail.table1.subjectCode") }}
              </th>
              <th scope="col">
                {{ t("schoolStaff.teachPlan.detail.table1.categories") }}
              </th>
              <th scope="col">
                {{ t("schoolStaff.teachPlan.detail.table1.point") }}
              </th>
              <th scope="col">
                {{ t("schoolStaff.teachPlan.detail.table1.actualPoint") }}
              </th>
              <th scope="col">
                {{ t("schoolStaff.teachPlan.detail.table1.professor") }}
              </th>
              <th scope="col">
                {{ t("schoolStaff.teachPlan.detail.table1.evaluationMethods") }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="sbjtInfo">
              <td>{{ sbjtInfo.sbjtNm }}</td>
              <td>{{ sbjtInfo.sbjtCd }}</td>
              <td>{{ sbjtInfo.sustDivNm }}</td>
              <td>{{ sbjtInfo.acqCredit }}</td>
              <td>{{ sbjtInfo.totalHrs }}</td>
              <td>{{ sbjtInfo.staffNm }}</td>
              <td>{{ sbjtInfo.gradeEvalMethNm }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="box_section mt_8">
        <table class="tbl_row">
          <caption>
            table col
          </caption>
          <colgroup>
            <col style="width: 15%" />
            <col style="width: auto" />
          </colgroup>
          <thead></thead>
          <tbody v-if="sbjtInfo">
            <tr>
              <th>
                {{ t("schoolStaff.teachPlan.detail.table2.typeClass1") }}
              </th>
              <td>
                {{ sbjtInfo.classType1 }}
              </td>
            </tr>
            <tr>
              <th>
                {{ t("schoolStaff.teachPlan.detail.table2.typeClass2") }}
              </th>
              <td>
                {{ sbjtInfo.classType2 }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="box_section mt_8">
        <table v-if="mode === 'major'" class="tbl_col">
          <caption>
            table col
          </caption>
          <colgroup>
            <col style="width: 15%" />
            <col style="width: 15%" />
            <col style="width: 15%" />
            <col style="width: 15%" />
            <col style="width: 15%" />
            <col style="width: auto" />
          </colgroup>
          <tbody>
            <tr class="td_custom">
              <td rowspan="3">
                {{ t("schoolStaff.teachPlan.detail.table3.majorCompetence") }}
              </td>
              <td>
                {{ t("schoolStaff.teachPlan.detail.table3.talentType") }}
              </td>
              <td>
                {{ t("schoolStaff.teachPlan.detail.table3.competence") }}
              </td>
              <td>
                {{ t("schoolStaff.teachPlan.detail.table3.subCompetence") }}
              </td>
              <td>
                {{ t("schoolStaff.teachPlan.detail.table3.components") }}
              </td>
              <td>
                {{
                  t("schoolStaff.teachPlan.detail.table3.behaviorIndicators")
                }}
              </td>
            </tr>
            <template
              v-if="abilityInfo"
              v-for="(item, index) in abilityInfo"
              :key="index"
            >
              <tr>
                <td>
                  {{ item.typeNm }}
                </td>
                <td>
                  {{ item.majorCapaNm }}
                </td>
                <td>
                  {{ item.chldCapaNm }}
                </td>
                <td>
                  {{ item.elemNm }}
                </td>
                <td>
                  {{ item.actnIndi }}
                </td>
              </tr>
            </template>
          </tbody>
        </table>
        <table v-else class="tbl_col">
          <caption>
            table col
          </caption>
          <colgroup>
            <col style="width: 15%" />
            <col style="width: 15%" />
            <col style="width: 15%" />
            <col style="width: 15%" />
            <col style="width: auto" />
          </colgroup>
          <tbody>
            <tr class="td_custom">
              <td rowspan="3">
                {{ t("schoolStaff.teachPlan.detail.table3.coreCompetence") }}
              </td>
              <td>
                {{
                  t("schoolStaff.teachPlan.detail.table3.coreCompetenceLabel")
                }}
              </td>
              <td>
                {{ t("schoolStaff.teachPlan.detail.table3.subCoreCompetence") }}
              </td>
              <td>
                {{ t("schoolStaff.teachPlan.detail.table3.components") }}
              </td>
              <td>
                {{
                  t("schoolStaff.teachPlan.detail.table3.behaviorIndicators")
                }}
              </td>
            </tr>
            <template v-for="(item, index) in dataProfile?.table3" :key="index">
              <tr>
                <td v-for="(row, rowIndex) in item.rowNum" :key="rowIndex">
                  {{ row.col }}
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>

      <div class="box_section mt_8">
        <table class="tbl_row">
          <caption>
            table col
          </caption>
          <colgroup>
            <col style="width: 15%" />
            <col style="width: auto" />
          </colgroup>
          <thead></thead>
          <tbody>
            <tr>
              <th>
                {{
                  t("schoolStaff.teachPlan.detail.table4.teachingPhilosophy")
                }}
              </th>
              <td>
                <TextArea
                  :id="'profEduPhil'"
                  v-model="dataTemporary.planDocDTO.profEduPhil"
                  required
                />
              </td>
            </tr>
            <tr>
              <th>
                {{ t("schoolStaff.teachPlan.detail.table4.courseSummary") }}
              </th>
              <td>
                <TextArea
                  :id="'sbjtOver'"
                  v-model="dataTemporary.planDocDTO.sbjtOver"
                  required
                />
              </td>
            </tr>
            <tr>
              <th>
                {{ t("schoolStaff.teachPlan.detail.table4.learningGoals") }}
              </th>
              <td>
                <TextArea
                  :id="'sbjtLearnGoal'"
                  v-model="dataTemporary.planDocDTO.sbjtLearnGoal"
                  required
                />
              </td>
            </tr>
            <tr>
              <th>
                {{ t("schoolStaff.teachPlan.detail.table4.prerequisites") }}
              </th>
              <td>
                <TextArea
                  :id="'priSubjKnow'"
                  v-model="dataTemporary.planDocDTO.priSubjKnow"
                  required
                />
              </td>
            </tr>
            <tr>
              <th>{{ t("schoolStaff.teachPlan.detail.table4.cqi") }}</th>
              <td>
                <TextArea
                  :id="'cqiApplyIssue'"
                  v-model="dataTemporary.planDocDTO.cqiApplyIssue"
                  required
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="box_section mt_8">
        <table class="tbl_row">
          <caption>
            table col
          </caption>
          <colgroup>
            <col style="width: 15%" />
            <col style="width: auto" />
          </colgroup>
          <thead></thead>
          <tbody>
            <tr>
              <th>
                {{ t("schoolStaff.teachPlan.detail.table5.teachingMethods") }}
              </th>
              <td v-if="mode === 'major'">
                <ListCheckBoxBase
                  :listData="listCheckBoxMajor"
                  :mode="'show'"
                  v-model="dataTemporary.planDocDTO.profLearnMeth"
                  :id="`checkBoxMarjorTb`"
                  :name="`checkBoxMarjorTb`"
                  ::hasCheckAll="false"
                  v-if="dataTemporary.planDocDTO.profLearnMeth && isUpdate"
                />
                <ListCheckBoxBase
                  :listData="listCheckBoxMajor"
                  :mode="'show'"
                  v-model="dataTemporary.planDocDTO.profLearnMeth"
                  :id="`checkBoxMarjorTb`"
                  :name="`checkBoxMarjorTb`"
                  ::hasCheckAll="false"
                  v-else
                />
                <InputBase
                  v-if="checkSelectBox"
                  v-model="dataTemporary.planDocDTO.profMethOther"
                />
              </td>
              <td v-else>
                <ListCheckBoxBase
                  :listData="listCheckBoxGeneral"
                  :mode="'show'"
                  v-model="dataTemporary.planDocDTO.profLearnMeth"
                  id="checkBoxGenarelTb"
                  name="checkBoxGenarelTb"
                  :hasCheckAll="false"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="box_section mt_8">
        <table class="tbl_row">
          <caption>
            table col
          </caption>
          <colgroup>
            <col style="width: 15%" />
            <col style="width: auto" />
          </colgroup>
          <thead></thead>
          <tbody>
            <tr>
              <th>
                {{ t("schoolStaff.teachPlan.detail.table6.exerciseContent") }}
              </th>
              <td>
                <TextArea
                  :id="'asgnCont'"
                  v-model="dataTemporary.planDocDTO.asgnCont"
                  required
                />
              </td>
            </tr>
            <tr>
              <th>
                {{ t("schoolStaff.teachPlan.detail.table6.feedbackMethod") }}
              </th>
              <td>
                <TextArea
                  :id="'asgnFeedMeth'"
                  v-model="dataTemporary.planDocDTO.asgnFeedMeth"
                  required
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="box_section mt_8">
        <table class="tbl_col">
          <caption>
            table col
          </caption>
          <colgroup>
            <col style="width: 15%" />
            <col style="width: auto" />
            <col style="width: 10%" />
          </colgroup>
          <thead>
            <tr>
              <th scope="col">
                {{ t("schoolStaff.teachPlan.detail.table7.assessmentElement") }}
              </th>
              <th scope="col">
                {{
                  t("schoolStaff.teachPlan.detail.table7.evaluationCriteria")
                }}
              </th>
              <th scope="col">
                {{ t("schoolStaff.teachPlan.detail.table7.ratio") }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {{ t("schoolStaff.teachPlan.detail.table7.attendance") }}
              </td>
              <td>
                <InputBase
                  :id="'evalStnrdMeth1'"
                  v-model="dataTemporary.lectEvalList.eval1.evalStnrdMeth"
                  required
                />
              </td>
              <td>20%</td>
            </tr>
            <tr v-if="mode === 'major'">
              <td>
                {{
                  t(
                    "schoolStaff.teachPlan.detail.table7.competencyBasedEvaluation"
                  )
                }}
              </td>
              <th class="table_child">
                <table class="tbl_col">
                  <caption>
                    table col
                  </caption>
                  <colgroup>
                    <col style="width: 10%" />
                    <col style="width: 10%" />
                    <col style="width: 10%" />
                    <col style="width: 10%" />
                    <col style="width: 10%" />
                    <col style="width: 10%" />
                    <col style="width: 10%" />
                    <col style="width: 10%" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th scope="col">
                        {{
                          t("schoolStaff.teachPlan.detail.table7.talentType")
                        }}
                      </th>
                      <th scope="col">
                        {{
                          t(
                            "schoolStaff.teachPlan.detail.table7.majorCompetency"
                          )
                        }}
                      </th>
                      <th scope="col">
                        {{
                          t("schoolStaff.teachPlan.detail.table7.subCompetency")
                        }}
                      </th>
                      <th scope="col">
                        {{ t("schoolStaff.teachPlan.detail.table7.component") }}
                      </th>
                      <th scope="col">
                        {{
                          t(
                            "schoolStaff.teachPlan.detail.table7.behaviorIndicator"
                          )
                        }}
                      </th>
                      <th scope="col">
                        {{
                          t(
                            "schoolStaff.teachPlan.detail.table7.achievementCriteria"
                          )
                        }}
                      </th>
                      <th scope="col">
                        {{
                          t(
                            "schoolStaff.teachPlan.detail.table7.evaluationMethod"
                          )
                        }}
                      </th>
                      <th scope="col">
                        {{ t("schoolStaff.teachPlan.detail.table7.weight") }}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <template v-for="(item, index) in abilityInfo" :key="index">
                      <tr>
                        <td>
                          {{ item.typeNm }}
                        </td>
                        <td>
                          {{ item.majorCapaNm }}
                        </td>
                        <td>
                          {{ item.chldCapaNm }}
                        </td>
                        <td>
                          {{ item.elemNm }}
                        </td>
                        <td>
                          {{ item.actnIndi }}
                        </td>
                        <td>
                          {{ item.lvlNm }}
                        </td>
                        <td>
                          <SelectBoxBase
                            :id="`selectbox_major_${index}`"
                            v-model="arrMethodEval[index]"
                            :data="listCheckBoxEval"
                            required
                          />
                        </td>
                        <td>
                          <SelectBoxBase
                            :id="`rate_${index}`"
                            :data="listCheckBoxRatio"
                            v-model="arrRate[index]"
                            required
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
              <td>
                {{
                  t(
                    "schoolStaff.teachPlan.detail.table7.competencyBasedEvaluation"
                  )
                }}
              </td>
              <th class="table_child">
                <table class="tbl_col">
                  <caption>
                    table col
                  </caption>
                  <colgroup>
                    <col style="width: 10%" />
                    <col style="width: 10%" />
                    <col style="width: 10%" />
                    <col style="width: 10%" />
                    <col style="width: 10%" />
                    <col style="width: 10%" />
                    <col style="width: 10%" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th scope="col">
                        {{
                          t(
                            "schoolStaff.teachPlan.detail.table7.coreCompetency"
                          )
                        }}
                      </th>
                      <th scope="col">
                        {{
                          t("schoolStaff.teachPlan.detail.table7.subCompetency")
                        }}
                      </th>
                      <th scope="col">
                        {{ t("schoolStaff.teachPlan.detail.table7.component") }}
                      </th>
                      <th scope="col">
                        {{
                          t(
                            "schoolStaff.teachPlan.detail.table7.behaviorIndicator"
                          )
                        }}
                      </th>
                      <th scope="col">
                        {{
                          t(
                            "schoolStaff.teachPlan.detail.table7.achievementCriteria"
                          )
                        }}
                      </th>
                      <th scope="col">
                        {{
                          t(
                            "schoolStaff.teachPlan.detail.table7.evaluationMethod"
                          )
                        }}
                      </th>
                      <th scope="col">
                        {{ t("schoolStaff.teachPlan.detail.table7.weight") }}
                      </th>
                    </tr>
                  </thead>
                </table>
              </th>
              <td>10%</td>
            </tr>
            <tr>
              <td>
                {{ t("schoolStaff.teachPlan.detail.table7.midtermExam") }}
              </td>
              <td>
                <InputBase
                  :id="'evalStnrdMeth2'"
                  v-model="dataTemporary.lectEvalList.eval2.evalStnrdMeth"
                  required
                />
              </td>
              <td>
                <SelectBoxBase
                  :id="'rate2'"
                  :data="listCheckBoxRatio"
                  v-model="dataTemporary.lectEvalList.eval2.rate"
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                {{ t("schoolStaff.teachPlan.detail.table7.finalExam") }}
              </td>
              <td>
                <InputBase
                  :id="'evalStnrdMet3'"
                  v-model="dataTemporary.lectEvalList.eval3.evalStnrdMeth"
                  required
                />
              </td>
              <td>
                <SelectBoxBase
                  :id="'rate3'"
                  :data="listCheckBoxRatio"
                  v-model="dataTemporary.lectEvalList.eval3.rate"
                  required
                />
              </td>
            </tr>
            <tr>
              <td>{{ t("schoolStaff.teachPlan.detail.table7.exercise") }}</td>
              <td>
                <InputBase
                  :id="'evalStnrdMeth4'"
                  v-model="dataTemporary.lectEvalList.eval4.evalStnrdMeth"
                  required
                />
              </td>
              <td>
                <SelectBoxBase
                  :id="'rate4'"
                  :data="listCheckBoxRatio"
                  v-model="dataTemporary.lectEvalList.eval4.rate"
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                {{ t("schoolStaff.teachPlan.detail.table7.additionalPoints") }}
              </td>
              <td>
                <InputBase
                  :id="'evalStnrdMeth5'"
                  v-model="dataTemporary.lectEvalList.eval5.evalStnrdMeth"
                  required
                />
              </td>
              <td>
                <SelectBoxBase
                  :id="'rate5'"
                  :data="listCheckBoxRatio"
                  v-model="dataTemporary.lectEvalList.eval5.rate"
                  required
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="box_section mt_8">
        <table class="tbl_col">
          <caption>
            table col
          </caption>
          <colgroup>
            <col style="width: 20%" />
            <col style="width: 20%" />
            <col style="width: 20%" />
            <col style="width: 20%" />
            <col style="width: 20%" />
          </colgroup>
          <thead>
            <tr>
              <th scope="col">
                {{ t("schoolStaff.teachPlan.detail.table8.type") }}
              </th>
              <th scope="col">
                {{ t("schoolStaff.teachPlan.detail.table8.textbookName") }}
              </th>
              <th scope="col">
                {{ t("schoolStaff.teachPlan.detail.table8.author") }}
              </th>
              <th scope="col">
                {{ t("schoolStaff.teachPlan.detail.table8.publisher") }}
              </th>
              <th scope="col">
                {{ t("schoolStaff.teachPlan.detail.table8.otherInput") }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {{ t("schoolStaff.teachPlan.detail.table8.mainTextbook") }}
              </td>
              <td>
                <InputBase
                  :id="'bookNm1'"
                  v-model="dataTemporary.lectBookList.mainTextbooks.bookNm"
                  required
                />
              </td>
              <td>
                <InputBase
                  :id="'auth1'"
                  v-model="dataTemporary.lectBookList.mainTextbooks.auth"
                  required
                />
              </td>
              <td>
                <InputBase
                  :id="'publ1'"
                  v-model="dataTemporary.lectBookList.mainTextbooks.publ"
                  required
                />
              </td>
              <td>
                <InputBase
                  :id="'etc1'"
                  v-model="dataTemporary.lectBookList.mainTextbooks.etc"
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                {{
                  t("schoolStaff.teachPlan.detail.table8.additionalTextbook")
                }}
              </td>
              <td>
                <InputBase
                  :id="'bookNm2'"
                  required
                  v-model="
                    dataTemporary.lectBookList.additionalTextbooks.bookNm
                  "
                />
              </td>
              <td>
                <InputBase
                  :id="'auth2'"
                  required
                  v-model="dataTemporary.lectBookList.additionalTextbooks.auth"
                />
              </td>
              <td>
                <InputBase
                  :id="'publ2'"
                  required
                  v-model="dataTemporary.lectBookList.additionalTextbooks.publ"
                />
              </td>
              <td>
                <InputBase
                  :id="'etc2'"
                  required
                  v-model="dataTemporary.lectBookList.additionalTextbooks.etc"
                />
              </td>
            </tr>
            <tr>
              <td>
                {{ t("schoolStaff.teachPlan.detail.table8.optionalClassics") }}
              </td>
              <td>
                <InputBase
                  :id="'bookNm3'"
                  required
                  v-model="dataTemporary.lectBookList.otherTextbook.bookNm"
                />
              </td>
              <td>
                <InputBase
                  :id="'auth3'"
                  required
                  v-model="dataTemporary.lectBookList.otherTextbook.auth"
                />
              </td>
              <td>
                <InputBase
                  :id="'publ3'"
                  required
                  v-model="dataTemporary.lectBookList.otherTextbook.publ"
                />
              </td>
              <td>
                <InputBase
                  :id="'etc3'"
                  required
                  v-model="dataTemporary.lectBookList.otherTextbook.etc"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="box_section mt_8">
        <table class="tbl_row">
          <caption>
            table col
          </caption>
          <colgroup>
            <col style="width: 15%" />
            <col style="width: auto" />
          </colgroup>
          <thead></thead>
          <tbody>
            <tr>
              <th>
                {{ t("schoolStaff.teachPlan.detail.table9.studentNote") }}
              </th>
              <td>
                <TextArea
                  :id="'userImprtIssue'"
                  required
                  v-model="dataTemporary.planDocDTO.userImprtIssue"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="box_section mt_8">
        <table class="tbl_col">
          <caption>
            {{
              t("schoolStaff.teachPlan.detail.tableSupport.classification")
            }}
          </caption>
          <colgroup>
            <col style="width: 15%" />
            <col style="width: auto" />
          </colgroup>
          <thead>
            <tr>
              <th scope="col">
                {{
                  t(
                    "schoolStaff.teachPlan.detail.tableSupport.classification.index"
                  )
                }}
              </th>
              <th scope="col">
                {{
                  t(
                    "schoolStaff.teachPlan.detail.tableSupport.supportContent.index"
                  )
                }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {{
                  t(
                    "schoolStaff.teachPlan.detail.tableSupport.classification.common"
                  )
                }}
              </td>
              <td>
                {{
                  t(
                    "schoolStaff.teachPlan.detail.tableSupport.supportContent.common"
                  )
                }}
              </td>
            </tr>
            <tr>
              <td>
                {{
                  t(
                    "schoolStaff.teachPlan.detail.tableSupport.classification.hearingImpairment"
                  )
                }}
              </td>
              <td>
                {{
                  t(
                    "schoolStaff.teachPlan.detail.tableSupport.supportContent.hearingImpairment"
                  )
                }}
              </td>
            </tr>
            <tr>
              <td>
                {{
                  t(
                    "schoolStaff.teachPlan.detail.tableSupport.classification.physicalDisability"
                  )
                }}
              </td>
              <td>
                {{
                  t(
                    "schoolStaff.teachPlan.detail.tableSupport.supportContent.physicalDisability"
                  )
                }}
              </td>
            </tr>
            <tr>
              <td>
                {{
                  t(
                    "schoolStaff.teachPlan.detail.tableSupport.classification.visualImpairment"
                  )
                }}
              </td>
              <td>
                {{
                  t(
                    "schoolStaff.teachPlan.detail.tableSupport.supportContent.visualImpairment"
                  )
                }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </CollapseBase>
    <template v-for="(i, index) in 16" :key="i">
      <CollapseBase
        v-if="weekValue[index]"
        :isShow="weekValue[index]?.openCollapse"
        :title="`주차 ${i}`"
        :isCheck="
          weekValue[index]?.classCont?.length > 0 &&
          weekValue[index]?.classMeth?.length > 0 &&
          weekValue[index]?.classOprtCd?.length > 0 &&
          weekValue[index]?.prepIssue?.length > 0
        "
        :onClick="
          () => {
            weekValue[index].openCollapse = !weekValue[index].openCollapse;
          }
        "
        :mode="'custom'"
      >
        <div class="box_section">
          <table class="tbl_row">
            <caption>
              {{
                t("schoolStaff.teachPlan.detail.week.caption")
              }}
            </caption>
            <colgroup>
              <col style="width: 15%" />
              <col style="width: auto" />
            </colgroup>
            <thead></thead>
            <tbody>
              <tr>
                <th>
                  {{ t("schoolStaff.teachPlan.detail.week.classContent") }}
                </th>
                <td>
                  <TextArea
                    :id="`classCont_${index}`"
                    required
                    v-model="weekValue[index]!.classCont"
                  />
                </td>
              </tr>
              <tr>
                <th>
                  {{ t("schoolStaff.teachPlan.detail.week.studyMethod") }}
                </th>
                <td>
                  <InputBase
                    :id="`classMeth_${index}`"
                    required
                    v-model="weekValue[index]!.classMeth"
                  />
                </td>
              </tr>
              <tr>
                <th>
                  {{ t("schoolStaff.teachPlan.detail.week.operate") }}
                </th>
                <td>
                  <RadiobuttonBase
                    v-for="item in listRadioWeek"
                    :mode="'show'"
                    :value="item.cdId"
                    v-model="weekValue[index]!.classOprtCd"
                    :id="`week_${item.cdId}_${i}`"
                    :name="`week_${item.cdId}_${i}`"
                    :key="item.cdId"
                    :checked="item.cdId == weekValue[index]!.classOprtCd"
                    :label="$t(item.cdNm)"
                  />
                </td>
              </tr>
              <tr>
                <th>
                  {{
                    t("schoolStaff.teachPlan.detail.week.preparationCategory")
                  }}
                </th>
                <td>
                  <InputBase
                    :id="`prepIssue_${index}`"
                    required
                    v-model="weekValue[index]!.prepIssue"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </CollapseBase>
    </template>

    <div class="btn_group btn_end">
      <button
        v-if="dataTemporary.planDocDTO.stsCd != '1'"
        type="button"
        class="button btn_xs btn_secondary btn_responsive"
        @click="handleSaveTemporarily"
      >
        {{ t("common.saveTemp") }}
      </button>
      <button
        type="button"
        class="button btn_xs btn_blue btn_responsive"
        @click="checkAllRequired"
      >
        {{ t("common.save") }}
      </button>
      <button
        type="button"
        class="button btn_xs btn_bo_primary btn_responsive"
        @click="handlePrint"
      >
        {{ t("common.print") }}
      </button>
      <button
        type="button"
        class="button btn_xs btn_white btn_responsive"
        @click="handleRedirect"
      >
        {{ t("common.list") }}
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import { computed, onMounted, onUpdated, ref } from "vue";
import { SCREEN } from "@/router/screen";
import { useRoute, useRouter } from "vue-router";
import CollapseBase from "@/components/common/collapse/CollapseBase.vue";
import TextArea from "@/components/common/input/TextArea.vue";
import ListCheckBoxBase from "@/components/common/input/ListCheckBoxBase.vue";
import InputBase from "@/components/common/input/InputBase.vue";
import SelectBoxBase from "@/components/common/input/SelectBoxBase.vue";
import RadiobuttonBase from "@/components/common/input/RadiobuttonBase.vue";
import type { CodeMngModel } from "@/stores/common/codeMng/codeMng.type";
import { useI18n } from "vue-i18n";

import { teachPlan } from "@/stores/planDoc";
import {MODE_SHOW, SUCCSESS_STATUS} from "@/constants/screen.const";
import { codeMngStore } from "@/stores/common/codeMng";
import { commonStore } from "@/stores/common";

import { getUserInfo } from "@/utils/storage";
import {
  AbilityMajor,
  EvalMethod,
  PlanDocRequest,
  ProfMethod,
  ProgPlan,
  SubjectInfo,
} from "@/stores/planDoc/planDoc.type";
import {
  EVAL_METHOD_1,
  EVAL_METHOD_2,
  EVAL_METHOD_3,
  EVAL_METHOD_4,
  EVAL_METHOD_5,
  BOOK_CD_1,
  BOOK_CD_2,
  BOOK_CD_3,
  STS_CD_SAVE,
  STS_CD_SAVE_TEMP,
  UP_CD_ID_DIRECT,
} from "@/constants/common.const";
import { createPlanDoc } from "@/stores/planDoc/planDoc.service";
import { CREATED_STATUS } from "@/constants/screen.const";
import { DIRECT_Y } from "@/constants/common.const";
import { STATUS_ADD } from "@/constants/common.const";

const router = useRouter();
const route = useRoute();
const swal = inject("$swal");
const { t } = useI18n();
const planStore = teachPlan();
const store = codeMngStore();
const storeCmm = commonStore();

const pageTitle = ref();
const mode = ref("");
const breadcrumbItems = ref([
  { label: t("common.home"), link: "/" },
  {
    label: t("schoolStaff.teachPlan.detail.pageTitleMj"),
    link: SCREEN.teachPlan.path,
  },
]);
const id = ref(null);
const idCollapse = ref("collapseTeachPlan");

//checkbox
const selectBoxValue = ref("");
const learnMethod = ref([]);

const listCheckBoxMajor = ref([
  {
    cdId: STATUS_ADD,
    cdNm: t("schoolStaff.teachPlan.detail.table5.other"),
    upCdId: "1",
  },
] as Array<any>);
const listRadioWeek = ref([]);
const listCheckBoxRatio = ref<CodeMngModel>([]);
const arrMethodEval = ref([] as Array<any>);
const arrRate = ref([] as Array<any>);
const lectPlanDocSeq = ref("");
const lectCd = ref("");
const userInfo = ref();
const userInfoNm = ref("");
//general data
const dataProfile = ref<DataProfile>();
onMounted(() => {
  userInfo.value = getUserInfo();
  userInfoNm.value = userInfo.value.userName;

  lectPlanDocSeq.value = window.history.state.lectPlanDocSeq;
  lectCd.value = window.history.state.lectCd;
  // mode.value = <string>route.params.type;
  // TODO
  mode.value = "major";
  pageTitle.value =
    route.params.type === "major"
      ? t("schoolStaff.teachPlan.detail.pageTitleMj")
      : t("schoolStaff.teachPlan.detail.pageTitleOutline");

  if (!lectCd.value) {
    router.replace({ name: SCREEN.home.name });
  }
  getInfoDisplay(lectCd.value);
  getCodeInfo();
  if (lectPlanDocSeq.value) {
    getDetailPlan();
  }

  weekValue.value = new Array(16).fill(null).map(
    (_, index) =>
      ({
        week: index + 1,
        classCont: "",
        classMeth: "",
        classOprtCd: "",
        prepIssue: "",
        openCollapse: false,
      }) as ProgPlan
  );

  //create listCheckBoxRatio
  for (let i = 5; i <= 100; i += 5) {
    listCheckBoxRatio.value.push({
      cdId: String(i),
      cdNm: `${i}%`,
      upCdId: "1",
    });
  }
});

const dataTemporary = ref<PlanDocRequest>({
  planDocDTO: {
    lectPlanDocSeq: "",
    profEduPhil: "",
    sbjtOver: "",
    sbjtLearnGoal: "",
    priSubjKnow: "",
    cqiApplyIssue: "",
    profLearnMeth: "",
    asgnCont: "",
    asgnFeedMeth: "",
    userImprtIssue: "",
    profMethOther: "",
    stsCd: "",
    lectCd: "",
  },
  lectEvalList: {
    eval1: {
      lectEvalStnrdSeq: "",
      evalElemCd: EVAL_METHOD_1,
      evalStnrdMeth: "",
      rate: 20,
    },
    eval2: {
      lectEvalStnrdSeq: "",
      evalElemCd: EVAL_METHOD_2,
      evalStnrdMeth: "",
      rate: 0,
    },
    eval3: {
      lectEvalStnrdSeq: "",
      evalElemCd: EVAL_METHOD_3,
      evalStnrdMeth: "",
      rate: 0,
    },
    eval4: {
      lectEvalStnrdSeq: "",
      evalElemCd: EVAL_METHOD_4,
      evalStnrdMeth: "",
      rate: 0,
    },
    eval5: {
      lectEvalStnrdSeq: "",
      evalElemCd: EVAL_METHOD_5,
      evalStnrdMeth: "",
      rate: 0,
    },
  },
  lectBookList: {
    mainTextbooks: {
      bookSeq: "",
      bookDivCd: BOOK_CD_1,
      bookNm: "",
      auth: "",
      publ: "",
      etc: "",
    },
    additionalTextbooks: {
      bookSeq: "",
      bookDivCd: BOOK_CD_2,
      bookNm: "",
      auth: "",
      publ: "",
      etc: "",
    },
    otherTextbook: {
      bookSeq: "",
      bookDivCd: BOOK_CD_3,
      bookNm: "",
      auth: "",
      publ: "",
      etc: "",
    },
  },
  progPlanList: [
    {
      classProgPlanSeq: "",
      week: 0,
      classCont: "",
      classMeth: "",
      classOprtCd: "",
      prepIssue: "",
    },
  ],
  lectEvalLearnList: [
    {
      lectEvalLearnSeq: "",
      evalMethodSeq: "",
      rate: 0,
      itemSeq: "",
      lectPlanDocSeq: "",
    },
  ],
});
//create listCheckBoxRatio
for (let i = 5; i <= 100; i += 5) {
  listCheckBoxRatio.value.push({ cdId: String(i), cdNm: `${i}%`, upCdId: "1" });
}

//collapse
const weekValue = ref<ProgPlan[]>([]);
const newList = ref<ProgPlan[]>([]);
const profList = ref<ProfMethod[]>([]);
const sbjtInfo = ref<SubjectInfo>();
const abilityInfo = ref<AbilityMajor[]>([]);
const profMethAbi = ref<ProfMethod[]>([]);
const listCheckBoxEval = ref([] as Array<any>);

const openCollapse = ref(true);
const checkRequired = ref();

// computed;
const checkSelectBox = computed(() => {
  if (dataTemporary.value.planDocDTO.profLearnMeth) {
    if (isUpdate.value) {
      return dataTemporary.value.planDocDTO.profLearnMeth.includes(STATUS_ADD);
    } else {
      return dataTemporary.value.planDocDTO.profLearnMeth.includes(
        listCheckBoxMajor.value[listCheckBoxMajor.value.length - 1].cdId
      );
    }
  }
});

const getInfoDisplay = async (lectCd: string) => {
  storeCmm.setLoading(true);

  await planStore.fetchProf({ lectCd: lectCd });

  if (planStore.status && planStore.status == SUCCSESS_STATUS) {
    profList.value = planStore.profListSt.profLearnList;
    sbjtInfo.value = planStore.profListSt.subjectInfo;
    abilityInfo.value = planStore.profListSt.abilityMajor;
    profMethAbi.value = planStore.profListSt.methResponseList;

    if (profList.value.length > 0) {
      profList.value.forEach((item) => {
        let prof = {} as CodeMngModel;
        prof.cdId = item.profLearnMethSeq;
        prof.cdNm = item.methNm;

        listCheckBoxMajor.value.push(prof);
      });
    }
    const firstProf = listCheckBoxMajor.value.shift();
    listCheckBoxMajor.value.push(firstProf);

    if (profMethAbi.value.length > 0) {
      profMethAbi.value.forEach((item) => {
        let meth = {} as CodeMngModel;
        meth.cdId = item.profLearnMethSeq;
        meth.cdNm = item.methNm;

        listCheckBoxEval.value.push(meth);
      });
    }
    storeCmm.setLoading(false);
  }
};

const getCodeInfo = async () => {
  const codeMng = {
    upCdId: UP_CD_ID_DIRECT,
  };

  await store.getCodeInfo(codeMng);
  if (store.status == SUCCSESS_STATUS) {
    listRadioWeek.value = store.codeInfo.data;
  }
};

const isUpdate = ref(false);
const getDetailPlan = async () => {
  storeCmm.setLoading(true);
  await planStore.fetchDetail({ lectPlanDocSeq: lectPlanDocSeq.value });
  if (planStore.status == SUCCSESS_STATUS) {
    isUpdate.value = true;
    dataTemporary.value = planStore.profDetail;
    weekValue.value = dataTemporary.value.progPlanList;

    if (dataTemporary.value.lectEvalLearnList.length > 0) {
      dataTemporary.value.lectEvalLearnList.forEach((item, index) => {
        arrMethodEval.value[index] = item.evalMethodSeq;
        arrRate.value[index] = item.rate;
      });
    }

    if (dataTemporary.value.planDocDTO.profMethOther != null) {
      dataTemporary.value.planDocDTO.profLearnMeth += "," + STATUS_ADD;
    }
    storeCmm.setLoading(false);
  }
};

const arr = ref([] as Array<EvalMethod>);
const handleSaveTemporarily = () => {
  swal({
    text: t("schoolStaff.teachPlan.detail.alert.saveTemp"),
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: t("common.confirm"),
    cancelButtonText: t("common.cancel"),
  }).then((result: any) => {
    if (result.isConfirmed) {
      onSave(STS_CD_SAVE_TEMP);
    }
  });
};

const onSave = (type: string) => {
  storeCmm.setLoading(true);
  weekValue.value.forEach((item) => {
    const { openCollapse, ...rest } = item;
    newList.value.push(rest);
  });

  arr.value = [];
  arrMethodEval.value.forEach((item, index) => {
    if (!arr.value[index]) {
      arr.value[index] = {
        evalMethodSeq: null,
        rate: null,
        itemSeq: null,
        lectEvalLearnSeq: null,
      };
    }

    arr.value[index].evalMethodSeq = item;
    arr.value[index].rate = arrRate.value[index];
    arr.value[index].lectEvalLearnSeq =
      dataTemporary.value.lectEvalLearnList[index].lectEvalLearnSeq;

    if (abilityInfo.value[index]) {
      arr.value[index].itemSeq = abilityInfo.value[index].itemSeq;
    }
  });

  dataTemporary.value.progPlanList = newList.value;

  if (dataTemporary.value.planDocDTO.profLearnMeth) {
    learnMethod.value = dataTemporary.value.planDocDTO.profLearnMeth;
    if (typeof learnMethod.value === "string") {
      learnMethod.value = learnMethod.value.split(",");
    }

    const index = learnMethod.value.indexOf(STATUS_ADD);

    if (index !== -1) {
      learnMethod.value.splice(index, 1);
    } else {
      dataTemporary.value.planDocDTO.profMethOther = "";
    }

    dataTemporary.value.planDocDTO.profLearnMeth = learnMethod.value.join(",");
  }

  dataTemporary.value.planDocDTO.lectCd = lectCd.value;

  dataTemporary.value.lectEvalLearnList = arr.value;
  dataTemporary.value.planDocDTO.stsCd = type;

  createPlanDoc(dataTemporary.value).then((res) => {
    if (res.status && res.status == CREATED_STATUS) {
      storeCmm.setLoading(false);
      if (type == STS_CD_SAVE_TEMP) {
        confirmAlert(t("schoolStaff.teachPlan.detail.alert.saveTempSuccess"));
      } else {
        confirmAlert(t("schoolStaff.teachPlan.detail.alert.saveSuccess"));
      }
    }
  });
};

const checkAllRequired = () => {
  if (storeCmm.check) {
    swal({
      text: t("common.messageValidateRequired"),
      type: "warning",
      showCancelButton: false,
      confirmButtonText: t("common.confirm"),
    });
  } else {
    handleSave();
  }
};
const handleSave = () => {
  swal({
    text: t("schoolStaff.teachPlan.detail.alert.save"),
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: t("common.confirm"),
    cancelButtonText: t("common.cancel"),
  }).then((result: any) => {
    if (result.isConfirmed) {
      const totalSelectBoxValue =
        30 +
        parseInt(dataTemporary.value.lectEvalList.eval2.rate) +
        parseInt(dataTemporary.value.lectEvalList.eval3.rate) +
        parseInt(dataTemporary.value.lectEvalList.eval4.rate) +
        parseInt(dataTemporary.value.lectEvalList.eval5.rate);

      if (totalSelectBoxValue !== 100) {
        return confirmAlert(t("schoolStaff.teachPlan.detail.alert.total100"));
      }

      onSave(STS_CD_SAVE);
    }
  });
};

const handlePrint = () => {};

const handleRedirect = () => {
  router.push({ name: SCREEN.teachPlan.name });
};

//alert
const confirmAlert = (text) => {
  swal({
    text: text,
    type: "warning",
    showCancelButton: false,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: t("common.confirm"),
    cancelButtonText: t("common.cancel"),
  }).then((result: any) => {
    if (result.isConfirmed) {
      handleRedirect();
    }
  });
};
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
