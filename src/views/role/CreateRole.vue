<template>
  <Wrapper>
    <Breadcrumb :pageTitle="t('10.role.pageTitle')"></Breadcrumb>
    <BlockInput>
      <div class="box_section">
        <p class="box_title_sm">{{ t("10.role.pageTitle") }}</p>
        <table class="tbl_row">
          <caption></caption>
          <colgroup>
            <col style="width: 20%" />
            <col style="width: 40%" />
            <col style="width: 20%" />
            <col style="width: 40%" />
          </colgroup>

          <tbody>
            <tr>
              <th scope="row">{{ t("10.role.roleName") }}</th>
              <td colspan="3">
                <InputBase
                  :id="'name-role'"
                  v-model="roleName"
                  :placeholder="t('10.role.roleName')"
                >
                </InputBase>
              </td>
            </tr>
            <tr>
              <th scope="row">{{ t("10.role.roleCode") }}</th>
              <td colspan="3">
                <InputBase
                  :id="'code-role'"
                  :placeholder="t('10.role.placeHolderDefn')"
                  :readonly="true"
                >
                </InputBase>
              </td>
            </tr>
            <tr>
              <th scope="row">{{ t("10.role.roleDefn") }}</th>
              <td colspan="3">
                <InputBase
                  :id="'textArea'"
                  :name="'textArea'"
                  v-model="description"
                >
                </InputBase>
              </td>
            </tr>
            <tr>
              <th scope="row">{{ t("10.role.cmpnRole") }}</th>
              <td colspan="3">
                <RadiobuttonBase
                  v-for="item in listRadioCmpn"
                    :value="item.cdId"
                    :id="item.cdId"
                    :className="item.cdId"
                    :name="item.cdId"
                    :label="item.cdNm"
                    :key="item.cdId"
                    v-model="listCmpnCd"
                    :checked="item.cdId === listCmpnCd"
                >
                </RadiobuttonBase>
              </td>
            </tr>
            <tr>
              <th scope="row">{{ t("10.role.siteType") }}</th>
              <td colspan="3">
                <div>
                  <RadiobuttonBase
                    v-for="item in listSelectBox"
                    :value="item.cdId"
                    :id="item.cdId"
                    :className="item.cdId"
                    :name="item.cdId"
                    :label="item.cdNm"
                    :key="item.cdId"
                    :checked="item.cdId === selectSiteType"
                    v-model="selectSiteType"
                    @change="changeData(selectSiteType)"
                  >
                  </RadiobuttonBase>
                </div>
              </td>
            </tr>
            <tr v-if="typeMenu.length > 0">
              <th scope="row">{{ t("10.role.menu") }}</th>
              <td colspan="3">
                <ul>
                  <li class="">
                    <MenuItem
                      :items="listMenu"
                      :listData="listMenu"
                      :listRadioOnOff="listRadioOnOff"
                      v-model:selectMenu="selectMenu"
                    />
                  </li>
                </ul>
              </td> 
            </tr>
          </tbody>
        </table>
        <div class="box_section">
          <div class="btn_area">
            <button
              type="button"
              class="button btn_sm btn_blue"
              @click="showAlert"
            >
              {{ t("common.save") }}
            </button>
            <button
              type="button"
              class="button btn_sm btn_gray"
              @click="back()"
            >
              {{ t("common.list") }}
            </button>
          </div>
        </div>
      </div>
    </BlockInput>
  </Wrapper>
</template>

<script lang="ts" setup>
import BlockInput from "@/components/common/input/BlockInput.vue";
import InputBase from "@/components/common/input/InputBase.vue";
import { ref } from "vue";
import { commonStore } from "@/stores/common";
import router from "@/router";
import { SCREEN } from "@/router/screen";
import { useI18n } from "vue-i18n";
import { menuStores } from "@/stores/menus/index";
import { createRole } from "@/stores/role/role.service";
import Swal from "sweetalert2";
import { CREATED_STATUS } from "@/constants/screen.const";
import { SITE_TYPE } from "@/constants/screen.const";
import RadiobuttonBase from "@/components/common/input/RadiobuttonBase.vue";
import { SITE_01, SITE_03 } from "@/constants/common.const";
import { UP_CD_ID_ON_OFF } from "@/constants/common.const";
import { getListCodeMng } from "@/stores/common/codeMng/codeMng.service";
import { SUCCSESS_STATUS } from "@/constants/screen.const";
import { CodeMngModel } from "@/stores/common/codeMng/codeMng.type";
import MenuItem from "./MenuItem.vue";
import { UP_CD_ID_CMPN_ROLE, CD_ID_CMPN_ROLE_ALL } from "@/constants/common.const";

const selectSiteType = ref(SITE_01);
const listSelectBox = ref([] as CodeMngModel[]);
const listRadioOnOff = ref([] as CodeMngModel[]);
const listRadioCmpn = ref([] as CodeMngModel[]);
const listRadio = ref([]);
const storeMenu = menuStores();
const { list } = storeToRefs(storeMenu);
const { t } = useI18n();
const roleName = ref("");
const description = ref("");
const listCmpnCd = ref(CD_ID_CMPN_ROLE_ALL);
const storeCommon = commonStore();

const fetchMenu = async (query: any) => {
  await storeMenu.fetchMenus({siteType: query});
};
const selectMenu = ref<String[]>([]);
const listMenu = ref([]);
const listMenuParent = ref([]);
const typeMenu = ref("");

onMounted(async () => {
  listMenu.value = [];
  listMenuParent.value = [];
});

onBeforeMount(async () => {
  changeData(SITE_01);

  getListCodeMng({ upCdIdList: [SITE_TYPE, UP_CD_ID_ON_OFF, UP_CD_ID_CMPN_ROLE] }).then((res) => {
    if (res.status == SUCCSESS_STATUS) {
      res.data.data.forEach((item) => {
        if (item.upCdId == SITE_TYPE && item.cdId !== SITE_03) {
          listSelectBox.value.push(item);
        }

        if (item.upCdId == UP_CD_ID_ON_OFF) {
          listRadioOnOff.value.push(item);
        }

        if (item.upCdId == UP_CD_ID_CMPN_ROLE) {
          listRadioCmpn.value.push(item);
        }
      });
    }
  });
});

const back = () => {
  router.push({
    path: SCREEN.roleList.path,
  });
};

const changeData = async (type: any) => {
  storeCommon.setLoading(true);
  typeMenu.value = type;

  await fetchMenu(type);

  listMenu.value = list.value;

  storeCommon.setLoading(false);
};
const findStatusById = (menus: Array<any>, id: number): string | null => {
  for (let menu of menus) {
    if (menu.id === id) {
      return menu.status;
    }
    if (menu.subMenus && menu.subMenus.length > 0) {
      const status = findStatusById(menu.subMenus, id);
      if (status) {
       
        return status;
      }
    }
  }
  return null;
};
const saveData = async () => {
  selectMenu.value.forEach(item => {
    let status = findStatusById(listMenu.value, item);
    listRadio.value.push({id: item, status: status});

  })

  const formData = {
    rlNm: roleName.value,
    rlDesc: description.value,
    menus: listRadio.value,
    rlSiteCdList: selectSiteType.value,
    listCmpnCd: listCmpnCd.value
  };

  storeCommon.setLoading(true);

  await createRole(formData).then((res) => {
    if (res.status && res.status == CREATED_STATUS) {
      storeCommon.setLoading(false);
      Swal.fire({
        text: t("common.message.saveSuccess"),
        type: "warning",
        showCancelButton: false,
        confirmButtonText: t("common.confirm"),
      }).then((result) => {
        if (result.isConfirmed) {
          back();
        }
      });
    }
  });
};

const showAlert = () => {
  Swal.fire({
    text: t("10.role.alert.save"),
    type: "warning",
    showCancelButton: true,
    confirmButtonText: t("common.save"),
    cancelButtonText: t("common.cancel"),
  }).then((result) => {
    if (result.isConfirmed) {
      saveData();
    }
  });
};
</script>

<style lang="scss">
.box {
  display: block !important;
}
</style>
