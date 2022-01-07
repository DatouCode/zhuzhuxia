import axios from 'axios'

export function signDays() {
  return axios.get('/api/signDays').then(res => {
    return res.data
  })
}

export async function sign(today: string) {
  return axios.get(`/api/sign?today=${today}`).then(res => {
    return res.data
  })
}

export async function danger(today: string) {
  return axios.get(`/api/danger?today=${today}`).then(res => {
    return res.data
  })
}