import Axios from 'axios'

export default function (option?: { secure?: boolean }) {
    const baseURL = import.meta.env.VITE_API_URL as string || 'http://localhost:3333'

    if (option?.secure) {
        return Axios.create({
            baseURL,
            headers: {
                authorization: 'Bearer ' + sessionStorage.getItem('mitsubishi_access_token')
            }
        })
    }
    return Axios.create({ baseURL })
}