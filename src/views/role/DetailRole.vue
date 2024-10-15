<template>
  <Wrapper>
    <Breadcrumb :pageTitle="t('10.role.pageTitle')"></Breadcrumb>
    <BlockInput>
      <div class="box_section">
        <p class="box_title_sm">{{ t('10.role.pageTitle') }}</p>
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
                  :mode="mode"
                  :placeholder="''"
                  :isDisable="isDisable"
                  v-model="roleDetail.rlNm"
                  readonly
                ></InputBase>
              </td>
            </tr>
            <tr>
              <th scope="row">{{ t("10.role.roleCode") }}</th>
              <td colspan="3">
                <InputBase
                  :mode="mode"
                  :isDisable="isDisable"
                  v-model="roleDetail.rlCd"
                  readonly
                ></InputBase>
              </td>
            </tr>
            <tr>
              <th scope="row">{{ t("10.role.roleDefn") }}</th>
              <td colspan="3">
                <InputBase
                  :mode="mode"
                  v-model="roleDetail.rlDesc"
                  :isDisable="isDisable"
                  readonly
                ></InputBase>
              </td>
            </tr>
            <tr>
              <th scope="row">{{ t("10.role.siteType") }}</th>
              <td colspan="3">
                <div style="width: 200px">
                  <CheckboxBase
                    v-for="item in listSelectBox"
                    :mode="'show'"
                    :value="item.cdId"
                    :id="item.cdId"
                    :className="item.cdId"
                    :name="item.cdId"
                    :label="item.cdNm"
                    :key="item.cdId"
                    v-model="selectSiteType"
                    :isDisable="true"
                  >
                  </CheckboxBase>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">{{ t("10.role.menu") }}</th>
              <td colspan="3">
                <ul>
                  <li class="">
                    <div
                      class="flex flex-col"
                      v-for="(item, index) in listMenuParent"
                      :key="index"
                    >
                      <p
                        data-v-935cd17a=""
                        v-if="item"
                        class="check_row check_row_base"
                      >
                        <input
                          :id="item.id + 'menu'"
                          :name="item.id"
                          type="checkbox"
                          true-value="true"
                          false-value="false"
                          :disabled="true"
                          :value="item.id"
                          v-model="selectMenu"
                        /><label :for="item.id + 'menu'">{{
                          item?.name
                        }}</label>
                      </p>
                      <ul class="pl-5 py-2">
                        <li
                          v-for="(itemChild, idx) in item.childMenu"
                          :key="idx"
                        >
                          <p class="check_row check_row_base">
                            <input
                              :id="itemChild.id"
                              type="checkbox"
                              true-value="true"
                              false-value="false"
                              class=""
                              :disabled="true"
                              :value="itemChild.id"
                              v-model="selectMenu"
                            /><label :for="itemChild.id">{{
                              itemChild?.name
                            }}</label>
                          </p>
                          [ {{ t("10.role.permission") }}
                          <RadiobuttonBase
                            v-for="item1 in listRadio1"
                            :mode="'show'"
                            :value="item1.name"
                            :id="item1.id + itemChild.id + item1.name"
                            :name="item1.cd + itemChild.id"
                            :key="item1.id"
                            :label="item1.name"
                            :checked="item1.id == 'RADIO_1' ? 'checked' : ''"
                            :isDisable="true"
                          >
                          </RadiobuttonBase>
                          ]
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="box_section" v-if="!checkRole">
          <div class="btn_area">
            <button type="button" class="btn_md btn_blue" @click="goToEdit()">
              {{ t("common.save") }}
            </button>
            <button type="button" class="btn_md btn_white" @click="back()">
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
import InputTextBase from "@/components/common/input/InputTextBase.vue";
import { ref } from "vue";
import { commonStore } from "@/stores/common";
import { SCREEN } from "@/router/screen";
import { useI18n } from "vue-i18n";
import { getDetailRole } from "@/stores/role/role.service";
import { menuStores } from "../../stores/menus/index";
import {
  SUCCSESS_STATUS,
  ROLE_SUPER_ADMIN,
  SITE_TYPE,
} from "../../constants/screen.const";
import { Roles } from "@/stores/role/role.type";
import { codeMngStore } from "../../stores/common/codeMng/index";
  import { useRouter } from 'vue-router'
const codeStore = codeMngStore();

const { t } = useI18n();
const mode = ref("show");
const isDisable = ref(true);
const router = useRouter()
const codeIdFromParam = window.history.state.id;
const storeCommon = commonStore();
const storeMenu = menuStores();
const { list } = storeToRefs(storeMenu);
const roleDetail = ref<Roles>({
  code: 0,
  roleExplain: "",
  menus: [],
  name: "",
});
const selectSiteType = ref();
const listSelectBox = ref([]);
const listRadio1 = ref([
  { id: "RADIO_1", name: "On", cd: "cd" },
  { id: "RADIO_2", name: "Off", cd: "cd" },
]);
const checkRole = ref();

const fetchMenu = async (query) => {
  await storeMenu.fetchMenus(query);
};

const selectMenu = ref([]);
const getChildMenu = (id?: string) => {
  const childMenu = list.value.filter((item) => item?.parentId === id);
  childMenu.forEach((item) => {
    roleDetail.value.menus.forEach((item1) => {
      if (item.id === item1.id) {
        selectMenu.value.push(item.id);
      }
    });
  });

  return childMenu;
};
const listMenu = ref([]);
const listMenuParent = ref([]);
onBeforeMount(async () => {
  storeCommon.setLoading(true);
    const codeMng = {
      upCdId: SITE_TYPE,
    };

    await codeStore.getCodeInfo(codeMng);
    if (codeStore.status) {
      listSelectBox.value = codeStore.codeInfo.data;
    }
    storeCommon.setLoading(false);
});
onMounted(async () => {
  storeCommon.setLoading(true);
  const formData = {
    rlId: codeIdFromParam,
  };
  await getDetailRole(formData).then((item) => {
    roleDetail.value = item.data.data;
  });

  const categoryType = roleDetail.value.category
    .split(",")
    .map((type) => type.trim());
  selectSiteType.value = categoryType;

  if (categoryType.length == 2) {
    await fetchMenu("");
  } else {
    await fetchMenu(categoryType);
  }
  listMenu.value = list.value;
  listMenuParent.value = list.value.filter((item) => item?.parentId === null);

  listMenuParent.value.forEach((item) => {
    roleDetail.value.menus.forEach((item1) => {
      if (item.id === item1.id) {
        selectMenu.value.push(item.id);
      }
      item.childMenu = getChildMenu(item.id);
    });
  });
  storeCommon.setLoading(false);
});

const goToEdit = () => {
  router.push({
    path: SCREEN.roleEdit.path,
    state: { id: codeIdFromParam },
  });
};
const back = () => {
  router.push({
    path: SCREEN.roleList.path,
  });
};
</script>

<style lang="scss">
.box {
  display: block !important;
}
</style>
