<template>
  <div class="page_wrapper">
    <section id="content" class="content_wrapper grid_content" tabindex="0">
      <Breadcrumb :pageTitle="pageTitle" :breadcrumbItems="breadcrumbItems" />
      <div class="box dp_block">
        <div class="box_section">
          <table class="tbl_row tbl_border">
            <colgroup>
              <col style="width: 21%" />
              <col style="width: auto" />
            </colgroup>
            <tbody>
              <tr>
                <th scope="row">
                  <p>{{ t("userManagement.dept") }}</p>
                </th>
                <td colspan="3">
                  <span>{{ dataDetail.deptNm }}</span>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <p>{{ t("userManagement.staffNo") }}</p>
                </th>
                <td colspan="3">
                  <span>{{ dataDetail.userId }}</span>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <p>{{ t("userManagement.name") }}</p>
                </th>
                <td colspan="3">
                  <span>{{ dataDetail.name }}</span>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <p>{{ t("userManagement.position") }}</p>
                </th>
                <td colspan="3">
                  <span>{{ dataDetail.positionNm }}</span>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <p>{{ t("userManagement.role") }}</p>
                </th>
                <td colspan="3">
                  <ListCheckBoxBase
                    v-if="listRole.length > 0"
                    :listData="listRole"
                    :mode="'show'"
                    v-model="checkedRole"
                    id="checkAll"
                    name="checkAll"
                    :hasCheckAll="false"
                  />
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <p>{{ t("userManagement.roleOfDept") }}</p>
                </th>
                <td>{{ dataDetail.userDeptNames }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="dp_flex btn_group btn_end mt-7" style="gap: 10px">
          <button
            type="button"
            class="btn_round btn_xs btn_primary"
            @click="confirmSave"
          >
            {{ t("common.save") }}
          </button>
          <button class="btn_round btn_xs btn_white" @click="back">
            {{ t("common.list") }}
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import { defineComponent, ref } from "vue";
import { commonStore } from "../../stores/common";
import { SCREEN } from "../../router/screen";
import type {
  UserMngModel,
  DetailModel,
} from "../../stores/userManagement/userManagement.type";
import type { CodeMngModel } from "../../stores/common/codeMng/codeMng.type";
import { useI18n } from "vue-i18n";
import {
  getDetaiData,
  getListRole,
  updateRole,
} from "@/stores/userManagement/userManagement.service";
import { getListCodeMng } from "@/stores/common/codeMng/codeMng.service";
import { SYS_CD_ID } from "@/constants/common.const";

export default defineComponent({
  name: "UserMng",
  components: { Breadcrumb },
  setup() {
    const { t } = useI18n();
    const cmn = commonStore();
    return { t, cmn };
  },
  data() {
    return {
      pageTitle: this.t("userManagement.pageTitle"),
      breadcrumbItems: [],
      modeScreen: "",
      userId: "",
      dataDetail: {} as UserMngModel,
      listRole: [] as Array<CodeMngModel>,
      checkedRole: ref(""),
      createData: {} as DetailModel,
      listSys: [] as CodeMngModel[],
    };
  },
  async beforeMount() {
    this.modeScreen = this.$route.params.mode;
    this.userId = window.history.state.userId;
    await this.getDataRole();
  },
  methods: {
    async getDataDetail() {
      this.cmn.setLoading(true);
      const res = await getDetaiData(this.userId);
      this.dataDetail = res.data.data;
      if (Array.isArray(this.dataDetail.roleList)) {
        this.checkedRole = this.dataDetail.roleList
          .map((element) => element.rlId)
          .toString();
      }
      this.cmn.setLoading(false);
    },
    async getDataRole() {
      await this.getDataDetail();
      const res = await getListRole();
      if (res.data && res.data.data && Array.isArray(res.data.data)) {
        this.listRole = res.data.data.map((element: any) => ({
          cdId: element.roleId,
          cdNm: element.roleName,
        }));
      }
    },
    confirmSave() {
      this.$swal({
        text: this.t("userManagement.messageConfirmSave"),
        type: "warning",
        showCancelButton: true,
        confirmButtonText: this.t("common.save"),
        cancelButtonText: this.t("common.cancel"),
      }).then((result: any) => {
        if (result.isConfirmed) {
          this.save();
        }
      });
    },
    save() {
      this.createData.userId = this.dataDetail.userId;
      this.createData.posiSysCd = this.dataDetail.posiSysNm
      if (
        typeof this.checkedRole == "string" &&
        this.checkedRole.trim() != ""
      ) {
        this.createData.listRoleId = this.checkedRole.split(",").map(Number);
      } else if (Array.isArray(this.checkedRole)) {
        this.createData.listRoleId = this.checkedRole.map(Number);
      } else {
        this.createData.listRoleId = [];
      }

      updateRole(this.createData).then(() => {
        this.$swal({
          text: this.t("userManagement.messageSuccessSave"),
          type: "success",
          showCancelButton: true,
          showConfirmButton: false,
          cancelButtonText: this.t("common.confirm"),
        }).then(() => {
          this.back();
        });
      });
    },
    back() {
      this.$router.push({
        name: SCREEN.userManagement.name,
      });
    },
  },
});
</script>
<style lang="css" scoped>
.flex_box {
  display: flex;
  gap: 10px;
}
.red_color {
  color: red;
}
</style>
