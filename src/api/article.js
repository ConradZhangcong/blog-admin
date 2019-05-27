import axios from '@/utils/http.js'

export function getArticleList (params) {
  return axios({
    url: '/article/list',
    method: 'get',
    params
  })
}

export function publishArticle (data) {
  return axios({
    url: '/article/publish',
    method: 'post',
    data
  })
}
