<template>
  <section id="content" class="content_wrapper grid_content" tabindex="0">
    <Breadcrumb :pageTitle="pageTitle" :breadcrumbItems="breadcrumbItems"></Breadcrumb>

    <div class="box dp_block">
      <div class="box_section">
        <table class="tbl_col">
          <colgroup>
            <col style="width: 20%;">
            <col style="width: auto;">
          </colgroup>
          <thead>
          </thead>
          <tbody>
            <tr>
              <td>{{ t('schoolStaff.socialActivities.detail.type') }}</td>
              <td>{{ socialServeAplcnResponseModel.serveTypeNm }}</td>
            </tr>
            <tr>
              <td>{{ t('schoolStaff.socialActivities.detail.topic') }}</td>
              <td>{{ socialServeAplcnResponseModel.serveTtl }}</td>
            </tr>
            <tr>
              <td>{{ t('schoolStaff.socialActivities.detail.content') }}</td>
              <td v-html="socialServeAplcnResponseModel.serveCont"></td>
            </tr>
            <tr>
              <td>{{ t('schoolStaff.socialActivities.detail.certificationTime') }}</td>
              <td>{{ socialServeAplcnResponseModel.actTime }}</td>
            </tr>
            <tr>
              <td>{{ t('schoolStaff.socialActivities.detail.activityTime') }}</td>
              <td>{{ formatDate(socialServeAplcnResponseModel.serveDurStr) + " ~ " +
                formatDate(socialServeAplcnResponseModel.serveDurEnd) }}</td>
            </tr>
            <tr>
              <td>{{ t('schoolStaff.socialActivities.detail.dayTime') }}</td>
              <td>{{ customTimeWork(socialServeAplcnResponseModel.timeWork) }}</td>
            </tr>
            <tr>
              <td>{{ t('schoolStaff.socialActivities.detail.recruitmentTime') }}</td>
              <td>{{ formatDate(socialServeAplcnResponseModel.recrDurStr) + " ~ " +
                formatDate(socialServeAplcnResponseModel.recrDurEnd) }}</td>
            </tr>
            <tr>
              <td>{{ t('schoolStaff.socialActivities.detail.recruitmentCount') }}</td>
              <td>{{ socialServeAplcnResponseModel.recrMemb }}</td>
            </tr>

            <tr>
              <td>{{ t('schoolStaff.socialActivities.detail.volunteerSubjects') }}</td>
              <td>{{ socialServeAplcnResponseModel.volunteerSoci }}</td>
            </tr>
            <tr>
              <td>{{ t('schoolStaff.socialActivities.detail.activityField') }}</td>
              <td>{{ socialServeAplcnResponseModel.activitySoci }}</td>
            </tr>
            <tr>
              <td>{{ t('schoolStaff.socialActivities.detail.place') }}</td>
              <td>{{ socialServeAplcnResponseModel.serveLoc }}</td>
            </tr>
            <tr v-if="route.params.type === 'school'">
              <td>{{ t('schoolStaff.socialActivities.detail.file') }}</td>
              <td>
                <InputFileBase :referKey="id" :mode="'detail'" id="imageFile" name="imageFile" :type="fileTypeOffice"
                  v-model="file" ref="imageRef" :orgName="'SOCIAL_SERVE'" :category="'SOCIAL_SERVE'"
                  :sectionName="'SOCIAL_SERVE'"></InputFileBase>
              </td>
            </tr>
            <tr v-if="route.params.type === 'personal'">
              <td>{{ t('schoolStaff.socialActivities.detail.url') }}</td>
              <td><a class="socialUrl" :href="socialServeAplcnResponseModel.url" target="_blank">{{
                socialServeAplcnResponseModel.url
              }}</a> </td>
            </tr>
            <tr>
              <td>{{ t('schoolStaff.socialActivities.detail.teamLead') }}</td>
              <td>{{ socialServeAplcnResponseModel.mgrNm }} </td>
            </tr>
            <tr>
              <td>{{ t('schoolStaff.socialActivities.detail.phone') }}</td>
              <td>{{ socialServeAplcnResponseModel.mgrCntc }} </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="box_section">
      <div class="btn_group btn_end">
        <button v-if="isRecruiting(socialServeAplcnResponseModel.recrDurStr, socialServeAplcnResponseModel.recrDurEnd)"
                :disabled="socialServeAplcnResponseModel.aplcnSeq != null || socialServeAplcnResponseModel.stsCd != SOCIAL_STS_CD_ID_RECRUITING"
                type="button" class="button btn_xs btn_secondary btn_responsive" @click="handleRegister">
          {{t('schoolStaff.socialActivities.detail.register')}}
        </button>
        <button v-if="isRecruiting(socialServeAplcnResponseModel.recrDurStr, socialServeAplcnResponseModel.recrDurEnd)"
                :disabled="socialServeAplcnResponseModel.aplcnSeq == null || socialServeAplcnResponseModel.stsCd != SOCIAL_STS_CD_ID_RECRUITING"
                type="button" class="button btn_xs btn_lightgray btn_responsive" @click="handleCancelRegister">
          {{t('schoolStaff.socialActivities.detail.cancelRegister')}}
        </button>
        <button type="button" class="button btn_xs btn_white btn_responsive " v-on:click="back()">
          {{t('common.list')}}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import { inject, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import InputFileBase from "@/components/common/input/InputFileBase.vue";
import { SCREEN } from "@/router/screen";
import { commonStore } from "@/stores/common";
import { socialServeAplcnStore } from '@/stores/socialServeAplcn';
import { SocialServeAplcnResponseModel, SocialServeAplcnRequestModel } from '@/stores/socialServeAplcn/socialServeAplcn.type';
import { useI18n } from "vue-i18n";
import {
  SUCCSESS_STATUS,
  CREATED_STATUS,
  ACCEPTTYPE_OFICE_AND_IMG,
  SOCIAL_STS_CD_ID_RECRUITING,
  FORMAT_YYY_MM_DD
} from '@/constants/screen.const.ts'
import { format } from "date-fns";
const { t } = useI18n()

const route = useRoute()
const router = useRouter()
const swal = inject('$swal')
const store = commonStore()
const storeSocial = socialServeAplcnStore()
const cmn = commonStore();
const fileTypeOffice = ACCEPTTYPE_OFICE_AND_IMG;
const file = ref('')
const pageTitle = ref(t('schoolStaff.socialActivities.detail.pageTitle'))
const breadcrumbItems = ref([
  { label: 'HOME', link: '/' },
  { label: 'dept1', link: '#' },
  { label: 'dept2', link: '/banner' }
])
const id = ref(null)
const socialServeAplcnResponseModel = ref<SocialServeAplcnResponseModel>({});
const socialServeAplcnRequestModel = ref<SocialServeAplcnRequestModel>({});
onBeforeMount(async () => {
  await getDataDetail()
});

//func
const handleRegister = async () => {
  await swal({
    text: t('schoolStaff.socialActivities.detail.modal.register.title'),
    input: 'text',
    inputPlaceholder: t('schoolStaff.socialActivities.detail.modal.register.placeholder'),
    showCancelButton: true,
    confirmButtonText: t('common.register'),
    cancelButtonText: t('common.cancel'),
    inputValidator: (value: any) => {
      if (!value) {
        return t('schoolStaff.socialActivities.detail.modal.register.validator');
      }
    }
  }).then((result: any) => {
    if (result.isConfirmed) {
      register(result.value)
    }
  })
}

const handleCancelRegister = () => {
  swal({
    text: t('schoolStaff.socialActivities.detail.modal.cancelRegister.title'),
    showCancelButton: true,
    confirmButtonText: t('common.confirm'),
    cancelButtonText: t('common.cancel'),
  }).then((result: any) => {
    if (result.isConfirmed) {
      cancelRegister()
    }
  })
}

const register = async (idPortal: any) => {
  store.setLoading(true)
  socialServeAplcnRequestModel.value.servePortalId = idPortal
  socialServeAplcnRequestModel.value.sociServeSeq = socialServeAplcnResponseModel.value.sociServeSeq
  await storeSocial.registerObj(socialServeAplcnRequestModel.value)
    .then(() => {
      if (storeSocial && storeSocial.status == CREATED_STATUS) {
        showAlert(t('schoolStaff.socialActivities.detail.modal.register.alertMessage'), back)
      }
    })
    .catch((error: any) => {
      showAlert(error)
    })
    .finally(() => {
      store.setLoading(false)
    });
}

const cancelRegister = async () => {
  store.setLoading(true)
  socialServeAplcnRequestModel.value.aplcnSeq = socialServeAplcnResponseModel.value.aplcnSeq
  await storeSocial.deleteObjById(socialServeAplcnRequestModel.value)
    .then(() => {
      if (storeSocial && storeSocial.status == SUCCSESS_STATUS) {
        showAlert(t('schoolStaff.socialActivities.detail.modal.cancelRegister.alertMessage'), back)
      }
    })
    .catch((error: any) => {
      showAlert(error)
    })
    .finally(() => {
      store.setLoading(false)
    });
}

const getDataDetail = async () => {
  id.value = window.history.state.id

  if (!id.value) {
    back();
  }
  cmn.setLoading(true)
  await storeSocial.getDetailById(id.value)
    .then(() => {
      if (storeSocial && storeSocial.status == SUCCSESS_STATUS) {
        socialServeAplcnResponseModel.value = storeSocial.detailData
      }
    })
    .catch((error: any) => {
      back()
      throw new Error(error)
    })
    .finally(() => {
      cmn.setLoading(false)
    });

}
const back = () => {
  router.replace({ name: SCREEN.socialActivities.name })
}

function formatDate(dateStr: string) {
  if (dateStr) {
    return format(dateStr, FORMAT_YYY_MM_DD)
  }
  return ``;
}

const customTimeWork = (data: any) => {
  const day = data?.split(',')
  var html = ""
  day?.forEach((item: any, index: number) => {
    const time = item?.split('-')
    html += `${time[0]?.trim()} [ ${time[1]?.trim()}시]:[${time[2]}분] ,`
  })
  return html
}

const isRecruiting = (str: any, end: any) => {
  const now = new Date();
  const recruitmentStart = new Date(str);
  const recruitmentEnd = new Date(end);
  return now >= recruitmentStart && now <= recruitmentEnd;
};
//alert
const showAlert = (message: string, callBackConfig: Function = () => { }) => {
  swal.fire({
    text: message,
    showCancelButton: false,
    showConfirmButton: true,
    confirmButtonText: t('common.confirm'),
    cancelButtonText: t('common.cancel'),
  }).then((result: any) => {
    if (result.isConfirmed) {
      callBackConfig()
    }
  })

};

</script>

<style scoped>
.socialUrl {
  color: #2704FF !important;
}
</style>