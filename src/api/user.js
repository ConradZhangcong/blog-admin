import axios from '@/utils/http.js'

export function getUserById(id) {
  return axios({
    url: '/user/' + id,
    method: 'get'
  })
}

export function getUserList(params) {
  return axios({
    url: '/user',
    method: 'get',
    params
  })
}

export function createUser(data) {
  return axios({
    url: '/user',
    method: 'post',
    data
  })
}

export function updateUser(data) {
  return axios({
    url: '/user',
    method: 'put',
    data
  })
}

export function deleteUser(data) {
  return axios({
    url: '/user',
    method: 'delete',
    data
  })
}

export function login(data) {
  return axios({
    url: '/user/login',
    method: 'post',
    data
  })
}
