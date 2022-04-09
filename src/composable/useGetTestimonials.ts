import { onMounted, ref } from "vue";
import useAxios from "./useAxios";

interface Option {
  page: number,
  perPage: number
}

export default function ({ page = 1, perPage = 10 }: Option) {
  const data = ref<any[]>([])
  const pages = ref<number>(0)
  const isLoading = ref<boolean>(false)
  const axios = useAxios()

  const fetcher = (option?: Option) => {
    isLoading.value = true

    const query = new URLSearchParams()
    query.set('page', option ? option.page.toString() : page.toString())
    query.set('perPage', option ? option.perPage.toString() : perPage.toString())

    axios.get('/testimonials?' + query.toString())
      .then((response) => response.data)
      .then((result) => {
        data.value = result.data
        pages.value = Math.ceil(result.meta.total / result.meta.per_page)
      })
      .finally(() => {
        isLoading.value = false
      })
  }

  onMounted(() => {
    fetcher({
      page,
      perPage
    })
  })


  return {
    data,
    pages,
    isLoading,
    fetcher
  }
}