import { useLoadingBar } from "naive-ui"
import { ref, watch } from "vue"
import { NewsDto } from "../typings/News"
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

  const mutate = (data: NewsDto) => {
    loading.start()
    isFinish.value = false
    isError.value = false
    isProcessing.value = true

    axios.post("/news", data)
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