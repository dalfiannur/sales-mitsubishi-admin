import { onMounted, ref } from "vue"
import { Paginate } from "../typings/Paginate"
import { Product } from "../typings/Product"
import useAxios from "./useAxios"

export default function () {
    const axios = useAxios()
    const data = ref<Product[]>([])

    const refetch = () => {
        axios.get('/products')
            .then((response) => response.data)
            .then((result) => {
                data.value = result.data
            })
    }

    onMounted(() => refetch())

    return {
        data,
        refetch
    }
}