<template>
  <!-- Table1 -->
  <div class="section_tit_wrap">
    <h4 class="section_tit_xs">{{ t("majorTab1.table1.title") }}</h4>
  </div>
  <div class="tbl tbl_col">
    <table>
      <caption>
        {{
          t("majorTab1.table1.caption")
        }}
      </caption>
      <colgroup>
        <col style="width: 9%" />
        <col style="width: 9%" />
        <col style="width: 9%" />
        <col style="width: 9%" />
        <col style="width: 9%" />
        <col style="width: 9%" />
        <col style="width: 9%" />
        <col style="width: 9%" />
        <col style="width: 9%" />
        <col style="width: 9%" />
        <col style="width: 9%" />
      </colgroup>
      <thead>
        <tr>
          <th scope="rowgroup" rowspan="2">
            {{ t("majorTab1.table1.header1") }}
          </th>
          <th scope="colgroup" colspan="3">
            {{ t("majorTab1.table1.header2") }}
          </th>
          <th scope="colgroup" colspan="3">
            {{ t("majorTab1.table1.header3") }}
          </th>
          <th scope="colgroup" colspan="3">
            {{ t("majorTab1.table1.header4") }}
          </th>
          <th scope="rowgroup" rowspan="2">
            {{ t("majorTab1.table1.header5") }}
          </th>
        </tr>
        <tr>
          <th scope="col">{{ t("majorTab1.table1.subHeader1") }}</th>
          <th scope="col">{{ t("majorTab1.table1.subHeader2") }}</th>
          <th scope="col">{{ t("majorTab1.table1.subHeader3") }}</th>
          <th scope="col">{{ t("majorTab1.table1.subHeader4") }}</th>
          <th scope="col">{{ t("majorTab1.table1.subHeader5") }}</th>
          <th scope="col">{{ t("majorTab1.table1.subHeader6") }}</th>
          <th scope="col">{{ t("majorTab1.table1.subHeader7") }}</th>
          <th scope="col">{{ t("majorTab1.table1.subHeader8") }}</th>
          <th scope="col">{{ t("majorTab1.table1.subHeader9") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">{{ t("majorTab1.table1.text1") }}</th>
          <th scope="row">
            <InputBase
              :isNumber="true"
              v-model="dataStudentMng.inStudySemester1.state"
              id="inStudySemester1"
              required
            />
          </th>
          <th scope="row">
            <InputBase
              :isNumber="true"
              v-model="dataStudentMng.outStudySemester1.state"
              id="outStudySemester1"
              required
            />
          </th>
          <th scope="row">
            <InputBase
              :isNumber="true"
              :value="
                totalSumState([
                  dataStudentMng.inStudySemester1.state,
                  dataStudentMng.outStudySemester1.state,
                ])
              "
              id="sumStudySemester"
              readonly
            />
          </th>
          <th scope="row">
            <InputBase
              :isNumber="true"
              v-model="dataStudentMng.inLeaveSemester1.state"
              id="inLeaveSemester1"
              required
            />
          </th>
          <th scope="row">
            <InputBase
              :isNumber="true"
              v-model="dataStudentMng.outLeaveSemester1.state"
              id="outLeaveSemester1"
              required
            />
          </th>
          <th scope="row">
            <InputBase
              :isNumber="true"
              :value="
                totalSumState([
                  dataStudentMng.inLeaveSemester1.state,
                  dataStudentMng.outLeaveSemester1.state,
                ])
              "
              id="sumLeaveSemester"
              readonly
            />
          </th>
          <th scope="row">
            <InputBase
              :isNumber="true"
              v-model="dataStudentMng.inRegistSemester1.state"
              id="inRegistSemester1"
              required
            />
          </th>
          <th scope="row">
            <InputBase
              :isNumber="true"
              v-model="dataStudentMng.outRegistSemester1.state"
              id="outRegistSemester1"
              required
            />
          </th>
          <th scope="row">
            <InputBase
              :isNumber="true"
              :value="
                totalSumState([
                  dataStudentMng.inRegistSemester1.state,
                  dataStudentMng.outRegistSemester1.state,
                ])
              "
              id="sumRegistSemester"
              readonly
            />
          </th>
          <th scope="row">
            <InputBase
              :isNumber="true"
              :value="
                percentState(
                  totalSumState([
                    dataStudentMng.inStudySemester1.state,
                    dataStudentMng.outStudySemester1.state,
                  ]),
                  totalSumState([
                    dataStudentMng.inRegistSemester1.state,
                    dataStudentMng.outRegistSemester1.state,
                  ])
                )
              "
              id="avgSemester1"
              readonly
            />
          </th>
        </tr>
        <tr>
          <th scope="row">{{ t("majorTab1.table1.text2") }}</th>
          <th scope="row">
            <InputBase
              :isNumber="true"
              v-model="dataStudentMng.inStudySemester2.state"
              id="inStudySemester2"
              required
            />
          </th>
          <th scope="row">
            <InputBase
              :isNumber="true"
              v-model="dataStudentMng.outStudySemester2.state"
              id="outStudySemester2"
              required
            />
          </th>
          <th scope="row">
            <InputBase
              :isNumber="true"
              :value="
                totalSumState([
                  dataStudentMng.inStudySemester2.state,
                  dataStudentMng.outStudySemester2.state,
                ])
              "
              id="sumStudySemester"
              readonly
            />
          </th>
          <th scope="row">
            <InputBase
              :isNumber="true"
              v-model="dataStudentMng.inLeaveSemester2.state"
              id="inLeaveSemester2"
              required
            />
          </th>
          <th scope="row">
            <InputBase
              :isNumber="true"
              v-model="dataStudentMng.outLeaveSemester2.state"
              id="outLeaveSemester2"
              required
            />
          </th>
          <th scope="row">
            <InputBase
              :isNumber="true"
              :value="
                totalSumState([
                  dataStudentMng.inLeaveSemester2.state,
                  dataStudentMng.outLeaveSemester2.state,
                ])
              "
              id="sumLeaveSemester"
              readonly
            />
          </th>
          <th scope="row">
            <InputBase
              :isNumber="true"
              v-model="dataStudentMng.inRegistSemester2.state"
              id="inRegistSemester2"
              required
            />
          </th>
          <th scope="row">
            <InputBase
              :isNumber="true"
              v-model="dataStudentMng.outRegistSemester2.state"
              id="outRegistSemester2"
              required
            />
          </th>
          <th scope="row">
            <InputBase
              :isNumber="true"
              :value="
                totalSumState([
                  dataStudentMng.inRegistSemester2.state,
                  dataStudentMng.outRegistSemester2.state,
                ])
              "
              id="sumRegistSemester"
              readonly
            />
          </th>
          <th scope="row">
            <InputBase
              :isNumber="true"
              :value="
                percentState(
                  totalSumState([
                    dataStudentMng.inStudySemester2.state,
                    dataStudentMng.outStudySemester2.state,
                  ]),
                  totalSumState([
                    dataStudentMng.inRegistSemester2.state,
                    dataStudentMng.outRegistSemester2.state,
                  ])
                )
              "
              id="avgSemester2"
              readonly
            />
          </th>
        </tr>
        <tr>
          <th scope="row">{{ t("majorTab1.table1.text3") }}</th>
          <th scope="row">
            <InputBase
              :isNumber="true"
              :value="
                avgState(
                  dataStudentMng.inStudySemester1.state,
                  dataStudentMng.inStudySemester2.state
                )
              "
              id="avgInStudySemester"
              readonly
            />
          </th>
          <th scope="row">
            <InputBase
              :isNumber="true"
              :value="
                avgState(
                  dataStudentMng.outStudySemester1.state,
                  dataStudentMng.outStudySemester2.state
                )
              "
              id="avgOutStudySemester"
              readonly
            />
          </th>
          <th scope="row">
            <InputBase
              :isNumber="true"
              :value="
                avgState(
                  totalSumState([
                    dataStudentMng.inStudySemester1.state,
                    dataStudentMng.outStudySemester1.state,
                  ]),
                  totalSumState([
                    dataStudentMng.inStudySemester2.state,
                    dataStudentMng.outStudySemester2.state,
                  ])
                )
              "
              id="avgTotalStudySemester"
              readonly
            />
          </th>
          <th scope="row">
            <InputBase
              :isNumber="true"
              :value="
                avgState(
                  dataStudentMng.inLeaveSemester1.state,
                  dataStudentMng.inLeaveSemester2.state
                )
              "
              id="avgInLeaveSemester"
              readonly
            />
          </th>
          <th scope="row">
            <InputBase
              :isNumber="true"
              :value="
                avgState(
                  dataStudentMng.outLeaveSemester1.state,
                  dataStudentMng.outLeaveSemester2.state
                )
              "
              id="avgOutLeaveSemester"
              readonly
            />
          </th>
          <th scope="row">
            <InputBase
              :isNumber="true"
              :value="
                avgState(
                  totalSumState([
                    dataStudentMng.inLeaveSemester1.state,
                    dataStudentMng.outLeaveSemester1.state,
                  ]),
                  totalSumState([
                    dataStudentMng.inLeaveSemester2.state,
                    dataStudentMng.outLeaveSemester2.state,
                  ])
                )
              "
              id="avgTotalLeaveSemester"
              readonly
            />
          </th>
          <th scope="row">
            <InputBase
              :isNumber="true"
              :value="
                avgState(
                  dataStudentMng.inRegistSemester1.state,
                  dataStudentMng.inRegistSemester2.state
                )
              "
              id="avgStudySemester"
              readonly
            />
          </th>
          <th scope="row">
            <InputBase
              :isNumber="true"
              :value="
                avgState(
                  dataStudentMng.outRegistSemester1.state,
                  dataStudentMng.outRegistSemester2.state
                )
              "
              id="avgStudySemester"
              readonly
            />
          </th>
          <th scope="row">
            <InputBase
              :isNumber="true"
              :value="
                avgState(
                  totalSumState([
                    dataStudentMng.inRegistSemester1.state,
                    dataStudentMng.inRegistSemester2.state,
                  ]),
                  totalSumState([
                    dataStudentMng.outRegistSemester1.state,
                    dataStudentMng.outRegistSemester2.state,
                  ])
                )
              "
              id="avgTotalLeaveSemester"
              readonly
            />
          </th>
          <th scope="row">
            <InputBase
              :isNumber="true"
              :value="
                percentState(
                  avgState(
                    totalSumState([
                      dataStudentMng.inLeaveSemester1.state,
                      dataStudentMng.outLeaveSemester1.state,
                    ]),
                    totalSumState([
                      dataStudentMng.inLeaveSemester2.state,
                      dataStudentMng.outLeaveSemester2.state,
                    ])
                  ),
                  avgState(
                    totalSumState([
                      dataStudentMng.inRegistSemester1.state,
                      dataStudentMng.inRegistSemester2.state,
                    ]),
                    totalSumState([
                      dataStudentMng.outRegistSemester1.state,
                      dataStudentMng.outRegistSemester2.state,
                    ])
                  )
                )
              "
              id="avgTotalSemester"
              readonly
            />
          </th>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Table2 -->
  <div class="section_tit_wrap mt_8">
    <h4 class="section_tit_xs">{{ t("majorTab1.table2.title") }}</h4>
  </div>
  <div class="tbl tbl_col">
    <table>
      <caption>
        {{
          t("majorTab1.table2.caption")
        }}
      </caption>
      <colgroup>
        <col style="width: 10%" />
        <col style="width: auto" />
        <col style="width: 8%" />
        <col style="width: 8%" />
        <col style="width: 8%" />
        <col style="width: 8%" />
        <col style="width: auto" />
        <col style="width: 8%" />
        <col style="width: 8%" />
        <col style="width: 8%" />
        <col style="width: 8%" />
        <col style="width: auto" />
      </colgroup>
      <thead>
        <tr>
          <th scope="row" rowspan="2">{{ t("majorTab1.table2.header1") }}</th>
          <th scope="row" rowspan="2">{{ t("majorTab1.table2.header2") }}</th>
          <th scope="col" colspan="4">{{ t("majorTab1.table2.header3") }}</th>
          <th scope="row" rowspan="2">{{ t("majorTab1.table2.header4") }}</th>
          <th scope="col" colspan="4">{{ t("majorTab1.table2.header5") }}</th>
          <th scope="col" rowspan="2">{{ t("majorTab1.table2.header6") }}</th>
        </tr>
        <tr>
          <th scope="col">{{ t("majorTab1.table2.subHeader1") }}</th>
          <th scope="col">{{ t("majorTab1.table2.subHeader2") }}</th>
          <th scope="col">{{ t("majorTab1.table2.subHeader3") }}</th>
          <th scope="col">{{ t("majorTab1.table2.subHeader4") }}</th>
          <th scope="col">{{ t("majorTab1.table2.subHeader5") }}</th>
          <th scope="col">{{ t("majorTab1.table2.subHeader6") }}</th>
          <th scope="col">{{ t("majorTab1.table2.subHeader7") }}</th>
          <th scope="col">{{ t("majorTab1.table2.subHeader8") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">{{ deptNm }}</th>
          <th scope="row">
            <InputBase
              :isNumber="true"
              v-model="dataProfMng.totalStudentStudy.state"
              id="totalStudentStudy"
              required
            />
          </th>
          <th scope="row">
            <InputBase
              :isNumber="true"
              v-model="dataProfMng.totalProfStudy.state"
              id="totalProfStudy"
              required
            />
          </th>
          <th scope="row">
            <InputBase
              :isNumber="true"
              v-model="dataProfMng.totalSpProfStudy.state"
              id="totalSpProfStudy"
              required
            />
          </th>
          <th scope="row">
            <InputBase
              :isNumber="true"
              v-model="dataProfMng.totalAssStudy.state"
              id="totalAssStudy"
              required
            />
          </th>
          <th scope="row">
            <InputBase
              :isNumber="true"
              :value="
                totalSumState([
                  dataProfMng.totalProfStudy.state,
                  dataProfMng.totalSpProfStudy.state,
                  dataProfMng.totalAssStudy.state,
                ])
              "
              id="totalSumStateStudent"
              readonly
            />
          </th>
          <th scope="row">
            <InputBase
              :isNumber="true"
              v-model="dataProfMng.totalStudentProf.state"
              id="totalStudentProf"
              required
            />
          </th>
          <th scope="row">
            <InputBase
              :isNumber="true"
              v-model="dataProfMng.totalStaffNoProf.state"
              id="totalStaffNoProf"
              required
            />
          </th>
          <th scope="row">
            <InputBase
              :isNumber="true"
              v-model="dataProfMng.totalProfClient.state"
              id="totalProfClient"
              required
            />
          </th>
          <th scope="row">
            <InputBase
              :isNumber="true"
              v-model="dataProfMng.totalHourProf.state"
              id="totalHourProf"
              required
            />
          </th>
          <th scope="row">
            <InputBase
              :isNumber="true"
              v-model="dataProfMng.totalOther.state"
              id="totalOther"
              required
            />
          </th>
          <th scope="row">
            <InputBase
              :isNumber="true"
              :value="
                totalSumState([
                  dataProfMng.totalStudentStudy.state,
                  dataProfMng.totalProfStudy.state,
                  dataProfMng.totalSpProfStudy.state,
                  dataProfMng.totalAssStudy.state,
                  dataProfMng.totalStudentProf.state,
                  dataProfMng.totalStaffNoProf.state,
                  dataProfMng.totalProfClient.state,
                  dataProfMng.totalHourProf.state,
                  dataProfMng.totalOther.state,
                ])
              "
              id="totalSumStateProf"
              readonly
            />
          </th>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Table3 -->
  <div class="section_tit_wrap mt_8">
    <h4 class="section_tit_xs">{{ t("majorTab1.table3.title") }}</h4>
  </div>
  <div class="tbl tbl_row">
    <table>
      <caption>
        {{
          t("majorTab1.table3.caption")
        }}
      </caption>
      <colgroup>
        <col style="width: 22%" />
        <col style="width: auto" />
      </colgroup>
      <tbody>
        <tr>
          <th scope="row">{{ t("majorTab1.table3.title") }}</th>
          <td>
            <ul class="list_ul">
              <li>{{ t("majorTab1.table3.content1") }}</li>
              <li>{{ t("majorTab1.table3.content2") }}</li>
              <li>{{ t("majorTab1.table3.content3") }}</li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Table4 -->
  <div class="section_tit_wrap mt_8">
    <h4 class="section_tit_xs">{{ t("majorTab1.table4.title") }}</h4>
  </div>

  <div class="box_section">
    <div class="dp_flex between al_center box_title_sm">
      <p class="section_tit_xxs">
        {{ t("majorTab1.table4.item1.internalTitle") }}
      </p>
      <button
        class="button btn_primary btn_lg"
        @click="handleAddTable('Table')"
      >
        {{ t("common.add") }}
      </button>
    </div>
    <div class="tbl tbl_col">
      <table>
        <caption>
          {{
            t("majorTab1.table4.item1.caption")
          }}
        </caption>
        <colgroup>
          <col style="width: 17%" />
          <col style="width: 17%" />
          <col style="width: 17%" />
          <col style="width: 17%" />
          <col style="width: 17%" />
          <col style="width: auto" />
        </colgroup>
        <thead>
          <tr>
            <th scope="row">{{ t("majorTab1.table4.item1.header1") }}</th>
            <th scope="row">{{ t("majorTab1.table4.item1.header2") }}</th>
            <th scope="row">{{ t("majorTab1.table4.item1.header3") }}</th>
            <th scope="row">{{ t("majorTab1.table4.item1.header4") }}</th>
            <th scope="row">{{ t("majorTab1.table4.item1.header5") }}</th>
            <th scope="row">{{ t("majorTab1.table4.item1.header6") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-if="table4Internal.length"
            v-for="(item, index) in table4Internal"
            :key="item.id"
          >
            <td>
              <div class="dp_flex">
                <InputBase
                  v-model="item.value1"
                  :id="`table4Internal_1_${item.id}`"
                  readonly
                />
                <div class="wd_150">
                  <button
                    class="button btn_sm btn_white"
                    @click="openModal(index)"
                  >
                    {{ t("common.delete") }}
                  </button>
                </div>
              </div>
            </td>
            <td>
              <InputBase
                v-model="item.value2"
                :id="`table4Internal_2_${item.id}`"
                readonly
              />
            </td>
            <td>
              <InputBase
                v-model="item.value3"
                :id="`table4Internal_3_${item.id}`"
                readonly
              />
            </td>
            <td>
              <InputBase
                v-model="item.value4"
                :id="`table4Internal_4_${item.id}`"
                readonly
              />
            </td>
            <td>
              <InputBase
                v-model="item.value5"
                :id="`table4Internal_5_${item.id}`"
                required
              />
            </td>
            <td>
              <button
                class="button btn_sm btn_white"
                @click="handleDeleteItem('TableInternal', item.id)"
              >
                {{ t("common.delete") }}
              </button>
            </td>
          </tr>
          <tr v-else>
            <td colspan="6">{{ t("majorTab1.table4.item1.emptyMessage") }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="dp_flex between al_center box_title_sm mt-5">
      <p class="section_tit_xxs mt_8">
        {{ t("majorTab1.table4.item2.companyTitle") }}
      </p>
      <button
        class="button btn_primary btn_lg"
        @click="handleAddTable('TableCompany')"
      >
        {{ t("common.add") }}
      </button>
    </div>
    <div class="tbl tbl_col">
      <table>
        <caption>
          {{
            t("majorTab1.table4.item2.caption")
          }}
        </caption>
        <colgroup>
          <col style="width: 17%" />
          <col style="width: 17%" />
          <col style="width: 17%" />
          <col style="width: 17%" />
          <col style="width: 17%" />
          <col style="width: auto" />
        </colgroup>
        <thead>
          <tr>
            <th scope="row">{{ t("majorTab1.table4.item2.header1") }}</th>
            <th scope="row">{{ t("majorTab1.table4.item2.header2") }}</th>
            <th scope="row">{{ t("majorTab1.table4.item2.header3") }}</th>
            <th scope="row">{{ t("majorTab1.table4.item2.header4") }}</th>
            <th scope="row">{{ t("majorTab1.table4.item2.header5") }}</th>
            <th scope="row">{{ t("majorTab1.table4.item2.header6") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-if="table4Company.length"
            v-for="(item, index) in table4Company"
            :key="item.id"
          >
            <td>
              <InputBase
                v-model="item.value1"
                :id="`table4Company_1_${item.id}`"
                required
              />
            </td>
            <td>
              <InputBase
                v-model="item.value2"
                :id="`table4Company_2_${item.id}`"
                required
              />
            </td>
            <td>
              <InputBase
                v-model="item.value3"
                :id="`table4Company_3_${item.id}`"
                required
              />
            </td>
            <td>
              <InputBase
                v-model="item.value4"
                :id="`table4Company_4_${item.id}`"
                required
              />
            </td>
            <td>
              <InputBase
                v-model="item.value5"
                :id="`table4Company_5_${item.id}`"
                required
              />
            </td>
            <td>
              <button
                class="button btn_md btn_white"
                @click="handleDeleteItem('TableCompany', item.id)"
              >
                {{ t("common.delete") }}
              </button>
            </td>
          </tr>
          <tr v-else>
            <td colspan="6">{{ t("majorTab1.table4.item2.emptyMessage") }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Table5 -->
  <div class="section_tit_wrap mt_8">
    <h4 class="section_tit_xs">{{ t("majorTab1.table5.title") }}</h4>
  </div>
  <div class="tbl tbl_col">
    <table>
      <caption>
        {{
          t("majorTab1.table5.caption")
        }}
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
          <th scope="row">{{ t("majorTab1.table5.header1") }}</th>
          <th scope="row">{{ t("majorTab1.table5.header2") }}</th>
          <th scope="row">{{ t("majorTab1.table5.header3") }}</th>
          <th scope="row">{{ t("majorTab1.table5.header4") }}</th>
          <th scope="row">{{ t("majorTab1.table5.header5") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>{{ t("majorTab1.table5.contentHeader1") }}</th>
          <td>
            <ul class="list_ul">
              <li>{{ t("majorTab1.table5.content1_1") }}</li>
              <li>{{ t("majorTab1.table5.content1_2") }}</li>
              <li>{{ t("majorTab1.table5.content1_3") }}</li>
            </ul>
          </td>
          <td>
            <ul class="list_ul">
              <li>{{ t("majorTab1.table5.content2_1") }}</li>
              <li>{{ t("majorTab1.table5.content2_2") }}</li>
              <li>{{ t("majorTab1.table5.content2_3") }}</li>
              <li>{{ t("majorTab1.table5.content2_4") }}</li>
              <li>{{ t("majorTab1.table5.content2_5") }}</li>
              <li>{{ t("majorTab1.table5.content2_6") }}</li>
            </ul>
          </td>
          <td>
            <ul class="list_ul">
              <li>{{ t("majorTab1.table5.content3_1") }}</li>
              <li>{{ t("majorTab1.table5.content3_2") }}</li>
            </ul>
          </td>
          <td>
            <ul class="list_ul">
              <li>{{ t("majorTab1.table5.content4_1") }}</li>
            </ul>
          </td>
        </tr>
        <tr>
          <th>{{ t("majorTab1.table5.contentHeader2") }}</th>
          <td>{{ t("majorTab1.table5.content5_1") }}</td>
          <td>{{ t("majorTab1.table5.content5_2") }}</td>
          <td>{{ t("majorTab1.table5.content5_3") }}</td>
          <td>
            {{ t("majorTab1.table5.content5_4") }}
            <br />
            {{ t("majorTab1.table5.subContent5_4") }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Table6 -->
  <div class="section_tit_wrap mt_8">
    <h4 class="section_tit_xs">{{ t("majorTab1.table6.title") }}</h4>
  </div>
  <div class="tbl tbl_col">
    <table>
      <caption>
        {{
          t("majorTab1.table6.caption")
        }}
      </caption>
      <colgroup>
        <col style="width: 33%" />
        <col style="width: 33%" />
        <col style="width: auto" />
      </colgroup>
      <thead>
        <tr>
          <th scope="row">{{ t("majorTab1.table6.header1") }}</th>
          <th scope="row">{{ t("majorTab1.table6.header2") }}</th>
          <th scope="row">{{ t("majorTab1.table6.header3") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td rowspan="2">{{ t("majorTab1.table6.content1_1") }}</td>
          <td>{{ t("majorTab1.table6.content2_1") }}</td>
          <td rowspan="7">{{ t("majorTab1.table6.content3_1") }}</td>
        </tr>
        <tr>
          <td>{{ t("majorTab1.table6.content2_2") }}</td>
        </tr>
        <tr>
          <td>{{ t("majorTab1.table6.content1_2") }}</td>
          <td>{{ t("majorTab1.table6.content2_3") }}</td>
        </tr>
        <tr>
          <td rowspan="2">{{ t("majorTab1.table6.content1_3") }}</td>
          <td>{{ t("majorTab1.table6.content2_4") }}</td>
        </tr>
        <tr>
          <td>{{ t("majorTab1.table6.content2_5") }}</td>
        </tr>
        <tr>
          <td rowspan="2">{{ t("majorTab1.table6.content1_4") }}</td>
          <td>{{ t("majorTab1.table6.content2_6") }}</td>
        </tr>
        <tr>
          <td>{{ t("majorTab1.table6.content2_7") }}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Table7 -->
  <div class="section_tit_wrap mt_8">
    <h4 class="section_tit_xs">{{ t("majorTab1.table7.title") }}</h4>
  </div>
  <div class="tbl tbl_row">
    <table>
      <caption>
        {{
          t("majorTab1.table7.caption")
        }}
      </caption>
      <colgroup>
        <col style="width: 22%" />
        <col style="width: auto" />
      </colgroup>
      <tbody>
        <tr>
          <th scope="row">
            {{ t("majorTab1.table7.header") }}
            <br />
            {{ t("majorTab1.table7.subHeader") }}
          </th>
          <td><TextArea v-model="table7TextArea" id="majorTab1" required /></td>
        </tr>
      </tbody>
    </table>
  </div>
  <SelectModal
    v-if="modalOpen"
    @dataSelect="dataSelected"
    :isOpen="modalOpen"
    :lstIdSelect="[]"
    :onClose="closeModal"
  />
</template>

<script setup lang="ts">
import InputBase from "@/components/common/input/InputBase.vue";
import TextArea from "@/components/common/input/TextArea.vue";
import { useI18n } from "vue-i18n";
import { ref } from "vue";
import {
  EduCourseOverviewDTO,
  EduCourseOverviewStateDTO,
} from "@/stores/cqiTrainingProcess/overview/overview.type";
import {
  SEMESTER_1_IN_STUDY,
  SEMESTER_2_IN_STUDY,
  SEMESTER_1_OUT_STUDY,
  SEMESTER_2_OUT_STUDY,
  SEMESTER_1_IN_LEAVE,
  SEMESTER_2_IN_LEAVE,
  SEMESTER_1_OUT_LEAVE,
  SEMESTER_2_OUT_LEAVE,
  SEMESTER_1_IN_REGIST,
  SEMESTER_2_IN_REGIST,
  SEMESTER_1_OUT_REGIST,
  SEMESTER_2_OUT_REGIST,
  TOTAL_STUDENT_STUDY,
  TOTAL_PROF_STUDY,
  TOTAL_SP_PROF_STUDY,
  TOTAL_ASS_STUDY,
  TOTAL_STUDENT_PROF,
  TOTAL_STAFF_NO_PROF,
  TOTAL_PROF_CLIENT,
  TOTAL_HOUR_PROF,
  TOTAL_OTHER,
} from "@/constants/common.const";
import { getMajorOverview } from "@/stores/cqiTrainingProcess/overview/overview.service";
import { EduCourseCqiFilterDetail } from "@/stores/cqiTrainingProcess/cqiTrainingProcess.type";
import SelectModal from "../SelectModal.vue";

const { t } = useI18n();

interface ITable {
  [key: string]: string | number;
}

const dataStudentMng = ref({
  inStudySemester1: {} as EduCourseOverviewStateDTO,
  inStudySemester2: {} as EduCourseOverviewStateDTO,
  outStudySemester1: {} as EduCourseOverviewStateDTO,
  outStudySemester2: {} as EduCourseOverviewStateDTO,
  inLeaveSemester1: {} as EduCourseOverviewStateDTO,
  inLeaveSemester2: {} as EduCourseOverviewStateDTO,
  outLeaveSemester1: {} as EduCourseOverviewStateDTO,
  outLeaveSemester2: {} as EduCourseOverviewStateDTO,
  inRegistSemester1: {} as EduCourseOverviewStateDTO,
  inRegistSemester2: {} as EduCourseOverviewStateDTO,
  outRegistSemester1: {} as EduCourseOverviewStateDTO,
  outRegistSemester2: {} as EduCourseOverviewStateDTO,
});

const dataProfMng = ref({
  totalStudentStudy: {} as EduCourseOverviewStateDTO,
  totalProfStudy: {} as EduCourseOverviewStateDTO,
  totalSpProfStudy: {} as EduCourseOverviewStateDTO,
  totalAssStudy: {} as EduCourseOverviewStateDTO,
  totalStudentProf: {} as EduCourseOverviewStateDTO,
  totalStaffNoProf: {} as EduCourseOverviewStateDTO,
  totalProfClient: {} as EduCourseOverviewStateDTO,
  totalHourProf: {} as EduCourseOverviewStateDTO,
  totalOther: {} as EduCourseOverviewStateDTO,
});

const state = window.history.state;
const { deptCd, typeSeq, year, deptNm } = state;

const dataSave = ref({});

const table4Internal = ref<ITable[]>([]);
const table4Company = ref<ITable[]>([]);

const table7TextArea = ref("");
const modalOpen = ref(false);

onBeforeMount(() => {
  getDataDetail();
});

const getDataDetail = () => {
  const dataFilter = {
    deptCd: deptCd,
    type: typeSeq,
    year: year,
  } as EduCourseCqiFilterDetail;
  getMajorOverview(dataFilter).then((res) => {
    console.log(res.data.data);
    const response = res.data.data as EduCourseOverviewDTO;

    table7TextArea.value = response.usagePlan;
    dataStudentMng.value.inStudySemester1 = getStateList(
      response.majorOverviewState,
      SEMESTER_1_IN_STUDY
    );
    dataStudentMng.value.inStudySemester2 = getStateList(
      response.majorOverviewState,
      SEMESTER_2_IN_STUDY
    );
    dataStudentMng.value.outStudySemester1 = getStateList(
      response.majorOverviewState,
      SEMESTER_1_OUT_STUDY
    );
    dataStudentMng.value.outStudySemester2 = getStateList(
      response.majorOverviewState,
      SEMESTER_2_OUT_STUDY
    );
    dataStudentMng.value.inLeaveSemester1 = getStateList(
      response.majorOverviewState,
      SEMESTER_1_IN_LEAVE
    );
    dataStudentMng.value.inLeaveSemester2 = getStateList(
      response.majorOverviewState,
      SEMESTER_2_IN_LEAVE
    );
    dataStudentMng.value.outLeaveSemester1 = getStateList(
      response.majorOverviewState,
      SEMESTER_1_OUT_LEAVE
    );
    dataStudentMng.value.outLeaveSemester2 = getStateList(
      response.majorOverviewState,
      SEMESTER_2_OUT_LEAVE
    );
    dataStudentMng.value.inRegistSemester1 = getStateList(
      response.majorOverviewState,
      SEMESTER_1_IN_REGIST
    );
    dataStudentMng.value.inRegistSemester2 = getStateList(
      response.majorOverviewState,
      SEMESTER_2_IN_REGIST
    );
    dataStudentMng.value.outRegistSemester1 = getStateList(
      response.majorOverviewState,
      SEMESTER_1_OUT_REGIST
    );
    dataStudentMng.value.outRegistSemester2 = getStateList(
      response.majorOverviewState,
      SEMESTER_2_OUT_REGIST
    );

    dataProfMng.value.totalStudentStudy = getStateList(
      response.majorOverviewState,
      TOTAL_STUDENT_STUDY
    );
    dataProfMng.value.totalProfStudy = getStateList(
      response.majorOverviewState,
      TOTAL_PROF_STUDY
    );
    dataProfMng.value.totalSpProfStudy = getStateList(
      response.majorOverviewState,
      TOTAL_SP_PROF_STUDY
    );
    dataProfMng.value.totalAssStudy = getStateList(
      response.majorOverviewState,
      TOTAL_ASS_STUDY
    );
    dataProfMng.value.totalStudentProf = getStateList(
      response.majorOverviewState,
      TOTAL_STUDENT_PROF
    );
    dataProfMng.value.totalStaffNoProf = getStateList(
      response.majorOverviewState,
      TOTAL_STAFF_NO_PROF
    );
    dataProfMng.value.totalProfClient = getStateList(
      response.majorOverviewState,
      TOTAL_PROF_CLIENT
    );
    dataProfMng.value.totalHourProf = getStateList(
      response.majorOverviewState,
      TOTAL_HOUR_PROF
    );
    dataProfMng.value.totalOther = getStateList(
      response.majorOverviewState,
      TOTAL_OTHER
    );
  });
};

const handleAddTable = (value: string) => {
  if (value !== "TableCompany")
    return table4Internal.value.push({
      id: new Date().getTime(),
      value1: "",
      value2: "",
      value3: "",
      value4: "",
      value5: "",
    });
  return table4Company.value.push({
    id: new Date().getTime(),
    value1: "",
    value2: "",
    value3: "",
    value4: "",
    value5: "",
  });
};

const getStateList = (
  listData: EduCourseOverviewStateDTO[],
  stateDivCd: string
): EduCourseOverviewStateDTO => {
  if (listData.some((state) => state.stateDivCd == stateDivCd)) {
    return listData.filter((state) => state.stateDivCd == stateDivCd)[0];
  }
  return {
    eduCursCqiStateSeq: "",
    stateDivCd: stateDivCd,
    state: 0,
  };
};

const handleDeleteItem = (value: string, index: number | string) => {
  if (value !== "TableCompany") {
    table4Internal.value = [
      ...table4Internal.value.filter((i) => i.id !== index),
    ];
  } else {
    table4Company.value = [
      ...table4Company.value.filter((i) => i.id !== index),
    ];
  }
};

const totalSumState = (states: any[]) => {
  return states.reduce(
    (sum, current) => sum + (current ? parseInt(current.toString()) : 0),
    0
  );
};
const avgState = (state1: number, state2: number) => {
  const value1 = state1 ? parseInt(state1.toString()) : 0;
  const value2 = state2 ? parseInt(state2.toString()) : 0;
  return parseFloat(((value1 + value2) / 2).toFixed(2));
};
const percentState = (state1: number, state2: number) => {
  const value1 = state1 ? parseInt(state1.toString()) : 0;
  const value2 = state2 ? parseInt(state2.toString()) : 0;
  const result = value2 ? (value1 / value2) * 100 : 0;
  return parseFloat(result.toFixed(2));
};

const openModal = (index: number) => {
  modalOpen.value = true;
};

const closeModal = () => {
  modalOpen.value = false;
};

const dataSelected = (data: any) => {
  console.log(data);
};

const getData = () => {
  return dataSave.value;
};

defineExpose({
  getData,
});
</script>

<style scoped lang="css">
.between {
  justify-content: space-between;
}

.list_ul {
  text-align: left;
}

.list_ul li:before {
  content: "\2022";
  position: relative;
  top: -4px;
  left: -4px;
  padding-left: 4px;
}

.tbl table tbody td,
.tbl table tbody th {
  border-left: 1px solid var(--dark1);
  border-right: 1px solid var(--dark1);
  vertical-align: middle;
}

.tbl table thead th {
  border-left: 1px solid var(--gray-lavender);
  border-right: 1px solid var(--gray-lavender);
  border-bottom: 1px solid var(--gray-lavender);
}

.tbl table thead tr:last-child th,
.tbl table thead tr th[rowspan] {
  border-bottom: none !important;
}

.tbl table thead th:first-child {
  border-left: 1px solid var(--dark1);
}

.tbl table thead th:last-child {
  border-right: 1px solid var(--dark1);
}

.tbl_row table tbody th {
  padding: 18px 6px !important;
  background: var(--dark1);
  color: var(--white-color);
}
</style>
