import { useLoadingBar } from "naive-ui"
import { ref, watch } from "vue"
import useAxios from "./useAxios"

export default function () {
    const axios = useAxios({ secure: true })
    const loading = useLoadingBar()
    const isProcessing = ref<boolean>(false)
    const success = ref<boolean>(false)

    const mutate = (id: number) => {
        loading.start()
        isProcessing.value = true
        axios.delete('/news/' + id)
            .then((response) => response.data)
            .then(() => {
                success.value = true
            })
            .catch(() => {
                loading.error()
            })
            .finally(() => {
                isProcessing.value = false
                loading.finish()
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