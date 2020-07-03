import axios from 'axios'

const baseURL = `https://uk-uat-auth.lovespace.com`;

export default {
    signIn(data) {
        return axios.post('/token', `grant_type=password&username=${encodeURIComponent(data.email)}&password=${data.password}`, {
            baseURL,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(response => {
            return response.data
        }).catch(e => {
            console.log(e);
        })
    },
    signUp(data) {
        return axios.post('/account/register', data, {
            baseURL,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            return response.data
        })
    }
}
