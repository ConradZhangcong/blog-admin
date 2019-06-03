import axios from '@/utils/http.js'

export function getCategoryList (params) {
  return axios({
    url: '/category',
    method: 'get',
    params
  })
}

export function getAllCategoryList () {
  return axios({
    url: '/category/all',
    method: 'get'
  })
}

export function createCategory (data) {
  return axios({
    url: '/category',
    method: 'post',
    data
  })
}

export function updateCategory (data) {
  return axios({
    url: '/category',
    method: 'put',
    data
  })
}

export function deleteCategory (data) {
  return axios({
    url: '/category',
    method: 'delete',
    data
  })
}
