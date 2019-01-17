import axios from 'utils/http.js'

const article = {
  commentList (params) {
    return axios.get('/comment/list', { params: params })
  },
  commentVerify (id, state) {
    return axios.post('/comment/verify', { id, state })
  }
}

export default article
