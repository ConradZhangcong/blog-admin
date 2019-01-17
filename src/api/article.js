import axios from 'utils/http.js'
// import qs from 'qs'

const article = {
  articleList (params) {
    return axios.get('/article/list', {
      params: params
    })
  },
  articlePublish (params) {
    return axios.post('/article/publish', params)
  }
}

export default article
