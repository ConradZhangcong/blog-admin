import axios from '@/utils/http.js'

export function getArticleById (id) {
  return axios({
    url: '/api/v1/article/' + id,
    method: 'get'
  })
}

export function getArticleList (params) {
  return axios({
    url: '/api/v1/article',
    method: 'get',
    params
  })
}

export function creatAarticle (data) {
  return axios({
    url: '/api/v1/article',
    method: 'post',
    data
  })
}

export function updateArticle (data) {
  return axios({
    url: '/api/v1/article',
    method: 'put',
    data
  })
}

export function deleteArticle (data) {
  return axios({
    url: '/api/v1/article',
    method: 'delete',
    data
  })
}
