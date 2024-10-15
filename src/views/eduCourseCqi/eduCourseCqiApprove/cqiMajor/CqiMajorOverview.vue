<template>
  <div class="box dp_block">
    <div class="section_tit_wrap">
      <h3 class="section_tit">1.학생현황(단위: 명, %)</h3>
    </div>
    <div class="tbl tbl_col">
      <table>
        <colgroup>
          <col style="width: 20%" />
          <col style="width: auto" />
          <col style="width: auto" />
          <col style="width: auto" />
          <col style="width: auto" />
          <col style="width: auto" />
          <col style="width: auto" />
          <col style="width: auto" />
          <col style="width: auto" />
          <col style="width: auto" />
          <col style="width: auto" />
        </colgroup>
        <thead>
          <tr>
            <th scope="row" :colspan="1" :rowspan="2">구분</th>
            <th scope="row" :colspan="3">재학생</th>
            <th scope="row" :colspan="3">휴학생</th>
            <th scope="row" :colspan="3">재적생</th>
            <th scope="row" :colspan="1" :rowspan="2">재학율<br />(A/B*100)</th>
          </tr>
          <tr>
            <th scope="row" :colspan="1">정워내</th>
            <th scope="row" :colspan="1">정원외</th>
            <th scope="row" :colspan="1">합계(A)</th>
            <th scope="row" :colspan="1">정원내</th>
            <th scope="row" :colspan="1">정원외</th>
            <th scope="row" :colspan="1">합계</th>
            <th scope="row" :colspan="1">정원내</th>
            <th scope="row" :colspan="1">정원외</th>
            <th scope="row" :colspan="1">합계(B)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td scope="row" :colspan="1">1학기</td>
            <td scope="row" :colspan="1"><InputBase /></td>
            <td scope="row" :colspan="1"><InputBase /></td>
            <td scope="row" :colspan="1"><InputBase /></td>
            <td scope="row" :colspan="1"><InputBase /></td>
            <td scope="row" :colspan="1"><InputBase /></td>
            <td scope="row" :colspan="1"><InputBase /></td>
            <td scope="row" :colspan="1"><InputBase /></td>
            <td scope="row" :colspan="1"><InputBase /></td>
            <td scope="row" :colspan="1"><InputBase /></td>
            <td scope="row" :colspan="1"><InputBase /></td>
          </tr>
          <tr>
            <td scope="row" :colspan="1">2학기</td>
            <td scope="row" :colspan="1"><InputBase /></td>
            <td scope="row" :colspan="1"><InputBase /></td>
            <td scope="row" :colspan="1"><InputBase /></td>
            <td scope="row" :colspan="1"><InputBase /></td>
            <td scope="row" :colspan="1"><InputBase /></td>
            <td scope="row" :colspan="1"><InputBase /></td>
            <td scope="row" :colspan="1"><InputBase /></td>
            <td scope="row" :colspan="1"><InputBase /></td>
            <td scope="row" :colspan="1"><InputBase /></td>
            <td scope="row" :colspan="1"><InputBase /></td>
          </tr>
          <tr>
            <td scope="row" :colspan="1">평균</td>
            <td scope="row" :colspan="1"><InputBase /></td>
            <td scope="row" :colspan="1"><InputBase /></td>
            <td scope="row" :colspan="1"><InputBase /></td>
            <td scope="row" :colspan="1"><InputBase /></td>
            <td scope="row" :colspan="1"><InputBase /></td>
            <td scope="row" :colspan="1"><InputBase /></td>
            <td scope="row" :colspan="1"><InputBase /></td>
            <td scope="row" :colspan="1"><InputBase /></td>
            <td scope="row" :colspan="1"><InputBase /></td>
            <td scope="row" :colspan="1"><InputBase /></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <div class="box dp_block">
    <div class="section_tit_wrap">
      <h3 class="section_tit">2.교원현황(단위: 명, %)</h3>
    </div>
    <div class="tbl tbl_col">
      <table>
        <colgroup>
          <col style="width: 20%" />
          <col style="width: auto" />
          <col style="width: auto" />
          <col style="width: auto" />
          <col style="width: auto" />
          <col style="width: auto" />
          <col style="width: auto" />
          <col style="width: auto" />
          <col style="width: auto" />
          <col style="width: auto" />
          <col style="width: auto" />
          <col style="width: auto" />
        </colgroup>
        <thead>
          <tr>
            <th scope="row" :colspan="1" :rowspan="2">구분</th>
            <th scope="row" :colspan="1" :rowspan="2">재학생수</th>
            <th scope="row" :colspan="4">전임교원</th>
            <th scope="row" :colspan="1" :rowspan="2">
              전임교원1<br />인당 학생수
            </th>
            <th scope="row" :colspan="4">비전임교원</th>
            <th scope="row" :colspan="1" :rowspan="2">계</th>
          </tr>
          <tr>
            <th scope="row" :colspan="1">교수</th>
            <th scope="row" :colspan="1">부교수</th>
            <th scope="row" :colspan="1">조교수</th>
            <th scope="row" :colspan="1">합계</th>
            <th scope="row" :colspan="1">겸임교원</th>
            <th scope="row" :colspan="1">초빙교원</th>
            <th scope="row" :colspan="1">시간강사</th>
            <th scope="row" :colspan="1">기타</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td scope="row" :colspan="1">학과명A</td>
            <td scope="row" :colspan="1"><InputBase /></td>
            <td scope="row" :colspan="1"><InputBase /></td>
            <td scope="row" :colspan="1"><InputBase /></td>
            <td scope="row" :colspan="1"><InputBase /></td>
            <td scope="row" :colspan="1"><InputBase /></td>
            <td scope="row" :colspan="1"><InputBase /></td>
            <td scope="row" :colspan="1"><InputBase /></td>
            <td scope="row" :colspan="1"><InputBase /></td>
            <td scope="row" :colspan="1"><InputBase /></td>
            <td scope="row" :colspan="1"><InputBase /></td>
            <td scope="row" :colspan="1"><InputBase /></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <div class="box dp_block">
    <div class="section_tit_wrap">
      <h3 class="section_tit">3.교육과정 자체평가 목적</h3>
    </div>
    <div class="tbl tbl_col">
      <table>
        <colgroup>
          <col style="width: 20%" />
          <col style="width: auto" />
        </colgroup>
        <thead>
          <tr>
            <th scope="row" :colspan="1">구분</th>
            <td scope="row" :colspan="1">
              <div class="line_heigth pd_20">
                ∘ 대학과 학과의 교육목표에 따라 양질의 교육과정을 제공하기 위한
                학과 차원의 지속적인 모니터링 시행 <br />
                ∘ 교육과정의 체계적인 진단과 평가를 통해 학생의 역량(학습성과)을
                향상시키고, 수업을 개선하는 등 교육의 선순환 체계 구축 <br />
                ∘ 차년도 교육과정 개발 개편 및 운영을 위한 개선사항 도출
              </div>
            </td>
          </tr>
        </thead>
      </table>
    </div>
  </div>

  <div class="box dp_block">
    <div class="section_tit_wrap">
      <h3 class="section_tit">4.교육과정 자체평가 조직(내부/산업체)</h3>
    </div>
    <div class="tbl tbl_col">
      <div class="section_tit_wrap form_custom">
        <h3 class="section_tit_sm">내부</h3>
        <button class="button btn_primary btn_lg">추가</button>
      </div>
      <table>
        <colgroup>
          <col style="width: auto" />
          <col style="width: auto" />
          <col style="width: auto" />
          <col style="width: auto" />
          <col style="width: auto" />
          <col style="width: 10%" />
        </colgroup>
        <thead>
          <tr>
            <th scope="row" :colspan="1">성명</th>
            <th scope="row" :colspan="1">전공분야</th>
            <th scope="row" :colspan="1">소속</th>
            <th scope="row" :colspan="1">직위</th>
            <th scope="row" :colspan="1">비고</th>
            <th scope="row" :colspan="1">삭제</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td scope="row" :colspan="1">
              Autofill
              <button type="button" class="btn_round btn_sm btn_white">
                {{ t("common.deleteItem") }}
              </button>
            </td>
            <td scope="row" :colspan="1">Autofill</td>
            <td scope="row" :colspan="1">Autofill</td>
            <td scope="row" :colspan="1">Autofill</td>
            <td scope="row" :colspan="1">Autofill</td>
            <td scope="row" :colspan="1">
              <button type="button" class="btn_round btn_sm btn_white">
                {{ t("common.deleteItem") }}
              </button>
            </td>
          </tr>
          <tr>
            <td scope="row" :colspan="6">
              ※ 추가 버튼을 이용해서 입력해주세요.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="tbl tbl_col mt_5">
      <div class="section_tit_wrap form_custom">
        <h3 class="section_tit_sm">산업체</h3>
        <button class="button btn_primary btn_lg">추가</button>
      </div>
      <table>
        <colgroup>
          <col style="width: auto" />
          <col style="width: auto" />
          <col style="width: auto" />
          <col style="width: auto" />
          <col style="width: auto" />
          <col style="width: 10%" />
        </colgroup>
        <thead>
          <tr>
            <th scope="row" :colspan="1">성명</th>
            <th scope="row" :colspan="1">전공분야</th>
            <th scope="row" :colspan="1">소속</th>
            <th scope="row" :colspan="1">직위</th>
            <th scope="row" :colspan="1">비고</th>
            <th scope="row" :colspan="1">삭제</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td scope="row" :colspan="1"><InputBase /></td>
            <td scope="row" :colspan="1"><InputBase /></td>
            <td scope="row" :colspan="1"><InputBase /></td>
            <td scope="row" :colspan="1"><InputBase /></td>
            <td scope="row" :colspan="1"><InputBase /></td>
            <td scope="row" :colspan="1">
              <button type="button" class="btn_round btn_sm btn_white">
                {{ t("common.deleteItem") }}
              </button>
            </td>
          </tr>
          <tr>
            <td scope="row" :colspan="6">
              ※ 추가 버튼을 이용해서 입력해주세요.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <div class="box dp_block">
    <div class="section_tit_wrap">
      <h3 class="section_tit">5.교육과정 자체평가 절차</h3>
    </div>
    <div class="tbl tbl_col">
      <table>
        <colgroup>
          <col style="width: 10%" />
          <col style="width: auto" />
          <col style="width: auto" />
          <col style="width: auto" />
          <col style="width: auto" />
          <col style="width: auto" />
        </colgroup>
        <thead>
          <tr>
            <th scope="row" :colspan="1">절차</th>
            <th scope="row" :colspan="1">교육과정CQI 계획 수립</th>
            <th scope="row" :colspan="1">교육과정CQI 시행</th>
            <th scope="row" :colspan="1">교육과정CQI 결과 보고</th>
            <th scope="row" :colspan="1">교육과정 환류</th>
          </tr>
          <tr>
            <th scope="row" :colspan="1">내용</th>
            <td scope="row" :colspan="1">
              <div class="line_heigth pd_20">
                ∘ 교육과정CQI 세부계획 수립<br />
                ∘ 교육과정CQI 추진일정 수립<br />
                ∘ 대학정보공시 학과 현황자료 수집 및 제공
              </div>
            </td>
            <td scope="row" :colspan="1">
              <div class="line_heigth pd_20">
                ∘ 대학정보공시 학과 현황자료 분석<br />
                ∘ 당해년도 1~2학기 교과목CQI, 진단평가, 역량성취도 결과 분석<br />
                ∘ 교육과정 개발, 교육과정 운영, 교육과정 지원, 교육과정 성과 및
                개선 4개 영역으로 구분하여 자체평가 시행<br />
                ∘ 평가위원별 평가결과 종합<br />
                ∘ 교육과정CQI 결과 시스템 입력 및 제출<br />
                ∘ 차년도 개선계획 수립(학과차원)
              </div>
            </td>
            <td scope="row" :colspan="1">
              <div class="line_heigth pd_20">
                ∘ 학과별 교육과정CQI 평가 결과 교무위원회 보고<br />
                ∘ 차년도 개선계획 수립(대학차원)
              </div>
            </td>
            <td scope="row" :colspan="1">
              <div class="line_heigth pd_20">
                ∘ 도출된 학과/대학차원 개선계획을 차년도 교육과정 개발개편 시
                반영
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row" :colspan="1">시행주체</th>
            <td scope="row" :colspan="1" class="line_heigth pd_20">주관부서</td>
            <td scope="row" :colspan="1" class="line_heigth pd_20">
              학과교육과정개발운영위원회
            </td>
            <td scope="row" :colspan="1" class="line_heigth pd_20">주관부서</td>
            <td scope="row" :colspan="1" class="line_heigth pd_20">
              주관부서 학과교육과정개발운영위원회
            </td>
          </tr>
        </thead>
      </table>
    </div>
  </div>

  <div class="box dp_block">
    <div class="section_tit_wrap">
      <h3 class="section_tit">6.전공 교육과정 자체평가 내용 및 방법</h3>
    </div>
    <div class="tbl tbl_col">
      <table>
        <colgroup>
          <col style="width: 33.333%" />
          <col style="width: 33.333%" />
          <col style="width: 33.333%" />
        </colgroup>
        <thead>
          <tr>
            <th scope="row" :colspan="1">평가영역</th>
            <th scope="row" :colspan="1">평가항목</th>
            <th scope="row" :colspan="1">평가방법</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td scope="row" :colspan="1" :rowspan="2">1.교육과정 개발</td>
            <td scope="row" :colspan="1">대내외 환경 및 요구분석 적절성</td>
            <td scope="row" :colspan="1" :rowspan="7">
              평가위원 5점 리커트 척도 및 기술평가
            </td>
          </tr>
          <tr>
            <td scope="row" :colspan="1">교육과정 편성 타당성</td>
          </tr>
          <tr>
            <td scope="row" :colspan="1" :rowspan="1">2.교육과정 운영</td>
            <td scope="row" :colspan="1">교육과정 운영 적절성</td>
          </tr>
          <tr>
            <td scope="row" :colspan="1" :rowspan="2">3.교육과정 지원</td>
            <td scope="row" :colspan="1">교육과정 이수현황</td>
          </tr>
          <tr>
            <td scope="row" :colspan="1">교육환경 및 기자재</td>
          </tr>
          <tr>
            <td scope="row" :colspan="1" :rowspan="2">
              4.교육과정 성과 및 개선
            </td>
            <td scope="row" :colspan="1">교육과정 성과 및 분석</td>
          </tr>
          <tr>
            <td scope="row" :colspan="1">교육과정 개선</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <div class="box dp_block">
    <div class="section_tit_wrap">
      <h3 class="section_tit">7.교육과정 자체평가 환류 및 활용방안</h3>
    </div>
    <div class="tbl tbl_col">
      <table>
        <colgroup>
          <col style="width: 20%" />
          <col style="width: auto" />
        </colgroup>
        <thead>
          <tr>
            <th scope="row" :colspan="1">
              환류 및 활용방안<br />
              (자율 기술(상기 내용중심)
            </th>
            <td scope="row" :colspan="1">
              <div class="line_heigth pd_20">
                <TextArea />
              </div>
            </td>
          </tr>
        </thead>
      </table>
    </div>
    <div class="box_section mt-5">
      <div class="btn_group btn_end mg_t20">
        <div class="btn_group btn_end">
          <button type="button" class="btn_round btn_md btn_primary">
            임시저장
          </button>
          <button type="button" class="btn_round btn_md btn_primary">
            다음
          </button>
          <button type="button" class="btn_round btn_md btn_white">
            {{ t("common.list") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { commonStore } from "@/stores/common";
import { useI18n } from "vue-i18n";
export default {
  components: {},
  setup: () => {
    const router = useRouter();
    const storeCommon = commonStore();
    const { t } = useI18n();
    const id = window.history.state.id;

    return { router, storeCommon, t, id };
  },
  data() {
    return {};
  },
  beforeMount() {},
  methods: {},
};
</script>
<style scoped>
.form_custom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.line_heigth {
  line-height: 30px;
}
</style>
