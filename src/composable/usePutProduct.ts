import { useLoadingBar } from "naive-ui"
import { ref, watch } from "vue"
import { ProductDto } from "../typings/Product"
import useAxios from "./useAxios"

export default function() {
  const axios = useAxios({ secure: true })
  const loading = useLoadingBar()
  const isProcessing = ref<boolean>(false)
  const isFinish = ref<boolean>(false)
  const isError = ref<boolean>(false)

  const onSuccess = (callback: () => void) => {
    watch(isFinish, (val) => {
      if (val) {
        callback()
      }
    })
  }

  const onError = (callback: () => void) => {
    watch(isError, (val) => {
      if (val) {
        callback()
      }
    })
  }

  const mutate = (id: number, data: ProductDto) => {
    loading.start()
    isFinish.value = false
    isError.value = false
    isProcessing.value = true

    axios.put("/products/" + id, data)
      .then(() => {
        isFinish.value = true
      })
      .catch(() => {
        loading.error()
        isError.value = true
      })
      .finally(() => {
        loading.finish()
        isProcessing.value = false
      })
  }

  return {
    mutate,
    onSuccess,
    onError,
    isProcessing
  }
}