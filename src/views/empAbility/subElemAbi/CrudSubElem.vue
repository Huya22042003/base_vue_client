<template>

  <div class="page_wrapper">
    <section id="content" class="content_wrapper grid_content" tabindex="0">
      <Breadcrumb
        :pageTitle="pageTitle"
        :breadcrumbItems="breadcrumbItems"
      ></Breadcrumb>

      <div class="box dp_block">
        <h3 class="box_title">
          {{ t("02.empElemAbility.elemAction.title1") }}
        </h3>
        <div class="box_section">
          <table class="tbl_row">
            <colgroup>
              <col style="width: 20%" />
              <col style="width: auto" />
            </colgroup>
            <tbody>
              <tr>
                <th scope="row">
                  {{ t("02.empElemAbility.elemAction.empNm") }}
                </th>
                <td>{{ elemDetailObDTO.empNm }}</td>
              </tr>
              <tr>
                <th scope="row">
                  {{ t("02.empElemAbility.elemAction.subNm") }}
                </th>
                <td>{{ elemDetailObDTO.subNm }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="box dp_block">
        <h3 class="box_title">
          {{ t("02.empElemAbility.elemAction.title2") }}
        </h3>
        <div class="btn_group btn_end">
          <button
            type="button"
            class="button btn_xs btn_blue mg_b10"
            @click="addItemElem"
          >
            {{ t("02.empElemAbility.elemAction.btnAdd") }}
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
                    {{ t("02.empElemAbility.elemAction.elemNm") }}
                    {{ index + 1 }}
                  </th>
                  <td>
                    <InputBase
                      :value="item.elemNm"
                      placeholder="구성요소"
                      v-model="item.elemNm"
                    />
                  </td>
                </tr>
                <tr>
                  <th scope="row" class="required">
                    {{ t("02.empElemAbility.elemAction.defm") }}
                  </th>
                  <td>
                    <InputBase
                      :value="item.defn"
                      placeholder="정의"
                      v-model="item.defn"
                    />
                  </td>
                </tr>
                <tr>
                  <th scope="row" class="required">
                    {{ t("02.empElemAbility.elemAction.useYn") }}
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
                {{ t("02.empElemAbility.elemAction.btnDel") }}
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

import {
  ChldIdDTO,
  ElemDetailDTO,
  ElemIdDTO,
  ElemDetailObDTO,
} from "@/stores/empAbility/empAbility.type";
import { STATUS_YES, STATUS_NO } from "@/constants/common.const";
import { FORMAT_YYY_MM_DD } from "@/constants/screen.const";
import {
  subElemDetail,
  saveElem,
  checkElemDel,
} from "@/stores/empAbility/empAbility.service";
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
      pageTitle: this.t("02.empElemAbility.elemAction.titleMain"),
      breadcrumbItems: [
        { label: this.t("common.home"), link: "/" },
        {
          label: this.t("02.empElemAbility.elemAction.titleMain"),
          link: SCREEN.subElemAb.path,
        },
      ],
      chldAbility: {} as ChldIdDTO,
      elemDetailObDTO: {} as ElemDetailDTO,
      arrElemDetail: [] as ElemDetailObDTO[],
      newArrElemDetail: [] as ElemDetailDTO[],
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
    const codeStore = codeMngStore();
    const { t } = useI18n();
    return {
      store,
      codeStore,
      t,
    };
  },
  beforeMount() {
    this.chldSeq = window.history.state.chldSeq;
    this.chldAbility.empAbilityChldAbilitySeq = this.chldSeq;
    this.getElemDetail();
  },
  computed: {
    allFieldsFilled() {
      return this.newArrElemDetail.every((item) => item.elemNm && item.defn);
    },
  },
  methods: {
    async getElemDetail() {
      this.store.setLoading(true);
      await subElemDetail(this.chldAbility)
        .then((res) => {
          this.elemDetailObDTO = res.data.data;
          this.elemDetailObDTO.empAbilityElemCreDTOS.forEach((item, index) => {
            if (this.elemDetailObDTO.empAbilityElemCreDTOS != null) {
              this.arrElemDetail.push(
                this.elemDetailObDTO.empAbilityElemCreDTOS[index]
              );
            }
          });
          this.newArrElemDetail = this.arrElemDetail;
          if (this.newArrElemDetail.length == 0) {
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
      this.showMess(this.t("02.empElemAbility.message.quesDelElem"), true, () =>
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
                this.showMess(
                  this.t("02.empElemAbility.message.ansDel"),
                  false
                );
              } else {
                this.showMess(
                  this.t("02.empElemAbility.message.checkElemUsed"),
                  false
                );
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
        cmpnElemSeq: "",
        elemNm: "",
        useYn: STATUS_YES,
      });
    },
    async saveElem(index, elemSeq) {
      if (this.allFieldsFilled) {
        this.showMess(this.t("02.empElemAbility.message.quesDel"), true, () =>
          this.saveElemAction()
        );
      } else {
        this.showMess(this.t("02.empElemAbility.message.quesDel"), false);
      }
    },
    async saveElemAction() {
      this.store.setLoading(true);
      this.elemDetailObDTO.empAbilityElemCreDTOS = this.newArrElemDetail;
      await saveElem(this.elemDetailObDTO)
        .then((res) => {
          if (res.data.data == true) {
            this.showMess(
              this.t("02.empElemAbility.message.ansSave"),
              false,
              () => this.handleCustomClick()
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
        path: SCREEN.subElemAbList.path,
      });
    },

    async showMess(title: string, typebtn: boolean, callBack?: Function) {
      await Swal.fire({
        text: title,
        type: "warning",
        showCancelButton: typebtn,
        confirmButtonText: this.t("common.save"),
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
