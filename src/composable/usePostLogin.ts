import { useRouter } from "vue-router"
import useAxios from "./useAxios"
import { useDialog } from 'naive-ui'

export default function usePostLogin() {
    const axios = useAxios()
    const router = useRouter()
    const dialog = useDialog()

    const mutate = (data: { email: string, password: string }) => {
        axios.post('/auth/login', data)
            .then((response) => response.data)
            .then((result) => {
                sessionStorage.setItem('mitsubishi_access_token', result.token)
                router.push('/')
            })
            .catch(() => {
                dialog.error({
                    title: 'Login Failed',
                    content: 'Please check your email and password.'
                })
            })
    }

    return {
        mutate
    }
}