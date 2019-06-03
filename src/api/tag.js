import axios from '@/utils/http.js'

export function getTagList (params) {
  return axios({
    url: '/tag',
    method: 'get',
    params
  })
}

export function getAllTagList () {
  return axios({
    url: '/tag/all',
    method: 'get'
  })
}

export function createTag (data) {
  return axios({
    url: '/tag',
    method: 'post',
    data
  })
}

export function updateTag (data) {
  return axios({
    url: '/tag',
    method: 'put',
    data
  })
}

export function deleteTag (data) {
  return axios({
    url: '/tag',
    method: 'delete',
    data
  })
}
