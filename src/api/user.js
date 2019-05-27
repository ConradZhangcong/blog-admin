import axios from '@/utils/http.js'

export function getUserById (id) {
  return axios({
    url: '/api/v1/user/' + id,
    method: 'get'
  })
}

export function getUserList (params) {
  return axios({
    url: '/api/v1/user',
    method: 'get',
    params
  })
}

export function createUser (data) {
  return axios({
    url: '/api/v1/user',
    method: 'post',
    data
  })
}

export function updateUser (data) {
  return axios({
    url: '/api/v1/user',
    method: 'put',
    data
  })
}

export function deleteUser (data) {
  console.log(data)
  return axios({
    url: '/api/v1/user',
    method: 'delete',
    data
  })
}
