<template>
  <section id="content" class="content_wrapper grid_content" tabindex="0">
    <div class="box dp_block">
      <div class="box_section">
        <p class="box_title_sm">
          {{ modeScreen === "create" ? "Create" : "Detail" }} Menu
        </p>

        <table class="tbl_row tbl_border">
          <colgroup>
            <col style="width: 10%" />
            <col style="width: 40%" />
            <col style="width: 10%" />
            <col style="width: 40%" />
          </colgroup>

          <!-- form data -->
          <tbody>
            <!-- Row 1 -->
            <tr>
              <th scope="row">
                <p>Site Type</p>
              </th>
              <td colspan="1">
                <SelectBoxBase
                  :disabled="disabled"
                  :id="'siteId'"
                  :name="'siteId'"
                  v-model="selectSiteValue"
                  :data="listSelectSite"
                >
                </SelectBoxBase>
              </td>

              <th scope="row">
                <p>Parent</p>
              </th>
              <td colspan="3">
                <!--              <SelectBoxBase-->
                <!--                :id="'parentId'"-->
                <!--                :disabled="disabled"-->
                <!--                :name="'parentId'"-->
                <!--                v-model="selectParentValue"-->
                <!--                :data="listSelectParent"-->
                <!--              >-->
                <!--              </SelectBoxBase>-->
                <SelectBoxBaseSearch
                  :id="'parentId'"
                  :disabled="disabled"
                  :name="'parentId'"
                  v-model="selectParentValue"
                  :data="listSelectParent"
                  v-if="
                    (selectParentValue && listSelectParent.length > 0) ||
                    modeScreen === 'create'
                  "
                >
                </SelectBoxBaseSearch>
              </td>
            </tr>

            <!-- Row 2 -->
            <tr>
              <th scope="row">
                <p class="required">Name</p>
              </th>
              <td colspan="1">
                <InputBase
                  v-if="modeScreen != 'detail'"
                  :id="'name'"
                  :name="'name'"
                  v-model:model-value="menuResModel.name"
                >
                </InputBase>

                <span v-else :id="'name'" :name="'name'">
                  {{ menuResModel.name }}
                </span>
              </td>

              <th scope="row">
                <p class="required">VN Name</p>
              </th>
              <td colspan="3">
                <InputBase
                  v-if="modeScreen != 'detail'"
                  :id="'vnName'"
                  :name="'vnName'"
                  v-model:model-value="menuResModel.vnName"
                >
                </InputBase>

                <span v-else :id="'vnName'" :name="'vnName'">
                  {{ menuResModel.vnName }}
                </span>
              </td>
            </tr>
            <tr>
              <th scope="row">
                <p class="required">Screen Name</p>
              </th>
              <td colspan="1">
                <InputBase
                  v-if="modeScreen != 'detail'"
                  :id="'name'"
                  :name="'name'"
                  v-model:model-value="menuResModel.screenName"
                >
                </InputBase>

                <span v-else :id="'name'" :name="'name'">
                  {{ menuResModel.screenName }}
                </span>
              </td>

              <th scope="row">
                <p class="required">Display Order</p>
              </th>
              <td colspan="3">
                <SelectBoxBase
                  v-if="modeScreen == 'create'"
                  :id="'displayOrderCreate'"
                  :disabled="disabled"
                  :name="'displayOrderCreate'"
                  v-model="displayOrderCreateValue"
                  :data="listDisplayOrderCreate"
                >
                </SelectBoxBase>
                <p v-if="modeScreen == 'detail'">{{ displayOrderEditValue }}</p>
                <SelectBoxBase
                  v-if="modeScreen == 'edit' && listDisplayOrderEdit.length > 0"
                  :id="'displayOrderEdit'"
                  :disabled="disabled"
                  :name="'displayOrderEdit'"
                  v-model="displayOrderEditValue"
                  :data="listDisplayOrderEdit"
                >
                </SelectBoxBase>
              </td>
            </tr>
            <!-- Row 3 -->
            <tr>
              <th scope="row">
                <p class="required">Route</p>
              </th>
              <td colspan="3">
                <InputBase
                  v-if="modeScreen != 'detail'"
                  :id="'route'"
                  :name="'route'"
                  :class-name="'wd_p100'"
                  v-model:model-value="menuResModel.route"
                >
                </InputBase>

                <span
                  v-else
                  :id="'route'"
                  :name="'route'"
                  :class-name="'wd_p100'"
                >
                  {{ menuResModel.route }}
                </span>
              </td>
            </tr>

            <!-- Row 4 -->
            <tr v-if="modeScreen != 'create'">
              <th scope="row">
                <p>Create By</p>
              </th>
              <td colspan="3">
                <span
                  :id="'createBy'"
                  :name="'createBy'"
                  :class-name="'wd_p100'"
                >
                  {{ menuResModel.regId }}
                </span>
              </td>
            </tr>

            <!-- Row 5 -->
            <tr v-if="modeScreen != 'create'">
              <th scope="row">
                <p>Create Date</p>
              </th>
              <td colspan="3">
                <span
                  :id="'createDate'"
                  :name="'createDate'"
                  :class-name="'wd_p100'"
                >
                  {{ menuResModel.regDate }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- button action -->
        <div class="box_section mt-8">
          <!-- create -->
          <div v-if="modeScreen == 'create'" class="btn_group btn_center">
            <button
              type="button"
              :disabled="!isCheck"
              class="btn_round btn_md btn_primary"
              @click="confirmAlert()"
            >
              Create
            </button>
            <button
              type="button"
              class="btn_round btn_md btn_white"
              @click="back()"
            >
              Back
            </button>
          </div>

          <!-- detail -->
          <div v-if="modeScreen == 'detail'" class="btn_group btn_center">
            <button
              type="button"
              class="btn_round btn_md btn_primary"
              @click="goEditData()"
            >
              Detail
            </button>
            <button
              type="button"
              class="btn_round btn_md btn_white"
              @click="back()"
            >
              Back
            </button>
          </div>

          <!-- edit -->
          <div v-if="modeScreen == 'edit'" class="btn_group btn_center">
            <button
              type="button"
              class="btn_round btn_md btn_gray"
              @click="handActionDelete()"
            >
              Delete
            </button>

            <button
              type="button"
              :disabled="!isCheck"
              class="btn_round btn_md btn_primary"
              @click="confirmAlert()"
            >
              Edit
            </button>

            <button
              type="button"
              class="btn_round btn_md btn_white"
              @click="back()"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  FORMAT_YYY_MM_DD,
  MODE_CREATE,
  MODE_DETAIL,
  MODE_EDIT,
  MODE_SHOW,
  SUCCSESS_STATUS,
} from "../../constants/screen.const";
import { SCREEN } from "../../router/screen";
import { commonStore } from "../../stores/common";
import { menuStore } from "../../stores/menuService";
import { format } from "date-fns";
import type {
  MenuRequestModel,
  MenuResponseModel,
} from "../../stores/menuService/menu.type";
import Swal from "sweetalert2";
import { getCountOrder } from "@/stores/menuService/menu.service";
import SelectBoxBaseSearch from "@/components/common/input/SelectBoxBaseSearch.vue";
export default defineComponent({
  components: { SelectBoxBaseSearch },

  setup() {
    const storeCommon = commonStore();
    const storeMenu = menuStore();

    return {
      storeCommon,
      storeMenu,
    };
  },

  async beforeMount() {
    this.modeScreen = Array.isArray(this.$route.params.mode)
      ? this.$route.params.mode[0]
      : this.$route.params.mode;
    this.id = window.history.state.id;
    if (this.modeScreen == MODE_DETAIL) {
      this.mode = MODE_DETAIL;
      this.disabled = true;
    }

    this.storeCommon.setLoading(true);
    this.listParent();

    if (this.modeScreen == MODE_CREATE) {
      this.countOrder();
    }
    if (this.modeScreen != MODE_CREATE) {
      await this.storeMenu.getDetailById(this.id);
      if (
        this.storeMenu.status &&
        this.storeMenu.status == SUCCSESS_STATUS &&
        this.storeMenu.detailData
      ) {
        this.menuResModel = this.storeMenu.detailData;
        this.selectSiteValue = this.menuResModel.siteType;
        this.selectParentValue = this.menuResModel.parentId;
        this.displayOrderEditValue = this.menuResModel.displayOrder;
        this.menuResModel.regDate = format(
          this.menuResModel.regDate,
          FORMAT_YYY_MM_DD
        );
      }
    }

    this.storeCommon.setLoading(false);
  },

  async mounted() {},

  data() {
    return {
      id: "",
      mode: MODE_SHOW,
      disabled: false,
      selectParentValue: "",
      displayOrderCreateValue: "",
      displayOrderEditValue: "",
      selectSiteValue: "SITE_01",
      isCheck: false,
      listSelectParent: [] as Array<any>,
      listDisplayOrderCreate: [] as Array<any>,
      listDisplayOrderEdit: [] as Array<any>,
      modeScreen: "",
      listSelectSite: [
        {
          cdId: "SITE_01",
          cdNm: "Admin",
        },
        {
          cdId: "SITE_02",
          cdNm: "Professor",
        },
        {
          cdId: "SITE_03",
          cdNm: "Student",
        },
      ] as Array<any>,
      menuResModel: {} as MenuResponseModel,
      menuReqModel: {} as MenuRequestModel,
    };
  },

  methods: {
    checkValid() {
      this.isCheck =
        this.menuResModel.name &&
        this.menuResModel.vnName &&
        this.menuResModel.screenName &&
        this.menuResModel.route;
      if (this.modeScreen === MODE_CREATE) {
        this.isCheck = this.isCheck && this.displayOrderCreateValue;
      }
    },
    back() {
      this.$router.replace({ path: SCREEN.pathMenu.path });
    },

    goEditData() {
      this.mode = MODE_SHOW;
      this.disabled = false;
      this.modeScreen = MODE_EDIT;
      this.countOrder();
    },

    handActionDelete() {
      Swal.fire({
        title: "Are you sure delete?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteData();
        }
      });
    },
    async listParent() {
      await this.storeMenu.getSelectBoxParent(this.selectSiteValue);
      if (this.storeMenu.status && this.storeMenu.status == SUCCSESS_STATUS) {
        this.listSelectParent = this.storeMenu.resultData.map((item) => ({
          cdId: item.id,
          cdNm: item.name + "(" + item.vnName + ")",
        }));
        this.listSelectParent.unshift({
          cdId: "",
          cdNm: "None",
        });
      }
    },
    noitificationAlert() {
      Swal.fire({
        title: "Successfully!!!",
        icon: "success",
      }).then(() => {
        this.storeCommon.setLoading(false);
        this.back();
      });
    },

    getFormData() {
      this.menuReqModel.id = this.menuResModel.id;
      this.menuReqModel.siteType = this.selectSiteValue;
      this.menuReqModel.name = this.menuResModel.name;
      this.menuReqModel.route = this.menuResModel.route;
      this.menuReqModel.parentId = this.selectParentValue;
      this.menuReqModel.vnName = this.menuResModel.vnName;
      this.menuReqModel.screenName = this.menuResModel.screenName;
      if (this.modeScreen == MODE_CREATE) {
        this.menuReqModel.displayOrder = this.displayOrderCreateValue;
      } else if (this.modeScreen == MODE_EDIT) {
        this.menuReqModel.displayOrder = this.displayOrderEditValue;
      }
    },

    confirmAlert() {
      let title = "";
      if (this.modeScreen == MODE_CREATE) {
        title = "Are you sure save (create)?";
      } else if (this.modeScreen == MODE_EDIT) {
        title = "Are you sure save (edit)?";
      }

      Swal.fire({
        title: title,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
          if (this.modeScreen == MODE_CREATE) {
            this.saveData();
          } else if (this.modeScreen == MODE_EDIT) {
            this.editData();
          }
        }
      });
    },

    async saveData() {
      this.getFormData();
      this.storeCommon.setLoading(true);
      await this.storeMenu
        .createMenu(this.menuReqModel)
        .then(() => {
          if (this.storeMenu.detailData == false) {
            Swal.fire({
              title: "Route name is duplicated!!!",
              icon: "error",
            });
          } else {
            this.noitificationAlert();
          }
        })
        .finally(() => {
          this.storeCommon.setLoading(false);
        });
    },

    async editData() {
      this.getFormData();
      this.storeCommon.setLoading(true);
      await this.storeMenu
        .updateMenu(this.menuReqModel)
        .then(() => {
          this.noitificationAlert();
        })
        .catch(() => {})
        .finally(() => {
          this.storeCommon.setLoading(false);
        });
    },

    async deleteData() {
      this.storeCommon.setLoading(true);
      await this.storeMenu
        .deleteMenu(this.id)
        .then(() => {
          this.noitificationAlert();
        })
        .catch(() => {})
        .finally(() => {
          this.storeCommon.setLoading(false);
        });
    },
    countOrder() {
      if (this.selectParentValue == null) {
        this.selectParentValue = "";
      }
      if (this.modeScreen == MODE_CREATE) {
        this.storeCommon.setLoading(true);
        this.listDisplayOrderCreate = [];
        getCountOrder(this.selectParentValue).then((res) => {
          const maxNumber = res.data.data;
          const startNumber = 1;
          for (let i = startNumber; i <= maxNumber + 1; i++) {
            this.listDisplayOrderCreate.push({
              cdId: i,
              cdNm: i,
            });
          }
          this.storeCommon.setLoading(false);
        });
      } else if (this.modeScreen == MODE_EDIT) {
        this.storeCommon.setLoading(true);
        this.listDisplayOrderEdit = [];
        getCountOrder(this.selectParentValue).then((res) => {
          const maxNumber = res.data.data;
          const startNumber = 1;
          for (let i = startNumber; i <= maxNumber; i++) {
            this.listDisplayOrderEdit.push({
              cdId: i,
              cdNm: i,
            });
          }
          this.storeCommon.setLoading(false);
        });
      }
    },
  },

  watch: {
    menuResModel: {
      handler: "checkValid",
      deep: true,
    },
    displayOrderCreateValue: {
      handler: "checkValid",
      deep: true,
    },
    selectSiteValue(newValue) {
      this.listParent();
    },
    selectParentValue() {
      this.countOrder();
    },
  },
});
</script>
