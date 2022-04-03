import Axios from 'axios'

export default function (option?: { secure?: boolean }) {
    if (option?.secure) {
        return Axios.create({
            baseURL: 'https://api.mitsubishi-jakartapusat.com',
            headers: {
                authorization: 'Bearer ' + sessionStorage.getItem('mitsubishi_access_token')
            }
        })    
    }
    return Axios.create({
        baseURL: 'https://api.mitsubishi-jakartapusat.com',
    })
}