import { useLoadingBar } from "naive-ui"
import useAxios from "./useAxios"

export default function () {
  const axios = useAxios()
  const loading = useLoadingBar()

  const mutate = (productId: number, data: string) => {
    loading.start()
    axios
      .post(`/products/${productId}/images`, { images: [data] })
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