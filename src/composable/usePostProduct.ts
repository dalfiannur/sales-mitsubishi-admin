import { ref, watch } from "vue";
import { Product } from "../typings/Product";
import useAxios from "./useAxios";

export default function () {
    const axios = useAxios({ secure: true })
    const success = ref<boolean>(false)
    const isProcessing = ref<boolean>(false)
    const error = ref<boolean>(false)

    const mutate = (data: Omit<Product, "id" | "created_at">) => {
        success.value = false
        error.value = false
        isProcessing.value = true
        axios.post('/products', data)
            .then((response) => response.data)
            .then((result) => {
                success.value = true
            })
            .catch(() => {
                error.value = true
            })
            .finally(() => {
                isProcessing.value = false
            })
    }

    const onSuccess = (callback: () => void) => {
        watch(success, (val) => {
            if (val) {
                callback()
            }
        })
    }

    const onError = (callback: () => void) => {
        watch(error, (val) => {
            if (val) {
                callback()
            }
        })
    }

    return {
        isProcessing,
        mutate,
        onSuccess,
        onError
    }
}