import axios from '@/utils/http.js'

export function getTagById (id) {
  return axios({
    url: '/api/v1/tag/' + id,
    method: 'get'
  })
}

export function getTagList (params) {
  return axios({
    url: '/api/v1/tag',
    method: 'get',
    params
  })
}

export function createTag (data) {
  return axios({
    url: '/api/v1/tag',
    method: 'post',
    data
  })
}

export function updateTag (data) {
  return axios({
    url: '/api/v1/tag',
    method: 'put',
    data
  })
}

export function deleteTag (data) {
  return axios({
    url: '/api/v1/tag',
    method: 'delete',
    data
  })
}
