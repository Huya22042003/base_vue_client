import { ref } from 'vue'
import { defineStore } from 'pinia'
import Swal from 'sweetalert2'

export const commonStore = defineStore('common', () => {
  const loading = ref<boolean>(false)
  const check = ref<boolean>(true)
  const arrRequired = ref<[string]>([])

  const setLoading = (isLoading: boolean) => {
    loading.value = isLoading
  }
  const setRequired = async (id:string) => {
    arrRequired.value.push(id)
    await checkRequired()
  }
  const removeRequired = async (id: string) => {
    arrRequired.value = arrRequired.value.filter((vId: string) => vId !== id)
    await checkRequired()
    return arrRequired.value
  }

  const checkRequired = () => {
    let arr = []

    arrRequired.value.forEach(id => {
      const inputElement = document.getElementById(id);
      if (inputElement ) {
        arr = [...arr, {
          id: id,
          count: inputElement.value.length,
          value : inputElement.value
        }]
      }
    });

    const existNull = arr.some(item => item.count === 0 || item.value == '선택');

    if (existNull) {
      check.value = true
    } else {
      check.value = false
    }
    // if(check.value){
    //   Swal.fire({
    //     title: "Are you sure?",
    //     text: "you want to Cancel Operation!",
    //     showCancelButton: false,
    //     showConfirmButton:false,
    //     icon: "error",
    //   })
    // }
  }

  return {
    loading,
    setLoading,
    check,
    checkRequired,
    setRequired,
    removeRequired,
    arrRequired
  }
})
