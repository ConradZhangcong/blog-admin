import axios from 'utils/http.js'
// import qs from 'qs'

const article = {
  articleList (params) {
    return axios.get('/admin/article/list', {
      params: params
    })
  },
  articlePublish (params) {
    return axios.post('/admin/article/publish', params)
  }
}

export default article
