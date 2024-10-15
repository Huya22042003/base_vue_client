<template>
  <section id="content" class="content_wrapper grid_content" tabindex="0">
    <Breadcrumb :pageTitle="pageTitle" :breadcrumbItems="breadcrumbItems" />
    <div class="box dp_block">
      <div class="box_section">
        <p class="box_title_sm">
          {{ t("회의록 관리") }}
        </p>
        <div class="tbl tbl_row">
          <table>
            <caption>
              테이블제목
            </caption>
            <colgroup>
              <col style="width: 22%" />
              <col style="width: auto" />
            </colgroup>
            <tbody>
              <tr>
                <th scope="row">학과/학부</th>
                <td>
                  <SelectBoxBase
                    v-if="mode === modeCreate"
                    :id="'selectbox'"
                    :name="'selectbox'"
                    :data="listSelectBox"
                    v-model="abc"
                  />
                  <span v-if="mode === modeDetail">{{ t("Data 1") }}</span>
                </td>
              </tr>
              <tr>
                <th scope="row">사업구분</th>
                <td>
                  <SelectBoxBase
                    v-if="mode === modeCreate"
                    :id="'selectbox1'"
                    :name="'selectbox1'"
                    :data="listSelectBox1"
                    v-model="selectedOption"
                  />
                  <input
                    v-if="selectedOption === '3'"
                    type="text"
                    placeholder="기타 입력"
                    class="mg_t10"
                  />
                  <span v-if="mode === modeDetail">{{ t("Data 1") }}</span>
                </td>
              </tr>
              <tr v-if="selectedOption === '1' || mode === modeDetail">
                <th scope="row">학년도</th>
                <td>
                  <SelectBoxBase
                    v-if="mode === modeCreate"
                    :id="'selectbox2'"
                    :name="'selectbox2'"
                    :data="listSelectBox2"
                    v-model="selectedOption2"
                  />
                  <span v-if="mode === modeDetail">{{ t("Data 1") }}</span>
                </td>
              </tr>
              <tr>
                <th scope="row">회의주체</th>
                <td>
                  <input
                    v-if="mode === modeCreate"
                    type="text"
                    class="form_style wd_p100"
                    placeholder="텍스트 input"
                  />
                  <span v-if="mode === modeDetail">{{ t("Data 1") }}</span>
                </td>
              </tr>
              <tr>
                <th scope="row">회의일시</th>
                <td>
                  <div class="search_daywrap flex_fit wd_p100" v-if="mode === modeCreate">
                    <div class="wd_200">
                      <VDateInput v-model="date"></VDateInput>
                    </div>
                    <div class="search_daywrap flex_fit wd_p100">
                      <div class="wd_200">
                        <SelectBoxBase
                          v-model="selectOptionHour.value"
                          :data="selectOptionHour.type"
                        />
                      </div>
                      <div class="wd_200">
                        <SelectBoxBase
                          v-model="selectOptionMinute.value"
                          :data="selectOptionMinute.type"
                        />
                      </div>
                      <p class="input_tilde">~</p>
                      <div class="wd_200">
                        <SelectBoxBase
                          v-model="selectOptionHour.value"
                          :data="selectOptionHour.type"
                        />
                      </div>
                      <div class="wd_200">
                        <SelectBoxBase
                          v-model="selectOptionMinute.value"
                          :data="selectOptionMinute.type"
                        />
                      </div>
                    </div>
                  </div>
                  <span v-if="mode === modeDetail">{{ t("Data 1") }}</span>
                </td>
              </tr>
              <tr>
                <th scope="row">작성자</th>
                <td>
                  <input
                    v-if="mode === modeCreate"
                    type="text"
                    class="form_style wd_p100"
                    placeholder="텍스트 input"
                  />
                  <span v-if="mode === modeDetail">{{ t("Data 1") }}</span>
                </td>
              </tr>
              <tr>
                <th scope="row">장소</th>
                <td>
                  <input
                    v-if="mode === modeCreate"
                    type="text"
                    class="form_style wd_p100"
                    placeholder="텍스트 input"
                  />
                  <span v-if="mode === modeDetail">{{ t("Data 1") }}</span>
                </td>
              </tr>
              <tr>
                <th scope="row">회의비</th>
                <td>
                  <input
                    v-if="mode === modeCreate"
                    type="text"
                    class="form_style wd_p100"
                    placeholder="텍스트 input"
                  />
                  <span v-if="mode === modeDetail">{{ t("Data 1") }}</span>
                </td>
              </tr>
              <tr>
                <th scope="row">회의안건</th>
                <td>
                  <textarea
                    rows="6"
                    class="form_style wd_p100"
                    placeholder="내용을 입력해주세요."
                    :readonly="mode === modeDetail"
                    v-model="textareaContent"
                  ></textarea>
                </td>
              </tr>
              <tr>
                <th scope="row">회의안건</th>
                <td>
                  <textarea
                    rows="6"
                    class="form_style wd_p100"
                    placeholder="내용을 입력해주세요."
                    :readonly="mode === modeDetail"
                    v-model="textareaContent"
                  ></textarea>
                </td>
              </tr>
              <tr>
                <th scope="row">회의안건</th>
                <td>
                  <div class="tbl tbl_col" v-if="mode === modeCreate">
                    <table class="tbl_row">
                      <caption>
                        테이블 제목
                      </caption>
                      <colgroup>
                        <col style="width: 10%" />
                        <col style="width: 10%" />
                        <col style="width: 20%" />
                        <col style="width: 20%" />
                        <col style="width: 10%" />
                      </colgroup>
                      <thead>
                        <tr>
                          <th class="white" scope="row">과목명</th>
                          <th class="white" scope="row">이수 학기</th>
                          <th class="white" scope="row">학점</th>
                          <th class="white" scope="row">선택</th>
                          <th class="white" scope="row">선택</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(row, index) in rows" :key="index">
                          <th class="content" scope="row">
                            <SelectBoxBase v-model="row.test" :data="selectBox1" />
                          </th>
                          <td class="content">
                            <button
                              v-if="row.test == '1' && !row.isDataSelected"
                              class="button btn_primary btn_sm"
                              @click="openModal1(row)"
                            >
                              선택
                            </button>
                            <input
                              v-else-if="row.test == '2'"
                              type="text"
                              class="form_style"
                              v-model="row.name"
                              :readonly="row.test !== '2'"
                            />
                          </td>
                          <td class="content">
                            <input
                              type="text"
                              class="form_style"
                              placeholder="Autofill"
                              :readonly="row.test !== '2'"
                              v-model="row.department"
                            />
                          </td>
                          <td class="content td_input">
                            <input
                              type="text"
                              class="form_style"
                              placeholder="텍스트 input"
                              :readonly="row.test !== '2'"
                              v-model="row.position"
                            />
                          </td>
                          <td class="content">
                            <button
                              class="button btn_primary btn_sm"
                              @click="row.isNew ? deleteRow(index) : addRow()"
                            >
                              {{ row.isNew ? "Delete" : "추가" }}
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <span v-if="mode === modeDetail">{{ t("Data 1") }}</span>
                </td>
              </tr>
              <tr>
                <th scope="row">첨부자료(회의사진) (선택입력)</th>
                <td>
                  <div class="attach_filewrap" v-if="mode === modeCreate">
                    <label class="btn_round btn_white btn_sm">
                      파일 추가
                      <input type="file" class="hidden" />
                    </label>
                    <div class="attach_file_list">
                      <div class="file_row">
                        <div class="file_name">
                          <p>알고리즘수정.hwp</p>
                          <i>145KB</i>
                          <button type="button" class="btn_icon icon_only download">
                            다운로드
                          </button>
                          <button type="button" class="btn_icon icon_only delete">
                            삭제
                          </button>
                        </div>
                      </div>
                      <div class="file_row">
                        <div class="file_name">
                          <p>알고리즘수정.hwp</p>
                          <i>145KB</i>
                          <button type="button" class="btn_icon icon_only download">
                            다운로드
                          </button>
                          <button type="button" class="btn_icon icon_only delete">
                            삭제
                          </button>
                        </div>
                      </div>
                      <div class="file_row">
                        <div class="file_name">
                          <p>알고리즘수정.hwp</p>
                          <i>145KB</i>
                          <button type="button" class="btn_icon icon_only download">
                            다운로드
                          </button>
                          <button type="button" class="btn_icon icon_only delete">
                            삭제
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <span v-if="mode === modeDetail">{{ t("Data 1") }}</span>
                </td>
              </tr>
              <tr>
                <th scope="row">상세내용(선택입력)</th>
                <td>
                  <textarea
                    rows="6"
                    class="form_style wd_p100"
                    placeholder="내용을 입력해주세요."
                    :readonly="mode === modeDetail"
                    v-model="textareaContent"
                  ></textarea>
                </td>
              </tr>
            </tbody>
          </table>

          <div class="btn_area ta_r">
            <button type="button" class="btn_md_2 btn_round btn_white">인쇄</button>
            <button type="button" class="btn_md_2 btn_round btn_primary">저장</button>
            <button type="button" class="btn_md_2 btn_round btn_primary">삭제</button>
            <button type="button" class="btn_md_2 btn_round btn_primary" @click="back">
              목록
            </button>
          </div>
        </div>
      </div>
    </div>
    <EduProcessMeetingMinutesModal
      :isOpen="isOpen1"
      v-if="isOpen1"
      :onClose="onClose"
      @rowSelected="getRowData"
    ></EduProcessMeetingMinutesModal>
  </section>
</template>
<script lang="ts">
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import InputTextBase from "@/components/common/input/InputTextBase.vue";
import SelectBoxBase from "@/components/common/input/SelectBoxBase.vue";
import GridComponentV2 from "@/components/common/grid/GridComponentV2.vue";
import LinkGridComponent from "@/components/common/grid/LinkGridComponent.vue";
import { commonStore } from "../../stores/common";
import { defineComponent, ref } from "vue";
import { useI18n } from "vue-i18n";
import TModal from "@/components/common/modal/TModal.vue";
import EduProcessMeetingMinutesModal from "./modal/EduProcessMeetingMinutesModal.vue";
import { SCREEN } from "@/router/screen";
import { MODE_DETAIL, MODE_CREATE } from "@/constants/screen.const";

export default defineComponent({
  components: {
    SelectBoxBase,
    InputTextBase,
    LinkGridComponent,
    GridComponentV2,
    Breadcrumb,
    TModal,
    EduProcessMeetingMinutesModal,
  },
  setup: () => {
    const { t } = useI18n();
    const cmn = commonStore();
    return { t, cmn };
  },
  data() {
    return {
      isOpen1: false,
      test: "1",
      abc: "",
      mode: "",
      selectedOption: "",
      selectedOption2: "",
      modeCreate: MODE_CREATE,
      modeDetail: MODE_DETAIL,
      textareaContent: '',
      listSelectBox: [],
      listSelectBox1: [
        { cdId: "1", cdNm: "교육과정개발위원회", upCdId: "1" },
        { cdId: "2", cdNm: "교육부(정부) 관련 사업", upCdId: "1" },
        { cdId: "3", cdNm: "기타", upCdId: "1" },
      ],
      listSelectBox2: [
        { cdId: "1", cdNm: "옵션 1", upCdId: "1" },
        { cdId: "2", cdNm: "옵션 2", upCdId: "1" },
      ],
      selectOptionHour: {
        value: "0",
        type: Array.from({ length: 24 }, (v, k) => ({
          cdId: k.toString(),
          cdNm: k.toString(),
          upCdId: "hour",
        })),
      },
      selectOptionMinute: {
        value: "0",
        type: Array.from({ length: 60 }, (v, k) => ({
          cdId: k.toString(),
          cdNm: k.toString(),
          upCdId: "minute",
        })),
      },
      selectBox1: [
        {
          cdId: "1",
          cdNm: "내부",
        },
        {
          cdId: "2",
          cdNm: "SME",
        },
      ],
      rows: [
        {
          isNew: false,
          test: "1",
          isDataSelected: false,
          selectBox1: [
            { cdId: "1", cdNm: "내부" },
            { cdId: "2", cdNm: "SME" },
          ],
          name: "",
          department: "",
          position: "",
        },
      ],
    };
  },
  methods: {
    openModal1(row) {
      this.isOpen1 = true;
      this.currentRow = row;
    },
    onClose() {
      this.isOpen1 = false;
    },
    addRow() {
      const newRow = {
        isNew: true,
        test: "1",
        isDataSelected: false,
        selectBox1: [
          { cdId: "1", cdNm: "내부" },
          { cdId: "2", cdNm: "SME" },
        ],
      };

      // Thêm dòng mới vào bảng
      this.rows.push(newRow);
    },
    deleteRow(index) {
      this.rows.splice(index, 1);
    },
    getRowData(data: any) {
      this.currentRow.name = data.name;
      this.currentRow.department = data.department;
      this.currentRow.position = data.position;
    },
    back() {
      this.$router.push({ name: SCREEN.eduProcessMeetingMinutes.name });
    },
  },
  mounted() {
    this.mode = this.$route.params.mode;
    if (this.mode === MODE_DETAIL) {
      this.textareaContent = "Sample text data";
    }
  },
});
</script>
<style scoped>
.white {
  color: #fff;
  text-align: center;
}
.content {
  text-align: center;
  vertical-align: middle;
}
</style>
