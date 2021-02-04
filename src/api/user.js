import * as api from '@/utils/api' 

export function login(data) {

  return api.postFormRequest('/login',data)
}

export function getInfo(token) {
  return api.request('/sys/userinfo',{ token })
}

export function logout() {
  return api.request('/sys/user/logout')
}
