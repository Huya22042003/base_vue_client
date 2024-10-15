<template>
  <!-- 메인화면에만 mainpage -->
  <div class="content_wrap dashboard">
    <div class="grid_content">
      <div class="page_toparea">
        <h2 class="page_title">My<br />Dashboard</h2>
        <div class="year_select select_row sm">
          <vue-select class="select_box" :options="selectOption.type" v-model="selectOption.value"></vue-select>
        </div>
      </div>
      <div class="sub_section">
        <div class="dshb_banner">
          <div>
            <img src="@/assets/images/main/main_banner_kaywon.png" alt="계원대학교" />
            <div class="title">
              <strong>역량기반 교육과정</strong>
              <p>관리시스템</p>
            </div>
            <img src="@/assets/images/main/main_banner_play.png" alt="play" />
            <div class="course_schedule">
              <strong>강의설계 일정</strong>
              <p>1학기 강의계획서 작성 기간입니다(2024/07/31 ~ 2024/08/30).</p>
              <!-- [pp] 강의설계 일정이 없을 경우 :
               <p>"강의 설계 일정이 없습니다."</p> -->
            </div>
          </div>
        </div>
        <div class="develop_state_wrap">
          <div class="develop_state">
            <div class="section_tit_wrap">
              <strong class="section_tit_sm">1학기 교육과정개발 현황</strong>
              <div class="state_division">
                <span>작성중</span>
                <span>작성완료</span>
              </div>
            </div>
            <div class="curri_develop_percent">
              <div class="curri_develop_writing">
                <strong>작성중</strong>
                <div class="percent"><span>75.4</span>%</div>
              </div>
              <div class="curri_develop_completed">
                <strong>작성완료</strong>
                <div class="percent"><span>24.6</span>%</div>
              </div>
              <div class="progress_bar">
                <!-- [pp] 교육과정개발 현황: 작성중 퍼센트를 <span> 너비로 조절-->
                <span>작성중</span>
              </div>
              <p>100</p>
            </div>
          </div>
          <div class="hakgua_develop_state">
            <div class="section_tit_wrap">
              <strong class="section_tit_sm">학과별 교육과정개발 편성교과목 현황</strong>
              <div class="select_row lg">
                <vue-select class="select_box" :options="selectOption2.type" v-model="selectOption2.value">
                </vue-select>
              </div>
            </div>
            <div class="dshb_chart_box">
              <DshbColumnBarChart
                :dataset="chartDatasets"
                :colorset="chartColorSets"
                :labels="chartLabels"
                :columnWidth="'44px'"
              >
              </DshbColumnBarChart>
            </div>
            <p>소속 계열/학부에 속한 학과/전공 교육과정개발 편성 교과목 수</p>
          </div>
        </div>
      </div>
      <div class="sub_section term_curri_develop">
        <div class="term_01">
          <div>
            <strong class="section_tit_sm">1학기 교육과정개발 현황</strong>
            <div class="tbl tbl_row">
              <table>
                <caption>
                  1학기 교육과정개발 현황
                </caption>
                <colgroup>
                  <col style="width: auto" />
                  <col style="width: 30%" />
                  <col style="width: 30%" />
                </colgroup>
                <thead>
                  <tr>
                    <th></th>
                    <th>작성중</th>
                    <th>작성완료</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">강의계획서 작성 현황</th>
                    <td class="percent"><span>30.1</span>%</td>
                    <td class="percent"><span>49.9</span>%</td>
                  </tr>
                  <tr>
                    <th scope="row">평가계획서 작성 현황</th>
                    <td class="percent"><span>20</span>%</td>
                    <td class="percent"><span>80</span>%</td>
                  </tr>
                  <tr>
                    <th scope="row">학생 직무수행능력 평가</th>
                    <td class="percent"><span>15.3</span>%</td>
                    <td class="percent"><span>85.7</span>%</td>
                  </tr>
                  <tr>
                    <th scope="row">교과목CQI 작성 현황</th>
                    <td class="percent"><span>5</span>%</td>
                    <td class="percent"><span>95</span>%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="term_02">
          <div>
            <strong class="section_tit_sm">2학기 교육과정개발 현황</strong>
            <div class="tbl tbl_row">
              <table>
                <caption>
                  1학기 교육과정개발 현황
                </caption>
                <colgroup>
                  <col style="width: auto" />
                  <col style="width: 30%" />
                  <col style="width: 30%" />
                </colgroup>
                <thead>
                  <tr>
                    <th></th>
                    <th>작성중</th>
                    <th>작성완료</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">강의계획서 작성 현황</th>
                    <td class="percent"><span>30.1</span>%</td>
                    <td class="percent"><span>49.9</span>%</td>
                  </tr>
                  <tr>
                    <th scope="row">평가계획서 작성 현황</th>
                    <td class="percent"><span>20</span>%</td>
                    <td class="percent"><span>80</span>%</td>
                  </tr>
                  <tr>
                    <th scope="row">학생 직무수행능력 평가</th>
                    <td class="percent"><span>15.3</span>%</td>
                    <td class="percent"><span>85.7</span>%</td>
                  </tr>
                  <tr>
                    <th scope="row">교과목CQI 작성 현황</th>
                    <td class="percent"><span>5</span>%</td>
                    <td class="percent"><span>95</span>%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="sub_section link_wrapper">
        <strong class="section_tit_sm">산출물 바로가기</strong>
        <p>Quick banner</p>
        <div class="link_wrap">
          <ul>
            <li>
              <router-link to="">
                <img src="@/assets/images/main/icon_section_link1.png" alt="강의계획서 조회" />강의계획서 조회
              </router-link>
            </li>
            <li>
              <router-link to="">
                <img src="@/assets/images/main/icon_section_link2.png" alt="평가계획서 조회" />평가계획서 조회
              </router-link>
            </li>
            <li>
              <router-link to="">
                <img src="@/assets/images/main/icon_section_link3.png" alt="학생 직무수행능력평가 조회" />
                학생 직무수행능력평가 조회
              </router-link>
            </li>
            <li>
              <router-link to="">
                <img src="@/assets/images/main/icon_section_link4.png" alt="교과목CQI 조회" />교과목CQI 조회
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="sub_section board_wrapper">
        <div class="notice_wrap">
          <div>
            <strong class="section_tit_sm">공지사항</strong>
            <router-link to="">바로가기</router-link>
          </div>
          <ul>
            <li>
              <router-link to="">
                2024년 2학기 장학금 신청2024년 2학기 장학금 신청2024년 2학기 장학금 신청2024년 2학기 장학금 신청
              </router-link>
              <span class="date">2024/05/01</span>
            </li>
            <li>
              <router-link to="">[학사] 2024년 제2차 평생교육사 자격증 발급 신청</router-link>
              <span class="date">2024/05/01</span>
            </li>
            <li>
              <router-link to="">[학사] 2024학년도 제1학기 교양과목 중간시험 시간표</router-link>
              <span class="date">2024/05/01</span>
            </li>
            <li>
              <router-link to="">[일반] [미래혁신센터] 2024학년도 2학기 도전학기</router-link>
              <span class="date">2024/05/01</span>
            </li>
          </ul>
        </div>
        <div class="qna_wrap">
          <div>
            <strong class="section_tit_sm">Q&A</strong>
            <router-link to="">바로가기</router-link>
          </div>
          <ul>
            <li>
              <router-link to="">2024년 2학기 장학금 신청</router-link>
              <span class="date">2024/05/01</span>
            </li>
            <li>
              <router-link to="">[학사] 2024년 제2차 평생교육사 자격증 발급 신청</router-link>
              <span class="date">2024/05/01</span>
            </li>
            <li>
              <router-link to="">[학사] 2024학년도 제1학기 교양과목 중간시험 시간표</router-link>
              <span class="date">2024/05/01</span>
            </li>
            <li>
              <router-link to="">
                [일반] [미래혁신센터] 2024학년도 2학기 도전학기도전학기도전학기도전학기도전학기도전학기
              </router-link>
              <span class="date">2024/05/01</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import DshbColumnBarChart from "@/components/chart/DshbColumnBarChart.vue";

export default {
  components: {
    DshbColumnBarChart,
  },
  data: () => ({
    chartDatasets: [
      {
        name: "Media&Technology계열",
        data: [74, 100, 37, 82],
      },
    ],
    chartLabels: ["게임미디어과", "디지털미디어디자인과", "애니메이션과", "영상디자인과"],
    chartColorSets: ["#717E8A", "#1495AF", "#28CB38", "#115D5D"],
    selectOption: {
      value: "2025",
      type: [
        { label: "2025", value: "" },
        { label: "2026", value: "01" },
      ],
    },
    selectOption2: {
      value: "Media&Technology계열",
      type: [
        { label: "Media&Technology계열", value: "" },
        { label: "Media&Technology계열", value: "01" },
        { label: "Media&Technology계열", value: "02" },
        { label: "Media&Technology계열", value: "03" },
        { label: "Media&Technology계열", value: "04" },
      ],
    },
  }),
};
</script>
