import axios from '@/utils/http.js'

export function getDocList() {
  return axios({
    url: '/docs',
    method: 'get'
  })
}
