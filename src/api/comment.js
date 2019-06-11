import axios from '@/utils/http.js'

export function getCommentById (id) {
  return axios({
    url: '/comment/' + id,
    method: 'get'
  })
}

export function getCommentList (params) {
  return axios({
    url: '/comment',
    method: 'get',
    params
  })
}

export function createComment (data) {
  return axios({
    url: '/comment',
    method: 'post',
    data
  })
}

export function updateComment (data) {
  return axios({
    url: '/comment',
    method: 'put',
    data
  })
}

export function deleteComment (data) {
  return axios({
    url: '/comment',
    method: 'delete',
    data
  })
}
