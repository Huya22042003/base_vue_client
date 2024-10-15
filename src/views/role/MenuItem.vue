<template>
  <ul>
    <li v-for="item in items" :key="item.id">
      <p class="check_row check_row_base">
        <CheckboxBase
          :id="item.id"
          :class="item.id"
          :value="item.id"
          :label="item.name"
          v-model="selectedMenuItems"
          @change="updateSelectedMenu(item.id)"
        />
      </p>
      [ {{ t("10.role.permisstion") }}
      <RadiobuttonBase
        v-for="item1 in listRadioOnOff"
        :value="item1.cdId"
        :id="item1.cdId + item.id + item1.cdNm"
        :name="item1.upCdId + item.id"
        :key="item1.cdId"
        :label="item1.cdNm"
        v-model="item.status"
        :checked="item1.cdId == item.status"
        v-if="listRadioOnOff"
      >
      </RadiobuttonBase>
      ]
      <MenuItem
        v-if="item.subMenus"
        :items="item.subMenus"
        :listRadioOnOff="listRadioOnOff"
        :listData="listData"
        v-model:selectMenu="selectedMenuItems"
      />
    </li>
  </ul>
</template>

<script setup lang="ts">
import { defineProps, ref } from "vue";
import { CodeMngModel } from "@/stores/common/codeMng/codeMng.type";
import { getListCodeMng } from "@/stores/common/codeMng/codeMng.service";
import { useI18n } from "vue-i18n";
import { UP_CD_ID_ON_OFF } from "@/constants/common.const";
import { SUCCSESS_STATUS } from "@/constants/screen.const";

const props = defineProps<{
  items: Array<any>;
  listData: Array<any>;
  listRadioOnOff: CodeMngModel[];
  selectMenu: String[];
}>();
const { t } = useI18n();
const emit = defineEmits(["update:selectMenu"]);

const selectedMenuItems = props.selectMenu;

function addAllSubMenus(menuId, listMenu) {
  const menuItem = listMenu.find((item) => item.id === menuId);
  if (menuItem && menuItem.subMenus && menuItem.subMenus.length > 0) {
    menuItem.subMenus.forEach((subMenu) => {
      if (!selectedMenuItems.includes(subMenu.id)) {
        selectedMenuItems.push(subMenu.id);
      }
      if (subMenu.subMenus && subMenu.subMenus.length > 0) {
        addAllSubMenus(subMenu.id, menuItem.subMenus);
      }
    });
  }
}

function removeAllSubMenus(menuId, listMenu) {
  const menuItem = listMenu.find((item) => item.id === menuId);
  if (menuItem && menuItem.subMenus && menuItem.subMenus.length > 0) {
    menuItem.subMenus.forEach((subMenu) => {
      const subMenuIndex = selectedMenuItems.indexOf(subMenu.id);
      if (subMenuIndex > -1) {
        selectedMenuItems.splice(subMenuIndex, 1);
      }
      if (subMenu.subMenus && subMenu.subMenus.length > 0) {
        removeAllSubMenus(subMenu.id, menuItem.subMenus);
      }
    });
  }
}

function searchSubMenus(menuId, subMenus) {
  if (!subMenus) return null;

  for (const subMenu of subMenus) {
    if (subMenu.id === menuId) {
      return subMenu;
    }

    const foundMenu = searchSubMenus(menuId, subMenu.subMenus);
    if (foundMenu) {
      return foundMenu;
    }
  }

  return null;
}

function findMenu(menuId, listMenu) {
  for (const menu of listMenu) {
    if (menu.id === menuId) {
      return menu;
    }

    const foundMenu = searchSubMenus(menuId, menu.subMenus);
    if (foundMenu) {
      return foundMenu;
    }
  }

  return null;
}

function findSiblingIds(menuId, listMenu) {
  const menuItem = findMenu(menuId, listMenu);

  if (menuItem && menuItem.parentId !== null) {
    const parentMenu = findMenu(menuItem.parentId, listMenu);

    if (parentMenu && parentMenu.subMenus) {
      return parentMenu.subMenus.map((subMenu) => subMenu.id);
    }
  }

  return [];
}

function checkMenuParent(menuId) {
  const menuItem = findMenu(menuId, props.listData);

  if (menuItem && menuItem.parentId) {
    if (!selectedMenuItems.includes(menuItem.parentId)) {
      selectedMenuItems.push(menuItem.parentId);
    }

    const parent = findMenu(menuItem.parentId, props.listData);

    if (parent) {
      checkMenuParent(parent.id);
    }
  }
}

function unCheckMenuParent(menuId) {
  const menuItem = findMenu(menuId, props.listData);

  const listMenuId = findSiblingIds(menuId, props.listData);

  const allSiblingsUnchecked = listMenuId.every(
    (id) => !selectedMenuItems.includes(id)
  );

  if (allSiblingsUnchecked && menuItem.parentId) {
    const parentIndex = selectedMenuItems.indexOf(menuItem.parentId);
    if (parentIndex > -1) {
      selectedMenuItems.splice(parentIndex, 1);
    }
    unCheckMenuParent(menuItem.parentId);
  }
}

function updateSelectedMenu(newSelectedMenu) {
  const index = selectedMenuItems.indexOf(newSelectedMenu);

  if (index > -1) {
    selectedMenuItems.splice(index, 1);
    removeAllSubMenus(newSelectedMenu, props.items);
    unCheckMenuParent(newSelectedMenu);
  } else {
    selectedMenuItems.push(newSelectedMenu);
    addAllSubMenus(newSelectedMenu, props.items);
    checkMenuParent(newSelectedMenu);
  }

  emit("update:selectMenu", selectedMenuItems);
}
</script>

<style scoped>
ul {
  list-style-type: none;
  padding-left: 20px;
}

input[type="checkbox"] {
  margin-right: 5px;
}
</style>
