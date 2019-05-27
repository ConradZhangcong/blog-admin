import axios from '@/utils/http.js'

export function getCategoryById (id) {
  return axios({
    url: '/api/v1/category/' + id,
    method: 'get'
  })
}

export function getCategoryList (params) {
  return axios({
    url: '/api/v1/category',
    method: 'get',
    params
  })
}

export function createCategory (data) {
  return axios({
    url: '/api/v1/category',
    method: 'post',
    data
  })
}

export function updateCategory (data) {
  return axios({
    url: '/api/v1/category',
    method: 'put',
    data
  })
}

export function deleteCategory (data) {
  return axios({
    url: '/api/v1/category',
    method: 'delete',
    data
  })
}
