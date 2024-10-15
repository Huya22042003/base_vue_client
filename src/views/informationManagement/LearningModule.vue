<template>
  <div class="content_wrap dashboard">
    <div class="grid_content">
      <div class="page_toparea">
        <h2 class="page_title">{{ t("learningModule.pageTitle") }}</h2>
      </div>
      <div class="box">
        <div class="sub_section_sm">
          <div class="group_header">
            <div class="wd_100">
              <SelectBoxBase :id="'selectbox'" :name="'selectbox'" v-model="selectBoxValue" :data="listSelectBox">
              </SelectBoxBase>
            </div>
            <button class="button btn_white btn_md" :disabled="active === null" @click="openRegisterModal = true">
              {{ t("learningModule.add") }}
            </button>
            <button class="button btn_white btn_md" :disabled="activeLevel === 0 || active === null"
                @click="openRenameModal = true">{{ t("learningModule.rename") }}
            </button>
            <button class="button btn_white btn_md" :disabled="!(active && activeLevel)"
                @click="handleChangeStatus(activeUsed)">{{ t("learningModule.change") }}
            </button>
            <button class="button btn_white btn_md" :disabled="activeLevel === 0" @click="handleDeleteClassification">
              {{ t("learningModule.delete") }}
            </button>
          </div>
        </div>
        <div class="sub_section_sm">
          <div class="tbl tbl_col tbl_custom tbl_scroll scrollx_tbl_lg">
            <table>
              <caption> 테이블 제목</caption>
              <colgroup>
                <col style="width:25%;">
                <col style="width:25%;">
                <col style="width:25%;">
                <col style="width:25%;">
              </colgroup>
              <thead>
              <tr>
                <th scope="row">{{ t("learningModule.table.header1") }}</th>
                <th scope="row">{{ t("learningModule.table.header2") }}</th>
                <th scope="row">{{ t("learningModule.table.header3") }}</th>
                <th scope="row">{{ t("learningModule.table.header4") }}</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>
                  <div class="scrollable">
                    <nav>
                      <ul>
                        <template v-if="listClassificationSystem">
                          <li class="mt-1">
                            <input type="checkbox" :id="listClassificationSystem.id.toString()"
                                :name="listClassificationSystem.id.toString()"
                                checked/>
                            <!--                            <input type="checkbox" :id="item.id" :name="item.id"/>-->
                            <label :for="listClassificationSystem.id.toString()"
                                :class="{active:active===listClassificationSystem.id}"
                                @click.stop="handleClickActive(listClassificationSystem.id.toString(),listClassificationSystem.module.toString(),0,listClassificationSystem.useYn)">
                              <img src="../../assets/images/icon_disk.svg" alt="disk"/>
                              <span>{{ listClassificationSystem.module }}</span>
                            </label>
                            <ul class="child-list">
                              <template v-for="itemChild in listClassificationSystem.child"
                                  :key="itemChild.jobCapaStndSeq">
                                <li>
                                  <input type="checkbox" :id="itemChild.jobCapaStndSeq"
                                      :name="itemChild.jobCapaStndSeq"/>
                                  <label :for="itemChild.jobCapaStndSeq"
                                      :class="{active:active===itemChild.jobCapaStndSeq}"
                                      @click.stop="handleClickActive(itemChild.jobCapaStndSeq,itemChild.jobCapaStndNm,1,itemChild.useYn)">
                                    <span>{{ itemChild.jobCapaStndNm }}</span>
                                  </label>
                                  <ul class="child-list">
                                    <template v-for="itemChild1 in itemChild.child" :key="itemChild1.jobCapaStndSeq">
                                      <li>
                                        <input type="checkbox" :id="itemChild1.jobCapaStndSeq"
                                            :name="itemChild1.jobCapaStndSeq"/>
                                        <label :for="itemChild1.jobCapaStndSeq"
                                            :class="{active:active===itemChild1.jobCapaStndSeq}"
                                            @click.stop="handleClickActive(itemChild1.jobCapaStndSeq,itemChild1.jobCapaStndNm,2,itemChild1.useYn)">
                                          <span>{{ itemChild1.jobCapaStndNm }}</span>
                                        </label>
                                        <ul class="child-list">
                                          <template v-for="itemChild2 in itemChild1.child"
                                              :key="itemChild2.jobCapaStndSeq">
                                            <li>
                                              <input type="checkbox" :id="itemChild2.jobCapaStndSeq"
                                                  :name="itemChild2.jobCapaStndSeq"/>
                                              <label :for="itemChild2.jobCapaStndSeq"
                                                  :class="{active:active===itemChild2.jobCapaStndSeq}"
                                                  @click.stop="handleClickActive(itemChild2.jobCapaStndSeq,itemChild2.jobCapaStndNm,3,itemChild2.useYn)">
                                                <span>{{ itemChild2.jobCapaStndNm }}</span>
                                              </label>
                                              <ul class="child-list last-child">
                                                <template v-for="itemChild3 in itemChild2.child"
                                                    :key="itemChild3.jobCapaStndSeq">
                                                  <li>
                                                    <input type="checkbox" :id="itemChild3.jobCapaStndSeq"
                                                        :name="itemChild3.jobCapaStndSeq"/>
                                                    <label :for="itemChild3.jobCapaStndSeq"
                                                        :class="{active:active===itemChild3.jobCapaStndSeq}"
                                                        @click.stop="handleClickActive(itemChild3.jobCapaStndSeq,itemChild3.jobCapaStndNm,4,itemChild3.useYn,'lastChild')">
                                                      <span>{{ itemChild3.jobCapaStndNm }}</span>
                                                    </label>
                                                  </li>
                                                </template>
                                              </ul>
                                            </li>
                                          </template>
                                        </ul>
                                      </li>
                                    </template>
                                  </ul>
                                </li>
                              </template>
                            </ul>
                          </li>
                        </template>
                      </ul>
                    </nav>
                  </div>
                </td>
                <td>
                  <div class="scrollable list-other">
                    <ul>
                      <li v-for="item in listUnitCapacity" :key="item.jobAbilSeq"
                          @click.stop="handleActive(item.jobAbilSeq,item.usedStatus)">
                        <!--                        <p :class="{active:activeModule===item.jobAbilSeq}">{{ item.jobAbilNm }}</p>-->
                        <p>{{ item.jobAbilNm }}</p>
                      </li>
                    </ul>
                  </div>
                </td>
                <td>
                  <div class="scrollable list-other">
                    <ul>
                      <li v-for="item in listUnitCapacity" :key="item.jobAbilSeq"
                          @click.stop="handleActive(item.jobAbilSeq,item.usedStatus)">
                        <!--                        <p :class="{active:activeModule===item.jobAbilSeq}">{{ item.learnModuleNm }}</p>-->
                        <p>{{ item.learnModuleNm }}</p>
                      </li>
                    </ul>
                  </div>
                </td>
                <td>
                  <div v-if="activeUsed">
                    <p class="font_16 normal mb_2" :style="{ color: activeUsed === 'Y' ? '' : 'red' }">{{ activeUsed === "Y" ? "사용" : "미사용" }}</p>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ModalClassification
      v-model="openRegisterModal"
      :title="t('learningModule.modal.add.title')"
      :itemName="t('learningModule.modal.add.itemName')"
      @confirmAction="handleRegister"
  >
  </ModalClassification>

  <ModalClassification
      v-model="openRenameModal"
      :inputValue="changeNameValue"
      :title="t('learningModule.modal.rename.title')"
      :itemName="t('learningModule.modal.rename.itemName')"
      @confirmAction="handleRename"
  >
  </ModalClassification>
</template>

<script setup lang="ts">
import {getCurrentInstance, onMounted, watch} from "vue";
import SelectBoxBase from "@/components/common/input/SelectBoxBase.vue";
import ModalClassification from "@/views/informationManagement/ModalClassification.vue";
import Swal from "sweetalert2";
import {commonStore} from "@/stores/common";
import {useI18n} from "vue-i18n";
import {CODE_KCS, CODE_NCS, SUCCSESS_STATUS} from "@/constants/screen.const";
import {learningModuleStore} from "@/stores/learningModule";
import type {CodeMngModel} from "@/stores/common/codeMng/codeMng.type";
import type {ClassificationSystem, ModuleList} from "@/stores/learningModule/learningModule.type";

const {appContext} = getCurrentInstance();
const swal = appContext.config.globalProperties;

const store = commonStore();
const lmStore = learningModuleStore();
const {t} = useI18n();

const selectBoxValue = ref<string>(CODE_NCS);
const listSelectBox = ref<CodeMngModel[]>(
    [
      {cdId: CODE_NCS, cdNm: "NCS", upCdId: "1"},
      {cdId: CODE_KCS, cdNm: "KCS", upCdId: "1"},
    ],
);

const active = ref<number | string>();
const activeModule = ref<null | string>(null);
const activeLevel = ref<number>(0);

const listClassificationSystem = ref<ClassificationSystem>();
const activeUsed = ref<string>("");

const listUnitCapacity = ref<ModuleList[]>([]);

//modal
const openRegisterModal = ref(false);
const openRenameModal = ref(false);

const changeNameValue = ref("");

watch(selectBoxValue, (newValue) => {
  getData();
});

watch(openRegisterModal, (newValue) => {
  if (newValue && activeLevel.value === 4) {
    swal.$alert("오류가 발생하였습니다.");
    openRegisterModal.value = false;
  }
});

onMounted(() => {
  active.value = listSelectBox.value.filter(item => item.cdId === selectBoxValue.value)[0].cdId;
  getData();
});

const getData = async () => {
  store.setLoading(true);
  await lmStore.fetchLearningList({
    divCd: selectBoxValue.value,
  });
  if (lmStore.learningList && lmStore.status == SUCCSESS_STATUS) {
    listClassificationSystem.value = {
      id: listSelectBox.value.filter(item => item.cdId === selectBoxValue.value)[0].cdId,
      module: listSelectBox.value.filter(item => item.cdId === selectBoxValue.value)[0].cdNm,
      child: lmStore.learningList,
    };
  }

  store.setLoading(false);
};

const getModuleList = async () => {
  store.setLoading(true);
  await lmStore.fetchModuleList({
    jobCapaStndSeq: active.value,
  });
  if (lmStore.moduleList && lmStore.status == SUCCSESS_STATUS) {
    listUnitCapacity.value = lmStore.moduleList;
  }

  store.setLoading(false);
};

const handleClickActive = async (index: string, name: string, level: number, activeUse: string, status = "notLastChild") => {
  active.value = index;
  activeLevel.value = level;
  activeUsed.value = activeUse;
  changeNameValue.value = name;
  if (status === "lastChild" && active.value) {
    await getModuleList();
  }

  // listUnitCapacity.value = listUnitCapacityData.filter(item => item.idClassificationSystem === index)[0]?.unitCapacity || [];
  //

  const checkUnit = listUnitCapacity.value.find(item => item.id === activeModule?.value) || null;
  if (activeModule.value && checkUnit && checkUnit.id) {
    handleActive(checkUnit.id, checkUnit.usedStatus);
  }
};

const handleActive = (index: string, usedStatus = null) => {
  activeModule.value = index;
  activeUsed.value = usedStatus;
};

const handleDeleteClassification = () => {
  Swal.fire({
    html: "삭제하시겠어요? 하위 분류가 모두 삭제됩니다.",
    confirmButtonColor: "#5D87FF",
    showCancelButton: true,
    cancelButtonColor: "#fff",
    // reverseButtons: true,
    confirmButtonText: "삭제",
    cancelButtonText: "취소",
  }).then(async (res) => {
    if (res.isConfirmed) {
      store.setLoading(true);
      await lmStore.deleteModuleList({
        jobCapaStndSeq: active.value,
      });
      if (lmStore.status == SUCCSESS_STATUS) {
        await getData();
      }
      store.setLoading(false);
      console.log("Action delete classification");
    }
  });
};

const handleChangeStatus = (status:string) => {
  Swal.fire({
    html: status==="Y" ? "미사용으로 변경하시겠어요?" : "사용으로 변경하시겠어요?",
    confirmButtonColor: "#5D87FF",
    showCancelButton: true,
    cancelButtonColor: "#fff",
    // reverseButtons: true,
    confirmButtonText: status==="Y" ? "미사용" : "사용",
    cancelButtonText: "취소",
  }).then(async (res) => {
    if (res.isConfirmed) {
      store.setLoading(true);
      await lmStore.changeUseModuleList({
        useYn:status==='Y' ? "N" : "Y",
        jobCapaStndSeq: active.value,
      });
      if (lmStore.status == SUCCSESS_STATUS) {
        await getData();
        activeUsed.value = status === 'Y' ? "N" : "Y";
      }
      store.setLoading(false);
    }
  });
};
//Modal
const handleRegister = async (value: string) => {
  store.setLoading(true);
  await lmStore.addModuleList({
    jobCapaStndNm: value,
    upJobCapaStndSeq: (active.value === CODE_NCS || active.value === CODE_KCS) ? null : active.value,
    divCd: selectBoxValue.value,
  });
  if (lmStore.status == SUCCSESS_STATUS) {
    await getData();
  }

  store.setLoading(false);
};

const handleRename = async (value: string) => {
  store.setLoading(true);
  await lmStore.updateModuleList({
    jobCapaStndNm: value,
    jobCapaStndSeq: active.value,
  });
  if (lmStore.status == SUCCSESS_STATUS) {
    await getData();
  }

  store.setLoading(false);
};
</script>

<style scoped lang="scss">

</style>