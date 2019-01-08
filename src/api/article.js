import axios from 'utils/http.js'
// import qs from 'qs'

const article = {
  articleList () {
    return axios.get('/admin/article/list')
  }
}

export default article
