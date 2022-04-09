import { useLoadingBar } from "naive-ui"
import useAxios from "./useAxios"

export default function () {
  const axios = useAxios()
  const loading = useLoadingBar()

  const mutate = (productId: number, imageId: number) => {
    loading.start()
    axios
      .delete(`/products/${productId}/images/${imageId}`)
      .catch(() => {
        loading.error()
      })
      .finally(() => {
        loading.finish()
      })
  }

  return { 
    mutate
  }
}