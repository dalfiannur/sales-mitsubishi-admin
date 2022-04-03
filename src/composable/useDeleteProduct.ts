import { ref, watch } from "vue"
import useAxios from "./useAxios"

export default function () {
    const axios = useAxios({ secure: true })
    const isProcessing = ref<boolean>(false)
    const success = ref<boolean>(false)

    const mutate = (id: number) => {
        isProcessing.value = true
        axios.delete('/products/' + id)
            .then((response) => response.data)
            .then(() => {
                success.value = true
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

    return {
        mutate,
        isProcessing,
        onSuccess
    }
}