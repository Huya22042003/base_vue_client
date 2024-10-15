<template>
  <div class="content_wrap edu_curri_dev">
    <div class="grid_content">
      <div class="location">
        <ul>
          <li><router-link to="">홈</router-link></li>
          <li><router-link to="">교육과정개발 관리</router-link></li>
          <li><router-link to="">교과목 도출</router-link></li>
        </ul>
      </div>
      <div class="page_toparea">
        <h2 class="page_title">교육과정개발</h2>
      </div>
      <!-- [pp] 교육과정개발 상단 -->
      <div class="sub_section_md">
        <h3 class="section_tit">2025학년도 <strong>건축디자인과 교육과정개발</strong></h3>
        <div class="radio_tab_wrap">
          <p class="radio_tab">
            <input type="radio" name="radio_tab" id="curriRadio1" v-model="radioValues" value="curriRadio1" />
            <label for="curriRadio1">전년도 교육과정 운영 실적 분석</label>
          </p>
          <p class="radio_tab">
            <input type="radio" name="radio_tab" id="curriRadio2" v-model="radioValues" value="curriRadio2" />
            <label for="curriRadio2">환경분석 및 요구분석</label>
          </p>
          <p class="radio_tab">
            <input type="radio" name="radio_tab" id="curriRadio3" v-model="radioValues" value="curriRadio3" />
            <label for="curriRadio3">인재양성유형 설정 및 교육목표 수립</label>
          </p>
          <p class="radio_tab">
            <input type="radio" name="radio_tab" id="curriRadio4" v-model="radioValues" value="curriRadio4" />
            <label for="curriRadio4">직무 정의 및 직무모형 설정</label>
          </p>
          <p class="radio_tab">
            <input type="radio" name="radio_tab" id="curriRadio5" v-model="radioValues" value="curriRadio5" />
            <label for="curriRadio5">교과목 도출</label>
          </p>
          <p class="radio_tab">
            <input type="radio" name="radio_tab" id="curriRadio6" v-model="radioValues" value="curriRadio6" />
            <label for="curriRadio6">교과목 프로파일 작성</label>
          </p>
          <p class="radio_tab">
            <input type="radio" name="radio_tab" id="curriRadio7" v-model="radioValues" value="curriRadio7" />
            <label for="curriRadio7">교육과정 로드맵 및 결론</label>
          </p>
          <p class="radio_tab">
            <input type="radio" name="radio_tab" id="curriRadio8" v-model="radioValues" value="curriRadio8" />
            <label for="curriRadio8">교육과정개발위원회 회의록</label>
          </p>
          <p class="radio_tab">
            <input type="radio" name="radio_tab" id="curriRadio9" v-model="radioValues" value="curriRadio9" />
            <label for="curriRadio9">별첨</label>
          </p>
        </div>
        <div class="edu_curri_dev_step">
          <ul>
            <!-- [pp] <li> 클래스 on 으로 제어 -->
            <li>
              <strong>Step 01</strong>
              <div>신설 교과목<br />코드 신청</div>
            </li>
            <li class="on">
              <strong>Step 02</strong>
              <div>교과목<br />도출</div>
            </li>
            <li>
              <strong>Step 03</strong>
              <div>교과목별<br />역량 매핑</div>
            </li>
            <li>
              <strong>Step 04</strong>
              <div>신설/폐지/동일대체<br />교과목 지정</div>
            </li>
          </ul>
        </div>
      </div>
      <!-- [pp] 교육과정개발 상단 /-->
      <div class="sub_section_md">
        <div class="section_tit_wrap">
          <div class="section_tit_xs">인재양성유형A - 직무A1</div>
          <button type="button" class="btn_round btn_white" @click="popupShow(0)">교과목 추가</button>
        </div>
        <div class="tbl tbl_col scrollx_tbl_xl">
          <table>
            <caption>
              인재양성유형A - 직무A1
            </caption>
            <colgroup>
              <col style="width: 21%" />
              <col style="width: 9%" />
              <col style="width: 5%" />
              <col style="width: 11%" />
              <col style="width: 5%" />
              <col style="width: 11%" />
              <col style="width: 10%" />
              <col style="width: 10%" />
              <col style="width: 9%" />
            </colgroup>
            <thead>
              <tr>
                <th scope="row">교과목명</th>
                <th scope="row">교과목 코드</th>
                <th scope="row">학점</th>
                <th scope="row">직무역량</th>
                <th scope="row"></th>
                <th scope="row">비율</th>
                <th scope="row">하위역량</th>
                <th scope="row">수행준거</th>
                <th scope="row">관리</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>디지털 시대, 스마트하게 일하는 방법</th>
                <td>A12345678</td>
                <td>3</td>
                <td class="td_input">
                  <div class="select_row">
                    <vue-select
                      class="select_box"
                      :options="selectOption.type"
                      v-model="selectOption.value"
                    ></vue-select>
                  </div>
                </td>
                <td class="td_input ta_l">
                  <button type="button" class="btn_round btn_bo_grey">추가</button>
                </td>
                <td class="td_input">
                  <div class="select_row">
                    <vue-select
                      class="select_box"
                      :options="selectOption.type"
                      v-model="selectOption.value"
                    ></vue-select>
                  </div>
                </td>
                <td colspan="2" class="desc">직무역량을 선택해주세요</td>
                <td class="td_input">
                  <button type="button" class="btn_round btn_bo_grey" @click="onclickDelete()">교과목삭제</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="sub_section_md">
        <div class="section_tit_wrap">
          <div class="section_tit_xs">인재양성유형A - 직무A2</div>
          <button type="button" class="btn_round btn_white" @click="popupShow(0)">교과목 추가</button>
        </div>
        <div class="tbl tbl_col scrollx_tbl_xl">
          <table>
            <caption>
              인재양성유형A - 직무A2
            </caption>
            <colgroup>
              <col style="width: 21%" />
              <col style="width: 9%" />
              <col style="width: 5%" />
              <col style="width: 11%" />
              <col style="width: 5%" />
              <col style="width: 11%" />
              <col style="width: 10%" />
              <col style="width: 10%" />
              <col style="width: 9%" />
            </colgroup>
            <thead>
              <tr>
                <th scope="row">교과목명</th>
                <th scope="row">교과목 코드</th>
                <th scope="row">학점</th>
                <th scope="row">직무역량</th>
                <th scope="row"></th>
                <th scope="row">비율</th>
                <th scope="row">하위역량</th>
                <th scope="row">수행준거</th>
                <th scope="row">관리</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th rowspan="2" class="rows">초급영문법</th>
                <td>A12345678</td>
                <td>3</td>
                <td class="td_input">
                  <div class="select_row">
                    <vue-select
                      class="select_box"
                      :options="selectOption.type"
                      v-model="selectOption.value"
                    ></vue-select>
                  </div>
                </td>
                <td class="td_input ta_l">
                  <button type="button" class="btn_round btn_bo_grey">추가</button>
                </td>
                <td class="td_input">
                  <div class="select_row sm">
                    <vue-select
                      class="select_box"
                      :options="selectOption.type"
                      v-model="selectOption.value"
                    ></vue-select>
                  </div>
                </td>
                <td colspan="2" class="desc">직무역량을 선택해주세요</td>
                <td class="td_input">
                  <button type="button" class="btn_round btn_bo_grey" @click="onclickDelete()">교과목삭제</button>
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td class="td_input">
                  <div class="select_row">
                    <vue-select
                      class="select_box"
                      :options="selectOption2.type"
                      v-model="selectOption2.value"
                    ></vue-select>
                  </div>
                </td>
                <td class="td_input ta_l">
                  <button type="button" class="btn_round btn_bo_grey" @click="onclickDelete2()">삭제</button>
                </td>
                <td class="td_input">
                  <div class="select_row sm">
                    <vue-select
                      class="select_box"
                      :options="selectOption.type"
                      v-model="selectOption.value"
                    ></vue-select>
                  </div>
                </td>
                <td class="td_input">
                  <p class="check_row">
                    <input type="checkbox" v-model="checkValue1" value="" id="checkrow1" class="hidden" />
                    <label for="checkrow1">하위역량A-1</label>
                  </p>
                  <p class="check_row">
                    <input type="checkbox" v-model="checkValue2" value="" id="checkrow2" class="hidden" />
                    <label for="checkrow2">하위역량A-2</label>
                  </p>
                  <p class="check_row">
                    <input type="checkbox" v-model="checkValue3" value="하위역량A-3" id="checkrow3" class="hidden" />
                    <label for="checkrow3">하위역량A-3</label>
                  </p>
                </td>
                <td class="td_input">
                  <p class="check_row">
                    <input type="checkbox" v-model="checkValue4" value="수행준거A-1" id="checkrow4" class="hidden" />
                    <label for="checkrow4">수행준거A-1</label>
                  </p>
                  <p class="check_row">
                    <input type="checkbox" v-model="checkValue5" value="" id="checkrow5" class="hidden" />
                    <label for="checkrow5">수행준거A-2</label>
                  </p>
                  <p class="check_row">
                    <input type="checkbox" v-model="checkValue6" value="" id="checkrow6" class="hidden" />
                    <label for="checkrow6">수행준거A-3</label>
                  </p>
                  <p class="check_row">
                    <input type="checkbox" v-model="checkValue7" value="수행준거A-4" id="checkrow7" class="hidden" />
                    <label for="checkrow7">수행준거A-4</label>
                  </p>
                </td>
                <td></td>
              </tr>
              <tr>
                <th rowspan="2" class="rows">마케팅실무</th>
                <td>B12345678</td>
                <td>2</td>
                <td class="td_input">
                  <div class="select_row">
                    <vue-select
                      class="select_box"
                      :options="selectOption.type"
                      v-model="selectOption.value"
                    ></vue-select>
                  </div>
                </td>
                <td class="td_input ta_l">
                  <button type="button" class="btn_round btn_bo_grey">추가</button>
                </td>
                <td class="td_input">
                  <div class="select_row sm">
                    <vue-select
                      class="select_box"
                      :options="selectOption.type"
                      v-model="selectOption.value"
                    ></vue-select>
                  </div>
                </td>
                <td colspan="2"></td>
                <td class="td_input">
                  <button type="button" class="btn_round btn_bo_grey" @click="onclickDelete()">교과목삭제</button>
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td class="td_input">
                  <div class="select_row">
                    <vue-select
                      class="select_box"
                      :options="selectOption2.type"
                      v-model="selectOption2.value"
                    ></vue-select>
                  </div>
                </td>
                <td class="td_input ta_l">
                  <button type="button" class="btn_round btn_bo_grey" @click="onclickDelete2()">삭제</button>
                </td>
                <td class="td_input">
                  <div class="select_row sm">
                    <vue-select
                      class="select_box"
                      :options="selectOption.type"
                      v-model="selectOption.value"
                    ></vue-select>
                  </div>
                </td>
                <td class="td_input">
                  <p class="check_row">
                    <input type="checkbox" v-model="checkValue8" value="하위역량C-1" id="checkrow8" class="hidden" />
                    <label for="checkrow8">하위역량C-1</label>
                  </p>
                  <p class="check_row">
                    <input type="checkbox" v-model="checkValue9" value="" id="checkrow9" class="hidden" />
                    <label for="checkrow9">하위역량C-2</label>
                  </p>
                </td>
                <td class="td_input">
                  <p class="check_row">
                    <input type="checkbox" v-model="checkValue10" value="수행준거C-1" id="checkrow10" class="hidden" />
                    <label for="checkrow10">수행준거C-1</label>
                  </p>
                  <p class="check_row">
                    <input type="checkbox" v-model="checkValue11" value="" id="checkrow11" class="hidden" />
                    <label for="checkrow11">수행준거C-2</label>
                  </p>
                  <p class="check_row">
                    <input type="checkbox" v-model="checkValue12" value="수행준거C-3" id="checkrow12" class="hidden" />
                    <label for="checkrow12">수행준거C-3</label>
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="sub_section_md mg_b0">
        <div class="section_tit_wrap">
          <div class="section_tit_xs">인재양성유형B - 직무B1</div>
          <button type="button" class="btn_round btn_white" @click="popupShow(0)">교과목 추가</button>
        </div>
        <div class="tbl tbl_col scrollx_tbl_xl">
          <table>
            <caption>
              인재양성유형B - 직무B1
            </caption>
            <colgroup>
              <col style="width: 21%" />
              <col style="width: 9%" />
              <col style="width: 5%" />
              <col style="width: 11%" />
              <col style="width: 5%" />
              <col style="width: 11%" />
              <col style="width: 10%" />
              <col style="width: 10%" />
              <col style="width: 9%" />
            </colgroup>
            <thead>
              <tr>
                <th scope="row">교과목명</th>
                <th scope="row">교과목 코드</th>
                <th scope="row">학점</th>
                <th scope="row">직무역량</th>
                <th scope="row"></th>
                <th scope="row">비율</th>
                <th scope="row">하위역량</th>
                <th scope="row">수행준거</th>
                <th scope="row">관리</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th rowspan="2" class="rows">
                  일이삼사오육칠팔구십십일십이십삼십사십오십육십칠십팔십구이십이십일이십이이십삼이
                </th>
                <td>A12345678</td>
                <td>3</td>
                <td class="td_input">
                  <div class="select_row">
                    <vue-select
                      class="select_box"
                      :options="selectOption.type"
                      v-model="selectOption.value"
                    ></vue-select>
                  </div>
                </td>
                <td class="td_input ta_l">
                  <button type="button" class="btn_round btn_bo_grey">추가</button>
                </td>
                <td class="td_input">
                  <div class="select_row sm">
                    <vue-select
                      class="select_box"
                      :options="selectOption.type"
                      v-model="selectOption.value"
                    ></vue-select>
                  </div>
                </td>
                <td colspan="2" class="desc">직무역량을 선택해주세요</td>
                <td class="td_input">
                  <button type="button" class="btn_round btn_bo_grey" @click="onclickDelete()">교과목삭제</button>
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td class="td_input">
                  <div class="select_row">
                    <vue-select
                      class="select_box"
                      :options="selectOption2.type"
                      v-model="selectOption2.value"
                    ></vue-select>
                  </div>
                </td>
                <td class="td_input ta_l">
                  <button type="button" class="btn_round btn_bo_grey" @click="onclickDelete2()">삭제</button>
                </td>
                <td class="td_input">
                  <div class="select_row sm">
                    <vue-select
                      class="select_box"
                      :options="selectOption.type"
                      v-model="selectOption.value"
                    ></vue-select>
                  </div>
                </td>
                <td class="td_input">
                  <p class="check_row">
                    <input type="checkbox" v-model="checkValue13" value="하위역량A-1" id="checkrow13" class="hidden" />
                    <label for="checkrow13">하위역량A-1</label>
                  </p>
                  <p class="check_row">
                    <input type="checkbox" v-model="checkValue14" value="" id="checkrow14" class="hidden" />
                    <label for="checkrow14">하위역량A-2</label>
                  </p>
                  <p class="check_row">
                    <input type="checkbox" v-model="checkValue15" value="" id="checkrow15" class="hidden" />
                    <label for="checkrow15">하위역량A-3</label>
                  </p>
                </td>
                <td class="td_input">
                  <p class="check_row">
                    <input type="checkbox" v-model="checkValue16" value="수행준거A-1" id="checkrow16" class="hidden" />
                    <label for="checkrow16">수행준거A-1</label>
                  </p>
                  <p class="check_row">
                    <input type="checkbox" v-model="checkValue17" value="수행준거A-2" id="checkrow17" class="hidden" />
                    <label for="checkrow17">수행준거A-2</label>
                  </p>
                  <p class="check_row">
                    <input type="checkbox" v-model="checkValue18" value="" id="checkrow18" class="hidden" />
                    <label for="checkrow18">수행준거A-3</label>
                  </p>
                  <p class="check_row">
                    <input type="checkbox" v-model="checkValue19" value="" id="checkrow19" class="hidden" />
                    <label for="checkrow19">수행준거A-4</label>
                  </p>
                </td>
                <td></td>
              </tr>
              <tr>
                <th rowspan="2" class="rows">진로설계와 직업</th>
                <td>B12345678</td>
                <td>2</td>
                <td class="td_input">
                  <div class="select_row">
                    <vue-select
                      class="select_box"
                      :options="selectOption.type"
                      v-model="selectOption.value"
                    ></vue-select>
                  </div>
                </td>
                <td class="td_input ta_l">
                  <button type="button" class="btn_round btn_bo_grey">추가</button>
                </td>
                <td class="td_input">
                  <div class="select_row sm">
                    <vue-select
                      class="select_box"
                      :options="selectOption.type"
                      v-model="selectOption.value"
                    ></vue-select>
                  </div>
                </td>
                <td colspan="2"></td>
                <td class="td_input">
                  <button type="button" class="btn_round btn_bo_grey" @click="onclickDelete()">교과목삭제</button>
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td class="td_input">
                  <div class="select_row">
                    <vue-select
                      class="select_box"
                      :options="selectOption2.type"
                      v-model="selectOption2.value"
                    ></vue-select>
                  </div>
                </td>
                <td class="td_input ta_l">
                  <button type="button" class="btn_round btn_bo_grey" @click="onclickDelete2()">삭제</button>
                </td>
                <td class="td_input">
                  <div class="select_row sm">
                    <vue-select
                      class="select_box"
                      :options="selectOption.type"
                      v-model="selectOption.value"
                    ></vue-select>
                  </div>
                </td>
                <td class="td_input">
                  <p class="check_row">
                    <input type="checkbox" v-model="checkValue20" value="" id="checkrow20" class="hidden" />
                    <label for="checkrow20">하위역량C-1</label>
                  </p>
                  <p class="check_row">
                    <input type="checkbox" v-model="checkValue21" value="하위역량C-2" id="checkrow21" class="hidden" />
                    <label for="checkrow21">하위역량C-2</label>
                  </p>
                </td>
                <td class="td_input">
                  <p class="check_row">
                    <input type="checkbox" v-model="checkValue22" value="수행준거C-1" id="checkrow22" class="hidden" />
                    <label for="checkrow22">수행준거C-1</label>
                  </p>
                  <p class="check_row">
                    <input type="checkbox" v-model="checkValue23" value="수행준거C-2" id="checkrow23" class="hidden" />
                    <label for="checkrow23">수행준거C-2</label>
                  </p>
                  <p class="check_row">
                    <input type="checkbox" v-model="checkValue24" value="" id="checkrow24" class="hidden" />
                    <label for="checkrow24">수행준거C-3</label>
                  </p>
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="btn_area">
        <button type="button" class="btn_xl btn_round btn_white">임시저장</button>
        <button type="button" class="btn_xl_2 btn_round btn_white">다음</button>
        <button type="button" class="btn_xl_2 btn_round btn_white">목록</button>
        <button type="button" class="btn_xl_2 btn_round btn_primary" @click="onclickSave()">저장</button>
      </div>
    </div>
  </div>

  <PopupView v-model="isPopups[0]" class="large">
    <template #title>교과목 추가</template>
    <template #footer>
      <button type="button" class="btn_round btn_white btn_xl_2" @click="popupHide(0)">닫기</button>
    </template>
    <div class="sub_section_xs">
      <div class="section_tit_wrap">
        <div class="section_tit_xs">검색</div>
      </div>
      <div class="tbl tbl_col">
        <table>
          <caption>
            교과목 검색 목록
          </caption>
          <colgroup>
            <col style="width: 15%" />
            <col style="width: 12%" />
            <col style="width: 10%" />
            <col style="width: 7%" />
            <col style="width: 7%" />
            <col style="width: 7%" />
            <col style="width: 7%" />
          </colgroup>
          <thead>
            <tr>
              <th>교과목명</th>
              <th>과목코드</th>
              <th>교과구분</th>
              <th>학점</th>
              <th>시수</th>
              <th>이론</th>
              <th>실습</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="td_input">
                <input type="text" class="form_style" placeholder="교과목명" />
              </td>
              <td class="td_input">
                <input type="text" class="form_style" placeholder="과목코드" />
              </td>
              <td class="td_input">
                <div class="select_row sm">
                  <vue-select class="select_box" :options="selectOption3.type" v-model="selectOption3.value">
                  </vue-select>
                </div>
              </td>
              <td class="td_input">
                <input type="text" class="form_style" placeholder="학점" />
              </td>
              <td class="td_input">
                <input type="text" class="form_style" placeholder="시수" />
              </td>
              <td class="td_input">
                <input type="text" class="form_style" placeholder="이론" />
              </td>
              <td class="td_input">
                <input type="text" class="form_style" placeholder="실습" />
              </td>
            </tr>
          </tbody>
        </table>
        <div class="btn_area ta_r mg_t10">
          <button type="button" class="btn_lg btn_round btn_white">초기화</button>
          <button type="button" class="btn_lg btn_round btn_primary">검색</button>
        </div>
      </div>
    </div>
    <div class="sub_section_xs">
      <div class="section_tit_wrap">
        <div class="section_tit_xs">목록</div>
      </div>
      <div class="tbl tbl_col">
        <table>
          <caption>
            교과목 검색 목록
          </caption>
          <colgroup>
            <col style="width: 23%" />
            <col style="width: auto" />
            <col style="width: 12%" />
            <col style="width: auto" />
            <col style="width: auto" />
            <col style="width: auto" />
            <col style="width: auto" />
            <col style="width: 12%" />
            <col style="width: 9%" />
          </colgroup>
          <thead>
            <tr>
              <th>교과목명</th>
              <th>과목코드</th>
              <th>교과구분</th>
              <th>학점</th>
              <th>시수</th>
              <th>이론</th>
              <th>실습</th>
              <th>생성일</th>
              <th>선택</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colspan="9">검색 결과가 없습니다.</td>
            </tr>
            <tr>
              <th scope="row">교과목A교과목A교과목A교과목A교과목A교과목A</th>
              <td>12345678</td>
              <td>전공선택</td>
              <td>3</td>
              <td>3</td>
              <td>2</td>
              <td>1</td>
              <td>2024-05-05</td>
              <td>
                <button type="button" @click="onclickSelect()">[선택]</button>
              </td>
            </tr>
            <tr>
              <th scope="row">교과목A</th>
              <td>12345678</td>
              <td>전공선택</td>
              <td>3</td>
              <td>3</td>
              <td>2</td>
              <td>1</td>
              <td>2024-05-05</td>
              <td>
                <button type="button" @click="onclickSelect()">[선택]</button>
              </td>
            </tr>
            <tr>
              <th scope="row">교과목A</th>
              <td>12345678</td>
              <td>전공선택</td>
              <td>3</td>
              <td>3</td>
              <td>2</td>
              <td>1</td>
              <td>2024-05-05</td>
              <td>
                <button type="button" @click="onclickSelect()">[선택]</button>
              </td>
            </tr>
            <tr>
              <th scope="row">교과목A</th>
              <td>12345678</td>
              <td>전공선택</td>
              <td>3</td>
              <td>3</td>
              <td>2</td>
              <td>1</td>
              <td>2024-05-05</td>
              <td>
                <button type="button" @click="onclickSelect()">[선택]</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <PaginationUi></PaginationUi>
    </div>
  </PopupView>
</template>

<script lang="ts">
import PopupView from "@/components/common/PopupView.vue";
import PaginationUi from "@/components/common/PaginationUi.vue";

export default {
  components: {
    PopupView,
    PaginationUi,
  },
  data: () => ({
    isPopups: [false],
    radioValues: "curriRadio5",

    selectOption: {
      value: "선택",
      type: [],
    },
    selectOption2: {
      value: "직무역량A",
      type: [
        { label: "직무역량A", value: "" },
        { label: "직무역량B", value: "01" },
        { label: "직무역량C", value: "02" },
      ],
    },
    selectOption3: {
      value: "전체",
      type: [
        { label: "전공선택", value: "" },
        { label: "전공일반", value: "01" },
        { label: "전공필수", value: "02" },
      ],
    },
    checkValue1: ["하위역량A-1"],
    checkValue2: ["하위역량A-2"],
    checkValue3: ["하위역량A-3"],

    checkValue4: ["수행준거A-1"],
    checkValue5: ["수행준거A-2"],
    checkValue6: ["수행준거A-3"],
    checkValue7: ["수행준거A-4"],

    checkValue8: ["하위역량C-1"],
    checkValue9: ["하위역량C-2"],

    checkValue10: ["수행준거C-1"],
    checkValue11: ["수행준거C-2"],
    checkValue12: ["수행준거C-3"],

    checkValue13: ["하위역량A-1"],
    checkValue14: ["하위역량A-2"],
    checkValue15: ["하위역량A-3"],

    checkValue16: ["수행준거A-1"],
    checkValue17: ["수행준거A-2"],
    checkValue18: ["수행준거A-3"],
    checkValue19: ["수행준거A-4"],

    checkValue20: ["하위역량C-1"],
    checkValue21: ["하위역량C-2"],

    checkValue22: ["수행준거C-1"],
    checkValue23: ["수행준거C-2"],
    checkValue24: ["수행준거C-3"],
  }),
  methods: {
    popupShow(idx: number) {
      const vm = this;
      vm.isPopups[idx] = true;
    },
    popupHide(idx: number) {
      const vm = this;
      vm.isPopups[idx] = false;
    },
    onclickSave() {
      const vm = this;
      vm.$confirm("저장하시겠어요?", "알림", (isConfirm: Boolean) => {
        if (isConfirm) {
          vm.$toast("저장되었습니다.");
        }
      });
    },
    onclickDelete() {
      const vm = this;
      vm.$confirm("교과목A을 삭제하시겠어요?", "알림", (isConfirm: Boolean) => {
        if (isConfirm) {
          vm.$toast("삭제되었습니다.");
        }
      });
    },
    onclickDelete2() {
      const vm = this;
      vm.$confirm("직무역량을 삭제하시겠어요?", "알림", (isConfirm: Boolean) => {
        if (isConfirm) {
          vm.$toast("삭제되었습니다.");
        }
      });
    },
    onclickSelect() {
      const vm = this;
      vm.$confirm("교과목A을 선택하시겠어요?", "알림", (isConfirm: Boolean) => {
        if (isConfirm) {
          vm.$toast("교과목A가 추가되었습니다.");
        }
      });
    },
  },
};
</script>
