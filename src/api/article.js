import axios from '@/utils/http.js'

export function getArticleById (id) {
  return axios({
    url: '/article/' + id,
    method: 'get'
  })
}

export function getArticleList (params) {
  return axios({
    url: '/article',
    method: 'get',
    params
  })
}

export function createArticle (data) {
  return axios({
    url: '/article',
    method: 'post',
    data
  })
}

export function updateArticle (data) {
  return axios({
    url: '/article',
    method: 'put',
    data
  })
}

export function deleteArticle (data) {
  return axios({
    url: '/article',
    method: 'delete',
    data
  })
}
