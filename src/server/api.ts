import axios from 'axios'

export function signDays(user: string) {
  return axios.get('/api/signDays', {params: {user}}).then(res => {
    return res.data
  })
}

export async function sign(user: string, today: string) {
  return axios.get('/api/sign', {params: {user, today}}).then(res => {
    return res.data
  })
}

export async function danger(user: string, today: string) {
  return axios.get('/api/danger', {params: {user, today}}).then(res => {
    return res.data
  })
}