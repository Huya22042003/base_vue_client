<template>
  <THeader />
  <div class="page_wrapper">
    <section id="content" class="content_wrapper grid_content" tabindex="0">
      <Breadcrumb
        :pageTitle="pageTitle"
        :breadcrumbItems="breadcrumbItems"
      ></Breadcrumb>

      <div class="box dp_block">
        <h3 class="box_title">
          {{ t("02.elemAction.subTitle1") }}
        </h3>
        <div class="box_section">
          <table class="tbl_row">
            <colgroup>
              <col style="width: 20%" />
              <col style="width: auto" />
            </colgroup>
            <tbody>
              <tr>
                <th scope="row">{{ t("02.elemAction.profNm") }}</th>
                <td>{{ elemDetailObDTO.profNm }}</td>
              </tr>
              <tr>
                <th scope="row">{{ t("02.elemAction.subNm") }}</th>
                <td>{{ elemDetailObDTO.subNm }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="box dp_block">
        <h3 class="box_title">
          {{ t("02.elemAction.subTitle2") }}
        </h3>
        <div class="btn_group btn_end">
          <button
            type="button"
            class="button btn_sm btn_blue mg_b10"
            @click="addItemElem"
          >
            {{ t("02.elemAction.btnAdd") }}
          </button>
        </div>
        <div class="box_section">
          <div class="box_section"></div>
          <div
            class="table-container mg_b10 dp_flex"
            v-for="(item, index) in newArrElemDetail"
            :key="index"
          >
            <table class="tbl_row mg_r20 wd_p94">
              <colgroup>
                <col style="width: 20%" />
                <col style="width: auto" />
              </colgroup>
              <tbody>
                <tr>
                  <th scope="row" class="required">
                    {{ t("02.elemAction.elemNm") }} {{ index + 1 }}
                  </th>
                  <td>
                    <InputBase
                      :value="item.elemNm"
                      placeholder="구성요소"
                      v-model="item.elemNm"
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <th scope="row" class="required">
                    {{ t("02.elemAction.defn") }}
                  </th>
                  <td>
                    <InputBase
                      :value="item.defn"
                      placeholder="정의"
                      v-model="item.defn"
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <th scope="row" class="required">
                    {{ t("02.elemAction.useYn") }}
                  </th>
                  <td>
                    <RadiobuttonBase
                      v-for="(subItem, subIndex) in listRadio11"
                      :mode="'show'"
                      :id="subItem.id + index"
                      :value="subItem.id"
                      :name="index"
                      :key="subItem.id + index"
                      :checked="subItem.id == item.useYn"
                      :label="subItem.name"
                      v-model="item.useYn"
                    >
                    </RadiobuttonBase>
                  </td>
                </tr>
              </tbody>
            </table>

            <div>
              <button
                type="button"
                class="button btn_sm btn_gray mg_t5"
                style="width: 101%"
                @click="delElem(index, item.cmpnElemSeq)"
              >
                {{ t("02.elemAction.btnDel") }}
              </button>
            </div>
          </div>
        </div>

        <div class="btn_group btn_end">
          <button
            type="button"
            class="button btn_sm btn_blue"
            @click="saveElem()"
          >
            {{ t("common.save") }}
          </button>
          <button
            type="button"
            class="button btn_sm btn_white"
            @click="handleCustomClick()"
          >
            {{ t("common.list") }}
          </button>
        </div>
      </div>
    </section>
  </div>
</template>
<script lang="ts">
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import THeader from "@/layouts/components/THeader.vue";
import TFooter from "@/layouts/components/TFooter.vue";
import { commonStore } from "@/stores/common";
import { ref } from "vue";
import LoaddingComponent from "@/components/common/loading/LoaddingComponent.vue";
import {
  PAGINATION_PAGE_SIZE_SELECTOR,
  PAGINATION_PAGE_SIZE,
} from "@/constants/screen.const";
import GridComponentV2 from "@/components/common/grid/GridComponentV2.vue";
import { SUCCSESS_STATUS } from "@/constants/screen.const";
import { format } from "date-fns";
import { codeMngStore } from "@/stores/common/codeMng";
import { SCREEN } from "@/router/screen";
import type { CodeMngRes } from "@/stores/common/codeMng/codeMng.type";

import { profChldStore } from "@/stores/profChldAbility";
import {
  ChldIdDTO,
  ElemDetailObDTO,
  ElemIdDTO,
} from "@/stores/profChldAbility/profChldAbility.type";
import { STATUS_YES, STATUS_NO } from "@/constants/common.const";
import { FORMAT_YYY_MM_DD } from "@/constants/screen.const";
import {
  subElemDetail,
  saveElem,
  checkElemDel,
} from "@/stores/profChldAbility/profChldAbility.service";
import { getCodeMngByUpCdId } from "@/stores/common/codeMng/codeMng.service";
import { MESSAGE_ERROR_API } from "@/constants/common.const";
import Swal from "sweetalert2";

export default defineComponent({
  components: {
    TFooter,
    THeader,
    Breadcrumb,
    LoaddingComponent,
    GridComponentV2,
  },
  data() {
    return {
      pageTitle: this.t("02.elemAction.title"),
      breadcrumbItems: [
        { label: this.t("common.home"), link: "/" },
        {
          label: this.t("02.elemAction.title"),
          link: SCREEN.profChldList.path,
        },
      ],
      chldAbility: {} as ChldIdDTO,
      elemDetailObDTO: {} as ElemDetailObDTO,
      arrElemDetail: [] as ElemDetailObDTO[],
      newArrElemDetail: [] as ElemDetailObDTO[],
      elemSeq: {} as ElemIdDTO,
      chldSeq: "",
      upCdId: {} as CodeMngRes,
      radiovalue11: ref(this.t("common.use")),
      listRadio11: [
        { id: STATUS_YES, name: this.t("common.use") },
        { id: STATUS_NO, name: this.t("common.noUse") },
      ],
      checkConfirm: true,
      messNoti: "",
    };
  },
  setup() {
    const store = commonStore();
    const chldStore = profChldStore();
    const codeStore = codeMngStore();
    const { t } = useI18n();
    return {
      store,
      chldStore,
      codeStore,
      t,
    };
  },
  beforeMount() {
    this.chldSeq = window.history.state.chldSeq;
    this.chldAbility.profAbilityChldSeq = this.chldSeq;
    this.getElemDetail();
  },
  computed: {
    allFieldsFilled() {
      return this.newArrElemDetail.every((item) => item.defn && item.elemNm);
    },
  },
  methods: {
    async getElemDetail() {
      this.store.setLoading(true);
      await subElemDetail(this.chldAbility)
        .then((res) => {
          this.elemDetailObDTO = res.data.data;
          this.elemDetailObDTO.profAbilityElemCreDTOS.forEach((item, index) => {
            if (this.elemDetailObDTO.profAbilityElemCreDTOS != null) {
              this.arrElemDetail.push(
                this.elemDetailObDTO.profAbilityElemCreDTOS[index]
              );
            }
          });
          this.newArrElemDetail = this.arrElemDetail;
          if (this.arrElemDetail.length == 0) {
            this.addItemElem();
          }
        })
        .catch((error) => {
          throw new Error(MESSAGE_ERROR_API);
        })
        .finally(() => {
          this.store.setLoading(false);
        });
    },
    async delElem(index, elemSeq) {
      this.showMess(this.t("02.elemAction.message.quesDel"), true, () =>
        this.delElemAction(index, elemSeq)
      );
    },
    async delElemAction(index, elemSeq) {
      if (this.checkConfirm) {
        this.elemSeq.cmpnElemSeq = elemSeq;
        if (elemSeq == "") {
          this.newArrElemDetail.splice(index, 1);
        } else {
          await checkElemDel(this.elemSeq)
            .then((res) => {
              if (res.data.data == true) {
                this.newArrElemDetail.splice(index, 1);
                this.showMess(this.t("02.elemAction.message.qnsDel"), false);
              } else {
                this.showMess(this.t("02.elemAction.message.checkUsed"), false);
              }
            })
            .catch((error) => {
              throw new Error(MESSAGE_ERROR_API);
            })
            .finally(() => {
              this.store.setLoading(false);
            });
        }
      }
    },
    addItemElem() {
      this.newArrElemDetail.push({
        defn: "",
        elemNm: "",
        useYn: STATUS_YES,
      });
    },
    async saveElem(index, elemSeq) {
      if (this.allFieldsFilled) {
        this.showMess(this.t("02.elemAction.message.quesSave"), true, () =>
          this.saveElemAction()
        );
      } else {
        this.showMess(this.t("02.elemAction.message.checkEmpty"), false);
      }
    },
    async saveElemAction() {
      this.store.setLoading(true);
      this.elemDetailObDTO.profAbilityElemCreDTOS = this.newArrElemDetail;
      await saveElem(this.elemDetailObDTO)
        .then((res) => {
          if (res.data.data == true) {
            this.showMess(this.t("02.elemAction.message.ansSave"), false, () =>
              this.handleCustomClick()
            );
          }
        })
        .catch((error) => {
          throw new Error(MESSAGE_ERROR_API);
        })
        .finally(() => {
          this.store.setLoading(false);
        });
    },
    handleCustomClick(data: any) {
      this.$router.push({
        path: SCREEN.subElemList.path,
      });
    },

    async showMess(title: string, typebtn: boolean, callBack?: Function) {
      await Swal.fire({
        text: title,
        type: "warning",
        showCancelButton: typebtn,
        confirmButtonText: this.t("common.confirm"),
        cancelButtonText: this.t("common.cancel"),
      }).then((result) => {
        if (result.isConfirmed && callBack) {
          callBack();
        }
      });
    },
  },
});
</script>

<style scoped lang="scss"></style>
