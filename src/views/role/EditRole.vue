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
                  v-model="roleDetail.rlNm"
                  :placeholder="t('10.role.roleName')"
                ></InputBase>
              </td>
            </tr>
            <tr>
              <th scope="row">{{ t("10.role.roleCode") }}</th>
              <td colspan="3">
                <InputBase
                  :placeholder="t('10.role.roleCode')"
                  :readonly="true"
                  v-model="roleDetail.rlCd"
                ></InputBase>
              </td>
            </tr>
            <tr>
              <th scope="row">{{ t("10.role.roleDefn") }}</th>
              <td colspan="3">
                <InputBase
                  :id="'textArea'"
                  :name="'textArea'"
                  v-model="roleDetail.rlDesc"
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
                      v-if="listMenu"
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
            <button type="button" class="btn_xs btn_blue mr-3" @click="showAlert">
              {{ t("common.save") }}
            </button>
            <button type="button" class="btn_xs btn_white" @click="back()">
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
import { SCREEN } from "@/router/screen";
import { useI18n } from "vue-i18n";
import { getDetailRole, updateRole } from "@/stores/role/role.service";
import { Roles } from "@/stores/role/role.type";
import { SUCCSESS_STATUS } from "@/constants/screen.const";
import { menuStores } from "@/stores/menus";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import { SITE_TYPE } from "@/constants/screen.const";
import { CREATED_STATUS } from "@/constants/screen.const";
import { getListCodeMng } from "@/stores/common/codeMng/codeMng.service";
import { UP_CD_ID_ON_OFF } from "@/constants/common.const";
import MenuItem from "./MenuItem.vue";
import { SITE_03 } from "@/constants/common.const";
import { CodeMngModel } from "@/stores/common/codeMng/codeMng.type";
import { UP_CD_ID_CMPN_ROLE } from "@/constants/common.const";

const selectSiteType = ref();
const listSelectBox = ref([]);
const listRadioOnOff = ref([]);
const listRadioCmpn = ref([] as CodeMngModel[]);
const storeMenu = menuStores();
const { list } = storeToRefs(storeMenu);
const { t } = useI18n();
const storeCommon = commonStore();
const router = useRouter();
const codeIdFromParam = window.history.state.id;
const roleDetail = ref<Roles>({
  rlNm: 0,
  rlDesc: "",
  menus: "",
  rlSiteCdList: "",
  listCmpnCd: ""
});

const selectMenu = ref([]);
const selectMenuId = ref([]);

const listMenu = ref([]);
const listMenuRm = ref([]);
const listRadio = ref([]);
const typeMenu = ref("");

const listCmpnCd = ref("");
const listMenuRlDetail = ref([]);

onMounted(async () => {
  storeCommon.setLoading(true);
  const formData = {
    rlId: codeIdFromParam,
  };
  await getDetailRole(formData).then((item) => {
    roleDetail.value = item.data.data;
    listMenuRlDetail.value = item.data.data.menus.slice();
  });

  const categoryType = roleDetail.value.rlSiteCdList;
  typeMenu.value = roleDetail.value.rlSiteCdList;
  selectSiteType.value = categoryType;
  selectMenu.value = roleDetail.value.menus;
  listCmpnCd.value = roleDetail.value.listCmpnCd;

  selectMenuId.value = selectMenu.value;

  await storeMenu.fetchMenus({
    siteType: categoryType,
    roleId: codeIdFromParam,
  });
  listMenu.value = list.value;

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

  storeCommon.setLoading(false);
});

const back = () => {
  router.push({
    path: SCREEN.roleList.path,
  });
};

const changeData = async (type: any) => {
  storeCommon.setLoading(true);
  typeMenu.value = type;
  if (type) {
    await storeMenu.fetchMenus({ siteType: type, roleId: codeIdFromParam });
  } else {
    list.value = [];
  }
  listMenu.value = list.value;
  selectMenu.value = [];
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
  const commonElements = listMenuRlDetail.value.filter((item) =>
    selectMenuId.value.includes(item)
  );

  const updatedList = listMenuRlDetail.value.filter(
    (item) => !commonElements.includes(item)
  );

  selectMenuId.value.forEach((item) => {
    let status = findStatusById(listMenu.value, item);
    listRadio.value.push({ id: item, status: status });
  });

  const formData = {
    rlId: codeIdFromParam,
    rlNm: roleDetail.value.rlNm,
    rlDesc: roleDetail.value.rlDesc,
    menus: listRadio.value,
    rlSiteCdList: selectSiteType.value,
    menuRemove: updatedList,
    listCmpnCd: listCmpnCd.value
  };

  storeCommon.setLoading(true);
  await updateRole(formData).then((res) => {
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
